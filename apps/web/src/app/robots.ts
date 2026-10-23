import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

// Static export: generated once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Preview pages are iframe-only and the og/* HTML pages exist just to render share images.
      disallow: ["/preview/"],
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
