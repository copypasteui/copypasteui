"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const species = [
  {
    id: "dog",
    label: "Dog",
    sizes: [
      ["Small", 14],
      ["Medium", 17],
      ["Large", 21],
    ] as [string, number][],
  },
  { id: "cat", label: "Cat", sizes: [["Any size", 13]] as [string, number][] },
  { id: "rabbit", label: "Rabbit", sizes: [["Any size", 9]] as [string, number][] },
];
const includes = [
  "Annual vaccinations & health check",
  "Flea, tick & worm treatment",
  "Two nurse clinics a year",
  "Nail clips whenever you like",
  "10% off everything else",
  "Free 24/7 advice line",
];

export default function MossbrookPlans() {
  const [sp, setSp] = useState(0);
  const [size, setSize] = useState(1);
  const s = species[sp]!;
  const [label, price] = s.sizes[Math.min(size, s.sizes.length - 1)]!;
  const saving = Math.round(price * 12 * 0.32);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-semibold text-primary">Mossbrook Health Plan</p>
          <h2 className="mt-3 font-display text-5xl leading-tight font-extrabold tracking-tight">
            All the routine care, one small monthly payment.
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {includes.map((x, i) => (
              <motion.li
                key={x}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-2 text-sm"
              >
                <Check className="size-4 shrink-0 text-accent" /> {x}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius)] bg-primary p-8 text-primary-foreground shadow-2xl">
          <div className="grid grid-cols-3 gap-2">
            {species.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => {
                  setSp(i);
                  setSize(1);
                }}
                aria-pressed={sp === i}
                className={`rounded-full py-3 font-semibold transition ${sp === i ? "bg-primary-foreground text-primary" : "border border-primary-foreground/25 hover:border"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          {s.sizes.length > 1 && (
            <div className="mt-4 flex gap-2">
              {s.sizes.map(([l], i) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setSize(i)}
                  aria-pressed={size === i}
                  className={`flex-1 rounded-full border py-2 text-sm font-semibold transition ${size === i ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/30"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
          <div className="mt-8 flex items-end gap-2">
            <motion.span
              key={price}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring" }}
              className="font-display text-7xl font-extrabold"
            >
              £{price}
            </motion.span>
            <span className="pb-3 opacity-90">/ month · {label.toLowerCase()}</span>
          </div>
          <p className="mt-2 inline-block rounded-full border border-primary-foreground/25 px-3 py-1 text-sm">
            Save around £{saving} a year vs paying as you go
          </p>
          <a href="#book" className="mt-8 block rounded-full bg-accent py-4 text-center font-bold text-accent-foreground">
            Join the plan
          </a>
          <p className="mt-3 text-center text-xs opacity-90">12-month plan · first month free for new patients</p>
        </div>
      </div>
    </section>
  );
}
