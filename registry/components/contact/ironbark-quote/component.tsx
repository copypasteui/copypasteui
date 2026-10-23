"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Phone } from "lucide-react";

const types = [
  { id: "ext", label: "Extension", rate: [2400, 3200] },
  { id: "loft", label: "Loft conversion", rate: [1900, 2600] },
  { id: "kit", label: "Kitchen", rate: [1500, 2400] },
  { id: "reno", label: "Full renovation", rate: [1300, 1900] },
];
const finishes = ["Standard", "Mid-range", "High-end"];
const k = (n: number) => `£${Math.round(n / 1000)}k`;

export default function IronbarkQuote() {
  const [type, setType] = useState(0);
  const [size, setSize] = useState(30);
  const [finish, setFinish] = useState(1);
  const [sent, setSent] = useState(false);
  const t = types[type]!;
  const mult = [0.9, 1, 1.25][finish]!;
  const low = t.rate[0]! * size * mult;
  const high = t.rate[1]! * size * mult;

  return (
    <section id="quote" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-6xl leading-[0.9] font-black uppercase md:text-7xl">What will it cost?</h2>
          <p className="mt-4 max-w-md opacity-90">A rough budget from 340 real projects. Your fixed quote comes after a free survey.</p>
          <div className="mt-10 space-y-8">
            <div className="grid grid-cols-2 gap-2">
              {types.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setType(i)}
                  aria-pressed={type === i}
                  className={`border-2 px-4 py-3 text-left font-bold transition ${type === i ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/25 hover:border-primary-foreground"}`}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="ib-size" className="flex items-baseline justify-between font-bold">
                Floor area <span className="font-display text-4xl font-black tabular-nums">{size} m²</span>
              </label>
              <input
                id="ib-size"
                type="range"
                min={10}
                max={80}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--accent)]"
              />
            </div>
            <div className="flex gap-2">
              {finishes.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(i)}
                  aria-pressed={finish === i}
                  className={`flex-1 py-3 text-sm font-bold transition ${finish === i ? "bg-primary-foreground text-primary" : "bg-primary-foreground/10"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="border-t border-primary-foreground/20 pt-6">
              <p className="text-sm tracking-widest uppercase opacity-90">Ballpark budget</p>
              <motion.p
                key={`${low}-${high}`}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-7xl font-black tabular-nums"
              >
                {k(low)} – {k(high)}
              </motion.p>
              <p className="text-sm opacity-90">Including VAT, excluding professional fees.</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 text-card-foreground md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full flex-col items-center justify-center py-16 text-center"
              >
                <span className="grid size-16 place-items-center bg-accent text-accent-foreground">
                  <Check className="size-8" />
                </span>
                <p className="mt-6 font-display text-4xl font-black uppercase">Survey requested</p>
                <p className="mt-2 text-muted-foreground">Dan will call within one working day to book a time.</p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <p className="font-display text-4xl font-black uppercase">Book a free survey</p>
                <p className="text-sm text-muted-foreground">
                  {t.label} · about {size} m² · {finishes[finish]!.toLowerCase()} finish
                </p>
                {[
                  ["Name", "text"],
                  ["Email", "email"],
                  ["Phone", "tel"],
                  ["Postcode", "text"],
                ].map(([l, ty]) => (
                  <label key={l} className="block text-sm font-bold">
                    {l}
                    <input
                      required
                      type={ty}
                      className="mt-1.5 w-full border-2 border-border bg-background px-4 py-3 font-normal outline-none focus:border-foreground"
                    />
                  </label>
                ))}
                <label className="block text-sm font-bold">
                  Anything else?
                  <textarea
                    rows={3}
                    placeholder="Drawings, timescales, the dream…"
                    className="mt-1.5 w-full border-2 border-border bg-background px-4 py-3 font-normal outline-none focus:border-foreground"
                  />
                </label>
                <button type="submit" className="w-full bg-primary py-4 font-bold tracking-wider text-primary-foreground uppercase">
                  Request survey
                </button>
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" /> Or call Dan on 020 0000 0000
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
