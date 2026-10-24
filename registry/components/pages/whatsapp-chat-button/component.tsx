"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageCircle, MessageSquareText, X } from "lucide-react";

// A round button in the corner that opens a small card: who replies, how soon, and one tap to WhatsApp (with a first
// message filled in), a text or an email. It uses wa.me links, so there's no widget script or account to set up.
// Pass aboveActionBar when the page also has the mobile action bar, so the two don't overlap on phones.
export default function WhatsAppChatButton({
  whatsapp = "447700900461",
  phone = "07700 900461",
  email = "hello@example.com",
  name = "Sam",
  role = "Front desk",
  greeting = "Hi! Ask us about prices, availability or parking and we'll get back to you.",
  replyTime = "Usually replies within an hour, 9am to 6pm",
  firstMessage = "Hi, I have a question about ",
  aboveActionBar = false,
}: {
  whatsapp?: string;
  phone?: string;
  email?: string;
  name?: string;
  role?: string;
  greeting?: string;
  replyTime?: string;
  firstMessage?: string;
  aboveActionBar?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const wa = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(firstMessage)}`;
  const sms = `sms:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-end gap-3 font-sans md:right-6 md:bottom-6 ${aboveActionBar ? "bottom-24" : "bottom-4"}`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={`Message ${name}`}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-[calc(var(--radius)*1.25)] border border-border bg-card text-card-foreground shadow-xl"
          >
            <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground font-display text-lg font-bold text-primary"
              >
                {name.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">
                  {name} · {role}
                </span>
                <span className="block text-xs opacity-90">{replyTime}</span>
              </span>
            </div>
            <div className="p-4">
              <p className="rounded-[var(--radius)] rounded-tl-none bg-muted px-3 py-2.5 text-sm text-foreground">{greeting}</p>
              <div className="mt-4 grid gap-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden /> Message on WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={sms}
                    className="flex items-center justify-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
                  >
                    <MessageSquareText className="size-4" aria-hidden /> Send a text
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center justify-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
                  >
                    <Mail className="size-4" aria-hidden /> Email us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close messages" : `Message ${name} on WhatsApp`}
        whileTap={{ scale: 0.92 }}
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
