"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building2, MapPin, ShieldCheck, Video } from "lucide-react";

const types = [
  { id: "initial", name: "Initial assessment", time: "60 min", price: 65 },
  { id: "follow", name: "Follow-up", time: "45 min", price: 55 },
  { id: "sports", name: "Sports massage", time: "45 min", price: 50 },
];
const days = [
  { d: "Wed", n: 22, slots: ["07:30", "12:15", "18:00"] },
  { d: "Thu", n: 23, slots: ["08:15", "13:00", "17:30", "19:00"] },
  { d: "Fri", n: 24, slots: ["07:30", "10:45"] },
  { d: "Sat", n: 25, slots: ["09:00", "10:00", "11:00"] },
];

export default function MotionBooking() {
  const [type, setType] = useState("initial");
  const [where, setWhere] = useState<"clinic" | "video">("clinic");
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState<string | null>("17:30");
  const t = types.find((x) => x.id === type)!;

  return (
    <section id="book" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-5xl font-black tracking-tight uppercase italic md:text-6xl">Book in 60 seconds</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8 rounded-[calc(var(--radius)*1.5)] border-2 border-border bg-card p-6 text-card-foreground md:p-8">
            <div className="grid gap-2 sm:grid-cols-3">
              {types.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setType(x.id)}
                  aria-pressed={type === x.id}
                  className={`rounded-[var(--radius)] border-2 p-4 text-left transition ${type === x.id ? "border-primary bg-secondary text-secondary-foreground" : "border-border hover:border-foreground"}`}
                >
                  <span className="block font-bold">{x.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {x.time} · £{x.price}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["clinic", "In clinic", Building2],
                  ["video", "Video call", Video],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setWhere(id)}
                  aria-pressed={where === id}
                  className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius)] py-3 font-semibold transition ${where === id ? "bg-foreground text-background" : "bg-muted"}`}
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </div>
            <div>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <button
                    key={d.n}
                    type="button"
                    onClick={() => {
                      setDay(i);
                      setSlot(null);
                    }}
                    aria-pressed={day === i}
                    className={`rounded-[var(--radius)] py-3 text-center transition ${day === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
                  >
                    <span className="block text-xs font-semibold uppercase">{d.d}</span>
                    <span className="font-display text-2xl font-black">{d.n}</span>
                  </button>
                ))}
              </div>
              <motion.div key={day} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex flex-wrap gap-2">
                {days[day]!.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    aria-pressed={slot === s}
                    className={`rounded-full border-2 px-5 py-2 text-sm font-bold tabular-nums transition ${slot === s ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>

          <aside className="flex flex-col rounded-[calc(var(--radius)*1.5)] bg-primary p-8 text-primary-foreground">
            <p className="text-sm font-bold tracking-wider uppercase opacity-90">Summary</p>
            <p className="mt-3 font-display text-3xl font-black uppercase italic">{t.name}</p>
            <p className="mt-2 opacity-90">
              {where === "clinic" ? "Clifton clinic" : "Video call"} · {days[day]!.d} {days[day]!.n} Oct{slot ? ` · ${slot}` : ""}
            </p>
            <p className="mt-6 font-display text-5xl font-black">£{t.price}</p>
            <button
              type="button"
              disabled={!slot}
              className="mt-auto rounded-[var(--radius)] bg-accent py-4 font-bold text-accent-foreground transition disabled:opacity-50"
            >
              {slot ? "Confirm booking" : "Choose a time"}
            </button>
            <ul className="mt-6 space-y-2 text-sm opacity-90">
              <li className="flex gap-2">
                <ShieldCheck className="size-4 shrink-0" /> Insured? We bill most insurers directly.
              </li>
              <li className="flex gap-2">
                <MapPin className="size-4 shrink-0" /> 22 Whiteladies Rd, Bristol BS8 2LG
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
