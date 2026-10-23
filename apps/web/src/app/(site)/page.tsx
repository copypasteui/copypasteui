import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CommandChip from "@/components/CommandChip";
import HeroDemo, { type DemoSite } from "@/components/HeroDemo";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import Terminal, { Call, File, Out, Prompt } from "@/components/Terminal";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Thumb from "@/components/Thumb";
import { config, githubUrl } from "@/lib/config";
import { JsonLd, canonical, owner } from "@/lib/seo";
import { industries } from "@/lib/industries";
import { components, getTemplate, getTheme, summarize, templates, themes, withTheme, type TemplateItem } from "@/lib/registry";

const demo: { slug: string; business: string; ask: string }[] = [
  { slug: "olea-restaurant", business: "Restaurant", ask: "Build a site for my seafood restaurant in Falmouth. Menu, bookings, reviews." },
  { slug: "verelle-salon", business: "Hair salon", ask: "A website for my hair salon with prices, stylists and online booking." },
  { slug: "gearwright-garage", business: "Garage", ask: "Make a site for our MOT and servicing garage. Show prices and a repair tracker." },
  { slug: "hollow-creek-farm", business: "Farm shop", ask: "Farm shop website: veg boxes, opening times, pick-your-own calendar." },
  { slug: "mossbrook-vets", business: "Vet", ask: "Website for a small-animal vet practice, with emergency line and booking." },
  { slug: "canopy-resort", business: "Resort", ask: "Treehouse resort site with rooms, rates, experiences and a stay planner." },
];

const showcaseTemplate = "ledger-accountants";

// Ordered by how many people use each tool (2026 figures); same order as /get-started and /developers.
const builderTools = ["ChatGPT", "Replit", "Lovable", "Bolt", "v0", "Claude", "Gemini"];
const editorTools = ["Claude Code", "VS Code", "Codex", "Cursor", "Windsurf", "Gemini CLI"];

export const metadata = { ...canonical("/") };

