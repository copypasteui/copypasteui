import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { githubUrl, requestTradeUrl } from "@/lib/config";
import { industries } from "@/lib/industries";
import { categories, templates } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/contribute"),
  title: "Contribute",
  description: "Add a template for a new trade, a section, a theme or a backend recipe to CopyPasteUI, or tell us what's missing.",
};

const meta = `{
  "slug": "marlowe-lookbook",
  "name": "Marlowe Lookbook",
  "description": "Autumn lookbook with a swipeable rail of outfits and prices.",
  "category": "gallery",
  "tags": ["fashion", "boutique", "carousel"],
  "author": { "name": "Your Name", "github": "your-github" },
  "dependencies": { "motion": ">=12.0.0" },
  "collection": "marlowe-boutique",
  "createdAt": "2026-10-21"
}`;

const rules: [string, string][] = [
  ["One self-contained file", 'component.tsx starts with "use client" and has a named default export.'],
  [
    "Three imports",
    "Only react, motion and lucide-react, and meta.json lists exactly what you import. Need another package? Open an issue first.",
  ],
  ["Safe", "No fetch, storage, cookies, eval or dangerouslySetInnerHTML. Data and save actions come in as props."],
  ["Themeable", "Theme tokens (bg-background, text-primary, border-border, font-display, rounded-lg…), not hard-coded colours."],
  [
    "Looks made by a person",
    "CI rejects what makes a section read as AI output: blurred colour blobs, gradient text, neon glows, the Sparkles icon, emoji, 4.9-star ratings, buzzwords like “seamless” or “unlock”, and the same fade-up on everything. Write specifics instead: names, places, prices, hours.",
  ],
  [
    "Original work",
    "Fictional brands and your own copy. No real logos or copied designs. Photos only from Unsplash (free, not Unsplash+).",
  ],
  ["Works for everyone", "Fits a 360px phone without scrolling sideways, works with a keyboard, and calms down for reduced motion."],
];

const Code = ({ children }: { children: string }) => (
  <pre className="mt-4 overflow-x-auto rounded-lg border border-foreground bg-[#141412] p-5 font-mono text-[13px] leading-relaxed text-[#e9e6da]">
    {children}
  </pre>
);

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="mt-16 scroll-mt-24 font-display text-3xl font-extrabold tracking-tight">
    {children}
  </h2>
);

