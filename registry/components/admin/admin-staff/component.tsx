"use client";

import { useState } from "react";
import { Mail, UserPlus, ChevronDown } from "lucide-react";

export type Role = "owner" | "manager" | "staff";
export type Member = { id: string; name: string; email: string; role: Role; status: "active" | "invited" };

const sample: Member[] = [
  { id: "u1", name: "Marta Ruiz", email: "marta@harbourkitchen.example", role: "owner", status: "active" },
  { id: "u2", name: "Jamie Cole", email: "jamie@harbourkitchen.example", role: "manager", status: "active" },
  { id: "u3", name: "Aisha Bello", email: "aisha@harbourkitchen.example", role: "staff", status: "active" },
  { id: "u4", name: "", email: "lewis@example.com", role: "staff", status: "invited" },
];

const ROLES: { id: Role; label: string; can: string }[] = [
  { id: "owner", label: "Owner", can: "Everything, including staff, payments and settings" },
  { id: "manager", label: "Manager", can: "Bookings, orders, menu, hours, reviews and reports" },
  { id: "staff", label: "Staff", can: "Today's bookings and orders only" },
];

// Who can sign in to the back office and what they can do. Save invites and role changes through your
// auth provider in onInvite / onRoleChange — and enforce the same roles in your database rules.
export default function AdminStaff({
  members: initial = sample,
  onInvite,
  onRoleChange,
  onRemove,
}: {
  members?: Member[];
  onInvite?: (email: string, role: Role) => void;
  onRoleChange?: (id: string, role: Role) => void;
  onRemove?: (id: string) => void;
}) {
  const [members, setMembers] = useState(initial);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("staff");

  const invite = () => {
    if (!email.includes("@")) return;
    setMembers((m) => [...m, { id: `u${Date.now()}`, name: "", email, role, status: "invited" }]);
    onInvite?.(email, role);
    setEmail("");
  };

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="font-display text-2xl font-bold">Staff</h1>

        <div className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
          <h2 className="font-semibold">Invite someone</h2>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="invite-email">
              Email
            </label>
            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <span className="relative inline-flex">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                aria-label="Role"
                className="appearance-none rounded-[var(--radius)] border border-border bg-background py-2 pr-8 pl-2 text-sm"
              >
                {ROLES.filter((r) => r.id !== "owner").map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
              />
            </span>
            <button
              type="button"
              onClick={invite}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <UserPlus className="size-4" /> Send invite
            </button>
          </div>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            {ROLES.map((r) => (
              <div key={r.id} className="rounded-[var(--radius)] bg-muted p-3">
                <dt className="font-semibold">{r.label}</dt>
                <dd className="mt-0.5 text-muted-foreground">{r.can}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="divide-y divide-border rounded-[var(--radius)] border border-border bg-card text-card-foreground">
          {members.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-3 p-4 text-sm">
              <span className="grid size-9 place-items-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                {(m.name || m.email).charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{m.name || "Invited"}</span>
                <span className="flex items-center gap-1 truncate text-muted-foreground">
                  <Mail className="size-3.5 shrink-0" /> {m.email}
                </span>
              </span>
              {m.status === "invited" && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">Invite sent</span>
              )}
              {m.role === "owner" ? (
                <span className="text-sm font-semibold">Owner</span>
              ) : (
                <>
                  <span className="relative inline-flex">
                    <select
                      value={m.role}
                      onChange={(e) => {
                        const r = e.target.value as Role;
                        setMembers((all) => all.map((x) => (x.id === m.id ? { ...x, role: r } : x)));
                        onRoleChange?.(m.id, r);
                      }}
                      aria-label={`Role for ${m.name || m.email}`}
                      className="appearance-none rounded-[var(--radius)] border border-border bg-background py-1.5 pr-8 pl-2 text-sm"
                    >
                      {ROLES.filter((r) => r.id !== "owner").map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMembers((all) => all.filter((x) => x.id !== m.id));
                      onRemove?.(m.id);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
