// Runs before each commit (via simple-git-hooks) on the staged files only: format, lint, and validate the
// registry when something in it changed. CI runs the full checks; this just catches them earlier.
export default {
  "*.{js,mjs,ts,tsx,json,css,yml,yaml}": "prettier --write",
  "*.{js,mjs,ts,tsx}": "eslint --max-warnings 0 --fix --no-warn-ignored",
  "registry/**": () => "node scripts/build-registry.mjs --check",
};
