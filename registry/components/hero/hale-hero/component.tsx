"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Scale } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const areas = ["Family & divorce", "Buying or selling a home", "Wills & probate", "Employment", "Business"];

export default function HaleHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <Scale className="size-6 text-accent" />
            <span className="font-display text-2xl font-semibold">
              Hale <span className="text-accent italic">&amp;</span> Partners
            </span>
          </a>
          <nav className="hidden gap-8 text-sm lg:flex">
            {["For individuals", "For business", "Our people", "Fees", "Insights"].map((l) => (
              <a key={l} href="#" className="hover:text-accent">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#consult" className="hidden bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground sm:inline-block">
              Free initial call
            </a>
            <button type="button" aria-label="Open menu" className="lg:hidden">
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase">Solicitors · Bath · Est. 1962</p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,6.5vw,5.75rem)] leading-[1.02] font-medium"
          >
            Clear advice, <em>when it matters most.</em>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            A family-owned firm of twenty-two lawyers. We explain things plainly, give fixed fees wherever we can, and pick up the phone.
          </p>
          <p className="mt-10 text-sm font-medium">How can we help?</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areas.map((a, i) => (
              <motion.li key={a} initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                <a
                  href="#areas"
                  className="group inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {a} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <img
            src={img("photo-1505664194779-8beaceb93744")}
            alt="Library with leather-bound books and marble busts"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-6 -left-6 max-w-xs bg-primary p-6 text-primary-foreground shadow-2xl">
            <p className="font-display text-xl leading-snug italic">“They made the worst year of my life a little more bearable.”</p>
            <p className="mt-3 text-xs tracking-widest uppercase opacity-90">Family client, 2026</p>
          </div>
        </motion.div>
      </div>
      <div className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm">
          <span>Ranked in the regional legal directories · 2024 – 2026</span>
          <span>Quality-accredited practice management</span>
          <span>Legal aid available for family matters</span>
        </div>
      </div>
    </section>
  );
}
