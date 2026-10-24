import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fillBusinessDetails, suggestSections } from "./business.js";
import { installComponent } from "./install.js";
import {
  PLAN_FILE,
  cleanAnswers,
  loadPlan,
  makePlan,
  nextSteps,
  planAnswers,
  roundSchema,
  rounds,
  roundsAsText,
  savePlan,
  stillToAsk,
  type Answers,
  type Plan,
} from "./plan.js";
import { Registry, searchComponents, withTheme, type Theme } from "./registry.js";
import { VERSION } from "./version.js";

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const error = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true });

const INSTRUCTIONS = `CopyPasteUI is a free, source-available library of React + Tailwind sections (heroes, pricing, FAQ, footers …), themes and full-page templates.
Typical flow: search_components → get_component (pass a theme) → write the file into the project and install its dependencies.
For a whole page use list_templates → get_template. Use list_themes/get_theme to apply a consistent look.
For a small business, start with plan_website (it asks the owner in short rounds and saves copypasteui.config.json; read it later with get_plan), then suggest_sections (it picks the template that fits the trade), and finish with fill_business_details to put the real name, phone and email into every section.
For an owner's back office (category "admin"), pick a backend with list_recipes and follow get_recipe — it sets up the data, sign-in and access rules safely.
Components use shadcn-style tokens (bg-background, text-primary …); the theme block in each result explains how to define them.
Keep components' layout and motion; replace placeholder copy, links and images with the user's real content.`;

