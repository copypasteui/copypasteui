import Link from "next/link";
import CommandChip from "@/components/CommandChip";
import McpSetup from "@/components/McpSetup";
import Terminal, { Call, File, Out, Prompt } from "@/components/Terminal";
import { config } from "@/lib/config";
import { recipes } from "@/lib/recipes";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/developers"),
  title: "For developers: MCP server, shadcn registry, CLI and JSON API",
  description:
    "Use CopyPasteUI from Claude Code, VS Code, Codex, Cursor and more through a local MCP server, the shadcn CLI, our CLI or the static JSON API. Free, no account, no API key.",
};

const jump = [
  ["#mcp", "MCP server"],
  ["#shadcn", "shadcn CLI"],
  ["#cli", "CopyPasteUI CLI"],
  ["#llms", "llms.txt"],
  ["#api", "JSON API"],
  ["#theming", "Theming"],
  ["#backends", "Back-office backends"],
  ["#licence", "Licence & contributing"],
];

const facts = ["Runs on your machine", "No account or API key", "No quota", "Works offline"];

// Each tool with something you might actually type to trigger it.
const tools = [
  [
    "plan_website / get_plan",
    "Ask the owner a few short rounds of questions (as forms where the editor supports them) and save the plan to copypasteui.config.json",
    "“help me plan a website for my bakery”",
  ],
  [
    "suggest_sections",
    "Pick the template for a trade, explain each section, suggest pages",
    "“what should a website for a dog groomer have?”",
  ],
  ["search_components", "Find sections by keywords, category or tag", "“find me a pricing table with a monthly/yearly toggle”"],
  ["get_component", "Code, dependencies, theme tokens and integration steps", "“show me how the Gearwright repair tracker works”"],
  [
    "add_component",
    "Writes the .tsx (and theme CSS) into your project and never overwrites a file",
    "“add the Verelle stylists section to the about page”",
  ],
  ["list_themes / get_theme", "Apply one consistent look across every section", "“switch the site to the Hale theme”"],
  ["list_templates / get_template", "Build a complete website in one go", "“build a bakery site from the Crumb template”"],
  [
    "fill_business_details",
    "Swap the sample name, phones and emails for yours; previews first",
    "“put Dyson & Sons, 0113 496 0123 and our email in”",
  ],
  [
    "list_recipes / get_recipe",
    "Backend recipes for the back office: tables, sign-in and access rules for Supabase, Firebase, Convex, Postgres, PocketBase, Cloudflare and more",
    "“set up the back office on Firebase”",
  ],
  ["list_categories", "See what is in the library", "“what kinds of sections are there?”"],
];

const prompts = [
  [
    "plan-my-website",
    "Asks you about the business, what visitors should do, the look, pages, extras and hosting, one short round at a time, and saves the answers so every later chat builds the same site. Say “quick” for just the essentials.",
  ],
  [
    "build-business-website",
    "Follows your saved plan (or asks the quick questions first), picks the template, builds the page, rewrites the copy and fills in your details.",
  ],
  [
    "add-online-booking",
    "Adds a booking section that matches the site and connects it to Cal.com, Calendly, Fresha or a simple email form.",
  ],
  [
    "build-back-office",
    "Adds the owner's screens (bookings, orders, enquiries, menu, hours) behind a secure sign-in, with the database and access rules set up.",
  ],
  [
    "prepare-for-launch",
    "Finds leftover sample details and dead links, checks alt text, legal pages and phone layout, then explains how to deploy.",
  ],
];

const Code = ({ children }: { children: string }) => (
  <pre className="mt-4 overflow-x-auto rounded-lg border border-foreground bg-[#141412] p-5 font-mono text-[13px] leading-relaxed text-[#e9e6da]">
    {children}
  </pre>
);

