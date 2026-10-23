"use client";

import { useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

const WINES = [
  {
    name: "Rosso di Montalcino 2024",
    price: "€22",
    notes: "Sangiovese from the lower vineyard. Cherries, a little leather, drink it now with anything grilled.",
    bottles: "9,000 bottles",
  },
  {
    name: "Brunello di Montalcino 2020",
    price: "€58",
    notes: "Three years in large Slavonian oak. Dried roses and tobacco; keep it until 2035 if you can wait.",
    bottles: "2,400 bottles",
  },
  {
    name: "Bianco del Poggio 2025",
    price: "€18",
    notes: "Vermentino and Malvasia from a half-hectare by the pool. Salty, lemony, cold.",
    bottles: "1,200 bottles",
  },
  {
    name: "Vin Santo 2016",
    price: "€40 / 50cl",
    notes: "Grapes dried on cane mats in the loft for four months. Apricot, walnut, honey.",
    bottles: "600 half bottles",
  },
];

export default function PoggioLentoWines() {
  const reduce = useReducedMotion();
  const [pick, setPick] = useState(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 70%)`;
  const w = WINES[pick]!;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div
        onPointerMove={onMove}
        className="relative mx-auto max-w-6xl overflow-hidden border border-border bg-card p-8 text-card-foreground md:p-14"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="relative grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary uppercase">From the cellar</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">Four wines, all from this hill</h2>
            <ul className="mt-10">
              {WINES.map((x, i) => (
                <li key={x.name} className="border-t border-border last:border-b">
                  <button
                    type="button"
                    aria-pressed={pick === i}
                    onClick={() => setPick(i)}
                    onPointerEnter={() => setPick(i)}
                    className={`flex w-full items-baseline justify-between gap-4 py-4 text-left font-display text-xl transition-colors ${pick === i ? "text-primary" : "hover:text-primary"}`}
                  >
                    {x.name}
                    <span className="font-sans text-sm text-muted-foreground">{x.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            key={w.name}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-center"
            aria-live="polite"
          >
            <p className="font-display text-3xl">{w.name}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{w.notes}</p>
            <p className="mt-6 text-sm tracking-[0.2em] uppercase">{w.bottles} a year</p>
            <a
              href="#"
              className="mt-8 inline-block border border-primary px-6 py-3 text-sm tracking-[0.2em] text-primary uppercase hover:bg-primary hover:text-primary-foreground"
            >
              Order a case, shipped across Europe
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
