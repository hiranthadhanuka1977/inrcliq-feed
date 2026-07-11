"use client";

import { useEffect, useState } from "react";
import {
  AUDIO_CHALLENGES,
  AUDIO_CONTINUE_ITEMS,
  AUDIO_FOR_YOU_CARDS,
  AUDIO_LIVE_DROPS,
  AUDIO_MOOD_CATEGORIES,
} from "@/data/audio-landing";
import { AudioLandingProvider, useAudioLanding } from "@/context/AudioLandingContext";
import { formatCount } from "@/lib/format";
import AudioDockPlayer from "@/components/audio-landing/AudioDockPlayer";
import AudioFullscreenPlayer from "@/components/audio-landing/AudioFullscreenPlayer";
import AudioSpotlightHero from "@/components/audio-landing/AudioSpotlightHero";
import AudioTopChart from "@/components/audio-landing/AudioTopChart";
import AudiobooksDashboard from "@/components/audio-landing/AudiobooksDashboard";
import MusicDashboard from "@/components/audio-landing/MusicDashboard";
import PodcastsDashboard from "@/components/audio-landing/PodcastsDashboard";
import AudioTopCreators from "@/components/audio/AudioTopCreators";
import FeedScrollButton from "@/components/FeedScrollButton";
import LeftNav from "@/components/LeftNav";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import type {
  AudioContentType,
  AudioForYouCard,
  AudioLandingFilter,
  AudioLiveDrop,
} from "@/types/audio-landing";

const FILTER_PILLS: { id: AudioLandingFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "podcast", label: "🎙️ Podcasts" },
  { id: "audiobook", label: "📚 Audiobooks" },
  { id: "music", label: "🎵 Music" },
];

function searchCopy(filter: AudioLandingFilter): { placeholder: string; label: string } {
  if (filter === "podcast") {
    return { placeholder: "Search shows, episodes, hosts...", label: "Search shows, episodes, hosts" };
  }
  if (filter === "audiobook") {
    return { placeholder: "Search books, authors, narrators...", label: "Search books, authors, narrators" };
  }
  if (filter === "music") {
    return { placeholder: "Search songs, albums, artists...", label: "Search songs, albums, artists" };
  }
  return { placeholder: "Search voices, topics, sounds...", label: "Search voices, topics, sounds" };
}

function typeLabel(type: AudioContentType): string {
  if (type === "podcast") return "Podcast";
  if (type === "audiobook") return "Audiobook";
  return "Music";
}

