"use client";

import { motion } from "motion/react";
import { Clock, Menu, Scissors, Users } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function FlintmoorHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-3 font-display text-2xl uppercase">
          <span aria-hidden className="h-9 w-3 overflow-hidden rounded-full border-2 border-foreground">
            <span className="block h-[200%] w-full [animation:iron-pole_2.4s_linear_infinite] bg-[repeating-linear-gradient(-45deg,var(--primary)_0_6px,var(--background)_6px_12px,var(--foreground)_12px_18px,var(--background)_18px_24px)] motion-reduce:animate-none" />
          </span>
          Flintmoor
        </a>
        <nav className="hidden gap-8 text-sm font-semibold tracking-wider uppercase md:flex">
          {["Prices", "Barbers", "Shop", "Find us"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-bold tracking-wider text-primary-foreground uppercase sm:inline-block"
        >
          Book a chair
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-6 pb-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.25em] text-primary uppercase">
              <Scissors className="size-4" /> Barbers · Northern Quarter
            </p>
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] uppercase"
            >
              Sharp
              <br />
              since
              <br />
              <span className="text-primary">1998.</span>
            </motion.h1>
          </div>
          <p className="max-w-md text-lg text-muted-foreground">
            Proper cuts, hot-towel shaves and no small talk unless you want it. Walk in or book; the coffee’s on us either way.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius)] border-2 border-foreground p-5">
              <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                <Users className="size-4" /> Walk-in queue now
              </p>
              <p className="mt-2 font-display text-4xl">3 waiting</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-3.5" /> About 25 minutes
              </p>
            </div>
            <a href="#book" className="group flex flex-col justify-between rounded-[var(--radius)] bg-primary p-5 text-primary-foreground">
              <span className="text-xs font-bold tracking-widest uppercase opacity-90">Skip the queue</span>
              <span className="mt-2 font-display text-3xl uppercase">Book online →</span>
            </a>
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-[var(--radius)]">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            src={img("photo-1585747860715-2ba37e788b70")}
            alt="Leather barber chairs under warm pendant lights against exposed brick"
            className="absolute inset-0 size-full object-cover"
          />
          <motion.div
            initial={{ rotate: -12, scale: 0 }}
            animate={{ rotate: -8, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="absolute bottom-6 left-6 rounded-[var(--radius)] bg-accent px-5 py-4 text-accent-foreground shadow-2xl"
          >
            <p className="font-display text-3xl leading-none uppercase">£22</p>
            <p className="text-xs font-bold tracking-widest uppercase">Skin fade</p>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes iron-pole { to { transform: translateY(-50%); } }`}</style>
    </section>
  );
}
