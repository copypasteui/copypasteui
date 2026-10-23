"use client";

import { motion } from "motion/react";
import { ArrowRight, ShoppingBag, Menu, Coffee } from "lucide-react";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function CinderwickHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-2xl font-extrabold tracking-tight">
          cinderwick<span className="text-accent">·</span>roasters
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Shop coffee", "Subscriptions", "Café", "Wholesale", "Journal"].map((l) => (
            <a key={l} href="#" className="hover:text-accent">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Cart, 2 items" className="relative grid size-10 place-items-center rounded-full border border-border">
            <ShoppingBag className="size-4" />
            <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </a>
          <button type="button" aria-label="Menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-8 pb-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium"
          >
            <span className="size-2 animate-pulse rounded-full bg-accent" /> Roasting today · ships tomorrow
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3.25rem,7.5vw,6.75rem)] leading-[0.95] font-semibold tracking-tight"
          >
            Roasted on Tuesday.
            <span className="block text-primary italic">In your cup by Thursday.</span>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Small-batch specialty coffee from farms we visit, roasted in a 15-kilo drum in Leeds and sent out within 24 hours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              Shop this week’s roast <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="rounded-full border border-primary/25 px-7 py-4 font-semibold hover:bg-secondary">
              Start a subscription
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm">
            <div className="flex -space-x-3">
              {["photo-1489278353717-f64c6ee8a4d2", "photo-1506794778202-cad84cf45f1d", "photo-1570840934347-4dc56c98b8ef"].map((p) => (
                <img key={p} src={img(p, 120)} alt="" className="size-10 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">11,400 subscribers</span> brewing better at home
            </p>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[var(--radius)]"
          >
            <img
              src={img("photo-1511537190424-bbbab87ac5eb")}
              alt="Fresh beans pouring from a coffee roaster"
              className="size-full object-cover"
            />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 -left-4 grid size-28 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
              <defs>
                <path id="cinderwick-ring" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
              </defs>
              <text className="fill-current text-[10px] font-semibold tracking-[0.25em] uppercase">
                <textPath href="#cinderwick-ring">fresh roast · small batch ·</textPath>
              </text>
            </svg>
            <Coffee className="size-8" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute right-4 -bottom-6 w-64 rounded-[var(--radius)] bg-card p-4 text-card-foreground shadow-2xl sm:-right-6"
          >
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">This week’s origin</p>
            <p className="mt-1 font-display text-2xl font-semibold">Huila, Colombia</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Red apple", "Panela", "Cacao nib"].map((n) => (
                <span key={n} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                  {n}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
