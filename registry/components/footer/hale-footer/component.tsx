"use client";

import { motion } from "motion/react";
import { Scale } from "lucide-react";

const cols = [
  { title: "Individuals", links: ["Family & divorce", "Buying & selling", "Wills & probate", "Employment"] },
  { title: "Business", links: ["Company law", "Commercial property", "Disputes", "HR support"] },
  { title: "Firm", links: ["Our people", "Fees", "Careers", "Complaints", "Privacy"] },
];

export default function HaleFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 font-display text-3xl"
            >
              <Scale className="size-7 text-accent" /> Hale <span className="text-accent italic">&amp;</span> Partners
            </motion.p>
            <p className="mt-4 max-w-xs text-sm opacity-90">14 Queen Square, Bath BA1 2HN · 01225 000 000 · enquiries@hale.example</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs tracking-[0.25em] text-primary-foreground uppercase">{c.title}</p>
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
        <p className="mt-14 border-t border-primary-foreground/15 pt-6 text-xs leading-relaxed opacity-90">
          Hale &amp; Partners LLP is a limited liability partnership registered in England and Wales (OC000000), authorised and regulated by
          the solicitors’ regulator (ID 000000). A list of members is available at our registered office. © 2026.{" "}
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
