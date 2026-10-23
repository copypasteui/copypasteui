"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

const cols = [
  { title: "Get help", links: ["Food pantry", "Warm hubs", "Youth club", "Befriending", "Advice"] },
  { title: "Get involved", links: ["Donate", "Volunteer", "Fundraise", "Corporate partners", "Leave a gift"] },
  { title: "About", links: ["Our story", "Annual report", "Trustees", "Jobs", "Contact"] },
];

export default function CommonGroundFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.p
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl font-display text-4xl leading-tight font-extrabold md:text-5xl"
        >
          Together, we’re a neighbourhood. <span className="opacity-70">Thank you for being part of it.</span>
        </motion.p>
        <div className="mt-14 grid gap-10 border-t border-primary-foreground/20 pt-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-extrabold">
              <Heart className="size-6 fill-current" /> Common Ground
            </p>
            <p className="mt-3 max-w-xs text-sm opacity-90">The Old Library, 2 Mare Street, London E8 · 020 0000 0000</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-bold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
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
          Common Ground Hackney is a registered charity (no. 0000000) and a company limited by guarantee (00000000). © 2026.{" "}
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
