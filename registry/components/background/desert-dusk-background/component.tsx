"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Dunes at dusk. The wide photo pans slowly from side to side, and the lower half shimmers like heat
 * through an SVG turbulence filter whose noise drifts over time.
 */
const PHOTO = "https://images.unsplash.com/photo-1705034598432-1694e203cdf3?auto=format&fit=crop&w=2800&q=80";

export default function DesertDuskBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const noise = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = (t: number) => {
      noise.current?.setAttribute("baseFrequency", `0.012 ${0.06 + Math.sin(t / 1400) * 0.012}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white">
      <svg aria-hidden className="absolute size-0">
        <filter id={`heat-${id}`}>
          <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
      </svg>
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.img
          src={PHOTO}
          alt=""
          initial={{ x: "0%" }}
          animate={reduce ? {} : { x: ["0%", "-8%", "0%"] }}
          transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 h-full w-[116%] max-w-none object-cover"
        />
        {/* The shimmer only on the sand, where heat would rise. */}
        {!reduce && (
          <div className="absolute inset-x-0 bottom-0 h-[42%] overflow-hidden" style={{ filter: `url(#heat-${id})` }}>
            <motion.img
              src={PHOTO}
              alt=""
              animate={{ x: ["0%", "-8%", "0%"] }}
              transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-[238%] w-[116%] max-w-none object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),transparent_40%,rgb(0_0_0/0.5))]" />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Desert dusk</h2>
          <p className="mt-3">A slow pan across the dunes, with heat shimmer on the sand.</p>
        </div>
      )}
    </div>
  );
}
