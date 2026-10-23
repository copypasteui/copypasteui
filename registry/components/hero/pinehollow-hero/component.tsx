"use client";

import { motion } from "motion/react";
import { ArrowRight, CloudMoon, Flame, Menu, Trees } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function PinehollowHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
          <Trees className="size-7 text-primary" /> Pinehollow
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Cabins", "The lake", "Seasons", "Guestbook", "Getting here"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Check dates
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 pt-4 pb-16 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 rounded-[calc(var(--radius)*2)] bg-secondary p-8 text-secondary-foreground md:p-12 lg:col-span-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Lake District · Est. 1974</p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.98] font-bold"
            >
              Five cabins
              <br />
              on one lake,
              <br />
              and{" "}
              <span className="text-primary">
                no <span className="whitespace-nowrap">Wi-Fi</span>
              </span>{" "}
              on purpose.
            </motion.h1>
            <p className="mt-6 max-w-sm text-lg text-muted-foreground">
              Hand-built timber cabins on forty acres of pine woodland, each with a wood stove, a hot tub and a jetty five minutes’ walk
              away.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground"
            >
              Find your cabin <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">From £145</span> a night · 2-night minimum
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[calc(var(--radius)*2)] lg:col-span-7">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={img("photo-1573812331441-d99117496acb")}
            alt="Glass-fronted A-frame cabin among autumn trees"
            className="absolute inset-0 size-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute right-5 bottom-5 left-5 flex flex-wrap items-center gap-4 rounded-[var(--radius)] bg-card/95 p-4 text-card-foreground shadow-xl backdrop-blur sm:right-auto"
          >
            <span className="grid size-11 place-items-center rounded-full bg-secondary">
              <CloudMoon className="size-5" />
            </span>
            <span>
              <span className="block text-xs tracking-wider text-muted-foreground uppercase">Tonight at Pinehollow</span>
              <span className="font-semibold">4°C, clear skies · fire’s laid</span>
            </span>
            <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="text-accent">
              <Flame className="size-6" />
            </motion.span>
          </motion.div>
          <span className="absolute top-5 right-5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
            2 cabins free this weekend
          </span>
        </div>
      </div>
    </section>
  );
}
