// Starts the harness app and drives the admin screens in a real browser.
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { check } from "../lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
export const BASE = "http://127.0.0.1:3200";

export async function startApp(env) {
  const proc = spawn("npx", ["next", "dev", "--port", "3200", "--hostname", "127.0.0.1"], {
    cwd: here,
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  proc.stdout.on("data", (d) => (log += d));
  proc.stderr.on("data", (d) => (log += d));
  for (let i = 0; i < 120 && !/Ready in|ready started/i.test(log); i++) await new Promise((r) => setTimeout(r, 500));
  return { stop: () => proc.kill("SIGTERM"), log: () => log };
}

export async function browser() {
  const b = await chromium.launch();
  return { b, page: async () => (await b.newContext()).newPage() };
}

export async function signIn(page, url, email, password) {
  await page.goto(`${BASE}${url}`);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /^Sign in/ }).click();
}

export { check };
