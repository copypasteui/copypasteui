"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Clock, Users } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const shifts = [
  { day: "Tue 21", role: "Pantry packing", time: "9:30 – 12:30", needed: 6, filled: 4 },
  { day: "Wed 22", role: "Warm hub host", time: "12:00 – 4:00", needed: 3, filled: 1 },
  { day: "Thu 23", role: "Youth club cook", time: "4:30 – 7:30", needed: 2, filled: 2 },
  { day: "Sat 25", role: "Pantry & deliveries", time: "9:00 – 1:00", needed: 10, filled: 6 },
  { day: "Sun 26", role: "Park clean-up", time: "10:00 – 12:00", needed: 15, filled: 9 },
];

export default function CommonGroundVolunteer() {
  const [mine, setMine] = useState<string[]>([]);

  return (
    <section id="volunteer" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-5xl leading-tight font-extrabold">Give an afternoon, not just a donation.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No experience needed and no minimum commitment. Pick a shift, turn up, we’ll make you a tea and show you the ropes.
          </p>
          <img
            src={img("photo-1758599667729-a6f0f8bd213b")}
            alt="Volunteer with a clipboard leading a park clean-up"
            className="mt-8 aspect-[4/3] w-full rounded-[var(--radius)] object-cover"
          />
        </div>
        <div>
          <p className="font-bold">Shifts this week</p>
          <ul className="mt-4 space-y-3">
            {shifts.map((s, i) => {
              const joined = mine.includes(s.day);
              const filled = s.filled + (joined ? 1 : 0);
              const full = s.filled >= s.needed && !joined;
              return (
                <motion.li
                  key={s.day}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-[var(--radius)] bg-card p-5 text-card-foreground"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-primary">{s.day}</p>
                      <p className="font-display text-xl font-bold">{s.role}</p>
                      <p className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" /> {s.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5" /> {filled}/{s.needed}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={full}
                      onClick={() => setMine((m) => (joined ? m.filter((x) => x !== s.day) : [...m, s.day]))}
                      aria-pressed={joined}
                      className={`inline-flex items-center gap-2 rounded-[var(--radius)] px-5 py-2.5 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${joined ? "bg-primary text-primary-foreground" : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}
                    >
                      {joined ? (
                        <>
                          <Check className="size-4" /> You’re in
                        </>
                      ) : full ? (
                        "Full. Thank you!"
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      animate={{ width: `${Math.min(100, (filled / s.needed) * 100)}%` }}
                      className={`h-full rounded-full ${filled >= s.needed ? "bg-primary" : "bg-accent"}`}
                    />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
