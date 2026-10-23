"use client";

import { motion } from "motion/react";
import { ArrowUpRight, AtSign, Gift } from "lucide-react";

const cols = [
  { title: "Visit", links: ["Menu", "Wine list", "Sunday lunch", "Private dining", "Gift cards"] },
  { title: "Olea", links: ["Our story", "Suppliers", "Careers", "Press", "Contact"] },
];

export default function OleaFooter() {
  return (
    <footer className="overflow-hidden bg-primary font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl leading-tight">Supper club on the first Friday of every month.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-primary-foreground/30"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-primary-foreground/90"
              />
              <button type="submit" className="bg-primary-foreground px-5 text-sm font-semibold text-primary">
                Join
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase opacity-90">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="space-y-5 text-sm">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase opacity-90">Find us</p>
            <p>
              14 Harbour Row, Old Port
              <br />
              Brighton BN1 1PT
            </p>
            <p>
              hello@olea.example
              <br />
              01273 000 000
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-3 py-1.5 hover:bg-primary-foreground hover:text-primary"
              >
                <AtSign className="size-3.5" /> Instagram
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-3 py-1.5 hover:bg-primary-foreground hover:text-primary"
              >
                <Gift className="size-3.5" /> Gifts
              </a>
            </div>
          </div>
        </div>

        <a
          href="#reserve"
          className="group mt-16 flex items-center justify-between gap-6 border-y border-primary-foreground/20 py-6 text-xl font-semibold"
        >
          Reserve your table <ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>

      <motion.p
        initial={{ y: "30%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="text-center font-display text-[30vw] leading-[0.8] tracking-[0.05em] opacity-95 select-none"
      >
        OLEA
      </motion.p>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-6 py-6 text-xs opacity-90">
        <p>
          © 2026 Olea Kitchen Ltd.{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
        <p>Allergens · Privacy · Accessibility</p>
      </div>
    </footer>
  );
}
