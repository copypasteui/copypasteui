"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail } from "lucide-react";

export type SignIn = { email: string; password: string };

// The screen only collects details: pass onSignIn to call your auth provider (Supabase Auth, Clerk…)
// and return an error message to show, or nothing on success.
export default function AdminSignIn({
  business = "Harbour Kitchen",
  onSignIn,
  onMagicLink,
}: {
  business?: string;
  onSignIn?: (details: SignIn) => Promise<string | void> | string | void;
  onMagicLink?: (email: string) => Promise<string | void> | string | void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const error = await onSignIn?.({ email, password });
    setBusy(false);
    if (error) setMessage({ kind: "error", text: error });
  };

  const magic = async () => {
    if (!email) return setMessage({ kind: "error", text: "Enter your email first." });
    const error = await onMagicLink?.(email);
    setMessage(error ? { kind: "error", text: error } : { kind: "info", text: `We've emailed a sign-in link to ${email}.` });
  };

  return (
    <section className="grid min-h-screen place-items-center bg-muted px-4 py-16 font-sans text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-[calc(var(--radius)*1.25)] border border-border bg-card p-8 text-card-foreground shadow-sm"
      >
        <span className="grid size-11 place-items-center rounded-[var(--radius)] bg-primary text-primary-foreground">
          <Lock className="size-5" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold">Sign in to {business}</h1>
        <p className="mt-1 text-sm text-muted-foreground">The back office for bookings, orders and your menu.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 block w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
            />
          </label>
          {message && (
            <p
              role={message.kind === "error" ? "alert" : "status"}
              className={`rounded-[var(--radius)] px-3 py-2 text-sm ${message.kind === "error" ? "border border-primary bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"} <ArrowRight className="size-4" />
          </button>
        </form>
        <button
          type="button"
          onClick={magic}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          <Mail className="size-4" /> Email me a sign-in link
        </button>
        <p className="mt-6 text-center text-xs text-muted-foreground">Staff accounts are added by the owner in Settings.</p>
      </motion.div>
    </section>
  );
}
