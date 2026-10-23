"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const reviews = [
  {
    name: "Hannah",
    where: "Subscriber, York",
    photo: "photo-1529892485617-25f63cd7b1e9",
    quote: "The Guji tasted like blueberry jam. I didn’t know coffee could do that.",
    rot: -5,
  },
  {
    name: "Tom",
    where: "Home barista, Bristol",
    photo: "photo-1649882453801-d5f84502c3f0",
    quote: "Dialled in my espresso in two shots thanks to the recipe card.",
    rot: 4,
  },
  {
    name: "Aisha",
    where: "Café regular",
    photo: "photo-1497636577773-f1231844b336",
    quote: "Best flat white in the city and the cardamom buns sell out by ten.",
    rot: -2,
  },
  {
    name: "Owen",
    where: "Wholesale partner",
    photo: "photo-1565650839149-2c48a094196c",
    quote: "Consistent, generous with training, and they actually answer the phone.",
    rot: 6,
  },
];

export default function CinderwickPolaroidReviews() {
  return (
    <section className="overflow-hidden bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl text-center">
        <div className="flex items-center justify-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
        </div>
        <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-6xl">3,800 cups of feedback</h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: r.rot }}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.08 }}
            className="relative bg-card p-3 pb-6 text-card-foreground shadow-xl ring-1 ring-border"
          >
            <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-accent/60" aria-hidden />
            <img src={img(r.photo)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            <blockquote className="mt-4 px-1 text-left font-display text-lg leading-snug">“{r.quote}”</blockquote>
            <figcaption className="mt-3 px-1 text-left text-sm text-muted-foreground">
              — {r.name}, {r.where}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
