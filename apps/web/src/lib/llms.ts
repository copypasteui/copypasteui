// Builds /llms.txt and /llms-full.txt (https://llmstxt.org): plain-Markdown maps of the library
// so AI agents can find components, themes and templates without the MCP server.
import { config } from "@/lib/config";
import { categories, components, defaultTheme, templates, themes } from "@/lib/registry";

const site = config.siteUrl;
const abs = (path: string) => `${site}${path}`;
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

const intro = `# CopyPasteUI

> Free, source-available React + Tailwind CSS sections, themes and full-site templates for AI builders. Every item ships as a ready-to-paste prompt and as code, adapts to shadcn/ui-compatible theme tokens, and can be installed through a local MCP server or the shadcn CLI. No account or API key.

CopyPasteUI has ${components.length} components in ${categories.filter((c) => c.count > 0).length} categories, ${themes.length} themes and ${templates.length} full-site templates aimed mostly at small businesses (cafés, salons, trades, clinics, farms, venues and more). Components use React 18+, Tailwind CSS v4 (v3 works), \`motion\` and \`lucide-react\` only.

How to use it as an agent:
- Prefer the MCP server: register the stdio command \`npx -y copypasteui.dev@latest mcp\` (or run \`npx copypasteui.dev setup\`). Tools: plan_website (asks the owner in short rounds, saves copypasteui.config.json), get_plan, suggest_sections (best template for a trade), search_components, get_component, add_component, fill_business_details (put the real name, phone and email in), list_categories, list_themes, get_theme, list_templates, get_template, list_recipes, get_recipe. Prompts: plan-my-website, build-business-website, add-online-booking, build-back-office, prepare-for-launch.
- Without MCP, read the JSON registry: ${abs("/r/index.json")} lists everything; ${abs("/r/components/{slug}.json")} has \`code\`, \`dependencies\`, \`installPath\` and a complete \`prompt\`; ${abs("/r/themes/{slug}.json")} has CSS variables and Tailwind wiring; ${abs("/r/templates/{slug}.json")} has a full-page \`prompt\` (replace \`{{THEME}}\` with the chosen theme's \`promptBlock\`).
- With the shadcn CLI (v3+): add \`"registries": { "@copypasteui": "${abs("/r/shadcn/{name}.json")}" }\` to components.json, then \`npx shadcn@latest add @copypasteui/{slug}\` (themes: \`@copypasteui/theme-{slug}\`, which also installs their fonts). \`npx shadcn@latest search @copypasteui -q <words>\` searches the index at ${abs("/r/shadcn/registry.json")}. Without the namespace, use the full URL \`npx shadcn@latest add ${abs("/r/shadcn/{slug}.json")}\`.
- Apply one theme once (default: ${defaultTheme}); every component reads tokens such as bg-background, text-foreground, bg-primary, text-muted-foreground, border-border, font-display.
- Licence: PolyForm Shield 1.0.0. Free to use in any website or app, including commercial and client work; not for building a competing library, template collection, site generator or MCP service. Keep the two notice lines at the top of each file. Items marked with an open licence (MIT, Apache-2.0, CC0-1.0) keep their notice.`;

function templateLines() {
  return templates.map(
    (t) =>
      `- [${t.name}](${abs(`/templates/${t.slug}`)}): ${oneLine(t.description)}${t.brief ? ` Fits ${t.brief}.` : ""} JSON: ${abs(`/r/templates/${t.slug}.json`)}`,
  );
}

function themeLines() {
  return themes.map((t) => `- [${t.name}](${abs(`/r/themes/${t.slug}.json`)}): ${oneLine(t.description)}`);
}

function categoryLines() {
  return categories
    .filter((c) => c.count > 0)
    .map((c) => `- [${c.name}](${abs(`/components/${c.slug}`)}): ${c.count} component${c.count === 1 ? "" : "s"}`);
}

