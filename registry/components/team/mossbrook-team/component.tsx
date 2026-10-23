"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";

const img = (id: string, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const team = [
  {
    name: "Dr Priya Nair",
    role: "Clinical director",
    photo: "photo-1758691463582-11aea602cd4a",
    pet: "photo-1561037404-61cd46aa615b",
    petName: "Biscuit, 6",
    petNote: "Jack Russell. Chief taste-tester of treats.",
  },
  {
    name: "Dr Tom Hughes",
    role: "Vet surgeon",
    photo: "photo-1500648767791-00dcc994a43e",
    pet: "photo-1537151608828-ea2b11777ee8",
    petName: "Pickle, 1",
    petNote: "Corgi puppy. Mostly ears.",
  },
  {
    name: "Ellie Shaw",
    role: "Head nurse",
    photo: "photo-1494790108377-be9c29b29330",
    pet: "photo-1596272875729-ed2ff7d6d9c5",
    petName: "Mabel, 9",
    petNote: "Tabby. Runs the reception desk.",
  },
  {
    name: "Jas Kaur",
    role: "Senior groomer",
    photo: "photo-1758599543111-36ce5c34fceb",
    pet: "photo-1772437883387-8076cf660c65",
    petName: "Snowball, 4",
    petNote: "Bichon. Our grooming model.",
  },
];

function Card({ t, i }: { t: (typeof team)[number]; i: number }) {
  const [flip, setFlip] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setFlip((f) => !f)}
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="text-left [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        className="relative aspect-[3/4] [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)] [backface-visibility:hidden]">
          <img src={img(t.photo)} alt={`Portrait of ${t.name}`} className="size-full object-cover" />
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-card-foreground">
            <RefreshCw className="size-3" /> Meet their pet
          </span>
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] overflow-hidden rounded-[var(--radius)] [backface-visibility:hidden]">
          <img src={img(t.pet)} alt={t.petName} className="size-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="font-display text-xl font-bold">{t.petName}</p>
            <p className="text-sm opacity-90">{t.petNote}</p>
          </div>
        </div>
      </motion.div>
      <p className="mt-4 font-display text-xl font-bold">{t.name}</p>
      <span className="sr-only">Show {t.name}’s pet</span>
      <p className="text-sm text-muted-foreground">{t.role}</p>
    </motion.button>
  );
}

export default function MossbrookTeam() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-extrabold tracking-tight">The pet people</h2>
          <p className="max-w-sm">Every one of us goes home to an animal. Hover (or tap) to meet them.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {team.map((t, i) => (
            <Card key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
