"use client";

import { motion } from "motion/react";
import { AtSign, Scissors } from "lucide-react";

export default function FlintmoorFooter() {
  return (
    <footer className="overflow-hidden bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(3rem,10vw,8rem)] leading-none uppercase"
          >
            Flintmoor
          </motion.p>
          <motion.span
            animate={{ rotate: [0, -20, 0, -20, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5 }}
            className="grid size-20 place-items-center rounded-full border-2 border-primary-foreground"
          >
            <Scissors className="size-9" />
          </motion.span>
        </div>
        <div className="mt-10 grid gap-8 border-t border-primary-foreground/25 pt-8 text-sm sm:grid-cols-3">
          <p>
            54 Oldham Street
            <br />
            Northern Quarter, Manchester
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-semibold tracking-wider uppercase">
            {["Prices", "Barbers", "Book", "Gift vouchers", "Jobs"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href="#" className="inline-flex items-center gap-2 sm:justify-self-end">
            <AtSign className="size-4" /> flintmoor.barbers
          </a>
        </div>
        <p className="mt-10 text-xs opacity-90">
          © 2026 Flintmoor Barbers · Est. 1998{" "}
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
