"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    at: "0 min",
    title: "Arrive",
    body: "Ten minutes early is enough. We show you the room, the light switch and the panic button you won't need.",
  },
  { at: "10 min", title: "Shower", body: "A quick rinse, earplugs in, a smear of Vaseline on any cuts so the salt doesn't sting." },
  { at: "15 min", title: "Float", body: "Lie back. Most people take about ten minutes to stop holding their neck up." },
  { at: "75 min", title: "Music fades in", body: "That's your cue. The water drains while you shower the salt off." },
  { at: "90 min", title: "Tea by the window", body: "Sit in the lounge for as long as you like. Mint tea is on us." },
];

export default function HarbourFloatFirstVisit() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.8"] });
  const minutes = useTransform(scrollYProgress, (v) => `${Math.round(v * 90)}`);

  return (
    <section ref={ref} className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[18rem_1fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">Your first float, minute by minute</h2>
          <div className="relative mt-8 hidden size-56 md:block" aria-hidden>
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle cx="50" cy="50" r="44" className="fill-none stroke-card" strokeWidth="6" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                className="fill-none stroke-primary"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: reduce ? 1 : scrollYProgress }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-center">
              <span>
                <motion.span className="block text-5xl font-bold tabular-nums">{reduce ? "90" : minutes}</motion.span>
                <span className="text-sm text-muted-foreground">minutes</span>
              </span>
            </span>
          </div>
        </div>
        <ol className="space-y-10">
          {STEPS.map((s) => (
            <li key={s.at} className="rounded-[var(--radius)] bg-card p-6 text-card-foreground">
              <p className="text-sm font-bold text-primary">{s.at}</p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
