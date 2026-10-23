"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";

const cols = [
  { title: "Treatments", links: ["Check-ups", "Hygiene", "Whitening", "Clear aligners", "Emergency"] },
  { title: "Patients", links: ["New patients", "Care plans", "Fees", "Finance", "Nervous patients"] },
  { title: "Practice", links: ["Our team", "Careers", "Complaints policy", "Privacy", "Contact"] },
];

export default function BrightlineFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-6 rounded-[calc(var(--radius)*1.5)] bg-card p-8 text-card-foreground"
        >
          <p className="font-display text-3xl font-black tracking-tight">Ready for a smile you don’t hide?</p>
          <div className="flex flex-wrap gap-3">
            <a href="#book" className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground">
              Book online
            </a>
            <a
              href="tel:+441130000000"
              className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3.5 font-semibold"
            >
              <Phone className="size-4" /> 0113 000 0000
            </a>
          </div>
        </motion.div>
        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-black">
              <span className="grid size-9 place-items-center rounded-[calc(var(--radius)*0.6)] bg-accent text-accent-foreground">✦</span>{" "}
              Brightline
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Brightline Dental Care, Headingley. Registered with the Care Quality Commission. Rated “Good” in all areas.
            </p>
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
          © 2026 Brightline Dental Care Ltd{" "}
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
