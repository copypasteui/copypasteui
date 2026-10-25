#!/usr/bin/env node
// Renders card thumbnails and full-page template shots from the built site. A maintainer's tool: the images go to
// apps/web/public/thumbs/ (gitignored, and out/ so scripts/previews.mjs can open on them), to upload to
// cdn.copypasteui.dev and link from each item's "images". Nothing here is committed or deployed.
//
//   node scripts/screenshots.mjs                  everything
//   node scripts/screenshots.mjs --missing        only images that don't exist yet
//   node scripts/screenshots.mjs --only hero      only slugs containing "hero"
//   node scripts/screenshots.mjs --check          render every section, template and theme without saving
//
// Fails if any page throws while rendering; CI runs --check as a quick render test for everything.
//
// Uses Playwright's Chromium (npx playwright install chromium) or CHROME_PATH.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const PUBLIC = path.join(WEB, "public");
const PORT = Number(process.env.SCREENSHOT_PORT ?? 4319);
const BASE = `http://localhost:${PORT}`;
const CONCURRENCY = Number(process.env.SCREENSHOT_CONCURRENCY ?? 4);
const args = process.argv.slice(2);
const missingOnly = args.includes("--missing");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const checkOnly = args.includes("--check");

if (!fs.existsSync(path.join(OUT, "r", "index.json"))) {
  console.error("apps/web/out is missing — run `npm run build` first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r", "index.json"), "utf8"));
const showcaseTemplate = index.templates.find((t) => t.slug === "ledger-accountants") ?? index.templates[0];

/** @type {{ file: string, url: string, width: number, height: number, scale?: number, full?: boolean, wait?: number, click?: string }[]} */
const jobs = [];
const add = (job) => {
  if (only && !job.file.includes(only)) return;
  if (missingOnly && fs.existsSync(path.join(PUBLIC, job.file))) return;
  if (checkOnly && job.full) return;
  jobs.push(job);
};

// Small components (buttons, logo strips) render in a smaller viewport so they fill the card.
const thumbViewport = { buttons: [720, 450], logos: [960, 600] };
// Banners are a thin strip on an empty page; a small viewport makes them readable on the card.
const thumbViewportBySlug = {
  "closed-banner": [640, 400],
  "cookie-banner": [640, 400],
  "mobile-action-bar": [480, 300],
  "whatsapp-chat-button": [640, 400],
};
// Widgets that start closed are shot open, by clicking this element first.
const thumbClickBySlug = { "whatsapp-chat-button": "button[aria-expanded]" };
for (const c of index.components) {
  const [width, height] = thumbViewportBySlug[c.slug] ?? thumbViewport[c.category] ?? [1280, 800];
  add({
    file: `thumbs/components/${c.slug}.jpg`,
    url: `/preview/${c.slug}?theme=${c.theme ?? index.defaultTheme}&frame=thumb`,
    width,
    height,
    scale: 1280 / width,
    click: thumbClickBySlug[c.slug],
  });
}
for (const t of index.templates) {
  add({ file: `thumbs/templates/${t.slug}.jpg`, url: `/preview/template/${t.slug}`, width: 1440, height: 900, scale: 0.75 });
  add({
    file: `thumbs/templates/${t.slug}-full.jpg`,
    url: `/preview/template/${t.slug}`,
    width: 1440,
    height: 900,
    scale: 0.6,
    full: true,
    wait: 3500,
  });
}
for (const t of index.themes) {
  add({
    file: `thumbs/themes/${t.slug}.jpg`,
    url: `/preview/template/${showcaseTemplate.slug}?theme=${t.slug}`,
    width: 1440,
    height: 900,
    scale: 0.75,
  });
}
async function waitForImages(page) {
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 20_000 }).catch(() => {});
}

async function shoot(browser, job) {
  const context = await browser.newContext({
    viewport: { width: job.width, height: job.height },
    deviceScaleFactor: job.scale ?? 1,
    // Full-page shots ask for reduced motion: a theme's scroll motion starts below-the-fold content hidden until it
    // scrolls into view, and the capture never scrolls it in, so those sections would come out blank.
    reducedMotion: job.full ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  // Any uncaught error while rendering fails the job, so this doubles as a render test.
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  try {
    await page.goto(BASE + job.url, { waitUntil: checkOnly ? "load" : "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    if (job.full) {
      // Scroll through like a visitor so lazy images load and whileInView reveals fire,
      // then return to the top. The viewport keeps its normal height, so 100vh heroes stay sane.
      await page.evaluate(async () => {
        const step = Math.round(window.innerHeight * 0.6);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 140));
        }
        window.scrollTo(0, 0);
      });
    }
    if (checkOnly) {
      await page.waitForTimeout(400);
      if (errors.length) throw new Error(`runtime error: ${errors[0]}`);
      return null;
    }
    await waitForImages(page);
    if (job.click) await page.click(job.click);
    await page.waitForTimeout(job.wait ?? 2600);
    if (errors.length) throw new Error(`runtime error: ${errors[0]}`);
    const buffer = await page.screenshot({ type: "jpeg", quality: 82, fullPage: Boolean(job.full) });
    for (const root of [OUT, PUBLIC]) {
      const file = path.join(root, job.file);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, buffer);
    }
    return null;
  } catch (err) {
    return `${job.file}: ${err.message.split("\n")[0]}`;
  } finally {
    await context.close();
  }
}

async function run(browser, list, label) {
  let done = 0;
  const failures = [];
  const queue = [...list];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        const err = await shoot(browser, job);
        if (err) failures.push(err);
        done++;
        if (process.stdout.isTTY) process.stdout.write(`\r${label}: ${done}/${list.length}`);
        else if (done === list.length || done % 25 === 0) console.log(`${label}: ${done}/${list.length}`);
      }
    }),
  );
  if (list.length && process.stdout.isTTY) process.stdout.write("\n");
  return failures;
}

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
try {
  const failures = await run(browser, jobs, checkOnly ? "rendered" : "thumbnails");
  if (failures.length) {
    console.error(`\n${failures.length} page(s) failed:\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  } else if (checkOnly) {
    console.log(`Rendered ${jobs.length} pages without errors`);
  } else {
    console.log(`Wrote ${jobs.length} images to apps/web/public/thumbs. Upload them to cdn.copypasteui.dev at the same paths.`);
  }
} finally {
  await browser.close();
  server.close();
}
