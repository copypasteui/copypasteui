"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const quotes = [
  {
    body: "The best meal we had all year. The bread alone is worth the trip, and the staff made our anniversary feel like a party.",
    name: "Clara & Tomás",
    meta: "Regulars since 2019",
  },
  {
    body: "Every dish tasted like someone cared about it. Small menu, zero misses. Book the counter seats and watch the kitchen.",
    name: "James O.",
    meta: "Food writer",
  },
  {
    body: "We booked our rehearsal dinner here for thirty people. The room was warm, the pace relaxed and the lamb shoulder the best we’ve had.",
    name: "Priya N.",
    meta: "Private dining guest",
  },
];

export default function QuoteCarousel() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setI((n) => (n + d + quotes.length) % quotes.length);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [i]);

  const q = quotes[i]!;
  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-7xl leading-none text-primary" aria-hidden>
          “
        </p>
        <div className="relative min-h-[14rem] md:min-h-[11rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-display text-2xl leading-snug md:text-4xl">{q.body}</blockquote>
              <figcaption className="mt-8">
                <span className="font-semibold">{q.name}</span>
                <span className="opacity-70"> · {q.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="grid size-11 place-items-center rounded-full border border-secondary-foreground/25 transition hover:bg-background hover:text-foreground"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {quotes.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Quote ${k + 1}`}
                onClick={() => {
                  setDir(k > i ? 1 : -1);
                  setI(k);
                }}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-secondary-foreground/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="grid size-11 place-items-center rounded-full border border-secondary-foreground/25 transition hover:bg-background hover:text-foreground"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
