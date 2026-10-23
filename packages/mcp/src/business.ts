// Small-business helpers behind suggest_sections and fill_business_details.
import fs from "node:fs";
import path from "node:path";
import { rankTemplates } from "./match.js";
import { searchComponents, type ComponentSummary, type Index } from "./registry.js";

export { rankTemplates };

// ---------------------------------------------------------------------------------------------
// suggest_sections

// What a section does on a small-business page, by category.
const ROLE: Record<string, string> = {
  hero: "First screen: who you are, where, and the main action",
  navbar: "Navigation",
  menu: "The offering: menu or price list",
  products: "The offering: products",
  pricing: "The offering: prices or packages",
  features: "The offering: services",
  cards: "The offering: services or listings",
  gallery: "Showcase: photos of the work or place",
  "how-it-works": "How it works: what happens after someone gets in touch",
  team: "The people",
  stats: "Proof: numbers",
  testimonials: "Proof: reviews",
  logos: "Proof: clients or partners",
  events: "What's on",
  blog: "News and stories",
  faq: "Answers before people call",
  contact: "The conversion: book, call, visit or ask",
  cta: "The conversion: one clear next step",
  footer: "Footer: address, hours, links",
  pages: "Utility page: 404, legal, thank-you, notices",
  admin: "Back office: the owner's screens behind sign-in",
};

export function suggestSections(index: Index, business: string, alternatives = 2) {
  const ranked = rankTemplates(index.templates, business);
  const best = ranked[0];
  if (!best) return null;
  const bySlug = new Map(index.components.map((c) => [c.slug, c]));
  const query = `${business} ${best.brief ?? ""}`;
  const sections = best.sections
    .map((s) => bySlug.get(s))
    .filter((c): c is ComponentSummary => !!c)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      category: c.category,
      role: ROLE[c.category] ?? c.category,
      // Same kind of section from the next-closest trades first, then general-purpose ones.
      alternatives: [
        ...ranked
          .slice(1)
          .flatMap((t) => t.sections.map((x) => bySlug.get(x)).filter((x): x is ComponentSummary => x?.category === c.category)),
        ...searchComponents(
          index.components.filter((x) => x.category === c.category && !x.collection),
          { query, limit: alternatives },
        ),
      ]
        .slice(0, alternatives)
        .map((x) => ({ slug: x.slug, name: x.name })),
    }));

  // Most small-business sites need these; point out the ones the template doesn't have.
  const have = new Set(sections.map((s) => s.category));
  const missing = [
    { category: "contact", why: "a way to book, call or find you" },
    { category: "testimonials", why: "reviews from real customers" },
    { category: "faq", why: "answers to the questions people ring about" },
  ]
    .filter((m) => !have.has(m.category) && !(m.category === "contact" && have.has("cta")))
    .map((m) => ({
      ...m,
      options: searchComponents(
        index.components.filter((c) => c.category === m.category),
        { query, limit: 3 },
      ).map((c) => ({ slug: c.slug, name: c.name })),
    }));

  return {
    template: { slug: best.slug, name: best.name, theme: best.theme, fits: best.brief ?? null, preview: best.url },
    sections,
    consider: missing,
    otherTemplates: ranked.slice(1, 4).map((t) => ({ slug: t.slug, name: t.name, fits: t.brief ?? null })),
    pages: [
      { page: "Home", use: "the template's sections in order" },
      { page: "About", use: "the story or team section, plus reviews" },
      {
        page: have.has("menu") ? "Menu" : have.has("products") ? "Shop" : "Services & prices",
        use: "the offering section with full detail",
      },
      { page: "Contact", use: "the contact or booking section, map, opening hours" },
      {
        page: "Privacy & terms",
        use: "legal-page — required in the UK and EU if you collect any personal data; add cookie-banner if anything sets tracking cookies",
      },
      { page: "404 and thank-you", use: "not-found-page for old links, thank-you-page after the booking or contact form" },
      {
        page: "Back office (optional)",
        use: 'category "admin": admin-sign-in, admin-overview and the screens for what the site does (bookings, orders, enquiries, menu, hours) — see the build-back-office prompt',
      },
    ],
    next: `Call get_template with slug "${best.slug}" to build the home page, then fill_business_details to swap in the real name, phone and email.`,
  };
}

// ---------------------------------------------------------------------------------------------
// fill_business_details

export type BusinessDetails = {
  name?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  address?: string | undefined;
  website?: string | undefined;
  [extra: string]: string | undefined;
};

