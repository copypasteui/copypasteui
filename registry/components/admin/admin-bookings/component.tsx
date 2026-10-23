"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Plus, Search, ChevronDown } from "lucide-react";

export type BookingStatus = "confirmed" | "arrived" | "no-show" | "cancelled";
export type Booking = {
  id: string;
  time: string;
  name: string;
  party: number;
  phone: string;
  table?: string;
  note?: string;
  status: BookingStatus;
};

const sample: Booking[] = [
  { id: "b1", time: "12:00", name: "Ellie Hart", party: 2, phone: "07700 900123", table: "4", status: "arrived" },
  { id: "b2", time: "12:30", name: "Tom Brennan", party: 6, phone: "07700 900456", table: "10", note: "High chair", status: "confirmed" },
  { id: "b3", time: "13:00", name: "Grace Okafor", party: 2, phone: "07700 900789", table: "2", note: "Anniversary", status: "confirmed" },
  { id: "b4", time: "13:15", name: "Sam Lee", party: 3, phone: "07700 900321", status: "no-show" },
  { id: "b5", time: "18:00", name: "Priya Patel", party: 2, phone: "07700 900654", table: "6", note: "Nut allergy", status: "confirmed" },
  { id: "b6", time: "19:00", name: "Ana Lindqvist", party: 4, phone: "07700 900987", table: "8", status: "confirmed" },
  { id: "b7", time: "19:30", name: "Dan Murphy", party: 5, phone: "07700 900111", status: "cancelled" },
];

const STATUS: Record<BookingStatus, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-secondary text-secondary-foreground" },
  arrived: { label: "Arrived", className: "bg-primary text-primary-foreground" },
  "no-show": { label: "No-show", className: "bg-accent text-accent-foreground" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground line-through" },
};

// Bookings for one day. Pass bookings from your database and handle onStatusChange / onAdd / onDayChange.
export default function AdminBookings({
  bookings: initial = sample,
  day = "Saturday 14 March",
  seats = 64,
  onStatusChange,
  onAdd,
  onDayChange,
}: {
  bookings?: Booking[];
  day?: string;
  seats?: number;
  onStatusChange?: (id: string, status: BookingStatus) => void;
  onAdd?: () => void;
  onDayChange?: (direction: -1 | 1) => void;
}) {
  const [bookings, setBookings] = useState(initial);
  const [query, setQuery] = useState("");
  const [service, setService] = useState<"all" | "lunch" | "dinner">("all");

  const shown = useMemo(
    () =>
      bookings.filter((b) => {
        const hour = Number(b.time.slice(0, 2));
        const inService = service === "all" || (service === "lunch" ? hour < 16 : hour >= 16);
        return inService && `${b.name} ${b.phone} ${b.note ?? ""}`.toLowerCase().includes(query.toLowerCase());
      }),
    [bookings, query, service],
  );
  const covers = bookings.filter((b) => b.status !== "cancelled").reduce((n, b) => n + b.party, 0);

  const setStatus = (id: string, status: BookingStatus) => {
    setBookings((all) => all.map((b) => (b.id === id ? { ...b, status } : b)));
    onStatusChange?.(id, status);
  };

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-6xl rounded-[var(--radius)] border border-border bg-card text-card-foreground">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous day"
              onClick={() => onDayChange?.(-1)}
              className="grid size-9 place-items-center rounded-[var(--radius)] border border-border hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold">{day}</h1>
              <p className="text-sm text-muted-foreground">
                {covers} of {seats} covers booked
              </p>
            </div>
            <button
              type="button"
              aria-label="Next day"
              onClick={() => onDayChange?.(1)}
              className="grid size-9 place-items-center rounded-[var(--radius)] border border-border hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-4" /> Add booking
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, phone or note"
              aria-label="Search bookings"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
          <div role="tablist" aria-label="Service" className="inline-flex rounded-[var(--radius)] border border-border p-0.5 text-sm">
            {(["all", "lunch", "dinner"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={service === s}
                onClick={() => setService(s)}
                className={`rounded-[calc(var(--radius)-2px)] px-3 py-1.5 capitalize ${service === s ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-border">
          {shown.map((b) => (
            <li key={b.id} className="grid gap-3 p-4 text-sm sm:grid-cols-[4rem_1fr_auto] sm:items-center">
              <span className="font-mono text-base font-semibold">{b.time}</span>
              <div className="min-w-0">
                <p className="font-semibold">
                  {b.name}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {b.party} people{b.table ? ` · table ${b.table}` : ""}
                  </span>
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-muted-foreground">
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-foreground">
                    <Phone className="size-3.5" /> {b.phone}
                  </a>
                  {b.note && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{b.note}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS[b.status].className}`}>
                  {STATUS[b.status].label}
                </span>
                <span className="relative inline-flex">
                  <select
                    value={b.status}
                    onChange={(e) => setStatus(b.id, e.target.value as BookingStatus)}
                    aria-label={`Change status for ${b.name}`}
                    className="appearance-none rounded-[var(--radius)] border border-border bg-background py-1.5 pr-8 pl-2 text-sm"
                  >
                    {Object.entries(STATUS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </span>
              </div>
            </li>
          ))}
          {!shown.length && <li className="p-8 text-center text-sm text-muted-foreground">No bookings match.</li>}
        </ul>
      </div>
    </section>
  );
}
