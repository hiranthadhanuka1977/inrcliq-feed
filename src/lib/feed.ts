import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FeedData } from "@/types/feed";

export function getFeedData(): FeedData {
  const filePath = join(process.cwd(), "data", "my_feed.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as FeedData;
}
