"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, CalendarDays } from "lucide-react";

const left = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Events", href: "#events" },
];
const right = [
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#visit" },
];

export default function SplitLogoNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-border bg-background font-sans text-foreground">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <nav className="hidden gap-8 text-sm font-medium tracking-[0.16em] uppercase md:flex">
          {left.map((l) => (
            <a key={l.label} href={l.href} className="relative text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="justify-self-start md:hidden">
          <Menu className="size-6" />
        </button>

        <a href="#" className="text-center">
          <span className="block font-display text-3xl leading-none font-bold tracking-tight">Maison Olive</span>
          <span className="mt-1 block text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Kitchen · Wine · Est. 2014</span>
        </a>

        <div className="flex items-center justify-end gap-8">
          <nav className="hidden gap-8 text-sm font-medium tracking-[0.16em] uppercase md:flex">
            {right.map((l) => (
              <a key={l.label} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#reserve"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 lg:inline-flex"
          >
            <CalendarDays className="size-4" /> Reserve
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background px-6 py-6 md:hidden"
          >
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="self-end">
              <X className="size-7" />
            </button>
            <nav className="mt-10 flex flex-col gap-6">
              {[...left, ...right].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-4xl font-semibold"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a href="#reserve" className="mt-auto rounded-md bg-primary py-4 text-center font-semibold text-primary-foreground">
              Reserve a table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
