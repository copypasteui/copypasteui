"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Candle = { name: string; notes: string; photo: string; alt: string };
const candles: Candle[] = [
  {
    name: "Bracken & rain",
    notes: "Fern, wet stone, cedar",
    photo: "photo-1603905179139-db12ab535ca9",
    alt: "Black and white candle on a wooden holder",
  },
  {
    name: "Pennine fire",
    notes: "Woodsmoke, birch tar, orange peel",
    photo: "photo-1640095889747-2090ee12fa7d",
    alt: "Lit candle on a wooden table",
  },
  {
    name: "Calder linen",
    notes: "Clean cotton, lime flower",
    photo: "photo-1601479604588-68d9e6d386b5",
    alt: "White pillar candles on a wooden table",
  },
  { name: "Heather honey", notes: "Beeswax, heather, warm hay", photo: "photo-1636714528228-f469eefb3eef", alt: "Two candles on a table" },
];
const sizes = [
  { label: "90g tin", price: 12 },
  { label: "200g jar", price: 24 },
  { label: "400g three-wick", price: 42 },
];

export default function HearthWickCandles() {
  const [size, setSize] = useState(1);
  const [basket, setBasket] = useState<string[]>([]);
  const chosen = sizes[size]!;
  return (
    <section id="candles" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl">The candles</h2>
          <div role="group" aria-label="Size" className="flex flex-wrap gap-2 rounded-[var(--radius)] bg-muted p-1.5">
            {sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={size === i}
                onClick={() => setSize(i)}
                className={`rounded-[calc(var(--radius)*0.75)] px-4 py-2 text-sm font-semibold ${size === i ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                {s.label} · £{s.price}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {candles.map((c) => {
            const added = basket.includes(c.name);
            return (
              <li key={c.name} className="flex flex-col rounded-[var(--radius)] bg-card p-3 text-card-foreground shadow-md">
                <img src={img(c.photo)} alt={c.alt} className="aspect-square w-full rounded-[calc(var(--radius)*0.75)] object-cover" />
                <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                  <h3 className="font-display text-xl">{c.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.notes}</p>
                  <button
                    type="button"
                    onClick={() => setBasket((b) => (added ? b.filter((x) => x !== c.name) : [...b, c.name]))}
                    className={`mt-4 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2.5 text-sm font-semibold ${added ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                  >
                    {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                    {added ? "In your basket" : `Add ${chosen.label}, £${chosen.price}`}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <AnimatePresence>
          {basket.length > 0 && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              {basket.length} in your basket. Free UK delivery over £40.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
