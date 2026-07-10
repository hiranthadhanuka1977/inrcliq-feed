"use client";

import Link from "next/link";
import {
  AUDIO_CONTINUE_ITEMS,
  AUDIO_FOR_YOU_CARDS,
  AUDIO_MOOD_CATEGORIES,
} from "@/data/audio-landing";
import { AudioLandingProvider, useAudioLanding } from "@/context/AudioLandingContext";
import { formatCount } from "@/lib/format";
import AudioDockPlayer from "@/components/audio-landing/AudioDockPlayer";
import AudioSpotlightHero from "@/components/audio-landing/AudioSpotlightHero";
import FeedScrollButton from "@/components/FeedScrollButton";
import LeftNav from "@/components/LeftNav";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import RightRail from "@/components/RightRail";
import type { AudioContentType, AudioLandingFilter } from "@/types/audio-landing";

const FILTER_PILLS: { id: AudioLandingFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "podcast", label: "🎙️ Podcasts" },
  { id: "audiobook", label: "📚 Audiobooks" },
  { id: "music", label: "🎵 Music" },
];

function typeLabel(type: AudioContentType): string {
  if (type === "podcast") return "Podcast";
  if (type === "audiobook") return "Audiobook";
  return "Music";
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
  const { activeFilter, setActiveFilter, playTrack, playing, togglePlay, activeTrack } = useAudioLanding();

  const filteredCards = AUDIO_FOR_YOU_CARDS.filter(
    (card) => activeFilter === "all" || card.type === activeFilter,
  );

  return (
    <div className="app-shell app-shell--audio-dock">
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
                    placeholder="Search voices, topics, sounds..."
                    aria-label="Search voices, topics, sounds"
                  />
                </label>
                <Link
                  href="#"
                  className="audio-landing-header__avatar"
                  style={{ "--story-color": "#0d9488" } as React.CSSProperties}
                  aria-label="Your profile"
                >
                  D
                </Link>
              </div>
            </div>
          </header>

          <div className="content-row">
            <main className="feed-main feed-surface feed-surface--audio audio-landing-page">
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
                    <article key={card.id} className="audio-for-you-card">
                      <button
                        type="button"
                        className="audio-for-you-card__hit"
                        onClick={() => playTrack(card.trackId)}
                      >
                        <div className="audio-for-you-card__art">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={card.thumbnail} alt="" />
                          <span className="audio-for-you-card__tag">{typeLabel(card.type)}</span>
                        </div>
                        <div className="audio-for-you-card__body">
                          <h4 className="audio-for-you-card__title">{card.title}</h4>
                          <p className="audio-for-you-card__creator">{card.creator}</p>
                          <div className="audio-for-you-card__social">
                            {card.likes ? <span>❤️ {formatCount(card.likes)} likes</span> : null}
                            {card.comments ? <span>💬 {formatCount(card.comments)} comments</span> : null}
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
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            </main>
            <RightRail />
          </div>
        </div>
      </div>

      <AudioDockPlayer />
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
