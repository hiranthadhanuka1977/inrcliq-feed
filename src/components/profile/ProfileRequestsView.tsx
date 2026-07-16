"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import LeftNav from "@/components/LeftNav";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import {
  formatRequestPriceRange,
  getCreatorRequests,
  resolveSpecialRequestReviews,
  type RequestService,
  type RequestServiceMedia,
} from "@/lib/special-requests";
import type { ProfileData } from "@/types/profile";

const REVIEW_INITIAL_COUNT = 6;
const REVIEW_PAGE_SIZE = 18;

function AmexMark() {
  return (
    <span className="requests-pay-mark" aria-label="American Express">
      <svg viewBox="0 0 48 32" role="img" aria-hidden="true">
        <rect width="48" height="32" rx="4" fill="#016FD0" />
        <text x="24" y="19.5" textAnchor="middle" fill="#fff" fontFamily="Arial, Helvetica, sans-serif" fontSize="7.2" fontWeight="700" letterSpacing="0.4">
          AMEX
        </text>
      </svg>
    </span>
  );
}

function VisaMark() {
  return (
    <span className="requests-pay-mark" aria-label="Visa">
      <svg viewBox="0 0 48 32" role="img" aria-hidden="true">
        <rect width="48" height="32" rx="4" fill="#fff" />
        <text x="24" y="20.5" textAnchor="middle" fill="#1A1F71" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontStyle="italic" fontWeight="800" letterSpacing="1.2">
          VISA
        </text>
      </svg>
    </span>
  );
}

