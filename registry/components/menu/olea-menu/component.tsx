"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Leaf, Wheat } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Dish = { name: string; note: string; price: string; v?: boolean; gf?: boolean };

const menus: Record<string, { intro: string; photo: string; alt: string; courses: { title: string; dishes: Dish[] }[] }> = {
  Dinner: {
    intro: "Our evening menu changes with the boats. Plates are made to share; we suggest three or four for two people.",
    photo: "photo-1519233991914-26a44330ccd7",
    alt: "Charred sea bream with crushed potatoes and salsa verde",
    courses: [
      {
        title: "To start",
        dishes: [
          { name: "Focaccia & house oil", note: "Rosemary, flaked salt, first-press arbequina", price: "6", v: true },
          { name: "Crudo of sea bass", note: "Blood orange, fennel pollen, chilli", price: "14", gf: true },
          { name: "Burrata", note: "Roasted grapes, saba, toasted hazelnuts", price: "12", v: true, gf: true },
        ],
      },
      {
        title: "From the fire",
        dishes: [
          { name: "Whole grilled bream", note: "Salsa verde, crushed potatoes, lemon", price: "29", gf: true },
          { name: "Lamb shoulder", note: "Twelve hours, smoked yoghurt, pickled shallot", price: "32", gf: true },
          { name: "Hispi cabbage", note: "Anchovy butter, brown crab, crumbs", price: "16" },
        ],
      },
      {
        title: "Pasta",
        dishes: [
          { name: "Pici cacio e pepe", note: "Hand-rolled, aged pecorino, Tellicherry pepper", price: "17", v: true },
          { name: "Squid ink tagliolini", note: "Cuttlefish, ’nduja, parsley", price: "21" },
        ],
      },
    ],
  },
  Lunch: {
    intro: "Two courses for £24, three for £29, Tuesday to Saturday from noon until three.",
    photo: "photo-1505685509042-16b1b75030cf",
    alt: "Chef finishing a plated starter with a squeeze bottle",
    courses: [
      {
        title: "Set lunch",
        dishes: [
          { name: "Soup of the day", note: "With focaccia", price: "—", v: true },
          { name: "Mackerel escabeche", note: "Saffron, shallot, toasted bread", price: "—" },
          { name: "Gnocchi", note: "Brown butter, sage, pumpkin seeds", price: "—", v: true },
          { name: "Catch of the day", note: "Clams, white beans, gremolata", price: "—", gf: true },
          { name: "Olive oil cake", note: "Crème fraîche, poached quince", price: "—", v: true },
        ],
      },
    ],
  },
  Sunday: {
    intro: "Family-style Sunday lunch, served from 12:30. £42 a head, children under 10 eat free.",
    photo: "photo-1577106263724-2c8e03bfe9cf",
    alt: "Chef plating greens at the pass",
    courses: [
      {
        title: "For the table",
        dishes: [
          { name: "Antipasti board", note: "Cured meats, pickles, marinated olives", price: "" },
          { name: "Wood-roast chicken", note: "Or porchetta, with all the trimmings", price: "", gf: true },
          { name: "Garden plates", note: "Whatever the allotment gave us this week", price: "", v: true },
          { name: "Tiramisù", note: "Made at the table, as big as you dare", price: "", v: true },
        ],
      },
    ],
  },
};

export default function OleaMenu() {
  const [tab, setTab] = useState<keyof typeof menus>("Dinner");
  const m = menus[tab]!;

  return (
    <section id="menu" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">The menu</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">What’s cooking</h2>
          </div>
          <div role="tablist" aria-label="Menus" className="flex rounded-full border border-border bg-card p-1">
            {Object.keys(menus).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${tab === k ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab === k && (
                  <motion.span
                    layoutId="olea-tab"
                    className="absolute inset-0 -z-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-14 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius)]">
                <img src={img(m.photo)} alt={m.alt} className="size-full object-cover" />
              </div>
              <p className="mt-5 max-w-sm text-muted-foreground">{m.intro}</p>
            </div>

            <div className="space-y-12">
              {m.courses.map((c) => (
                <div key={c.title}>
                  <h3 className="font-display text-3xl">{c.title}</h3>
                  <ul className="mt-5 divide-y divide-border border-t border-border">
                    {c.dishes.map((d) => (
                      <li key={d.name} className="group flex items-baseline gap-4 py-5">
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-2 text-lg font-semibold transition-colors group-hover:text-accent">
                            {d.name}
                            {d.v && (
                              <span title="Vegetarian" className="grid size-5 place-items-center rounded-full bg-secondary">
                                <Leaf className="size-3" aria-label="Vegetarian" />
                              </span>
                            )}
                            {d.gf && (
                              <span title="Gluten free" className="grid size-5 place-items-center rounded-full bg-secondary">
                                <Wheat className="size-3" aria-label="Gluten free" />
                              </span>
                            )}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                        </div>
                        {d.price && <span className="font-display text-xl tabular-nums">{d.price === "—" ? "—" : `£${d.price}`}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Leaf className="size-4" /> Vegetarian
                </span>
                <span className="inline-flex items-center gap-2">
                  <Wheat className="size-4" /> Gluten free
                </span>
                <a
                  href="#"
                  className="ml-auto inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  <Download className="size-4" /> Full menu &amp; allergens (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
