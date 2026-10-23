# CopyPasteUI

Website templates, sections and themes for small businesses, free to use in any site you build. Copy a template's prompt into Lovable, Bolt, v0 or ChatGPT, or let Claude Code, Cursor or VS Code install the sections through a local MCP server.

Site: https://copypasteui.dev · MCP: `npx copypasteui.dev setup` · Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)

## What's in it

<!-- count:sections -->396<!-- /count --> sections in <!-- count:categories -->23<!-- /count --> categories, <!-- count:themes -->61<!-- /count --> themes and <!-- count:templates -->48<!-- /count --> templates, all React and Tailwind CSS.

A template is a fictional business with its own theme, photos and 6 or 7 sections written for its trade: a café, a barber, an MOT garage, a vet, a wedding venue. They're grouped as food and drink, hospitality, shops and farms, health and beauty, home and trades, professional services, family and community, and tech. Each template's `brief` names the other trades it suits.

There are <!-- count:backgrounds -->29<!-- /count --> animated backgrounds. <!-- count:codebackgrounds -->21<!-- /count --> are drawn in code (WebGL, canvas, CSS and SVG), so they take the theme's colours, follow the cursor and pause off-screen. The other <!-- count:photobackgrounds -->8<!-- /count --> move an Unsplash photo, such as mist over mountain ridges. The Aether and Prism templates use them.

## Use it

**In an AI builder:** open a template or section on the site, pick a theme, fill in your business details and copy the prompt.

**In your editor (MCP):**

```bash
npx copypasteui.dev setup                    # finds your editors and shows what it would change
npx copypasteui.dev setup --client cursor --dry-run
npx copypasteui.dev setup --client claude_code
```

It sets up `claude_code`, `claude_desktop`, `cursor`, `vscode`, `windsurf`, `codex` and `gemini_cli`. For any other MCP client, run `npx -y copypasteui.dev@latest mcp` over stdio. The server runs on your machine and needs no account or API key.

Tools: `plan_website`, `get_plan`, `suggest_sections`, `list_recipes`, `get_recipe`, `search_components`, `get_component`, `add_component`, `fill_business_details`, `list_categories`, `list_themes`, `get_theme`, `list_templates`, `get_template`. Prompts: `plan-my-website`, `build-business-website`, `add-online-booking`, `build-back-office`, `prepare-for-launch`.

**From the terminal:**

```bash
npx copypasteui.dev search pricing
npx copypasteui.dev add toggle-tier-pricing --theme midnight
```

**With the shadcn CLI:** add `"registries": { "@copypasteui": "https://copypasteui.dev/r/shadcn/{name}.json" }` to `components.json`, then:

```bash
npx shadcn@latest add @copypasteui/olea-hero @copypasteui/theme-olea
npx shadcn@latest search @copypasteui -q pricing
```

Themes install their Google Fonts with `next/font` in Next.js and Fontsource elsewhere.

