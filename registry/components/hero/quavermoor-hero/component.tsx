"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Music } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// A gentle "sound wave" made of bars that breathe at slightly different speeds.
const bars = Array.from({ length: 28 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 0.7)) * 0.7);

export default function QuavermoorHero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary font-sans text-primary-foreground">
      <img
        src={img("photo-1696522732406-065ef560da8c")}
        alt=""
        className="absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 object-cover opacity-90 lg:block"
      />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-gradient-to-r from-primary to-transparent lg:block" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2 font-display text-2xl">
          <Music className="size-6 text-accent" /> Quavermoor
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          {["Lessons", "Instruments", "Concerts", "Teachers", "Fees"].map((l) => (
            <a key={l} href="#" className="opacity-90 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#trial"
          className="hidden rounded-[var(--radius)] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground sm:inline-block"
        >
          Free trial lesson
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24">
        <div className="max-w-xl">
          <p className="text-sm tracking-[0.35em] text-primary-foreground uppercase">Music school · ages 4 to 94</p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,7vw,6.25rem)] leading-[1]"
          >
            It’s never too late to <em>play.</em>
          </motion.h1>
          <p className="mt-6 text-lg opacity-90">
            Piano, guitar, strings, voice and drums: one-to-one lessons with patient, professional musicians in Harrogate and online.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#trial"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-4 font-semibold text-accent-foreground"
            >
              Book a free trial <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="text-sm opacity-90">540 students · 22 teachers · 14 instruments</span>
          </div>
        </div>
        <div className="mt-16 flex h-16 max-w-xl items-center gap-1" aria-hidden>
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-full bg-accent"
              style={{ height: `${h * 100}%` }}
              animate={{ scaleY: [1, 0.35, 1] }}
              transition={{ duration: 1.2 + (i % 5) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
