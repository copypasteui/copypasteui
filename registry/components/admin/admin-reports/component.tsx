"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Range = "7d" | "30d";

// Simple reports from numbers you already have. Pass your own figures; these are samples.
const data: Record<
  Range,
  {
    label: string;
    visits: number[];
    days: string[];
    totals: { label: string; value: string; change: string }[];
    sources: [string, number][];
    pages: [string, number][];
  }
> = {
  "7d": {
    label: "Last 7 days",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    visits: [96, 120, 134, 151, 212, 288, 283],
    totals: [
      { label: "Website visits", value: "1,284", change: "+12%" },
      { label: "Bookings made online", value: "61", change: "+8%" },
      { label: "Takeaway orders", value: "104", change: "−3%" },
      { label: "Takings online", value: "£2,310", change: "+6%" },
    ],
    sources: [
      ["Google search", 46],
      ["Google Maps", 24],
      ["Instagram", 17],
      ["Direct", 13],
    ],
    pages: [
      ["Menu", 41],
      ["Book a table", 28],
      ["Home", 19],
      ["Gift cards", 7],
      ["Find us", 5],
    ],
  },
  "30d": {
    label: "Last 30 days",
    days: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    visits: [4210, 4480, 4925, 5310],
    totals: [
      { label: "Website visits", value: "18,925", change: "+9%" },
      { label: "Bookings made online", value: "248", change: "+14%" },
      { label: "Takeaway orders", value: "431", change: "+2%" },
      { label: "Takings online", value: "£9,840", change: "+11%" },
    ],
    sources: [
      ["Google search", 44],
      ["Google Maps", 27],
      ["Instagram", 15],
      ["Direct", 14],
    ],
    pages: [
      ["Menu", 39],
      ["Book a table", 30],
      ["Home", 20],
      ["Gift cards", 6],
      ["Find us", 5],
    ],
  },
};

export default function AdminReports() {
  const [range, setRange] = useState<Range>("7d");
  const d = data[range];
  const max = Math.max(...d.visits);

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold">Reports</h1>
          <div
            role="tablist"
            aria-label="Period"
            className="inline-flex rounded-[var(--radius)] border border-border bg-card p-0.5 text-sm"
          >
            {(Object.keys(data) as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={range === r}
                onClick={() => setRange(r)}
                className={`rounded-[calc(var(--radius)-2px)] px-3 py-1.5 ${range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                {data[r].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {d.totals.map((t) => (
            <div key={t.label} className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
              <p className="text-sm text-muted-foreground">{t.label}</p>
              <p className="mt-1 font-display text-3xl font-bold">{t.value}</p>
              <p className={`text-sm ${t.change.startsWith("−") ? "text-muted-foreground" : "text-primary"}`}>
                {t.change} on the period before
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
          <h2 className="font-semibold">Website visits</h2>
          <div
            className="mt-4 flex h-48 items-end gap-2"
            role="img"
            aria-label={`Visits: ${d.days.map((day, i) => `${day} ${d.visits[i]}`).join(", ")}`}
          >
            {d.visits.map((v, i) => (
              <div key={d.days[i]} className="flex h-full flex-1 flex-col justify-end gap-1 text-center">
                <motion.div
                  key={`${range}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="rounded-t-[calc(var(--radius)/2)] bg-primary"
                />
                <span className="text-xs text-muted-foreground">{d.days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            { title: "Where visitors came from", rows: d.sources },
            { title: "Most-visited pages", rows: d.pages },
          ].map((block) => (
            <div key={block.title} className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
              <h2 className="font-semibold">{block.title}</h2>
              <ul className="mt-3 space-y-2.5 text-sm">
                {block.rows.map(([label, pct]) => (
                  <li key={label}>
                    <p className="flex justify-between">
                      <span>{label}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </p>
                    <span className="mt-1 block h-2 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
