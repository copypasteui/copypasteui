"use client";

import { useState } from "react";
import {
  type LucideIcon,
  BarChart3,
  CalendarDays,
  Clock,
  Inbox,
  LayoutDashboard,
  Menu,
  Settings,
  ShoppingBag,
  Star,
  Store,
  UserCog,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: LucideIcon; count?: number };

// The back office frame: sidebar, top bar and today's overview. Point the hrefs at your admin routes
// and feed the numbers from your database.
const nav: NavItem[] = [
  { label: "Today", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays, count: 4 },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, count: 2 },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox, count: 3 },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star, count: 1 },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Hours & closures", href: "/admin/hours", icon: Clock },
  { label: "Staff", href: "/admin/staff", icon: UserCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const stats = [
  { label: "Covers booked tonight", value: "46", note: "of 64 seats" },
  { label: "Takeaway orders today", value: "18", note: "£412 so far" },
  { label: "New enquiries", value: "3", note: "1 private dining" },
  { label: "Website visits this week", value: "1,284", note: "+12% on last week" },
];

const upcoming = [
  { time: "18:00", name: "Okafor", party: 2, note: "Anniversary" },
  { time: "18:30", name: "Brennan", party: 6, note: "High chair" },
  { time: "19:00", name: "Lindqvist", party: 4, note: "" },
  { time: "19:45", name: "Patel", party: 2, note: "Nut allergy" },
];

const todo = ["Reply to Sophie Marsh about a 30-person party", "Mark the hake as sold out", "Approve Jamie's Saturday swap"];

export default function AdminOverview({ business = "Harbour Kitchen", user = "Marta Ruiz" }: { business?: string; user?: string }) {
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebar = (
    <nav aria-label="Back office" className="space-y-0.5 text-sm">
      {nav.map((n, i) => (
        <a
          key={n.href}
          href={n.href}
          aria-current={i === 0 ? "page" : undefined}
          className={`flex items-center gap-3 rounded-[var(--radius)] px-3 py-2 ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          <n.icon className="size-4" />
          <span className="flex-1">{n.label}</span>
          {n.count ? (
            <span
              className={`rounded-full px-1.5 text-xs font-semibold ${i === 0 ? "bg-primary-foreground/20" : "bg-accent text-accent-foreground"}`}
            >
              {n.count}
            </span>
          ) : null}
        </a>
      ))}
    </nav>
  );

  return (
    <section className="flex min-h-screen bg-muted font-sans text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card p-4 text-card-foreground lg:flex">
        <p className="flex items-center gap-2 px-3 py-2 font-display text-lg font-bold">
          <Store className="size-5 text-primary" /> {business}
        </p>
        <div className="mt-6">{sidebar}</div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 text-card-foreground sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              className="grid size-9 place-items-center rounded-[var(--radius)] border border-border lg:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <h1 className="font-display text-xl font-bold">Today</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={open}
              onClick={() => setOpen((o) => !o)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${open ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
            >
              <span className={`size-2 rounded-full ${open ? "bg-primary-foreground" : "bg-accent-foreground"}`} />{" "}
              {open ? "Open now" : "Closed"}
            </button>
            <span className="hidden text-sm text-muted-foreground sm:inline">{user}</span>
          </div>
        </header>
        {menuOpen && <div className="border-b border-border bg-card p-3 lg:hidden">{sidebar}</div>}

        <main className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-[var(--radius)] border border-border bg-card text-card-foreground">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="font-semibold">Next bookings</h2>
                <a href="/admin/bookings" className="text-sm font-semibold text-primary">
                  All bookings
                </a>
              </div>
              <ul className="divide-y divide-border">
                {upcoming.map((b) => (
                  <li key={b.time + b.name} className="flex items-center gap-4 px-4 py-3 text-sm">
                    <span className="w-12 font-mono font-semibold">{b.time}</span>
                    <span className="min-w-0 flex-1 truncate">
                      {b.name} · {b.party} people
                    </span>
                    {b.note && (
                      <span className="hidden rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground sm:inline">
                        {b.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius)] border border-border bg-card text-card-foreground">
              <h2 className="border-b border-border px-4 py-3 font-semibold">Needs you</h2>
              <ul className="space-y-1 p-2">
                {todo.map((t) => (
                  <li key={t}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius)] px-2 py-2 text-sm hover:bg-muted">
                      <input type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" /> {t}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
