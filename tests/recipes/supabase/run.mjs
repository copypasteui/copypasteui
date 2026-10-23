// Runs the Supabase recipe against a local Supabase stack (supabase start) and checks the access table
// for every role: public visitor, signed-in stranger, staff, manager, owner.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import { check, recipeBlocks, summary } from "../lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const [schemaSql, ownerSql] = recipeBlocks("supabase", "sql");

// 1. Load the recipe's SQL as the only migration, then reset the database to it.
const migrations = path.join(here, "supabase", "migrations");
fs.rmSync(migrations, { recursive: true, force: true });
fs.mkdirSync(migrations, { recursive: true });
fs.writeFileSync(path.join(migrations, "20261021000000_recipe.sql"), schemaSql);
execSync("supabase db reset", { cwd: here, stdio: "inherit" });

const env = Object.fromEntries(
  execSync("supabase status -o env", { cwd: here, encoding: "utf8" })
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, "")];
    }),
);
const url = env.API_URL,
  anonKey = env.ANON_KEY,
  serviceKey = env.SERVICE_ROLE_KEY,
  dbUrl = env.DB_URL;
const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

// 2. Users. The owner is made with the recipe's own "first owner" SQL; the owner then adds the others.
const password = "test-password-123";
const people = {};
for (const who of ["owner", "manager", "staff", "stranger"]) {
  const { data, error } = await admin.auth.admin.createUser({ email: `${who}@example.com`, password, email_confirm: true });
  if (error) throw error;
  people[who] = data.user;
}
const db = new pg.Client({ connectionString: dbUrl });
await db.connect();
await db.query(ownerSql.replace("owner@example.com", "owner@example.com"));
await db.end();

const signedIn = async (who) => {
  const c = createClient(url, anonKey, { auth: { persistSession: false } });
  const { error } = await c.auth.signInWithPassword({ email: `${who}@example.com`, password });
  if (error) throw error;
  return c;
};
const anon = createClient(url, anonKey, { auth: { persistSession: false } });
const owner = await signedIn("owner");

await check("owner", "add staff_members (manager, staff)", true, async () => {
  const { error } = await owner.from("staff_members").insert([
    { user_id: people.manager.id, email: "manager@example.com", role: "manager" },
    { user_id: people.staff.id, email: "staff@example.com", role: "staff" },
  ]);
  if (error) throw error;
  return true;
});
const manager = await signedIn("manager");
const staff = await signedIn("staff");
const stranger = await signedIn("stranger");

// 3. Seed one row in every table with the service role (bypasses row-level security).
const seed = async (table, row) => {
  const { data, error } = await admin.from(table).insert(row).select().single();
  if (error) throw new Error(`${table}: ${error.message}`);
  return data;
};
await seed("settings", { name: "Harbour Kitchen", phone: "01326 555 0101" });
const section = await seed("menu_sections", { name: "Mains" });
const item = await seed("menu_items", { section_id: section.id, name: "Bream", price_pence: 2600 });
await seed("opening_hours", { day: 0, open: false });
await seed("closures", { starts_on: "2026-12-24", ends_on: "2027-01-02", note: "Holidays" });
const booking = await seed("bookings", { starts_at: "2027-03-14T18:00:00Z", name: "Grace", party: 2 });
const order = await seed("orders", { customer_name: "Jo", items: [{ name: "Fish", qty: 1 }], total_pence: 1200 });
const enquiry = await seed("enquiries", { name: "Sophie", email: "s@example.com", message: "Private dining?" });
await seed("customers", { name: "Grace", email: "grace@example.com" });
await seed("reviews", { source: "Google", author: "Kate", rating: 2, text: "Slow" });

// Helpers: a read is "allowed" when it returns rows; a write when it changes or creates a row.
const reads = (c, table) => async () => (await c.from(table).select("*")).data?.length > 0;
const inserts = (c, table, row) => async () => !(await c.from(table).insert(row)).error;
const updates =
  (c, table, id, patch, key = "id") =>
  async () =>
    ((await c.from(table).update(patch).eq(key, id).select()).data?.length ?? 0) > 0;
const deletes = (c, table, id) => async () => ((await c.from(table).delete().eq("id", id).select()).data?.length ?? 0) > 0;
const newBooking = (status = "confirmed") => ({ starts_at: "2027-03-15T19:00:00Z", name: "Test", party: 2, status });

