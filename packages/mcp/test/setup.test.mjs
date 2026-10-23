// `copypasteui setup` edits people's editor config files, so it gets its own tests: preview first, keep
// other servers, back files up, refuse what it can't parse. HOME points at a throwaway folder (setup reads
// it once, at import), and PATH has no `claude`, so Claude Code takes the config-file route.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeEach, test } from "node:test";

const HOME = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-home-"));
process.env.HOME = HOME;
process.env.USERPROFILE = HOME;
process.env.APPDATA = path.join(HOME, "AppData", "Roaming");
process.env.PATH = path.dirname(process.execPath);

const { runSetup, SERVER_COMMAND, CLIENT_IDS } = await import("../dist/setup.js");

const at = (...p) => path.join(HOME, ...p);
const read = (...p) => JSON.parse(fs.readFileSync(at(...p), "utf8"));
const write = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof data === "string" ? data : JSON.stringify(data, null, 2));
};
function run(opts) {
  const lines = [];
  const log = console.log;
  console.log = (...a) => lines.push(a.join(" "));
  try {
    runSetup({ clients: [], all: false, dryRun: false, ...opts });
  } finally {
    console.log = log;
  }
  return lines.join("\n");
}

beforeEach(() => {
  for (const f of fs.readdirSync(HOME)) fs.rmSync(path.join(HOME, f), { recursive: true, force: true });
});

test("with no client named, it explains the options and changes nothing", () => {
  write(at(".cursor", "keep.txt"), "x");
  const out = run({});
  assert.match(out, /Detected clients: cursor/);
  assert.match(out, /--dry-run/);
  assert.ok(out.includes(`${SERVER_COMMAND.command} ${SERVER_COMMAND.args.join(" ")}`), "shows the manual command");
  assert.equal(fs.existsSync(at(".cursor", "mcp.json")), false);
});

test("a dry run shows the change and writes nothing", () => {
  const out = run({ clients: ["cursor"], dryRun: true });
  assert.match(out, /would set mcpServers\.copypasteui/);
  assert.match(out, /Dry run: nothing was changed/);
  assert.equal(fs.existsSync(at(".cursor", "mcp.json")), false);
});

test("adds the server, keeps other servers and settings, and backs the file up", () => {
  const before = { theme: "dark", mcpServers: { other: { command: "other-mcp" } } };
  write(at(".cursor", "mcp.json"), before);
  run({ clients: ["cursor"] });
  const after = read(".cursor", "mcp.json");
  assert.deepEqual(after.mcpServers.other, before.mcpServers.other);
  assert.equal(after.theme, "dark");
  assert.deepEqual(after.mcpServers.copypasteui, SERVER_COMMAND);
  assert.deepEqual(read(".cursor", "mcp.json.copypasteui.backup"), before);
});

test("running it twice leaves one entry", () => {
  run({ clients: ["cursor"] });
  run({ clients: ["cursor"] });
  assert.deepEqual(Object.keys(read(".cursor", "mcp.json").mcpServers), ["copypasteui"]);
});

test("refuses a config it can't parse instead of overwriting it", () => {
  const text = '{\n  // my servers\n  "mcpServers": {}\n}\n';
  write(at(".cursor", "mcp.json"), text);
  assert.throws(() => run({ clients: ["cursor"] }), /not plain JSON \(comments\?\)\. Add the server manually/);
  assert.equal(fs.readFileSync(at(".cursor", "mcp.json"), "utf8"), text);
});

test("VS Code uses its own servers key and stdio type", () => {
  run({ clients: ["vscode"] });
  const file =
    process.platform === "darwin"
      ? ["Library", "Application Support", "Code", "User", "mcp.json"]
      : process.platform === "win32"
        ? ["AppData", "Roaming", "Code", "User", "mcp.json"]
        : [".config", "Code", "User", "mcp.json"];
  assert.deepEqual(read(...file).servers.copypasteui, { type: "stdio", ...SERVER_COMMAND });
});

test("Codex: replaces an old block in config.toml and keeps the rest", () => {
  write(at(".codex", "config.toml"), 'model = "o3"\n\n[mcp_servers.copypasteui]\ncommand = "old"\n\n[mcp_servers.other]\ncommand = "x"\n');
  run({ clients: ["codex"] });
  const toml = fs.readFileSync(at(".codex", "config.toml"), "utf8");
  assert.match(toml, /model = "o3"/);
  assert.match(toml, /\[mcp_servers\.other\]\ncommand = "x"/);
  assert.equal((toml.match(/\[mcp_servers\.copypasteui\]/g) ?? []).length, 1);
  assert.doesNotMatch(toml, /command = "old"/);
  assert.ok(fs.existsSync(at(".codex", "config.toml.copypasteui.backup")));
});

test("Claude Code without its CLI: writes ~/.claude.json and installs the skill", () => {
  run({ clients: ["claude_code"] });
  assert.deepEqual(read(".claude.json").mcpServers.copypasteui, { type: "stdio", ...SERVER_COMMAND });
  assert.match(fs.readFileSync(at(".claude", "skills", "copypasteui", "SKILL.md"), "utf8"), /copypasteui/i);
});

test("--all sets up only the clients it finds", () => {
  fs.mkdirSync(at(".gemini"), { recursive: true });
  run({ all: true });
  assert.deepEqual(Object.keys(read(".gemini", "settings.json").mcpServers), ["copypasteui"]);
  assert.equal(fs.existsSync(at(".cursor", "mcp.json")), false);
});

test("an unknown client is an error that lists the supported ones", () => {
  assert.throws(() => run({ clients: ["notepad"] }), new RegExp(`Unknown client\\(s\\): notepad\\. Supported: ${CLIENT_IDS.join(", ")}`));
});
