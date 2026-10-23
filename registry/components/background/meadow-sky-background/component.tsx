"use client";

import { type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/*
 * Rolling hills under heavy cloud. The photo zooms slowly, a soft band of cloud shadow sweeps across the
 * hills, and the whole scene leans a little away from the cursor. A free Unsplash photo, hotlinked.
 */
const PHOTO = "https://images.unsplash.com/photo-1679556449777-8e44106565ea?auto=format&fit=crop&w=2400&q=80";

export default function MeadowSkyBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(useTransform(px, [-0.5, 0.5], [18, -18]), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), { stiffness: 60, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-foreground font-sans text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.img
          src={PHOTO}
          alt=""
          style={reduce ? {} : { x, y }}
          initial={{ scale: 1.12 }}
          animate={reduce ? {} : { scale: [1.12, 1.22, 1.12] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-4%] size-[108%] object-cover"
        />
        {/* A cloud shadow: a wide, soft dark band drifting over the hills. */}
        {!reduce && (
          <motion.div
            initial={{ x: "-60%" }}
            animate={{ x: "160%" }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-2/3 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.28),transparent)]"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.45),transparent_45%,color-mix(in_oklab,var(--primary)_35%,rgb(0_0_0/0.55)))]" />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Meadow sky</h2>
          <p className="mt-3">Cloud shadows cross the hills. Move the cursor to lean the view.</p>
        </div>
      )}
    </div>
  );
}
