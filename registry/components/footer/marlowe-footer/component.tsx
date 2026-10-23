"use client";

import { motion } from "motion/react";
import { AtSign } from "lucide-react";

const cols = [
  { title: "Shop", links: ["New in", "Women", "Men", "Gift cards", "Sale"] },
  { title: "Help", links: ["Delivery", "Returns", "Alterations", "Size guide", "Contact"] },
  { title: "Marlowe", links: ["Our labels", "Personal styling", "Journal", "Careers"] },
];

export default function MarloweFooter() {
  return (
    <footer className="overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto max-w-[90rem] px-6 pt-20">
        <div className="grid gap-12 border-t border-foreground pt-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-3xl">The Thursday letter</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              New arrivals before they hit the shop floor, and an occasional essay on why your coat should last twenty years.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm border-b border-foreground">
              <input
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
              />
              <button type="submit" className="text-xs font-semibold tracking-[0.2em] uppercase">
                Subscribe
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">{c.title}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="underline-offset-4 hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <motion.p
        initial={{ letterSpacing: "0.5em", opacity: 0 }}
        whileInView={{ letterSpacing: "0.08em", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="mt-16 text-center font-display text-[16vw] leading-none font-bold whitespace-nowrap"
      >
        MARLOWE
      </motion.p>
      <div className="mx-auto flex max-w-[90rem] flex-wrap justify-between gap-3 px-6 py-6 text-xs text-muted-foreground">
        <p>
          © 2026 Marlowe Ltd · 41 Western Road, Hove{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <a href="#" className="inline-flex items-center gap-1.5">
          <AtSign className="size-3.5" /> marlowe.hove
        </a>
      </div>
    </footer>
  );
}
