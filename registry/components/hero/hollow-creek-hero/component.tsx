"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Menu, Tractor, X } from "lucide-react";

const img = (id: string, w = 2200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const pick = [
  { crop: "Pumpkins", ok: true },
  { crop: "Apples", ok: true },
  { crop: "Raspberries", ok: true },
  { crop: "Strawberries", ok: false },
];

export default function HollowCreekHero() {
  return (
    <section className="relative isolate overflow-hidden font-sans text-white">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        src={img("photo-1791395668487-f254f1d10273")}
        alt="Farmer walking through a pasture with cattle at sunrise"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <Tractor className="size-5" />
          </span>
          Hollow Creek Farm
        </a>
        <nav className="hidden gap-7 text-sm font-semibold lg:flex">
          {["Farm shop", "Veg boxes", "Pick your own", "Events", "Our farm"].map((l) => (
            <a key={l} href="#" className="opacity-90 hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Open menu" className="lg:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-20 pb-20 md:pt-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-white/15 px-3 py-1.5 text-sm font-semibold backdrop-blur"
          >
            <span className="size-2 animate-pulse rounded-full bg-accent" /> Farm shop open today, 9am – 5pm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-6 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] font-bold"
          >
            Grown and sold
            <br />
            on our farm
            <br />
            <span className="text-accent">since 1952.</span>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">
            A third-generation family farm in the Wye Valley. Pasture-raised beef, free-range eggs, sixty kinds of veg and a farm shop that
            sells nothing we wouldn’t eat ourselves.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#box"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              Order a veg box <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#visit"
              className="rounded-[var(--radius)] border-2 border-white/70 px-7 py-4 font-semibold hover:bg-white hover:text-black"
            >
              Plan a visit
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-2xl"
        >
          <p className="font-display text-xl font-bold">Pick your own today</p>
          <p className="text-sm text-muted-foreground">Updated 8:15am by Ellie</p>
          <ul className="mt-4 divide-y divide-border">
            {pick.map((p) => (
              <li key={p.crop} className="flex items-center justify-between py-2.5">
                <span className={p.ok ? "font-semibold" : "text-muted-foreground line-through"}>{p.crop}</span>
                {p.ok ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                    <Check className="size-3.5" /> Picking
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <X className="size-3.5" /> Back in June
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
