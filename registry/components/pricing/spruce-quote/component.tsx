"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const freq = [
  { id: "weekly", label: "Weekly", rate: 22 },
  { id: "fortnightly", label: "Fortnightly", rate: 24 },
  { id: "once", label: "One-off", rate: 28 },
];

const services = [
  {
    name: "Regular clean",
    hours: 3,
    items: ["Same cleaner every visit", "We bring eco products", "Skip or pause any time"],
    featured: true,
  },
  {
    name: "Deep clean",
    hours: 6,
    items: ["Inside oven & fridge", "Skirting, doors & switches", "Limescale treatment"],
    featured: false,
    fixed: 189,
  },
  {
    name: "End of tenancy",
    hours: 8,
    items: ["Deposit-back guarantee", "Carpet steam option", "Landlord checklist"],
    featured: false,
    fixed: 249,
  },
];

export default function SpruceQuote() {
  const [f, setF] = useState(1);

  return (
    <section id="prices" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-5xl font-semibold">Simple, hourly pricing</h2>
          <p className="mt-3 text-muted-foreground">No contracts. Cancel up to 24 hours before for free.</p>
          <div className="mt-8 inline-flex rounded-full bg-card p-1.5 text-card-foreground">
            {freq.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setF(i)}
                aria-pressed={f === i}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold ${f === i ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {f === i && <motion.span layoutId="spruce-f" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">
                  {x.label} · £{x.rate}/hr
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const price = s.fixed ?? s.hours * freq[f]!.rate;
            return (
              <motion.article
                key={s.name}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`flex flex-col rounded-[calc(var(--radius)*1.2)] p-8 ${s.featured ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
              >
                {s.featured && (
                  <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-3xl font-semibold">{s.name}</h3>
                <p className="mt-6">
                  <span className="text-sm opacity-90">{s.fixed ? "from " : ""}</span>
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block font-display text-6xl font-semibold"
                  >
                    £{price}
                  </motion.span>
                </p>
                <p className="text-sm opacity-90">
                  {s.fixed ? "Fixed price, 2-bed home" : `${s.hours}-hour visit, ${freq[f]!.label.toLowerCase()}`}
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {s.items.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${s.featured ? "bg-primary-foreground text-primary" : "bg-secondary text-primary"}`}
                      >
                        <Check className="size-3" />
                      </span>{" "}
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 rounded-full py-3.5 text-center font-semibold ${s.featured ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}
                >
                  Book {s.name.toLowerCase()}
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
