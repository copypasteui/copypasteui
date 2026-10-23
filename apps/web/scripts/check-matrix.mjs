#!/usr/bin/env node
// The theme-style matrix: renders sections under pairwise combinations of theme style (shadow, border, surface,
// texture, motion), palette, light/dark, viewport and reduced motion, so every pair of settings is tried at least
// once. Bugs live in pairs (glass × dark mode, lively motion × phone width, faded text × inverted panels), and
// pairwise covers them in a few dozen renders instead of thousands. Cases come from scripts/pairwise.mjs with a
// fixed seed, so a failure reproduces exactly.
//
// Each case runs twice. First with motion on, at the viewport's real height, scrolling down the page: it must
// never scroll sideways (entrance animations start offset or zoomed, which is where overflow hides) and must
// throw no runtime errors. Then reloaded with reduced motion in a tall window, where axe (WCAG 2.1 A/AA) checks
// the settled page, because mid-animation frames would report false contrast failures.
//
// Usage (after `npm run build`):
//   node scripts/check-matrix.mjs                      library: section traits × styles (one section per case)
//   node scripts/check-matrix.mjs --section <slug>     one section under pairwise styles (for a new section)
//   node scripts/check-matrix.mjs --theme <slug>       one theme's palette and style across traits (for a new theme)
//   node scripts/check-matrix.mjs --plan               print the cases without rendering
//   node scripts/check-matrix.mjs --report out.md      also write the case table with results
//   node scripts/check-matrix.mjs --seed 2             a different (still repeatable) set of cases
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright-core";
import { styleRules, styleVars } from "../../../scripts/build-registry.mjs";
import { caseTable, pairwise } from "../../../scripts/pairwise.mjs";
import { sectionTraits } from "../../../scripts/section-traits.mjs";
import { serveStatic } from "./serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const AXE = fs.readFileSync(path.resolve(WEB, "../../node_modules/axe-core/axe.min.js"), "utf8");
const PORT = Number(process.env.MATRIX_PORT ?? 4361);

const { values } = parseArgs({
  options: {
    section: { type: "string" },
    theme: { type: "string" },
    plan: { type: "boolean" },
    report: { type: "string" },
    seed: { type: "string" },
    workers: { type: "string" },
  },
});
const seed = Number(values.seed ?? 1);
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r/index.json"), "utf8"));
const themes = new Map(index.themes.map((t) => [t.slug, t]));

// Four palettes that pull in different directions: neutral light, warm vivid, cool blue and dark luxury.
const PALETTES = ["paper", "sunset", "ocean", "noir"];
const VIEWPORTS = { phone: [360, 780], tablet: [768, 1024], desktop: [1280, 800] };
const STYLE = [
  { name: "shadow", values: ["soft", "hard", "clay", "neu", "none"] },
  { name: "border", values: ["0px", "1px", "2px", "3px"] },
  { name: "surface", values: ["solid", "glass"] },
  { name: "texture", values: ["none", "grain", "dots", "grid"] },
  { name: "motion", values: ["none", "subtle", "lively"] },
];
const ENV = [
  { name: "mode", values: ["light", "dark"] },
  { name: "viewport", values: Object.keys(VIEWPORTS) },
];
// The same rule the theme validator enforces.
const allowed = (c) => !(c.surface === "glass" && (c.texture === "dots" || c.texture === "grid"));

const traits = sectionTraits();
// Sections with the trait, richest first: one that also has other traits probes more per render.
const withTrait = (t) =>
  Object.keys(traits)
    .filter((s) => (t === "plain" ? !traits[s].traits.length : traits[s].traits.includes(t)))
    .sort((a, b) => traits[b].traits.length - traits[a].traits.length || a.localeCompare(b));
const TRAIT_VALUES = ["photo", "inverted", "faded", "fixed-dark", "canvas", "panels", "muted-panel", "form", "plain"];

let params;
let fixed = {};
if (values.section) {
  if (!traits[values.section]) throw new Error(`check-matrix: no section "${values.section}"`);
  params = [{ name: "palette", values: PALETTES }, ...STYLE, ...ENV];
  fixed = { section: values.section };
} else if (values.theme) {
  const t = themes.get(values.theme);
  if (!t) throw new Error(`check-matrix: no theme "${values.theme}"`);
  params = [{ name: "trait", values: TRAIT_VALUES }, ...ENV];
  fixed = { palette: t.slug, ...t.style };
} else {
  params = [{ name: "trait", values: TRAIT_VALUES }, { name: "palette", values: PALETTES }, ...STYLE, ...ENV];
}
const cases = pairwise(params, { allowed: (c) => allowed({ ...fixed, ...c }), seed }).map((c, n) => {
  const full = { ...fixed, ...c };
  if (!full.section) {
    // Spread cases over the sections that have the trait, so repeated runs don't keep testing the same one.
    // Rotate through the richest dozen, so repeated cases and seeds don't keep testing the same section.
    const pool = withTrait(full.trait).slice(0, 12);
    full.section = pool[(n * 5 + seed) % pool.length];
  }
  return full;
});

