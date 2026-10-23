// Fails if any component or template scrolls sideways on a phone.
// Loads every preview page from the static export at a phone width and looks for content wider than
// the viewport. Elements inside a horizontally clipped/scrolling container (carousels, marquees) are
// allowed — those are intentional.
//
// Usage: node scripts/check-mobile.mjs [--width 360] [--only <text>]   (after `next build`)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, "..", "out");
const args = process.argv.slice(2);
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const WIDTH = Number(arg("--width", "360"));
const ONLY = arg("--only", null);
const PORT = 4300 + Math.floor(Math.random() * 500);

if (!fs.existsSync(path.join(OUT, "r", "index.json"))) {
  console.error("check-mobile: no static export found — run the build first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r", "index.json"), "utf8"));
const pages = [
  ...index.templates.map((t) => ({ label: `template ${t.slug}`, url: `/preview/template/${t.slug}` })),
  ...index.components.map((c) => ({ label: `component ${c.slug}`, url: `/preview/${c.slug}` })),
].filter((p) => !ONLY || p.label.includes(ONLY));

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: WIDTH, height: 800 }, reducedMotion: "no-preference" });
const problems = [];

async function measure(page, url) {
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  return page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const clipped = (el) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const o = getComputedStyle(a).overflowX;
        if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") return true;
      }
      return false;
    };
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.right <= W + 1 || getComputedStyle(el).position === "fixed" || clipped(el)) continue;
      offenders.push(
        `<${el.tagName.toLowerCase()} class="${String(el.getAttribute("class") ?? "").slice(0, 70)}"> right edge ${Math.round(r.right)}px`,
      );
    }
    return { scrollWidth: document.documentElement.scrollWidth, width: W, offenders: offenders.slice(0, 3) };
  });
}

let done = 0;
const queue = [...pages];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    const page = await context.newPage();
    for (let p = queue.shift(); p; p = queue.shift()) {
      try {
        const res = await measure(page, p.url);
        if (res.scrollWidth > res.width + 1 || res.offenders.length) problems.push({ ...p, ...res });
      } catch (e) {
        problems.push({ ...p, error: e.message.split("\n")[0] });
      }
      if (++done % 50 === 0) console.log(`check-mobile: ${done}/${pages.length}`);
    }
    await page.close();
  }),
);

await browser.close();
server.close();

if (problems.length) {
  console.error(`check-mobile: ${problems.length} of ${pages.length} pages overflow at ${WIDTH}px:`);
  for (const p of problems.sort((a, b) => a.label.localeCompare(b.label))) {
    console.error(`- ${p.label} (${p.url})${p.error ? ` — ${p.error}` : ` — page is ${p.scrollWidth}px wide`}`);
    for (const o of p.offenders ?? []) console.error(`    ${o}`);
  }
  process.exit(1);
}
console.log(`check-mobile: all ${pages.length} page${pages.length === 1 ? "" : "s"} fit at ${WIDTH}px.`);
