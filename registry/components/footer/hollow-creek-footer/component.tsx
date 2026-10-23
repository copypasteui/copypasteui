"use client";

import { motion } from "motion/react";
import { AtSign, Mail, Tractor } from "lucide-react";

export default function HollowCreekFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary font-sans text-secondary-foreground">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full" aria-hidden>
        <path d="M0 0h1440v40C1200 120 960 10 720 60S240 110 0 50Z" className="fill-primary" />
        <path d="M0 50c240 60 480 10 720 10s480 60 720-20v80H0Z" className="fill-secondary" />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 font-display text-3xl font-bold">
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"
              >
                <Tractor className="size-6" />
              </motion.span>
              Hollow Creek Farm
            </p>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Family farming in the Wye Valley since 1952. LEAF Marque certified · Pasture for Life member.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {["Veg boxes", "Farm shop", "Butchery", "Pick your own", "Events", "Barn café"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <p className="font-display text-lg font-bold">The farm diary</p>
            <p className="mt-1 text-sm text-muted-foreground">What’s growing, what’s calving, what’s on. Monthly.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-[var(--radius)] border-2 border-foreground"
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              />
              <button type="submit" className="bg-foreground px-4 text-sm font-semibold text-background">
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © 2026 Hollow Creek Farm Partnership{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="inline-flex items-center gap-1.5">
              <AtSign className="size-3.5" /> hollowcreekfarm
            </a>
            <a href="#" className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" /> hello@hollowcreek.example
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
