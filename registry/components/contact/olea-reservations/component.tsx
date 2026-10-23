"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, MapPin, Minus, Phone, Plus, Users } from "lucide-react";

const days = [
  { d: "Thu", n: "22" },
  { d: "Fri", n: "23" },
  { d: "Sat", n: "24" },
  { d: "Sun", n: "25" },
  { d: "Tue", n: "27" },
  { d: "Wed", n: "28" },
];
const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const full = new Set(["19:30", "20:00"]);

export default function OleaReservations() {
  const [guests, setGuests] = useState(2);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("19:00");
  const [done, setDone] = useState(false);

  return (
    <section id="reserve" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[calc(var(--radius)*3)] border border-border bg-card p-6 text-card-foreground shadow-xl shadow-foreground/5 md:p-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Reservations</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Book a table</h2>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-8" />
                </div>
                <p className="mt-6 font-display text-3xl">
                  See you {days[day]!.d} {days[day]!.n} at {time}.
                </p>
                <p className="mt-2 text-muted-foreground">Table for {guests}. A confirmation is on its way to your inbox.</p>
                <button type="button" onClick={() => setDone(false)} className="mt-8 text-sm font-semibold underline underline-offset-4">
                  Change booking
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mt-8 space-y-8"
              >
                <div className="flex items-center justify-between gap-4 rounded-[var(--radius)] bg-muted p-4">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <Users className="size-5" /> Guests
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="Fewer guests"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="grid size-9 place-items-center rounded-full border border-border bg-card hover:border-foreground"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center font-display text-2xl tabular-nums" aria-live="polite">
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="More guests"
                      onClick={() => setGuests((g) => Math.min(8, g + 1))}
                      className="grid size-9 place-items-center rounded-full border border-border bg-card hover:border-foreground"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold">October</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {days.map((d, k) => (
                      <button
                        key={d.n}
                        type="button"
                        aria-pressed={day === k}
                        onClick={() => setDay(k)}
                        className={`rounded-[var(--radius)] border py-3 text-center transition ${day === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                      >
                        <span className="block text-xs opacity-90">{d.d}</span>
                        <span className="block font-display text-2xl">{d.n}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold">Time</legend>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {times.map((t) => {
                      const off = full.has(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={off}
                          aria-pressed={time === t}
                          onClick={() => setTime(t)}
                          className={`rounded-full border py-2.5 text-sm font-semibold tabular-nums transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${time === t ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    aria-label="Full name"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                  <textarea
                    placeholder="Allergies, high chair, celebrating something?"
                    aria-label="Notes"
                    rows={2}
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring sm:col-span-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground hover:opacity-90"
                >
                  Reserve for {guests} · {days[day]!.d} {days[day]!.n}, {time}
                </button>
                <p className="text-center text-xs text-muted-foreground">Parties of 9 or more: call us or ask about private dining.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*3)] bg-muted lg:flex-1">
            <svg viewBox="0 0 400 300" className="absolute inset-0 size-full text-border" aria-hidden>
              <rect width="400" height="300" className="fill-muted" />
              <path d="M0 210 C 90 190, 140 240, 230 215 S 360 170, 400 190 L400 300 L0 300Z" className="fill-secondary" />
              {[40, 100, 160].map((y) => (
                <path key={y} d={`M0 ${y} L400 ${y - 30}`} stroke="currentColor" strokeWidth="10" />
              ))}
              {[80, 210, 320].map((x) => (
                <path key={x} d={`M${x} 0 L${x + 30} 210`} stroke="currentColor" strokeWidth="10" />
              ))}
            </svg>
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-full">
              <span className="relative grid size-12 place-items-center rounded-full bg-accent font-display text-lg text-accent-foreground shadow-xl">
                O
              </span>
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40" />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-card-foreground shadow">
              Harbour, 2 min walk from the pier
            </span>
          </div>
          <ul className="space-y-4 rounded-[calc(var(--radius)*3)] bg-secondary p-6 text-secondary-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0" />
              <span>
                14 Harbour Row, Old Port
                <br />
                Brighton BN1 1PT
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0" />
              <span>
                Tue–Sat 12–3 &amp; 6–11
                <br />
                Sun 12:30–5 · Closed Mon
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0" />
              <a href="tel:+441273000000" className="font-semibold hover:underline">
                01273 000 000
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
