"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Mash",
    fact: "67°C · 1 hour",
    body: "Crushed malt soaks in hot water in the mash tun until the starches turn to sugar.",
  },
  {
    n: "02",
    title: "Boil",
    fact: "100°C · 70 minutes",
    body: "The sweet wort boils in the copper. Bittering hops go in at the start, aroma hops at the end.",
  },
  {
    n: "03",
    title: "Ferment",
    fact: "19°C · 10 to 14 days",
    body: "Yeast gets to work in one of our six conical tanks. You can see them from the bar.",
  },
  {
    n: "04",
    title: "Pour",
    fact: "3°C · twenty metres",
    body: "It goes from the bright tank straight to the taps. No trucks, no warehouse.",
  },
];

export default function LockfastBrewing() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.5"] });

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none uppercase">How a beer gets to your glass</h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Two weeks, four vessels, one room. This is what you walk through on the Saturday tour.
        </p>

        <ol ref={ref} className="relative mt-14 space-y-16 pl-16 md:pl-24">
          <svg
            className="absolute top-2 bottom-2 left-5 h-[calc(100%-1rem)] w-6 md:left-9"
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M12 0 V100" className="stroke-muted" strokeWidth="8" fill="none" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M12 0 V100"
              className="stroke-primary"
              strokeWidth="8"
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : scrollYProgress }}
            />
          </svg>
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <span className="absolute top-0 -left-16 grid size-12 place-items-center rounded-[var(--radius)] border border-foreground bg-card font-display text-lg text-card-foreground md:-left-24 md:size-16 md:text-2xl">
                {s.n}
              </span>
              <h3 className="font-display text-3xl uppercase">{s.title}</h3>
              <p className="mt-1 font-semibold">{s.fact}</p>
              <p className="mt-3 max-w-lg text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
