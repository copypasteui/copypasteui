// Near-duplicate detection compares code shape, so a copy with new copy, colours and numbers is still caught,
// while genuinely different sections score low.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { checkDuplicates, shape, shingles, similarity } from "../check-duplicates.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => fs.readFileSync(path.join(ROOT, "registry/components", rel, "component.tsx"), "utf8");
const score = (a, b) => similarity(shingles(shape(a)), shingles(shape(b)));

test("a reworded copy of a section is caught", () => {
  const original = read("pricing/toggle-tier-pricing");
  const copy = original
    .replace(/"[^"]*"/g, '"Something else"')
    .replace(/>([^<>{}]+)</g, ">Different words<")
    .replace(/\b\d+\b/g, "7")
    .replace(/ToggleTierPricing/g, "MyPricing");
  assert.ok(score(original, copy) > 0.95, `copy scored ${score(original, copy)}`);
});

test("different sections score low", () => {
  assert.ok(score(read("pricing/toggle-tier-pricing"), read("hero/olea-hero")) < 0.3);
});

test("the registry has no unexplained near-duplicates", () => {
  assert.equal(checkDuplicates(), 0);
});
