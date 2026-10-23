"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DAYS = ["Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type Day = (typeof DAYS)[number];

const EVERYDAY = [
  { name: "Country loaf", price: "£4.80", out: "7am" },
  { name: "Seeded rye tin", price: "£5.20", out: "7am" },
  { name: "Baguette", price: "£2.40", out: "7am and 11am" },
];
const SPECIALS: Record<Day, { name: string; price: string; out: string }[]> = {
  Tue: [{ name: "Spelt and honey", price: "£5.00", out: "7am" }],
  Wed: [
    { name: "Olive and rosemary fougasse", price: "£3.80", out: "9am" },
    { name: "Morning buns", price: "£3.00", out: "7am" },
  ],
  Thu: [{ name: "Porridge loaf", price: "£5.20", out: "7am" }],
  Fri: [
    { name: "Focaccia by the slab", price: "£3.50", out: "11am" },
    { name: "Custard tarts", price: "£2.60", out: "9am" },
  ],
  Sat: [
    { name: "Cinnamon buns", price: "£3.20", out: "7am, usually gone by 9" },
    { name: "Fruit and walnut", price: "£5.40", out: "7am" },
    { name: "Croissants", price: "£2.80", out: "7am" },
  ],
};

export default function LarderLaneBakes() {
  const reduce = useReducedMotion();
  const [day, setDay] = useState<Day>("Sat");

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none">What&rsquo;s baking</h2>
        <div role="group" aria-label="Choose a day" className="mt-8 flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={day === d}
              onClick={() => setDay(d)}
              className={`rounded-full px-5 py-2.5 font-semibold ${day === d ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-foreground bg-card p-8 text-card-foreground">
            <h3 className="font-display text-2xl">Every day</h3>
            <ul className="mt-5 divide-y divide-border">
              {EVERYDAY.map((b) => (
                <li key={b.name} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="block font-semibold">{b.name}</span>
                    <span className="text-sm text-muted-foreground">Out at {b.out}</span>
                  </span>
                  <span className="font-semibold">{b.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius)] border border-foreground bg-accent p-8 text-accent-foreground">
            <h3 className="font-display text-2xl">{day} specials</h3>
            <ul className="mt-5 space-y-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {SPECIALS[day].map((b, i) => (
                  <motion.li
                    key={`${day}-${b.name}`}
                    initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 380, damping: 16, delay: i * 0.06 }}
                    className="flex justify-between gap-4 rounded-[var(--radius)] bg-background px-5 py-4 text-foreground"
                  >
                    <span>
                      <span className="block font-semibold">{b.name}</span>
                      <span className="text-sm text-muted-foreground">Out at {b.out}</span>
                    </span>
                    <span className="font-semibold">{b.price}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
