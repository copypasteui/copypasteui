"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// Case-study tiles are typographic "posters" drawn in CSS so the component carries no third-party brand imagery.
const work = [
  {
    client: "Crumb",
    sector: "Bakery · Bristol",
    result: "+64% online orders",
    bg: "bg-[rgb(244_185_166)]",
    fg: "text-[rgb(47_29_19)]",
    mark: "crumb.",
    style: "font-serif italic",
    span: "md:col-span-2",
  },
  {
    client: "Foxglove",
    sector: "Brewery · Leeds",
    result: "Sold out launch weekend",
    bg: "bg-[rgb(23_21_18)]",
    fg: "text-[rgb(242_179_61)]",
    mark: "FOXGLOVE",
    style: "tracking-tight [font-stretch:75%]",
    span: "",
  },
  {
    client: "Brightline",
    sector: "Dental · Leeds",
    result: "3× new-patient bookings",
    bg: "bg-[rgb(158_230_208)]",
    fg: "text-[rgb(14_42_46)]",
    mark: "bright\nline ✦",
    style: "lowercase",
    span: "",
  },
  {
    client: "Sola",
    sector: "Yoga studio · Falmouth",
    result: "1,800 members in 2 years",
    bg: "bg-[rgb(242_180_139)]",
    fg: "text-[rgb(42_29_23)]",
    mark: "sola ☀",
    style: "lowercase [font-stretch:150%]",
    span: "md:col-span-2",
  },
  {
    client: "Wrenhollow",
    sector: "Wedding venue · Cotswolds",
    result: "Booked out for 2027",
    bg: "bg-[rgb(76_95_79)]",
    fg: "text-[rgb(251_249_244)]",
    mark: "Wrenhollow",
    style: "font-serif italic",
    span: "",
  },
  {
    client: "Hollow Creek",
    sector: "Farm shop · Wye Valley",
    result: "Veg boxes from 40 to 410",
    bg: "bg-[rgb(155_45_32)]",
    fg: "text-[rgb(255_247_238)]",
    mark: "Hollow\nCreek",
    style: "font-serif",
    span: "md:col-span-2",
  },
];

export default function KilnWork() {
  return (
    <section id="work" className="bg-background pb-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 border-t border-foreground pt-6">
          <h2 className="font-display text-4xl font-black uppercase [font-stretch:110%] md:text-7xl md:[font-stretch:120%]">
            Selected work
          </h2>
          <span className="font-display text-4xl font-black md:text-7xl">({work.length})</span>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {work.map((w, i) => (
            <motion.a
              key={w.client}
              href="#"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.7 }}
              className={`group block ${w.span}`}
            >
              <div
                className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius)] ${w.bg} ${w.fg} ${w.span ? "md:aspect-[8/3]" : ""}`}
              >
                <motion.span
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`text-center font-display text-5xl leading-[0.9] font-black whitespace-pre md:text-7xl ${w.style}`}
                >
                  {w.mark}
                </motion.span>
                <span className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-[rgb(255_255_255)]/90 text-[rgb(17_17_17)] opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-[rgb(255_255_255)]/90 px-3 py-1 text-xs font-semibold text-[rgb(17_17_17)]">
                  {w.result}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-black uppercase [font-stretch:115%]">{w.client}</h3>
                <p className="text-sm text-muted-foreground">{w.sector}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
