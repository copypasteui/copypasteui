"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, X } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const work = [
  { photo: "photo-1734111719430-fe4a3973f8af", alt: "Round brush styling long blonde hair", tag: "Blow-dry", by: "Mia", h: "aspect-[3/4]" },
  {
    photo: "photo-1774660810725-fb04e002003d",
    alt: "Stylist pinning an updo for a seated client",
    tag: "Bridal",
    by: "Mia",
    h: "aspect-square",
  },
  {
    photo: "photo-1634449571010-02389ed0f9b0",
    alt: "Client’s hair being rinsed at the basin",
    tag: "Gloss & tone",
    by: "Tom",
    h: "aspect-[4/5]",
  },
  {
    photo: "photo-1700760934268-8aa0ef52ce0a",
    alt: "Close-up of scissors cutting dark wet hair",
    tag: "Precision bob",
    by: "Céline",
    h: "aspect-[4/3]",
  },
  {
    photo: "photo-1761839256791-6a93f89fb8b0",
    alt: "Laughing client being draped in a cape",
    tag: "Curly cut",
    by: "Jade",
    h: "aspect-[3/4]",
  },
  {
    photo: "photo-1695527081848-1e46c06e6458",
    alt: "Stylist working on a client by the salon window",
    tag: "Balayage",
    by: "Céline",
    h: "aspect-square",
  },
];

export default function VerelleWork() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <h2 className="font-display text-6xl leading-none">Our work</h2>
            <figure className="mt-10">
              <Quote className="size-8 opacity-60" />
              <blockquote className="mt-4 font-display text-3xl leading-snug">
                “Céline fixed three years of box dye in one sitting. I cried. In a good way.”
              </blockquote>
              <figcaption className="mt-4 text-sm opacity-90">Hannah, colour correction</figcaption>
            </figure>
            <a href="#" className="mt-10 inline-block border-b border-primary-foreground pb-1 text-sm font-semibold">
              More on Instagram →
            </a>
          </div>
          <div className="columns-2 gap-4 md:columns-3">
            {work.map((w, i) => (
              <motion.button
                key={w.photo}
                type="button"
                onClick={() => setOpen(i)}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="group relative mb-4 block w-full overflow-hidden rounded-[var(--radius)] text-left"
              >
                <img
                  src={img(w.photo)}
                  alt={w.alt}
                  className={`${w.h} w-full object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  {w.tag} · {w.by}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-6"
            role="dialog"
            aria-modal="true"
            aria-label={work[open]!.alt}
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              src={img(work[open]!.photo, 1600)}
              alt={work[open]!.alt}
              className="max-h-[85vh] rounded-[var(--radius)] object-contain"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 grid size-11 place-items-center rounded-full bg-white text-black"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
