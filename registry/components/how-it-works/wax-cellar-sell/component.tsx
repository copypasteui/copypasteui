"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const GRADES = [
  { id: "M", label: "Mint", factor: 1, note: "Still sealed, or played once" },
  { id: "VG+", label: "VG+", factor: 0.75, note: "Light marks, plays clean" },
  { id: "VG", label: "VG", factor: 0.45, note: "Some surface noise, sleeve worn" },
  { id: "G", label: "Good", factor: 0.15, note: "Crackles throughout, still plays" },
];
const GENRES = [
  { id: "soul", label: "Soul and funk", top: 30 },
  { id: "jazz", label: "Jazz", top: 26 },
  { id: "rock", label: "Rock and pop", top: 16 },
  { id: "dance", label: "Dance 12-inches", top: 12 },
];
const SCALE = 30;

export default function WaxCellarSell() {
  const reduce = useReducedMotion();
  const [grade, setGrade] = useState(GRADES[1]!);
  const [genre, setGenre] = useState(GENRES[0]!);
  const high = Math.max(1, Math.round(genre.top * grade.factor));
  const low = Math.max(0.5, Math.round(high * 0.4 * 2) / 2);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none font-extrabold">Selling your records?</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Bring them in on a weekday and we&rsquo;ll go through them while you have a coffee. Cash or 20% more in shop credit. This is a
          rough guide to what we pay per LP.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <fieldset>
            <legend className="font-bold">Condition</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={grade.id === g.id}
                  onClick={() => setGrade(g)}
                  className={`rounded-[var(--radius)] border border-foreground p-3 text-left ${grade.id === g.id ? "bg-foreground text-background" : "hover:bg-muted"}`}
                >
                  <span className="block font-bold">{g.label}</span>
                  <span className="text-sm">{g.note}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-bold">Genre</legend>
            <div className="mt-3 grid gap-2">
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={genre.id === g.id}
                  onClick={() => setGenre(g)}
                  className={`rounded-[var(--radius)] border border-foreground px-4 py-2.5 text-left font-semibold ${genre.id === g.id ? "bg-foreground text-background" : "hover:bg-muted"}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-10 rounded-[var(--radius)] border border-foreground bg-card p-6 text-card-foreground">
          <p className="font-bold" aria-live="polite">
            We usually pay £{low} to £{high} per LP
          </p>
          <div className="relative mt-4 h-6 border border-foreground bg-muted" aria-hidden>
            <motion.div
              className="absolute inset-y-0 bg-primary"
              animate={{ left: `${(low / SCALE) * 100}%`, width: `${((high - low) / SCALE) * 100}%` }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 22 }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground" aria-hidden>
            <span>£0</span>
            <span>£{SCALE}+</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Rare pressings are priced one by one. Collections of 200 or more: we&rsquo;ll come to you.
          </p>
        </div>
      </div>
    </section>
  );
}
