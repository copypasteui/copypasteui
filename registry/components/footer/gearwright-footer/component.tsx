"use client";

import { motion } from "motion/react";
import { Wrench } from "lucide-react";

export default function GearwrightFooter() {
  return (
    <footer className="overflow-hidden bg-foreground font-sans text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-4xl font-extrabold uppercase italic">
              <span className="grid size-10 -skew-x-12 place-items-center bg-primary text-primary-foreground">
                <Wrench className="size-5 skew-x-12" />
              </span>{" "}
              Gearwright
            </p>
            <p className="mt-4 max-w-xs text-sm opacity-70">
              Independent garage in Leeds since 2006. Approved MOT test centre. Every make, every model.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {["MOT", "Servicing", "Repairs & diagnostics", "Tyres & tracking", "Air-con regas", "Fleet accounts"].map((l) => (
              <li key={l}>
                <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm opacity-90">
            <li>0113 000 0000</li>
            <li>hello@gearwright.example</li>
            <li>Unit 3, Canal Works, Leeds</li>
          </ul>
        </div>
      </div>
      <div className="relative h-20 border-t border-background/15">
        <motion.div
          initial={{ x: "-20%" }}
          whileInView={{ x: "110%" }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
          aria-hidden
          className="absolute top-1/2 h-1 w-1/3 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
        <p className="absolute inset-0 grid place-items-center text-xs opacity-90">
          © 2026 Gearwright Motors Ltd · Prices include VAT{" "}
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
