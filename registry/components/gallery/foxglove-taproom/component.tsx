"use client";

import { motion } from "motion/react";
import { Baby, Dog, Pizza, Star, Wifi } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tiles = [
  {
    id: "photo-1778794944415-1656a72993c6",
    alt: "Bartender chatting with guests across the bar",
    cap: "The bar",
    span: "md:col-span-2 md:row-span-2",
  },
  { id: "photo-1687771454203-97d0b08bbeb2", alt: "A flight of five beers on a wooden paddle", cap: "Flights", span: "" },
  { id: "photo-1779591211635-5e3daafab2a2", alt: "Steel fermenting tanks painted with characters", cap: "Tank farm", span: "" },
  { id: "photo-1646241651636-49549005a1a3", alt: "Sunny lounge with sofas and long tables", cap: "The lounge", span: "md:col-span-2" },
];

const perks = [
  { icon: Dog, label: "Dogs welcome" },
  { icon: Baby, label: "Kids until 7pm" },
  { icon: Pizza, label: "Wood-fired pizza" },
  { icon: Wifi, label: "Free Wi-Fi" },
];

export default function FoxgloveTaproom() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">The taproom</p>
            <h2 className="mt-3 max-w-3xl font-display text-6xl leading-[0.9] uppercase md:text-7xl">
              Long tables, loud music, cold beer.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius)] bg-card px-5 py-4 text-card-foreground">
            <span className="font-display text-5xl leading-none">4.6</span>
            <span className="text-sm">
              <span className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              2,950 reviews
            </span>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-[var(--radius)] ${t.span}`}
            >
              <img src={img(t.id)} alt={t.alt} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <figcaption className="absolute bottom-3 left-3 bg-stone-950 px-3 py-1 font-display text-xl tracking-wide text-stone-100 uppercase transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                {t.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {perks.map((p) => (
            <li
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-4 py-2 text-sm font-semibold"
            >
              <p.icon className="size-4" /> {p.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
