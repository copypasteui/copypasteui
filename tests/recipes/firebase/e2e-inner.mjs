// Runs inside `firebase emulators:exec --only firestore,auth`: real Firebase Auth and Firestore emulators
// with the recipe's rules, and the real sign-in and bookings screens in a browser.
import fs from "node:fs";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { browser, check, signIn, startApp } from "../harness/drive.mjs";
import { summary } from "../lib.mjs";

const AUTH = "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key";
const password = "test-password-123";
const users = {};
for (const who of ["staff", "stranger"]) {
  const res = await fetch(AUTH, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: `${who}@example.com`, password, returnSecureToken: true }),
  });
  users[who] = (await res.json()).localId;
}

const env = await initializeTestEnvironment({
  projectId: "demo-copypasteui",
  firestore: { rules: fs.readFileSync("firestore.rules", "utf8"), host: "127.0.0.1", port: 8085 },
});
await env.withSecurityRulesDisabled(async (ctx) => {
  const d = ctx.firestore();
  await setDoc(doc(d, `staffMembers/${users.staff}`), { email: "staff@example.com", role: "staff", status: "active" });
  await setDoc(doc(d, "bookings/e2e"), {
    startsAt: new Date("2027-03-14T18:30:00Z"),
    name: "Okafor (e2e)",
    party: 2,
    phone: "07700 900789",
    status: "confirmed",
  });
});

const app = await startApp({});
const { b, page } = await browser();
try {
  const wrong = await page();
  await signIn(wrong, "/fb/sign-in", "staff@example.com", "wrong-password");
  await check("public", "sign in with a wrong password", false, async () => {
    await wrong.getByRole("alert").waitFor({ timeout: 10000 });
    return !wrong.url().includes("/fb/sign-in");
  });

  const staff = await page();
  await signIn(staff, "/fb/sign-in", "staff@example.com", password);
  await staff.waitForURL("**/fb/bookings", { timeout: 20000 });
  await check("staff", "sign in on the screen and see the bookings", true, async () => {
    await staff.getByText("Okafor (e2e)").waitFor({ timeout: 15000 });
    return true;
  });
  await check("staff", "mark a booking arrived from the screen (saved in Firestore)", true, async () => {
    await staff.getByLabel("Change status for Okafor (e2e)").selectOption("arrived");
    await staff.waitForFunction(() => document.body.dataset.saved);
    let status;
    await env.withSecurityRulesDisabled(async (ctx) => {
      status = (await getDoc(doc(ctx.firestore(), "bookings/e2e"))).data().status;
    });
    return status === "arrived";
  });

  const stranger = await page();
  await signIn(stranger, "/fb/sign-in", "stranger@example.com", password);
  await stranger.waitForURL("**/fb/bookings", { timeout: 20000 });
  await check("stranger", "see bookings after signing in (not on the team)", false, async () => {
    await stranger.waitForSelector("text=/No bookings match|Okafor/", { timeout: 15000 });
    return await stranger.getByText("Okafor (e2e)").isVisible();
  });
} finally {
  await b.close();
  app.stop();
  await env.cleanup();
}
summary("Firebase end to end");
