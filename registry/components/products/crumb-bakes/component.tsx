"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBasket } from "lucide-react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const items = [
  {
    id: "sour",
    name: "Country sourdough",
    kind: "Bread",
    price: 5.2,
    tag: "Bestseller",
    photo: "photo-1509440159596-0249088772ff",
    note: "36-hour ferment, 800g",
  },
  {
    id: "bag",
    name: "Baguette tradition",
    kind: "Bread",
    price: 2.8,
    photo: "photo-1586765501019-cbe3973ef8fa",
    note: "Crackly crust, open crumb",
  },
  {
    id: "rye",
    name: "Seeded rye",
    kind: "Bread",
    price: 4.6,
    tag: "Vegan",
    photo: "photo-1566698629409-787a68fc5724",
    note: "Sunflower, flax, pumpkin",
  },
  {
    id: "croi",
    name: "Butter croissant",
    kind: "Pastry",
    price: 3,
    tag: "Bestseller",
    photo: "photo-1623334044303-241021148842",
    note: "Three-day lamination",
  },
  {
    id: "pain",
    name: "Pain au chocolat",
    kind: "Pastry",
    price: 3.4,
    photo: "photo-1483695028939-5bb13f8648b0",
    note: "Two batons of 70% dark",
  },
  {
    id: "alm",
    name: "Almond croissant",
    kind: "Pastry",
    price: 3.8,
    photo: "photo-1567891026259-c133718572a4",
    note: "Twice-baked, frangipane",
  },
  {
    id: "box",
    name: "Morning box",
    kind: "Boxes",
    price: 18,
    tag: "Serves 4",
    photo: "photo-1597528662465-55ece5734101",
    note: "Six pastries & a small loaf",
  },
  {
    id: "brunch",
    name: "Brunch box",
    kind: "Boxes",
    price: 32,
    tag: "Serves 6",
    photo: "photo-1711672284661-bd70e38f31b2",
    note: "Loaf, pastries, jam & butter",
  },
];
const kinds = ["All", "Bread", "Pastry", "Boxes"];

export default function CrumbBakes() {
  const [kind, setKind] = useState("All");
  const [basket, setBasket] = useState<Record<string, number>>({ croi: 2 });
  const shown = items.filter((i) => kind === "All" || i.kind === kind);
  const count = Object.values(basket).reduce((a, b) => a + b, 0);
  const total = useMemo(() => items.reduce((s, i) => s + (basket[i.id] ?? 0) * i.price, 0), [basket]);
  const change = (id: string, d: number) => setBasket((b) => ({ ...b, [id]: Math.max(0, (b[id] ?? 0) + d) }));

  return (
    <section id="bakes" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-6xl">Today’s bake</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Order by 9pm for pickup tomorrow morning. Whatever’s left at 3pm goes to Mill Lane food bank.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${kind === k ? "bg-foreground text-background" : "bg-card text-card-foreground hover:bg-background"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((i) => {
              const q = basket[i.id] ?? 0;
              return (
                <motion.li
                  key={i.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="group flex flex-col overflow-hidden rounded-[var(--radius)] bg-card text-card-foreground"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={img(i.photo)}
                      alt={i.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {i.tag && (
                      <span className="absolute top-3 left-3 -rotate-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {i.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl leading-tight">{i.name}</h3>
                      <span className="font-semibold tabular-nums">£{i.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{i.note}</p>
                    <div className="mt-auto pt-5">
                      {q === 0 ? (
                        <button
                          type="button"
                          onClick={() => change(i.id, 1)}
                          className="w-full rounded-full border-2 border-foreground py-2.5 text-sm font-semibold hover:bg-foreground hover:text-background"
                        >
                          Add to order
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded-full bg-primary p-1 text-primary-foreground">
                          <button
                            type="button"
                            aria-label={`Remove one ${i.name}`}
                            onClick={() => change(i.id, -1)}
                            className="grid size-9 place-items-center rounded-full hover:bg-primary-foreground/15"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="text-sm font-semibold tabular-nums">{q} in basket</span>
                          <button
                            type="button"
                            aria-label={`Add one ${i.name}`}
                            onClick={() => change(i.id, 1)}
                            className="grid size-9 place-items-center rounded-full hover:bg-primary-foreground/15"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="mx-auto mt-10 flex max-w-xl items-center justify-between gap-4 rounded-full bg-foreground py-2 pr-2 pl-6 text-background shadow-2xl"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <ShoppingBasket className="size-4" /> {count} item{count > 1 ? "s" : ""} · £{total.toFixed(2)}
              </span>
              <a href="#order" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
                Choose pickup time
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
