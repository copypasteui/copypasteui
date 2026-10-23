"use client";

import { motion } from "motion/react";
import { AtSign, Clock, MapPin } from "lucide-react";

const cols = [
  { title: "Wines", links: ["Sparkling", "Still", "Mixed cases", "Gift vouchers", "Trade"] },
  { title: "Visit", links: ["Tastings", "Vineyard tours", "Weddings", "Events", "Getting here"] },
];

export default function HollinmereFooter() {
  return (
    <footer className="bg-background font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <motion.p
              initial={{ clipPath: "inset(0% 0% 99.5% 0%)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true }}
              className="font-display text-5xl"
            >
              Hollinmere <em>Estate</em>
            </motion.p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A family vineyard on the South Downs. Certified Sustainable Wines of Great Britain.
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">{c.title}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-primary">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="space-y-3 text-sm">
            <p className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-primary" /> Hollinmere Lane, Ditchling BN6 8XX
            </p>
            <p className="flex gap-2">
              <Clock className="size-4 shrink-0 text-primary" /> Cellar door Thu–Sun, 11–5
            </p>
            <p className="flex gap-2">
              <AtSign className="size-4 shrink-0 text-primary" /> hollinmereestate
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © 2026 Hollinmere Estate Vineyards Ltd · You must be 18 or over to buy wine.{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <p>Please enjoy responsibly · drinkaware.co.uk</p>
        </div>
      </div>
    </footer>
  );
}
