import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { CollectionProduct, CreatorCollection } from "@/types/collection";

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

export function getCollectionProduct(
  slug: string,
  productId: string,
): { collection: CreatorCollection; product: CollectionProduct } | null {
  const collection = getCreatorCollection(slug);
  if (!collection) return null;

  const product = collection.products.find((item) => item.id === productId);
  if (!product) return null;

  return { collection, product };
}
