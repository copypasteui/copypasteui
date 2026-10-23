"use client";

import { motion } from "motion/react";
import { AtSign, Zap } from "lucide-react";

const cols = [
  { title: "Treat", links: ["Physiotherapy", "Sports massage", "Shockwave", "Acupuncture", "Pilates rehab"] },
  { title: "Conditions", links: ["Back pain", "Knee pain", "Shoulder pain", "Running injuries", "Post-surgery"] },
  { title: "Clinic", links: ["Our physios", "Prices", "Insurance", "Careers", "Contact"] },
];

export default function MotionFooter() {
  return (
    <footer className="overflow-hidden bg-foreground font-sans text-background">
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 font-display text-3xl font-black italic">
              <span className="grid size-10 place-items-center rounded-[var(--radius)] bg-accent text-accent-foreground">
                <Zap className="size-5" />
              </span>{" "}
              MOTION
            </p>
            <p className="mt-4 max-w-xs text-sm opacity-70">
              Physiotherapy &amp; sports rehab, Clifton, Bristol. Open 7am – 8pm weekdays, 8am – 1pm Saturdays.
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
              <AtSign className="size-4" /> motionphysio
            </a>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-bold tracking-wider uppercase">{c.title}</p>
              <ul className="mt-4 space-y-2 text-sm opacity-75">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:underline hover:opacity-100">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="mt-14 flex overflow-hidden border-y border-background/15 py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-10 pr-10 font-display text-5xl font-black uppercase italic"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={i % 2 ? "italic" : ""}>
              Keep moving
            </span>
          ))}
        </motion.div>
      </div>
      <p className="mx-auto max-w-7xl px-6 py-6 text-xs opacity-90">
        © 2026 Motion Physio Ltd · HCPC-registered · CSP members{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
