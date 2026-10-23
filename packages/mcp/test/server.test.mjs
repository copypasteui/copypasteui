import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { createServer } from "../dist/server.js";
import { Registry } from "../dist/registry.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_REGISTRY = path.resolve(here, "../../../apps/web/public/r");
const tmpCache = () => fs.mkdtempSync(path.join(os.tmpdir(), "cpui-cache-"));

async function connect(registry) {
  const [a, b] = InMemoryTransport.createLinkedPair();
  await createServer(registry).connect(a);
  const client = new Client({ name: "test", version: "0" });
  await client.connect(b);
  return client;
}
const call = async (client, name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  return { text: r.content.map((c) => c.text).join("\n"), isError: Boolean(r.isError) };
};

test("exposes the expected tools", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((t) => t.name).sort(), [
    "add_component",
    "fill_business_details",
    "get_component",
    "get_plan",
    "get_recipe",
    "get_template",
    "get_theme",
    "list_categories",
    "list_recipes",
    "list_templates",
    "list_themes",
    "plan_website",
    "search_components",
    "suggest_sections",
  ]);
});

test("search ranks the obvious match first", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { text } = await call(client, "search_components", { query: "pricing toggle" });
  assert.equal(JSON.parse(text)[0].slug, "toggle-tier-pricing");
  assert.match(JSON.parse(text)[0].image, /\/thumbs\/components\/toggle-tier-pricing\.jpg$/);
  const menu = JSON.parse((await call(client, "search_components", { query: "restaurant menu" })).text);
  assert.equal(menu[0].slug, "restaurant-menu");
  const byCategory = JSON.parse((await call(client, "search_components", { category: "hero" })).text);
  assert.ok(byCategory.length >= 2 && byCategory.every((c) => c.category === "hero"));
});

test("get_component returns code, dependencies and the chosen theme", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { text, isError } = await call(client, "get_component", { slug: "spotlight-cta", theme: "sunset" });
  assert.equal(isError, false);
  assert.match(text, /export default function SpotlightCta/);
  assert.match(text, /npm install lucide-react motion/);
  assert.match(text, /## Theme: Sunset/);
  const sunset = JSON.parse(fs.readFileSync(path.join(LOCAL_REGISTRY, "themes", "sunset.json"), "utf8"));
  assert.ok(text.includes(`--primary: ${sunset.light.primary};`));
  assert.doesNotMatch(text, /\{\{THEME\}\}/);

  const code = await call(client, "get_component", { slug: "spotlight-cta", format: "code" });
  // The licence notice travels with the file (PolyForm Shield's Required Notice), then the component as written.
  const lines = code.text.split("\n");
  assert.match(lines[0], /^\/\/ .*PolyForm Shield 1\.0\.0/);
  assert.match(lines[1], /^\/\/ Required Notice: Copyright/);
  assert.equal(lines[2], '"use client";');
});

test("collection components default to their brand theme and explain the photos", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { text } = await call(client, "get_component", { slug: "solenne-hero" });
  assert.match(text, /## Theme: Solenne/);
  assert.match(text, /Instrument\+Serif/);
  assert.match(text, /Unsplash License/);
  const overridden = await call(client, "get_component", { slug: "solenne-hero", theme: "midnight" });
  assert.match(overridden.text, /## Theme: Midnight/);
  const tpl = await call(client, "get_template", { slug: "pulse-gym" });
  assert.match(tpl.text, /PulseHero\.tsx/);
  assert.match(tpl.text, /## Theme: Pulse/);
});

test("unknown slugs are tool errors, not crashes", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  assert.equal((await call(client, "get_component", { slug: "nope" })).isError, true);
  assert.equal((await call(client, "get_component", { slug: "spotlight-cta", theme: "nope" })).isError, true);
  assert.equal((await call(client, "get_theme", { slug: "nope" })).isError, true);
});

test("get_template includes every section in order with its theme", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { text } = await call(client, "get_template", { slug: "olea-restaurant" });
  const hero = text.indexOf("OleaHero.tsx");
  const footer = text.indexOf("OleaFooter.tsx");
  assert.ok(hero > 0 && footer > hero);
  assert.match(text, /## Theme: Olea/);
});

test("add_component writes files and refuses to overwrite", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const project = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-project-"));
  const first = await call(client, "add_component", { slug: "count-up-stats", projectDir: project, theme: "forest" });
  assert.equal(first.isError, false, first.text);
  const file = path.join(project, "components/copypasteui/CountUpStats.tsx");
  assert.ok(fs.readFileSync(file, "utf8").includes("export default function CountUpStats"));
  assert.ok(fs.readFileSync(path.join(project, "components/copypasteui/theme-forest.css"), "utf8").includes("@theme inline"));

  fs.writeFileSync(file, "// user edits");
  const second = await call(client, "add_component", { slug: "count-up-stats", projectDir: project });
  assert.match(second.text, /Skipped/);
  assert.equal(fs.readFileSync(file, "utf8"), "// user edits");

  const escape = await call(client, "add_component", { slug: "count-up-stats", projectDir: project, dir: "../outside" });
  assert.equal(escape.isError, true);
  assert.equal((await call(client, "add_component", { slug: "count-up-stats", projectDir: "relative/path" })).isError, true);
});

