#!/usr/bin/env node
// Validates everything under registry/ and publishes it as static files:
//   apps/web/public/r/            static JSON API read by the website, the MCP and the shadcn CLI
//   apps/web/src/generated/       component sources + data the website imports at build time
//   packages/mcp/data/            offline snapshot bundled into the npm package
//   README.md                     the library counts between <!-- count:… --> markers
// Run with --check to validate only (used by CI on pull requests); it also fails when the README counts are stale.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ADVICE, designTells } from "./design-lint.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK_ONLY = process.argv.includes("--check");
// Tests validate throwaway copies of the registry. Only with --check, so a copy can never overwrite the real output.
const REGISTRY = process.env.COPYPASTEUI_REGISTRY_SRC ? path.resolve(process.env.COPYPASTEUI_REGISTRY_SRC) : path.join(ROOT, "registry");
if (process.env.COPYPASTEUI_REGISTRY_SRC && !CHECK_ONLY) {
  console.error("COPYPASTEUI_REGISTRY_SRC is only allowed with --check");
  process.exit(2);
}
const SITE_URL = process.env.COPYPASTEUI_SITE_URL ?? "https://copypasteui.dev";

export const CATEGORIES = [
  { slug: "navbar", name: "Navbars" },
  { slug: "hero", name: "Heroes" },
  { slug: "logos", name: "Logo Clouds" },
  { slug: "features", name: "Features" },
  { slug: "how-it-works", name: "How It Works" },
  { slug: "stats", name: "Stats & Metrics" },
  { slug: "testimonials", name: "Testimonials" },
  { slug: "pricing", name: "Pricing" },
  { slug: "faq", name: "FAQ" },
  { slug: "cta", name: "Calls To Action" },
  { slug: "team", name: "Team" },
  { slug: "contact", name: "Contact" },
  { slug: "gallery", name: "Galleries & Portfolio" },
  { slug: "products", name: "Products & E-commerce" },
  { slug: "menu", name: "Menus" },
  { slug: "events", name: "Events & Schedules" },
  { slug: "blog", name: "Blog & Articles" },
  { slug: "footer", name: "Footers" },
  { slug: "pages", name: "Utility pages" },
  { slug: "admin", name: "Back office" },
  { slug: "background", name: "Backgrounds" },
  { slug: "buttons", name: "Buttons" },
  { slug: "cards", name: "Cards" },
];

// Packages a component may import. Every component is rendered on the website,
// so adding one here is a maintainer decision (it must also be in apps/web/package.json).
export const ALLOWED_DEPENDENCIES = {
  motion: ">=12.0.0",
  "lucide-react": ">=0.400.0",
};

