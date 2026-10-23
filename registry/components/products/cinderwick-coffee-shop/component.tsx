"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, Repeat, ChevronDown } from "lucide-react";

type Coffee = { name: string; origin: string; process: string; notes: string[]; roast: number; price: number; label: string; ink: string };
const coffees: Coffee[] = [
  {
    name: "Huila",
    origin: "Colombia",
    process: "Washed",
    notes: ["Red apple", "Panela", "Cacao"],
    roast: 2,
    price: 12,
    label: "bg-accent",
    ink: "text-accent-foreground",
  },
  {
    name: "Guji",
    origin: "Ethiopia",
    process: "Natural",
    notes: ["Blueberry", "Jasmine", "Honey"],
    roast: 1,
    price: 14,
    label: "bg-secondary",
    ink: "text-secondary-foreground",
  },
  {
    name: "Cerrado",
    origin: "Brazil",
    process: "Pulped natural",
    notes: ["Hazelnut", "Milk choc", "Toffee"],
    roast: 3,
    price: 11,
    label: "bg-primary",
    ink: "text-primary-foreground",
  },
  {
    name: "Cinderwick House",
    origin: "Espresso blend",
    process: "Seasonal",
    notes: ["Dark choc", "Cherry", "Brown sugar"],
    roast: 4,
    price: 12,
    label: "bg-foreground",
    ink: "text-background",
  },
];
const grinds = ["Whole bean", "Espresso", "Filter", "Cafetière"];

/** Coffee bag drawn with CSS, coloured by theme tokens. */
function Bag({ c }: { c: Coffee }) {
  return (
    <div className="relative mx-auto h-64 w-44 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-3deg]">
      <div className="absolute inset-x-0 top-0 h-6 rounded-t-md bg-muted-foreground/30 [clip-path:polygon(0_100%,6%_0,94%_0,100%_100%)]" />
      <div className="absolute inset-x-0 top-5 bottom-0 rounded-t-sm rounded-b-xl bg-card shadow-xl ring-1 ring-border">
        <div
          className={`absolute inset-x-3 top-10 bottom-10 flex flex-col items-center justify-center rounded-lg ${c.label} ${c.ink} px-2 text-center`}
        >
          <p className="text-[9px] font-semibold tracking-[0.3em] uppercase">cinderwick</p>
          <p className="mt-1 font-display text-3xl leading-none font-extrabold">{c.name}</p>
          <p className="mt-1 text-[10px] tracking-wider uppercase">{c.origin}</p>
          <div className="mt-3 h-px w-10 bg-current opacity-40" />
          <p className="mt-2 text-[9px] tracking-wider uppercase">250g · {c.process}</p>
        </div>
      </div>
    </div>
  );
}

export default function CinderwickCoffeeShop() {
  const [grind, setGrind] = useState<Record<string, string>>({});
  const [sub, setSub] = useState(true);
  const [added, setAdded] = useState<string | null>(null);

  const add = (name: string) => {
    setAdded(name);
    setTimeout(() => setAdded(null), 1600);
  };

  return (
    <section id="shop" className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">The current line-up</p>
            <h2 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-6xl">
              Pick your <em className="text-primary">brew.</em>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSub((s) => !s)}
            aria-pressed={sub}
            className="flex items-center gap-3 rounded-full bg-background p-1.5 pr-5 text-sm font-medium text-foreground shadow-sm"
          >
            <span
              className={`grid size-9 place-items-center rounded-full transition ${sub ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              <Repeat className="size-4" />
            </span>
            Subscribe & save 15% {sub ? "· on" : "· off"}
          </button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coffees.map((c, i) => {
            const price = sub ? (c.price * 0.85).toFixed(2) : c.price.toFixed(2);
            return (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col rounded-[var(--radius)] bg-background p-5 text-foreground"
              >
                <div className="rounded-[calc(var(--radius)-6px)] bg-muted py-8">
                  <Bag c={c} />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                  <p className="font-semibold">£{price}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {c.origin} · {c.process}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  Roast
                  {[1, 2, 3, 4].map((r) => (
                    <span key={r} className={`size-2.5 rounded-full ${r <= c.roast ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm italic">{c.notes.join(" · ")}</p>
                <span className="relative mt-4 flex">
                  <select
                    aria-label={`Grind for ${c.name}`}
                    value={grind[c.name] ?? grinds[0]}
                    onChange={(e) => setGrind({ ...grind, [c.name]: e.target.value })}
                    className="w-full appearance-none rounded-full border border-border bg-background py-2 pr-10 pl-4 text-sm outline-none focus:border-primary"
                  >
                    {grinds.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => add(c.name)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added === c.name ? (
                      <motion.span
                        key="ok"
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="size-4" /> Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Plus className="size-4" /> {sub ? "Subscribe" : "Add to bag"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
