"use client";

import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, Clock, Droplets, Flame } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const CARDS = [
  { icon: Droplets, title: "Float, 60 minutes", detail: "Your first float £45, then £55", depth: 60, offset: "md:translate-x-10" },
  { icon: Flame, title: "Sauna and cold plunge, 90 minutes", detail: "£28, up to eight people a session", depth: 30, offset: "" },
  {
    icon: Clock,
    title: "Next free float: today, 4:30pm",
    detail: "Room 2 · 3 more slots after 6pm",
    depth: 90,
    offset: "md:translate-x-16",
  },
];

export default function HarbourFloatHero() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate overflow-hidden px-6 pt-32 pb-20 font-sans text-white md:min-h-[100svh] md:pt-40"
    >
      <img
        src={img("photo-1776763255459-99ddd8eebbfc")}
        alt="Warm indoor pool lit low in the evening"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase">Harbour Float &amp; Sauna · Penzance</p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] font-bold">
            Sixty minutes floating in warm salt water
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/90">
            Two float rooms and a wood-fired sauna on the harbour wall. Towels, a shower and earplugs are included; bring nothing but a
            swimsuit for the sauna.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              Book a float <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-[var(--radius)] border border-white/60 px-7 py-4 font-semibold hover:bg-white/15"
            >
              See sauna times
            </a>
          </div>
        </div>

        <div className="[perspective:1200px]">
          <motion.ul style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }} className="grid gap-4">
            {CARDS.map(({ icon: Icon, title, detail, depth, offset }) => (
              <li
                key={title}
                style={reduce ? {} : { transform: `translateZ(${depth}px)` }}
                className={`flex items-center gap-4 rounded-[var(--radius)] border border-white/40 bg-card p-5 text-card-foreground shadow-xl ${offset}`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-sm text-muted-foreground">{detail}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
