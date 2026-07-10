"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AUDIO_HERO_SLIDES } from "@/data/audio-landing";
import type { AudioHeroSlide } from "@/types/audio-landing";

const ROTATION_MS = 8000;
const TRANSITION_MS = 900;

interface AudioSpotlightHeroProps {
  onPlay: (trackId: string) => void;
}

interface SpotlightLayerProps {
  slide: AudioHeroSlide;
  state: "active" | "leaving";
  onPlay: (trackId: string) => void;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function SpotlightCta({ interactive, onClick }: { interactive: boolean; onClick?: () => void }) {
  const content = (
    <>
      <PlayIcon />
      Play Now
    </>
  );

  if (interactive) {
    return (
      <button type="button" className="btn btn--primary btn--sm audio-spotlight__cta" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <span className="btn btn--primary btn--sm audio-spotlight__cta audio-spotlight__cta--ghost" aria-hidden="true">
      {content}
    </span>
  );
}

function SpotlightLayer({ slide, state, onPlay }: SpotlightLayerProps) {
  return (
    <div className={`audio-spotlight__layer is-${state}`} aria-hidden={state === "leaving"}>
      <div className="audio-spotlight__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slide.thumbnail} alt="" />
      </div>
      <div className="audio-spotlight__body">
        <span className="audio-spotlight__badge">{slide.badge}</span>
        <h1 className="audio-spotlight__title">{slide.title}</h1>
        <p className="audio-spotlight__creator">{slide.creator}</p>
        <p className="audio-spotlight__social">
          <span className="audio-spotlight__avatars" aria-hidden="true">
            <span style={{ "--story-color": "#8b5cf6" } as React.CSSProperties}>JL</span>
            <span style={{ "--story-color": "#166534" } as React.CSSProperties}>ED</span>
            <span style={{ "--story-color": "#f97316" } as React.CSSProperties}>AG</span>
          </span>
          {slide.friendsListening} friends are listening
        </p>
        {state === "active" ? (
          <SpotlightCta interactive onClick={() => onPlay(slide.trackId)} />
        ) : (
          <SpotlightCta interactive={false} />
        )}
      </div>
    </div>
  );
}

export default function AudioSpotlightHero({ onPlay }: AudioSpotlightHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const transitionTimerRef = useRef<number | null>(null);

  activeIndexRef.current = activeIndex;

  const activeSlide = AUDIO_HERO_SLIDES[activeIndex];
  const leavingSlide = leavingIndex !== null ? AUDIO_HERO_SLIDES[leavingIndex] : null;

  const goToSlide = useCallback((nextIndex: number) => {
    const current = activeIndexRef.current;
    if (nextIndex === current) return;

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setLeavingIndex(current);
    setActiveIndex(nextIndex);
    setCycleKey((key) => key + 1);

    transitionTimerRef.current = window.setTimeout(() => {
      setLeavingIndex(null);
      transitionTimerRef.current = null;
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      const next = (activeIndexRef.current + 1) % AUDIO_HERO_SLIDES.length;
      goToSlide(next);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [paused, goToSlide, cycleKey]);

  return (
    <section
      className="audio-spotlight"
      aria-label="Spotlight"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <article
        className="audio-spotlight__card"
        style={
          {
            "--spotlight-a": activeSlide.accent[0],
            "--spotlight-b": activeSlide.accent[1],
            "--spotlight-duration": `${ROTATION_MS}ms`,
          } as React.CSSProperties
        }
      >
        <div className="audio-spotlight__glow" aria-hidden="true" />
        <div className="audio-spotlight__layers">
          {leavingSlide ? (
            <SpotlightLayer slide={leavingSlide} state="leaving" onPlay={onPlay} />
          ) : null}
          <SpotlightLayer key={activeSlide.id} slide={activeSlide} state="active" onPlay={onPlay} />
        </div>
      </article>

      <div className="audio-spotlight__dots" role="tablist" aria-label="Spotlight slides">
        {AUDIO_HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show spotlight ${index + 1}`}
              className={`audio-spotlight__dot${isActive ? " is-active" : ""}${isActive && paused ? " is-paused" : ""}`}
              onClick={() => goToSlide(index)}
            >
              {isActive ? (
                <span
                  key={cycleKey}
                  className="audio-spotlight__dot-progress"
                  style={{ "--spotlight-duration": `${ROTATION_MS}ms` } as React.CSSProperties}
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
