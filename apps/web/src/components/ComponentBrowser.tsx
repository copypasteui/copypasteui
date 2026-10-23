"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ComponentCard from "@/components/ComponentCard";
import { requestTradeUrl } from "@/lib/config";
import { componentSearchText, rank } from "@/lib/rank";
import { industries } from "@/lib/industries";
import type { Category, ComponentSummary } from "@/lib/registry";

// Cards per category on the overview; the rest are one click away on the category page.
const RAIL = 8;

export default function ComponentBrowser({
  items,
  categories,
  active,
  theme,
}: {
  items: ComponentSummary[];
  categories: Category[];
  active?: string;
  theme: string;
}) {
  const [query, setQuery] = useState("");
  // Filter by kind of business (the Templates page's groups), then optionally by one template in it.
  const [industry, setIndustry] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const collections = useMemo(() => new Set(items.map((c) => c.collection).filter(Boolean)), [items]);
  const groups = useMemo(
    () => industries.map((g) => ({ ...g, slugs: g.slugs.filter((s) => collections.has(s)) })).filter((g) => g.slugs.length),
    [collections],
  );
  const group = groups.find((g) => g.id === industry);
  const filtered = useMemo(() => {
    const scoped = brand
      ? items.filter((c) => c.collection === brand)
      : group
        ? items.filter((c) => c.collection && group.slugs.includes(c.collection))
        : items;
    // Same ranking as ⌘K (lib/rank).
    return rank(scoped, query, (c) => ({ name: c.name, slug: c.slug, text: componentSearchText(c) }));
  }, [items, query, brand, group]);
  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1 transition ${on ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          <Link
            href="/components"
            className={`flex shrink-0 justify-between gap-3 rounded-md px-3 py-2 text-sm ${!active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            All <span className="opacity-60">{categories.reduce((n, c) => n + c.count, 0)}</span>
          </Link>
          {categories
            .filter((c) => c.count > 0)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className={`flex shrink-0 justify-between gap-3 rounded-md px-3 py-2 text-sm ${active === c.slug ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {c.name} <span className="opacity-60">{c.count}</span>
              </Link>
            ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 focus-within:border-foreground">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, e.g. booking, price list, reviews, opening hours"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        {groups.length > 0 && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground">For:</span>
              {[null, ...groups].map((g) => (
                <button
                  key={g?.id ?? "all"}
                  type="button"
                  aria-pressed={industry === (g?.id ?? null)}
                  onClick={() => {
                    setIndustry(g?.id ?? null);
                    setBrand(null);
                  }}
                  className={chip(industry === (g?.id ?? null))}
                >
                  {g ? g.name : "Any business"}
                </button>
              ))}
            </div>
            {group && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">From the template:</span>
                {[null, ...group.slugs].map((b) => (
                  <button
                    key={b ?? "all"}
                    type="button"
                    aria-pressed={brand === b}
                    onClick={() => setBrand(b)}
                    className={`${chip(brand === b)} capitalize`}
                  >
                    {b ? b.replace(/-/g, " ") : `All ${group.name.toLowerCase()}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!active && !query && !group ? (
          // Overview: one rail per category instead of every card in one long grid.
          <div className="mt-8 space-y-12">
            {categories
              .filter((cat) => cat.count > 0)
              .map((cat) => (
                <section key={cat.slug}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-foreground pb-2">
                    <h2 className="font-display text-2xl font-extrabold tracking-tight">{cat.name}</h2>
                    <Link href={`/components/${cat.slug}`} className="shrink-0 text-sm font-semibold hover:highlight">
                      See all {cat.count} →
                    </Link>
                  </div>
                  <div className="-mx-4 mt-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
                    {items
                      .filter((c) => c.category === cat.slug)
                      .slice(0, RAIL)
                      .map((c) => (
                        <div key={c.slug} className="w-[78%] shrink-0 snap-start sm:w-72">
                          <ComponentCard c={c} theme={theme} />
                        </div>
                      ))}
                  </div>
                </section>
              ))}
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              {filtered.length} section{filtered.length === 1 ? "" : "s"} · all free
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => (
                <ComponentCard key={c.slug} c={c} theme={theme} />
              ))}
            </div>
          </>
        )}
        {!filtered.length && (
          <p className="mt-10 text-center text-muted-foreground">
            Nothing matches.{" "}
            <a
              href={requestTradeUrl(query.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent decoration-2"
            >
              Ask for it
            </a>{" "}
            or{" "}
            <Link href="/contribute" className="underline decoration-accent decoration-2">
              contribute one
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
