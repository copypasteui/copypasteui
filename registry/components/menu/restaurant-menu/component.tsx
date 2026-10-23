"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Flame, WheatOff } from "lucide-react";

type Dish = { name: string; desc: string; price: number; tags?: ("v" | "spicy" | "gf")[]; special?: boolean };
const menu: Record<string, Dish[]> = {
  "To start": [
    { name: "Sourdough & cultured butter", desc: "Our 48-hour loaf, smoked salt", price: 6, tags: ["v"] },
    { name: "Charred leeks", desc: "Hazelnut, brown butter, lemon", price: 12, tags: ["v", "gf"] },
    { name: "Beef tartare", desc: "Smoked egg yolk, pickled shallot, rye crisps", price: 16, special: true },
    { name: "Burrata", desc: "Blood orange, chilli honey, basil", price: 14, tags: ["v", "spicy"] },
  ],
  Mains: [
    { name: "Hand-cut tagliatelle", desc: "Wild mushrooms, parmesan, thyme", price: 24, tags: ["v"] },
    { name: "Whole roast sea bream", desc: "Fennel, capers, salsa verde", price: 32, tags: ["gf"], special: true },
    { name: "Lamb shoulder", desc: "Slow-cooked 12 hours, white beans, gremolata", price: 34, tags: ["gf"] },
    { name: "Wild garlic gnocchi", desc: "Peas, ricotta, lemon zest", price: 22, tags: ["v"] },
  ],
  Desserts: [
    { name: "Burnt honey tart", desc: "Crème fraîche", price: 10, tags: ["v"] },
    { name: "Dark chocolate mousse", desc: "Olive oil, sea salt, hazelnut", price: 11, tags: ["v", "gf"] },
    { name: "Cheese board", desc: "Three local cheeses, quince, crackers", price: 15, tags: ["v"] },
  ],
  Drinks: [
    { name: "Natural orange wine", desc: "By the glass, ask for today’s bottle", price: 11 },
    { name: "Negroni of the week", desc: "Rotating house infusion", price: 13 },
    { name: "Kombucha on tap", desc: "Made in-house", price: 6, tags: ["v", "gf"] },
  ],
};
const tagIcon = { v: Leaf, spicy: Flame, gf: WheatOff };
const tagLabel = { v: "Vegetarian", spicy: "Spicy", gf: "Gluten-free" };

export default function RestaurantMenu() {
  const sections = Object.keys(menu);
  const [tab, setTab] = useState(sections[0]!);

  return (
    <section id="menu" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary uppercase">This week</p>
          <h2 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">The Menu</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-border">
          {sections.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTab(s)}
              className={`relative px-5 py-3 font-medium transition ${tab === s ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s}
              {tab === s && <motion.span layoutId="menu-underline" className="absolute inset-x-3 -bottom-px h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2"
          >
            {(menu[tab] ?? []).map((d) => (
              <li key={d.name}>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-xl font-semibold">
                    {d.name}
                    {d.special && (
                      <span className="ml-2 rounded-sm bg-accent px-1.5 py-0.5 align-middle font-sans text-[10px] font-bold tracking-wider text-accent-foreground uppercase">
                        Chef’s pick
                      </span>
                    )}
                  </h3>
                  <span className="flex-1 translate-y-[-4px] border-b border-dotted border-muted-foreground/50" />
                  <span className="font-display text-xl font-semibold text-primary">{d.price}</span>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {d.desc}
                  {d.tags?.map((t) => {
                    const Icon = tagIcon[t];
                    return <Icon key={t} className="size-3.5 text-primary" aria-label={tagLabel[t]} />;
                  })}
                </p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap justify-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground">
          {(Object.keys(tagLabel) as (keyof typeof tagLabel)[]).map((t) => {
            const Icon = tagIcon[t];
            return (
              <span key={t} className="flex items-center gap-1.5">
                <Icon className="size-3.5 text-primary" /> {tagLabel[t]}
              </span>
            );
          })}
          <span>Please tell us about any allergies.</span>
        </div>
      </div>
    </section>
  );
}
