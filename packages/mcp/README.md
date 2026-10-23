# copypasteui

Local MCP server and CLI for [CopyPasteUI](https://copypasteui.dev) — free, source-available React + Tailwind sections, themes and full-page templates for AI builders.

No account. No API key. No limits. It runs on your machine and reads the static registry the website publishes (cached for 6 hours in `~/.cache/copypasteui`, with a bundled snapshot for offline use).

## Connect your editor

```bash
npx copypasteui setup                         # list detected editors
npx copypasteui setup --client cursor --dry-run
npx copypasteui setup --client claude_code
```

Clients: `claude_code`, `claude_desktop`, `cursor`, `vscode`, `windsurf`, `codex`, `gemini_cli`. Existing configs are backed up to `*.copypasteui.backup`. Anything else: register the stdio command `npx -y copypasteui@latest mcp`.

## Tools

| Tool | What it does |
| --- | --- |
| `search_components` | Find sections by keywords, category or tag |
| `get_component` | Code, dependencies, theme tokens and integration steps |
| `add_component` | Write the `.tsx` (and optional theme CSS) into a project; never overwrites |
| `list_categories` | Categories with counts |
| `list_themes` / `get_theme` | Theme tokens as CSS, Tailwind v4/v3 or a shadcn command |
| `list_templates` / `get_template` | Complete landing pages in one prompt |
| `plan_website` / `get_plan` | Ask the owner short rounds of questions — business, main action, look, pages, extras, hosting — as forms in editors that support MCP elicitation, or in chat otherwise; `mode: "quick"` asks only the essentials. Saves `copypasteui.config.json`, so later chats pick up where they left off |
| `suggest_sections` | Pick the template for a trade ("dog groomer", "MOT garage"), with what each section is for, alternatives and the pages to add |
| `list_recipes` / `get_recipe` | Backend recipes for the back office — tables, sign-in and access rules for the AI builder's own backend, Supabase, Firebase, Convex, Postgres (Better Auth or Clerk), PocketBase, Cloudflare D1 + Access, or Google Sheets |
| `fill_business_details` | Swap the sample brand name, phones and emails for the real ones across installed sections; previews first, flags addresses, hours and prices to check |

## Prompts

Clients that support MCP prompts show these as ready-made requests (often as slash commands):

| Prompt | What it does |
| --- | --- |
| `plan-my-website` | Plans the site with you, one short round of questions at a time, and saves the answers |
| `build-business-website` | Builds from the saved plan (or asks the quick questions first) to a themed, filled-in home page |
| `add-online-booking` | Adds a booking section and wires it to your booking service |
| `build-back-office` | Owner screens (bookings, orders, menu, hours…) behind sign-in, with the database and access rules set up |
| `prepare-for-launch` | Leftover placeholders, links, alt text, legal pages, phone check, deploy |

## CLI

```bash
npx copypasteui search pricing
npx copypasteui add toggle-tier-pricing --theme midnight
npx copypasteui themes
```

`COPYPASTEUI_REGISTRY` points the server at another registry URL or a local folder (e.g. a fork).

PolyForm Shield License 1.0.0 — free to use in any website or app you build, including for clients. You may not use it to provide a competing component library, template collection, site generator or MCP service. Keep the two notice lines at the top of each installed file. See [LICENSE](LICENSE).

The package runs on your computer and sends no telemetry. Using it is covered by the [terms of use](https://copypasteui.dev/terms) and the [privacy policy](https://copypasteui.dev/privacy).
