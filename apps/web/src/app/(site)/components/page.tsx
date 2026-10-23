import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ComponentBrowser from "@/components/ComponentBrowser";
import { categories, components, defaultTheme, summarize } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/components"),
  title: "Sections: free website sections for AI builders",
  description:
    "Heroes, menus, price lists, booking forms, reviews and footers for small-business websites. Preview in any theme, copy the AI prompt or install with one command.",
};

const SHOWCASE = ["chrome-blobs-background", "meadow-sky-background", "prism-burst-background"];
const backgroundCount = components.filter((c) => c.category === "background").length;

export default function ComponentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Sections</h1>
      <p className="mt-2 text-muted-foreground">
        The building blocks of every template, free for your own and your clients’ sites. Preview any of them in any theme, then copy the
        prompt or install it.
      </p>
      <Link
        href="/backgrounds"
        className="group mt-8 flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 transition hover:border-foreground hover:shadow-[4px_4px_0_var(--foreground)] sm:flex-row sm:items-center"
      >
        <span className="flex shrink-0 gap-2" aria-hidden>
          {SHOWCASE.map((slug) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={slug} src={`/thumbs/components/${slug}.jpg`} alt="" className="h-16 w-24 rounded-md object-cover" />
          ))}
        </span>
        <span className="flex-1">
          <span className="block font-semibold">Animated backgrounds</span>
          <span className="block text-sm text-muted-foreground">
            {backgroundCount} moving backdrops, from WebGL chrome to photos with drifting mist. Wrap any section in one.
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold">
          See all backgrounds <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
      <div className="mt-10">
        <ComponentBrowser items={components.map(summarize)} categories={categories} theme={defaultTheme} />
      </div>
    </main>
  );
}
