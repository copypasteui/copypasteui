"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BedDouble, Mountain, Route, Utensils } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const days = [
  {
    d: 1,
    title: "Arrive in Cortina",
    km: 0,
    up: 0,
    alt: 1224,
    stay: "Hotel Ambra, Cortina",
    meals: "Welcome dinner",
    body: "Meet your guide Giulia and the group over aperitivo, then a briefing and a long dinner in town.",
    photo: "photo-1536607961765-592e80bcc19e",
  },
  {
    d: 2,
    title: "Cinque Torri",
    km: 11,
    up: 650,
    alt: 2137,
    stay: "Rifugio Scoiattoli",
    meals: "B · L · D",
    body: "Cable car up, then a ridge walk past WW1 trenches to our first mountain hut.",
    photo: "photo-1627289496743-8a9a08bb228a",
  },
  {
    d: 3,
    title: "Lagazuoi",
    km: 14,
    up: 890,
    alt: 2752,
    stay: "Rifugio Lagazuoi",
    meals: "B · L · D",
    body: "The big one: switchbacks to the highest hut of the trip and the best sunset in the Alps.",
    photo: "photo-1550486686-a496af34a2d5",
  },
  {
    d: 4,
    title: "Fanes plateau",
    km: 16,
    up: 420,
    alt: 2060,
    stay: "Rifugio Fanes",
    meals: "B · L · D",
    body: "A long, gentle descent into the meadows of Fanes, marmots whistling the whole way.",
    photo: "photo-1726091983472-a7da2540c492",
  },
  {
    d: 5,
    title: "Lago di Braies",
    km: 13,
    up: 540,
    alt: 1496,
    stay: "Hotel Lago",
    meals: "B · L · D",
    body: "Over the Sennes plateau and down to the emerald lake. Optional rowing boat at the end.",
    photo: "photo-1775123465209-68d1af71060d",
  },
];

export default function FarstepItinerary() {
  const [sel, setSel] = useState(2);
  const max = Math.max(...days.map((x) => x.alt));
  const pts = days.map((x, i) => [(i / (days.length - 1)) * 1000, 190 - (x.alt / max) * 160] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const d = days[sel]!;

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Featured trip · 8 days</p>
        <h2 className="mt-3 font-display text-5xl font-black tracking-tight md:text-6xl">Dolomites hut to hut</h2>

        <div className="relative mt-12 rounded-[calc(var(--radius)*1.5)] border border-border bg-card px-4 pt-6 pb-4 text-card-foreground">
          <svg viewBox="0 0 1000 200" className="h-40 w-full overflow-visible md:h-48" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="wf-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L1000 200 L0 200 Z`} fill="url(#wf-fill)" />
            <motion.path
              d={path}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
            />
          </svg>
          <div className="absolute inset-x-4 top-6 h-40 md:h-48">
            {pts.map(([x, y], i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSel(i)}
                aria-label={`Day ${days[i]!.d}: ${days[i]!.title}`}
                aria-pressed={sel === i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x / 10}%`, top: `${y / 2}%` }}
              >
                <span
                  className={`grid size-9 place-items-center rounded-full border-4 border-card text-xs font-black transition ${sel === i ? "scale-125 bg-accent text-accent-foreground" : "bg-primary text-primary-foreground hover:scale-110"}`}
                >
                  {days[i]!.d}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Cortina 1,224 m</span>
            <span>High point 2,752 m</span>
            <span>Braies 1,496 m</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*1.5)]">
              <img src={img(d.photo)} alt={d.title} className="size-full object-cover" />
            </div>
            <div>
              <p className="font-display text-sm font-black tracking-widest text-primary uppercase">Day {d.d}</p>
              <h3 className="mt-2 font-display text-4xl font-black tracking-tight">{d.title}</h3>
              <p className="mt-4 text-lg text-muted-foreground">{d.body}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Route, k: "Distance", v: d.km ? `${d.km} km` : "—" },
                  { icon: Mountain, k: "Ascent", v: d.up ? `${d.up} m` : "—" },
                  { icon: BedDouble, k: "Sleep", v: d.stay },
                  { icon: Utensils, k: "Meals", v: d.meals },
                ].map((x) => (
                  <div key={x.k} className="rounded-[var(--radius)] bg-secondary p-3 text-secondary-foreground">
                    <x.icon className="size-4 text-primary" />
                    <dt className="mt-2 text-xs text-muted-foreground">{x.k}</dt>
                    <dd className="text-sm font-semibold">{x.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
