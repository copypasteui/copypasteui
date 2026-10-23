"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Ticket } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
// Picking windows as [startMonth, endMonth], 0-indexed.
const crops = [
  { name: "Strawberries", from: 5, to: 7 },
  { name: "Raspberries", from: 6, to: 9 },
  { name: "Sweetcorn", from: 7, to: 8 },
  { name: "Apples", from: 8, to: 10 },
  { name: "Pumpkins", from: 8, to: 9 },
  { name: "Christmas trees", from: 10, to: 11 },
];
const events = [
  {
    date: "Sat 25 – Fri 31 Oct",
    title: "Pumpkin Festival",
    body: "Pick your own, hay maze, tractor rides and soup in the barn.",
    price: "£6 adults · kids free",
    photo: "photo-1635340690790-a3020cb9e7e6",
  },
  {
    date: "Sun 9 Nov",
    title: "Apple Pressing Day",
    body: "Bring your windfalls and go home with a gallon of juice.",
    price: "Free, donations welcome",
    photo: "photo-1761839258671-6495fdc188b3",
  },
  {
    date: "From Sat 29 Nov",
    title: "Christmas Tree Fields",
    body: "Choose and cut your own Nordmann fir, hot chocolate included.",
    price: "Trees from £45",
    photo: "photo-1633630663326-2b48b25c6fb2",
  },
];
const NOW = 9;

export default function HollowCreekSeasons() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl font-bold">On the farm this season</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {events.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius)] border-2 border-foreground bg-card text-card-foreground"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img(e.photo)}
                  alt={e.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-[var(--radius)] bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  {e.date}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold">{e.title}</h3>
                <p className="mt-2 text-muted-foreground">{e.body}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <span className="text-sm font-semibold">{e.price}</span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <Ticket className="size-4" /> Tickets
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 rounded-[var(--radius)] bg-secondary p-6 text-secondary-foreground md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-2xl font-bold">Pick-your-own calendar</p>
            <p className="text-sm text-muted-foreground">Weather permitting. Check the board on the homepage before you come.</p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[9rem_repeat(12,1fr)] text-center text-xs font-bold text-muted-foreground">
                <span />
                {months.map((m, i) => (
                  <span key={i} className={i === NOW ? "text-primary" : ""}>
                    {m}
                  </span>
                ))}
              </div>
              <div className="relative mt-2 space-y-2">
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-primary"
                  style={{ left: `calc(9rem + (100% - 9rem) * ${(NOW + 0.5) / 12})` }}
                />
                {crops.map((c, i) => (
                  <div
                    key={c.name}
                    onMouseEnter={() => setHover(c.name)}
                    onMouseLeave={() => setHover(null)}
                    className="grid grid-cols-[9rem_repeat(12,1fr)] items-center"
                  >
                    <span className={`text-sm font-semibold transition-colors ${hover === c.name ? "text-primary" : ""}`}>{c.name}</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className={`h-6 origin-left rounded-full transition-colors ${hover === c.name ? "bg-primary" : c.from <= NOW && NOW <= c.to ? "bg-accent" : "bg-border"}`}
                      style={{ gridColumn: `${c.from + 2} / ${c.to + 3}` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
