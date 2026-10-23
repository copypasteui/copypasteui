"use client";

import { motion } from "motion/react";
import { Mail, Rss, AtSign, ArrowUp } from "lucide-react";

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "Guides", "Community", "Status"] },
];

export default function BigWordmarkFooter() {
  return (
    <footer className="relative overflow-hidden bg-foreground px-6 pt-20 font-sans text-background">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-2xl font-semibold">Northwind</p>
            <p className="mt-3 max-w-xs text-sm opacity-70">Tools for small teams that want to look big. Made with care, everywhere.</p>
            <form
              className="mt-6 flex max-w-sm overflow-hidden rounded-lg border border-background/20"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-background/50 focus:outline-none"
              />
              <button type="submit" className="bg-primary px-4 text-sm font-semibold text-primary-foreground">
                Subscribe
              </button>
            </form>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-90">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm opacity-80 transition hover:text-primary hover:opacity-100">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-background/15 py-6 text-sm opacity-70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Northwind Labs. All rights reserved.{" "}
            {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}·
            Built with{" "}
            <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
              CopyPasteUI
            </a>
          </p>
          <div className="flex items-center gap-4">
            {[AtSign, Mail, Rss].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="transition hover:text-primary">
                <Icon className="size-5" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-2 grid size-9 place-items-center rounded-full border border-background/25 transition hover:bg-background hover:text-foreground"
              aria-label="Back to top"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.p
        aria-hidden
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "18%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none text-center font-display text-[22vw] leading-none font-bold tracking-tighter opacity-10 select-none"
      >
        Northwind
      </motion.p>
    </footer>
  );
}
