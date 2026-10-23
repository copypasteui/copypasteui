import Link from "next/link";
import { notFound } from "next/navigation";
import TemplateDetail from "@/components/TemplateDetail";
import Thumb from "@/components/Thumb";
import { industries } from "@/lib/industries";
import { getComponent, getTemplate, getTheme, templates, type TemplateItem } from "@/lib/registry";
import { sectionRole } from "@/lib/roles";
import { JsonLd, abs, breadcrumbs, canonical, freeWork } from "@/lib/seo";
import { themeOptions } from "@/lib/view";

export const generateStaticParams = () => templates.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;

const split = (t: TemplateItem) => {
  const [brand = t.name, kind = "Website"] = t.name.split(" — ");
  return { brand, kind };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTemplate((await params).slug);
  if (!t) return {};
  const { brand, kind } = split(t);
  return {
    ...canonical(`/templates/${t.slug}`),
    title: `Free ${kind.toLowerCase()} website template — ${brand}`,
    description:
      `${t.description}${t.brief ? ` Fits ${t.brief}.` : ""} One prompt for Lovable, Bolt, v0 or ChatGPT, or install with the MCP or shadcn CLI.`.slice(
        0,
        300,
      ),
    openGraph: { images: [{ url: t.thumbnailUrl, width: 1080, height: 675 }] },
    twitter: { card: "summary_large_image" as const, images: [t.thumbnailUrl] },
  };
}

