"use client";

import { motion } from "motion/react";
import { ArrowDownRight, Beer, Menu } from "lucide-react";

const img = (id: string, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const onTap = [
  "Hollow Point IPA 6.2%",
  "Night Shift Stout 5.8%",
  "Fieldwork Pils 4.6%",
  "Sour Cherry Gose 4.2%",
  "Gold Rush Pale 5.0%",
  "Smoke Signal Porter 6.5%",
];

export default function FoxgloveHero() {
  return (
    <section className="relative isolate overflow-hidden bg-stone-950 font-sans text-stone-100">
      <img
        src={img("photo-1779591211763-7a54431e16ab")}
        alt="Foxglove brewhouse with steel fermenters above the taproom"
        className="absolute inset-0 -z-10 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-3xl tracking-wide">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Beer className="size-5" />
          </span>
          Foxglove
        </a>
        <nav className="hidden gap-8 text-sm font-semibold tracking-wider uppercase md:flex">
          {["On tap", "Taproom", "Events", "Tours", "Shop"].map((l) => (
            <a key={l} href="#" className="hover:text-accent">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#visit"
          className="hidden rounded-[var(--radius)] bg-accent px-5 py-2.5 text-sm font-bold tracking-wider text-accent-foreground uppercase sm:inline-block"
        >
          Book a tour
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-28">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 border border-stone-100/30 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase"
        >
          <span className="size-2 animate-pulse rounded-full bg-accent" /> Taproom open today 12–11
        </motion.p>
        <h1 className="mt-6 font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.82] uppercase">
          {["Brewed forty", "feet from", "your pint."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 2 ? "text-accent" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-stone-100/80">
            An independent brewery and taproom in a 1920s tram shed. Sixteen taps, wood-fired pizza, dogs welcome, kids until 7.
          </p>
          <a
            href="#taps"
            className="group inline-flex items-center gap-3 self-start rounded-[var(--radius)] bg-primary px-7 py-4 font-bold tracking-wider text-primary-foreground uppercase md:self-auto"
          >
            See what’s pouring <ArrowDownRight className="size-5 transition-transform group-hover:rotate-[-45deg]" />
          </a>
        </div>
      </div>

      <div className="border-y border-stone-100/15 bg-accent py-3 text-accent-foreground">
        <div className="flex w-max [animation:fox-ticker_32s_linear_infinite] motion-reduce:animate-none">
          {[...onTap, ...onTap].map((b, i) => (
            <span
              key={i}
              aria-hidden={i >= onTap.length}
              className="flex items-center gap-6 px-6 font-display text-2xl tracking-wide whitespace-nowrap uppercase"
            >
              {b} <span className="text-base">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes fox-ticker { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
