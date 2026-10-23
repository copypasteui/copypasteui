// Prompt contract: every prompt the site and the MCP hand out has the parts an AI builder needs —
// requirements, steps, the exact code, the licence, the photo note and one theme slot — and no
// leftovers from the build. Runs against the generated registry (npm run registry:build first).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const R = process.env.COPYPASTEUI_REGISTRY_DIR ?? path.join(ROOT, "apps/web/public/r");
const read = (rel) => JSON.parse(fs.readFileSync(path.join(R, rel), "utf8"));

if (!fs.existsSync(path.join(R, "index.json"))) throw new Error(`No generated registry at ${R} — run npm run registry:build first.`);
const index = read("index.json");
const SITE = index.site;
const OPEN = ["MIT", "Apache-2.0", "CC0-1.0"];
const TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "ring",
];
const MAX_COMPONENT_KB = 80;
const MAX_TEMPLATE_KB = 450;

/** The prompt with fenced code removed, so JSX like style={{…}} doesn't count as a placeholder. */
const prose = (p) => p.replace(/```[\s\S]*?```/g, "");
const codeBlocks = (p) => [...p.matchAll(/```(\w*)\n([\s\S]*?)\n```/g)].map((m) => ({ lang: m[1], body: m[2] }));

function assertClean(prompt, where) {
  const text = prose(prompt);
  assert.equal((prompt.match(/\{\{THEME\}\}/g) ?? []).length, 1, `${where}: needs exactly one {{THEME}} slot`);
  assert.ok(prompt.trimEnd().endsWith("{{THEME}}"), `${where}: {{THEME}} must come last`);
  const leftovers = text.replace("{{THEME}}", "").match(/\{\{[^}]*\}\}|\$\{[^}]*\}|\bundefined\b|\bnull\b|\[object Object\]|\bNaN\b/g);
  assert.equal(leftovers, null, `${where}: leftover placeholder ${leftovers}`);
  assert.doesNotMatch(prompt, /localhost|127\.0\.0\.1/, `${where}: points at a local URL`);
  assert.doesNotMatch(text, /\n{4,}/, `${where}: has a run of empty lines`);
}

describe("component prompts", () => {
  for (const summary of index.components) {
    test(summary.slug, () => {
      const c = read(`components/${summary.slug}.json`);
      const p = c.prompt;
      const where = `components/${c.slug}`;

      assertClean(p, where);
      assert.ok(p.startsWith(`Add the "${c.name}" section to this project.`), `${where}: opening line`);
      assert.ok(p.includes(`${SITE}/components/${c.category}/${c.slug}`), `${where}: links its page`);
      for (const h of ["## Requirements", "## Steps", "## Code"]) assert.ok(p.includes(h), `${where}: missing ${h}`);

      // Licence: the default terms, or the open licence with its notice kept in the code.
      if (OPEN.includes(c.license)) {
        assert.match(p, new RegExp(`Licensed under ${c.license.replace(".", "\\.")} by `), `${where}: open licence line`);
        assert.ok(c.code.startsWith("// ") && c.code.split("\n")[0].includes(c.license), `${where}: licence notice at the top of the code`);
      } else {
        assert.equal(c.license, "PolyForm-Shield-1.0.0", `${where}: unknown licence ${c.license}`);
        assert.ok(p.includes("commercial and client work (CopyPasteUI licence: PolyForm Shield 1.0.0)"), `${where}: licence line`);
        const [first, second] = c.code.split("\n");
        assert.ok(
          first.startsWith("// ") && first.includes("https://polyformproject.org/licenses/shield/1.0.0"),
          `${where}: licence URL at the top of the code`,
        );
        assert.ok(second.startsWith("// Required Notice: Copyright"), `${where}: Required Notice line`);
      }

      // Dependencies: the install line names exactly what the code imports.
      const deps = Object.keys(c.dependencies);
      if (deps.length) {
        const line = p.match(/Install dependencies: `npm install ([^`]+)`/);
        assert.ok(line, `${where}: install line`);
        assert.deepEqual(line[1].split(" ").sort(), [...deps].sort(), `${where}: install line matches dependencies`);
        assert.equal(c.installCommand, `npm install ${line[1]}`);
      } else {
        assert.ok(p.includes("No extra dependencies."), `${where}: says there are no dependencies`);
      }

      // Steps point at the right file and component name, and the code is included exactly once, unchanged.
      assert.ok(p.includes(`Create \`${c.installPath}\``), `${where}: install path`);
      if (c.usage) assert.ok(p.includes(`3. ${c.usage}`), `${where}: page-specific usage step`);
      else assert.ok(p.includes(`<${c.exportName} />`), `${where}: render line`);
      const blocks = codeBlocks(p);
      assert.equal(blocks.length, 1, `${where}: one code block`);
      assert.equal(blocks[0].lang, "tsx");
      assert.equal(blocks[0].body, c.code.trimEnd(), `${where}: code in the prompt matches the component`);
      assert.match(c.code, new RegExp(`export default function ${c.exportName}\\b`), `${where}: export name`);

      // Photos: hotlinked Unsplash images come with the licence and next/image note.
      const hasPhotos = /images\.unsplash\.com|["'`]photo-\d+-[0-9a-f]+["'`]/.test(c.code);
      assert.equal(Boolean(c.usesPhotos), hasPhotos, `${where}: usesPhotos flag`);
      assert.equal(p.includes("Unsplash License"), hasPhotos, `${where}: photo note`);
      if (hasPhotos) assert.ok(p.includes("images.remotePatterns"), `${where}: next/image hint`);

      assert.ok(Buffer.byteLength(p) < MAX_COMPONENT_KB * 1024, `${where}: prompt over ${MAX_COMPONENT_KB} KB`);
    });
  }
});