export default function ContributePage() {
  const covered = industries.map((g) => ({ name: g.name, count: g.slugs.filter((s) => templates.some((t) => t.slug === s)).length }));
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Contribute</p>
      <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        The most useful thing you can add is <span className="highlight">a new trade</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Everything lives in one GitHub repository. Open a pull request, CI checks it, and once merged it appears on the site and in
        everyone&apos;s editor on the next deploy, credited to you.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "No code? Ask for a trade",
            body: "Tell us the kind of business that's missing. The most-requested get built first.",
            href: requestTradeUrl(),
            label: "Request a trade",
          },
          {
            title: "Found a problem?",
            body: "Something broken, unclear or wrong in a prompt? Say so and it goes on the list.",
            href: `${githubUrl}/issues/new`,
            label: "Open an issue",
          },
          {
            title: "Write code? Add a template",
            body: "Six sections for one fictional business in a trade we don't cover yet.",
            href: "#template",
            label: "How to add one",
          },
        ].map((c) => (
          <a
            key={c.title}
            href={c.href}
            {...(c.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="flex flex-col rounded-lg border border-foreground bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--foreground)] transition hover:-translate-y-0.5"
          >
            <span className="font-display text-lg font-bold">{c.title}</span>
            <span className="mt-2 text-sm text-muted-foreground">{c.body}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold">
              {c.label} <ArrowRight className="size-4" />
            </span>
          </a>
        ))}
      </div>

      <H2 id="template">Add a template for a new trade</H2>
      <p className="mt-4 text-muted-foreground">
        A template is a <b className="text-foreground">collection</b>: one fictional business with its own theme and six sections written
        for its trade: a hero with navigation, the offering (menu, services, rooms, products), a story or showcase, proof (reviews or
        results), the action the business really needs (book, call, order, quote, donate) and a footer.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Covered so far: {covered.map((g) => `${g.name} (${g.count})`).join(" · ")}. Gaps worth filling: opticians, tattoo studios, driving
        schools, removals, tutors and pharmacies.
      </p>
      <ol className="mt-6 list-decimal space-y-3 pl-5">
        <li>
          Add the six sections (below), each with <code>&quot;collection&quot;: &quot;&lt;template-slug&gt;&quot;</code> in its meta.json.
        </li>
        <li>
          Add a theme for the brand in <code>registry/themes/&lt;slug&gt;.json</code>.
        </li>
        <li>
          Add <code>registry/templates/&lt;slug&gt;.json</code> with <code>name</code> (&ldquo;Brand — Kind of business&rdquo;),{" "}
          <code>description</code>, <code>brief</code> (the businesses it suits, e.g. &ldquo;a florist, flower farm or gift shop&rdquo;; the
          plan page and the MCP match on it), <code>theme</code>, <code>author</code> and <code>sections</code> in page order.
        </li>
        <li>
          Add its slug to an industry group in <code>apps/web/src/lib/industries.ts</code>.
        </li>
      </ol>

      <H2 id="section">Add a section</H2>
      <Code>{`registry/components/<category>/<your-slug>/
  component.tsx
  meta.json`}</Code>
      <p className="mt-4 text-sm text-muted-foreground">Categories: {categories.map((c) => c.slug).join(", ")}.</p>
      <p className="mt-6 font-semibold">meta.json</p>
      <Code>{meta}</Code>
      <p className="mt-4 text-sm text-muted-foreground">
        Leave out <code>collection</code> for a section that isn&apos;t part of a template. Add <code>usage</code> for page-level pieces
        (utility pages, back-office screens) to tell the AI how to wire them up.
      </p>

      <h3 className="mt-10 font-display text-xl font-bold">Rules</h3>
      <dl className="mt-4 divide-y divide-border border-y border-border">
        {rules.map(([t, d]) => (
          <div key={t} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
            <dt className="font-semibold">{t}</dt>
            <dd className="text-muted-foreground">{d}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">
        If a flagged pattern really is the point, as in an aurora background, allow it with a comment that says why:{" "}
        <code>{"// design-ok: glow-blob — the aurora is the effect"}</code>.
      </p>

      <h3 className="mt-10 font-display text-xl font-bold">Check it locally</h3>
      <Code>{`npm install
npm run registry:validate   # the same checks as CI
npm run check:design        # the "looks made by a person" report
npm run dev                 # preview at http://localhost:3000/components`}</Code>
      <p className="mt-4 text-sm text-muted-foreground">
        Look at it in a few themes, light and dark, at phone width. You don&apos;t need to make screenshots: CI renders thumbnails and share
        images.
      </p>

      <H2 id="theme">Add a theme</H2>
      <p className="mt-4 text-muted-foreground">
        Copy an existing file in <code>registry/themes/</code>. Every token needs a light and a dark value, plus a radius and two fonts. The
        validator checks contrast in both modes and tells you which pair to fix.
      </p>

      <H2 id="recipe">Add a backend recipe</H2>
      <p className="mt-4 text-muted-foreground">
        Recipes set up the back office on one backend. Each follows the shared data model and access table, creates the first owner and
        protects <code>/admin</code> on the server. CI rejects one that doesn&apos;t. Appwrite, Xano, Directus or a builder we don&apos;t
        cover would all be welcome.{" "}
        <Link href="/components/admin#backend" className="font-semibold text-foreground hover:highlight">
          See the current recipes →
        </Link>
      </p>

      <H2 id="credit">Credit and licence</H2>
      <p className="mt-4 text-muted-foreground">
        You keep the copyright and you&apos;re credited on everything you add. Contributions are shared under the project licence (PolyForm
        Shield 1.0.0), and you can mark your own sections or themes MIT, Apache-2.0 or CC0 instead. You&apos;re free to publish them
        elsewhere too.
      </p>

      <a
        href={`${githubUrl}/blob/main/CONTRIBUTING.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex items-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-3 font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
      >
        Read the full guide on GitHub <ArrowRight className="size-4" />
      </a>
    </main>
  );
}
