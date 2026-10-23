#!/usr/bin/env node
// Every registry section compiled on its own, the way it lands in someone else's project: strict TypeScript
// (including noUncheckedIndexedAccess and exactOptionalPropertyTypes), against React 19 and React 18 types.
// Sections can't import each other (the registry validator forbids it), so one tsc run per React version
// checks each file in isolation. Configs: scripts/compile/.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tsc = path.join(ROOT, "node_modules/.bin/tsc");
let failed = false;

for (const react of ["19", "18"]) {
  const r = spawnSync(tsc, ["-p", `scripts/compile/tsconfig.react${react}.json`], { cwd: ROOT, encoding: "utf8" });
  const errors = [...r.stdout.matchAll(/^registry\/components\/[^/]+\/([^/]+)\/component\.tsx\((\d+),\d+\): error (TS\d+): (.*)$/gm)];
  if (r.status === 0) {
    console.log(`check-components: every section compiles with React ${react} types`);
    continue;
  }
  failed = true;
  const bySection = Map.groupBy(errors, (m) => m[1]);
  console.error(`check-components: ${errors.length} error(s) in ${bySection.size} section(s) with React ${react} types:`);
  for (const [slug, list] of bySection) {
    console.error(`- ${slug}`);
    for (const m of list.slice(0, 5)) console.error(`    line ${m[2]}: ${m[3]} ${m[4]}`);
    if (list.length > 5) console.error(`    … ${list.length - 5} more`);
  }
  if (!errors.length) console.error(r.stdout || r.stderr);
}
process.exit(failed ? 1 : 0);