test("falls back to the bundled snapshot when the registry is unreachable", async () => {
  const registry = new Registry("http://127.0.0.1:9/r", tmpCache());
  const client = await connect(registry);
  const { text } = await call(client, "get_component", { slug: "orbit-glow-hero" });
  assert.match(text, /export default function OrbitGlowHero/);
  assert.equal(registry.origin, "snapshot");
});

test("works over stdio exactly as an editor launches it", async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.resolve(here, "../dist/cli.js"), "mcp"],
    env: { ...process.env, COPYPASTEUI_REGISTRY: LOCAL_REGISTRY },
  });
  const client = new Client({ name: "stdio-test", version: "0" });
  await client.connect(transport);
  try {
    const { tools } = await client.listTools();
    assert.equal(tools.length, 14);
    const { text } = await call(client, "list_themes");
    const themes = JSON.parse(text);
    const expected = JSON.parse(fs.readFileSync(path.join(LOCAL_REGISTRY, "index.json"), "utf8")).themes.map((t) => t.slug);
    assert.deepEqual(themes.map((t) => t.slug).sort(), [...expected].sort());
    assert.ok(themes.every((t) => /^https:\/\/\S+\.(jpe?g|png|webp)$/.test(t.image)));
  } finally {
    await client.close();
  }
});

test("search results and themes report a licence", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const results = JSON.parse((await call(client, "search_components", { query: "pricing" })).text);
  assert.ok(results.length > 0 && results.every((r) => typeof r.license === "string"));
  const themes = JSON.parse((await call(client, "list_themes", {})).text);
  assert.ok(themes.every((t) => ["PolyForm-Shield-1.0.0", "MIT", "Apache-2.0", "CC0-1.0"].includes(t.license)));
});

test("suggest_sections picks the template for the trade and explains each section", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const pick = async (business) => JSON.parse((await call(client, "suggest_sections", { business })).text);
  assert.equal((await pick("dog groomer in Leeds")).template.slug, "mossbrook-vets");
  assert.equal((await pick("MOT garage")).template.slug, "gearwright-garage");
  assert.equal((await pick("wedding photographer")).template.slug, "juniper-photography");
  const plumber = await pick("family-run plumber");
  assert.equal(plumber.template.slug, "fixwell-trades");
  assert.equal(plumber.sections[0].category, "hero");
  assert.ok(plumber.sections.every((s) => s.role && Array.isArray(s.alternatives)));
  assert.ok(plumber.pages.some((p) => p.page === "Contact"));
  const none = await call(client, "suggest_sections", { business: "quantum computing" });
  assert.equal(none.isError, false);
  assert.match(none.text, /No template matches/);
});

test("fill_business_details previews, applies and leaves placeholders alone", async () => {
  const registry = new Registry(LOCAL_REGISTRY, tmpCache());
  const client = await connect(registry);
  const project = fs.mkdtempSync(path.join(os.tmpdir(), "cpui-biz-"));
  for (const slug of ["fixwell-hero", "fixwell-footer", "newsletter-cta"])
    await call(client, "add_component", { slug, projectDir: project });
  const hero = path.join(project, "components/copypasteui/FixwellHero.tsx");
  const before = fs.readFileSync(hero, "utf8");
  const details = { name: "Dyson & Sons", phone: "0113 496 0123", email: "jobs@dyson.example" };

  const preview = await call(client, "fill_business_details", { projectDir: project, details });
  assert.equal(preview.isError, false, preview.text);
  assert.match(preview.text, /Preview: \d+ value/);
  assert.equal(fs.readFileSync(hero, "utf8"), before);

  const applied = await call(client, "fill_business_details", {
    projectDir: project,
    details,
    replace: { Highbury: "Headingley" },
    apply: true,
  });
  assert.match(applied.text, /Updated \d+ value/);
  const after = fs.readFileSync(hero, "utf8");
  assert.match(after, /Dyson & Sons/);
  assert.doesNotMatch(after, /\bFixwell\b/);
  assert.match(after, /tel:01134960123/);
  assert.doesNotMatch(after, /Highbury/);
  const newsletter = fs.readFileSync(path.join(project, "components/copypasteui/NewsletterCta.tsx"), "utf8");
  assert.match(newsletter, /placeholder="you@example\.com"/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(project, "copypasteui.business.json"), "utf8")).name, "Dyson & Sons");

  const again = await call(client, "fill_business_details", { projectDir: project, details });
  assert.match(again.text, /Preview: 0 value/);
  assert.equal((await call(client, "fill_business_details", { projectDir: project, details, dir: "../elsewhere" })).isError, true);
});

