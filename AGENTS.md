# Notes for coding agents

CopyPasteUI is a static Next.js site (`apps/web`), a registry of sections, themes and templates (`registry/`), and a
local MCP server (`packages/mcp`). `CONTRIBUTING.md` explains the registry format and the rules CI enforces.

## Writing or editing copy

Any visible text (site pages, section and template sample copy, metadata, release notes, READMEs) follows
[.claude/skills/website-copy/SKILL.md](.claude/skills/website-copy/SKILL.md). Read it before writing copy. The short
version: be specific; on CopyPasteUI's own pages never invent facts, in sample copy invent plausible ones and keep them
consistent across a template; headings name content and buttons say what happens; no "Welcome to", "Elevate your",
decorative groups of three, identical cards or em dashes; when refactoring, change only the text, never class names,
slugs or code.

## Checks to run

- Registry sections: `npm run registry:validate && npm run check:design && npm test`
- Site pages: `npm run lint && npm run build -w apps/web && npm run test:smoke`
- Before a pull request: `npm run format:check && npm run typecheck && npm run check:components`
