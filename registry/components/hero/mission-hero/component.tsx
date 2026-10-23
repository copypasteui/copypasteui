"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Droplets, Users, Sprout } from "lucide-react";

const amounts = [10, 25, 50, 100];
const raised = 184_250;
const goal = 250_000;

export default function MissionHero() {
  const [amount, setAmount] = useState(25);
  const [monthly, setMonthly] = useState(true);
  const pct = Math.round((raised / goal) * 100);

  return (
    <section className="bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            <Sprout className="size-4" /> Since 2011 · 312 villages reached
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-5xl leading-[1.02] font-bold tracking-tight md:text-7xl"
          >
            Clean water changes <span className="text-primary">everything</span>.
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            We build wells with local communities and train them to keep the water flowing. 100% of public donations fund projects; our
            operations are covered by founding partners.
          </p>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6">
            {[
              { icon: Droplets, value: "1,240", label: "wells built" },
              { icon: Users, value: "860k", label: "people served" },
              { icon: Heart, value: "100%", label: "to projects" },
            ].map((s) => (
              <div key={s.label}>
                <s.icon className="size-5 text-primary" />
                <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-xl border border-border bg-card p-7 text-card-foreground shadow-xl shadow-foreground/5"
        >
          <p className="text-sm font-semibold">Spring appeal</p>
          <p className="mt-1 font-display text-3xl font-bold">
            ${raised.toLocaleString()} <span className="text-base font-normal text-muted-foreground">of ${goal.toLocaleString()}</span>
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{pct}% funded · 1,932 donors · 12 days left</p>

          <div className="mt-6 grid grid-cols-2 rounded-lg bg-muted p-1 text-sm font-medium">
            {[
              { label: "Monthly", v: true },
              { label: "One-time", v: false },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setMonthly(o.v)}
                className={`rounded-md py-2 transition ${monthly === o.v ? "bg-card text-card-foreground shadow" : "text-muted-foreground"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {amounts.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(a)}
                className={`rounded-lg border py-3 font-semibold transition ${a === amount ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
              >
                ${a}
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-accent px-4 py-3 text-sm text-accent-foreground">
            ${amount}
            {monthly ? "/month" : ""} gives {Math.max(1, Math.round(amount / 5))} {amount / 5 > 1 ? "people" : "person"} clean water
            {monthly ? " every month" : " for a year"}.
          </p>
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-primary-foreground hover:opacity-90"
          >
            <Heart className="size-5 fill-current" /> Donate ${amount}
            {monthly ? " monthly" : ""}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
