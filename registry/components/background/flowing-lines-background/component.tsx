"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Dozens of thin ribbon lines flowing like a silk scarf, recomputed every frame in SVG.
 * Stroke gradient runs primary → accent; works on light and dark themes.
 */

const LINES = 34;

export default function FlowingLinesBackground({ children }: { children?: ReactNode }) {
  const group = useRef<SVGGElement>(null);

  useEffect(() => {
    const paths = Array.from(group.current!.querySelectorAll("path"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = (time: number) => {
      const t = time / 1000;
      paths.forEach((p, i) => {
        const k = i / LINES;
        const pts: string[] = [];
        for (let x = -40; x <= 1240; x += 40) {
          const y =
            380 + Math.sin(x / 260 + t * 0.6 + k * 2.4) * (120 + k * 60) + Math.sin(x / 120 - t * 0.9 + k * 5) * 18 + (k - 0.5) * 160;
          pts.push(`${x},${y.toFixed(1)}`);
        }
        p.setAttribute("d", `M${pts.join(" L")}`);
      });
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw(4000);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background font-sans text-foreground">
      <svg aria-hidden viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 size-full">
        <defs>
          <linearGradient id="flowing-lines-stroke" x1="0" x2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.35" stopColor="var(--primary)" />
            <stop offset="0.7" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g ref={group} fill="none" stroke="url(#flowing-lines-stroke)">
          {Array.from({ length: LINES }).map((_, i) => (
            <path key={i} strokeWidth={i % 6 === 0 ? 1.6 : 0.8} opacity={0.25 + (i % 5) * 0.12} />
          ))}
        </g>
      </svg>
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Flowing lines</h2>
          <p className="mt-3 text-muted-foreground">Ribbons recomputed every frame in SVG.</p>
        </div>
      )}
    </div>
  );
}
