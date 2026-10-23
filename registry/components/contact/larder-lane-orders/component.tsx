"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Minus, Plus } from "lucide-react";

const ITEMS = [
  { id: "country", name: "Country loaf", price: 4.8 },
  { id: "rye", name: "Seeded rye tin", price: 5.2 },
  { id: "cinnamon", name: "Cinnamon bun", price: 3.2 },
  { id: "croissant", name: "Croissant", price: 2.8 },
];

export default function LarderLaneOrders() {
  const reduce = useReducedMotion();
  const [qty, setQty] = useState<Record<string, number>>({ country: 1 });
  const total = ITEMS.reduce((sum, it) => sum + it.price * (qty[it.id] ?? 0), 0);
  const mv = useMotionValue(total);
  const shown = useTransform(mv, (v) => `£${v.toFixed(2)}`);
  useEffect(() => {
    if (reduce) mv.set(total);
    else animate(mv, total, { duration: 0.5, ease: "easeOut" });
  }, [total, reduce, mv]);

  const change = (id: string, by: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(12, (q[id] ?? 0) + by)) }));

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-3xl rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground md:p-10">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-none">Pre-order for Saturday</h2>
        <p className="mt-3 text-muted-foreground">Order by Thursday 6pm, collect from 7am to 12 on Saturday. Pay when you pick up.</p>
        <ul className="mt-8 divide-y divide-border">
          {ITEMS.map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-4 py-4">
              <span>
                <span className="block font-semibold">{it.name}</span>
                <span className="text-sm text-muted-foreground">£{it.price.toFixed(2)}</span>
              </span>
              <span className="flex items-center gap-3" role="group" aria-label={`${it.name} quantity`}>
                <button
                  type="button"
                  onClick={() => change(it.id, -1)}
                  aria-label={`One fewer ${it.name.toLowerCase()}`}
                  className="grid size-10 place-items-center rounded-full border border-foreground"
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <span className="w-6 text-center text-lg font-bold tabular-nums" aria-live="polite">
                  {qty[it.id] ?? 0}
                </span>
                <button
                  type="button"
                  onClick={() => change(it.id, 1)}
                  aria-label={`One more ${it.name.toLowerCase()}`}
                  className="grid size-10 place-items-center rounded-full border border-foreground"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-foreground pt-6">
          <p className="text-lg">
            Total <motion.span className="ml-2 font-display text-3xl tabular-nums">{shown}</motion.span>
          </p>
          <button
            type="button"
            disabled={total === 0}
            className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            Reserve my order
          </button>
        </div>
      </div>
    </section>
  );
}
