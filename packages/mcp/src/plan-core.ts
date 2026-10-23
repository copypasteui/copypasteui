// A small-business website plan: questions asked in short rounds, answers saved to
// copypasteui.config.json so any later chat (or the build prompt) can pick up where it left off.
// Pure (no Node APIs): the MCP and the website's plan page share it.
// ".ts" so the website (Next.js) can import this file directly; tsc rewrites it to ".js".
import { rankTemplates } from "./match.ts";

/** Just the registry fields planning needs, so the website can pass a slim list. */
export type PlanTemplate = {
  slug: string;
  name: string;
  description: string;
  brief?: string | undefined;
  theme: string;
  sections: string[];
};
export type PlanIndex = { templates: PlanTemplate[]; components: { slug: string; category: string }[] };
export type PlanRecipe = { slug: string; name: string; covers: string };

export const PLAN_FILE = "copypasteui.config.json";

export type Option = { value: string; label: string };
export type Field =
  | { key: keyof Answers; kind: "text"; title: string; hint?: string; format?: "email" | "uri" }
  | { key: keyof Answers; kind: "one"; title: string; hint?: string; options: Option[] }
  | { key: keyof Answers; kind: "many"; title: string; hint?: string; options: Option[]; preselect?: string[] };
export type Round = { id: string; title: string; intro: string; fields: Field[] };

/** Every answer is optional; anything missing gets a sensible default for the trade. */
export type Answers = Partial<{
  name: string;
  trade: string;
  area: string;
  phone: string;
  email: string;
  primaryAction: string;
  bookingTool: string;
  template: string;
  theme: string;
  tone: string;
  photos: string;
  pages: string[];
  forms: string;
  newsletter: string;
  backOffice: string;
  analytics: string;
  hosting: string;
  domain: string;
}>;

export type Plan = {
  copypasteui: 1;
  business: { name: string; trade: string; area: string; phone: string; email: string };
  goal: { primaryAction: string; bookingTool: string };
  look: { template: string; theme: string; tone: string; photos: string };
  pages: string[];
  extras: { forms: string; newsletter: string; backOffice: string; analytics: string };
  hosting: { platform: string; domain: string };
  /** What the owner actually said; everything else above is a default and gets asked on the next run. */
  answers: Answers;
  updatedAt: string;
};

export const ACTIONS: Option[] = [
  { value: "book", label: "Book a table or appointment" },
  { value: "call", label: "Phone us" },
  { value: "order", label: "Order online or click and collect" },
  { value: "enquire", label: "Send an enquiry or ask for a quote" },
  { value: "visit", label: "Come and visit" },
  { value: "buy", label: "Buy products online" },
  { value: "donate", label: "Donate or volunteer" },
];
export const BOOKING: Option[] = [
  { value: "none", label: "We don't take bookings online" },
  { value: "cal", label: "Cal.com" },
  { value: "calendly", label: "Calendly" },
  { value: "opentable", label: "OpenTable or ResDiary" },
  { value: "fresha", label: "Fresha" },
  { value: "other", label: "Another booking service" },
  { value: "own", label: "Our own booking system (needs a back office)" },
];
export const TONES: Option[] = [
  { value: "friendly", label: "Friendly and warm" },
  { value: "professional", label: "Professional and reassuring" },
  { value: "playful", label: "Playful" },
  { value: "premium", label: "Premium and calm" },
];
export const PAGES: Option[] = [
  { value: "about", label: "About us" },
  { value: "offering", label: "Menu, services or shop" },
  { value: "gallery", label: "Gallery" },
  { value: "team", label: "Team" },
  { value: "reviews", label: "Reviews" },
  { value: "faq", label: "Questions and answers" },
  { value: "blog", label: "News or blog" },
  { value: "contact", label: "Contact and opening hours" },
  { value: "privacy", label: "Privacy and terms" },
];
export const FORMS: Option[] = [
  { value: "builder", label: "Whatever our AI builder provides" },
  { value: "formspree", label: "Formspree" },
  { value: "web3forms", label: "Web3Forms" },
  { value: "none", label: "No form, just phone and email" },
];
export const NEWSLETTER: Option[] = [
  { value: "none", label: "No newsletter" },
  { value: "buttondown", label: "Buttondown" },
  { value: "mailchimp", label: "Mailchimp" },
];
export const ANALYTICS: Option[] = [
  { value: "none", label: "No visitor stats" },
  { value: "cloudflare", label: "Cloudflare Web Analytics (free, no cookies)" },
  { value: "plausible", label: "Plausible (paid, no cookies)" },
];
export const HOSTING: Option[] = [
  { value: "builder", label: "Our AI builder publishes it" },
  { value: "vercel", label: "Vercel" },
  { value: "netlify", label: "Netlify" },
  { value: "cloudflare", label: "Cloudflare Pages" },
  { value: "github-pages", label: "GitHub Pages" },
  { value: "unsure", label: "Not sure yet" },
];

