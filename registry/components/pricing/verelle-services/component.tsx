"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Info } from "lucide-react";

const levels = ["Stylist", "Senior", "Creative director"];
const factor = [1, 1.2, 1.45];

const menu: Record<string, { name: string; note: string; base: number; time: string }[]> = {
  "Cut & style": [
    { name: "Restyle cut & finish", note: "Consultation, wash, cut and blow-dry", base: 58, time: "75 min" },
    { name: "Cut & finish", note: "Keep your shape fresh", base: 48, time: "60 min" },
    { name: "Fringe trim", note: "Free between appointments", base: 0, time: "10 min" },
    { name: "Blow-dry", note: "Smooth, bouncy or undone waves", base: 34, time: "45 min" },
  ],
  Colour: [
    { name: "Balayage", note: "Hand-painted, lived-in brightness", base: 145, time: "3 hrs" },
    { name: "Full head highlights", note: "Foils, toner and finish", base: 120, time: "2.5 hrs" },
    { name: "Root colour", note: "Up to 6 weeks’ regrowth", base: 62, time: "90 min" },
    { name: "Gloss & tone", note: "Refresh and add shine between colours", base: 38, time: "45 min" },
  ],
  Treatments: [
    { name: "Bond repair ritual", note: "For bleached or heat-stressed hair", base: 35, time: "30 min" },
    { name: "Scalp facial", note: "Exfoliate, massage, steam", base: 42, time: "40 min" },
    { name: "Keratin smoothing", note: "Frizz-free for up to 4 months", base: 180, time: "3 hrs" },
  ],
};

export default function VerelleServices() {
  const [tab, setTab] = useState("Colour");
  const [level, setLevel] = useState(1);

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-6xl leading-none md:text-7xl">Services &amp; prices</h2>
          <div className="md:justify-self-end">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Price by stylist level</p>
            <div className="inline-flex rounded-full bg-card p-1 text-card-foreground">
              {levels.map((l, i) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(i)}
                  aria-pressed={level === i}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold ${level === i ? "text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {level === i && <motion.span layoutId="lm-level" className="absolute inset-0 rounded-full bg-primary" />}
                  <span className="relative">{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[200px_1fr]">
          <div role="tablist" className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col">
            {Object.keys(menu).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`text-left font-display text-2xl whitespace-nowrap decoration-primary decoration-2 underline-offset-8 md:text-3xl ${tab === k ? "underline" : "hover:underline"}`}
              >
                {k}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-border border-y border-border"
            >
              {menu[tab]!.map((s) => {
                const price = Math.round(s.base * factor[level]!);
                return (
                  <li key={s.name} className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5">
                    <div>
                      <p className="text-lg font-semibold">
                        {s.name} <span className="ml-2 text-sm font-normal text-muted-foreground">{s.time}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{s.note}</p>
                    </div>
                    <motion.p
                      key={`${s.name}-${level}`}
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                      className="text-2xl font-light tabular-nums"
                    >
                      {s.base === 0 ? "Free" : `£${price}`}
                    </motion.p>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="size-4" /> New colour clients need a skin test 48 hours before. Pop in any time; it takes two minutes.
        </p>
      </div>
    </section>
  );
}