// Theme tokens follow shadcn/ui naming so components drop into shadcn projects unchanged.
export const COLOR_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "ring",
];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COLOR_RE = /^(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8}|oklch\([^)]*\)|hsl\([^)]*\)|rgb\([^)]*\))$/;
const FORBIDDEN_CODE = [
  [/dangerouslySetInnerHTML/, "dangerouslySetInnerHTML is not allowed"],
  [/\beval\s*\(/, "eval() is not allowed"],
  [/new\s+Function\s*\(/, "new Function() is not allowed"],
  [/\bfetch\s*\(|XMLHttpRequest|WebSocket\s*\(/, "network calls are not allowed in components"],
  [/document\.cookie|localStorage|sessionStorage/, "storage and cookie access is not allowed"],
  [/<script\b/i, "<script> tags are not allowed"],
];

// Photos may only come from the free Unsplash image CDN (Unsplash License). Unsplash+ is not free.
const IMAGE_HOST = "images.unsplash.com";
const MEDIA_ATTR_RE = /(?:src|srcSet|poster)\s*=\s*\{?\s*["'`](https?:\/\/[^"'`\s]+)/g;
const URL_LITERAL_RE = /https?:\/\/([a-z0-9.-]+)\/[^"'`\s)]*/gi;

// Returns the source of each JSX <img>/<motion.img> opening tag. Scans to the closing ">" while
// tracking braces and quotes, because class names like "[&>*]" and arrow functions contain ">".
function imgTags(code) {
  const tags = [];
  for (const m of code.matchAll(/<(?:motion\.)?img\b/g)) {
    let depth = 0;
    let quote = null;
    let i = m.index + m[0].length;
    for (; i < code.length; i++) {
      const ch = code[i];
      if (quote) {
        if (ch === "\\") i++;
        else if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'" || ch === "`") quote = ch;
      else if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (ch === ">" && depth === 0) break;
    }
    tags.push(code.slice(m.index, i + 1));
  }
  return tags;
}

function checkMedia(file, code) {
  const withoutComments = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const tag of imgTags(withoutComments)) {
    // alt="" is allowed (decorative images); a missing alt is not.
    if (!/\balt\s*=/.test(tag))
      fail(file, `every <img> needs an alt attribute (use alt="" for decorative images): ${tag.slice(0, 80).replace(/\s+/g, " ")}…`);
  }
  if (/plus\.unsplash\.com|premium_photo-/.test(code))
    fail(file, "Unsplash+ (premium) images are not free to redistribute — use images.unsplash.com/photo-… only");
  if (/<(?:iframe|video|audio|embed|object)\b/i.test(code))
    fail(file, "iframes, video, audio and embeds are not allowed; use images or CSS");
  for (const m of code.matchAll(MEDIA_ATTR_RE)) {
    if (new URL(m[1]).hostname !== IMAGE_HOST) fail(file, `external media must come from ${IMAGE_HOST} (found ${m[1]})`);
  }
  for (const m of code.matchAll(URL_LITERAL_RE)) {
    const looksLikeImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(m[0]) || /\/photo-/.test(m[0]);
    if (looksLikeImage && m[1].toLowerCase() !== IMAGE_HOST) fail(file, `images must come from ${IMAGE_HOST} (found ${m[0]})`);
    if (m[1].toLowerCase() === IMAGE_HOST && !/^https:\/\/images\.unsplash\.com\/(photo-[0-9a-z-]+|\$\{)/i.test(m[0])) {
      fail(file, `Unsplash URLs must look like https://images.unsplash.com/photo-<id> (found ${m[0]})`);
    }
  }
}

const errors = [];
const fail = (where, msg) => errors.push(`${path.relative(ROOT, where)}: ${msg}`);
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    fail(file, `invalid JSON (${e.message})`);
    return null;
  }
};
const listDirs = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
    : [];

function checkAuthor(file, author) {
  if (!author || typeof author.name !== "string" || !author.name.trim()) fail(file, "author.name is required");
  if (author?.github && !/^[A-Za-z0-9-]{1,39}$/.test(author.github)) fail(file, "author.github must be a GitHub username");
}

// Everything is PolyForm Shield 1.0.0 by default (use it for anything except a rival library; see LICENSE).
// Contributors may release their own theme or component under an open licence instead; that item is then
// free to redistribute on those terms.
const DEFAULT_LICENSE = "PolyForm-Shield-1.0.0";
const SHIELD_URL = "https://polyformproject.org/licenses/shield/1.0.0";
const REQUIRED_NOTICE = "Required Notice: Copyright 2026 Nidhin Radh P V and the CopyPasteUI contributors (https://copypasteui.dev)";
const OPEN_LICENSES = ["MIT", "Apache-2.0", "CC0-1.0"];
function checkLicense(file, license) {
  if (license !== undefined && license !== DEFAULT_LICENSE && !OPEN_LICENSES.includes(license)) {
    fail(file, `license must be one of ${[DEFAULT_LICENSE, ...OPEN_LICENSES].join(", ")} (or omitted for ${DEFAULT_LICENSE})`);
  }
}
const isOpen = (license) => OPEN_LICENSES.includes(license);
const authorName = (a) => (a.github ? `${a.name} (@${a.github})` : a.name);

// Preview images are links, never files in the repo: maintainers upload theirs to cdn.copypasteui.dev and contributors
// may link their own host. These checks are offline; scripts/check-images.mjs fetches each link and checks the file.
// A preview video's link may end in #t=<seconds> to start the loop after the page has painted.
const IMAGE_FIELDS = {
  component: { thumbnail: "image", preview: "video" },
  template: { thumbnail: "image", fullPage: "image", preview: "video" },
  theme: { thumbnail: "image" },
};
const LINK_EXT = { image: /\.(jpe?g|png|webp)$/i, video: /\.(webm|mp4)(#t=\d+(\.\d+)?)?$/i };
function checkImages(file, images, kind) {
  if (!images || typeof images !== "object") return fail(file, `images.thumbnail is required: an https link to a 16:10 screenshot`);
  for (const [field, value] of Object.entries(images)) {
    const type = IMAGE_FIELDS[kind][field];
    if (!type) fail(file, `images.${field} is not an image field (use ${Object.keys(IMAGE_FIELDS[kind]).join(", ")})`);
    else if (typeof value !== "string" || !/^https:\/\/[^/?#]+\/\S+$/.test(value)) fail(file, `images.${field} must be an https link`);
    else if (!LINK_EXT[type].test(value.replace(/\?[^#]*/, "")))
      fail(
        file,
        `images.${field} must link to ${type === "image" ? "a .jpg, .png or .webp file" : "a .webm or .mp4 file (optionally ending in #t=<seconds>)"}`,
      );
  }
  if (!images.thumbnail) fail(file, "images.thumbnail is required: an https link to a 16:10 screenshot");
}

function checkText(file, value, field, max) {
  if (typeof value !== "string" || !value.trim()) fail(file, `${field} is required`);
  else if (value.length > max) fail(file, `${field} must be at most ${max} characters`);
}

// ---------- themes ----------

// Text/background pairs that must stay readable (WCAG: 4.5 body text, 3 large text/UI).
// The third value is the minimum ratio; the optional fourth is the opacity the text colour must survive.
// Sections lean on these guarantees: primary works as text (eyebrows, links, highlighted words) and
// secondary text on a primary panel may fade to 90% (`opacity-90`), on any of the surfaces sections use.
// Accent is a background colour (with accent-foreground on it), never a text colour.
const CONTRAST_PAIRS = [
  ["foreground", "background", 4.5],
  ["card-foreground", "card", 4.5],
  ["muted-foreground", "background", 4.5],
  ["muted-foreground", "card", 4.5],
  ["muted-foreground", "muted", 4],
  ["muted-foreground", "secondary", 4.5],
  ["primary-foreground", "primary", 4.5],
  ["primary-foreground", "primary", 4.5, 0.9],
  ["secondary-foreground", "secondary", 4.5],
  ["accent-foreground", "accent", 4.5],
  ["primary", "background", 4.5],
  ["primary", "card", 4.5],
  ["primary", "secondary", 4.5],
  ["primary", "muted", 4.5],
];

function luminance(hex) {
  const n = hex.slice(1, 7);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio for two hex colours; null when either is not hex (oklch/hsl are not checked). */
function contrast(a, b) {
  if (!/^#[0-9a-f]{6}/i.test(a ?? "") || !/^#[0-9a-f]{6}/i.test(b ?? "")) return null;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** `fg` painted at `alpha` opacity over `bg` (both hex), as the browser composites it; null when either is not hex. */
function blendHex(fg, bg, alpha) {
  if (!/^#[0-9a-f]{6}/i.test(fg ?? "") || !/^#[0-9a-f]{6}/i.test(bg ?? "")) return null;
  const ch = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return `#${[0, 1, 2]
    .map((i) =>
      Math.round(ch(fg, i) * alpha + ch(bg, i) * (1 - alpha))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function loadThemes() {
  const dir = path.join(REGISTRY, "themes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const file = path.join(dir, f);
      const t = readJson(file);
      if (!t) return null;
      const slug = f.replace(/\.json$/, "");
      if (t.slug !== slug) fail(file, `slug must equal the file name "${slug}"`);
      if (!SLUG_RE.test(slug)) fail(file, "slug must be kebab-case");
      checkText(file, t.name, "name", 40);
      checkText(file, t.description, "description", 200);
      checkAuthor(file, t.author);
      for (const mode of ["light", "dark"]) {
        for (const token of COLOR_TOKENS) {
          const v = t[mode]?.[token];
          if (!v) fail(file, `${mode}.${token} is required`);
          else if (!COLOR_RE.test(v)) fail(file, `${mode}.${token} must be a hex, oklch(), hsl() or rgb() colour`);
        }
      }
      for (const mode of ["light", "dark"]) {
        for (const [fg, bg, min, alpha = 1] of CONTRAST_PAIRS) {
          const ratio = contrast(alpha < 1 ? blendHex(t[mode]?.[fg], t[mode]?.[bg], alpha) : t[mode]?.[fg], t[mode]?.[bg]);
          if (ratio !== null && ratio < min) {
            const what = alpha < 1 ? `${fg} at ${alpha * 100}% opacity on ${bg}` : `${fg} on ${bg}`;
            fail(file, `${mode}: ${what} contrast is ${ratio.toFixed(2)}:1, needs at least ${min}:1`);
          }
        }
      }
      if (!/^\d+(\.\d+)?(rem|px)$/.test(t.radius ?? "")) fail(file, 'radius must look like "0.75rem"');
      for (const key of ["sans", "display"]) {
        if (typeof t.fonts?.[key] !== "string") fail(file, `fonts.${key} is required`);
      }
      if (t.fonts?.googleFonts && !Array.isArray(t.fonts.googleFonts)) fail(file, "fonts.googleFonts must be an array");
      if (t.style !== undefined) {
        if (typeof t.style !== "object" || Array.isArray(t.style)) fail(file, "style must be an object");
        else
          for (const [key, value] of Object.entries(t.style)) {
            if (key === "label") checkText(file, value, "style.label", 24);
            else if (!STYLE_OPTIONS[key]) fail(file, `style.${key} is not a style setting (use ${Object.keys(STYLE_OPTIONS).join(", ")})`);
            else if (!STYLE_OPTIONS[key].includes(value)) fail(file, `style.${key} must be one of ${STYLE_OPTIONS[key].join(", ")}`);
          }
        if (t.style?.surface === "glass" && ["dots", "grid"].includes(t.style?.texture))
          fail(file, "style: glass draws its own page background, so it can't be combined with the dots or grid texture");
      }
      checkLicense(file, t.license);
      checkImages(file, t.images, "theme");
      return { ...t, slug, license: t.license ?? DEFAULT_LICENSE };
    })
    .filter(Boolean);
}

// A theme's style: how its surfaces look, on top of colour, type and radius. Every plain `border` and every
// `shadow-*` in a section reads these through the Tailwind theme, so a theme restyles sections without
// touching them. Themes without a `style` keep Tailwind's defaults and their CSS stays as it was.
// `style.label` names the look ("Neo-brutalist", "Glass") for the Themes page filter.
const STYLE_OPTIONS = {
  shadow: ["soft", "hard", "clay", "neu", "none"],
  border: ["0px", "1px", "2px", "3px"],
  surface: ["solid", "glass"],
  texture: ["none", "grain", "dots", "grid"],
  motion: ["none", "subtle", "lively"],
};
const STYLE_DEFAULTS = { shadow: "soft", border: "1px", surface: "solid", texture: "none", motion: "none" };
const SHADOW_SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const SOFT_SHADOWS = {
  "2xs": "0 1px rgb(0 0 0 / 0.05)",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
};
const HARD_OFFSET = { "2xs": 1, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, "2xl": 8 };
// Clay and neumorphic shadows grow with the size; the highlight and lowlight colours change with the mode.
const PUFF = { "2xs": 1, xs: 2, sm: 4, md: 8, lg: 12, xl: 18, "2xl": 24 };
// A fine monochrome noise tile for the grain texture.
const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export const themeStyle = (t) => ({ ...STYLE_DEFAULTS, ...t.style });
const hasStyle = (t) => Object.keys(STYLE_DEFAULTS).some((k) => themeStyle(t)[k] !== STYLE_DEFAULTS[k]);

/** The style as CSS variables (always the full set, so the preview can switch themes cleanly). */
export function styleVars(t) {
  const s = themeStyle(t);
  const shadow = (size) => {
    const o = PUFF[size];
    const i = Math.max(1, Math.round(o / 3));
    switch (s.shadow) {
      // The offset block takes the ring colour, so a theme can print it in black, or in a second ink.
      case "hard":
        return `${HARD_OFFSET[size]}px ${HARD_OFFSET[size]}px 0 0 var(--ring)`;
      case "clay":
        return `${o}px ${o}px ${o * 2}px color-mix(in srgb, var(--primary) 20%, transparent), inset -${i}px -${i}px ${i * 2}px var(--style-lowlight), inset ${i}px ${i}px ${i * 2}px var(--style-highlight)`;
      case "neu":
        return `${o}px ${o}px ${o * 2}px var(--style-lowlight), -${o}px -${o}px ${o * 2}px var(--style-highlight)`;
      case "none":
        return "0 0 #0000";
      default:
        return SOFT_SHADOWS[size];
    }
  };
  return {
    "--border-width": s.border,
    ...Object.fromEntries(SHADOW_SIZES.map((size) => [`--shadow-${size}`, shadow(size)])),
  };
}

// Padded, rounded panels and buttons: the elements a card-like style should dress even when the section
// gave them no border or shadow of their own.
const PANELS = `:is([class~="bg-card"], [class~="bg-primary"], [class~="bg-accent"], [class~="bg-secondary"]):is([class*="rounded"]):is(
    [class^="p-"],
    [class*=" p-"],
    [class^="px-"],
    [class*=" px-"],
    [class^="py-"],
    [class*=" py-"]
  )`;

// Scroll motion: elements rise or zoom into place as they scroll into view, driven by CSS scroll timelines,
// so every section moves without any code of its own. It leaves alone anything a section animates itself
// (Framer Motion writes inline styles) or positions with translate classes, applies only until the element has
// arrived (fill: backwards), and does nothing for reduced motion or in browsers without scroll timelines.
// Nor anything inside an element running its own CSS animation (a marquee): its view timeline would track the
// clipped track instead of the page, and the content would stay at the start of the rise, invisible.
const SKIP = `:not([style]):not([class*="translate-"]):not(nav *):not(header *):not([class*="animate-"] *)`;
function motionRules(level) {
  const lively = level === "lively";
  const rise = lively ? "2.5rem" : "1rem";
  return `/* Motion (${level}): sections come in as you scroll. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    @keyframes cpui-rise {
      from {
        opacity: 0;
        translate: 0 ${rise};
      }
    }
    @keyframes cpui-zoom {
      from {
        scale: 1.14;
      }
    }
    section :is(h1, h2)${SKIP},
    ${PANELS.replace(/\n\s*/g, " ")}:not(a, button)${SKIP} {
      animation: cpui-rise linear backwards;
      animation-timeline: view();
      animation-range: entry 0% cover 22%;
    }${
      lively
        ? `
    section :is(h3, p, dl, blockquote, figure)${SKIP},
    section :is(ul, ol) > li${SKIP} {
      animation: cpui-rise linear backwards;
      animation-timeline: view();
      animation-range: entry 0% cover 20%;
    }
    section :is(ul, ol) > li:nth-child(3n + 2)${SKIP} {
      animation-range: entry 8% cover 26%;
    }
    section :is(ul, ol) > li:nth-child(3n + 3)${SKIP} {
      animation-range: entry 16% cover 32%;
    }
    section [class*="overflow-hidden"] img${SKIP} {
      animation: cpui-zoom linear backwards;
      animation-timeline: view();
      animation-range: entry 0% cover 45%;
    }`
        : ""
    }
  }
}`;
}

/** Rules for the styles a variable can't express: glass panels, panel outlines and puff, textures. */
export function styleRules(t) {
  const s = themeStyle(t);
  const rules = [];
  if (s.shadow === "clay" || s.shadow === "neu")
    rules.push(`/* ${s.shadow === "clay" ? "Clay" : "Neumorphic"} light: a highlight and a lowlight that suit each mode. */
:root {
  --style-highlight: rgb(255 255 255 / ${s.shadow === "clay" ? 0.6 : 0.85});
  --style-lowlight: color-mix(in srgb, var(--foreground) ${s.shadow === "clay" ? 10 : 16}%, transparent);
}
.dark {
  --style-highlight: rgb(255 255 255 / ${s.shadow === "clay" ? 0.1 : 0.06});
  --style-lowlight: rgb(0 0 0 / ${s.shadow === "clay" ? 0.35 : 0.5});
}
${PANELS} {
  box-shadow: var(--shadow-${s.shadow === "clay" ? "lg" : "md"});
}`);
  if (s.surface === "glass")
    rules.push(`/* Glass: page backgrounds pick up a wash of the theme colours, cards frost over it. */
body,
[class~="bg-background"],
[class~="bg-secondary"],
[class~="bg-muted"] {
  background-image:
    radial-gradient(55% 45% at 12% 8%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 70%),
    radial-gradient(45% 40% at 92% 28%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%),
    radial-gradient(50% 45% at 40% 95%, color-mix(in srgb, var(--primary) 10%, transparent), transparent 70%);
  background-attachment: fixed;
}
[class~="bg-card"],
[class^="bg-card/"],
[class*=" bg-card/"] {
  background-color: color-mix(in srgb, var(--card) 76%, transparent);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  backdrop-filter: blur(18px) saturate(1.4);
}`);
  if (s.shadow === "hard")
    rules.push(`/* Hard shadows: padded, rounded panels and buttons get an outline and sit on an offset block. */
${PANELS} {
  border: var(--border-width) solid var(--foreground);
  box-shadow: var(--shadow-md);
}`);
  if (s.texture === "grain")
    rules.push(`/* Grain: a faint noise layer over the whole page. */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("${GRAIN_URL}");
}`);
  if (s.texture === "dots" || s.texture === "grid")
    rules.push(`/* ${s.texture === "dots" ? "Dots" : "Grid"}: a faint pattern on the page background, fixed so it runs on across sections. */
body,
[class~="bg-background"] {
  background-image: ${
    s.texture === "dots"
      ? "radial-gradient(color-mix(in srgb, var(--foreground) 16%, transparent) 1px, transparent 1.6px)"
      : "linear-gradient(to right, color-mix(in srgb, var(--foreground) 9%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 9%, transparent) 1px, transparent 1px)"
  };
  background-size: ${s.texture === "dots" ? "22px 22px" : "56px 56px"};
  background-attachment: fixed;
}`);
  if (s.motion !== "none") rules.push(motionRules(s.motion));
  return rules.join("\n\n");
}

export function themeCss(t) {
  const vars = (mode) => COLOR_TOKENS.map((k) => `  --${k}: ${t[mode][k]};`).join("\n");
  const fontStack = (f) => f;
  const style = hasStyle(t)
    ? `\n${Object.entries(styleVars(t))
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n")}`
    : "";
  const rules = hasStyle(t) ? styleRules(t) : "";
  return `:root {
${vars("light")}
  --radius: ${t.radius};
  --font-sans: ${fontStack(t.fonts.sans)};
  --font-display: ${fontStack(t.fonts.display)};${style}
}

.dark {
${vars("dark")}
}${rules ? `\n\n${rules}` : ""}`;
}

export function themeTailwindV4(t) {
  const style =
    t && hasStyle(t)
      ? `\n  --default-border-width: var(--border-width);\n  --shadow: var(--shadow-sm);\n${SHADOW_SIZES.map((s) => `  --shadow-${s}: var(--shadow-${s});`).join("\n")}`
      : "";
  return `@theme inline {
${COLOR_TOKENS.map((k) => `  --color-${k}: var(--${k});`).join("\n")}
  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);${style}
}`;
}

export function themeTailwindV3(t) {
  const colors = {};
  for (const k of COLOR_TOKENS) colors[k] = `var(--${k})`;
  const style =
    t && hasStyle(t)
      ? `
    borderWidth: { DEFAULT: "var(--border-width)" },
    boxShadow: { DEFAULT: "var(--shadow-sm)", ${SHADOW_SIZES.map((s) => `${/^\d/.test(s) ? `"${s}"` : s}: "var(--shadow-${s})"`).join(", ")} },`
      : "";
  return `// tailwind.config.js (Tailwind v3) — extend your existing config
theme: {
  extend: {
    colors: ${JSON.stringify(colors, null, 6).replace(/\n}/, "\n    }")},
    fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
    borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)", xl: "calc(var(--radius) + 4px)" },${style}
  },
}`;
}

function googleFontsUrl(t) {
  const families = t.fonts.googleFonts ?? [];
  if (!families.length) return null;
  return `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f.replace(/ /g, "+")}`).join("&")}&display=swap`;
}

function themePromptBlock(t) {
  const fonts = googleFontsUrl(t);
  return `## Theme: ${t.name}${isOpen(t.license) ? ` (${t.license} licence, by ${authorName(t.author)})` : ""}
The component uses design tokens (bg-background, text-foreground, bg-primary, text-muted-foreground, border-border, font-display, rounded-lg …).
If the project does not define these tokens yet, add the theme below. If it already has shadcn/ui-style tokens, you may keep the existing ones instead.

1. Add these CSS variables to the global stylesheet:
\`\`\`css
${themeCss(t)}
\`\`\`

2. Tailwind v4 — add this to the same stylesheet, after \`@import "tailwindcss";\`:
\`\`\`css
${themeTailwindV4(t)}
\`\`\`
   Tailwind v3 — instead, extend tailwind.config:
\`\`\`js
${themeTailwindV3(t)}
\`\`\`
${fonts ? `\n3. Load the fonts (e.g. in the root layout <head> or with next/font): ${fonts}\n` : ""}`;
}

// ---------- components ----------

const IMPORT_RE = /^\s*import\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["'];?/gm;

function packageOf(spec) {
  if (spec.startsWith(".")) return null;
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function loadComponents() {
  const out = [];
  const known = new Set(CATEGORIES.map((c) => c.slug));
  const root = path.join(REGISTRY, "components");
  for (const category of listDirs(root)) {
    const catDir = path.join(root, category);
    if (!known.has(category)) fail(catDir, `unknown category; use one of: ${[...known].join(", ")}`);
    for (const slug of listDirs(catDir)) {
      const dir = path.join(catDir, slug);
      const metaFile = path.join(dir, "meta.json");
      const codeFile = path.join(dir, "component.tsx");
      if (!fs.existsSync(metaFile)) {
        fail(dir, "missing meta.json");
        continue;
      }
      if (!fs.existsSync(codeFile)) {
        fail(dir, "missing component.tsx");
        continue;
      }
      const meta = readJson(metaFile);
      if (!meta) continue;
      const code = fs.readFileSync(codeFile, "utf8");

      if (!SLUG_RE.test(slug)) fail(dir, "folder name must be kebab-case");
      if (meta.slug !== slug) fail(metaFile, `slug must equal the folder name "${slug}"`);
      if (meta.category !== category) fail(metaFile, `category must equal the parent folder "${category}"`);
      checkText(metaFile, meta.name, "name", 60);
      checkText(metaFile, meta.description, "description", 240);
      checkAuthor(metaFile, meta.author);
      checkLicense(metaFile, meta.license);
      if (!Array.isArray(meta.tags) || meta.tags.length > 8 || meta.tags.some((t) => !SLUG_RE.test(t))) {
        fail(metaFile, "tags must be an array of up to 8 kebab-case strings");
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.createdAt ?? "")) fail(metaFile, "createdAt must be YYYY-MM-DD");

      if (!/^["']use client["'];?/.test(code.trimStart())) fail(codeFile, 'must start with "use client"');
      if (!/export\s+default\s+function\s+[A-Z]\w*/.test(code))
        fail(codeFile, "must have a named default export: export default function MyComponent()");
      for (const [re, msg] of FORBIDDEN_CODE) if (re.test(code)) fail(codeFile, msg);
      checkMedia(codeFile, code);
      // An element clipped to nothing has no visible area, so the browser never reports it in view and a whileInView
      // reveal on that same element never runs: the content stays hidden. Leave a sliver, e.g. inset(0% 0% 99.5% 0%).
      for (const tag of code.match(/<motion\.\w+\s[^>]*?>/gs) ?? [])
        if (tag.includes("whileInView") && /initial=\{\{[^}]*clipPath:\s*["'`]inset\([^)]*\b100%/.test(tag))
          fail(codeFile, 'a whileInView reveal starts fully clipped (clip-path 100%), so it never fires; start at "inset(0% 0% 99.5% 0%)"');
      // Design tells (glow blobs, gradient text, buzzwords…). See scripts/design-lint.mjs; "// design-ok: <rule> — why" allows one.
      for (const t of designTells(code).filter((t) => !ADVICE.has(t.rule)))
        fail(codeFile, `looks machine-made — ${t.rule}: ${t.message} (found ${t.detail})`);
      if (meta.collection !== undefined && !SLUG_RE.test(meta.collection)) fail(metaFile, "collection must be a template slug");
      if (meta.usage !== undefined) checkText(metaFile, meta.usage, "usage", 900);
      checkImages(metaFile, meta.images, "component");

      const used = new Set();
      for (const m of code.matchAll(IMPORT_RE)) {
        const pkg = packageOf(m[1]);
        if (pkg === null) fail(codeFile, `relative import "${m[1]}" — components must be a single self-contained file`);
        else if (pkg !== "react") {
          if (!(pkg in ALLOWED_DEPENDENCIES))
            fail(codeFile, `import "${pkg}" is not allowed (allowed: react, ${Object.keys(ALLOWED_DEPENDENCIES).join(", ")})`);
          used.add(pkg);
        }
      }
      const declared = Object.keys(meta.dependencies ?? {}).sort();
      if (JSON.stringify(declared) !== JSON.stringify([...used].sort())) {
        fail(metaFile, `dependencies must list exactly the packages the code imports: ${JSON.stringify([...used].sort())}`);
      }
      if (/(?<![\w&])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/.test(code.replace(/\/\/.*$/gm, ""))) {
        console.warn(`warning: ${path.relative(ROOT, codeFile)} contains hard-coded hex colours; prefer theme tokens so themes apply`);
      }

      const exportName = code.match(/export\s+default\s+function\s+([A-Z]\w*)/)?.[1] ?? "Component";
      out.push({
        slug,
        name: meta.name,
        description: meta.description,
        category,
        tags: meta.tags ?? [],
        author: meta.author,
        license: meta.license ?? DEFAULT_LICENSE,
        createdAt: meta.createdAt,
        featured: Boolean(meta.featured),
        ...(meta.usage ? { usage: meta.usage } : {}),
        collection: meta.collection ?? null,
        previewTheme: meta.theme ?? null,
        images: meta.images ?? {},
        usesPhotos: code.includes(IMAGE_HOST),
        dependencies: meta.dependencies ?? {},
        exportName,
        code,
      });
    }
  }
  const seen = new Set();
  for (const c of out) {
    if (seen.has(c.slug)) fail(path.join(REGISTRY, "components", c.category, c.slug), "slug must be unique across all categories");
    seen.add(c.slug);
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.slug.localeCompare(b.slug));
}

const fileName = (c) => `${c.exportName}.tsx`;
const installPath = (c) => `components/copypasteui/${fileName(c)}`;
const installCommand = (deps) => {
  const names = Object.keys(deps);
  return names.length ? `npm install ${names.join(" ")}` : null;
};

// Footers end with a small "Built with CopyPasteUI" link. It's a courtesy, never a condition of the licence.
const CREDIT_NOTE =
  'The footer ends with a small "Built with CopyPasteUI" link. It is optional and not part of the licence: keep it if the owner is happy to credit CopyPasteUI (it helps other small businesses find these free templates), or change or remove it if they prefer.';

function licenseNote(license, author) {
  return isOpen(license)
    ? `Licensed under ${license} by ${authorName(author)}; keep the licence notice at the top of the file.`
    : "Free to use in this project, including commercial and client work (CopyPasteUI licence: PolyForm Shield 1.0.0). Keep the two notice lines at the top of the file.";
}

// Every file carries its licence notice, so it travels with the code into the sites people build.
// PolyForm Shield asks for the licence URL and the Required Notice line; open licences for attribution.
function withNotice(c) {
  if (!isOpen(c.license))
    return `// ${c.name} from CopyPasteUI \u2014 PolyForm Shield 1.0.0: ${SHIELD_URL}\n// ${REQUIRED_NOTICE}\n${c.code}`;
  return `// ${c.name} by ${authorName(c.author)} \u2014 ${c.license} licence \u2014 ${SITE_URL}/components/${c.category}/${c.slug}\n${c.code}`;
}

function componentPrompt(c) {
  const install = installCommand(c.dependencies);
  return `Add the "${c.name}" section to this project. It is a free component from CopyPasteUI (${SITE_URL}/components/${c.category}/${c.slug}). ${licenseNote(c.license, c.author)}

## Requirements
- React 18+ with Tailwind CSS (v4 preferred, v3 works with the config below).
${install ? `- Install dependencies: \`${install}\`` : "- No extra dependencies."}

## Steps
1. Create \`${installPath(c)}\` with the code below, unchanged.
2. Make sure the theme tokens exist (see the Theme section).
3. ${c.usage ? `${c.usage} In Next.js App Router it is already a client component.` : `Render \`<${c.exportName} />\` where the section belongs on the page. In Next.js App Router it is already a client component.`}
4. Replace placeholder copy, links and images with the project's real content. Keep the layout, spacing, motion and token classes.${
    c.usesPhotos
      ? "\n5. Photos are free Unsplash images hotlinked from images.unsplash.com (Unsplash License, no attribution required). Keep them, or swap in the project's own photos with the same aspect ratios. If the project uses next/image, add images.unsplash.com to images.remotePatterns or keep plain <img>."
      : ""
  }${c.category === "footer" ? `\n${c.usesPhotos ? 6 : 5}. ${CREDIT_NOTE}` : ""}

## Code
\`\`\`tsx
${c.code.trimEnd()}
\`\`\`

{{THEME}}`;
}

function shadcnItem(c) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: c.slug,
    type: "registry:block",
    title: c.name,
    description: c.description,
    meta: { license: c.license, author: c.author.name },
    dependencies: Object.keys(c.dependencies),
    files: [{ path: installPath(c), type: "registry:component", content: c.code }],
  };
}

/** shadcn's `css` field wants rules as { selector: { property: value } }; the style rules are flat, so split them. */
function shadcnRules(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, "");
  let i = 0;
  // Reads declarations and nested blocks up to the matching "}" (at-rules like @media nest as objects).
  const block = () => {
    const out = {};
    let buf = "";
    const flush = () => {
      for (const d of buf.split(/;(?![^(]*\))/)) {
        const at = d.indexOf(":");
        if (at > 0)
          out[d.slice(0, at).trim()] = d
            .slice(at + 1)
            .trim()
            .replace(/\s+/g, " ");
      }
      buf = "";
    };
    while (i < src.length) {
      const ch = src[i++];
      if (ch === "{") {
        const parts = buf.split(/;(?![^(]*\))/);
        const selector = parts.pop().trim().replace(/\s+/g, " ");
        buf = parts.join(";");
        flush();
        out[selector] = block();
      } else if (ch === "}") {
        flush();
        return out;
      } else buf += ch;
    }
    flush();
    return out;
  };
  return block();
}

function shadcnTheme(t) {
  const pick = (mode) => Object.fromEntries(COLOR_TOKENS.map((k) => [k, t[mode][k]]));
  const fontItems = shadcnFonts(t);
  const covered = new Set(fontItems.map((f) => f.font.variable));
  const fontVars = Object.fromEntries(["sans", "display"].filter((r) => !covered.has(`--font-${r}`)).map((r) => [`font-${r}`, t.fonts[r]]));
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${t.slug}`,
    type: "registry:theme",
    title: t.name,
    description: t.description,
    meta: { license: t.license, author: t.author.name },
    cssVars: {
      ...(Object.keys(fontVars).length || hasStyle(t)
        ? {
            theme: {
              ...fontVars,
              ...(hasStyle(t)
                ? {
                    "default-border-width": "var(--border-width)",
                    shadow: "var(--shadow-sm)",
                    ...Object.fromEntries(SHADOW_SIZES.map((s) => [`shadow-${s}`, `var(--shadow-${s})`])),
                  }
                : {}),
            },
          }
        : {}),
      light: {
        ...pick("light"),
        radius: t.radius,
        ...(hasStyle(t) ? Object.fromEntries(Object.entries(styleVars(t)).map(([k, v]) => [k.slice(2), v])) : {}),
      },
      dark: pick("dark"),
    },
    ...(hasStyle(t) && styleRules(t) ? { css: { [`@layer base`]: shadcnRules(styleRules(t)) } } : {}),
    // Fonts come from registry:font items (next/font in Next.js, Fontsource elsewhere), not a CSS
    // @import: after `@import "tailwindcss"` an @import url() is invalid and gets dropped.
    ...(fontItems.length ? { registryDependencies: fontItems.map((f) => `${SITE_URL}/r/shadcn/${f.name}.json`) } : {}),
  };
}

// One registry:font item per theme role (body = --font-sans, headings = --font-display).
const firstFamily = (stack) =>
  stack
    .split(",")[0]
    .trim()
    .replace(/^['"]|['"]$/g, "");
function fontWeights(spec) {
  const [, axesPart = "", values = ""] = spec.match(/^[^:]+(?::([^@]+)@(.+))?$/) ?? [];
  const axes = axesPart.split(",");
  const w = axes.indexOf("wght");
  if (w < 0) return ["400"];
  const weights = values
    .split(";")
    .map((tuple) => tuple.split(",")[w])
    .filter((v) => /^\d+$/.test(v));
  return [...new Set(weights.length ? weights : ["400"])];
}
function shadcnFonts(t) {
  return ["sans", "display"].flatMap((role) => {
    const family = firstFamily(t.fonts[role]);
    const spec = (t.fonts.googleFonts ?? []).find((g) => g.split(":")[0].replace(/\+/g, " ") === family);
    if (!spec) return [];
    return [
      {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: `font-${t.slug}-${role}`,
        type: "registry:font",
        title: `${family} (${t.name} ${role === "sans" ? "body" : "display"} font)`,
        description: `${family} from Google Fonts as --font-${role}, for the ${t.name} theme.`,
        font: {
          family,
          provider: "google",
          import: family.replace(/ /g, "_"),
          variable: `--font-${role}`,
          weight: fontWeights(spec),
          subsets: ["latin"],
          ...(role === "display" ? { selector: "h1, h2, h3, h4, h5, h6" } : {}),
          dependency: `@fontsource/${family.toLowerCase().replace(/ /g, "-")}`,
        },
      },
    ];
  });
}

// Index the shadcn CLI reads for `shadcn search @copypasteui` and shadcn's MCP server
// (fetched as {name} = "registry" through the namespace URL template).
function shadcnRegistry(components, themes) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "copypasteui",
    homepage: SITE_URL,
    items: [
      ...components.map((c) => ({
        name: c.slug,
        type: "registry:block",
        title: c.name,
        description: c.description,
        categories: [c.category, ...(c.tags ?? [])],
      })),
      ...themes.map((t) => ({
        name: `theme-${t.slug}`,
        type: "registry:theme",
        title: `${t.name} theme`,
        description: t.description,
      })),
    ],
  };
}

// ---------- templates ----------

function loadTemplates(components, themes) {
  const dir = path.join(REGISTRY, "templates");
  const bySlug = new Map(components.map((c) => [c.slug, c]));
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const file = path.join(dir, f);
      const t = readJson(file);
      if (!t) return null;
      const slug = f.replace(/\.json$/, "");
      if (t.slug !== slug) fail(file, `slug must equal the file name "${slug}"`);
      checkText(file, t.name, "name", 60);
      checkText(file, t.description, "description", 240);
      checkAuthor(file, t.author);
      if (!themes.some((th) => th.slug === t.theme)) fail(file, `theme "${t.theme}" does not exist`);
      if (!Array.isArray(t.sections) || t.sections.length < 2) fail(file, "sections must list at least two component slugs");
      for (const s of t.sections ?? []) if (!bySlug.has(s)) fail(file, `section "${s}" is not a component slug`);
      checkImages(file, t.images, "template");
      return { ...t, slug };
    })
    .filter(Boolean);
}

// How to write the copy when rewriting a template for a real business: the essentials of
// .claude/skills/website-copy, phrased for an AI builder. The business is real, so nothing gets invented.
const COPY_RULES = `## Writing the copy
- Be specific: prices, opening hours, the street and town, the services by name. If a detail is missing, ask for it or leave a clearly marked gap, and list the gaps at the end. Never invent reviews, ratings, awards or customer numbers.
- Write the way the owner talks to a customer, in the trade's own words. Use the everyday word: "use", not "utilise".
- Headings name what the section is about ("Opening hours", "Prices"). Buttons say what happens ("Book a table", "Get a quote"), never "Learn more" or "Submit".
- Skip the phrases that make a site sound generated: "Welcome to", "Elevate your", "Discover", "Look no further", "passionate about", "trusted by", "seamless", and groups of three adjectives.
- No em dashes and no exclamation marks. Vary sentence length by writing different sentences, not by chopping them into fragments.
- Cards, features and FAQ answers can differ in length; they shouldn't all have the same shape.
- Keep every price, time, condition and warning the owner gives you, at the same strength.`;

function templatePrompt(t, bySlug) {
  const sections = t.sections.map((s) => bySlug.get(s));
  const deps = Object.assign({}, ...sections.map((c) => c.dependencies));
  const install = installCommand(deps);
  return `Build the "${t.name}" landing page in this project from CopyPasteUI components (${SITE_URL}/templates/${t.slug}). Everything is free to use in this project.

${t.description}

## Requirements
- React 18+ with Tailwind CSS.
${install ? `- Install dependencies: \`${install}\`` : ""}

## Page structure (top to bottom)
${sections.map((c, i) => `${i + 1}. ${c.name} — \`${installPath(c)}\``).join("\n")}

Create each file below unchanged, then render them in this order on one page. Afterwards, rewrite the placeholder copy so the whole page tells one consistent story for: ${t.brief ?? "the user's product"}.

${COPY_RULES}

${CREDIT_NOTE}

${sections.map((c) => `### ${installPath(c)}\n\`\`\`tsx\n${c.code.trimEnd()}\n\`\`\``).join("\n\n")}

{{THEME}}`;
}

// ---------- backend recipes ----------

// registry/recipes/<slug>.json (meta) + <slug>.md (steps), plus _data-model.md shared by all of them.
// Each recipe is published with a ready prompt: the data model and access table, then its own steps.
const RECIPE_AUDIENCES = new Set(["builders", "developers"]);
function loadRecipes() {
  const dir = path.join(REGISTRY, "recipes");
  if (!fs.existsSync(dir)) return { recipes: [], model: "" };
  const modelFile = path.join(dir, "_data-model.md");
  const model = fs.existsSync(modelFile) ? fs.readFileSync(modelFile, "utf8").trim() : "";
  if (!model) fail(dir, "missing _data-model.md");
  const recipes = [];
  const ranks = new Set();
  for (const file of fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()) {
    const slug = file.replace(/\.json$/, "");
    const metaFile = path.join(dir, file);
    const bodyFile = path.join(dir, `${slug}.md`);
    const meta = readJson(metaFile);
    if (!meta) continue;
    if (meta.slug !== slug) fail(metaFile, `slug must be "${slug}"`);
    checkText(metaFile, meta.name, "name", 60);
    checkText(metaFile, meta.summary, "summary", 300);
    checkText(metaFile, meta.bestFor, "bestFor", 200);
    checkText(metaFile, meta.cost, "cost", 160);
    if (!Array.isArray(meta.audience) || !meta.audience.length || meta.audience.some((a) => !RECIPE_AUDIENCES.has(a)))
      fail(metaFile, "audience must list builders and/or developers");
    if (!Number.isInteger(meta.rank) || ranks.has(meta.rank)) fail(metaFile, "rank must be a unique whole number (1 = most used)");
    ranks.add(meta.rank);
    const covers = meta.covers ?? "full";
    if (!["full", "content"].includes(covers)) fail(metaFile, 'covers must be "full" or "content"');
    for (const d of meta.docs ?? [])
      if (!d.label || !/^https:\/\//.test(d.href ?? "")) fail(metaFile, "docs need a label and an https:// link");
    if (!fs.existsSync(bodyFile)) {
      fail(dir, `missing ${slug}.md`);
      continue;
    }
    const body = fs.readFileSync(bodyFile, "utf8").trim();
    // A full recipe must cover the parts that keep the owner's data safe.
    if (covers === "full") {
      if (!/first owner/i.test(body)) fail(bodyFile, "must explain how to create the first owner");
      if (!/\/admin/.test(body)) fail(bodyFile, "must explain how /admin is protected");
    }
    if (meta.tested !== undefined) checkText(metaFile, meta.tested, "tested", 300);
    recipes.push({
      slug,
      name: meta.name,
      summary: meta.summary,
      audience: meta.audience,
      bestFor: meta.bestFor,
      cost: meta.cost,
      rank: meta.rank,
      covers,
      docs: meta.docs ?? [],
      ...(meta.tested ? { tested: meta.tested } : {}),
      body,
    });
  }
  return { recipes: recipes.sort((a, b) => a.rank - b.rank), model };
}

function recipePrompt(r, model) {
  const scope =
    r.covers === "content"
      ? "This recipe covers public content only (menu, prices, hours, closures, business details)."
      : 'Set up the back office for this site with this backend, following every step. The back-office screens are the CopyPasteUI "admin" components (admin-sign-in, admin-overview, admin-bookings …); each takes its data and save actions as props.';
  return `# Back office with ${r.name}

${scope} Best for: ${r.bestFor} Cost: ${r.cost}

${model}

# ${r.name}: steps

${r.body}

Docs to check before you start, since providers change their APIs: ${r.docs.map((d) => `${d.label} (${d.href})`).join("; ") || "the provider's current documentation"}.
`;
}

// ---------- emit ----------

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

// The README can't read the registry, so the build writes its numbers: <!-- count:themes -->61<!-- /count -->.
const README = path.join(ROOT, "README.md");
function readmeWithCounts(counts) {
  return fs.readFileSync(README, "utf8").replace(/(<!-- count:([a-z]+) -->)[^<]*(<!-- \/count -->)/g, (whole, open, key, close) => {
    if (!(key in counts)) {
      errors.push(`README.md: unknown count "${key}" (known: ${Object.keys(counts).join(", ")})`);
      return whole;
    }
    return `${open}${counts[key]}${close}`;
  });
}

function main() {
  const themes = loadThemes();
  const components = loadComponents();
  const templates = loadTemplates(components, themes);
  const { recipes, model: recipeModel } = loadRecipes();
  for (const c of components) {
    if (c.previewTheme && !themes.some((t) => t.slug === c.previewTheme)) {
      errors.push(`registry/components/${c.category}/${c.slug}/meta.json: theme "${c.previewTheme}" does not exist`);
    }
    if (c.collection && !templates.some((t) => t.slug === c.collection)) {
      errors.push(`registry/components/${c.category}/${c.slug}/meta.json: collection "${c.collection}" is not a template slug`);
    }
  }
  if (!themes.some((t) => t.default)) errors.push('registry/themes: exactly one theme must set "default": true');

  const counts = {
    sections: components.length,
    categories: new Set(components.map((c) => c.category)).size,
    themes: themes.length,
    templates: templates.length,
    backgrounds: components.filter((c) => c.category === "background").length,
    photobackgrounds: components.filter((c) => c.category === "background" && c.code.includes("images.unsplash.com")).length,
  };
  counts.codebackgrounds = counts.backgrounds - counts.photobackgrounds;
  // Throwaway registry copies in tests have their own counts, so only the real registry is held to the README.
  const readme = process.env.COPYPASTEUI_REGISTRY_SRC ? null : readmeWithCounts(counts);
  if (CHECK_ONLY && readme !== null && readme !== fs.readFileSync(README, "utf8"))
    errors.push("README.md: the library counts are out of date. Run `npm run registry:build` and commit README.md");

  if (errors.length) {
    console.error(`Registry validation failed (${errors.length}):\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`Registry OK: ${components.length} components, ${themes.length} themes, ${templates.length} templates`);
  if (CHECK_ONLY) return;

  const defaultTheme = themes.find((t) => t.default).slug;
  const version = new Date().toISOString();

  const themeOfTemplate = new Map(templates.map((t) => [t.slug, t.theme]));
  const fullComponents = components
    .map((c) => ({ ...c, code: withNotice(c) }))
    .map((c) => ({
      ...c,
      theme: (c.collection && themeOfTemplate.get(c.collection)) || c.previewTheme || defaultTheme,
      url: `${SITE_URL}/components/${c.category}/${c.slug}`,
      previewUrl: `${SITE_URL}/preview/${c.slug}`,
      thumbnailUrl: c.images.thumbnail,
      ogImageUrl: c.images.thumbnail,
      previewVideoUrl: c.images.preview ?? null,
      installPath: installPath(c),
      installCommand: installCommand(c.dependencies),
      shadcnUrl: `${SITE_URL}/r/shadcn/${c.slug}.json`,
      prompt: componentPrompt(c),
    }));
  const fullBySlug = new Map(fullComponents.map((c) => [c.slug, c]));
  const fullThemes = themes.map((t) => ({
    ...t,
    googleFontsUrl: googleFontsUrl(t),
    css: themeCss(t),
    style: themeStyle(t),
    styleVars: styleVars(t),
    styleRules: styleRules(t),
    tailwindV4: themeTailwindV4(t),
    tailwindV3: themeTailwindV3(t),
    promptBlock: themePromptBlock(t),
    shadcnUrl: `${SITE_URL}/r/shadcn/theme-${t.slug}.json`,
    thumbnailUrl: t.images.thumbnail,
    ogImageUrl: t.images.thumbnail,
  }));
  const fullTemplates = templates
    .map((t) => ({ ...t, isCollection: components.some((c) => c.collection === t.slug) }))
    .sort((a, b) => Number(b.isCollection) - Number(a.isCollection))
    .map((t) => ({
      ...t,
      url: `${SITE_URL}/templates/${t.slug}`,
      thumbnailUrl: t.images.thumbnail,
      fullPageImageUrl: t.images.fullPage ?? t.images.thumbnail,
      ogImageUrl: t.images.thumbnail,
      previewVideoUrl: t.images.preview ?? null,
      prompt: templatePrompt(t, fullBySlug),
    }));

  const summary = ({ code, prompt, ...rest }) => rest;
  const index = {
    name: "copypasteui",
    version,
    site: SITE_URL,
    defaultTheme,
    categories: CATEGORIES.map((c) => ({ ...c, count: components.filter((x) => x.category === c.slug).length })),
    components: fullComponents.map(summary),
    themes: fullThemes.map(({ css, tailwindV4, tailwindV3, promptBlock, ...t }) => t),
    templates: fullTemplates.map(summary),
  };

  const pub = path.join(ROOT, "apps/web/public/r");
  fs.rmSync(pub, { recursive: true, force: true });
  writeJson(path.join(pub, "index.json"), index);
  for (const c of fullComponents) {
    writeJson(path.join(pub, "components", `${c.slug}.json`), c);
    writeJson(path.join(pub, "shadcn", `${c.slug}.json`), shadcnItem(c));
  }
  for (const t of fullThemes) {
    writeJson(path.join(pub, "themes", `${t.slug}.json`), t);
    writeJson(path.join(pub, "shadcn", `theme-${t.slug}.json`), shadcnTheme(t));
    for (const f of shadcnFonts(t)) writeJson(path.join(pub, "shadcn", `${f.name}.json`), f);
  }
  for (const t of fullTemplates) writeJson(path.join(pub, "templates", `${t.slug}.json`), t);
  writeJson(path.join(pub, "shadcn", "registry.json"), shadcnRegistry(fullComponents, fullThemes));
  const fullRecipes = recipes.map((r) => ({ ...r, url: `${SITE_URL}/r/recipes/${r.slug}.json`, prompt: recipePrompt(r, recipeModel) }));
  writeJson(
    path.join(pub, "recipes", "index.json"),
    fullRecipes.map(({ body, prompt, ...r }) => r),
  );
  for (const r of fullRecipes) writeJson(path.join(pub, "recipes", `${r.slug}.json`), r);

  // Website: copy component sources in so Next can compile them, plus a lazy import map.
  const gen = path.join(ROOT, "apps/web/src/generated");
  fs.rmSync(gen, { recursive: true, force: true });
  fs.mkdirSync(path.join(gen, "components"), { recursive: true });
  for (const c of components) fs.writeFileSync(path.join(gen, "components", `${c.slug}.tsx`), c.code);
  fs.writeFileSync(
    path.join(gen, "component-map.ts"),
    `// Generated by scripts/build-registry.mjs — do not edit.\nimport type { ComponentType } from "react";\n\nexport const componentLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {\n${components
      .map((c) => `  ${JSON.stringify(c.slug)}: () => import(${JSON.stringify(`./components/${c.slug}`)}),`)
      .join("\n")}\n};\n`,
  );
  writeJson(path.join(gen, "registry.json"), { ...index, components: fullComponents, themes: fullThemes, templates: fullTemplates });
  writeJson(
    path.join(gen, "recipes.json"),
    fullRecipes.map(({ body, ...r }) => r),
  );

  // MCP: offline snapshot used when the static API cannot be reached.
  // The MCP installs a theme from its full `css`; the split-out style fields are only for the site's preview.
  writeJson(path.join(ROOT, "packages/mcp/data/registry.json"), {
    ...index,
    components: fullComponents,
    themes: fullThemes.map(({ styleVars, styleRules, ...t }) => t),
    templates: fullTemplates,
    recipes: fullRecipes,
  });
  if (readme !== fs.readFileSync(README, "utf8")) fs.writeFileSync(README, readme);
  console.log("Wrote apps/web/public/r, apps/web/src/generated, packages/mcp/data and the README counts");
}

// Run the build only when executed (`node scripts/build-registry.mjs`), so checks can import the theme helpers.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
