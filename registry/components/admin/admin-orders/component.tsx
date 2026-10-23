"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, Printer } from "lucide-react";

export type OrderStage = "new" | "preparing" | "ready" | "collected";
export type Order = {
  id: string;
  name: string;
  placed: string;
  pickup: string;
  items: string[];
  total: number;
  paid: boolean;
  stage: OrderStage;
};

const sample: Order[] = [
  {
    id: "1042",
    name: "Hannah P.",
    placed: "17:41",
    pickup: "18:15",
    items: ["2 × Fish & chips", "1 × Mushy peas"],
    total: 31.5,
    paid: true,
    stage: "new",
  },
  {
    id: "1041",
    name: "Jo W.",
    placed: "17:38",
    pickup: "18:00",
    items: ["1 × Crab linguine", "1 × Lemon tart"],
    total: 24,
    paid: true,
    stage: "new",
  },
  {
    id: "1040",
    name: "Marcus B.",
    placed: "17:22",
    pickup: "17:50",
    items: ["3 × Hake & chips", "3 × Cans"],
    total: 47.4,
    paid: false,
    stage: "preparing",
  },
  { id: "1039", name: "Ellie H.", placed: "17:10", pickup: "17:40", items: ["1 × Fish tacos"], total: 11, paid: true, stage: "ready" },
  {
    id: "1038",
    name: "Sam L.",
    placed: "16:55",
    pickup: "17:20",
    items: ["2 × Chowder", "1 × Sourdough"],
    total: 21.5,
    paid: true,
    stage: "collected",
  },
];

const STAGES: { id: OrderStage; label: string; next?: string }[] = [
  { id: "new", label: "New", next: "Start" },
  { id: "preparing", label: "Preparing", next: "Ready" },
  { id: "ready", label: "Ready", next: "Collected" },
  { id: "collected", label: "Collected" },
];

const money = (n: number) => n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

// Takeaway or click-and-collect orders as a board. Feed orders from your shop or payment provider and
// save stage changes in onStageChange (for example, text the customer when it's ready).
export default function AdminOrders({
  orders: initial = sample,
  onStageChange,
  onPrint,
}: {
  orders?: Order[];
  onStageChange?: (id: string, stage: OrderStage) => void;
  onPrint?: (id: string) => void;
}) {
  const [orders, setOrders] = useState(initial);
  const advance = (o: Order) => {
    const i = STAGES.findIndex((s) => s.id === o.stage);
    const stage = STAGES[Math.min(i + 1, STAGES.length - 1)]!.id;
    setOrders((all) => all.map((x) => (x.id === o.id ? { ...x, stage } : x)));
    onStageChange?.(o.id, stage);
  };
  const takings = orders.filter((o) => o.paid).reduce((n, o) => n + o.total, 0);

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Orders</h1>
            <p className="text-sm text-muted-foreground">
              {orders.length} today · {money(takings)} paid online
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => {
            const list = orders.filter((o) => o.stage === stage.id);
            return (
              <div key={stage.id} className="rounded-[var(--radius)] border border-border bg-background/60 p-3">
                <p className="flex items-center justify-between px-1 text-sm font-semibold">
                  {stage.label} <span className="rounded-full bg-card px-2 text-xs text-muted-foreground">{list.length}</span>
                </p>
                <ul className="mt-3 space-y-3">
                  {list.map((o) => (
                    <motion.li
                      layout
                      key={o.id}
                      className="rounded-[var(--radius)] border border-border bg-card p-3 text-sm text-card-foreground shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold">
                          #{o.id} · {o.name}
                        </p>
                        <p className="font-semibold">{money(o.total)}</p>
                      </div>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" /> Pick-up {o.pickup}
                        {o.paid ? "" : " · pay on collection"}
                      </p>
                      <ul className="mt-2 space-y-0.5 text-muted-foreground">
                        {o.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                      {stage.next && (
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => advance(o)}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius)] bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                          >
                            {stage.next} <ArrowRight className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onPrint?.(o.id)}
                            aria-label={`Print order ${o.id}`}
                            className="grid size-8 place-items-center rounded-[var(--radius)] border border-border hover:bg-muted"
                          >
                            <Printer className="size-3.5" />
                          </button>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
