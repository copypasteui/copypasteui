"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Star, Truck, RotateCcw } from "lucide-react";

const img = (id: string, w = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const colorways = [
  { name: "Black", swatch: "rgb(28 28 30)", photo: "photo-1544003484-3cd181d17917", alt: "Black stainless steel bottle" },
  { name: "Lake", swatch: "rgb(64 118 170)", photo: "photo-1568395216634-ab1b1e848751", alt: "Blue steel tumbler" },
  { name: "Clear", swatch: "rgb(220 232 236)", photo: "photo-1523362628745-0c100150b504", alt: "Clear bottle filled with water" },
];

export default function ProductShowcaseHero() {
  const [c, setC] = useState(0);
  const [added, setAdded] = useState(false);
  const cw = colorways[c]!;

  return (
    <section className="relative overflow-hidden bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative order-2 aspect-square overflow-hidden rounded-[var(--radius)] bg-muted md:order-1">
          <AnimatePresence mode="wait">
            <motion.img
              key={cw.name}
              src={img(cw.photo)}
              alt={cw.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <span className="absolute top-4 left-4 bg-background px-3 py-1.5 text-sm font-semibold text-foreground">750 ml · 410 g</span>
        </div>

        <div className="order-1 md:order-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Tide Bottle, second edition</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] font-extrabold tracking-tight md:text-6xl">
            Ice still in it at tomorrow&apos;s lunch.
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground">4.6 · 2,315 reviews</span>
          </div>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Double-walled steel, a lid you can open with one thumb and a powder coat that survives being dropped on a station platform. We
            tested it 400 times.
          </p>

          <div className="mt-7">
            <p className="text-sm font-medium">
              Colour: <span className="text-muted-foreground">{cw.name}</span>
            </p>
            <div className="mt-3 flex gap-3">
              {colorways.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  aria-label={x.name}
                  onClick={() => setC(i)}
                  style={{ background: x.swatch }}
                  className={`size-9 rounded-full border border-border ${i === c ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="font-display text-4xl font-bold">£38</p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setAdded(true)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background"
            >
              <ShoppingBag className="size-5" />
              {added ? "In your bag" : "Add to bag"}
            </motion.button>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="size-4" /> Free UK delivery over £50
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="size-4" /> 60-day returns
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
