"use client";

import { useState } from "react";
import { Archive, ArrowLeft, Mail, Phone } from "lucide-react";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  received: string;
  status: "new" | "replied" | "archived";
};

const sample: Enquiry[] = [
  {
    id: "e1",
    name: "Sophie Marsh",
    email: "sophie@example.com",
    phone: "07700 900222",
    subject: "Private dining for 30",
    message:
      "Hi! We're planning a 40th birthday on Saturday 18 April, about 30 people. Could we have the back room from 7pm, and do you do a set menu? A couple of vegetarians and one coeliac.",
    received: "Today 09:12",
    status: "new",
  },
  {
    id: "e2",
    name: "Owen Price",
    email: "owen@example.com",
    subject: "Gift card not received",
    message: "I bought a £50 gift card on Sunday but the email never arrived. Order 1031.",
    received: "Today 08:40",
    status: "new",
  },
  {
    id: "e3",
    name: "Lucy Chen",
    email: "lucy@example.com",
    phone: "07700 900333",
    subject: "Dog friendly?",
    message: "Can we bring our spaniel to lunch on the terrace?",
    received: "Yesterday",
    status: "new",
  },
  {
    id: "e4",
    name: "Raj Mehta",
    email: "raj@example.com",
    subject: "Supplier introduction",
    message: "We're a day-boat fishery in Newlyn and would love to send you our list.",
    received: "Mon",
    status: "replied",
  },
];

// Messages from the website's contact form. Load them from wherever your form saves (Supabase, Formspree…),
// and save onStatusChange; onReply should open a reply or send one through your email service.
export default function AdminEnquiries({
  enquiries: initial = sample,
  onStatusChange,
  onReply,
}: {
  enquiries?: Enquiry[];
  onStatusChange?: (id: string, status: Enquiry["status"]) => void;
  onReply?: (e: Enquiry) => void;
}) {
  const [list, setList] = useState(initial);
  const [filter, setFilter] = useState<"new" | "all">("new");
  const [openId, setOpenId] = useState<string | null>(initial[0]?.id ?? null);
  const shown = list.filter((e) => (filter === "new" ? e.status === "new" : e.status !== "archived"));
  const current = list.find((e) => e.id === openId) ?? null;

  const set = (id: string, status: Enquiry["status"]) => {
    setList((all) => all.map((e) => (e.id === id ? { ...e, status } : e)));
    onStatusChange?.(id, status);
  };

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground md:grid-cols-[20rem_1fr]">
        <div className={`border-border md:border-r ${current ? "hidden md:block" : ""}`}>
          <div className="flex items-center justify-between border-b border-border p-4">
            <h1 className="font-display text-xl font-bold">Enquiries</h1>
            <div className="inline-flex rounded-[var(--radius)] border border-border p-0.5 text-xs">
              {(["new", "all"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-[calc(var(--radius)-2px)] px-2.5 py-1 capitalize ${filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-border">
            {shown.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(e.id)}
                  className={`w-full p-4 text-left text-sm ${openId === e.id ? "bg-muted" : "hover:bg-muted/60"}`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-semibold">
                      {e.status === "new" && <span className="size-2 rounded-full bg-primary" aria-label="New" />}
                      {e.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">{e.received}</span>
                  </span>
                  <span className="mt-0.5 block font-medium">{e.subject}</span>
                  <span className="mt-0.5 block truncate text-muted-foreground">{e.message}</span>
                </button>
              </li>
            ))}
            {!shown.length && <li className="p-8 text-center text-sm text-muted-foreground">All caught up.</li>}
          </ul>
        </div>

        {current ? (
          <article className="min-w-0 p-5 sm:p-6">
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground md:hidden"
            >
              <ArrowLeft className="size-4" /> All enquiries
            </button>
            <p className="text-sm text-muted-foreground">{current.received}</p>
            <h2 className="mt-1 font-display text-2xl font-bold">{current.subject}</h2>
            <p className="mt-1 text-sm">{current.name}</p>
            <p className="mt-5 max-w-2xl leading-relaxed whitespace-pre-line">{current.message}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  onReply?.(current);
                  set(current.id, "replied");
                }}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Mail className="size-4" /> Reply to {current.email}
              </button>
              {current.phone && (
                <a
                  href={`tel:${current.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  <Phone className="size-4" /> {current.phone}
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  set(current.id, "archived");
                  setOpenId(null);
                }}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
              >
                <Archive className="size-4" /> Archive
              </button>
            </div>
          </article>
        ) : (
          <p className="hidden place-items-center p-10 text-sm text-muted-foreground md:grid">Pick a message to read it.</p>
        )}
      </div>
    </section>
  );
}
