"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Box, ClipboardCopy, FileText, LayoutTemplate, Palette, Search, Shapes, Terminal } from "lucide-react";
import { loadBusiness, yourBusiness } from "@/lib/business";
import { requestTradeUrl } from "@/lib/config";
import { rank } from "@/lib/rank";
import type { SearchItem, SearchKind } from "@/lib/search";

const KIND: Record<SearchKind, { label: string; icon: typeof Box }> = {
  template: { label: "Templates", icon: LayoutTemplate },
  category: { label: "Categories", icon: Shapes },
  component: { label: "Sections", icon: Box },
  theme: { label: "Themes", icon: Palette },
  page: { label: "Pages", icon: FileText },
};
const ORDER: SearchKind[] = ["template", "category", "component", "theme", "page"];
const LIMIT = { template: 6, category: 4, component: 12, theme: 6, page: 5 } as const;
const SUGGESTED = ["olea-restaurant", "verelle-salon", "fixwell-trades", "mossbrook-vets"];

const installCommand = (it: SearchItem) => it.install ?? null;
const hasPrompt = (it: SearchItem) => it.kind === "component" || it.kind === "template";

// Same prompt as the Copy button on the item's page, including any business details saved there.
async function promptFor(it: SearchItem) {
  const extra = yourBusiness(loadBusiness(), it.kind === "template" ? "template" : "component");
  if (it.kind === "component") {
    const c = await fetch(`/r/components/${it.slug}.json`).then((r) => r.json());
    const theme = await fetch(`/r/themes/${c.theme}.json`).then((r) => r.json());
    return (c.prompt as string).replace("{{THEME}}", theme.promptBlock ?? "") + extra;
  }
  const [t, theme] = await Promise.all([
    fetch(`/r/templates/${it.slug}.json`).then((r) => r.json()),
    fetch(`/r/themes/${it.theme}.json`).then((r) => r.json()),
  ]);
  return (t.prompt as string).replace("{{THEME}}", theme.promptBlock ?? "") + extra;
}

// Same ranking as the Sections search box (lib/rank).
const view = (it: SearchItem) => ({ name: it.name, slug: it.slug, text: `${it.hint} ${it.terms}` });

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [mac, setMac] = useState(true);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  // ⌘K / Ctrl+K anywhere, "/" when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !open)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => input.current?.focus());
    if (!items)
      fetch("/search.json")
        .then((r) => r.json())
        .then(setItems)
        .catch(() => setItems([]));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open, items]);

  const groups = useMemo(() => {
    if (!items) return [];
    const found = query.trim()
      ? rank(items, query, view)
      : [
          ...SUGGESTED.map((s) => items.find((i) => i.kind === "template" && i.slug === s)),
          ...items.filter((i) => i.kind === "page"),
        ].filter((x): x is SearchItem => !!x);
    return ORDER.map((kind) => ({ kind, items: found.filter((i) => i.kind === kind).slice(0, query.trim() ? LIMIT[kind] : 10) })).filter(
      (g) => g.items.length,
    );
  }, [items, query]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const current = flat[Math.min(active, flat.length - 1)];

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const go = useCallback(
    (it: SearchItem) => {
      setOpen(false);
      router.push(it.href);
    },
    [router],
  );

  const copyPrompt = async (it: SearchItem) => {
    if (!hasPrompt(it)) return;
    flash("Fetching prompt…");
    try {
      await navigator.clipboard.writeText(await promptFor(it));
      flash(`Copied the ${it.name} prompt`);
    } catch {
      flash("Couldn't copy. Open the page instead.");
    }
  };

  const copyInstall = async (it: SearchItem) => {
    const cmd = installCommand(it);
    if (!cmd) return;
    await navigator.clipboard.writeText(cmd);
    flash("Copied the install command");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && current) {
      e.preventDefault();
      if (e.metaKey || e.ctrlKey) copyPrompt(current);
      else if (e.altKey) copyInstall(current);
      else go(current);
    }
  };

  const mod = mac ? "⌘" : "Ctrl";
  let index = -1;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 px-3 pt-[10vh] backdrop-blur-[2px]"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search CopyPasteUI"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="flex max-h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-foreground bg-card text-card-foreground shadow-[6px_6px_0_var(--foreground)]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, sections and themes, e.g. “dentist” or “pricing”"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={current ? `cmdk-${current.kind}-${current.slug}` : undefined}
                className="h-14 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="keycap shrink-0 text-[11px]">esc</kbd>
            </div>

            <div ref={list} id="cmdk-list" role="listbox" className="min-h-0 flex-1 overflow-y-auto p-2">
              {!items && <p className="px-3 py-6 text-sm text-muted-foreground">Loading…</p>}
              {items && !flat.length && (
                <p className="px-3 py-6 text-sm text-muted-foreground">
                  Nothing for “{query}”. Try a trade (“florist”), a section (“booking”) or a colour, or{" "}
                  <a
                    href={requestTradeUrl(query.trim())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline underline-offset-2"
                  >
                    request a template for “{query.trim()}”
                  </a>
                  .
                </p>
              )}
              {groups.map((g) => {
                const Icon = KIND[g.kind].icon;
                return (
                  <div key={g.kind} role="group" aria-label={KIND[g.kind].label} className="mb-2">
                    <p className="px-3 pt-2 pb-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                      {query.trim() ? KIND[g.kind].label : g.kind === "template" ? "Popular templates" : "Go to"}
                    </p>
                    {g.items.map((it) => {
                      index++;
                      const i = index;
                      const on = it === current;
                      return (
                        <div
                          key={`${it.kind}-${it.slug}`}
                          id={`cmdk-${it.kind}-${it.slug}`}
                          role="option"
                          aria-selected={on}
                          data-index={i}
                          onMouseMove={() => setActive(i)}
                          onClick={() => go(it)}
                          className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 ${on ? "bg-accent text-accent-foreground" : ""}`}
                        >
                          {it.color ? (
                            <span className="size-4 shrink-0 rounded-sm border border-foreground/20" style={{ background: it.color }} />
                          ) : (
                            <Icon className={`size-4 shrink-0 ${on ? "" : "text-muted-foreground"}`} />
                          )}
                          <span className="min-w-0 flex-1 truncate">
                            <span className="font-medium">{it.name}</span>
                            <span className={`ml-2 text-sm ${on ? "opacity-75" : "text-muted-foreground"}`}>{it.hint}</span>
                          </span>
                          {on && <ArrowRight className="size-4 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border bg-muted px-4 py-2.5 text-xs text-muted-foreground">
              <span>
                <kbd className="font-mono">↵</kbd> Open
              </span>
              {current && hasPrompt(current) && (
                <button
                  type="button"
                  onClick={() => copyPrompt(current)}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <ClipboardCopy className="size-3.5" /> <kbd className="font-mono">{mod}↵</kbd> Copy prompt
                </button>
              )}
              {current && installCommand(current) && (
                <button
                  type="button"
                  onClick={() => copyInstall(current)}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Terminal className="size-3.5" /> <kbd className="font-mono">{mac ? "⌥" : "Alt"}↵</kbd> Install
                </button>
              )}
              <span className="ml-auto hidden sm:inline">
                <kbd className="font-mono">↑↓</kbd> move
              </span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <p
          role="status"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg"
        >
          {toast}
        </p>
      )}
    </>
  );
}

/** Header trigger; the palette itself listens for this event. */
export function CommandPaletteButton({ className = "" }: { className?: string }) {
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      aria-label="Search (Command K)"
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground ${className}`}
    >
      <Search className="size-4" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden font-mono text-[11px] sm:inline">{mac ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
