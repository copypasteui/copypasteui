"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

const services = [
  {
    n: "01",
    name: "Brand identity",
    from: "from £4,500",
    weeks: "4–6 weeks",
    body: "Strategy workshop, name check, logo, type, colour, voice and a guidelines PDF your nephew can actually follow.",
    deliverables: ["Logo suite", "Type & colour", "Brand guidelines", "Social templates"],
  },
  {
    n: "02",
    name: "Websites",
    from: "from £6,000",
    weeks: "6–8 weeks",
    body: "Fast, accessible sites you can edit yourself, with booking, shop or menu built in. Hosting and care plans available.",
    deliverables: ["UX & copy", "Design system", "CMS build", "SEO basics"],
  },
  {
    n: "03",
    name: "Packaging & print",
    from: "from £2,500",
    weeks: "3–5 weeks",
    body: "Labels, boxes, menus and signage, sorted with printers we trust, including checking the proofs.",
    deliverables: ["Labels & boxes", "Menus", "Signage", "Print management"],
  },
  {
    n: "04",
    name: "Launch & social",
    from: "from £1,800",
    weeks: "2–4 weeks",
    body: "A launch plan, photography direction and a month of content so your new look doesn’t go quietly.",
    deliverables: ["Launch plan", "Photo direction", "30 days of content", "Ad creative"],
  },
];

export default function KilnServices() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl font-black uppercase [font-stretch:120%] md:text-7xl">What we do</h2>
        <ul className="mt-12 border-t border-primary-foreground/20">
          {services.map((s, i) => {
            const on = open === i;
            return (
              <li key={s.n} className="border-b border-primary-foreground/20">
                <button
                  type="button"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[5rem_1fr_12rem_auto]"
                >
                  <span className="font-display text-xl font-black text-primary-foreground">{s.n}</span>
                  <span className="font-display text-3xl font-black uppercase [font-stretch:100%] transition-all group-hover:[font-stretch:130%] md:text-5xl">
                    {s.name}
                  </span>
                  <span className="hidden text-sm opacity-90 md:block">{s.from}</span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0 }}
                    className={`grid size-11 place-items-center rounded-full ${on ? "bg-accent text-accent-foreground" : "border border-primary-foreground/30"}`}
                  >
                    <Plus className="size-5" />
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
                      <div className="grid gap-6 pb-8 md:grid-cols-[5rem_1fr_1fr]">
                        <span />
                        <p className="max-w-lg text-lg opacity-90">{s.body}</p>
                        <div>
                          <p className="text-sm opacity-90">
                            {s.weeks} · {s.from}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                              <span key={d} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
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
