import Link from "next/link";
import Thumb from "@/components/Thumb";
import { requestTradeUrl, siteImage } from "@/lib/config";
import { industries } from "@/lib/industries";
import { getTheme, templates, type TemplateItem } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/templates"),
  title: "Templates",
  description:
    "Free website templates for small businesses: cafés, restaurants, salons, trades, clinics, farms and more, each with its own theme, photography and sections.",
  openGraph: { images: [siteImage] },
};

function TemplateCard({ t }: { t: TemplateItem }) {
  const [brand, kind] = t.name.split(" — ");
  return (
    <Link
      href={`/templates/${t.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-[4px_4px_0_var(--foreground)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <Thumb src={t.thumbnailUrl} video={t.previewVideoUrl} previewSrc={`/preview/template/${t.slug}`} alt={`${t.name} preview`} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">{kind ?? "Template"}</p>
        <h3 className="mt-1 text-lg font-semibold">{brand}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
        {t.brief && (
          <p className="mt-3 text-sm">
            <span className="text-muted-foreground">Also fits </span>
            {t.brief}
          </p>
        )}
        <p className="mt-auto pt-3 text-xs text-muted-foreground">
          {t.sections.length} sections · {getTheme(t.theme)?.name} theme
        </p>
      </div>
    </Link>
  );
}

export default function TemplatesPage() {
  const bySlug = new Map(templates.map((t) => [t.slug, t]));
  const listed = new Set(industries.flatMap((g) => g.slugs));
  const groups = [
    ...industries.map((g) => ({ ...g, items: g.slugs.map((s) => bySlug.get(s)).filter((t): t is TemplateItem => !!t) })),
    { id: "more", name: "More", blurb: "Other complete pages.", slugs: [], items: templates.filter((t) => !listed.has(t.slug)) },
  ].filter((g) => g.items.length);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Templates</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {templates.length} complete websites for small businesses. Each has its own theme, photography and sections designed together, and
        one prompt builds the whole thing for free.
      </p>

      <nav
        aria-label="Industries"
        className="sticky top-16 z-10 -mx-4 mt-8 flex [scrollbar-width:none] gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0"
      >
        {groups.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-foreground"
          >
            {g.name} <span className="text-muted-foreground">{g.items.length}</span>
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="mt-12 scroll-mt-32">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <h2 className="font-display text-2xl font-bold">{g.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{g.items.length}</span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((t) => (
              <TemplateCard key={t.slug} t={t} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 flex flex-col gap-4 rounded-lg border border-foreground bg-card p-6 text-card-foreground shadow-[4px_4px_0_var(--foreground)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Don&apos;t see your kind of business?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us the trade. The most-requested ones get built first, and every template is free.
          </p>
        </div>
        <a
          href={requestTradeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-md border border-foreground bg-foreground px-5 py-2.5 text-center text-sm font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
        >
          Request a trade
        </a>
      </section>
    </main>
  );
}
