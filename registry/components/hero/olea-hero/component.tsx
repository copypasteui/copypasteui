"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock, MapPin, Menu, Star } from "lucide-react";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ease = [0.22, 1, 0.36, 1] as const;

export default function OleaHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-primary font-sans text-primary-foreground">
      <motion.img
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        src={img("photo-1776993298456-98c71c0e177e", 2200)}
        alt="Olea dining room with leather banquettes set for dinner"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white">
        <nav className="hidden flex-1 gap-8 text-sm font-medium md:flex">
          {["Menu", "Wine", "Private dining"].map((l) => (
            <a key={l} href="#" className="opacity-85 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="font-display text-3xl tracking-[0.2em]">
          OLEA
        </a>
        <div className="flex flex-1 items-center justify-end gap-6 text-sm font-medium">
          <a href="#" className="hidden opacity-85 hover:opacity-100 md:inline">
            Gift cards
          </a>
          <a
            href="#reserve"
            className="hidden rounded-full border border-white/40 px-5 py-2.5 backdrop-blur hover:bg-white hover:text-black sm:inline"
          >
            Book a table
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100svh-88px)] max-w-7xl flex-col justify-end px-6 pb-12 text-white">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs font-semibold tracking-[0.35em] text-white/75 uppercase"
        >
          Coastal Mediterranean · Est. 2014
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.1, ease }}
          className="mt-5 max-w-5xl font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92]"
        >
          Long tables, wood fire &amp; the <em className="text-white/70 italic">slow</em> Sunday lunch.
        </motion.h1>

        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
          <p className="max-w-md text-white/80">
            Charcoal-grilled fish, hand-rolled pasta and olive oil we press ourselves. Seasonal menus from chef Marta Ruiz, served to 64
            seats on the harbour.
          </p>
          <div className="flex items-start gap-3 text-sm">
            <Clock className="mt-0.5 size-4 shrink-0 text-white/60" />
            <p>
              <span className="font-semibold">Tue – Sun</span>
              <br />
              <span className="text-white/70">Lunch 12–3 · Dinner 6–11</span>
            </p>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0 text-white/60" />
            <p>
              <span className="font-semibold">14 Harbour Row</span>
              <br />
              <span className="text-white/70">Old Port, Brighton</span>
            </p>
          </div>
          <a
            href="#reserve"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground"
          >
            Reserve a table <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute top-28 right-6 hidden w-60 rounded-[var(--radius)] bg-background/95 p-4 text-foreground shadow-2xl backdrop-blur lg:block"
      >
        <div className="flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-2 font-display text-lg leading-snug">“The best plate of fish on the south coast.”</p>
        <p className="mt-2 text-xs text-muted-foreground">The Coastal Food Guide, 2026</p>
      </motion.div>
    </section>
  );
}
