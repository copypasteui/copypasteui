"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { Layers, Cpu, Globe } from "lucide-react";

function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const gx = useTransform(px, [0, 1], [0, 100]);
  const gy = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, color-mix(in oklab, var(--background) 45%, transparent), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glareOpacity.set(1);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        glareOpacity.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="relative"
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glare, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 rounded-xl"
      />
    </motion.div>
  );
}

const cards = [
  { icon: Layers, title: "Composable", body: "Snap blocks together like bricks.", tone: "bg-primary text-primary-foreground" },
  {
    icon: Cpu,
    title: "Under 100ms",
    body: "Pages are compiled ahead of time and served from 30 regions.",
    tone: "bg-card text-card-foreground border border-border",
  },
  { icon: Globe, title: "Global", body: "40 regions, one deploy command.", tone: "bg-accent text-accent-foreground" },
];

export default function TiltCards() {
  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <Tilt key={c.title}>
            <div className={`flex h-72 flex-col justify-between rounded-xl p-7 shadow-xl shadow-foreground/10 ${c.tone}`}>
              <c.icon className="size-9" style={{ transform: "translateZ(40px)" }} />
              <div style={{ transform: "translateZ(30px)" }}>
                <h3 className="font-display text-2xl font-bold">{c.title}</h3>
                <p className="mt-2 opacity-90">{c.body}</p>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
