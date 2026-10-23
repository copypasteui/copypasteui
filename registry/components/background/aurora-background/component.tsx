"use client";

// design-ok: glow-blob — the soft aurora is the whole effect

import { motion } from "motion/react";
import type { ReactNode } from "react";

// A full-bleed animated backdrop. Wrap any content: <AuroraBackground>…</AuroraBackground>
// intensity="soft" keeps the colours faint, for busy content on top.
export default function AuroraBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const bold = intensity === "bold";
  return (
    <div className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden bg-background font-sans">
      <div aria-hidden className="absolute inset-0 -z-10">
        {[
          { cls: bold ? "bg-primary" : "bg-primary/40", x: ["-20%", "10%", "-20%"], y: ["-10%", "10%", "-10%"], d: 14 },
          { cls: "bg-accent", x: ["30%", "-5%", "30%"], y: ["20%", "-15%", "20%"], d: 18 },
          { cls: bold ? "bg-accent/70" : "bg-secondary", x: ["-5%", "25%", "-5%"], y: ["30%", "5%", "30%"], d: 22 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{ x: b.x, y: b.y, scale: [1, 1.2, 1] }}
            transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-1/4 left-1/4 rounded-full mix-blend-multiply dark:mix-blend-screen ${bold ? "size-[70%] blur-[70px]" : "size-[60%] blur-[90px]"} ${b.cls}`}
          />
        ))}
        <div
          className={`absolute inset-0 ${bold ? "bg-[radial-gradient(transparent_0,var(--background)_95%)]" : "bg-[radial-gradient(transparent_0,var(--background)_75%)]"}`}
        />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Aurora</h2>
          <p className="mt-3 text-muted-foreground">Drop any content inside. Colours follow your theme.</p>
        </div>
      )}
    </div>
  );
}
