import type { ReactNode } from "react";
import { legal } from "@/lib/config";

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Shared layout for the terms, privacy and cookie pages: readable measure, plain headings, last-updated date. */
export default function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Last updated {fmt(legal.updated)}</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-10 leading-relaxed [&_a]:underline [&_a]:decoration-accent [&_a]:decoration-2 [&_a]:underline-offset-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
