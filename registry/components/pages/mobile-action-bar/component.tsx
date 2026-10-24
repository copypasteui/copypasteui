"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CalendarCheck, MapPin, Phone } from "lucide-react";

// A bar fixed to the bottom of the screen on phones, with the three things people come to a local business site to do.
// It slides in once the visitor has scrolled past the first screen and is hidden from 768px up, where the header's
// buttons do the job. Render it once, at the end of the page: it leaves room below the footer so it never covers it.
export default function MobileActionBar({
  phone = "020 7946 0958",
  bookHref = "#book",
  bookLabel = "Book",
  address = "14 Market Street, Bristol BS1 1JQ",
  showAfter = 400,
}: {
  phone?: string;
  bookHref?: string;
  bookLabel?: string;
  address?: string;
  showAfter?: number;
}) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShown(y > showAfter));
  // A page too short to scroll that far shows the bar straight away.
  useEffect(() => {
    if (document.documentElement.scrollHeight - window.innerHeight <= showAfter) setShown(true);
  }, [showAfter]);

  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <>
      <div aria-hidden className="h-[calc(4.75rem+env(safe-area-inset-bottom))] md:hidden" />
      <AnimatePresence>
        {shown && (
          <motion.nav
            aria-label="Quick actions"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 38 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] font-sans text-foreground shadow-lg backdrop-blur md:hidden"
          >
            <ul className="mx-auto grid max-w-md grid-cols-[1fr_1.4fr_1fr] gap-2">
              <li>
                <a
                  href={tel}
                  aria-label={`Call ${phone}`}
                  className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius)] text-xs font-semibold hover:bg-muted"
                >
                  <Phone className="size-5" aria-hidden />
                  Call
                </a>
              </li>
              <li>
                <a
                  href={bookHref}
                  className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-3 text-sm font-semibold text-primary-foreground"
                >
                  <CalendarCheck className="size-5" aria-hidden />
                  {bookLabel}
                </a>
              </li>
              <li>
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Directions to ${address} (opens Google Maps)`}
                  className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-[var(--radius)] text-xs font-semibold hover:bg-muted"
                >
                  <MapPin className="size-5" aria-hidden />
                  Directions
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
