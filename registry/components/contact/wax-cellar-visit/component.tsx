"use client";

import { motion, useReducedMotion } from "motion/react";
import { Headphones, MapPin } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const BARS = [0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8];

export default function WaxCellarVisit() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <img
          src={img("photo-1569823035625-1af6550f37d4")}
          alt="Wooden racks of vinyl records"
          className="aspect-[4/3] w-full rounded-[var(--radius)] border border-foreground object-cover"
        />
        <div className="flex flex-col">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none font-extrabold">Come down</h2>
          <p className="mt-5 flex gap-2">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden /> Basement, 31 Goose Gate, Nottingham NG1 1FE. Look for the
            pink door next to the café.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-y-2">
            <dt className="font-semibold">Tue to Fri</dt>
            <dd>11am to 7pm</dd>
            <dt className="font-semibold">Saturday</dt>
            <dd>10am to 7pm</dd>
            <dt className="font-semibold">Sunday</dt>
            <dd>12 to 5pm</dd>
          </dl>
          <p className="mt-6 flex gap-2 text-muted-foreground">
            <Headphones className="mt-1 size-5 shrink-0" aria-hidden /> Two listening decks with headphones. No time limit, no need to buy.
          </p>

          <div className="mt-auto flex items-center gap-4 rounded-[var(--radius)] border border-foreground bg-accent p-4 text-accent-foreground">
            <span className="flex h-8 items-end gap-1" aria-hidden>
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 origin-bottom rounded-sm bg-current"
                  style={{ height: "100%", scaleY: h }}
                  animate={reduce ? {} : { scaleY: [h, 0.2, h * 0.8, 1, h] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                />
              ))}
            </span>
            <p>
              <span className="block text-sm font-semibold uppercase">On the shop deck</span>
              <span className="font-bold">Marigold Jones, Sweet Water (side B)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
