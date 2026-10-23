"use client";

import { useState } from "react";
import { CalendarX, Plus, Trash2 } from "lucide-react";

export type DayHours = { day: string; open: boolean; from: string; to: string };
export type Closure = { id: string; from: string; to: string; note: string };

const sampleWeek: DayHours[] = [
  { day: "Monday", open: false, from: "12:00", to: "22:00" },
  { day: "Tuesday", open: true, from: "12:00", to: "22:00" },
  { day: "Wednesday", open: true, from: "12:00", to: "22:00" },
  { day: "Thursday", open: true, from: "12:00", to: "22:00" },
  { day: "Friday", open: true, from: "12:00", to: "23:00" },
  { day: "Saturday", open: true, from: "11:00", to: "23:00" },
  { day: "Sunday", open: true, from: "11:00", to: "17:00" },
];
const sampleClosures: Closure[] = [
  { id: "x1", from: "2026-12-24", to: "2027-01-02", note: "Closed for the holidays. Gift cards still available online." },
];

// Opening hours and closures in one place. Save with onSave; the website's footer, contact section and
// closed-notice banner should all read from the same data so they never disagree.
export default function AdminHours({
  week: initialWeek = sampleWeek,
  closures: initialClosures = sampleClosures,
  onSave,
}: {
  week?: DayHours[];
  closures?: Closure[];
  onSave?: (week: DayHours[], closures: Closure[]) => void;
}) {
  const [week, setWeek] = useState(initialWeek);
  const [closures, setClosures] = useState(initialClosures);
  const [saved, setSaved] = useState(true);
  const change = (i: number, patch: Partial<DayHours>) => {
    setWeek((w) => w.map((d, j) => (j === i ? { ...d, ...patch } : d)));
    setSaved(false);
  };

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold">Hours & closures</h1>
          <button
            type="button"
            disabled={saved}
            onClick={() => {
              onSave?.(week, closures);
              setSaved(true);
            }}
            className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {saved ? "Saved" : "Save and update the website"}
          </button>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card text-card-foreground">
          <h2 className="border-b border-border px-4 py-3 font-semibold">Usual week</h2>
          <ul className="divide-y divide-border">
            {week.map((d, i) => (
              <li key={d.day} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                <span className="w-24 font-medium">{d.day}</span>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={d.open}
                    onChange={(e) => change(i, { open: e.target.checked })}
                    className="size-4 accent-[var(--primary)]"
                  />
                  {d.open ? "Open" : "Closed"}
                </label>
                {d.open && (
                  <span className="ml-auto flex items-center gap-2">
                    <input
                      type="time"
                      value={d.from}
                      onChange={(e) => change(i, { from: e.target.value })}
                      aria-label={`${d.day} opens`}
                      className="rounded-[var(--radius)] border border-border bg-background px-2 py-1"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="time"
                      value={d.to}
                      onChange={(e) => change(i, { to: e.target.value })}
                      aria-label={`${d.day} closes`}
                      className="rounded-[var(--radius)] border border-border bg-background px-2 py-1"
                    />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card text-card-foreground">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-semibold">Holidays & closures</h2>
            <button
              type="button"
              onClick={() => {
                setClosures((c) => [...c, { id: `x${Date.now()}`, from: "", to: "", note: "" }]);
                setSaved(false);
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <Plus className="size-4" /> Add closure
            </button>
          </div>
          <ul className="divide-y divide-border">
            {closures.map((c) => (
              <li key={c.id} className="grid gap-3 p-4 text-sm sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <CalendarX className="hidden size-5 text-muted-foreground sm:block" />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="date"
                      value={c.from}
                      onChange={(e) => {
                        setClosures((all) => all.map((x) => (x.id === c.id ? { ...x, from: e.target.value } : x)));
                        setSaved(false);
                      }}
                      aria-label="Closed from"
                      className="rounded-[var(--radius)] border border-border bg-background px-2 py-1"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="date"
                      value={c.to}
                      onChange={(e) => {
                        setClosures((all) => all.map((x) => (x.id === c.id ? { ...x, to: e.target.value } : x)));
                        setSaved(false);
                      }}
                      aria-label="Closed until"
                      className="rounded-[var(--radius)] border border-border bg-background px-2 py-1"
                    />
                  </div>
                  <input
                    value={c.note}
                    onChange={(e) => {
                      setClosures((all) => all.map((x) => (x.id === c.id ? { ...x, note: e.target.value } : x)));
                      setSaved(false);
                    }}
                    placeholder="Message for the website banner"
                    aria-label="Banner message"
                    className="w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove closure"
                  onClick={() => {
                    setClosures((all) => all.filter((x) => x.id !== c.id));
                    setSaved(false);
                  }}
                  className="grid size-8 place-items-center rounded-[var(--radius)] text-muted-foreground hover:bg-muted"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
            {!closures.length && <li className="p-6 text-center text-sm text-muted-foreground">No closures planned.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
