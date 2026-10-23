// Saving and loading the plan in the project folder; everything else lives in plan-core.
import fs from "node:fs";
import path from "node:path";
import { PLAN_FILE, type Plan } from "./plan-core.js";

export * from "./plan-core.js";

export function savePlan(projectDir: string, plan: Plan) {
  if (!path.isAbsolute(projectDir)) throw new Error("projectDir must be an absolute path");
  if (!fs.existsSync(projectDir)) throw new Error(`projectDir does not exist: ${projectDir}`);
  const file = path.join(projectDir, PLAN_FILE);
  fs.writeFileSync(file, `${JSON.stringify(plan, null, 2)}\n`);
  return file;
}

export function loadPlan(projectDir: string): Plan | null {
  const file = path.join(projectDir, PLAN_FILE);
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as Plan) : null;
}
