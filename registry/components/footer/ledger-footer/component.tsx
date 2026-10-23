"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const cols = [
  { title: "Services", links: ["Sole traders", "Limited companies", "Landlords", "Payroll", "VAT"] },
  { title: "Resources", links: ["Tax calendar", "Expense guide", "IR35 checker", "Blog"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
];

export default function LedgerFooter() {
  return (
    <footer className="bg-secondary font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-bold">
              <span className="grid size-9 place-items-center rounded-[var(--radius)] bg-primary text-primary-foreground">L</span> ledger
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">A tax tip a month, in one minute or less.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex max-w-xs rounded-[var(--radius)] border border-border bg-card p-1 text-card-foreground"
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
              />
              <motion.button
                whileHover={{ x: 2 }}
                type="submit"
                aria-label="Subscribe"
                className="grid size-9 place-items-center rounded-[calc(var(--radius)*0.7)] bg-primary text-primary-foreground"
              >
                <ArrowRight className="size-4" />
              </motion.button>
            </form>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-semibold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
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
        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Ledger Accountants Ltd · Chartered accountants · Registered in England & Wales 00000000{" "}
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
