"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, MapPin, PawPrint } from "lucide-react";

const reasons = ["Vaccination", "Check-up", "Poorly pet", "Grooming", "Nail clip", "Second opinion"];
const slots = ["09:10", "10:30", "11:50", "14:00", "15:20", "16:40", "18:10"];

export default function MossbrookBooking() {
  const [name, setName] = useState("Biscuit");
  const [reason, setReason] = useState("Check-up");
  const [slot, setSlot] = useState("15:20");
  const [done, setDone] = useState(false);

  return (
    <section id="book" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[var(--radius)] border-2 border-border bg-card p-6 text-card-foreground md:p-10">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Book an appointment</h2>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <motion.span
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground"
                >
                  <PawPrint className="size-8" />
                </motion.span>
                <p className="mt-5 font-display text-3xl font-bold">
                  See you and {name || "your pet"} at {slot}!
                </p>
                <p className="mt-2 text-muted-foreground">We’ve sent a confirmation by text and email.</p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mt-8 space-y-6"
              >
                <label className="block font-semibold">
                  Pet’s name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-full border-2 border-border bg-background px-5 py-3 font-normal outline-none focus:border-primary"
                  />
                </label>
                <fieldset>
                  <legend className="font-semibold">Reason for visit</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        aria-pressed={reason === r}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${reason === r ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  {reason === "Poorly pet" && (
                    <p className="mt-3 rounded-[calc(var(--radius)*0.6)] bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                      If it’s urgent, please call 0113 000 0000 and we’ll see you straight away.
                    </p>
                  )}
                </fieldset>
                <fieldset>
                  <legend className="font-semibold">Tomorrow, Thursday 23rd</legend>
                  <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(s)}
                        aria-pressed={slot === s}
                        className={`rounded-full border-2 py-2 text-sm font-semibold tabular-nums transition ${slot === s ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Your name"
                    aria-label="Your name"
                    className="rounded-full border-2 border-border bg-background px-5 py-3 outline-none focus:border-primary"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile"
                    aria-label="Mobile"
                    className="rounded-full border-2 border-border bg-background px-5 py-3 outline-none focus:border-primary"
                  />
                </div>
                <button type="submit" className="w-full rounded-full bg-primary py-4 font-bold text-primary-foreground">
                  Book {reason.toLowerCase()} for {name || "my pet"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        <aside className="space-y-5">
          <div className="rounded-[var(--radius)] bg-secondary p-6 text-secondary-foreground">
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <Clock className="size-5" /> Opening hours
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Mon – Fri", "8:00 – 19:00"],
                ["Saturday", "9:00 – 16:00"],
                ["Sunday", "10:00 – 13:00"],
                ["Emergencies", "24/7, 365"],
              ].map(([d, h]) => (
                <div key={d} className="flex justify-between">
                  <dt>{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[var(--radius)] border-2 border-border p-6">
            <p className="flex gap-2 font-semibold">
              <MapPin className="size-5 shrink-0 text-accent" /> 7 Kirkstall Road, Leeds LS4 2AA
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Free parking · Separate cat waiting room · Wheelchair accessible</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
