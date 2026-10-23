"use client";

import { motion, useReducedMotion } from "motion/react";

const MENU = [
  {
    course: "Raw and small",
    dishes: [
      { name: "Native oysters, shallot vinegar", price: "3.20 each" },
      { name: "Bass crudo, blood orange, chilli", price: "11" },
      { name: "Smoked cod's roe, radishes, toast", price: "8", sold: true },
    ],
  },
  {
    course: "Over the coals",
    dishes: [
      { name: "Whole dabs, brown butter, capers", price: "19" },
      { name: "Bass fillet, fennel, green sauce", price: "26" },
      { name: "Mackerel, rhubarb, horseradish", price: "17", sold: true },
      { name: "Hispi cabbage, anchovy butter", price: "12" },
    ],
  },
  {
    course: "Afters",
    dishes: [
      { name: "Burnt honey tart, crème fraîche", price: "8" },
      { name: "Kentish cobnut ice cream", price: "6" },
    ],
  },
];

export default function BrinebankMenu() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-4 border-double border-foreground pb-3">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none">Today&rsquo;s board</h2>
          <p className="text-sm text-muted-foreground">Written at 11am. Prices in pounds. Struck through means it&rsquo;s gone.</p>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          {MENU.map((c) => (
            <div key={c.course} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase">{c.course}</h3>
              <ul className="mt-5 space-y-4">
                {c.dishes.map((d) => (
                  <li key={d.name} className="flex items-baseline gap-2">
                    <span className="relative">
                      <span className={d.sold ? "text-muted-foreground" : ""}>{d.name}</span>
                      {d.sold && (
                        <>
                          <motion.span
                            aria-hidden
                            initial={reduce ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-15% 0px" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                            className="absolute inset-x-0 top-1/2 h-0.5 origin-left bg-primary"
                          />
                          <span className="sr-only"> (sold out)</span>
                        </>
                      )}
                    </span>
                    <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-muted-foreground" />
                    <span className="tabular-nums">{d.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
