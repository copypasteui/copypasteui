"use client";

import { motion } from "motion/react";

// Wordmarks keep the component dependency-free. Swap them for <img> logos you have rights to use.
const logos = ["Lumen", "Kestrel", "Parallax", "Northwind", "Quanta", "Halcyon", "Cinderwick & Co", "Monolith", "Verde"];

export default function MarqueeLogoCloud() {
  const row = [...logos, ...logos];
  return (
    <section className="bg-background py-16 font-sans">
      <p className="text-center text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">Used every day at these companies</p>
      <div className="relative mx-auto mt-8 max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex w-max gap-14 pr-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {row.map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
