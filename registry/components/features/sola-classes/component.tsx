"use client";

import { motion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const classes = [
  {
    name: "Vinyasa flow",
    heat: 3,
    body: "Breath-led sequences that build heat and strength. Music on.",
    photo: "photo-1575052814086-f385e2e2ad1b",
  },
  {
    name: "Reformer pilates",
    heat: 4,
    body: "Springs, straps and slow control. Max 8 people per class.",
    photo: "photo-1747239069226-55382c570116",
  },
  {
    name: "Yin & restore",
    heat: 1,
    body: "Long, supported holds. Bolsters, blankets and very low lighting.",
    photo: "photo-1506126613408-eca07ce68773",
  },
  {
    name: "Mat pilates",
    heat: 3,
    body: "Core, glutes, posture. The class physios send people to.",
    photo: "photo-1763403921315-f2ef8697199f",
  },
];

export default function SolaClasses() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-5xl leading-[1] font-extrabold tracking-tight md:text-6xl">
            Find the class that fits today.
          </h2>
          <p className="max-w-sm text-muted-foreground">Feeling fiery or feeling flat? Each class is rated by how much heat it builds.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[var(--radius)] bg-card text-card-foreground shadow-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={img(c.photo)}
                  alt={c.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold">{c.name}</h3>
                  <span className="flex gap-1" role="img" aria-label={`Intensity ${c.heat} of 4`}>
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={`size-2 rounded-full ${n <= c.heat ? "bg-primary" : "bg-border"}`} />
                    ))}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
