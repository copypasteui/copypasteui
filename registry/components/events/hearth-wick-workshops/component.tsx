"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Users } from "lucide-react";

const dates = [
  { date: "Sat 8 November", time: "10am to 12pm", left: 4 },
  { date: "Sat 8 November", time: "2pm to 4pm", left: 0 },
  { date: "Thu 13 November", time: "6:30pm to 8:30pm", left: 7 },
  { date: "Sat 22 November", time: "10am to 12pm", left: 2 },
];

export default function HearthWickWorkshops() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <section id="workshops" className="bg-secondary px-6 py-20 font-sans text-secondary-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Pour your own candle</h2>
          <p className="mt-5 text-lg">
            Two hours at the workbench with Ruth. You blend a scent from twelve oils, pour two 200g candles and take them home the next day.
          </p>
          <p className="mt-6 flex items-center gap-2 font-semibold">
            <Users className="size-5" aria-hidden /> £45 a person, eight to a class
          </p>
        </div>
        <ul className="grid gap-3">
          {dates.map((d, i) => {
            const full = d.left === 0;
            return (
              <motion.li
                key={d.date + d.time}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  type="button"
                  disabled={full}
                  aria-pressed={picked === i}
                  onClick={() => setPicked(i)}
                  className={`flex w-full items-center justify-between gap-4 rounded-[var(--radius)] p-5 text-left disabled:opacity-60 ${picked === i ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
                >
                  <span className="flex items-center gap-3">
                    <CalendarDays className="size-5 shrink-0" aria-hidden />
                    <span>
                      <span className="block font-semibold">{d.date}</span>
                      <span className="block text-sm">{d.time}</span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold">{full ? "Full" : `${d.left} left`}</span>
                </button>
              </motion.li>
            );
          })}
          <li>
            <a
              href="#"
              aria-disabled={picked === null}
              className={`mt-2 block rounded-[var(--radius)] px-6 py-4 text-center font-semibold ${picked === null ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}
            >
              {picked === null ? "Pick a date" : `Book ${dates[picked]!.date}, ${dates[picked]!.time}`}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
