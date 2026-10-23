import data from "@/generated/recipes.json";

export type RecipeSummary = {
  slug: string;
  name: string;
  summary: string;
  audience: string[];
  bestFor: string;
  cost: string;
  rank: number;
  covers: "full" | "content";
  docs: { label: string; href: string }[];
  url: string;
  tested?: string;
  prompt: string;
};

/** Backend recipes for the back office, most widely used first. */
export const recipes = (data as RecipeSummary[]).map(({ prompt, ...r }) => r);
