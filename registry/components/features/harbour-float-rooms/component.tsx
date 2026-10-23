"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const ROOMS = [
  {
    title: "Float room",
    price: "60 min · £55",
    body: "A shallow pool of skin-warm water with 500 kg of Epsom salt, so you float without trying. Lights and music off when you are ready.",
    photo: "photo-1765814734934-9dd0d18509b4",
    alt: "Clear turquoise water in an empty pool",
  },
  {
    title: "Wood-fired sauna",
    price: "90 min · £28",
    body: "Cedar benches for eight, a stove we light at 9am, and a window onto the harbour wall.",
    photo: "photo-1757940661240-f2e8d2ff93bf",
    alt: "Wooden sauna with a stone heater and low lights",
  },
  {
    title: "Cold plunge",
    price: "Included with the sauna",
    body: "Two steel tubs kept at 6°C. Two minutes is plenty the first time.",
    photo: "photo-1713270232602-bf8dc038d91c",
    alt: "A man standing beside a steel tub of cold water",
  },
];

export default function HarbourFloatRooms() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold">
          Three rooms, one ticket at the door
        </h2>
        <div className="mt-12 flex flex-col gap-4 md:h-[34rem] md:flex-row">
          {ROOMS.map((r, i) => (
            <motion.button
              key={r.title}
              type="button"
              layout={!reduce}
              onClick={() => setOpen(i)}
              onPointerEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              aria-expanded={open === i}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className={`relative min-h-64 overflow-hidden rounded-[var(--radius)] text-left md:min-h-0 ${open === i ? "md:flex-[3]" : "md:flex-1"}`}
            >
              <img src={img(r.photo)} alt={r.alt} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-4 bottom-4 block rounded-[var(--radius)] bg-card p-5 text-card-foreground">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xl font-bold">{r.title}</span>
                  <span className="text-sm font-semibold text-primary">{r.price}</span>
                </span>
                {open === i && (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-2 block text-muted-foreground"
                  >
                    {r.body}
                  </motion.span>
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
