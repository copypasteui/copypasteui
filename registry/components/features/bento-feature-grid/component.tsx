"use client";

import { motion } from "motion/react";
import { Zap, ShieldCheck, Globe2, Layers, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

function Tile({ className = "", children, i }: { className?: string; children: ReactNode; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-7 text-card-foreground ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function BentoFeatureGrid() {
  return (
    <section id="features" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            What&apos;s included on every plan, from £12 a month
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-6">
          <Tile i={0} className="md:col-span-4 md:row-span-2">
            <Zap className="size-8 text-primary" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Pages in under 50ms</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Rendered in 30 regions, so a customer in Sydney waits as little as one in Leeds. Median load last month: 41ms.
            </p>
            <div className="mt-10 grid grid-cols-12 items-end gap-1.5">
              {[30, 45, 38, 60, 52, 70, 64, 82, 76, 90, 85, 98].map((h, k) => (
                <motion.div
                  key={k}
                  initial={{ height: 0 }}
                  whileInView={{ height: h * 1.4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + k * 0.04, duration: 0.5 }}
                  className="rounded-t-sm bg-primary/20 group-hover:bg-primary/40"
                />
              ))}
            </div>
          </Tile>

          <Tile i={1} className="md:col-span-2">
            <ShieldCheck className="size-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">SSO and audit logs</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">On every plan, not just Enterprise. Logs are kept for a year.</p>
          </Tile>

          <Tile i={2} className="md:col-span-2">
            <Globe2 className="size-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">40+ languages</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Visitors land on their language; a human translator checks every string.</p>
          </Tile>

          <Tile i={3} className="md:col-span-3">
            <Layers className="size-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">New pages match the old ones</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Every block reads your theme, so nothing looks bolted on.</p>
            <div className="mt-6 flex gap-2">
              {["Hero", "Pricing", "FAQ", "CTA"].map((b) => (
                <span key={b} className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {b}
                </span>
              ))}
            </div>
          </Tile>

          <Tile i={4} className="bg-primary text-primary-foreground md:col-span-3">
            <BarChart3 className="size-7" />
            <h3 className="mt-4 text-lg font-semibold">Analytics without cookies</h3>
            <p className="mt-1.5 text-sm opacity-90">Counts visits without tracking people, so you don&apos;t need a cookie banner.</p>
            <p className="mt-6 font-display text-5xl font-bold">98.6%</p>
            <p className="text-sm opacity-90">of customers keep it on</p>
          </Tile>
        </div>
      </div>
    </section>
  );
}
