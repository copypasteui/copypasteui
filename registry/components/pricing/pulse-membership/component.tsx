"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

const plans = [
  { name: "Off-peak", monthly: 39, perks: ["Gym floor 10:00–16:00", "2 classes / week", "App programming"] },
  {
    name: "Unlimited",
    monthly: 69,
    perks: ["24/7 gym floor", "Unlimited classes", "Monthly coach check-in", "Bring a friend free, twice a month"],
    hot: true,
  },
  {
    name: "Coached",
    monthly: 189,
    perks: ["Everything in Unlimited", "Weekly 1:1 session", "Custom program & nutrition", "Body scan every 6 weeks"],
  },
];

export default function PulseMembership() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="join" className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-6xl leading-[0.9] uppercase md:text-8xl">Membership</h2>
          <button
            type="button"
            onClick={() => setAnnual((a) => !a)}
            className="flex items-center gap-3 text-sm font-bold uppercase"
            aria-pressed={annual}
          >
            Monthly
            <span className={`relative h-8 w-14 rounded-full transition ${annual ? "bg-foreground" : "bg-border"}`}>
              <motion.span
                layout
                className={`absolute top-1 size-6 rounded-full ${annual ? "right-1 bg-accent" : "left-1 bg-background"}`}
              />
            </span>
            Annual <span className="rounded-[var(--radius)] bg-accent px-2 py-0.5 text-xs text-accent-foreground">2 months free</span>
          </button>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = annual ? Math.round((p.monthly * 10) / 12) : p.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-[var(--radius)] p-8 ${p.hot ? "bg-foreground text-background" : "border-2 border-foreground bg-background text-foreground"}`}
              >
                {p.hot && (
                  <span className="absolute -top-4 right-6 flex rotate-3 items-center gap-1 rounded-[var(--radius)] bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground uppercase">
                    <Zap className="size-3.5 fill-current" /> Most popular
                  </span>
                )}
                <h3 className="font-display text-4xl uppercase">{p.name}</h3>
                <p className="mt-6 flex items-end gap-1">
                  <span className="font-display text-7xl leading-none">£{price}</span>
                  <span className={`pb-2 text-sm ${p.hot ? "text-background/90" : "text-muted-foreground"}`}>/ month</span>
                </p>
                <p className={`mt-1 text-xs ${p.hot ? "text-background/90" : "text-muted-foreground"}`}>
                  {annual ? `£${price * 12} billed yearly` : "Rolling monthly · cancel anytime"}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {p.perks.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${p.hot ? "bg-accent text-accent-foreground" : "bg-foreground text-background"}`}
                      >
                        <Check className="size-3" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 rounded-[var(--radius)] py-4 text-center font-bold uppercase transition ${p.hot ? "bg-accent text-accent-foreground hover:opacity-90" : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"}`}
                >
                  Start with 7 days free
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
