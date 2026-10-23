import type { NextConfig } from "next";

// Fully static: `next build` writes plain HTML/JSON to out/, deployable to any static host
// (Cloudflare, GitHub Pages, Netlify). There is no server and no API.
// `next dev` with output: "export" errors on any slug missing from generateStaticParams, so dev runs as a
// normal server: unknown slugs then get the 404 page (dynamicParams = false), just like the built site.
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "development" ? {} : { output: "export" as const }),
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