function AudioForYouCardItem({
  card,
  onPlay,
}: {
  card: AudioForYouCard;
  onPlay: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="audio-for-you-card">
      <button type="button" className="audio-for-you-card__hit" onClick={onPlay}>
        <div className="audio-for-you-card__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.thumbnail} alt="" />
          <span className="audio-for-you-card__tag">{typeLabel(card.type)}</span>
        </div>
        <div className="audio-for-you-card__body">
          <h4 className="audio-for-you-card__title">{card.title}</h4>
          <p className="audio-for-you-card__creator">{card.creator}</p>
        </div>
      </button>
      <div className="audio-for-you-card__footer">
        <div className="audio-for-you-card__social">
          {card.likes ? (
            <button
              type="button"
              className={`audio-for-you-card__action audio-for-you-card__action--like${liked ? " is-liked" : ""}`}
              aria-label={liked ? "Unlike" : "Like"}
              aria-pressed={liked}
              onClick={() => setLiked((value) => !value)}
            >
              <svg
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{formatCount(card.likes)} likes</span>
            </button>
          ) : null}
          {card.comments ? (
            <span className="audio-for-you-card__stat">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{formatCount(card.comments)} comments</span>
            </span>
          ) : null}
          {card.sharedBy ? (
            <span className="audio-for-you-card__share">
              <span
                className="audio-for-you-card__share-av"
                style={{ "--story-color": card.sharedBy.color } as React.CSSProperties}
                aria-hidden="true"
              >
                {card.sharedBy.initials}
              </span>
              Shared by {card.sharedBy.name}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className={`audio-for-you-card__action audio-for-you-card__action--save${saved ? " is-saved" : ""}`}
          aria-label={saved ? "Remove bookmark" : "Bookmark"}
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function LiveDropCard({ drop }: { drop: AudioLiveDrop }) {
  const [remainingSeconds, setRemainingSeconds] = useState(drop.startsInMinutes * 60);
  const [reminded, setReminded] = useState(false);

  useEffect(() => {
    const startsAt = Date.now() + drop.startsInMinutes * 60_000;

    const tick = () => {
      setRemainingSeconds(Math.max(0, Math.floor((startsAt - Date.now()) / 1000)));
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [drop.startsInMinutes]);

  const isLive = remainingSeconds <= 0;

  return (
    <article className="audio-live-drop-card">
      <div className="audio-live-drop-card__art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={drop.thumbnail} alt="" />
      </div>
      <div className="audio-live-drop-card__body">
        <span className="audio-live-drop-card__kind">{drop.kind}</span>
        <strong className="audio-live-drop-card__title">{drop.title}</strong>
        <span className="audio-live-drop-card__host">Hosted by {drop.host}</span>
        <span className={`audio-live-drop-card__countdown${isLive ? " is-live" : ""}`}>
          {isLive ? "Live now" : `Starts in ${formatCountdown(remainingSeconds)}`}
        </span>
      </div>
      <button
        type="button"
        className={`audio-live-drop-card__remind${reminded ? " is-set" : ""}`}
        aria-pressed={reminded}
        onClick={() => setReminded((value) => !value)}
      >
        {reminded ? "Reminder set" : "Remind Me 🔔"}
      </button>
    </article>
  );
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="7" y="6" width="3.5" height="12" rx="0.75" />
        <rect x="13.5" y="6" width="3.5" height="12" rx="0.75" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function AudioLandingContent() {
  const { activeFilter, setActiveFilter, playTrack, playing, activeTrack, showDockPlayer } =
    useAudioLanding();

  const filteredCards = AUDIO_FOR_YOU_CARDS.filter(
    (card) => activeFilter === "all" || card.type === activeFilter,
  );
  const search = searchCopy(activeFilter);

  const categoryDashboard =
    activeFilter === "podcast" ? (
      <PodcastsDashboard playing={playing} activeTrackId={activeTrack.id} onPlay={playTrack} />
    ) : activeFilter === "music" ? (
      <MusicDashboard playing={playing} activeTrackId={activeTrack.id} onPlay={playTrack} />
    ) : activeFilter === "audiobook" ? (
      <AudiobooksDashboard playing={playing} activeTrackId={activeTrack.id} onPlay={playTrack} />
    ) : null;

  return (
    <div className={`app-shell${showDockPlayer ? " app-shell--audio-dock" : ""}`}>
      <LeftNav />
      <div className="main-content">
        <div className="content-layout">
          <header className="feed-header audio-landing-header" id="audio-top">
            <div className="audio-landing-header__toolbar">
              <section className="audio-landing-filters" aria-label="Audio categories">
                <div className="audio-landing-filters__track" role="tablist">
                  {FILTER_PILLS.map((pill) => {
                    const selected = activeFilter === pill.id;
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        className={`audio-landing-pill${selected ? " is-active" : ""}`}
                        onClick={() => setActiveFilter(pill.id)}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="audio-landing-header__search-group">
                <label className="audio-landing-search">
                  <span className="audio-landing-search__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                  </span>
                  <input
                    type="search"
                    className="audio-landing-search__input"
                    placeholder={search.placeholder}
                    aria-label={search.label}
                  />
                </label>
              </div>
            </div>
          </header>

          <div className="content-row">
            <main className="feed-main feed-surface feed-surface--audio audio-landing-page">
              {categoryDashboard ?? (
                <>
              <AudioSpotlightHero onPlay={playTrack} />

              <section className="audio-mood-section" aria-label="Mood and genre categories">
                <div className="rail-title">
                  <h3>Browse by mood</h3>
                </div>
                <div className="audio-mood-grid">
                  {AUDIO_MOOD_CATEGORIES.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      className="audio-mood-card"
                      style={{ background: mood.gradient } as React.CSSProperties}
                    >
                      <span className="audio-mood-card__emoji" aria-hidden="true">
                        {mood.emoji}
                      </span>
                      <span className="audio-mood-card__label">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rail rail--audio-row audio-continue-section" aria-label="Continue listening">
                <div className="rail-title">
                  <h3>Continue listening</h3>
                  <a className="rail-title__link" href="#">
                    See all
                  </a>
                </div>
                <div className="audio-continue-row">
                  {AUDIO_CONTINUE_ITEMS.map((item) => (
                    <article key={item.id} className="audio-continue-card">
                      <button
                        type="button"
                        className="audio-continue-card__main"
                        onClick={() => playTrack(item.id)}
                      >
                        <div className="audio-continue-card__art">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.thumbnail} alt="" />
                          <span className="audio-continue-card__type">{typeLabel(item.type)}</span>
                        </div>
                        <div className="audio-continue-card__body">
                          <strong className="audio-continue-card__title">{item.title}</strong>
                          <span className="audio-continue-card__creator">{item.creator}</span>
                          <span className="audio-continue-card__meta">
                            {item.progressLabel ?? `${Math.round(item.progress * 100)}% completed`}
                          </span>
                          <div className="audio-continue-card__progress" aria-hidden="true">
                            <span style={{ width: `${item.progress * 100}%` }} />
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        className="audio-continue-card__play"
                        aria-label={`Resume ${item.title}`}
                        onClick={() => playTrack(item.id)}
                      >
                        <PlayPauseIcon playing={playing && activeTrack.id === item.id} />
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="audio-for-you" aria-label="For you">
                <div className="rail-title">
                  <h3>For you</h3>
                  <span className="audio-for-you__subtitle">Music, podcasts & audiobooks blended</span>
                </div>
                <div className="audio-for-you__grid">
                  {filteredCards.map((card) => (
                    <AudioForYouCardItem
                      key={card.id}
                      card={card}
                      onPlay={() => playTrack(card.trackId)}
                    />
                  ))}
                </div>
              </section>

              <AudioTopCreators />

              <section className="audio-challenges" aria-label="Trending audio challenges">
                <div className="rail-title">
                  <h3>Trending Audio Challenges</h3>
                  <span className="audio-section__subtitle">Community UGC events happening now</span>
                </div>
                <div className="audio-challenges__grid">
                  {AUDIO_CHALLENGES.map((challenge) => (
                    <article
                      key={challenge.id}
                      className="audio-challenge-card"
                      style={
                        {
                          "--challenge-a": challenge.accent[0],
                          "--challenge-b": challenge.accent[1],
                        } as React.CSSProperties
                      }
                    >
                      <div className="audio-challenge-card__art">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={challenge.thumbnail} alt="" />
                      </div>
                      <div className="audio-challenge-card__body">
                        <span className="audio-challenge-card__hashtag">{challenge.hashtag}</span>
                        <strong className="audio-challenge-card__title">{challenge.title}</strong>
                        <p className="audio-challenge-card__copy">{challenge.description}</p>
                        <span className="audio-challenge-card__metric">
                          {formatCount(challenge.submissionsToday)} submissions today
                        </span>
                        <button type="button" className="audio-challenge-card__cta">
                          Join Challenge 🎙️
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="audio-live-drops" aria-label="Upcoming live drops">
                <div className="rail-title">
                  <h3>Upcoming Live Drops</h3>
                  <span className="audio-section__subtitle">Album parties, podcast Q&As, and listening rooms</span>
                </div>
                <div className="audio-live-drops__list">
                  {AUDIO_LIVE_DROPS.map((drop) => (
                    <LiveDropCard key={drop.id} drop={drop} />
                  ))}
                </div>
              </section>

              <AudioTopChart
                playing={playing}
                activeTrackId={activeTrack.id}
                onPlay={playTrack}
              />
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <AudioDockPlayer />
      <AudioFullscreenPlayer />
      <FeedScrollButton variant="home" topTargetId="audio-top" />
      <MobileNav />
    </div>
  );
}

export default function AudioLandingPage() {
  return (
    <>
      <PageBodyClass pageClass="page-audio" />
      <AudioLandingProvider>
        <AudioLandingContent />
      </AudioLandingProvider>
    </>
  );
}