/** The rounds, with template and back-office options filled in from the registry and the trade. */
export function rounds(index: PlanIndex, recipes: PlanRecipe[], trade?: string, quick = false): Round[] {
  const fits = trade ? rankTemplates(index.templates, trade).slice(0, 4) : [];
  const templateOptions: Option[] = fits.map((t) => ({ value: t.slug, label: `${t.name}${t.brief ? ` — fits ${t.brief}` : ""}` }));
  const all: Round[] = [
    {
      id: "basics",
      title: "Your business",
      intro: "These go on the site exactly as you type them.",
      fields: [
        { key: "name", kind: "text", title: "Business name" },
        { key: "trade", kind: "text", title: "What the business does", hint: 'For example "family bakery" or "MOT garage"' },
        { key: "area", kind: "text", title: "Town or area" },
        { key: "phone", kind: "text", title: "Phone number" },
        { key: "email", kind: "text", title: "Email", format: "email" },
      ],
    },
    {
      id: "goal",
      title: "What customers should do",
      intro: "This becomes the main button on every page.",
      fields: [
        { key: "primaryAction", kind: "one", title: "When someone finds your site, what should they do?", options: ACTIONS },
        { key: "bookingTool", kind: "one", title: "How you take bookings today", options: BOOKING },
      ],
    },
    {
      id: "look",
      title: "How it looks",
      intro: "Each template has its own colours and fonts. You can swap them later.",
      fields: [
        ...(templateOptions.length
          ? [
              {
                key: "template" as const,
                kind: "one" as const,
                title: "Template",
                hint: "The closest matches for your trade",
                options: templateOptions,
              },
            ]
          : []),
        { key: "tone", kind: "one", title: "How the words should sound", options: TONES },
        {
          key: "photos",
          kind: "one",
          title: "Photos",
          options: [
            { value: "own", label: "We have our own photos" },
            { value: "stock", label: "Use the template's photos for now" },
          ],
        },
      ],
    },
    {
      id: "pages",
      title: "Pages",
      intro: "The home page is always included. About, services, contact and privacy suit most businesses.",
      fields: [{ key: "pages", kind: "many", title: "Pages", options: PAGES, preselect: ["about", "offering", "contact", "privacy"] }],
    },
    {
      id: "extras",
      title: "Extras",
      intro: "Skip any you don't need.",
      fields: [
        { key: "forms", kind: "one", title: "Where contact form messages go", options: FORMS },
        { key: "newsletter", kind: "one", title: "Newsletter", options: NEWSLETTER },
        {
          key: "backOffice",
          kind: "one",
          title: "A back office to edit the menu and see bookings yourself",
          options: [
            { value: "none", label: "Not now" },
            ...recipes.filter((r) => r.covers === "full").map((r) => ({ value: r.slug, label: r.name })),
          ],
        },
        { key: "analytics", kind: "one", title: "Visitor stats", options: ANALYTICS },
      ],
    },
    {
      id: "hosting",
      title: "Where it will live",
      intro: "Lovable, Bolt and v0 can host it for you, so pick that if you're using one.",
      fields: [
        { key: "hosting", kind: "one", title: "Where the site will live", options: HOSTING },
        {
          key: "domain",
          kind: "text",
          title: "Your domain, if you have one",
          hint: "For example harbourkitchen.co.uk. Leave it empty if you don't have one yet.",
        },
      ],
    },
  ];
  if (!quick) return all;
  // Quick mode: the details we can't guess, the main action and where it lives; the rest from the trade.
  const pick = (id: string, keys: (keyof Answers)[]) => {
    const r = all.find((x) => x.id === id)!;
    return { ...r, fields: r.fields.filter((f) => keys.includes(f.key)) };
  };
  return [pick("basics", ["name", "trade", "area", "phone", "email"]), pick("goal", ["primaryAction"]), pick("hosting", ["hosting"])];
}

