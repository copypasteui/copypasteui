"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Leaf } from "lucide-react";

type Flavour = { name: string; note: string; colour: string; vegan?: boolean; nuts?: boolean };
// Swatch colours are the gelato's own colour, so they stay the same in every theme.
const flavours: Flavour[] = [
  { name: "Bronte pistachio", note: "Sicilian nuts, a pinch of salt", colour: "rgb(163 190 110)", nuts: true },
  { name: "Fior di latte", note: "Just Bradfield milk and cream", colour: "rgb(248 244 232)" },
  { name: "Blood orange sorbet", note: "Tarocco oranges, nothing else", colour: "rgb(232 96 64)", vegan: true },
  { name: "Brown butter pecan", note: "Toasted in house", colour: "rgb(196 150 98)", nuts: true },
  { name: "Raspberry ripple", note: "Yorkshire raspberries swirled through", colour: "rgb(232 120 160)" },
  { name: "Dark chocolate sorbet", note: "70% Colombian, made with water", colour: "rgb(84 52 40)", vegan: true },
  { name: "Mango and lime", note: "Alphonso purée", colour: "rgb(250 190 70)", vegan: true },
  { name: "Hockley honeycomb", note: "Our own honeycomb in vanilla", colour: "rgb(240 200 110)" },
];
const filters = ["Everything", "Vegan", "Nut-free"] as const;

export default function FizzwhipFlavours() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Everything");
  const shown = flavours.filter((f) => (filter === "Vegan" ? f.vegan : filter === "Nut-free" ? !f.nuts : true));
  return (
    <section id="flavours" className="bg-secondary px-6 py-20 font-sans text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl">On the counter today</h2>
          <div role="group" aria-label="Filter flavours" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2.5 font-semibold ${filter === f ? "bg-foreground text-background" : "border border-foreground hover:bg-background"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((f) => (
              <motion.li
                key={f.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-[var(--radius)] border border-foreground bg-card p-5 text-card-foreground"
              >
                <span aria-hidden className="block size-14 rounded-full border-2 border-foreground" style={{ background: f.colour }} />
                <h3 className="mt-4 text-lg font-semibold">{f.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
                {f.vegan && (
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    <Leaf className="size-3.5" aria-hidden /> Vegan
                  </p>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-8 text-sm">The board changes daily. Ask for a taster of anything before you choose.</p>
      </div>
    </section>
  );
}
