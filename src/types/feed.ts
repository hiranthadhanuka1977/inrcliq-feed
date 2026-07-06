export interface FeedAuthor {
  name: string;
  handle: string;
  avatar_initials: string;
  avatar_color: string;
  avatar_url: string | null;
  verified: boolean;
}

export interface FeedImage {
  url: string;
  alt: string;
}

export interface FeedMedia {
  type: "image" | "collage";
  images: FeedImage[];
}

export interface FeedEngagement {
  likes: number;
  comments: number;
  shares: number;
}

export interface FeedRelationship {
  following: boolean;
}

export interface FeedItem {
  id: string;
  category: string;
  author: FeedAuthor;
  text: string;
  tags: string[];
  media: FeedMedia | null;
  engagement: FeedEngagement;
  relationship: FeedRelationship;
  posted_at: string;
  posted_ago: string;
  members_only?: boolean;
}

export interface FeedData {
  version: string;
  description: string;
  generated_at: string;
  total_items: number;
  categories: string[];
  items: FeedItem[];
}
