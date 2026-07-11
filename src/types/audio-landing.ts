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
