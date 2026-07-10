"use client";

import AudioMiniPlayer from "@/components/AudioMiniPlayer";
import FeedAudioFullscreenPlayer from "@/components/FeedAudioFullscreenPlayer";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import FeedPost from "@/components/FeedPost";
import FeedScrollButton from "@/components/FeedScrollButton";
import LeftNav from "@/components/LeftNav";
import ProfileCollection from "@/components/profile/ProfileCollection";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePopularPosts from "@/components/profile/ProfilePopularPosts";
import { AudioPlaybackProvider, useAudioPlayback } from "@/context/AudioPlaybackContext";
import type { ProfileData } from "@/types/profile";

function ProfileViewContent({ profile }: { profile: ProfileData }) {
  const { showMiniPlayer } = useAudioPlayback();

  return (
    <>
      <PageBodyClass pageClass="page-profile" />
      <div className={`app-shell page-profile${showMiniPlayer ? " app-shell--audio-dock" : ""}`}>
        <LeftNav />
        <main className="main-content profile-page">
          <ProfileHeader profile={profile} />

          <div className="profile-page__inner">
            {profile.collection.length > 0 ? <ProfileCollection items={profile.collection} /> : null}
            <ProfilePopularPosts posts={profile.popular_posts} />

            <section className="profile-feed" id="profile-feed" aria-labelledby="profile-feed-heading">
              <div className="profile-section__head profile-feed__head">
                <h2 id="profile-feed-heading">Feed</h2>
              </div>
              <div className="profile-feed__list feed-main feed-surface feed-surface--simple">
                {profile.feed_posts.map((item) => (
                  <FeedPost key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        </main>
        <AudioMiniPlayer />
        <FeedAudioFullscreenPlayer />
        <FeedScrollButton variant="profile" topTargetId="profile-top" feedTargetId="profile-feed" />
      </div>
      <MobileNav />
    </>
  );
}

export default function ProfileView({ profile }: { profile: ProfileData }) {
  return (
    <AudioPlaybackProvider>
      <ProfileViewContent profile={profile} />
    </AudioPlaybackProvider>
  );
}
