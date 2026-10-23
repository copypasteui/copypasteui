// Finds layout problems a person would see but the other checks miss, on every template and section at phone,
// tablet and desktop widths:
//   hidden    text, images or controls still invisible after being scrolled to the middle of the screen
//             (opacity ~0, clipped away or visibility: hidden), e.g. a scroll reveal that never runs
//   wraps     a short link or button label ("Our wines", "Shop wines") broken over two lines
//   overlaps  two links or buttons covering each other, e.g. a badge over a header button
// Hover-only overlays and content in clipped carousels are left alone. Findings a reviewer accepted are listed, with
// the reason, in scripts/layout-allow.json. Writes the rest to out/check-layout.json and exits non-zero if there are any.
//
// Usage: node scripts/check-layout.mjs [--only <text>] [--widths 375,768,1280]   (after `next build`)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { serveStatic } from "./serve.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, "..", "out");
const args = process.argv.slice(2);
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const ONLY = arg("--only", null);
const WIDTHS = arg("--widths", "375,768,1280").split(",").map(Number);
const CONCURRENCY = Number(process.env.LAYOUT_CONCURRENCY ?? 4);
const PORT = 4300 + Math.floor(Math.random() * 500);
const ALLOW = JSON.parse(fs.readFileSync(path.join(here, "layout-allow.json"), "utf8"));
const allowed = (f) => ALLOW.some((a) => a.kind === f.kind && f.what.includes(a.what));

if (!fs.existsSync(path.join(OUT, "r", "index.json"))) {
  console.error("check-layout: no static export found — run the build first.");
  process.exit(1);
}
const index = JSON.parse(fs.readFileSync(path.join(OUT, "r", "index.json"), "utf8"));
const pages = [
  ...index.templates.map((t) => ({ label: `template ${t.slug}`, url: `/preview/template/${t.slug}` })),
  ...index.components.map((c) => ({ label: `component ${c.slug}`, url: `/preview/${c.slug}` })),
].filter((p) => !ONLY || ONLY.split(",").some((o) => p.label.includes(o)));

/**
 * Runs in the page: looks at the elements near the middle of the screen at the current scroll position. Labels that
 * wrap are reported straight away; hidden elements are remembered, and only reported (by `stillHidden`) if they were
 * never seen visible at any scroll position, so scroll-linked reveals that run later aren't flagged.
 */
