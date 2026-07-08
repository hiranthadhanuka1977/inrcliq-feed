import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TARGET_AUDIO_COUNT = 50;
const MIN_GAP = 5;

const THEMES = [
  { accent_a: "120, 220, 160", accent_b: "72, 168, 118", base: ["#2a4534", "#223a2b", "#1a2e22"], border: "120, 200, 150" },
  { accent_a: "120, 180, 255", accent_b: "70, 120, 210", base: ["#1e2f4a", "#1a2840", "#141f33"], border: "110, 170, 230" },
  { accent_a: "190, 140, 255", accent_b: "130, 90, 210", base: ["#34244d", "#2b1d40", "#211633"], border: "170, 130, 230" },
  { accent_a: "255, 180, 110", accent_b: "220, 130, 70", base: ["#4a3220", "#3d2919", "#302013"], border: "230, 160, 100" },
  { accent_a: "255, 120, 140", accent_b: "200, 70, 95", base: ["#4a1f28", "#3d1921", "#30141a"], border: "230, 110, 130" },
  { accent_a: "90, 220, 210", accent_b: "50, 170, 165", base: ["#1a3f3d", "#163532", "#122a28"], border: "80, 200, 190" },
  { accent_a: "255, 140, 190", accent_b: "210, 90, 150", base: ["#4a2038", "#3d1a2f", "#301526"], border: "230, 120, 175" },
  { accent_a: "150, 170, 255", accent_b: "100, 120, 220", base: ["#252d4d", "#1f2640", "#191f33"], border: "140, 160, 240" },
  { accent_a: "255, 220, 110", accent_b: "210, 170, 60", base: ["#4a3f1a", "#3d3416", "#302912"], border: "230, 200, 90" },
  { accent_a: "110, 230, 255", accent_b: "60, 180, 220", base: ["#1a3a45", "#16303a", "#12262f"], border: "100, 210, 240" },
  { accent_a: "210, 170, 130", accent_b: "160, 120, 85", base: ["#3d3024", "#33281e", "#292018"], border: "190, 150, 110" },
  { accent_a: "180, 130, 255", accent_b: "130, 85, 210", base: ["#30204d", "#281a40", "#201433"], border: "170, 120, 240" },
  { accent_a: "140, 255, 170", accent_b: "80, 200, 120", base: ["#1f4a30", "#193d28", "#143020"], border: "120, 230, 160" },
  { accent_a: "255, 150, 100", accent_b: "220, 100, 60", base: ["#4a2818", "#3d2114", "#301a10"], border: "240, 140, 90" },
  { accent_a: "170, 190, 255", accent_b: "120, 140, 220", base: ["#282f4d", "#212740", "#1a1f33"], border: "150, 175, 240" },
];

const SHOWS = [
  { name: "Good Guy Podcast", handle: "@goodguypod", initials: "GG", color: "#6b5b4f", verified: true },
  { name: "Night Owls Radio", handle: "@nightowlsfm", initials: "NO", color: "#312e81", verified: true },
  { name: "Code & Coffee", handle: "@codeandcoffee", initials: "CC", color: "#0f766e", verified: false },
  { name: "The Daily Brief", handle: "@dailybrief", initials: "DB", color: "#b45309", verified: true },
  { name: "Vinyl Stories", handle: "@vinylstories", initials: "VS", color: "#9d174d", verified: false },
  { name: "Field Notes Audio", handle: "@fieldnotes", initials: "FN", color: "#166534", verified: true },
  { name: "Deep Dive FM", handle: "@deepdivefm", initials: "DD", color: "#1d4ed8", verified: true },
  { name: "Side Project Show", handle: "@sideproject", initials: "SP", color: "#7c2d12", verified: false },
  { name: "Morning Commute", handle: "@morningcommute", initials: "MC", color: "#0369a1", verified: true },
  { name: "Late Night Lab", handle: "@latenightlab", initials: "LN", color: "#4c1d95", verified: false },
];