/** Rounds as plain text, for editors that can't show forms: the AI asks them in chat. */
export function roundsAsText(list: Round[]) {
  return list
    .map((r, i) => {
      const lines = r.fields.map((f) => {
        const opts = f.kind === "text" ? "" : `\n${f.options.map((o) => `     - ${o.label} (\`${o.value}\`)`).join("\n")}`;
        return `   - **${f.title}**${f.hint ? ` — ${f.hint}` : ""} → \`${f.key}\`${f.kind === "many" ? " (pick any)" : ""}${opts}`;
      });
      return `${i + 1}. **${r.title}.** ${r.intro}\n${lines.join("\n")}`;
    })
    .join("\n\n");
}

/** JSON schema for one round, in the shape MCP form requests (elicitation) accept. */
export function roundSchema(r: Round) {
  const properties: Record<string, unknown> = {};
  for (const f of r.fields) {
    if (f.kind === "text")
      properties[f.key] = {
        type: "string",
        title: f.title,
        ...(f.hint ? { description: f.hint } : {}),
        ...(f.format ? { format: f.format } : {}),
      };
    else if (f.kind === "one")
      properties[f.key] = {
        type: "string",
        title: f.title,
        ...(f.hint ? { description: f.hint } : {}),
        oneOf: f.options.map((o) => ({ const: o.value, title: o.label })),
      };
    else
      properties[f.key] = {
        type: "array",
        title: f.title,
        items: { anyOf: f.options.map((o) => ({ const: o.value, title: o.label })) },
        ...(f.preselect ? { default: f.preselect } : {}),
      };
  }
  const required = r.id === "basics" ? ["name", "trade"].filter((k) => k in properties) : [];
  return { type: "object" as const, properties, required };
}

/** Fills every gap with a default that suits the trade, so a half-answered plan is still buildable. */
export function makePlan(index: PlanIndex, a: Answers): Plan {
  const template =
    (a.template && index.templates.find((t) => t.slug === a.template)) ||
    (a.trade ? rankTemplates(index.templates, a.trade)[0] : undefined) ||
    index.templates[0];
  if (!template) throw new Error("The registry has no templates to plan with.");
  // The template's own sections hint at what visitors of this trade usually do.
  const cats = template.sections.map((s) => index.components.find((c) => c.slug === s)?.category ?? "");
  const defaultAction =
    template.sections.some((s) => /book/.test(s)) || cats.includes("menu") ? "book" : cats.includes("products") ? "buy" : "enquire";
  return {
    copypasteui: 1,
    business: {
      name: a.name ?? "",
      trade: a.trade ?? template.brief ?? "",
      area: a.area ?? "",
      phone: a.phone ?? "",
      email: a.email ?? "",
    },
    goal: { primaryAction: a.primaryAction ?? defaultAction, bookingTool: a.bookingTool ?? "none" },
    look: { template: template.slug, theme: a.theme ?? template.theme, tone: a.tone ?? "friendly", photos: a.photos ?? "stock" },
    pages: a.pages?.length ? a.pages : ["about", "offering", "contact", "privacy"],
    extras: {
      forms: a.forms ?? "builder",
      newsletter: a.newsletter ?? "none",
      backOffice: a.backOffice ?? "none",
      analytics: a.analytics ?? "none",
    },
    hosting: { platform: a.hosting ?? "unsure", domain: a.domain ?? "" },
    answers: a,
    updatedAt: new Date().toISOString(),
  };
}

export const label = (options: Option[], value: string) => options.find((o) => o.value === value)?.label ?? value;

