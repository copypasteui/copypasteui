"use client";

import { motion } from "motion/react";
import { AtSign, Beer } from "lucide-react";

const cols = [
  { title: "Drink", links: ["On tap", "Bottle shop", "Growler fills", "Gift cards"] },
  { title: "Visit", links: ["Taproom", "Events", "Brewery tours", "Private hire"] },
  { title: "Brewery", links: ["Our story", "Wholesale", "Careers", "Contact"] },
];

export default function FoxgloveFooter() {
  return (
    <footer className="overflow-hidden bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-4xl leading-none uppercase">Get first dibs on new releases</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-sm border-2 border-primary-foreground">
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-primary-foreground/60"
              />
              <button type="submit" className="bg-primary-foreground px-5 text-sm font-bold text-primary uppercase">
                Sign up
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-display text-2xl uppercase">{c.title}</p>
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
      </div>

      <div className="mt-14 flex items-center justify-center gap-[2vw]">
        <motion.span
          animate={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
          className="grid size-[11vw] shrink-0 place-items-center rounded-full bg-primary-foreground text-primary"
        >
          <Beer className="size-[6vw]" />
        </motion.span>
        <span aria-hidden className="font-display text-[19vw] leading-[0.8] uppercase">
          Foxglove
        </span>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/25 px-6 py-6 text-xs">
        <p>
          © 2026 Foxglove Brewing Co. Please drink responsibly. 18+ only.{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <a href="#" className="inline-flex items-center gap-1.5 font-semibold">
          <AtSign className="size-3.5" /> foxglovebrewing
        </a>
      </div>
    </footer>
  );
}