**For agents without the MCP:** [`/llms.txt`](https://copypasteui.dev/llms.txt) lists the templates, themes and categories ([llmstxt.org](https://llmstxt.org) format), and [`/llms-full.txt`](https://copypasteui.dev/llms-full.txt) lists every section with its tags, dependencies and install command.

## How it's built

```
registry/                      sections, themes and templates, changed through pull requests
  components/<category>/<slug>/component.tsx + meta.json
  themes/<slug>.json
  templates/<slug>.json
        │  scripts/build-registry.mjs checks everything and writes:
        ▼
apps/web/public/r/             static JSON files, published with the site
  index.json  components/*.json  themes/*.json  templates/*.json  shadcn/*.json
        │                                   │
        ▼                                   ▼
apps/web (static Next.js site)      packages/mcp (npm: copypasteui)
browse, preview, copy prompts       MCP server and CLI; caches the JSON and
                                    falls back to a bundled copy offline
```

There's no server. The site is a static export, and the MCP reads the same JSON files the site publishes.

## Develop

```bash
npm install
npm run dev            # builds the registry and starts the site on http://localhost:3000
npm test               # registry validator, prompt and MCP tests
npm run build          # registry, MCP package and the static site in apps/web/out
```

To point the MCP at your local checkout:

```bash
COPYPASTEUI_REGISTRY=$PWD/apps/web/public/r node packages/mcp/dist/cli.js search hero
```

The checks CI runs are listed in [AGENTS.md](AGENTS.md#checks-to-run).

## Images

Card thumbnails, full-page template shots, theme previews and preview videos are links in each item's `images` field ([rules](CONTRIBUTING.md#preview-images)). None are committed, and CI doesn't make or upload them. Maintainers upload theirs to `cdn.copypasteui.dev` (Cloudflare R2); contributors can link their own host. CI checks each link with `npm run check:images` (it loads, and the file has the right type, size and shape) and opens every page once with `npm run check:render` to catch errors.

Photos inside sections are free Unsplash images, hotlinked from `images.unsplash.com`. The validator rejects other hosts and Unsplash+.

To make images, then upload the ones the CDN doesn't have yet (with your own `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set in your shell):

```bash
npm run build
npx playwright@1.54.1 install chromium
npm run screenshots              # apps/web/public/thumbs/ (git ignores it); --missing, --only <slug>
npm run previews                 # videos; prints each one's #t= start for its link
npm run images:upload -- --dry-run
npm run images:upload
```

Link previews use each item's thumbnail. The site's own share image is `brand/social/og-default-1200x630.png`, uploaded as `cdn.copypasteui.dev/og/site.png`.

## Configuration

All optional; see [apps/web/.env.example](apps/web/.env.example).

| Variable | What it sets |
| --- | --- |
| `COPYPASTEUI_SITE_URL` | The site address used in prompts and registry links |
| `NEXT_PUBLIC_GITHUB_REPO` | `owner/name` for GitHub links |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics site token, for hosts where Cloudflare doesn't add the script itself. Leave it empty on copypasteui.dev: Cloudflare's automatic setup adds it there (but not to `/preview/*`, see `_headers`), and a token would count visits twice. The deploy reads it from the `CF_BEACON_TOKEN` repository variable |

## Deploy

A push to `main` runs CI, then CodeQL, then `.github/workflows/deploy.yml`, which publishes the site CI built to Cloudflare (Workers static assets, set up in [wrangler.jsonc](wrangler.jsonc)). It needs two repository secrets: `CLOUDFLARE_API_TOKEN` (from the "Edit Cloudflare Workers" token template) and `CLOUDFLARE_ACCOUNT_ID`. Running Deploy site by hand from the Actions tab builds the site first.

Other static hosts work too (build with `npm run build`, publish `apps/web/out`). Keep the rule in `_headers` that lets any origin load the files, or the sandboxed previews can't load the site's fonts.

`.github/workflows/release.yml` publishes the `copypasteui.dev` npm package when you push a tag such as `mcp-v0.1.0`. It needs an `NPM_TOKEN` secret.

## Community code

Contributed sections run in visitors' browsers, so:

1. `scripts/build-registry.mjs` rejects network calls, storage and cookie access, `eval`, `dangerouslySetInnerHTML`, relative imports and any package other than `react`, `motion` and `lucide-react`.
2. Previews run in a `sandbox="allow-scripts"` iframe with an opaque origin, so a section can't read the site, its cookies or the page around it.
3. A maintainer reviews every pull request. The checks match patterns; they catch mistakes, not every attack.

## Licence

[PolyForm Shield 1.0.0](LICENSE). The source is public, but it isn't an OSI open-source licence.

- **You can** use, copy and change any section, theme or template in websites, apps and products for yourself, your employer or your clients, paid work included.
- **You can't** use CopyPasteUI to offer something that competes with it: a component library, UI kit, template or theme collection, site generator, registry, or MCP or API service, free or paid.
- **Keep the notice:** every section file starts with two comment lines, the licence link and the Required Notice. Leave them in.
- Items a contributor marked MIT, Apache-2.0 or CC0-1.0 are under that licence instead.

The site and the npm package are also covered by the [terms of use](https://copypasteui.dev/terms), the [privacy policy](https://copypasteui.dev/privacy) and the [cookie policy](https://copypasteui.dev/cookies). The CopyPasteUI name and logo aren't licensed for forks.
