"use client";

import { motion } from "motion/react";

const weeks = [
  {
    n: "1",
    title: "Standing and falling",
    body: "Balance, the ready position, and how to fall forwards onto your pads so it doesn't hurt.",
  },
  { n: "2", title: "Gliding and stopping", body: "Push, glide, and the T-stop." },
  { n: "3", title: "Turns", body: "Crossovers on the bend and turning on one foot, at walking pace first." },
  {
    n: "4",
    title: "Your first disco",
    body: "Skating backwards for a few metres, then a free ticket to Thursday's disco night to try it all to music.",
  },
];

export default function SilverlineLessons() {
  return (
    <section id="lessons" className="bg-secondary px-6 py-20 font-sans text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-3xl uppercase md:text-5xl">Learn to skate in four weeks</h2>
        <p className="mt-4 max-w-xl">£48 for four Wednesday evenings, ages 12 and up, eight people to a coach.</p>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {weeks.map((w, i) => (
            <motion.li
              key={w.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground"
            >
              <p className="font-display text-sm text-primary uppercase">Week {w.n}</p>
              <h3 className="mt-3 text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </motion.li>
          ))}
        </ol>
        <a href="#" className="mt-10 inline-block rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
          Book the next course
        </a>
      </div>
    </section>
  );
}
