"use client";

import { motion } from "motion/react";
import { Database, Snowflake, Cloud, CreditCard, Users, BarChart3, Table2, Webhook, Boxes, LineChart } from "lucide-react";

const inner = [
  { icon: Database, name: "PostgreSQL" },
  { icon: Snowflake, name: "Warehouse" },
  { icon: Cloud, name: "Object storage" },
  { icon: Table2, name: "Spreadsheets" },
];
const outer = [
  { icon: CreditCard, name: "Billing" },
  { icon: Users, name: "CRM" },
  { icon: BarChart3, name: "Product analytics" },
  { icon: Webhook, name: "Webhooks" },
  { icon: Boxes, name: "dbt models" },
  { icon: LineChart, name: "Ad platforms" },
];

function Ring({ items, radius, duration, reverse }: { items: typeof inner; radius: number; duration: number; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-border"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {items.map((it, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <motion.div key={it.name} className="absolute top-1/2 left-1/2" style={{ x: Math.cos(a) * radius, y: Math.sin(a) * radius }}>
            <motion.span
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium whitespace-nowrap text-card-foreground shadow-sm"
            >
              <it.icon className="size-4 text-primary" /> {it.name}
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function LumenIntegrationsOrbit() {
  return (
    <section className="overflow-hidden bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm font-medium text-primary">Integrations</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Plugs into the stack you already have.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            120+ connectors, read-only by default. Most teams ask their first question within 15 minutes of signing up.
          </p>
          <a href="#" className="mt-8 inline-block rounded-[var(--radius)] bg-foreground px-5 py-3 text-sm font-medium text-background">
            Browse all integrations
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <Ring items={outer} radius={230} duration={90} />
          <Ring items={inner} radius={130} duration={60} reverse />
          <div className="absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-4xl text-foreground">
            ◐
          </div>
        </div>
      </div>
    </section>
  );
}
