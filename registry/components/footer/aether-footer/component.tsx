"use client";

import { motion } from "motion/react";

const cols = [
  { t: "Product", l: ["Agents", "Integrations", "Security", "Pricing", "Changelog"] },
  { t: "Company", l: ["About", "Careers", "Blog", "Press"] },
  { t: "Legal", l: ["Privacy", "Terms", "DPA", "Responsible AI"] },
];

export default function AetherFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-background px-6 pt-20 font-sans text-foreground">
      {/* eclipse-ring background, inlined and sunk below the fold */}
      <div aria-hidden className="absolute bottom-0 left-1/2 -z-10 aspect-square w-[min(110vw,900px)] -translate-x-1/2 translate-y-[62%]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent,var(--primary)_60deg,white_95deg,var(--accent)_130deg,transparent_200deg)] [mask:radial-gradient(closest-side,transparent_94%,black_96%,transparent_100%)]"
        />
        <div className="absolute inset-[4%] rounded-full bg-background" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="size-3 rounded-full bg-primary" /> Aether
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            AI agents for operations teams. SOC 2 Type II · EU & US data residency.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <p className="text-sm font-medium">{c.t}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="hover:text-foreground">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-24 max-w-6xl pb-56 text-center text-xs text-muted-foreground md:pb-72">
        © {new Date().getFullYear()} Aether Labs, Inc. Built for the night shift.{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
