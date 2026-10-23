"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const lines = [
  { t: "$ npx create-forge@latest my-app", cls: "text-foreground" },
  { t: "✔ Picked template: api + web", cls: "text-primary" },
  { t: "✔ Installed 214 packages in 3.1s", cls: "text-primary" },
  { t: "✔ Database provisioned (eu-west)", cls: "text-primary" },
  { t: "→ Live at https://my-app.example.com", cls: "text-muted-foreground" },
];

export default function TerminalBannerCta() {
  // With reduced motion the whole session is shown at once instead of typed out line by line.
  const still = useReducedMotion();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (still) return setShown(lines.length);
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 400 : 700);
    return () => clearTimeout(t);
  }, [shown, still]);

  return (
    <section className="border-y border-border bg-muted px-6 py-20 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Your app on a real URL <span className="text-primary">in about 90 seconds.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Forge builds it, gives it a Postgres database in London or Frankfurt, and sends you the link. Free up to 10,000 requests a day,
            then £8 a month.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              Try it on a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="rounded-md border border-border bg-background px-6 py-3 font-semibold hover:bg-card">
              Read the docs
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/projects — zsh</span>
          </div>
          <div className="min-h-56 space-y-2 p-5 font-mono text-sm">
            {lines.slice(0, shown).map((l) => (
              <motion.p key={l.t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={l.cls}>
                {l.t}
              </motion.p>
            ))}
            {shown < lines.length && <span className="inline-block h-4 w-2 animate-pulse bg-primary align-middle" />}
          </div>
        </div>
      </div>
    </section>
  );
}
