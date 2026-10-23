"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Thermal pass",
    price: "£35",
    per: "per visit",
    note: "Two hours in the pool, sauna, steam and quiet room.",
    items: ["Robe, towels & slippers", "Herbal tea bar", "Weekdays & weekends"],
    featured: false,
  },
  {
    name: "Still spa day",
    price: "£85",
    per: "per person",
    note: "A 60-minute treatment with the full thermal suite.",
    items: ["Any 60-min treatment", "Two-course lunch", "Glass of fizz or kombucha", "Four hours, no rush"],
    featured: true,
  },
  {
    name: "Membership",
    price: "£95",
    per: "per month",
    note: "For people who’ve worked out this is the best bit of their week.",
    items: ["Unlimited thermal suite", "One treatment a month", "20% off extra treatments", "Bring a friend for £15"],
    featured: false,
  },
];

export default function StillMemberships() {
  return (
    <section className="bg-background py-28 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-5xl md:text-6xl">Ways to visit</h2>
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-center">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ clipPath: "inset(0% 0% 99.5% 0%)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              className={`rounded-[var(--radius)] p-10 ${p.featured ? "bg-primary py-14 text-primary-foreground shadow-2xl" : "border border-border bg-card text-card-foreground"}`}
            >
              {p.featured && <p className="mb-4 text-xs tracking-[0.3em] uppercase opacity-90">Most booked</p>}
              <h3 className="font-display text-3xl">{p.name}</h3>
              <p className="mt-6">
                <span className="font-display text-6xl">{p.price}</span> <span className="text-sm opacity-90">{p.per}</span>
              </p>
              <p className="mt-4 text-sm opacity-90">{p.note}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {p.items.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="size-4 shrink-0" /> {x}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-10 block rounded-full py-3.5 text-center font-semibold ${p.featured ? "bg-primary-foreground text-primary" : "border border-foreground/30 hover:bg-secondary"}`}
              >
                Choose
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
