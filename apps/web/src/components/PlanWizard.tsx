"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Loader2, RotateCcw } from "lucide-react";
import CopyText from "@/components/CopyText";
import { PrivacyNote } from "@/components/UsePanel";
import { loadBusiness, saveBusiness } from "@/lib/business";
import { config } from "@/lib/config";
import {
  ACTIONS,
  HOSTING,
  PAGES,
  PLAN_FILE,
  label,
  makePlan,
  planBrief,
  rounds,
  type Answers,
  type Field,
  type PlanIndex,
  type PlanRecipe,
} from "@mcp/plan-core";

/**
 * The MCP's plan_website questions as a step-by-step form. Same rounds, same trade defaults and the
 * same copypasteui.config.json, so a plan made here can be built in Claude Code and vice versa.
 * Answers stay in this browser.
 */
export type PlanData = PlanIndex & { recipes: PlanRecipe[]; themes: { slug: string; name: string }[]; thumbnails: Record<string, string> };
type Mode = "quick" | "full";
type Saved = { mode: Mode; answers: Answers; step: number };

const STORE = "copypasteui:plan";
const INTRO = -1;

function loadSaved(): Saved | null {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? "null");
  } catch {
    return null;
  }
}

const promptCache = new Map<string, Promise<string>>();
const fetchField = (url: string, field: string) => {
  if (!promptCache.has(url))
    promptCache.set(
      url,
      fetch(url)
        .then((r) => r.json())
        .then((j) => j[field] as string),
    );
  return promptCache.get(url)!;
};

export default function PlanWizard({ data }: { data: PlanData }) {
  const [mode, setMode] = useState<Mode>("quick");
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(INTRO);
  const [ready, setReady] = useState(false);

  // Pick up a plan in progress, or start from the details typed on a template page.
  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setMode(saved.mode);
      setAnswers(saved.answers);
      setStep(saved.step);
    } else {
      const b = loadBusiness();
      setAnswers(
        Object.fromEntries(
          Object.entries({ name: b.name, trade: b.trade, area: b.town, phone: b.phone, email: b.email }).filter(([, v]) => v.trim()),
        ),
      );
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ mode, answers, step }));
    } catch {
      // storage blocked: the plan still works for this visit
    }
    // Keep the template pages' "Your business" fields in step with the plan.
    saveBusiness({
      name: answers.name ?? "",
      trade: answers.trade ?? "",
      town: answers.area ?? "",
      phone: answers.phone ?? "",
      email: answers.email ?? "",
    });
  }, [ready, mode, answers, step]);

  const list = useMemo(() => rounds(data, data.recipes, answers.trade, mode === "quick"), [data, answers.trade, mode]);
  const done = step >= list.length;
  const round = step >= 0 && !done ? list[step] : null;

  // Multi-choice questions start with their suggested picks ticked.
  useEffect(() => {
    if (!round) return;
    const fill = round.fields.filter((f) => f.kind === "many" && f.preselect && answers[f.key] === undefined);
    if (fill.length)
      setAnswers((a) => ({ ...a, ...Object.fromEntries(fill.map((f) => [f.key, f.kind === "many" ? f.preselect : undefined])) }));
  }, [round, answers]);

  const set = (key: keyof Answers, value: string | string[] | undefined) => setAnswers((a) => ({ ...a, [key]: value }));
  const moved = useRef(false);
  const go = (n: number) => {
    moved.current = true;
    setStep(n);
  };
  // After the next round has rendered, bring its top into view if it's above the screen.
  useEffect(() => {
    const el = document.getElementById("plan");
    if (!moved.current || !el) return;
    moved.current = false;
    if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);
  const missing = round?.id === "basics" ? (["name", "trade"] as const).filter((k) => !answers[k]?.toString().trim()) : [];

  if (!ready) return <div id="plan" className="mt-10 h-64 rounded-lg border border-border" />;

  return (
    <section id="plan" className="mt-10 scroll-mt-24">
      {step === INTRO ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                m: "quick" as const,
                title: "The short version",
                body: "Seven questions: name, trade, town, phone, email, what customers should do, and where the site will be hosted. We choose the template and pages from your trade.",
              },
              {
                m: "full" as const,
                title: "The full version",
                body: "The same, plus the template, how the writing sounds, which pages you want, your contact form, newsletter, back office and visitor stats.",
              },
            ].map((o) => (
              <button
                key={o.m}
                type="button"
                onClick={() => {
                  setMode(o.m);
                  go(0);
                }}
                className="rounded-lg border border-foreground bg-card p-5 text-left text-card-foreground shadow-[4px_4px_0_var(--foreground)] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <span className="font-display text-xl font-bold">{o.title}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{o.body}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Start <ArrowRight className="size-4" />
                </span>
              </button>
            ))}
          </div>
          <PrivacyNote className="mt-5" />
        </>
      ) : round ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!missing.length) go(step + 1);
          }}
          className="rounded-lg border border-foreground bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--foreground)] sm:p-7"
        >
          <Progress list={list.map((r) => r.title)} step={step} onJump={(i) => i < step && go(i)} />
          <h2 className="mt-6 font-display text-2xl font-bold">{round.title}</h2>
          <p className="mt-1 text-muted-foreground">{round.intro}</p>
          <div className="mt-6 space-y-7">
            {round.fields.map((f) => (
              <Question
                key={f.key}
                field={f}
                value={answers[f.key]}
                onChange={(v) => set(f.key, v)}
                required={round.id === "basics" && (f.key === "name" || f.key === "trade")}
                thumbnails={data.thumbnails}
              />
            ))}
          </div>
          {round.id === "basics" ? <PrivacyNote className="mt-6" /> : null}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:border-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              type="submit"
              disabled={missing.length > 0}
              className="inline-flex items-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none disabled:opacity-40"
            >
              {step === list.length - 1 ? "See my plan" : "Next"} <ArrowRight className="size-4" />
            </button>
            {missing.length ? (
              <span className="text-sm text-muted-foreground">We need the business name and what it does to continue.</span>
            ) : round.id !== "basics" ? (
              <span className="text-sm text-muted-foreground">
                Leave anything you&apos;re unsure about. We&apos;ll fill it in based on your trade.
              </span>
            ) : null}
          </div>
        </form>
      ) : (
        <Result
          data={data}
          answers={answers}
          mode={mode}
          onEdit={(id) => {
            const full = rounds(data, data.recipes, answers.trade, false);
            setMode("full");
            go(
              Math.max(
                0,
                full.findIndex((r) => r.id === id),
              ),
            );
          }}
          onRestart={() => {
            setAnswers({});
            setMode("quick");
            go(INTRO);
          }}
        />
      )}
    </section>
  );
}

