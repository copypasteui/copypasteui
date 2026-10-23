"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    name: "Priya, 34",
    since: "Member since 2024",
    photo: "photo-1761839258420-5c3e2f2e2a74",
    quote: "I’d never touched a barbell. Eight months later I deadlifted my bodyweight twice over, and I actually look forward to Mondays.",
    stats: [
      ["Deadlift", "45 → 130 kg"],
      ["Classes", "212"],
      ["5k time", "−6 min"],
    ],
  },
  {
    name: "Sam, 41",
    since: "Member since 2023",
    photo: "photo-1534258936925-c58bed479fcb",
    quote: "Engine class broke me in week one and rebuilt me by week ten. My resting heart rate is the lowest it’s been since university.",
    stats: [
      ["Resting HR", "78 → 58"],
      ["Classes", "340"],
      ["Body fat", "−9%"],
    ],
  },
  {
    name: "Lena, 28",
    since: "Member since 2025",
    photo: "photo-1517438322307-e67111335449",
    quote:
      "Fight Club gave me the confidence I didn’t know I was missing. The coaches notice everything and push exactly the right amount.",
    stats: [
      ["Rounds/wk", "36"],
      ["Classes", "96"],
      ["Pull-ups", "0 → 8"],
    ],
  },
];

export default function PulseResults() {
  const [i, setI] = useState(0);
  const s = stories[i]!;
  const go = (d: number) => setI((n) => (n + d + stories.length) % stories.length);

  return (
    <section className="overflow-hidden bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
          <TrendingUp className="size-4" /> Member results
        </p>
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-foreground lg:aspect-auto">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={s.photo}
                src={img(s.photo)}
                alt=""
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute top-4 left-4 rounded-[var(--radius)] bg-accent px-3 py-1.5 font-display text-xl text-accent-foreground uppercase">
              {s.name}
            </span>
          </div>

          <div className="flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="font-display text-4xl leading-[1.05] uppercase md:text-6xl">“{s.quote}”</blockquote>
                <p className="mt-6 text-sm text-muted-foreground">{s.since}</p>
                <dl className="mt-8 grid grid-cols-3 gap-3">
                  {s.stats.map(([k, v]) => (
                    <div key={k} className="rounded-[var(--radius)] bg-foreground p-4 text-background">
                      <dt className="text-xs text-background/90 uppercase">{k}</dt>
                      <dd className="mt-1 font-display text-2xl text-background uppercase md:text-3xl">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous story"
                onClick={() => go(-1)}
                className="grid size-14 place-items-center rounded-[var(--radius)] border-2 border-foreground transition hover:bg-foreground hover:text-background"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next story"
                onClick={() => go(1)}
                className="grid size-14 place-items-center rounded-[var(--radius)] bg-accent text-accent-foreground"
              >
                <ArrowRight className="size-5" />
              </button>
              <span className="ml-3 font-display text-2xl">
                {String(i + 1).padStart(2, "0")}
                <span className="text-muted-foreground">/{String(stories.length).padStart(2, "0")}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
