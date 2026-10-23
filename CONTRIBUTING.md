# Contributing to CopyPasteUI

Thanks for helping keep great UI free. Everything lives in `registry/`; the website and the MCP are generated from it.

## Add a component

1. Create `registry/components/<category>/<your-slug>/` with two files.
   Categories: `navbar, hero, logos, features, how-it-works, stats, testimonials, pricing, faq, cta, team, contact, gallery, products, menu, events, blog, footer, background, buttons, cards, pages, admin`.
2. `component.tsx`

   ```tsx
   "use client";

   import { motion } from "motion/react";

   export default function GlassPricing() {
     return <section className="bg-background text-foreground">…</section>;
   }
   ```

3. `meta.json`

   ```json
   {
     "slug": "glass-pricing",
     "name": "Glass Pricing",
     "description": "Frosted pricing cards with a sliding billing switch.",
     "category": "pricing",
     "tags": ["glass", "toggle"],
     "author": { "name": "Your Name", "github": "your-github" },
     "dependencies": { "motion": ">=12.0.0" },
     "createdAt": "2026-10-21",
     "images": {
       "thumbnail": "https://your-host.example/copypasteui/glass-pricing.jpg",
       "preview": "https://your-host.example/copypasteui/glass-pricing.webm#t=1"
     }
   }
   ```

