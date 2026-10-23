"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, Star } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function EditorialSplitHero() {
  return (
    <section className="relative overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Issue No. 04 · Spring
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl"
          >
            Make the work <em className="pr-[0.08em] text-primary not-italic md:italic">feel</em> as good as it looks.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            A studio for founders who care about the details. We design and build brand sites, product pages and launch campaigns in weeks,
            not quarters.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Book an intro call
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-border px-6 py-3.5 font-semibold text-foreground transition hover:bg-muted"
            >
              See selected work
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["AK", "JM", "SR", "LT"].map((i) => (
                <span
                  key={i}
                  className="grid size-10 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-bold text-secondary-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">120+ founders worked with us since 2019</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent via-secondary to-muted p-6">
            <div className="flex h-full flex-col justify-between rounded-lg border border-border/60 bg-card/70 p-6 backdrop-blur">
              <div className="flex items-center justify-between text-xs tracking-[0.2em] text-muted-foreground uppercase">
                <span>Case study</span>
                <span>2026</span>
              </div>
              <div>
                <p className="font-display text-4xl leading-tight font-semibold text-card-foreground">
                  +212% <span className="block text-lg font-normal text-muted-foreground">trial sign-ups after relaunch</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[64, 88, 42].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: "easeOut" }}
                    className="self-end rounded-md bg-primary/80"
                  />
                ))}
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute -bottom-5 -left-5 rounded-lg border border-border bg-card px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-muted-foreground">Avg. launch time</p>
            <p className="font-display text-2xl font-semibold text-card-foreground">5.5 weeks</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
