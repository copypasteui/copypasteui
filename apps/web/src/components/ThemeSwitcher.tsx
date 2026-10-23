"use client";

import Link from "next/link";
import { useState } from "react";

export type SwitcherTheme = { slug: string; name: string; primary: string; background: string; accent: string };

/** One template shown in every theme; the swatches swap the screenshot. */
export default function ThemeSwitcher({ themes, template }: { themes: SwitcherTheme[]; template: string }) {
  const [active, setActive] = useState(themes[0]!.slug);
  const current = themes.find((t) => t.slug === active) ?? themes[0]!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17rem]">
      <Link href="/themes" className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-foreground bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.slug}
          src={`/thumbs/themes/${current.slug}.jpg`}
          alt={`${template} in the ${current.name} theme`}
          className="absolute inset-0 size-full object-cover object-top"
        />
        <span className="absolute bottom-3 left-3 rounded bg-foreground px-2 py-1 font-mono text-xs text-background">
          theme-{current.slug}
        </span>
      </Link>
      <div className="flex flex-wrap content-start gap-1.5" role="radiogroup" aria-label="Theme">
        {themes.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="radio"
            aria-checked={t.slug === active}
            onClick={() => setActive(t.slug)}
            onMouseEnter={() => setActive(t.slug)}
            className={`flex items-center gap-2 rounded-md border px-2 py-1 text-sm transition ${t.slug === active ? "border-foreground bg-card font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <span aria-hidden className="flex overflow-hidden rounded-sm border border-foreground/20">
              <span className="size-3" style={{ background: t.background }} />
              <span className="size-3" style={{ background: t.primary }} />
              <span className="size-3" style={{ background: t.accent }} />
            </span>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
