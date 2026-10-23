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
      // The generated images themselves (/og/components/*.jpg etc.) stay crawlable for link previews.
      // "/og/site$" (not "/og/site") so the site share image /og/site.jpg stays crawlable.
      disallow: ["/preview/", "/og/site$", "/og/site.html", "/og/site/", "/og/component/", "/og/template/", "/og/theme/"],
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
