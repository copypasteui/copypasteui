"use client";

import { motion } from "motion/react";
import { Award } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const coaches = [
  {
    name: "Marcus Hale",
    role: "Head of Strength",
    photo: "photo-1764546373114-2d7a87221733",
    certs: ["USAW L2", "12 yrs coaching"],
    quote: "Lift heavy, rest properly, repeat for years.",
  },
  {
    name: "Jo Okafor",
    role: "Conditioning & Boxing",
    photo: "photo-1548382131-e0ebb1f0cdea",
    certs: ["ABA coach", "Ex-national squad"],
    quote: "Your engine is built on the days you don’t feel like it.",
  },
  {
    name: "Theo Lindgren",
    role: "Mobility & Kettlebells",
    photo: "photo-1757620765404-a1ee66df5e27",
    certs: ["RKC", "Physio-trained"],
    quote: "Move well first. Then move a lot.",
  },
];

export default function PulseCoaches() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-6xl leading-[0.9] uppercase md:text-8xl">
            Coaches, not
            <br />
            cheerleaders
          </h2>
          <p className="max-w-md text-lg text-muted-foreground md:justify-self-end">
            Every coach holds a recognised qualification and programmes for you personally.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {coaches.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={`group relative aspect-[3/4] overflow-hidden rounded-[var(--radius)] bg-foreground text-background ${i === 1 ? "md:translate-y-12" : ""}`}
            >
              <img
                src={img(c.photo)}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs font-bold tracking-wider text-accent uppercase">{c.role}</p>
                <h3 className="font-display text-4xl uppercase">{c.name}</h3>
                <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm text-background/80 italic">“{c.quote}”</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.certs.map((x) => (
                    <span
                      key={x}
                      className="flex items-center gap-1 rounded-[var(--radius)] bg-background/15 px-2 py-1 text-[11px] font-semibold uppercase backdrop-blur"
                    >
                      <Award className="size-3" /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
