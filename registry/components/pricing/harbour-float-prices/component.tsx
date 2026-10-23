"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Check } from "lucide-react";

const PLANS = ["Single", "Five-pack", "Monthly"] as const;
type Plan = (typeof PLANS)[number];

const ITEMS: { name: string; prices: Record<Plan, number>; unit: Record<Plan, string>; includes: string[] }[] = [
  {
    name: "Float",
    prices: { Single: 55, "Five-pack": 230, Monthly: 85 },
    unit: { Single: "per float", "Five-pack": "£46 a float, 12 months to use", Monthly: "two floats a month" },
    includes: ["60 minutes in your own room", "Towels, earplugs and shower", "First float £45"],
  },
  {
    name: "Sauna and plunge",
    prices: { Single: 28, "Five-pack": 115, Monthly: 60 },
    unit: { Single: "per 90-minute session", "Five-pack": "£23 a session", Monthly: "unlimited sessions" },
    includes: ["Shared sauna, up to eight", "Two cold tubs at 6°C", "Bring a swimsuit"],
  },
];

function Price({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `£${Math.round(v)}`);
  useEffect(() => {
    if (reduce) mv.set(value);
    else animate(mv, value, { duration: 0.6, ease: "easeOut" });
  }, [value, reduce, mv]);
  return <motion.span className="text-5xl font-bold tabular-nums">{text}</motion.span>;
}

export default function HarbourFloatPrices() {
  const [plan, setPlan] = useState<Plan>("Single");

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold">Prices</h2>
        <div
          role="group"
          aria-label="Choose how you pay"
          className="mx-auto mt-8 inline-flex rounded-full bg-card p-1 text-card-foreground"
        >
          {PLANS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={plan === p}
              onClick={() => setPlan(p)}
              className="relative rounded-full px-5 py-2 text-sm font-semibold"
            >
              {plan === p && <motion.span layoutId="harbour-plan" className="absolute inset-0 rounded-full bg-primary" />}
              <span className={`relative ${plan === p ? "text-primary-foreground" : ""}`}>{p}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {ITEMS.map((it) => (
          <div key={it.name} className="rounded-[var(--radius)] border border-border bg-card p-8 text-card-foreground shadow-xl">
            <h3 className="text-lg font-bold">{it.name}</h3>
            <p className="mt-4">
              <Price value={it.prices[plan]} />
            </p>
            <p className="mt-1 text-muted-foreground">{it.unit[plan]}</p>
            <ul className="mt-6 space-y-2">
              {it.includes.map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden /> {x}
                </li>
              ))}
            </ul>
            <a href="#" className="mt-8 block rounded-[var(--radius)] bg-primary py-3 text-center font-semibold text-primary-foreground">
              Book {it.name.toLowerCase()}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
