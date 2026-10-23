"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 160) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const coaches = {
  Marcus: "photo-1764546373114-2d7a87221733",
  Jo: "photo-1548382131-e0ebb1f0cdea",
  Theo: "photo-1757620765404-a1ee66df5e27",
};
type Coach = keyof typeof coaches;
type Slot = { time: string; name: string; coach: Coach; spots: number; total: number };

const week: Record<string, Slot[]> = {
  Mon: [
    { time: "06:00", name: "Engine", coach: "Jo", spots: 3, total: 16 },
    { time: "12:15", name: "Kettlebell Flow", coach: "Theo", spots: 9, total: 14 },
    { time: "18:30", name: "Heavy Lifts", coach: "Marcus", spots: 0, total: 12 },
    { time: "19:45", name: "Fight Club", coach: "Jo", spots: 5, total: 18 },
  ],
  Tue: [
    { time: "06:30", name: "Barbell Basics", coach: "Marcus", spots: 6, total: 8 },
    { time: "17:30", name: "Bag Rounds", coach: "Theo", spots: 11, total: 20 },
    { time: "19:00", name: "Engine", coach: "Jo", spots: 2, total: 16 },
  ],
  Wed: [
    { time: "06:00", name: "Heavy Lifts", coach: "Marcus", spots: 4, total: 12 },
    { time: "12:15", name: "Engine", coach: "Jo", spots: 7, total: 16 },
    { time: "18:30", name: "Fight Club", coach: "Theo", spots: 1, total: 18 },
  ],
  Thu: [
    { time: "07:00", name: "Kettlebell Flow", coach: "Theo", spots: 10, total: 14 },
    { time: "18:00", name: "Heavy Lifts", coach: "Marcus", spots: 3, total: 12 },
  ],
  Fri: [
    { time: "06:00", name: "Engine", coach: "Jo", spots: 8, total: 16 },
    { time: "17:30", name: "Friday Finisher", coach: "Theo", spots: 12, total: 24 },
  ],
};

export default function PulseTimetable() {
  const days = Object.keys(week);
  const [day, setDay] = useState(days[0]!);
  const [booked, setBooked] = useState<string[]>([]);

  return (
    <section className="bg-foreground px-6 py-24 font-sans text-background">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-6xl leading-[0.9] uppercase md:text-7xl">This week</h2>
          <div className="grid grid-cols-5 gap-1 rounded-[var(--radius)] bg-background/10 p-1">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`relative rounded-[calc(var(--radius)-2px)] px-4 py-2 text-sm font-bold uppercase ${day === d ? "text-accent-foreground" : "text-background/90"}`}
              >
                {day === d && <motion.span layoutId="pulse-day" className="absolute inset-0 rounded-[calc(var(--radius)-2px)] bg-accent" />}
                <span className="relative">{d}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-10 divide-y divide-background/10 border-y border-background/10"
          >
            {(week[day] ?? []).map((s) => {
              const id = `${day}-${s.time}`;
              const isBooked = booked.includes(id);
              const left = s.spots - (isBooked ? 1 : 0);
              const full = s.spots === 0;
              return (
                <li key={id} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[90px_1fr_180px_auto]">
                  <span className="font-display text-3xl">{s.time}</span>
                  <div className="flex items-center gap-3">
                    <img src={img(coaches[s.coach])} alt={s.coach} className="size-11 rounded-full object-cover grayscale" />
                    <div>
                      <p className="font-display text-2xl leading-none uppercase">{s.name}</p>
                      <p className="mt-1 text-xs tracking-wider text-background/90 uppercase">with {s.coach}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-background/15">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((s.total - left) / s.total) * 100}%` }}
                        className={`h-full ${full ? "bg-background/40" : "bg-accent"}`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-background/90">
                      {full ? "Full: join the waitlist" : `${left} of ${s.total} spots left`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBooked((b) => (isBooked ? b.filter((x) => x !== id) : [...b, id]))}
                    className={`min-w-24 rounded-[var(--radius)] px-4 py-2.5 text-sm font-bold uppercase transition ${
                      isBooked
                        ? "bg-accent text-accent-foreground"
                        : full
                          ? "border border-background/25 text-background/70 hover:border-background"
                          : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {isBooked ? (
                      <span className="flex items-center justify-center gap-1">
                        <Check className="size-4" /> Booked
                      </span>
                    ) : full ? (
                      "Waitlist"
                    ) : (
                      "Book"
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
        <p className="mt-5 text-sm text-background/90">Members book up to 7 days ahead. Cancel free until 2 hours before class.</p>
      </div>
    </section>
  );
}
