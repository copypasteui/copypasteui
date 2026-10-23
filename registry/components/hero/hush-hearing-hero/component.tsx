"use client";

import { motion, useReducedMotion } from "motion/react";
import { CalendarCheck, Phone } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const BARS = [18, 34, 52, 30, 64, 44, 26, 58, 38, 22, 48, 30, 16];

export default function HushHearingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background px-6 font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
        <a href="#" className="text-xl font-bold">
          Hush Hearing
        </a>
        <a href="#" className="hidden items-center gap-2 font-semibold sm:flex">
          <Phone className="size-4" aria-hidden /> 01632 960 380
        </a>
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-14 pt-10 pb-24 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-semibold text-primary">Independent audiologists in Harrogate</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.05] font-bold">
            A proper hearing test, then honest advice
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            The test takes 45 minutes and costs nothing. If you need hearing aids we will show you three price points from different makers,
            and if you don&rsquo;t, we&rsquo;ll tell you that too.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-7 py-4 font-semibold text-primary-foreground"
            >
              <CalendarCheck className="size-5" aria-hidden /> Book a free hearing test
            </a>
            <a href="#" className="rounded-[var(--radius)] bg-card px-7 py-4 font-semibold text-card-foreground">
              Ask about home visits
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[var(--radius)] bg-card p-6 text-card-foreground shadow-xl">
            <div className="flex h-24 items-center justify-center gap-2" aria-hidden>
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-2.5 rounded-full bg-primary"
                  style={{ height: h }}
                  animate={reduce ? {} : { scaleY: [1, 0.35, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.09 }}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Most people wait ten years before their first test.</p>
          </div>
          <img
            src={img("photo-1692160756374-6f68339df7cd")}
            alt="A man in glasses wearing a small hearing aid behind his ear"
            className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover shadow-[inset_0_0_0_6px_var(--background)]"
          />
        </div>
      </div>
    </section>
  );
}
