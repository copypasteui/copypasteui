"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Info } from "lucide-react";

const ages = [
  { id: "baby", label: "Under 2", rate: 72 },
  { id: "toddler", label: "2 – 3 years", rate: 66 },
  { id: "pre", label: "3 – 5 years", rate: 62 },
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function AcornsFees() {
  const [age, setAge] = useState(1);
  const [picked, setPicked] = useState(["Mon", "Wed", "Thu"]);
  const [funded, setFunded] = useState(true);
  const a = ages[age]!;
  // Funded hours cover roughly 30 hours a week (about 3 days) for eligible families of children 9 months+.
  const fundedDays = funded && a.id !== "baby" ? Math.min(picked.length, 3) : funded ? Math.min(picked.length, 2) : 0;
  const consumables = picked.length * 8;
  const weekly = (picked.length - fundedDays) * a.rate + consumables;

  return (
    <section id="fees" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="font-display text-5xl font-extrabold">Fees, worked out for you</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Full days 7:30–6, including meals, nappies, wipes, forest school kit and the daily photo diary.
          </p>
          <ul className="mt-8 space-y-3 font-semibold">
            {["Government funded hours accepted", "Tax-Free Childcare & vouchers welcome", "Sibling discount 10%"].map((x) => (
              <li key={x} className="flex gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-4" />
                </span>{" "}
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-xl md:p-8">
          <p className="font-bold">How old is your child?</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {ages.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setAge(i)}
                aria-pressed={age === i}
                className={`rounded-full py-3 font-bold transition ${age === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <p className="mt-6 font-bold">Which days?</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {days.map((d) => {
              const on = picked.includes(d);
              return (
                <motion.button
                  key={d}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== d) : [...p, d]))}
                  aria-pressed={on}
                  className={`aspect-square rounded-full font-display text-lg font-bold transition ${on ? "bg-accent text-accent-foreground" : "border-2 border-dashed border-border"}`}
                >
                  {d}
                </motion.button>
              );
            })}
          </div>
          <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-[calc(var(--radius)*0.6)] bg-muted p-4">
            <span className="font-semibold">Using funded hours?</span>
            <button
              type="button"
              role="switch"
              aria-checked={funded}
              onClick={() => setFunded((f) => !f)}
              className={`relative h-7 w-12 rounded-full transition ${funded ? "bg-accent" : "bg-border"}`}
            >
              <motion.span layout className={`absolute top-1 size-5 rounded-full bg-card shadow ${funded ? "right-1" : "left-1"}`} />
            </button>
          </label>
          <div className="mt-6 flex items-end justify-between border-t-2 border-dashed border-border pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Estimated weekly cost</p>
              <motion.p
                key={weekly}
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-6xl font-extrabold text-primary"
              >
                £{weekly}
              </motion.p>
            </div>
            <p className="max-w-[10rem] text-right text-xs text-muted-foreground">
              {fundedDays ? `${fundedDays} day${fundedDays > 1 ? "s" : ""} covered by funding · ` : ""}£8/day for meals &amp; consumables
            </p>
          </div>
          <p className="mt-4 flex gap-2 text-xs text-muted-foreground">
            <Info className="size-4 shrink-0" /> A guide only. We’ll confirm your exact fees and eligibility when you visit.
          </p>
        </div>
      </div>
    </section>
  );
}
