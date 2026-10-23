"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, ShoppingBasket } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const spring = { type: "spring", stiffness: 120, damping: 14 } as const;

export default function CrumbHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="#" className="font-display text-3xl">
          crumb<span className="text-primary">.</span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          {["Today’s bake", "Celebration cakes", "Wholesale", "Classes", "Visit"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold sm:inline-flex">
            <span className="size-2 rounded-full bg-[oklch(0.7_0.17_145)]" /> Open · until 4pm
          </span>
          <a
            href="#order"
            aria-label="Order for pickup"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <ShoppingBasket className="size-4" aria-hidden /> <span className="hidden sm:inline">Order for pickup</span>
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 pb-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -4, scale: 1 }}
            transition={spring}
            className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground"
          >
            Neighbourhood bakery since 2011
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.95]"
          >
            Baked before
            <br /> the sun is up<span className="text-primary">.</span>
          </motion.h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Slow-fermented sourdough, laminated pastry and proper birthday cakes, from our ovens on Mill Lane every morning from 7.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#bakes"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              See today’s bake <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#order"
              className="rounded-full border-2 border-foreground px-7 py-4 font-semibold hover:bg-foreground hover:text-background"
            >
              Order a cake
            </a>
          </div>
          <dl className="mt-12 flex gap-10">
            {[
              ["7am", "doors open"],
              ["36h", "sourdough ferment"],
              ["0", "preservatives"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl">{n}</dt>
                <dd className="text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, rotate: 6, y: 40 }}
            animate={{ opacity: 1, rotate: 3, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="absolute top-0 right-0 w-[68%] overflow-hidden rounded-[calc(var(--radius)*1.6)] shadow-2xl"
          >
            <img
              src={img("photo-1509440159596-0249088772ff")}
              alt="Seeded sourdough loaves with wheat"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 60 }}
            animate={{ opacity: 1, rotate: -5, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-[calc(var(--radius)*1.6)] border-[6px] border-card shadow-2xl"
          >
            <img
              src={img("photo-1555507036-ab1f4038808a", 900)}
              alt="Croissants dusted with flour"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, delay: 0.7 }}
            whileHover={{ rotate: 12, scale: 1.08 }}
            className="absolute top-[40%] left-[38%] grid size-28 place-items-center rounded-full bg-primary text-center text-primary-foreground shadow-xl"
          >
            <span className="font-display text-sm leading-tight">
              Fresh
              <br />
              <span className="text-3xl">£3</span>
              <br />
              croissant
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -right-2 bottom-10 rounded-[var(--radius)] bg-card p-4 text-card-foreground shadow-xl"
          >
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Out of the oven</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex justify-between gap-6">
                <span>Country sourdough</span>
                <span className="font-semibold">7:00</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Cardamom buns</span>
                <span className="font-semibold">8:30</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Focaccia</span>
                <span className="font-semibold">11:00</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
