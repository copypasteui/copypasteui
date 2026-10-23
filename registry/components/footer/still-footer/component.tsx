"use client";

import { motion } from "motion/react";

export default function StillFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto size-16 rounded-full border border-primary-foreground/40"
        />
        <p className="mt-8 font-display text-5xl tracking-[0.4em]">STILL</p>
        <p className="mx-auto mt-4 max-w-md text-sm opacity-90">
          A day spa in a restored Georgian bathhouse in the centre of Bath. Adults only, 16+.
        </p>
        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {["Treatments", "Thermal suite", "Memberships", "Gift vouchers", "Spa etiquette", "Careers", "Contact"].map((l) => (
            <a key={l} href="#" className="opacity-90 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-10 flex max-w-sm border-b border-primary-foreground/40">
          <input
            type="email"
            required
            placeholder="Quiet emails, rarely"
            aria-label="Email"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-primary-foreground/60"
          />
          <button type="submit" className="text-sm font-semibold">
            Subscribe
          </button>
        </form>
        <p className="mt-12 text-xs opacity-90">
          © 2026 Still Spa Ltd · 3 Pump Lane, Bath · 01225 000 000{" "}
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
