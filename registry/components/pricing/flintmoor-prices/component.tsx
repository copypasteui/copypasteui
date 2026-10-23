"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const groups = [
  {
    title: "Hair",
    items: [
      { name: "Classic cut", note: "Scissors or clippers, wash & style", price: 20 },
      { name: "Skin fade", note: "Zero to blend, foil-shaver finish", price: 22 },
      { name: "Long hair restyle", note: "Over the collar, consultation", price: 28 },
      { name: "Kids’ cut", note: "Under 12, any day before 3pm", price: 14 },
    ],
  },
  {
    title: "Beard & shave",
    items: [
      { name: "Beard trim & shape", note: "Line-up, oil and balm", price: 14 },
      { name: "Hot-towel shave", note: "Straight razor, three towels", price: 26 },
      { name: "Head shave", note: "Razor, hot towel, moisturiser", price: 22 },
    ],
  },
  {
    title: "The works",
    items: [
      { name: "Cut & beard", note: "The most-booked combo", price: 32 },
      { name: "The Flintmoor", note: "Fade, hot-towel shave, face mask, a dram", price: 48 },
    ],
  },
];

export default function FlintmoorPrices() {
  return (
    <section className="bg-foreground py-24 font-sans text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative hidden overflow-hidden rounded-[var(--radius)] lg:block">
          <img
            src={img("photo-1503951914875-452162b0f3f1")}
            alt="Customer reclined for a straight-razor shave"
            className="absolute inset-0 size-full object-cover"
          />
          <p className="absolute top-5 left-5 rounded-[var(--radius)] bg-accent px-3 py-1.5 text-xs font-bold tracking-widest text-accent-foreground uppercase">
            Cash or card · No booking fee
          </p>
        </div>
        <div>
          <h2 className="font-display text-6xl leading-none uppercase md:text-7xl">Prices</h2>
          <div className="mt-10 space-y-12">
            {groups.map((g, gi) => (
              <div key={g.title}>
                <p className="text-sm font-bold tracking-[0.3em] text-background uppercase">{g.title}</p>
                <ul className="mt-4">
                  {g.items.map((it, i) => (
                    <motion.li
                      key={it.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + i * 0.05 }}
                      className="group py-3"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl uppercase transition-colors group-hover:text-accent">{it.name}</span>
                        <span aria-hidden className="mb-1 flex-1 border-b-2 border-dotted border-background/30" />
                        <span className="font-display text-2xl tabular-nums">£{it.price}</span>
                      </div>
                      <p className="text-sm opacity-90">{it.note}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
