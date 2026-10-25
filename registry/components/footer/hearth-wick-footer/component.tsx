"use client";

import { Flame } from "lucide-react";

export default function HearthWickFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl">
              <Flame className="size-6" aria-hidden /> Hearth &amp; Wick
            </p>
            <p className="mt-4 text-sm">
              Workshop and shop at 3 Market Street, Hebden Bridge HX7 6AA. Open Thursday to Sunday, 10am to 5pm.
            </p>
            <p className="mt-2 text-sm">01632 960 417</p>
          </div>
          <nav aria-label="Shop">
            <p className="font-semibold">Shop</p>
            <ul className="mt-3 space-y-2 text-sm">
              {["Candles", "Refills", "Gift sets", "Workshops"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Help">
            <p className="font-semibold">Help</p>
            <ul className="mt-3 space-y-2 text-sm">
              {["Delivery", "Returns", "Candle care", "Wholesale"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-border pt-6 text-xs">
          © 2026 Hearth &amp; Wick{" "}
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
