import CollectionCheckoutView from "@/components/profile/CollectionCheckoutView";
import { getCreatorCollection } from "@/lib/collection";
import { getProfileData } from "@/lib/profile";
import { notFound } from "next/navigation";

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const profile = getProfileData(slug);
  if (!profile) return { title: "Checkout · INRCLIQ" };
  return { title: `Checkout · ${profile.name} · INRCLIQ` };
}

export default async function CollectionCheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const profile = getProfileData(slug);
  const collection = getCreatorCollection(slug);
  if (!profile || !collection) notFound();

  return <CollectionCheckoutView profile={profile} />;
}
