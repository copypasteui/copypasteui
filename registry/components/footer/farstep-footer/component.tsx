"use client";

import { motion } from "motion/react";
import { ArrowRight, AtSign, Compass, ShieldCheck } from "lucide-react";

const cols = [
  { title: "Trips", links: ["Walking", "Paddling", "Wildlife", "Private groups", "Gift vouchers"] },
  { title: "Destinations", links: ["Italy", "Iceland", "Ireland", "Patagonia", "Norway"] },
  { title: "Company", links: ["Our guides", "Responsible travel", "Careers", "Contact", "Booking terms"] },
];

export default function FarstepFooter() {
  return (
    <footer className="bg-background font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 rounded-[calc(var(--radius)*2)] bg-accent p-8 text-accent-foreground md:grid-cols-[1fr_auto] md:items-center md:p-12"
        >
          <div>
            <p className="font-display text-4xl font-black tracking-tight md:text-5xl">Get the 2027 brochure.</p>
            <p className="mt-2 max-w-md">42 trips, 19 countries, zero spam. Sent by post or email, your choice.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md overflow-hidden rounded-full bg-card p-1.5 text-card-foreground"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              aria-label="Email"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Send it <ArrowRight className="size-4" />
            </button>
          </form>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2 font-display text-2xl font-black">
              <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
                <Compass className="size-5" />
              </span>
              farstep
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Small-group adventures since 2009. Independent, family-owned and based in Bristol.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-primary" /> ATOL 12345 · ABTA Y6789
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-bold">{c.title}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © 2026 Farstep Adventures Ltd{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <AtSign className="size-3.5" /> farstep.trips
          </a>
        </div>
      </div>
    </footer>
  );
}
