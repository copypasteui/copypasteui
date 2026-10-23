"use client";

// design-ok: glow-blob — the orb's light is the effect

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * A glowing sphere hovering over a reflective floor. The inside is a turning conic gradient of your primary and
 * accent, the rim catches a bright edge light, and a squashed copy below makes the reflection. CSS only.
 */
export default function GlowOrbBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const spin = reduce ? {} : { rotate: 360 };

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(5_4_10)] font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-[58%] bottom-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]" />
        <div className="absolute inset-x-0 top-[58%] h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_70%,white),transparent)]" />
        <motion.div
          animate={reduce ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[14%] left-1/2 size-[min(62vmin,520px)] -translate-x-1/2"
        >
          <div className="absolute -inset-[30%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_55%,transparent),transparent)] blur-3xl" />
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[inset_0_0_80px_rgb(0_0_0/0.8),0_0_120px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <motion.div
              animate={spin}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1/4 blur-xl saturate-150 [background:conic-gradient(from_0deg,var(--primary),var(--accent),color-mix(in_oklab,var(--primary)_55%,black),var(--accent),var(--primary))]"
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_26%,rgb(255_255_255/0.55),transparent_16%),radial-gradient(circle_at_50%_50%,transparent_50%,rgb(0_0_0/0.65))]" />
          </div>
          <div className="absolute inset-0 rounded-full ring-1 ring-white/40" />
        </motion.div>
        {/* Reflection */}
        <div className="absolute top-[60%] left-1/2 h-[min(20vmin,180px)] w-[min(62vmin,520px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_45%,transparent),transparent)] blur-2xl" />
      </div>
      {children ?? (
        <div className="mt-[34vh] px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Glow orb</h2>
          <p className="mt-3">A turning core of your primary and accent, hovering over its reflection.</p>
        </div>
      )}
    </div>
  );
}
