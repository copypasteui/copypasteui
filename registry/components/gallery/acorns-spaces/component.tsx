"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const rooms = [
  {
    id: "Acorns",
    ages: "6 – 24 months",
    ratio: "1 adult : 3 babies",
    emoji: "🌰",
    body: "A calm, soft space with a separate sleep room, sensory corner and a garden just for crawlers.",
    photos: ["photo-1567746455504-cb3213f8f5b8", "photo-1786292949404-084cbd10c7b1"],
  },
  {
    id: "Saplings",
    ages: "2 – 3 years",
    ratio: "1 adult : 4 toddlers",
    emoji: "🌱",
    body: "Busy, bright and full of things to climb. Potty training support without the pressure.",
    photos: ["photo-1761208663763-c4d30657c910", "photo-1763310225230-6e15b125935a"],
  },
  {
    id: "Oaks",
    ages: "3 – 5 years",
    ratio: "1 adult : 8 children",
    emoji: "🌳",
    body: "Our pre-school room, with phonics, cooking, forest school and plenty of getting ready for ‘big school’.",
    photos: ["photo-1788882679829-fee300e8ae4a", "photo-1637878257903-7f08eab9a7f2"],
  },
];

export default function AcornsSpaces() {
  const [i, setI] = useState(0);
  const r = rooms[i]!;

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-extrabold">Three rooms, one family</h2>
          <div className="flex gap-2 rounded-full bg-muted p-1.5">
            {rooms.map((x, k) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setI(k)}
                aria-pressed={i === k}
                className={`relative rounded-full px-5 py-2.5 font-bold ${i === k ? "text-primary-foreground" : ""}`}
              >
                {i === k && (
                  <motion.span
                    layoutId="acorn-room"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.35 }}
                  />
                )}
                <span className="relative">
                  {x.emoji} {x.id}
                </span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={r.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr_1fr]"
          >
            <div className="flex flex-col justify-between rounded-[var(--radius)] bg-primary p-8 text-primary-foreground">
              <div>
                <span className="text-6xl" aria-hidden>
                  {r.emoji}
                </span>
                <h3 className="mt-4 font-display text-4xl font-extrabold">{r.id} room</h3>
                <p className="mt-3 text-lg opacity-90">{r.body}</p>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-[calc(var(--radius)*0.6)] border border-primary-foreground/25 p-4">
                  <dt className="text-sm opacity-90">Ages</dt>
                  <dd className="font-display text-xl font-bold">{r.ages}</dd>
                </div>
                <div className="rounded-[calc(var(--radius)*0.6)] border border-primary-foreground/25 p-4">
                  <dt className="text-sm opacity-90">Ratio</dt>
                  <dd className="font-display text-xl font-bold">{r.ratio}</dd>
                </div>
              </dl>
            </div>
            {r.photos.map((p, k) => (
              <motion.img
                key={p}
                initial={{ scale: 0.92, rotate: k ? 3 : -3 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.1 + k * 0.1 }}
                src={img(p)}
                alt={`${r.id} room`}
                className="h-full min-h-[280px] w-full rounded-[var(--radius)] object-cover"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
