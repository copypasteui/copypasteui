"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ranges = {
  "6M": [42, 48, 46, 58, 64, 71],
  "1Y": [20, 24, 23, 30, 35, 33, 42, 48, 46, 58, 64, 71],
  "3Y": [6, 8, 11, 10, 14, 18, 20, 24, 30, 35, 42, 48, 58, 64, 71],
};
type Range = keyof typeof ranges;

function toPath(values: number[], w: number, h: number) {
  const max = Math.max(...values) * 1.1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w} ${h} L0 ${h} Z`, last: pts[pts.length - 1]! };
}

export default function AreaChartStats() {
  const [range, setRange] = useState<Range>("1Y");
  const { line, area, last } = toPath(ranges[range], 600, 220);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Market report</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Homes here hold their value.</h2>
          <p className="mt-4 text-muted-foreground">Median sale price in the district, updated monthly from public records.</p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            {[
              { k: "Median price", v: "$712k" },
              { k: "Days on market", v: "18" },
              { k: "Sale-to-list", v: "103%" },
              { k: "Inventory", v: "1.4 mo" },
            ].map((s) => (
              <div key={s.k} className="border-l-2 border-primary pl-4">
                <dt className="text-sm text-muted-foreground">{s.k}</dt>
                <dd className="font-display text-3xl font-bold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Price index</p>
              <p className="flex items-center gap-2 font-display text-3xl font-bold">
                {ranges[range].at(-1)}.0
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-sm text-accent-foreground">
                  <ArrowUpRight className="size-4" />
                  {Math.round(((ranges[range].at(-1)! - ranges[range][0]!) / ranges[range][0]!) * 100)}%
                </span>
              </p>
            </div>
            <div className="flex rounded-md bg-muted p-1 text-sm">
              {(Object.keys(ranges) as Range[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded px-3 py-1 font-medium ${range === r ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 600 240" className="mt-6 w-full overflow-visible">
            <defs>
              <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 55, 110, 165, 220].map((y) => (
              <line key={y} x1="0" x2="600" y1={y} y2={y} className="stroke-border" strokeDasharray="4 6" />
            ))}
            <motion.path
              key={range + "a"}
              d={area}
              fill="url(#area-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              key={range + "l"}
              d={line}
              fill="none"
              strokeWidth="3"
              strokeLinejoin="round"
              className="stroke-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <circle cx={last[0]} cy={last[1]} r="6" className="fill-primary stroke-card" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