const firstFont = (stack: string) => (stack.split(",")[0] ?? stack).replace(/['"]/g, "").trim();

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();
  const { brand, kind } = split(t);
  const sections = t.sections.map((s) => getComponent(s)!);
  const theme = getTheme(t.theme);
  const dependencies = [...new Set(sections.flatMap((c) => Object.keys(c.dependencies)))].sort();
  const group = industries.find((g) => g.slugs.includes(t.slug));
  const similar = (group?.slugs ?? [])
    .filter((s) => s !== t.slug)
    .map((s) => getTemplate(s))
    .filter((x): x is TemplateItem => !!x)
    .slice(0, 4);
  const has = (cat: string) => sections.some((c) => c.category === cat);

  const faqs = [
    {
      q: "Is it really free for a client's site?",
      a: "Yes. Use it for your own business or for sites you build and sell to clients. The only thing the licence rules out is repackaging the library itself as a competing template collection.",
    },
    {
      q: "Which AI tools does it work with?",
      a: "Anything that writes React and Tailwind: Lovable, Bolt, v0, Replit, ChatGPT, Claude and Gemini through the prompt; Claude Code, VS Code, Codex and Cursor through the MCP; or the shadcn CLI.",
    },
    {
      q: `Can I change the colours and fonts?`,
      a: `It comes with the ${theme?.name ?? t.theme} theme. Pick any of the other themes in the preview before you copy, or ask your AI tool to change the colours afterwards; every section reads the same theme settings.`,
    },
    {
      q: "Do I have to use all the sections?",
      a: `No. Each of the ${sections.length} sections works on its own; open one below to copy just that part, or add sections from other templates.`,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          breadcrumbs([
            ["Templates", "/templates"],
            [brand, `/templates/${t.slug}`],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${brand} — free ${kind.toLowerCase()} website template`,
            description: t.description,
            url: abs(`/templates/${t.slug}`),
            image: t.thumbnailUrl,
            genre: "Website template",
            keywords: [kind, ...(t.brief ? [t.brief] : []), "website template", "small business"].join(", "),
            hasPart: sections.map((c) => ({
              "@type": "SoftwareSourceCode",
              name: c.name,
              url: abs(`/components/${c.category}/${c.slug}`),
            })),
            ...freeWork(),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <nav className="text-sm text-muted-foreground">
        <Link href="/templates" className="hover:text-foreground">
          Templates
        </Link>
        {group && (
          <>
            {" / "}
            <Link href={`/templates#${group.id}`} className="hover:text-foreground">
              {group.name}
            </Link>
          </>
        )}
      </nav>
      <p className="mt-5 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">{kind} website template</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{brand}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{t.description}</p>
      {t.brief && (
        <p className="mt-2 max-w-3xl text-sm">
          <span className="text-muted-foreground">Fits </span>
          {t.brief}.
        </p>
      )}

      <div className="mt-8">
        <TemplateDetail
          slug={t.slug}
          name={brand}
          fullPageImage={t.fullPageImageUrl}
          sections={t.sections}
          dependencies={dependencies}
          themeOptions={themeOptions}
          defaultTheme={t.theme}
        />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">The {sections.length} sections, top to bottom</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Open any one to copy just that section or try it in another theme.</p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/components/${c.category}/${c.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-[4px_4px_0_var(--foreground)]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                  <Thumb
                    src={c.thumbnailUrl}
                    video={c.previewVideoUrl}
                    previewSrc={`/preview/${c.slug}?theme=${t.theme}&frame=thumb`}
                    alt={`${c.name} preview`}
                  />
                  <span className="absolute top-3 left-3 rounded bg-foreground px-2 py-0.5 font-mono text-xs text-background">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="block p-4">
                  <span className="block font-semibold">{c.name.replace(`${brand} `, "")}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{sectionRole[c.category] ?? c.category}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-10 border-t border-foreground pt-12 md:grid-cols-3">
        <div>
          <h2 className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Who it&apos;s for</h2>
          <p className="mt-3">{t.brief ? `Built for ${t.brief}.` : t.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The copy is written for one business; the prompt tells your AI tool to rewrite it for yours.
          </p>
        </div>
        {theme && (
          <div>
            <h2 className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Theme</h2>
            <p className="mt-3">
              <Link href={`/themes#${theme.slug}`} className="font-semibold hover:highlight">
                {theme.name}
              </Link>{" "}
              with {firstFont(theme.fonts.display)} headings and {firstFont(theme.fonts.sans)} text.
            </p>
            <p className="mt-3 flex gap-1.5" aria-hidden>
              {(["background", "primary", "accent", "secondary", "foreground"] as const).map((k) => (
                <span key={k} className="size-6 rounded border border-foreground/15" style={{ background: theme.light[k] }} />
              ))}
            </p>
          </div>
        )}
        <div>
          <h2 className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Pages to add next</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>About: the {has("team") ? "team" : "story"} section and a few reviews</li>
            <li>{has("menu") ? "Menu" : has("products") ? "Shop" : "Services & prices"}: the offering in full</li>
            <li>Contact: the {has("contact") ? "booking or contact" : "contact"} section, a map and opening hours</li>
            <li>
              <Link href="/components/pages/legal-page" className="hover:highlight">
                Privacy & terms
              </Link>{" "}
              (needed if you take bookings, payments or emails)
            </li>
            <li>
              A{" "}
              <Link href="/components/pages/not-found-page" className="hover:highlight">
                404 page
              </Link>{" "}
              and a{" "}
              <Link href="/components/pages/thank-you-page" className="hover:highlight">
                thank-you page
              </Link>{" "}
              for after the form
            </li>
            <li>
              A{" "}
              <Link href="/components/admin" className="hover:highlight">
                back office
              </Link>{" "}
              to edit the menu and see bookings and enquiries yourself
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16 border-t border-foreground pt-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Questions</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="mr-2 inline-block transition group-open:rotate-45">+</span>
                {f.q}
              </summary>
              <p className="mt-2 max-w-3xl pl-6 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">More {group?.name.toLowerCase()} templates</h2>
            <Link href={`/templates#${group?.id}`} className="font-semibold hover:highlight">
              All {group?.name.toLowerCase()} →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((s) => (
              <Link key={s.slug} href={`/templates/${s.slug}`} className="group block min-w-0">
                <span className="relative block aspect-[16/10] overflow-hidden rounded border border-border bg-muted">
                  <Thumb
                    src={s.thumbnailUrl}
                    video={s.previewVideoUrl}
                    previewSrc={`/preview/template/${s.slug}`}
                    alt={`${s.name} preview`}
                  />
                </span>
                <span className="mt-2 block truncate font-semibold">{split(s).brand}</span>
                <span className="block truncate text-sm text-muted-foreground">{split(s).kind}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
