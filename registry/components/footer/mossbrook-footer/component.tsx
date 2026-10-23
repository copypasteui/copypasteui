"use client";

import { motion } from "motion/react";
import { PawPrint, Phone } from "lucide-react";

export default function MossbrookFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary font-sans text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-wrap gap-16 p-10 opacity-[0.06]">
        {Array.from({ length: 24 }).map((_, i) => (
          <PawPrint key={i} className="size-12" style={{ transform: `rotate(${((i * 37) % 60) - 30}deg)` }} />
        ))}
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-3xl font-extrabold">
              <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                <PawPrint className="size-5" />
              </span>{" "}
              Mossbrook
            </p>
            <p className="mt-4 max-w-sm opacity-90">
              Independent vets and groomers in Kirkstall since 2004. Accredited small-animal practice. Every pet treated like our own.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              href="tel:+441130000000"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
            >
              <Phone className="size-4" /> 24/7 emergency line
            </motion.a>
          </div>
          <ul className="space-y-2">
            {["Vet care", "Grooming", "Health plans", "Puppy & kitten", "Pet insurance"].map((l) => (
              <li key={l}>
                <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {["Our team", "Careers", "Fees", "Complaints", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-14 text-sm opacity-90">
          © 2026 Mossbrook Veterinary Ltd · Good boys and girls only (all of them).{" "}
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
