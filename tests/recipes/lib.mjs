// Shared helpers: read code blocks straight from a recipe, and a tiny expectation table runner.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Every ```lang block in registry/recipes/<slug>.md, in order — the tests run exactly what users copy. */
export function recipeBlocks(slug, lang) {
  const md = fs.readFileSync(path.join(ROOT, "registry", "recipes", `${slug}.md`), "utf8");
  return [...md.matchAll(/```(\w*)\n([\s\S]*?)\n```/g)].filter((m) => !lang || m[1] === lang).map((m) => m[2]);
}

const results = [];
/** Records one check: `allowed` is what the access table says should happen. */
export async function check(who, what, allowed, attempt) {
  let ok;
  let detail = "";
  try {
    ok = await attempt();
  } catch (e) {
    ok = false;
    detail = e.message?.split("\n")[0] ?? String(e);
  }
  const pass = ok === allowed;
  results.push({ who, what, allowed, ok, pass, detail });
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${who.padEnd(9)} ${allowed ? "may   " : "may not"} ${what}${pass ? "" : `  (got ${ok ? "allowed" : "denied"}${detail ? `: ${detail}` : ""})`}`,
  );
}

export function summary(name) {
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${name}: ${results.length - failed.length}/${results.length} access checks behave as the recipe's access table says.`);
  if (failed.length) process.exitCode = 1;
  return { total: results.length, failed };
}
