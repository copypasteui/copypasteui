"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Heart, Leaf, Flower2 } from "lucide-react";

const packages = [
  {
    id: "retreat",
    icon: Leaf,
    name: "Forest Retreat",
    perNight: 340,
    tagline: "Our classic stay",
    includes: ["Fern Pool Villa", "Breakfast & afternoon tea", "Daily sunrise yoga", "Airport transfer"],
  },
  {
    id: "honeymoon",
    icon: Heart,
    name: "Honeymoon",
    perNight: 420,
    tagline: "Most booked",
    includes: [
      "Fern Pool Villa with flower bath",
      "Private dinner by the river",
      "90-min couples massage",
      "Floating breakfast",
      "Airport transfer",
    ],
  },
  {
    id: "wellness",
    icon: Flower2,
    name: "Reset & Restore",
    perNight: 390,
    tagline: "Minimum 5 nights",
    includes: ["River Suite", "Plant-based full board", "Daily yoga & breathwork", "Three spa treatments", "Consultation with our healer"],
  },
];
const nightOptions = [3, 5, 7];

export default function CanopyPackages() {
  const [nights, setNights] = useState(5);
  const [pick, setPick] = useState("honeymoon");

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">Packages</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Stay a little longer.</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Nights</span>
            <div className="flex rounded-full border border-border p-1">
              {nightOptions.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNights(n)}
                  aria-pressed={nights === n}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold ${nights === n ? "text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {nights === n && <motion.span layoutId="canopy-nights" className="absolute inset-0 rounded-full bg-primary" />}
                  <span className="relative">{n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => {
            const on = pick === p.id;
            const n = p.id === "wellness" ? Math.max(5, nights) : nights;
            const discount = n >= 7 ? 0.15 : n >= 5 ? 0.1 : 0;
            const total = Math.round(p.perNight * n * (1 - discount));
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setPick(p.id)}
                aria-pressed={on}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col p-8 text-left transition-colors ${on ? "bg-primary text-primary-foreground" : "border border-border bg-card text-card-foreground"}`}
                style={{ borderRadius: "calc(var(--radius) * 2)" }}
              >
                <span className="flex items-center justify-between">
                  <p.icon className="size-7" />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${on ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {p.tagline}
                  </span>
                </span>
                <span className="mt-8 font-display text-3xl">{p.name}</span>
                <span className="mt-6 flex items-baseline gap-2">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-5xl tabular-nums"
                  >
                    ${total.toLocaleString("en-US")}
                  </motion.span>
                  <span className="text-sm opacity-90">for {n} nights</span>
                </span>
                {discount > 0 && <span className="mt-1 text-sm font-semibold">{Math.round(discount * 100)}% long-stay saving applied</span>}
                <ul className="mt-8 space-y-3 border-t border-current/15 pt-6 text-sm">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check className="size-4 shrink-0" /> {x}
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-secondary px-6 py-5 text-secondary-foreground"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-sm">Best rate guaranteed when you book direct · Free cancellation up to 30 days before arrival</p>
          <a
            href="#"
            className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            style={{ borderRadius: "var(--radius)" }}
          >
            Enquire about {packages.find((p) => p.id === pick)!.name}
          </a>
        </div>
      </div>
    </section>
  );
}
