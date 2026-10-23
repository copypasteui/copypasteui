"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const rooms = {
  Kitchen: {
    photo: "photo-1757387240036-d7eb9b096c40",
    list: [
      "Worktops, splashbacks & hob",
      "Outside of all appliances",
      "Sink & taps descaled",
      "Cupboard fronts & handles",
      "Microwave inside & out",
      "Floors vacuumed & mopped",
    ],
  },
  Bathroom: {
    photo: "photo-1585421514284-efb74c2b69ba",
    list: [
      "Toilet, inside and out",
      "Bath, shower & screen",
      "Tiles & grout wiped",
      "Mirrors streak-free",
      "Towels folded",
      "Bins emptied",
    ],
  },
  "Living areas": {
    photo: "photo-1583847268964-b28dc8f51f92",
    list: [
      "Dusting, high and low",
      "Sofa hoovered & plumped",
      "Skirting boards",
      "Light switches & handles",
      "Glass & mirrors",
      "Floors vacuumed & mopped",
    ],
  },
  Bedrooms: {
    photo: "photo-1560448204-e02f11c3d0e2",
    list: ["Beds made (or changed)", "Bedside tables & lamps", "Wardrobe fronts", "Window sills", "Under the bed", "Floors vacuumed"],
  },
};

export default function SpruceChecklist() {
  const [room, setRoom] = useState<keyof typeof rooms>("Kitchen");
  const r = rooms[room];

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-display text-5xl font-semibold">What’s in every clean</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {(Object.keys(rooms) as (keyof typeof rooms)[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setRoom(k)}
              aria-pressed={room === k}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${room === k ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*1.5)]">
            <AnimatePresence initial={false}>
              <motion.img
                key={r.photo}
                src={img(r.photo)}
                alt={room}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={room}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {r.list.map((x) => (
                <motion.li
                  key={x}
                  variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0 } }}
                  className="flex items-center gap-3 rounded-[var(--radius)] bg-card p-4 text-card-foreground shadow-sm"
                >
                  <motion.span
                    variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="size-4" />
                  </motion.span>
                  <span className="text-sm font-medium">{x}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
