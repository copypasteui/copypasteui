"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bath, BedDouble, Menu, Minus, Plus, SprayCan } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const Step = ({
  icon: Icon,
  label,
  v,
  set,
  min,
  max,
}: {
  icon: typeof Bath;
  label: string;
  v: number;
  set: (n: number) => void;
  min: number;
  max: number;
}) => (
  <div className="flex items-center justify-between gap-3 rounded-[var(--radius)] bg-muted px-4 py-3">
    <span className="flex items-center gap-2 text-sm font-medium">
      <Icon className="size-4 text-primary" /> {label}
    </span>
    <span className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`Fewer ${label.toLowerCase()}`}
        onClick={() => set(Math.max(min, v - 1))}
        className="grid size-8 place-items-center rounded-full bg-card"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-4 text-center font-display text-lg font-semibold">{v}</span>
      <button
        type="button"
        aria-label={`More ${label.toLowerCase()}`}
        onClick={() => set(Math.min(max, v + 1))}
        className="grid size-8 place-items-center rounded-full bg-card"
      >
        <Plus className="size-3.5" />
      </button>
    </span>
  </div>
);

export default function SpruceHero() {
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  const hours = Math.max(2, 1.5 + beds * 0.5 + baths * 0.5);
  const price = Math.round(hours * 24);

  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-3xl font-semibold text-primary">
          <SprayCan className="size-7" /> spruce
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {["Regular cleans", "Deep cleans", "End of tenancy", "Offices", "Reviews"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#prices"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Get a price
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold"
          >
            Come home to a <span className="text-primary">sparkling</span> house.
          </motion.h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Vetted, insured, friendly cleaners, and the same one every visit. Weekly, fortnightly or just once before the in-laws arrive.
          </p>

          <div className="mt-8 max-w-md rounded-[calc(var(--radius)*1.2)] border border-border bg-card p-5 text-card-foreground">
            <p className="font-semibold">Instant price</p>
            <div className="mt-3 space-y-2">
              <Step icon={BedDouble} label="Bedrooms" v={beds} set={setBeds} min={0} max={6} />
              <Step icon={Bath} label="Bathrooms" v={baths} set={setBaths} min={1} max={4} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p>
                <motion.span
                  key={price}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block font-display text-4xl font-semibold"
                >
                  £{price}
                </motion.span>
                <span className="text-sm text-muted-foreground"> / clean · {hours} hrs</span>
              </p>
              <a href="#prices" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                Book
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden rounded-[calc(var(--radius)*2.5)]"
          >
            <img
              src={img("photo-1758273238415-01ec03d9ef27")}
              alt="Cleaner mopping a bright living room"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
