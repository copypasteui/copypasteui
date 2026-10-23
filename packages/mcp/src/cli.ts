#!/usr/bin/env node
import { parseArgs } from "node:util";
import { installComponent } from "./install.js";
import { Registry, searchComponents } from "./registry.js";
import { runStdio } from "./server.js";
import { CLIENT_IDS, runSetup } from "./setup.js";
import { VERSION } from "./version.js";

const HELP = `copypasteui ${VERSION} — free UI components for AI builders, served by a local MCP.

Usage
  copypasteui mcp                         Run the MCP server over stdio (what your editor launches)
  copypasteui setup [--client <id>] [--all] [--dry-run]
                                          Register the MCP with ${CLIENT_IDS.join(", ")}
  copypasteui search [query] [--category <slug>]
  copypasteui add <slug> [--dir components/copypasteui] [--theme <slug>] [--overwrite]
  copypasteui themes

Environment
  COPYPASTEUI_REGISTRY   Registry URL or local folder (default https://copypasteui.dev/r)
`;

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { values, positionals } = parseArgs({
    args: rest,
    allowPositionals: true,
    options: {
      client: { type: "string", multiple: true },
      all: { type: "boolean" },
      "dry-run": { type: "boolean" },
      category: { type: "string" },
      dir: { type: "string" },
      theme: { type: "string" },
      overwrite: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });

  switch (command) {
    case "mcp":
      await runStdio();
      return;
    case "setup":
      runSetup({ clients: values.client ?? [], all: Boolean(values.all), dryRun: Boolean(values["dry-run"]) });
      return;
    case "search": {
      const registry = new Registry();
      const index = await registry.getIndex();
      const results = searchComponents(index.components, { query: positionals.join(" "), category: values.category, limit: 30 });
      for (const c of results) console.log(`${c.slug.padEnd(28)} ${c.category.padEnd(14)} ${c.description}`);
      if (!results.length) console.log("No matches.");
      return;
    }
    case "themes": {
      const index = await new Registry().getIndex();
      for (const t of index.themes) console.log(`${t.slug.padEnd(12)} ${t.description}`);
      return;
    }
    case "add": {
      const slug = positionals[0];
      if (!slug) throw new Error("Usage: copypasteui add <slug>");
      const registry = new Registry();
      const c = await registry.getComponent(slug);
      if (!c) throw new Error(`Unknown component "${slug}". Try: copypasteui search`);
      const theme = values.theme ? await registry.getTheme(values.theme) : null;
      if (values.theme && !theme) throw new Error(`Unknown theme "${values.theme}". Try: copypasteui themes`);
      const r = installComponent(c, process.cwd(), { dir: values.dir, theme, overwrite: values.overwrite });
      for (const f of r.written) console.log(`created  ${f}`);
      for (const f of r.skipped) console.log(`exists   ${f} (use --overwrite)`);
      if (r.installCommand) console.log(`\nNext: ${r.installCommand}`);
      console.log(`\n${r.usage}`);
      return;
    }
    case "--version":
    case "-v":
      console.log(VERSION);
      return;
    default:
      console.log(HELP);
  }
}

main().catch((err) => {
  console.error(`copypasteui: ${(err as Error).message}`);
  process.exit(1);
});
