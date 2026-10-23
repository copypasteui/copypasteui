"use client";

import { motion } from "motion/react";
import { AtSign, Mail, Phone, SprayCan } from "lucide-react";

const bubbles = [
  { s: 60, x: "8%", d: 0 },
  { s: 28, x: "22%", d: 1.5 },
  { s: 44, x: "68%", d: 0.8 },
  { s: 20, x: "84%", d: 2.2 },
  { s: 36, x: "48%", d: 3 },
];

export default function SpruceFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary font-sans text-secondary-foreground">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute bottom-0 rounded-full border-2 border-primary/25 bg-card/40"
          style={{ width: b.s, height: b.s, left: b.x }}
          animate={{ y: [40, -360], opacity: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: b.d, ease: "easeOut" }}
        />
      ))}
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-4xl font-semibold text-primary">
              <SprayCan className="size-8" /> spruce
            </p>
            <p className="mt-4 max-w-xs text-muted-foreground">Home and office cleaning across Greater Manchester since 2017.</p>
          </div>
          <ul className="space-y-2 text-sm">
            {["Regular cleaning", "Deep cleaning", "End of tenancy", "Office cleaning", "Become a cleaner"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone className="size-4 text-primary" /> 0161 000 0000
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 text-primary" /> hello@spruce.example
            </li>
            <li className="flex gap-2">
              <AtSign className="size-4 text-primary" /> sprucecleans
            </li>
          </ul>
        </div>
        <p className="mt-16 text-xs text-muted-foreground">
          © 2026 Spruce Cleaning Co. Ltd · Insured · Real Living Wage employer{" "}
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
