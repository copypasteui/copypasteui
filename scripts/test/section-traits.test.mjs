// Section traits drive which sections the style matrix renders, so each one must match what it says.
import assert from "node:assert/strict";
import { test } from "node:test";
import { sectionTraits, traitsOf } from "../section-traits.mjs";

test("reads traits from code", () => {
  assert.deepEqual(
    traitsOf(
      `<img src="https://images.unsplash.com/photo-1" /> <div className="rounded-lg bg-card p-6"><p className="text-muted-foreground">x</p></div>`,
    ),
    ["photo", "panels", "muted-panel"],
  );
  assert.deepEqual(traitsOf(`<div className="bg-foreground text-background"><span className="opacity-60">x</span></div>`), [
    "inverted",
    "faded",
  ]);
  assert.deepEqual(traitsOf(`<div className="bg-[rgb(3_4_10)]"><canvas /></div><form><input /></form>`), ["fixed-dark", "canvas", "form"]);
  assert.deepEqual(traitsOf(`<section className="bg-background"><h2>Plain</h2></section>`), []);
});

test("every trait the matrix uses has sections to render", () => {
  const all = Object.values(sectionTraits());
  for (const t of ["photo", "inverted", "faded", "fixed-dark", "canvas", "panels", "muted-panel", "form"])
    assert.ok(all.filter((s) => s.traits.includes(t)).length >= 5, `few sections with ${t}`);
  assert.ok(
    all.some((s) => !s.traits.length),
    "some plain sections",
  );
});
