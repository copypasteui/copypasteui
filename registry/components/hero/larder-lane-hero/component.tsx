"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const RAYS = Array.from({ length: 16 }, (_, i) => i * 22.5);

export default function LarderLaneHero() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-background px-6 font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
        <a href="#" className="font-display text-3xl">
          Larder Lane
        </a>
        <a href="#" className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">
          Pre-order for Saturday
        </a>
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-14 pt-6 pb-24 md:grid-cols-2">
        <div>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.98]">
            Bread worth getting up{" "}
            <span className="relative inline-block">
              early
              <svg viewBox="0 0 200 20" className="absolute -bottom-3 left-0 w-full text-primary" aria-hidden>
                <motion.path
                  d="M2 12 Q 27 2 52 12 T 102 12 T 152 12 T 198 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                />
              </svg>
            </span>{" "}
            for
          </h1>
          <p className="mt-8 max-w-md text-lg">
            Sourdough, rye and Saturday cinnamon buns from a small shop at 14 Larder Lane, Sheffield. Everything is baked by four of us
            between 4am and 7am.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground px-4 py-2 font-semibold">
            <Clock className="size-4" aria-hidden /> Tuesday to Saturday from 7am, until it&rsquo;s gone
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <motion.svg
            viewBox="-100 -100 200 200"
            className="absolute inset-0 size-full text-accent"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            aria-hidden
          >
            {RAYS.map((r) => (
              <path key={r} d="M0 0 L-9 -100 L9 -100 Z" transform={`rotate(${r})`} fill="currentColor" />
            ))}
          </motion.svg>
          <img
            src={img("photo-1767065888047-b2264073364b")}
            alt="A round sourdough loaf with a fern pattern scored in the crust"
            className="absolute inset-[14%] size-[72%] rounded-full border border-foreground object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
