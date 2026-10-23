"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building, Home, House, Warehouse } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const types = [
  { id: "flat", label: "Flat", icon: Building, base: 210 },
  { id: "terrace", label: "Terraced", icon: Warehouse, base: 330 },
  { id: "semi", label: "Semi", icon: Home, base: 410 },
  { id: "detached", label: "Detached", icon: House, base: 560 },
];

export default function KeystoneValuation() {
  const [type, setType] = useState(2);
  const [beds, setBeds] = useState(3);
  const [shown, setShown] = useState(false);
  const mid = types[type]!.base + (beds - 2) * 55;
  const low = Math.round(mid * 0.94);
  const high = Math.round(mid * 1.06);

  return (
    <section id="valuation" className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-6 py-20 md:px-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary-foreground uppercase">Thinking of selling?</p>
          <h2 className="mt-4 font-display text-5xl leading-tight">What’s your home worth?</h2>
          <p className="mt-4 max-w-md opacity-90">
            A quick estimate from 1,200 local sales. For an exact figure, one of our valuers will visit, free and with no pressure to list.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShown(true);
            }}
            className="mt-10 space-y-6"
          >
            <input
              required
              placeholder="Your postcode"
              aria-label="Postcode"
              className="w-full border-b border-primary-foreground/40 bg-transparent py-3 text-lg uppercase outline-none placeholder:text-primary-foreground/50 placeholder:normal-case focus:border-accent"
            />
            <div className="grid grid-cols-4 gap-2">
              {types.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setType(i);
                    setShown(false);
                  }}
                  aria-pressed={type === i}
                  className={`flex flex-col items-center gap-2 border py-4 text-xs font-semibold tracking-wider uppercase transition ${type === i ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/25 hover:border-primary-foreground"}`}
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <t.icon className="size-5" /> {t.label}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="ks-beds" className="flex justify-between text-sm">
                <span>Bedrooms</span>
                <span className="font-display text-2xl">{beds}</span>
              </label>
              <input
                id="ks-beds"
                type="range"
                min={1}
                max={6}
                value={beds}
                onChange={(e) => {
                  setBeds(Number(e.target.value));
                  setShown(false);
                }}
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase"
              style={{ borderRadius: "var(--radius)" }}
            >
              Get my estimate
            </button>
          </form>
          <AnimatePresence>
            {shown && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 border-t border-primary-foreground/20 pt-6"
              >
                <p className="text-sm opacity-75">Estimated value</p>
                <p className="font-display text-5xl">
                  £{low}k – £{high}k
                </p>
                <a href="#contact" className="mt-3 inline-block text-sm font-semibold text-accent underline underline-offset-4">
                  Book a free in-person valuation →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative min-h-[360px]">
          <img
            src={img("photo-1757524503555-b62633f47670")}
            alt="Modern living room with fireplace and tall windows"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute right-6 bottom-6 left-6 grid grid-cols-3 gap-px bg-border text-card-foreground">
            {[
              ["98.7%", "of asking price achieved"],
              ["24 days", "average time to sale"],
              ["#1", "for sales in GL50, 2025"],
            ].map(([n, l]) => (
              <div key={l} className="bg-card p-4">
                <p className="font-display text-2xl">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
