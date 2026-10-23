"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

const field =
  "mt-2 w-full border-0 border-b border-foreground bg-transparent px-0 py-2 text-lg focus:border-primary focus:ring-0 focus:outline-none";

export default function BrinebankBook() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(`${data.get("people")} on ${data.get("date")} at ${data.get("time")}`);
  };

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none">Book a table</h2>
          <p className="mt-5 text-muted-foreground">
            Tables of two to six, booked up to 30 days ahead. For seven or more, ring us on 01632 960 604. A third of the room is kept for
            walk-ins, so it&rsquo;s worth trying the door.
          </p>
        </div>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="self-start border-y border-foreground py-8"
              role="status"
            >
              <p className="flex items-center gap-3 font-display text-3xl">
                <Check className="size-7 text-primary" aria-hidden /> Request sent
              </p>
              <p className="mt-3 text-muted-foreground">
                {sent}. We&rsquo;ll confirm by text within the hour, and hold the table for 15 minutes.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              onSubmit={submit}
              className="grid gap-6 sm:grid-cols-2"
            >
              <label className="text-sm font-semibold tracking-wide uppercase">
                Name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="text-sm font-semibold tracking-wide uppercase">
                Mobile
                <input name="phone" type="tel" required autoComplete="tel" className={field} />
              </label>
              <label className="text-sm font-semibold tracking-wide uppercase">
                Date
                <input name="date" type="date" required className={field} />
              </label>
              <label className="text-sm font-semibold tracking-wide uppercase">
                Time
                <span className="relative block">
                  <select name="time" className={`${field} appearance-none pr-8`}>
                    {["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:30"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2" />
                </span>
              </label>
              <label className="text-sm font-semibold tracking-wide uppercase">
                People
                <span className="relative block">
                  <select name="people" className={`${field} appearance-none pr-8`} defaultValue="2 people">
                    {[2, 3, 4, 5, 6].map((n) => (
                      <option key={n}>{n} people</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2" />
                </span>
              </label>
              <label className="text-sm font-semibold tracking-wide uppercase">
                Allergies or notes
                <input name="notes" className={field} />
              </label>
              <button
                type="submit"
                className="justify-self-start bg-primary px-8 py-3.5 font-semibold text-primary-foreground sm:col-span-2"
              >
                Send booking request
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
