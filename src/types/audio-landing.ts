export type AudioContentType = "music" | "podcast" | "audiobook";

export type AudioLandingFilter = "all" | AudioContentType;

export interface AudioLandingTrack {
  id: string;
  type: AudioContentType;
  title: string;
  creator: string;
  thumbnail: string;
  durationSeconds: number;
  progress: number;
  progressLabel?: string;
  accent: [string, string];
}

export interface AudioHeroSlide {
  id: string;
  type: AudioContentType;
  title: string;
  creator: string;
  thumbnail: string;
  badge: string;
  friendsListening: number;
  accent: [string, string];
  trackId: string;
}

export interface AudioMoodCategory {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
}

export interface AudioForYouCard {
  id: string;
  type: AudioContentType;
  title: string;
  creator: string;
  thumbnail: string;
  trackId: string;
  likes?: number;
  comments?: number;
  sharedBy?: {
    initials: string;
    color: string;
    name: string;
  };
}

export interface AudioTopCreator {
  id: string;
  name: string;
  handle: string;
  category: string;
  listeners: string;
  verified?: boolean;
  image?: string;
  initials: string;
  color: string;
}

export interface AudioChallenge {
  id: string;
  hashtag: string;
  title: string;
  description: string;
  submissionsToday: number;
  accent: [string, string];
  thumbnail: string;
}

export interface AudioLiveDrop {
  id: string;
  title: string;
  host: string;
  kind: string;
  startsInMinutes: number;
  thumbnail: string;
}

export type AudioChartSocial = "global" | "friends" | "colombo";
export type AudioChartTimeframe = "now" | "weekly" | "alltime";
export type AudioChartVibe = "all" | "workout" | "focus" | "latenight" | "viral";

export interface AudioChartTrack {
  id: string;
  rank: number;
  title: string;
  artist: string;
  plays: number;
  trend: "up" | "down" | "same";
  trackId: string;
  thumbnail: string;
}

/** Source row used to derive ranked charts per social / timeframe / vibe. */
export interface AudioChartCatalogEntry {
  id: string;
  title: string;
  artist: string;
  trackId: string;
  thumbnail: string;
  vibes: Exclude<AudioChartVibe, "all">[];
  metrics: {
    now: number;
    weekly: number;
    alltime: number;
  };
  trend: {
    now: "up" | "down" | "same";
    weekly: "up" | "down" | "same";
    alltime: "up" | "down" | "same";
  };
}
