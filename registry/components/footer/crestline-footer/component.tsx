"use client";

import { ArrowUpRight } from "lucide-react";

const COLS = [
  { title: "Trips", links: ["Hut to hut, 7 days", "Alta Via 1, 10 days", "Private groups", "2027 dates"] },
  { title: "Before you go", links: ["Fitness guide", "Kit list", "Travel insurance", "FAQs"] },
];

export default function CrestlineFooter() {
  return (
    <footer className="bg-background px-6 pt-16 pb-8 font-sans text-foreground">
      <div className="mx-auto max-w-6xl border-t-4 border-foreground pt-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <address className="not-italic">
            <p className="font-bold">Crestline Guiding</p>
            <p className="mt-2 text-muted-foreground">
              Via Rezia 41
              <br />
              39046 Ortisei, Italy
            </p>
            <p className="mt-2 text-muted-foreground">+39 0471 000 000</p>
          </address>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-bold">{c.title}</p>
              <ul className="mt-2 space-y-1">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="group inline-flex items-center gap-1 hover:text-primary">
                      {l} <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <p className="text-muted-foreground">
            Every trip is a package holiday under the EU Package Travel Directive, so your money is protected if we stop trading. Our guides
            hold IFMGA or UIMLA qualifications.
          </p>
        </div>
        <p aria-hidden className="mt-16 font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.8] font-extrabold tracking-tighter">
          Crestline
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          © 2027 Crestline Guiding SRL. Photos from last season&rsquo;s trips.{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
      </div>
    </footer>
  );
}
