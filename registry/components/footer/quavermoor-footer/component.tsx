"use client";

import { motion } from "motion/react";
import { Music } from "lucide-react";

export default function QuavermoorFooter() {
  return (
    <footer className="bg-background font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <svg viewBox="0 0 1200 60" className="h-10 w-full text-border" aria-hidden preserveAspectRatio="none">
          {[10, 20, 30, 40, 50].map((y) => (
            <line key={y} x1="0" x2="1200" y1={y} y2={y} stroke="currentColor" strokeWidth="1" />
          ))}
          {[120, 260, 380, 540, 700, 860, 1010].map((x, i) => (
            <motion.g
              key={x}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ellipse cx={x} cy={[40, 30, 45, 25, 35, 20, 30][i]} rx="7" ry="5" className="fill-primary" />
              <line
                x1={x + 6}
                x2={x + 6}
                y1={[40, 30, 45, 25, 35, 20, 30][i]}
                y2={[40, 30, 45, 25, 35, 20, 30][i]! - 28}
                className="stroke-primary"
                strokeWidth="2"
              />
            </motion.g>
          ))}
        </svg>
        <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-3xl">
              <Music className="size-7 text-accent" /> Quavermoor
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Music school for all ages. 3 Station Parade, Harrogate HG1 1TS · 01423 000 000
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {["Piano", "Guitar", "Voice", "Strings", "Early years", "Online lessons"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm">
            {["Fees", "Teachers", "Concerts", "Instrument hire", "Safeguarding", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Quavermoor Music School CIC{" "}
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
