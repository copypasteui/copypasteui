"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const img = (id: string, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const strip = [
  "photo-1785512364392-a3ab5a83b254",
  "photo-1504754524776-8f4f37790ca0",
  "photo-1781455495352-f810d0901497",
  "photo-1662385930165-49ebaa03b152",
  "photo-1679394900352-05fd1ed3ed48",
  "photo-1724618702364-8cde016bda22",
];

export default function SolenneFooter() {
  return (
    <footer className="overflow-hidden bg-primary pt-20 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Letters from the coast</p>
          <p className="mt-2 max-w-xs text-sm opacity-90">
            Four emails a year: new rooms, the menu change, and first look at summer dates.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm items-center border-b border-primary-foreground/40 pb-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-primary-foreground/90 focus:outline-none"
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight className="size-5" />
            </button>
          </form>
        </div>
        {[
          { t: "Stay", l: ["Rooms & suites", "Packages", "Gift cards", "Private hire"] },
          { t: "Explore", l: ["Dining", "Spa", "Boat trips", "Journal"] },
        ].map((c) => (
          <div key={c.t}>
            <p className="text-xs tracking-[0.3em] uppercase opacity-90">{c.t}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="opacity-90 transition hover:opacity-100">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-3 text-sm">
          <p className="text-xs tracking-[0.3em] uppercase opacity-90">Find us</p>
          <p className="flex gap-2 opacity-90">
            <MapPin className="mt-0.5 size-4 shrink-0" /> Via del Faro 12, 84011 Amalfi
          </p>
          <p className="flex gap-2 opacity-90">
            <Phone className="mt-0.5 size-4 shrink-0" /> +39 089 000 1234
          </p>
          <p className="flex gap-2 opacity-90">
            <Mail className="mt-0.5 size-4 shrink-0" /> stay@solenne.example
          </p>
        </div>
      </div>

      <div className="mt-16 flex gap-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-3"
        >
          {[...strip, ...strip].map((p, i) => (
            <img
              key={i}
              src={img(p)}
              alt=""
              loading="lazy"
              className={`h-40 w-60 shrink-0 rounded-[var(--radius)] object-cover ${i % 2 ? "translate-y-6" : ""}`}
            />
          ))}
        </motion.div>
      </div>

      <p className="mt-6 text-center font-display text-[24vw] leading-[0.8] tracking-tight opacity-95 select-none">Solenne</p>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-primary-foreground/20 px-6 py-6 text-xs opacity-90 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Solenne Hotel. All rights reserved.{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <p>Privacy · Terms · Accessibility</p>
      </div>
    </footer>
  );
}
