"use client";

import { useRef } from "react";
import FeedScrollButton from "@/components/FeedScrollButton";
import CreatorsRail from "@/components/CreatorsRail";
import CategoryFilters from "@/components/CategoryFilters";
import FeedLoading from "@/components/FeedLoading";
import FeedPost from "@/components/FeedPost";
import LeftNav from "@/components/LeftNav";
import RightRail from "@/components/RightRail";
import SpotifyLanding from "@/components/SpotifyLanding";
import StoriesBar from "@/components/StoriesBar";
import type { FeedItem } from "@/types/feed";
import { useFeedFilter } from "@/hooks/useFeedFilter";
import { useFeedPagination } from "@/hooks/useFeedPagination";
import { useStoriesScrollHide } from "@/hooks/useStoriesScrollHide";

interface HomeFeedProps {
  items: FeedItem[];
  categories: string[];
}

export default function HomeFeed({ items, categories }: HomeFeedProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { activeCategory, setActiveCategory, filteredItems, isLoading } = useFeedFilter(items);
  const { visibleItems, hasMore, isLoadingMore, sentinelRef } = useFeedPagination(filteredItems);
  useStoriesScrollHide(headerRef);

  return (
    <div className="app-shell">
      <LeftNav />
      <div className="main-content">
        <div className="feed-header" id="feed-top" ref={headerRef}>
          <StoriesBar />
        </div>

        <div className="content-layout">
          <div className="content-row">
            <main className="feed-main feed-surface feed-surface--simple">
              <CategoryFilters categories={categories} activeCategory={activeCategory} onChange={setActiveCategory}>
                <SpotifyLanding />
              </CategoryFilters>
              {isLoading ? (
                <FeedLoading />
              ) : (
                <>
                  {visibleItems.flatMap((item, index) => {
                    const nodes = [<FeedPost key={item.id} item={item} />];
                    if (index === 2) {
                      nodes.push(<CreatorsRail key="creators-rail" />);
                    }
                    return nodes;
                  })}
                  {isLoadingMore ? <FeedLoading compact /> : null}
                  {hasMore ? (
                    <div ref={sentinelRef} className="feed-load-sentinel" aria-hidden="true" />
                  ) : null}
                </>
              )}
            </main>
            <RightRail />
          </div>
        </div>
      </div>
      <FeedScrollButton variant="home" topTargetId="feed-top" />
    </div>
  );
}
