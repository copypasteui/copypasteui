"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, Gauge, Bug, CheckCircle2, Circle } from "lucide-react";

const tabs = [
  {
    id: "preview",
    icon: GitBranch,
    title: "Preview every branch",
    body: "Each pull request gets its own URL with production data snapshots, so reviewers click instead of imagine.",
    panel: (
      <div className="space-y-3">
        {[
          { b: "feat/checkout-v2", s: "Ready", ok: true },
          { b: "fix/safari-scroll", s: "Ready", ok: true },
          { b: "exp/new-onboarding", s: "Building…", ok: false },
        ].map((r) => (
          <div
            key={r.b}
            className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 font-mono text-sm"
          >
            <span className="flex items-center gap-2">
              {r.ok ? <CheckCircle2 className="size-4 text-primary" /> : <Circle className="size-4 animate-pulse text-muted-foreground" />}
              {r.b}
            </span>
            <span className={r.ok ? "text-primary" : "text-muted-foreground"}>{r.s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "perf",
    icon: Gauge,
    title: "Performance budgets",
    body: "Set budgets per route. Builds that make things slower are flagged before they ever reach users.",
    panel: (
      <div className="grid grid-cols-3 gap-3">
        {[
          { k: "LCP", v: "1.1s", p: 82 },
          { k: "INP", v: "64ms", p: 94 },
          { k: "CLS", v: "0.01", p: 99 },
        ].map((m) => (
          <div key={m.k} className="rounded-md border border-border bg-background p-4 text-center">
            <div className="relative mx-auto size-20">
              <svg viewBox="0 0 36 36" className="size-20 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: m.p / 100 }}
                  transition={{ duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-sm font-bold">{m.p}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{m.k}</p>
            <p className="font-display font-bold">{m.v}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "errors",
    icon: Bug,
    title: "Errors with context",
    body: "Stack traces, the user’s last clicks and the exact commit, grouped and linked to the PR.",
    panel: (
      <div className="rounded-md border border-border bg-background p-4 font-mono text-xs leading-relaxed">
        <p className="text-primary">TypeError: Cannot read properties of undefined (reading &apos;total&apos;)</p>
        <p className="mt-2 text-muted-foreground">at CartSummary (cart/summary.tsx:42:18)</p>
        <p className="text-muted-foreground">at renderWithHooks (react-dom.js:1:2041)</p>
        <div className="mt-4 flex flex-wrap gap-2 font-sans">
          {["428 events", "91 users", "since a3f9c1e", "Safari 17"].map((t) => (
            <span key={t} className="rounded bg-muted px-2 py-1 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function TabbedFeatureShowcase() {
  const [active, setActive] = useState(tabs[0]!.id);
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">See every change before your users do.</h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`relative w-full rounded-lg p-5 text-left transition-colors ${active === t.id ? "" : "hover:bg-muted"}`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="feature-tab"
                    className="absolute inset-0 rounded-lg border border-border bg-card shadow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative flex gap-4">
                  <t.icon className={`mt-0.5 size-6 shrink-0 ${active === t.id ? "text-primary" : "text-muted-foreground"}`} />
                  <span>
                    <span className="block text-lg font-semibold">{t.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{t.body}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-xl border border-border bg-muted p-6 md:p-8">
            <div className="mb-5 flex gap-1.5">
              <span className="size-3 rounded-full bg-border" />
              <span className="size-3 rounded-full bg-border" />
              <span className="size-3 rounded-full bg-border" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {tab.panel}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
