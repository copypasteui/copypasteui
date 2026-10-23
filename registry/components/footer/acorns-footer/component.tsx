"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

const leaves = ["🍂", "🌰", "🍃", "🌳", "🍂", "🌱"];

export default function AcornsFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary font-sans text-primary-foreground">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-12 w-full fill-secondary" aria-hidden>
        <path d="M0 0h1440v30c-120 40-240 40-360 10S840 0 720 30s-240 40-360 10S120 0 0 30Z" />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
        <div className="flex gap-4 text-3xl" aria-hidden>
          {leaves.map((l, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0], rotate: [0, i % 2 ? 12 : -12, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl font-extrabold">Little Acorns</p>
            <p className="mt-2 max-w-sm opacity-90">
              Day nursery &amp; forest school, Kendal. Rated Outstanding. Registered childcare provider no. 000000.
            </p>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <MapPin className="size-5 shrink-0" /> Oak Lodge, Sedbergh Road, Kendal LA9 6AA
            </li>
            <li className="flex gap-2">
              <Phone className="size-5 shrink-0" /> 01539 000 000
            </li>
            <li className="flex gap-2">
              <Mail className="size-5 shrink-0" /> hello@littleacorns.example
            </li>
          </ul>
          <ul className="space-y-2 font-semibold">
            {["Our day", "Rooms", "Fees & funding", "Parent app", "Jobs (we’re hiring!)"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-sm opacity-90">
          © 2026 Little Acorns Nursery Ltd · Safeguarding policy · Privacy{" "}
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
