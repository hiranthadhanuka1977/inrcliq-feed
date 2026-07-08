import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLACEMENTS = new Map([
  [
    "photo-1614680376573-df3480a0bf6b",
    "photo-1607746882042-944635dfe10e",
  ],
  [
    "photo-1485579149621-3123dd97980f",
    "photo-1619983081563-430f63602796",
  ],
  [
    "photo-1508700115892-45ecd5ae2fce",
    "photo-1493225457124-a3eb161ffa5f",
  ],
  [
    "photo-1478737270239-2f5b9a37dd67",
    "photo-1518609878373-06d740f60d8b",
  ],
  [
    "photo-1611339555312-8f4467b0e6a9",
    "photo-1423666639041-f56000c27a9a",
  ],
]);

function replaceBrokenUrl(url) {
  if (!url) {
    return url;
  }

  let next = url;
  for (const [broken, replacement] of REPLACEMENTS) {
    next = next.replace(broken, replacement);
  }
  return next;
}

const filePath = join(process.cwd(), "data", "my_feed.json");
const feed = JSON.parse(readFileSync(filePath, "utf-8"));

let thumbnailUpdates = 0;
let avatarUpdates = 0;

for (const item of feed.items) {
  if (!item.audio) {
    continue;
  }

  const nextThumbnailUrl = replaceBrokenUrl(item.audio.thumbnail.url);
  if (nextThumbnailUrl !== item.audio.thumbnail.url) {
    item.audio.thumbnail.url = nextThumbnailUrl;
    thumbnailUpdates += 1;
  }

  if (item.author.avatar_url) {
    const nextAvatarUrl = replaceBrokenUrl(item.author.avatar_url);
    if (nextAvatarUrl !== item.author.avatar_url) {
      item.author.avatar_url = nextAvatarUrl;
      avatarUpdates += 1;
    }
  }
}

writeFileSync(filePath, `${JSON.stringify(feed, null, 2)}\n`, "utf-8");

console.log(`Patched ${filePath}`);
console.log(`Thumbnail updates: ${thumbnailUpdates}`);
console.log(`Avatar updates: ${avatarUpdates}`);
