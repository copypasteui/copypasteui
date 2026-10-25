"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Clock, MapPin, Phone } from "lucide-react";

const days = [
  { day: "Thu 30", times: ["3:40pm", "4:20pm"] },
  { day: "Fri 31", times: ["9:20am", "11:00am", "2:00pm"] },
  { day: "Sat 1", times: ["10:00am", "11:00am"] },
  { day: "Mon 3", times: ["9:20am", "1:20pm", "4:20pm"] },
];
const types = ["Eye test", "Contact lens fitting", "Child's eye test"];

export default function ClearwellBook() {
  const [type, setType] = useState(types[0]!);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const current = days[day]!;
  return (
    <section id="book" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Book an appointment</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Pick a time and we&apos;ll text to confirm. Bring your current glasses and a list of any medicines you take.
          </p>
          <ul className="mt-8 grid gap-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0" aria-hidden /> 212 Gloucester Road, Bristol BS7 8NU
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0" aria-hidden /> Mon to Fri 9am to 5:30pm, Sat 9:30am to 4pm
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0" aria-hidden />
              <a href="tel:01174960318" className="underline underline-offset-4">
                0117 496 0318
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-[calc(var(--radius)*1.25)] border border-border bg-card p-6 text-card-foreground md:p-8">
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status" className="py-10 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-7" aria-hidden />
              </span>
              <p className="mt-5 text-xl font-semibold">
                {type}, {current.day} at {time}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">We&apos;ll text you within the hour to confirm.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (time) setSent(true);
              }}
            >
              <fieldset>
                <legend className="text-sm font-semibold">Appointment</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={type === t}
                      onClick={() => setType(t)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${type === t ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-sm font-semibold">Day</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {days.map((d, i) => (
                    <button
                      key={d.day}
                      type="button"
                      aria-pressed={day === i}
                      onClick={() => {
                        setDay(i);
                        setTime(null);
                      }}
                      className={`rounded-[var(--radius)] px-2 py-3 text-sm font-semibold whitespace-nowrap ${day === i ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-sm font-semibold">Time</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={time === t}
                      onClick={() => setTime(t)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${time === t ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Name
                  <input
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold">
                  Mobile
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-[var(--radius)] border border-border bg-background px-4 py-3 font-normal"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={!time}
                className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground disabled:opacity-60"
              >
                {time ? `Book ${current.day} at ${time}` : "Choose a time"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
