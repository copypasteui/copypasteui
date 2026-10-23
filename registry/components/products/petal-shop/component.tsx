"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sizes = [
  { id: "petite", label: "Petite", add: 0 },
  { id: "classic", label: "Classic", add: 15 },
  { id: "grand", label: "Grand", add: 35 },
];
const bouquets = [
  {
    id: "rosie",
    name: "The Rosie",
    base: 38,
    note: "Garden roses, waxflower, eucalyptus",
    photo: "photo-1523693916903-027d144a2b7d",
    tag: "Bestseller",
  },
  {
    id: "meadow",
    name: "Wild Meadow",
    base: 42,
    note: "Seasonal British stems, never the same twice",
    photo: "photo-1763073064881-9bf81eadd3e2",
    tag: "Florist’s choice",
  },
  {
    id: "peach",
    name: "Peach Melba",
    base: 45,
    note: "David Austin roses, carnation, astilbe",
    photo: "photo-1572454591674-2739f30d8c40",
    tag: "",
  },
  {
    id: "white",
    name: "Snowdrift",
    base: 48,
    note: "White roses, chrysanthemum, hydrangea",
    photo: "photo-1523694576729-dc99e9c0f9b4",
    tag: "Sympathy",
  },
  {
    id: "dried",
    name: "Forever Posy",
    base: 32,
    note: "Dried & preserved, lasts a year",
    photo: "photo-1622658641558-235f26dd270b",
    tag: "Lasts 12 months",
  },
  {
    id: "poppy",
    name: "Poppy in a jar",
    base: 28,
    note: "Iceland poppies in a reusable amber jar",
    photo: "photo-1587317996237-eddd7e834d84",
    tag: "",
  },
];

export default function PetalShop() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-display text-5xl md:text-6xl">This week’s bouquets</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Hand-tied each morning. Every order comes with flower food and a handwritten card.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bouquets.map((b, i) => {
            const s = sizes.find((x) => x.id === (picked[b.id] ?? "classic"))!;
            return (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="group relative rounded-[var(--radius)] bg-card p-3 text-card-foreground"
              >
                <div className="relative overflow-hidden rounded-[calc(var(--radius)*0.75)]">
                  <img
                    src={img(b.photo)}
                    alt={b.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {b.tag && <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-semibold">{b.tag}</span>}
                </div>
                <div className="px-3 pt-5 pb-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl">{b.name}</h3>
                    <motion.span
                      key={s.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-semibold tabular-nums"
                    >
                      £{b.base + s.add}
                    </motion.span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{b.note}</p>
                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex flex-1 rounded-full bg-muted p-1">
                      {sizes.map((x) => (
                        <button
                          key={x.id}
                          type="button"
                          onClick={() => setPicked((p) => ({ ...p, [b.id]: x.id }))}
                          aria-pressed={s.id === x.id}
                          className={`relative flex-1 rounded-full py-1.5 text-xs font-semibold ${s.id === x.id ? "text-primary-foreground" : "text-muted-foreground"}`}
                        >
                          {s.id === x.id && <motion.span layoutId={`ps-${b.id}`} className="absolute inset-0 rounded-full bg-primary" />}
                          <span className="relative">{x.label}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label={`Add ${b.name} to basket`}
                      onClick={() => {
                        setAdded(b.id);
                        setTimeout(() => setAdded(null), 1500);
                      }}
                      className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={added === b.id ? "y" : "n"} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          {added === b.id ? <Check className="size-4" /> : <Plus className="size-4" />}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
