"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const RINGS = 6;
const plans = [
  { name: "Starter", price: "$0", note: "1 agent · 500 tasks / mo", perks: ["Template agents", "Slack & email", "7-day audit log"] },
  {
    name: "Team",
    price: "$299",
    note: "10 agents · 20k tasks / mo",
    perks: ["Custom agents", "Approvals & limits", "120+ integrations", "1-year audit log"],
    hot: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "Unlimited · private cloud",
    perks: ["SSO, SCIM, RBAC", "On-prem runners", "Dedicated engineer", "99.95% SLA"],
  },
];

export default function AetherPricing() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 pt-24 pb-28 font-sans text-foreground">
      {/* neon-rings background, inlined */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {Array.from({ length: RINGS }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 left-1/2 aspect-square w-[40vmax] -translate-x-1/2 translate-y-1/2 rounded-full border border-[color-mix(in_oklab,var(--primary)_70%,white)]"
            animate={{ scale: [0.4, 3], opacity: [0, 0.7, 0] }}
            transition={{ duration: 9, repeat: Infinity, delay: (i * 9) / RINGS, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium text-accent">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Cheaper than the overtime.</h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl border p-8 backdrop-blur-xl ${p.hot ? "border-primary bg-card/80" : "border-border bg-card/50"}`}
            >
              {p.hot && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most teams start here
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-5 font-display text-5xl font-semibold tracking-tight">
                {p.price}
                <span className="text-base font-normal text-muted-foreground">
                  {p.price.startsWith("$") && p.price !== "$0" ? " / mo" : ""}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {p.perks.map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <Check className="size-4 text-accent" /> {x}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 rounded-full py-3 text-center text-sm font-medium transition ${p.hot ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-secondary"}`}
              >
                {p.name === "Enterprise" ? "Talk to us" : "Start free"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
