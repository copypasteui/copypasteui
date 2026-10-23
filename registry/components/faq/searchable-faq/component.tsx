"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown } from "lucide-react";

const faqs = [
  {
    cat: "Billing",
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from Settings → Billing and you keep access until the end of the period. No emails, no calls.",
  },
  {
    cat: "Billing",
    q: "Do you offer refunds?",
    a: "If you’re not happy in the first 30 days, we refund you in full. Just reply to your receipt.",
  },
  { cat: "Billing", q: "Is there a student discount?", a: "Students and educators get 50% off with a school email address." },
  {
    cat: "Account",
    q: "Can I use it on multiple devices?",
    a: "Your plan covers all your devices: phone, tablet, laptop and the web app, all in sync.",
  },
  { cat: "Account", q: "How do I export my data?", a: "Settings → Data → Export gives you a full JSON and CSV archive in seconds." },
  {
    cat: "Privacy",
    q: "Do you sell my data?",
    a: "Never. We make money from subscriptions only. We don’t run ads and don’t share data with advertisers.",
  },
  { cat: "Privacy", q: "Where is my data stored?", a: "On your device first. Optional sync is end-to-end encrypted and hosted in the EU." },
];
const cats = ["All", ...Array.from(new Set(faqs.map((f) => f.cat)))];

export default function SearchableFaq() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    return faqs.filter((f) => (cat === "All" || f.cat === cat) && (!t || `${f.q} ${f.a}`.toLowerCase().includes(t)));
  }, [q, cat]);

  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl font-bold tracking-tight md:text-5xl">How can we help?</h2>
        <label className="mt-8 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions…"
            className="w-full bg-transparent text-card-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {list.map((f) => {
            const isOpen = open === f.q;
            return (
              <motion.div layout key={f.q} className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : f.q)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span>
                    <span className="mb-1 block text-xs font-semibold tracking-wider text-primary uppercase">{f.cat}</span>
                    <span className="font-semibold">{f.q}</span>
                  </span>
                  <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-muted-foreground"
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {!list.length && (
            <p className="py-10 text-center text-muted-foreground">No results for “{q}”. Try another word or contact support.</p>
          )}
        </div>
      </div>
    </section>
  );
}
