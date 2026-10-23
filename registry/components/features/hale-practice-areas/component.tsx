"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, FileSignature, Heart, Home, Users } from "lucide-react";

const areas = [
  {
    icon: Heart,
    name: "Family & divorce",
    lead: "Separation, finances and arrangements for children, handled with care and a view to the long term.",
    services: [
      ["Divorce (uncontested)", "£950 + VAT"],
      ["Financial consent order", "£1,200 + VAT"],
      ["Child arrangements advice", "£220/hr"],
      ["Prenuptial agreements", "from £1,800 + VAT"],
    ],
  },
  {
    icon: Home,
    name: "Property",
    lead: "Buying, selling and remortgaging, with a named lawyer who answers their own phone.",
    services: [
      ["Sale up to £500k", "£1,150 + VAT"],
      ["Purchase up to £500k", "£1,295 + VAT"],
      ["Remortgage", "£550 + VAT"],
      ["Lease extension", "from £1,500 + VAT"],
    ],
  },
  {
    icon: FileSignature,
    name: "Wills & probate",
    lead: "Plan ahead properly, or let us carry the weight of administering an estate.",
    services: [
      ["Single will", "£295 + VAT"],
      ["Mirror wills", "£450 + VAT"],
      ["Lasting powers of attorney", "£450 each"],
      ["Grant of probate only", "£1,450 + VAT"],
    ],
  },
  {
    icon: Users,
    name: "Employment",
    lead: "For employees and employers: dismissals, settlement agreements and contracts.",
    services: [
      ["Settlement agreement review", "Usually paid by employer"],
      ["Unfair dismissal claim", "£250/hr"],
      ["Contracts & handbooks", "from £650 + VAT"],
    ],
  },
  {
    icon: Briefcase,
    name: "Business",
    lead: "Company formation, shareholder agreements, commercial leases and disputes for owner-managed businesses.",
    services: [
      ["Shareholder agreement", "from £1,400 + VAT"],
      ["Commercial lease (tenant)", "from £1,750 + VAT"],
      ["Terms & conditions", "from £750 + VAT"],
    ],
  },
];

export default function HalePracticeAreas() {
  const [open, setOpen] = useState(0);

  return (
    <section id="areas" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-sm tracking-[0.3em] text-primary uppercase">Practice areas</p>
          <h2 className="mt-4 font-display text-5xl leading-tight font-medium">Fixed fees, published openly.</h2>
          <p className="mt-4 text-muted-foreground">
            You’ll know what you’re paying before we start. Where a fixed fee isn’t possible, we give an estimate and update it in writing
            if anything changes.
          </p>
        </div>
        <ul className="border-t border-border">
          {areas.map((a, i) => {
            const on = open === i;
            return (
              <li key={a.name} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center gap-5 py-6 text-left"
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center border transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-accent group-hover:border-primary"}`}
                  >
                    <a.icon className="size-5" />
                  </span>
                  <span className="flex-1 font-display text-3xl">{a.name}</span>
                  <motion.span animate={{ rotate: on ? 45 : 0 }} className="font-display text-3xl text-accent">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-[4.25rem]">
                        <p className="text-muted-foreground">{a.lead}</p>
                        <dl className="mt-5 divide-y divide-border border-y border-border">
                          {a.services.map(([s, f]) => (
                            <div key={s} className="flex justify-between gap-4 py-3 text-sm">
                              <dt>{s}</dt>
                              <dd className="font-medium">{f}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
