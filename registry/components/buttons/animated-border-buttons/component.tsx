"use client";

import { motion } from "motion/react";
import { Zap, ArrowUpRight } from "lucide-react";

export default function AnimatedBorderButtons() {
  return (
    <section className="flex min-h-[22rem] flex-wrap items-center justify-center gap-8 bg-background px-6 py-20 font-sans text-foreground">
      {/* Rotating conic border */}
      <button type="button" className="relative inline-flex overflow-hidden rounded-xl p-[2px]">
        <motion.span
          aria-hidden
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,var(--primary),var(--accent),transparent_40%,var(--primary))]"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <span className="relative inline-flex items-center gap-2 rounded-[10px] bg-background px-7 py-3.5 font-semibold">
          <Zap className="size-4 text-primary" /> Upgrade to Pro
        </span>
      </button>

      {/* Glow pulse */}
      <motion.button
        type="button"
        animate={{
          boxShadow: [
            "0 0 0 0 color-mix(in oklab, var(--primary) 60%, transparent)",
            "0 0 0 14px color-mix(in oklab, var(--primary) 0%, transparent)",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
      >
        Join the waitlist
      </motion.button>

      {/* Dashed marching border */}
      <button type="button" className="group relative rounded-lg px-7 py-3.5 font-semibold">
        <svg className="absolute inset-0 size-full overflow-visible" aria-hidden>
          <rect
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="[animation:march_1s_linear_infinite] stroke-foreground transition-colors group-hover:stroke-primary"
          />
        </svg>
        <style>{`@keyframes march { to { stroke-dashoffset: -14; } }`}</style>
        <span className="relative inline-flex items-center gap-1">
          Book a demo <ArrowUpRight className="size-4" />
        </span>
      </button>
    </section>
  );
}
