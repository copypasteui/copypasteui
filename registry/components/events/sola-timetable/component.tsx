"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 120) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const days = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25", "Sun 26"];
const base = [
  {
    time: "07:00",
    len: 60,
    name: "Sunrise vinyasa",
    level: "All levels",
    teacher: "Priya",
    face: "photo-1494790108377-be9c29b29330",
    spots: 4,
  },
  {
    time: "09:30",
    len: 50,
    name: "Reformer foundations",
    level: "Beginner",
    teacher: "Leo",
    face: "photo-1500648767791-00dcc994a43e",
    spots: 2,
  },
  {
    time: "12:15",
    len: 45,
    name: "Lunchtime flow",
    level: "All levels",
    teacher: "Amara",
    face: "photo-1489278353717-f64c6ee8a4d2",
    spots: 9,
  },
  {
    time: "18:00",
    len: 60,
    name: "Power reformer",
    level: "Intermediate",
    teacher: "Leo",
    face: "photo-1500648767791-00dcc994a43e",
    spots: 0,
  },
  {
    time: "19:30",
    len: 75,
    name: "Yin & sound bath",
    level: "All levels",
    teacher: "Priya",
    face: "photo-1494790108377-be9c29b29330",
    spots: 6,
  },
];

export default function SolaTimetable() {
  const [day, setDay] = useState(3);
  const [booked, setBooked] = useState<string[]>([]);
  // Rotate the order a little per day so each tab feels distinct.
  const classes = base.map((c, i) => ({ ...c, spots: (c.spots + day * (i + 1)) % 11 === 1 ? 0 : (c.spots + day) % 12 }));

  return (
    <section id="timetable" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">This week</h2>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {days.map((d, i) => {
            const [name, num] = d.split(" ");
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDay(i)}
                aria-pressed={day === i}
                className={`flex min-w-16 shrink-0 flex-col items-center rounded-[var(--radius)] px-4 py-3 transition ${day === i ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-background"}`}
              >
                <span className="text-xs font-semibold tracking-wider uppercase opacity-90">{name}</span>
                <span className="font-display text-2xl font-extrabold">{num}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={day}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-3"
          >
            {classes.map((c) => {
              const id = `${day}-${c.time}`;
              const isBooked = booked.includes(id);
              const full = c.spots === 0 && !isBooked;
              return (
                <li
                  key={id}
                  className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 rounded-[var(--radius)] bg-card p-4 text-card-foreground md:grid-cols-[5rem_1fr_10rem_8rem_auto] md:p-5"
                >
                  <span>
                    <span className="block font-display text-xl font-extrabold tabular-nums">{c.time}</span>
                    <span className="text-xs text-muted-foreground">{c.len} min</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{c.name}</span>
                    <span className="text-sm text-muted-foreground">{c.level}</span>
                  </span>
                  <span className="hidden items-center gap-2 text-sm md:flex">
                    <img src={img(c.face)} alt="" className="size-7 rounded-full object-cover" /> {c.teacher}
                  </span>
                  <span
                    className={`hidden text-sm font-semibold md:block ${c.spots > 0 && c.spots <= 3 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {full ? "Waitlist" : `${c.spots} spots left`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBooked((b) => (isBooked ? b.filter((x) => x !== id) : [...b, id]))}
                    aria-pressed={isBooked}
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition ${isBooked ? "bg-primary text-primary-foreground" : full ? "border border-border text-muted-foreground" : "bg-foreground text-background hover:opacity-90"}`}
                  >
                    {isBooked ? (
                      <>
                        <Check className="size-4" /> Booked
                      </>
                    ) : full ? (
                      "Join waitlist"
                    ) : (
                      "Book"
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
