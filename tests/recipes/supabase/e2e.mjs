// End to end on Supabase: the recipe's middleware guards /admin, the real sign-in and bookings screens
// talk to the local Supabase stack, and row-level security decides what each person sees.
// Run after supabase/run.mjs, which builds the database from the recipe and creates the people.
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import "../harness/prepare.mjs";
import { BASE, browser, check, signIn, startApp } from "../harness/drive.mjs";
import { summary } from "../lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  execSync("supabase status -o env", { cwd: here, encoding: "utf8" })
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")]),
);
const db = new pg.Client({ connectionString: env.DB_URL });
await db.connect();
const NAME = `Okafor ${Date.now().toString(36)}`; // unique per run, so reruns don't see each other's rows
await db.query("insert into bookings (starts_at, name, party, status) values ('2027-03-14T18:30:00Z', $1, 2, 'confirmed')", [NAME]);

const app = await startApp({ NEXT_PUBLIC_SUPABASE_URL: env.API_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY: env.ANON_KEY });
const { b, page } = await browser();
try {
  const visitor = await page();
  await visitor.goto(`${BASE}/admin/bookings`);
  await check("public", "open /admin/bookings (sent to sign-in instead)", false, async () => !visitor.url().includes("/admin/sign-in"));

  const wrong = await page();
  await signIn(wrong, "/admin/sign-in", "staff@example.com", "wrong-password");
  await check("public", "sign in with a wrong password", false, async () => {
    await wrong.getByRole("alert").waitFor({ timeout: 10000 });
    return !wrong.url().includes("/admin/sign-in");
  });

  const staff = await page();
  await signIn(staff, "/admin/sign-in", "staff@example.com", "test-password-123");
  await staff.waitForURL("**/admin/bookings", { timeout: 20000 });
  await check("staff", "sign in on the screen and see today's bookings", true, async () => {
    await staff.getByText(NAME).waitFor({ timeout: 15000 });
    return true;
  });
  await check("staff", "mark a booking arrived from the screen (saved in the database)", true, async () => {
    await staff.getByLabel(`Change status for ${NAME}`).selectOption("arrived");
    await staff.waitForFunction(() => document.body.dataset.saved?.startsWith("ok:") || document.body.dataset.saved?.startsWith("error:"));
    const { rows } = await db.query("select status from bookings where name = $1", [NAME]);
    return rows[0].status === "arrived";
  });

  const stranger = await page();
  await signIn(stranger, "/admin/sign-in", "stranger@example.com", "test-password-123");
  await stranger.waitForURL("**/admin/bookings", { timeout: 20000 });
  await check("stranger", "see bookings after signing in (not on the team)", false, async () => {
    await stranger.waitForSelector("text=/No bookings match/", { timeout: 15000 }).catch(() => {});
    return await stranger.getByText(NAME).isVisible();
  });
} finally {
  await b.close();
  app.stop();
  await db.end();
}
summary("Supabase end to end");
