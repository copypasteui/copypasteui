"use client";

import { motion } from "motion/react";
import { ShoppingBag, Star, Leaf, Search, Menu } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const chips = [
  { t: "Rosehip oil 12%", x: "-left-6 top-20" },
  { t: "Bakuchiol 1%", x: "-right-4 top-1/2" },
  { t: "Vegan · cruelty-free", x: "left-6 -bottom-4" },
];

export default function FloreaHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <p className="bg-primary py-2 text-center text-xs tracking-[0.2em] text-primary-foreground">
        FREE SHIPPING OVER €40 · SAMPLE WITH EVERY ORDER
      </p>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <nav className="hidden gap-7 text-sm md:flex">
          {["Shop", "Rituals", "Ingredients", "Journal"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
        <a href="#" className="font-display text-3xl font-semibold tracking-tight italic">
          Florea
        </a>
        <div className="flex items-center gap-4">
          <Search className="hidden size-5 sm:block" aria-label="Search" />
          <a href="#" aria-label="Bag, 1 item" className="relative">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
              1
            </span>
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-6 pb-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Leaf className="size-4 text-primary" /> Botanical skincare, made in small batches
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-tight"
          >
            Skin, in
            <span className="block text-primary italic">full bloom.</span>
          </motion.h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            The Bloom Serum pairs cold-pressed rosehip with gentle bakuchiol for brighter, calmer skin in 28 days, without the retinol
            sting.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition hover:opacity-90"
            >
              Shop the serum · €38
            </a>
            <a href="#" className="text-sm underline underline-offset-4">
              Take the skin quiz
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground">4.7 · 6,214 reviews · 92% saw a visible glow</span>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[var(--radius)] bg-secondary"
          >
            <img
              src={img("photo-1770048792339-d8f8d8d2dbeb")}
              alt="White dropper bottle resting on moss and small flowers"
              className="size-full object-cover"
            />
          </motion.div>
          {chips.map((c, i) => (
            <motion.span
              key={c.t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.8 + i * 0.15 },
                scale: { delay: 0.8 + i * 0.15 },
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
              }}
              className={`absolute ${c.x} rounded-full bg-card px-4 py-2 text-sm text-card-foreground shadow-xl ring-1 ring-border`}
            >
              {c.t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
