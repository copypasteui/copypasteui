"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const items = [
  {
    year: "2026–now",
    title: "Design lead, Fieldnote",
    body: "Leading a team of five across brand and product. Shipped the v3 redesign that doubled activation.",
  },
  {
    year: "2023–2026",
    title: "Senior product designer, Kestrel",
    body: "Built the design system from zero to 140 components and the docs site that went with it.",
  },
  {
    year: "2021–2023",
    title: "Designer, Parallax Studio",
    body: "Brand identities and marketing sites for 30+ startups, from pre-seed to Series B.",
  },
  { year: "2019–2021", title: "Freelance", body: "Websites for local businesses, a lot of coffee and the occasional workshop." },
];

export default function VerticalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Experience</h2>
        <div ref={ref} className="relative mt-14 pl-10 md:pl-0">
          <div className="absolute top-0 left-3 h-full w-px bg-border md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute top-0 left-3 h-full w-px origin-top bg-primary md:left-1/2" />
          <div className="space-y-14">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`relative md:grid md:grid-cols-2 md:gap-16 ${i % 2 ? "" : "md:text-right"}`}
              >
                <span className="absolute top-1.5 -left-[33px] size-4 rounded-full border-4 border-background bg-primary ring-1 ring-primary md:left-1/2 md:-translate-x-1/2" />
                <div className={i % 2 ? "md:col-start-2" : ""}>
                  <p className="text-sm font-semibold text-primary">{it.year}</p>
                  <h3 className="mt-1 text-xl font-semibold">{it.title}</h3>
                  <p className="mt-2 text-muted-foreground">{it.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
