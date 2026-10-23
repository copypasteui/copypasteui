// Usage: node brand/source/social.mjs   (after brand/source/logo.mjs and the site screenshots: npm run screenshots)
// Renders brand/social: avatars and banners from small HTML layouts (fonts from Google Fonts, logos from brand/logo).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const L = (f) => `file://${R}/brand/logo/${f}`;
const T = (s) => `file://${R}/apps/web/public/thumbs/templates/${s}.jpg`;
const fonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap">`;
const base = `*{box-sizing:border-box;margin:0}body{font-family:'Hanken Grotesk',sans-serif;color:#141412}.d{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;letter-spacing:-.03em}.m{font-family:'JetBrains Mono',monospace}`;
const hl = `background-image:linear-gradient(100deg,transparent .2em,#ffe14d .2em,#ffe14d calc(100% - .15em),transparent calc(100% - .15em));background-size:100% .42em;background-position:0 88%;background-repeat:no-repeat`;
const strip = [
  "olea-restaurant",
  "verelle-salon",
  "gearwright-garage",
  "hollow-creek-farm",
  "mossbrook-vets",
  "canopy-resort",
  "crumb-bakery",
  "fixwell-trades",
];
const shots = (list, w) =>
  list
    .map(
      (s) =>
        `<img src="${T(s)}" style="width:${w}px;aspect-ratio:16/10;object-fit:cover;object-position:top;border:2px solid #141412;border-radius:10px;display:block">`,
    )
    .join("");

const jobs = [
  {
    name: "avatar-500.png",
    w: 500,
    h: 500,
    html: `<body style="background:#141412;display:grid;place-items:center;height:500px"><img src="${L("key-v-dark.svg")}" style="width:290px;transform:translateY(6px)"></body>`,
  },
  {
    name: "avatar-yellow-500.png",
    w: 500,
    h: 500,
    html: `<body style="background:#ffe14d;display:grid;place-items:center;height:500px"><img src="${L("mark.svg")}" style="width:330px"></body>`,
  },
  {
    name: "avatar-paper-500.png",
    w: 500,
    h: 500,
    html: `<body style="background:#f5f3ec;display:grid;place-items:center;height:500px"><img src="${L("key-v.svg")}" style="width:270px;transform:translateY(6px)"></body>`,
  },
  {
    name: "github-social-preview-1280x640.png",
    w: 1280,
    h: 640,
    html: `<body style="background:#f5f3ec;height:640px;overflow:hidden;position:relative">
      <div style="position:absolute;left:72px;top:72px;width:640px">
        <img src="${L("wordmark.svg")}" style="height:64px">
        <h1 class="d" style="font-size:66px;line-height:1;margin-top:56px">Small-business websites for your <span style="${hl}">AI builder</span>.</h1>
        <p style="font-size:24px;color:#5f5d55;margin-top:28px;line-height:1.35">Templates, sections and themes as one prompt — or straight into your editor through a local MCP.</p>
        <p class="m" style="font-size:20px;margin-top:40px">copypasteui.dev · free · source-available</p>
      </div>
      <div style="position:absolute;left:760px;top:-40px;display:grid;grid-template-columns:1fr 1fr;gap:18px;transform:rotate(-6deg)">${shots(strip, 300)}</div>
    </body>`,
  },
  {
    name: "x-header-1500x500.png",
    w: 1500,
    h: 500,
    html: `<body style="background:#f5f3ec;height:500px;overflow:hidden;position:relative">
      <div style="position:absolute;right:70px;top:70px;width:640px;text-align:right">
        <h1 class="d" style="font-size:58px;line-height:1.02">Paste a whole <span style="${hl}">small-business website</span> into your AI builder.</h1>
        <p class="m" style="font-size:20px;margin-top:30px">copypasteui.dev</p>
      </div>
      <div style="position:absolute;left:-30px;top:-60px;display:flex;flex-wrap:wrap;width:760px;gap:16px;transform:rotate(-6deg)">${shots(strip, 230)}</div>
    </body>`,
  },
  {
    name: "linkedin-banner-1584x396.png",
    w: 1584,
    h: 396,
    html: `<body style="background:#141412;height:396px;overflow:hidden;position:relative;color:#f2efe4">
      <div style="position:absolute;left:360px;top:110px">
        <img src="${L("wordmark-dark.svg")}" style="height:56px">
        <p style="font-size:28px;margin-top:28px;color:#c9c6b9">Small-business websites for your AI builder.</p>
      </div>
      <div style="position:absolute;right:-60px;top:-60px;display:flex;flex-wrap:wrap;width:560px;gap:14px;transform:rotate(-6deg)">${shots(strip.slice(0, 6), 170)}</div>
    </body>`,
  },
  {
    name: "og-default-1200x630.png",
    w: 1200,
    h: 630,
    html: `<body style="background:#141412;height:630px;display:grid;place-items:center;color:#f2efe4;text-align:center">
      <div><img src="${L("wordmark-dark.svg")}" style="height:84px"><p style="font-size:30px;margin-top:36px;color:#c9c6b9">Small-business websites for your AI builder.</p></div>
    </body>`,
  },
];

const b = await chromium.launch();
const tmp = `${R}/brand/.render.html`;
for (const j of jobs) {
  const p = await b.newPage({ viewport: { width: j.w, height: j.h } });
  // Rendered from a file so file:// logos and thumbnails are allowed to load.
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${base}</style></head>${j.html}</html>`);
  await p.goto(`file://${tmp}`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${R}/brand/social/${j.name}`, clip: { x: 0, y: 0, width: j.w, height: j.h } });
  await p.close();
  console.log(j.name);
}
await b.close();
fs.rmSync(tmp, { force: true });
