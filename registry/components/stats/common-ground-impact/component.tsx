"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

const stats = [
  { to: 41200, label: "meals shared this year" },
  { to: 1380, label: "families supported" },
  { to: 9600, label: "hours in our warm hubs" },
  { to: 312, label: "volunteers" },
];
const split = [
  { label: "Food & essentials", pct: 54, cls: "bg-primary" },
  { label: "Warm hubs & energy help", pct: 22, cls: "bg-accent" },
  { label: "Youth club", pct: 14, cls: "bg-[rgb(242_178_61)]" },
  { label: "Running costs", pct: 10, cls: "bg-muted-foreground" },
];

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref}>{v.toLocaleString("en-GB")}</span>;
}

export default function CommonGroundImpact() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-2xl font-display text-5xl leading-tight font-extrabold">What your kindness did in 2025</h2>
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t-2 border-primary-foreground/25 pt-5">
              <dt className="font-display text-5xl font-extrabold tabular-nums md:text-6xl">
                <Count to={s.to} />
              </dt>
              <dd className="mt-1 opacity-90">{s.label}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16 rounded-[var(--radius)] bg-primary-foreground/10 p-6 md:p-8">
          <p className="font-display text-2xl font-bold">Where every £10 goes</p>
          <div className="mt-5 flex h-6 overflow-hidden rounded-full">
            {split.map((s, i) => (
              <motion.span
                key={s.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                className={`h-full ${s.cls}`}
              />
            ))}
          </div>
          <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {split.map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span className={`size-3 rounded-full ${s.cls}`} /> <span className="font-bold">£{(s.pct / 10).toFixed(2)}</span> {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
