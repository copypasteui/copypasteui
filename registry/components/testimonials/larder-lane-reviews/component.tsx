"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const REVIEWS = [
  { quote: "The country loaf lasts four days and still makes the best toast in Sheffield.", name: "Aisha K., Nether Edge" },
  { quote: "Got there at 8:40 on a Saturday and bagged the last two cinnamon buns. Worth the sprint.", name: "Rob M., Sharrow" },
  { quote: "They remembered my order after two visits. Proper neighbourhood bakery.", name: "Elsie W., Ecclesall Road" },
  { quote: "Seeded rye is dense in the best way. I buy two and freeze one.", name: "Tomasz L., Hunters Bar" },
];
const FAN = [-12, -4, 4, 12];

function Card({ r, i, progress }: { r: (typeof REVIEWS)[number]; i: number; progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, FAN[i] ?? 0]);
  const x = useTransform(progress, [0, 1], ["0%", `${(i - 1.5) * 34}%`]);
  return (
    <motion.li
      style={{ rotate, x, zIndex: i }}
      className="absolute top-0 left-1/2 -ml-36 w-72 rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground shadow-lg"
    >
      <p className="font-display text-xl leading-snug">&ldquo;{r.quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold">{r.name}</p>
    </motion.li>
  );
}

export default function LarderLaneReviews() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.6"] });

  return (
    <section ref={ref} className="overflow-hidden bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none">Overheard at the counter</h2>
        <p className="mt-3 text-muted-foreground">4.8 from 640 Google reviews</p>
      </div>
      {reduce ? (
        <ul className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <li key={r.name} className="rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground">
              <p className="font-display text-xl leading-snug">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold">{r.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mx-auto mt-14 max-w-5xl md:h-80">
          <ul className="hidden md:block">
            {REVIEWS.map((r, i) => (
              <Card key={r.name} r={r} i={i} progress={scrollYProgress} />
            ))}
          </ul>
          <ul className="grid gap-4 md:hidden">
            {REVIEWS.map((r) => (
              <li key={r.name} className="rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground">
                <p className="font-display text-xl leading-snug">&ldquo;{r.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold">{r.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
