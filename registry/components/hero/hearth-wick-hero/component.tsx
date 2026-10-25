"use client";

import { motion } from "motion/react";
import { ArrowRight, Flame, Menu, ShoppingBag } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function HearthWickHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl">
          <Flame className="size-6 text-primary" aria-hidden /> Hearth &amp; Wick
        </a>
        <nav aria-label="Main" className="hidden gap-7 text-sm font-medium lg:flex">
          {["Candles", "Workshops", "How we make them", "Stockists"].map((l) => (
            <a key={l} href="#" className="hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#candles"
            aria-label="Basket"
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-card-foreground"
          >
            <ShoppingBag className="size-5" aria-hidden />
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-6 pb-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Poured by hand in Hebden Bridge since 2017</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">Rapeseed wax candles that smell of the moors</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Wax from Yorkshire rapeseed, cotton wicks and fragrance blended in our workshop above Market Street. A 200g candle burns for 45
            hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#candles"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              Shop candles <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#workshops" className="rounded-[var(--radius)] bg-card px-6 py-3.5 font-semibold text-card-foreground">
              Make your own, £45
            </a>
          </div>
        </div>
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={img("photo-1612293905607-b003de9e54fb")}
            alt="Hand lighting a candle in a brown glass jar with a match"
            className="aspect-[4/5] w-full rounded-[calc(var(--radius)*1.5)] object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-6 left-6 rounded-[var(--radius)] bg-card p-5 text-card-foreground sm:-right-4 sm:left-auto"
          >
            <p className="text-xs font-semibold text-muted-foreground">Scent of the month</p>
            <p className="mt-1 font-display text-xl">Bracken &amp; rain</p>
            <p className="text-sm text-muted-foreground">Fern, wet stone, a little cedar</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
