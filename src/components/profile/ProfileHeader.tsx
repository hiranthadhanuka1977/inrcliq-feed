"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ProfileData } from "@/types/profile";

type NotificationLevel = "all" | "personalized" | "none";

const SUBSCRIBE_MENU_ITEMS: { id: NotificationLevel | "unsubscribe"; label: string; description?: string }[] = [
  { id: "all", label: "All", description: "Every new post and drop" },
  { id: "personalized", label: "Personalized", description: "Highlights based on your activity" },
  { id: "none", label: "None", description: "Mute notifications from this creator" },
  { id: "unsubscribe", label: "Unsubscribe" },
];

function ProfileSubscribedPill({
  creatorName,
  onUnsubscribe,
}: {
  creatorName: string;
  onUnsubscribe: () => void;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationLevel, setNotificationLevel] = useState<NotificationLevel>("personalized");

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function handleMenuSelect(id: NotificationLevel | "unsubscribe") {
    if (id === "unsubscribe") {
      onUnsubscribe();
      setMenuOpen(false);
      return;
    }

    setNotificationLevel(id);
    setMenuOpen(false);
  }

  const bellLabel =
    notificationLevel === "all"
      ? "All notifications on"
      : notificationLevel === "personalized"
        ? "Personalized notifications on"
        : "Notifications off";

  return (
    <div ref={rootRef} className="profile-subscribed-pill">
      <button
        type="button"
        className="profile-subscribed-pill__bell"
        aria-label={bellLabel}
        title={bellLabel}
        onClick={() =>
          setNotificationLevel((current) =>
            current === "all" ? "none" : current === "personalized" ? "all" : "personalized",
          )
        }
      >
        {notificationLevel === "none" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
            <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
            <path d="M18 8a6 6 0 0 0-9.33-5" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2h-3v.68C7.64 3.36 6 5.92 6 9v7l-2 2v1h16v-1l-2-2z" />
          </svg>
        )}
      </button>

      <span className="profile-subscribed-pill__divider" aria-hidden="true" />

      <div className="profile-subscribed-pill__menu-wrap">
        <button
          type="button"
          className="profile-subscribed-pill__menu-trigger"
          aria-label={`Subscription options for ${creatorName}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <circle cx="8" cy="3.25" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="8" cy="12.75" r="1.5" />
          </svg>
        </button>

        {menuOpen ? (
          <div className="profile-subscribed-pill__menu" id={menuId} role="menu" aria-label={`${creatorName} subscription options`}>
            <p className="profile-subscribed-pill__menu-label">Notify me about</p>
            {SUBSCRIBE_MENU_ITEMS.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                className={`profile-subscribed-pill__menu-item${notificationLevel === item.id ? " is-selected" : ""}`}
                role="menuitemradio"
                aria-checked={notificationLevel === item.id}
                onClick={() => handleMenuSelect(item.id)}
              >
                <span className="profile-subscribed-pill__menu-item-copy">
                  <span className="profile-subscribed-pill__menu-item-title">{item.label}</span>
                  {item.description ? (
                    <span className="profile-subscribed-pill__menu-item-desc">{item.description}</span>
                  ) : null}
                </span>
                {notificationLevel === item.id ? (
                  <svg className="profile-subscribed-pill__menu-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : null}
              </button>
            ))}
            <div className="profile-subscribed-pill__menu-separator" role="separator" />
            <button
              type="button"
              className="profile-subscribed-pill__menu-item profile-subscribed-pill__menu-item--danger"
              role="menuitem"
              onClick={() => handleMenuSelect("unsubscribe")}
            >
              <span className="profile-subscribed-pill__menu-item-title">Unsubscribe</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProfileToolbar({
  onCover,
  className,
}: {
  onCover: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link
        href="/"
        className={`profile-back btn btn--sm btn--icon${onCover ? " btn--ghost-cover" : " btn--secondary"}`}
        aria-label="Back to feed"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </Link>
      <div className="profile-utility-actions" aria-label="Profile utilities">
        <button
          type="button"
          className={`btn btn--sm btn--icon${onCover ? " btn--ghost-cover" : " btn--secondary"}`}
          aria-label="Message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <button
          type="button"
          className={`btn btn--sm btn--icon${onCover ? " btn--ghost-cover" : " btn--secondary"}`}
          aria-label="Share profile"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ProfileHeader({ profile }: { profile: ProfileData }) {
  const [following, setFollowing] = useState(profile.relationship?.following ?? false);
  const [subscribed, setSubscribed] = useState(profile.relationship?.subscribed ?? false);
  const handle = profile.handle.startsWith("@") ? profile.handle : `@${profile.handle}`;
  const hasCover = Boolean(profile.cover_url);
  const hasSubscription = Boolean(profile.subscription);

  return (
    <header className={`profile-header${hasCover ? "" : " profile-header--no-cover"}`} id="profile-top">
      {hasCover ? (
        <div className="profile-header__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.cover_url!} alt="" width={1400} height={320} />
          <div className="profile-header__cover-fade" aria-hidden="true" />
          <ProfileToolbar onCover className="profile-header__cover-nav" />
        </div>
      ) : (
        <ProfileToolbar onCover={false} className="profile-header__toolbar" />
      )}

      <div className="profile-header__panel">
        <div className="profile-header__identity" aria-labelledby="creator-name">
          <div
            className="story-avatar profile-header__avatar"
            style={{ "--story-color": profile.avatar_color } as React.CSSProperties}
          >
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={profile.name} width={88} height={88} />
            ) : (
              profile.avatar_initials
            )}
          </div>
          <div className="profile-header__info">
            <h1 id="creator-name">{profile.name}</h1>
            <p className="profile-header__meta">
              <span>{handle}</span>
              {profile.verified ? (
                <>
                  <span className="profile-header__dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="profile-header__verified">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Verified
                  </span>
                </>
              ) : null}
            </p>
            <p className="profile-header__stats">
              <span>
                <strong>{profile.stats.followers}</strong> followers
              </span>
              <span className="profile-header__dot" aria-hidden="true">
                ·
              </span>
              <span>
                <strong>{profile.stats.following.toLocaleString()}</strong> following
              </span>
              {hasSubscription ? (
                <>
                  <span className="profile-header__dot" aria-hidden="true">
                    ·
                  </span>
                  <span>
                    <strong>{profile.stats.subscribers.toLocaleString()}</strong> subscribers
                  </span>
                </>
              ) : null}
              <span className="profile-header__dot" aria-hidden="true">
                ·
              </span>
              <span>
                <strong>{profile.stats.posts.toLocaleString()}</strong> posts
              </span>
            </p>
          </div>
        </div>

        <p className="profile-header__bio">{profile.bio}</p>

        <div className="profile-header__footer">
          <div className="profile-header__actions" aria-label="Profile actions">
            {hasSubscription ? (
              subscribed ? (
                <ProfileSubscribedPill creatorName={profile.name} onUnsubscribe={() => setSubscribed(false)} />
              ) : (
                <button
                  type="button"
                  className="btn btn--warning btn--sm profile-header__subscribe"
                  onClick={() => setSubscribed(true)}
                >
                  {profile.subscription!.price_label}
                </button>
              )
            ) : null}
            {following ? (
              <button type="button" className="btn btn--outline-brand btn--sm is-active profile-header__follow">
                Following
              </button>
            ) : (
              <button type="button" className="btn btn--secondary btn--sm profile-header__follow" onClick={() => setFollowing(true)}>
                Follow
              </button>
            )}
            {hasSubscription ? (
              <button type="button" className="btn btn--secondary btn--sm btn--icon" aria-label="Gift membership">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
