// Release notes for /changelog and /feed.xml: the hand-written entries in registry/changelog.json, plus an automatic
// entry for components added after the first release on a date no entry covers.
import raw from "@/generated/changelog.json";
import { components, getComponent, getTemplate, getTheme, templates } from "@/lib/registry";

type RawEntry = {
  date: string;
  title: string;
  body: string;
  links?: { label: string; href: string }[];
  components?: string[];
  themes?: string[];
  templates?: string[];
};

export type ChangeItem = {
  kind: "template" | "component" | "theme";
  slug: string;
  name: string;
  href: string;
  image: string;
  video: string | null;
};
export type ChangeEntry = {
  id: string;
  date: string;
  title: string;
  body: string;
  links: { label: string; href: string }[];
  items: ChangeItem[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

function itemsOf(e: RawEntry): ChangeItem[] {
  return [
    ...(e.templates ?? [])
      .map((s) => getTemplate(s))
      .filter((t) => !!t)
      .map((t) => ({
        kind: "template" as const,
        slug: t.slug,
        name: t.name.split(" — ")[0] ?? t.name,
        href: `/templates/${t.slug}`,
        image: t.thumbnailUrl,
        video: t.previewVideoUrl,
      })),
    ...(e.components ?? [])
      .map((s) => getComponent(s))
      .filter((c) => !!c)
      .map((c) => ({
        kind: "component" as const,
        slug: c.slug,
        name: c.name,
        href: `/components/${c.category}/${c.slug}`,
        image: c.thumbnailUrl,
        video: c.previewVideoUrl,
      })),
    ...(e.themes ?? [])
      .map((s) => getTheme(s))
      .filter((t) => !!t)
      .map((t) => ({
        kind: "theme" as const,
        slug: t.slug,
        name: t.name,
        href: `/themes#${t.slug}`,
        image: t.thumbnailUrl,
        video: null,
      })),
  ];
}

export function changelog(): ChangeEntry[] {
  const entries = (raw as RawEntry[]).map((e) => ({ ...e, id: `${e.date}-${slugify(e.title)}`, links: e.links ?? [], items: itemsOf(e) }));

  // Components already announced, directly or as part of an announced template.
  const covered = new Set(
    (raw as RawEntry[]).flatMap((e) => [
      ...(e.components ?? []),
      ...(e.templates ?? []).flatMap((t) => templates.find((x) => x.slug === t)?.sections ?? []),
    ]),
  );
  // Everything made before the first release is part of it; only later additions get an automatic entry.
  const launch = (raw as RawEntry[]).map((e) => e.date).sort()[0] ?? "";
  const byDate = new Map<string, typeof components>();
  for (const c of components)
    if (!covered.has(c.slug) && c.createdAt > launch) byDate.set(c.createdAt, [...(byDate.get(c.createdAt) ?? []), c]);
  const auto = [...byDate].map(([date, list]) => ({
    id: `${date}-new-sections`,
    date,
    title: `${list.length} new section${list.length === 1 ? "" : "s"}`,
    body: `Added to the library: ${[...new Set(list.map((c) => c.category.replace(/-/g, " ")))].slice(0, 6).join(", ")}${list.length > 6 ? " and more" : ""}.`,
    links: [{ label: "Browse components", href: "/components" }],
    items: list.map((c) => ({
      kind: "component" as const,
      slug: c.slug,
      name: c.name,
      href: `/components/${c.category}/${c.slug}`,
      image: c.thumbnailUrl,
      video: c.previewVideoUrl,
    })),
  }));

  // Newest first; on the same day, hand-written notes before the automatic one.
  return [...entries, ...auto].sort(
    (a, b) => b.date.localeCompare(a.date) || Number(a.id.endsWith("-new-sections")) - Number(b.id.endsWith("-new-sections")),
  );
}
