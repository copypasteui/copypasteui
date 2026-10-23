// Starts the Firestore and Auth emulators (demo project, no login) and runs e2e-inner.mjs inside them.
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "../harness/prepare.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const javaHome = process.env.JAVA_HOME ?? "/opt/homebrew/opt/openjdk";
execSync(`npx firebase emulators:exec --only firestore,auth --project demo-copypasteui "node e2e-inner.mjs"`, {
  cwd: here,
  stdio: "inherit",
  env: { ...process.env, JAVA_HOME: javaHome, PATH: `${javaHome}/bin:${process.env.PATH}` },
});
