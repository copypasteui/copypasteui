#!/usr/bin/env node
// Renders every registry section in three themes (its own, Midnight, Sunset) × light and dark, and runs axe
// (WCAG 2.1 A/AA) on each. Fails on: a runtime error, any accessibility violation other than colour contrast,
// or more colour-contrast failures than the section's recorded baseline. A new section starts at zero.
//
// Colour contrast has a baseline because the remaining failures are theme decisions (accent colours used as
// text, inverted panels in dark mode) that need a design pass, not a code fix. The baseline can only go down.
//
// Usage (after `npm run build`):
//   node scripts/check-a11y.mjs                    check everything
//   node scripts/check-a11y.mjs --only olea-hero   one section (substring match)
//   node scripts/check-a11y.mjs --update-baseline  rewrite the baseline after fixing contrast
//   node scripts/check-a11y.mjs --report out.json  also write every contrast failure (colours, ratio, element)
//   node scripts/check-a11y.mjs --baselined        only the sections that have baseline entries
//   node scripts/check-a11y.mjs --themes poster,frost  render in these themes instead of Midnight and Sunset
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const BASELINE_FILE = path.join(WEB, "scripts/a11y-baseline.json");
const AXE = fs.readFileSync(path.resolve(WEB, "../../node_modules/axe-core/axe.min.js"), "utf8");
const MODES = ["light", "dark"];
const PORT = Number(process.env.A11Y_PORT ?? 4351);

const { values } = parseArgs({
  options: {
    only: { type: "string" },
    "update-baseline": { type: "boolean" },
    workers: { type: "string" },
    report: { type: "string" },
    baselined: { type: "boolean" },
    themes: { type: "string" },
  },
});
if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("check-a11y: no static export in apps/web/out — run `npm run build` first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r/index.json"), "utf8"));
const EXTRA_THEMES = values.themes ? values.themes.split(",") : ["midnight", "sunset"];
const baseline = fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8")) : {};

const jobs = index.components
  .filter((c) => !values.only || values.only.split(",").some((o) => c.slug.includes(o)))
  .filter((c) => !values.baselined || baseline[c.slug])
  .flatMap((c) => {
    const own = c.collection ? c.theme : index.defaultTheme;
    return [...new Set([own, ...EXTRA_THEMES])].flatMap((theme) => MODES.map((mode) => ({ slug: c.slug, theme, mode })));
  });

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
// A tall viewport so scroll-triggered sections have played their entrance before axe looks, and reduced
// motion so sections that honour it show their settled state rather than a frame mid-animation.
const context = await browser.newContext({ viewport: { width: 1280, height: 3200 }, reducedMotion: "reduce" });
const results = [];
const queue = [...jobs];
let done = 0;

async function worker() {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (let job = queue.shift(); job; job = queue.shift()) {
    errors.length = 0;
    try {
      await page.goto(`http://localhost:${PORT}/preview/${job.slug}?theme=${job.theme}&mode=${job.mode}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });
      await page.waitForTimeout(1200);
      await page.addScriptTag({ content: AXE });
      const violations = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
        return r.violations.map((v) => ({
          id: v.id,
          help: v.help,
          nodes: v.nodes.map((n) => n.html.slice(0, 140)),
          details:
            v.id === "color-contrast"
              ? v.nodes.map((n) => ({ html: n.html.slice(0, 240), target: n.target.join(" "), ...(n.any[0]?.data ?? {}) }))
              : undefined,
        }));
      });
      results.push({ ...job, violations, errors: [...errors] });
    } catch (e) {
      results.push({ ...job, violations: [], errors: [...errors, `render failed: ${e.message.split("\n")[0]}`] });
    }
    if (++done % 200 === 0) console.log(`check-a11y: ${done}/${jobs.length}`);
  }
  await page.close();
}
const workers = Number(values.workers ?? Math.max(2, Math.min(8, os.cpus().length)));
await Promise.all(Array.from({ length: workers }, worker));
await browser.close();
server.close();

const key = (r) => `${r.theme}:${r.mode}`;
const contrastCount = (r) => r.violations.find((v) => v.id === "color-contrast")?.nodes.length ?? 0;
const problems = [];
const next = values.only ? structuredClone(baseline) : {};
for (const r of results.sort((a, b) => a.slug.localeCompare(b.slug) || key(a).localeCompare(key(b)))) {
  const where = `${r.slug} (${r.theme}, ${r.mode})`;
  for (const e of r.errors) problems.push(`${where}: runtime error — ${e}`);
  for (const v of r.violations.filter((v) => v.id !== "color-contrast"))
    problems.push(`${where}: ${v.id} — ${v.help}\n      ${v.nodes.slice(0, 2).join("\n      ")}`);
  const n = contrastCount(r);
  const allowed = baseline[r.slug]?.[key(r)] ?? 0;
  if (n > allowed) {
    const v = r.violations.find((v) => v.id === "color-contrast");
    problems.push(`${where}: ${n} colour-contrast failure(s), baseline ${allowed}\n      ${v.nodes.slice(0, 2).join("\n      ")}`);
  }
  if (n) (next[r.slug] ??= {})[key(r)] = n;
  else if (next[r.slug]) delete next[r.slug][key(r)];
}

const total = results.reduce((n, r) => n + contrastCount(r), 0);
const clean = results.filter((r) => !r.errors.length && !r.violations.length).length;
console.log(
  `check-a11y: ${results.length} renders (${index.components.length > jobs.length / 6 ? jobs.length / 6 : index.components.length} sections × themes × modes), ${clean} fully clean, ${total} colour-contrast failures in total`,
);

if (values.report) {
  const rows = results.flatMap((r) =>
    (r.violations.find((v) => v.id === "color-contrast")?.details ?? []).map((d) => ({ slug: r.slug, theme: r.theme, mode: r.mode, ...d })),
  );
  fs.writeFileSync(values.report, `${JSON.stringify(rows, null, 1)}\n`);
  console.log(`check-a11y: ${rows.length} contrast failures written to ${values.report}`);
}

if (values["update-baseline"]) {
  for (const s of Object.keys(next)) if (!Object.keys(next[s]).length) delete next[s];
  const sorted = Object.fromEntries(
    Object.keys(next)
      .sort()
      .map((s) => [s, Object.fromEntries(Object.entries(next[s]).sort())]),
  );
  fs.writeFileSync(BASELINE_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`check-a11y: baseline written (${Object.keys(sorted).length} sections with known contrast failures)`);
  const blocking = problems.filter((p) => !p.includes("colour-contrast"));
  if (blocking.length) {
    console.error(`check-a11y: ${blocking.length} problem(s) a baseline can't cover:\n- ${blocking.join("\n- ")}`);
    process.exit(1);
  }
} else if (problems.length) {
  console.error(`check-a11y: ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
