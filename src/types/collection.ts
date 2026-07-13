export type CollectionProductKind = "physical" | "digital";

export interface CollectionProductOffer {
  badge: string;
  detail: string;
  discountLabel?: string;
}

export interface CollectionProduct {
  id: string;
  kind: CollectionProductKind;
  name: string;
  price: string;
  compareAtPrice?: string;
  description: string;
  image: string;
  image_alt: string;
  rating: number;
  soldLabel: string;
  offer?: CollectionProductOffer;
}

export interface CreatorCollection {
  slug: string;
  title: string;
  subtitle: string;
  products: CollectionProduct[];
}
