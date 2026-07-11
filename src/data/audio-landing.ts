import type {
  AudioChallenge,
  AudioChartCatalogEntry,
  AudioChartSocial,
  AudioChartTimeframe,
  AudioChartTrack,
  AudioChartVibe,
  AudioForYouCard,
  AudioHeroSlide,
  AudioLandingTrack,
  AudioLiveDrop,
  AudioMoodCategory,
  AudioTopCreator,
} from "@/types/audio-landing";

export const AUDIO_LANDING_TRACKS: Record<string, AudioLandingTrack> = {
  "track-fortnight": {
    id: "track-fortnight",
    type: "music",
    title: "Fortnight",
    creator: "Taylor Swift ft. Post Malone",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 228,
    progress: 0.18,
    accent: ["#7c3aed", "#db2777"],
  },
  "track-hard-fork": {
    id: "track-hard-fork",
    type: "podcast",
    title: "AI, Music & The Creator Economy",
    creator: "Hard Fork · The Verge",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 3420,
    progress: 0.41,
    progressLabel: "Ep 204 · 38m left",
    accent: ["#0f766e", "#1d4ed8"],
  },
  "track-atomic-habits": {
    id: "track-atomic-habits",
    type: "audiobook",
    title: "Atomic Habits",
    creator: "James Clear · Narrated by the author",
    thumbnail:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 19800,
    progress: 0.45,
    progressLabel: "Ch. 12 · 42m left",
    accent: ["#4338ca", "#059669"],
  },
  "track-birds": {
    id: "track-birds",
    type: "music",
    title: "Birds of a Feather",
    creator: "Billie Eilish",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 222,
    progress: 0.62,
    accent: ["#0369a1", "#7c3aed"],
  },
  "track-midnights": {
    id: "track-midnights",
    type: "music",
    title: "Midnights (3am Edition)",
    creator: "Taylor Swift",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 312,
    progress: 0,
    accent: ["#1e1b4b", "#6366f1"],
  },
  "track-rewired": {
    id: "track-rewired",
    type: "podcast",
    title: "REWIRED: Future of Work",
    creator: "INRCLIQ Originals",
    thumbnail:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 2700,
    progress: 0.12,
    progressLabel: "15m remaining",
    accent: ["#b45309", "#dc2626"],
  },
  "track-project-hail": {
    id: "track-project-hail",
    type: "audiobook",
    title: "Project Hail Mary",
    creator: "Andy Weir · Ray Porter",
    thumbnail:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&q=80&auto=format&fit=crop",
    durationSeconds: 57600,
    progress: 0.28,
    progressLabel: "Ch. 8 · 1h 12m left",
    accent: ["#1e3a8a", "#0d9488"],
  },
};

export const AUDIO_HERO_SLIDES: AudioHeroSlide[] = [
  {
    id: "hero-fortnight",
    trackId: "track-fortnight",
    type: "music",
    title: "Fortnight",
    creator: "Taylor Swift ft. Post Malone",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80&auto=format&fit=crop",
    badge: "Trending No. 1",
    friendsListening: 5,
    accent: ["#7c3aed", "#db2777"],
  },
  {
    id: "hero-hard-fork",
    trackId: "track-hard-fork",
    type: "podcast",
    title: "AI, Music & The Creator Economy",
    creator: "Hard Fork · The Verge",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80&auto=format&fit=crop",
    badge: "Top podcast today",
    friendsListening: 3,
    accent: ["#0f766e", "#1d4ed8"],
  },
  {
    id: "hero-atomic",
    trackId: "track-atomic-habits",
    type: "audiobook",
    title: "Atomic Habits",
    creator: "James Clear",
    thumbnail:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80&auto=format&fit=crop",
    badge: "Audiobook spotlight",
    friendsListening: 2,
    accent: ["#4338ca", "#059669"],
  },
];

