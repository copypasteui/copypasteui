// Copies the real admin screens from the registry and the Supabase recipe's /admin protection code
// into the harness app, so the end-to-end tests run exactly what users get.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, recipeBlocks } from "../lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.join(here, "components"), { recursive: true });
for (const [slug, file] of [
  ["admin-sign-in", "AdminSignIn"],
  ["admin-bookings", "AdminBookings"],
]) {
  fs.copyFileSync(path.join(ROOT, "registry/components/admin", slug, "component.tsx"), path.join(here, "components", `${file}.tsx`));
}
const middleware = recipeBlocks("supabase", "ts").find((b) => b.includes("createServerClient"));
if (!middleware) throw new Error("No middleware block in the Supabase recipe");
// Next.js 16 renamed middleware.ts to proxy.ts (export "proxy"); middleware.ts still works. Test either.
fs.rmSync(path.join(here, "middleware.ts"), { force: true });
fs.rmSync(path.join(here, "proxy.ts"), { force: true });
if (process.env.HARNESS_PROXY)
  fs.writeFileSync(
    path.join(here, "proxy.ts"),
    middleware.replace("export async function middleware", "export async function proxy").replace("// middleware.ts", "// proxy.ts"),
  );
else fs.writeFileSync(path.join(here, "middleware.ts"), middleware);
fs.writeFileSync(
  path.join(here, "..", "firebase", "firestore.rules"),
  recipeBlocks("firebase").find((b) => b.startsWith("rules_version")),
);
