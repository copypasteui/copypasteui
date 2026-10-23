"use client";

import { motion } from "motion/react";

export default function KilnFooter() {
  return (
    <footer className="overflow-hidden bg-primary font-sans text-primary-foreground">
      <a href="#brief" className="group block border-b border-primary-foreground/15 py-10">
        <div className="flex w-max [animation:kiln-marquee_22s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              aria-hidden={i > 0}
              className="flex items-center gap-10 pr-10 font-display text-[12vw] leading-none font-black uppercase [font-stretch:125%] md:text-[9vw]"
            >
              Let’s talk <span className="text-accent">●</span>
            </span>
          ))}
        </div>
      </a>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-black [font-stretch:125%]"
        >
          kiln<span className="text-accent">●</span>
        </motion.p>
        <p className="text-sm opacity-90">
          Unit 9, Kelham Island Works
          <br />
          Sheffield S3 8RY
        </p>
        <p className="text-sm opacity-90">
          hello@studiokiln.example
          <br />
          0114 000 0000
        </p>
        <ul className="flex gap-5 text-sm md:justify-end">
          {["Instagram", "LinkedIn", "Dribbble"].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-accent">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-7xl px-6 pb-8 text-xs opacity-90">
        © 2026 Studio Kiln Ltd · Proudly small since 2014{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
      <style>{`@keyframes kiln-marquee { to { transform: translateX(-50%); } }`}</style>
    </footer>
  );
}
