"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Users } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const experiences = [
  {
    id: "door",
    name: "Cellar door flight",
    price: 15,
    length: "45 min",
    size: "Walk-in",
    photo: "photo-1598306442928-4d90f32c6866",
    body: "Four wines on the terrace with a cheese board from Alsop’s dairy.",
  },
  {
    id: "walk",
    name: "Vineyard walk & lunch",
    price: 65,
    length: "3 hrs",
    size: "Up to 14",
    photo: "photo-1558670460-cad0c19b1840",
    body: "A guided walk through the vines, six wines and a long lunch in the winery.",
  },
  {
    id: "barrel",
    name: "Private barrel room",
    price: 120,
    length: "2 hrs",
    size: "2–8",
    photo: "photo-1643087448435-72f70bd4ce88",
    body: "Taste from the barrel with our winemaker, then rare back vintages.",
  },
];
const dates = ["Thu 23", "Fri 24", "Sat 25", "Sun 26", "Thu 30", "Fri 31"];

export default function HollinmereTastings() {
  const [exp, setExp] = useState("walk");
  const [date, setDate] = useState("Sat 25");
  const [guests, setGuests] = useState(2);
  const e = experiences.find((x) => x.id === exp)!;

  return (
    <section id="tastings" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl md:text-6xl">
          Visit &amp; <em>taste</em>
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {experiences.map((x) => (
            <motion.button
              key={x.id}
              type="button"
              onClick={() => setExp(x.id)}
              aria-pressed={exp === x.id}
              whileHover={{ y: -4 }}
              className={`overflow-hidden rounded-[var(--radius)] bg-card text-left text-card-foreground ring-2 transition ${exp === x.id ? "ring-primary" : "ring-transparent"}`}
            >
              <img src={img(x.photo)} alt="" className="aspect-[16/10] w-full object-cover" />
              <span className="block p-6">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl">{x.name}</span>
                  <span className="font-semibold">£{x.price}</span>
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">{x.body}</span>
                <span className="mt-4 flex gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {x.length}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" /> {x.size}
                  </span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-[var(--radius)] bg-background p-6 text-foreground md:grid-cols-[1fr_auto_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">{e.name} · choose a date</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDate(d)}
                  aria-pressed={date === d}
                  className={`rounded-[var(--radius)] border px-3.5 py-2 text-sm font-semibold transition ${date === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Guests</span>
            <div className="flex items-center rounded-[var(--radius)] border border-border">
              <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="px-3 py-2">
                −
              </button>
              <span className="w-6 text-center font-semibold tabular-nums">{guests}</span>
              <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(8, g + 1))} className="px-3 py-2">
                +
              </button>
            </div>
          </div>
          <a href="#" className="rounded-[var(--radius)] bg-primary px-6 py-4 text-center font-semibold text-primary-foreground">
            Book {date} Oct · £{e.price * guests}
          </a>
        </div>
      </div>
    </section>
  );
}
