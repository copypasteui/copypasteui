"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDownRight, Mail } from "lucide-react";

const roles = ["product designer", "design engineer", "type nerd", "workshop host"];
const skills = ["Brand systems", "Product UI", "Prototyping", "Design tokens", "Motion", "Webflow", "Framer", "React"];

export default function PortfolioIntroHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:pt-24">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          Available for projects from June
        </motion.span>

        <h1 className="mt-10 font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.85] font-black tracking-tight uppercase">
          {"Ana Lindqvist".split(" ").map((w, k) => (
            <motion.span
              key={w}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 * k, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-xl text-2xl leading-snug text-muted-foreground md:text-3xl">
            Independent{" "}
            <span className="relative inline-block min-w-[9ch] align-bottom text-foreground">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[i]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block border-b-2 border-primary"
                >
                  {roles[i]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            in Stockholm, helping early-stage teams look like they’ve been around for years.
          </p>
          <div className="flex gap-3">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-background">
              Selected work <ArrowDownRight className="size-4" />
            </a>
            <a
              href="mailto:hello@example.com"
              aria-label="Email"
              className="grid size-12 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-10 font-display text-2xl font-bold whitespace-nowrap uppercase"
        >
          {[...skills, ...skills].map((s, k) => (
            <span key={k} className="flex items-center gap-10">
              {s} <span aria-hidden>✺</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
