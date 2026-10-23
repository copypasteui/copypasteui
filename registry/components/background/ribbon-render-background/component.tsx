"use client";

import { type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/*
 * A glossy 3D ribbon render, tilted in perspective towards the cursor, with a specular sheen that follows it
 * across the surface. Drifts on its own when the cursor is away.
 */
const PHOTO = "https://images.unsplash.com/photo-1676676701269-65de47175adf?auto=format&fit=crop&w=2400&q=80";

export default function RibbonRenderBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 70, damping: 18 });
  const sy = useSpring(py, { stiffness: 70, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const lx = useTransform(sx, (v) => v * 100);
  const ly = useTransform(sy, (v) => v * 100);
  const sheen = useMotionTemplate`radial-gradient(40% 50% at ${lx}% ${ly}%, rgb(255 255 255 / 0.35), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white [perspective:1400px]"
    >
      <motion.div
        aria-hidden
        style={reduce ? {} : { rotateX, rotateY }}
        animate={reduce ? {} : { scale: [1.08, 1.14, 1.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10"
      >
        <img src={PHOTO} alt="" className="absolute inset-0 size-full object-cover" />
        <motion.div style={{ background: sheen }} className="absolute inset-0 mix-blend-overlay" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.55))]" />
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Ribbon render</h2>
          <p className="mt-3">Tilts towards the cursor, with a sheen that follows it.</p>
        </div>
      )}
    </div>
  );
}
