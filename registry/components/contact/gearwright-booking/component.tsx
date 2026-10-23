"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Car, Clock, MapPin, Truck } from "lucide-react";

const services = ["MOT · £45", "Full service · £219", "MOT + service · £249", "Diagnostics · £59", "Brakes", "Something else"];
const days = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25"];
const times = ["08:00", "08:30", "09:00", "12:30"];

export default function GearwrightBooking() {
  const [svc, setSvc] = useState(services[2]!);
  const [day, setDay] = useState(2);
  const [time, setTime] = useState("08:30");
  const [extra, setExtra] = useState<"none" | "car" | "collect">("car");

  return (
    <section id="book" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-card p-6 text-card-foreground md:p-8">
          <h2 className="font-display text-5xl font-extrabold uppercase italic">Book your car in</h2>
          <div className="mt-8 space-y-7">
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSvc(s)}
                  aria-pressed={svc === s}
                  className={`px-4 py-2.5 text-sm font-semibold transition ${svc === s ? "bg-foreground text-background" : "bg-muted hover:bg-secondary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">Drop-off</p>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {days.map((d, i) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(i)}
                    aria-pressed={day === i}
                    className={`py-3 text-sm font-bold transition ${day === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    aria-pressed={time === t}
                    className={`border-2 py-2 text-sm font-bold tabular-nums ${time === t ? "border-primary text-primary" : "border-border"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["none", "I’ll wait / drop off", Clock],
                  ["car", "Free courtesy car", Car],
                  ["collect", "Collect & deliver · £20", Truck],
                ] as const
              ).map(([id, l, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setExtra(id)}
                  aria-pressed={extra === id}
                  className={`flex items-center gap-2 border-2 p-3 text-left text-sm font-semibold transition ${extra === id ? "border-foreground bg-foreground text-background" : "border-border"}`}
                >
                  <Icon className="size-4 shrink-0" /> {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="flex flex-col">
          <p className="text-sm font-bold tracking-[0.25em] uppercase opacity-90">Your booking</p>
          <motion.div
            key={`${svc}${day}${time}${extra}`}
            initial={{ opacity: 0.4, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4 space-y-3 border-l-4 border-primary-foreground pl-5"
          >
            <p className="font-display text-3xl font-extrabold uppercase italic">{svc.split(" · ")[0]}</p>
            <p>
              {days[day]} Oct at {time}
            </p>
            <p className="opacity-90">
              {extra === "car"
                ? "Courtesy car ready at the desk"
                : extra === "collect"
                  ? "We’ll collect from your door"
                  : "Waiting room with coffee & Wi-Fi"}
            </p>
          </motion.div>
          <a href="#" className="mt-8 bg-primary-foreground py-4 text-center font-bold tracking-wider text-primary uppercase">
            Confirm booking
          </a>
          <div className="mt-auto space-y-2 pt-10 text-sm opacity-90">
            <p className="flex gap-2">
              <MapPin className="size-4" /> Unit 3, Canal Works, Leeds LS11 5QA
            </p>
            <p className="flex gap-2">
              <Clock className="size-4" /> Mon–Fri 7:30–6 · Sat 8–1
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
