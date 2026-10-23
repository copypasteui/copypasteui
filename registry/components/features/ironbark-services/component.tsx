"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const services = [
  {
    name: "Rear & side extensions",
    from: "£65k",
    weeks: "12–16 weeks",
    body: "Single or double storey, steel and glass, with planning drawings handled in-house.",
    photo: "photo-1786053538161-501fbdd89629",
  },
  {
    name: "Loft conversions",
    from: "£55k",
    weeks: "8–10 weeks",
    body: "Dormer, hip-to-gable and mansard. Most need no planning, and we’ll check for free.",
    photo: "photo-1676802037786-3697d60497ae",
  },
  {
    name: "Kitchens",
    from: "£28k",
    weeks: "4–6 weeks",
    body: "Design, supply and fit, including the plumbing, electrics and the bit everyone forgets: the plastering.",
    photo: "photo-1771371854543-bb274762389e",
  },
  {
    name: "Whole-house renovations",
    from: "£120k",
    weeks: "16–30 weeks",
    body: "Rewire, replumb, reconfigure. We’ll phase it so you can live in part of the house if you need to.",
    photo: "photo-1768839725085-829e6ac7ac26",
  },
];

export default function IronbarkServices() {
  const [i, setI] = useState(0);

  return (
    <section className="bg-foreground py-24 font-sans text-background">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-bold tracking-[0.3em] text-primary-foreground uppercase">What we build</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ul>
            {services.map((s, k) => (
              <li key={s.name} className="border-t border-background/20 last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  onClick={() => setI(k)}
                  aria-pressed={i === k}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left"
                >
                  <span className="font-display text-2xl font-black opacity-90">0{k + 1}</span>
                  <span
                    className={`font-display text-4xl leading-none font-black uppercase transition-colors md:text-6xl ${i === k ? "underline decoration-accent decoration-4 underline-offset-8" : ""}`}
                  >
                    {s.name}
                  </span>
                  <ArrowRight
                    className={`size-6 transition-transform ${i === k ? "translate-x-0 text-accent" : "-translate-x-2 opacity-0"}`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.35 }}
            >
              <img src={img(services[i]!.photo)} alt={services[i]!.name} className="aspect-[4/3] w-full object-cover" />
              <p className="mt-6 text-lg opacity-90">{services[i]!.body}</p>
              <dl className="mt-6 grid grid-cols-2 gap-px bg-background/20">
                <div className="bg-foreground p-4">
                  <dt className="text-xs tracking-widest uppercase opacity-90">Typical budget</dt>
                  <dd className="font-display text-3xl font-black">from {services[i]!.from}</dd>
                </div>
                <div className="bg-foreground p-4">
                  <dt className="text-xs tracking-widest uppercase opacity-90">On site</dt>
                  <dd className="font-display text-3xl font-black">{services[i]!.weeks}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
