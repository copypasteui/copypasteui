"use client";

import { motion } from "motion/react";

const tickets = [
  { name: "Adult session", price: "£11", note: "Skate hire included" },
  { name: "Under 16", price: "£9.50", note: "Skate hire included" },
  { name: "Own skates", price: "£7", note: "Any session, any age" },
  { name: "Learn to skate", price: "£48", note: "Four Wednesday lessons" },
];

export default function SilverlinePrices() {
  return (
    <section id="prices" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl uppercase md:text-5xl">Prices</h2>
          <p className="text-muted-foreground">Pads and helmets free with every hire.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tickets.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground shadow-md"
            >
              <h3 className="font-semibold">{t.name}</h3>
              <p className="mt-3 font-display text-4xl">{t.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.note}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
