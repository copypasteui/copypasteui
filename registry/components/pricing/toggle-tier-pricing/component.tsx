"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    blurb: "For side projects and trying things out.",
    features: ["1 project", "Community support", "Basic analytics"],
  },
  {
    name: "Pro",
    monthly: 24,
    yearly: 19,
    blurb: "For founders shipping real products.",
    features: ["Unlimited projects", "Custom domains", "Advanced analytics", "Priority email support"],
    highlight: true,
  },
  {
    name: "Team",
    monthly: 79,
    yearly: 64,
    blurb: "For growing teams that collaborate.",
    features: ["Everything in Pro", "10 seats included", "SSO & audit log", "Dedicated Slack"],
  },
];

export default function ToggleTierPricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Simple pricing</h2>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when it pays for itself.</p>

        <div className="mt-8 inline-flex rounded-full border border-border bg-muted p-1 text-sm font-medium">
          {[
            { label: "Monthly", value: false },
            { label: "Yearly −20%", value: true },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => setYearly(o.value)}
              className={`relative rounded-full px-5 py-2 transition-colors ${yearly === o.value ? "text-primary-foreground" : "text-muted-foreground"}`}
            >
              {yearly === o.value && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative flex flex-col rounded-xl border p-8 ${
                t.highlight ? "border-primary bg-card md:-translate-y-3" : "border-border bg-card"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-card-foreground">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1 text-card-foreground">
                <span className="font-display text-5xl font-semibold">$</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={yearly ? "y" : "m"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="font-display text-5xl font-semibold tabular-nums"
                  >
                    {yearly ? t.yearly : t.monthly}
                  </motion.span>
                </AnimatePresence>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-card-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold transition hover:opacity-90 ${
                  t.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {t.monthly === 0 ? "Start free" : `Choose ${t.name}`}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
