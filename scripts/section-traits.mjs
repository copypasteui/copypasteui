// What a section is made of, read from its code. The style matrix (apps/web/scripts/check-matrix.mjs) pairs
// these traits with theme styles instead of pairing every section with every theme: a glass surface breaks
// faded text, not "the Olea hero" in particular.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const TRAITS = {
  /** Unsplash photos, often with text laid over them. */
  photo: (code) => /images\.unsplash\.com|photo-\d{6,}/.test(code),
  /** A panel in the text colour with the page colour as its text: flips in dark mode. */
  inverted: (code) => /\bbg-foreground\b/.test(code),
  /** Text faded with opacity or a /NN colour: the usual contrast failure in other themes. */
  faded: (code) => /\bopacity-[1-8]0\b|\btext-[a-z-]+\/[1-8][05]\b/.test(code),
  /** Its own fixed dark background (black, rgb() or hex), whatever the theme says. */
  "fixed-dark": (code) => /\bbg-black\b|bg-\[(?:rgb\(|#)/.test(code),
  /** Draws on a canvas or WebGL. */
  canvas: (code) => /<canvas\b|getContext\(/.test(code),
  /** Padded, rounded card panels: what hard, clay and neumorphic shadows and glass restyle. */
  panels: (code) => /\bbg-card\b[^"`]*\brounded|\brounded[^"`]*\bbg-card\b/.test(code),
  /** Secondary (muted) text inside card panels: what glass and tinted surfaces wash out. */
  "muted-panel": (code) => /\bbg-card\b/.test(code) && /\btext-muted-foreground\b/.test(code),
  /** Inputs and forms. */
  form: (code) => /<form\b|<input\b|<select\b|<textarea\b/.test(code),
};

export const traitsOf = (code) => Object.keys(TRAITS).filter((t) => TRAITS[t](code));

/** Every section's traits: { slug: { category, traits } }. */
export function sectionTraits(root = ROOT) {
  const dir = path.join(root, "registry/components");
  const out = {};
  for (const category of fs.readdirSync(dir)) {
    const cat = path.join(dir, category);
    if (!fs.statSync(cat).isDirectory()) continue;
    for (const slug of fs.readdirSync(cat)) {
      const file = path.join(cat, slug, "component.tsx");
      if (fs.existsSync(file)) out[slug] = { category, traits: traitsOf(fs.readFileSync(file, "utf8")) };
    }
  }
  return out;
}
