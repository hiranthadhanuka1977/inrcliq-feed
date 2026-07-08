"use client";

import { useAudioPlayback } from "@/context/AudioPlaybackContext";
import { getAudioThemeStyle } from "@/lib/audio-theme";

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

export default function AudioMiniPlayer() {
  const { audio, playing, progress, currentTimeLabel, showMiniPlayer, togglePlay, close } =
    useAudioPlayback();

  if (!showMiniPlayer || !audio) {
    return null;
  }

  return (
    <div
      className="audio-mini"
      role="region"
      aria-label="Now playing"
      style={getAudioThemeStyle(audio.theme)}
    >
      <div className="audio-mini__art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={audio.thumbnail.url} alt="" />
      </div>

      <div className="audio-mini__track">
        <div
          className="audio-mini__scrubber"
          role="progressbar"
          aria-label="Playback position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className={`audio-mini__scrubber-fill${playing ? " is-playing" : ""}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="audio-mini__time">{currentTimeLabel}</span>
      </div>

      <button
        type="button"
        className="audio-mini__play"
        aria-label={playing ? "Pause audio" : "Play audio"}
        onClick={togglePlay}
      >
        <PlayPauseIcon playing={playing} />
      </button>

      <button type="button" className="audio-mini__close" aria-label="Close player" onClick={close}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}
