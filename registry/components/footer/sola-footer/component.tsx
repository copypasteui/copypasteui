"use client";

import { motion } from "motion/react";
import { AtSign, MapPin, Sun } from "lucide-react";

export default function SolaFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary font-sans text-secondary-foreground">
      <motion.div
        aria-hidden
        initial={{ y: 120 }}
        whileInView={{ y: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 size-[520px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/25"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-4xl font-extrabold">
              <Sun className="size-8 text-primary" /> sola
            </p>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Yoga, pilates and breathwork on Harbour Wall, Falmouth. Open from 6:45am every day.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {["Timetable", "Classes", "Pricing", "Teachers", "Teacher training", "Retreats"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-3 text-sm">
            <p className="flex gap-2">
              <MapPin className="size-4 shrink-0" /> 2nd floor, 8 Harbour Wall, Falmouth TR11 3AB
            </p>
            <p className="flex gap-2">
              <AtSign className="size-4 shrink-0" /> solastudio
            </p>
            <a href="#timetable" className="mt-4 inline-block rounded-full bg-foreground px-6 py-3 font-semibold text-background">
              Book your first class
            </a>
          </div>
        </div>
        <p className="mt-16 text-xs text-secondary-foreground">
          © 2026 Sola Studio · Yoga Alliance registered school{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
      </div>
    </footer>
  );
}
