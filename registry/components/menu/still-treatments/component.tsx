"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const treatments = [
  {
    name: "Deep tissue massage",
    kind: "Massage",
    note: "Firm, slow work on the back, neck and shoulders.",
    p60: 85,
    p90: 115,
    photo: "photo-1544161515-4ab6ce6db874",
  },
  {
    name: "Hot stone ritual",
    kind: "Massage",
    note: "Warm basalt stones and long, flowing strokes.",
    p60: 95,
    p90: 125,
    photo: "photo-1600334089648-b0d9d3028eb2",
  },
  {
    name: "Aromatherapy massage",
    kind: "Massage",
    note: "Choose from three blends we mix in-house.",
    p60: 80,
    p90: 110,
    photo: "photo-1515377905703-c4788e51af15",
  },
  {
    name: "Signature facial",
    kind: "Face",
    note: "Double cleanse, enzyme peel, lymphatic massage.",
    p60: 90,
    p90: 120,
    photo: "photo-1598901986949-f593ff2a31a6",
  },
  {
    name: "Candlelit back, face & scalp",
    kind: "Ritual",
    note: "Our most-loved: a little of everything, in the dark.",
    p60: 99,
    p90: 135,
    photo: "photo-1772915022472-ffc1df2d6051",
  },
];

export default function StillTreatments() {
  const [len, setLen] = useState<60 | 90>(60);
  const [hover, setHover] = useState(0);

  return (
    <section className="bg-background py-28 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">Treatments</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Choose your hour.</h2>
          </div>
          <div className="flex rounded-full border border-border p-1">
            {([60, 90] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLen(l)}
                aria-pressed={len === l}
                className={`relative rounded-full px-6 py-2 text-sm font-semibold ${len === l ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {len === l && <motion.span layoutId="still-len" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{l} minutes</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <ul className="border-t border-border">
            {treatments.map((t, i) => (
              <li key={t.name} onMouseEnter={() => setHover(i)} className="border-b border-border">
                <a href="#book" onFocus={() => setHover(i)} className="grid grid-cols-[1fr_auto] items-center gap-6 py-7">
                  <span>
                    <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{t.kind}</span>
                    <span
                      className={`mt-1 block font-display text-3xl transition-all md:text-4xl ${hover === i ? "translate-x-3 text-primary" : ""}`}
                    >
                      {t.name}
                    </span>
                    <span className="mt-1 block text-muted-foreground">{t.note}</span>
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={len}
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                      exit={{ clipPath: "inset(0 0 100% 0)" }}
                      className="font-display text-3xl tabular-nums"
                    >
                      £{len === 60 ? t.p60 : t.p90}
                    </motion.span>
                  </AnimatePresence>
                </a>
              </li>
            ))}
          </ul>
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-[var(--radius)] lg:sticky lg:top-10 lg:block">
            <AnimatePresence initial={false}>
              <motion.img
                key={hover}
                src={img(treatments[hover]!.photo)}
                alt={treatments[hover]!.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Every treatment includes two hours in the thermal suite, a robe and herbal tea.
        </p>
      </div>
    </section>
  );
}
