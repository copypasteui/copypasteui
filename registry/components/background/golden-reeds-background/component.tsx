"use client";

// design-ok: glow-blob — the sun flare is the effect

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Backlit reeds at sunset. A sun flare breathes over the horizon, light rays turn slowly around it, and dust
 * motes float up through the glow. The flare and rays are tinted towards your theme's accent.
 */
const PHOTO = "https://images.unsplash.com/photo-1622038068435-be7e052a0f6a?auto=format&fit=crop&w=2400&q=80";
const MOTES = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 2 + ((i * 7) % 5),
  delay: (i * 0.7) % 9,
  duration: 9 + ((i * 3) % 7),
}));

export default function GoldenReedsBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src={PHOTO} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.25),transparent_50%,rgb(0_0_0/0.55))]" />
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[22%] size-[36vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_244_214/0.95),color-mix(in_oklab,var(--accent)_55%,transparent)_35%,transparent_70%)] mix-blend-screen blur-xl"
        />
        <motion.div
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[22%] size-[160vmax] -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen [background:repeating-conic-gradient(from_0deg,rgb(255_236_190/0.5)_0deg_2deg,transparent_2deg_14deg)] [mask:radial-gradient(closest-side,black,transparent_70%)]"
        />
        {!reduce &&
          MOTES.map((m, i) => (
            <motion.span
              key={i}
              initial={{ y: "105vh", opacity: 0 }}
              animate={{ y: "-5vh", opacity: [0, 0.9, 0] }}
              transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full bg-[rgb(255_240_200)]"
              style={{ left: m.left, width: m.size, height: m.size }}
            />
          ))}
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Golden reeds</h2>
          <p className="mt-3">A breathing sun flare and slow light rays over the reeds.</p>
        </div>
      )}
    </div>
  );
}
