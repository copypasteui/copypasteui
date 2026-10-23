"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MONTHS = ["All", "June", "July", "August", "September"] as const;
const DEPARTURES = [
  { start: "14 June", month: "June", price: "£1,650", left: 8 },
  { start: "28 June", month: "June", price: "£1,650", left: 3 },
  { start: "12 July", month: "July", price: "£1,790", left: 0 },
  { start: "26 July", month: "July", price: "£1,790", left: 5 },
  { start: "9 August", month: "August", price: "£1,790", left: 2 },
  { start: "23 August", month: "August", price: "£1,790", left: 6 },
  { start: "6 September", month: "September", price: "£1,650", left: 8 },
  { start: "20 September", month: "September", price: "£1,590", left: 7 },
];

export default function CrestlineDates() {
  const [month, setMonth] = useState<(typeof MONTHS)[number]>("All");
  const rows = month === "All" ? DEPARTURES : DEPARTURES.filter((d) => d.month === month);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-t-4 border-foreground pt-6 md:grid-cols-4">
          <p className="font-bold tracking-tight">02 / Dates</p>
          <div className="md:col-span-3">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-tight">2027 departures</h2>
            <div role="group" aria-label="Filter by month" className="mt-6 flex flex-wrap gap-0">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={month === m}
                  onClick={() => setMonth(m)}
                  className={`-ml-px border border-foreground px-4 py-2 font-semibold first:ml-0 ${month === m ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <table className="mt-10 w-full text-left">
          <thead>
            <tr className="border-b-2 border-foreground text-sm">
              <th scope="col" className="py-3 font-semibold">
                Starts (Saturday)
              </th>
              <th scope="col" className="py-3 font-semibold">
                Per person
              </th>
              <th scope="col" className="hidden py-3 font-semibold sm:table-cell">
                Places left
              </th>
              <th scope="col" className="py-3">
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((d) => (
                <motion.tr
                  key={d.start}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-border"
                >
                  <td className="py-4 text-lg font-bold">{d.start}</td>
                  <td className="py-4 tabular-nums">{d.price}</td>
                  <td className="hidden py-4 sm:table-cell">
                    <span className="flex items-center gap-3">
                      <span className="flex gap-0.5" aria-hidden>
                        {Array.from({ length: 8 }, (_, i) => (
                          <span key={i} className={`h-4 w-2 ${i < d.left ? "bg-primary" : "bg-muted"}`} />
                        ))}
                      </span>
                      <span className="text-sm">{d.left === 0 ? "Full" : `${d.left} of 8`}</span>
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {d.left === 0 ? (
                      <a href="#" className="font-semibold underline underline-offset-4">
                        Join the waiting list
                      </a>
                    ) : (
                      <a href="#" className="inline-block bg-foreground px-4 py-2 font-semibold text-background">
                        Book
                      </a>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </section>
  );
}
