"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah W.",
    car: "2018 hatchback",
    text: "Main dealer quoted £740. Gearwright sent me a video showing I only needed pads, and charged £186. Customer for life.",
    saved: 554,
  },
  {
    name: "Imran K.",
    car: "2015 estate",
    text: "Failed MOT on the Tuesday, fixed and re-tested by Wednesday lunchtime. Courtesy car was spotless.",
    saved: 0,
  },
  {
    name: "Jo & Mike",
    car: "2021 hybrid",
    text: "Finally a garage that services hybrids without dealer prices. Clear, friendly and quick.",
    saved: 210,
  },
  {
    name: "Gareth L.",
    car: "2009 van",
    text: "Keeps my work van on the road. They’ll tell you when something can wait and when it really can’t.",
    saved: 0,
  },
];

export default function GearwrightReviews() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl leading-none font-extrabold uppercase italic">
            Don’t take
            <br />
            our word for it.
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-display text-7xl leading-none font-extrabold italic">4.7</span>
            <span className="text-sm">
              <span className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              2,700 Google reviews
            </span>
          </div>
        </div>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col bg-card p-6 text-card-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <div className="flex text-primary group-hover:text-primary-foreground">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-current/15 pt-4 text-sm">
                <span>
                  <span className="block font-bold">{r.name}</span>
                  <span className="opacity-70">{r.car}</span>
                </span>
                {r.saved > 0 && (
                  <span className="bg-foreground px-2 py-1 font-display text-sm font-bold text-background uppercase italic">
                    Saved £{r.saved}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
