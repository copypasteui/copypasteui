"use client";

import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const EVENTS = [
  {
    day: "Thu",
    title: "Quiz night",
    detail: "From 8pm. Teams of up to six, £2 a head, bar tab for the winners.",
    photo: "photo-1761427097572-25d7d64fe42b",
    alt: "A glass of beer held up under string lights",
  },
  {
    day: "Fri",
    title: "Street food: Baba's Kitchen",
    detail: "Lebanese wraps and loaded fries from 5pm until they sell out.",
    photo: "photo-1584225064536-d0fbc0a10f18",
    alt: "Bar staff pouring beers behind the counter",
  },
  {
    day: "Sat",
    title: "Brewery tour",
    detail: "2pm, 75 minutes, £15 with a schooner. Twelve places, book ahead.",
    photo: "photo-1651475828382-1ffeea47739b",
    alt: "Steel brewing kit inside the brewhouse",
  },
  {
    day: "Sun",
    title: "Dogs and roast",
    detail: "Roast from the van out front, 12 to 4. Water bowls by the door.",
    photo: "photo-1758380742009-163a0deee80e",
    alt: "A tall glass of golden beer with a foam head",
  },
];

export default function LockfastEvents() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  const active = hovered === null ? null : EVENTS[hovered];

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none uppercase">Every week at the taproom</h2>
        <ul onPointerMove={onMove} onPointerLeave={() => setHovered(null)} className="relative mt-12 border-t border-foreground">
          {EVENTS.map((e, i) => (
            <li key={e.title} onPointerEnter={() => setHovered(i)} className="border-b border-foreground">
              <a
                href="#"
                className="group grid items-baseline gap-2 py-7 transition-colors hover:bg-accent hover:text-accent-foreground md:grid-cols-[6rem_1fr_1.2fr_auto] md:gap-8 md:px-4"
              >
                <span className="font-display text-3xl uppercase">{e.day}</span>
                <span className="text-2xl font-bold">{e.title}</span>
                <span>{e.detail}</span>
                <ArrowUpRight className="hidden size-6 transition-transform group-hover:rotate-45 md:block" aria-hidden />
              </a>
            </li>
          ))}
          {!reduce && (
            <AnimatePresence>
              {active && (
                <motion.img
                  key={active.photo}
                  src={img(active.photo)}
                  alt=""
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ x: sx, y: sy }}
                  className="pointer-events-none absolute top-0 left-0 -mt-28 ml-6 hidden h-56 w-44 rounded-[var(--radius)] border border-foreground object-cover shadow-xl lg:block"
                />
              )}
            </AnimatePresence>
          )}
        </ul>
      </div>
    </section>
  );
}