function MastercardMark() {
  return (
    <span className="requests-pay-mark" aria-label="Mastercard">
      <svg viewBox="0 0 48 32" role="img" aria-hidden="true">
        <rect width="48" height="32" rx="4" fill="#fff" />
        <circle cx="19.5" cy="16" r="7.2" fill="#EB001B" />
        <circle cx="28.5" cy="16" r="7.2" fill="#F79E1B" />
        <path d="M24 10.55a7.2 7.2 0 0 1 0 10.9 7.2 7.2 0 0 1 0-10.9z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function PaypalMark() {
  return (
    <span className="requests-pay-mark" aria-label="PayPal">
      <svg viewBox="0 0 48 32" role="img" aria-hidden="true">
        <rect width="48" height="32" rx="4" fill="#fff" />
        <text x="24" y="19.5" textAnchor="middle" fill="#003087" fontFamily="Arial, Helvetica, sans-serif" fontSize="8" fontWeight="800">
          PayPal
        </text>
      </svg>
    </span>
  );
}

function DinersMark() {
  return (
    <span className="requests-pay-mark" aria-label="Diners Club">
      <svg viewBox="0 0 48 32" role="img" aria-hidden="true">
        <rect width="48" height="32" rx="4" fill="#0079BE" />
        <circle cx="20" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
        <circle cx="28" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

function CategoryIcon({ icon }: { icon: "gift" | "coach" | "stage" }) {
  if (icon === "gift") {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="5" y="13" width="22" height="14" rx="3" fill="#F07167" />
        <rect x="5" y="13" width="22" height="5" rx="2" fill="#E85A5A" />
        <rect x="14.5" y="13" width="3" height="14" fill="#FFD166" />
        <rect x="5" y="17.5" width="22" height="3" fill="#FFD166" />
        <path
          d="M16 13c-2.2-3.8-6.2-4.4-7.4-2.6C7.2 12.4 9.4 14.4 16 13Z"
          fill="#FF8FAB"
        />
        <path
          d="M16 13c2.2-3.8 6.2-4.4 7.4-2.6C24.8 12.4 22.6 14.4 16 13Z"
          fill="#FFB4C8"
        />
        <circle cx="16" cy="12.2" r="1.4" fill="#FFD166" />
      </svg>
    );
  }

  if (icon === "coach") {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" fill="#2A9D8F" />
        <circle cx="16" cy="16" r="8.2" fill="#E9F7F4" />
        <path
          d="M16 9.2v7.1l4.4 2.5"
          stroke="#1F7A6F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="1.6" fill="#E9C46A" />
        <path
          d="M23.8 8.4l1.5-.3.3 1.5"
          stroke="#E9C46A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.4 23.2l-1.3.5-.5-1.3"
          stroke="#F4A261"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="13.2" y="4" width="5.6" height="12.5" rx="2.8" fill="#4C8BF5" />
      <rect x="14.3" y="5.2" width="3.4" height="9.2" rx="1.7" fill="#9BC0FF" />
      <path
        d="M10.2 14.2a5.8 5.8 0 0 0 11.6 0"
        stroke="#2F6FE0"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M16 20v4.5" stroke="#F4A261" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="10.5" y="24.2" width="11" height="3.2" rx="1.6" fill="#E9C46A" />
      <circle cx="22.8" cy="8.2" r="2" fill="#F07167" />
    </svg>
  );
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className="collection-product__stars" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={index < clamped ? "is-filled" : undefined}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function ServiceExplainer({
  serviceId,
  description,
  media,
}: {
  serviceId: string;
  description: string;
  media: RequestServiceMedia;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    setVideoPlaying(false);
    setAudioPlaying(false);
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [serviceId]);

  async function toggleVideo(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
    if (video.paused) {
      await video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }

  async function toggleAudio(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
    if (audio.paused) {
      await audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  }

  return (
    <div className="requests-service__explainer" onClick={(event) => event.stopPropagation()}>
      <p className="requests-service__description">{description}</p>

      <div className="requests-service__media">
        <div className="requests-service__video">
          <div className={`requests-service__video-frame${videoPlaying ? " is-playing" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.poster} alt="" className="requests-service__video-poster" />
            <video
              ref={videoRef}
              className="requests-service__video-el"
              src={media.videoSrc}
              poster={media.poster}
              playsInline
              preload="none"
              onEnded={() => setVideoPlaying(false)}
              onPause={() => setVideoPlaying(false)}
              onPlay={() => setVideoPlaying(true)}
            />
            <button
              type="button"
              className="requests-service__video-play"
              aria-label={videoPlaying ? "Pause explainer video" : "Play explainer video"}
              onClick={toggleVideo}
            >
              {videoPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="requests-service__media-caption">{media.videoCaption}</p>
        </div>

        <div className="requests-service__audio">
          <button
            type="button"
            className={`requests-service__audio-btn${audioPlaying ? " is-playing" : ""}`}
            aria-label={audioPlaying ? "Pause audio sample" : "Play audio sample"}
            onClick={toggleAudio}
          >
            <span className="requests-service__audio-icon" aria-hidden="true">
              {audioPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </span>
            <span className="requests-service__audio-copy">
              <strong>{media.audioTitle}</strong>
              <span>{media.audioDuration} audio sample</span>
            </span>
          </button>
          <audio
            ref={audioRef}
            src={media.audioSrc}
            preload="none"
            onEnded={() => setAudioPlaying(false)}
            onPause={() => setAudioPlaying(false)}
            onPlay={() => setAudioPlaying(true)}
          />
        </div>
      </div>
    </div>
  );
}

function flattenServices(categories: ReturnType<typeof getCreatorRequests>) {
  if (!categories) return [] as RequestService[];
  return categories.categories.flatMap((category) => category.services);
}

export default function ProfileRequestsView({ profile }: { profile: ProfileData }) {
  const content = getCreatorRequests(profile.slug);
  const allServices = useMemo(() => flattenServices(content), [content]);
  const reviewsBlock = useMemo(() => resolveSpecialRequestReviews(profile.slug), [profile.slug]);
  const [categoryId, setCategoryId] = useState("");
  const [selectedId, setSelectedId] = useState(allServices[0]?.id ?? "");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [visibleReviewCount, setVisibleReviewCount] = useState(REVIEW_INITIAL_COUNT);
  const [pickerStep, setPickerStep] = useState<1 | 2>(1);

  if (!content) return null;

  const activeCategory =
    content.categories.find((category) => category.id === categoryId) ?? content.categories[0];
  const hasChosenCategory = Boolean(categoryId);
  const selected =
    activeCategory?.services.find((service) => service.id === selectedId) ??
    allServices.find((service) => service.id === selectedId) ??
    allServices[0];
  const priceRange = selected
    ? formatRequestPriceRange(selected.priceMin, selected.priceMax)
    : content.startingRange;
  const activeGallery = content.gallery[galleryIndex] ?? content.gallery[0];
  const availableReviews = reviewsBlock.reviews;
  const visibleReviews = availableReviews.slice(0, visibleReviewCount);
  const remainingReviews = Math.max(0, availableReviews.length - visibleReviewCount);

  function goGallery(delta: number) {
    setGalleryIndex((current) => {
      const next = current + delta;
      if (next < 0) return content!.gallery.length - 1;
      if (next >= content!.gallery.length) return 0;
      return next;
    });
  }

  function chooseCategory(nextCategoryId: string) {
    const nextCategory = content!.categories.find((category) => category.id === nextCategoryId);
    if (!nextCategory) return;
    setCategoryId(nextCategoryId);
    const preferred =
      nextCategory.services.find((service) => service.popular) ?? nextCategory.services[0];
    if (preferred) setSelectedId(preferred.id);
    setPickerStep(2);
  }

  function chooseService(serviceId: string) {
    setSelectedId(serviceId);
  }

  return (
    <>
      <PageBodyClass pageClass="page-profile" />
      <div className="app-shell page-profile page-requests">
        <LeftNav />
        <main className="main-content profile-page requests-page">
          <header className="product-detail-topbar requests-topbar">
            <div className="product-detail-topbar__inner requests-topbar__inner">
              <Link
                href={`/profile/${profile.slug}`}
                className="product-detail-back btn btn--sm btn--icon btn--secondary"
                aria-label={`Back to ${profile.name}'s profile`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </Link>
              <div className="requests-topbar__seller">
                <div
                  className="story-avatar requests-topbar__avatar"
                  style={{ "--story-color": profile.avatar_color } as CSSProperties}
                  aria-hidden="true"
                >
                  {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt="" width={36} height={36} />
                  ) : (
                    profile.avatar_initials
                  )}
                </div>
                <div className="requests-topbar__copy">
                  <p className="requests-topbar__name">{profile.name}</p>
                  <p className="requests-topbar__label">Special Requests</p>
                </div>
              </div>
            </div>
          </header>

          <div className="profile-page__inner requests-layout">
            <div className="requests-main">
              <section className="requests-intro" aria-labelledby="requests-heading">
                <h1 id="requests-heading">Make it personal</h1>
                {content.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>

              <section className="requests-gallery" aria-label="Request examples">
                <div className="requests-gallery__stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeGallery.src} alt={activeGallery.alt} />
                  <button
                    type="button"
                    className="requests-gallery__nav requests-gallery__nav--prev"
                    aria-label="Previous example"
                    onClick={() => goGallery(-1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="requests-gallery__nav requests-gallery__nav--next"
                    aria-label="Next example"
                    onClick={() => goGallery(1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                  <button type="button" className="requests-gallery__play" aria-label="Play example">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <span className="requests-gallery__caption">{activeGallery.caption}</span>
                </div>
                <div className="requests-gallery__thumbs" role="list">
                  {content.gallery.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="listitem"
                      className={`requests-gallery__thumb${index === galleryIndex ? " is-active" : ""}`}
                      aria-label={item.caption}
                      aria-pressed={index === galleryIndex}
                      onClick={() => setGalleryIndex(index)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.src} alt="" />
                    </button>
                  ))}
                </div>
              </section>

              <section className="requests-guide" aria-labelledby="requests-guide-heading">
                <div className="requests-guide__head">
                  <div className="requests-guide__copy">
                    <h2 id="requests-guide-heading">Choose your experience</h2>
                    <p>Two quick steps — start with what you need, then lock in the request.</p>
                  </div>
                  <ol className="requests-guide__steps" aria-label="Request steps">
                    <li className={pickerStep === 1 ? "is-active" : "is-done"}>
                      <button type="button" onClick={() => setPickerStep(1)}>
                        <span aria-hidden="true">1</span>
                        Occasion
                      </button>
                    </li>
                    <li className={pickerStep === 2 ? "is-active" : undefined}>
                      <button
                        type="button"
                        onClick={() => setPickerStep(2)}
                        disabled={!hasChosenCategory}
                      >
                        <span aria-hidden="true">2</span>
                        Request
                      </button>
                    </li>
                  </ol>
                </div>

                {pickerStep === 1 ? (
                  <div className="requests-intent-grid" role="list">
                    {content.categories.map((category) => {
                      const fromPrice = Math.min(...category.services.map((service) => service.priceMin));
                      const isActive = hasChosenCategory && category.id === categoryId;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          role="listitem"
                          className={`requests-intent${isActive ? " is-selected" : ""}`}
                          aria-pressed={isActive}
                          onClick={() => chooseCategory(category.id)}
                        >
                          <span className={`requests-intent__icon requests-intent__icon--${category.icon}`}>
                            <CategoryIcon icon={category.icon} />
                          </span>
                          <span className="requests-intent__body">
                            <span className="requests-intent__eyebrow">{category.intent}</span>
                            <strong>{category.title}</strong>
                            <span className="requests-intent__blurb">{category.blurb}</span>
                            <span className="requests-intent__meta">
                              From ${fromPrice}
                              <span aria-hidden="true"> · </span>
                              {category.services.length} options
                            </span>
                          </span>
                          <span className="requests-intent__cta" aria-hidden="true">
                            Choose
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="requests-service-panel">
                    <div className="requests-service-panel__toolbar">
                      <button
                        type="button"
                        className="requests-service-panel__back"
                        onClick={() => setPickerStep(1)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                        Change occasion
                      </button>
                      <div className="requests-service-panel__context">
                        <span
                          className={`requests-service-panel__icon requests-service-panel__icon--${activeCategory.icon}`}
                          aria-hidden="true"
                        >
                          <CategoryIcon icon={activeCategory.icon} />
                        </span>
                        <div>
                          <p className="requests-service-panel__intent">{activeCategory.intent}</p>
                          <h3>{activeCategory.title}</h3>
                        </div>
                      </div>
                    </div>

                    <fieldset className="requests-service-list">
                      <legend className="visually-hidden">Select a request</legend>
                      {activeCategory.services.map((service) => {
                        const selectedService = service.id === selectedId;
                        return (
                          <label
                            key={service.id}
                            className={`requests-service${selectedService ? " is-selected" : ""}`}
                          >
                            <input
                              type="radio"
                              name="special-request-service"
                              value={service.id}
                              checked={selectedService}
                              onChange={() => chooseService(service.id)}
                            />
                            <span className="requests-service__top">
                              <span className="requests-service__main">
                                <span className="requests-service__title-row">
                                  <strong>{service.label}</strong>
                                  {service.popular ? (
                                    <span className="requests-service__badge">Most booked</span>
                                  ) : null}
                                </span>
                                <span className="requests-service__blurb">{service.blurb}</span>
                              </span>
                              <span className="requests-service__price">
                                {formatRequestPriceRange(service.priceMin, service.priceMax)}
                              </span>
                            </span>
                            {selectedService ? (
                              <ServiceExplainer
                                serviceId={service.id}
                                description={service.description}
                                media={service.media}
                              />
                            ) : null}
                          </label>
                        );
                      })}
                    </fieldset>

                    <div className="requests-pick-summary" aria-live="polite">
                      <div>
                        <p className="requests-pick-summary__label">Your pick</p>
                        <p className="requests-pick-summary__value">
                          {selected?.label ?? "Select a request"}
                          {selected ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              {priceRange}
                            </>
                          ) : null}
                        </p>
                      </div>
                      <button type="button" className="btn btn--primary" disabled={!selected}>
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <aside className="requests-aside">
              <section className="requests-card" aria-labelledby="requests-how-heading">
                <h2 id="requests-how-heading">How it works</h2>
                <ol className="requests-steps">
                  {content.howItWorks.map((step, index) => (
                    <li key={step.title} className="requests-step">
                      <span className="requests-step__num" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="requests-card" aria-labelledby="requests-booking-heading">
                <h2 id="requests-booking-heading" className="visually-hidden">
                  Booking details
                </h2>
                <dl className="requests-booking">
                  <div>
                    <dt>Your request</dt>
                    <dd>{selected?.label ?? "Select a request"}</dd>
                  </div>
                  <div>
                    <dt>Starting Price Range</dt>
                    <dd>{priceRange}</dd>
                  </div>
                  <div>
                    <dt>Average Response Time</dt>
                    <dd>{content.responseTime}</dd>
                  </div>
                  <div>
                    <dt>Available for Next Booking</dt>
                    <dd>{content.nextAvailable}</dd>
                  </div>
                </dl>
              </section>

              <section className="requests-card requests-card--guarantee" aria-labelledby="requests-guarantee-heading">
                <h2 id="requests-guarantee-heading">Money-back guarantee</h2>
                <p>{content.guarantee}</p>
                <div className="requests-pay-logos" aria-label="Accepted payment methods">
                  <AmexMark />
                  <DinersMark />
                  <VisaMark />
                  <PaypalMark />
                  <MastercardMark />
                </div>
              </section>
            </aside>
          </div>

          <section
            className="profile-page__inner requests-reviews product-detail__section product-detail__section--reviews"
            aria-labelledby="requests-reviews-heading"
          >
            <h2 id="requests-reviews-heading">Ratings &amp; reviews</h2>

            <div className="product-detail__rating-board">
              <div className="product-detail__rating-summary">
                <p className="product-detail__rating-average">
                  <strong>{reviewsBlock.average.toFixed(1)}</strong>
                  <span>/5</span>
                </p>
                <StarRating rating={reviewsBlock.average} size={16} />
                <p className="product-detail__rating-count">Based on {reviewsBlock.count} reviews</p>
              </div>

              <div className="product-detail__rate-bars" role="list" aria-label="Attribute ratings">
                {reviewsBlock.attributes.map((attribute) => {
                  const pct = Math.max(0, Math.min(100, (attribute.score / 5) * 100));
                  return (
                    <div key={attribute.label} className="product-detail__rate-bar" role="listitem">
                      <div className="product-detail__rate-bar-meta">
                        <span className="product-detail__rate-bar-label">{attribute.label}</span>
                        <strong className="product-detail__rate-bar-score">
                          {attribute.score.toFixed(1)}
                        </strong>
                      </div>
                      <div
                        className="product-detail__rate-bar-track"
                        role="meter"
                        aria-label={`${attribute.label} rating`}
                        aria-valuemin={0}
                        aria-valuemax={5}
                        aria-valuenow={attribute.score}
                      >
                        <span className="product-detail__rate-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="product-detail__reviews">
              {visibleReviews.map((review) => (
                <article key={review.id} className="product-detail__review">
                  <div className="product-detail__review-head">
                    <span className="product-detail__review-avatar" aria-hidden="true">
                      {review.avatar_initials}
                    </span>
                    <div className="product-detail__review-identity">
                      <p className="product-detail__review-name">{review.name}</p>
                      <p className="product-detail__review-meta">{review.ago}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="product-detail__review-variant">{review.variant}</p>
                  <p className="product-detail__review-text">{review.text}</p>
                </article>
              ))}
            </div>

            {remainingReviews > 0 ? (
              <button
                type="button"
                className="btn btn--secondary btn--sm product-detail__all-reviews"
                onClick={() =>
                  setVisibleReviewCount((current) =>
                    Math.min(current + REVIEW_PAGE_SIZE, availableReviews.length),
                  )
                }
              >
                {visibleReviewCount <= REVIEW_INITIAL_COUNT
                  ? `Show all ${availableReviews.length} reviews`
                  : remainingReviews > REVIEW_PAGE_SIZE
                    ? `Show ${REVIEW_PAGE_SIZE} more reviews`
                    : `Show remaining ${remainingReviews} reviews`}
              </button>
            ) : null}
          </section>
        </main>
        <MobileNav />
      </div>
    </>
  );
}
