"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
const topics = ["New project", "Collaboration", "Speaking", "Just saying hi"];

export default function ContactFormSplit() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email doesn’t look right.";
    if (form.message.trim().length < 10) e.message = "A little more detail, please (10+ characters).";
    return e;
  };

  // Connect to your form backend (Formspree, a server action, etc.) where setSent is called.
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (!Object.keys(e).length) setSent(true);
  };

  const field =
    "w-full rounded-md border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <section id="contact" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Let’s talk.</h2>
          <p className="mt-4 max-w-sm text-lg text-muted-foreground">
            Tell us a bit about what you need. We reply within one business day.
          </p>
          <ul className="mt-10 space-y-5">
            {[
              { icon: Mail, k: "Email", v: "hello@example.com" },
              { icon: Phone, k: "Phone", v: "+1 (555) 014-2290" },
              { icon: MapPin, k: "Studio", v: "88 Harbor St, Portland" },
            ].map((c) => (
              <li key={c.k} className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <c.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">{c.k}</span>
                  <span className="font-medium">{c.v}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground md:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-80 flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="size-14 text-primary" />
                <p className="mt-4 font-display text-2xl font-bold">Thanks, {form.name.split(" ")[0]}!</p>
                <p className="mt-2 text-muted-foreground">We’ll get back to you at {form.email}.</p>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="cf-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`${field} ${errors.name ? "border-primary" : "border-border"}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-primary">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`${field} ${errors.email ? "border-primary" : "border-border"}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-primary">{errors.email}</p>}
                  </div>
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium">What’s it about?</legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, topic: t })}
                        className={`rounded-full border px-4 py-1.5 text-sm transition ${form.topic === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="cf-msg" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="cf-msg"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field} resize-none ${errors.message ? "border-primary" : "border-border"}`}
                  />
                  {errors.message && <p className="mt-1 text-sm text-primary">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Send message <Send className="size-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
