"use client";

import { useEffect, useState } from "react";
import {
  PODCAST_CONTINUE_ITEMS,
  PODCAST_HERO_SLIDES,
  PODCAST_LIVE_ROOMS,
  PODCAST_NEW_EPISODES,
  PODCAST_TOP_CHART,
  PODCAST_TOP_HOSTS,
  PODCAST_TOP_SHOWS,
  PODCAST_TOPICS,
} from "@/data/audio-landing";
import { formatCount } from "@/lib/format";
import AudioSpotlightHero from "@/components/audio-landing/AudioSpotlightHero";
import type { PodcastHost, PodcastLiveRoom } from "@/types/audio-landing";

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

function PodcastLiveCard({ room }: { room: PodcastLiveRoom }) {
  const [remainingSeconds, setRemainingSeconds] = useState(room.startsInMinutes * 60);
  const [reminded, setReminded] = useState(false);

  useEffect(() => {
    const startsAt = Date.now() + room.startsInMinutes * 60_000;

    const tick = () => {
      setRemainingSeconds(Math.max(0, Math.floor((startsAt - Date.now()) / 1000)));
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [room.startsInMinutes]);

  const isLive = remainingSeconds <= 0;

  return (
    <article className="audio-live-drop-card">
      <div className="audio-live-drop-card__art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.thumbnail} alt="" />
      </div>
      <div className="audio-live-drop-card__body">
        <span className="audio-live-drop-card__kind">{room.kind}</span>
        <strong className="audio-live-drop-card__title">{room.title}</strong>
        <span className="audio-live-drop-card__host">Hosted by {room.host}</span>
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

function PodcastHostCard({ host }: { host: PodcastHost }) {
  const [following, setFollowing] = useState(false);

  return (
    <article className="audio-top-creator-card">
      <div className="audio-top-creator-card__art">
        {host.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={host.image} alt="" />
        ) : (
          <span
            className="audio-top-creator-card__placeholder"
            style={{ "--story-color": host.color } as React.CSSProperties}
            aria-hidden="true"
          >
            {host.initials}
          </span>
        )}
      </div>
      <div className="audio-top-creator-card__body">
        <strong className="audio-top-creator-card__name">
          {host.name}
          {host.verified ? (
            <span className="audio-top-creator-card__verified" aria-label="Verified">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
              </svg>
            </span>
          ) : null}
        </strong>
        <span className="audio-top-creator-card__handle">{host.handle}</span>
        <span className="audio-top-creator-card__meta">
          {host.show} · {host.listeners}
        </span>
        <button
          type="button"
          className={`audio-top-creator-card__follow${following ? " is-following" : ""}`}
          aria-pressed={following}
          onClick={() => setFollowing((value) => !value)}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </article>
  );
}

export default function PodcastsDashboard({
  playing,
  activeTrackId,
  onPlay,
}: {
  playing: boolean;
  activeTrackId: string;
  onPlay: (trackId: string) => void;
}) {
  return (
    <div className="podcasts-dashboard">
      <AudioSpotlightHero onPlay={onPlay} slides={PODCAST_HERO_SLIDES} />

      <section className="audio-mood-section" aria-label="Podcast topics">
        <div className="rail-title">
          <h3>Browse topics</h3>
        </div>
        <div className="audio-mood-grid">
          {PODCAST_TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className="audio-mood-card"
              style={{ background: topic.gradient } as React.CSSProperties}
            >
              <span className="audio-mood-card__emoji" aria-hidden="true">
                {topic.emoji}
              </span>
              <span className="audio-mood-card__label">{topic.label}</span>
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
          {PODCAST_CONTINUE_ITEMS.map((item) => (
            <article key={item.id} className="audio-continue-card">
              <button type="button" className="audio-continue-card__main" onClick={() => onPlay(item.id)}>
                <div className="audio-continue-card__art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumbnail} alt="" />
                  <span className="audio-continue-card__type">Podcast</span>
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
                onClick={() => onPlay(item.id)}
              >
                <PlayPauseIcon playing={playing && activeTrackId === item.id} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="podcast-episodes" aria-label="New episodes">
        <div className="rail-title">
          <h3>New episodes</h3>
          <span className="audio-section__subtitle">Fresh drops from shows you follow</span>
        </div>
        <div className="podcast-episodes__grid">
          {PODCAST_NEW_EPISODES.map((episode) => (
            <button
              key={episode.id}
              type="button"
              className="podcast-episode-card"
              onClick={() => onPlay(episode.trackId)}
            >
              <span className="podcast-episode-card__art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={episode.thumbnail} alt="" />
              </span>
              <span className="podcast-episode-card__body">
                <span className="podcast-episode-card__show">{episode.show}</span>
                <strong className="podcast-episode-card__title">{episode.title}</strong>
                <span className="podcast-episode-card__meta">
                  {episode.episodeLabel} · {episode.durationLabel} · {episode.publishedLabel}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="podcast-shows" aria-label="Top shows">
        <div className="rail-title">
          <h3>Top shows</h3>
          <span className="audio-section__subtitle">Most followed podcasts this week</span>
        </div>
        <div className="podcast-shows__row">
          {PODCAST_TOP_SHOWS.map((show) => (
            <button
              key={show.id}
              type="button"
              className="podcast-show-card"
              onClick={() => onPlay(show.trackId)}
            >
              <span className="podcast-show-card__art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={show.thumbnail} alt="" />
              </span>
              <strong className="podcast-show-card__title">{show.title}</strong>
              <span className="podcast-show-card__host">{show.host}</span>
              <span className="podcast-show-card__meta">
                {show.category} · {show.listeners} · {show.episodes} eps
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="audio-top-creators" aria-label="Top podcast hosts">
        <div className="rail-title">
          <h3>Top hosts</h3>
          <span className="audio-section__subtitle">Hosts your circle is following</span>
        </div>
        <div className="audio-top-creators__row">
          {PODCAST_TOP_HOSTS.map((host) => (
            <PodcastHostCard key={host.id} host={host} />
          ))}
        </div>
      </section>

      <section className="audio-live-drops" aria-label="Live podcast rooms">
        <div className="rail-title">
          <h3>Live podcast rooms</h3>
          <span className="audio-section__subtitle">Q&As, roundtables, and listening rooms</span>
        </div>
        <div className="audio-live-drops__list">
          {PODCAST_LIVE_ROOMS.map((room) => (
            <PodcastLiveCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="audio-top-chart podcast-chart" aria-label="Top podcasts chart">
        <div className="rail-title">
          <h3>Top Podcasts</h3>
          <span className="audio-section__subtitle">Most played episodes this week</span>
        </div>
        <div className="audio-top-chart__panel">
          <ol className="audio-top-chart__list">
            {PODCAST_TOP_CHART.map((entry) => {
              const isPlaying = playing && activeTrackId === entry.trackId;
              return (
                <li key={entry.id} className="audio-top-chart__item">
                  <span
                    className={`audio-top-chart__rank audio-top-chart__rank--${entry.trend}`}
                    aria-label={`Rank ${entry.rank}, trending ${entry.trend}`}
                  >
                    {entry.rank}
                  </span>
                  <button
                    type="button"
                    className="audio-top-chart__hit"
                    onClick={() => onPlay(entry.trackId)}
                    aria-label={`Play ${entry.title} from ${entry.show}`}
                  >
                    <span className="audio-top-chart__art">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={entry.thumbnail} alt="" />
                    </span>
                    <span className="audio-top-chart__meta">
                      <strong className="audio-top-chart__title">{entry.title}</strong>
                      <span className="audio-top-chart__artist">{entry.show}</span>
                    </span>
                    <span className="audio-top-chart__plays">{formatCount(entry.plays)} plays</span>
                    <span className={`audio-top-chart__play${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
                      <PlayPauseIcon playing={isPlaying} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