/** The build steps that follow from a plan, in order, naming the tools to call. */
export function nextSteps(p: Plan) {
  const known = Object.fromEntries(
    Object.entries({ name: p.business.name, phone: p.business.phone, email: p.business.email }).filter(([, v]) => v),
  );
  const missing = ["name", "phone", "email"].filter((k) => !(k in known));
  const steps = [
    `Build the home page from the "${p.look.template}" template: get_template with slug "${p.look.template}" and theme "${p.look.theme}". Rewrite the copy for ${p.business.name || "the business"}${p.business.area ? ` in ${p.business.area}` : ""} in a ${label(TONES, p.look.tone).toLowerCase()} voice, steering every page towards one main action: ${label(ACTIONS, p.goal.primaryAction).toLowerCase()}.`,
    `Put the real details in everywhere: ${missing.length ? `ask the owner for their ${missing.join(" and ")}, then ` : ""}fill_business_details with ${JSON.stringify(known)}${missing.length ? " plus those" : ""} (preview, then apply: true).`,
  ];
  const extraPages = p.pages.filter((x) => !["privacy", "contact"].includes(x));
  if (extraPages.length)
    steps.push(`Add these pages, reusing sections from the template (search_components for anything missing): ${extraPages.join(", ")}.`);
  steps.push(
    `Add the utility pages: legal-page${p.pages.includes("privacy") ? "" : " (recommended even if not asked for)"}, not-found-page as the 404${p.extras.forms !== "none" ? ", thank-you-page after the contact form" : ""}.`,
  );
  if (p.extras.forms !== "none")
    steps.push(
      `Connect the contact form to ${p.extras.forms === "builder" ? "the AI builder's own form handling" : label(FORMS, p.extras.forms)}.`,
    );
  if (!["none", "own"].includes(p.goal.bookingTool))
    steps.push(`Connect bookings to ${label(BOOKING, p.goal.bookingTool)} with its embed or booking link (no API keys in the front end).`);
  if (p.goal.bookingTool === "own" && p.extras.backOffice === "none")
    steps.push("Own bookings need somewhere to store them: suggest a back office (list_recipes) before building the booking form.");
  if (p.extras.newsletter !== "none") steps.push(`Add a newsletter signup connected to ${label(NEWSLETTER, p.extras.newsletter)}.`);
  if (p.extras.backOffice !== "none")
    steps.push(
      `Add the back office: get_recipe with slug "${p.extras.backOffice}" and follow it, using the admin screens (search_components with category "admin").`,
    );
  if (p.extras.analytics !== "none")
    steps.push(
      `Add ${p.extras.analytics === "cloudflare" ? "Cloudflare Web Analytics" : "Plausible"} (cookie-free, so no consent banner is needed for it).`,
    );
  if (p.look.photos === "stock")
    steps.push(
      "Keep the template's photos for now and list the ones the owner should replace with their own. Before going live, replace or remove the photos of people in reviews and team sections: they are stock models, not real customers or staff.",
    );
  steps.push(
    `Prepare to go live on ${p.hosting.platform === "unsure" ? "a host to be chosen (suggest the simplest for this project)" : label(HOSTING, p.hosting.platform).replace(/^Our AI builder publishes it$/, "the AI builder's own publishing")}${p.hosting.domain ? ` at ${p.hosting.domain}` : ""}: run the checks in the prepare-for-launch request.`,
  );
  return steps;
}

/** What the owner already answered in a saved plan, so a second run only asks what's still missing. */
export function planAnswers(p: Plan): Answers {
  return p.answers ?? {};
}

/** The same rounds with already-answered questions left out, and empty rounds dropped. */
export function stillToAsk(list: Round[], a: Answers): Round[] {
  const answered = (k: keyof Answers) => {
    const v = a[k];
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "";
  };
  return list.map((r) => ({ ...r, fields: r.fields.filter((f) => !answered(f.key)) })).filter((r) => r.fields.length);
}

/** Drops empty strings and lists, which forms send for questions left blank. */
export function cleanAnswers(raw: Record<string, unknown>): Answers {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string" && v.trim()) out[k] = v.trim();
    else if (Array.isArray(v) && v.length) out[k] = v.map(String);
  }
  return out as Answers;
}

/**
 * The plan in plain words for an AI builder without the MCP (Lovable, Bolt, v0, ChatGPT…).
 * Added after the template prompt, the same way the "Make it yours" note is.
 */
