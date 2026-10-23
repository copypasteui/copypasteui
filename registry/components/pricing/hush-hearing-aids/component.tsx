"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";

const BANDS = ["Essential", "Everyday", "Advanced"] as const;
const PRICES = ["£1,495", "£2,395", "£3,295"];
const ROWS: { feature: string; has: [boolean, boolean, boolean] }[] = [
  { feature: "Rechargeable, 24 hours a charge", has: [true, true, true] },
  { feature: "Streams calls and music from your phone", has: [true, true, true] },
  { feature: "Automatic settings for restaurants and cars", has: [false, true, true] },
  { feature: "Tinnitus sound therapy built in", has: [false, true, true] },
  { feature: "Separates speech from wind noise outdoors", has: [false, false, true] },
];

export default function HushHearingAids() {
  const [pick, setPick] = useState(1);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold">Hearing aid prices, for a pair</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every band includes the fitting, four years of aftercare and a 60-day trial: if they don&rsquo;t suit you, bring them back for a
          full refund.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-separate border-spacing-x-3 text-left">
            <thead>
              <tr>
                <th scope="col" className="w-2/5" />
                {BANDS.map((b, i) => (
                  <th key={b} scope="col" className="relative p-0 align-bottom">
                    <motion.button
                      type="button"
                      onClick={() => setPick(i)}
                      onPointerEnter={() => setPick(i)}
                      aria-pressed={pick === i}
                      animate={{ y: pick === i ? -8 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`w-full rounded-[var(--radius)] p-5 text-center ${pick === i ? "bg-primary text-primary-foreground shadow-xl" : "bg-card text-card-foreground shadow-md"}`}
                    >
                      <span className="block font-bold">{b}</span>
                      <span className="mt-1 block text-2xl font-bold">{PRICES[i]}</span>
                    </motion.button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="even:bg-muted">
                  <th scope="row" className="border-b border-border py-4 pr-4 pl-3 font-medium">
                    {r.feature}
                  </th>
                  {r.has.map((h, i) => (
                    <td
                      key={i}
                      className={`border-b border-border py-4 text-center ${pick === i ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {h ? (
                        <Check className="mx-auto size-5" aria-label="Included" />
                      ) : (
                        <Minus className="mx-auto size-5" aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Interest-free over 12 months on any band. We don&rsquo;t take commission from any maker.
        </p>
      </div>
    </section>
  );
}
