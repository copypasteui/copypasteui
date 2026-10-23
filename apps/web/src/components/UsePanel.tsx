"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, Loader2, Lock } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { EMPTY_BUSINESS as EMPTY, loadBusiness, saveBusiness, yourBusiness, type Business } from "@/lib/business";

/**
 * The two doors for one template or section: "AI builder" (an optional bit about your business,
 * then a ready prompt) and "Code" (MCP, shadcn and CLI). Prompts and theme blocks are fetched from
 * the static registry when someone copies, so pages don't ship every theme's text up front.
 */

// Ordered by how many people use each tool (2026 figures); keep in step with /get-started.
const TOOLS = [
  { name: "ChatGPT", href: "https://chatgpt.com/" },
  { name: "Replit", href: "https://replit.com/" },
  { name: "Lovable", href: "https://lovable.dev/" },
  { name: "Bolt", href: "https://bolt.new/" },
  { name: "v0", href: "https://v0.app/" },
  { name: "Claude", href: "https://claude.ai/" },
  { name: "Gemini", href: "https://gemini.google.com/" },
];

const FIELDS: { key: keyof Business; label: string; placeholder: string; type?: string; wide?: boolean }[] = [
  { key: "name", label: "Business name", placeholder: "Harbour Kitchen" },
  { key: "trade", label: "What you do", placeholder: "seafood restaurant" },
  { key: "phone", label: "Phone", placeholder: "01326 000000", type: "tel" },
  { key: "email", label: "Email", placeholder: "hello@harbourkitchen.example", type: "email" },
  { key: "town", label: "Town or area", placeholder: "Falmouth", wide: true },
];

export type UseTarget =
  | { kind: "template"; slug: string; name: string; sections: string[]; dependencies: string[] }
  | { kind: "component"; slug: string; name: string; dependencies: string[]; code: string };

const cache = new Map<string, Promise<string>>();
const fetchText = (url: string, pick: (j: Record<string, string>) => string) => {
  if (!cache.has(url))
    cache.set(
      url,
      fetch(url)
        .then((r) => r.json())
        .then(pick),
    );
  return cache.get(url)!;
};

export default function UsePanel({ target, theme, themeName }: { target: UseTarget; theme: string; themeName: string }) {
  const [door, setDoor] = useState<"builder" | "code">("builder");
  const [biz, setBiz] = useState<Business>(EMPTY);
  const [copied, setCopied] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => setBiz(loadBusiness()), []);
  const update = (key: keyof Business, value: string) => {
    const next = { ...biz, [key]: value };
    setBiz(next);
    saveBusiness(next);
  };

  const buildPrompt = async () => {
    const base = target.kind === "template" ? `/r/templates/${target.slug}.json` : `/r/components/${target.slug}.json`;
    const [prompt, block] = await Promise.all([
      fetchText(base, (j) => j.prompt ?? ""),
      fetchText(`/r/themes/${theme}.json`, (j) => j.promptBlock ?? ""),
    ]);
    return prompt.replace("{{THEME}}", block) + yourBusiness(biz, target.kind);
  };

  // Start fetching as soon as someone heads for the panel, so the copy itself is instant.
  const warm = () => void buildPrompt().catch(() => {});

  const copyPrompt = async () => {
    setCopied("loading");
    try {
      // Safari only allows a copy that waits on a fetch when it's handed over as a pending ClipboardItem.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
        const blob = buildPrompt().then((t) => new Blob([t], { type: "text/plain" }));
        await navigator.clipboard
          .write([new ClipboardItem({ "text/plain": blob })])
          .catch(async () => navigator.clipboard.writeText(await buildPrompt()));
      } else {
        await navigator.clipboard.writeText(await buildPrompt());
      }
      setCopied("done");
      setTimeout(() => setCopied("idle"), 2200);
    } catch {
      setCopied("error");
    }
  };

  const filled = Object.values(biz).some((v) => v.trim());

  return (
    <div
      onPointerEnter={warm}
      onFocus={warm}
      className="overflow-hidden rounded-lg border border-foreground bg-card text-card-foreground shadow-[4px_4px_0_var(--foreground)]"
    >
      <div role="tablist" aria-label="How do you build?" className="grid grid-cols-2 border-b border-foreground text-sm font-semibold">
        {[
          { id: "builder" as const, label: "With an AI builder", hint: "Lovable, Bolt, v0, ChatGPT…" },
          { id: "code" as const, label: "In code", hint: "Claude Code, VS Code, Cursor…" },
        ].map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={door === d.id}
            onClick={() => setDoor(d.id)}
            className={`px-4 py-3 text-left transition ${door === d.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"} ${d.id === "code" ? "border-l border-foreground" : ""}`}
          >
            {d.label}
            <span className={`block text-xs font-normal ${door === d.id ? "opacity-75" : ""}`}>{d.hint}</span>
          </button>
        ))}
      </div>

      {door === "builder" ? (
        <div className="space-y-5 p-5">
          <fieldset>
            <legend className="text-sm font-semibold">
              Your business <span className="font-normal text-muted-foreground">(optional)</span>
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label key={f.key} className={`block text-xs text-muted-foreground ${f.wide ? "sm:col-span-2" : ""}`}>
                  {f.label}
                  <input
                    type={f.type ?? "text"}
                    value={biz[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
                  />
                </label>
              ))}
            </div>
            <PrivacyNote />
          </fieldset>

          <div>
            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-3 font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
            >
              {copied === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : copied === "done" ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied === "done"
                ? "Copied. Now paste it."
                : copied === "error"
                  ? "Couldn't copy. Try again."
                  : `Copy ${target.kind === "template" ? "full-page " : ""}prompt`}
            </button>
            <p className="mt-2 text-xs text-muted-foreground">
              {themeName} theme{filled ? ", written for your business" : ""}.{" "}
              {target.kind === "template"
                ? `All ${target.sections.length} sections, their code and the theme in one prompt.`
                : "The section's code, theme and steps in one prompt."}
            </p>
          </div>

          {target.slug.startsWith("admin-") && (
            <p className="rounded-md border border-border bg-muted px-3 py-2 text-sm">
              Back-office screens need a backend and a sign-in.{" "}
              <Link href="/components/admin#backend" className="font-semibold hover:highlight">
                Pick yours and copy its setup prompt →
              </Link>
            </p>
          )}

          <div>
            <p className="text-sm font-semibold">Paste it into</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {TOOLS.map((t) => (
                <li key={t.name}>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm hover:border-foreground"
                  >
                    {t.name} <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              <Link href="/get-started" className="font-semibold hover:highlight">
                New to this? Step-by-step guide →
              </Link>
            </p>
          </div>

          <details
            onToggle={async (e) => {
              if ((e.target as HTMLDetailsElement).open) setPreview(await buildPrompt().catch(() => "Couldn't load the prompt."));
            }}
            className="group border-t border-border pt-4"
          >
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ChevronDown className="size-4 transition group-open:rotate-180" /> See what gets copied
            </summary>
            <pre className="mt-3 max-h-80 overflow-auto rounded-md bg-muted p-3 font-mono text-[12px] leading-relaxed whitespace-pre-wrap">
              {preview ?? "Loading…"}
            </pre>
          </details>
        </div>
      ) : (
        <CodeDoor target={target} theme={theme} />
      )}
    </div>
  );
}

