"use client";

import { motion } from "motion/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const img = (id: string, w = 400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const agents = [
  { name: "Hannah Price", role: "Sales director", photo: "photo-1758518727888-ffa196002e59" },
  { name: "Oliver Grant", role: "Lettings manager", photo: "photo-1778692258270-bc0e80e975c0" },
  { name: "Mei Chen", role: "Senior valuer", photo: "photo-1581065178047-8ee15951ede6" },
];

export default function KeystoneContact() {
  return (
    <section id="contact" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Visit the branch</p>
          <h2 className="mt-4 font-display text-5xl">Talk to someone local.</h2>
          <ul className="mt-8 space-y-4">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-accent" /> 22 The Promenade, Cheltenham GL50 1LN
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-accent" /> Sales 01242 000 000 · Lettings 01242 000 001
            </li>
            <li className="flex gap-3">
              <Mail className="size-5 shrink-0 text-accent" /> hello@keystone.example
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0 text-accent" /> Mon–Fri 8:30–6 · Sat 9–4 · Viewings till 8pm
            </li>
          </ul>
          <div className="mt-10 space-y-3">
            {agents.map((a, i) => (
              <motion.a
                key={a.name}
                href="#"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 border border-border p-3 transition hover:border-accent"
                style={{ borderRadius: "var(--radius)" }}
              >
                <img src={img(a.photo)} alt="" className="size-14 rounded-full object-cover" />
                <span className="flex-1">
                  <span className="block font-semibold">{a.name}</span>
                  <span className="text-sm text-muted-foreground">{a.role}</span>
                </span>
                <span className="text-xs font-semibold tracking-widest text-accent uppercase opacity-0 transition group-hover:opacity-100">
                  Contact →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden bg-muted" style={{ borderRadius: "var(--radius)" }}>
          <svg viewBox="0 0 600 500" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="600" height="500" className="fill-muted" />
            <path d="M0 330 C 150 300, 260 380, 420 330 S 600 280, 600 300 V500 H0Z" className="fill-secondary" />
            <g className="stroke-card" strokeWidth="14" fill="none" strokeLinecap="round">
              <path d="M-20 120 L620 200" />
              <path d="M140 -20 L220 520" />
              <path d="M380 -20 L330 520" />
              <path d="M-20 420 L620 360" />
            </g>
            <g className="stroke-card" strokeWidth="5" fill="none">
              <path d="M0 260 L600 250" />
              <path d="M500 0 L520 500" />
              <path d="M60 0 L40 500" />
            </g>
            {[
              [90, 60],
              [260, 70],
              [460, 110],
              [60, 200],
              [270, 220],
              [440, 240],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="70" height="40" rx="4" className="fill-card" opacity="0.6" />
            ))}
          </svg>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120 }}
            className="absolute top-[42%] left-[52%] -translate-x-1/2 -translate-y-full"
          >
            <span
              className="flex items-center gap-2 bg-primary px-4 py-3 font-display text-lg text-primary-foreground shadow-xl"
              style={{ borderRadius: "var(--radius)" }}
            >
              <MapPin className="size-5 text-accent" /> Keystone
            </span>
            <span className="mx-auto block h-4 w-0.5 bg-primary" />
          </motion.div>
          <span
            className="absolute bottom-4 left-4 bg-card px-3 py-1.5 text-xs font-semibold text-card-foreground"
            style={{ borderRadius: "var(--radius)" }}
          >
            2 min walk from the Promenade bus stops
          </span>
        </div>
      </div>
    </section>
  );
}
