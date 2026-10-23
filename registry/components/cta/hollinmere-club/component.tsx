"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tiers = [
  { id: 6, label: "6 bottles", price: 165, perks: ["Free tastings for two, always", "15% off everything", "First access to new releases"] },
  {
    id: 12,
    label: "12 bottles",
    price: 310,
    perks: ["Free tastings for four, always", "20% off everything", "Members’ harvest lunch", "A magnum each Christmas"],
  },
];

export default function HollinmereClub() {
  const [tier, setTier] = useState(0);
  const t = tiers[tier]!;

  return (
    <section className="relative isolate overflow-hidden py-24 font-sans text-white">
      <img src={img("photo-1506377247377-2a5b3b417ebb")} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/65" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-white/75 uppercase">The Hollinmere Club</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Four cases a year, <em>chosen by us.</em>
          </h2>
          <p className="mt-5 max-w-md text-white/85">
            A quarterly case of our winemaker’s picks, including small-batch wines we never sell to the public. Skip or cancel any time.
          </p>
        </div>
        <div className="rounded-[var(--radius)] bg-background p-8 text-foreground shadow-2xl">
          <div className="flex rounded-[var(--radius)] bg-muted p-1">
            {tiers.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setTier(i)}
                aria-pressed={tier === i}
                className={`relative flex-1 rounded-[var(--radius)] py-2.5 text-sm font-semibold ${tier === i ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {tier === i && <motion.span layoutId="hollinmere-tier" className="absolute inset-0 rounded-[var(--radius)] bg-primary" />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-8 flex items-baseline gap-2">
            <motion.span
              key={t.price}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              className="font-display text-6xl"
            >
              £{t.price}
            </motion.span>
            <span className="text-muted-foreground">per quarter, delivered</span>
          </p>
          <ul className="mt-6 space-y-3">
            {t.perks.map((p) => (
              <li key={p} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
              </li>
            ))}
          </ul>
          <a href="#" className="mt-8 block rounded-[var(--radius)] bg-primary py-4 text-center font-semibold text-primary-foreground">
            Join the club
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">Next case ships 1 December · Must be 18+</p>
        </div>
      </div>
    </section>
  );
}
