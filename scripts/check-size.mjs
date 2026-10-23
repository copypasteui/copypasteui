#!/usr/bin/env node
// Size budgets, so a heavy import or a bloated page fails CI instead of slipping out. Run after `npm run build`.
// Every page of the static site: the JavaScript it loads and its HTML, both gzipped (what people download).
// The MCP npm package: packed and unpacked size. Budgets sit a little above today's sizes on purpose.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "apps/web/out");
const KB = 1024;
const BUDGET = {
  pageJs: 215 * KB, // React + Next runtime is ~155 KB of this
  pageHtml: 90 * KB,
  // Mostly the offline registry snapshot, which grows with the library (~2 KB packed per section). Raised
  // 2026-10-22 from 900 KB / 7 MB at 396 sections; raise again with the library, not for code.
  mcpPacked: 1000 * KB,
  mcpUnpacked: 8 * KB * KB,
};

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("check-size: no static export in apps/web/out — run `npm run build` first.");
  process.exit(1);
}

const gz = new Map();
const gzipped = (file) => {
  if (!gz.has(file)) gz.set(file, zlib.gzipSync(fs.readFileSync(file)).length);
  return gz.get(file);
};
const pages = fs
  .readdirSync(OUT, { recursive: true })
  .filter((f) => f.endsWith(".html") && !/^(preview|og)[/\\]/.test(f))
  .map((f) => path.join(OUT, f));

const problems = [];
let worstJs = { size: 0 };
let worstHtml = { size: 0 };
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const scripts = new Set([...html.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]));
  const js = [...scripts].reduce((n, src) => n + gzipped(path.join(OUT, src)), 0);
  const htmlSize = gzipped(page);
  const name = path.relative(OUT, page);
  if (js > worstJs.size) worstJs = { name, size: js };
  if (htmlSize > worstHtml.size) worstHtml = { name, size: htmlSize };
  if (js > BUDGET.pageJs) problems.push(`${name}: ${(js / KB).toFixed(0)} KB of JavaScript (budget ${BUDGET.pageJs / KB} KB)`);
  if (htmlSize > BUDGET.pageHtml) problems.push(`${name}: ${(htmlSize / KB).toFixed(0)} KB of HTML (budget ${BUDGET.pageHtml / KB} KB)`);
}

const [pack] = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts=false"], {
    cwd: path.join(ROOT, "packages/mcp"),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }),
);
if (pack.size > BUDGET.mcpPacked)
  problems.push(`MCP package: ${(pack.size / KB).toFixed(0)} KB packed (budget ${BUDGET.mcpPacked / KB} KB)`);
if (pack.unpackedSize > BUDGET.mcpUnpacked)
  problems.push(`MCP package: ${(pack.unpackedSize / KB / KB).toFixed(1)} MB unpacked (budget ${BUDGET.mcpUnpacked / KB / KB} MB)`);

console.log(
  `check-size: ${pages.length} pages — most JavaScript ${(worstJs.size / KB).toFixed(0)} KB (${worstJs.name}), largest HTML ${(worstHtml.size / KB).toFixed(0)} KB (${worstHtml.name}); MCP package ${(pack.size / KB).toFixed(0)} KB packed, ${(pack.unpackedSize / KB / KB).toFixed(1)} MB unpacked`,
);
if (problems.length) {
  console.error(`check-size: over budget:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
