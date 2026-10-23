"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { SearchItem } from "@/lib/search";

const IGNORE = new Set(["components", "component", "templates", "template", "themes", "theme", "html", "index", "www", "preview"]);
const KIND_LABEL: Record<SearchItem["kind"], string> = {
  template: "Template",
  component: "Section",
  theme: "Theme",
  category: "Sections",
  page: "Page",
};

/** Guesses what the visitor was after from the broken URL, using the same index as ⌘K. */
export default function NotFoundSuggestions() {
  const [path, setPath] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);

  useEffect(() => {
    setPath(decodeURIComponent(location.pathname));
    fetch("/search.json")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const words = path
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 2 && !IGNORE.has(w));
  const wantKind = path.startsWith("/templates") ? "template" : path.startsWith("/components") ? "component" : null;
  const guesses =
    items && words.length
      ? items
          .map((it) => {
            const slug = it.slug.toLowerCase();
            const name = it.name.toLowerCase();
            let score = 0;
            for (const w of words) {
              if (slug.includes(w)) score += 3;
              else if (name.includes(w)) score += 2;
              else if (it.terms.toLowerCase().includes(w)) score += 1;
              // tolerate a typo or a trailing letter ("oleaa", "restaurants")
              else if (w.length > 4 && slug.includes(w.slice(0, -1))) score += 2;
            }
            if (score && wantKind === it.kind) score += 2;
            // a whole template is usually the better answer than one of its sections
            if (score && !wantKind && it.kind === "template") score += 2;
            return { it, score };
          })
          .filter((x) => x.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map((x) => x.it)
      : [];

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
        className="flex w-full max-w-xl items-center gap-3 rounded-md border border-foreground bg-card px-4 py-3 text-left text-muted-foreground shadow-[0_3px_0_var(--foreground)]"
      >
        <Search className="size-4" /> Search templates, sections and themes
        <kbd className="ml-auto font-mono text-xs">⌘K</kbd>
      </button>

      {guesses.length > 0 && (
        <div className="mt-10">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Were you looking for</p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {guesses.map((g) => (
              <li key={`${g.kind}-${g.slug}`}>
                <Link href={g.href} className="flex items-center justify-between gap-4 py-3 hover:bg-card">
                  <span className="min-w-0">
                    <span className="font-semibold">{g.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {KIND_LABEL[g.kind]} · {g.hint}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
