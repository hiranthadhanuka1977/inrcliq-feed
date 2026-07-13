import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { CreatorCollection } from "@/types/collection";

const COLLECTION_FILES: Record<string, string> = {
  "mia-chen": "mia-chen-collection.json",
};

export function getCreatorCollection(slug: string): CreatorCollection | null {
  const fileName = COLLECTION_FILES[slug];
  if (!fileName) return null;

  const filePath = join(process.cwd(), "data", fileName);
  if (!existsSync(filePath)) return null;

  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CreatorCollection;
}
