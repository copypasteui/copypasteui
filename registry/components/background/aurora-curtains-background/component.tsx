"use client";

// design-ok: glow-blob — the aurora's light is the effect

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Curtains of light waving over a dark ridge. Each curtain is a tall band of fine vertical streaks in your primary
 * or accent, fading upwards, that sways and shimmers; stars and a black mountain line sit in front.
 */
const CURTAINS = [
  { left: "-5%", width: "55%", tone: "var(--primary)", duration: 14, skew: [-12, 8, -12], delay: 0 },
  { left: "30%", width: "50%", tone: "var(--accent)", duration: 18, skew: [10, -10, 10], delay: 2 },
  { left: "58%", width: "52%", tone: "var(--primary)", duration: 16, skew: [-6, 12, -6], delay: 4 },
];
const STARS = Array.from({ length: 60 }, (_, i) => ({ x: (i * 53) % 100, y: (i * 29) % 55, s: 1 + (i % 3) }));

export default function AuroraCurtainsBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(2_5_10)] font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/80"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
          />
        ))}
        {CURTAINS.map((c, i) => (
          <motion.div
            key={i}
            animate={reduce ? {} : { skewX: c.skew, x: ["0%", "6%", "0%"], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[4%] h-[70%] origin-bottom mix-blend-screen blur-[2px] [mask:linear-gradient(to_top,black_10%,transparent_95%)]"
            style={{
              left: c.left,
              width: c.width,
              background: `repeating-linear-gradient(90deg, color-mix(in oklab, ${c.tone} 55%, white) 0 2px, color-mix(in oklab, ${c.tone} 70%, rgb(120 255 200)) 2px 7px, transparent 7px 11px)`,
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-[20%] h-1/2 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--accent)_55%,rgb(80_255_190/0.5)),transparent_70%)] blur-2xl" />
        <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[26%] w-full">
          <path
            d="M0 260 V150 L120 110 L210 140 L330 70 L430 120 L540 60 L650 130 L760 90 L880 150 L990 80 L1100 130 L1200 100 V260 Z"
            fill="black"
          />
        </svg>
      </div>
      {children ?? (
        <div className="-mt-[12vh] px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Aurora curtains</h2>
          <p className="mt-3">Waving light over a dark ridge, in your theme&rsquo;s colours.</p>
        </div>
      )}
    </div>
  );
}
