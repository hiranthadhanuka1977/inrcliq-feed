"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import LeftNav from "@/components/LeftNav";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import {
  formatRequestPriceRange,
  getCreatorRequests,
  resolveSpecialRequestReviews,
  type RequestService,
  type RequestServiceDetails,
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
  details,
  media,
}: {
  serviceId: string;
  details: RequestServiceDetails;
  media: RequestServiceMedia;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [serviceId, media.kind]);

  async function toggleAudio(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="requests-detail" onClick={(event) => event.stopPropagation()}>
      <div className="requests-detail__hero">
        <div className="requests-detail__intro">
          <h3 className="requests-detail__title">About the service</h3>
          <p className="requests-detail__description">{details.about}</p>
        </div>

        <div className={`requests-detail__sample requests-detail__sample--${media.kind}`}>
          <p className="requests-detail__label">
            {media.kind === "video" ? "Sample preview" : "Audio sample"}
          </p>
          {media.kind === "video" ? (
            <div className="requests-detail__video">
              <div className="requests-detail__video-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.poster} alt="" />
                <span className="requests-detail__video-play" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <p className="requests-detail__caption">{media.caption}</p>
            </div>
          ) : (
            <div className="requests-detail__audio">
              <button
                type="button"
                className={`requests-detail__audio-btn${playing ? " is-playing" : ""}`}
                aria-label={playing ? "Pause audio sample" : "Play audio sample"}
                onClick={toggleAudio}
              >
                <span className="requests-detail__audio-icon" aria-hidden="true">
                  {playing ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
                <span className="requests-detail__audio-copy">
                  <strong>{media.title}</strong>
                  <span>{media.duration}</span>
                </span>
              </button>
              <audio
                ref={audioRef}
                src={media.src}
                preload="none"
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="requests-detail__grid">
        <section className="requests-detail__section">
          <h4>What’s on offer</h4>
          <ul>
            {details.onOffer.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="requests-detail__section">
          <h4>Booking & payment</h4>
          <ul>
            {details.booking.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="requests-detail__section">
          <h4>Licensing</h4>
          <ul>
            {details.licensing.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {details.termsHref ? (
              <li>
                Please see the full{" "}
                <a href={details.termsHref}>Terms & conditions of use</a>.
              </li>
            ) : null}
          </ul>
        </section>
      </div>
    </div>
  );
}

function flattenServices(categories: ReturnType<typeof getCreatorRequests>) {
  if (!categories) return [] as RequestService[];
  return categories.categories.flatMap((category) => category.services);
}

export default function ProfileRequestsView({
  profile,
  variant = "start",
}: {
  profile: ProfileData;
  variant?: "start" | "choose";
}) {
  const content = getCreatorRequests(profile.slug);
  const allServices = useMemo(() => flattenServices(content), [content]);
  const reviewsBlock = useMemo(() => resolveSpecialRequestReviews(profile.slug), [profile.slug]);
  const [categoryId, setCategoryId] = useState("");
  const [selectedId, setSelectedId] = useState(allServices[0]?.id ?? "");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [visibleReviewCount, setVisibleReviewCount] = useState(REVIEW_INITIAL_COUNT);
  const [pickerStep, setPickerStep] = useState<1 | 2 | 3 | 4>(1);

  if (!content) return null;

  const isStart = variant === "start";
  const chooseHref = `/profile/${profile.slug}/requests/choose`;
  const backHref = isStart ? `/profile/${profile.slug}` : `/profile/${profile.slug}/requests`;
  const backLabel = isStart
    ? `Back to ${profile.name}'s profile`
    : "Back to Special Requests";

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
      <div className={`app-shell page-profile page-requests${isStart ? " page-requests--start" : " page-requests--choose"}`}>
        <LeftNav />
        <main className="main-content profile-page requests-page">
          <header className="product-detail-topbar requests-topbar">
            <div className="product-detail-topbar__inner requests-topbar__inner">
              <Link
                href={backHref}
                className="product-detail-back btn btn--sm btn--icon btn--secondary"
                aria-label={backLabel}
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

          <div
            className={`profile-page__inner requests-layout${isStart ? " requests-layout--start" : ` requests-layout--choose requests-layout--step-${pickerStep}`}`}
          >
            <div className="requests-main">
              {isStart ? (
                <>
                  <section className="requests-intro" aria-labelledby="requests-heading">
                    <h1 id="requests-heading">Make it personal</h1>
                    {content.intro.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>

                  <div className="requests-start-split">
                    <div className="requests-start-main">
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

                      <section className="requests-start-cta" aria-label="Start booking">
                        <div className="requests-start-cta__copy">
                          <h2>Ready to book something special?</h2>
                          <p>Pick an occasion, choose a request, and Mia will take it from there.</p>
                        </div>
                        <Link href={chooseHref} className="btn btn--primary requests-start-cta__btn">
                          Choose your experience
                        </Link>
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

                      <section
                        className="requests-card requests-card--guarantee"
                        aria-labelledby="requests-guarantee-heading"
                      >
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
                </>
              ) : (
                <section className="requests-guide" aria-labelledby="requests-guide-heading">
                  <header className="requests-guide__head">
                    <div className="requests-guide__copy">
                      <p className="requests-guide__eyebrow">Step {pickerStep} of 4</p>
                      <h1 id="requests-guide-heading" className="requests-guide__title">
                        {pickerStep === 1
                          ? "What do you need?"
                          : pickerStep === 2
                            ? "Pick your request"
                            : pickerStep === 3
                              ? "Personalize your request"
                              : "Pay & confirm"}
                      </h1>
                      <p>
                        {pickerStep === 1
                          ? "Choose an occasion type. You’ll refine the exact request next."
                          : pickerStep === 2
                            ? `Select one option from ${activeCategory.title.toLowerCase()}.`
                            : pickerStep === 3
                              ? "Add the details Mia needs to make this request feel personal."
                              : "Review your request and complete payment to lock it in."}
                      </p>
                    </div>

                    <nav className="requests-progress" aria-label="Request steps">
                      {(
                        [
                          { step: 1 as const, label: "Occasion", enabled: true },
                          { step: 2 as const, label: "Request", enabled: hasChosenCategory },
                          {
                            step: 3 as const,
                            label: "Personalize",
                            enabled: hasChosenCategory && Boolean(selected),
                          },
                          {
                            step: 4 as const,
                            label: "Pay & Confirm",
                            enabled: hasChosenCategory && Boolean(selected),
                          },
                        ] as const
                      ).map((item, index) => (
                        <Fragment key={item.step}>
                          {index > 0 ? (
                            <span className="requests-progress__rule" aria-hidden="true" />
                          ) : null}
                          <button
                            type="button"
                            className={`requests-progress__step${
                              pickerStep === item.step
                                ? " is-active"
                                : pickerStep > item.step
                                  ? " is-done"
                                  : ""
                            }`}
                            onClick={() => setPickerStep(item.step)}
                            disabled={!item.enabled}
                            aria-current={pickerStep === item.step ? "step" : undefined}
                          >
                            <span className="requests-progress__num" aria-hidden="true">
                              {item.step}
                            </span>
                            <span className="requests-progress__label">{item.label}</span>
                          </button>
                        </Fragment>
                      ))}
                    </nav>
                  </header>

                  {pickerStep === 1 ? (
                    <>
                      <div className="requests-intent-grid" role="list">
                        {content.categories.map((category) => {
                          const fromPrice = Math.min(
                            ...category.services.map((service) => service.priceMin),
                          );
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
                              <span className="requests-intent__media">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={category.image} alt="" />
                              </span>
                              <span className="requests-intent__content">
                                <span className="requests-intent__copy">
                                  <span className="requests-intent__eyebrow">{category.intent}</span>
                                  <strong>{category.title}</strong>
                                  <span className="requests-intent__blurb">{category.blurb}</span>
                                </span>
                                <span className="requests-intent__footer">
                                  <span className="requests-intent__meta">
                                    From ${fromPrice}
                                    <span aria-hidden="true"> · </span>
                                    {category.services.length} options
                                  </span>
                                  <span className="requests-intent__cta">
                                    Choose
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : pickerStep === 2 ? (
                    <>
                      <div className="requests-service-panel__context">
                        <span className="requests-service-panel__thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={activeCategory.image} alt="" />
                        </span>
                        <div className="requests-service-panel__copy">
                          <p className="requests-service-panel__intent">{activeCategory.intent}</p>
                          <h2>{activeCategory.title}</h2>
                        </div>
                      </div>

                      <div className="requests-choose-split">
                        <div className="requests-service-panel">
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
                                  <span className="requests-service__radio" aria-hidden="true" />
                                  <span className="requests-service__body">
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
                                </label>
                              );
                            })}
                          </fieldset>

                          {selected ? (
                            <ServiceExplainer
                              serviceId={selected.id}
                              details={selected.details}
                              media={selected.media}
                            />
                          ) : null}
                        </div>

                        <aside className="requests-choose-summary">
                          <section className="requests-card" aria-labelledby="requests-booking-heading">
                            <h2 id="requests-booking-heading">Your request</h2>
                            <p className="requests-booking__selected">
                              {selected?.label ?? "Select a request"}
                            </p>
                            <dl className="requests-booking">
                              <div>
                                <dt>Price range</dt>
                                <dd>{priceRange}</dd>
                              </div>
                              <div>
                                <dt>Avg. response</dt>
                                <dd>{content.responseTime}</dd>
                              </div>
                              <div>
                                <dt>Next available</dt>
                                <dd>{content.nextAvailable}</dd>
                              </div>
                            </dl>
                            <button
                              type="button"
                              className="btn btn--primary requests-continue"
                              disabled={!selected}
                              onClick={() => setPickerStep(3)}
                            >
                              Personalize
                            </button>
                          </section>
                        </aside>
                      </div>
                    </>
                  ) : (
                    <section className="requests-card requests-coming-soon" aria-live="polite">
                      <h2>{pickerStep === 3 ? "Personalize" : "Pay & Confirm"}</h2>
                      <p>
                        {pickerStep === 3
                          ? "This step will collect recipient details, notes, and delivery preferences."
                          : "This step will summarize your request and take you through payment."}
                      </p>
                      {pickerStep === 3 ? (
                        <button
                          type="button"
                          className="btn btn--primary requests-continue"
                          onClick={() => setPickerStep(4)}
                        >
                          Continue
                        </button>
                      ) : null}
                    </section>
                  )}
                </section>
              )}
            </div>
          </div>

          {isStart ? (
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
          ) : null}
        </main>
        <MobileNav />
      </div>
    </>
  );
}
