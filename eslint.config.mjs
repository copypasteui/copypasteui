// One lint setup for the whole monorepo: Next.js's own rules (React, hooks, accessibility, Next) for the
// site and the registry sections, typescript-eslint for the MCP, plain recommended rules for Node scripts.
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/dist/**",
    "**/coverage/**",
    "apps/web/src/generated/**",
    "apps/web/public/**",
    "apps/web/next-env.d.ts",
    "packages/mcp/data/**",
    "tests/recipes/harness/**",
    "**/* [0-9].*",
  ]),

  // Site and registry sections: React + Next.
  {
    files: ["apps/web/**/*.{ts,tsx,js,mjs}", "registry/**/*.tsx"],
    extends: [nextVitals, nextTs],
    settings: { next: { rootDir: "apps/web" } },
    rules: {
      // Reading browser-only values (saved choices, the clock, media queries) in an effect after hydration is
      // deliberate: the site is a static export, so the server HTML can't know them.
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Registry sections are installed into any React project, not only Next.js: plain <img> and <a> are right.
  {
    files: ["registry/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // MCP server and CLI.
  {
    files: ["packages/mcp/src/**/*.ts"],
    extends: [tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },

  // Node scripts and tests. The browser-driving tests pass functions to page.evaluate, which run in the page.
  {
    files: ["scripts/**/*.mjs", "packages/mcp/test/**/*.mjs", "tests/**/*.mjs", "apps/web/scripts/**/*.mjs", "*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["tests/recipes/**/e2e*.mjs", "apps/web/scripts/**/*.mjs"],
    languageOptions: { globals: { ...globals.browser } },
  },

  // Everywhere: leaving out fields with a rest pattern ({ code, ...summary }) is how we drop them.
  { files: ["**/*.{js,mjs}"], rules: { "no-unused-vars": ["error", { ignoreRestSiblings: true }] } },
  { files: ["**/*.{ts,tsx}"], rules: { "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }] } },
]);
