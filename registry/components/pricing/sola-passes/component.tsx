"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Gift } from "lucide-react";

const packs = [
  { n: 1, price: 16 },
  { n: 5, price: 70 },
  { n: 10, price: 125 },
  { n: 20, price: 220 },
];

export default function SolaPasses() {
  const [pack, setPack] = useState(2);
  const [annual, setAnnual] = useState(false);
  const p = packs[pack]!;

  return (
    <section id="pricing" className="bg-background pb-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">Pricing</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[var(--radius)] bg-primary p-8 text-primary-foreground"
          >
            <Gift className="size-7" />
            <p className="mt-6 font-display text-2xl font-bold">Intro offer</p>
            <p className="mt-2">
              <span className="font-display text-6xl font-extrabold">£25</span> <span className="opacity-90">for 2 weeks</span>
            </p>
            <p className="mt-4 text-sm opacity-90">Unlimited classes, mat and towel hire included. First-timers only.</p>
            <a href="#" className="mt-8 block rounded-full bg-primary-foreground py-3.5 text-center font-semibold text-primary">
              Start today
            </a>
          </motion.div>

          <motion.div className="rounded-[var(--radius)] border border-border bg-card p-8 text-card-foreground">
            <p className="font-display text-2xl font-bold">Class packs</p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {packs.map((x, i) => (
                <button
                  key={x.n}
                  type="button"
                  onClick={() => setPack(i)}
                  aria-pressed={pack === i}
                  className={`rounded-[calc(var(--radius)*0.6)] py-2.5 font-semibold transition ${pack === i ? "bg-foreground text-background" : "bg-muted hover:bg-secondary"}`}
                >
                  {x.n}
                </button>
              ))}
            </div>
            <p className="mt-6">
              <motion.span
                key={p.price}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block font-display text-6xl font-extrabold"
              >
                £{p.price}
              </motion.span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              £{(p.price / p.n).toFixed(2)} per class · valid {p.n > 5 ? "6" : "3"} months
            </p>
            <a
              href="#"
              className="mt-8 block rounded-full border border-foreground py-3.5 text-center font-semibold hover:bg-foreground hover:text-background"
            >
              Buy {p.n === 1 ? "a drop-in" : `${p.n} classes`}
            </a>
          </motion.div>

          <motion.div className="rounded-[var(--radius)] bg-secondary p-8 text-secondary-foreground">
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl font-bold">Unlimited</p>
              <button type="button" onClick={() => setAnnual((a) => !a)} aria-pressed={annual} className="flex items-center gap-2 text-sm">
                <span className={`relative h-6 w-11 rounded-full transition ${annual ? "bg-primary" : "bg-border"}`}>
                  <motion.span layout className={`absolute top-1 size-4 rounded-full bg-card ${annual ? "right-1" : "left-1"}`} />
                </span>
                Annual
              </button>
            </div>
            <p className="mt-6">
              <span className="font-display text-6xl font-extrabold">£{annual ? 99 : 119}</span>{" "}
              <span className="text-muted-foreground">/ month</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {annual ? "Billed yearly · save £240" : "Rolling monthly · cancel any time"}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Every class, every day", "Bring a friend free monthly", "10% off workshops"].map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="size-4 text-primary" /> {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
