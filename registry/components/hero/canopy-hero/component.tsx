"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Menu, Minus, Plus, Search, Users } from "lucide-react";

const img = (id: string, w = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function CanopyHero() {
  const [guests, setGuests] = useState(2);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden font-sans text-white">
      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 6, ease: "easeOut" }}
        src={img("photo-1694967832949-09984640b143")}
        alt="Aerial view of a thatched pool villa surrounded by rainforest"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-2xl tracking-[0.3em]">
          CANOPY
        </a>
        <nav className="hidden gap-9 text-sm md:flex">
          {["Villas", "Experiences", "Wellness", "Dining", "Our land"].map((l) => (
            <a key={l} href="#" className="opacity-90 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#stay"
            className="hidden border border-white/60 px-5 py-2.5 text-sm hover:bg-white hover:text-black sm:inline-block"
            style={{ borderRadius: "var(--radius)" }}
          >
            Reserve
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.4 }}
          className="text-xs uppercase"
        >
          An eco-retreat in the Ubud highlands
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-[clamp(3rem,7.5vw,7rem)] leading-[1]"
        >
          Wake up inside the rainforest.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-xl text-lg text-white/85"
        >
          Fourteen private pool villas, a river to swim in and nothing to do unless you want to.
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mb-10 grid w-[calc(100%-3rem)] max-w-5xl gap-px overflow-hidden bg-border text-card-foreground shadow-2xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
        style={{ borderRadius: "calc(var(--radius) * 1.5)" }}
      >
        <label className="flex items-center gap-3 bg-card px-5 py-4">
          <CalendarDays className="size-5 shrink-0 text-primary" />
          <span className="flex-1 text-left">
            <span className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Arrive</span>
            <input type="date" defaultValue="2026-12-18" className="w-full bg-transparent font-medium outline-none" />
          </span>
        </label>
        <label className="flex items-center gap-3 bg-card px-5 py-4">
          <CalendarDays className="size-5 shrink-0 text-primary" />
          <span className="flex-1 text-left">
            <span className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Depart</span>
            <input type="date" defaultValue="2026-12-23" className="w-full bg-transparent font-medium outline-none" />
          </span>
        </label>
        <div className="flex items-center gap-3 bg-card px-5 py-4">
          <Users className="size-5 shrink-0 text-primary" />
          <span className="flex-1 text-left">
            <span className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Guests</span>
            <span className="font-medium">{guests} adults</span>
          </span>
          <button
            type="button"
            aria-label="Fewer guests"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="grid size-8 place-items-center rounded-full border border-border"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="More guests"
            onClick={() => setGuests((g) => Math.min(6, g + 1))}
            className="grid size-8 place-items-center rounded-full border border-border"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90"
        >
          <Search className="size-4" /> Check availability
        </button>
      </motion.form>
    </section>
  );
}
