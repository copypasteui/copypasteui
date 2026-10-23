"use client";

import { useState } from "react";
import { motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const items = [
  {
    title: "River & waterfall trek",
    meta: "Half day · Daily at 7am",
    body: "Walk the rice terraces with Wayan, our head gardener, and swim beneath a waterfall most guidebooks have never heard of.",
    photo: "photo-1710612198146-77512950a4b7",
  },
  {
    title: "Lagoon pool",
    meta: "Open 6am – 10pm",
    body: "A spring-fed, salt-chlorinated pool under the palms. Floating breakfasts by request.",
    photo: "photo-1636484807510-bc2ffbaf3241",
  },
  {
    title: "Balinese kitchen",
    meta: "Tue, Thu, Sat · 3 hours",
    body: "Morning market, then cook six dishes over coconut husk with our chef’s grandmother.",
    photo: "photo-1717119125410-29c3edf6e075",
  },
  {
    title: "Sunrise yoga pavilion",
    meta: "Daily at 6:30am",
    body: "An open-sided bamboo shala above the valley. All levels, mats and tea provided.",
    photo: "photo-1689729738817-fb1f4256769d",
  },
  {
    title: "Island day by boat",
    meta: "Full day · Private",
    body: "Snorkel the reef off Nusa Penida and lunch on a beach with no road to it.",
    photo: "photo-1691849233457-837d8e2f9da3",
  },
];

export default function CanopyExperiences() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.35em] uppercase opacity-90">Experiences</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Slow days, done properly.</h2>
        </div>

        <div className="mt-14 flex h-[560px] flex-col gap-3 md:flex-row">
          {items.map((it, k) => {
            const active = open === k;
            return (
              <motion.button
                key={it.title}
                type="button"
                layout
                onMouseEnter={() => setOpen(k)}
                onFocus={() => setOpen(k)}
                onClick={() => setOpen(k)}
                aria-expanded={active}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                className="relative overflow-hidden text-left text-white"
                style={{ flex: active ? 5 : 1, borderRadius: "calc(var(--radius) * 1.5)" }}
              >
                <img src={img(it.photo)} alt="" className="absolute inset-0 size-full object-cover" />
                <span
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity ${active ? "opacity-100" : "opacity-70"}`}
                />
                <span
                  className={`absolute top-5 left-5 font-display text-lg transition-opacity md:[writing-mode:vertical-rl] ${active ? "opacity-0" : "opacity-100"}`}
                >
                  {it.title}
                </span>
                <motion.span
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
                  transition={{ delay: active ? 0.2 : 0 }}
                  className="absolute inset-x-0 bottom-0 p-6 md:p-8"
                >
                  <span className="block text-xs tracking-[0.25em] text-white/75 uppercase">{it.meta}</span>
                  <span className="mt-2 block font-display text-3xl md:text-4xl">{it.title}</span>
                  <span className="mt-3 block max-w-md text-white/85">{it.body}</span>
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
