"use client";

import { motion } from "motion/react";
import { BadgeCheck, Star } from "lucide-react";

const img = (id: string, w = 120) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const bars = [
  { s: 5, pct: 91 },
  { s: 4, pct: 7 },
  { s: 3, pct: 1 },
  { s: 2, pct: 1 },
  { s: 1, pct: 0 },
];

const reviews = [
  {
    name: "Margaret H.",
    trip: "Wicklow Way",
    date: "Sept 2026",
    face: "photo-1548382131-e0ebb1f0cdea",
    text: "I’m 68 and was nervous about keeping up. Our guide Niamh made sure nobody was ever left behind, and the B&Bs were spotless.",
  },
  {
    name: "Arjun P.",
    trip: "Iceland waterfalls & puffins",
    date: "June 2026",
    face: "photo-1500648767791-00dcc994a43e",
    text: "Every single detail was handled. We just turned up, walked, ate, and stared at puffins. Booking another for my parents.",
  },
  {
    name: "Sophie L.",
    trip: "Dolomites hut to hut",
    date: "Aug 2026",
    face: "photo-1494790108377-be9c29b29330",
    text: "Travelled solo and left with eleven friends. The rifugio dinners were half the reason to go.",
  },
  {
    name: "Daniel K.",
    trip: "Lake Ohrid by kayak",
    date: "July 2026",
    face: "photo-1506794778202-cad84cf45f1d",
    text: "Paddling into a 9th-century monastery for lunch is not something I expected to do this year. Brilliant.",
  },
];

export default function FarstepReviews() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[340px_1fr]">
        <div>
          <h2 className="font-display text-5xl font-black tracking-tight">Travellers say it best.</h2>
          <div className="mt-8 flex items-end gap-3">
            <span className="font-display text-7xl leading-none font-black">4.8</span>
            <span className="pb-2 text-sm opacity-90">
              out of 5<br />
              6,214 verified reviews
            </span>
          </div>
          <ul className="mt-6 space-y-2">
            {bars.map((b, i) => (
              <li key={b.s} className="flex items-center gap-3 text-sm">
                <span className="w-3 tabular-nums">{b.s}</span>
                <Star className="size-3.5 fill-current" />
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-primary-foreground/20">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="block h-full rounded-full bg-accent"
                  />
                </span>
                <span className="w-9 text-right tabular-nums opacity-90">{b.pct}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm">
            <BadgeCheck className="size-4" /> ATOL protected · ABTA member
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col rounded-[calc(var(--radius)*1.5)] bg-card p-6 text-card-foreground ${i % 2 ? "sm:translate-y-8" : ""}`}
            >
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <img src={img(r.face)} alt="" className="size-10 rounded-full object-cover" />
                <span className="text-sm">
                  <span className="block font-bold">{r.name}</span>
                  <span className="text-muted-foreground">
                    {r.trip} · {r.date}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
