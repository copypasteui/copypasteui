"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, X, LayoutDashboard, Workflow, ShieldCheck, Menu, Megaphone } from "lucide-react";

const products = [
  { icon: LayoutDashboard, title: "Dashboards", body: "Live metrics your team will actually open." },
  { icon: Workflow, title: "Automations", body: "Trigger anything from any event." },
  { icon: ShieldCheck, title: "Governance", body: "Roles, audit trails and approvals." },
];

export default function AnnouncementNavbar() {
  const [banner, setBanner] = useState(true);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="relative z-40 font-sans">
      <AnimatePresence initial={false}>
        {banner && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-foreground text-background"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-10 py-2.5 text-center text-sm">
              <Megaphone className="size-4 shrink-0 text-accent" />
              <span>
                The spring release adds offline mode, AI summaries and 40 new integrations.{" "}
                <a href="#" className="font-semibold underline underline-offset-4">
                  Read the notes
                </a>
              </span>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setBanner(false)}
                className="absolute right-4 opacity-70 hover:opacity-100"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-border bg-background text-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-xs text-primary-foreground">◆</span>
            Lattice
          </a>
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            <div className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
              <button
                type="button"
                onClick={() => setMenu((v) => !v)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Product
                <ChevronDown className={`size-4 transition-transform ${menu ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 pt-2"
                  >
                    <div className="rounded-lg border border-border bg-card p-2 shadow-xl">
                      {products.map((p) => (
                        <a key={p.title} href="#" className="flex gap-3 rounded-md p-3 hover:bg-muted">
                          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                            <p.icon className="size-4" />
                          </span>
                          <span>
                            <span className="block font-semibold text-card-foreground">{p.title}</span>
                            <span className="block text-xs text-muted-foreground">{p.body}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {["Customers", "Pricing", "Docs"].map((l) => (
              <a key={l} href="#" className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Log in
            </a>
            <a href="#" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Start free trial
            </a>
          </div>
          <button type="button" aria-label="Menu" onClick={() => setMobile((v) => !v)} className="ml-auto md:hidden">
            {mobile ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {mobile && (
          <div className="space-y-1 border-t border-border px-6 py-4 md:hidden">
            {["Product", "Customers", "Pricing", "Docs", "Log in"].map((l) => (
              <a key={l} href="#" className="block rounded-md px-3 py-2 font-medium hover:bg-muted">
                {l}
              </a>
            ))}
            <a href="#" className="mt-2 block rounded-md bg-primary px-3 py-2.5 text-center font-semibold text-primary-foreground">
              Start free trial
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
