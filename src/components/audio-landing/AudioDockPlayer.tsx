"use client";

import { useAudioLanding } from "@/context/AudioLandingContext";

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

function SkipBack15Icon() {
  return (
    <span className="audio-dock__skip-glyph" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V2L7 7l5 5V9c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.96 7.96 0 0 0 20 15c0-4.42-3.58-8-8-8z" />
      </svg>
      <span>15</span>
    </span>
  );
}

function SkipForward15Icon() {
  return (
    <span className="audio-dock__skip-glyph audio-dock__skip-glyph--fwd" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V2l5 5-5 5V9c-3.31 0-6 2.69-6 6 0 1.01.25 1.97.7 2.8L5.24 17.26A7.96 7.96 0 0 1 4 15c0-4.42 3.58-8 8-8z" />
      </svg>
      <span>15</span>
    </span>
  );
}

export default function AudioDockPlayer() {
  const {
    activeTrack,
    playing,
    progress,
    currentTimeLabel,
    togglePlay,
    skipBy,
    skipPrevious,
    skipNext,
    toggleLike,
    liked,
  } = useAudioLanding();

  const isLongForm = activeTrack.type === "podcast" || activeTrack.type === "audiobook";

  return (
    <div
      className="audio-dock"
      role="region"
      aria-label="Now playing"
      style={
        {
          "--dock-a": activeTrack.accent[0],
          "--dock-b": activeTrack.accent[1],
        } as React.CSSProperties
      }
    >
      <div className="audio-dock__inner">
        <div className="audio-dock__track">
          <div className="audio-dock__art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeTrack.thumbnail} alt="" />
          </div>
          <div className="audio-dock__meta">
            <strong className="audio-dock__title">{activeTrack.title}</strong>
            <span className="audio-dock__creator">{activeTrack.creator}</span>
            <div
              className="audio-dock__progress"
              role="progressbar"
              aria-label="Playback position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <span
                className={`audio-dock__progress-fill${playing ? " is-playing" : ""}`}
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="audio-dock__time">{currentTimeLabel}</span>
          </div>
        </div>

        <div className="audio-dock__controls" data-mode={isLongForm ? "longform" : "music"}>
          {isLongForm ? (
            <>
              <button
                type="button"
                className="audio-dock__btn"
                aria-label="Skip back 15 seconds"
                onClick={() => skipBy(-15)}
              >
                <SkipBack15Icon />
              </button>
              <button
                type="button"
                className="audio-dock__btn audio-dock__btn--primary"
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
              >
                <PlayPauseIcon playing={playing} />
              </button>
              <button
                type="button"
                className="audio-dock__btn"
                aria-label="Skip forward 15 seconds"
                onClick={() => skipBy(15)}
              >
                <SkipForward15Icon />
              </button>
              <button type="button" className="audio-dock__btn" aria-label="Sleep timer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3-3V8a7 7 0 0 0-7 7v1a7 7 0 0 0 7 7z" />
                  <path d="M12 2v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M4.93 19.07l1.41-1.41" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button type="button" className="audio-dock__btn" aria-label="Previous track" onClick={skipPrevious}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
                </svg>
              </button>
              <button
                type="button"
                className="audio-dock__btn audio-dock__btn--primary"
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
              >
                <PlayPauseIcon playing={playing} />
              </button>
              <button type="button" className="audio-dock__btn" aria-label="Next track" onClick={skipNext}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 18h2V6h-2v12zm-11.5-6 8.5-6v12l-8.5-6z" />
                </svg>
              </button>
              <button
                type="button"
                className={`audio-dock__btn audio-dock__btn--like${liked ? " is-liked" : ""}`}
                aria-label={liked ? "Unlike track" : "Like track"}
                aria-pressed={liked}
                onClick={toggleLike}
              >
                <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
