"use client";

// design-ok: glow-blob — drifting mist is the effect

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
 * Layered blue ridges. Bands of mist drift sideways at different speeds and heights, and as you scroll the
 * range rises while the mist sinks, for depth.
 */
const PHOTO = "https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?auto=format&fit=crop&w=2400&q=80";
const BANDS = [
  { top: "38%", h: "22%", duration: 60, from: "-30%", to: "30%", opacity: 0.55 },
  { top: "55%", h: "26%", duration: 44, from: "25%", to: "-25%", opacity: 0.45 },
  { top: "70%", h: "30%", duration: 70, from: "-20%", to: "20%", opacity: 0.6 },
];

export default function MountainMistBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rise = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const sink = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-foreground font-sans text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.img
          src={PHOTO}
          alt=""
          style={reduce ? {} : { y: rise }}
          className="absolute inset-x-0 -top-[5%] h-[115%] w-full object-cover"
        />
        <motion.div style={reduce ? {} : { y: sink }} className="absolute inset-0">
          {BANDS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ x: b.from }}
              animate={reduce ? {} : { x: [b.from, b.to, b.from] }}
              transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-x-1/4 rounded-[50%] bg-white blur-3xl"
              style={{ top: b.top, height: b.h, opacity: b.opacity }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--primary)_45%,rgb(0_0_0/0.7))_0%,color-mix(in_oklab,var(--primary)_25%,rgb(0_0_0/0.45))_45%,transparent_75%)]" />
      </div>
      {children ?? (
        <div className="-mt-32 px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Mountain mist</h2>
          <p className="mt-3">Mist drifts through the valleys; scroll and the range rises.</p>
        </div>
      )}
    </div>
  );
}