export function llmsTxt() {
  return `${intro}

## Start here

- [Templates](${abs("/templates")}): complete small-business websites, grouped by industry
- [Sections](${abs("/components")}): every section by category, with live previews in any theme
- [Backgrounds](${abs("/backgrounds")}): animated WebGL, canvas and CSS backgrounds that follow the theme
- [Themes](${abs("/themes")}): colour, radius and font tokens for light and dark mode
- [For developers](${abs("/developers")}): MCP set-up for Claude Code, VS Code, Codex, Cursor, Windsurf and Gemini CLI; shadcn registry; CLI; JSON API; theming
- [Get started](${abs("/get-started")}): building a small-business website with an AI builder, step by step
- [Registry index](${abs("/r/index.json")}): machine-readable list of every component, theme and template
- [Back-office backend recipes](${abs("/r/recipes/index.json")}): tables, sign-in and access rules for the "admin" screens on the AI builder's own backend, Supabase, Firebase, Convex, Postgres, PocketBase, Cloudflare or Google Sheets; each \`/r/recipes/{slug}.json\` has a ready \`prompt\`

## Templates

${templateLines().join("\n")}

## Component categories

${categoryLines().join("\n")}

## Themes

${themeLines().join("\n")}

## Optional

- [llms-full.txt](${abs("/llms-full.txt")}): every component with description, tags, dependencies and install links
- [Contribute](${abs("/contribute")}): how to add components, themes and templates
- [Sitemap](${abs("/sitemap.xml")})
`;
}

export function llmsFullTxt() {
  const byCategory = categories
    .filter((c) => c.count > 0)
    .map((cat) => {
      const items = components
        .filter((c) => c.category === cat.slug)
        .map((c) => {
          const meta = [
            `slug \`${c.slug}\``,
            c.tags.length ? `tags: ${c.tags.join(", ")}` : null,
            `deps: ${Object.keys(c.dependencies).join(", ") || "none"}`,
            `default theme: ${c.theme}`,
            c.collection ? `part of the ${templates.find((t) => t.slug === c.collection)?.name ?? c.collection} template` : null,
            c.license !== "PolyForm-Shield-1.0.0" ? `licence: ${c.license}` : null,
          ].filter(Boolean);
          return `### ${c.name}
${oneLine(c.description)}
- ${meta.join(" · ")}
- Page: ${abs(`/components/${c.category}/${c.slug}`)}
- JSON (code + prompt): ${abs(`/r/components/${c.slug}.json`)}
- shadcn: \`npx shadcn@latest add @copypasteui/${c.slug}\`
- MCP: \`add_component\` with slug \`${c.slug}\``;
        });
      return `## ${cat.name} (${cat.count})\n\n${items.join("\n\n")}`;
    });

  const templateBlocks = templates.map(
    (t) => `### ${t.name}
${oneLine(t.description)}${t.brief ? `\nFits: ${t.brief}.` : ""}
- Theme: ${t.theme}
- Sections in order: ${t.sections.map((s) => `\`${s}\``).join(", ")}
- Page: ${abs(`/templates/${t.slug}`)}
- JSON (full-page prompt): ${abs(`/r/templates/${t.slug}.json`)}
- MCP: \`get_template\` with slug \`${t.slug}\``,
  );

  const themeBlocks = themes.map((t) => {
    const l = t.light;
    return `### ${t.name}${t.slug === defaultTheme ? " (default)" : ""}
${oneLine(t.description)}
- Slug \`${t.slug}\` · radius ${t.radius} · fonts: ${t.fonts.display.split(",")[0]} / ${t.fonts.sans.split(",")[0]}
- Light: background ${l.background}, foreground ${l.foreground}, primary ${l.primary}, accent ${l.accent}
- JSON: ${abs(`/r/themes/${t.slug}.json`)} · shadcn: \`npx shadcn@latest add @copypasteui/theme-${t.slug}\``;
  });

  return `${intro}

# Templates (${templates.length})

${templateBlocks.join("\n\n")}

# Themes (${themes.length})

${themeBlocks.join("\n\n")}

# Components (${components.length})

${byCategory.join("\n\n")}
`;
}