export function createServer(registry = new Registry()) {
  const server = new McpServer({ name: "copypasteui", version: VERSION }, { instructions: INSTRUCTIONS });

  const resolveTheme = async (slug?: string): Promise<Theme | null | "missing"> => {
    const index = await registry.getIndex();
    const t = await registry.getTheme(slug ?? index.defaultTheme);
    return t ?? (slug ? "missing" : null);
  };

  server.registerTool(
    "search_components",
    {
      title: "Search components",
      description:
        "Search CopyPasteUI sections by keywords, category or tag. Returns slugs, descriptions, dependencies and preview links. Call with no query to list everything in a category.",
      inputSchema: {
        query: z.string().optional().describe('Free text, e.g. "pricing toggle" or "dark saas hero"'),
        category: z.string().optional().describe("Category slug from list_categories, e.g. hero, pricing, faq"),
        tag: z.string().optional().describe("Exact tag, e.g. glass or bento"),
        limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async (args) => {
      const index = await registry.getIndex();
      const results = searchComponents(index.components, args);
      if (!results.length) return text("No components matched. Try fewer words or call list_categories.");
      return text(
        JSON.stringify(
          results.map((c) => ({
            slug: c.slug,
            name: c.name,
            category: c.category,
            description: c.description,
            tags: c.tags,
            dependencies: Object.keys(c.dependencies),
            license: c.license ?? "PolyForm-Shield-1.0.0",
            preview: c.previewUrl,
            image: c.thumbnailUrl,
          })),
          null,
          2,
        ),
      );
    },
  );

  server.registerTool(
    "list_categories",
    {
      title: "List categories",
      description: "List component categories with how many components each has.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => {
      const index = await registry.getIndex();
      return text(
        JSON.stringify(
          index.categories.filter((c) => c.count > 0),
          null,
          2,
        ),
      );
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get component",
      description:
        "Get a component's full source with step-by-step integration instructions, its npm dependencies, and the theme tokens it needs. Write the code to the suggested path unchanged, then adapt the copy.",
      inputSchema: {
        slug: z.string().describe("Component slug from search_components"),
        theme: z
          .string()
          .optional()
          .describe(
            "Theme slug from list_themes. Defaults to the component's own theme (its brand collection's theme, or the registry default).",
          ),
        format: z
          .enum(["prompt", "code"])
          .optional()
          .describe('"prompt" (default): code + instructions + theme. "code": the raw .tsx only.'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug, theme, format }) => {
      const c = await registry.getComponent(slug);
      if (!c) return error(`Unknown component "${slug}". Use search_components to find slugs.`);
      if (format === "code") return text(c.code);
      const t = await resolveTheme(theme ?? c.theme);
      if (t === "missing") return error(`Unknown theme "${theme}". Use list_themes.`);
      return text(withTheme(c.prompt, t));
    },
  );

  server.registerTool(
    "list_themes",
    {
      title: "List themes",
      description: "List themes (colour palette, radius and fonts) that every component adapts to.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => {
      const index = await registry.getIndex();
      return text(
        JSON.stringify(
          index.themes.map((t) => ({
            slug: t.slug,
            name: t.name,
            description: t.description,
            default: Boolean(t.default),
            primary: t.light.primary,
            background: t.light.background,
            fonts: t.fonts,
            license: t.license ?? "PolyForm-Shield-1.0.0",
            image: t.thumbnailUrl,
          })),
          null,
          2,
        ),
      );
    },
  );

  server.registerTool(
    "get_theme",
    {
      title: "Get theme",
      description:
        "Get a theme's CSS variables plus Tailwind v4 and v3 wiring. Apply it once in the project's global stylesheet so all CopyPasteUI components match.",
      inputSchema: {
        slug: z.string().describe("Theme slug from list_themes"),
        format: z
          .enum(["instructions", "css", "tailwind-v4", "tailwind-v3", "shadcn"])
          .optional()
          .describe('"instructions" (default) explains everything; the others return one snippet.'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug, format }) => {
      const t = await registry.getTheme(slug);
      if (!t) return error(`Unknown theme "${slug}". Use list_themes.`);
      switch (format) {
        case "css":
          return text(t.css);
        case "tailwind-v4":
          return text(t.tailwindV4);
        case "tailwind-v3":
          return text(t.tailwindV3);
        case "shadcn":
          return text(`npx shadcn@latest add ${t.shadcnUrl}`);
        default:
          return text(t.promptBlock);
      }
    },
  );

  server.registerTool(
    "list_templates",
    {
      title: "List templates",
      description: "List full-page templates (ordered sets of components with a matching theme).",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => {
      const index = await registry.getIndex();
      return text(JSON.stringify(index.templates, null, 2));
    },
  );

  server.registerTool(
    "get_template",
    {
      title: "Get template",
      description: "Get everything needed to build a complete landing page: every section's code in order, dependencies and the theme.",
      inputSchema: {
        slug: z.string().describe("Template slug from list_templates"),
        theme: z.string().optional().describe("Override the template's theme"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug, theme }) => {
      const tpl = await registry.getTemplate(slug);
      if (!tpl) return error(`Unknown template "${slug}". Use list_templates.`);
      const t = await resolveTheme(theme ?? tpl.theme);
      if (t === "missing") return error(`Unknown theme "${theme}". Use list_themes.`);
      return text(withTheme(tpl.prompt, t));
    },
  );

  server.registerTool(
    "add_component",
    {
      title: "Add component to project",
      description:
        "Write a component's .tsx file (and optionally a theme stylesheet) into the user's project. Never overwrites existing files unless overwrite is true, and does not run npm — install the returned dependencies yourself.",
      inputSchema: {
        slug: z.string().describe("Component slug"),
        projectDir: z.string().describe("Absolute path of the project root"),
        dir: z.string().optional().describe('Folder relative to projectDir (default "components/copypasteui")'),
        theme: z.string().optional().describe("Also write theme-<slug>.css next to the component"),
        overwrite: z.boolean().optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    async ({ slug, projectDir, dir, theme, overwrite }) => {
      const c = await registry.getComponent(slug);
      if (!c) return error(`Unknown component "${slug}".`);
      let t: Theme | null = null;
      if (theme) {
        t = await registry.getTheme(theme);
        if (!t) return error(`Unknown theme "${theme}".`);
      }
      try {
        const r = installComponent(c, projectDir, { dir, theme: t, overwrite });
        return text(
          [
            r.written.length ? `Wrote:\n${r.written.map((f) => `  ${f}`).join("\n")}` : null,
            r.skipped.length
              ? `Skipped (already exists, pass overwrite: true to replace):\n${r.skipped.map((f) => `  ${f}`).join("\n")}`
              : null,
            r.installCommand ? `Install dependencies: ${r.installCommand}` : "No extra dependencies.",
            `Usage:\n${r.usage}`,
            t ? "Import the theme CSS once from the global stylesheet." : null,
          ]
            .filter(Boolean)
            .join("\n\n"),
        );
      } catch (e) {
        return error((e as Error).message);
      }
    },
  );

  server.registerTool(
    "list_recipes",
    {
      title: "List backend recipes",
      description:
        "List the backend recipes for the back office (database, sign-in and access rules), most widely used first: the AI builder's own backend, Supabase, Firebase, Convex, Postgres with Better Auth or Clerk, PocketBase, Cloudflare D1 + Access, and Google Sheets for content only.",
      inputSchema: {
        audience: z
          .enum(["builders", "developers"])
          .optional()
          .describe("Only recipes suited to people using AI builders, or to developers"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ audience }) => {
      const recipes = (await registry.getRecipes()).filter((r) => !audience || r.audience.includes(audience));
      return text(
        JSON.stringify(
          recipes.map(({ slug, name, summary, bestFor, cost, covers, rank, tested }) => ({
            rank,
            slug,
            name,
            summary,
            bestFor,
            cost,
            covers,
            tested: tested ?? "not yet run end to end",
          })),
          null,
          2,
        ),
      );
    },
  );

  server.registerTool(
    "get_recipe",
    {
      title: "Get backend recipe",
      description:
        "Get one backend recipe as step-by-step instructions: the shared back-office data model, who may read or write what, the tables and access rules for that backend, how to create the first owner, how to protect /admin on the server, and how to wire the admin screens.",
      inputSchema: { slug: z.string().describe("Recipe slug from list_recipes, e.g. supabase or firebase") },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const r = await registry.getRecipe(slug);
      if (!r) return error(`Unknown recipe "${slug}". Use list_recipes.`);
      return text(r.prompt);
    },
  );

  server.registerTool(
    "suggest_sections",
    {
      title: "Suggest sections for a business",
      description:
        'Given a kind of business ("dog groomer in Leeds", "vegan café"), pick the best-fitting template and list its sections in order with what each one is for, alternatives for each, sections worth adding, and the pages a small-business site usually needs.',
      inputSchema: {
        business: z.string().describe('What the business is, in plain words, e.g. "family-run plumber" or "wine bar with small plates"'),
        alternatives: z.number().int().min(0).max(5).optional().describe("Alternatives per section (default 2)"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ business, alternatives }) => {
      const index = await registry.getIndex();
      const s = suggestSections(index, business, alternatives ?? 2);
      if (!s)
        return text(
          `No template matches "${business}" yet. Try a broader word (e.g. "shop", "clinic", "studio"), or build from search_components. A template for this trade would be a welcome contribution: ${index.site}/contribute`,
        );
      return text(JSON.stringify(s, null, 2));
    },
  );

  server.registerTool(
    "fill_business_details",
    {
      title: "Fill in business details",
      description:
        "Replace the sample brand name, phone numbers and emails in installed CopyPasteUI sections with the user's real details, plus any extra find-and-replace pairs. Dry run by default: returns what would change and the lines to check by eye (addresses, opening hours, prices). Call again with apply: true to write the files and save copypasteui.business.json.",
      inputSchema: {
        projectDir: z.string().describe("Absolute path of the project root"),
        details: z
          .object({
            name: z.string().optional().describe("Business name, replaces the template's brand name"),
            phone: z.string().optional().describe("Phone number as it should be shown; tel: links are updated too"),
            email: z.string().optional(),
            address: z.string().optional(),
            website: z.string().optional(),
          })
          .catchall(z.string())
          .describe("The real details. Extra keys are saved to copypasteui.business.json for later."),
        replace: z
          .record(z.string(), z.string())
          .optional()
          .describe('Extra exact replacements, e.g. {"14 Harbour Row": "3 Quay Street", "Old Port, Brighton": "Falmouth"}'),
        dir: z.string().optional().describe('Folder to update, relative to projectDir (default "components/copypasteui")'),
        apply: z.boolean().optional().describe("Write the changes (default false: preview only)"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    async ({ projectDir, details, replace, dir, apply }) => {
      try {
        const r = fillBusinessDetails(await registry.getIndex(), projectDir, details, { replace, dir, apply });
        const changed = r.files.reduce((n, f) => n + f.changes.reduce((m, c) => m + c.count, 0), 0);
        const head = r.applied
          ? `Updated ${changed} value(s) in ${r.files.length} file(s) and saved copypasteui.business.json.`
          : `Preview: ${changed} value(s) in ${r.files.length} file(s) would change. Nothing written — call again with apply: true.`;
        return text(`${head}\n\n${JSON.stringify({ files: r.files, checkByEye: r.review }, null, 2)}`);
      } catch (e) {
        return error((e as Error).message);
      }
    },
  );

  const ANSWER_KEYS = [
    "name",
    "trade",
    "area",
    "phone",
    "email",
    "primaryAction",
    "bookingTool",
    "template",
    "theme",
    "tone",
    "photos",
    "pages",
    "forms",
    "newsletter",
    "backOffice",
    "analytics",
    "hosting",
    "domain",
  ] as const;
  const planSummary = (file: string, plan: Plan) =>
    `Saved the plan to ${file}.\n\n${JSON.stringify(plan, null, 2)}\n\nNext steps:\n${nextSteps(plan)
      .map((s, i) => `${i + 1}. ${s}`)
      .join("\n")}`;

  server.registerTool(
    "plan_website",
    {
      title: "Plan a business website",
      description:
        'Plan a small-business website by asking the owner short rounds of questions (the business, what visitors should do, the look, pages, extras, going live) and save the answers to copypasteui.config.json. In editors that support forms (MCP elicitation) the questions appear as forms; otherwise this returns the questions for you to ask in chat, one round per message, then call again with answers. mode "quick" asks only the essentials and picks the rest for the trade. Questions already answered in the saved plan are not asked again.',
      inputSchema: {
        projectDir: z.string().describe("Absolute path of the project root; the plan is saved there"),
        business: z.string().optional().describe('What the business is, if already known, e.g. "family bakery in Bristol"'),
        mode: z
          .enum(["full", "quick"])
          .optional()
          .describe("full: six short rounds (default). quick: five details, the main action and hosting"),
        answers: z
          .object(Object.fromEntries(ANSWER_KEYS.map((k) => [k, k === "pages" ? z.array(z.string()).optional() : z.string().optional()])))
          .optional()
          .describe(
            "Answers gathered in chat, using the keys and option values from the questions. Anything left out gets a default for the trade.",
          ),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    async ({ projectDir, business, mode, answers }) => {
      try {
        const quick = mode === "quick";
        const index = await registry.getIndex();
        const recipes = await registry.getRecipes();
        const saved = loadPlan(projectDir);
        let a: Answers = { ...(saved ? planAnswers(saved) : {}), ...(business ? { trade: business } : {}), ...cleanAnswers(answers ?? {}) };
        const save = (note = "") => {
          const plan = makePlan(index, a);
          return text(note + planSummary(savePlan(projectDir, plan), plan));
        };
        if (answers && Object.keys(answers).length) return save();

        const canAsk = Boolean(server.server.getClientCapabilities()?.elicitation);
        if (!canAsk) {
          const todo = stillToAsk(rounds(index, recipes, a.trade, quick), a);
          if (!todo.length) return save();
          return text(`Ask the owner these questions in chat, ONE round per message, in plain words (show the option labels, not the values). Offer to skip anything they don't know — it gets a sensible default. When done, call plan_website again with projectDir and answers: { key: value } using the values in backticks.${Object.keys(a).length ? `\nAlready known (don't ask again): ${JSON.stringify(a)}` : ""}

${roundsAsText(todo)}`);
        }

        // The editor shows real forms: one per round. Rounds are rebuilt each time so the template choices follow the trade.
        const order = rounds(index, recipes, undefined, quick).map((r) => r.id);
        let stopped = false;
        for (const id of order) {
          const round = stillToAsk(rounds(index, recipes, a.trade, quick), a).find((r) => r.id === id);
          if (!round) continue;
          const res = await server.server.elicitInput({
            mode: "form",
            message: `${round.title}. ${round.intro}`,
            requestedSchema: roundSchema(round) as never,
          });
          if (res.action === "accept" && res.content) a = { ...a, ...cleanAnswers(res.content) };
          if (res.action === "cancel") {
            stopped = true;
            break;
          }
        }
        return save(
          stopped ? "The owner stopped part-way; the rest uses defaults for the trade. Run plan_website again to finish it.\n" : "",
        );
      } catch (e) {
        return error((e as Error).message);
      }
    },
  );

  server.registerTool(
    "get_plan",
    {
      title: "Get the website plan",
      description:
        "Read the saved plan (copypasteui.config.json) for a project and the build steps that follow from it. Call this at the start of any build so the site matches what the owner chose; if there is no plan, use plan_website first.",
      inputSchema: { projectDir: z.string().describe("Absolute path of the project root") },
      annotations: { readOnlyHint: true },
    },
    async ({ projectDir }) => {
      const plan = loadPlan(projectDir);
      if (!plan) return error(`No ${PLAN_FILE} in ${projectDir}. Call plan_website first (mode "quick" for a fast start).`);
      return text(
        `${JSON.stringify(plan, null, 2)}\n\nNext steps:\n${nextSteps(plan)
          .map((s, i) => `${i + 1}. ${s}`)
          .join("\n")}`,
      );
    },
  );

  registerPrompts(server);
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

// Ready-made requests that clients show as slash commands or prompt pickers.
function registerPrompts(server: McpServer) {
  const ask = (t: string) => ({ messages: [{ role: "user" as const, content: { type: "text" as const, text: t } }] });

  server.registerPrompt(
    "plan-my-website",
    {
      title: "Plan my website",
      description: "Answer a few short rounds of questions about your business; the answers are saved so the build follows them.",
      argsSchema: {
        business: z.string().optional().describe('What the business is, if you want to say up front, e.g. "dog groomer in Leeds"'),
        quick: z.string().optional().describe('"yes" for the quick version: five details, the main action and hosting'),
      },
    },
    ({ business, quick }) =>
      ask(`Help me plan a website${business ? ` for ${business}` : ""} before building anything.
1. Call plan_website with projectDir = this project${business ? ` and business = "${business}"` : ""}${quick && /^y/i.test(quick) ? ' and mode = "quick"' : ""}.
2. If it shows me forms, that's it. If it returns questions instead, ask me them in chat ONE round per message, in plain words, with the choices as a short list. Let me skip anything; never ask more than one round at once. Then call plan_website again with my answers.
3. Show me the plan in a few lines (template, look, pages, extras, where it goes live) and ask if anything should change. Change it by calling plan_website with just the corrected answers.
4. Ask whether to start building now. If yes, follow the build-business-website steps.`),
  );

  server.registerPrompt(
    "build-business-website",
    {
      title: "Build my business website",
      description: "Build a complete small-business site from the saved plan, or plan it quickly first.",
      argsSchema: {
        business: z.string().optional().describe('What the business is, e.g. "family bakery in Bristol"'),
        details: z.string().optional().describe("Name, phone, email, address, opening hours — whatever you have"),
      },
    },
    ({ business, details }) =>
      ask(`Build a website for ${business ? `this business: ${business}` : "my business"}.
${details ? `Details: ${details}\n` : ""}
Use the copypasteui MCP tools:
1. Call get_plan with projectDir = this project. If there's no plan yet, call plan_website with mode "quick"${business ? ` and business = "${business}"` : ""} and ask me its questions one round at a time (or let the forms do it).
2. Follow the plan's next steps in order. Tell me which template it uses and why, in one or two sentences.
3. Create every section file from get_template unchanged, in order, on the home page. Apply the plan's theme once in the global stylesheet and install the listed dependencies.
4. Rewrite the copy for this business in the plan's tone: real services, prices, hours and area. Keep the layout and motion.
5. Run fill_business_details as a preview with the plan's name, phone and email, show me what will change, and run it again with apply: true.
6. Finish with a short list of what's still placeholder (photos, prices, addresses) and how to run the site locally.`),
  );

  server.registerPrompt(
    "add-online-booking",
    {
      title: "Add online booking",
      description: "Add a booking or appointment section and wire it to a booking service.",
      argsSchema: {
        business: z.string().optional().describe("What gets booked, e.g. tables, haircuts, MOTs, classes"),
        provider: z.string().optional().describe("Booking service you use, if any (Cal.com, Calendly, OpenTable, Fresha…)"),
      },
    },
    ({ business, provider }) =>
      ask(`Add online booking to this site${business ? ` for ${business}` : ""}.
1. Call search_components with "booking ${business ?? ""}" and pick the section that matches the site's existing style (prefer one from the same collection). Add it with add_component.
2. ${provider ? `Connect it to ${provider}: use their embed or booking link — no API keys in the front end.` : "Ask me which booking service I use. If I have none, suggest a free option (Cal.com, or a simple form that emails me) and explain the trade-off in one line each."}
3. Keep the section's design; replace sample times, prices and staff with mine.
4. Make sure the form or embed works on a phone and that every button has a clear label.`),
  );

  server.registerPrompt(
    "build-back-office",
    {
      title: "Build a back office",
      description:
        "Add owner screens (bookings, orders, enquiries, menu, hours…) behind a secure sign-in, with the database and access rules set up properly.",
      argsSchema: {
        screens: z.string().optional().describe('Which screens, e.g. "bookings, enquiries, menu" (default: the ones this site needs)'),
        backend: z
          .string()
          .optional()
          .describe(
            "Backend to use: builder, supabase, firebase, convex, postgres, pocketbase, cloudflare or google-sheets (default: ask)",
          ),
      },
    },
    ({ screens, backend }) =>
      ask(`Add a back office to this site so the owner can manage it without a developer.
1. Call search_components with category "admin" and pick the screens this business needs${screens ? ` (asked for: ${screens})` : " — always admin-sign-in and admin-overview, then the ones that match what the site does (bookings, orders, enquiries, menu, hours, reviews…)"}. Add them with add_component under app/admin/.
2. ${backend ? `The backend is ${backend}.` : "Ask me which backend to use if it isn't obvious from the project; call list_recipes to offer the choices (the AI builder's own backend first)."} Call get_recipe for it and follow every step: the shared data model, the access table (who may read or write what), the tables and rules, and the first owner.
3. Protect every /admin route on the server (middleware or a server-side session check) and redirect to /admin/sign-in when signed out. Never put service keys or admin data in the public site's code.
4. Wire each screen's callbacks (onSave, onStatusChange…) to the database, and make the public pages read the same data (menu, hours, closures, business details), so an edit in the back office updates the website.
5. Keep /admin out of the navigation and the sitemap, and add it to robots.txt as Disallow.
6. Finish with a short handover note: how the owner signs in, how to invite staff, and where the data lives.`),
  );

  server.registerPrompt(
    "prepare-for-launch",
    {
      title: "Prepare for launch",
      description: "Check a CopyPasteUI site for leftovers and launch blockers before it goes live.",
      argsSchema: {},
    },
    () =>
      ask(`Get this site ready to go live. Work through this list and report what you fixed and what needs me:
1. Run fill_business_details as a preview (projectDir = this project) and resolve every leftover sample name, phone, email, address, opening time and price.
2. Search the code for "#", "example.com" and lorem-style placeholder links; point every button and link somewhere real.
3. Every <img> has alt text that describes the photo; swap stock photos I should replace with my own.
4. Page title, meta description and a share image are set; add a favicon if missing.
5. Add the utility pages from the "pages" category (search_components with category "pages"): legal-page for privacy and terms, cookie-banner if anything sets non-essential cookies, not-found-page as the 404, thank-you-page after forms. Fill in the real business details.
6. Check the site at 360px wide: nothing scrolls sideways, tap targets are big enough.
7. Build for production and fix any errors, then tell me the simplest way to deploy it.`),
  );
}
