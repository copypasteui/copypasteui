"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus, Plus, Ticket } from "lucide-react";

const tickets = [
  {
    id: "online",
    name: "Online",
    price: 0,
    left: null,
    perks: ["Live stream of both stages", "Community Discord", "Recordings for 30 days"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 349,
    left: 112,
    perks: ["Both days in Lisbon", "Lunch & coffee", "Afterparty", "All recordings"],
    hot: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: 899,
    left: 9,
    perks: ["Everything in Standard", "Speaker dinner", "Front-row seating", "Workshop of your choice"],
  },
];

export default function TicketTiersPricing() {
  const [qty, setQty] = useState<Record<string, number>>({ online: 0, standard: 1, vip: 0 });
  const total = tickets.reduce((s, t) => s + t.price * qty[t.id]!, 0);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const set = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(10, q[id]! + d)) }));

  return (
    <section id="tickets" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">Tickets</h2>
        <p className="mt-3 text-center text-muted-foreground">Early-bird prices end March 1. Group of 5+? Save 15% automatically.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tickets.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground ${t.hot ? "border-primary" : "border-border"}`}
            >
              {/* ticket notches */}
              <span className="absolute top-[118px] -left-3 size-6 rounded-full border border-border bg-background" />
              <span className="absolute top-[118px] -right-3 size-6 rounded-full border border-border bg-background" />
              <div className={`p-6 ${t.hot ? "bg-primary text-primary-foreground" : ""}`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl font-bold uppercase">{t.name}</p>
                  <Ticket className="size-5 opacity-70" />
                </div>
                <p className="mt-3 font-display text-4xl font-extrabold">{t.price ? `€${t.price}` : "Free"}</p>
              </div>
              <div className="flex flex-1 flex-col border-t border-dashed border-border p-6">
                <ul className="flex-1 space-y-2.5 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                {t.left !== null && (
                  <p className="mt-5 text-xs font-semibold text-primary">{t.left < 20 ? `Only ${t.left} left!` : `${t.left} remaining`}</p>
                )}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-1.5">
                  <button
                    type="button"
                    aria-label="Fewer"
                    onClick={() => set(t.id, -1)}
                    className="grid size-9 place-items-center rounded-md hover:bg-background"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="font-display text-lg font-bold tabular-nums">{qty[t.id]}</span>
                  <button
                    type="button"
                    aria-label="More"
                    onClick={() => set(t.id, 1)}
                    className="grid size-9 place-items-center rounded-md hover:bg-background"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-muted p-5 sm:flex-row">
          <p className="text-lg">
            {count} ticket{count === 1 ? "" : "s"} · <span className="font-display text-2xl font-bold">€{total.toLocaleString()}</span>
          </p>
          <button
            type="button"
            disabled={!count}
            className="rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
