"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import PreviewFrame from "@/components/PreviewFrame";
import Select, { type SelectGroup } from "@/components/Select";
import { industries } from "@/lib/industries";
import { license } from "@/lib/config";
import type { ThemeColors } from "@/lib/registry";

/**
 * The Themes page: one live preview (any template, any theme), the chosen theme's details and copy
 * buttons, then every theme as a small swatch card. Only the chosen theme's fonts load, and its CSS
 * is fetched when copied, so the page stays light however many themes there are.
 */
export type ThemeData = {
  slug: string;
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
  fonts: { sans: string; display: string };
  radius: string;
  /** The style's name ("Glass", "Swiss"), or null for a theme that only sets colour, type and corners. */
  look: string | null;
  googleFontsUrl: string | null;
  license: string;
};

const firstFont = (stack: string) => (stack.split(",")[0] ?? stack).replace(/['"]/g, "").trim();
const SWATCHES = ["background", "card", "primary", "secondary", "accent", "muted", "border"] as const;

const cache = new Map<string, Promise<string>>();
const themeCss = (t: ThemeData) => {
  if (!cache.has(t.slug))
    cache.set(
      t.slug,
      fetch(`/r/themes/${t.slug}.json`)
        .then((r) => r.json())
        .then((j) => `${j.googleFontsUrl ? `@import url("${j.googleFontsUrl}");\n\n` : ""}${j.css}\n\n${j.tailwindV4}`),
    );
  return cache.get(t.slug)!;
};

function CopyAction({ label, get }: { label: string; get: () => string | Promise<string> }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const copy = async () => {
    setState("loading");
    try {
      const text = get();
      // Safari only allows a copy that waits on a fetch when it's handed over as a pending ClipboardItem.
      if (typeof text !== "string" && typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })) })]);
      } else {
        await navigator.clipboard.writeText(await text);
      }
      setState("done");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("error");
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:border-foreground active:translate-y-0.5"
    >
      {state === "loading" ? (
        <Loader2 className="size-4 animate-spin" />
      ) : state === "done" ? (
        <Check className="size-4" />
      ) : (
        <Copy className="size-4" />
      )}
      {state === "done" ? "Copied" : state === "error" ? "Couldn't copy. Try again." : label}
    </button>
  );
}