const THUMBNAILS = [
  { url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80&auto=format&fit=crop", alt: "Podcast hosts in a studio" },
  { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop", alt: "DJ headphones and turntable" },
  { url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80&auto=format&fit=crop", alt: "Headphones on a desk" },
  { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80&auto=format&fit=crop", alt: "Studio mixing board" },
  { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80&auto=format&fit=crop", alt: "Live music performance" },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop", alt: "Singer with microphone" },
  { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80&auto=format&fit=crop", alt: "Concert crowd lights" },
  { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80&auto=format&fit=crop", alt: "Team recording podcast" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop", alt: "Person wearing headphones" },
  { url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80&auto=format&fit=crop", alt: "Microphone in studio" },
  { url: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&q=80&auto=format&fit=crop", alt: "Vinyl records and turntable" },
  { url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80&auto=format&fit=crop", alt: "Podcast recording session" },
  { url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&q=80&auto=format&fit=crop", alt: "Phone with headphones" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop", alt: "Microphone close-up" },
];

const EPISODE_TITLES = [
  "Building in public without burning out",
  "The future of creative work",
  "Stories from the road",
  "Why small teams ship faster",
  "A conversation on focus and flow",
  "Lessons from year three",
  "Designing for calm technology",
  "What we got wrong last season",
  "The art of the cold open",
  "Behind the scenes: episode mix",
  "Guest mix: voices from the community",
  "Late-night thoughts on discipline",
  "How we edit four hours into forty minutes",
  "Sound design secrets",
  "The case for slower media",
];

const POST_TEXTS = [
  "New episode is live — press play for the full conversation.",
  "Fresh audio just dropped. Headphones recommended.",
  "This one took a while to edit, but it was worth it. Listen now.",
  "Episode day! Tap play and let us know what you think.",
  "Long-form audio for your commute — now streaming in the feed.",
  "We recorded this one late at night and kept every honest moment.",
  "A shorter episode with a sharper point. Give it a spin.",
  "Audio-only drop — no scroll-by, just listen.",
];

const CATEGORIES = [
  "discovery",
  "technology",
  "personal",
  "science",
  "movies",
  "travel",
  "food",
  "sports",
];

const TAG_SETS = [
  ["#Podcast", "#Audio"],
  ["#Audio", "#Listen"],
  ["#Podcast", "#NewEpisode"],
  ["#LongForm", "#Audio"],
  ["#Talk", "#Audio"],
];

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(random, list) {
  return list[Math.floor(random() * list.length)];
}

function formatDuration(totalMinutes) {
  const minutes = Math.max(3, Math.min(45, totalMinutes));
  return `${minutes}:00`;
}

function formatProgressTime(durationMinutes, progress) {
  const totalSeconds = durationMinutes * 60;
  const current = Math.floor(totalSeconds * progress);
  const minutes = Math.floor(current / 60);
  const seconds = current % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function pickSpreadPositions(random, count, maxIndex, reserved) {
  const positions = new Set(reserved);
  let guard = 0;

  while (positions.size < count && guard < 20000) {
    guard += 1;
    const candidate = 1 + Math.floor(random() * Math.max(1, maxIndex - 1));
    const ok = [...positions].every((pos) => Math.abs(pos - candidate) >= MIN_GAP);
    if (ok) {
      positions.add(candidate);
    }
  }

  return [...positions].sort((a, b) => a - b);
}

function buildAudioItem(index, random) {
  const show = pick(random, SHOWS);
  const thumb = pick(random, THUMBNAILS);
  const durationMinutes = 3 + Math.floor(random() * 43);
  const progress = Number((random() * 0.35).toFixed(3));
  const theme = THEMES[index % THEMES.length];
  const episode = pick(random, EPISODE_TITLES);
  const padded = String(index).padStart(3, "0");

  return {
    id: `feed-audio-${padded}`,
    category: pick(random, CATEGORIES),
    author: {
      name: show.name,
      handle: show.handle,
      avatar_initials: show.initials,
      avatar_color: show.color,
      avatar_url: pick(random, THUMBNAILS).url.replace("w=400", "w=120"),
      verified: show.verified,
    },
    text: pick(random, POST_TEXTS),
    tags: [...pick(random, TAG_SETS)],
    media: null,
    audio: {
      title: `${show.name}: ${episode}`,
      thumbnail: thumb,
      current_time: formatProgressTime(durationMinutes, progress),
      duration: formatDuration(durationMinutes),
      progress,
      audio_url: null,
      theme,
    },
    engagement: {
      likes: 400 + Math.floor(random() * 4200),
      comments: 20 + Math.floor(random() * 280),
      shares: 5 + Math.floor(random() * 120),
    },
    relationship: {
      following: random() > 0.65,
    },
    posted_at: new Date(Date.now() - Math.floor(random() * 1000 * 60 * 60 * 24 * 21)).toISOString(),
    posted_ago: `${1 + Math.floor(random() * 14)}d`,
  };
}

const filePath = join(process.cwd(), "data", "my_feed.json");
const feed = JSON.parse(readFileSync(filePath, "utf-8"));
const random = mulberry32(20260708);

const existingAudioIndex = feed.items.findIndex((item) => item.id === "feed-audio-001");
if (existingAudioIndex === -1) {
  throw new Error("feed-audio-001 not found");
}

feed.items[existingAudioIndex].audio.theme = THEMES[0];

const newCount = TARGET_AUDIO_COUNT - 1;
const newItems = Array.from({ length: newCount }, (_, offset) => buildAudioItem(offset + 2, random));

const insertPositions = pickSpreadPositions(random, TARGET_AUDIO_COUNT, feed.items.length + newCount, [
  existingAudioIndex,
]);

const positionsToInsert = insertPositions.filter((pos) => pos !== existingAudioIndex);
positionsToInsert.sort((a, b) => b - a);

for (const [offset, position] of positionsToInsert.entries()) {
  feed.items.splice(position, 0, newItems[offset]);
}

feed.total_items = feed.items.length;
feed.description = `INRCLIQ feed dataset — ${feed.items.length} items (${TARGET_AUDIO_COUNT} audio)`;
feed.generated_at = new Date().toISOString();

writeFileSync(filePath, `${JSON.stringify(feed, null, 2)}\n`, "utf-8");

const audioCount = feed.items.filter((item) => item.audio).length;
console.log(`Updated ${filePath}`);
console.log(`Total items: ${feed.items.length}`);
console.log(`Audio items: ${audioCount}`);
