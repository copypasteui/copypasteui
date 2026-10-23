"use client";

// design-ok: glow-blob — the light under the beams is the effect
// design-ok: neon-glow — the falling beams are lit lines

import { motion } from "motion/react";
import type { ReactNode } from "react";

const beams = [
  { left: "12%", delay: 0, duration: 6 },
  { left: "31%", delay: 2.2, duration: 7 },
  { left: "54%", delay: 1, duration: 5.5 },
  { left: "73%", delay: 3.4, duration: 6.5 },
  { left: "88%", delay: 0.6, duration: 8 },
];

// Full-bleed grid with light beams falling along the lines. Wrap any content.
// intensity="soft" keeps the grid in the border colour and the beams thin.
export default function GridBeamsBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const bold = intensity === "bold";
  return (
    <div className="relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden bg-background font-sans">
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] [background-size:48px_48px] ${bold ? "[background-image:linear-gradient(color-mix(in_oklab,var(--primary)_35%,var(--border))_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--primary)_35%,var(--border))_1px,transparent_1px)]" : "[background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)]"}`}
      />
      {beams.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`absolute top-0 -z-10 bg-gradient-to-b from-transparent via-primary to-transparent ${bold ? "h-48 w-0.5 shadow-[0_0_12px_var(--primary)]" : "h-32 w-px"}`}
          style={{ left: b.left }}
          initial={{ y: "-10rem", opacity: 0 }}
          animate={{ y: "40rem", opacity: [0, 1, 1, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <div
        aria-hidden
        className={`absolute bottom-0 left-1/2 -z-10 h-40 w-2/3 -translate-x-1/2 rounded-full blur-3xl ${bold ? "bg-primary/45" : "bg-primary/20"}`}
      />
      {children ?? (
        <div className="px-6 text-center">
          <p className="font-mono text-sm text-primary">{"/* background */"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">Grid beams</h2>
          <p className="mt-3 text-muted-foreground">Put your hero, CTA or anything else inside.</p>
        </div>
      )}
    </div>
  );
}
