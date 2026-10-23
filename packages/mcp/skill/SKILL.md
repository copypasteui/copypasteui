---
name: copypasteui
description: Build polished landing pages and marketing sections from CopyPasteUI's free React + Tailwind components, themes and templates via the local copypasteui MCP tools. Use when the user asks for a hero, pricing, FAQ, footer, testimonials, a landing page, "make it look better", or mentions CopyPasteUI.
---

# CopyPasteUI

Free sections (React + Tailwind + motion) that adapt to a theme. The `copypasteui` MCP server runs locally; there is no account, key or usage limit.

## Workflow

1. **Find**: for a business website, start with `suggest_sections` and the kind of business (it picks the template and explains each section). Otherwise `search_components` with a short query or `category` (see `list_categories`). For a whole page, `list_templates`.
2. **Theme first**: if the project has no shadcn-style tokens (`--background`, `--primary` …), pick one with `list_themes` and apply `get_theme` once to the global stylesheet. Reuse the same theme for every section.
3. **Get**: `get_component` with `slug` and `theme`. Write the code to the suggested path *unchanged*, or call `add_component` with the project's absolute path.
4. **Install** the listed npm dependencies with the project's package manager.
5. **Adapt**: render the component, then rewrite placeholder copy, links and images for the user's product. Keep layout, spacing, motion and token classes.
6. **Real details**: run `fill_business_details` (preview, then `apply: true`) to put the real name, phone and email into every section, and fix the lines it lists to check by eye.

## Rules

- Do not invent component slugs; always search first.
- Do not swap token classes for hard-coded colours — that breaks theming.
- Next.js App Router: components already start with `"use client"`.
- If the project uses Tailwind v3, use the v3 config snippet from the theme block.
