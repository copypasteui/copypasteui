"use client";

import { useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Keeps x inside one copy of the text (-50%..0%), so the doubled line loops without a jump.
const wrap = (v: number) => ((((v + 50) % 50) + 50) % 50) - 50;

function Line({ text, speed, playing }: { text: string; speed: number; playing: boolean }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  // Scrolling adds up to five times the resting speed, in whichever direction you scroll.
  const boost = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: true });
  const x = useTransform(base, (v) => `${wrap(v)}%`);

  useAnimationFrame((_, delta) => {
    if (!playing) return;
    const b = boost.get();
    const dir = b < 0 ? -1 : 1;
    base.set(base.get() + speed * dir * (1 + Math.abs(b)) * (delta / 1000));
  });

  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden>
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1].map((copy) => (
          <span key={copy} className="pr-8 font-display text-[clamp(3rem,10vw,8rem)] leading-none uppercase">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function LockfastCta() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const playing = !paused && !reduce;

  return (
    <section className="overflow-hidden bg-background py-24 font-sans text-foreground">
      <h2 className="sr-only">Lockfast Brewery taproom: open Thursday to Sunday, 12 lines on draught</h2>
      <div className="border-y border-border bg-accent py-4 text-accent-foreground">
        <Line text="Taproom open Thursday to Sunday · " speed={-2.2} playing={playing} />
      </div>
      <div className="py-4">
        <Line text="12 lines on draught · pints from £4.20 · " speed={1.6} playing={playing} />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
        <img
          src={img("photo-1646241651636-49549005a1a3")}
          alt="The taproom: a long bar, sofas and tall windows"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-[var(--radius)] border border-border object-cover"
        />
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase">Lockfast Brewery · Unit 4, Canal Wharf</p>
          <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">Brewed twenty metres from where you drink it.</p>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-muted-foreground">
            <dt className="font-semibold text-foreground">Thu, Fri</dt>
            <dd>4pm to 11pm</dd>
            <dt className="font-semibold text-foreground">Sat</dt>
            <dd>12 to 11pm, street food from 1</dd>
            <dt className="font-semibold text-foreground">Sun</dt>
            <dd>12 to 6pm, dogs welcome</dd>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              Book a table for 6 or more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-[var(--radius)] border border-border px-6 py-3.5 font-semibold hover:bg-muted"
            >
              See what&rsquo;s pouring
            </a>
            {!reduce && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play the scrolling text" : "Pause the scrolling text"}
                className="grid size-12 place-items-center rounded-full border border-border hover:bg-muted"
              >
                {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
