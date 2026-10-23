"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const COURSES = [
  { course: "Antipasto", dish: "Pecorino from the Sabatini farm, our honey, warm focaccia" },
  { course: "Primo", dish: "Pici with garlic, tomato and breadcrumbs, rolled by hand that afternoon" },
  { course: "Secondo", dish: "Wild boar slow-cooked in our Rosso, soft polenta" },
  { course: "Dolce", dish: "Olive oil cake, poached figs, a glass of vin santo" },
];

// The whole section decides when the lines rise, so lines below the fold don't wait to be scrolled to one by one.
const Shown = createContext(false);

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  const shown = useContext(Shown);
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={shown || reduce ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function PoggioLentoTable() {
  const ref = useRef<HTMLElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Shown.Provider value={shown}>
      <section ref={ref} className="bg-background px-6 py-28 font-sans text-foreground">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary uppercase">Dinner at the long table · 8pm · €55</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
              <Line delay={0}>One menu, one table,</Line>
              <Line delay={0.1}>everyone at eight.</Line>
            </h2>
            <ol className="mt-12 space-y-8">
              {COURSES.map((c, i) => (
                <li key={c.course} className="border-t border-border pt-5">
                  <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    <Line delay={0.1 + i * 0.12}>{c.course}</Line>
                  </p>
                  <p className="mt-2 font-display text-2xl leading-snug">
                    <Line delay={0.18 + i * 0.12}>{c.dish}</Line>
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-muted-foreground">Wine is our own, poured as you like. Tell us about allergies when you arrive.</p>
          </div>
          <div className="grid gap-6 self-start">
            <img
              src={img("photo-1644704001249-0d9dbb842238")}
              alt="A bowl of pasta with ham and cheese"
              className="aspect-[4/5] w-full object-cover"
            />
            <img
              src={img("photo-1673720111789-e2cff16bea90")}
              alt="A dessert on a plate with a spoon"
              className="aspect-square w-2/3 justify-self-end object-cover"
            />
          </div>
        </div>
      </section>
    </Shown.Provider>
  );
}
