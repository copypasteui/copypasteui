"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Bot, Menu, Users } from "lucide-react";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&q=80`;
const people = [
  "photo-1494790108377-be9c29b29330",
  "photo-1500648767791-00dcc994a43e",
  "photo-1758691737646-79dbce8e25fb",
  "photo-1548382131-e0ebb1f0cdea",
];

/** Twinkling star field drawn on canvas (pauses for reduced motion). */
function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: { x: number; y: number; r: number; p: number }[] = [];
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((cv.clientWidth * cv.clientHeight) / 2400) }, () => ({
        x: Math.random() * cv.clientWidth,
        y: Math.random() * cv.clientHeight * 0.75,
        r: Math.random() * 1.2 + 0.2,
        p: Math.random() * 6.28,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      ctx.fillStyle = "white";
      for (const s of stars) {
        ctx.globalAlpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t / 900 + s.p));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.28);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize();
    draw(0);
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}

const agents = [
  { name: "Invoice reconciler", stat: "1,204 matched today" },
  { name: "Churn watcher", stat: "3 accounts flagged" },
  { name: "Ticket triage", stat: "92% auto-resolved" },
];

export default function AetherHero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setJoined(true);
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background font-sans text-foreground">
      {/* planet-horizon background, inlined */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Stars />
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[66%] left-1/2 aspect-square w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_30%,black)_0%,black_30%)] shadow-[0_-2px_0_0_color-mix(in_oklab,var(--primary)_80%,white)] md:w-[150vw]"
        />
        <motion.div
          animate={{ rotate: [-26, 26, -26] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[66%] left-1/2 aspect-square w-[180vw] -translate-x-1/2 rounded-full [background:conic-gradient(from_350deg,transparent,color-mix(in_oklab,var(--accent)_85%,white)_10deg,transparent_22deg)] [mask:radial-gradient(closest-side,transparent_97.5%,black_99%,transparent_100%)] md:w-[150vw]"
        />
      </div>

      <header className="mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-full border border-border bg-card/40 px-4 py-2.5 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="relative grid size-7 place-items-center rounded-full bg-primary/20">
            <span className="size-3 rounded-full bg-primary" />
          </span>
          Aether
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {["Agents", "How it works", "Security", "Pricing"].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a href="#waitlist" className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background sm:inline-block">
          Get early access
        </a>
        <button type="button" aria-label="Menu" className="sm:hidden">
          <Menu className="size-5" />
        </button>
      </header>

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-16 text-center md:pt-24">
        <motion.span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Users className="size-3.5 text-accent" /> Private beta · 412 teams onboarded
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.15, duration: 1 }}
          className="mt-7 font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[1] font-semibold tracking-[-0.04em]"
        >
          Your operations,
          <span className="block text-primary">on autopilot.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Aether deploys AI agents that reconcile, triage and follow up across your tools, with approvals where it matters and a full audit
          trail.
        </motion.p>

        <motion.form
          id="waitlist"
          onSubmit={submit}
          className="mt-9 flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card/60 p-1.5 backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {joined ? (
              <motion.p
                key="ok"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-1 items-center justify-center gap-2 py-2.5 text-sm"
              >
                <Check className="size-4 text-accent" /> You’re on the list. We’ll be in touch.
              </motion.p>
            ) : (
              <motion.div key="f" exit={{ opacity: 0 }} className="flex flex-1 items-center gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@example.com"
                  aria-label="Work email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="group flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Join waitlist <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {people.map((p) => (
              <img key={p} src={img(p)} alt="" className="size-7 rounded-full border-2 border-background object-cover" />
            ))}
          </div>
          Ops teams at 400+ companies
        </div>

        <div className="pointer-events-none relative mt-auto hidden w-full max-w-4xl justify-between pb-16 md:flex">
          {agents.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 1 + i * 0.2 },
                y: { delay: 1 + i * 0.2, duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
              }}
              className={`flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 text-left backdrop-blur-xl ${i === 1 ? "-translate-y-6" : ""}`}
            >
              <span className="relative grid size-9 place-items-center rounded-xl bg-primary/20 text-primary">
                <Bot className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent" />
              </span>
              <span>
                <span className="block text-sm font-medium">{a.name}</span>
                <span className="block text-xs text-muted-foreground">{a.stat}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
