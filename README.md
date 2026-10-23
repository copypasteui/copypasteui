# CopyPasteUI

**Free, source-available UI sections, themes and templates for AI builders — with a local MCP server.**

Browse animated React + Tailwind sections, preview them in any theme, and copy one AI-ready prompt into Lovable, Bolt, v0, Replit, Cursor or Claude. Or let your editor pull them directly through the `copypasteui` MCP server, which runs on your own machine: no account, no API key, no limits.

- 🌐 Site: https://copypasteui.dev
- 🔌 MCP: `npx copypasteui setup`
- 🧩 Contribute: one folder, two files — see [CONTRIBUTING.md](CONTRIBUTING.md)

## How it fits together

```
registry/                      ← the source of truth, edited through pull requests
  components/<category>/<slug>/component.tsx + meta.json
  themes/<slug>.json
  templates/<slug>.json
        │  scripts/build-registry.mjs (validates + publishes)
        ▼
apps/web/public/r/             ← static JSON "API" deployed with the site
  index.json  components/*.json  themes/*.json  templates/*.json  shadcn/*.json
        │                                   │
        ▼                                   ▼
apps/web  (static Next.js site)     packages/mcp  (npm: copypasteui)
browse, preview, copy prompt        local stdio MCP + CLI, caches the JSON,
                                    falls back to a bundled snapshot offline
```

There is no backend. The website is a static export, and the MCP reads the same static files the website publishes.

**What's in the library:** <!-- count:sections -->396<!-- /count --> sections across <!-- count:categories -->23<!-- /count --> categories, <!-- count:themes -->61<!-- /count --> themes and <!-- count:templates -->48<!-- /count --> full-site templates. Every template is a **brand collection**: real photography, its own theme and 6–7 sections designed together for one kind of business. They cover the small businesses that most often need a website — food & drink (café, restaurant, bakery, brewery, winery), hospitality (hotel, resort, cabins, tour operator, wedding venue), shops & farms (boutique, florist, skincare, farm shop), health & beauty (salon, barber, spa, yoga, gym, dentist, physio), home & trades (builder, plumber/electrician, cleaner, landscaper, garage, architect), professional services (law firm, accountant, estate agent, photographer, creative agency), family & community (nursery, vet, music school, charity) and tech (AI and creative SaaS). Each template’s `brief` lists the neighbouring trades it also fits.

**Live backgrounds:** <!-- count:backgrounds -->29<!-- /count --> animated backgrounds. <!-- count:codebackgrounds -->21<!-- /count --> are generated in code: WebGL shaders (fluid gradient, silk), canvas (light beam, retro grid, warp stars, constellation, dot field) and CSS/SVG (planet horizon, eclipse, neon rings, light rays, flowing lines, grain gradient …). Unlike video loops, those weigh nothing, stay sharp at any size, take their colours from the theme, react to the cursor, pause off-screen and respect reduced motion. The other <!-- count:photobackgrounds -->8<!-- /count --> animate an Unsplash photo: mist drifting over mountain ridges, heat shimmer on desert dunes, bokeh over a night city. Two collections, **Aether** (AI launch) and **Prism** (creative tool), are built on them.

Photos are free Unsplash images hotlinked from `images.unsplash.com` (Unsplash License). The validator rejects any other image host and Unsplash+.

## Images

`apps/web/scripts/screenshots.mjs` renders every card thumbnail, full-page template screenshot, theme preview and 1200×630 OG/social banner from the built site with Playwright. It also fails on any runtime error, so CI uses it as a render test. Images are generated on deploy and not committed.

```bash
npm run build
npx playwright@1.54.1 install chromium
npm run screenshots              # or: --missing, --only <slug>
```

## Use it

**In an AI builder** — open a component, pick a theme, click *Copy AI prompt*, paste.

**In your editor (MCP)**

```bash
npx copypasteui setup                    # detects editors, prints what it would change
npx copypasteui setup --client cursor --dry-run
npx copypasteui setup --client claude_code
```

Supported: `claude_code`, `claude_desktop`, `cursor`, `vscode`, `windsurf`, `codex`, `gemini_cli`. Any other MCP client: run `npx -y copypasteui@latest mcp` over stdio.

