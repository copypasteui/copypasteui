"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bath, Cable, Droplets, Flame, Gauge, Lightbulb, PlugZap, ShowerHead, Thermometer, Toilet, Wrench, Zap } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const trades = {
  Plumbing: {
    photo: "photo-1676210134188-4c05dd172f89",
    alt: "Plumber fixing pipework under a sink",
    items: [
      { icon: Droplets, name: "Leaks & burst pipes" },
      { icon: Toilet, name: "Toilets & cisterns" },
      { icon: ShowerHead, name: "Showers & taps" },
      { icon: Bath, name: "Bathroom fitting" },
      { icon: Wrench, name: "Blocked drains" },
      { icon: Gauge, name: "Water pressure" },
    ],
  },
  Electrical: {
    photo: "photo-1621905251189-08b45d6a269e",
    alt: "Electrician testing a consumer unit",
    items: [
      { icon: Zap, name: "Fault finding" },
      { icon: Cable, name: "Rewires" },
      { icon: PlugZap, name: "EV chargers" },
      { icon: Lightbulb, name: "Lighting & sockets" },
      { icon: Gauge, name: "Fuse board upgrades" },
      { icon: Zap, name: "EICR certificates" },
    ],
  },
  Heating: {
    photo: "photo-1620653713380-7a34b773fef8",
    alt: "Engineer tightening a fitting on a hot water cylinder",
    items: [
      { icon: Flame, name: "Boiler repair" },
      { icon: Flame, name: "Boiler servicing" },
      { icon: Thermometer, name: "Radiators" },
      { icon: Thermometer, name: "Smart thermostats" },
      { icon: Droplets, name: "Power flushing" },
      { icon: Gauge, name: "Landlord gas safety" },
    ],
  },
};

export default function FixwellServices() {
  const [tab, setTab] = useState<keyof typeof trades>("Plumbing");
  const t = trades[tab];

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-extrabold tracking-tight">One call, three trades.</h2>
          <div className="flex rounded-[var(--radius)] bg-card p-1 text-card-foreground">
            {(Object.keys(trades) as (keyof typeof trades)[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                aria-pressed={tab === k}
                className={`relative rounded-[calc(var(--radius)*0.75)] px-5 py-2.5 text-sm font-semibold ${tab === k ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {tab === k && <motion.span layoutId="fw-tab" className="absolute inset-0 rounded-[calc(var(--radius)*0.75)] bg-primary" />}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 32 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]"
          >
            <img
              src={img(t.photo)}
              alt={t.alt}
              className="aspect-[4/3] w-full rounded-[calc(var(--radius)*1.5)] object-cover lg:aspect-auto lg:h-full"
            />
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {t.items.map((it, i) => (
                <motion.li
                  key={it.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href="#callout"
                    className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius)] bg-card p-5 text-card-foreground transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="grid size-11 place-items-center rounded-[var(--radius)] bg-accent text-accent-foreground">
                      <it.icon className="size-5" />
                    </span>
                    <span className="font-semibold">{it.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
