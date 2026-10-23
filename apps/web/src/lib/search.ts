// Compact index for the ⌘K palette, served as /search.json and fetched the first time it opens.
import { componentSearchText } from "@/lib/rank";
import { categories, components, templates, themes } from "@/lib/registry";

export type SearchKind = "template" | "component" | "theme" | "category" | "page";
export type SearchItem = {
  kind: SearchKind;
  slug: string;
  name: string;
  /** One short line under the name. */
  hint: string;
  href: string;
  /** Extra words to match: tags, trade, category, theme. */
  terms: string;
  /** Theme slug, for building a template prompt. */
  theme?: string;
  /** shadcn command that installs it (templates: the theme plus every section). */
  install?: string;
  color?: string;
};

const pages: SearchItem[] = [
  {
    kind: "page",
    slug: "templates",
    name: "All templates",
    hint: "Small-business websites by industry",
    href: "/templates",
    terms: "websites sites industries",
  },
  {
    kind: "page",
    slug: "components",
    name: "All sections",
    hint: "Every section by category",
    href: "/components",
    terms: "components sections blocks",
  },
  {
    kind: "page",
    slug: "themes",
    name: "All themes",
    hint: "Colours, radius and fonts",
    href: "/themes",
    terms: "colours colors fonts tokens",
  },
  {
    kind: "page",
    slug: "backgrounds",
    name: "Backgrounds",
    hint: "Animated WebGL, canvas and CSS",
    href: "/backgrounds",
    terms: "effects webgl canvas",
  },
  {
    kind: "page",
    slug: "plan",
    name: "Plan your website",
    hint: "A few short questions, then one build prompt",
    href: "/plan",
    terms: "plan planner questions wizard start help choose template brief quick website builder config",
  },
  {
    kind: "page",
    slug: "get-started",
    name: "Get started",
    hint: "Build a business website with an AI builder",
    href: "/get-started",
    terms: "how to guide lovable bolt v0 replit chatgpt claude gemini publish domain beginner",
  },
  {
    kind: "page",
    slug: "developers",
    name: "For developers",
    hint: "MCP, shadcn, CLI and JSON API",
    href: "/developers",
    terms: "developers mcp server claude code cursor codex vscode copilot windsurf editor setup install api json cli",
  },
  {
    kind: "page",
    slug: "shadcn",
    name: "Use with the shadcn CLI",
    hint: "components.json registry set-up",
    href: "/developers#shadcn",
    terms: "shadcn cli registry install",
  },
  {
    kind: "page",
    slug: "about",
    name: "About",
    hint: "Who makes it, why it's free, the licence",
    href: "/about",
    terms: "about who why free licence license nidhin contact",
  },
  {
    kind: "page",
    slug: "changelog",
    name: "Release notes",
    hint: "What's new, with an RSS feed",
    href: "/changelog",
    terms: "new whats news updates rss feed releases changelog release notes",
  },
  {
    kind: "page",
    slug: "privacy",
    name: "Privacy policy",
    hint: "What we collect and your rights",
    href: "/privacy",
    terms: "privacy gdpr data cookies",
  },
  {
    kind: "page",
    slug: "cookies",
    name: "Cookie policy",
    hint: "What's stored in your browser",
    href: "/cookies",
    terms: "cookies local storage consent banner",
  },
  {
    kind: "page",
    slug: "terms",
    name: "Terms of use",
    hint: "Licence, sample content, updates, liability",
    href: "/terms",
    terms: "terms conditions legal warranty liability disclaimer",
  },
  {
    kind: "page",
    slug: "contribute",
    name: "Contribute",
    hint: "Add a component, theme or template",
    href: "/contribute",
    terms: "pull request github add",
  },
];

export function searchIndex(): SearchItem[] {
  return [
    ...templates.map((t) => ({
      kind: "template" as const,
      slug: t.slug,
      name: t.name.split(" — ")[0] ?? t.name,
      hint: t.name.split(" — ")[1] ?? "Template",
      href: `/templates/${t.slug}`,
      terms: `${t.brief ?? ""} ${t.sections.join(" ")}`,
      theme: t.theme,
      install: `npx shadcn@latest add @copypasteui/theme-${t.theme} ${t.sections.map((s) => `@copypasteui/${s}`).join(" ")}`,
    })),
    ...categories
      .filter((c) => c.count > 0)
      .map((c) => ({
        kind: "category" as const,
        slug: c.slug,
        name: c.name,
        hint: `${c.count} components`,
        href: `/components/${c.slug}`,
        terms: c.slug,
      })),
    ...components.map((c) => ({
      kind: "component" as const,
      slug: c.slug,
      name: c.name,
      hint: c.category.replace(/-/g, " "),
      href: `/components/${c.category}/${c.slug}`,
      terms: componentSearchText(c),
      install: `npx shadcn@latest add @copypasteui/${c.slug}`,
    })),
    ...themes.map((t) => ({
      kind: "theme" as const,
      slug: t.slug,
      name: t.name,
      hint: t.description.split(/[.—]/)[0] ?? t.description,
      href: `/themes#${t.slug}`,
      terms: "theme",
      install: `npx shadcn@latest add @copypasteui/theme-${t.slug}`,
      color: t.light.primary,
    })),
    ...pages,
  ];
}
