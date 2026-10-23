"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

const wines = [
  {
    id: "classic",
    name: "Classic Cuvée",
    vintage: "NV",
    style: "Sparkling",
    price: 34,
    tone: "rgb(233 214 150)",
    notes: "Green apple, brioche, a long chalky finish.",
    profile: { Body: 2, Acidity: 5, Sweetness: 1 },
    pair: "Oysters, fish & chips, Tuesday",
  },
  {
    id: "rose",
    name: "Rosé de Noirs",
    vintage: "2022",
    style: "Sparkling",
    price: 42,
    tone: "rgb(232 160 150)",
    notes: "Wild strawberry, redcurrant and pink grapefruit.",
    profile: { Body: 3, Acidity: 4, Sweetness: 1 },
    pair: "Salmon, summer berries, weddings",
  },
  {
    id: "bacchus",
    name: "Bacchus",
    vintage: "2024",
    style: "Still white",
    price: 22,
    tone: "rgb(226 216 130)",
    notes: "Elderflower, gooseberry and cut grass.",
    profile: { Body: 2, Acidity: 4, Sweetness: 2 },
    pair: "Goat’s cheese, asparagus, Thai green curry",
  },
  {
    id: "pinot",
    name: "Pinot Noir",
    vintage: "2023",
    style: "Still red",
    price: 28,
    tone: "rgb(122 30 52)",
    notes: "Cherry, forest floor, silky and light.",
    profile: { Body: 3, Acidity: 4, Sweetness: 1 },
    pair: "Duck, mushrooms, roast chicken",
  },
];

export default function HollinmereWines() {
  const [sel, setSel] = useState(0);
  const [qty, setQty] = useState(6);
  const w = wines[sel]!;
  const discount = qty >= 12 ? 0.15 : qty >= 6 ? 0.1 : 0;

  return (
    <section id="wines" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl md:text-6xl">
            The <em>wines</em>
          </h2>
          <p className="max-w-sm text-muted-foreground">10% off any six bottles, 15% off twelve. Free delivery on mixed cases.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <ul className="border-t border-border">
            {wines.map((x, i) => (
              <li key={x.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  aria-pressed={sel === i}
                  className="group flex w-full items-center gap-5 py-5 text-left"
                >
                  <span className="relative h-14 w-5 shrink-0 overflow-hidden rounded-t-sm rounded-b-full border border-foreground/20">
                    <motion.span
                      initial={false}
                      animate={{ height: sel === i ? "80%" : "45%" }}
                      className="absolute inset-x-0 bottom-0"
                      style={{ background: x.tone }}
                    />
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-2xl transition-colors md:text-3xl ${sel === i ? "text-primary" : "group-hover:text-primary"}`}
                    >
                      {x.name} <span className="text-lg text-muted-foreground">{x.vintage}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{x.style}</span>
                  </span>
                  <span className="font-semibold tabular-nums">£{x.price}</span>
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={w.id}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.35 }}
              className="rounded-[var(--radius)] bg-secondary p-8 text-secondary-foreground md:p-10"
            >
              <div className="flex items-start justify-between gap-4 md:gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                    {w.style} · {w.vintage}
                  </p>
                  <h3 className="mt-2 font-display text-4xl md:text-5xl">{w.name}</h3>
                  <p className="mt-4 font-display text-xl italic">“{w.notes}”</p>
                </div>
                <span
                  className="size-12 shrink-0 rounded-full shadow-inner ring-4 ring-background md:size-20 md:ring-8"
                  style={{ background: w.tone }}
                  aria-hidden
                />
              </div>
              <dl className="mt-8 space-y-3">
                {Object.entries(w.profile).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] items-center gap-4 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <motion.span
                          key={n}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: n * 0.05 }}
                          className={`h-2 flex-1 origin-left rounded-full ${n <= v ? "bg-primary" : "bg-border"}`}
                        />
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm">
                <span className="font-semibold">Drink with:</span> {w.pair}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                <div className="flex items-center rounded-[var(--radius)] border border-border bg-background text-foreground">
                  <button type="button" aria-label="Fewer bottles" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                  <button type="button" aria-label="More bottles" onClick={() => setQty((q) => Math.min(24, q + 1))} className="p-3">
                    <Plus className="size-4" />
                  </button>
                </div>
                <a
                  href="#"
                  className="flex-1 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-center font-semibold text-primary-foreground"
                >
                  Add {qty} · £{(w.price * qty * (1 - discount)).toFixed(2)}
                </a>
              </div>
              {discount > 0 && <p className="mt-2 text-xs font-semibold text-muted-foreground">{discount * 100}% case discount applied</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
