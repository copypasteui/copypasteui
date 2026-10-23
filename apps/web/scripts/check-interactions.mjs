#!/usr/bin/env node
// Exercises every registry section that has state, the way a visitor would: clicks each button, tab, toggle
// and disclosure, fills form fields with plausible values and submits. Fails on:
//   - a runtime error or console error during any of it
//   - a form that reloads or leaves the page when submitted (components must handle submit themselves)
//   - a section with click/change/submit handlers where nothing on the page changes after all of it
// Run after `npm run build`:  node scripts/check-interactions.mjs [--only <slug>]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const REGISTRY = path.resolve(WEB, "../../registry/components");
const PORT = Number(process.env.INTERACTIONS_PORT ?? 4361);
const MAX_CONTROLS = 30;
// Generous: with several workers in parallel, pages can be slow to settle.
const CLICK_TIMEOUT = 5000;
const CONTROLS =
  'button:not([disabled]):not([type="submit"]), [role="tab"], [role="switch"], [role="radio"], [role="checkbox"], input[type="checkbox"], input[type="radio"], summary, [aria-expanded]:not(a)';

const { values } = parseArgs({ options: { only: { type: "string" } } });
if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("check-interactions: no static export in apps/web/out — run `npm run build` first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r/index.json"), "utf8"));
const source = (c) => fs.readFileSync(path.join(REGISTRY, c.category, c.slug, "component.tsx"), "utf8");
const sections = index.components
  .filter((c) => !values.only || values.only.split(",").some((o) => c.slug.includes(o)))
  .map((c) => ({ ...c, code: source(c) }))
  .filter((c) => /\buse(State|Reducer)\b/.test(c.code))
  .map((c) => ({ slug: c.slug, theme: c.collection ? c.theme : index.defaultTheme, handlers: /\bon(Click|Change|Submit)=/.test(c.code) }));

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const context = await browser.newContext({ viewport: { width: 1280, height: 2400 } });
const problems = [];
const queue = [...sections];
let clicked = 0;
let submitted = 0;

/** Plausible values by field type, so required fields and pattern checks pass. */
async function fillForm(form) {
  const fields = form.locator(
    "input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=submit]):not([disabled]), textarea, select",
  );
  for (let i = 0; i < (await fields.count()); i++) {
    const f = fields.nth(i);
    if (!(await f.isVisible())) continue;
    const tag = await f.evaluate((el) => el.tagName.toLowerCase());
    const type = ((await f.getAttribute("type")) ?? "text").toLowerCase();
    if (tag === "select") {
      const options = await f.locator("option").evaluateAll((os) => os.map((o) => o.value).filter(Boolean));
      if (options.length) await f.selectOption(options[options.length > 1 ? 1 : 0]);
      continue;
    }
    const value =
      { email: "sam@example.com", tel: "01632 960123", number: "2", url: "https://example.com", date: "2030-06-14", time: "10:30" }[type] ??
      (tag === "textarea" ? "Two of us, a window table if possible." : "Sam Taylor");
    await f.fill(value).catch(() => {});
  }
}