export default function DevelopersPage() {
  return (
    <main>
      <section className="border-b border-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">For developers</p>
            <h1 className="mt-5 font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1] font-extrabold tracking-[-0.03em]">
              Ask your editor for a section. <span className="highlight">Get a file.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Every template, section and theme is a file you can install: through the local{" "}
              <code className="font-mono text-base text-foreground">copypasteui</code> MCP server in Claude Code, VS Code, Codex or Cursor,
              the shadcn CLI, our CLI, or the static JSON the site is built from.
            </p>
            <CommandChip command="npx copypasteui.dev setup" className="mt-8 max-w-md" />
            <p className="mt-3 text-sm text-muted-foreground">Detects your editors and shows what it will change before it does.</p>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="size-2 rounded-sm bg-accent ring-1 ring-foreground" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <Terminal title="cursor — ~/clients/fern-and-flour" className="shadow-[6px_6px_0_var(--accent)]">
            <Prompt>build this bakery&apos;s homepage from the Crumb template, then add a newsletter signup above the footer</Prompt>
            <Call tool="get_template" arg="crumb-bakery" />
            <Out>
              6 sections · theme <File>crumb</File> · deps motion, lucide-react
            </Out>
            <p className="text-white/55">
              Writing <File>CrumbHero.tsx</File> and 5 more sections, plus the theme tokens in <File>globals.css</File>…
            </p>
            <Call tool="search_components" arg='"newsletter"' />
            <Call tool="add_component" arg="newsletter-cta" />
            <p>
              Done. The homepage has all six Crumb sections with the signup above the footer. I swapped the placeholder copy for Fern &amp;
              Flour&apos;s details.
            </p>
          </Terminal>
        </div>
      </section>

      <nav aria-label="On this page" className="sticky top-16 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          {jump.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-md px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <section id="mcp" className="scroll-mt-32 py-16">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">MCP server</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Connect your editor</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A small Node process your editor starts over stdio. It reads the same static files this site publishes, caches them, and works
            offline from a bundled snapshot.
          </p>
          <div className="mt-6">
            <McpSetup />
          </div>
        </section>

        <section className="py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">What it can do</h2>
          <div className="mt-6 border-t border-foreground">
            {tools.map(([name, body, ask]) => (
              <div key={name} className="grid gap-1 border-b border-border py-4 md:grid-cols-[15rem_1fr_1fr] md:gap-6">
                <code className="font-mono text-sm font-semibold">{name}</code>
                <span className="text-sm text-muted-foreground">{body}</span>
                <span className="text-sm italic">{ask}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Ready-made requests</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Editors that support MCP prompts list these for you. In Claude Code they appear as slash commands. Each one walks the AI through
            the job step by step with the tools above.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {prompts.map(([name, body]) => (
              <div key={name} className="slip p-5">
                <code className="font-mono text-sm font-semibold">{name}</code>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-16 md:grid-cols-[15rem_1fr]">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">How it works without a backend</h2>
          <ol className="space-y-3 text-muted-foreground">
            {[
              <>Contributors add components and themes to the GitHub repo.</>,
              <>
                On deploy, a build script validates them and publishes static JSON under{" "}
                <a href="/r/index.json" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
                  /r/
                </a>
                .
              </>,
              <>
                The MCP fetches those files, caches them in <code className="font-mono text-sm text-foreground">~/.cache/copypasteui</code>{" "}
                for 6 hours, and falls back to its bundled snapshot when offline.
              </>,
              <>
                Set <code className="font-mono text-sm text-foreground">COPYPASTEUI_REGISTRY</code> to a URL or a local folder to use your
                own fork or a private registry.
              </>,
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm text-foreground">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="shadcn" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Already using shadcn/ui? Use its CLI instead</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            CopyPasteUI is a shadcn registry. Add it to your project&apos;s{" "}
            <code className="font-mono text-sm text-foreground">components.json</code> once:
          </p>
          <Code>{`{
  "registries": {
    "@copypasteui": "${config.siteUrl}/r/shadcn/{name}.json"
  }
}`}</Code>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Then install sections and themes by name. The theme brings its fonts (next/font in Next.js) and colour tokens:
          </p>
          <Code>{`npx shadcn@latest add @copypasteui/theme-olea
npx shadcn@latest add @copypasteui/olea-hero @copypasteui/olea-menu
npx shadcn@latest search @copypasteui -q pricing`}</Code>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            shadcn&apos;s own MCP server (<code className="font-mono text-sm text-foreground">npx shadcn@latest mcp init</code>) reads the
            same registry, so your agent can search and install CopyPasteUI items without our MCP. Install one theme per project: adding a
            second one stacks its fonts and overwrites the colours.
          </p>
        </section>

        <section id="cli" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">The CopyPasteUI CLI</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">The same package works from a terminal, without an AI editor:</p>
          <Code>{`npx copypasteui.dev search "pricing toggle"
npx copypasteui.dev add toggle-tier-pricing --theme olea   # writes components/copypasteui/…
npx copypasteui.dev themes
npx copypasteui.dev setup --dry-run                         # register the MCP with your editors`}</Code>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            It never overwrites a file unless you pass <code className="font-mono text-sm text-foreground">--overwrite</code>, and never
            runs npm for you; it prints the install command instead.
          </p>
        </section>

        <section id="llms" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">No MCP? Point your agent at llms.txt</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Agents that can browse the web can read{" "}
            <a href="/llms.txt" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
              /llms.txt
            </a>{" "}
            is a short Markdown map of every template, theme and category with links to the JSON registry, or{" "}
            <a href="/llms-full.txt" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
              /llms-full.txt
            </a>{" "}
            with every component, its tags, dependencies and install commands.
          </p>
        </section>

        <section id="api" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Static JSON API</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            There is no backend. Everything is plain JSON, rebuilt on every deploy, so you can fetch it from anything.
          </p>
          <div className="mt-6 divide-y divide-border border-y border-foreground font-mono text-sm">
            {[
              ["/r/index.json", "every component, theme and template, without code"],
              ["/r/components/{slug}.json", "code, dependencies, install path and the full prompt"],
              ["/r/templates/{slug}.json", "sections in order and the full-page prompt ({{THEME}} slot)"],
              ["/r/themes/{slug}.json", "tokens, CSS, Tailwind v4/v3 wiring and the prompt block"],
              ["/r/shadcn/registry.json", "the shadcn registry index"],
            ].map(([path = "", what]) => (
              <p key={path} className="grid gap-1 py-3 sm:grid-cols-[18rem_1fr]">
                <a
                  href={path
                    .replace("{slug}", "olea-hero")
                    .replace("templates/olea-hero", "templates/olea-restaurant")
                    .replace("themes/olea-hero", "themes/olea")}
                  className="text-foreground underline decoration-accent decoration-2 underline-offset-2"
                >
                  {path}
                </a>
                <span className="font-sans text-muted-foreground">{what}</span>
              </p>
            ))}
          </div>
        </section>

        <section id="theming" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Theming</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Sections only use shadcn-style tokens: <code className="font-mono text-sm text-foreground">bg-background</code>,{" "}
            <code className="font-mono text-sm text-foreground">text-foreground</code>,{" "}
            <code className="font-mono text-sm text-foreground">bg-primary</code>,{" "}
            <code className="font-mono text-sm text-foreground">border-border</code>,{" "}
            <code className="font-mono text-sm text-foreground">font-display</code>,{" "}
            <code className="font-mono text-sm text-foreground">rounded-lg</code> and friends. If your project already has shadcn/ui tokens,
            sections pick them up. Otherwise apply one theme once:
          </p>
          <Code>{`npx shadcn@latest add @copypasteui/theme-olea      # or
npx copypasteui.dev add olea-hero --theme olea          # writes theme-olea.css next to it`}</Code>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every theme has light and dark values, a radius and two fonts.{" "}
            <a href="/themes" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
              Browse themes
            </a>
            .
          </p>
        </section>

        <section id="backends" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Back-office backends</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The admin screens take data and save actions as props, so they sit on any backend. Each recipe gives the same tables and the
            same access rules (public, staff, manager, owner) in that backend&apos;s own terms, plus server-side protection for{" "}
            <code className="font-mono text-sm text-foreground">/admin</code>.
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-foreground text-sm">
            {recipes.map((r) => (
              <li key={r.slug} className="grid gap-1 py-3 sm:grid-cols-[15rem_1fr]">
                <a
                  href={`/r/recipes/${r.slug}.json`}
                  className="font-mono font-semibold underline decoration-accent decoration-2 underline-offset-2"
                >
                  {r.slug}
                </a>
                <span className="text-muted-foreground">
                  {r.name}: {r.bestFor}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Pick one visually on the{" "}
            <Link href="/components/admin#backend" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
              Back office page
            </Link>
            .
          </p>
        </section>

        <section id="licence" className="scroll-mt-32 border-t border-foreground py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Licence and contributing</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Use anything here in your own and your clients&apos; projects, commercial ones included. The licence, PolyForm Shield 1.0.0,
            only rules out building a rival: a competing component library, template kit, site generator or MCP service. Each file starts
            with two notice lines; keep them. Items marked MIT, Apache-2.0 or CC0 keep their own notice.
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Adding a section is one folder with two files, checked by CI and credited to you.{" "}
            <a href="/contribute" className="text-foreground underline decoration-accent decoration-2 underline-offset-2">
              How to contribute
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
