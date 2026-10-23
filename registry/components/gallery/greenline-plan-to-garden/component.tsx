"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// The "plan" side is a hand-drawn style site plan of the same garden, so the slider
// compares design drawing to finished build rather than faking a "before" photo.
function SitePlan() {
  return (
    <svg viewBox="0 0 160 90" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="160" height="90" className="fill-secondary" />
      <g className="stroke-primary" fill="none" strokeWidth="0.4">
        {Array.from({ length: 17 }).map((_, i) => (
          <path key={`v${i}`} d={`M${i * 10} 0V90`} opacity="0.15" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 10}H160`} opacity="0.15" />
        ))}
        <rect x="8" y="8" width="144" height="74" strokeWidth="0.9" />
        <path d="M8 60 Q 60 50 152 58" strokeWidth="0.7" strokeDasharray="2 1.5" />
        <rect x="100" y="14" width="44" height="30" strokeWidth="0.7" />
        <text x="122" y="31" textAnchor="middle" className="fill-primary stroke-none" fontSize="3.5">
          PATIO · PORCELAIN
        </text>
        <path d="M16 30 h60 v18 h-60z" strokeWidth="0.7" />
        <text x="46" y="41" textAnchor="middle" className="fill-primary stroke-none" fontSize="3.5">
          LAWN
        </text>
        {[
          [20, 18],
          [32, 15],
          [44, 19],
          [86, 66],
          [100, 70],
          [128, 68],
          [140, 64],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3 + (i % 3)} strokeWidth="0.6" />
        ))}
        <path d="M80 82 v-22 h14 v-16" strokeWidth="0.6" />
        <text x="20" y="76" className="fill-primary stroke-none" fontSize="3">
          MIXED BORDER · 42 PLANTS
        </text>
        <text x="138" y="86" textAnchor="end" className="fill-primary stroke-none" fontSize="2.8">
          SCALE 1:100 · GREENLINE
        </text>
      </g>
    </svg>
  );
}

export default function GreenlinePlanToGarden() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl leading-tight font-bold">From plan to planting.</h2>
          <p className="opacity-90 md:justify-self-end md:text-right">
            A family garden in Esher: 14 weeks from drawing board to first barbecue. Drag to compare.
          </p>
        </div>
        <div
          ref={box}
          onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
          onPointerDown={(e) => move(e.clientX)}
          className="relative mt-10 aspect-[16/9] cursor-ew-resize touch-none overflow-hidden rounded-[calc(var(--radius)*1.5)] select-none"
        >
          <img
            src={img("photo-1633330948542-0b3bdeefcdb3")}
            alt="Finished patio and lawn with garden furniture"
            className="absolute inset-0 size-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <SitePlan />
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare plan and finished garden"
              className="absolute inset-0 h-full w-8 -translate-x-1/2 cursor-ew-resize opacity-0"
            />
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pointer-events-none absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl"
            >
              <MoveHorizontal className="size-5" />
            </motion.span>
          </div>
          <span className="absolute top-4 left-4 rounded-full bg-card px-3 py-1 text-xs font-semibold text-card-foreground">
            Design plan
          </span>
          <span className="absolute top-4 right-4 rounded-full bg-card px-3 py-1 text-xs font-semibold text-card-foreground">
            Finished garden
          </span>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            ["14 wks", "design to finish"],
            ["62 m²", "porcelain patio"],
            ["£38k", "total investment"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="font-display text-4xl font-bold">{n}</dt>
              <dd className="text-sm opacity-90">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