async function worker() {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("dialog", (d) => d.dismiss());
  for (let s = queue.shift(); s; s = queue.shift()) {
    errors.length = 0;
    const url = `http://localhost:${PORT}/preview/${s.slug}?theme=${s.theme}`;
    const where = s.slug;
    try {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });
      await page.waitForTimeout(600);
      // Count DOM changes from here on (attributes, text, nodes) to see whether anything reacts.
      await page.evaluate(() => {
        window.__mutations = 0;
        new MutationObserver((list) => (window.__mutations += list.length)).observe(document.querySelector("main"), {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true,
        });
      });
      const controls = page.locator(`main :is(${CONTROLS})`);
      const n = Math.min(await controls.count(), MAX_CONTROLS);
      for (let i = 0; i < n; i++) {
        const c = controls.nth(i);
        if (!(await c.isVisible().catch(() => false))) continue;
        if (await c.evaluate((el) => !!el.closest("a[href]:not([href^='#'])"))) continue;
        // Constantly animated controls never settle, so fall back to a plain click at their centre.
        await c
          .click({ timeout: CLICK_TIMEOUT })
          .catch(() => c.click({ timeout: CLICK_TIMEOUT, force: true }))
          .then(
            () => clicked++,
            () => {},
          );
        if (page.url() !== url) {
          problems.push(`${where}: clicking a control left the page (${page.url()})`);
          await page.goto(url, { waitUntil: "networkidle" });
          break;
        }
      }
      // Fields outside forms: search boxes, sliders, reply boxes.
      const loose = page.locator(
        "main :is(input, textarea, select):not(form *):not([type=hidden]):not([type=checkbox]):not([type=radio]):not([disabled])",
      );
      for (let i = 0; i < Math.min(await loose.count(), MAX_CONTROLS); i++) {
        const f = loose.nth(i);
        if (!(await f.isVisible().catch(() => false))) continue;
        const type = ((await f.getAttribute("type")) ?? "").toLowerCase();
        const tag = await f.evaluate((el) => el.tagName.toLowerCase());
        if (type === "range")
          await f.evaluate((el) => {
            // To whichever end it isn't at, so the value always changes.
            const min = Number(el.min || 0);
            const max = Number(el.max || 100);
            const target = Number(el.value) === min ? max : min;
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, String(target));
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          });
        else if (tag === "select") {
          const options = await f.locator("option").evaluateAll((os) => os.map((o) => o.value));
          if (options.length > 1) await f.selectOption(options[1]);
        } else await f.fill(tag === "textarea" ? "Thank you, see you soon." : "a").catch(() => {});
      }

      const forms = page.locator("main form");
      for (let i = 0; i < (await forms.count()); i++) {
        const form = forms.nth(i);
        if (!(await form.isVisible().catch(() => false))) continue;
        await fillForm(form);
        const submit = form.locator('button[type="submit"], button:not([type]), input[type="submit"]').last();
        if (!(await submit.count())) continue;
        await submit.click({ timeout: CLICK_TIMEOUT }).then(
          () => submitted++,
          () => {},
        );
        await page.waitForTimeout(300);
        if (page.url().split("?")[0] !== url.split("?")[0] || (await page.evaluate(() => window.__mutations === undefined))) {
          problems.push(`${where}: submitting the form reloads or leaves the page — call preventDefault and show a result`);
          break;
        }
      }
      await page.waitForTimeout(300);
      let mutations = await page.evaluate(() => window.__mutations ?? 0);
      // Motion animates with the Web Animations API, so the DOM only changes when an animation ends (e.g. an
      // AnimatePresence exit before the new content mounts). Give it time before deciding nothing reacted.
      if (s.handlers && mutations === 0) {
        await page.waitForTimeout(1200);
        mutations = await page.evaluate(() => window.__mutations ?? 0);
      }
      // Phone-only controls (menu buttons hidden on desktop): try again at phone width before reporting.
      if (s.handlers && mutations === 0) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForSelector("main");
        await page.evaluate(() => {
          window.__mutations = 0;
          new MutationObserver((l) => (window.__mutations += l.length)).observe(document.querySelector("main"), {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true,
          });
        });
        const phone = page.locator(`main :is(${CONTROLS})`);
        for (let i = 0; i < Math.min(await phone.count(), MAX_CONTROLS); i++)
          await phone
            .nth(i)
            .click({ timeout: CLICK_TIMEOUT })
            .then(
              () => clicked++,
              () => {},
            );
        await page.waitForTimeout(300);
        mutations = await page.evaluate(() => window.__mutations ?? 0);
        await page.setViewportSize({ width: 1280, height: 2400 });
      }
      if (s.handlers && mutations === 0) problems.push(`${where}: has click/change/submit handlers, but nothing on the page changed`);
      for (const e of errors) problems.push(`${where}: runtime error — ${e}`);
    } catch (e) {
      problems.push(`${where}: could not exercise — ${e.message.split("\n")[0]}`);
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: Number(process.env.INTERACTIONS_WORKERS ?? Math.max(2, Math.min(8, os.cpus().length))) }, worker));
await browser.close();
server.close();

console.log(`check-interactions: ${sections.length} sections with state, ${clicked} clicks, ${submitted} form submits`);
if (problems.length) {
  console.error(`check-interactions: ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
