"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Flame, ArrowUpRight } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Kind = "Strength" | "Conditioning" | "Boxing";
const classes: { name: string; kind: Kind; mins: number; level: number; photo: string; blurb: string }[] = [
  {
    name: "Heavy Lifts",
    kind: "Strength",
    mins: 60,
    level: 4,
    photo: "photo-1574680096145-d05b474e2155",
    blurb: "Squat, press, pull. Programmed in 6-week blocks.",
  },
  {
    name: "Engine",
    kind: "Conditioning",
    mins: 45,
    level: 5,
    photo: "photo-1758875569612-94d5e0f1a35f",
    blurb: "Ropes, sleds and intervals. You will sweat.",
  },
  {
    name: "Fight Club",
    kind: "Boxing",
    mins: 60,
    level: 4,
    photo: "photo-1517438322307-e67111335449",
    blurb: "Pad work and technique, no sparring required.",
  },
  {
    name: "Kettlebell Flow",
    kind: "Conditioning",
    mins: 30,
    level: 3,
    photo: "photo-1758875570600-8daf8d2f05f3",
    blurb: "Swings, snatches and complexes on the clock.",
  },
  {
    name: "Barbell Basics",
    kind: "Strength",
    mins: 45,
    level: 2,
    photo: "photo-1761839258420-5c3e2f2e2a74",
    blurb: "Learn the lifts properly. Small groups only.",
  },
  {
    name: "Bag Rounds",
    kind: "Boxing",
    mins: 30,
    level: 3,
    photo: "photo-1716306886418-f84f6d4c2f3a",
    blurb: "Twelve rounds on the heavy bags. Pure cardio.",
  },
];
const filters: ("All" | Kind)[] = ["All", "Strength", "Conditioning", "Boxing"];

export default function PulseClasses() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = classes.filter((c) => f === "All" || c.kind === f);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-6xl leading-[0.9] uppercase md:text-8xl">
            Pick your <span className="bg-accent px-2 text-accent-foreground">poison</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setF(x)}
                className={`rounded-[var(--radius)] border px-4 py-2 text-sm font-bold uppercase transition ${f === x ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.a
                layout
                key={c.name}
                href="#"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-foreground text-background"
              >
                <img
                  src={img(c.photo)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-[var(--radius)] bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground uppercase">
                  {c.kind}
                </span>
                <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-background text-foreground opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="font-display text-4xl uppercase">{c.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-background/80 transition-all duration-500 group-hover:max-h-12">
                    {c.blurb}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-semibold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4" /> {c.mins} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="size-4 text-accent" />
                      {Array.from({ length: 5 }).map((_, k) => (
                        <span key={k} className={`h-2.5 w-1.5 rounded-sm ${k < c.level ? "bg-accent" : "bg-background/25"}`} />
                      ))}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
