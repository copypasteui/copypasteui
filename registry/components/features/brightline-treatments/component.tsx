"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlarmClock, ArrowRight, Baby, ScanFace, ShieldCheck, Smile, Stethoscope, Syringe } from "lucide-react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const groups = {
  General: {
    photo: "photo-1629909613654-28e377c37b09",
    alt: "Modern dental surgery with treatment chair",
    items: [
      { icon: Stethoscope, name: "Check-up & X-rays", price: "£55", note: "30 min, includes oral cancer screening" },
      { icon: ShieldCheck, name: "Hygienist clean", price: "£70", note: "Scale, polish and airflow stain removal" },
      { icon: Syringe, name: "White fillings", price: "from £95", note: "Tooth-coloured, same visit" },
      { icon: Baby, name: "Children’s dentistry", price: "Free under 18*", note: "With a parent on a care plan" },
    ],
  },
  Cosmetic: {
    photo: "photo-1567516364473-233c4b6fcfbe",
    alt: "Close-up of a bright, natural smile",
    items: [
      { icon: Smile, name: "Teeth whitening", price: "£295", note: "Custom trays, up to 8 shades lighter" },
      { icon: Smile, name: "Clear aligners", price: "from £1,900", note: "Free 3D scan & smile preview" },
      { icon: ScanFace, name: "Composite bonding", price: "from £180 / tooth", note: "Repair chips and close gaps in a day" },
    ],
  },
  Emergency: {
    photo: "photo-1606811971618-4486d14f3f99",
    alt: "Dentist examining a patient’s teeth",
    items: [
      { icon: AlarmClock, name: "Same-day emergency", price: "£75", note: "Pain relief, call before 10am" },
      { icon: Syringe, name: "Root canal treatment", price: "from £450", note: "Done under rotary, usually one visit" },
      { icon: ShieldCheck, name: "Broken tooth repair", price: "from £95", note: "Temporary or permanent" },
    ],
  },
};

export default function BrightlineTreatments() {
  const [tab, setTab] = useState<keyof typeof groups>("General");
  const g = groups[tab];

  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-black tracking-tight">Treatments &amp; fees</h2>
          <div role="tablist" className="flex rounded-full bg-card p-1 text-card-foreground">
            {(Object.keys(groups) as (keyof typeof groups)[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold ${tab === k ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {tab === k && <motion.span layoutId="bl-tab" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]"
          >
            <div className="overflow-hidden rounded-[calc(var(--radius)*1.5)]">
              <img src={img(g.photo)} alt={g.alt} className="aspect-[4/3] size-full object-cover" />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {g.items.map((t) => (
                <li
                  key={t.name}
                  className="group flex flex-col rounded-[var(--radius)] bg-card p-5 text-card-foreground transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="grid size-11 place-items-center rounded-[calc(var(--radius)*0.7)] bg-accent text-accent-foreground">
                    <t.icon className="size-5" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">{t.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                  <p className="mt-auto flex items-center justify-between pt-4 font-semibold text-primary">
                    {t.price} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-xs text-muted-foreground">
          *NHS treatment available for eligible patients at NHS band charges. 0% finance on treatments over £500.
        </p>
      </div>
    </section>
  );
}
