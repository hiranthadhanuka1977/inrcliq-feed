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
