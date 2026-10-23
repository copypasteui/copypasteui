"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    name: "The Harrisons, Cobham",
    project: "Full redesign",
    quote:
      "We had a slope of mud and a trampoline. Now we have three terraces, a kitchen garden and somewhere to sit at 7pm with the sun on our faces.",
    photo: "photo-1722953529218-7ade56b81293",
  },
  {
    name: "Pauline, Weybridge",
    project: "Monthly maintenance",
    quote: "Tom has looked after my garden for eleven years. He knows every rose by name and texts me when the peonies open.",
    photo: "photo-1621272156568-7306716648df",
  },
  {
    name: "Sam & Leo, Esher",
    project: "Patio & planting",
    quote: "The 3D plan meant there were no surprises. It looks exactly like the drawing, only greener.",
    photo: "photo-1538307602205-80b5c2ff26ec",
  },
];

export default function GreenlineReviews() {
  const [i, setI] = useState(0);
  const s = stories[i]!;
  const go = (d: number) => setI((n) => (n + d + stories.length) % stories.length);

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-[calc(var(--radius)*2)]">
          <AnimatePresence initial={false}>
            <motion.img
              key={s.photo}
              src={img(s.photo)}
              alt={`${s.project} garden`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
        </div>
        <div>
          <Quote className="size-10 text-primary" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="mt-4 font-display text-3xl leading-snug font-medium italic md:text-4xl">{s.quote}</blockquote>
              <figcaption className="mt-6">
                <span className="font-semibold">{s.name}</span> <span className="text-muted-foreground">· {s.project}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid size-11 place-items-center rounded-full border border-foreground/30 hover:bg-foreground hover:text-background"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="grid size-11 place-items-center rounded-full border border-foreground/30 hover:bg-foreground hover:text-background"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="ml-3 flex gap-1.5">
              {stories.map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-3 bg-border"}`} />
              ))}
            </div>
          </div>
          <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            410 Google reviews · 70% of new clients come from referrals
          </p>
        </div>
      </div>
    </section>
  );
}
