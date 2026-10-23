"use client";

import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function NordHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto grid max-w-[1600px] grid-cols-2 items-start gap-4 px-6 py-6 text-sm md:grid-cols-4">
        <a href="#" className="font-semibold">
          Nord Arkitekter
        </a>
        <p className="hidden text-muted-foreground md:block">
          Architecture & interiors
          <br />
          Oslo · Copenhagen
        </p>
        <nav className="hidden flex-col md:flex">
          {["Projects", "Studio", "Process", "Contact"].map((l) => (
            <a key={l} href="#" className="w-fit hover:underline">
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="flex items-center justify-end gap-2 justify-self-end font-semibold">
          <span className="size-2 rounded-full bg-accent" /> Taking on 2027 projects
        </a>
      </header>

      <div className="overflow-hidden px-4">
        <motion.h1
          initial={{ y: "40%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[25.5vw] leading-[0.78] font-extrabold tracking-[-0.06em] uppercase select-none"
        >
          Nord
        </motion.h1>
      </div>

      <div className="mx-auto mt-6 grid max-w-[1600px] gap-4 px-6 md:grid-cols-4">
        <p className="text-2xl leading-snug font-medium tracking-tight md:col-span-2 md:text-3xl">
          We design quiet buildings for loud places: homes, studios and public rooms shaped by light, timber and restraint.
        </p>
        <p className="text-sm text-muted-foreground md:col-start-4">
          Founded 2011 · 64 completed projects · Mies van der Rohe Award shortlist 2024
        </p>
      </div>

      <motion.figure
        initial={{ clipPath: "inset(8% 8% 8% 8%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="relative mx-auto mt-10 max-w-[1600px] px-6"
      >
        <div className="aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <img
            src={img("photo-1756706718604-ef4af3970e33")}
            alt="Timber and concrete house among trees"
            className="size-full object-cover"
          />
        </div>
        <figcaption className="flex items-center justify-between border-b border-foreground py-3 text-sm">
          <span>
            <span className="font-semibold">Lindholm House</span>, Bergen, 2025
          </span>
          <a href="#projects" className="flex items-center gap-1 font-semibold">
            All projects <ArrowDownRight className="size-4" />
          </a>
        </figcaption>
      </motion.figure>
    </section>
  );
}
