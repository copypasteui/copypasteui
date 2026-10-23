"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Clock, Lock, MapPin, Phone } from "lucide-react";

const areas = ["Family & divorce", "Property", "Wills & probate", "Employment", "Business", "Not sure"];
const times = ["Morning", "Afternoon", "Evening (after 5)"];

export default function HaleConsultation() {
  const [time, setTime] = useState(times[0]!);
  const [sent, setSent] = useState(false);

  return (
    <section id="consult" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm tracking-[0.3em] text-primary uppercase">Free initial call</p>
          <h2 className="mt-4 font-display text-5xl leading-tight font-medium">Twenty minutes, no charge, no obligation.</h2>
          <p className="mt-5 text-muted-foreground">
            Tell us a little about your situation and one of our lawyers will ring you back within one working day.
          </p>
          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-accent" /> 14 Queen Square, Bath BA1 2HN
              <br />
              Free parking for clients
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0 text-accent" /> Mon–Fri 8:30–5:30 · Evening appointments Thursdays
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-accent" /> 01225 000 000
            </li>
          </ul>
        </div>
        <div className="border border-border bg-card p-6 text-card-foreground md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                <span className="mx-auto grid size-14 place-items-center bg-primary text-primary-foreground">
                  <Check className="size-7" />
                </span>
                <p className="mt-6 font-display text-3xl">Thank you.</p>
                <p className="mt-2 text-muted-foreground">
                  A lawyer will call you in the {time.toLowerCase()}, usually within one working day.
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
                className="space-y-5"
              >
                <label className="block text-sm font-medium">
                  Area of law
                  <span className="relative mt-1.5 block">
                    <select className="w-full appearance-none border border-border bg-background px-4 py-3 outline-none focus:border-primary">
                      {areas.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
                  </span>
                </label>
                <label className="block text-sm font-medium">
                  Briefly, what’s happened?
                  <textarea
                    rows={4}
                    className="mt-1.5 w-full border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Name
                    <input
                      required
                      className="mt-1.5 w-full border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    Phone
                    <input
                      required
                      type="tel"
                      className="mt-1.5 w-full border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                    />
                  </label>
                </div>
                <fieldset>
                  <legend className="text-sm font-medium">Best time to call</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        aria-pressed={time === t}
                        className={`border py-2.5 text-sm transition ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className="w-full bg-primary py-4 font-medium text-primary-foreground">
                  Request a call back
                </button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="size-3.5" /> Everything you tell us is confidential, even if you don’t instruct us.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
