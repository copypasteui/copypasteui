"use client";

import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";

const img = (id: string, w = 160) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const notes = [
  {
    text: "The cardamom buns ruined every other bun for me. I plan my Saturday runs around this place.",
    name: "Eilidh",
    rot: -3,
    face: "photo-1494790108377-be9c29b29330",
    tone: "bg-card",
  },
  {
    text: "They made my daughter a unicorn cake with zero notice. Absolute heroes.",
    name: "Dev",
    rot: 2,
    face: "photo-1500648767791-00dcc994a43e",
    tone: "bg-accent text-accent-foreground",
  },
  {
    text: "Best sourdough in the city and I will fight about it.",
    name: "Marguerite",
    rot: -1.5,
    face: "photo-1548382131-e0ebb1f0cdea",
    tone: "bg-card",
  },
  {
    text: "Friendly staff, dog biscuits behind the counter, and the almond croissant is unreal.",
    name: "Sam & Biscuit",
    rot: 3,
    face: "photo-1506794778202-cad84cf45f1d",
    tone: "bg-background",
  },
  {
    text: "We order the brunch box every birthday. It’s become a family tradition.",
    name: "The Okafors",
    rot: -2.5,
    face: "photo-1489278353717-f64c6ee8a4d2",
    tone: "bg-card",
  },
  {
    text: "Their baking class was the best £45 I’ve spent this year.",
    name: "Lena",
    rot: 1.5,
    face: "photo-1758599543111-36ce5c34fceb",
    tone: "bg-accent text-accent-foreground",
  },
];

export default function CrumbReviews() {
  return (
    <section className="overflow-hidden bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Heart className="size-4 fill-current" /> Notes from the counter
          </p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Loved on Mill Lane</h2>
          <p className="mt-4 inline-flex items-center gap-2 text-muted-foreground">
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            4.7 on Google · 1,312 reviews
          </p>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {notes.map((n, i) => (
            <motion.figure
              key={n.name}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: n.rot }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: (i % 3) * 0.08 }}
              className={`relative mb-6 break-inside-avoid rounded-[var(--radius)] p-7 shadow-lg shadow-foreground/5 ${n.tone}`}
            >
              <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 rounded-sm bg-primary/20" />
              <blockquote className="font-display text-xl leading-snug">“{n.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm font-semibold">
                <img src={img(n.face)} alt="" className="size-9 rounded-full object-cover" />
                {n.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
