"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// One outline per piece, drawn in the same 200×160 box. The fill animates; the outline switches.
const PIECES = [
  {
    id: "mug",
    name: "Mug",
    price: 14,
    d: "M50 40 H130 V120 Q130 140 110 140 H70 Q50 140 50 120 Z M130 60 Q165 60 165 85 Q165 110 130 110",
  },
  { id: "bowl", name: "Cereal bowl", price: 16, d: "M30 60 H170 Q170 140 100 140 Q30 140 30 60 Z M30 60 H170" },
  { id: "plate", name: "Side plate", price: 18, d: "M20 100 Q100 70 180 100 Q100 135 20 100 Z M50 100 Q100 85 150 100" },
  { id: "pig", name: "Piggy bank", price: 20, d: "M45 70 Q100 30 155 70 Q175 100 150 125 H55 Q25 100 45 70 Z M90 52 H112" },
  { id: "egg", name: "Egg cup", price: 8, d: "M70 50 Q100 30 130 50 Q130 90 100 95 Q70 90 70 50 Z M85 95 H115 L120 130 H80 Z" },
] as const;

const GLAZES = [
  { name: "Sea glass", value: "#7fc8b8" },
  { name: "Buttercup", value: "#f5c84c" },
  { name: "Terracotta", value: "#d9734e" },
  { name: "Cornflower", value: "#6f8fd8" },
  { name: "Speckled cream", value: "#efe4cf" },
];
const STUDIO_FEE = 6;

export default function GlazeDaysPieces() {
  const reduce = useReducedMotion();
  const [piece, setPiece] = useState<(typeof PIECES)[number]>(PIECES[0]);
  const [glaze, setGlaze] = useState(GLAZES[0]!);

  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="rounded-[calc(var(--radius)*1.4)] bg-card p-10 text-card-foreground shadow-xl">
          <svg viewBox="0 0 200 160" className="mx-auto w-full max-w-sm" role="img" aria-label={`${piece.name} in ${glaze.name}`}>
            <motion.path
              animate={{ d: piece.d, fill: glaze.value }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-6 text-center text-lg">
            {piece.name} in {glaze.name}
          </p>
        </div>

        <div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] font-semibold">Pick a piece, try a colour</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Over 60 pieces on the shelves. These are the favourites. Paint, brushes and glazing are included in the studio fee.
          </p>

          <fieldset className="mt-8">
            <legend className="font-semibold">Piece</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PIECES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={piece.id === p.id}
                  onClick={() => setPiece(p)}
                  className={`rounded-full px-4 py-2 font-semibold transition ${piece.id === p.id ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:-translate-y-0.5"}`}
                >
                  {p.name} · £{p.price}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="font-semibold">Glaze</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {GLAZES.map((g) => (
                <button
                  key={g.name}
                  type="button"
                  aria-pressed={glaze.name === g.name}
                  aria-label={g.name}
                  title={g.name}
                  onClick={() => setGlaze(g)}
                  className={`size-11 rounded-full shadow-md transition ${glaze.name === g.name ? "ring-4 ring-ring ring-offset-2 ring-offset-secondary" : "hover:scale-110"}`}
                  style={{ background: g.value }}
                />
              ))}
            </div>
          </fieldset>

          <p className="mt-8 text-2xl font-semibold" aria-live="polite">
            £{piece.price + STUDIO_FEE}{" "}
            <span className="text-base font-normal text-muted-foreground">
              (£{piece.price} piece + £{STUDIO_FEE} studio fee)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
