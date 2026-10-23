"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";

const DAYS = ["Tue 3", "Wed 4", "Thu 5", "Fri 6", "Sat 7", "Sun 8"];
const TIMES = ["10:00", "12:00", "14:00", "16:00", "18:30"];
const FEE = 6;

export default function GlazeDaysBook() {
  const reduce = useReducedMotion();
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [painters, setPainters] = useState(2);
  const ready = day && time;

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-3xl rounded-[calc(var(--radius)*1.4)] bg-card p-6 text-card-foreground shadow-xl md:p-10">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold">Book a painting table</h2>
        <p className="mt-2 text-muted-foreground">Tables are held for 15 minutes. Walk-ins welcome if there&rsquo;s space.</p>

        <fieldset className="mt-8">
          <legend className="font-semibold">Day</legend>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === d}
                onClick={() => setDay(d)}
                className={`rounded-[var(--radius)] py-3 font-semibold ${day === d ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-semibold">Time</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={time === t}
                onClick={() => setTime(t)}
                className={`rounded-full px-4 py-2 font-semibold tabular-nums ${time === t ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-semibold" id="glaze-painters">
            Painters
          </span>
          <div className="flex items-center gap-3" role="group" aria-labelledby="glaze-painters">
            <button
              type="button"
              onClick={() => setPainters((n) => Math.max(1, n - 1))}
              aria-label="One fewer painter"
              className="grid size-10 place-items-center rounded-full bg-muted"
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <span className="w-8 text-center text-xl font-semibold tabular-nums" aria-live="polite">
              {painters}
            </span>
            <button
              type="button"
              onClick={() => setPainters((n) => Math.min(12, n + 1))}
              aria-label="One more painter"
              className="grid size-10 place-items-center rounded-full bg-muted"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {ready && (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mt-8 rounded-[var(--radius)] bg-accent p-5 text-accent-foreground"
            >
              <p className="font-semibold">
                {day} at {time}, {painters} {painters === 1 ? "painter" : "painters"}
              </p>
              <p className="mt-1">Studio fee £{painters * FEE} today, plus the pieces you choose on the day.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          disabled={!ready}
          className="mt-8 w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {ready ? "Hold this table" : "Pick a day and time"}
        </button>
      </div>
    </section>
  );
}
