"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Flower2, Menu, ShoppingBag, Truck } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function PetalHero() {
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const ok = /^(BN|RH)\d/i.test(code.trim());

  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl">
          <Flower2 className="size-6 text-primary" /> Petal &amp; Stem
        </a>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          {["Bouquets", "Subscriptions", "Weddings", "Plants", "Workshops"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Basket" className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <ShoppingBag className="size-4" />
          </a>
          <button type="button" aria-label="Open menu" className="md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-8 pb-20 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground"
          >
            <Truck className="size-4" /> Same-day delivery in Brighton &amp; Hove
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,7vw,6.25rem)] leading-[0.95]"
          >
            Flowers for every <em className="text-primary">“just because.”</em>
          </motion.h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Seasonal, British-grown where we can, wrapped in recycled paper and delivered by bike before 6pm.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setChecked(true);
            }}
            className="mt-8 max-w-md"
          >
            <label htmlFor="ps-code" className="text-sm font-semibold">
              Check delivery to your postcode
            </label>
            <div className="mt-2 flex rounded-full border border-border bg-card p-1.5 text-card-foreground focus-within:border-ring">
              <input
                id="ps-code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setChecked(false);
                }}
                placeholder="e.g. BN1 4GH"
                className="min-w-0 flex-1 bg-transparent px-4 uppercase outline-none placeholder:normal-case"
              />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                Check
              </button>
            </div>
            <AnimatePresence>
              {checked && code && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`mt-3 flex items-center gap-2 text-sm font-semibold ${ok ? "text-accent" : "text-muted-foreground"}`}
                >
                  {ok ? (
                    <>
                      <Check className="size-4" /> Yes! Order by 2pm for delivery today.
                    </>
                  ) : (
                    "We post nationwide: next-day delivery, £6.95."
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, borderRadius: "50%" }}
            animate={{ opacity: 1, scale: 1, borderRadius: "48% 52% 44% 56% / 55% 45% 55% 45%" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-square overflow-hidden"
          >
            <img
              src={img("photo-1589244159943-460088ed5c92")}
              alt="Buckets of peonies, roses and stocks outside the shop"
              className="size-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="absolute bottom-12 -left-2 w-48 rounded-[var(--radius)] bg-card p-3 text-card-foreground shadow-2xl sm:-left-8"
          >
            <img
              src={img("photo-1523693916903-027d144a2b7d", 400)}
              alt="Pink rose bouquet"
              className="aspect-square w-full rounded-[calc(var(--radius)*0.6)] object-cover"
            />
            <p className="mt-2 font-display text-lg leading-tight">The Rosie</p>
            <p className="text-sm text-muted-foreground">from £38</p>
          </motion.div>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 grid size-24 place-items-center rounded-full bg-primary text-center text-xs leading-tight font-semibold tracking-wider text-primary-foreground uppercase"
          >
            British
            <br />
            grown
          </motion.span>
        </div>
      </div>
    </section>
  );
}
