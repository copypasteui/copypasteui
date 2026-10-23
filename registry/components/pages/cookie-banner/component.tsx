"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";

export type CookieChoice = { analytics: boolean; marketing: boolean };

// Cookie banner that asks before any non-essential cookies, as UK/EU rules require. It doesn't store
// anything itself: save the choice in your app (a first-party cookie or browser storage) in onChoice, only load analytics
// or ad scripts when the matching choice is true, and pass open={false} once a choice is saved.
export default function CookieBanner({
  open: initiallyOpen = true,
  onChoice,
  policyHref = "/privacy",
}: {
  open?: boolean;
  onChoice?: (choice: CookieChoice) => void;
  policyHref?: string;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const [custom, setCustom] = useState(false);
  const [choice, setChoice] = useState<CookieChoice>({ analytics: false, marketing: false });

  const decide = (c: CookieChoice) => {
    onChoice?.(c);
    setOpen(false);
  };

  const options: { key: keyof CookieChoice; label: string; note: string }[] = [
    { key: "analytics", label: "Analytics", note: "Counts visits so we know which pages help." },
    { key: "marketing", label: "Marketing", note: "Measures ads and lets them be personalised." },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Cookie choices"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-[calc(var(--radius)*1.25)] border border-border bg-card p-5 font-sans text-card-foreground shadow-lg sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex gap-3">
            <Cookie className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="font-semibold">Can we use cookies?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The site works without them. With your OK we&apos;d count visits and measure our ads.{" "}
                <a href={policyHref} className="underline underline-offset-2">
                  Privacy policy
                </a>
              </p>
            </div>
          </div>

          {custom && (
            <fieldset className="mt-4 space-y-3 border-t border-border pt-4">
              <legend className="sr-only">Choose cookies</legend>
              <p className="flex items-center justify-between gap-3 text-sm">
                <span>
                  <span className="font-semibold">Essential</span>
                  <span className="block text-muted-foreground">Needed for the site to work.</span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">Always on</span>
              </p>
              {options.map((o) => (
                <label key={o.key} className="flex cursor-pointer items-center justify-between gap-3 text-sm">
                  <span>
                    <span className="font-semibold">{o.label}</span>
                    <span className="block text-muted-foreground">{o.note}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={choice[o.key]}
                    onChange={(e) => setChoice((c) => ({ ...c, [o.key]: e.target.checked }))}
                    className="size-5 shrink-0 accent-[var(--primary)]"
                  />
                </label>
              ))}
            </fieldset>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {custom ? (
              <button
                type="button"
                onClick={() => decide(choice)}
                className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Save choices
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, marketing: true })}
                  className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Accept all
                </button>
                {/* Same weight as Accept all: regulators expect saying no to be as easy as saying yes. */}
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, marketing: false })}
                  className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => setCustom(true)}
                  className="px-2 py-2 text-sm font-semibold underline underline-offset-2"
                >
                  Choose
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