if (values.plan) {
  console.log(caseTable([...params, { name: "section" }], cases));
  console.log(`\ncheck-matrix: ${cases.length} cases cover every pair of ${params.map((p) => p.name).join(", ")}.`);
  process.exit(0);
}
if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("check-matrix: no static export in apps/web/out — run `npm run build` first.");
  process.exit(1);
}

/** The probe theme: a real palette with the case's style laid over it. */
const probe = (c) => {
  const style = { shadow: c.shadow, border: c.border, surface: c.surface, texture: c.texture, motion: c.motion };
  const theme = { style };
  return { vars: styleVars(theme), rules: styleRules(theme) };
};

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const results = [];
const queue = cases.map((c, n) => ({ ...c, n: n + 1 }));

const applyProbe = (page, c) =>
  page.evaluate(({ vars, rules }) => {
    for (const [k, v] of Object.entries(vars)) document.documentElement.style.setProperty(k, v);
    const el =
      document.getElementById("cpui-style-rules") ??
      document.head.appendChild(Object.assign(document.createElement("style"), { id: "cpui-style-rules" }));
    el.textContent = rules;
  }, probe(c));

async function worker() {
  for (let c = queue.shift(); c; c = queue.shift()) {
    const [width, height] = VIEWPORTS[c.viewport];
    const url = `http://localhost:${PORT}/preview/${c.section}?theme=${c.palette}&mode=${c.mode}`;
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const problems = [];
    try {
      // 1. Motion on, real window: scroll down and note the widest the page gets.
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });
      await applyProbe(page, c);
      await page.waitForTimeout(600);
      const over = await page.evaluate(async () => {
        let worst = null;
        const measure = () => {
          const w = document.documentElement.scrollWidth - window.innerWidth;
          if (w > 1 && (!worst || w > worst.w)) {
            const wide = [...document.querySelectorAll("body *")].find((e) => e.getBoundingClientRect().right > window.innerWidth + 1);
            worst = { w, el: wide ? `<${wide.tagName.toLowerCase()} class="${String(wide.className).slice(0, 80)}">` : "" };
          }
        };
        const step = Math.round(window.innerHeight * 0.5);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
          measure();
        }
        return worst && `${worst.w}px wider than the window ${worst.el}`;
      });
      if (over) problems.push(`scrolls sideways at ${width}px: ${over}`);
      // 2. Reduced motion, tall window: the settled page under axe.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 3200 });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });
      await applyProbe(page, c);
      // Entrance fades still run under reduced motion (Motion keeps opacity), so let every finite animation
      // finish first; a fixed pause measures some sections mid-fade. Endless loops (marquees, spinners) are ignored.
      await page
        .waitForFunction(
          () => document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getComputedTiming().iterations === Infinity),
          null,
          { timeout: 8000, polling: 200 },
        )
        .catch(() => {});
      await page.waitForTimeout(300);
      await page.addScriptTag({ content: AXE });
      const violations = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
        return r.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.html.slice(0, 110) ?? ""}`);
      });
      problems.push(...violations);
    } catch (e) {
      problems.push(`render failed: ${e.message.split("\n")[0]}`);
    }
    problems.push(...errors.map((e) => `runtime error: ${e}`));
    results.push({ ...c, problems });
    await context.close();
  }
}
await Promise.all(Array.from({ length: Number(values.workers ?? Math.max(2, Math.min(6, os.cpus().length))) }, worker));
await browser.close();
server.close();

results.sort((a, b) => a.n - b.n);
const failed = results.filter((r) => r.problems.length);
const describe = (r) =>
  `#${r.n} ${r.section} · ${r.palette} ${r.mode} · ${r.viewport} · shadow ${r.shadow}, border ${r.border}, ${r.surface}, texture ${r.texture}, motion ${r.motion}`;

if (values.report) {
  const table = caseTable([...params, { name: "section" }], results, [
    { name: "result", value: (r) => (r.problems.length ? `✗ ${r.problems[0].split(":")[0]}` : "✓") },
  ]);
  fs.writeFileSync(values.report, `# Theme-style matrix (seed ${seed})\n\n${table}\n`);
  console.log(`check-matrix: case table written to ${values.report}`);
}
console.log(`check-matrix: ${results.length} pairwise cases (seed ${seed}), ${results.length - failed.length} clean.`);
if (failed.length) {
  console.error(
    `check-matrix: ${failed.length} case(s) failed:\n${failed.map((r) => `- ${describe(r)}\n    ${r.problems.slice(0, 3).join("\n    ")}`).join("\n")}`,
  );
  process.exit(1);
}
