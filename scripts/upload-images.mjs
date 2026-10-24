// Uploads the maintainers' preview images to the copypasteui R2 bucket behind cdn.copypasteui.dev. A maintainer's
// tool, run by hand on your own machine: CI never uploads. Every registry link on cdn.copypasteui.dev maps to a local
// file at the same path under apps/web/public/ (made by `npm run screenshots` and `npm run previews`); links that
// already work are skipped, so it's safe to run again after adding a few sections.
//
// Usage (the token needs Workers R2 Storage: Edit; it stays in your shell, never in the repo):
//   export CLOUDFLARE_API_TOKEN=…  CLOUDFLARE_ACCOUNT_ID=…
//   node scripts/upload-images.mjs --dry-run      list what would be uploaded
//   node scripts/upload-images.mjs                upload what's missing
//   node scripts/upload-images.mjs --force hero   re-upload links containing "hero", even if they exist
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CDN = "https://cdn.copypasteui.dev/";
const BUCKET = "copypasteui";
const WRANGLER = "wrangler@4.148.0";
const CONCURRENCY = 6;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const only = args.find((a) => !a.startsWith("--")) ?? "";
// Where a CDN path comes from when it isn't under apps/web/public/.
const SOURCES = { "og/site.png": "brand/social/og-default-1200x630.png" };
const TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

if (!dryRun && (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID)) {
  console.error("Set CLOUDFLARE_API_TOKEN (with Workers R2 Storage: Edit) and CLOUDFLARE_ACCOUNT_ID in your shell first.");
  process.exit(1);
}
if (!dryRun && !/^[0-9a-f]{32}$/.test(process.env.CLOUDFLARE_ACCOUNT_ID)) {
  console.error(
    `CLOUDFLARE_ACCOUNT_ID should be 32 hexadecimal characters; this one has ${process.env.CLOUDFLARE_ACCOUNT_ID.length}. Copy it from Workers & Pages in the Cloudflare dashboard.`,
  );
  process.exit(1);
}

const urls = new Set();
const readImages = (file) => Object.values(JSON.parse(fs.readFileSync(file, "utf8")).images ?? {});
const registry = path.join(ROOT, "registry");
for (const category of fs.readdirSync(path.join(registry, "components"))) {
  const dir = path.join(registry, "components", category);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const slug of fs.readdirSync(dir)) {
    const meta = path.join(dir, slug, "meta.json");
    if (fs.existsSync(meta)) readImages(meta).forEach((u) => urls.add(u));
  }
}
for (const kind of ["templates", "themes"])
  for (const f of fs.readdirSync(path.join(registry, kind)))
    if (f.endsWith(".json")) readImages(path.join(registry, kind, f)).forEach((u) => urls.add(u));
const site = fs.readFileSync(path.join(ROOT, "apps/web/src/lib/config.ts"), "utf8").match(/siteImage = "([^"]+)"/)?.[1];
if (site) urls.add(site);

const files = [...urls]
  .map((u) => u.replace(/#.*$/, ""))
  .filter((u) => u.startsWith(CDN) && u.includes(only))
  .map((url) => {
    const key = url.slice(CDN.length);
    return { url, key, file: path.join(ROOT, SOURCES[key] ?? path.join("apps/web/public", key)) };
  });
const missingLocally = files.filter((f) => !fs.existsSync(f.file));
if (missingLocally.length) {
  console.error(`${missingLocally.length} linked images aren't on this machine. Make them first (npm run screenshots / previews):`);
  for (const f of missingLocally.slice(0, 20)) console.error(`  ${path.relative(ROOT, f.file)}`);
  process.exit(1);
}

const exists = async (url) => {
  try {
    return (await fetch(url, { method: "HEAD" })).ok;
  } catch {
    return false;
  }
};
const run = (cmd, argv) =>
  new Promise((resolve) => {
    const child = spawn(cmd, argv, { stdio: ["ignore", "ignore", "pipe"], env: { ...process.env, WRANGLER_SEND_METRICS: "false" } });
    let err = "";
    child.stderr.on("data", (d) => (err += d));
    // Wrangler ends with where its log went; the useful line is the error before it.
    const reason = () =>
      err
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.includes("Logs were written"))
        .pop();
    child.on("close", (code) => resolve(code === 0 ? null : (reason() ?? `wrangler exited with ${code}`)));
  });

const todo = [];
const queue = [...files];
await Promise.all(
  Array.from({ length: 16 }, async () => {
    for (let f = queue.shift(); f; f = queue.shift()) if (force || !(await exists(f.url))) todo.push(f);
  }),
);
console.log(`${files.length} images linked on cdn.copypasteui.dev, ${files.length - todo.length} already there, ${todo.length} to upload`);
if (dryRun) {
  for (const f of todo.slice(0, 30)) console.log(`  ${f.key}  ←  ${path.relative(ROOT, f.file)}`);
  if (todo.length > 30) console.log(`  … and ${todo.length - 30} more`);
  process.exit(0);
}

let done = 0;
const failures = [];
const uploads = [...todo];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let f = uploads.shift(); f; f = uploads.shift()) {
      // Links keep their name when an image is redone, so browsers and Cloudflare re-check after a day.
      const err = await run("npx", [
        "--yes",
        WRANGLER,
        "r2",
        "object",
        "put",
        `${BUCKET}/${f.key}`,
        "--file",
        f.file,
        "--remote",
        "--content-type",
        TYPES[path.extname(f.key).toLowerCase()] ?? "application/octet-stream",
        "--cache-control",
        "public, max-age=86400",
      ]);
      if (err) failures.push(`${f.key}: ${err}`);
      done++;
      if (process.stdout.isTTY) process.stdout.write(`\ruploaded ${done}/${todo.length}`);
    }
  }),
);
if (process.stdout.isTTY) process.stdout.write("\n");
if (failures.length) {
  console.error(`${failures.length} upload(s) failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Uploaded ${todo.length} images. Check them with: npm run check:images`);
