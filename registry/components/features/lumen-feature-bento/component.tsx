"use client";

import { motion } from "motion/react";
import { MessageSquareText, BellRing, FileBarChart, ShieldCheck, Code2 } from "lucide-react";
import type { ReactNode } from "react";

function Card({
  className = "",
  icon: Icon,
  title,
  body,
  children,
  i,
}: {
  className?: string;
  icon: typeof Code2;
  title: string;
  body: string;
  children?: ReactNode;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.07, duration: 0.6 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground ${className}`}
    >
      <Icon className="size-5 text-primary" />
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </motion.div>
  );
}

export default function LumenFeatureBento() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-primary">Product</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          The analyst that never sleeps.
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Card
            i={0}
            className="md:col-span-4"
            icon={MessageSquareText}
            title="Questions in, answers out"
            body="Plain English becomes verified SQL against your own schema, and you can always see the query."
          >
            <div className="space-y-2 rounded-xl bg-muted p-4 text-sm">
              <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">
                Top 5 plans by expansion revenue this quarter?
              </p>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-sm">
                {[
                  ["Scale", 82],
                  ["Team", 64],
                  ["Growth", 41],
                  ["Starter", 18],
                  ["Edu", 9],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex items-center gap-3 py-1">
                    <span className="w-14 text-xs text-muted-foreground">{k}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-2 rounded-full bg-primary"
                      style={{ maxWidth: 220 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card
            i={1}
            className="md:col-span-2"
            icon={BellRing}
            title="Anomaly alerts"
            body="Spikes and dips flagged within minutes, with the likely cause attached."
          >
            <div className="space-y-2">
              {[
                ["Signups", "−38%", "1h ago"],
                ["Refunds", "+212%", "3h ago"],
              ].map(([k, v, t]) => (
                <div key={k} className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-2 animate-pulse rounded-full bg-primary" />
                    {k}
                  </span>
                  <span className="font-mono text-xs">
                    {v} <span className="text-muted-foreground">· {t}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card
            i={2}
            className="md:col-span-2"
            icon={FileBarChart}
            title="Reports that write themselves"
            body="A Monday digest for every team, in Slack or email."
          />
          <Card
            i={3}
            className="md:col-span-2"
            icon={ShieldCheck}
            title="Row-level security"
            body="Inherits your warehouse permissions. SOC 2 Type II, EU hosting."
          />
          <Card
            i={4}
            className="md:col-span-2"
            icon={Code2}
            title="SQL when you want it"
            body="Every answer is a query you can edit, version and reuse."
          >
            <pre className="overflow-hidden rounded-xl bg-foreground p-3 font-mono text-[11px] leading-relaxed text-background/85">
              {`select plan, sum(mrr_delta)
from expansions
where quarter = '2027-Q1'
group by 1 order by 2 desc
limit 5;`}
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}
