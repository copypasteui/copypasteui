"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Info } from "lucide-react";

// November 2026 starts on a Sunday; Monday-first grid so pad six cells.
const PAD = 6;
const DAYS = 30;
const booked = new Set([6, 7, 8, 13, 14, 20, 21, 22, 27, 28]);
const cabins = [
  { name: "Larch A-frame", price: 185 },
  { name: "The Bothy", price: 145 },
  { name: "Heron Lodge", price: 290 },
  { name: "Meadow Cabin", price: 210 },
];

export default function PinehollowBooking() {
  const [cabin, setCabin] = useState(0);
  const [range, setRange] = useState<[number, number | null]>([16, 19]);

  const pick = (d: number) => {
    const [a, b] = range;
    if (b !== null || d <= a) return setRange([d, null]);
    for (let x = a; x < d; x++) if (booked.has(x)) return setRange([d, null]);
    setRange([a, d]);
  };
  const [start, end] = range;
  const nights = end ? end - start : 0;
  const price = cabins[cabin]!.price;
  const cleaning = 45;

  return (
    <section id="book" className="bg-background py-20 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[calc(var(--radius)*2)] border border-border bg-card p-6 text-card-foreground md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-bold">November 2026</h2>
            <label className="relative">
              <span className="sr-only">Cabin</span>
              <select
                value={cabin}
                onChange={(e) => setCabin(Number(e.target.value))}
                className="appearance-none rounded-[var(--radius)] border border-border bg-background py-2 pr-10 pl-4 text-sm font-semibold outline-none focus:border-ring"
              >
                {cabins.map((c, i) => (
                  <option key={c.name} value={i}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
            </label>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <span key={d} className="py-2">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: PAD }).map((_, i) => (
              <span key={`p${i}`} />
            ))}
            {Array.from({ length: DAYS }, (_, i) => i + 1).map((d) => {
              const isBooked = booked.has(d);
              const edge = d === start || d === end;
              const inside = end !== null && d > start && d < end;
              return (
                <button
                  key={d}
                  type="button"
                  disabled={isBooked}
                  onClick={() => pick(d)}
                  aria-pressed={edge || inside}
                  className={`relative aspect-square rounded-[var(--radius)] text-sm font-semibold tabular-nums transition disabled:cursor-not-allowed disabled:text-muted-foreground disabled:line-through ${
                    edge
                      ? "bg-primary text-primary-foreground"
                      : inside
                        ? "bg-secondary text-secondary-foreground"
                        : isBooked
                          ? "bg-muted"
                          : "hover:bg-secondary"
                  }`}
                >
                  {d}
                  {edge && (
                    <motion.span
                      layoutId={d === start ? "ph-start" : "ph-end"}
                      className="absolute inset-0 rounded-[var(--radius)] ring-2 ring-accent ring-offset-2 ring-offset-card"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary" /> Your stay
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-3 rounded-sm bg-muted ring-1 ring-border" /> Booked
            </span>
            <span className="inline-flex items-center gap-2">
              <Info className="size-3.5" /> Changeover days: Mon &amp; Fri
            </span>
          </div>
        </div>

        <aside className="flex flex-col rounded-[calc(var(--radius)*2)] bg-primary p-8 text-primary-foreground">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase opacity-90">Your stay</p>
          <p className="mt-3 font-display text-4xl font-bold">{cabins[cabin]!.name}</p>
          <p className="mt-2 opacity-90">
            {end ? `${start}–${end} November · ${nights} nights` : `Arriving ${start} November. Pick a departure date`}
          </p>
          <dl className="mt-8 space-y-3 border-t border-primary-foreground/20 pt-6 text-sm">
            <div className="flex justify-between">
              <dt>
                £{price} × {nights || "–"} nights
              </dt>
              <dd className="tabular-nums">£{price * nights}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Cleaning &amp; logs</dt>
              <dd className="tabular-nums">£{nights ? cleaning : 0}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Welcome hamper</dt>
              <dd>Included</dd>
            </div>
            <div className="flex justify-between border-t border-primary-foreground/20 pt-3 font-display text-2xl font-bold">
              <dt>Total</dt>
              <dd className="tabular-nums">£{nights ? price * nights + cleaning : 0}</dd>
            </div>
          </dl>
          <button
            type="button"
            disabled={nights < 2}
            className="mt-auto rounded-[var(--radius)] bg-accent py-4 font-semibold text-accent-foreground transition disabled:opacity-50"
          >
            {nights < 2 ? "Minimum stay is 2 nights" : "Request to book"}
          </button>
          <p className="mt-3 text-center text-xs opacity-90">25% deposit · Free cancellation until 14 days before</p>
        </aside>
      </div>
    </section>
  );
}
