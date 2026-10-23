"use client";

import { motion } from "motion/react";
import { Package, RefreshCw, Ruler, Star } from "lucide-react";

const quotes = [
  {
    text: "Walked in for a scarf, left with the best coat I’ve ever owned, and they took the sleeves up while I had a coffee.",
    name: "Imogen R.",
  },
  {
    text: "The opposite of fast fashion. Fewer, better things, and staff who will tell you honestly if something doesn’t suit.",
    name: "Kwame A.",
  },
  {
    text: "Their styling session rebuilt my whole work wardrobe around six pieces. Life-changing, slightly expensive, worth it.",
    name: "Helen T.",
  },
];

const promises = [
  { icon: Ruler, title: "Free alterations", body: "Hems, sleeves and waists, done in-house within a week." },
  { icon: RefreshCw, title: "30-day returns", body: "In store or by post. Refund to your original payment." },
  { icon: Package, title: "Free UK delivery", body: "On orders over £150. Next day if you order by 2pm." },
];

export default function MarloweReviews() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-[90rem] px-6">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </span>
          <span className="font-semibold">4.7 / 5</span>
          <span className="text-muted-foreground">from 740 reviews on Google</span>
        </div>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex flex-col justify-between bg-background p-8 md:p-10"
            >
              <blockquote className="font-display text-2xl leading-snug md:text-3xl">“{q.text}”</blockquote>
              <figcaption className="mt-8 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">— {q.name}</figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-t border-foreground pt-10 md:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title} className="flex gap-4">
              <p.icon className="mt-1 size-5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-semibold tracking-[0.15em] uppercase">{p.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
