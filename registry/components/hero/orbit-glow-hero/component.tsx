"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const runs = [
  { job: "nightly-invoices", time: "02:00", took: "41s", ok: true },
  { job: "sync-stock-levels", time: "every 15m", took: "6s", ok: true },
  { job: "send-reminders", time: "08:30", took: "retry 1/3", ok: false },
];

export default function OrbitGlowHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-24 text-center font-sans text-foreground md:py-32">
      {/* Slow orbit rings with a single marker each — the only decoration. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
        {[30, 48, 66].map((s, i) => (
          <motion.div
            key={s}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 60 + i * 30, repeat: Infinity, ease: "linear" }}
            style={{ width: `${s}rem`, height: `${s}rem` }}
            className="absolute rounded-full border border-dashed border-border"
          >
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-foreground" />
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Orbit 2.0 ·{" "}
        <a href="#" className="font-medium text-foreground underline underline-offset-4">
          read what changed
        </a>
      </p>

      <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-7xl">
        Cron jobs that tell you <span className="text-primary">when they fail.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        Orbit runs your scheduled scripts, retries them three times, and messages you on Slack with the error and the line it broke on. Your
        code stays in your repo.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5"
        >
          Start free <ArrowRight className="size-4" />
        </a>
        <code className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-card-foreground">
          <span className="text-muted-foreground">$</span> npx orbit deploy
        </code>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-14 max-w-xl overflow-hidden rounded-[var(--radius)] border border-border bg-card text-left text-card-foreground shadow-sm"
      >
        <p className="border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">Today · 3 jobs</p>
        <ul className="divide-y divide-border font-mono text-sm">
          {runs.map((r) => (
            <li key={r.job} className="flex items-center gap-3 px-4 py-3">
              <span
                className={`grid size-5 place-items-center rounded-full ${r.ok ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
              >
                {r.ok ? <Check className="size-3" /> : "!"}
              </span>
              <span className="flex-1 truncate">{r.job}</span>
              <span className="text-muted-foreground">{r.time}</span>
              <span className="w-20 text-right text-muted-foreground">{r.took}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
