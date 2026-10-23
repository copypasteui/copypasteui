import Link from "next/link";
import { Rss } from "lucide-react";
import Thumb from "@/components/Thumb";
import { changelog } from "@/lib/changelog";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/changelog"),
  title: "Release notes",
  description: "What's new in CopyPasteUI: templates, sections, themes and tools for your editor, newest first. Subscribe with RSS.",
};

// Thumbnails per entry, then names, then a count.
const SHOWN = 8;
const LISTED = 30;
const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ChangelogPage() {
  const entries = changelog();
  const dates = [...new Set(entries.map((e) => e.date))];

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground pb-6">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Release notes</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">New templates, sections, themes and tools for your editor, newest first.</p>
        </div>
        <a
          href="/feed.xml"
          className="inline-flex items-center gap-2 rounded-md border border-foreground px-3 py-1.5 text-sm font-semibold shadow-[0_2px_0_var(--foreground)] transition hover:bg-accent hover:text-accent-foreground"
        >
          <Rss className="size-4" /> RSS feed
        </a>
      </div>

      {dates.map((date) => (
        <section key={date} className="grid gap-6 border-b border-border py-10 md:grid-cols-[11rem_1fr]">
          <h2 className="font-mono text-sm text-muted-foreground md:sticky md:top-24 md:self-start">
            <time dateTime={date}>{fmt(date)}</time>
          </h2>
          <div className="space-y-12">
            {entries
              .filter((e) => e.date === date)
              .map((e) => (
                <article key={e.id} id={e.id} className="scroll-mt-24">
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    <a href={`#${e.id}`} className="hover:highlight">
                      {e.title}
                    </a>
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{e.body}</p>
                  {e.links.length > 0 && (
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {e.links.map((l) => (
                        <a key={l.href} href={l.href} className="font-semibold hover:highlight">
                          {l.label} →
                        </a>
                      ))}
                    </p>
                  )}
                  {e.items.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {e.items.slice(0, SHOWN).map((it) => (
                        <Link key={`${it.kind}-${it.slug}`} href={it.href} className="group block min-w-0">
                          <span className="relative block aspect-[16/10] overflow-hidden rounded border border-border bg-muted">
                            <Thumb
                              src={it.image}
                              video={it.video}
                              previewSrc={it.kind === "template" ? `/preview/template/${it.slug}` : `/preview/${it.slug}`}
                              alt={`${it.name} preview`}
                            />
                          </span>
                          <span className="mt-1.5 block truncate text-sm">{it.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {e.items.length > SHOWN && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      and {e.items.length - SHOWN} more:{" "}
                      {e.items.slice(SHOWN, SHOWN + LISTED).map((it, i) => (
                        <span key={it.slug}>
                          {i > 0 && ", "}
                          <Link href={it.href} className="text-foreground hover:highlight">
                            {it.name}
                          </Link>
                        </span>
                      ))}
                      {e.items.length > SHOWN + LISTED && ` and ${e.items.length - SHOWN - LISTED} others`}.
                    </p>
                  )}
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