function inspect(seen) {
  window.__visibility ??= new Map();
  const vh = innerHeight;
  const vw = document.documentElement.clientWidth;
  const name = (el) => {
    const text = (el.getAttribute("alt") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `<${el.tagName.toLowerCase()}>${text ? ` "${text}"` : ""}`;
  };
  // Hover and focus overlays start invisible on purpose.
  const hoverOnly = (el) => {
    for (let a = el, i = 0; a && i < 6; a = a.parentElement, i++) {
      const c = String(a.getAttribute?.("class") ?? "");
      if (/(group-hover|hover|group-focus|focus-within|peer-\w+):(opacity|visible|block|flex|translate|clip)/.test(c)) return true;
    }
    return false;
  };
  const hiddenWhy = (el) => {
    let opacity = 1;
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.visibility === "hidden") return "visibility: hidden";
      opacity *= Number(s.opacity);
      const clip = s.clipPath;
      // inset(...) with a 100% side and no negative values clips the element away entirely.
      if (/^inset\(/.test(clip) && !clip.includes("-") && /\b100%/.test(clip)) return `clip-path: ${clip}`;
      if (a.getAttribute("aria-hidden") === "true" && a !== el) return null;
    }
    return opacity < 0.05 ? `opacity ${opacity.toFixed(2)}` : null;
  };
  const found = [];
  const els = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,a,button,img,input,label,td,blockquote,figcaption");
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    const mid = r.top + r.height / 2;
    // The middle of the screen, where scroll reveals have run; from the very top on the first screen, for headers.
    if (mid < (scrollY === 0 ? 0 : vh * 0.2) || mid > vh * 0.8 || r.right < 0 || r.left > vw) continue;
    if (el.tagName !== "IMG" && !(el.textContent || "").trim() && !["INPUT", "BUTTON"].includes(el.tagName)) continue;
    if (hoverOnly(el)) continue;
    // Native inputs hidden behind a custom control, and stacked images that crossfade, are invisible on purpose.
    if (el.tagName === "INPUT" && (["radio", "checkbox", "range"].includes(el.type) || /opacity-0|sr-only/.test(el.className))) continue;
    if (
      el.tagName === "IMG" &&
      getComputedStyle(el).position === "absolute" &&
      el.parentElement?.querySelectorAll(":scope > img, :scope > * > img").length > 1
    )
      continue;
    const why = hiddenWhy(el);
    const state = window.__visibility.get(el) ?? { visible: false, why: null, what: name(el) };
    if (why) state.why = why;
    else state.visible = true;
    window.__visibility.set(el, state);
    const key = `${el.tagName}:${Math.round(r.top + scrollY)}:${Math.round(r.left)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    // A short label broken over two lines.
    if ((el.tagName === "A" || el.tagName === "BUTTON") && getComputedStyle(el).whiteSpace !== "nowrap") {
      const text = (el.textContent || "").trim().replace(/\s+/g, " ");
      const words = text.split(" ").length;
      if (words >= 2 && words <= 3 && text.length <= 24) {
        // One piece of text broken over lines. Labels built from stacked parts (a name over a price) aren't wraps.
        let lines = 1;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          const lineHeight = parseFloat(getComputedStyle(n.parentElement).fontSize) * 0.6;
          const tops = [...range.getClientRects()]
            .filter((q) => q.width > 1)
            .map((q) => q.top)
            .sort((x, y) => x - y);
          lines = Math.max(lines, tops.filter((t, i) => i === 0 || t - tops[i - 1] > lineHeight).length);
        }
        if (lines > 1) found.push({ kind: "wraps", what: name(el), why: `${lines} lines at ${Math.round(r.width)}px wide` });
      }
    }
  }
  return found;
}

/** Runs in the page: links and buttons covered by each other, or by a positioned badge or label, on the first screen. */
function overlaps() {
  const pinned = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement)
      if (["fixed", "sticky"].includes(getComputedStyle(a).position)) return true;
    return false;
  };
  const items = [...document.querySelectorAll("a,button,input,select")]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ el, r }) => r.width > 4 && r.height > 4 && getComputedStyle(el).visibility !== "hidden" && !pinned(el))
    .slice(0, 150);
  // Positioned overlays with their own text (badges, stickers, labels); not full-bleed backgrounds or hidden layers.
  const area = innerWidth * innerHeight;
  const overlays = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const s = getComputedStyle(el);
      if (s.position !== "absolute" || Number(s.zIndex) < 0 || s.visibility === "hidden" || Number(s.opacity) < 0.05) return false;
      if (el.matches("a,button,input,select") || el.closest("a,button")) return false;
      const r = el.getBoundingClientRect();
      return (
        r.width > 4 && r.height > 4 && r.width * r.height < area * 0.25 && r.top < innerHeight && (el.textContent || "").trim().length > 0
      );
    })
    .map((el) => ({ el, r: el.getBoundingClientRect() }));
  const found = [];
  for (const o of overlays)
    for (const a of items) {
      if (o.el.contains(a.el) || a.el.contains(o.el)) continue;
      const w = Math.min(a.r.right, o.r.right) - Math.max(a.r.left, o.r.left);
      const h = Math.min(a.r.bottom, o.r.bottom) - Math.max(a.r.top, o.r.top);
      if (w > 0 && h > 0 && (w * h) / (a.r.width * a.r.height) > 0.25) {
        const label = (o.el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30);
        const t = (a.el.textContent || a.el.getAttribute("aria-label") || "").trim().slice(0, 30);
        found.push({
          kind: "overlaps",
          what: `"${label}" over <${a.el.tagName.toLowerCase()}> "${t}"`,
          why: `${Math.round(((w * h) / (a.r.width * a.r.height)) * 100)}% of it covered`,
        });
      }
    }
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 0 || h <= 0) continue;
      const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if ((w * h) / smaller > 0.25) {
        const t = (el) => `<${el.tagName.toLowerCase()}> "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}"`;
        found.push({ kind: "overlaps", what: `${t(a.el)} and ${t(b.el)}`, why: `${Math.round(((w * h) / smaller) * 100)}% covered` });
      }
    }
  return found;
}

async function check(context, page, width) {
  const tab = await context.newPage();
  const errors = [];
  try {
    await tab.goto(`http://localhost:${PORT}${page.url}`, { waitUntil: "networkidle", timeout: 60_000 });
    await tab.waitForTimeout(700);
    errors.push(...(await tab.evaluate(overlaps)));
    const height = await tab.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round(800 * 0.4);
    await tab.evaluate(() => (window.__seen = new Set()));
    for (let y = 0; y < height; y += step) {
      await tab.evaluate((top) => scrollTo(0, top), y);
      await tab.waitForTimeout(650);
      errors.push(...(await tab.evaluate(() => (0, eval)(`(${window.__inspect})`)(window.__seen))));
    }
    errors.push(
      ...(await tab.evaluate(() =>
        [...(window.__visibility ?? new Map()).values()]
          .filter((s) => !s.visible)
          .map((s) => ({ kind: "hidden", what: s.what, why: s.why })),
      )),
    );
  } catch (err) {
    errors.push({ kind: "error", what: page.url, why: err.message.split("\n")[0] });
  } finally {
    await tab.close();
  }
  return errors.map((e) => ({ page: page.label, width, ...e }));
}

const server = await serveStatic(OUT, PORT);
const browser = await chromium.launch();
const findings = [];
try {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: "no-preference" });
    await context.addInitScript(`window.__inspect = ${inspect.toString()};`);
    const queue = [...pages];
    let done = 0;
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        for (let p = queue.shift(); p; p = queue.shift()) {
          findings.push(...(await check(context, p, width)));
          done++;
          if (done % 50 === 0 || done === pages.length) console.log(`check-layout: ${width}px ${done}/${pages.length}`);
        }
      }),
    );
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

const accepted = findings.filter(allowed).length;
findings.splice(0, findings.length, ...findings.filter((f) => !allowed(f)));
fs.writeFileSync(path.join(OUT, "check-layout.json"), JSON.stringify(findings, null, 1));
const byPage = new Map();
for (const f of findings) byPage.set(f.page, [...(byPage.get(f.page) ?? []), f]);
for (const [page, list] of byPage) {
  console.log(`\n${page}`);
  for (const f of list.slice(0, 8)) console.log(`  ${f.width}px ${f.kind}: ${f.what} (${f.why})`);
  if (list.length > 8) console.log(`  … ${list.length - 8} more`);
}
console.log(
  `\ncheck-layout: ${findings.length} finding(s) on ${byPage.size} of ${pages.length} pages at ${WIDTHS.join(", ")}px (${accepted} accepted in layout-allow.json)`,
);
if (findings.length) process.exitCode = 1;
