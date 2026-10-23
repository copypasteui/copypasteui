// Reports components that look machine-made (see design-lint.mjs for the rules).
// Usage: node scripts/check-design.mjs [--only <text>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ADVICE, designTells } from "./design-lint.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = path.join(ROOT, "registry", "components");
const args = process.argv.slice(2);
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

const byRule = new Map();
let files = 0;
let flagged = 0;
let advised = 0;
for (const category of fs.readdirSync(COMPONENTS).sort()) {
  const catDir = path.join(COMPONENTS, category);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const slug of fs.readdirSync(catDir).sort()) {
    const file = path.join(catDir, slug, "component.tsx");
    if (!fs.existsSync(file) || (ONLY && !slug.includes(ONLY))) continue;
    files++;
    const tells = designTells(fs.readFileSync(file, "utf8"));
    if (!tells.length) continue;
    if (tells.some((t) => !ADVICE.has(t.rule))) flagged++;
    else advised++;
    console.log(`${category}/${slug}`);
    for (const t of tells) {
      console.log(`  ${ADVICE.has(t.rule) ? "advice · " : ""}${t.rule}: ${t.detail}`);
      byRule.set(t.rule, (byRule.get(t.rule) ?? 0) + 1);
    }
  }
}
console.log(
  `\ncheck-design: ${flagged} of ${files} components flagged${advised ? `, ${advised} more with advice only` : ""}${byRule.size ? ` — ${[...byRule].map(([r, n]) => `${r} ${n}`).join(", ")}` : ""}`,
);
process.exit(flagged ? 1 : 0);
