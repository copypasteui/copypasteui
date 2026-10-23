// The one search ranking, shared by the MCP's search_components and the website (⌘K and the
// Sections search box, via apps/web/src/lib/rank.ts). No imports, so the site can bundle it as is.

export type Searchable = { name: string; slug: string; text: string };

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
// "bakeries" → "bakery", "cafes" → "cafe", so plurals find singulars and back.
const stem = (w: string) => (w.length > 3 ? w.replace(/ies$/, "y").replace(/(?<=[^s])s$/, "") : w);
const words = (s: string) =>
  fold(s)
    .split(/[^a-z0-9&]+/)
    .filter(Boolean)
    .map(stem);

// Words in a query that say nothing about what to find ("find me a pricing section with a toggle").
const FILLER = new Set(
  "a an and the for with of in on at to by my our your me i we us find show get need want looking some any that this which section component block".split(
    " ",
  ),
);
const queryWords = (q: string) => {
  const all = words(q);
  const kept = all.filter((w) => !FILLER.has(w));
  return kept.length ? kept : all;
};

/** What a section is searched by, wherever it's searched. */
export const componentSearchText = (c: { category: string; description: string; tags: string[]; collection?: string | null }) =>
  `${c.category.replace(/-/g, " ")} ${c.tags.join(" ")} ${c.collection?.replace(/-/g, " ") ?? ""} ${c.description}`;

/**
 * Every word of the query must appear somewhere (name, slug or text). Matches in the name rank first:
 * the whole name, then names starting with the query, then names containing it, then per-word name hits.
 * Ties keep the original order, so curated order still shows through.
 *
 * `partial`: when nothing matches every word, return the items that match the most words instead
 * (for long descriptions like "dog groomer in Leeds" from an AI client), ranked the same way after that.
 */
export function rank<T>(items: T[], query: string, view: (it: T) => Searchable, { partial = false } = {}): T[] {
  const terms = queryWords(query);
  const phrase = terms.join(" ");
  if (!terms.length) return items;
  const scored = items.map((it, i) => {
    const v = view(it);
    const nameWords = words(v.name);
    const name = nameWords.join(" ");
    const hay = ` ${[...nameWords, ...words(v.slug), ...words(v.text)].join(" ")}`;
    const hits = terms.filter((t) => hay.includes(t));
    let score = name === phrase ? 200 : name.startsWith(phrase) ? 100 : name.includes(phrase) ? 40 : 0;
    for (const t of hits) {
      if (nameWords.some((w) => w.startsWith(t))) score += 15;
      else if (nameWords.some((w) => w.includes(t))) score += 10;
      if (v.slug.includes(t)) score += 5;
      if (hay.includes(` ${t}`)) score += 2; // whole-word start beats a match in the middle of a word
    }
    return { it, score, i, hits: hits.length };
  });
  const order = (a: (typeof scored)[number], b: (typeof scored)[number]) => b.hits - a.hits || b.score - a.score || a.i - b.i;
  const all = scored.filter((x) => x.hits === terms.length);
  const found = all.length || !partial ? all : scored.filter((x) => x.hits > 0);
  return found.sort(order).map((x) => x.it);
}
