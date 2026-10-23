import Link from "next/link";
import Thumb from "@/components/Thumb";
import { components, getTheme, summarize, templates } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/backgrounds"),
  title: "Backgrounds",
  description:
    "Free animated backgrounds: live WebGL, canvas and CSS effects, and free photos brought to life with parallax, light and particles. No video files to host.",
  openGraph: { images: ["/og/components/silk-waves-background.jpg"] },
};

const technique = (tags: string[]) =>
  tags.includes("photo")
    ? "Photo"
    : tags.includes("webgl") || tags.includes("shader")
      ? "WebGL"
      : tags.includes("canvas")
        ? "Canvas"
        : tags.includes("svg")
          ? "SVG"
          : "CSS";

export default function BackgroundsPage() {
  const backgrounds = components
    .filter((c) => c.category === "background")
    .map(summarize)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
  const showcases = templates.filter((t) => t.slug === "aether-ai" || t.slug === "prism-design");

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/components" className="hover:text-foreground">
          Sections
        </Link>{" "}
        / Backgrounds
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Backgrounds</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Animated backgrounds with no video files to host. Some are drawn live in code; others take a free Unsplash photo and bring it to
        life with parallax, light and particles. All of them pick up your theme&rsquo;s colours, react to the cursor where it makes sense
        and hold still for visitors who reduce motion. Wrap any section in one.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {backgrounds.map((c) => (
          <Link
            key={c.slug}
            href={`/components/background/${c.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-foreground/5"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Thumb
                src={`/thumbs/components/${c.slug}.jpg`}
                previewSrc={`/preview/${c.slug}?theme=${c.theme}&frame=thumb`}
                alt={`${c.name} preview`}
              />
              <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                {technique(c.tags)}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className="font-semibold group-hover:text-primary">{c.name.replace(/ Background$/, "")}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {getTheme(c.theme)?.name} theme
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">See them in a full page</h2>
        <p className="mt-1 text-sm text-muted-foreground">Templates built on these backgrounds.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {showcases.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-foreground/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Thumb src={`/thumbs/templates/${t.slug}.jpg`} previewSrc={`/preview/template/${t.slug}`} alt={`${t.name} preview`} />
              </div>
              <p className="p-5 font-semibold group-hover:text-primary">{t.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
