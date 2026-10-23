"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";

// Beer colours approximate the SRM scale, from straw to black.
const beers = [
  {
    n: 1,
    name: "Fieldwork",
    style: "Pilsner",
    abv: 4.6,
    color: "rgb(243 201 74)",
    notes: "Crisp, grassy, Saaz hops",
    pint: 5.2,
    isNew: false,
  },
  {
    n: 2,
    name: "Gold Rush",
    style: "Pale ale",
    abv: 5.0,
    color: "rgb(233 169 47)",
    notes: "Mango, pine, soft bitterness",
    pint: 5.6,
    isNew: false,
  },
  {
    n: 3,
    name: "Hollow Point",
    style: "West Coast IPA",
    abv: 6.2,
    color: "rgb(217 138 31)",
    notes: "Grapefruit, resin, dry finish",
    pint: 6.2,
    isNew: false,
  },
  {
    n: 4,
    name: "Cloud Nine",
    style: "Hazy DIPA",
    abv: 8.0,
    color: "rgb(240 181 74)",
    notes: "Peach, oats, pillowy",
    pint: 7.4,
    isNew: true,
  },
  {
    n: 5,
    name: "Sour Cherry",
    style: "Gose",
    abv: 4.2,
    color: "rgb(184 50 63)",
    notes: "Morello, sea salt, coriander",
    pint: 6.0,
    isNew: false,
  },
  {
    n: 6,
    name: "Red Kite",
    style: "Irish red",
    abv: 5.2,
    color: "rgb(154 58 28)",
    notes: "Toffee, biscuit, smooth",
    pint: 5.6,
    isNew: false,
  },
  {
    n: 7,
    name: "Smoke Signal",
    style: "Porter",
    abv: 6.5,
    color: "rgb(59 29 16)",
    notes: "Beechwood smoke, cocoa",
    pint: 6.0,
    isNew: false,
  },
  {
    n: 8,
    name: "Night Shift",
    style: "Oatmeal stout",
    abv: 5.8,
    color: "rgb(26 14 8)",
    notes: "Espresso, oats, silky",
    pint: 5.8,
    isNew: true,
  },
];

export default function FoxgloveTaplist() {
  const [flight, setFlight] = useState<number[]>([1, 3, 8]);
  const toggle = (n: number) => setFlight((f) => (f.includes(n) ? f.filter((x) => x !== n) : f.length < 4 ? [...f, n] : f));

  return (
    <section id="taps" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-4 border-foreground pb-6">
          <h2 className="font-display text-7xl leading-none uppercase md:text-8xl">On tap</h2>
          <p className="max-w-sm text-muted-foreground">Updated 11:42 today. Pick four for a tasting flight: £12, served on a paddle.</p>
        </div>

        <div className="mt-2 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul>
            {beers.map((b) => {
              const on = flight.includes(b.n);
              return (
                <li key={b.n} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => toggle(b.n)}
                    aria-pressed={on}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 text-left md:grid-cols-[3rem_1fr_6rem_6rem_2.5rem]"
                  >
                    <span className="font-display text-3xl text-muted-foreground">{String(b.n).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-3xl leading-none tracking-wide uppercase transition-colors group-hover:text-primary md:text-4xl">
                          {b.name}
                        </span>
                        {b.isNew && (
                          <span className="rounded-[var(--radius)] bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent-foreground uppercase">
                            New
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {b.style} · {b.notes}
                      </span>
                    </span>
                    <span className="hidden items-center gap-2 text-sm font-semibold md:flex">
                      <span className="size-4 rounded-full ring-1 ring-foreground/20" style={{ background: b.color }} />
                      {b.abv.toFixed(1)}%
                    </span>
                    <span className="hidden font-semibold tabular-nums md:block">£{b.pint.toFixed(2)}</span>
                    <span
                      className={`grid size-9 place-items-center rounded-full border-2 transition ${on ? "rotate-45 border-primary bg-primary text-primary-foreground" : "border-border group-hover:border-foreground"}`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[var(--radius)] bg-foreground p-6 text-background">
              <p className="font-display text-3xl uppercase">Your flight</p>
              <p className="text-sm opacity-70">{flight.length}/4 picked</p>
              <div className="mt-6 flex h-40 items-end justify-around rounded-[var(--radius)] bg-amber-900 px-3 pb-3 shadow-inner">
                {Array.from({ length: 4 }).map((_, i) => {
                  const b = beers.find((x) => x.n === flight[i]);
                  return (
                    <div
                      key={i}
                      className="relative flex h-full w-14 items-end overflow-hidden rounded-t-sm rounded-b-lg border-2 border-white/60 bg-white/10"
                    >
                      <AnimatePresence>
                        {b && (
                          <motion.div
                            key={b.n}
                            initial={{ height: 0 }}
                            animate={{ height: "88%" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-full"
                            style={{ background: b.color }}
                          >
                            <span className="absolute inset-x-0 -top-2 h-3 rounded-full bg-amber-50" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {flight.map((n) => {
                  const b = beers.find((x) => x.n === n)!;
                  return (
                    <li key={n} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="size-3 rounded-full" style={{ background: b.color }} /> {b.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle(n)}
                        aria-label={`Remove ${b.name}`}
                        className="opacity-60 hover:opacity-100"
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <a
                href="#visit"
                className="mt-6 block rounded-[var(--radius)] bg-primary py-3 text-center font-bold tracking-wider text-primary-foreground uppercase"
              >
                Order at the bar · £12
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Cans of every core beer to take home. Growler fills from £9.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
