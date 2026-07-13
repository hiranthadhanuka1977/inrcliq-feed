import CollectionProductDetailView from "@/components/profile/CollectionProductDetailView";
import { getCollectionProduct } from "@/lib/collection";
import { getProfileData } from "@/lib/profile";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug, productId } = await params;
  const result = getCollectionProduct(slug, productId);
  if (!result) return { title: "Product · INRCLIQ" };
  return { title: `${result.product.name} · INRCLIQ` };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug, productId } = await params;
  const profile = getProfileData(slug);
  const result = getCollectionProduct(slug, productId);
  if (!profile || !result) notFound();

  return <CollectionProductDetailView profile={profile} product={result.product} />;
}
