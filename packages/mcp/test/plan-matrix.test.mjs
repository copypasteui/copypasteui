// Golden tests for website planning, chosen pairwise: every pair of answers (trade × booking tool, form
// service × hosting, back office × newsletter, …) is planned at least once through the real plan_website and
// get_plan tools, and the plan, its build steps and the brief for AI builders are checked for the promises
// each answer makes. The full product is millions of plans; pairwise needs under a hundred
// (scripts/pairwise.mjs, fixed seed, so a failure reproduces exactly).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { pairwise } from "../../../scripts/pairwise.mjs";
import { ACTIONS, ANALYTICS, BOOKING, FORMS, HOSTING, NEWSLETTER, PAGES, TONES, label, planBrief } from "../dist/plan-core.js";
import { Registry } from "../dist/registry.js";
import { createServer } from "../dist/server.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_REGISTRY = path.resolve(here, "../../../apps/web/public/r");
const index = JSON.parse(fs.readFileSync(path.join(LOCAL_REGISTRY, "index.json"), "utf8"));
const recipes = JSON.parse(fs.readFileSync(path.join(LOCAL_REGISTRY, "recipes/index.json"), "utf8"));
const values = (options) => options.map((o) => o.value);

// What owners type for their trade, across every industry group, plus one we have no template for and a blank.
const TRADES = {
  "family bakery": /bakery|larder-lane|crumb/,
  "dental practice": /dental/,
  "emergency plumber": /fixwell|trades/,
  "boutique hotel": /hotel|solenne|canopy|poggio/,
  "yoga studio": /yoga|sola/,
  "independent record shop": /wax-cellar/,
  "hearing clinic": /hush-hearing/,
  "craft brewery": /brewery|foxglove|lockfast/,
  "animal charity": /charity|mossbrook|common-ground/,
  "tattoo parlour": /./,
  "": /./,
};
const PAGE_SETS = {
  default: undefined,
  minimal: ["contact"],
  everything: values(PAGES),
  "no privacy": ["about", "offering", "contact"],
};
const DETAILS = {
  full: { name: "Harbour Kitchen", area: "Falmouth", phone: "01326 555 014", email: "hello@harbourkitchen.example" },
  "name only": { name: "Harbour Kitchen" },
  none: {},
};

const PARAMS = [
  { name: "trade", values: Object.keys(TRADES) },
  { name: "details", values: Object.keys(DETAILS) },
  { name: "primaryAction", values: values(ACTIONS) },
  { name: "bookingTool", values: values(BOOKING) },
  { name: "tone", values: values(TONES) },
  { name: "photos", values: ["own", "stock"] },
  { name: "pages", values: Object.keys(PAGE_SETS) },
  { name: "forms", values: values(FORMS) },
  { name: "newsletter", values: values(NEWSLETTER) },
  { name: "backOffice", values: ["none", ...recipes.filter((r) => r.covers === "full").map((r) => r.slug)] },
  { name: "analytics", values: values(ANALYTICS) },
  { name: "hosting", values: values(HOSTING) },
  { name: "domain", values: ["", "harbourkitchen.co.uk"] },
];
const CASES = pairwise(PARAMS, { seed: 11 });

async function connect() {
  const [a, b] = InMemoryTransport.createLinkedPair();
  await createServer(new Registry(LOCAL_REGISTRY, fs.mkdtempSync(path.join(os.tmpdir(), "cpui-cache-")))).connect(a);
  const client = new Client({ name: "plan-matrix", version: "0" });
  await client.connect(b);
  return client;
}
const call = async (client, name, args) => {
  const r = await client.callTool({ name, arguments: args });
  return { text: r.content.map((c) => c.text).join("\n"), isError: Boolean(r.isError) };
};

const answersFor = (c) => {
  const a = { ...DETAILS[c.details], tone: c.tone, photos: c.photos, forms: c.forms, newsletter: c.newsletter };
  Object.assign(a, { primaryAction: c.primaryAction, bookingTool: c.bookingTool, backOffice: c.backOffice, analytics: c.analytics });
  Object.assign(a, { hosting: c.hosting });
  if (c.trade) a.trade = c.trade;
  if (c.domain) a.domain = c.domain;
  if (PAGE_SETS[c.pages]) a.pages = PAGE_SETS[c.pages];
  return a;
};

const describe = (c) =>
  Object.entries(c)
    .map(([k, v]) => `${k}=${v || "∅"}`)
    .join(" ");

test(`pairwise covers the planner in ${CASES.length} plans instead of millions`, () => {
  const full = PARAMS.reduce((n, p) => n * p.values.length, 1);
  assert.ok(full > 1e8, `${full} combinations`);
  assert.ok(CASES.length < 120, `${CASES.length} cases`);
});