Tools: `plan_website`, `get_plan`, `suggest_sections`, `list_recipes`, `get_recipe`, `search_components`, `get_component`, `add_component`, `fill_business_details`, `list_categories`, `list_themes`, `get_theme`, `list_templates`, `get_template`. Prompts: `plan-my-website`, `build-business-website`, `add-online-booking`, `build-back-office`, `prepare-for-launch`.

**shadcn/ui users:** CopyPasteUI is also a shadcn registry. Add `"registries": { "@copypasteui": "https://copypasteui.dev/r/shadcn/{name}.json" }` to your `components.json`, then run `npx shadcn@latest add @copypasteui/olea-hero` or `@copypasteui/theme-olea` (themes install their Google Fonts via `next/font` in Next.js, or Fontsource elsewhere). `npx shadcn@latest search @copypasteui -q pricing` and shadcn's own MCP server work too.

Agents without the MCP can read [`/llms.txt`](https://copypasteui.dev/llms.txt) (a Markdown map of templates, themes and categories, following [llmstxt.org](https://llmstxt.org)) or [`/llms-full.txt`](https://copypasteui.dev/llms-full.txt) (every component with tags, dependencies and install commands). Both are generated from the registry on every build.

**From the terminal**

```bash
npx copypasteui search pricing
npx copypasteui add toggle-tier-pricing --theme midnight
```

**With the shadcn CLI**

```bash
npx shadcn@latest add https://copypasteui.dev/r/shadcn/toggle-tier-pricing.json
```

## Develop

```bash
npm install
npm run dev            # builds the registry, starts the site on http://localhost:3000
npm test               # validates the registry + MCP tests (in-memory and real stdio)
npm run build          # registry + MCP package + static site in apps/web/out
npm run screenshots    # thumbnails, template shots and OG banners (after build)
```

Point the MCP at your local checkout while developing:

```bash
COPYPASTEUI_REGISTRY=$PWD/apps/web/public/r node packages/mcp/dist/cli.js search hero
```

## Configuration (site)

All optional — see [apps/web/.env.example](apps/web/.env.example).

| Variable | Purpose |
| --- | --- |
| `COPYPASTEUI_SITE_URL` | Public URL used in prompts and registry links |
| `NEXT_PUBLIC_GITHUB_REPO` | `owner/name` for GitHub links |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics site token; empty means no analytics. The deploy workflow reads it from the `CF_BEACON_TOKEN` repository variable |

## Deploy

`.github/workflows/deploy.yml` publishes `apps/web/out` to GitHub Pages on every push to `main`. Any static host works (Cloudflare Pages, Netlify): build command `npm run build`, output `apps/web/out`.

`.github/workflows/release.yml` publishes the `copypasteui` npm package when you push a tag like `mcp-v0.1.0` (needs an `NPM_TOKEN` secret).

## Security model for community code

Contributed components run in visitors' browsers, so:

1. `scripts/build-registry.mjs` rejects network calls, storage/cookie access, `eval`, `dangerouslySetInnerHTML`, relative imports and any package outside the allowlist (`react`, `motion`, `lucide-react`).
2. Every preview runs in a `sandbox="allow-scripts"` iframe with an opaque origin, so a component cannot read the site, its cookies or the parent page.
3. A maintainer still reviews every pull request — the checks are pattern-based and are a first line of defence, not a guarantee.

## License

[PolyForm Shield License 1.0.0](LICENSE) — source-available, not OSI open source.

- **You can:** use, copy and modify any component, theme or template in websites, apps and products for yourself, your employer or your clients, including commercial and paid client work. You can use the site, MCP and CLI to build them.
- **You can't:** use CopyPasteUI to provide a product that competes with it — a component library, UI kit, template or theme collection, site generator, registry or MCP/API service — whether free or paid.
- **Keep the notice:** every component file starts with two comment lines (the licence link and the Required Notice). Leave them in.

Using the site and the npm package is also covered by the [terms of use](https://copypasteui.dev/terms) (sample content is fictional, no warranty, updates aren't promised), the [privacy policy](https://copypasteui.dev/privacy) and the [cookie policy](https://copypasteui.dev/cookies).
- Items a contributor marked MIT, Apache-2.0 or CC0-1.0 are under that licence instead.

The CopyPasteUI name and logo are not licensed for use by forks.
