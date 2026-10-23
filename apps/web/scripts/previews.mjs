#!/usr/bin/env node
// Records the short looping videos that play on template and section cards, so the grids show motion
// the way the pages do. A maintainer's tool: CI never runs it. Run after `next build` and
// `npm run screenshots` (each recording opens on its card thumbnail). Videos are WebM (VP8), written to
// apps/web/public/thumbs/ (gitignored) next to the thumbnails, ready to upload to cdn.copypasteui.dev and link
// from the item's "images.preview". The recorder can't trim, so the link ends in #t=<seconds> where the page had
// painted (also kept in thumbs/previews.json): cards start and loop from there, never from the blank frames.
//
//   node scripts/previews.mjs                  everything
//   node scripts/previews.mjs --missing        only videos that don't exist yet
//   node scripts/previews.mjs --only hero      only slugs containing "hero"
//
// Uses Playwright's Chromium (npx playwright install chromium) or CHROME_PATH.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const PUBLIC = path.join(WEB, "public");
const PORT = Number(process.env.PREVIEW_PORT ?? 4329);
const BASE = `http://localhost:${PORT}`;
const CONCURRENCY = Number(process.env.PREVIEW_CONCURRENCY ?? 4);
// Recorded at half the page size: sharp enough for a card, small enough to stream a grid of them.
const VIEWPORT = { width: 1280, height: 800 };
const VIDEO = { width: 640, height: 400 };
const args = process.argv.slice(2);
const missingOnly = args.includes("--missing");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

if (!fs.existsSync(path.join(OUT, "r", "index.json"))) {
  console.error("apps/web/out is missing — run `npm run build` first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r", "index.json"), "utf8"));

/** @type {{ file: string, poster: string, url: string, scroll: number }[]} */
const jobs = [];
const add = (job) => {
  if (only && !job.file.includes(only)) return;
  if (missingOnly && fs.existsSync(path.join(PUBLIC, job.file))) return;
  jobs.push(job);
};
// Templates scroll through the whole page; sections play their own motion with a short scroll if they're tall.
for (const t of index.templates) {
  add({
    file: `thumbs/templates/${t.slug}.webm`,
    poster: `/thumbs/templates/${t.slug}.jpg`,
    url: `/preview/template/${t.slug}`,
    scroll: 9000,
  });
}
// Small, static pieces (buttons, logo strips, banners) gain nothing from a video. Backgrounds always move,
// usually on canvas or WebGL rather than through Motion, so they're always recorded.
const STILL = new Set(["buttons", "logos", "admin"]);
for (const c of index.components) {
  if (STILL.has(c.category) || (c.category !== "background" && !c.dependencies?.motion)) continue;
  add({
    file: `thumbs/components/${c.slug}.webm`,
    poster: `/thumbs/components/${c.slug}.jpg`,
    url: `/preview/${c.slug}?theme=${c.theme ?? index.defaultTheme}&frame=thumb`,
    scroll: 4200,
  });
}

async function record(browser, job, tmp) {
  const dir = fs.mkdtempSync(path.join(tmp, "rec-"));
  const context = await browser.newContext({
    viewport: VIEWPORT,
    reducedMotion: "no-preference",
    recordVideo: { dir, size: VIDEO },
  });
  const page = await context.newPage();
  const startedAt = Date.now();
  try {
    // Open on the card's own thumbnail, then navigate: Chromium keeps the old frame until the page
    // paints, so the video starts on the thumbnail instead of a blank page.
    await page.setContent(`<body style="margin:0;background:#fff url('${BASE}${job.poster}') top/cover no-repeat;height:100vh"></body>`, {
      waitUntil: "load",
    });
    await page.goto(BASE + job.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    // Only the first screen matters for the opening frame; lazy images further down load as it scrolls.
    await page
      .waitForFunction(
        () => [...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight).every((i) => i.complete),
        null,
        {
          timeout: 3000,
        },
      )
      .catch(() => {});
    const start = Math.round((Date.now() - startedAt + 200) / 100) / 10;
    await page.waitForTimeout(1200);
    // Scroll down and back at a reading pace, so scroll-driven effects play out.
    await page.evaluate(async (duration) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < 40) return new Promise((r) => setTimeout(r, duration));
      const down = duration * 0.8;
      const start = performance.now();
      await new Promise((resolve) => {
        const step = (now) => {
          const t = Math.min(1, (now - start) / down);
          const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
          window.scrollTo(0, eased * max);
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo({ top: 0, behavior: "smooth" });
      await new Promise((r) => setTimeout(r, duration * 0.2));
    }, job.scroll);
    const video = page.video();
    await context.close();
    const src = await video.path();
    const file = path.join(PUBLIC, job.file);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.copyFileSync(src, file);
    starts[job.file.replace(/^thumbs\//, "").replace(/\.webm$/, "")] = start;
    return null;
  } catch (err) {
    await context.close().catch(() => {});
    return `${job.file}: ${err.message.split("\n")[0]}`;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const MANIFEST = "thumbs/previews.json";
const readManifest = (root) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, MANIFEST), "utf8"));
  } catch {
    return {};
  }
};
/** "templates/olea-restaurant" → seconds into the video where the page has painted. */
const starts = readManifest(PUBLIC);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-previews-"));
const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
try {
  let done = 0;
  const failures = [];
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        const err = await record(browser, job, tmp);
        if (err) failures.push(err);
        done++;
        if (process.stdout.isTTY) process.stdout.write(`\rpreviews: ${done}/${jobs.length}`);
        else if (done === jobs.length || done % 25 === 0) console.log(`previews: ${done}/${jobs.length}`);
      }
    }),
  );
  if (jobs.length && process.stdout.isTTY) process.stdout.write("\n");
  fs.mkdirSync(path.join(PUBLIC, "thumbs"), { recursive: true });
  fs.writeFileSync(path.join(PUBLIC, MANIFEST), JSON.stringify(starts, null, 1));
  if (failures.length) {
    console.error(`\n${failures.length} preview(s) failed:\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  } else {
    console.log(`Wrote ${jobs.length} preview videos to apps/web/public/thumbs. Upload them, then link each one with its start:`);
    for (const job of jobs) console.log(`  ${job.file}#t=${starts[job.file.replace(/^thumbs\//, "").replace(/\.webm$/, "")]}`);
  }
} finally {
  await browser.close();
  server.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
