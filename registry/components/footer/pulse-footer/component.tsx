"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

const words = ["Strength", "Conditioning", "Boxing", "Mobility", "Community"];

export default function PulseFooter() {
  return (
    <footer className="overflow-hidden bg-accent font-sans text-accent-foreground">
      <div className="overflow-hidden border-b-2 border-accent-foreground py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-8 font-display text-4xl uppercase"
        >
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-8">
              {w} <span aria-hidden>✱</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl leading-[0.9] uppercase md:text-7xl">
            Your first week
            <br />
            is on us.
          </h2>
          <a
            href="#"
            className="group mt-8 inline-flex items-center gap-3 rounded-[var(--radius)] bg-accent-foreground px-7 py-4 font-bold text-accent uppercase"
          >
            Claim free week{" "}
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="space-y-4 text-sm font-medium">
          <p className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" /> Unit 4, Foundry Yard
            <br />
            Manchester M4 6BF
          </p>
          <p className="flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0" /> Mon–Fri 05:00–24:00
            <br />
            Sat–Sun 07:00–22:00
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-bold uppercase">
          {["Classes", "Timetable", "Coaches", "Membership", "Careers", "Contact", "Instagram", "App"].map((l) => (
            <li key={l}>
              <a href="#" className="underline-offset-4 hover:underline">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-2 text-center font-display text-[30vw] leading-[0.78] uppercase select-none">Pulse</p>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t-2 border-accent-foreground px-6 py-5 text-xs font-semibold uppercase sm:flex-row">
        <p>
          © {new Date().getFullYear()} Pulse Athletics Ltd{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <p>Privacy · Terms · Membership T&Cs</p>
      </div>
    </footer>
  );
}
