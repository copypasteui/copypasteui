// The pairwise generator must cover every allowed pair, never produce a case the rules forbid, stay small,
// and give the same cases for the same seed.
import assert from "node:assert/strict";
import { test } from "node:test";
import { allPairs, caseTable, coveredPairs, pairwise } from "../pairwise.mjs";

const STYLE = [
  { name: "shadow", values: ["soft", "hard", "clay", "neu", "none"] },
  { name: "border", values: ["0px", "1px", "2px", "3px"] },
  { name: "surface", values: ["solid", "glass"] },
  { name: "texture", values: ["none", "grain", "dots", "grid"] },
  { name: "motion", values: ["none", "subtle", "lively"] },
  { name: "mode", values: ["light", "dark"] },
  { name: "viewport", values: ["phone", "tablet", "desktop"] },
];
const glassRule = (c) => !(c.surface === "glass" && (c.texture === "dots" || c.texture === "grid"));

test("covers every pair, far fewer cases than the full product", () => {
  const cases = pairwise(STYLE, { seed: 7 });
  const all = allPairs(STYLE);
  const got = coveredPairs(STYLE, cases);
  for (const p of all) assert.ok(got.has(p), `missing pair ${p}`);
  const full = STYLE.reduce((n, p) => n * p.values.length, 1);
  assert.ok(cases.length <= 30, `${cases.length} cases`);
  assert.ok(cases.length >= 20, "at least shadow × border = 20 pairs need 20 cases");
  assert.ok(cases.length < full / 100, `${cases.length} of ${full}`);
});

test("respects the rules and still covers every pair they allow", () => {
  const cases = pairwise(STYLE, { allowed: glassRule, seed: 3 });
  for (const c of cases) assert.ok(glassRule(c), `forbidden case ${JSON.stringify(c)}`);
  const got = coveredPairs(STYLE, cases);
  for (const p of allPairs(STYLE, glassRule)) assert.ok(got.has(p), `missing pair ${p}`);
  assert.ok(!got.has("2:glass|3:dots"), "glass with dots must never appear");
});

test("the same seed gives the same cases; another seed may differ", () => {
  assert.deepEqual(pairwise(STYLE, { seed: 42 }), pairwise(STYLE, { seed: 42 }));
});

test("keeps value types (numbers and booleans) and handles one parameter", () => {
  const cases = pairwise([
    { name: "people", values: [1, 6] },
    { name: "reduce", values: [true, false] },
  ]);
  assert.equal(cases.length, 4);
  assert.ok(cases.every((c) => typeof c.people === "number" && typeof c.reduce === "boolean"));
  assert.deepEqual(pairwise([{ name: "only", values: ["a", "b"] }]), [{ only: "a" }, { only: "b" }]);
});

test("says so when the rules make an allowed pair impossible to complete", () => {
  const params = [
    { name: "a", values: ["x", "y"] },
    { name: "b", values: ["x", "y"] },
    { name: "c", values: ["z"] },
  ];
  // a=x with b=x is fine on its own, but no c value is allowed alongside it.
  const allowed = (c) => !(c.a === "x" && c.b === "x" && "c" in c);
  assert.throws(() => pairwise(params, { allowed }), /can't be completed/);
});

test("renders a markdown table with extra columns", () => {
  const params = [
    { name: "mode", values: ["light", "dark"] },
    { name: "surface", values: ["solid", "glass"] },
  ];
  const table = caseTable(params, pairwise(params), [{ name: "expected", value: () => "passes" }]);
  assert.match(table, /^\| # \| mode \| surface \| expected \|/);
  assert.equal(table.split("\n").length, 2 + 4);
});
