"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BellRing, CalendarClock } from "lucide-react";

const sets: Record<string, { date: string; title: string; note: string; days: number }[]> = {
  "Sole trader": [
    { date: "31 Oct", title: "Paper tax return", note: "Only if you still file on paper.", days: 11 },
    { date: "31 Jan", title: "Online self assessment", note: "Return filed and balancing payment due.", days: 103 },
    { date: "31 Jan", title: "1st payment on account", note: "Half of next year’s estimated bill.", days: 103 },
    { date: "31 Jul", title: "2nd payment on account", note: "The other half.", days: 284 },
  ],
  "Limited company": [
    { date: "7 Nov", title: "VAT return & payment", note: "Quarter to 30 September.", days: 18 },
    { date: "19 Nov", title: "PAYE & NI", note: "Monthly, for October payroll.", days: 30 },
    { date: "1 Jan", title: "Corporation tax payment", note: "9 months and 1 day after year end.", days: 73 },
    { date: "31 Mar", title: "Annual accounts & CT600", note: "Filed with both tax office and registry.", days: 162 },
  ],
  Landlord: [
    { date: "31 Jan", title: "Self assessment", note: "Rental income and allowable expenses.", days: 103 },
    { date: "5 Apr", title: "Tax year ends", note: "Last chance for this year’s allowances.", days: 167 },
    { date: "60 days", title: "Capital gains on property sale", note: "Report and pay within 60 days of completion.", days: 60 },
  ],
};

export default function LedgerDeadlines() {
  const [who, setWho] = useState("Sole trader");
  const list = sets[who]!;

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <CalendarClock className="size-10 text-primary" />
          <h2 className="mt-5 font-display text-5xl leading-tight font-bold tracking-tight">Never miss a tax deadline again.</h2>
          <p className="mt-4 text-muted-foreground">
            We track every date for you and send a reminder with the exact amount three weeks before anything is due.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {Object.keys(sets).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setWho(k)}
                aria-pressed={who === k}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${who === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.ol
            key={who}
            initial="h"
            animate="s"
            exit="h"
            variants={{ s: { transition: { staggerChildren: 0.08 } } }}
            className="relative space-y-3 border-l-2 border-border pl-6"
          >
            {list.map((d, i) => (
              <motion.li
                key={d.title}
                variants={{ h: { opacity: 0, x: 20 }, s: { opacity: 1, x: 0 } }}
                className="relative rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground"
              >
                <span
                  className={`absolute top-6 -left-[2.05rem] size-3.5 rounded-full ring-4 ring-background ${i === 0 ? "bg-primary" : "bg-border"}`}
                />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-sm font-semibold tracking-wider text-primary uppercase">{d.date}</p>
                    <p className="mt-1 text-lg font-semibold">{d.title}</p>
                    <p className="text-sm text-muted-foreground">{d.note}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${d.days < 30 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {d.days < 30 && <BellRing className="size-3.5" />} in {d.days} days
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
