"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Drawn sleeves for fictional releases, so no real artwork is shown.
const RECORDS = [
  {
    artist: "The Lacemakers",
    title: "Trent Side Sessions",
    genre: "Folk",
    grade: "VG+",
    price: "£14",
    ink: "bg-primary text-primary-foreground",
    shape: "rounded-full",
  },
  {
    artist: "Delta Static",
    title: "Night Bus EP",
    genre: "Electronic",
    grade: "New",
    price: "£22",
    ink: "bg-accent text-accent-foreground",
    shape: "rounded-none rotate-45",
  },
  {
    artist: "Marigold Jones",
    title: "Sweet Water",
    genre: "Soul",
    grade: "VG",
    price: "£18",
    ink: "bg-foreground text-background",
    shape: "rounded-[40%]",
  },
  {
    artist: "Kestrel Quartet",
    title: "Live at the Bowl",
    genre: "Jazz",
    grade: "VG+",
    price: "£25",
    ink: "bg-secondary text-secondary-foreground",
    shape: "rounded-t-full",
  },
  {
    artist: "Paper Planes Club",
    title: "Second Floor",
    genre: "Indie",
    grade: "New",
    price: "£24",
    ink: "bg-primary text-primary-foreground",
    shape: "rounded-b-full",
  },
];

export default function WaxCellarNewIn() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(RECORDS.map((_, i) => i));
  const top = RECORDS[order[0]!]!;
  const next = () => setOrder(([first, ...rest]) => [...rest, first!]);

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="relative mx-auto h-80 w-80 sm:h-96 sm:w-96">
          <AnimatePresence initial={false}>
            {order
              .slice(0, 4)
              .reverse()
              .map((idx, depth, arr) => {
                const r = RECORDS[idx]!;
                const isTop = depth === arr.length - 1;
                const offset = arr.length - 1 - depth;
                return (
                  <motion.div
                    key={r.title}
                    drag={isTop && !reduce ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && next()}
                    initial={{ scale: 0.9, y: 30, opacity: 0 }}
                    animate={{ scale: 1 - offset * 0.05, y: offset * -14, rotate: offset * 2, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { x: 260, rotate: 18, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[var(--radius)] border border-foreground p-6 shadow-lg ${r.ink} ${isTop && !reduce ? "cursor-grab active:cursor-grabbing" : ""}`}
                    aria-hidden={!isTop}
                  >
                    <span
                      className={`absolute -right-10 -bottom-10 size-48 opacity-30 mix-blend-multiply ${r.shape} bg-current`}
                      aria-hidden
                    />
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase">{r.artist}</span>
                    <span className="font-display text-4xl leading-none font-extrabold">{r.title}</span>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none font-extrabold">New in this week</h2>
          <p className="mt-4 text-muted-foreground">
            Flick the top sleeve away, or use the button. Everything is in the shop until Saturday; after that, ask.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-foreground py-6" aria-live="polite">
            <div>
              <dt className="text-sm text-muted-foreground">Genre</dt>
              <dd className="mt-1 font-bold">{top.genre}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Condition</dt>
              <dd className="mt-1 font-bold">{top.grade}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Price</dt>
              <dd className="mt-1 font-bold">{top.price}</dd>
            </div>
          </dl>
          <p className="mt-4 font-semibold">
            {top.artist}, <em>{top.title}</em>
          </p>
          <button
            type="button"
            onClick={next}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
          >
            Next record <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