export const AUDIO_MOOD_CATEGORIES: AudioMoodCategory[] = [
  { id: "deep-focus", label: "Deep Focus", emoji: "🧠", gradient: "linear-gradient(135deg, #4c1d95 0%, #1d4ed8 100%)" },
  { id: "trending", label: "Trending Now", emoji: "🔥", gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)" },
  { id: "chill", label: "Chill Down", emoji: "🧘", gradient: "linear-gradient(135deg, #312e81 0%, #059669 100%)" },
  { id: "workout", label: "Workout", emoji: "💪", gradient: "linear-gradient(135deg, #b91c1c 0%, #f97316 100%)" },
  { id: "commute", label: "Commute", emoji: "🚗", gradient: "linear-gradient(135deg, #b45309 0%, #ca8a04 100%)" },
  { id: "late-night", label: "Late Night", emoji: "🌙", gradient: "linear-gradient(135deg, #0f172a 0%, #4338ca 100%)" },
  { id: "storytime", label: "Storytime", emoji: "📖", gradient: "linear-gradient(135deg, #581c87 0%, #be185d 100%)" },
  { id: "live", label: "Live Sets", emoji: "🎤", gradient: "linear-gradient(135deg, #047857 0%, #2563eb 100%)" },
];

export const AUDIO_CONTINUE_ITEMS = [
  AUDIO_LANDING_TRACKS["track-hard-fork"],
  AUDIO_LANDING_TRACKS["track-atomic-habits"],
];

export const AUDIO_FOR_YOU_CARDS: AudioForYouCard[] = [
  {
    id: "fy-birds",
    trackId: "track-birds",
    type: "music",
    title: "Birds of a Feather",
    creator: "Billie Eilish",
    thumbnail: AUDIO_LANDING_TRACKS["track-birds"].thumbnail,
    likes: 4500,
    comments: 1200,
  },
  {
    id: "fy-hard-fork",
    trackId: "track-hard-fork",
    type: "podcast",
    title: "AI, Music & The Creator Economy",
    creator: "Hard Fork",
    thumbnail: AUDIO_LANDING_TRACKS["track-hard-fork"].thumbnail,
    comments: 890,
    sharedBy: { initials: "ED", color: "#166534", name: "Ed Sheeran" },
  },
  {
    id: "fy-midnights",
    trackId: "track-midnights",
    type: "music",
    title: "Midnights (3am Edition)",
    creator: "Taylor Swift",
    thumbnail: AUDIO_LANDING_TRACKS["track-midnights"].thumbnail,
    likes: 8200,
    sharedBy: { initials: "MC", color: "#0d9488", name: "Mia Chen" },
  },
  {
    id: "fy-atomic",
    trackId: "track-atomic-habits",
    type: "audiobook",
    title: "Atomic Habits",
    creator: "James Clear",
    thumbnail: AUDIO_LANDING_TRACKS["track-atomic-habits"].thumbnail,
    likes: 2100,
    comments: 340,
  },
  {
    id: "fy-rewired",
    trackId: "track-rewired",
    type: "podcast",
    title: "REWIRED: Future of Work",
    creator: "INRCLIQ Originals",
    thumbnail: AUDIO_LANDING_TRACKS["track-rewired"].thumbnail,
    likes: 640,
    comments: 210,
  },
  {
    id: "fy-hail-mary",
    trackId: "track-project-hail",
    type: "audiobook",
    title: "Project Hail Mary",
    creator: "Andy Weir",
    thumbnail: AUDIO_LANDING_TRACKS["track-project-hail"].thumbnail,
    sharedBy: { initials: "JL", color: "#8b5cf6", name: "Jennifer Lopez" },
    comments: 156,
  },
];

export const AUDIO_TOP_CREATORS: AudioTopCreator[] = [
  {
    id: "tc-billie",
    name: "Billie Eilish",
    handle: "@billieeilish",
    category: "Music",
    listeners: "12.4M monthly",
    verified: true,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=240&q=80&auto=format&fit=crop",
    initials: "BE",
    color: "#0369a1",
  },
  {
    id: "tc-hard-fork",
    name: "Hard Fork",
    handle: "@hardfork",
    category: "Podcast",
    listeners: "2.1M monthly",
    verified: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=240&q=80&auto=format&fit=crop",
    initials: "HF",
    color: "#0f766e",
  },
  {
    id: "tc-james",
    name: "James Clear",
    handle: "@jamesclear",
    category: "Audiobook",
    listeners: "890K monthly",
    verified: true,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=240&q=80&auto=format&fit=crop",
    initials: "JC",
    color: "#4338ca",
  },
  {
    id: "tc-taylor",
    name: "Taylor Swift",
    handle: "@taylorswift",
    category: "Music",
    listeners: "28.6M monthly",
    verified: true,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=240&q=80&auto=format&fit=crop",
    initials: "TS",
    color: "#1e3a5f",
  },
  {
    id: "tc-inrcliq",
    name: "INRCLIQ Originals",
    handle: "@inrcliq",
    category: "Podcast",
    listeners: "640K monthly",
    initials: "IO",
    color: "#b45309",
  },
  {
    id: "tc-andy",
    name: "Andy Weir",
    handle: "@andyweirwriter",
    category: "Audiobook",
    listeners: "510K monthly",
    verified: true,
    image: "https://images.unsplash.com/photo-1456513080880-7d93d20cc2ed?w=240&q=80&auto=format&fit=crop",
    initials: "AW",
    color: "#9f1239",
  },
];

