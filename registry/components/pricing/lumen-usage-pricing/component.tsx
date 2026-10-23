"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const steps = [1_000, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000];

function priceFor(q: number) {
  if (q <= 1_000) return 0;
  return Math.round(49 + (q - 1_000) * 0.012);
}

export default function LumenUsagePricing() {
  const [idx, setIdx] = useState(2);
  const queries = steps[idx]!;
  const price = priceFor(queries);
  const enterprise = queries >= 250_000;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Pay for answers, not seats.</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Unlimited users on every plan. First 1,000 questions every month are free.
          </p>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl border border-border bg-card p-6 text-card-foreground md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <label htmlFor="lumen-queries" className="text-sm text-muted-foreground">
              Questions per month
            </label>
            <p className="mt-2 font-display text-5xl font-semibold tracking-tight tabular-nums">
              {queries.toLocaleString()}
              {enterprise ? "+" : ""}
            </p>
            <input
              id="lumen-queries"
              type="range"
              min={0}
              max={steps.length - 1}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
              className="mt-8 w-full accent-[var(--primary)]"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {steps.map((s) => (
                <span key={s}>{s >= 1000 ? `${s / 1000}k` : s}</span>
              ))}
            </div>
            <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Unlimited users & dashboards",
                "All 120+ connectors",
                "Anomaly alerts",
                "Slack & email digests",
                "SQL editor & versioning",
                "SOC 2 Type II",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-foreground p-6 text-background">
            <div>
              <p className="text-sm text-background/90">{enterprise ? "Enterprise" : price === 0 ? "Free" : "Team"}</p>
              <motion.p
                key={price + String(enterprise)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-display text-6xl font-semibold tracking-tight"
              >
                {enterprise ? "Let’s talk" : `$${price}`}
              </motion.p>
              {!enterprise && <p className="mt-1 text-sm text-background/90">per month · billed monthly</p>}
            </div>
            <div className="mt-8 space-y-3">
              <a
                href="#"
                className="block rounded-[var(--radius)] bg-gradient-to-r from-primary to-accent py-3 text-center font-medium text-foreground"
              >
                {enterprise ? "Contact sales" : "Start free"}
              </a>
              <p className="text-center text-xs text-background/90">No card required · cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
