// Serves the static export (out/) the way static hosts do: /components → components.html.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

export function serveStatic(rootDir, port) {
  const root = path.resolve(rootDir);
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const base = path.join(root, path.normalize(url).replace(/^(\.\.[/\\])+/, ""));
    const file = [base, `${base}.html`, path.join(base, "index.html")].find(
      (f) => f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile(),
    );
    if (!file) {
      res.writeHead(404, { "content-type": "text/html" });
      return fs.createReadStream(path.join(root, "404.html")).pipe(res);
    }
    // Like the live site (public/_headers): any origin may load files, which sandboxed previews need for the fonts.
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream", "access-control-allow-origin": "*" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  serveStatic(process.argv[2] ?? "out", port).then(() => console.log(`Serving on http://localhost:${port}`));
}
