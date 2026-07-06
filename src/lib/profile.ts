import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ProfileData } from "@/types/profile";

const PROFILE_FILES: Record<string, string> = {
  "mia-chen": "mia-chen.json",
  "dev-weekly": "dev-weekly.json",
  "hiran": "hiran.json",
  "planet-unfolded": "planet-unfolded.json",
};

export function getProfileData(slug: string): ProfileData | null {
  const fileName = PROFILE_FILES[slug];
  if (!fileName) return null;

  const filePath = join(process.cwd(), "data", fileName);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ProfileData;
}
