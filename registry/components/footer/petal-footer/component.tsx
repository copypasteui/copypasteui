"use client";

import { motion } from "motion/react";
import { AtSign, Flower2 } from "lucide-react";

const petals = Array.from({ length: 10 });

export default function PetalFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary font-sans text-secondary-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {petals.map((_, i) => (
          <motion.span
            key={i}
            className="absolute size-5 rounded-[60%_0_60%_0] bg-primary/25"
            style={{ left: `${(i * 37) % 100}%`, top: -20 }}
            animate={{ y: [0, 520], rotate: [0, 260], opacity: [0, 1, 0] }}
            transition={{ duration: 9 + (i % 4), repeat: Infinity, delay: i * 0.9, ease: "linear" }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-4xl">
              <Flower2 className="size-8 text-primary" /> Petal &amp; Stem
            </p>
            <p className="mt-4 max-w-sm text-muted-foreground">
              An independent florist in Kemp Town, Brighton. Member of the British Florist Association and Flowers from the Farm.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm rounded-full bg-card p-1.5 text-card-foreground">
              <input
                type="email"
                required
                placeholder="Get 10% off your first order"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
              />
              <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Join
              </button>
            </form>
          </div>
          <ul className="space-y-2 text-sm">
            {["Bouquets", "Subscriptions", "Plants", "Weddings & events", "Sympathy flowers", "Workshops"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm">
            {["Delivery info", "Flower care", "FAQs", "Corporate accounts", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © 2026 Petal &amp; Stem Florists{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <a href="#" className="inline-flex items-center gap-1.5">
            <AtSign className="size-3.5" /> petalandstem
          </a>
        </div>
      </div>
    </footer>
  );
}
