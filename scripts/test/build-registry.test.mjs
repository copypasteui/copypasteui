// Validator rules in scripts/build-registry.mjs: each test copies the real registry to a temp folder, breaks
// one thing, and checks that `--check` rejects it with a message a contributor can act on.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/build-registry.mjs");

/** A copy of registry/ with `change(dir)` applied, validated with --check. */
function check(change = () => {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-registry-"));
  try {
    fs.cpSync(path.join(ROOT, "registry"), dir, { recursive: true });
    change(dir);
    const r = spawnSync(process.execPath, [SCRIPT, "--check"], {
      env: { ...process.env, COPYPASTEUI_REGISTRY_SRC: dir },
      encoding: "utf8",
    });
    return { ok: r.status === 0, out: `${r.stdout}${r.stderr}` };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const SECTION = `"use client";

export default function TestSection() {
  return (
    <section className="bg-background text-foreground">
      <h2 className="font-display text-3xl">Fresh bread from 7am</h2>
    </section>
  );
}
`;
const META = {
  slug: "test-section",
  name: "Test Section",
  description: "A plain section used by the validator tests.",
  category: "cta",
  tags: ["test"],
  author: { name: "Test", github: "test" },
  dependencies: {},
  createdAt: "2026-10-22",
  images: { thumbnail: "https://cdn.example/test-section.jpg" },
};

/** Adds cta/test-section with the given code and meta overrides. */
const addSection =
  (code = SECTION, meta = {}) =>
  (dir) => {
    const at = path.join(dir, "components/cta/test-section");
    fs.mkdirSync(at, { recursive: true });
    fs.writeFileSync(path.join(at, "component.tsx"), code);
    fs.writeFileSync(path.join(at, "meta.json"), JSON.stringify({ ...META, ...meta }, null, 2));
  };
const withBody = (body) => SECTION.replace("<h2", `${body}\n      <h2`);
const editJson = (dir, rel, fn) => {
  const file = path.join(dir, rel);
  fs.writeFileSync(file, JSON.stringify(fn(JSON.parse(fs.readFileSync(file, "utf8"))), null, 2));
};

test("the real registry passes", () => {
  const r = check();
  assert.ok(r.ok, r.out);
  assert.match(r.out, /Registry OK/);
});

test("a well-formed new section passes", () => {
  const r = check(addSection());
  assert.ok(r.ok, r.out);
});

test("refuses to write output from a copy", () => {
  const r = spawnSync(process.execPath, [SCRIPT], { env: { ...process.env, COPYPASTEUI_REGISTRY_SRC: "/tmp/x" }, encoding: "utf8" });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /only allowed with --check/);
});

describe("sections: code rules", () => {
  const rejects = (name, code, meta, pattern) =>
    test(name, () => {
      const r = check(addSection(code, meta));
      assert.equal(r.ok, false, `expected a failure for: ${name}`);
      assert.match(r.out, pattern);
      assert.match(r.out, /test-section/, "the message names the file");
    });

  rejects("must start with use client", SECTION.replace('"use client";\n', ""), {}, /must start with "use client"/);
  rejects("needs a default export", SECTION.replace("export default function", "export function"), {}, /named default export/);
  rejects(
    "no packages outside the allowlist",
    SECTION.replace('"use client";\n', '"use client";\nimport axios from "axios";\n'),
    { dependencies: { axios: "^1" } },
    /import "axios" is not allowed/,
  );
  rejects(
    "no relative imports",
    SECTION.replace('"use client";\n', '"use client";\nimport x from "./x";\n'),
    {},
    /relative import "\.\/x"/,
  );
  rejects(
    "dependencies must match the imports",
    SECTION.replace('"use client";\n', '"use client";\nimport { motion } from "motion/react";\n'),
    {},
    /dependencies must list exactly/,
  );
  rejects("no network calls", withBody('{void fetch("/api")}'), {}, /network calls are not allowed/);
  rejects("no storage", withBody('{localStorage.getItem("x")}'), {}, /storage and cookie access is not allowed/);
  rejects(
    "no dangerouslySetInnerHTML",
    withBody('<div dangerouslySetInnerHTML={{ __html: "x" }} />'),
    {},
    /dangerouslySetInnerHTML is not allowed/,
  );
  rejects("no eval", withBody('{eval("1")}'), {}, /eval\(\) is not allowed/);
  rejects(
    "photos only from images.unsplash.com",
    withBody('<img src="https://example.com/a.jpg" alt="Bread" />'),
    {},
    /must come from images\.unsplash\.com/,
  );
  rejects("no Unsplash+ photos", withBody('<img src="https://plus.unsplash.com/premium_photo-1" alt="Bread" />'), {}, /Unsplash\+/);
  rejects(
    "every image has alt text",
    withBody('<img src="https://images.unsplash.com/photo-1509440159596-0249088772ff" />'),
    {},
    /needs an alt attribute/,
  );
  rejects(
    "no embeds",
    withBody('<iframe src="https://images.unsplash.com/x" title="x" />'),
    {},
    /iframes, video, audio and embeds are not allowed/,
  );
  rejects(
    "no machine-made tells",
    withBody('<p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hi</p>'),
    {},
    /looks machine-made/,
  );
});

describe("sections: meta rules", () => {
  const rejects = (name, meta, pattern) =>
    test(name, () => {
      const r = check(addSection(SECTION, meta));
      assert.equal(r.ok, false);
      assert.match(r.out, pattern);
    });
  rejects("slug must equal the folder", { slug: "other" }, /slug must equal the folder name "test-section"/);
  rejects("category must equal the folder", { category: "hero" }, /category must equal the parent folder "cta"/);
  rejects("createdAt is a date", { createdAt: "yesterday" }, /createdAt must be YYYY-MM-DD/);
  rejects("author is required", { author: { name: "" } }, /author\.name is required/);
  rejects("licence must be known", { license: "GPL-3.0" }, /license must be one of PolyForm-Shield-1\.0\.0, MIT/);
  rejects("a thumbnail link is required", { images: undefined }, /images\.thumbnail is required/);
  rejects("image links are https", { images: { thumbnail: "http://cdn.example/a.jpg" } }, /images\.thumbnail must be an https link/);
  rejects("thumbnails are pictures", { images: { thumbnail: "https://cdn.example/a.gif" } }, /must link to a \.jpg, \.png or \.webp file/);
  rejects(
    "previews are videos",
    { images: { thumbnail: "https://cdn.example/a.jpg", preview: "https://cdn.example/a.jpg" } },
    /must link to a \.webm or \.mp4 file/,
  );
  rejects(
    "only known image fields",
    { images: { thumbnail: "https://cdn.example/a.jpg", fullPage: "https://cdn.example/b.jpg" } },
    /images\.fullPage is not an image field/,
  );
});

test("a scroll reveal can't start fully clipped", () => {
  const reveal = (from) =>
    withBody(`<motion.div initial={{ clipPath: "${from}" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}>Hi</motion.div>`).replace(
      '"use client";',
      '"use client";\nimport { motion } from "motion/react";',
    );
  const meta = { dependencies: { motion: ">=12.0.0" } };
  const stuck = check(addSection(reveal("inset(0 0 100% 0)"), meta));
  assert.equal(stuck.ok, false);
  assert.match(stuck.out, /starts fully clipped/);
  assert.equal(check(addSection(reveal("inset(0% 0% 99.5% 0%)"), meta)).ok, true);
});

test("a design-ok comment allows a flagged pattern on purpose", () => {
  const code = withBody(
    '{/* design-ok: gradient-text — the effect is the point */}\n      <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hi</p>',
  );
  const r = check(addSection(code));
  assert.ok(r.ok, r.out);
});

test("themes: unreadable colour pairs are rejected", () => {
  const r = check((dir) =>
    editJson(dir, "themes/olea.json", (t) => ({ ...t, light: { ...t.light, "primary-foreground": t.light.primary } })),
  );
  assert.equal(r.ok, false);
  assert.match(r.out, /olea\.json/);
  assert.match(r.out, /contrast is 1\.00:1/);
});

test("templates: every section must exist", () => {
  const r = check((dir) =>
    editJson(dir, "templates/olea-restaurant.json", (t) => ({ ...t, sections: [...t.sections, "no-such-section"] })),
  );
  assert.equal(r.ok, false);
  assert.match(r.out, /section "no-such-section" is not a component slug/);
});

test("changelog: newest entries first", () => {
  const r = check((dir) => editJson(dir, "changelog.json", (entries) => [...entries, { ...entries[0], date: "2030-01-01" }]));
  assert.equal(r.ok, false);
  assert.match(r.out, /entries must be newest first/);
});

test("recipes: a full backend must explain the first owner", () => {
  const r = check((dir) => {
    const file = path.join(dir, "recipes/supabase.md");
    fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/first owner/gi, "initial admin"));
  });
  assert.equal(r.ok, false);
  assert.match(r.out, /must explain how to create the first owner/);
});
