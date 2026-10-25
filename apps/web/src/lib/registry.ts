import data from "@/generated/registry.json";

export type Author = { name: string; github?: string };
/** The 14 colour tokens every theme defines (the registry validator enforces it). */
export type ThemeColors = Record<
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "border"
  | "ring",
  string
>;
export type ComponentItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: Author;
  license: string;
  createdAt: string;
  featured: boolean;
  collection: string | null;
  theme: string;
  usesPhotos: boolean;
  dependencies: Record<string, string>;
  exportName: string;
  installPath: string;
  installCommand: string | null;
  shadcnUrl: string;
  /** Preview images are links (cdn.copypasteui.dev or the contributor's own host), never files in the repo. */
  thumbnailUrl: string;
  previewVideoUrl: string | null;
  code: string;
  prompt: string;
};
export type ComponentSummary = Omit<ComponentItem, "code" | "prompt">;
export type ThemeItem = {
  slug: string;
  name: string;
  description: string;
  author: Author;
  license: string;
  default?: boolean;
  radius: string;
  style: {
    label?: string;
    shadow: "soft" | "hard" | "clay" | "neu" | "tactile" | "none";
    border: string;
    surface: "solid" | "glass" | "liquid";
    texture: "none" | "grain" | "dots" | "grid";
    motion: "none" | "subtle" | "lively";
    headingWeight: "default" | "400" | "500" | "600" | "700";
    headingTracking: "default" | "tight" | "tighter";
    headingSize: "default" | "large" | "xl";
    buttons: "default" | "pill";
  };
  styleVars: Record<string, string>;
  styleRules: string;
  fonts: { sans: string; display: string; googleFonts?: string[] };
  light: ThemeColors;
  dark: ThemeColors;
  googleFontsUrl: string | null;
  css: string;
  tailwindV4: string;
  tailwindV3: string;
  promptBlock: string;
  shadcnUrl: string;
  thumbnailUrl: string;
};
export type TemplateItem = {
  slug: string;
  name: string;
  description: string;
  brief?: string;
  theme: string;
  sections: string[];
  author: Author;
  isCollection: boolean;
  thumbnailUrl: string;
  fullPageImageUrl: string;
  previewVideoUrl: string | null;
  prompt: string;
};
export type Category = { slug: string; name: string; count: number };

const registry = data as unknown as {
  defaultTheme: string;
  categories: Category[];
  components: ComponentItem[];
  themes: ThemeItem[];
  templates: TemplateItem[];
};

export const categories = registry.categories;
export const components = registry.components;
export const themes = registry.themes;
export const templates = registry.templates;
export const defaultTheme = registry.defaultTheme;

export const summarize = ({ code, prompt, ...rest }: ComponentItem): ComponentSummary => rest;
export const getComponent = (slug: string) => components.find((c) => c.slug === slug);
export const getTheme = (slug: string) => themes.find((t) => t.slug === slug);
export const getTemplate = (slug: string) => templates.find((t) => t.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const withTheme = (prompt: string, theme?: ThemeItem) => prompt.replace("{{THEME}}", theme?.promptBlock ?? "");

/** Minimal theme data the preview iframe needs (keeps client bundles small). */
export const themeTokens = themes.map((t) => ({
  slug: t.slug,
  name: t.name,
  radius: t.radius,
  styleVars: t.styleVars,
  styleRules: t.styleRules,
  fonts: t.fonts,
  light: t.light,
  dark: t.dark,
  googleFontsUrl: t.googleFontsUrl,
}));
export type ThemeTokens = (typeof themeTokens)[number];
