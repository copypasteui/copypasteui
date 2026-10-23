"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "Sold in nine days, £15k over asking. Hannah kept us updated every step and genuinely cared about where we were going next.",
    name: "James & Priya",
    sold: "Sold · Montpellier",
  },
  {
    quote:
      "As first-time buyers we didn’t know what we were doing. Keystone held our hand through the whole chain collapse and found us somewhere better.",
    name: "Lucy T.",
    sold: "Bought · Charlton Kings",
  },
  {
    quote:
      "We’ve let three properties through them for six years. Rent arrives on time, issues get fixed, and I’ve never once had to chase.",
    name: "Robert M.",
    sold: "Landlord · 3 properties",
  },
];

export default function KeystoneReviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, []);
  const r = reviews[i]!;

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex justify-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="size-5 fill-current" />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">4.6 from 1,140 reviews</p>
        <div className="relative mt-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-display text-3xl leading-snug md:text-4xl">“{r.quote}”</blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-semibold">{r.name}</span> <span className="text-muted-foreground">· {r.sold}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {reviews.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Review ${k + 1}`}
              aria-current={k === i}
              className="relative h-1 w-14 overflow-hidden bg-border"
            >
              {k === i && (
                <motion.span
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-accent"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
