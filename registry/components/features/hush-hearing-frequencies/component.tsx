"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const BANDS = [
  { hz: 250, label: "250 Hz", sounds: "A man's voice, a fridge humming, distant thunder" },
  { hz: 500, label: "500 Hz", sounds: "Most vowel sounds, a dog barking, a car engine" },
  { hz: 1000, label: "1 kHz", sounds: "Normal conversation, a phone ringing" },
  { hz: 2000, label: "2 kHz", sounds: "Consonants like 'sh' and 'ch', a child's voice" },
  { hz: 4000, label: "4 kHz", sounds: "'S', 'f' and 'th', birdsong, the microwave beep" },
  { hz: 8000, label: "8 kHz", sounds: "Leaves rustling, a whisper, the hiss of a kettle" },
];

// A sine wave across the 400×120 box; more cycles for higher pitch.
const wave = (cycles: number) => {
  const pts = Array.from({ length: 161 }, (_, i) => {
    const x = (i / 160) * 400;
    const y = 60 + Math.sin((i / 160) * cycles * Math.PI * 2) * 42;
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return pts.join(" ");
};

export default function HushHearingFrequencies() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(2);
  const band = BANDS[i]!;

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl rounded-[var(--radius)] bg-card p-8 text-card-foreground shadow-xl md:p-12">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold">Which sounds go first?</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Age-related hearing loss usually starts at the high end. Slide through the pitches we test to see what lives where.
        </p>

        <svg viewBox="0 0 400 120" className="mt-8 h-32 w-full text-primary" aria-hidden>
          <motion.path
            d={wave(1)}
            animate={{ d: wave(1 + i * 2.2) }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <label htmlFor="hush-pitch" className="mt-6 block font-semibold">
          Pitch: <span className="text-primary">{band.label}</span>
        </label>
        <input
          id="hush-pitch"
          type="range"
          min={0}
          max={BANDS.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-valuetext={band.label}
          className="mt-3 w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground" aria-hidden>
          <span>Low</span>
          <span>High</span>
        </div>

        <p className="mt-6 min-h-[3.5rem] text-lg" aria-live="polite">
          {band.sounds}.{band.hz >= 4000 && <span className="text-primary"> This is usually the first range to fade.</span>}
        </p>
      </div>
    </section>
  );
}
