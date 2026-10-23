// Flags patterns that make a section look machine-made: glow blobs, gradient text, the default
// purple AI palette, perfect star ratings, startup buzzwords, emoji, sparkle icons, neon glows and
// the same fade-up on everything. Also two contrast habits that break in other themes: accent as a
// text colour, and text faded below 90%. Used by build-registry.mjs (as errors) and `npm run check:design`.
//
// When a pattern is genuinely the point of a component (an aurora background is made of glow
// blobs), allow it with a comment that says why:  // design-ok: glow-blob — the aurora is the effect

const BUZZWORDS = [
  "unlock",
  "supercharge",
  "seamless",
  "elevate your",
  "revolutioni[sz]e",
  "effortless",
  "next-gen",
  "next generation",
  "cutting-edge",
  "game[- ]chang",
  "all-in-one",
  "10x",
  "next level",
  "trusted by",
  "loved by",
  "empower",
  "harness the power",
  "world-class",
  "state-of-the-art",
  "lightning[- ]fast",
  "blazing",
  "skyrocket",
  "unleash",
  "reimagine",
  "transform your",
  "built for the future",
];
const BUZZ_RE = new RegExp(`\\b(${BUZZWORDS.join("|")})`, "i");

export const DESIGN_RULES = {
  "glow-blob":
    "blurred colour blobs behind content (blur-2xl/3xl or blur-[40px+] on a rounded shape) — use photography, texture, a real shape or nothing",
  "gradient-text":
    "gradient-filled text (bg-clip-text text-transparent) — use one solid colour, weight or an underline/highlight for emphasis",
  "ai-palette": "default purple/violet/indigo/fuchsia Tailwind colours — use theme tokens (bg-primary, text-primary…)",
  "perfect-rating": "a 4.9 or 5.0 star rating — real businesses sit lower; use a review count, a named quote or a number like 4.6–4.8",
  buzzwords: "startup buzzwords in the copy — say what the business actually does, with specifics",
  emoji: "emoji in the copy — use an icon or a word",
  "sparkles-icon": "the Sparkles icon (the universal 'AI' sticker) — pick an icon that means something here",
  "neon-glow": "neon glow shadows (shadow-[0_0_…] or coloured shadow-primary/…) — use a plain shadow, a border or nothing",
  "uniform-fade-up": "the same fade-up entrance on 4+ elements — animate one or two things, or vary how they move",
  "accent-text":
    "accent used as a text colour — accent is a background (with accent-foreground on it) and is unreadable as text in many themes; use text-primary, the panel's foreground, or an accent underline (decoration-accent)",
  "faded-text":
    "text faded below 90% (opacity-*, or a colour like text-muted-foreground/70) — it fails contrast in other themes; use text-muted-foreground on light surfaces or opacity-90 on primary panels",
};

/** Advice, not errors: reported by `npm run check:design` but not failing the build. Contrast is measured for real
 * by `npm run check:a11y`; these flag the habits that tend to fail in themes it doesn't render. */
export const ADVICE = new Set(["accent-text", "faded-text"]);

const strip = (code) => code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** Visible copy: JSX text plus string literals that aren't class names, imports or URLs. */
function copyOf(code) {
  const texts = [];
  for (const m of code.matchAll(/>([^<>{}]+)</g)) texts.push(m[1]);
  for (const m of code.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.)*)\1/g)) {
    const s = m[2];
    if (!/\s/.test(s) || /^(https?:|\.|@|[a-z-]+\/)/.test(s)) continue;
    // Tailwind class strings: mostly tokens with dashes, colons or brackets.
    const tokens = s.split(/\s+/);
    if (
      tokens.filter(
        (t) =>
          /[-:[\]/]/.test(t) ||
          /^(flex|grid|block|hidden|relative|absolute|fixed|italic|uppercase|truncate|border|rounded|shadow|transition|underline)$/.test(t),
      ).length >=
      tokens.length / 2
    )
      continue;
    texts.push(s);
  }
  return texts.join("\n");
}

