"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const STEPS = [
  {
    n: 1,
    title: "Pick",
    front: "Choose from 60-odd pieces on the shelves.",
    back: "Mugs, bowls, plates, money boxes and a dinosaur that's been our best seller since 2019.",
  },
  {
    n: 2,
    title: "Paint",
    front: "Sit as long as you like.",
    back: "Most people take about 90 minutes. Stencils, sponges and tracing paper are on every table.",
  },
  {
    n: 3,
    title: "We fire it",
    front: "Clear glaze, then the kiln at 1,050°C.",
    back: "Everything goes in on Monday and Thursday nights. The glaze makes it food- and dishwasher-safe.",
  },
  {
    n: 4,
    title: "Collect",
    front: "We text you in about seven days.",
    back: "Pick it up any time in the next month. We can post it for £5 if you're not local.",
  },
];

function Card({ step }: { step: (typeof STEPS)[number] }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <li className="[perspective:1000px]">
      <button type="button" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} className="relative block h-64 w-full text-left">
        <motion.span
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 18 }}
          className="relative block size-full [transform-style:preserve-3d]"
        >
          <span className="absolute inset-0 flex flex-col justify-between rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-lg [backface-visibility:hidden]">
            <span className="grid size-12 place-items-center rounded-full bg-accent font-display text-xl font-semibold text-accent-foreground">
              {step.n}
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold">{step.title}</span>
              <span className="mt-1 block text-muted-foreground">{step.front}</span>
            </span>
          </span>
          <span className="absolute inset-0 flex [transform:rotateY(180deg)] items-center rounded-[var(--radius)] bg-primary p-6 text-primary-foreground shadow-lg [backface-visibility:hidden]">
            {step.back}
          </span>
        </motion.span>
      </button>
    </li>
  );
}

export default function GlazeDaysHow() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold">From blank bisque to your kitchen shelf</h2>
        <p className="mt-3 text-muted-foreground">Tap or click a card to turn it over.</p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <Card key={s.n} step={s} />
          ))}
        </ol>
      </div>
    </section>
  );
}
