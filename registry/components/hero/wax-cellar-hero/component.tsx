"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

const HEADLINE = "Second-hand and new vinyl, down the stairs";

export default function WaxCellarHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <section className="overflow-hidden bg-background px-6 font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
        <a href="#" className="font-display text-2xl font-extrabold">
          Wax Cellar
        </a>
        <nav aria-label="Main" className="hidden gap-6 font-semibold sm:flex">
          <a href="#" className="hover:underline">
            New in
          </a>
          <a href="#" className="hover:underline">
            Gigs
          </a>
          <a href="#" className="hover:underline">
            Sell to us
          </a>
        </nav>
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-12 pt-8 pb-24 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="inline-block bg-accent px-3 py-1 font-semibold text-accent-foreground">Basement, 31 Goose Gate, Nottingham</p>
          <h1 className="relative mt-6 font-display text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.95] font-extrabold">
            <span
              aria-hidden
              className="absolute inset-0 translate-x-[3px] translate-y-[2px] text-primary mix-blend-multiply dark:mix-blend-screen"
            >
              {HEADLINE}
            </span>
            <span className="relative">{HEADLINE}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg">
            About 9,000 records in the racks, 400 new arrivals a week, and two listening decks you can use for as long as you like.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
          >
            See this week&rsquo;s new arrivals <ArrowDown className="size-4" aria-hidden />
          </a>
        </div>

        <motion.div style={reduce ? {} : { rotate }} className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden>
          <div className="absolute inset-0 rounded-full bg-foreground shadow-xl" />
          {[0.92, 0.84, 0.76, 0.68, 0.6, 0.52].map((s) => (
            <div key={s} className="absolute rounded-full border border-background/20" style={{ inset: `${((1 - s) / 2) * 100}%` }} />
          ))}
          <div className="absolute inset-[34%] grid place-items-center rounded-full bg-primary text-center text-primary-foreground">
            <span className="text-[10px] leading-tight font-bold tracking-[0.2em] uppercase">
              Wax Cellar
              <br />
              Side A
            </span>
          </div>
          <div className="absolute inset-[48.5%] rounded-full bg-background" />
        </motion.div>
      </div>
    </section>
  );
}
