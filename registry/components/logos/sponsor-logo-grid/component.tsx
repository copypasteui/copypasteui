"use client";

import { motion } from "motion/react";
import { Hexagon, Triangle, Circle, Square, Diamond, Pentagon, Star, Cloud } from "lucide-react";

// Placeholder marks built from generic shapes — replace with logos you have rights to use.
const tiers = [
  {
    name: "Headline partners",
    size: "lg",
    logos: [
      { icon: Hexagon, name: "Hexwave" },
      { icon: Triangle, name: "Apexa" },
    ],
  },
  {
    name: "Gold",
    size: "md",
    logos: [
      { icon: Circle, name: "Orbita" },
      { icon: Square, name: "Blockly" },
      { icon: Diamond, name: "Facet" },
    ],
  },
  {
    name: "Community",
    size: "sm",
    logos: [
      { icon: Pentagon, name: "Penta" },
      { icon: Star, name: "Lumastar" },
      { icon: Cloud, name: "Nimbus" },
      { icon: Hexagon, name: "Combo" },
      { icon: Triangle, name: "Delta" },
      { icon: Circle, name: "Ripple" },
    ],
  },
] as const;

const sizes = {
  lg: { grid: "sm:grid-cols-2", box: "h-36", icon: "size-10", text: "text-3xl" },
  md: { grid: "sm:grid-cols-3", box: "h-28", icon: "size-8", text: "text-2xl" },
  sm: { grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6", box: "h-20", icon: "size-5", text: "text-lg" },
};

export default function SponsorLogoGrid() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight">Made possible by</h2>
          <a href="#" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Become a sponsor →
          </a>
        </div>
        <div className="mt-10 space-y-8">
          {tiers.map((tier, t) => {
            const s = sizes[tier.size];
            return (
              <div key={tier.name}>
                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{tier.name}</p>
                <div className={`grid gap-px overflow-hidden rounded-lg border border-border bg-border ${s.grid}`}>
                  {tier.logos.map((l, i) => (
                    <motion.a
                      key={l.name + i}
                      href="#"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: t * 0.15 + i * 0.05 }}
                      className={`group flex items-center justify-center gap-3 bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${s.box}`}
                    >
                      <l.icon className={`${s.icon} transition-transform group-hover:rotate-12`} />
                      <span className={`font-display font-bold tracking-tight ${s.text}`}>{l.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