test("offers ready-made prompts for common jobs", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const { prompts } = await client.listPrompts();
  assert.deepEqual(prompts.map((p) => p.name).sort(), [
    "add-online-booking",
    "build-back-office",
    "build-business-website",
    "plan-my-website",
    "prepare-for-launch",
  ]);
  const built = await client.getPrompt({ name: "build-business-website", arguments: { business: "vegan café in Hove" } });
  const body = built.messages[0].content.text;
  assert.match(body, /vegan café in Hove/);
  assert.match(body, /get_plan/);
  assert.match(body, /plan_website/);
  assert.match(body, /fill_business_details/);
  const plan = await client.getPrompt({ name: "plan-my-website", arguments: { business: "dog groomer", quick: "yes" } });
  assert.match(plan.messages[0].content.text, /mode = "quick"/);
  assert.match(plan.messages[0].content.text, /ONE round per message/);
  const launch = await client.getPrompt({ name: "prepare-for-launch", arguments: {} });
  assert.match(launch.messages[0].content.text, /360px/);
});

test("backend recipes are listed by usage and carry the security contract", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const list = JSON.parse((await call(client, "list_recipes")).text);
  assert.equal(list[0].slug, "builder");
  assert.ok(
    ["supabase", "firebase", "convex", "postgres", "pocketbase", "cloudflare", "google-sheets"].every((s) =>
      list.some((r) => r.slug === s),
    ),
  );
  assert.deepEqual(
    list.map((r) => r.rank),
    [...list.map((r) => r.rank)].sort((a, b) => a - b),
  );
  const devs = JSON.parse((await call(client, "list_recipes", { audience: "developers" })).text);
  assert.ok(devs.every((r) => r.slug !== "google-sheets"));
  for (const r of list.filter((x) => x.covers === "full")) {
    const { text, isError } = await call(client, "get_recipe", { slug: r.slug });
    assert.equal(isError, false);
    assert.match(text, /Who may do what/);
    assert.match(text, /staff_members/);
    assert.match(text, /first owner/i);
    assert.match(text, /\/admin/);
  }
  assert.equal((await call(client, "get_recipe", { slug: "nope" })).isError, true);
  const offline = new Registry("http://127.0.0.1:9/r", tmpCache());
  assert.ok((await offline.getRecipe("firebase"))?.prompt.includes("rules_version"));
});

const project = () => fs.mkdtempSync(path.join(os.tmpdir(), "cpui-plan-"));

test("plan_website asks in chat, one round at a time, when the editor has no forms", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const dir = project();
  const full = await call(client, "plan_website", { projectDir: dir, business: "dental practice" });
  assert.equal(full.isError, false);
  assert.match(full.text, /ONE round per message/);
  for (const t of ["Your business", "What customers should do", "How it looks", "Pages", "Extras", "Where it will live"])
    assert.match(full.text, new RegExp(`\\*\\*${t}\\.\\*\\*`));
  assert.match(full.text, /`brightline-dental`/, "template choices follow the trade");
  assert.doesNotMatch(full.text, /→ `trade`/, "the trade it was given isn't asked again");
  assert.equal(fs.existsSync(path.join(dir, "copypasteui.config.json")), false, "nothing saved until there are answers");

  const quick = await call(client, "plan_website", { projectDir: dir, mode: "quick" });
  assert.doesNotMatch(quick.text, /The look|Extras/);
  assert.match(quick.text, /→ `primaryAction`/);
  assert.match(quick.text, /→ `hosting`/);
});

