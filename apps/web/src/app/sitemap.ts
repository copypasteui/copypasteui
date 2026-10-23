import type { MetadataRoute } from "next";
import { changelog } from "@/lib/changelog";
import { config } from "@/lib/config";
import { categories, components, templates } from "@/lib/registry";

// Static export: generated once at build time.
export const dynamic = "force-static";

const url = (path: string) => `${config.siteUrl}${path}`;

// Real dates only: a section's createdAt, the newest section in a template or category, the newest
// changelog entry. Pages with nothing to date get no lastModified rather than the build time, which
// search engines learn to ignore.
const newest = (dates: (string | undefined)[]) => {
  const d = dates
    .filter((x): x is string => Boolean(x))
    .sort()
    .at(-1);
  return d ? new Date(d) : undefined;
};
const sectionDate = new Map(components.map((c) => [c.slug, c.createdAt]));
const dated = (path: string, lastModified: Date | undefined, rest: Omit<MetadataRoute.Sitemap[number], "url" | "lastModified">) => ({
  url: url(path),
  ...(lastModified ? { lastModified } : {}),
  ...rest,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const library = newest(components.map((c) => c.createdAt));
  const news = newest(changelog().map((e) => e.date));

  const pages: MetadataRoute.Sitemap = [
    dated("/", newest([library?.toISOString(), news?.toISOString()]), { changeFrequency: "weekly", priority: 1 }),
    dated("/templates", library, { changeFrequency: "weekly", priority: 0.9 }),
    dated("/components", library, { changeFrequency: "weekly", priority: 0.9 }),
    dated("/backgrounds", newest(components.filter((c) => c.category === "background").map((c) => c.createdAt)), {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    dated("/themes", undefined, { changeFrequency: "monthly", priority: 0.7 }),
    dated("/get-started", undefined, { changeFrequency: "monthly", priority: 0.8 }),
    dated("/plan", undefined, { changeFrequency: "monthly", priority: 0.8 }),
    dated("/developers", undefined, { changeFrequency: "monthly", priority: 0.7 }),
    dated("/about", undefined, { changeFrequency: "yearly", priority: 0.4 }),
    dated("/changelog", news, { changeFrequency: "weekly", priority: 0.5 }),
    dated("/contribute", undefined, { changeFrequency: "monthly", priority: 0.4 }),
    dated("/terms", undefined, { changeFrequency: "yearly", priority: 0.2 }),
    dated("/privacy", undefined, { changeFrequency: "yearly", priority: 0.2 }),
    dated("/cookies", undefined, { changeFrequency: "yearly", priority: 0.2 }),
  ];

  const templatePages = templates.map((t) =>
    dated(`/templates/${t.slug}`, newest(t.sections.map((s) => sectionDate.get(s))), { changeFrequency: "monthly", priority: 0.8 }),
  );

  const categoryPages = categories
    .filter((c) => c.count > 0)
    .map((c) =>
      dated(`/components/${c.slug}`, newest(components.filter((x) => x.category === c.slug).map((x) => x.createdAt)), {
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    );

  const componentPages = components.map((c) =>
    dated(`/components/${c.category}/${c.slug}`, c.createdAt ? new Date(c.createdAt) : undefined, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...pages, ...templatePages, ...categoryPages, ...componentPages];
}
