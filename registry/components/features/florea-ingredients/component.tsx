"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ingredients = [
  {
    name: "Rosehip",
    latin: "Rosa canina",
    pct: "12%",
    does: "Rich in natural vitamin A and fatty acids that fade dark spots and soften texture.",
    photo: "photo-1527061011665-3652c757a4d4",
  },
  {
    name: "Bakuchiol",
    latin: "Psoralea corylifolia",
    pct: "1%",
    does: "A plant alternative to retinol: smoother skin and fewer fine lines, without irritation.",
    photo: "photo-1556113275-62dd94fd0578",
  },
  {
    name: "Damask rose water",
    latin: "Rosa damascena",
    pct: "40%",
    does: "Calms redness and hydrates, steam-distilled from petals picked at dawn.",
    photo: "photo-1581022295432-7fabcc628434",
  },
  {
    name: "Squalane",
    latin: "From olives",
    pct: "5%",
    does: "Weightless moisture that mimics skin’s own oils and locks hydration in.",
    photo: "photo-1764694187667-f28a05a52c0e",
  },
];

export default function FloreaIngredients() {
  const [i, setI] = useState(0);
  const ing = ingredients[i]!;

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius)]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={ing.photo}
              src={img(ing.photo)}
              alt={ing.name}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <motion.div
            key={ing.pct}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute right-6 bottom-6 grid size-28 place-items-center rounded-full bg-background text-center text-foreground shadow-xl"
          >
            <span>
              <span className="block font-display text-4xl leading-none font-semibold">{ing.pct}</span>
              <span className="text-[11px] text-muted-foreground">in Bloom Serum</span>
            </span>
          </motion.div>
        </div>

        <div>
          <p className="text-sm tracking-[0.2em] text-muted-foreground">WHAT’S INSIDE</p>
          <h2 className="mt-4 font-display text-5xl leading-[1] font-medium tracking-tight md:text-6xl">
            Four flowers, <em>no fillers.</em>
          </h2>
          <ul className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            {ingredients.map((x, k) => (
              <li key={x.name}>
                <button
                  type="button"
                  onClick={() => setI(k)}
                  aria-expanded={i === k}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span>
                    <span className={`font-display text-3xl transition ${i === k ? "text-primary italic" : ""}`}>{x.name}</span>
                    <span className="ml-3 text-sm text-muted-foreground italic">{x.latin}</span>
                  </span>
                  <Plus className={`size-5 transition-transform ${i === k ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {i === k && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-5 text-muted-foreground"
                    >
                      {x.does}
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
