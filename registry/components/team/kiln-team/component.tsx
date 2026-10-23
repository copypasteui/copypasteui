"use client";

import { motion } from "motion/react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const team = [
  {
    name: "Asha",
    role: "Founder, creative director",
    fact: "Owns 41 typefaces, uses 3",
    photo: "photo-1662850886700-4ec19bd30d11",
    tilt: -3,
  },
  { name: "Jonah", role: "Design lead", fact: "Will fight you about kerning", photo: "photo-1790386436843-76ff0b8fcfca", tilt: 2 },
  { name: "Priya", role: "Developer", fact: "Lighthouse score: 100, always", photo: "photo-1611695434369-a8f5d76ceb7b", tilt: -1.5 },
  { name: "Sam", role: "Strategist & copywriter", fact: "Has never written ‘synergy’", photo: "photo-1568602471122-7832951cc4c5", tilt: 3 },
];

export default function KilnTeam() {
  return (
    <section className="overflow-hidden bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl font-black uppercase [font-stretch:120%] md:text-7xl">
            Small studio,
            <br />
            big opinions.
          </h2>
          <p className="max-w-md text-lg md:justify-self-end">
            You’ll work with the people doing the work. No account managers, no hand-offs, no juniors learning on your budget.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: t.tilt }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.08 }}
              className="group relative rounded-[var(--radius)] bg-card p-3 pb-5 text-card-foreground shadow-xl"
            >
              <div className="relative overflow-hidden rounded-[calc(var(--radius)*0.7)]">
                <img src={img(t.photo)} alt={`Portrait of ${t.name}`} className="aspect-[4/5] w-full object-cover" />
                <span className="absolute inset-x-2 bottom-2 translate-y-3 rounded-full bg-accent px-3 py-1.5 text-center text-xs font-semibold text-accent-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {t.fact}
                </span>
              </div>
              <figcaption className="mt-4 px-1">
                <span className="block font-display text-2xl font-black uppercase [font-stretch:115%]">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
