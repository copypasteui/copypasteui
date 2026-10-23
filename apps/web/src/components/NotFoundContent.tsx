import Link from "next/link";
import NotFoundSuggestions from "@/components/NotFoundSuggestions";
import Thumb from "@/components/Thumb";
import { getTemplate, type TemplateItem } from "@/lib/registry";

const popular = ["olea-restaurant", "verelle-salon", "fixwell-trades", "mossbrook-vets"]
  .map((s) => getTemplate(s))
  .filter((t): t is TemplateItem => !!t);

/** The 404 body. Wrapped in the site chrome by app/not-found.tsx; inside the site layout already for app/(site)/not-found.tsx. */
export default function NotFoundContent() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p aria-hidden className="flex gap-2 text-2xl">
        <kbd className="keycap">⌘</kbd>
        <kbd className="keycap bg-accent text-accent-foreground">Z</kbd>
      </p>
      <p className="mt-6 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">404 · page not found</p>
      <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Undo doesn&apos;t work here, but <span className="highlight">search does</span>.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        This page doesn&apos;t exist. The link may be old, or a section may have been renamed. Everything is still free and one search away.
      </p>

      <NotFoundSuggestions />

      <section className="mt-16 border-t border-foreground pt-10">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">Popular templates</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => (
            <Link key={t.slug} href={`/templates/${t.slug}`} className="group block min-w-0">
              <span className="relative block aspect-[16/10] overflow-hidden rounded border border-border bg-muted">
                <Thumb
                  src={t.thumbnailUrl}
                  video={t.previewVideoUrl}
                  previewSrc={`/preview/template/${t.slug}`}
                  alt={`${t.name} preview`}
                />
              </span>
              <span className="mt-2 block truncate font-semibold">{t.name.split(" — ")[0]}</span>
              <span className="block truncate text-sm text-muted-foreground">{t.name.split(" — ")[1]}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
