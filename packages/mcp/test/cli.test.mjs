// The `copypasteui` command as people type it, against the locally built registry.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const CLI = path.resolve(here, "../dist/cli.js");
const REGISTRY = path.resolve(here, "../../../apps/web/public/r");

function cli(args, cwd = os.tmpdir()) {
  const r = spawnSync(process.execPath, [CLI, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, COPYPASTEUI_REGISTRY: REGISTRY, XDG_CACHE_HOME: fs.mkdtempSync(path.join(os.tmpdir(), "cpui-cache-")) },
  });
  return { code: r.status, out: r.stdout, err: r.stderr };
}

test("--version prints the package version", () => {
  const { version } = JSON.parse(fs.readFileSync(path.resolve(here, "../package.json"), "utf8"));
  assert.equal(cli(["--version"]).out.trim(), version);
});

test("no command prints help", () => {
  const r = cli([]);
  assert.equal(r.code, 0);
  assert.match(r.out, /Usage/);
  assert.match(r.out, /copypasteui add <slug>/);
});

test("search ranks like the site and filters by category", () => {
  const r = cli(["search", "pricing", "toggle"]);
  assert.equal(r.code, 0);
  assert.match(r.out.split("\n")[0], /^toggle-tier-pricing\s/);
  const heroes = cli(["search", "--category", "hero"]).out.trim().split("\n");
  assert.ok(heroes.length > 1 && heroes.every((l) => /\shero\s/.test(l)));
  assert.match(cli(["search", "zzzz", "qqqq"]).out, /No matches\./);
});

test("themes lists every theme", () => {
  const index = JSON.parse(fs.readFileSync(path.join(REGISTRY, "index.json"), "utf8"));
  assert.equal(cli(["themes"]).out.trim().split("\n").length, index.themes.length);
});

test("add writes the file with its licence notice, then refuses to overwrite", () => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-project-"));
  const r = cli(["add", "toggle-tier-pricing", "--theme", "olea"], project);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /created\s+.*ToggleTierPricing\.tsx/);
  assert.match(r.out, /Next: npm install/);
  const file = path.join(project, "components/copypasteui/ToggleTierPricing.tsx");
  assert.match(fs.readFileSync(file, "utf8"), /^\/\/ .*PolyForm Shield 1\.0\.0[^\n]*\n\/\/ Required Notice:/);
  assert.match(cli(["add", "toggle-tier-pricing"], project).out, /exists\s+.*\(use --overwrite\)/);
});

test("unknown slugs and themes fail with a hint", () => {
  const a = cli(["add", "no-such-section"]);
  assert.equal(a.code, 1);
  assert.match(a.err, /Unknown component "no-such-section"\. Try: copypasteui search/);
  const b = cli(["add", "toggle-tier-pricing", "--theme", "no-such-theme"]);
  assert.equal(b.code, 1);
  assert.match(b.err, /Unknown theme "no-such-theme"/);
  assert.match(cli(["add"]).err, /Usage: copypasteui add <slug>/);
});
