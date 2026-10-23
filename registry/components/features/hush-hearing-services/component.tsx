"use client";

import { motion } from "motion/react";
import { Ear, Headphones, HeartPulse, Home, Waves, Wrench } from "lucide-react";

const SERVICES = [
  {
    icon: Ear,
    title: "Hearing test",
    detail: "45 min · free",
    body: "Full test in a sound booth, with the results explained in plain English and a copy to take home.",
  },
  {
    icon: Waves,
    title: "Wax removal",
    detail: "20 min · £60 both ears",
    body: "Microsuction with a camera, so you can watch. No water, no drops beforehand.",
  },
  {
    icon: HeartPulse,
    title: "Tinnitus appointment",
    detail: "60 min · £95",
    body: "Time to talk it through, sound therapy options and a plan you can start that week.",
  },
  {
    icon: Headphones,
    title: "Custom earplugs",
    detail: "from £120",
    body: "Moulded for musicians, swimmers and light sleepers. Ready in two weeks.",
  },
  {
    icon: Wrench,
    title: "Repairs and retubing",
    detail: "from £15",
    body: "Any make, usually while you wait. Free for aids bought from us.",
  },
  {
    icon: Home,
    title: "Home visits",
    detail: "£40 call-out",
    body: "Within 15 miles of Harrogate, for anyone who can't easily come to us.",
  },
];

export default function HushHearingServices() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] font-bold">What we do at the clinic</h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, detail, body }) => (
            <li key={title}>
              <motion.a
                href="#"
                whileHover={{
                  y: 2,
                  boxShadow:
                    "inset 6px 6px 12px var(--style-lowlight, rgb(0 0 0 / 0.12)), inset -6px -6px 12px var(--style-highlight, rgb(255 255 255 / 0.7))",
                }}
                whileFocus={{ y: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="block h-full rounded-[var(--radius)] bg-card p-7 text-card-foreground shadow-lg"
              >
                <span className="grid size-12 place-items-center rounded-full bg-background text-primary shadow-md">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="mt-5 block text-xl font-bold">{title}</span>
                <span className="mt-1 block text-sm font-semibold text-primary">{detail}</span>
                <span className="mt-3 block text-muted-foreground">{body}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
