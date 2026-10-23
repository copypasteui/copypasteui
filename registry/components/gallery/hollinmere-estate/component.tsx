"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const chapters = [
  {
    season: "Spring",
    title: "Budburst & frost watch",
    body: "In April we sleep in shifts, lighting bougies between the rows whenever the thermometer dips below zero.",
    photo: "photo-1563514227147-6d2ff665a6a0",
    alt: "Young vines in neat rows under a low sun",
  },
  {
    season: "Autumn",
    title: "Harvest by hand",
    body: "Every bunch is picked by a crew of forty neighbours over three weeks in October. Lunch is a long, loud affair.",
    photo: "photo-1537640538966-79f369143f8f",
    alt: "Clusters of dark grapes hanging in golden light",
  },
  {
    season: "Winter",
    title: "Two years in the chalk",
    body: "Our sparkling wines rest on their lees for at least 24 months in a cellar dug into the hillside.",
    photo: "photo-1692274073394-6ebd6a68d535",
    alt: "Long cellar tunnel lined with oak barrels",
  },
];

export default function HollinmereEstate() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            A year at <em>Hollinmere</em>
          </h2>
          <p className="max-w-md opacity-90 md:justify-self-end">
            Forty acres, three grape varieties, one family. Here’s what goes into every bottle before it reaches your glass.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {chapters.map((c, i) => (
            <motion.article
              key={c.season}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="group grid overflow-hidden rounded-[var(--radius)] border border-primary-foreground/25 md:grid-cols-2"
            >
              <div className={`relative min-h-[280px] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                <img
                  src={img(c.photo)}
                  alt={c.alt}
                  className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14">
                <p className="font-display text-7xl italic opacity-90">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-xs font-semibold tracking-[0.3em] uppercase opacity-90">{c.season}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{c.title}</h3>
                <p className="mt-4 max-w-md opacity-90">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