export function planBrief(p: Plan, site = "https://copypasteui.dev", recipes: PlanRecipe[] = []) {
  const b = p.business;
  const who = `${b.name || "this business"}${b.trade ? `, ${/^(a|an|the)\s/i.test(b.trade) ? "" : "a "}${b.trade}` : ""}${b.area ? ` in ${b.area}` : ""}`;
  const contact = [b.phone && `phone ${b.phone}`, b.email && `email ${b.email}`].filter(Boolean).join(", ");
  const pageNames = p.pages.filter((x) => x !== "privacy").map((x) => label(PAGES, x).toLowerCase());
  const lines = [
    `This website is for ${who}.${contact ? ` Contact: ${contact}.` : ""} Put these details wherever the sample brand name, phone number, email or address appear.`,
    `Rewrite every heading, paragraph, button label, review, price and opening time for this business in a ${label(TONES, p.look.tone).toLowerCase()} voice. Keep the layout, spacing, motion, colours and fonts exactly as designed.`,
    `The one thing visitors should do: ${label(ACTIONS, p.goal.primaryAction).toLowerCase()}. Make the main button in the first screen, the navigation and the footer lead there.`,
  ];
  if (pageNames.length)
    lines.push(
      `Besides the home page, add these pages in the same style, reusing the sections above: ${pageNames.join(", ")}. Link them from the navigation and the footer.`,
    );
  lines.push(
    `Also add a privacy and terms page${p.pages.includes("privacy") ? "" : " (every business site needs one)"}, a friendly "page not found" page${p.extras.forms !== "none" ? ", and a thank-you page shown after the contact form is sent" : ""}. Ready-made designs: ${site}/components/pages`,
  );
  if (p.extras.forms !== "none")
    lines.push(
      `Contact form: send messages ${p.extras.forms === "builder" ? "using your own form handling" : `with ${label(FORMS, p.extras.forms)} (it emails the owner; no server needed)`}.`,
    );
  else lines.push("No contact form: show the phone number and email as tap-to-call and tap-to-email links instead.");
  if (p.goal.bookingTool === "own")
    lines.push(
      `Bookings: the owner wants their own booking system. Store bookings in a database with a sign-in protected back office — follow the back-office setup prompt at ${site}/components/admin#backend before building the booking form.`,
    );
  else if (p.goal.bookingTool !== "none")
    lines.push(
      `Bookings: link every booking button to ${label(BOOKING, p.goal.bookingTool)} (their booking page or embed). Leave a clear note where the owner's booking link goes; never put API keys in the page.`,
    );
  if (p.extras.newsletter !== "none")
    lines.push(`Add a short newsletter signup that sends people to ${label(NEWSLETTER, p.extras.newsletter)}.`);
  if (p.extras.backOffice !== "none")
    lines.push(
      `The owner wants a back office later, on ${recipes.find((r) => r.slug === p.extras.backOffice)?.name ?? p.extras.backOffice}. Keep menus, prices and opening hours in one data file so they can be moved to a database without redesigning the pages. Setup prompt: ${site}/components/admin#backend`,
    );
  if (p.extras.analytics !== "none")
    lines.push(
      `Add ${label(ANALYTICS, p.extras.analytics).replace(/ \(.*\)$/, "")} for visitor stats. It sets no cookies, so no cookie banner is needed for it.`,
    );
  lines.push(
    p.look.photos === "own"
      ? "The owner has their own photos: keep the image slots, use clear alt text, and list each photo they should upload with its size."
      : "Keep the sample photos for now and list the ones the owner should replace with their own. Before going live, replace or remove the photos of people in reviews and team sections: they are stock models, and showing them as real customers or staff would mislead visitors.",
  );
  lines.push(
    'The footer ends with a small "Built with CopyPasteUI" link. It is optional and not part of the licence: keep it unless the owner would rather not credit CopyPasteUI, and change or remove it if they ask.',
  );
  const host =
    p.hosting.platform === "unsure"
      ? ""
      : p.hosting.platform === "builder"
        ? "the builder's own publishing"
        : label(HOSTING, p.hosting.platform);
  lines.push(
    `Going live${host ? ` on ${host}` : ""}${p.hosting.domain ? ` at ${p.hosting.domain}` : ""}: set the page title, a one-line description and a share image, check every page at phone width, and make sure no sample details are left.`,
  );
  return `\n\n## The plan for this website\n${lines.map((l) => `- ${l}`).join("\n")}\n`;
}
