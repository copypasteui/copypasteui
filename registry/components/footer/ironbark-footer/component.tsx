"use client";

import { motion } from "motion/react";
import { HardHat } from "lucide-react";

export default function IronbarkFooter() {
  return (
    <footer className="overflow-hidden bg-background font-sans text-foreground">
      <div aria-hidden className="h-4 w-full bg-[repeating-linear-gradient(-45deg,var(--accent)_0_18px,var(--foreground)_18px_36px)]" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="flex items-center gap-2 font-display text-4xl font-black uppercase">
              <span className="grid size-11 place-items-center bg-accent text-accent-foreground">
                <HardHat className="size-6" />
              </span>{" "}
              Ironbark Build
            </p>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Extensions, lofts and renovations in South London since 2009. Company no. 00000000.
            </p>
          </div>
          <ul className="space-y-2 text-sm font-semibold">
            {["Extensions", "Loft conversions", "Kitchens", "Renovations", "Projects"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm">
            <li>Unit 7, Dulwich Yard, SE21</li>
            <li>020 0000 0000</li>
            <li>build@ironbark.example</li>
            <li className="pt-2">
              <a href="#quote" className="inline-block bg-primary px-4 py-2 font-bold text-primary-foreground">
                Get a quote
              </a>
            </li>
          </ul>
        </div>
        <motion.p
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          aria-hidden
          className="mt-14 font-display text-[17vw] leading-[0.8] font-black tracking-tight uppercase md:text-[15vw]"
        >
          Ironbark
        </motion.p>
        <p className="mt-6 text-xs text-muted-foreground">
          © 2026 Ironbark Build Ltd · Fully insured · 10-year structural guarantee{" "}
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
