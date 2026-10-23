"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const STYLES = ["All", "Pale", "IPA", "Dark", "Sour"] as const;
type Style = (typeof STYLES)[number];

const BEERS: { name: string; style: Exclude<Style, "All">; abv: string; pint: string; half: string; left: number; note: string }[] = [
  {
    name: "Lock Keeper",
    style: "Pale",
    abv: "4.2%",
    pint: "£4.20",
    half: "£2.20",
    left: 80,
    note: "Our everyday pale. Biscuit malt, a little lemon.",
  },
  { name: "Towpath", style: "Pale", abv: "3.8%", pint: "£4.00", half: "£2.10", left: 35, note: "Session pale for long Sundays." },
  { name: "Ballast", style: "IPA", abv: "6.4%", pint: "£5.40", half: "£2.80", left: 60, note: "West Coast, bitter and clear." },
  { name: "Night Tide", style: "IPA", abv: "7.1%", pint: "£5.80", half: "£3.00", left: 15, note: "Hazy double. Last keg of this batch." },
  { name: "Coal Barge", style: "Dark", abv: "5.6%", pint: "£5.00", half: "£2.60", left: 90, note: "Oatmeal stout on the nitro tap." },
  { name: "Rhubarb Gose", style: "Sour", abv: "4.5%", pint: "£5.20", half: "£2.70", left: 50, note: "Salted, sharp, Yorkshire rhubarb." },
];

export default function LockfastBeers() {
  const [style, setStyle] = useState<Style>("All");
  const shown = style === "All" ? BEERS : BEERS.filter((b) => b.style === style);

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none uppercase">On tap this week</h2>
          <div role="group" aria-label="Filter by style" className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={style === s}
                onClick={() => setStyle(s)}
                className={`rounded-[var(--radius)] border border-foreground px-4 py-2 font-semibold transition ${style === s ? "bg-foreground text-background" : "bg-background text-foreground hover:-translate-y-0.5"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((b) => (
              <motion.li
                key={b.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ rotate: -1.5, y: -4 }}
                className="flex flex-col rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase">{b.name}</h3>
                  <span className="shrink-0 bg-accent px-2 py-1 text-sm font-bold text-accent-foreground">{b.abv}</span>
                </div>
                <p className="mt-1 text-sm font-semibold tracking-wider uppercase">{b.style}</p>
                <p className="mt-4 flex-1 text-muted-foreground">{b.note}</p>
                <div className="mt-6 flex items-center justify-between font-semibold">
                  <span>Pint {b.pint}</span>
                  <span>Half {b.half}</span>
                </div>
                <div className="mt-3 h-3 border border-foreground" role="img" aria-label={`About ${b.left}% of the keg left`}>
                  <div className="h-full bg-primary" style={{ width: `${b.left}%` }} />
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
