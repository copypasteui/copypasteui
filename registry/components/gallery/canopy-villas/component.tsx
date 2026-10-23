"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BedDouble, Maximize, Users, Waves } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const villas = [
  {
    name: "Fern Pool Villa",
    blurb: "A thatched hideaway sunk into the ferns, with a plunge pool and an outdoor rain shower.",
    photo: "photo-1694967832949-09984640b143",
    alt: "Thatched villa with a private plunge pool",
    size: "68 m²",
    sleeps: 2,
    bed: "King",
    pool: "Plunge pool",
    price: 340,
  },
  {
    name: "River Suite",
    blurb: "Floor-to-ceiling glass over the Ayung valley. Fall asleep to the river, wake to the gibbons.",
    photo: "photo-1689729738817-fb1f4256769d",
    alt: "Bedroom with floor-to-ceiling windows overlooking the jungle",
    size: "54 m²",
    sleeps: 2,
    bed: "King",
    pool: "Shared lagoon",
    price: 260,
  },
  {
    name: "Treetop Loft",
    blurb: "Up a carved teak staircase into the canopy. A daybed, a hammock and a view of nothing but green.",
    photo: "photo-1689729771136-46e2ee831b83",
    alt: "Bright loft bedroom with timber ceiling and jungle view",
    size: "46 m²",
    sleeps: 3,
    bed: "Queen + daybed",
    pool: "Shared lagoon",
    price: 220,
  },
  {
    name: "Family Garden House",
    blurb: "Two bedrooms around a private garden and a twelve-metre pool. Babysitting on request.",
    photo: "photo-1728051104408-c810a0ffd1fc",
    alt: "Aerial view of villas around a turquoise pool",
    size: "140 m²",
    sleeps: 5,
    bed: "King + twins",
    pool: "12 m private pool",
    price: 520,
  },
];

export default function CanopyVillas() {
  const [i, setI] = useState(0);
  const v = villas[i]!;

  return (
    <section id="stay" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">Stay</p>
            <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Fourteen villas, no two alike.</h2>
          </div>
          <p className="max-w-md text-muted-foreground md:justify-self-end">
            Every villa is built from reclaimed teak and volcanic stone by craftsmen from the village below, and none is more than a minute
            from the river.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {villas.map((x, k) => (
              <li key={x.name} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setI(k)}
                  aria-pressed={i === k}
                  className={`relative w-full border-l-2 py-4 pr-4 pl-5 text-left transition ${i === k ? "border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="block font-display text-2xl">{x.name}</span>
                  <span className="text-sm">from ${x.price} / night</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div
              className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[520px]"
              style={{ borderRadius: "calc(var(--radius) * 2)" }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={v.photo}
                  src={img(v.photo)}
                  alt={v.alt}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                {String(i + 1).padStart(2, "0")} / {String(villas.length).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                <h3 className="font-display text-4xl">{v.name}</h3>
                <p className="mt-4 text-lg text-muted-foreground">{v.blurb}</p>
                <dl className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { icon: Maximize, k: "Size", val: v.size },
                    { icon: Users, k: "Sleeps", val: `Up to ${v.sleeps}` },
                    { icon: BedDouble, k: "Beds", val: v.bed },
                    { icon: Waves, k: "Pool", val: v.pool },
                  ].map((d) => (
                    <div key={d.k} className="rounded-[var(--radius)] bg-secondary p-4 text-secondary-foreground">
                      <d.icon className="size-5 text-primary" />
                      <dt className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">{d.k}</dt>
                      <dd className="mt-0.5 font-medium">{d.val}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-6">
                  <p>
                    <span className="font-display text-4xl">${v.price}</span>
                    <span className="text-sm text-muted-foreground"> / night, breakfast included</span>
                  </p>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Book <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