4. Run `npm run registry:validate`, then `npm run dev` and check it at `/components/<category>/<slug>` in a few themes, light and dark, at phone width. If it uses photos, run `npm run check:photos`. CI also builds the site and runs `npm run check:mobile`, which fails if your section scrolls sideways on a 360px phone (run it locally with `npm run build && npm run check:mobile -- --only <slug>`).
   Before you open the pull request, these run the same checks CI does on your section (after `npm run build`; `--only <slug>` limits them to yours):
   - `npm run check:components` — compiles on its own with strict TypeScript, on React 18 and 19
   - `npm run check:a11y -- --only <slug>` — renders in three themes, light and dark, and runs axe accessibility checks
   - `npm run check:interactions -- --only <slug>` — clicks, types and submits everything, and fails on errors
   - `npm run check:matrix -- --section <slug>` — renders your section under about 25 combinations of theme style, palette, light/dark and phone to desktop, chosen so every pair of settings meets at least once (pairwise testing, the idea behind Microsoft's PICT). Each case must not scroll sideways, must not throw, and must pass axe. Add `--plan` to see the cases, `--seed 2` for a different set
   - `npm run check:duplicates` — makes sure it isn't a near-copy of an existing section
5. Add a preview image. Images are never committed: upload yours to a host you control and put the link in `images` (see below). CI still renders every section to catch runtime errors.

### Preview images

Every component, template and theme links to its card image in `images`. The site, the MCP and link previews all use it.

| Field | What it is | Rules (CI checks them with `npm run check:images -- <slug>`) |
| --- | --- | --- |
| `thumbnail` (required) | The card picture | https link to a JPEG, PNG or WebP, 16:10 and at least 1000 pixels wide (1280×800 for sections, 1080×675 for templates and themes), up to 400 KB |
| `preview` (optional, components and templates) | A short muted loop that plays on the card | https link to a WebM or MP4, up to 3 MB. End the link with `#t=<seconds>` to skip blank frames at the start |
| `fullPage` (templates) | The whole page, top to bottom | at least 800 pixels wide and taller than it is wide, up to 1.5 MB |

To make them the way the site's own are: `npm run build && npx playwright@1.54.1 install chromium && npm run screenshots -- --only <slug>`, then `npm run previews -- --only <slug>` for a video. They land in `apps/web/public/thumbs/` (ignored by git), and the preview script prints each video's `#t=` start. Keep your links working: if one breaks, CI fails and the card falls back to a live preview. We may later copy community images to our own host and update the link.

No photos? Use typography, real-looking data (a timetable, a price list, a job log) or a simple drawn shape in theme tokens. Don't fake photos with gradients or initials in coloured boxes — people read those as placeholders.

### Photos

Photos are welcome and make sections feel real. Use only free images from Unsplash, hotlinked from `https://images.unsplash.com/photo-<id>` (add `?auto=format&fit=crop&w=<width>&q=80`). Unsplash+ (`plus.unsplash.com`) images are not free and CI rejects them, as it does images from any other host. Don't use photos that show real brands' logos or packaging. Always set `alt` text.

### Collections

A set of sections designed for one fictional brand is a **collection**: add a template in `registry/templates/` with its own theme, and set `"collection": "<template-slug>"` in each section's meta.json. The site groups them, previews them in the brand's theme, and the MCP uses that theme by default.

The library is aimed at small, local businesses. A good collection has six sections — hero with navigation, the offering (menu, services, rooms, products), story or showcase, proof (reviews or results), the conversion the business really needs (book, call, order, quote, donate) and a footer — with copy written for that trade. Check the industry groups on the Templates page for the verticals already covered. A new vertical, such as opticians, tattoo studios or driving schools, is the most useful contribution. Not a coder? [Request a trade](https://github.com/copypasteui/copypasteui/issues/new?template=request-a-trade.yml) instead.

### Writing the copy

Section copy is for a fictional business, so make it specific: a street, opening hours, prices in £, a named reviewer with one concrete detail, the same brand name and phone in every section of a template. Avoid what makes copy read as generated: "Welcome to", "Elevate your", groups of three adjectives, identical cards, "Learn more" buttons, em dashes. The full guide, with before-and-after examples, is [.claude/skills/website-copy/SKILL.md](.claude/skills/website-copy/SKILL.md); Claude Code loads it automatically, and [AGENTS.md](AGENTS.md) points other agents to it.

### Rules (CI enforces the first five)

- **One self-contained file**, starting with `"use client"`, with a named default export.
- **Imports**: only `react`, `motion` and `lucide-react`. `dependencies` in meta.json must list exactly what you import. Need another package? Open an issue first.
- **Safe**: no `fetch`/XHR/WebSocket, `localStorage`/`sessionStorage`/cookies, `eval`, `new Function`, `dangerouslySetInnerHTML` or `<script>`.
- **Themeable**: use tokens — `bg-background`, `text-foreground`, `bg-card`, `bg-primary text-primary-foreground`, `bg-muted text-muted-foreground`, `bg-accent`, `border-border`, `font-display`, `rounded-lg`. Avoid hard-coded colours (CI warns).
- **Looks made by a person**: CI rejects the patterns that make a section read as AI output — blurred colour blobs, gradient-filled text, neon glow shadows, the Sparkles icon, emoji, a 4.9 or 5.0 star rating, startup buzzwords ("seamless", "unlock", "trusted by"…) and the same fade-up on four or more elements. Write copy with specifics: names, places, prices, hours, numbers. Run `npm run check:design` to see the report. If a pattern really is the point (an aurora background), allow it with a comment that says why: `// design-ok: glow-blob — the aurora is the effect`.
- **Original work**: placeholder copy and fictional brands only. No real logos, trademarks or copyrighted images, and nothing copied from paid libraries. By contributing you agree to the contribution terms below.
- **Quality**: responsive down to 360px, keyboard accessible, `prefers-reduced-motion` friendly where motion is heavy.

Footers end their copyright line with an optional credit: ` · Built with <a href="https://copypasteui.dev">CopyPasteUI</a>`, preceded by the comment `{/* Optional credit … */}` that says it can be kept, changed or removed. Copy it from any existing footer. It's a courtesy, not a licence term, so never make it harder to remove.

## Add a theme

Add `registry/themes/<slug>.json` (copy an existing one). Every token needs a light and a dark value (hex, `oklch()`, `hsl()` or `rgb()`), plus `radius` and `fonts.sans` / `fonts.display` (with `googleFonts` families if they are Google Fonts). Do not set `"default": true`. Add `images.thumbnail`: a 1080×675 screenshot of the Ledger template in your theme (`npm run screenshots -- --only themes/<slug>` makes it; see [Preview images](#preview-images)).

A theme can also set a `style`, which changes every section without touching it (see `poster.json` and `frost.json`):

- `"shadow"`: `"soft"` (default), `"hard"` (solid offset blocks in the ring colour; padded panels and buttons also get an outline), `"clay"`, `"neu"` or `"none"`
- `"border"`: `"0px"`, `"1px"` (default), `"2px"` or `"3px"`, the width of every plain `border`
- `"surface"`: `"solid"` (default) or `"glass"` (frosted `bg-card` panels over a wash of the theme's primary and accent)
- `"texture"`: `"none"` (default), `"grain"`, `"dots"` or `"grid"`
- `"motion"`: `"none"` (default), `"subtle"` (headings and panels rise in as they scroll into view) or `"lively"` (also text, list items one after another, and photos that zoom out inside their frames). Pure CSS scroll timelines: nothing moves for visitors who reduce motion, or in browsers without scroll timelines
- `"label"`: the style's name for the Themes page filter, such as `"Glass"`

Check a styled theme with `npm run check:matrix -- --theme <slug>`: it pairs your palette and style with every kind of section (photos, inverted panels, faded text, cards, forms, canvas) in light and dark, from phone to desktop. For the full sweep, `npm run check:a11y -- --themes <slug>` renders every section.

The validator checks WCAG contrast for hex colours in both modes (4.5:1 for text pairs such as `primary-foreground` on `primary`, 3:1 for `primary` on `background`) and tells you which pair to fix.

## Add a template

Add `registry/templates/<slug>.json` with `name` (`"Brand — Kind of business"`), `description`, `brief`, `theme`, `author` and `sections` — existing component slugs in page order. `brief` names the businesses the template suits (for example "a florist, flower farm, plant shop or gift shop"). It's shown on the site and used in the build prompt. Add the slug to an industry group in `apps/web/src/lib/industries.ts`, and `images` with a `thumbnail`, a `fullPage` screenshot and, if you like, a `preview` video (see [Preview images](#preview-images)).

## Backend recipes

`registry/recipes/<slug>.json` + `<slug>.md` describe how to run the back office on one backend. Every recipe implements the shared `_data-model.md` (same tables, same "who may do what" table), explains how to create the first owner, and protects `/admin` on the server; CI rejects one that doesn't. A recipe for another backend (Appwrite, Xano, Directus, a builder we don't cover) is very welcome — keep `rank` honest: lower means more people use it.

## How contributions are reviewed

CI checks the rules; a maintainer then scores fit, design, copy, code, accessibility and originality. The rubric is in [REVIEWING.md](REVIEWING.md), so you can check your work against it first.

## Improve the site or MCP

- Site: `apps/web` (Next.js static export, Tailwind v4)
- MCP + CLI: `packages/mcp` — run `npm test -w packages/mcp`
- Registry build/validation: `scripts/build-registry.mjs`

Keep the site static (no server routes) and the MCP local (no hosted services).

## Contribution terms

CopyPasteUI is licensed under the [PolyForm Shield License 1.0.0](LICENSE). By opening a pull request you confirm that:

1. The contribution is your own original work, or you have the right to submit it, and it contains no third-party material that would conflict with the licence (Unsplash photos are hotlinked, not copied). The same goes for the images you link in `images`: screenshots of your own work are fine.
2. You license your contribution to the project under the same licence as the rest of the repository.
3. You grant the licensor (Nidhin Radh P V, and anyone who later owns or runs CopyPasteUI) a perpetual, worldwide, royalty-free, non-exclusive, transferable right to use, modify, sublicense and relicense your contribution as part of CopyPasteUI, including under other licences and on commercial terms.

You keep the copyright in your work and you're credited on everything you contribute.

**You're free to publish your contribution elsewhere under any licence you like, including open source.** These terms are non-exclusive, so contributing here doesn't stop you releasing your own theme or component on your own site or repo.

### Making your contribution open source here too

By default every item in this repository is under PolyForm Shield 1.0.0. If you'd like your own theme or component to be open source inside CopyPasteUI as well, add a `license` field:

- Themes: `"license": "MIT"` in `registry/themes/<slug>.json`.
- Components: `"license": "MIT"` in the component's `meta.json`.

Allowed values: `MIT`, `Apache-2.0`, `CC0-1.0` (or `PolyForm-Shield-1.0.0`, the default when the field is omitted). Only use it for work that is entirely yours: a component that copies or adapts another CopyPasteUI component can't be relicensed. The site shows a licence badge, the MCP and shadcn registry pass the licence along, and open-licensed components get an attribution comment at the top of the installed file.

Choosing an open licence is permanent for the versions you publish. Anyone, including other component libraries, may then reuse that item under its terms.

