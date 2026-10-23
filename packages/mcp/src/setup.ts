// Registers the local CopyPasteUI MCP server with AI clients. Every write is shown first
// with --dry-run, existing files are backed up, and unrelated configuration is preserved.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { VERSION } from "./version.js";

const SERVER_NAME = "copypasteui";
export const SERVER_COMMAND = { command: "npx", args: ["-y", `copypasteui.dev@${VERSION}`, "mcp"] };

type Action = { kind: "json" | "toml" | "command" | "skill"; target: string; detail: string; apply: () => void };
type Client = { id: string; name: string; detect: () => boolean; plan: () => Action[] };

const home = os.homedir();
const appSupport = (...p: string[]) =>
  process.platform === "darwin"
    ? path.join(home, "Library", "Application Support", ...p)
    : process.platform === "win32"
      ? path.join(process.env.APPDATA ?? path.join(home, "AppData", "Roaming"), ...p)
      : path.join(home, ".config", ...p);

function backup(file: string) {
  if (fs.existsSync(file)) fs.copyFileSync(file, `${file}.copypasteui.backup`);
}

function jsonAction(file: string, key: "mcpServers" | "servers", entry: Record<string, unknown>): Action {
  return {
    kind: "json",
    target: file,
    detail: `set ${key}.${SERVER_NAME} = ${JSON.stringify(entry)} (backup: ${file}.copypasteui.backup)`,
    apply() {
      let config: Record<string, unknown> = {};
      if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, "utf8").trim();
        try {
          config = raw ? JSON.parse(raw) : {};
        } catch {
          throw new Error(`${file} is not plain JSON (comments?). Add the server manually: ${JSON.stringify(entry)}`);
        }
      }
      const servers = (config[key] ?? {}) as Record<string, unknown>;
      servers[SERVER_NAME] = entry;
      config[key] = servers;
      backup(file);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(config, null, 2) + "\n");
    },
  };
}

function skillAction(): Action {
  const target = path.join(home, ".claude", "skills", SERVER_NAME, "SKILL.md");
  const source = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "skill", "SKILL.md");
  return {
    kind: "skill",
    target,
    detail: "install the CopyPasteUI skill so Claude knows when and how to use the tools",
    apply() {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);
    },
  };
}

const CLIENTS: Client[] = [
  {
    id: "claude_code",
    name: "Claude Code",
    detect: () => fs.existsSync(path.join(home, ".claude")),
    plan: () => {
      const hasCli = spawnSync("claude", ["--version"], { stdio: "ignore", shell: process.platform === "win32" }).status === 0;
      const actions: Action[] = [];
      if (hasCli) {
        const args = ["mcp", "add", "--scope", "user", SERVER_NAME, "--", SERVER_COMMAND.command, ...SERVER_COMMAND.args];
        actions.push({
          kind: "command",
          target: "claude",
          detail: `claude ${args.join(" ")}`,
          apply() {
            spawnSync("claude", ["mcp", "remove", "--scope", "user", SERVER_NAME], {
              stdio: "ignore",
              shell: process.platform === "win32",
            });
            const r = spawnSync("claude", args, { stdio: "inherit", shell: process.platform === "win32" });
            if (r.status !== 0) throw new Error("claude mcp add failed");
          },
        });
      } else {
        actions.push(jsonAction(path.join(home, ".claude.json"), "mcpServers", { type: "stdio", ...SERVER_COMMAND }));
      }
      actions.push(skillAction());
      return actions;
    },
  },
  {
    id: "claude_desktop",
    name: "Claude Desktop",
    detect: () => fs.existsSync(appSupport("Claude")),
    plan: () => [jsonAction(appSupport("Claude", "claude_desktop_config.json"), "mcpServers", SERVER_COMMAND)],
  },
  {
    id: "cursor",
    name: "Cursor",
    detect: () => fs.existsSync(path.join(home, ".cursor")),
    plan: () => [jsonAction(path.join(home, ".cursor", "mcp.json"), "mcpServers", SERVER_COMMAND)],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    detect: () => fs.existsSync(path.join(home, ".codeium", "windsurf")),
    plan: () => [jsonAction(path.join(home, ".codeium", "windsurf", "mcp_config.json"), "mcpServers", SERVER_COMMAND)],
  },
  {
    id: "vscode",
    name: "VS Code",
    detect: () => fs.existsSync(appSupport("Code", "User")),
    plan: () => [jsonAction(appSupport("Code", "User", "mcp.json"), "servers", { type: "stdio", ...SERVER_COMMAND })],
  },
  {
    id: "gemini_cli",
    name: "Gemini CLI",
    detect: () => fs.existsSync(path.join(home, ".gemini")),
    plan: () => [jsonAction(path.join(home, ".gemini", "settings.json"), "mcpServers", SERVER_COMMAND)],
  },
  {
    id: "codex",
    name: "Codex",
    detect: () => fs.existsSync(path.join(home, ".codex")),
    plan: () => {
      const file = path.join(home, ".codex", "config.toml");
      const block = `\n[mcp_servers.${SERVER_NAME}]\ncommand = "${SERVER_COMMAND.command}"\nargs = ${JSON.stringify(SERVER_COMMAND.args)}\n`;
      return [
        {
          kind: "toml",
          target: file,
          detail: `append [mcp_servers.${SERVER_NAME}] (replacing an existing one; backup: ${file}.copypasteui.backup)`,
          apply() {
            const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
            const stripped = current.replace(new RegExp(`\\n?\\[mcp_servers\\.${SERVER_NAME}\\][\\s\\S]*?(?=\\n\\[|$)`), "");
            backup(file);
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, stripped.trimEnd() + "\n" + block);
          },
        },
      ];
    },
  },
];

export const CLIENT_IDS = CLIENTS.map((c) => c.id);

export function runSetup(opts: { clients: string[]; all: boolean; dryRun: boolean }) {
  const selected = opts.all ? CLIENTS.filter((c) => c.detect()) : CLIENTS.filter((c) => opts.clients.includes(c.id));
  const unknown = opts.clients.filter((id) => !CLIENT_IDS.includes(id));
  if (unknown.length) throw new Error(`Unknown client(s): ${unknown.join(", ")}. Supported: ${CLIENT_IDS.join(", ")}`);

  if (!selected.length) {
    const detected = CLIENTS.filter((c) => c.detect());
    console.log(`CopyPasteUI MCP ${VERSION} — local server, no account or API key.\n`);
    console.log(`Detected clients: ${detected.length ? detected.map((c) => c.id).join(", ") : "none"}`);
    console.log(`\nPreview changes:   npx copypasteui.dev setup --client <id> --dry-run`);
    console.log(`Apply:             npx copypasteui.dev setup --client <id>`);
    console.log(`All detected:      npx copypasteui.dev setup --all`);
    console.log(`\nOr register manually with any MCP client: ${SERVER_COMMAND.command} ${SERVER_COMMAND.args.join(" ")}`);
    return;
  }

  for (const client of selected) {
    console.log(`\n${client.name} (${client.id})`);
    for (const action of client.plan()) {
      console.log(`  ${opts.dryRun ? "would" : "→"} ${action.detail}\n    ${action.target}`);
      if (!opts.dryRun) action.apply();
    }
  }
  console.log(opts.dryRun ? "\nDry run: nothing was changed." : "\nDone. Restart the client(s) so the copypasteui tools load.");
}