export default function ThemesExplorer({
  themes,
  templates,
  defaultTheme,
  defaultTemplate,
}: {
  themes: ThemeData[];
  templates: { slug: string; name: string }[];
  defaultTheme: string;
  defaultTemplate: string;
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [template, setTemplate] = useState(defaultTemplate);
  const [look, setLook] = useState<string | null>(null);
  const looks = [...new Set(themes.flatMap((x) => (x.look ? [x.look] : [])))].sort();
  const shown = look ? themes.filter((x) => x.look === look) : themes;
  const top = useRef<HTMLDivElement>(null);
  const t = themes.find((x) => x.slug === theme) ?? themes[0]!;
  // The template list grouped like the Templates page, labelled "Ledger · Accountants & Bookkeepers".
  const templateGroups: SelectGroup[] = (() => {
    const byslug = new Map(templates.map((x) => [x.slug, x]));
    const opt = (x: { slug: string; name: string }) => {
      const [brand, kind] = x.name.split(" — ");
      return { value: x.slug, label: kind ? `${brand} · ${kind}` : x.name };
    };
    const listed = new Set(industries.flatMap((g) => g.slugs));
    const groups = industries
      .map((g) => ({ label: g.name, options: g.slugs.flatMap((s) => (byslug.has(s) ? [opt(byslug.get(s)!)] : [])) }))
      .filter((g) => g.options.length);
    const rest = templates.filter((x) => !listed.has(x.slug));
    return rest.length ? [...groups, { label: "More", options: rest.map(opt) }] : groups;
  })();
  const templateName = (templates.find((x) => x.slug === template)?.name ?? "this template").split(" — ")[0];

  // /themes#slug (from ⌘K and template pages) opens that theme in the preview,
  // rather than leaving the browser at the theme's card further down.
  useEffect(() => {
    const pick = () => {
      const slug = decodeURIComponent(location.hash.slice(1));
      if (!themes.some((x) => x.slug === slug)) return;
      setTheme(slug);
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start" }));
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [themes]);

  const choose = (slug: string) => {
    setTheme(slug);
    history.replaceState(null, "", `#${slug}`);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {t.googleFontsUrl && <link rel="stylesheet" href={t.googleFontsUrl} />}
      <div ref={top} className="mt-10 grid scroll-mt-24 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Select label="Shown on" showLabel value={template} onChange={setTemplate} groups={templateGroups} className="min-w-0" />
            <a
              href={`/preview/template/${template}?theme=${theme}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:highlight"
            >
              Open full page <ArrowUpRight className="size-4" />
            </a>
          </div>
          <PreviewFrame
            key={template}
            src={`/preview/template/${template}`}
            themes={themes.map((x) => ({ slug: x.slug, name: x.name, swatch: x.light.primary }))}
            theme={theme}
            onThemeChange={(slug) => {
              setTheme(slug);
              history.replaceState(null, "", `#${slug}`);
            }}
            height={620}
          />
        </div>

        <aside className="rounded-lg border border-foreground bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--foreground)]">
          <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            theme-{t.slug}
            {t.license !== license.id && (
              <span
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold"
                title={`Contributed under the ${t.license} licence`}
              >
                {t.license}
              </span>
            )}
          </p>
          <h2 className="mt-2 text-3xl font-bold" style={{ fontFamily: t.fonts.display }}>
            {t.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
          <dl className="mt-5 space-y-2 border-y border-border py-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Headings</dt>
              <dd style={{ fontFamily: t.fonts.display }}>{firstFont(t.fonts.display)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Text</dt>
              <dd style={{ fontFamily: t.fonts.sans }}>{firstFont(t.fonts.sans)}</dd>
            </div>
            {t.look && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Style</dt>
                <dd>{t.look}</dd>
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Corners</dt>
              <dd className="flex items-center gap-2">
                <span aria-hidden className="size-5 border-t-2 border-l-2 border-foreground" style={{ borderTopLeftRadius: t.radius }} />
                {t.radius}
              </dd>
            </div>
          </dl>
          {(["light", "dark"] as const).map((mode) => (
            <div key={mode} className="mt-4">
              <p className="text-xs text-muted-foreground">{mode === "light" ? "Light" : "Dark"}</p>
              <div className="mt-1.5 flex overflow-hidden rounded-md border border-border">
                {SWATCHES.map((k) => (
                  <span key={k} title={`${k}: ${t[mode][k]}`} className="h-8 flex-1" style={{ background: t[mode][k] }} />
                ))}
              </div>
            </div>
          ))}
          <Link
            href={`/templates/${template}?theme=${t.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
          >
            Use {t.name} on {templateName} <ArrowRight className="size-4" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">
            The prompt you copy there includes this theme. Every template and section page has a theme menu above its preview, so you can
            switch to {t.name} anywhere.
          </p>
          <details className="mt-5 border-t border-border pt-4 text-sm">
            <summary className="cursor-pointer font-semibold">For developers: CSS and shadcn</summary>
            <div className="mt-3 space-y-2">
              <CopyAction label="Copy CSS (Tailwind v4)" get={() => themeCss(t)} />
              <CopyAction label="Copy shadcn command" get={() => `npx shadcn@latest add @copypasteui/theme-${t.slug}`} />
              <CopyAction label="Copy CLI command" get={() => `npx copypasteui.dev add <section> --theme ${t.slug}`} />
            </div>
          </details>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          {look ? `${shown.length} ${look.toLowerCase()} ${shown.length === 1 ? "theme" : "themes"}` : `All ${themes.length} themes`}
        </h2>
        <div role="group" aria-label="Filter themes by style" className="mt-4 flex flex-wrap gap-2 text-sm">
          {[null, ...looks].map((l) => (
            <button
              key={l ?? "all"}
              type="button"
              aria-pressed={look === l}
              onClick={() => setLook(l)}
              className={`rounded-full border px-3 py-1 font-medium transition ${look === l ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >
              {l ?? "All styles"}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {shown.map((x) => {
            const p = x.light;
            const on = x.slug === theme;
            return (
              <button
                key={x.slug}
                // Not id={slug}: the browser would jump to this card instead of the preview on /themes#slug.
                id={`card-${x.slug}`}
                type="button"
                aria-pressed={on}
                onClick={() => choose(x.slug)}
                className={`group scroll-mt-24 overflow-hidden rounded-lg border bg-card text-left transition hover:-translate-y-0.5 ${on ? "border-foreground shadow-[3px_3px_0_var(--foreground)]" : "border-border hover:border-foreground"}`}
              >
                <span aria-hidden className="flex h-16 items-end gap-1.5 p-2.5" style={{ background: p.background }}>
                  <span className="h-6 flex-1 border" style={{ background: p.card, borderColor: p.border, borderRadius: x.radius }} />
                  <span className="h-6 w-8" style={{ background: p.primary, borderRadius: x.radius }} />
                  <span className="h-6 w-4" style={{ background: p.accent, borderRadius: x.radius }} />
                </span>
                <span className="block border-t border-border px-2.5 py-2">
                  <span className="block truncate text-sm font-semibold">{x.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {x.look ? `${x.look} · ` : ""}
                    {firstFont(x.fonts.display)} · {firstFont(x.fonts.sans)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
