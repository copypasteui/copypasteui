#!/usr/bin/env node
// Flags registry sections whose code is (nearly) the same as another's, so the library stays varied.
// Compares structure, not copy: comments, strings, numbers and JSX text are blanked, the rest is split into
// tokens, and each pair is scored by the overlap of 8-token runs (Jaccard). Pairs at or above the threshold
// fail unless listed in scripts/duplicates-allow.json with a reason.
//   node scripts/check-duplicates.mjs            check
//   node scripts/check-duplicates.mjs --top 20   show the 20 most similar pairs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "registry/components");
const ALLOW_FILE = path.join(ROOT, "scripts/duplicates-allow.json");
const THRESHOLD = 0.75;
const K = 8;

/** Code shape: no comments, strings, numbers or JSX text, so two sections with different copy compare equal. */
export function shape(code) {
  return (
    code
      .replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, " ")
      .replace(/`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, " S ")
      .replace(/>([^<>{}]+)</g, "> T <")
      .replace(/\b\d+(\.\d+)?\b/g, " N ")
      .match(/[A-Za-z_$][\w$]*|[^\s\w]/g) ?? []
  );
}

export function shingles(tokens) {
  const out = new Set();
  for (let i = 0; i + K <= tokens.length; i++) out.add(tokens.slice(i, i + K).join(" "));
  return out;
}

export function similarity(a, b) {
  let shared = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (large.has(s)) shared++;
  return shared / (a.size + b.size - shared || 1);
}

export function checkDuplicates({ top } = {}) {
  const sections = fs
    .readdirSync(DIR)
    .flatMap((cat) => fs.readdirSync(path.join(DIR, cat)).map((slug) => ({ slug, file: path.join(DIR, cat, slug, "component.tsx") })))
    .filter((s) => fs.existsSync(s.file))
    .map((s) => ({ ...s, sh: shingles(shape(fs.readFileSync(s.file, "utf8"))) }));

  const pairs = [];
  for (let i = 0; i < sections.length; i++)
    for (let j = i + 1; j < sections.length; j++) {
      const score = similarity(sections[i].sh, sections[j].sh);
      if (score >= 0.5) pairs.push({ a: sections[i].slug, b: sections[j].slug, score });
    }
  pairs.sort((x, y) => y.score - x.score);

  if (top) {
    for (const p of pairs.slice(0, Number(top))) console.log(`${p.score.toFixed(2)}  ${p.a} ↔ ${p.b}`);
    return 0;
  }

  const allow = fs.existsSync(ALLOW_FILE) ? JSON.parse(fs.readFileSync(ALLOW_FILE, "utf8")) : [];
  const allowed = (p) => allow.some((x) => [x.a, x.b].sort().join() === [p.a, p.b].sort().join());
  const flagged = pairs.filter((p) => p.score >= THRESHOLD && !allowed(p));
  console.log(
    `check-duplicates: ${sections.length} sections, most similar pair ${pairs[0] ? `${pairs[0].score.toFixed(2)} (${pairs[0].a} ↔ ${pairs[0].b})` : "none"}`,
  );
  if (flagged.length) {
    console.error(
      `check-duplicates: ${flagged.length} pair(s) at ${THRESHOLD * 100}% or more of the same code shape:\n- ${flagged
        .map((p) => `${p.a} ↔ ${p.b}: ${(p.score * 100).toFixed(0)}%`)
        .join("\n- ")}\nMake the new section different in structure, or add the pair to scripts/duplicates-allow.json with a reason.`,
    );
    return 1;
  }
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { top: { type: "string" } } });
  process.exit(checkDuplicates(values));
}
