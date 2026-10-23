"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const types = [
  { id: "sole", label: "Sole trader", mult: 1 },
  { id: "ltd", label: "Limited company", mult: 2.1 },
  { id: "land", label: "Landlord", mult: 0.9 },
];
const plans = [
  { name: "Essentials", base: 39, items: ["Annual accounts", "Tax return(s) filed", "Bookkeeping software", "Email support"] },
  {
    name: "Growing",
    base: 69,
    items: [
      "Everything in Essentials",
      "Quarterly VAT returns",
      "Payroll for up to 3",
      "Named accountant, phone & email",
      "Tax-saving review",
    ],
    best: true,
  },
  {
    name: "Complete",
    base: 119,
    items: [
      "Everything in Growing",
      "Monthly bookkeeping done for you",
      "Management accounts",
      "Payroll for up to 10",
      "Two strategy calls a year",
    ],
  },
];

export default function LedgerPlans() {
  const [t, setT] = useState(0);

  return (
    <section id="pricing" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight">Fixed monthly fees</h2>
          <p className="mt-3 text-muted-foreground">Monthly, all-inclusive, VAT on top. Switch from your old accountant for free.</p>
          <div className="mt-8 inline-flex rounded-full bg-card p-1 text-card-foreground">
            {types.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setT(i)}
                aria-pressed={t === i}
                className={`relative rounded-full px-4 py-2.5 text-xs font-semibold whitespace-nowrap sm:px-5 sm:text-sm ${t === i ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {t === i && <motion.span layoutId="ledger-type" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = Math.round((p.base * types[t]!.mult) / 5) * 5 - 1;
            return (
              <motion.article
                key={p.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-[calc(var(--radius)*1.5)] p-8 ${p.best ? "bg-primary text-primary-foreground shadow-2xl" : "bg-card text-card-foreground"}`}
              >
                {p.best && (
                  <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-6 flex items-baseline gap-1">
                  <motion.span
                    key={price}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-6xl font-bold tabular-nums"
                  >
                    £{price}
                  </motion.span>
                  <span className="opacity-90">/mo</span>
                </p>
                <p className="text-sm opacity-90">for {types[t]!.label.toLowerCase()}s</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {p.items.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check className={`size-4 shrink-0 ${p.best ? "" : "text-primary"}`} /> {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#call"
                  className={`mt-8 rounded-[var(--radius)] py-3.5 text-center font-semibold ${p.best ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}
                >
                  Book a call about {p.name}
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
