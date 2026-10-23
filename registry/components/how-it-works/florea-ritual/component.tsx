"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const rituals = {
  morning: [
    {
      step: "Cleanse",
      product: "Petal Cleanser",
      how: "A pea-sized amount on damp skin, 30 seconds, rinse.",
      photo: "photo-1597931752949-98c74b5b159f",
    },
    {
      step: "Treat",
      product: "Bloom Serum",
      how: "Press three drops into face and neck. Don’t rub.",
      photo: "photo-1576426863848-c21f53c60b19",
    },
    {
      step: "Protect",
      product: "Cloud Cream",
      how: "Seal it in, then your SPF. Always your SPF.",
      photo: "photo-1609097164502-59a1f0f9a66f",
    },
  ],
  evening: [
    {
      step: "Melt",
      product: "Petal Cleanser",
      how: "Double cleanse to lift sunscreen and the day.",
      photo: "photo-1616750819456-5cdee9b85d22",
    },
    {
      step: "Repair",
      product: "Bloom Serum",
      how: "Four drops. Bakuchiol works best overnight.",
      photo: "photo-1764694187667-f28a05a52c0e",
    },
    {
      step: "Nourish",
      product: "Amber Facial Oil",
      how: "Warm two drops between palms and press in.",
      photo: "photo-1781344116880-029945a42b75",
    },
  ],
};
type Time = keyof typeof rituals;

export default function FloreaRitual() {
  const [t, setT] = useState<Time>("morning");

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-5xl font-medium tracking-tight md:text-6xl">
            Your three-minute <em>ritual</em>
          </h2>
          <div className="mt-8 inline-flex rounded-full bg-secondary p-1">
            {(["morning", "evening"] as Time[]).map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setT(x)}
                className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm capitalize ${t === x ? "text-primary-foreground" : "text-secondary-foreground"}`}
              >
                {t === x && (
                  <motion.span
                    layoutId="florea-time"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {x === "morning" ? <Sun className="size-4" /> : <Moon className="size-4" />} {x}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={t}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {rituals[t].map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative mx-auto aspect-[3/4] max-w-xs overflow-hidden rounded-t-full rounded-b-[var(--radius)] bg-secondary">
                  <img src={img(s.photo)} alt={s.product} loading="lazy" className="size-full object-cover" />
                  <span className="absolute top-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-background font-display text-xl italic">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-6 text-sm tracking-[0.2em] text-muted-foreground">{s.step.toUpperCase()}</p>
                <h3 className="mt-1 font-display text-3xl">{s.product}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{s.how}</p>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
        <div className="mt-12 text-center">
          <a href="#" className="inline-block rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground">
            Shop the {t} set · save 15%
          </a>
        </div>
      </div>
    </section>
  );
}
