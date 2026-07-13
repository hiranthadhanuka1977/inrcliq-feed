import CollectionListingView from "@/components/profile/CollectionListingView";
import { getCreatorCollection } from "@/lib/collection";
import { getProfileData } from "@/lib/profile";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const profile = getProfileData(slug);
  const collection = getCreatorCollection(slug);
  if (!profile || !collection) return { title: "Collection · INRCLIQ" };
  return { title: `${collection.title} · INRCLIQ` };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const profile = getProfileData(slug);
  const collection = getCreatorCollection(slug);
  if (!profile || !collection) notFound();

  return <CollectionListingView profile={profile} collection={collection} />;
}
