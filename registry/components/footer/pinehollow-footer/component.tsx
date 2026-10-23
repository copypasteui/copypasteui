"use client";

import { motion } from "motion/react";
import { Car, MapPin, Phone, Train, Trees } from "lucide-react";

export default function PinehollowFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary font-sans text-primary-foreground">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-24 w-full opacity-15" aria-hidden>
        {Array.from({ length: 36 }).map((_, i) => {
          const x = i * 41 + (i % 3) * 7;
          const h = 70 + ((i * 37) % 80);
          return <path key={i} d={`M${x} ${160 - h} L${x - 18} 160 L${x + 18} 160 Z`} className="fill-current" />;
        })}
      </svg>
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <motion.a href="#" whileHover={{ x: 4 }} className="inline-flex items-center gap-2 font-display text-4xl font-bold">
              <Trees className="size-9" /> Pinehollow
            </motion.a>
            <p className="mt-4 max-w-sm opacity-90">
              Five cabins on forty acres near Coniston, Cumbria. Family-run since 1974 by the Atkinsons, now the third generation.
            </p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold">Getting here</p>
            <ul className="mt-4 space-y-3 text-sm opacity-90">
              <li className="flex gap-2">
                <MapPin className="size-4 shrink-0" /> Hollow Lane, Coniston LA21 8AA
              </li>
              <li className="flex gap-2">
                <Train className="size-4 shrink-0" /> Free pickup from Windermere station
              </li>
              <li className="flex gap-2">
                <Car className="size-4 shrink-0" /> EV charger at the farmhouse
              </li>
              <li className="flex gap-2">
                <Phone className="size-4 shrink-0" /> 015394 00000 (9–5)
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xl font-semibold">Plan your stay</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {["Cabins", "Availability", "Gift vouchers", "Dogs", "Accessibility", "FAQs", "House rules", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="opacity-90 hover:underline hover:opacity-100">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-primary-foreground/20 pt-6 text-xs opacity-90">
          <p>
            © 2026 Pinehollow Cabins Ltd · Gold award, Green Tourism{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <p>Book direct and pay no fees.</p>
        </div>
      </div>
    </footer>
  );
}
