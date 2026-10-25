"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Show = { time: string; title: string; year: number; runtime: string; tag?: string };
const week: Record<string, Show[]> = {
  Thu: [
    { time: "18:15", title: "The Long Field", year: 2025, runtime: "1h 52m", tag: "Subtitled" },
    { time: "20:40", title: "Salt Year", year: 2024, runtime: "2h 08m" },
    { time: "23:00", title: "Night Bus to Halifax", year: 1998, runtime: "1h 41m", tag: "35mm" },
  ],
  Fri: [
    { time: "17:30", title: "Salt Year", year: 2024, runtime: "2h 08m" },
    { time: "20:15", title: "Copperhead Summer", year: 2025, runtime: "1h 37m", tag: "Q&A with director" },
  ],
  Sat: [
    { time: "11:00", title: "Pip and the Lighthouse", year: 2023, runtime: "1h 18m", tag: "Kids £4" },
    { time: "15:00", title: "The Long Field", year: 2025, runtime: "1h 52m", tag: "Subtitled" },
    { time: "19:00", title: "Copperhead Summer", year: 2025, runtime: "1h 37m" },
    { time: "21:30", title: "Wire and Ash", year: 1986, runtime: "1h 55m", tag: "35mm" },
  ],
  Sun: [
    { time: "14:00", title: "Salt Year", year: 2024, runtime: "2h 08m", tag: "Relaxed screening" },
    { time: "18:30", title: "The Long Field", year: 2025, runtime: "1h 52m", tag: "Subtitled" },
  ],
};
const days = Object.keys(week);

export default function UndercroftListings() {
  const [day, setDay] = useState(days[0]!);
  return (
    <section id="listings" className="bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground pb-6">
          <h2 className="font-display text-5xl font-medium tracking-tight md:text-7xl">Listings</h2>
          <div role="tablist" aria-label="Day" className="flex border border-foreground">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={day === d}
                onClick={() => setDay(d)}
                className={`border-r border-foreground px-4 py-2 text-sm font-bold uppercase last:border-r-0 ${day === d ? "bg-foreground text-background" : "hover:bg-accent hover:text-accent-foreground"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <motion.div key={day} initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="tabpanel" aria-label={day}>
          <ul className="divide-y divide-foreground border-b border-foreground">
            {week[day]!.map((s) => (
              <li key={s.time + s.title} className="grid gap-2 py-5 sm:grid-cols-[6rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="text-2xl font-bold">{s.time}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium md:text-3xl">{s.title}</h3>
                  <p className="mt-1 text-sm">
                    {s.year} · {s.runtime}
                    {s.tag && <span className="ml-2 bg-accent px-2 py-0.5 text-accent-foreground">{s.tag}</span>}
                  </p>
                </div>
                <a
                  href="#"
                  className="w-fit border border-foreground px-5 py-2.5 text-sm font-bold uppercase hover:bg-foreground hover:text-background"
                >
                  Book seats
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
