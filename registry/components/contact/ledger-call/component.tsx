"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Webcam } from "lucide-react";

const img = (id: string, w = 200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const week = [
  { d: "Mon", n: 20, slots: ["09:30", "11:00", "14:30"] },
  { d: "Tue", n: 21, slots: ["10:00", "16:00"] },
  { d: "Wed", n: 22, slots: ["09:00", "12:30", "15:00", "17:30"] },
  { d: "Thu", n: 23, slots: ["11:30", "13:00"] },
  { d: "Fri", n: 24, slots: ["09:30", "10:30"] },
];

export default function LedgerCall() {
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <section id="call" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[calc(var(--radius)*2)] border border-border bg-card text-card-foreground shadow-xl shadow-foreground/5 md:grid-cols-[1fr_1.4fr]">
        <div className="bg-secondary p-8 text-secondary-foreground">
          <img src={img("photo-1758518727592-706e80ebc354")} alt="" className="size-14 rounded-full object-cover" />
          <p className="mt-4 text-sm text-muted-foreground">Anna Kowalski, ACA</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Free 15-minute call</h2>
          <p className="mt-3 flex items-center gap-2 text-sm">
            <Webcam className="size-4" /> Video or phone, your choice
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["We’ll look at your situation", "Tell you which plan fits (if any)", "Handle the switch from your old accountant"].map(
              (x) => (
                <li key={x} className="flex gap-2">
                  <Check className="size-4 shrink-0 text-primary" /> {x}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="ok"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col items-center justify-center py-10 text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-7" />
                </span>
                <p className="mt-5 font-display text-2xl font-bold">
                  Booked for {week[day]!.d} {week[day]!.n} Oct, {slot}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">A calendar invite is on its way.</p>
              </motion.div>
            ) : (
              <motion.div key="pick" exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">October 2026</p>
                  <div className="flex gap-1">
                    <button type="button" aria-label="Previous week" className="grid size-8 place-items-center rounded-full hover:bg-muted">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button type="button" aria-label="Next week" className="grid size-8 place-items-center rounded-full hover:bg-muted">
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {week.map((w, i) => (
                    <button
                      key={w.n}
                      type="button"
                      onClick={() => {
                        setDay(i);
                        setSlot(null);
                      }}
                      aria-pressed={day === i}
                      className={`rounded-[var(--radius)] py-3 text-center transition ${day === i ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <span className="block text-xs opacity-90">{w.d}</span>
                      <span className="font-display text-xl font-bold">{w.n}</span>
                    </button>
                  ))}
                </div>
                <motion.div
                  key={day}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3"
                >
                  {week[day]!.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      aria-pressed={slot === s}
                      className={`rounded-[var(--radius)] border py-3 text-sm font-semibold tabular-nums transition ${slot === s ? "border-primary bg-secondary text-secondary-foreground" : "border-border hover:border-primary"}`}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (slot) setDone(true);
                  }}
                  className="mt-6 space-y-3"
                >
                  <input
                    required
                    type="email"
                    placeholder="Your email"
                    aria-label="Email"
                    className="w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                  <button
                    type="submit"
                    disabled={!slot}
                    className="w-full rounded-[var(--radius)] bg-primary py-3.5 font-semibold text-primary-foreground disabled:opacity-40"
                  >
                    {slot ? `Confirm ${week[day]!.d} at ${slot}` : "Choose a time"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
