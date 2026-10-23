"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const LINKS = ["On tap", "Events", "Tours", "Visit"];

export default function LockfastHero() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-2xl uppercase">
          Lockfast
        </a>
        <nav className="hidden items-center gap-8 font-semibold md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l} href="#" className="underline-offset-4 hover:underline">
              {l}
            </a>
          ))}
          <a href="#" className="rounded-[var(--radius)] bg-accent px-4 py-2 text-accent-foreground">
            Book a table
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center border border-foreground md:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </header>
      {open && (
        <nav className="grid gap-1 border-y border-foreground px-6 py-4 font-semibold md:hidden" aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l} href="#" className="py-2">
              {l}
            </a>
          ))}
        </nav>
      )}

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-10 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-block -rotate-2 bg-primary px-3 py-1 font-semibold text-primary-foreground">Unit 4, Canal Wharf, Leeds</p>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,7.5vw,6.2rem)] leading-[0.92] uppercase">
            Fresh beer from the tanks behind the bar
          </h1>
          <p className="mt-6 max-w-lg text-lg">
            Twelve lines, all brewed here. The taproom is open Thursday to Sunday, and the brewery tour runs Saturdays at 2pm: £15 including
            a schooner of whatever came off the tank that week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              See what&rsquo;s on tap <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="rounded-[var(--radius)] bg-card px-6 py-3.5 font-semibold text-card-foreground">
              Book the Saturday tour
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <img
            src={img("photo-1777558578003-e65755409d8e")}
            alt="Golden beer being poured into a glass at the bar"
            className="aspect-[4/5] w-full rotate-2 rounded-[var(--radius)] border border-foreground object-cover shadow-2xl"
          />
          <motion.div
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            whileHover={{ scale: 1.08 }}
            className="absolute -top-8 -left-8 grid size-32 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <path id="lockfast-ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text className="fill-current text-[11px] font-bold tracking-[0.2em] uppercase">
                <textPath href="#lockfast-ring">On tap now · brewed here ·</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl">12</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