export default function Home() {
  const sites: DemoSite[] = demo
    .filter((d) => getTemplate(d.slug))
    .map((d) => ({ ...d, brand: getTemplate(d.slug)!.name.split(" — ")[0] ?? d.slug, fullPage: getTemplate(d.slug)!.fullPageImageUrl }));
  const groups = industries.map((g) => ({ ...g, items: g.slugs.map((s) => getTemplate(s)).filter((t): t is TemplateItem => !!t) }));

  // The real prompt for one template, cut where the component code starts.
  const sample = getTemplate("olea-restaurant")!;
  const samplePrompt = withTheme(sample.prompt, getTheme(sample.theme));
  const promptHead = samplePrompt.slice(0, samplePrompt.indexOf("Create each file below")).trim();
  const promptLines = samplePrompt.split("\n").length;

  const switcherThemes = themes.slice(0, 24).map((t) => ({
    slug: t.slug,
    name: t.name,
    primary: t.light.primary,
    background: t.light.background,
    accent: t.light.accent,
    thumbnail: t.thumbnailUrl,
  }));

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: config.siteName,
          url: config.siteUrl,
          description:
            "Free website templates and sections for small businesses, ready for AI builders like Lovable, Bolt and v0, or to install from your editor.",
          inLanguage: "en",
          publisher: owner,
        }}
      />
      {/* Hero */}
      <section className="border-b border-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {templates.length} templates · {components.length} sections · {themes.length} themes · free
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
              Paste a whole <span className="highlight">small-business website</span> into your AI builder.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Restaurants, salons, garages, vets, farm shops: each template is a complete site with its own theme and real photography.
              Paste one prompt into ChatGPT, Lovable, Bolt or v0. Working in code? Install it from Claude Code, VS Code or Cursor instead.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-6 py-3 font-semibold text-background shadow-[0_3px_0_var(--accent)] transition hover:-translate-y-px active:translate-y-0.5 active:shadow-none"
              >
                Pick a template <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-card px-6 py-3 font-semibold shadow-[0_3px_0_var(--foreground)] transition hover:-translate-y-px active:translate-y-0.5 active:shadow-none"
              >
                Use it in your editor
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">No account. No API key. Free for client work.</p>
          </div>
          <HeroDemo sites={sites} />
        </div>
      </section>

      {/* Two doors */}
      <section aria-labelledby="how-build" className="border-b border-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 id="how-build" className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            How do you build?
          </h2>
          <div className="mt-8 grid grid-cols-1 border-t border-l border-foreground md:grid-cols-2">
            <div className="flex min-w-0 flex-col border-r border-b border-foreground p-6 md:p-8">
              <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">With an AI builder · no code</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Pick, personalise, paste, publish.</h3>
              <ol className="mt-5 space-y-2.5 text-[15px]">
                {[
                  "Pick a template for your kind of business",
                  "Add your name, town and phone; they go into the prompt",
                  "Paste it into your tool and publish",
                ].map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-sm bg-accent font-mono text-xs font-semibold text-accent-foreground ring-1 ring-foreground">
                      {i + 1}
                    </span>
                    {x}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-muted-foreground">Works in {builderTools.join(", ")}.</p>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
                <Link href="/plan" className="inline-flex items-center gap-2 font-semibold hover:highlight">
                  Plan my site in 3 minutes <ArrowRight className="size-4" />
                </Link>
                <Link href="/get-started" className="inline-flex items-center gap-2 font-semibold hover:highlight">
                  Step-by-step guide <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-col border-r border-b border-foreground p-6 md:p-8">
              <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">In code · for developers</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">
                Install sections by name. They follow your theme.
              </h3>
              <div className="mt-5 space-y-2.5">
                <CommandChip command="npx copypasteui.dev setup" />
                <CommandChip command="npx shadcn@latest add @copypasteui/olea-hero" />
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Local MCP for {editorTools.join(", ")}; or the shadcn CLI, our CLI and a static JSON API.
              </p>
              <Link href="/developers" className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold hover:highlight">
                Developer docs <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry index */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">What kind of business is it for?</h2>
          <Link href="/templates" className="font-semibold hover:highlight">
            All {templates.length} templates →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 border-t border-l border-foreground sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <Link
              key={g.id}
              href={`/templates#${g.id}`}
              className="group flex min-w-0 flex-col border-r border-b border-foreground p-5 transition hover:bg-card"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold">{g.name}</h3>
                <span className="font-mono text-xs text-muted-foreground">{String(g.items.length).padStart(2, "0")}</span>
              </div>
              {/* Takes the spare height, so every card's thumbnail sits at the same level whatever the blurb's length. */}
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{g.blurb}</p>
              <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded border border-border bg-muted">
                {g.items[0] && (
                  <Thumb
                    src={g.items[0].thumbnailUrl}
                    video={g.items[0].previewVideoUrl}
                    previewSrc={`/preview/template/${g.items[0].slug}`}
                    alt={`${g.items[0].name} preview`}
                  />
                )}
              </div>
              <p className="mt-3 truncate text-sm">{g.items.map((t) => t.name.split(" — ")[0]).join(" · ")}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What one prompt contains */}
      <section className="border-y border-foreground bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">What&apos;s inside one prompt.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              You don&apos;t have to read it. Your AI tool does. It&apos;s long on purpose: this is the start of the real prompt for the
              Olea restaurant template, and it goes on to carry every section&apos;s code in full, so the result looks like the preview
              instead of a guess.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                `The page structure: ${sample.sections.length} sections, in order`,
                "Every section's full design, not a description of it",
                "The theme: colours for light and dark, radius and fonts",
                "Dependencies to install, and where each file goes",
                "Your business name, town and contact, if you add them",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-accent ring-1 ring-foreground" />
                  {x}
                </li>
              ))}
            </ul>
            <Link href={`/templates/${sample.slug}`} className="mt-8 inline-flex items-center gap-2 font-semibold hover:highlight">
              Open the Olea template <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="min-w-0 overflow-hidden slip">
            <div className="flex items-center justify-between gap-3 border-b border-dashed border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
              <span>olea-restaurant.prompt.md</span>
              <span>{promptLines.toLocaleString("en-GB")} lines</span>
            </div>
            <pre className="max-h-[440px] overflow-hidden [mask-image:linear-gradient(black_75%,transparent)] p-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap">
              {promptHead}
            </pre>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Same page, {themes.length} looks.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every section reads shared tokens, so a theme changes colours, radius and fonts across the whole site at once. Pick a theme to
              restyle the {getTemplate(showcaseTemplate)?.name.split(" — ")[0]} template.
            </p>
          </div>
          <Link href="/themes" className="font-semibold hover:highlight">
            All themes →
          </Link>
        </div>
        <div className="mt-10">
          <ThemeSwitcher themes={switcherThemes} template={getTemplate(showcaseTemplate)?.name ?? showcaseTemplate} />
        </div>
      </section>

      {/* Sections */}
      <section className="border-t border-foreground pt-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Or build it section by section.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {components.length} heroes, menus, booking widgets, price lists and footers you can mix across templates.
            </p>
          </div>
          <Link href="/components" className="font-semibold hover:highlight">
            Browse sections →
          </Link>
        </div>
        <div className="mt-10">
          <ShowcaseBanner items={components.map(summarize).filter((c) => c.category !== "navbar" && c.category !== "buttons")} />
        </div>
      </section>

      {/* MCP */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Using an editor? Ask for a section by name.</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            The CopyPasteUI MCP server runs on your machine and gives Claude Code, Cursor, Codex, VS Code and others the whole library. Ask
            for a section in plain words and it lands in your project as a file. It also works with the shadcn CLI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/developers#mcp"
              className="inline-flex items-center gap-2 rounded-md border border-foreground px-5 py-2.5 font-semibold shadow-[0_3px_0_var(--foreground)] transition hover:bg-accent hover:text-accent-foreground active:translate-y-0.5 active:shadow-none"
            >
              Set up the MCP
            </Link>
            <Link href="/developers#shadcn" className="inline-flex items-center px-2 py-2.5 font-semibold hover:highlight">
              Use the shadcn CLI
            </Link>
          </div>
        </div>
        <Terminal title="claude — ~/sites/harbour-kitchen" className="shadow-[6px_6px_0_var(--accent)]">
          <Prompt>add a table booking section like Olea&apos;s under the menu</Prompt>
          <Call tool="search_components" arg='"restaurant booking"' />
          <Call tool="add_component" arg="olea-reservations" />
          <Out>
            wrote <File>src/components/copypasteui/OleaReservations.tsx</File>
          </Out>
          <Out>motion, lucide-react already installed</Out>
          <p>Added the booking section below the menu. It uses your theme tokens, so it matches the rest of the page.</p>
        </Terminal>
      </section>

      {/* Colophon */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 border-t border-foreground pt-12 md:grid-cols-3">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Made in the open</p>
            <p className="mt-3">
              Every template and section is a folder in a public repo. Add one with a pull request and you&apos;re credited on it.
            </p>
            <Link href="/contribute" className="mt-3 inline-block font-semibold hover:highlight">
              How to contribute →
            </Link>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Free to use</p>
            <p className="mt-3">
              Use anything here in your own and your clients&apos; websites. The licence only stops repackaging it as a rival library.
            </p>
            <a href={`${githubUrl}/blob/main/LICENSE`} className="mt-3 inline-block font-semibold hover:highlight">
              Read the licence →
            </a>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Built in the open</p>
            <p className="mt-3">Missing a template for your trade, or found something broken? Say so on GitHub and it goes on the list.</p>
            <a
              href={`${githubUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold hover:highlight"
            >
              Open an issue →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
