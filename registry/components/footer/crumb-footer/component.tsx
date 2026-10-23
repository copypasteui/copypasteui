"use client";

import { motion } from "motion/react";
import { AtSign, Mail, MapPin } from "lucide-react";

const hours = [
  ["Mon", "Closed"],
  ["Tue – Fri", "7:00 – 16:00"],
  ["Sat", "7:00 – 14:00"],
  ["Sun", "8:00 – 13:00"],
];

export default function CrumbFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary font-sans text-secondary-foreground">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-10 w-full fill-primary" aria-hidden>
        <path d="M0 0h1440v20c-60 0-60 30-120 30s-60-30-120-30-60 30-120 30-60-30-120-30-60 30-120 30-60-30-120-30-60 30-120 30-60-30-120-30-60 30-120 30-60-30-120-30-60 30-120 30S60 20 0 20Z" />
      </svg>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <a href="#" className="font-display text-5xl">
            crumb<span className="text-primary">.</span>
          </a>
          <p className="mt-4 max-w-xs text-muted-foreground">A small bakery with a big oven. Baking for Bristol since 2011.</p>
          <div className="mt-6 flex gap-2">
            {[AtSign, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, rotate: -6 }}
                aria-label={i ? "Email" : "Instagram"}
                className="grid size-11 place-items-center rounded-full bg-card text-card-foreground"
              >
                <Icon className="size-5" />
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xl">Opening hours</p>
          <dl className="mt-4 space-y-2 text-sm">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-6 border-b border-border pb-2">
                <dt>{d}</dt>
                <dd className="font-semibold tabular-nums">{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="font-display text-xl">Find us</p>
          <p className="mt-4 flex gap-2 text-sm">
            <MapPin className="size-4 shrink-0" /> 22 Mill Lane, Bristol BS3 4LJ
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Wholesale & cafés", "Baking classes", "Gift vouchers", "Allergen info", "Jobs: we’re hiring bakers"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground">
          © 2026 Crumb Bakery · Made with butter, not apologies.{" "}
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
