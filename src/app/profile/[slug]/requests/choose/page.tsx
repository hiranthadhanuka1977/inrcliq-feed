import ProfileRequestsView from "@/components/profile/ProfileRequestsView";
import { getProfileData } from "@/lib/profile";
import { notFound } from "next/navigation";

interface RequestsChoosePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; service?: string }>;
}

export async function generateMetadata({ params }: RequestsChoosePageProps) {
  const { slug } = await params;
  const profile = getProfileData(slug);
  if (!profile?.special_requests) return { title: "Choose your experience · INRCLIQ" };
  return { title: `Choose your experience · ${profile.name} · INRCLIQ` };
}

export default async function RequestsChoosePage({
  params,
  searchParams,
}: RequestsChoosePageProps) {
  const { slug } = await params;
  const { category, service } = await searchParams;
  const profile = getProfileData(slug);
  if (!profile?.special_requests) notFound();

  return (
    <ProfileRequestsView
      profile={profile}
      variant="choose"
      initialCategoryId={category}
      initialServiceId={service}
    />
  );
}
