"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flower2, Leaf, Snowflake, Sun } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const seasons = [
  {
    id: "Spring",
    icon: Flower2,
    photo: "photo-1702959638073-3fa29ddb6a98",
    alt: "Log cabin in a meadow of yellow wildflowers",
    headline: "Bluebells, lambs and the first swim (if you’re brave).",
    list: ["Bluebell walk through Hollow Wood", "Fly-fishing lessons on the beck", "Lambing at Fell Farm next door"],
  },
  {
    id: "Summer",
    icon: Sun,
    photo: "photo-1637687222430-ca092fb9062a",
    alt: "Cabin at the end of a woodland track",
    headline: "Long light, paddleboards and supper on the jetty.",
    list: ["Free paddleboards and kayaks", "Wild swimming from the jetty", "Barbecue packs from the farm shop"],
  },
  {
    id: "Autumn",
    icon: Leaf,
    photo: "photo-1573812331441-d99117496acb",
    alt: "A-frame cabin among autumn trees",
    headline: "Rutting stags, mushroom forays and the stove lit by four.",
    list: ["Guided foraging, Saturdays", "Red deer rut from the hide", "Cider pressing in the orchard"],
  },
  {
    id: "Winter",
    icon: Snowflake,
    photo: "photo-1648841931372-676febc626aa",
    alt: "Snowy path leading to a cabin in the pines",
    headline: "Snow on the fells, a hot tub under the stars.",
    list: ["Stargazing (we’re a Dark Sky site)", "Hot tub and a log basket, refilled daily", "Christmas tree from our own woods"],
  },
];

export default function PinehollowSeasons() {
  const [i, setI] = useState(2);
  const s = seasons[i]!;

  return (
    <section className="bg-primary py-20 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-bold">Every season has a reason.</h2>
          <div role="tablist" className="flex flex-wrap gap-1 rounded-[var(--radius)] border border-primary-foreground/25 p-1">
            {seasons.map((x, k) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={i === k}
                onClick={() => setI(k)}
                className={`relative inline-flex items-center gap-2 rounded-[calc(var(--radius)*0.75)] px-4 py-2 text-sm font-semibold transition ${i === k ? "text-primary" : "opacity-90 hover:opacity-100"}`}
              >
                {i === k && (
                  <motion.span layoutId="ph-season" className="absolute inset-0 rounded-[calc(var(--radius)*0.75)] bg-primary-foreground" />
                )}
                <x.icon className="relative size-4" /> <span className="relative">{x.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius)*2)]">
            <AnimatePresence initial={false}>
              <motion.img
                key={s.photo}
                src={img(s.photo)}
                alt={s.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col justify-center"
            >
              <s.icon className="size-10 opacity-80" />
              <p className="mt-6 font-display text-4xl leading-tight font-semibold">{s.headline}</p>
              <ul className="mt-8 space-y-3">
                {s.list.map((x) => (
                  <li key={x} className="flex items-center gap-3 border-b border-primary-foreground/20 pb-3">
                    <span className="size-2 rounded-full bg-primary-foreground" /> {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