function Progress({ list, step, onJump }: { list: string[]; step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs" aria-label="Rounds">
      {list.map((t, i) => (
        <li key={t}>
          <button
            type="button"
            onClick={() => onJump(i)}
            aria-current={i === step ? "step" : undefined}
            className={
              i === step
                ? "font-semibold text-foreground"
                : i < step
                  ? "text-muted-foreground hover:text-foreground"
                  : "cursor-default text-muted-foreground/60"
            }
          >
            {i < step ? <Check className="mr-1 inline size-3" /> : <span className="mr-1">{i + 1}.</span>}
            {t}
          </button>
        </li>
      ))}
    </ol>
  );
}

function Question({
  field: f,
  value,
  onChange,
  required,
  thumbnails,
}: {
  field: Field;
  value: string | string[] | undefined;
  onChange: (v: string | string[] | undefined) => void;
  required: boolean;
  thumbnails: Record<string, string>;
}) {
  const id = `q-${f.key}`;
  if (f.kind === "text") {
    return (
      <label htmlFor={id} className="block">
        <span className="font-semibold">
          {f.title}
          {required ? null : <span className="font-normal text-muted-foreground"> (optional)</span>}
        </span>
        {f.hint ? <span className="block text-sm text-muted-foreground">{f.hint}</span> : null}
        <input
          id={id}
          type={f.format === "email" ? "email" : f.key === "phone" ? "tel" : "text"}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground"
        />
      </label>
    );
  }
  const many = f.kind === "many";
  const picked = many ? (Array.isArray(value) ? value : []) : value;
  const isOn = (v: string) => (many ? (picked as string[]).includes(v) : picked === v);
  const toggle = (v: string) => {
    if (many) onChange(isOn(v) ? (picked as string[]).filter((x) => x !== v) : [...(picked as string[]), v]);
    else onChange(isOn(v) ? undefined : v);
  };
  const isTemplate = f.key === "template";
  return (
    <fieldset>
      <legend className="font-semibold">
        {f.title}
        {many ? <span className="font-normal text-muted-foreground"> (pick any)</span> : null}
      </legend>
      {f.hint ? <p className="text-sm text-muted-foreground">{f.hint}</p> : null}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {f.options.map((o) => {
          const on = isOn(o.value);
          const [name, fits] = isTemplate ? o.label.split(" — fits ") : [o.label];
          return (
            <button
              key={o.value}
              type="button"
              role={many ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => toggle(o.value)}
              className={`flex min-w-0 items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition ${on ? "border-foreground bg-accent text-accent-foreground" : "border-border bg-background hover:border-foreground"}`}
            >
              <span
                aria-hidden
                className={`mt-0.5 grid size-4 shrink-0 place-items-center border border-current ${many ? "rounded-sm" : "rounded-full"}`}
              >
                {on ? <Check className="size-3" /> : null}
              </span>
              {isTemplate ? (
                <span className="min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnails[o.value]}
                    alt=""
                    loading="lazy"
                    className="mb-2 aspect-[16/10] w-full rounded border border-border object-cover object-top"
                  />
                  <span className="block font-semibold">{name}</span>
                  {fits ? <span className="block text-xs opacity-75">Fits {fits}</span> : null}
                </span>
              ) : (
                <span className="min-w-0">{o.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Result({
  data,
  answers,
  mode,
  onEdit,
  onRestart,
}: {
  data: PlanData;
  answers: Answers;
  mode: Mode;
  onEdit: (round: string) => void;
  onRestart: () => void;
}) {
  const plan = useMemo(() => makePlan(data, answers), [data, answers]);
  const template = data.templates.find((t) => t.slug === plan.look.template)!;
  const theme = data.themes.find((t) => t.slug === plan.look.theme)?.name ?? plan.look.theme;
  // "Brightline — Dental Clinic" reads as "Brightline (dental clinic)"; the theme is only named when it isn't the template's own.
  const [brand, kind] = template.name.split(" — ");
  const look = `${brand}${kind ? ` (${kind.toLowerCase()})` : ""}${theme === brand ? "" : ` in the ${theme} colours`}`;
  const backOffice = data.recipes.find((r) => r.slug === plan.extras.backOffice)?.name;
  const [door, setDoor] = useState<"builder" | "code">("builder");
  const [copied, setCopied] = useState<"idle" | "loading" | "done" | "error">("idle");

  const buildPrompt = async () => {
    const [prompt, block] = await Promise.all([
      fetchField(`/r/templates/${plan.look.template}.json`, "prompt"),
      fetchField(`/r/themes/${plan.look.theme}.json`, "promptBlock"),
    ]);
    return prompt.replace("{{THEME}}", block) + planBrief(plan, config.siteUrl, data.recipes);
  };

  const copyPrompt = async () => {
    setCopied("loading");
    try {
      // Safari only allows a copy that waits on a fetch when it's handed over as a pending ClipboardItem.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
        const blob = buildPrompt().then((t) => new Blob([t], { type: "text/plain" }));
        await navigator.clipboard
          .write([new ClipboardItem({ "text/plain": blob })])
          .catch(async () => navigator.clipboard.writeText(await buildPrompt()));
      } else {
        await navigator.clipboard.writeText(await buildPrompt());
      }
      setCopied("done");
      setTimeout(() => setCopied("idle"), 2200);
    } catch {
      setCopied("error");
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(plan, null, 2)}\n`], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: PLAN_FILE });
    a.click();
    URL.revokeObjectURL(url);
  };

  const rows: { round: string; title: string; value: string }[] = [
    {
      round: "basics",
      title: "Business",
      value: [plan.business.name, plan.business.trade, plan.business.area].filter(Boolean).join(" · "),
    },
    {
      round: "basics",
      title: "Contact",
      value:
        [plan.business.phone, plan.business.email].filter(Boolean).join(" · ") || "Not added. The prompt leaves gaps for you to fill in.",
    },
    { round: "goal", title: "Main action", value: label(ACTIONS, plan.goal.primaryAction) },
    { round: "look", title: "Template", value: look },
    { round: "pages", title: "Pages", value: ["Home", ...plan.pages.map((p) => label(PAGES, p))].join(", ") },
    {
      round: "extras",
      title: "Extras",
      value:
        [
          plan.extras.forms !== "none" && "contact form",
          plan.extras.newsletter !== "none" && "newsletter",
          backOffice && `back office on ${backOffice}`,
          plan.extras.analytics !== "none" && "visitor stats",
        ]
          .filter(Boolean)
          .join(", ") || "None",
    },
    {
      round: "hosting",
      title: "Going live",
      value: `${label(HOSTING, plan.hosting.platform)}${plan.hosting.domain ? ` at ${plan.hosting.domain}` : ""}`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-foreground bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--foreground)] sm:p-7">
        <h2 className="font-display text-2xl font-bold">Your plan</h2>
        <dl className="mt-5 divide-y divide-border border-y border-border">
          {rows.map((r) => (
            <div key={r.title} className="grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-3 py-3 text-sm sm:grid-cols-[9rem_1fr_auto]">
              <dt className="text-muted-foreground">{r.title}</dt>
              <dd className="min-w-0 break-words">{r.value}</dd>
              <dd>
                <button type="button" onClick={() => onEdit(r.round)} className="font-semibold hover:highlight">
                  Change
                </button>
              </dd>
            </div>
          ))}
        </dl>
        {mode === "quick" ? (
          <p className="mt-4 text-sm text-muted-foreground">
            We picked the template, pages and extras for your trade.{" "}
            <button type="button" onClick={() => onEdit("look")} className="font-semibold text-foreground hover:highlight">
              Choose them yourself →
            </button>
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-foreground bg-card text-card-foreground shadow-[4px_4px_0_var(--foreground)]">
        <div role="tablist" aria-label="How do you build?" className="grid grid-cols-2 border-b border-foreground text-sm font-semibold">
          {[
            { id: "builder" as const, label: "With an AI builder", hint: "Lovable, Bolt, v0, ChatGPT…" },
            { id: "code" as const, label: "In code", hint: "Claude Code, VS Code, Cursor…" },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={door === d.id}
              onClick={() => setDoor(d.id)}
              className={`px-4 py-3 text-left transition ${door === d.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"} ${d.id === "code" ? "border-l border-foreground" : ""}`}
            >
              {d.label}
              <span className={`block text-xs font-normal ${door === d.id ? "opacity-75" : ""}`}>{d.hint}</span>
            </button>
          ))}
        </div>
        {door === "builder" ? (
          <div className="space-y-4 p-5">
            <p className="text-sm text-muted-foreground">
              One prompt with the {brand} template, its colours and fonts, and everything you answered. Paste it as the first message in a
              new project.
            </p>
            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-3 font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
            >
              {copied === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : copied === "done" ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied === "done"
                ? "Copied. Paste it into your builder."
                : copied === "error"
                  ? "Couldn't copy. Try again."
                  : "Copy the build prompt"}
            </button>
            <p className="text-sm">
              <Link href="/get-started#step-3" className="font-semibold hover:highlight">
                Where to paste it, step by step →
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            <p className="text-sm text-muted-foreground">
              Save the plan in your project folder, then ask your editor to build it with the CopyPasteUI MCP.
            </p>
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-[0_3px_0_var(--accent)] transition active:translate-y-0.5 active:shadow-none"
            >
              <Download className="size-4" /> Download {PLAN_FILE}
            </button>
            <CopyText text="Use the copypasteui MCP: call get_plan for this project and build the website it describes." />
            <p className="text-sm">
              <Link href="/developers#mcp" className="font-semibold hover:highlight">
                Set up the MCP →
              </Link>
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="size-4" /> Start a new plan
      </button>
    </div>
  );
}
