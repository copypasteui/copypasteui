"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Accessibility, Bus, Car, Check, Clock, MapPin } from "lucide-react";

const reasons = ["Check-up", "Hygiene clean", "Toothache", "Whitening", "Aligners", "Something else"];
const times = ["Morning", "Lunchtime", "After 5pm", "Saturday"];

export default function BrightlineBooking() {
  const [patient, setPatient] = useState<"new" | "existing">("new");
  const [reason, setReason] = useState("Check-up");
  const [time, setTime] = useState("After 5pm");
  const [sent, setSent] = useState(false);

  return (
    <section id="book" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-6 text-card-foreground shadow-sm md:p-10">
          <h2 className="font-display text-4xl font-black tracking-tight">Request an appointment</h2>
          <p className="mt-2 text-muted-foreground">We’ll call back within two working hours to confirm a time.</p>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 rounded-[var(--radius)] bg-secondary p-8 text-center text-secondary-foreground"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-7" />
                </span>
                <p className="mt-4 font-display text-2xl font-bold">Thanks, request received.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {reason}, {time.toLowerCase()}. Speak soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-8 space-y-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  {(["new", "existing"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPatient(p)}
                      aria-pressed={patient === p}
                      className={`rounded-[var(--radius)] border-2 py-3 font-semibold transition ${patient === p ? "border-primary bg-secondary text-secondary-foreground" : "border-border"}`}
                    >
                      {p === "new" ? "I’m a new patient" : "I’m already registered"}
                    </button>
                  ))}
                </div>
                <fieldset>
                  <legend className="text-sm font-semibold">What’s it for?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        aria-pressed={reason === r}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${reason === r ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  {reason === "Toothache" && (
                    <p className="mt-3 rounded-[var(--radius)] bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                      In pain now? Call 0113 000 0000 before 10am for a same-day slot.
                    </p>
                  )}
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold">Best time</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        aria-pressed={time === t}
                        className={`rounded-[var(--radius)] border py-2.5 text-sm font-medium ${time === t ? "border-primary text-primary" : "border-border"}`}
                      >
                        {t}
                      </button>
                    ))}
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
                    type="tel"
                    placeholder="Phone"
                    aria-label="Phone"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                </div>
                <button type="submit" className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground">
                  Send request
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[calc(var(--radius)*1.5)] bg-secondary p-6 text-secondary-foreground">
            <p className="flex items-center gap-2 font-display text-xl font-bold">
              <Clock className="size-5 text-primary" /> Opening hours
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Mon – Thu", "8:00 – 19:30"],
                ["Friday", "8:00 – 17:00"],
                ["Saturday", "9:00 – 13:00"],
                ["Sunday", "Closed"],
              ].map(([d, h]) => (
                <div key={d} className="flex justify-between">
                  <dt>{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[calc(var(--radius)*1.5)] border border-border p-6">
            <p className="flex gap-2 font-semibold">
              <MapPin className="size-5 shrink-0 text-primary" /> 41 Otley Road, Headingley, Leeds LS6 3AA
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Car className="size-4" /> 6 free patient parking spaces
              </li>
              <li className="flex gap-2">
                <Bus className="size-4" /> Buses 1, 6 and 28 stop outside
              </li>
              <li className="flex gap-2">
                <Accessibility className="size-4" /> Step-free access, ground-floor surgery
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
