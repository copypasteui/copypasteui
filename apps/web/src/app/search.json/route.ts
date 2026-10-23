import { searchIndex } from "@/lib/search";

// Static export: written to /search.json at build time.
export const dynamic = "force-static";

export function GET() {
  return Response.json(searchIndex());
}
