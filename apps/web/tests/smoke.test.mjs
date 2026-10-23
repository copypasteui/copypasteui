// Smoke tests for the flows people use most, against the built site (run `npm run build` first):
// ⌘K search, the Sections search, a template's live preview (theme + width), copying a prompt,
// the plan page end to end, light/dark, and the 404 page. Fails on any console error.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { after, before, describe, test } from "node:test";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { serveStatic } from "../scripts/serve.mjs";

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(WEB, "out");
const PORT = Number(process.env.SMOKE_PORT ?? 4327);
const BASE = `http://localhost:${PORT}`;
if (!fs.existsSync(path.join(OUT, "index.html"))) throw new Error("No static export in apps/web/out — run `npm run build` first.");

let server, browser;
before(async () => {
  server = await serveStatic(OUT, PORT);
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
});
after(async () => {
  await browser?.close();
  server?.close();
});

/** A fresh page that records console errors and failed same-site requests. */
async function open(urlPath, { clipboard = false, colorScheme = "light" } = {}) {
  const context = await browser.newContext({ viewport: { width: 1360, height: 900 }, colorScheme });
  if (clipboard) await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  // Next.js cancels some background prefetches (net::ERR_ABORTED); only real failures count.
  page.on(
    "requestfailed",
    (r) => r.url().startsWith(BASE) && r.failure()?.errorText !== "net::ERR_ABORTED" && errors.push(`failed: ${r.url()}`),
  );
  await page.goto(`${BASE}${urlPath}`, { waitUntil: "networkidle" });
  return { page, errors, close: () => context.close() };
}
const clipboardText = (page) => page.evaluate(() => navigator.clipboard.readText());

describe("smoke", { concurrency: 2 }, () => {
  test("home renders with no errors", async () => {
    const { page, errors, close } = await open("/");
    assert.match(await page.title(), /CopyPasteUI/);
    assert.equal(await page.locator("h1").count(), 1);
    assert.deepEqual(errors, []);
    await close();
  });

  test("⌘K finds a template by trade and opens it", async () => {
    const { page, errors, close } = await open("/");
    await page.getByRole("button", { name: "Search (Command K)" }).click();
    const box = page.getByRole("combobox");
    await box.fill("dentist");
    await page.getByRole("option").first().waitFor();
    assert.match(await page.getByRole("option").first().innerText(), /Brightline/);
    await box.press("Enter");
    await page.waitForURL(/\/templates\/brightline-dental$/);
    assert.deepEqual(errors, []);
    await close();
  });

  test("the Sections search puts the best match first", async () => {
    const { page, close } = await open("/components");
    await page.getByPlaceholder(/Search sections/).fill("pricing toggle");
    // The first result card: links to a section are /components/<category>/<slug>; the sidebar links to categories.
    const first = await page.waitForFunction(() =>
      [...document.querySelectorAll("main a[href^='/components/']")]
        .map((a) => a.getAttribute("href"))
        .find((h) => /^\/components\/[^/]+\/[^/]+$/.test(h)),
    );
    const firstHref = await first.jsonValue();
    assert.equal(firstHref, "/components/pricing/toggle-tier-pricing");
    await close();
  });

  test("a template's live preview switches theme and width", async () => {
    const { page, errors, close } = await open("/templates/olea-restaurant");
    const frame = page.frameLocator("iframe[title='Section preview']");
    await frame.locator("section").first().waitFor();
    const sunset = JSON.parse(fs.readFileSync(path.join(OUT, "r/themes/sunset.json"), "utf8"));
    await page.locator("select").first().selectOption("sunset");
    const primary = () =>
      page
        .frames()
        .find((f) => f.url().includes("/preview/"))
        ?.evaluate(() => document.documentElement.style.getPropertyValue("--primary").trim());
    for (let i = 0; i < 30 && (await primary()) !== sunset.light.primary; i++) await page.waitForTimeout(100);
    assert.equal(await primary(), sunset.light.primary, "the preview uses the picked theme");
    await page.getByRole("radio", { name: /Mobile width/ }).click();
    await page.waitForTimeout(500);
    const width = (await page.locator("iframe[title='Section preview']").boundingBox()).width;
    assert.ok(Math.abs(width - 390) <= 4, `phone width is about 390px (got ${width})`);
    assert.deepEqual(errors, []);
    await close();
  });

  test("copying a template prompt includes the code, the theme and your details", async () => {
    const { page, errors, close } = await open("/templates/olea-restaurant", { clipboard: true });
    await page.getByLabel("Business name").fill("Harbour Kitchen");
    await page.getByRole("button", { name: /Copy full-page prompt/ }).click();
    await page.getByRole("button", { name: /Copied/ }).waitFor();
    const text = await clipboardText(page);
    assert.match(text, /^Build the "Olea/);
    assert.match(text, /## Theme: /);
    assert.match(text, /```tsx/);
    assert.match(text, /Harbour Kitchen/);
    assert.doesNotMatch(text, /\{\{THEME\}\}/);
    assert.deepEqual(errors, []);
    await close();
  });

  test("the plan page: short version to a build prompt", async () => {
    const { page, errors, close } = await open("/plan", { clipboard: true });
    await page.getByRole("button", { name: /The short version/ }).click();
    await page.getByLabel("Business name").fill("Crumb");
    await page.getByLabel("What the business does").fill("bakery");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("radio", { name: "Buy products online" }).click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("radio", { name: "Netlify" }).click();
    await page.getByRole("button", { name: "See my plan" }).click();
    await page.getByRole("heading", { name: "Your plan" }).waitFor();
    await page.getByRole("button", { name: "Copy the build prompt" }).click();
    await page.getByRole("button", { name: /Copied/ }).waitFor();
    const text = await clipboardText(page);
    assert.match(text, /## The plan for this website/);
    assert.match(text, /This website is for Crumb, a bakery\./);
    assert.match(text, /on Netlify/);
    assert.deepEqual(errors, []);
    await close();
  });

  test("light/dark: the choice applies and survives a reload", async () => {
    const { page, close } = await open("/");
    await page.getByRole("button", { name: "Switch to dark colours" }).click();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "dark");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(18, 18, 16)");
    await page.getByRole("radio", { name: "System" }).first().click();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme ?? null), null);
    await close();
  });

  test("an unknown address shows the 404 page with suggestions", async () => {
    const { page, close } = await open("/templates/olea-restaurnt");
    assert.match(await page.locator("h1").innerText(), /./);
    assert.ok((await page.locator("a[href='/templates/olea-restaurant']").count()) > 0, "suggests the page it was probably meant to be");
    await close();
  });
});
