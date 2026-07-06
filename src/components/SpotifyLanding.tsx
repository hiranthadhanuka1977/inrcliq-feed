"use client";

import { getGreeting } from "@/lib/format";

export default function SpotifyLanding() {
  return (
    <section className="spotify-landing" aria-label="Quick access">
      <div className="spotify-landing__intro">
        <div className="spotify-landing__greeting-row">
          <span
            className="spotify-landing__avatar spotify-landing__avatar--live"
            style={{ "--story-color": "#0d9488" } as React.CSSProperties}
            aria-hidden="true"
          >
            HI
          </span>
          <h1 className="spotify-landing__greeting">{getGreeting()}, Hiran</h1>
        </div>
      </div>
    </section>
  );
}
