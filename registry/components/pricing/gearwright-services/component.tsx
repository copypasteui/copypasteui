"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";

const tiers = [
  { name: "MOT", price: 45, note: "Government max £54.85" },
  { name: "Interim", price: 129, note: "Every 6 months / 6k miles" },
  { name: "Full service", price: 219, note: "Every 12 months / 12k miles", best: true },
  { name: "Major", price: 329, note: "Every 24 months / 24k miles" },
];
// Which of the four tiers (MOT, Interim, Full, Major) include each item.
const rows: [string, boolean[]][] = [
  ["Video health check", [true, true, true, true]],
  ["Brakes, tyres & lights inspected", [true, true, true, true]],
  ["Free MOT re-test within 10 days", [true, false, false, false]],
  ["Engine oil & filter change", [false, true, true, true]],
  ["Air filter", [false, false, true, true]],
  ["Pollen filter", [false, false, true, true]],
  ["Spark plugs / fuel filter", [false, false, false, true]],
  ["Brake fluid replacement", [false, false, false, true]],
];

export default function GearwrightServices() {
  const [hover, setHover] = useState(2);

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-6xl leading-none font-extrabold uppercase italic">Service menu</h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Prices for most small and medium cars, including VAT and parts. Larger engines quoted on your reg.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 bg-card text-card-foreground">
            <thead>
              <tr>
                <th className="w-1/3 p-5 text-left align-bottom text-sm font-semibold text-muted-foreground">Compare</th>
                {tiers.map((t, i) => (
                  <th
                    key={t.name}
                    onMouseEnter={() => setHover(i)}
                    className={`relative p-5 text-left align-bottom transition-colors ${hover === i ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {t.best && (
                      <span className="absolute top-2 left-5 bg-foreground px-2 py-0.5 text-[10px] font-bold tracking-wider text-background uppercase">
                        Most booked
                      </span>
                    )}
                    <span className="mt-4 block font-display text-2xl font-extrabold uppercase italic">{t.name}</span>
                    <span className="font-display text-4xl font-extrabold">£{t.price}</span>
                    <span className={`block text-xs font-normal ${hover === i ? "opacity-90" : "text-muted-foreground"}`}>{t.note}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, inc], r) => (
                <tr key={label}>
                  <td className="border-t border-border p-4 text-sm font-medium">{label}</td>
                  {tiers.map((t, i) => {
                    return (
                      <td
                        key={t.name}
                        onMouseEnter={() => setHover(i)}
                        className={`border-t border-border p-4 transition-colors ${hover === i ? "bg-primary/10" : ""}`}
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: r * 0.04 + i * 0.03 }}
                          className="inline-block"
                        >
                          {inc[i] ? <Check className="size-5 text-primary" /> : <Minus className="size-5 text-muted-foreground/50" />}
                        </motion.span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="border-t border-border p-4" />
                {tiers.map((t, i) => (
                  <td key={t.name} className={`border-t border-border p-4 ${hover === i ? "bg-primary/10" : ""}`}>
                    <a
                      href="#book"
                      className={`inline-block px-4 py-2 text-sm font-bold tracking-wider uppercase ${hover === i ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      Book
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
