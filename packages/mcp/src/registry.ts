// Reads the CopyPasteUI registry. There is no backend: the registry is a set of static
// JSON files published with the website (https://copypasteui.dev/r/…). This module fetches
// them, caches them on disk, and falls back to the snapshot bundled in this package when
// offline. COPYPASTEUI_REGISTRY can point at another URL or at a local folder (e.g. a
// contributor's checkout: <repo>/apps/web/public/r).

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { componentSearchText, rank } from "./rank.js";

export type Author = { name: string; github?: string };

export type ComponentSummary = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: Author;
  /** "PolyForm-Shield-1.0.0" (default) or an open licence the contributor chose. */
  license?: string;
  createdAt: string;
  featured: boolean;
  collection: string | null;
  theme: string;
  dependencies: Record<string, string>;
  exportName: string;
  url: string;
  previewUrl: string;
  thumbnailUrl: string;
  ogImageUrl: string;
  installPath: string;
  installCommand: string | null;
  shadcnUrl: string;
};
export type Component = ComponentSummary & { code: string; prompt: string };

export type ThemeSummary = {
  slug: string;
  name: string;
  description: string;
  author: Author;
  license?: string;
  default?: boolean;
  radius: string;
  fonts: { sans: string; display: string; googleFonts?: string[] };
  light: Record<string, string>;
  dark: Record<string, string>;
  googleFontsUrl: string | null;
  shadcnUrl: string;
  thumbnailUrl: string;
  ogImageUrl: string;
};
export type Theme = ThemeSummary & { css: string; tailwindV4: string; tailwindV3: string; promptBlock: string };

export type TemplateSummary = {
  slug: string;
  name: string;
  description: string;
  /** The kinds of business it fits, e.g. "a plumber, electrician or handyman". */
  brief?: string;
  theme: string;
  sections: string[];
  url: string;
  thumbnailUrl: string;
  fullPageImageUrl: string;
  ogImageUrl: string;
};
export type Template = TemplateSummary & { prompt: string };

export type RecipeSummary = {
  slug: string;
  name: string;
  summary: string;
  audience: string[];
  bestFor: string;
  cost: string;
  /** 1 = the most widely used choice. */
  rank: number;
  /** "full": data, sign-in and access rules. "content": public content only. */
  covers: "full" | "content";
  docs: { label: string; href: string }[];
  /** How and when it was run end to end, if it has been. */
  tested?: string;
  url: string;
};
export type Recipe = RecipeSummary & { body: string; prompt: string };

export type Index = {
  name: string;
  version: string;
  site: string;
  defaultTheme: string;
  categories: { slug: string; name: string; count: number }[];
  components: ComponentSummary[];
  themes: ThemeSummary[];
  templates: TemplateSummary[];
};

type Snapshot = Omit<Index, "components" | "themes" | "templates"> & {
  components: Component[];
  themes: Theme[];
  templates: Template[];
  recipes?: Recipe[];
};

const DEFAULT_SOURCE = "https://copypasteui.dev/r";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

const here = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_FILE = path.join(here, "..", "data", "registry.json");

export class Registry {
  readonly source: string;
  private readonly isRemote: boolean;
  private readonly cacheDir: string;
  private snapshot: Snapshot | null = null;
  private index: Index | null = null;
  /** Where the index came from, for diagnostics: "remote", "cache", "local" or "snapshot". */
  origin: string = "unknown";

