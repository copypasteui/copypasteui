"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

// Altitude at the end of each day, in metres; the profile runs Ortisei → Cortina.
const DAYS = [
  { day: 1, from: "Ortisei", to: "Rifugio Firenze", km: 9, up: 1050, sleep: "Mountain hut, rooms of four", alt: 2040 },
  { day: 2, from: "Rifugio Firenze", to: "Seceda ridge and back down", km: 14, up: 780, sleep: "Same hut, second night", alt: 2040 },
  { day: 3, from: "Rifugio Firenze", to: "Passo Gardena", km: 16, up: 910, sleep: "Family-run guesthouse, en suite", alt: 2120 },
  { day: 4, from: "Passo Gardena", to: "Rifugio Puez", km: 12, up: 690, sleep: "Mountain hut, rooms of six", alt: 2475 },
  { day: 5, from: "Rifugio Puez", to: "Rifugio Lavarella", km: 15, up: 640, sleep: "Hut with its own brewery", alt: 2050 },
  { day: 6, from: "Lavarella", to: "Rifugio Lagazuoi", km: 17, up: 1180, sleep: "Highest hut of the week", alt: 2752 },
  { day: 7, from: "Lagazuoi", to: "Cortina", km: 9, up: 120, sleep: "Hotel in Cortina, farewell dinner", alt: 1224 },
];
const START = 1236;
const MAX = 2800;
const MIN = 1100;

const x = (i: number) => (i / DAYS.length) * 1000;
const y = (alt: number) => 220 - ((alt - MIN) / (MAX - MIN)) * 200;
const PATH = [`M0 ${y(START)}`, ...DAYS.map((d, i) => `L${x(i + 1)} ${y(d.alt)}`)].join(" ");

export default function CrestlineRoute() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });
  const [pick, setPick] = useState(0);
  const d = DAYS[pick]!;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-t-4 border-foreground pt-6 md:grid-cols-4">
          <p className="font-bold tracking-tight">01 / Route</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-tight md:col-span-3">
            92 km, Ortisei to Cortina, 5,370 m of climbing
          </h2>
        </div>

        <div ref={ref} className="mt-12">
          <svg viewBox="0 0 1000 240" className="h-auto w-full" aria-hidden>
            {[1500, 2000, 2500].map((a) => (
              <g key={a}>
                <line x1="0" x2="1000" y1={y(a)} y2={y(a)} className="stroke-border" strokeDasharray="4 6" />
                <text x="4" y={y(a) - 6} className="fill-muted-foreground text-[14px]">
                  {a} m
                </text>
              </g>
            ))}
            <motion.path
              d={PATH}
              fill="none"
              className="stroke-primary"
              strokeWidth="4"
              strokeLinejoin="round"
              style={{ pathLength: reduce ? 1 : scrollYProgress }}
            />
            {DAYS.map((day, i) => (
              <circle
                key={day.day}
                cx={x(i + 1)}
                cy={y(day.alt)}
                r={pick === i ? 9 : 6}
                className={pick === i ? "fill-primary" : "fill-foreground"}
              />
            ))}
          </svg>
        </div>

        <div role="group" aria-label="Choose a day" className="mt-6 grid grid-cols-7 border-y border-foreground">
          {DAYS.map((day, i) => (
            <button
              key={day.day}
              type="button"
              aria-pressed={pick === i}
              onClick={() => setPick(i)}
              className={`py-3 font-bold tabular-nums ${pick === i ? "bg-foreground text-background" : "hover:bg-muted"}`}
            >
              {day.day}
            </button>
          ))}
        </div>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4" aria-live="polite">
          <div>
            <dt className="text-sm text-muted-foreground">Day {d.day}</dt>
            <dd className="mt-1 text-lg font-bold">
              {d.from} to {d.to}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Distance</dt>
            <dd className="mt-1 text-lg font-bold">{d.km} km</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Ascent</dt>
            <dd className="mt-1 text-lg font-bold">{d.up.toLocaleString("en-GB")} m</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Overnight</dt>
            <dd className="mt-1 text-lg font-bold">{d.sleep}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
