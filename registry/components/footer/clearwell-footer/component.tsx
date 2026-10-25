"use client";

import { Eye } from "lucide-react";

const cols = [
  { title: "Eye care", links: ["Eye tests", "Children", "Contact lenses", "Dry eye clinic", "NHS eligibility"] },
  { title: "Frames", links: ["Clearwell own", "Ottoline Eyewear", "Penrose Optical", "Sunglasses"] },
  { title: "Practice", links: ["Our team", "Prices", "Home visits", "Contact"] },
];

export default function ClearwellFooter() {
  return (
    <footer className="bg-background font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Eye className="size-5" aria-hidden />
              </span>
              Clearwell Opticians
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">212 Gloucester Road, Bristol BS7 8NU · 0117 496 0318</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-semibold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Clearwell Opticians Ltd · GOC registered practice{" "}
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
