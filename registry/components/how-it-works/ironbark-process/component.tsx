"use client";

import { motion } from "motion/react";
import { ClipboardCheck, Hammer, Key, PencilRuler, Ruler } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const steps = [
  { icon: Ruler, title: "Free survey", when: "Week 0", body: "We measure up, talk budget honestly and tell you what’s realistic." },
  {
    icon: PencilRuler,
    title: "Design & planning",
    when: "Weeks 1–8",
    body: "Our architect draws it, we handle planning, party walls and building regs.",
  },
  {
    icon: ClipboardCheck,
    title: "Fixed-price quote",
    when: "Week 9",
    body: "Line-by-line, no provisional sums hiding the real cost. Signed before we start.",
  },
  {
    icon: Hammer,
    title: "Build",
    when: "On site",
    body: "One project manager, a weekly photo update and a site kept tidier than you’d expect.",
  },
  {
    icon: Key,
    title: "Handover",
    when: "Completion",
    body: "Snag list cleared, certificates in a folder, and a 10-year structural guarantee.",
  },
];

export default function IronbarkProcess() {
  return (
    <section className="overflow-x-clip bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr] [&>*]:min-w-0">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <h2 className="font-display text-6xl leading-[0.9] font-black uppercase md:text-7xl">
            From survey
            <br />
            <span className="text-muted-foreground">to handover.</span>
          </h2>
          <img
            src={img("photo-1772442198624-4fc4d7281e89")}
            alt="Project manager checking drawings on site"
            className="mt-8 aspect-[4/3] w-full object-cover"
          />
        </div>
        <ol className="relative">
          <span aria-hidden className="absolute top-6 bottom-6 left-6 w-0.5 bg-border" />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="relative grid grid-cols-[3rem_1fr] gap-6 pb-12 last:pb-0"
            >
              <span className="relative z-10 grid size-12 place-items-center bg-accent text-accent-foreground">
                <s.icon className="size-5" />
              </span>
              <div className="border-b border-border pb-8">
                <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">{s.when}</p>
                <h3 className="mt-1 font-display text-4xl font-black uppercase">{s.title}</h3>
                <p className="mt-2 max-w-lg text-muted-foreground">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
