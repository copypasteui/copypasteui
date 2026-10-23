"use client";

import { motion } from "motion/react";
import { AtSign, Gift, Phone } from "lucide-react";

export default function VerelleFooter() {
  return (
    <footer className="overflow-hidden bg-secondary font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">Visit</p>
            <p className="mt-4">
              12 Princess Victoria St
              <br />
              Clifton, Bristol BS8 4BX
            </p>
            <p className="mt-4 flex items-center gap-2">
              <Phone className="size-4" /> 0117 000 0000
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {["Services", "Stylists", "Our work", "Bridal", "Shop products", "Careers", "Academy", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-between rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground"
            >
              Buy a gift card <Gift className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-between rounded-full border border-foreground/30 px-6 py-4 font-semibold"
            >
              @maisonverelle <AtSign className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <motion.p
        initial={{ y: "40%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="mt-16 text-center font-display text-[13vw] leading-[0.8] whitespace-nowrap"
      >
        Maison Verelle
      </motion.p>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground">
          © 2026 Maison Verelle Ltd · Cruelty-free colour, always{" "}
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
