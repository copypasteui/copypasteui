"use client";

import { useMemo, useState } from "react";
import { Download, Mail, Phone, Search, ChevronDown } from "lucide-react";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  visits: number;
  lastVisit: string;
  spend: number;
  notes?: string;
  marketing: boolean;
};

const sample: Customer[] = [
  {
    id: "c1",
    name: "Grace Okafor",
    email: "grace@example.com",
    phone: "07700 900789",
    visits: 14,
    lastVisit: "8 Mar",
    spend: 612,
    notes: "Prefers the window table. Anniversary 14 March.",
    marketing: true,
  },
  {
    id: "c2",
    name: "Tom Brennan",
    email: "tom@example.com",
    phone: "07700 900456",
    visits: 6,
    lastVisit: "1 Mar",
    spend: 388,
    notes: "Brings two kids; high chair.",
    marketing: false,
  },
  {
    id: "c3",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "07700 900654",
    visits: 3,
    lastVisit: "22 Feb",
    spend: 141,
    notes: "Severe nut allergy.",
    marketing: true,
  },
  { id: "c4", name: "Ana Lindqvist", email: "ana@example.com", visits: 1, lastVisit: "14 Feb", spend: 96, marketing: false },
  {
    id: "c5",
    name: "Owen Price",
    email: "owen@example.com",
    visits: 9,
    lastVisit: "28 Jan",
    spend: 455,
    notes: "Gift card buyer.",
    marketing: true,
  },
];

const money = (n: number) => n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

// Customer list with notes. Load from your bookings or orders data, save notes in onNotesChange, and
// only include people who opted in when you export for marketing.
export default function AdminCustomers({
  customers: initial = sample,
  onNotesChange,
  onExport,
}: {
  customers?: Customer[];
  onNotesChange?: (id: string, notes: string) => void;
  onExport?: (customers: Customer[]) => void;
}) {
  const [customers, setCustomers] = useState(initial);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"visits" | "recent">("visits");
  const [selected, setSelected] = useState<string | null>(initial[0]?.id ?? null);

  const shown = useMemo(() => {
    const list = customers.filter((c) => `${c.name} ${c.email} ${c.phone ?? ""}`.toLowerCase().includes(query.toLowerCase()));
    return sort === "visits" ? [...list].sort((a, b) => b.visits - a.visits) : list;
  }, [customers, query, sort]);
  const current = customers.find((c) => c.id === selected);

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Customers</h1>
            <p className="text-sm text-muted-foreground">
              {customers.length} people · {customers.filter((c) => c.marketing).length} happy to hear from you
            </p>
          </div>
          <button
            type="button"
            onClick={() => onExport?.(customers.filter((c) => c.marketing))}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <Download className="size-4" /> Export mailing list
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 rounded-[var(--radius)] border border-border bg-card text-card-foreground">
            <div className="flex flex-wrap items-center gap-3 border-b border-border p-3">
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, email or phone"
                  aria-label="Search customers"
                  className="min-w-0 flex-1 bg-transparent outline-none"
                />
              </label>
              <span className="relative inline-flex">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "visits" | "recent")}
                  aria-label="Sort"
                  className="appearance-none rounded-[var(--radius)] border border-border bg-background py-2 pr-8 pl-2 text-sm"
                >
                  <option value="visits">Most visits</option>
                  <option value="recent">Most recent</option>
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
                />
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Visits</th>
                    <th className="px-4 py-2 font-medium">Last visit</th>
                    <th className="px-4 py-2 text-right font-medium">Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shown.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(c.id)}
                      className={`cursor-pointer ${selected === c.id ? "bg-muted" : "hover:bg-muted/60"}`}
                    >
                      <td className="px-4 py-3">
                        {/* The row is clickable for mouse users; the name is the keyboard and screen-reader way in. */}
                        <button
                          type="button"
                          onClick={() => setSelected(c.id)}
                          aria-pressed={selected === c.id}
                          className="text-left font-semibold hover:underline"
                        >
                          {c.name}
                        </button>
                        <span className="block text-xs text-muted-foreground">{c.email}</span>
                      </td>
                      <td className="px-4 py-3">{c.visits}</td>
                      <td className="px-4 py-3">{c.lastVisit}</td>
                      <td className="px-4 py-3 text-right">{money(c.spend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {current && (
            <aside className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
              <h2 className="font-display text-xl font-bold">{current.name}</h2>
              <p className="text-sm text-muted-foreground">
                {current.visits} visits · {money(current.spend)} · last {current.lastVisit}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <a
                  href={`mailto:${current.email}`}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-1.5 hover:bg-muted"
                >
                  <Mail className="size-4" /> Email
                </a>
                {current.phone && (
                  <a
                    href={`tel:${current.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-3 py-1.5 hover:bg-muted"
                  >
                    <Phone className="size-4" /> Call
                  </a>
                )}
              </div>
              <label className="mt-4 block text-sm font-semibold">
                Notes for the team
                <textarea
                  rows={4}
                  value={current.notes ?? ""}
                  onChange={(e) => setCustomers((all) => all.map((c) => (c.id === current.id ? { ...c, notes: e.target.value } : c)))}
                  onBlur={(e) => onNotesChange?.(current.id, e.target.value)}
                  className="mt-1.5 block w-full rounded-[var(--radius)] border border-border bg-background p-2 font-normal outline-none focus:border-primary"
                />
              </label>
              <p className="mt-3 text-xs text-muted-foreground">
                {current.marketing ? "Agreed to marketing emails." : "Hasn't agreed to marketing. Don't add to newsletters."}
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
