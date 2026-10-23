"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Clock, MapPin, Users } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const STORY =
  "We cook whatever the two Whitstable boats land before noon. Today that means bass, dabs and a box of native oysters. The menu goes up on the chalkboard at five, and when a fish runs out, we rub it off.";
const WORDS = STORY.split(" ");

const FACTS = [
  { icon: Clock, label: "Wednesday to Sunday, 12 to 3 and 6 to 10" },
  { icon: MapPin, label: "3 Harbour Street, Whitstable, CT5 1AH" },
  { icon: Users, label: "Tables for 2 to 6, walk-ins at the bar" },
];

export default function BrinebankStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const [lit, setLit] = useState(0);
  // Words switch from muted to full colour one at a time, so every state still passes contrast.
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.round(v * WORDS.length)));
  const shown = reduce ? WORDS.length : lit;

  return (
    <section className="bg-background px-6 py-28 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Brinebank Kitchen</p>
        <p ref={ref} className="mt-8 font-display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.15]">
          <span className="sr-only">{STORY}</span>
          {WORDS.map((w, i) => (
            <span
              key={i}
              aria-hidden
              className={`transition-colors duration-300 ${i < shown ? "text-foreground" : "text-muted-foreground"}`}
            >
              {w}{" "}
            </span>
          ))}
        </p>

        <ul className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 sm:grid-cols-[1.4fr_1fr]">
          <img
            src={img("photo-1577106263724-2c8e03bfe9cf")}
            alt="Chef with tattooed forearms plating at the pass"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover"
          />
          <img
            src={img("photo-1519233991914-26a44330ccd7", 900)}
            alt="Grilled bream on a grey plate"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover sm:aspect-auto sm:h-full"
          />
        </div>
      </div>
    </section>
  );
}
