"use client";

import { motion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const steps = [
  {
    n: "01",
    t: "Source",
    b: "Direct relationships with 14 farms. We pay at least 2.5× Fairtrade minimum.",
    photo: "photo-1561986810-4f3ba2f46ceb",
  },
  {
    n: "02",
    t: "Roast",
    b: "Profiled per lot on a 15 kg drum, cupped the next morning before anything ships.",
    photo: "photo-1537130508299-46ab547b4be3",
  },
  {
    n: "03",
    t: "Brew",
    b: "Recipes on every bag and a free brew guide for whatever kit you own.",
    photo: "photo-1619860703338-9c70a1af6a63",
  },
  { n: "04", t: "Enjoy", b: "Not loving it? Tell us and we’ll send something different, free.", photo: "photo-1593443320739-77f74939d0da" },
];

export default function CinderwickFarmToCup() {
  return (
    <section className="bg-primary px-6 py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl leading-[1] font-semibold tracking-tight md:text-7xl">
            From the farm
            <br />
            <em className="bg-accent [box-decoration-break:clone] px-[0.08em] text-accent-foreground">to your cup.</em>
          </h2>
          <p className="max-w-md text-lg opacity-90 md:justify-self-end">
            Four steps, no shortcuts, and the price we paid for every lot printed on the bag.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={i % 2 ? "lg:mt-16" : ""}
            >
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius)]">
                <img
                  src={img(s.photo)}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 grid size-12 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-accent-foreground">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold">{s.t}</h3>
              <p className="mt-2 opacity-90">{s.b}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