const PHONE_RE = /(?<![\w/#-])(?:\+?\d{1,3}[\s.-]?)?(?:\(\d{2,5}\)[\s.-]?|\d{2,5}[\s.-])\d{3,4}[\s.-]?\d{3,4}(?![\w-])/g;
const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const TEL_RE = /tel:[+\d]+/g;
// Things a person should check by eye: UK/US postcodes, times, prices.
const REVIEW = [
  {
    what: "address",
    re: /\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b|\b\d{1,5} [A-Z][a-z]+ (?:Street|St|Road|Rd|Lane|Ave|Avenue|Row|Way|Place|Square)\b/,
  },
  { what: "opening hours", re: /\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\b|\b\d{1,2}:\d{2}\s?[–-]\s?\d{1,2}:\d{2}\b/i },
  { what: "price", re: /[£$€]\s?\d/ },
];
const FILE_RE = /\.(tsx|jsx|ts|js|html|md|mdx)$/;

const listFiles = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return e.name === "node_modules" || e.name.startsWith(".") ? [] : listFiles(p);
        return FILE_RE.test(e.name) ? [p] : [];
      })
    : [];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The brand names a file was written with, from the CopyPasteUI collection its component belongs to. */
function brandsIn(file: string, index: Index): string[] {
  const exportName = path.basename(file).replace(FILE_RE, "");
  const c = index.components.find((x) => x.exportName === exportName);
  const tpl = c?.collection ? index.templates.find((t) => t.slug === c.collection) : null;
  if (!tpl) return [];
  const brand = (tpl.name.split(" — ")[0] ?? tpl.name).trim();
  // "Little Acorns" is also written "Acorns"; "Hale & Partners" as "Hale".
  const short = brand.replace(/^(The|Little)\s+/, "").split(/\s+(?:&|and)\s+/)[0] ?? brand;
  return [...new Set([brand, short].filter((b) => b.length > 2))];
}

export type FillChange = { file: string; changes: { from: string; to: string; count: number }[] };
export type FillResult = { applied: boolean; files: FillChange[]; review: { file: string; line: number; what: string; text: string }[] };

export function fillBusinessDetails(
  index: Index,
  projectDir: string,
  details: BusinessDetails,
  opts: { dir?: string | undefined; replace?: Record<string, string> | undefined; apply?: boolean | undefined } = {},
): FillResult {
  if (!path.isAbsolute(projectDir)) throw new Error("projectDir must be an absolute path");
  const root = path.resolve(projectDir, opts.dir ?? "components/copypasteui");
  if (root !== path.resolve(projectDir) && !root.startsWith(path.resolve(projectDir) + path.sep))
    throw new Error("dir must stay inside projectDir");
  if (!fs.existsSync(root)) throw new Error(`No such folder: ${root}. Pass dir if the components live elsewhere.`);

  const telDigits = details.phone ? `tel:${details.phone.replace(/[^\d+]/g, "")}` : null;
  const files: FillChange[] = [];
  const review: FillResult["review"] = [];

  for (const file of listFiles(root)) {
    let src = fs.readFileSync(file, "utf8");
    const changes: FillChange["changes"] = [];
    const swap = (re: RegExp, to: string, label?: string) => {
      src = src.replace(re, (m: string, ...rest: unknown[]) => {
        const at = rest.find((x) => typeof x === "number") as number;
        // Leave form placeholders ("you@example.com") alone: they are hints for visitors, not details.
        const before = src.slice(Math.max(0, at - 60), at);
        if (m === to || /placeholder=["'{`][^"'`]*$/.test(before)) return m;
        const c = changes.find((x) => x.from === (label ?? m));
        if (c) c.count++;
        else changes.push({ from: label ?? m, to, count: 1 });
        return to;
      });
    };

    for (const [from, to] of Object.entries(opts.replace ?? {})) if (from && to) swap(new RegExp(escape(from), "g"), to);
    if (details.name) for (const brand of brandsIn(file, index)) swap(new RegExp(`\\b${escape(brand)}\\b`, "g"), details.name);
    if (telDigits) swap(TEL_RE, telDigits);
    if (details.phone) swap(PHONE_RE, details.phone);
    if (details.email) swap(EMAIL_RE, details.email);

    src.split("\n").forEach((line, i) => {
      for (const r of REVIEW)
        if (r.re.test(line))
          review.push({ file: path.relative(projectDir, file), line: i + 1, what: r.what, text: line.trim().slice(0, 120) });
    });
    if (changes.length) {
      files.push({ file: path.relative(projectDir, file), changes });
      if (opts.apply) fs.writeFileSync(file, src);
    }
  }

  if (opts.apply) {
    const saved = Object.fromEntries(Object.entries(details).filter(([, v]) => v));
    fs.writeFileSync(path.join(projectDir, "copypasteui.business.json"), `${JSON.stringify(saved, null, 2)}\n`);
  }
  return { applied: Boolean(opts.apply), files, review: review.slice(0, 60) };
}
