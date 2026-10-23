"use client";

// design-ok: glow-blob — the light source of the rays

import type { ReactNode } from "react";
import { motion } from "motion/react";

/*
 * Soft volumetric light rays falling from the top edge with floating dust motes.
 * Built from blurred, blended gradient strips — no canvas. Works on light and dark themes.
 */

const rays = [
  { left: "38%", width: "9%", rotate: -18, delay: 0, dur: 9 },
  { left: "46%", width: "14%", rotate: -6, delay: 1.2, dur: 11 },
  { left: "52%", width: "6%", rotate: 4, delay: 0.6, dur: 8 },
  { left: "57%", width: "11%", rotate: 14, delay: 2, dur: 12 },
  { left: "32%", width: "5%", rotate: -28, delay: 2.6, dur: 10 },
  { left: "64%", width: "6%", rotate: 26, delay: 1.6, dur: 9 },
];
const motes = Array.from({ length: 28 }, (_, i) => ({ x: 30 + ((i * 37) % 40), y: (i * 53) % 90, d: 6 + (i % 5) * 2, s: 2 + (i % 3) }));

// intensity="soft" dims the rays for lighter pages.
export default function LightRaysBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const bold = intensity === "bold";
  return (
    <div className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background font-sans text-foreground">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className={`absolute -top-1/4 left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full blur-[110px] ${bold ? "bg-primary/45" : "bg-primary/25"}`}
        />
        {rays.map((r, i) => (
          <motion.div
            key={i}
            className={`absolute -top-[10%] h-[95%] origin-top bg-gradient-to-b to-transparent mix-blend-plus-lighter blur-xl ${bold ? "from-primary/85 via-primary/35 dark:from-primary/95" : "from-primary/50 via-primary/15 dark:from-primary/60"}`}
            style={{ left: r.left, width: r.width, rotate: r.rotate }}
            animate={{ opacity: [0.35, 0.9, 0.35], rotate: [r.rotate - 2, r.rotate + 2, r.rotate - 2] }}
            transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {motes.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary"
            style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.s, height: m.s }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: m.d, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Light rays</h2>
          <p className="mt-3 text-muted-foreground">Volumetric beams and dust from your theme’s primary colour.</p>
        </div>
      )}
    </div>
  );
}
