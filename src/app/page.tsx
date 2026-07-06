import HomeFeed from "@/components/HomeFeed";
import { getFeedData } from "@/lib/feed";

export default function Home() {
  const feed = getFeedData();

  return <HomeFeed items={feed.items} categories={feed.categories} />;
}