test("plan_website saves answers with trade defaults, and get_plan turns them into steps", async () => {
  const client = await connect(new Registry(LOCAL_REGISTRY, tmpCache()));
  const dir = project();
  assert.equal((await call(client, "get_plan", { projectDir: dir })).isError, true);
  const saved = await call(client, "plan_website", {
    projectDir: dir,
    mode: "quick",
    answers: { name: "Smile Hub", trade: "dental practice", area: "Leeds", phone: "0113 496 0000", email: "", hosting: "netlify" },
  });
  assert.equal(saved.isError, false);
  const plan = JSON.parse(fs.readFileSync(path.join(dir, "copypasteui.config.json"), "utf8"));
  assert.equal(plan.business.name, "Smile Hub");
  assert.equal(plan.look.template, "brightline-dental");
  assert.equal(plan.goal.primaryAction, "book", "a template with a booking section defaults to booking");
  assert.ok(plan.pages.includes("privacy"));
  assert.equal(plan.answers.email, undefined, "blank answers aren't saved as answers");

  // A second, full run only asks what the owner hasn't answered yet.
  const again = await call(client, "plan_website", { projectDir: dir });
  assert.doesNotMatch(again.text, /→ `name`|→ `hosting`/);
  assert.match(again.text, /→ `email`/);
  assert.match(again.text, /→ `tone`/);

  const steps = await call(client, "get_plan", { projectDir: dir });
  assert.match(steps.text, /get_template with slug "brightline-dental"/);
  assert.match(steps.text, /fill_business_details/);
  assert.match(steps.text, /netlify/);
});

test("plan_website shows forms where the editor supports them, and keeps answers if the owner stops", async () => {
  const { ElicitRequestSchema } = await import("@modelcontextprotocol/sdk/types.js");
  const [a, b] = InMemoryTransport.createLinkedPair();
  await createServer(new Registry(LOCAL_REGISTRY, tmpCache())).connect(a);
  const client = new Client({ name: "forms", version: "0" }, { capabilities: { elicitation: { form: {} } } });
  const asked = [];
  client.setRequestHandler(ElicitRequestSchema, async (req) => {
    const schema = req.params.requestedSchema;
    asked.push({ message: req.params.message, keys: Object.keys(schema.properties), schema });
    if (asked.length === 1)
      return { action: "accept", content: { name: "Paws & Co", trade: "dog groomer", area: "Leeds", phone: "", email: "hi@paws.example" } };
    if (asked.length === 2) return { action: "accept", content: { primaryAction: "book", bookingTool: "fresha" } };
    if (asked.length === 3) return { action: "decline" };
    return { action: "cancel" };
  });
  await client.connect(b);
  const dir = project();
  const r = await call(client, "plan_website", { projectDir: dir });
  assert.equal(r.isError, false);
  assert.equal(asked.length, 4, "stops at the first cancel");
  assert.deepEqual(asked[0].schema.required, ["name", "trade"]);
  assert.equal(asked[0].schema.properties.email.format, "email");
  assert.ok(asked[1].schema.properties.primaryAction.oneOf.some((o) => o.const === "book" && o.title));
  assert.equal(asked[3].schema.properties.pages.type, "array");
  assert.match(r.text, /stopped part-way/);
  const plan = JSON.parse(fs.readFileSync(path.join(dir, "copypasteui.config.json"), "utf8"));
  assert.equal(plan.business.name, "Paws & Co");
  assert.equal(plan.goal.bookingTool, "fresha");
  assert.equal(plan.hosting.platform, "unsure", "unanswered rounds get defaults");
});

test("planBrief turns a plan into plain instructions for AI builders without the MCP", async () => {
  const { makePlan, planBrief } = await import("../dist/plan-core.js");
  const index = JSON.parse(fs.readFileSync(path.join(LOCAL_REGISTRY, "index.json"), "utf8"));
  const brief = planBrief(
    makePlan(index, {
      name: "Crumb",
      trade: "bakery",
      area: "Bristol",
      phone: "0117 496 0000",
      pages: ["about", "gallery"],
      forms: "none",
      bookingTool: "fresha",
      hosting: "netlify",
    }),
  );
  assert.match(brief, /^\n\n## The plan for this website\n/);
  assert.match(brief, /Crumb, a bakery in Bristol\. Contact: phone 0117 496 0000\./);
  assert.match(brief, /about us, gallery/);
  assert.match(brief, /tap-to-call/, "no form means call and email links");
  assert.match(brief, /Fresha/);
  assert.match(brief, /on Netlify/);
  assert.doesNotMatch(brief, /undefined|get_template|fill_business_details/, "no MCP tool names for builders");
});
