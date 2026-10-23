// Checks every preview image and video link in the registry: the link works, it's the right kind of file, and it's
// the right shape and size. Images are links, never files in the repo (maintainers upload to cdn.copypasteui.dev,
// contributors may link their own host), so this is what stops a broken or unsuitable picture reaching the site.
//
// Usage: node scripts/check-images.mjs            every link
//        node scripts/check-images.mjs hero       only links of items whose slug contains "hero"
// Reads only the first 64 KB of each file (enough for its type, size and pixel dimensions). Fails on links that are
// gone or wrong; retries network errors and only warns if a host still can't be reached, like check-photos.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = path.join(ROOT, "registry");
const CONCURRENCY = 12;
const RETRIES = 3;
const KB = 1024;
const only = process.argv[2] ?? "";

// What each field must be. Thumbnails are 16:10 (1280×800 for sections, 1080×675 for templates and themes).
const RULES = {
  thumbnail: { kind: "image", maxBytes: 400 * KB, minWidth: 1000, ratio: 1.6 },
  fullPage: { kind: "image", maxBytes: 1536 * KB, minWidth: 800, tall: true },
  preview: { kind: "video", maxBytes: 3 * KB * KB },
  site: { kind: "image", maxBytes: 1024 * KB, minWidth: 1200, ratio: 1200 / 630 },
};

/** @type {{ url: string, field: keyof RULES, where: string }[]} */
const links = [];
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const collect = (file, images) => {
  for (const [field, url] of Object.entries(images ?? {})) if (RULES[field]) links.push({ url, field, where: path.relative(ROOT, file) });
};
for (const category of fs.readdirSync(path.join(REGISTRY, "components"))) {
  const dir = path.join(REGISTRY, "components", category);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const slug of fs.readdirSync(dir)) {
    const file = path.join(dir, slug, "meta.json");
    if (fs.existsSync(file) && slug.includes(only)) collect(file, readJson(file).images);
  }
}
for (const kind of ["templates", "themes"])
  for (const f of fs.readdirSync(path.join(REGISTRY, kind)))
    if (f.endsWith(".json") && f.includes(only)) collect(path.join(REGISTRY, kind, f), readJson(path.join(REGISTRY, kind, f)).images);
const config = path.join(ROOT, "apps/web/src/lib/config.ts");
const siteImage = fs.readFileSync(config, "utf8").match(/siteImage = "([^"]+)"/)?.[1];
if (siteImage && !only) links.push({ url: siteImage, field: "site", where: path.relative(ROOT, config) });

/** Width and height from the first bytes of a JPEG, PNG or WebP file, or null. */
function dimensions(b) {
  if (b[0] === 0x89 && b[1] === 0x50) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9;) {
      if (b[i] !== 0xff) return null;
      const marker = b[i + 1];
      // Start-of-frame markers carry the size; DHT (C4), JPG (C8) and DAC (CC) share the range but don't.
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

/** First 64 KB, the content type and the full size, following redirects. */
async function head(url) {
  const res = await fetch(url.replace(/#.*$/, ""), { headers: { Range: "bytes=0-65535" }, redirect: "follow" });
  if (res.status === 404 || res.status === 410) return { gone: res.status };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const total = Number(res.headers.get("content-range")?.split("/")[1] ?? res.headers.get("content-length") ?? NaN);
  const reader = res.body.getReader();
  const parts = [];
  let read = 0;
  while (read < 65536) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    read += value.length;
  }
  await reader.cancel().catch(() => {});
  return { type: res.headers.get("content-type") ?? "", size: total, bytes: Buffer.concat(parts) };
}

/** A problem with the file, or null when it's fine. Throws on network errors so the caller can retry. */
async function check({ url, field }) {
  const rule = RULES[field];
  const got = await head(url);
  if (got.gone) return `link is broken (HTTP ${got.gone})`;
  if (Number.isFinite(got.size) && got.size > rule.maxBytes)
    return `${Math.round(got.size / KB)} KB is over the ${Math.round(rule.maxBytes / KB)} KB limit for ${field}`;
  if (rule.kind === "video") {
    const webm = got.bytes.readUInt32BE(0) === 0x1a45dfa3;
    const mp4 = got.bytes.toString("ascii", 4, 8) === "ftyp";
    return webm || mp4 ? null : `not a WebM or MP4 video (content type "${got.type}")`;
  }
  const size = dimensions(got.bytes);
  if (!size) return `not a JPEG, PNG or WebP image (content type "${got.type}")`;
  if (size.width < rule.minWidth) return `${size.width}×${size.height} is narrower than ${rule.minWidth} pixels`;
  if (rule.ratio && Math.abs(size.width / size.height / rule.ratio - 1) > 0.02)
    return `${size.width}×${size.height} isn't ${field === "site" ? "1200×630" : "16:10 (e.g. 1280×800)"}`;
  if (rule.tall && size.height < size.width) return `${size.width}×${size.height} should be the whole page, taller than it is wide`;
  return null;
}

const problems = [];
const unreachable = [];
const queue = [...links];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let link = queue.shift(); link; link = queue.shift()) {
      for (let attempt = 1; ; attempt++) {
        try {
          const problem = await check(link);
          if (problem)
            problems.push(`${link.where} images.${link.field === "site" ? "siteImage" : link.field}: ${problem}\n    ${link.url}`);
          break;
        } catch (err) {
          if (attempt < RETRIES) continue;
          unreachable.push(`${link.where}: ${link.url} (${err.message})`);
          break;
        }
      }
    }
  }),
);

for (const u of unreachable) console.warn(`warning: couldn't reach ${u}`);
if (problems.length) {
  console.error(`${problems.length} of ${links.length} image links need fixing:\n- ${problems.sort().join("\n- ")}`);
  process.exit(1);
}
console.log(`check-images: ${links.length - unreachable.length} of ${links.length} image links checked, all fine`);
