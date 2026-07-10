"use client";

import { useRef } from "react";
import AudioMiniPlayer from "@/components/AudioMiniPlayer";
import FeedAudioFullscreenPlayer from "@/components/FeedAudioFullscreenPlayer";
import MobileNav from "@/components/MobileNav";
import FeedScrollButton from "@/components/FeedScrollButton";
import CreatorsRail from "@/components/CreatorsRail";
import SnapsRail from "@/components/SnapsRail";
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
import { AudioPlaybackProvider, useAudioPlayback } from "@/context/AudioPlaybackContext";

const SHOW_CREATORS_RAIL = false;

interface HomeFeedProps {
  items: FeedItem[];
  categories: string[];
}

function HomeFeedContent({ items, categories }: HomeFeedProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { activeCategory, setActiveCategory, filteredItems, isLoading } = useFeedFilter(items);
  const { visibleItems, hasMore, isLoadingMore, sentinelRef } = useFeedPagination(filteredItems);
  const { showMiniPlayer } = useAudioPlayback();
  useStoriesScrollHide(headerRef);

  return (
    <>
      <div className={`app-shell${showMiniPlayer ? " app-shell--audio-dock" : ""}`}>
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
                      if (SHOW_CREATORS_RAIL && index === 2) {
                        nodes.push(<CreatorsRail key="creators-rail" />);
                      }
                      if (index === 8) {
                        nodes.push(<SnapsRail key="snaps-rail" />);
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
        <AudioMiniPlayer />
        <FeedAudioFullscreenPlayer />
        <FeedScrollButton variant="home" topTargetId="feed-top" />
      </div>
      <MobileNav />
    </>
  );
}

export default function HomeFeed({ items, categories }: HomeFeedProps) {
  return (
    <AudioPlaybackProvider>
      <HomeFeedContent items={items} categories={categories} />
    </AudioPlaybackProvider>
  );
}
