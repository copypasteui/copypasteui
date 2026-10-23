"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const spaces = [
  {
    name: "The Walled Garden",
    use: "Ceremony",
    cap: "160 seated",
    photo: "photo-1769812344142-00c7f6584885",
    alt: "Garden ceremony with rows of chairs and a floral arch",
    body: "Our most-booked ceremony spot: a 1790s kitchen garden with a lawn aisle between the espaliered pears.",
  },
  {
    name: "The Glasshouse",
    use: "Wedding breakfast",
    cap: "140 dining",
    photo: "photo-1663185776079-33231c5242eb",
    alt: "Victorian glasshouse beside an ivy-covered stone ruin",
    body: "A restored Victorian glasshouse that glows like a lantern at night. Heated in winter, open-sided in summer.",
  },
  {
    name: "Lime Tree Lawn",
    use: "Drinks & games",
    cap: "200 standing",
    photo: "photo-1759954644836-a57275881ded",
    alt: "White chairs on a lawn facing a minimalist arch",
    body: "Croquet, a fizz bar under the limes and the best light for photos from 5pm.",
  },
  {
    name: "Hollow Wood",
    use: "Woodland ceremony",
    cap: "90 seated",
    photo: "photo-1583939413139-19eeeb3a198c",
    alt: "Woodland ceremony under a pergola draped with fabric",
    body: "A clearing in the ancient beeches with a timber pergola. Lanterns along the path for evening ceremonies.",
  },
];

export default function WrenhollowSpaces() {
  const [i, setI] = useState(0);
  const s = spaces[i]!;

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold tracking-[0.4em] text-primary uppercase">The spaces</p>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ul className="border-t border-foreground/15">
            {spaces.map((x, k) => (
              <li key={x.name} className="border-b border-foreground/15">
                <button
                  type="button"
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  onClick={() => setI(k)}
                  aria-pressed={i === k}
                  className="group flex w-full items-baseline justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="text-sm text-muted-foreground tabular-nums">0{k + 1}</span>
                    <span
                      className={`font-display text-3xl transition-all md:text-5xl ${i === k ? "text-primary italic" : "opacity-60 group-hover:opacity-100"}`}
                    >
                      {x.name}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:block">
                    {x.cap}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {i === k && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-6 pl-10 text-muted-foreground"
                    >
                      <span className="mr-2 font-semibold text-foreground">{x.use}.</span>
                      {x.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: "999px 999px var(--radius) var(--radius)" }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={s.photo}
                src={img(s.photo)}
                alt={s.alt}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/90 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-foreground uppercase backdrop-blur">
              {s.use} · {s.cap}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
