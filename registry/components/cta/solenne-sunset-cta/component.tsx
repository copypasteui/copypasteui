"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const img = (id: string, w = 2400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function SolenneSunsetCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-6 py-36 font-sans text-white md:py-48">
      <motion.img
        src={img("photo-1622816951464-df6fc7ab2ced")}
        alt="Pool at sunset over the sea"
        style={{ y }}
        className="absolute inset-x-0 -top-[15%] -z-20 h-[130%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.35em] text-white/80 uppercase">Summer 2027 is opening</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]"
        >
          Your sunbed is <em>waiting.</em>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/85">
          Book direct for our best rate, free cancellation up to 14 days before arrival, and a bottle of local white on us.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-primary hover:text-primary-foreground"
          >
            Check dates <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="rounded-full border border-white/50 px-8 py-4 font-medium backdrop-blur transition hover:bg-white/15">
            Talk to our concierge
          </a>
        </div>
      </div>
    </section>
  );
}
