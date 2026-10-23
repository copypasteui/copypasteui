"use client";

// design-ok: glow-blob — the ring's halo is the effect

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/*
 * A total-eclipse ring: a rotating conic-gradient corona masked to a thin ring around a
 * black disc, with a soft bloom. Tilts slightly toward the cursor. CSS + motion only.
 */

export default function EclipseRingBackground({ children }: { children?: ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 60, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 20 });

  return (
    <div
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black font-sans text-white"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div
        aria-hidden
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_45%,transparent),transparent)] blur-2xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full blur-[1px] [background:conic-gradient(from_0deg,transparent_0deg,var(--primary)_60deg,white_95deg,var(--accent)_130deg,transparent_200deg,transparent_360deg)] [mask:radial-gradient(closest-side,transparent_93%,black_95.5%,transparent_100%)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full opacity-70 blur-md [background:conic-gradient(from_180deg,transparent,var(--accent)_40deg,transparent_120deg)] [mask:radial-gradient(closest-side,transparent_90%,black_96%,transparent_100%)]"
        />
        <div className="absolute inset-[4%] rounded-full bg-black shadow-[inset_0_0_60px_rgba(0,0,0,1)]" />
      </motion.div>
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">Eclipse</h2>
          <p className="mt-3 text-white/70">A rotating corona that leans toward your cursor.</p>
        </div>
      )}
    </div>
  );
}
