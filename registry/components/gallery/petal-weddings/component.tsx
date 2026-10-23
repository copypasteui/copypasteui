"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const work = [
  {
    photo: "photo-1523694576729-dc99e9c0f9b4",
    alt: "Bride holding a white rose bouquet",
    cap: "Bridal bouquet · Preston Manor",
    cls: "row-span-2",
  },
  { photo: "photo-1457089328109-e5d9bd499191", alt: "Tall centrepiece of mixed flowers", cap: "Table centrepieces · The Grand", cls: "" },
  { photo: "photo-1639696194673-67b86204b885", alt: "The flower shop full of blooms at night", cap: "Our shop, Kemp Town", cls: "" },
  {
    photo: "photo-1531058240690-006c446962d8",
    alt: "Florist arranging flowers at the workbench",
    cap: "Behind the scenes",
    cls: "row-span-2",
  },
  { photo: "photo-1572454591674-2739f30d8c40", alt: "Peach rose arrangement in a glass vase", cap: "Reception flowers", cls: "" },
  { photo: "photo-1587317996237-eddd7e834d84", alt: "White poppies in an amber vase", cap: "Minimal styling", cls: "" },
];

export default function PetalWeddings() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold opacity-90">Weddings &amp; events</p>
            <h2 className="mt-3 max-w-2xl font-display text-5xl leading-tight md:text-6xl">
              Over 300 weddings since 2016, from registry offices to marquees.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary-foreground px-6 py-3.5 font-semibold text-primary md:self-auto"
          >
            Request a wedding quote <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {work.map((w, i) => (
            <motion.figure
              key={w.photo}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-[var(--radius)] ${w.cls}`}
            >
              <img
                src={img(w.photo)}
                alt={w.alt}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-card/95 px-4 py-2 text-xs font-semibold text-card-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {w.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <figure className="mx-auto mt-16 max-w-3xl text-center">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 font-display text-3xl leading-snug">
            “Jess understood exactly what we meant by ‘wild but not messy’. Every guest asked who did the flowers.”
          </blockquote>
          <figcaption className="mt-4 text-sm opacity-90">Naomi &amp; Sam, married at Preston Manor, June 2026</figcaption>
        </figure>
      </div>
    </section>
  );
}