describe("template prompts", () => {
  for (const summary of index.templates) {
    test(summary.slug, () => {
      const t = read(`templates/${summary.slug}.json`);
      const p = t.prompt;
      const where = `templates/${t.slug}`;

      assertClean(p, where);
      assert.ok(p.startsWith(`Build the "${t.name}" landing page`), `${where}: opening line`);
      assert.ok(p.includes(`${SITE}/templates/${t.slug}`), `${where}: links its page`);
      assert.ok(p.includes(t.description), `${where}: includes the description`);
      for (const h of ["## Requirements", "## Page structure (top to bottom)"]) assert.ok(p.includes(h), `${where}: missing ${h}`);
      if (t.brief) assert.ok(p.includes(`one consistent story for: ${t.brief}.`), `${where}: rewrite instruction uses the brief`);
      // The copy rules (from .claude/skills/website-copy) come before the code, so the builder reads them first.
      assert.ok(
        p.indexOf("## Writing the copy") > 0 && p.indexOf("## Writing the copy") < p.indexOf("```tsx"),
        `${where}: copy rules before the code`,
      );
      assert.match(prose(p), /Never invent reviews, ratings, awards or customer numbers/, `${where}: no invented facts`);
      assert.ok(
        index.themes.some((th) => th.slug === t.theme),
        `${where}: theme ${t.theme} exists`,
      );

      // Every section: listed in order, its file heading and its exact code, in the same order.
      const sections = t.sections.map((s) => read(`components/${s}.json`));
      let last = -1;
      sections.forEach((c, i) => {
        assert.ok(p.includes(`${i + 1}. ${c.name} — \`${c.installPath}\``), `${where}: structure lists ${c.slug} at ${i + 1}`);
        const at = p.indexOf(`### ${c.installPath}\n\`\`\`tsx\n${c.code.trimEnd()}\n\`\`\``);
        assert.ok(at > last, `${where}: ${c.slug} code missing or out of order`);
        last = at;
      });
      assert.equal(codeBlocks(p).length, sections.length, `${where}: one code block per section`);

      const deps = [...new Set(sections.flatMap((c) => Object.keys(c.dependencies)))].sort();
      if (deps.length) {
        const line = p.match(/Install dependencies: `npm install ([^`]+)`/);
        assert.ok(line, `${where}: install line`);
        assert.deepEqual(line[1].split(" ").sort(), deps, `${where}: install line covers every section`);
      }
      assert.ok(Buffer.byteLength(p) < MAX_TEMPLATE_KB * 1024, `${where}: prompt over ${MAX_TEMPLATE_KB} KB`);
    });
  }
});

describe("theme blocks", () => {
  for (const summary of index.themes) {
    test(summary.slug, () => {
      const t = read(`themes/${summary.slug}.json`);
      const b = t.promptBlock;
      const where = `themes/${t.slug}`;

      assert.ok(b.startsWith(`## Theme: ${t.name}\n`), `${where}: heading`);
      assert.doesNotMatch(b, /\{\{|undefined|null|NaN|localhost/, `${where}: leftovers`);
      for (const mode of ["light", "dark"]) {
        for (const k of TOKENS) {
          assert.ok(t[mode][k], `${where}: ${mode} ${k} missing`);
          assert.ok(b.includes(`--${k}: ${t[mode][k]};`), `${where}: ${mode} --${k} not in the block`);
        }
      }
      assert.ok(b.includes(`--radius: ${t.radius};`), `${where}: radius`);
      assert.ok(b.includes(":root {") && b.includes(".dark {"), `${where}: light and dark blocks`);
      assert.ok(b.includes("@theme inline {") && b.includes("--color-primary: var(--primary);"), `${where}: Tailwind v4 wiring`);
      assert.ok(b.includes("tailwind.config") && b.includes('"primary": "var(--primary)"'), `${where}: Tailwind v3 wiring`);
      if (t.fonts.googleFonts?.length) {
        assert.ok(t.googleFontsUrl && b.includes(t.googleFontsUrl), `${where}: font URL`);
        for (const f of t.fonts.googleFonts)
          assert.ok(t.googleFontsUrl.includes(`family=${f.split(":")[0]}`), `${where}: font ${f} in URL`);
      }

      // Filled into a prompt, the slot disappears and the theme lands at the end.
      const filled = read(`components/${index.components[0].slug}.json`).prompt.replace("{{THEME}}", b);
      assert.doesNotMatch(filled, /\{\{THEME\}\}/);
      assert.ok(filled.trimEnd().endsWith(b.trimEnd()));
    });
  }
});

test("shadcn items ship the same code as the prompts", () => {
  for (const c of index.components) {
    const item = read(`shadcn/${c.slug}.json`);
    const full = read(`components/${c.slug}.json`);
    assert.equal(item.files[0].content, full.code, `shadcn/${c.slug}: code differs from the prompt`);
    assert.equal(item.files[0].path, full.installPath, `shadcn/${c.slug}: path differs`);
    assert.deepEqual([...item.dependencies].sort(), Object.keys(full.dependencies).sort(), `shadcn/${c.slug}: dependencies differ`);
  }
});

describe("backend recipes", () => {
  const list = read("recipes/index.json");
  test("ranked list with the builder's own backend first", () => {
    assert.ok(list.length >= 6, "expected at least six recipes");
    assert.equal(list[0].slug, "builder");
    assert.deepEqual(
      list.map((r) => r.rank),
      list.map((r) => r.rank).toSorted((a, b) => a - b),
    );
  });
  for (const summary of list) {
    test(summary.slug, () => {
      const r = read(`recipes/${summary.slug}.json`);
      const where = `recipes/${r.slug}`;
      assert.ok(r.prompt.startsWith(`# Back office with ${r.name}`), `${where}: heading`);
      assert.ok(
        r.prompt.includes("## The back-office data model") && r.prompt.includes("## Who may do what"),
        `${where}: data model and access table`,
      );
      const leftovers = r.prompt.replace(/```[\s\S]*?```/g, "").match(/\{\{[^}]*\}\}|\bundefined\b|\[object Object\]/g);
      assert.equal(leftovers, null, `${where}: leftover ${leftovers}`);
      assert.doesNotMatch(r.prompt, /localhost|127\.0\.0\.1/, `${where}: local URL`);
      if (r.covers === "full") {
        assert.match(r.body, /first owner/i, `${where}: first owner step`);
        assert.match(r.body, /\/admin/, `${where}: /admin protection`);
        assert.match(r.body, /server/i, `${where}: server-side check`);
      } else {
        assert.match(r.body, /never go in a published sheet|public content only/i, `${where}: says it's content only`);
      }
      for (const d of r.docs) assert.match(d.href, /^https:\/\//, `${where}: docs link`);
      // Secrets must never be pointed at the browser.
      assert.doesNotMatch(r.prompt, /NEXT_PUBLIC_[A-Z_]*(SERVICE|SECRET)/, `${where}: secret in a public env var`);
    });
  }
});
