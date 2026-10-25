"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Gareth M., Redland",
    text: "Priya spotted early pressure changes on the scan that two quick tests elsewhere had missed. I'm on drops now and checked every six months.",
  },
  {
    name: "Hannah O., Bishopston",
    text: "My son was nervous. They let him sit on my lap and used animal pictures. Glasses ready in five days.",
  },
  {
    name: "Tom W., Horfield",
    text: "I tried on about thirty frames over an hour and nobody hurried me. The varifocals were right first time, which has never happened before.",
  },
];

export default function ClearwellReviews() {
  return (
    <section className="bg-secondary px-6 py-20 font-sans text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">What patients say</h2>
          <p className="flex items-center gap-2 text-sm">
            <Star className="size-4 fill-primary text-primary" aria-hidden />
            <span>
              <span className="font-semibold">4.8</span> from 412 Google reviews
            </span>
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_1fr_1fr]">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col justify-between rounded-[var(--radius)] border border-border bg-card p-7 text-card-foreground"
            >
              <blockquote className={i === 0 ? "text-xl leading-snug" : "text-base"}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">{r.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
