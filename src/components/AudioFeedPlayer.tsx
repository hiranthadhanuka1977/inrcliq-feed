"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { FeedAudio } from "@/types/feed";
import { useAudioPlaybackItem } from "@/context/AudioPlaybackContext";
import { formatTimecode, getInitialSeconds, parseTimecode } from "@/lib/audio-time";
import { getAudioThemeStyle } from "@/lib/audio-theme";

function SkipBackIcon() {
  return (
    <span className="audio-feed__skip-glyph" aria-hidden="true">
      <svg className="audio-feed__skip-arrow" viewBox="0 0 12 12" fill="currentColor">
        <path d="M10 2.25v7.5L3.75 6 10 2.25z" />
      </svg>
      <span className="audio-feed__skip-label">15</span>
    </span>
  );
}

function SkipForwardIcon() {
  return (
    <span className="audio-feed__skip-glyph" aria-hidden="true">
      <span className="audio-feed__skip-label">15</span>
      <svg className="audio-feed__skip-arrow" viewBox="0 0 12 12" fill="currentColor">
        <path d="M2 2.25v7.5l6.25-3.75L2 2.25z" />
      </svg>
    </span>
  );
}

function Waveform({ progress, clipId }: { progress: number; clipId: string }) {
  const bars = useMemo(
    () => [
      18, 24, 20, 32, 28, 44, 36, 52, 40, 58, 46, 64, 42, 72, 48, 68, 38, 76, 50, 82, 44, 70, 52, 78, 36, 62, 48, 74, 40, 66, 54, 80, 34, 58, 46, 72, 42, 68, 50, 76,
      38, 60, 48, 84, 44, 74, 56, 88, 46, 70, 52, 78, 40, 64, 48, 82, 42, 68, 54, 86, 38, 62, 50, 74, 44, 66, 48, 80, 36, 58, 46, 72, 40, 64, 52, 76, 44, 68,
      32, 54, 42, 70, 38, 60, 48, 74, 40, 62, 46, 68, 34, 56, 42, 64, 30, 48, 38, 58, 32, 44, 28, 36, 22, 18,
    ],
    [],
  );

  const barWidth = 2;
  const gap = 2;
  const chartHeight = 44;
  const chartWidth = bars.length * (barWidth + gap) - gap;
  const playedWidth = Math.min(Math.max(progress, 0), 1) * chartWidth;

  return (
    <div className="audio-feed__waveform" aria-hidden="true">
      <svg
        className="audio-feed__waveform-svg"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={playedWidth} height={chartHeight} />
          </clipPath>
        </defs>
        <g className="audio-feed__waveform-layer audio-feed__waveform-layer--rest">
          {bars.map((height, index) => {
            const amplitude = Math.max(2, Math.round((height / 100) * (chartHeight / 2 - 2)));
            const barHeight = amplitude * 2;
            const x = index * (barWidth + gap);
            const y = chartHeight / 2 - amplitude;

            return <rect key={`rest-${index}`} x={x} y={y} width={barWidth} height={barHeight} rx={1} />;
          })}
        </g>
        <g className="audio-feed__waveform-layer audio-feed__waveform-layer--played" clipPath={`url(#${clipId})`}>
          {bars.map((height, index) => {
            const amplitude = Math.max(2, Math.round((height / 100) * (chartHeight / 2 - 2)));
            const barHeight = amplitude * 2;
            const x = index * (barWidth + gap);
            const y = chartHeight / 2 - amplitude;

            return <rect key={`played-${index}`} x={x} y={y} width={barWidth} height={barHeight} rx={1} />;
          })}
        </g>
      </svg>
    </div>
  );
}

interface AudioFeedPlayerProps {
  itemId: string;
  audio: FeedAudio;
}

export default function AudioFeedPlayer({ itemId, audio }: AudioFeedPlayerProps) {
  const waveformClipId = `patreon-wave-${useId().replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);

  const {
    isActive,
    playing: contextPlaying,
    progress: contextProgress,
    currentTimeLabel: contextTimeLabel,
    activeItemId,
    registerInlineElement,
    ensureActive,
    activateAndToggle,
    skipBy,
  } = useAudioPlaybackItem(itemId, audio);

  const durationSeconds = useMemo(() => parseTimecode(audio.duration), [audio.duration]);
  const initialSeconds = useMemo(
    () => getInitialSeconds(audio, durationSeconds),
    [audio, durationSeconds],
  );

  const playing = isActive && contextPlaying;
  const progress = isActive
    ? contextProgress
    : durationSeconds > 0
      ? initialSeconds / durationSeconds
      : 0;
  const currentTimeLabel = isActive ? contextTimeLabel : formatTimecode(initialSeconds);

  useEffect(() => {
    const shouldObserve = activeItemId === null || activeItemId === itemId;
    if (!shouldObserve) {
      return;
    }

    registerInlineElement(itemId, rootRef.current);
    return () => registerInlineElement(itemId, null);
  }, [activeItemId, itemId, registerInlineElement]);

  const handleSkip = (deltaSeconds: number) => {
    if (!isActive) {
      ensureActive(itemId, audio);
    }
    skipBy(deltaSeconds);
  };

  return (
    <div
      ref={rootRef}
      className="audio-feed"
      aria-label={audio.title}
      style={getAudioThemeStyle(audio.theme)}
    >
      <div className="audio-feed__hero">
        <div className="audio-feed__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={audio.thumbnail.url} alt={audio.thumbnail.alt} />
        </div>
        <div className="audio-feed__waveform-wrap">
          <Waveform progress={progress} clipId={waveformClipId} />
        </div>
      </div>

      <div className="audio-feed__controls" role="group" aria-label="Audio playback controls">
        <button type="button" className="audio-feed__skip" aria-label="Skip back 15 seconds" onClick={() => handleSkip(-15)}>
          <SkipBackIcon />
        </button>
        <span className="audio-feed__time">{currentTimeLabel}</span>
        <div
          className="audio-feed__scrubber"
          role="slider"
          aria-label="Playback position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className={`audio-feed__scrubber-fill${playing ? " is-playing" : ""}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="audio-feed__time">{audio.duration}</span>
        <button type="button" className="audio-feed__skip" aria-label="Skip forward 15 seconds" onClick={() => handleSkip(15)}>
          <SkipForwardIcon />
        </button>
        <button
          type="button"
          className="audio-feed__play"
          aria-label={playing ? "Pause audio" : "Play audio"}
          onClick={() => activateAndToggle(itemId, audio)}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="7" y="6" width="3.5" height="12" rx="0.75" />
              <rect x="13.5" y="6" width="3.5" height="12" rx="0.75" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
