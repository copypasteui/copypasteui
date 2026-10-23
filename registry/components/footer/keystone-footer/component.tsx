"use client";

import { motion } from "motion/react";

const cols = [
  { title: "Property", links: ["Buy", "Rent", "New homes", "Commercial"] },
  { title: "Services", links: ["Sell", "Let & manage", "Free valuation", "Mortgages"] },
  { title: "Keystone", links: ["About us", "Our team", "Careers", "Complaints", "Fees"] },
];

export default function KeystoneFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-primary-foreground/15 pb-12">
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-6xl md:text-8xl"
          >
            Keystone
          </motion.p>
          <a
            href="#valuation"
            className="bg-accent px-6 py-3.5 text-xs font-bold tracking-[0.2em] text-accent-foreground uppercase"
            style={{ borderRadius: "var(--radius)" }}
          >
            Book a free valuation
          </a>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <p className="max-w-xs text-sm opacity-90">
            Independent estate and letting agents in Cheltenham since 1994. Member of a government-approved property redress scheme and
            client money protection scheme.
          </p>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase">{c.title}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-12 text-xs opacity-90">
          © 2026 Keystone Property Ltd{" "}
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
