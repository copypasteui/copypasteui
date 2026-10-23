"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "We came for the bream and stayed four hours. The kind of place you start planning to come back to before the bill arrives.",
    name: "Hannah & Joe",
    meta: "Anniversary dinner · Google",
  },
  {
    quote: "Proper hospitality. They remembered my dad’s birthday from last year and brought out a candle in the olive oil cake.",
    name: "Priya S.",
    meta: "Sunday lunch · OpenTable",
  },
  {
    quote: "The cacio e pepe alone is worth the train from London. Ask to sit at the counter and watch the fire.",
    name: "Tom W.",
    meta: "Dinner for two · Tripadvisor",
  },
];

const press = [
  { name: "The Coastal Food Guide", award: "Best Seafood 2026" },
  { name: "Harbour Times", award: "★★★★★" },
  { name: "Good Table Awards", award: "Top 50 UK" },
  { name: "Sussex Life", award: "Restaurant of the Year" },
];

export default function OleaReviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 6500);
    return () => clearInterval(t);
  }, []);
  const r = reviews[i]!;

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 px-4 py-2 text-sm">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="size-3.5 fill-current" />
            ))}
          </span>
          4.7 from 2,180 guest reviews
        </div>

        <div className="relative mt-12 min-h-[15rem] md:min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-display text-3xl leading-tight md:text-5xl">“{r.quote}”</blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="opacity-90"> — {r.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {reviews.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Show review ${k + 1}`}
              aria-current={k === i}
              onClick={() => setI(k)}
              className="h-1.5 rounded-full bg-primary-foreground transition-all"
              style={{ width: k === i ? 32 : 10, opacity: k === i ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-y border-primary-foreground/15 px-6 md:grid-cols-4">
        {press.map((p) => (
          <div key={p.name} className="px-4 py-8 text-center">
            <p className="font-display text-xl">{p.name}</p>
            <p className="mt-1 text-xs tracking-[0.2em] uppercase opacity-90">{p.award}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
