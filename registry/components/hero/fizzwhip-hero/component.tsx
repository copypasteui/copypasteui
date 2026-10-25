"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Snowflake } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function FizzwhipHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <Snowflake className="size-5" aria-hidden />
          </span>
          fizzwhip
        </a>
        <nav aria-label="Main" className="hidden gap-7 font-semibold lg:flex">
          {["Flavours", "Tubs", "Parties", "Visit"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#tubs" className="hidden rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground sm:inline-block">
            Order a tub
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-6 pb-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-block -rotate-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            24 flavours today, 9 of them vegan
          </p>
          <h1 className="mt-6 font-display text-5xl leading-none md:text-7xl">Gelato churned every morning in Hockley</h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Milk from Bradfield Farm, pistachios from Bronte and no ready-made bases. Open till 10pm on Fridays and Saturdays.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#flavours"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              See today&apos;s flavours <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#parties"
              className="rounded-full border border-foreground px-7 py-4 font-semibold hover:bg-secondary hover:text-secondary-foreground"
            >
              Book a party
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="aspect-square overflow-hidden rounded-full border-4 border-foreground bg-secondary"
          >
            <img
              src={img("photo-1629385697093-57be2cc97fa6")}
              alt="Three scoops of gelato in a waffle cone surrounded by sprinkles"
              className="size-full object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 12 }}
            className="absolute -bottom-2 -left-2 grid size-28 rotate-[-12deg] place-items-center rounded-full bg-primary p-3 text-center text-sm leading-tight font-semibold text-primary-foreground sm:size-32"
          >
            Two scoops £4.80
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 12 }}
            className="absolute -top-2 -right-2 rotate-[10deg] rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
          >
            Free taster, always
          </motion.p>
        </div>
      </div>
    </section>
  );
}
