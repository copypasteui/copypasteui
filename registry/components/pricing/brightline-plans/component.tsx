"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus, Plus } from "lucide-react";

const plans = [
  {
    id: "essential",
    name: "Essential",
    adult: 12.5,
    child: 0,
    items: ["2 check-ups a year", "1 hygienist visit", "10% off treatment", "Emergency cover"],
  },
  {
    id: "complete",
    name: "Complete",
    adult: 19.5,
    child: 0,
    items: ["2 check-ups a year", "2 hygienist visits", "20% off treatment", "Emergency cover", "Annual whitening top-up"],
  },
];

const Stepper = ({ label, value, set }: { label: string; value: number; set: (n: number) => void }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="font-semibold">{label}</span>
    <span className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Fewer ${label.toLowerCase()}`}
        onClick={() => set(Math.max(0, value - 1))}
        className="grid size-9 place-items-center rounded-full border border-border hover:border-foreground"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-5 text-center font-display text-xl font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label={`More ${label.toLowerCase()}`}
        onClick={() => set(Math.min(6, value + 1))}
        className="grid size-9 place-items-center rounded-full border border-border hover:border-foreground"
      >
        <Plus className="size-4" />
      </button>
    </span>
  </div>
);

export default function BrightlinePlans() {
  const [plan, setPlan] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const p = plans[plan]!;
  const monthly = adults * p.adult + kids * p.child;
  const payg = adults * (p.id === "complete" ? 55 * 2 + 70 * 2 : 55 * 2 + 70) + kids * 55 * 2;

  return (
    <section id="plans" className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-5xl font-black tracking-tight">Care plans that pay for themselves.</h2>
          <p className="mt-4 max-w-md opacity-90">Spread the cost of routine care. Children under 18 are free when a parent joins.</p>
          <div className="mt-8 inline-flex rounded-full border border-primary-foreground/25 p-1">
            {plans.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setPlan(i)}
                aria-pressed={plan === i}
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold ${plan === i ? "text-primary" : ""}`}
              >
                {plan === i && <motion.span layoutId="bl-plan" className="absolute inset-0 rounded-full bg-primary-foreground" />}
                <span className="relative">{x.name}</span>
              </button>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {p.items.map((x) => (
              <li key={x} className="flex gap-3">
                <Check className="size-5 shrink-0 text-accent" /> {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[calc(var(--radius)*1.5)] bg-card p-8 text-card-foreground shadow-2xl">
          <p className="text-sm font-semibold text-muted-foreground">Who’s joining?</p>
          <div className="mt-5 space-y-4">
            <Stepper label="Adults" value={adults} set={setAdults} />
            <Stepper label="Children" value={kids} set={setKids} />
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Your family pays</p>
            <p className="flex items-baseline gap-2">
              <motion.span
                key={monthly}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-6xl font-black tabular-nums"
              >
                £{monthly.toFixed(2)}
              </motion.span>
              <span className="text-muted-foreground">/ month</span>
            </p>
            {adults + kids > 0 && (
              <p className="mt-2 inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                Saves about £{Math.max(0, Math.round(payg - monthly * 12))} a year vs pay-as-you-go
              </p>
            )}
          </div>
          <a href="#book" className="mt-8 block rounded-full bg-primary py-4 text-center font-semibold text-primary-foreground">
            Join {p.name}
          </a>
        </div>
      </div>
    </section>
  );
}
