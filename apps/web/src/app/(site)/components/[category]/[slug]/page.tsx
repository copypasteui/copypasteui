import Link from "next/link";
import { notFound } from "next/navigation";
import ComponentCard from "@/components/ComponentCard";
import ComponentDetail from "@/components/ComponentDetail";
import { githubUrl, license } from "@/lib/config";
import { components, defaultTheme, getCategory, getComponent, getTemplate, summarize } from "@/lib/registry";
import { JsonLd, abs, breadcrumbs, canonical, freeWork } from "@/lib/seo";
import { themeOptions } from "@/lib/view";

export const generateStaticParams = () => components.map((c) => ({ category: c.category, slug: c.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getComponent((await params).slug);
  return c
    ? {
        ...canonical(`/components/${c.category}/${c.slug}`),
        title: `${c.name} — free ${c.category.replace(/-/g, " ")} section`,
        description:
          `${c.description} Free React + Tailwind section: copy one prompt into Lovable, Bolt or v0, or install it with the MCP or shadcn CLI.`.slice(
            0,
            300,
          ),
        openGraph: { images: [{ url: c.thumbnailUrl, width: 1280, height: 800 }] },
        twitter: { card: "summary_large_image" as const, images: [c.thumbnailUrl] },
      }
    : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const c = getComponent(slug);
  if (!c || c.category !== category) notFound();
  const cat = getCategory(category)!;
  const related = components
    .filter((x) => x.category === category && x.slug !== slug)
    .slice(0, 3)
    .map(summarize);
  const source = `${githubUrl}/tree/main/registry/components/${category}/${slug}`;
  const collection = c.collection ? getTemplate(c.collection) : undefined;
  const siblings = collection ? collection.sections.filter((s) => s !== slug).map((s) => summarize(getComponent(s)!)) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          breadcrumbs([
            ["Sections", "/components"],
            [cat.name, `/components/${category}`],
            [c.name, `/components/${category}/${slug}`],
          ]),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: c.name,
            description: c.description,
            url: abs(`/components/${category}/${slug}`),
            image: c.thumbnailUrl,
            programmingLanguage: "TypeScript (React, Tailwind CSS)",
            codeRepository: source,
            keywords: [cat.name, ...c.tags].join(", "),
            author: {
              "@type": "Person",
              name: c.author.name,
              ...(c.author.github ? { url: `https://github.com/${c.author.github}` } : {}),
            },
            dateCreated: c.createdAt,
            ...freeWork(c.license),
          },
        ]}
      />
      <nav className="text-sm text-muted-foreground">
        <Link href="/components" className="hover:text-foreground">
          Sections
        </Link>{" "}
        /{" "}
        <Link href={`/components/${category}`} className="hover:text-foreground">
          {cat.name}
        </Link>
      </nav>
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">{c.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{c.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {c.license === license.id ? (
            <span className="rounded-full bg-muted px-3 py-1">Free for commercial use</span>
          ) : (
            <span
              className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary"
              title={`Contributed under the ${c.license} licence`}
            >
              {c.license} licence
            </span>
          )}
          <a href={source} className="rounded-full bg-muted px-3 py-1 hover:text-primary">
            by {c.author.github ? `@${c.author.github}` : c.author.name}
          </a>
        </div>
      </div>

      <div className="mt-8">
        <ComponentDetail
          slug={c.slug}
          name={c.name}
          code={c.code}
          dependencies={Object.keys(c.dependencies)}
          previewSrc={`/preview/${c.slug}`}
          themeOptions={themeOptions}
          defaultTheme={c.theme ?? defaultTheme}
        />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Found a bug or have a better idea?{" "}
        <a href={source} className="font-semibold text-foreground hover:highlight">
          Improve this section on GitHub →
        </a>
      </p>

      {collection && (
        <section className="mt-16 rounded-2xl border border-border bg-muted/50 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Collection</p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Part of {collection.name.split(" — ")[0]}: {collection.sections.length} matching sections
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Same theme, same voice. Use them together for a complete page, or grab the whole thing in one prompt.
              </p>
            </div>
            <Link
              href={`/templates/${collection.slug}`}
              className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              View full page →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((r) => (
              <ComponentCard key={r.slug} c={r} theme={defaultTheme} />
            ))}
          </div>
        </section>
      )}

      {!collection && related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">More {cat.name.toLowerCase()}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ComponentCard key={r.slug} c={r} theme={defaultTheme} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
