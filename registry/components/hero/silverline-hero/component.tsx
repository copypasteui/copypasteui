"use client";

import { motion } from "motion/react";
import { ArrowRight, Disc3, Menu } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const next = [
  { when: "Tonight 7pm", what: "Disco night, 18+" },
  { when: "Sat 10am", what: "Family skate" },
  { when: "Sat 1pm", what: "Learn to skate" },
];

export default function SilverlineHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-lg uppercase">
          <Disc3 className="size-7 text-primary" aria-hidden /> Silverline
        </a>
        <nav aria-label="Main" className="hidden gap-7 text-sm font-semibold lg:flex">
          {["Sessions", "Prices", "Parties", "Lessons"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#sessions"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Book a session
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-8 pb-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            Ancoats, Manchester · open 7 days
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight uppercase md:text-6xl">Roller disco under 400 mirror tiles</h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            A 600m² maple floor, a DJ every Friday and Saturday, and skates in every size from a child&apos;s 9 to a 14. Sessions from
            £9.50, skate hire included.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#sessions"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              See this week&apos;s sessions <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#parties" className="rounded-full border border-border bg-card px-7 py-4 font-semibold text-card-foreground">
              Birthday parties
            </a>
          </div>
        </div>
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={img("photo-1640100801847-2938b9589742")}
            alt="Skater rolling past a mirror ball"
            className="aspect-[4/5] w-full rounded-[calc(var(--radius)*2)] object-cover"
          />
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute right-4 bottom-4 left-4 grid gap-2 rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground shadow-lg sm:left-auto sm:w-72"
          >
            {next.map((n) => (
              <li key={n.when} className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold">{n.when}</span>
                <span className="text-muted-foreground">{n.what}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
