"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Play } from "lucide-react";

const img = (id: string, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const stats = [
  { v: "3,200+", l: "members" },
  { v: "24", l: "coaches" },
  { v: "140", l: "classes / week" },
];

export default function PulseHero() {
  return (
    <section className="relative overflow-hidden bg-foreground font-sans text-background">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-3xl tracking-wide uppercase">
          Pulse<span className="text-accent">.</span>
        </a>
        <nav className="hidden gap-8 text-sm font-semibold tracking-wider text-background/70 uppercase md:flex">
          {["Classes", "Timetable", "Coaches", "Membership"].map((l) => (
            <a key={l} href="#" className="transition hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#join"
          className="hidden rounded-[var(--radius)] bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground uppercase md:inline-block"
        >
          Join now
        </a>
        <button type="button" aria-label="Menu" className="md:hidden">
          <Menu className="size-7" />
        </button>
      </header>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-6 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div className="relative z-10">
          <h1 className="font-display text-[clamp(4rem,11vw,10rem)] leading-[0.85] uppercase">
            {["Train", "like you", "mean it."].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 2 ? "w-fit bg-accent px-[0.08em] text-accent-foreground" : ""}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-md text-lg text-background/70"
          >
            Strength, conditioning and boxing coached by people who care whether you come back. Open 5am to midnight, every day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#join"
              className="group inline-flex items-center gap-3 rounded-[var(--radius)] bg-accent px-7 py-4 font-bold text-accent-foreground uppercase"
            >
              Start your free week <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="inline-flex items-center gap-3 font-semibold uppercase">
              <span className="grid size-12 place-items-center rounded-full border border-background/30">
                <Play className="size-4 fill-current" />
              </span>
              Tour the floor
            </a>
          </motion.div>
          <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-background/15 pt-6">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-display text-4xl">{s.v}</dt>
                <dd className="text-xs tracking-wider text-background/90 uppercase">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[420px] lg:min-h-0">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 overflow-hidden rounded-[var(--radius)] [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
          >
            <img
              src={img("photo-1517836357463-d25dfeac3438")}
              alt="Athlete gripping a loaded barbell"
              className="size-full object-cover grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-8 -left-6 grid size-32 place-items-center rounded-full bg-accent text-accent-foreground shadow-2xl lg:-left-14"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <path id="pulse-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text className="fill-current text-[11px] font-bold tracking-[0.2em] uppercase">
                <textPath href="#pulse-circle">First week free · No joining fee ·</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl">7D</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute right-5 bottom-5 rounded-[var(--radius)] bg-background p-4 text-foreground shadow-2xl"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase">Next class · 18:30</p>
            <p className="font-display text-2xl uppercase">Heavy Lifts</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                <span className="block h-full w-4/5 bg-foreground" />
              </span>
              4 spots left
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
