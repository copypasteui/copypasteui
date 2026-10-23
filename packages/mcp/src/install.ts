import fs from "node:fs";
import path from "node:path";
import type { Component, Theme } from "./registry.js";

export type InstallResult = {
  written: string[];
  skipped: string[];
  installCommand: string | null;
  usage: string;
};

/**
 * Writes a component (and optionally a theme stylesheet) into a project folder.
 * Never overwrites an existing file unless `overwrite` is set, and never runs npm.
 */
export function installComponent(
  component: Component,
  projectDir: string,
  opts: { dir?: string | undefined; theme?: Theme | null | undefined; overwrite?: boolean | undefined } = {},
): InstallResult {
  if (!path.isAbsolute(projectDir)) throw new Error("projectDir must be an absolute path");
  if (!fs.existsSync(projectDir) || !fs.statSync(projectDir).isDirectory()) {
    throw new Error(`projectDir does not exist: ${projectDir}`);
  }
  const relDir = opts.dir ?? path.dirname(component.installPath);
  const target = path.resolve(projectDir, relDir, `${component.exportName}.tsx`);
  if (!target.startsWith(path.resolve(projectDir) + path.sep)) throw new Error("dir must stay inside projectDir");

  const written: string[] = [];
  const skipped: string[] = [];
  const write = (file: string, content: string) => {
    if (fs.existsSync(file) && !opts.overwrite) {
      skipped.push(file);
      return;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    written.push(file);
  };

  write(target, component.code);
  if (opts.theme) {
    const css = `/* CopyPasteUI theme: ${opts.theme.name}. Import this once from your global stylesheet,
   after @import "tailwindcss"; (Tailwind v4). For Tailwind v3 see ${opts.theme.shadcnUrl}. */
${opts.theme.googleFontsUrl ? `@import url("${opts.theme.googleFontsUrl}");\n` : ""}
${opts.theme.css}

${opts.theme.tailwindV4}
`;
    write(path.resolve(projectDir, path.dirname(path.relative(projectDir, target)), `theme-${opts.theme.slug}.css`), css);
  }

  const importPath = path
    .relative(projectDir, target)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "");
  return {
    written,
    skipped,
    installCommand: component.installCommand,
    usage: `import ${component.exportName} from "@/${importPath}";  // adjust to your path alias\n\n<${component.exportName} />`,
  };
}
