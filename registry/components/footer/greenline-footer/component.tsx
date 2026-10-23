"use client";

import { motion } from "motion/react";
import { AtSign, Leaf, Phone } from "lucide-react";

export default function GreenlineFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary font-sans text-primary-foreground">
      <motion.div
        aria-hidden
        initial={{ rotate: -20, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute -top-24 -right-24"
      >
        <Leaf className="size-[28rem]" />
      </motion.div>
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="max-w-3xl font-display text-5xl leading-tight font-bold md:text-6xl">
          The best time to plant was ten years ago. <em className="font-medium text-primary-foreground">The second best is this autumn.</em>
        </p>
        <div className="mt-14 grid gap-10 border-t border-primary-foreground/20 pt-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-bold">
              <Leaf className="size-6" /> Greenline
            </p>
            <p className="mt-3 max-w-xs text-sm opacity-90">
              Garden design, landscaping and maintenance across Surrey since 2008. Fully insured, accredited contractor.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {["Garden design", "Landscaping", "Maintenance", "Tree care", "Our gardens", "Careers"].map((l) => (
              <li key={l}>
                <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone className="size-4" /> 01372 000 000
            </li>
            <li className="flex gap-2">
              <AtSign className="size-4" /> greenlinegardens
            </li>
            <li className="pt-2">
              <a href="#quote" className="inline-block rounded-[var(--radius)] bg-accent px-5 py-3 font-semibold text-accent-foreground">
                Free consultation
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-12 text-xs opacity-90">
          © 2026 Greenline Gardens Ltd · Peat-free since 2015{" "}
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
