"use client";

// design-ok: glow-blob — the horizon glow is the effect
// design-ok: neon-glow — neon rings are the effect

import type { ReactNode } from "react";
import { motion } from "motion/react";

/*
 * Concentric neon rings pulsing outward from a glowing horizon — CSS borders and blur only,
 * animated with motion. Ring colour is the theme's primary; the core glow mixes in accent.
 */

const RINGS = 7;

export default function NeonRingsBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_70%,transparent),transparent)] blur-3xl" />
        {Array.from({ length: RINGS }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 left-1/2 aspect-square w-[40vmax] -translate-x-1/2 translate-y-1/2 rounded-full border border-[color-mix(in_oklab,var(--primary)_75%,white)] shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_60%,transparent),inset_0_0_24px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 3.2], opacity: [0, 0.9, 0] }}
            transition={{ duration: 9, repeat: Infinity, delay: (i * 9) / RINGS, ease: "easeOut" }}
          />
        ))}
        {/* glowing horizon line */}
        <div className="absolute right-0 bottom-0 left-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),white,var(--accent),transparent)] shadow-[0_0_30px_6px_var(--primary)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      {children ?? (
        <div className="-mt-20 px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Neon rings</h2>
          <p className="mt-3 text-white/70">Pulses outward from the horizon. CSS only.</p>
        </div>
      )}
    </div>
  );
}