export const AUDIO_CHALLENGES: AudioChallenge[] = [
  {
    id: "ch-60s",
    hashtag: "#60SecondPitch",
    title: "Pitch your next idea",
    description: "Record a 60-second creator pitch and tag a friend to remix it.",
    submissionsToday: 2400,
    accent: ["#0f766e", "#1d4ed8"],
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=480&q=80&auto=format&fit=crop",
  },
  {
    id: "ch-acoustic",
    hashtag: "#AcousticCover",
    title: "Strip it back",
    description: "Share an acoustic take of a song that shaped your week.",
    submissionsToday: 1860,
    accent: ["#b45309", "#9a3412"],
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=480&q=80&auto=format&fit=crop",
  },
  {
    id: "ch-chapter",
    hashtag: "#ChapterRead",
    title: "Read one chapter live",
    description: "Narrate a favorite chapter and invite listeners to discuss.",
    submissionsToday: 920,
    accent: ["#4338ca", "#0f766e"],
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=480&q=80&auto=format&fit=crop",
  },
  {
    id: "ch-hot-take",
    hashtag: "#HotTakeAudio",
    title: "One take, no edits",
    description: "Drop a raw hot take on culture, tech, or music in under 90 seconds.",
    submissionsToday: 3140,
    accent: ["#be185d", "#9f1239"],
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=480&q=80&auto=format&fit=crop",
  },
];

export const AUDIO_LIVE_DROPS: AudioLiveDrop[] = [
  {
    id: "ld-midnights",
    title: "Midnights Listening Party",
    host: "Taylor Swift",
    kind: "Album party",
    startsInMinutes: 14,
    thumbnail: AUDIO_LANDING_TRACKS["track-midnights"].thumbnail,
  },
  {
    id: "ld-hard-fork",
    title: "Hard Fork Live Q&A",
    host: "The Verge",
    kind: "Podcast Q&A",
    startsInMinutes: 47,
    thumbnail: AUDIO_LANDING_TRACKS["track-hard-fork"].thumbnail,
  },
  {
    id: "ld-habits",
    title: "Atomic Habits Book Club Room",
    host: "James Clear",
    kind: "Audiobook room",
    startsInMinutes: 92,
    thumbnail: AUDIO_LANDING_TRACKS["track-atomic-habits"].thumbnail,
  },
];

const CHART_THUMBS = {
  birds: AUDIO_LANDING_TRACKS["track-birds"].thumbnail,
  fortnight: AUDIO_LANDING_TRACKS["track-fortnight"].thumbnail,
  midnights: AUDIO_LANDING_TRACKS["track-midnights"].thumbnail,
  hardFork: AUDIO_LANDING_TRACKS["track-hard-fork"].thumbnail,
  atomic: AUDIO_LANDING_TRACKS["track-atomic-habits"].thumbnail,
  rewired: AUDIO_LANDING_TRACKS["track-rewired"].thumbnail,
  hail: AUDIO_LANDING_TRACKS["track-project-hail"].thumbnail,
  stage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80&auto=format&fit=crop",
  mic: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80&auto=format&fit=crop",
  vinyl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80&auto=format&fit=crop",
  crowd: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80&auto=format&fit=crop",
  concert: "https://images.unsplash.com/photo-1459749411175-047417675fa4?w=200&q=80&auto=format&fit=crop",
  guitar: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&q=80&auto=format&fit=crop",
  party: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80&auto=format&fit=crop",
} as const;

