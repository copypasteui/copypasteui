// Removes files from the static export (out/) that only exist to build it, before deploying.
//
// The /og/{site,component,template,theme} pages are rendered so scripts/screenshots.mjs can
// photograph them as 1200×630 share images. Once the JPGs exist (in /og/components, /og/templates,
// /og/themes and /og/site.jpg — note the plurals), nothing links to the render pages, so they and
// their Next.js navigation data are dropped. That is roughly a quarter of all deployed files.
//
// Usage: node scripts/prune-deploy.mjs [outDir]   (run after `npm run screenshots`)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(process.argv[2] ?? path.join(here, "..", "out"));
const og = path.join(out, "og");

const fail = (msg) => {
  console.error(`prune-deploy: ${msg}`);
  process.exit(1);
};
const countFiles = (dir) => {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1), 0);
};

if (!fs.existsSync(path.join(out, "index.html"))) fail(`${out} is not a static export (no index.html). Run the build first.`);
const index = JSON.parse(fs.readFileSync(path.join(out, "r", "index.json"), "utf8"));

// 1. Every share image the pages point at must exist before anything is removed,
//    otherwise screenshots haven't run (or failed) and we'd ship broken link previews.
const images = [
  "og/site.jpg",
  ...index.components.map((c) => `og/components/${c.slug}.jpg`),
  ...index.templates.map((t) => `og/templates/${t.slug}.jpg`),
  ...index.themes.map((t) => `og/themes/${t.slug}.jpg`),
];
const missing = images.filter((f) => !fs.existsSync(path.join(out, f)));
if (missing.length)
  fail(`${missing.length} share images are missing (e.g. ${missing.slice(0, 3).join(", ")}). Run \`npm run screenshots\` first.`);

// 2. Remove the render pages. Singular folder names only — the plural ones hold the images.
const targets = ["component", "template", "theme", "site"].map((d) => path.join(og, d));
for (const f of fs.existsSync(og) ? fs.readdirSync(og) : []) {
  if (/^site\.(html|txt)$/.test(f)) targets.push(path.join(og, f));
}
let removed = 0;
for (const t of targets) {
  if (!fs.existsSync(t)) continue;
  removed += fs.statSync(t).isDirectory() ? countFiles(t) : 1;
  fs.rmSync(t, { recursive: true, force: true });
}
// Next writes a sibling .html/.txt next to each dynamic page folder (e.g. og/component/x.html);
// those live inside the folders removed above, so nothing else is left behind.

// 3. Safety net: the images must all still be there, and no page may link to a removed path.
const stillMissing = images.filter((f) => !fs.existsSync(path.join(out, f)));
if (stillMissing.length) fail(`removed share images by mistake: ${stillMissing.slice(0, 3).join(", ")}`);
const removedRef = /["'(]\/og\/(?:component|template|theme)\/|["'(]\/og\/site["'?#)]/;
const scan = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (e.name.endsWith(".html") && removedRef.test(fs.readFileSync(p, "utf8")))
      fail(`${path.relative(out, p)} links to a removed /og render page`);
  }
};
scan(out);

console.log(
  `prune-deploy: removed ${removed} build-only files from ${path.relative(process.cwd(), out) || "."}; ${images.length} share images kept; ${countFiles(out)} files left to deploy.`,
);
