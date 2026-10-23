"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type DemoSite = { slug: string; business: string; brand: string; ask: string; fullPage: string };

/**
 * Homepage hero demo: a real template's full-page screenshot scrolling inside a browser frame,
 * with the prompt that builds it being "pasted" underneath. Advances to the next business after
 * each scroll until the visitor picks one.
 */
export default function HeroDemo({ sites }: { sites: DemoSite[] }) {
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [typed, setTyped] = useState(0);
  const site = sites[i]!;

  useEffect(() => {
    setTyped(0);
    const id = setInterval(() => setTyped((n) => (n >= site.ask.length ? n : n + 1)), 28);
    return () => clearInterval(id);
  }, [site.ask]);

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Example businesses" className="flex [scrollbar-width:none] gap-1.5 overflow-x-auto pb-3">
        {sites.map((s, n) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => {
              setI(n);
              setPinned(true);
            }}
            className={`shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition ${n === i ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
          >
            {s.business}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-foreground bg-card shadow-[6px_6px_0_var(--foreground)]">
        <div className="flex items-center gap-3 border-b border-foreground px-3 py-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full border border-foreground" />
            <span className="size-2.5 rounded-full border border-foreground" />
            <span className="size-2.5 rounded-full border border-foreground" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded bg-muted px-2 py-0.5 text-center font-mono text-xs text-muted-foreground">
            {site.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com
          </span>
        </div>
        <Link
          href={`/templates/${site.slug}`}
          className="relative block h-[300px] overflow-hidden bg-muted [--frame-h:300px] sm:h-[420px] sm:[--frame-h:420px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={site.slug}
            src={site.fullPage}
            alt={`The full ${site.brand} page`}
            className="motion-safe-scroll block w-full"
            style={{ animation: `page-scroll 11s ease-in-out ${pinned ? "infinite alternate" : "1 forwards"}` }}
            onAnimationEnd={() => !pinned && setI((n) => (n + 1) % sites.length)}
          />
          <span className="absolute top-3 right-3 rounded bg-foreground px-2 py-1 font-mono text-[11px] text-background">{site.slug}</span>
        </Link>
      </div>

      <div className="relative z-10 mx-3 -mt-6 flex items-start gap-3 slip p-4 shadow-sm sm:mx-8">
        <kbd className="keycap shrink-0 bg-accent text-xs text-accent-foreground">⌘V</kbd>
        <p className="min-h-[3em] font-mono text-[13px] leading-relaxed" aria-label={site.ask}>
          <span aria-hidden>
            {site.ask.slice(0, typed)}
            <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] [animation:caret_1s_steps(1)_infinite] bg-foreground" />
          </span>
        </p>
      </div>
    </div>
  );
}
