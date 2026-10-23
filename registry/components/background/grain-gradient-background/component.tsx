"use client";

// design-ok: glow-blob — blurred colour fields under grain are the effect

import type { ReactNode } from "react";
import { motion } from "motion/react";

/*
 * A soft pastel mesh: four blurred colour fields drifting slowly, with an SVG
 * film-grain overlay for a printed feel. Great behind light, airy hero sections.
 */

const blobs = [
  { cls: "bg-primary/60", boldCls: "bg-primary", pos: "left-[-10%] top-[-10%]", x: ["0%", "18%", "0%"], y: ["0%", "12%", "0%"], d: 18 },
  { cls: "bg-accent", boldCls: "bg-accent", pos: "right-[-15%] top-[5%]", x: ["0%", "-14%", "0%"], y: ["0%", "18%", "0%"], d: 22 },
  { cls: "bg-secondary", boldCls: "bg-accent/70", pos: "bottom-[-20%] left-[15%]", x: ["0%", "12%", "0%"], y: ["0%", "-14%", "0%"], d: 20 },
  {
    cls: "bg-primary/35",
    boldCls: "bg-primary/75",
    pos: "bottom-[-10%] right-[5%]",
    x: ["0%", "-10%", "0%"],
    y: ["0%", "-10%", "0%"],
    d: 26,
  },
];

// intensity="soft" keeps the pastel wash faint.
export default function GrainGradientBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const bold = intensity === "bold";
  return (
    <div className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background font-sans text-foreground">
      <div aria-hidden className="absolute inset-0 -z-10">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute size-[60vmax] rounded-full ${bold ? `blur-[80px] ${b.boldCls}` : `blur-[100px] ${b.cls}`} ${b.pos}`}
            animate={{ x: b.x, y: b.y }}
            transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <svg className="absolute inset-0 size-full opacity-[0.22] mix-blend-overlay">
          <filter id="grain-gradient-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-gradient-noise)" />
        </svg>
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Grain gradient</h2>
          <p className="mt-3 text-foreground/70">Drifting colour fields with a film-grain finish.</p>
        </div>
      )}
    </div>
  );
}
