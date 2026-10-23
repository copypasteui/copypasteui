// Checks that every Unsplash photo used by a component still exists.
// Photos are hotlinked, so a photo removed from Unsplash silently breaks a live section.
//
// Usage: node scripts/check-photos.mjs
// Fails on photos Unsplash reports as gone (404/410); retries network errors and only warns
// if a photo still can't be reached, so a flaky connection doesn't block a pull request.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS = path.join(ROOT, "registry", "components");
const PHOTO_RE = /images\.unsplash\.com\/(photo-[0-9]+-[0-9a-f]+)/g;
const ID_RE = /["'`](photo-[0-9]+-[0-9a-f]+)["'`]/g;
const CONCURRENCY = 12;
const RETRIES = 3;

// photo id -> component slugs that use it
const uses = new Map();
for (const category of fs.readdirSync(COMPONENTS)) {
  const catDir = path.join(COMPONENTS, category);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const slug of fs.readdirSync(catDir)) {
    const file = path.join(catDir, slug, "component.tsx");
    if (!fs.existsSync(file)) continue;
    const code = fs.readFileSync(file, "utf8");
    // Components build URLs with a helper (img("photo-…")), so match bare ids as well as full URLs.
    for (const m of [...code.matchAll(PHOTO_RE), ...code.matchAll(ID_RE)]) {
      if (!uses.has(m[1])) uses.set(m[1], new Set());
      uses.get(m[1]).add(slug);
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function check(id) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(`https://images.unsplash.com/${id}?w=16&q=10`, { method: "HEAD", signal: AbortSignal.timeout(15000) });
      if (res.ok) return { id, ok: true };
      if (res.status === 404 || res.status === 410) return { id, ok: false, gone: true, status: res.status };
      if (attempt >= RETRIES) return { id, ok: false, status: res.status };
    } catch (e) {
      if (attempt >= RETRIES) return { id, ok: false, status: e.name };
    }
    await sleep(500 * attempt);
  }
}

const ids = [...uses.keys()].sort();
const results = [];
for (let i = 0; i < ids.length; i += CONCURRENCY) {
  results.push(...(await Promise.all(ids.slice(i, i + CONCURRENCY).map(check))));
}

const gone = results.filter((r) => r.gone);
const unreachable = results.filter((r) => !r.ok && !r.gone);
const list = (rs) => rs.map((r) => `  - ${r.id} (${r.status}) used by ${[...uses.get(r.id)].join(", ")}`).join("\n");

if (unreachable.length) console.warn(`check-photos: ${unreachable.length} photo(s) could not be reached (network?):\n${list(unreachable)}`);
if (gone.length) {
  console.error(`check-photos: ${gone.length} photo(s) no longer exist on Unsplash — replace them:\n${list(gone)}`);
  process.exit(1);
}
console.log(
  `check-photos: all ${ids.length} photos used by ${new Set([...uses.values()].flatMap((s) => [...s])).size} components are available.`,
);
