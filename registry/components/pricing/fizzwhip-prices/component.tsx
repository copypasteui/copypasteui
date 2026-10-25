"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const cups = [
  { size: "One scoop", price: "£3.40" },
  { size: "Two scoops", price: "£4.80" },
  { size: "Three scoops", price: "£5.90" },
  { size: "Waffle cone", price: "+60p" },
];
const tubs = [
  { name: "Half litre", price: "£8.50", note: "Two flavours, packed while you wait" },
  { name: "One litre", price: "£14", note: "Up to three flavours" },
  { name: "Party box", price: "£42", note: "Four litres and 20 cones, order a day ahead", featured: true },
];

export default function FizzwhipPrices() {
  return (
    <section id="tubs" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Cups, cones and tubs</h2>
          <dl className="mt-8 divide-y-2 divide-foreground border-y-2 border-foreground">
            {cups.map((c) => (
              <div key={c.size} className="flex items-baseline justify-between py-4 text-lg">
                <dt className="font-semibold">{c.size}</dt>
                <dd className="font-display text-2xl">{c.price}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid content-start gap-4">
          {tubs.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 20, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.08 }}
              className={`flex flex-col gap-4 rounded-[var(--radius)] border border-foreground p-6 sm:flex-row sm:items-center ${t.featured ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm">{t.note}</p>
              </div>
              <p className="font-display text-4xl">{t.price}</p>
              <a
                href="#"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold whitespace-nowrap ${t.featured ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}
              >
                Order for collection <ArrowRight className="size-4" aria-hidden />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
