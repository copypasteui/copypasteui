"use client";

import { motion, useReducedMotion } from "motion/react";

const img = (id: string, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function BrinebankHero() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 pt-6 pb-20 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground pb-2 text-xs tracking-[0.15em] uppercase">
          <span>Whitstable, Kent</span>
          <nav aria-label="Main" className="flex gap-5">
            <a href="#" className="hover:underline">
              Menu
            </a>
            <a href="#" className="hover:underline">
              The boats
            </a>
            <a href="#" className="hover:underline">
              Book
            </a>
          </nav>
        </div>
        <h1 className="border-b-4 border-double border-foreground py-4 text-center font-display text-[clamp(3.4rem,13vw,10rem)] leading-[0.9]">
          Brinebank Kitchen
        </h1>
        <p className="flex flex-wrap justify-between gap-2 border-b border-foreground py-2 text-sm">
          <span>Wednesday to Sunday</span>
          <span className="font-semibold">Landed this morning: bass, dabs, native oysters</span>
          <span>3 Harbour Street</span>
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_2fr]">
          <div className="md:border-r md:border-border md:pr-10">
            <h2 className="font-display text-4xl leading-tight">Two boats, one chalkboard, fish cooked over charcoal</h2>
            <p className="mt-5 text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-foreground">
              We buy from the same two Whitstable boats every day and write the menu once we know what they&rsquo;ve landed. Lunch is 12 to
              3, dinner 6 to 10, and a third of the tables are kept for walk-ins.
            </p>
            <a href="#" className="mt-6 inline-block border-b-2 border-primary pb-0.5 font-semibold text-primary">
              Book a table
            </a>
          </div>
          <motion.figure
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          >
            <img
              src={img("photo-1715249792962-5359b4b17f21")}
              alt="A table of oysters on ice with glasses of white wine"
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground">
              Natives with shallot vinegar, £3.20 each. September to April.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