/** Returns [{ rule, message, detail }] for every tell in a component's source. */
export function designTells(source) {
  const allowed = new Set([...source.matchAll(/design-ok:\s*([a-z-]+)/g)].map((m) => m[1]));
  const code = strip(source);
  const copy = copyOf(code);
  const found = [];
  const hit = (rule, detail) => {
    if (!allowed.has(rule) && !found.some((f) => f.rule === rule)) found.push({ rule, message: DESIGN_RULES[rule], detail });
  };

  for (const m of code.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    const cls = m[1] ?? m[2];
    const blur = cls.replace(/\bbackdrop-blur\S*/g, "").match(/\bblur-(2xl|3xl)\b|\bblur-\[(\d+)px\]/);
    if (blur && (!blur[2] || Number(blur[2]) >= 40) && /rounded-full|rounded-\[50%\]/.test(cls)) hit("glow-blob", cls.slice(0, 80));
    if (/\bbg-clip-text\b/.test(cls) && /\btext-transparent\b/.test(cls)) hit("gradient-text", cls.slice(0, 80));
    if (/\bshadow-\[0_0_\d+px|\bshadow-(primary|accent|purple|violet|indigo|fuchsia)/.test(cls)) hit("neon-glow", cls.slice(0, 80));
  }
  const palette = code.match(/\b(?:bg|text|from|via|to|border|ring|shadow|fill|stroke)-(purple|violet|indigo|fuchsia)-\d{2,3}\b/);
  if (palette) hit("ai-palette", palette[0]);

  if (/\b(Star|StarIcon)\b|rating|reviews?\b|★/i.test(code)) {
    const r = code.match(/(?<![\d.£$€])(4\.9\d?|5\.0)(?![\d%])(?!\s*(?:k|m|km|mi|miles|kg|hrs?|hours|mins?|°|%))/);
    if (r) hit("perfect-rating", r[0]);
  }
  const buzz = copy.match(BUZZ_RE);
  if (buzz) hit("buzzwords", buzz[0]);
  const emoji = copy.match(/\p{Emoji_Presentation}/u);
  if (emoji) hit("emoji", emoji[0]);
  if (/\bimport\s*\{[^}]*\bSparkles\b[^}]*\}\s*from\s*["']lucide-react["']/.test(code)) hit("sparkles-icon", "Sparkles");
  // Contrast habits, checked per JSX element so icons and hidden decorations are left alone.
  const TEXT_TAGS = /^(p|span|a|li|dt|dd|blockquote|h[1-6]|em|strong|small|label|button|motion\.(p|span|li|a|h[1-6]))$/;
  for (const m of code.matchAll(/<([A-Za-z][\w.]*)\s((?:[^<>]|\{[^{}]*\})*?)>/g)) {
    const [tag, attrs] = [m[1], m[2]];
    if (/aria-hidden/.test(attrs) || !TEXT_TAGS.test(tag)) continue;
    const cls = attrs.match(/className=(?:"([^"]*)"|\{`([^`]*)`\})/);
    if (!cls) continue;
    const c = cls[1] ?? cls[2];
    if (/(?:^|[\s:"])text-accent(?![\w-])/.test(c)) hit("accent-text", `<${tag} className="${c.slice(0, 60)}">`);
    const fade = c.match(
      /(?:^|\s)opacity-([1-8]\d)(?!\d)|text-(?:muted-foreground|foreground|background|primary-foreground|card-foreground|secondary-foreground)\/([1-8]\d)\b/,
    );
    if (fade) hit("faded-text", `<${tag} className="${c.slice(0, 60)}">`);
  }

  const fades = code.match(/(?:initial|hidden)\s*[=:]\s*\{\{?\s*opacity:\s*0,\s*y:\s*-?\d+/g) ?? [];
  if (fades.length >= 4) hit("uniform-fade-up", `${fades.length} fade-ups`);

  return found;
}
