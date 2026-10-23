"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const PARTIES = [
  {
    tab: "Kids (5 to 12)",
    price: "£18 a child",
    min: "Minimum 8 children",
    includes: ["A mug, plate or dinosaur each", "Squash and a biscuit", "Party table for 2 hours", "Pieces ready in 7 days"],
    photo: "photo-1617117206620-b01f2919ff86",
    alt: "Two young girls drawing at a table covered in pens",
  },
  {
    tab: "Grown-ups",
    price: "£24 a person",
    min: "Thursdays from 6pm, 6 to 16 people",
    includes: ["Any piece up to £18", "Bring your own wine, no corkage", "Cheese board for the table", "We wash the glasses"],
    photo: "photo-1772485719348-761b3c608eef",
    alt: "A woman painting a patterned ceramic bowl",
  },
  {
    tab: "Baby hand and footprints",
    price: "£32 a piece",
    min: "Weekday mornings, 30 minutes",
    includes: ["Plate or tile with prints", "We do the printing", "Name and date painted on", "Ready in 10 days"],
    photo: "photo-1780736309282-7af387641534",
    alt: "Hands painting a colourful pattern on a ceramic cup",
  },
];

export default function GlazeDaysParties() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const p = PARTIES[i]!;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold">Parties and keepsakes</h2>
        <div role="tablist" aria-label="Party types" className="mt-8 flex flex-wrap gap-2">
          {PARTIES.map((x, n) => (
            <button
              key={x.tab}
              type="button"
              role="tab"
              id={`glaze-tab-${n}`}
              aria-selected={i === n}
              aria-controls="glaze-panel"
              onClick={() => setI(n)}
              className={`rounded-full px-5 py-2.5 font-semibold transition ${i === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div id="glaze-panel" role="tabpanel" aria-labelledby={`glaze-tab-${i}`} className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.tab}
              initial={reduce ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="grid items-center gap-8 rounded-[calc(var(--radius)*1.4)] bg-card p-6 text-card-foreground shadow-xl md:grid-cols-[1fr_1.1fr] md:p-10"
            >
              <img src={img(p.photo)} alt={p.alt} className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover" />
              <div>
                <p className="font-display text-4xl font-semibold">{p.price}</p>
                <p className="mt-1 text-muted-foreground">{p.min}</p>
                <ul className="mt-6 space-y-3">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Check className="size-4" aria-hidden />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                  Ask about a date
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
