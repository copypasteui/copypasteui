// Starts the Firestore emulator (demo project, no login needed) and runs test.mjs inside it.
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const javaHome = process.env.JAVA_HOME ?? "/opt/homebrew/opt/openjdk";
execSync(`npx firebase emulators:exec --only firestore --project demo-copypasteui "node test.mjs"`, {
  cwd: here,
  stdio: "inherit",
  env: { ...process.env, JAVA_HOME: javaHome, PATH: `${javaHome}/bin:${process.env.PATH}` },
});
