"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const couples = [
  {
    names: "Freya & Oluwaseun",
    date: "June 2026",
    guests: 120,
    photo: "photo-1731515672817-0491d19c9f19",
    alt: "Couple walking hand in hand after their ceremony",
    quote:
      "From our first visit to the last sparkler, it felt like the team were as excited as we were. Our guests still talk about the Glasshouse at night.",
  },
  {
    names: "Rosie & Will",
    date: "September 2026",
    guests: 85,
    photo: "photo-1494955870715-979ca4f13bf0",
    alt: "Bride holding a bouquet of pink roses",
    quote: "We’re not planners. Hattie, our coordinator, basically built the day around us and somehow kept us calm. Worth every penny.",
  },
  {
    names: "Amara & Jules",
    date: "May 2026",
    guests: 150,
    photo: "photo-1583939413139-19eeeb3a198c",
    alt: "Woodland ceremony with guests and a draped pergola",
    quote: "The woodland ceremony had dappled light, birdsong and not a dry eye in the clearing.",
  },
];

export default function WrenhollowCouples() {
  const [i, setI] = useState(0);
  const c = couples[i]!;
  const go = (d: number) => setI((n) => (n + d + couples.length) % couples.length);

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={c.photo}
              src={img(c.photo)}
              alt={c.alt}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.4em] uppercase opacity-90">Kind words</p>
          <AnimatePresence mode="wait">
            <motion.figure
              key={c.names}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <span aria-hidden className="mt-6 block font-display text-[8rem] leading-[0.5] opacity-40">
                “
              </span>
              <blockquote className="font-display text-3xl leading-snug italic md:text-4xl">{c.quote}</blockquote>
              <figcaption className="mt-8">
                <span className="block font-display text-2xl">{c.names}</span>
                <span className="text-sm opacity-90">
                  {c.date} · {c.guests} guests
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous couple"
              className="grid size-12 place-items-center rounded-full border border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next couple"
              className="grid size-12 place-items-center rounded-full border border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary"
            >
              <ArrowRight className="size-5" />
            </button>
            <span className="ml-2 text-sm tabular-nums opacity-90">
              0{i + 1} / 0{couples.length}
            </span>
          </div>
          <p className="mt-10 border-t border-primary-foreground/20 pt-6 text-sm opacity-90">
            Winner, Best Wedding Venue South West 2025 & 2026 · 4.8 on Hitched from 412 reviews
          </p>
        </div>
      </div>
    </section>
  );
}
