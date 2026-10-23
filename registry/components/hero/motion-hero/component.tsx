"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu, Zap } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stats = [
  { n: "92%", l: "of patients discharged pain-free" },
  { n: "4.6", l: "sessions on average" },
  { n: "48h", l: "to your first appointment" },
];

export default function MotionHero() {
  return (
    <section className="bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight italic">
          <span className="grid size-9 place-items-center rounded-[var(--radius)] bg-accent text-accent-foreground">
            <Zap className="size-5" />
          </span>{" "}
          MOTION
        </a>
        <nav className="hidden gap-8 text-sm font-semibold lg:flex">
          {["Conditions", "Treatments", "Sports", "Our physios", "Prices"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="hidden rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground sm:inline-block"
          >
            Book assessment
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-6 pb-16">
        <div className="relative overflow-hidden rounded-[calc(var(--radius)*2)] bg-primary text-primary-foreground">
          <img
            src={img("photo-1649751361457-01d3a696c7e6")}
            alt="Physiotherapist assessing a patient’s knee"
            className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover lg:block"
          />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-r from-primary via-primary/20 to-transparent lg:block" />
          <div className="relative max-w-2xl p-8 md:p-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wider text-accent-foreground uppercase"
            >
              No GP referral needed
            </motion.p>
            <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-black tracking-tight uppercase italic">
              {["Get back to", "the thing", "you love."].map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {l}
                </motion.span>
              ))}
            </h1>
            <p className="mt-6 max-w-md text-lg opacity-90">
              Physiotherapy and sports rehab in Bristol. Hands-on treatment, a plan you understand and exercises that fit your actual life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#book"
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-4 font-bold text-accent-foreground"
              >
                Book an assessment · £65 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#conditions"
                className="rounded-[var(--radius)] border-2 border-primary-foreground/40 px-6 py-4 font-bold hover:bg-primary-foreground/10"
              >
                Where does it hurt?
              </a>
            </div>
          </div>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="rounded-[var(--radius)] bg-card p-5 text-card-foreground"
            >
              <dt className="font-display text-4xl font-black italic">{s.n}</dt>
              <dd className="text-sm text-muted-foreground">{s.l}</dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Recognised by all major UK health insurers · HCPC-registered physiotherapists
        </p>
      </div>
    </section>
  );
}
