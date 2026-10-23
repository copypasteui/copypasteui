// One ranking for every search: ⌘K (search index items), the Sections search box (registry components)
// and the MCP's search_components must put sections in the same order. The ranking lives in
// packages/mcp/src/rank.ts and is imported here as TypeScript (Node 22 strips types).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { componentSearchText, rank } from "../../packages/mcp/src/rank.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { components } = JSON.parse(fs.readFileSync(path.join(ROOT, "apps/web/src/generated/registry.json"), "utf8"));
const mcpIndex = JSON.parse(fs.readFileSync(path.join(ROOT, "apps/web/public/r/index.json"), "utf8"));
const mcpDist = path.join(ROOT, "packages/mcp/dist/registry.js");

// The two views exactly as the site builds them (lib/search.ts + CommandPalette, ComponentBrowser).
const palette = components.map((c) => ({ name: c.name, slug: c.slug, hint: c.category.replace(/-/g, " "), terms: componentSearchText(c) }));
const paletteView = (it) => ({ name: it.name, slug: it.slug, text: `${it.hint} ${it.terms}` });
const browserView = (c) => ({ name: c.name, slug: c.slug, text: componentSearchText(c) });
const slugs = (xs) => xs.map((x) => x.slug);

const QUERIES = [
  "pricing",
  "pricing toggle",
  "booking",
  "opening hours",
  "price list",
  "reviews",
  "hero",
  "menu",
  "faq",
  "team",
  "contact form",
  "gallery",
  "dental",
  "bakeries",
  "cafe",
  "footer",
];

test("⌘K and the Sections search rank sections the same way", () => {
  for (const q of QUERIES) {
    assert.deepEqual(slugs(rank(palette, q, paletteView)), slugs(rank(components, q, browserView)), `"${q}" ranks differently`);
  }
});

test("the MCP's search_components ranks sections like the site", async (t) => {
  if (!fs.existsSync(mcpDist)) return t.skip("build the MCP first (npm run build -w packages/mcp)");
  const { searchComponents } = await import(mcpDist);
  for (const q of QUERIES) {
    const site = slugs(rank(components, q, browserView));
    if (!site.length) continue;
    assert.deepEqual(slugs(searchComponents(mcpIndex.components, { query: q, limit: 1000 })), site, `"${q}" ranks differently in the MCP`);
  }
});

test("long phrases from AI clients still find the right section", async (t) => {
  if (!fs.existsSync(mcpDist)) return t.skip("build the MCP first");
  const { searchComponents } = await import(mcpDist);
  const top = (q) => searchComponents(mcpIndex.components, { query: q, limit: 3 }).map((c) => c.slug);
  assert.equal(top("find me a pricing section with a toggle")[0], "toggle-tier-pricing", "filler words are ignored");
  assert.ok(top("a website for a dog groomer in Leeds").length > 0, "closest matches when nothing matches every word");
  assert.equal(rank(components, "dog groomer leeds", browserView).length, 0, "the site stays strict");
});

test("names win: a section named after the query comes first", () => {
  const r = rank(components, "pricing toggle", browserView);
  assert.ok(r.length > 0);
  assert.match(r[0].name.toLowerCase(), /pricing/);
  const faq = rank(components, "faq", browserView);
  assert.match(faq[0].name.toLowerCase(), /faq/);
});

test("every word must match, and plurals and accents don't get in the way", () => {
  assert.equal(rank(components, "pricing zzzz", browserView).length, 0);
  const t = [
    { name: "Crumb Bakery Hero", slug: "a", text: "" },
    { name: "Café Menu", slug: "b", text: "" },
    { name: "Ember Cafes", slug: "c", text: "" },
  ];
  const id = (x) => x;
  assert.deepEqual(slugs(rank(t, "bakeries", id)), ["a"]);
  assert.deepEqual(slugs(rank(t, "cafe", id)), ["b", "c"]);
  assert.deepEqual(slugs(rank(t, "cafés", id)), ["b", "c"]);
});

test("an empty query keeps the original order", () => {
  assert.deepEqual(slugs(rank(components, "  ", browserView)), slugs(components));
});
