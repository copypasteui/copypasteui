"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bath, BedDouble, Dog, Flame, Users } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const cabins = [
  {
    name: "The Bothy",
    sleeps: 2,
    price: 145,
    dogs: true,
    tub: false,
    photo: "photo-1568729937315-2ef5ee9cf4f2",
    note: "Our smallest, cosiest cabin. Box bed, stove, smoke curling out the chimney.",
  },
  {
    name: "Larch A-frame",
    sleeps: 2,
    price: 185,
    dogs: false,
    tub: true,
    photo: "photo-1698933787134-af2d451985c7",
    note: "Triangle of glass facing the lake. Copper hot tub on the deck.",
  },
  {
    name: "Heron Lodge",
    sleeps: 6,
    price: 290,
    dogs: true,
    tub: true,
    photo: "photo-1680703486830-1b5af60635d7",
    note: "Three bedrooms, stone fireplace, big kitchen for family cooking.",
  },
  {
    name: "Meadow Cabin",
    sleeps: 4,
    price: 210,
    dogs: true,
    tub: true,
    photo: "photo-1702959638073-3fa29ddb6a98",
    note: "Original 1970s log cabin in a wildflower meadow, lovingly restored.",
  },
  {
    name: "Loft at the Mill",
    sleeps: 3,
    price: 165,
    dogs: false,
    tub: false,
    photo: "photo-1727706572437-4fcda0cbd66f",
    note: "Pine-panelled loft above the old sawmill, with a reading nook.",
  },
];

const filters = [
  { id: "all", label: "All cabins" },
  { id: "dogs", label: "Dog friendly", icon: Dog },
  { id: "tub", label: "Hot tub", icon: Bath },
  { id: "group", label: "Sleeps 4+", icon: Users },
] as const;

export default function PinehollowCabins() {
  const [f, setF] = useState<(typeof filters)[number]["id"]>("all");
  const list = cabins.filter((c) => f === "all" || (f === "dogs" && c.dogs) || (f === "tub" && c.tub) || (f === "group" && c.sleeps >= 4));

  return (
    <section className="bg-background py-20 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-bold">The cabins</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setF(x.id)}
                aria-pressed={f === x.id}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${f === x.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
              >
                {"icon" in x && <x.icon className="size-4" />} {x.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.article
                key={c.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`group overflow-hidden rounded-[calc(var(--radius)*2)] border border-border bg-card text-card-foreground ${i === 0 && f === "all" ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={img(c.photo, i === 0 ? 1400 : 900)}
                    alt={c.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 rounded-[var(--radius)] bg-card px-3 py-1.5 text-sm font-semibold text-card-foreground shadow">
                    £{c.price}
                    <span className="font-normal text-muted-foreground">/night</span>
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-muted-foreground">{c.note}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground">
                      <BedDouble className="size-3.5" /> Sleeps {c.sleeps}
                    </li>
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground">
                      <Flame className="size-3.5" /> Wood stove
                    </li>
                    {c.tub && (
                      <li className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground">
                        <Bath className="size-3.5" /> Hot tub
                      </li>
                    )}
                    {c.dogs && (
                      <li className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground">
                        <Dog className="size-3.5" /> Dogs welcome
                      </li>
                    )}
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
