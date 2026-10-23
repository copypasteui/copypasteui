// Generates the CopyPasteUI logo SVGs in brand/logo with all lettering outlined (no font needed to display them).
// Usage: node brand/source/logo.mjs <fonts-dir>   — see brand/README.md for the fonts and the one dependency (opentype.js).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const F = process.argv[2] ?? path.join(OUT, "source", "fonts");
const bric = opentype.loadSync(`${F}/bricolage-800.ttf`);
fs.mkdirSync(`${OUT}/logo`, { recursive: true });

const C = {
  ink: "#141412",
  paper: "#f5f3ec",
  card: "#fffdf7",
  yellow: "#ffe14d",
  muted: "#5f5d55",
  darkBg: "#121210",
  darkText: "#f2efe4",
  darkMuted: "#a3a093",
  darkCard: "#1f1f1b",
};

// Text → path data, with optional tracking (em fraction).
function textPath(font, text, size, x, y, tracking = 0) {
  let d = "";
  let cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: cx - x - tracking * size };
}
function bbox(font, text, size, tracking = 0) {
  const p = textPath(font, text, size, 0, 0, tracking);
  // measure ink extents
  let cx = 0,
    minY = Infinity,
    maxY = -Infinity;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    const bb = g.getPath(cx, 0, size).getBoundingBox();
    if (isFinite(bb.y1)) {
      minY = Math.min(minY, bb.y1);
      maxY = Math.max(maxY, bb.y2);
    }
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { width: p.width, minY, maxY };
}

// A keycap: dark base with a ledge at the bottom, a face on top, a glyph centred on the face. 100×100 units.
const COMMAND = "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"; // 24-unit icon
function key(x, { base, face, glyph, letter }) {
  const faceBox = { x: x + 6, y: 4, w: 88, h: 80 };
  let g;
  if (letter) {
    // Drawn, not typed: the V uses the same stroke as the ⌘ so the two keys match.
    const cx = faceBox.x + faceBox.w / 2,
      top = faceBox.y + 21,
      bottom = faceBox.y + faceBox.h - 21,
      half = 16;
    g = `<path d="M${cx - half} ${top} L${cx} ${bottom} L${cx + half} ${top}" fill="none" stroke="${glyph}" stroke-width="7.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const s = 2.2; // 24 × 2.2 ≈ 53 units
    const gx = faceBox.x + (faceBox.w - 24 * s) / 2;
    const gy = faceBox.y + (faceBox.h - 24 * s) / 2;
    g = `<path d="${COMMAND}" transform="translate(${gx} ${gy}) scale(${s})" fill="none" stroke="${glyph}" stroke-width="${7.4 / s}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return `<rect x="${x}" y="0" width="100" height="100" rx="20" fill="${base}"/><rect x="${faceBox.x}" y="${faceBox.y}" width="${faceBox.w}" height="${faceBox.h}" rx="15" fill="${face}"/>${g}`;
}

const themes = {
  light: { base: C.ink, cmdFace: C.card, cmdGlyph: C.ink, vFace: C.yellow, vGlyph: C.ink, text: C.ink, muted: C.muted },
  dark: {
    base: "#4a4942",
    cmdFace: C.darkCard,
    cmdGlyph: C.darkText,
    vFace: C.yellow,
    vGlyph: C.ink,
    text: C.darkText,
    muted: C.darkMuted,
  },
  black: {
    base: "#000000",
    cmdFace: "#ffffff",
    cmdGlyph: "#000000",
    vFace: "#ffffff",
    vGlyph: "#000000",
    text: "#000000",
    muted: "#000000",
  },
  white: {
    base: "#ffffff",
    cmdFace: "#000000",
    cmdGlyph: "#ffffff",
    vFace: "#000000",
    vGlyph: "#ffffff",
    text: "#ffffff",
    muted: "#ffffff",
  },
};

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
const marks = (t) =>
  key(0, { base: t.base, face: t.cmdFace, glyph: t.cmdGlyph }) + key(112, { base: t.base, face: t.vFace, glyph: t.vGlyph, letter: "V" });

function wordmark(t) {
  const size = 96,
    track = -0.03;
  const a = bbox(bric, "copypaste", size, track);
  const x0 = 212 + 44;
  // optically centre the lowercase x-height on the keycaps
  const xh = bbox(bric, "x", size);
  const baseline = 50 - (xh.minY + xh.maxY) / 2 - 2;
  const p1 = textPath(bric, "copypaste", size, x0, baseline, track);
  const p2 = textPath(bric, "ui", size, x0 + p1.width + track * size, baseline, track);
  const w = Math.ceil(x0 + p1.width + p2.width + 6);
  const desc = Math.max(a.maxY, 0) + baseline;
  const h = Math.ceil(Math.max(100, desc + 2));
  return { w, h, body: marks(t) + `<path d="${p1.d}" fill="${t.text}"/><path d="${p2.d}" fill="${t.muted}"/>` };
}

const write = (name, content) => fs.writeFileSync(path.join(OUT, "logo", name), content);
for (const [name, t] of Object.entries(themes)) {
  const suffix = name === "light" ? "" : `-${name}`;
  write(`mark${suffix}.svg`, svg(212, 100, marks(t), "CopyPasteUI"));
  const wm = wordmark(t);
  write(`wordmark${suffix}.svg`, svg(wm.w, wm.h, wm.body, "CopyPasteUI"));
}
// Single key, for avatars and favicons.
write("key-v.svg", svg(100, 100, key(0, { base: C.ink, face: C.yellow, glyph: C.ink, letter: "V" }), "CopyPasteUI"));
write("key-v-dark.svg", svg(100, 100, key(0, { base: "#4a4942", face: C.yellow, glyph: C.ink, letter: "V" }), "CopyPasteUI"));
write("key-command.svg", svg(100, 100, key(0, { base: C.ink, face: C.card, glyph: C.ink }), "CopyPasteUI"));
console.log("wrote", fs.readdirSync(`${OUT}/logo`).join(", "));
