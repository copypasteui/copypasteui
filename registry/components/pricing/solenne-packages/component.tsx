"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const seasons = { low: "Apr–May · Oct", high: "Jun–Sep" } as const;
type Season = keyof typeof seasons;

const packages = [
  {
    name: "Weekend escape",
    nights: 2,
    photo: "photo-1603532232030-69a8264a71f4",
    price: { low: 520, high: 760 },
    perks: ["Breakfast on your terrace", "Welcome spritz at sunset", "Late checkout until 2pm"],
  },
  {
    name: "The slow week",
    nights: 7,
    photo: "photo-1781455495352-f810d0901497",
    price: { low: 1690, high: 2420 },
    perks: ["Everything in Weekend", "One boat trip for two", "Spa ritual, 60 minutes", "Seventh night on us"],
    featured: true,
  },
  {
    name: "Honeymoon",
    nights: 4,
    photo: "photo-1724618702364-8cde016bda22",
    price: { low: 1340, high: 1880 },
    perks: ["Cliff Villa upgrade", "Private dinner on the rocks", "Couples massage"],
  },
];

export default function SolennePackages() {
  const [season, setSeason] = useState<Season>("high");

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Stay <em>a little longer.</em>
          </h2>
          <div className="flex rounded-full border border-border p-1 text-sm">
            {(Object.keys(seasons) as Season[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeason(s)}
                className={`relative rounded-full px-5 py-2 ${season === s ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {season === s && (
                  <motion.span
                    layoutId="solenne-season"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">
                  {s === "high" ? "High season" : "Shoulder season"} <span>· {seasons[s]}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`flex flex-col overflow-hidden rounded-[var(--radius)] border ${p.featured ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground"}`}
            >
              <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[calc(var(--radius)-6px)]">
                <img src={img(p.photo)} alt="" loading="lazy" className="size-full object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
                  {p.nights} nights
                </span>
                {p.featured && (
                  <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-black">Most booked</span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-4xl">{p.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <motion.span
                    key={season + p.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-5xl"
                  >
                    €{p.price[season].toLocaleString()}
                  </motion.span>
                  <span className={`text-sm ${p.featured ? "opacity-90" : "text-muted-foreground"}`}>for two</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 rounded-full py-3.5 text-center text-sm font-medium transition ${p.featured ? "bg-primary-foreground text-primary hover:opacity-90" : "bg-primary text-primary-foreground hover:opacity-90"}`}
                >
                  Reserve this package
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
