"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Liquid chrome. The render's iridescent colours cycle slowly through the spectrum with a hue rotation while
 * the shape breathes in and out; a vignette in your theme's background keeps text readable.
 */
const PHOTO = "https://images.unsplash.com/photo-1759583545970-0106ff47353f?auto=format&fit=crop&w=2400&q=80";

export default function ChromeLiquidBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white">
      <motion.img
        aria-hidden
        src={PHOTO}
        alt=""
        animate={
          reduce ? {} : { filter: ["hue-rotate(0deg) saturate(1.2)", "hue-rotate(360deg) saturate(1.2)"], scale: [1.05, 1.15, 1.05] }
        }
        transition={{
          filter: { duration: 24, repeat: Infinity, ease: "linear" },
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.35),rgb(0_0_0/0.7))]" />
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Chrome liquid</h2>
          <p className="mt-3">Iridescent colours cycle slowly while the chrome breathes.</p>
        </div>
      )}
    </div>
  );
}
