"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";

const plans = [
  { name: "Hobby", price: "$0", note: "forever", cta: "Start free" },
  { name: "Pro", price: "$20", note: "per user / month", cta: "Start trial", popular: true },
  { name: "Enterprise", price: "Custom", note: "annual contract", cta: "Talk to sales" },
];

type Cell = boolean | string;
const groups: { name: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    name: "Usage",
    rows: [
      ["Projects", "3", "Unlimited", "Unlimited"],
      ["Build minutes / month", "300", "6,000", "Custom"],
      ["Preview deployments", true, true, true],
      ["Concurrent builds", "1", "4", "Custom"],
    ],
  },
  {
    name: "Collaboration",
    rows: [
      ["Team members", "1", "Up to 50", "Unlimited"],
      ["Comments on previews", false, true, true],
      ["Role-based access", false, true, true],
    ],
  },
  {
    name: "Security & support",
    rows: [
      ["SSO / SAML", false, false, true],
      ["Audit log", false, "30 days", "1 year"],
      ["Support", "Community", "Email, 24h", "Dedicated, 1h SLA"],
    ],
  },
];

function Value({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto size-5 text-primary" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto size-5 text-muted-foreground/50" aria-label="Not included" />;
  return <span className="text-sm">{v}</span>;
}

export default function ComparisonTablePricing() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Compare plans</h2>
          <p className="mt-3 text-muted-foreground">Every plan includes unlimited bandwidth and global edge caching.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-center">
            <thead>
              <tr>
                <th className="w-1/3" />
                {plans.map((p) => (
                  <th key={p.name} className={`rounded-t-xl px-4 pt-6 pb-6 align-top ${p.popular ? "bg-muted" : ""}`}>
                    {p.popular && (
                      <span className="mb-2 inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        Popular
                      </span>
                    )}
                    <p className="text-lg font-semibold">{p.name}</p>
                    <p className="mt-2 font-display text-3xl font-bold">{p.price}</p>
                    <p className="text-xs font-normal text-muted-foreground">{p.note}</p>
                    <a
                      href="#"
                      className={`mt-4 inline-block w-full rounded-md px-4 py-2 text-sm font-semibold ${p.popular ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                    >
                      {p.cta}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <Fragment key={g.name}>
                  <tr>
                    <td
                      colSpan={4}
                      className="border-b border-border pt-8 pb-2 text-left text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                    >
                      {g.name}
                    </td>
                  </tr>
                  {g.rows.map(([label, ...vals]) => (
                    <tr key={label}>
                      <td className="border-b border-border py-4 pr-4 text-left text-sm font-medium">{label}</td>
                      {vals.map((v, k) => (
                        <td key={k} className={`border-b border-border px-4 py-4 ${plans[k]!.popular ? "bg-muted" : ""}`}>
                          <Value v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
