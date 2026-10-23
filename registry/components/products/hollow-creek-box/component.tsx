"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Leaf } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const boxes = [
  { id: "small", name: "Small", serves: "1–2 people", items: 8, price: 18 },
  { id: "family", name: "Family", serves: "3–4 people", items: 12, price: 26 },
  { id: "large", name: "Big table", serves: "5+ people", items: 16, price: 34 },
];
const extras = [
  { id: "eggs", name: "Dozen free-range eggs", price: 4.2 },
  { id: "bread", name: "Sourdough from the village bakery", price: 4.5 },
  { id: "milk", name: "2 pints of unhomogenised milk", price: 2.6 },
  { id: "beef", name: "500g grass-fed beef mince", price: 7.5 },
];
const thisWeek = ["Purple sprouting", "Chantenay carrots", "Kale", "Leeks", "Squash", "Beetroot", "Cox apples", "New potatoes"];
const days = ["Tue", "Thu", "Sat"];

export default function HollowCreekBox() {
  const [box, setBox] = useState("family");
  const [add, setAdd] = useState<string[]>(["eggs"]);
  const [day, setDay] = useState("Thu");
  const b = boxes.find((x) => x.id === box)!;
  const total = b.price + extras.filter((e) => add.includes(e.id)).reduce((s, e) => s + e.price, 0);

  return (
    <section id="box" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-5xl leading-tight font-bold">Build your weekly veg box</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Picked the morning it’s delivered. Skip a week or cancel whenever — no contracts, no plastic.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-[var(--radius)]">
              <img
                src={img("photo-1632776350300-11016768b521")}
                alt="Wooden crates of fresh vegetables at the farm stall"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[var(--radius)] bg-card/95 p-4 text-card-foreground backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Leaf className="size-4 text-primary" /> In this week’s box
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {thisWeek.slice(0, b.items === 8 ? 5 : b.items === 12 ? 7 : 8).map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border-2 border-foreground bg-card p-6 text-card-foreground md:p-8">
            <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">1 · Box size</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {boxes.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setBox(x.id)}
                  aria-pressed={box === x.id}
                  className={`rounded-[var(--radius)] border-2 p-4 text-left transition ${box === x.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                >
                  <span className="block font-display text-xl font-bold">{x.name}</span>
                  <span className="block text-xs opacity-90">{x.serves}</span>
                  <span className="mt-2 block font-semibold">£{x.price}</span>
                </button>
              ))}
            </div>

            <p className="mt-8 text-sm font-bold tracking-wider text-muted-foreground uppercase">2 · From the farm shop</p>
            <ul className="mt-3 space-y-2">
              {extras.map((e) => {
                const on = add.includes(e.id);
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setAdd((a) => (on ? a.filter((x) => x !== e.id) : [...a, e.id]))}
                      aria-pressed={on}
                      className="flex w-full items-center gap-3 rounded-[var(--radius)] p-2 text-left hover:bg-muted"
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-md border-2 transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                      >
                        {on && <Check className="size-4" />}
                      </span>
                      <span className="flex-1">{e.name}</span>
                      <span className="text-sm font-semibold tabular-nums">+£{e.price.toFixed(2)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-sm font-bold tracking-wider text-muted-foreground uppercase">3 · Delivery day</p>
            <div className="mt-3 flex gap-2">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  aria-pressed={day === d}
                  className={`flex-1 rounded-[var(--radius)] border-2 py-2.5 font-semibold transition ${day === d ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t-2 border-dashed border-border pt-6">
              <p>
                <span className="text-sm text-muted-foreground">Weekly total</span>
                <motion.span
                  key={total}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="block font-display text-4xl font-bold tabular-nums"
                >
                  £{total.toFixed(2)}
                </motion.span>
              </p>
              <a href="#" className="rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground">
                Start {day} deliveries
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
