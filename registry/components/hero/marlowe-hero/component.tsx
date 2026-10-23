"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Menu, Search, ShoppingBag } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function MarloweHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <p className="bg-primary py-2 text-center text-xs font-medium tracking-[0.25em] text-primary-foreground uppercase">
        Free alterations on everything · Collect in store, Hove
      </p>
      <header className="mx-auto grid max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center px-6 py-5">
        <nav className="hidden gap-6 text-sm lg:flex">
          {["New in", "Women", "Men", "Edit", "Stories"].map((l) => (
            <a key={l} href="#" className="underline-offset-4 hover:underline">
              {l}
            </a>
          ))}
        </nav>
        <button type="button" aria-label="Open menu" className="lg:hidden">
          <Menu className="size-6" />
        </button>
        <a href="#" className="font-display text-3xl font-bold tracking-[0.18em]">
          MARLOWE
        </a>
        <div className="flex justify-end gap-4">
          <button type="button" aria-label="Search">
            <Search className="size-5" />
          </button>
          <a href="#" aria-label="Bag, 1 item" className="relative">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              1
            </span>
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-4 px-6 pb-12 md:grid-cols-12">
        <div className="relative overflow-hidden md:col-span-7 md:row-span-2">
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            src={img("photo-1582312045465-89660bf8968b", 1600)}
            alt="Model in a camel coat and wide straw hat"
            className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-full"
          />
          <span className="absolute top-5 left-5 bg-background px-3 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase">AW26</span>
        </div>
        <div className="flex flex-col justify-between gap-10 py-6 md:col-span-5 md:pl-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">Autumn / Winter 2026</p>
            <h1 className="mt-6 font-display text-[clamp(3.25rem,7vw,7.5rem)] leading-[0.88]">
              {["Quiet", "clothes,", "loud"].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  className="block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.em
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block font-medium text-primary"
              >
                tailoring.
              </motion.em>
            </h1>
          </div>
          <div>
            <p className="max-w-sm text-muted-foreground">
              Considered pieces from twelve independent labels, plus our own wool coats cut in a small workshop in Leicester.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#shop" className="bg-primary px-7 py-4 text-sm font-semibold tracking-[0.2em] text-primary-foreground uppercase">
                Shop new in
              </a>
              <a
                href="#styling"
                className="border border-foreground px-7 py-4 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-foreground hover:text-background"
              >
                Book styling
              </a>
            </div>
          </div>
        </div>
        <a href="#lookbook" className="group relative overflow-hidden md:col-span-5">
          <img
            src={img("photo-1769107805465-bfd41863f1a0", 1000)}
            alt="Marlowe shop interior with neutral rails"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-x-4 bottom-4 flex items-center justify-between bg-background px-4 py-3 text-sm font-semibold">
            Visit the shop on Western Road{" "}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
