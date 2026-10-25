"use client";

import { motion } from "motion/react";
import { Baby, Car, Eye, Glasses, ScanEye, Sun } from "lucide-react";

// Three wide cards and three narrow ones fill three rows of three columns with no gaps.
const services = [
  {
    icon: ScanEye,
    title: "Full eye examination",
    price: "£35, or free on the NHS",
    body: "Forty minutes with an optometrist, a retinal photo and a 3D OCT scan that can show glaucoma and macular changes years before you notice them.",
    wide: true,
  },
  {
    icon: Glasses,
    title: "Contact lens fitting",
    price: "£25",
    body: "Dailies, monthlies and toric lenses, with a trial pair to take home.",
  },
  { icon: Baby, title: "Children's eye tests", price: "Free under 16", body: "From age three. We use pictures, not letters." },
  {
    icon: Sun,
    title: "Prescription sunglasses",
    price: "From £89",
    body: "Any frame in the shop, with polarised or tinted lenses made up in our lab in eight working days.",
    wide: true,
  },
  {
    icon: Eye,
    title: "Dry eye clinic",
    price: "£45",
    body: "A 30-minute assessment of your tear film and eyelids, then a plan you can follow at home and a check-up six weeks later.",
    wide: true,
  },
  {
    icon: Car,
    title: "Driving check",
    price: "£15",
    body: "The number plate distance and your field of vision, with a letter for the DVLA.",
  },
];

export default function ClearwellServices() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-muted-foreground">Eye care and prices</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">What we test for, and what it costs</h2>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className={`rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground ${s.wide ? "md:col-span-2" : ""}`}
            >
              <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                <s.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{s.price}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
