"use client";

import { useState } from "react";

// A plain-English starting point for a small business, not legal advice. Fill in every detail below,
// delete what doesn't apply (no payments? remove that part) and have it checked if you take payments
// or sensitive information.
const business = {
  name: "Harbour Kitchen Ltd",
  address: "3 Quay Street, Falmouth TR11 3HH",
  email: "hello@harbourkitchen.example",
  updated: "21 October 2026",
  bookings: "ResDiary",
  payments: "Stripe",
  newsletter: "Buttondown",
  analytics: "Cloudflare Web Analytics (no cookies)",
};

type Doc = { id: "privacy" | "terms"; label: string; sections: { h: string; p: string }[] };

const docs: Doc[] = [
  {
    id: "privacy",
    label: "Privacy policy",
    sections: [
      {
        h: "Who we are",
        p: `${business.name}, ${business.address}, is responsible for the personal information described here. Questions or requests: ${business.email}.`,
      },
      {
        h: "What we collect",
        p: `When you book, we collect your name, phone number, email and any notes you add (for example allergies). When you sign up for our newsletter, we collect your email. Our website host keeps standard server logs, such as your IP address, for security.`,
      },
      {
        h: "Why we use it",
        p: "To manage your booking and contact you about it, to send the newsletter you asked for, and to keep the website working and secure. We never sell your information.",
      },
      {
        h: "Who we share it with",
        p: `Bookings are handled by ${business.bookings}, payments by ${business.payments} (we never see your full card number), and the newsletter by ${business.newsletter}. Visits are counted with ${business.analytics}. Each follows its own privacy policy.`,
      },
      {
        h: "How long we keep it",
        p: "Booking details for 12 months after your visit, newsletter details until you unsubscribe, and accounting records for as long as the law requires (six years in the UK).",
      },
      {
        h: "Your rights",
        p: `You can ask for a copy of your information, ask us to correct or delete it, or object to how we use it. Email ${business.email} and we'll reply within a month. You can also complain to your data protection authority. In the UK, the Information Commissioner's Office (ico.org.uk).`,
      },
      {
        h: "Cookies",
        p: "We only use cookies that the site needs to work, plus any you agree to in the cookie banner. You can change your choice at any time from the link in the footer.",
      },
    ],
  },
  {
    id: "terms",
    label: "Booking terms",
    sections: [
      {
        h: "Bookings",
        p: "Tables are held for 15 minutes after the booking time. For groups of eight or more we take a £10 per person deposit, taken off your bill.",
      },
      {
        h: "Changes and cancellations",
        p: `Change or cancel free of charge up to 24 hours before by replying to your confirmation or emailing ${business.email}. Deposits for later cancellations or no-shows aren't refundable.`,
      },
      {
        h: "Allergies",
        p: "Tell us about allergies when you book and again when you arrive. Our kitchen handles all 14 major allergens, so we can't guarantee any dish is completely free of them.",
      },
      {
        h: "Prices",
        p: "Prices on the website include VAT and may change with the seasons. The menu in the restaurant on the day is the one that applies.",
      },
      { h: "Contact", p: `${business.name}, ${business.address}. ${business.email}.` },
    ],
  },
];

export default function LegalPage() {
  const [active, setActive] = useState<Doc["id"]>("privacy");
  const doc = docs.find((d) => d.id === active)!;

  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <div role="tablist" aria-label="Policies" className="inline-flex rounded-[var(--radius)] border border-border bg-card p-1 text-sm">
          {docs.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={d.id === active}
              onClick={() => setActive(d.id)}
              className={`rounded-[calc(var(--radius)-2px)] px-4 py-2 font-semibold transition ${d.id === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[14rem_1fr]">
          <nav aria-label="On this page" className="md:sticky md:top-8 md:self-start">
            <p className="text-sm text-muted-foreground">Last updated {business.updated}</p>
            <ol className="mt-4 space-y-2 border-l border-border text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.h}>
                  <a
                    href={`#${doc.id}-${i}`}
                    className="-ml-px block border-l-2 border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground"
                  >
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{doc.label}</h1>
            <div className="mt-8 space-y-8">
              {doc.sections.map((s, i) => (
                <div key={s.h} id={`${doc.id}-${i}`} className="scroll-mt-8">
                  <h2 className="font-display text-xl font-bold">{s.h}</h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{s.p}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
