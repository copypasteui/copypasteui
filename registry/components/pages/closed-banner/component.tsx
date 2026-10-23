"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarX, X } from "lucide-react";

// Change the dates and the message for each closure; remove the component when you reopen.
const notice = {
  message: "We're closed for the holidays from 24 December and back on Saturday 3 January.",
  extra: "Gift cards are still available online.",
  link: { label: "Buy a gift card", href: "/gift-cards" },
};

export default function ClosedBanner() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          role="region"
          aria-label="Opening times notice"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="overflow-hidden bg-accent font-sans text-accent-foreground"
        >
          <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 text-sm sm:items-center sm:px-6">
            <CalendarX className="mt-0.5 size-4 shrink-0 sm:mt-0" />
            <p className="min-w-0 flex-1">
              <span className="font-semibold">{notice.message}</span> <span className="opacity-90">{notice.extra}</span>{" "}
              <a href={notice.link.href} className="font-semibold underline underline-offset-2">
                {notice.link.label}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Hide this notice"
              className="grid size-7 shrink-0 place-items-center rounded-full hover:bg-accent-foreground/10"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
