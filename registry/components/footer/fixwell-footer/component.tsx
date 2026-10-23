"use client";

import { motion } from "motion/react";
import { Phone, Wrench } from "lucide-react";

const areas = [
  "Islington",
  "Highbury",
  "Camden",
  "Hackney",
  "Stoke Newington",
  "Finsbury Park",
  "Holloway",
  "Tufnell Park",
  "Kentish Town",
  "Crouch End",
];

export default function FixwellFooter() {
  return (
    <footer className="bg-foreground font-sans text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.a
          href="tel:+442000000000"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group flex flex-wrap items-center justify-between gap-6 rounded-[calc(var(--radius)*1.5)] bg-accent p-8 text-accent-foreground"
        >
          <span className="font-display text-3xl font-extrabold md:text-5xl">24/7 emergency line</span>
          <span className="inline-flex items-center gap-3 font-display text-3xl font-extrabold md:text-5xl">
            <motion.span animate={{ rotate: [0, -15, 15, -15, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>
              <Phone className="size-8" />
            </motion.span>{" "}
            020 0000 0000
          </span>
        </motion.a>
        <div className="mt-14 grid gap-10 md:grid-cols-[1.3fr_2fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-extrabold">
              <span className="grid size-9 place-items-center rounded-[var(--radius)] bg-background text-foreground">
                <Wrench className="size-4" />
              </span>{" "}
              Fixwell
            </p>
            <p className="mt-4 text-sm opacity-70">
              Plumbing, electrical &amp; heating. Fully insured, DBS-checked engineers. 12-month guarantee on all work.
            </p>
          </div>
          <div>
            <p className="font-semibold">Areas we cover</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {areas.map((a) => (
                <li key={a} className="rounded-full border border-background/20 px-3 py-1 opacity-90">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-2 text-sm opacity-90">
            {["Prices", "Reviews", "Landlords", "Careers", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 border-t border-background/15 pt-6 text-xs opacity-90">
          © 2026 Fixwell Home Services Ltd{" "}
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