function CodeDoor({ target, theme }: { target: UseTarget; theme: string }) {
  const [showCode, setShowCode] = useState(false);
  const slugs = target.kind === "template" ? target.sections : [target.slug];
  const shadcn = `npx shadcn@latest add @copypasteui/theme-${theme} ${slugs.map((s) => `@copypasteui/${s}`).join(" ")}`;
  const cli = slugs.map((s, i) => `npx copypasteui add ${s}${i === 0 ? ` --theme ${theme}` : ""}`).join(" && \\\n  ");
  const ask =
    target.kind === "template"
      ? `Build the ${target.slug} template from copypasteui with the ${theme} theme`
      : `Add the ${target.slug} section from copypasteui with the ${theme} theme`;

  return (
    <div className="space-y-5 p-5 text-sm">
      <Row
        title="Ask your AI editor"
        note={
          <>
            Needs the free local MCP:{" "}
            <Link href="/developers#mcp" className="underline">
              set it up in one command
            </Link>
            .
          </>
        }
        text={ask}
      />
      <Row
        title="shadcn CLI"
        note={
          <>
            Needs <code>@copypasteui</code> in <code>components.json</code> once:{" "}
            <Link href="/developers#shadcn" className="underline">
              how
            </Link>
            .
          </>
        }
        text={shadcn}
      />
      <Row title="CopyPasteUI CLI" text={cli} />
      {target.dependencies.length > 0 && <Row title="npm packages it uses" text={`npm install ${target.dependencies.join(" ")}`} />}
      {target.kind === "component" && (
        <div>
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            className="inline-flex items-center gap-1.5 font-semibold"
            aria-expanded={showCode}
          >
            <ChevronDown className={`size-4 transition ${showCode ? "rotate-180" : ""}`} /> {showCode ? "Hide" : "View"} the code
          </button>
          {showCode && (
            <div className="relative mt-3">
              <pre className="max-h-[28rem] overflow-auto rounded-md bg-muted p-4 font-mono text-[12px] leading-relaxed">{target.code}</pre>
              <CopyButton
                getText={() => target.code}
                label="Copy code"
                variant="ghost"
                className="absolute top-2 right-2 px-2.5 py-1 text-xs"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ title, text, note }: { title: string; text: string; note?: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 font-semibold">{title}</p>
      <div className="flex items-start gap-2 rounded-md bg-muted px-3 py-2.5 font-mono text-[12.5px]">
        <span className="min-w-0 flex-1 break-words whitespace-pre-wrap">{text}</span>
        <CopyButton
          getText={() => text.replace(/ && \\\n  /g, " && ")}
          label="Copy"
          variant="ghost"
          className="shrink-0 px-2.5 py-1 text-xs"
        />
      </div>
      {note && <p className="mt-1.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

/** Said wherever someone types business details: they only go into the prompt they copy. */
export function PrivacyNote({ className = "" }: { className?: string }) {
  return (
    <p className={`mt-3 flex gap-2 text-xs text-muted-foreground ${className}`}>
      <Lock aria-hidden className="mt-px size-3.5 shrink-0" />
      <span>
        We only use this to write your prompt. It stays in this browser so you don&apos;t have to type it again, and it&apos;s never sent to
        us.{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy
        </Link>
      </span>
    </p>
  );
}
