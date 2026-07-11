"use client";

import { useState } from "react";
import { AUDIO_TOP_CREATORS } from "@/data/audio-landing";
import type { AudioTopCreator } from "@/types/audio-landing";

function TopCreatorCard({ creator }: { creator: AudioTopCreator }) {
  const [following, setFollowing] = useState(false);

  return (
    <article className="audio-top-creator-card">
      <div className="audio-top-creator-card__art">
        {creator.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={creator.image} alt="" />
        ) : (
          <span
            className="audio-top-creator-card__placeholder"
            style={{ "--story-color": creator.color } as React.CSSProperties}
            aria-hidden="true"
          >
            {creator.initials}
          </span>
        )}
      </div>
      <div className="audio-top-creator-card__body">
        <strong className="audio-top-creator-card__name">
          {creator.name}
          {creator.verified ? (
            <span className="audio-top-creator-card__verified" aria-label="Verified">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
              </svg>
            </span>
          ) : null}
        </strong>
        <span className="audio-top-creator-card__handle">{creator.handle}</span>
        <span className="audio-top-creator-card__meta">
          {creator.category} · {creator.listeners}
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

export default function AudioTopCreators() {
  return (
    <section className="audio-top-creators" aria-label="Top creators">
      <div className="rail-title">
        <h3>Top Creators</h3>
        <span className="audio-section__subtitle">Artists, hosts, and narrators rising this week</span>
      </div>
      <div className="audio-top-creators__row">
        {AUDIO_TOP_CREATORS.map((creator) => (
          <TopCreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  );
}