  constructor(source = process.env.COPYPASTEUI_REGISTRY || DEFAULT_SOURCE, cacheDir?: string) {
    this.source = source.replace(/\/+$/, "");
    this.isRemote = /^https?:\/\//.test(this.source);
    this.cacheDir = cacheDir ?? path.join(process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache"), "copypasteui");
  }

  private loadSnapshot(): Snapshot {
    if (!this.snapshot) this.snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_FILE, "utf8")) as Snapshot;
    return this.snapshot;
  }

  private cacheFile(rel: string) {
    const key = Buffer.from(this.source).toString("base64url").slice(0, 32);
    return path.join(this.cacheDir, key, rel);
  }

  private async fetchJson<T>(rel: string): Promise<{ data: T; origin: string }> {
    if (!this.isRemote) {
      return { data: JSON.parse(fs.readFileSync(path.join(this.source, rel), "utf8")) as T, origin: "local" };
    }
    const cached = this.cacheFile(rel);
    try {
      const st = fs.statSync(cached);
      if (Date.now() - st.mtimeMs < CACHE_TTL_MS) {
        return { data: JSON.parse(fs.readFileSync(cached, "utf8")) as T, origin: "cache" };
      }
    } catch {
      // no cache yet
    }
    try {
      const res = await fetch(`${this.source}/${rel}`, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as T;
      try {
        fs.mkdirSync(path.dirname(cached), { recursive: true });
        fs.writeFileSync(cached, JSON.stringify(data));
      } catch {
        // cache is best-effort
      }
      return { data, origin: "remote" };
    } catch (err) {
      // Stale cache beats nothing.
      if (fs.existsSync(cached)) {
        return { data: JSON.parse(fs.readFileSync(cached, "utf8")) as T, origin: "cache (stale)" };
      }
      throw err;
    }
  }

  async getIndex(): Promise<Index> {
    if (this.index) return this.index;
    try {
      const { data, origin } = await this.fetchJson<Index>("index.json");
      this.index = data;
      this.origin = origin;
    } catch {
      const snap = this.loadSnapshot();
      this.index = {
        ...snap,
        components: snap.components.map(({ code, prompt, ...c }) => c),
        themes: snap.themes.map(({ css, tailwindV4, tailwindV3, promptBlock, ...t }) => t),
        templates: snap.templates.map(({ prompt, ...t }) => t),
      };
      this.origin = "snapshot";
    }
    return this.index;
  }

  private async getItem<T extends { slug: string }>(kind: "components" | "themes" | "templates", slug: string): Promise<T | null> {
    const index = await this.getIndex();
    if (!(index[kind] as { slug: string }[]).some((x) => x.slug === slug)) return null;
    if (this.origin !== "snapshot") {
      try {
        return (await this.fetchJson<T>(`${kind}/${slug}.json`)).data;
      } catch {
        // fall through to the bundled snapshot
      }
    }
    return (this.loadSnapshot()[kind] as unknown as T[]).find((x) => x.slug === slug) ?? null;
  }

  getComponent(slug: string) {
    return this.getItem<Component>("components", slug);
  }
  getTheme(slug: string) {
    return this.getItem<Theme>("themes", slug);
  }
  getTemplate(slug: string) {
    return this.getItem<Template>("templates", slug);
  }

  /** Backend recipes for the back office, most widely used first. */
  async getRecipes(): Promise<RecipeSummary[]> {
    try {
      return (await this.fetchJson<RecipeSummary[]>("recipes/index.json")).data;
    } catch {
      return (this.loadSnapshot().recipes ?? []).map(({ body, prompt, ...r }) => r);
    }
  }

  async getRecipe(slug: string): Promise<Recipe | null> {
    if (!(await this.getRecipes()).some((r) => r.slug === slug)) return null;
    try {
      return (await this.fetchJson<Recipe>(`recipes/${slug}.json`)).data;
    } catch {
      return this.loadSnapshot().recipes?.find((r) => r.slug === slug) ?? null;
    }
  }
}

/** Lightweight relevance search over name, tags, category and description. */
/**
 * Same ranking as the website's ⌘K and Sections search (rank.ts), ties in registry order like the site.
 * With no query: featured first, then newest. AI clients send long phrases, so when nothing matches every
 * word the closest matches come back instead of nothing.
 */
export function searchComponents(
  items: ComponentSummary[],
  opts: { query?: string | undefined; category?: string | undefined; tag?: string | undefined; limit?: number | undefined },
): ComponentSummary[] {
  const pool = items.filter((c) => (!opts.category || c.category === opts.category) && (!opts.tag || c.tags.includes(opts.tag)));
  const found = opts.query?.trim()
    ? rank(pool, opts.query, (c) => ({ name: c.name, slug: c.slug, text: componentSearchText(c) }), { partial: true })
    : [...pool].sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt));
  return found.slice(0, opts.limit ?? 10);
}

export function withTheme(prompt: string, theme: Theme | null): string {
  return prompt.replace("{{THEME}}", theme ? theme.promptBlock : "");
}