// 4. The access table, row by row.
for (const [who, c] of [
  ["public", anon],
  ["stranger", stranger],
]) {
  for (const t of ["menu_sections", "menu_items", "opening_hours", "closures", "settings"])
    await check(who, `read ${t}`, true, reads(c, t));
  await check(who, "change menu_items", false, updates(c, "menu_items", item.id, { price_pence: 1 }));
  await check(who, "change settings", false, updates(c, "settings", 1, { name: "Hacked" }));
  await check(who, "create a booking", true, inserts(c, "bookings", newBooking()));
  await check(who, "create a booking already marked arrived", false, inserts(c, "bookings", newBooking("arrived")));
  await check(who, "read bookings", false, reads(c, "bookings"));
  await check(who, "create an unpaid new order", true, inserts(c, "orders", { customer_name: "X", items: [], total_pence: 100 }));
  await check(
    who,
    "create an order marked paid",
    false,
    inserts(c, "orders", { customer_name: "X", items: [], total_pence: 100, paid: true }),
  );
  await check(who, "read orders", false, reads(c, "orders"));
  await check(who, "send an enquiry", true, inserts(c, "enquiries", { name: "Y", email: "y@example.com", message: "Hi" }));
  for (const t of ["enquiries", "customers", "reviews", "staff_members"]) await check(who, `read ${t}`, false, reads(c, t));
}

await check("staff", "read bookings", true, reads(staff, "bookings"));
await check("staff", "change a booking's status", true, updates(staff, "bookings", booking.id, { status: "arrived" }));
await check("staff", "read orders", true, reads(staff, "orders"));
await check("staff", "move an order to ready", true, updates(staff, "orders", order.id, { stage: "ready" }));
await check("staff", "delete a booking", false, deletes(staff, "bookings", booking.id));
for (const t of ["enquiries", "customers", "reviews"]) await check("staff", `read ${t}`, false, reads(staff, t));
await check("staff", "change menu_items", false, updates(staff, "menu_items", item.id, { price_pence: 1 }));
await check("staff", "change settings", false, updates(staff, "settings", 1, { name: "Hacked" }));
await check(
  "staff",
  "see only their own staff_members row",
  true,
  async () => (await staff.from("staff_members").select("*")).data?.length === 1,
);
await check("staff", "promote themselves to owner", false, updates(staff, "staff_members", people.staff.id, { role: "owner" }, "user_id"));

for (const t of ["enquiries", "customers", "reviews"]) await check("manager", `read ${t}`, true, reads(manager, t));
await check("manager", "mark an enquiry replied", true, updates(manager, "enquiries", enquiry.id, { status: "replied" }));
await check("manager", "change menu_items", true, updates(manager, "menu_items", item.id, { price_pence: 2700 }));
await check(
  "manager",
  "add a closure",
  true,
  inserts(manager, "closures", { starts_on: "2027-08-01", ends_on: "2027-08-14", note: "Summer" }),
);
await check(
  "manager",
  "see every staff_members row",
  true,
  async () => (await manager.from("staff_members").select("*")).data?.length === 3,
);
await check("manager", "change settings", false, updates(manager, "settings", 1, { name: "Hacked" }));
await check(
  "manager",
  "add a staff member",
  false,
  inserts(manager, "staff_members", { user_id: people.stranger.id, email: "stranger@example.com", role: "staff" }),
);
await check(
  "manager",
  "promote themselves to owner",
  false,
  updates(manager, "staff_members", people.manager.id, { role: "owner" }, "user_id"),
);

await check("owner", "change settings", true, updates(owner, "settings", 1, { name: "Harbour Kitchen Ltd" }));
await check("owner", "delete a booking", true, deletes(owner, "bookings", booking.id));

const other = (await admin.from("bookings").select("id").limit(1).single()).data.id;
await check("staff", "rename a booking", false, updates(staff, "bookings", other, { name: "Renamed" }));
await check("staff", "change an order's total", false, updates(staff, "orders", order.id, { total_pence: 1 }));
await check("manager", "rename a booking", true, updates(manager, "bookings", other, { name: "Renamed by manager" }));

summary("Supabase recipe");