test("every pairwise plan keeps every promise its answers make", async () => {
  const client = await connect();
  const problems = [];
  for (const c of CASES) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-plan-"));
    const fail = (msg) => problems.push(`${msg}\n    ${describe(c)}`);
    const saved = await call(client, "plan_website", { projectDir: dir, answers: answersFor(c) });
    if (saved.isError) {
      fail(`plan_website failed: ${saved.text}`);
      continue;
    }
    const got = await call(client, "get_plan", { projectDir: dir });
    const plan = JSON.parse(got.text.slice(0, got.text.indexOf("\n\nNext steps:")));
    const steps = got.text.slice(got.text.indexOf("Next steps:"));
    const brief = planBrief(plan, "https://copypasteui.dev", recipes);
    const both = (needle, why) => {
      if (!steps.includes(needle)) fail(`build steps don't mention ${why} ("${needle}")`);
      if (!brief.includes(needle)) fail(`AI-builder brief doesn't mention ${why} ("${needle}")`);
    };

    // The plan itself: a real template and theme, and the answers kept as given.
    const template = index.templates.find((t) => t.slug === plan.look.template);
    if (!template) fail(`unknown template ${plan.look.template}`);
    if (!index.themes.some((t) => t.slug === plan.look.theme)) fail(`unknown theme ${plan.look.theme}`);
    if (!TRADES[c.trade].test(plan.look.template)) fail(`"${c.trade}" planned on ${plan.look.template}`);
    for (const [k, v] of Object.entries(answersFor(c)))
      if (JSON.stringify(plan.answers[k]) !== JSON.stringify(v)) fail(`answer ${k} not kept`);

    // Nothing half-rendered, nothing said twice.
    for (const [what, text] of [
      ["steps", steps],
      ["brief", brief],
    ])
      if (/\bundefined\b|\bnull\b|\[object |NaN/.test(text)) fail(`${what} contain an unfilled value`);
    const stepLines = steps.split("\n").slice(1);
    if (new Set(stepLines).size !== stepLines.length) fail("a build step is repeated");
    if (!steps.includes(`get_template with slug "${plan.look.template}"`)) fail("steps don't start from the planned template");

    // Each answer shows up where it should.
    if (!brief.includes(label(ACTIONS, c.primaryAction).toLowerCase())) fail("brief doesn't name the main action");
    if (!steps.includes(label(ACTIONS, c.primaryAction).toLowerCase())) fail("steps don't name the main action");
    if (c.forms === "none") {
      if (!brief.includes("tap-to-call")) fail("no form, but the brief doesn't fall back to tap-to-call");
      if (steps.includes("Connect the contact form")) fail("no form, but the steps connect one");
    } else if (c.forms !== "builder") both(label(FORMS, c.forms), "the form service");
    if (!["none", "own"].includes(c.bookingTool)) both(label(BOOKING, c.bookingTool), "the booking tool");
    if (c.bookingTool === "own") {
      if (!brief.includes("own booking system")) fail("own bookings, but the brief doesn't say where they're stored");
      if (c.backOffice === "none" && !steps.includes("suggest a back office"))
        fail("own bookings with no back office, but nothing suggests one");
    }
    if (c.newsletter !== "none") both(label(NEWSLETTER, c.newsletter), "the newsletter");
    if (c.backOffice !== "none") {
      if (!steps.includes(`get_recipe with slug "${c.backOffice}"`)) fail("steps don't fetch the back-office recipe");
      const name = recipes.find((r) => r.slug === c.backOffice).name;
      if (!brief.includes(name)) fail(`brief doesn't name the back office (${name})`);
    }
    if (c.analytics !== "none") both(c.analytics === "cloudflare" ? "Cloudflare Web Analytics" : "Plausible", "the analytics");
    if (c.domain) both(c.domain, "the domain");
    if (!["unsure", "builder"].includes(c.hosting)) both(label(HOSTING, c.hosting), "the host");
    const d = DETAILS[c.details];
    if (d.name && !brief.includes(d.name)) fail("brief doesn't use the business name");
    if (!d.phone && !steps.includes("ask the owner for their")) fail("phone missing, but the steps don't ask for it");
    for (const p of plan.pages.filter((x) => x !== "privacy"))
      if (!brief.includes(label(PAGES, p).toLowerCase())) fail(`brief leaves out the ${p} page`);
    if (!brief.includes("privacy and terms page")) fail("brief leaves out the privacy page");

    // A second run asks only what's still unanswered (this client can't show forms, so it gets questions).
    const again = await call(client, "plan_website", { projectDir: dir });
    for (const k of Object.keys(answersFor(c))) if (again.text.includes(`→ \`${k}\``)) fail(`second run asks for ${k} again`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
  assert.equal(problems.length, 0, `${problems.length} problem(s) in ${CASES.length} plans:\n- ${problems.slice(0, 15).join("\n- ")}`);
});
