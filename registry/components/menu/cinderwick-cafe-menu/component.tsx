"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const menu = {
  Espresso: {
    photo: "photo-1541167760496-1628856ab772",
    items: [
      ["Espresso", "House blend, double", "2.60"],
      ["Flat white", "Double ristretto, whole or oat", "3.40"],
      ["Cortado", "Equal parts, served in glass", "3.20"],
      ["Cappuccino", "Big foam, cocoa optional", "3.50"],
      ["Iced latte", "Over cold milk, maple on request", "3.80"],
    ],
  },
  Filter: {
    photo: "photo-1442512595331-e89e73853f31",
    items: [
      ["Batch brew", "Today’s single origin", "2.90"],
      ["V60 pour-over", "Choose any bag on the shelf", "4.20"],
      ["Chemex for two", "Brewed at your table", "7.50"],
      ["Cold brew", "Steeped 18 hours", "3.90"],
    ],
  },
  Bakes: {
    photo: "photo-1504754524776-8f4f37790ca0",
    items: [
      ["Cardamom bun", "Baked here every morning", "3.20"],
      ["Brown butter cookie", "Sea salt, dark chocolate", "2.80"],
      ["Banana bread", "Toasted, with whipped butter", "3.40"],
      ["Seasonal tart", "Ask what’s in today", "4.50"],
    ],
  },
};
type Tab = keyof typeof menu;

export default function CinderwickCafeMenu() {
  const tabs = Object.keys(menu) as Tab[];
  const [tab, setTab] = useState<Tab>("Espresso");

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] lg:aspect-auto">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={menu[tab].photo}
              src={img(menu[tab].photo)}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <p className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur">
            Café · 7am–4pm daily
          </p>
        </div>

        <div>
          <h2 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">At the bar</h2>
          <div className="mt-8 flex gap-6 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative pb-3 font-display text-xl ${tab === t ? "text-foreground" : "text-muted-foreground"}`}
              >
                {t}
                {tab === t && <motion.span layoutId="cinderwick-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              {menu[tab].items.map(([name, desc, price]) => (
                <li key={name} className="flex items-baseline gap-4 border-b border-dashed border-border py-5">
                  <div className="min-w-0">
                    <p className="font-display text-2xl">{name}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <span className="ml-auto font-display text-2xl text-primary">{price}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <p className="mt-6 text-sm text-muted-foreground">Oat, almond and whole milk at no extra cost. Decaf on everything.</p>
        </div>
      </div>
    </section>
  );
}
