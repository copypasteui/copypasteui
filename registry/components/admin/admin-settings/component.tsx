"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

export type Settings = {
  name: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  bookingLink: string;
  notifyBookings: boolean;
  notifyEnquiries: boolean;
  notifyReviews: boolean;
  dailySummary: boolean;
};

const sample: Settings = {
  name: "Harbour Kitchen",
  phone: "01632 960 101",
  email: "hello@harbourkitchen.example",
  address: "3 Quay Street, Falmouth TR11 3HH",
  instagram: "@harbourkitchen",
  bookingLink: "https://booking.example.com/harbour-kitchen",
  notifyBookings: true,
  notifyEnquiries: true,
  notifyReviews: false,
  dailySummary: true,
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block text-sm font-medium">
    {label}
    <span className="mt-1.5 block">{children}</span>
  </label>
);
const input =
  "block w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 font-normal outline-none focus:border-primary";

// Business details the whole site reads from (header, footer, contact, structured data) plus
// notification preferences. Load and save them as one record in onSave.
export default function AdminSettings({ settings: initial = sample, onSave }: { settings?: Settings; onSave?: (s: Settings) => void }) {
  const [s, setS] = useState(initial);
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setS((x) => ({ ...x, [key]: value }));
    setSaved(false);
  };

  const toggles: { key: "notifyBookings" | "notifyEnquiries" | "notifyReviews" | "dailySummary"; label: string }[] = [
    { key: "notifyBookings", label: "Email me when someone books" },
    { key: "notifyEnquiries", label: "Email me new enquiries" },
    { key: "notifyReviews", label: "Email me new reviews" },
    { key: "dailySummary", label: "Send a summary every morning at 8am" },
  ];

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave?.(s);
          setSaved(true);
        }}
        className="mx-auto max-w-3xl space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold">Settings</h1>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            {saved ? (
              <>
                <Check className="size-4" /> Saved
              </>
            ) : (
              "Save settings"
            )}
          </button>
        </div>

        <fieldset className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
          <legend className="px-1 font-semibold">Business details</legend>
          <p className="text-sm text-muted-foreground">Shown in the website&apos;s header, footer and contact page.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Business name">
              <input className={input} value={s.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={input} type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Email">
              <input className={input} type="email" value={s.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Instagram">
              <input className={input} value={s.instagram} onChange={(e) => set("instagram", e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address">
                <input className={input} value={s.address} onChange={(e) => set("address", e.target.value)} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Booking link (if you use a booking service)">
                <input className={input} type="url" value={s.bookingLink} onChange={(e) => set("bookingLink", e.target.value)} />
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
          <legend className="px-1 font-semibold">Notifications</legend>
          <ul className="mt-2 divide-y divide-border">
            {toggles.map((t) => (
              <li key={t.key}>
                <label className="flex cursor-pointer items-center justify-between gap-4 py-3 text-sm">
                  {t.label}
                  <input
                    type="checkbox"
                    checked={s[t.key]}
                    onChange={(e) => set(t.key, e.target.checked)}
                    className="size-5 accent-[var(--primary)]"
                  />
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </section>
  );
}
