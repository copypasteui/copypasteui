"use client";

import { motion } from "motion/react";
import { Award, CalendarHeart, Clock, Menu, Sun, Sprout } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const bounce = (d: number) => ({
  initial: { scale: 0, rotate: -20 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: "spring" as const, stiffness: 160, damping: 11, delay: d },
});

export default function AcornsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background font-sans text-foreground">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute top-40 -left-20 -z-10 size-72 text-secondary">
        <path
          fill="currentColor"
          d="M45.7,-52.3C58.4,-42.7,67,-27.1,70.2,-10.1C73.4,6.9,71.1,25.3,61.2,38.4C51.3,51.5,33.7,59.3,15.2,64.3C-3.3,69.3,-22.7,71.5,-37.3,63.5C-51.9,55.5,-61.7,37.3,-66.2,18C-70.7,-1.3,-69.9,-21.7,-60.1,-36.3C-50.3,-50.9,-31.5,-59.7,-13.2,-63.3C5.1,-66.9,23,-61.9,45.7,-52.3Z"
          transform="translate(100 100)"
        />
      </svg>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-3xl font-extrabold text-primary">
          <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
            <Sprout className="size-6" />
          </span>{" "}
          Little Acorns
        </a>
        <nav className="hidden gap-7 font-semibold md:flex">
          {["Our day", "Rooms", "Fees", "Parents"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a href="#visit" className="hidden rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground sm:inline-block">
          Book a visit
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-6 pb-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.p
            {...bounce(0.1)}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-bold text-secondary-foreground"
          >
            <Award className="size-5 text-primary" /> Rated Outstanding at our last inspection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-extrabold"
          >
            Where little ones grow{" "}
            <span className="relative inline-block text-primary">
              big ideas
              <svg viewBox="0 0 200 20" className="absolute -bottom-3 left-0 w-full text-accent" aria-hidden>
                <motion.path
                  d="M5 12 Q 50 2, 100 10 T 195 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </svg>
            </span>
            .
          </motion.h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">
            A nature-loving nursery for babies to school-starters in Kendal. Forest school every week, home-cooked lunches, and photos in
            your inbox every afternoon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#visit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-lg font-bold text-primary-foreground"
            >
              <CalendarHeart className="size-5" /> Come and play
            </a>
            <a href="#fees" className="rounded-full border-2 border-foreground px-7 py-4 text-lg font-bold">
              See fees
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            <li className="flex items-center gap-2">
              <Sun className="size-5 text-accent" /> Ages 6 months – 5 years
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-5 text-accent" /> Open 7:30am – 6pm
            </li>
          </ul>
        </div>

        <div className="relative h-[480px]">
          <motion.div
            {...bounce(0.2)}
            className="absolute top-0 right-0 size-72 overflow-hidden rounded-full border-8 border-card shadow-xl sm:size-80"
          >
            <img
              src={img("photo-1777056491418-d4ff81a4ad92")}
              alt="Toddlers sitting together at a little table"
              className="size-full object-cover"
            />
          </motion.div>
          <motion.div
            {...bounce(0.35)}
            className="absolute bottom-0 left-0 size-60 overflow-hidden rounded-[40%_60%_55%_45%] border-8 border-card shadow-xl sm:size-64"
          >
            <img
              src={img("photo-1638202951770-2240942c7d1c")}
              alt="Children playing in a hammock in the woods"
              className="size-full object-cover"
            />
          </motion.div>
          <motion.div
            {...bounce(0.5)}
            className="absolute right-6 bottom-10 rounded-[var(--radius)] bg-card p-4 text-card-foreground shadow-xl"
          >
            <p className="text-sm font-bold text-muted-foreground">Today’s lunch</p>
            <p className="font-display text-xl font-bold">Veggie shepherd’s pie</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
