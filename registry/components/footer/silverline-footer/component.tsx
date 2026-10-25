"use client";

import { Disc3 } from "lucide-react";

export default function SilverlineFooter() {
  return (
    <footer className="bg-background font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-display text-xl uppercase">
              <Disc3 className="size-7 text-primary" aria-hidden /> Silverline
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Unit 4, Pollard Street, Ancoats, Manchester M4 7AN</p>
            <p className="mt-1 text-sm text-muted-foreground">0161 496 0738</p>
          </div>
          <nav aria-label="Skate">
            <p className="font-semibold">Skate</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Sessions", "Prices", "Lessons", "Parties", "Gift cards"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-semibold">Hours</p>
            <p className="mt-3 text-sm text-muted-foreground">Mon to Thu 4pm to 10pm, Fri and Sat 10am to 11pm, Sun 11am to 6pm</p>
          </div>
        </div>
        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Silverline Skate Ltd{" "}
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