/** Global catalog — worldwide hits across vibes. */
const CHART_CATALOG_GLOBAL: AudioChartCatalogEntry[] = [
  {
    id: "g-birds",
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.birds,
    vibes: ["latenight", "viral"],
    metrics: { now: 84200, weekly: 18400000, alltime: 920000000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "g-fortnight",
    title: "Fortnight",
    artist: "Taylor Swift ft. Post Malone",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.fortnight,
    vibes: ["viral", "workout"],
    metrics: { now: 71800, weekly: 15200000, alltime: 1100000000 },
    trend: { now: "same", weekly: "same", alltime: "up" },
  },
  {
    id: "g-midnights",
    title: "Midnights (3am Edition)",
    artist: "Taylor Swift",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.midnights,
    vibes: ["latenight", "focus"],
    metrics: { now: 56400, weekly: 12800000, alltime: 780000000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "g-cruel",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.stage,
    vibes: ["workout", "viral"],
    metrics: { now: 49200, weekly: 9600000, alltime: 2100000000 },
    trend: { now: "down", weekly: "down", alltime: "same" },
  },
  {
    id: "g-espresso",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.mic,
    vibes: ["viral", "workout"],
    metrics: { now: 88100, weekly: 8700000, alltime: 640000000 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "g-goodluck",
    title: "Good Luck, Babe!",
    artist: "Chappell Roan",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.vinyl,
    vibes: ["viral", "latenight"],
    metrics: { now: 45300, weekly: 7400000, alltime: 410000000 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "g-die",
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.crowd,
    vibes: ["latenight", "focus"],
    metrics: { now: 39800, weekly: 6900000, alltime: 520000000 },
    trend: { now: "same", weekly: "same", alltime: "up" },
  },
  {
    id: "g-please",
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.concert,
    vibes: ["viral", "workout"],
    metrics: { now: 36100, weekly: 6100000, alltime: 380000000 },
    trend: { now: "down", weekly: "down", alltime: "same" },
  },
  {
    id: "g-bar",
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.guitar,
    vibes: ["workout", "viral"],
    metrics: { now: 33400, weekly: 5400000, alltime: 890000000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "g-help",
    title: "I Had Some Help",
    artist: "Post Malone ft. Morgan Wallen",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.party,
    vibes: ["workout", "viral"],
    metrics: { now: 28900, weekly: 4800000, alltime: 610000000 },
    trend: { now: "same", weekly: "same", alltime: "up" },
  },
  {
    id: "g-hardfork",
    title: "AI, Music & The Creator Economy",
    artist: "Hard Fork · The Verge",
    trackId: "track-hard-fork",
    thumbnail: CHART_THUMBS.hardFork,
    vibes: ["focus"],
    metrics: { now: 12400, weekly: 2100000, alltime: 48000000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "g-atomic",
    title: "Atomic Habits",
    artist: "James Clear",
    trackId: "track-atomic-habits",
    thumbnail: CHART_THUMBS.atomic,
    vibes: ["focus", "workout"],
    metrics: { now: 9800, weekly: 1800000, alltime: 220000000 },
    trend: { now: "same", weekly: "up", alltime: "up" },
  },
];

/** Friends catalog — what your circle is looping. */
const CHART_CATALOG_FRIENDS: AudioChartCatalogEntry[] = [
  {
    id: "f-midnights",
    title: "Midnights (3am Edition)",
    artist: "Taylor Swift",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.midnights,
    vibes: ["latenight", "focus"],
    metrics: { now: 48, weekly: 1260, alltime: 18400 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "f-birds",
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.birds,
    vibes: ["latenight", "viral"],
    metrics: { now: 41, weekly: 980, alltime: 15200 },
    trend: { now: "up", weekly: "same", alltime: "up" },
  },
  {
    id: "f-rewired",
    title: "REWIRED: Future of Work",
    artist: "INRCLIQ Originals",
    trackId: "track-rewired",
    thumbnail: CHART_THUMBS.rewired,
    vibes: ["focus"],
    metrics: { now: 36, weekly: 740, alltime: 6200 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "f-fortnight",
    title: "Fortnight",
    artist: "Taylor Swift ft. Post Malone",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.fortnight,
    vibes: ["viral", "workout"],
    metrics: { now: 29, weekly: 690, alltime: 22100 },
    trend: { now: "down", weekly: "down", alltime: "same" },
  },
  {
    id: "f-atomic",
    title: "Atomic Habits",
    artist: "James Clear",
    trackId: "track-atomic-habits",
    thumbnail: CHART_THUMBS.atomic,
    vibes: ["focus", "workout"],
    metrics: { now: 27, weekly: 610, alltime: 9800 },
    trend: { now: "same", weekly: "up", alltime: "up" },
  },
  {
    id: "f-hail",
    title: "Project Hail Mary",
    artist: "Andy Weir · Ray Porter",
    trackId: "track-project-hail",
    thumbnail: CHART_THUMBS.hail,
    vibes: ["focus", "latenight"],
    metrics: { now: 22, weekly: 480, alltime: 5400 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "f-hardfork",
    title: "AI, Music & The Creator Economy",
    artist: "Hard Fork · The Verge",
    trackId: "track-hard-fork",
    thumbnail: CHART_THUMBS.hardFork,
    vibes: ["focus"],
    metrics: { now: 19, weekly: 420, alltime: 7100 },
    trend: { now: "same", weekly: "same", alltime: "up" },
  },
  {
    id: "f-espresso",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.mic,
    vibes: ["viral", "workout"],
    metrics: { now: 34, weekly: 560, alltime: 8900 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "f-goodluck",
    title: "Good Luck, Babe!",
    artist: "Chappell Roan",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.vinyl,
    vibes: ["viral", "latenight"],
    metrics: { now: 17, weekly: 390, alltime: 4300 },
    trend: { now: "up", weekly: "same", alltime: "up" },
  },
  {
    id: "f-cruel",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.stage,
    vibes: ["workout", "viral"],
    metrics: { now: 14, weekly: 310, alltime: 19600 },
    trend: { now: "down", weekly: "down", alltime: "same" },
  },
  {
    id: "f-die",
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.crowd,
    vibes: ["latenight", "focus"],
    metrics: { now: 12, weekly: 280, alltime: 3600 },
    trend: { now: "same", weekly: "up", alltime: "up" },
  },
  {
    id: "f-bar",
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.guitar,
    vibes: ["workout", "viral"],
    metrics: { now: 11, weekly: 250, alltime: 5100 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
];

/** Colombo catalog — local Sri Lanka relevance. */
const CHART_CATALOG_COLOMBO: AudioChartCatalogEntry[] = [
  {
    id: "c-espresso",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.mic,
    vibes: ["viral", "workout"],
    metrics: { now: 6200, weekly: 410000, alltime: 8200000 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "c-birds",
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.birds,
    vibes: ["latenight", "viral"],
    metrics: { now: 5400, weekly: 380000, alltime: 12400000 },
    trend: { now: "up", weekly: "same", alltime: "up" },
  },
  {
    id: "c-fortnight",
    title: "Fortnight",
    artist: "Taylor Swift ft. Post Malone",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.fortnight,
    vibes: ["viral", "workout"],
    metrics: { now: 4800, weekly: 350000, alltime: 18600000 },
    trend: { now: "same", weekly: "down", alltime: "same" },
  },
  {
    id: "c-midnights",
    title: "Midnights (3am Edition)",
    artist: "Taylor Swift",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.midnights,
    vibes: ["latenight", "focus"],
    metrics: { now: 4100, weekly: 290000, alltime: 9800000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "c-goodluck",
    title: "Good Luck, Babe!",
    artist: "Chappell Roan",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.vinyl,
    vibes: ["viral", "latenight"],
    metrics: { now: 3900, weekly: 260000, alltime: 5400000 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "c-cruel",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.stage,
    vibes: ["workout", "viral"],
    metrics: { now: 3200, weekly: 240000, alltime: 22100000 },
    trend: { now: "down", weekly: "same", alltime: "same" },
  },
  {
    id: "c-rewired",
    title: "REWIRED: Future of Work",
    artist: "INRCLIQ Originals",
    trackId: "track-rewired",
    thumbnail: CHART_THUMBS.rewired,
    vibes: ["focus"],
    metrics: { now: 2800, weekly: 180000, alltime: 2100000 },
    trend: { now: "up", weekly: "up", alltime: "up" },
  },
  {
    id: "c-please",
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    trackId: "track-birds",
    thumbnail: CHART_THUMBS.concert,
    vibes: ["viral", "workout"],
    metrics: { now: 2500, weekly: 160000, alltime: 4300000 },
    trend: { now: "same", weekly: "down", alltime: "up" },
  },
  {
    id: "c-die",
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    trackId: "track-fortnight",
    thumbnail: CHART_THUMBS.crowd,
    vibes: ["latenight", "focus"],
    metrics: { now: 2200, weekly: 145000, alltime: 6100000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
  {
    id: "c-atomic",
    title: "Atomic Habits",
    artist: "James Clear",
    trackId: "track-atomic-habits",
    thumbnail: CHART_THUMBS.atomic,
    vibes: ["focus", "workout"],
    metrics: { now: 1900, weekly: 120000, alltime: 3800000 },
    trend: { now: "same", weekly: "up", alltime: "up" },
  },
  {
    id: "c-bar",
    title: "A Bar Song (Tipsy)",
    artist: "Shaboozey",
    trackId: "track-midnights",
    thumbnail: CHART_THUMBS.guitar,
    vibes: ["workout", "viral"],
    metrics: { now: 1700, weekly: 98000, alltime: 5200000 },
    trend: { now: "up", weekly: "same", alltime: "up" },
  },
  {
    id: "c-hardfork",
    title: "AI, Music & The Creator Economy",
    artist: "Hard Fork · The Verge",
    trackId: "track-hard-fork",
    thumbnail: CHART_THUMBS.hardFork,
    vibes: ["focus"],
    metrics: { now: 1400, weekly: 86000, alltime: 1600000 },
    trend: { now: "up", weekly: "up", alltime: "same" },
  },
];

const CHART_CATALOGS: Record<AudioChartSocial, AudioChartCatalogEntry[]> = {
  global: CHART_CATALOG_GLOBAL,
  friends: CHART_CATALOG_FRIENDS,
  colombo: CHART_CATALOG_COLOMBO,
};

export const AUDIO_CHART_SOCIAL_OPTIONS: { id: AudioChartSocial; label: string }[] = [
  { id: "global", label: "Global" },
  { id: "friends", label: "Friends" },
  { id: "colombo", label: "Colombo" },
];

export const AUDIO_CHART_TIMEFRAME_OPTIONS: { id: AudioChartTimeframe; label: string }[] = [
  { id: "now", label: "Right Now" },
  { id: "weekly", label: "Weekly" },
  { id: "alltime", label: "All-Time" },
];

export const AUDIO_CHART_VIBE_OPTIONS: { id: AudioChartVibe; label: string }[] = [
  { id: "all", label: "All Vibes" },
  { id: "workout", label: "Workout" },
  { id: "focus", label: "Focus" },
  { id: "latenight", label: "Late Night" },
  { id: "viral", label: "Viral on Feed" },
];

export function getChartMetricLabel(timeframe: AudioChartTimeframe, social: AudioChartSocial): string {
  if (timeframe === "now") {
    return social === "friends" ? "loops/hr" : "plays/hr";
  }
  if (timeframe === "weekly") return "plays";
  return "plays";
}

export function getChartSubtitle(
  social: AudioChartSocial,
  timeframe: AudioChartTimeframe,
  vibe: AudioChartVibe,
): string {
  const socialLabel =
    social === "global" ? "Worldwide" : social === "friends" ? "Your circle" : "Top in Colombo";
  const timeLabel =
    timeframe === "now" ? "spiking this hour" : timeframe === "weekly" ? "this week" : "all-time hits";
  const vibeLabel =
    vibe === "all"
      ? null
      : AUDIO_CHART_VIBE_OPTIONS.find((option) => option.id === vibe)?.label ?? null;
  return vibeLabel ? `${socialLabel} · ${timeLabel} · ${vibeLabel}` : `${socialLabel} · ${timeLabel}`;
}

export function getTopChart(
  social: AudioChartSocial = "global",
  timeframe: AudioChartTimeframe = "weekly",
  vibe: AudioChartVibe = "all",
): AudioChartTrack[] {
  const catalog = CHART_CATALOGS[social];
  const byMetric = (a: AudioChartCatalogEntry, b: AudioChartCatalogEntry) =>
    b.metrics[timeframe] - a.metrics[timeframe];

  let ranked: AudioChartCatalogEntry[];

  if (vibe === "all") {
    ranked = [...catalog].sort(byMetric);
  } else {
    const matching = catalog.filter((entry) => entry.vibes.includes(vibe)).sort(byMetric);
    const matchingIds = new Set(matching.map((entry) => entry.id));
    const fillers = catalog.filter((entry) => !matchingIds.has(entry.id)).sort(byMetric);
    ranked = [...matching, ...fillers];
  }

  return ranked.slice(0, 10).map((entry, index) => ({
    id: `${social}-${timeframe}-${vibe}-${entry.id}`,
    rank: index + 1,
    title: entry.title,
    artist: entry.artist,
    plays: entry.metrics[timeframe],
    trend: entry.trend[timeframe],
    trackId: entry.trackId,
    thumbnail: entry.thumbnail,
  }));
}

/** Default weekly global chart (back-compat). */
export const AUDIO_TOP_CHART: AudioChartTrack[] = getTopChart("global", "weekly", "all");

export const DEFAULT_AUDIO_TRACK_ID = "track-fortnight";
