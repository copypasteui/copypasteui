"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const TAGS = [
  { label: "Mugs from £14", className: "top-6 -left-4 rotate-[-8deg] bg-accent text-accent-foreground" },
  { label: "Ready in 7 days", className: "top-1/2 -right-6 rotate-[6deg] bg-card text-card-foreground" },
  { label: "Studio fee £6", className: "-bottom-5 left-10 rotate-[-3deg] bg-secondary text-secondary-foreground" },
];

export default function GlazeDaysHero() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden bg-background px-6 font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
        <a href="#" className="font-display text-2xl font-semibold">
          Glaze Days
        </a>
        <a href="#" className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">
          Book a table
        </a>
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-16 pt-8 pb-24 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-secondary px-4 py-1.5 font-semibold text-secondary-foreground">
            Paint-your-own pottery · Gloucester Road, Bristol
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.02] font-semibold">
            Paint a mug, we fire it, you collect it next week
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Pick a piece off the shelf, paint it at a big table with a coffee or a babyccino, and leave it with us. We glaze and kiln-fire
            it and text you when it&rsquo;s ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              Book a painting table <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="rounded-full bg-card px-7 py-4 font-semibold text-card-foreground">
              Party packages
            </a>
          </div>
        </div>

        <div ref={box} className="relative mx-auto w-full max-w-md">
          <img
            src={img("photo-1657395348373-28a0cb49804b")}
            alt="A child painting a bowl with a fine brush"
            className="aspect-square w-full rounded-[calc(var(--radius)*1.6)] object-cover shadow-xl"
          />
          {TAGS.map((t, i) => (
            <motion.span
              key={t.label}
              drag={!reduce}
              dragConstraints={box}
              dragSnapToOrigin
              dragElastic={0.4}
              whileDrag={{ scale: 1.12, cursor: "grabbing" }}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 + i * 0.15 }}
              className={`absolute cursor-grab touch-none rounded-full px-5 py-3 font-display text-lg font-semibold shadow-lg select-none ${t.className}`}
            >
              {t.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
