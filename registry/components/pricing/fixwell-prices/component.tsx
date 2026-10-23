"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

const fixed = [
  { job: "Boiler service", price: 89 },
  { job: "Landlord gas safety certificate", price: 75 },
  { job: "EICR (up to 3 bed)", price: 150 },
  { job: "Replace a tap", price: 95 },
  { job: "Unblock a toilet or sink", price: 89 },
  { job: "Install an EV charger", price: 895 },
];

export default function FixwellPrices() {
  const [night, setNight] = useState(false);
  const rates = night ? { first: 145, after: 95, callout: 49 } : { first: 85, after: 65, callout: 0 };

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-5xl font-extrabold tracking-tight">Prices you see before we start.</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Charged in 30-minute blocks after the first hour. VAT included. Parts at trade price + 10%.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div
            className={`rounded-[calc(var(--radius)*1.5)] p-8 transition-colors duration-500 ${night ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl font-bold">Hourly rates</p>
              <button
                type="button"
                onClick={() => setNight((n) => !n)}
                aria-pressed={night}
                className="flex items-center gap-2 rounded-full bg-black/10 p-1 text-sm font-semibold"
              >
                <span className={`flex items-center gap-1 rounded-full px-3 py-1.5 ${!night ? "bg-card text-card-foreground" : ""}`}>
                  <Sun className="size-4" /> 8am–6pm
                </span>
                <span className={`flex items-center gap-1 rounded-full px-3 py-1.5 ${night ? "bg-card text-card-foreground" : ""}`}>
                  <Moon className="size-4" /> Out of hours
                </span>
              </button>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["First hour", rates.first],
                ["Each extra hour", rates.after],
                ["Call-out", rates.callout],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <dt className="text-sm opacity-90">{l}</dt>
                  <motion.dd
                    key={`${l}-${v}`}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-display text-5xl font-extrabold tabular-nums"
                  >
                    £{v}
                  </motion.dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm opacity-90">
              {night ? "Evenings, weekends and bank holidays. Emergency jobs only." : "No call-out fee in working hours, ever."}
            </p>
          </div>

          <div className="rounded-[calc(var(--radius)*1.5)] border-2 border-border bg-card p-8 text-card-foreground">
            <p className="font-display text-2xl font-bold">Fixed-price jobs</p>
            <ul className="mt-6 divide-y divide-border">
              {fixed.map((f, i) => (
                <motion.li
                  key={f.job}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-3.5"
                >
                  <span>{f.job}</span>
                  <span className="font-display text-xl font-bold tabular-nums">£{f.price}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
