"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  { name: "Paperback", monthly: 14, points: ["One paperback a month, chosen for you", "A handwritten note on why"] },
  {
    name: "Hardback",
    monthly: 24,
    points: ["One new hardback a month", "A handwritten note on why", "10% off anything else in the shop"],
    featured: true,
  },
  { name: "Two for the house", monthly: 30, points: ["Two paperbacks for two different readers", "Tell us about each of them once"] },
];

export default function MarginSubscription() {
  const [gift, setGift] = useState(false);
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-end">
          <h2 className="font-display text-5xl md:text-7xl">Book of the month, picked for you</h2>
          <div>
            <p className="text-muted-foreground">
              Fill in a short form about what you love and what you can&apos;t stand. We do the rest. Postage included in the UK.
            </p>
            <label className="mt-4 flex items-center gap-3 text-sm font-semibold">
              <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="size-4 accent-primary" />
              It&apos;s a gift (six months, paid now)
            </label>
          </div>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border md:grid-cols-3">
          {plans.map((p) => (
            <li
              key={p.name}
              className={`flex flex-col p-8 ${p.featured ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground"}`}
            >
              <h3 className="text-sm font-semibold tracking-wide uppercase">{p.name}</h3>
              <p className="mt-4 font-display text-6xl">£{gift ? p.monthly * 6 : p.monthly}</p>
              <p className="text-sm">{gift ? "for six months" : "a month, cancel any time"}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0" aria-hidden /> {x}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-8 rounded-[var(--radius)] bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">
                {gift ? `Give ${p.name.toLowerCase()}` : `Start ${p.name.toLowerCase()}`}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
