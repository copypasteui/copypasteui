"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const reviews = [
  {
    name: "Clara M.",
    from: "Lisbon",
    stay: "Sea-view Suite · June",
    photo: "photo-1494790108377-be9c29b29330",
    room: "photo-1785512364392-a3ab5a83b254",
    quote:
      "We came for three nights and rebooked for the same week next year before we’d even left. The staff remembered how we took our coffee by day two.",
  },
  {
    name: "Daniel R.",
    from: "Zürich",
    stay: "Cliff Villa · September",
    photo: "photo-1500648767791-00dcc994a43e",
    room: "photo-1622816951464-df6fc7ab2ced",
    quote: "The most restful place I’ve stayed. No music by the pool, no rush at breakfast, and a sunset that made everyone go quiet.",
  },
  {
    name: "Aiko T.",
    from: "Kyoto",
    stay: "Terrace Loft · May",
    photo: "photo-1758599543111-36ce5c34fceb",
    room: "photo-1679394900352-05fd1ed3ed48",
    quote:
      "Every detail felt considered: the linen, the light, the little handwritten notes. It felt like staying with very stylish friends.",
  },
];
const scores = [
  { label: "Booking guests", value: "9.6" },
  { label: "Tripadvisor", value: "4.5" },
  { label: "Google", value: "4.7" },
];

export default function SolenneGuestReviews() {
  const [i, setI] = useState(0);
  const r = reviews[i]!;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={r.room}
              src={img(r.room)}
              alt=""
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute right-5 bottom-5 left-5 grid grid-cols-3 gap-2">
            {scores.map((s) => (
              <div key={s.label} className="rounded-2xl bg-background/90 p-3 text-center backdrop-blur">
                <p className="font-display text-3xl leading-none">{s.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">Guest book</p>
          <div className="mt-4 flex gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="size-5 fill-current" />
            ))}
          </div>
          <div className="relative mt-6 min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
                className="font-display text-3xl leading-snug md:text-[2.6rem]"
              >
                “{r.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {reviews.map((g, k) => (
              <button
                key={g.name}
                type="button"
                onClick={() => setI(k)}
                className={`flex items-center gap-3 rounded-full border p-1.5 pr-5 text-left transition ${k === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/40"}`}
              >
                <img src={img(g.photo, 160)} alt="" className="size-11 rounded-full object-cover" />
                <span className="text-sm leading-tight">
                  <span className="block font-medium">
                    {g.name} · {g.from}
                  </span>
                  <span className={`block text-xs ${k === i ? "opacity-90" : "text-muted-foreground"}`}>{g.stay}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
