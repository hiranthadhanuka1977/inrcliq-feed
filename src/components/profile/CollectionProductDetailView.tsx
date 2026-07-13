"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import LeftNav from "@/components/LeftNav";
import MobileNav from "@/components/MobileNav";
import PageBodyClass from "@/components/PageBodyClass";
import type { CollectionProduct } from "@/types/collection";
import type { ProfileData } from "@/types/profile";

function CartButton({ count }: { count: number }) {
  const itemLabel = count === 1 ? "1 item" : `${count} items`;

  return (
    <button
      type="button"
      className="btn btn--warning btn--sm collection-cart"
      aria-label={`Shopping bag, ${itemLabel}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span className="collection-cart__label">{itemLabel}</span>
    </button>
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

export default function CollectionProductDetailView({
  profile,
  product,
}: {
  profile: ProfileData;
  product: CollectionProduct;
}) {
  const detail = product.detail;
  const [cartCount, setCartCount] = useState(0);
  const [activeImage, setActiveImage] = useState(
    detail?.gallery[0]?.src ?? product.image,
  );
  const [colorId, setColorId] = useState(detail?.defaultColorId ?? "");
  const [sizeId, setSizeId] = useState(detail?.defaultSizeId ?? "");
  const [liked, setLiked] = useState(false);

  const selectedColor = useMemo(
    () => detail?.colors.find((color) => color.id === colorId),
    [colorId, detail?.colors],
  );
  const selectedSize = useMemo(
    () => detail?.sizes.find((size) => size.id === sizeId),
    [detail?.sizes, sizeId],
  );

  const gallery = detail?.gallery?.length
    ? detail.gallery
    : [{ src: product.image, alt: product.image_alt || product.name }];

  const descriptionParagraphs = (detail?.longDescription ?? product.description)
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  function addToCart() {
    setCartCount((count) => count + 1);
  }

  function selectColor(nextId: string, image: string) {
    setColorId(nextId);
    setActiveImage(image);
  }

  return (
    <>
      <PageBodyClass pageClass="page-profile" />
      <div className="app-shell page-profile page-collection page-product-detail">
        <LeftNav />
        <main className="main-content profile-page collection-page product-detail-page">
          <header className="product-detail-topbar">
            <div className="product-detail-topbar__inner">
              <Link
                href={`/profile/${profile.slug}/collection`}
                className="product-detail-back btn btn--sm btn--icon btn--secondary"
                aria-label="Back to collection"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </Link>

              <div className="product-detail-topbar__seller">
                <div
                  className="story-avatar product-detail-topbar__avatar"
                  style={{ "--story-color": profile.avatar_color } as React.CSSProperties}
                >
                  {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt="" width={36} height={36} />
                  ) : (
                    profile.avatar_initials
                  )}
                </div>
                <div className="product-detail-topbar__copy">
                  <p className="product-detail-topbar__name">{product.name}</p>
                  <p className="product-detail-topbar__meta">{profile.name}</p>
                </div>
              </div>

              <CartButton count={cartCount} />
            </div>
          </header>

          <div className="profile-page__inner">
            <div className="product-detail">
              <div className="product-detail__main">
                <section className="product-detail__gallery" aria-label="Product images">
                  <div className="product-detail__stage">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={activeImage} alt={product.image_alt || product.name} width={800} height={800} />
                    {product.offer ? (
                      <span className="collection-product__media-badge product-detail__badge">
                        {product.offer.badge}
                      </span>
                    ) : null}
                  </div>
                  {gallery.length > 1 ? (
                    <div className="product-detail__thumbs" role="list">
                      {gallery.map((image) => {
                        const selected = activeImage === image.src;
                        return (
                          <button
                            key={image.src}
                            type="button"
                            role="listitem"
                            className={`product-detail__thumb${selected ? " is-active" : ""}`}
                            aria-label={image.alt}
                            aria-pressed={selected}
                            onClick={() => setActiveImage(image.src)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image.src} alt="" width={120} height={120} />
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </section>

                <section className="product-detail__info" aria-labelledby="product-detail-heading">
                  <div className="product-detail__price-row">
                    <div className="product-detail__prices">
                      <span className="product-detail__price">{product.price}</span>
                      {product.compareAtPrice ? (
                        <span className="product-detail__compare">{product.compareAtPrice}</span>
                      ) : null}
                      {product.offer?.discountLabel ? (
                        <span className="product-detail__discount">{product.offer.discountLabel}</span>
                      ) : null}
                    </div>
                    <div className="product-detail__actions">
                      <button
                        type="button"
                        className={`product-detail__icon-btn${liked ? " is-active" : ""}`}
                        aria-label={liked ? "Remove from saved" : "Save item"}
                        aria-pressed={liked}
                        onClick={() => setLiked((value) => !value)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button type="button" className="product-detail__icon-btn" aria-label="Share product">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h1 id="product-detail-heading" className="product-detail__title">
                    {product.name}
                  </h1>
                  <p className="product-detail__headline">{detail?.headline ?? product.description}</p>

                  <div className="product-detail__rating-row">
                    <StarRating rating={detail?.reviewAverage ?? product.rating} size={14} />
                    <span>
                      {(detail?.reviewAverage ?? product.rating).toFixed(1)} · {product.soldLabel}
                    </span>
                  </div>

                  {detail?.colors?.length ? (
                    <div className="product-detail__option">
                      <p className="product-detail__option-label">
                        Color: <strong>{selectedColor?.label ?? "—"}</strong>
                      </p>
                      <div className="product-detail__colors" role="list">
                        {detail.colors.map((color) => {
                          const selected = color.id === colorId;
                          return (
                            <button
                              key={color.id}
                              type="button"
                              role="listitem"
                              className={`product-detail__color${selected ? " is-active" : ""}`}
                              aria-label={color.label}
                              aria-pressed={selected}
                              onClick={() => selectColor(color.id, color.image)}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={color.image} alt="" width={56} height={56} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {detail?.sizes?.length ? (
                    <div className="product-detail__option">
                      <p className="product-detail__option-label">
                        Size:{" "}
                        <strong>
                          {selectedSize
                            ? `${selectedSize.label} (${selectedSize.hint})`
                            : "—"}
                        </strong>
                      </p>
                      <div className="product-detail__sizes" role="list">
                        {detail.sizes.map((size) => {
                          const selected = size.id === sizeId;
                          return (
                            <button
                              key={size.id}
                              type="button"
                              role="listitem"
                              className={`product-detail__size${selected ? " is-active" : ""}`}
                              aria-pressed={selected}
                              onClick={() => setSizeId(size.id)}
                            >
                              <span>{size.label}</span>
                              <span className="product-detail__size-hint">{size.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className="product-detail__cta-row">
                    <button type="button" className="btn btn--primary product-detail__cta" onClick={addToCart}>
                      Buy now
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary product-detail__cta"
                      onClick={addToCart}
                    >
                      {product.ctaLabel ?? (product.kind === "digital" ? "Get digital" : "Add to bag")}
                    </button>
                  </div>
                </section>
              </div>

              <aside className="product-detail__aside" aria-label="Delivery and returns">
                <div className="product-detail__panel">
                  <h2>Delivery options</h2>
                  <p className="product-detail__panel-row">
                    <span>{detail?.delivery.location ?? "Western, Colombo 1-15"}</span>
                    <button type="button" className="product-detail__edit" aria-label="Edit delivery location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                  </p>
                  <p className="product-detail__panel-meta">
                    Standard delivery · {detail?.delivery.standardFee ?? "LKR 500.00"}
                  </p>
                  {(detail?.delivery.cod ?? true) ? (
                    <p className="product-detail__cod">Cash on Delivery available</p>
                  ) : null}
                </div>

                <div className="product-detail__panel">
                  <h2>Return &amp; warranty</h2>
                  <p className="product-detail__panel-meta">{detail?.delivery.returns ?? "14 days easy return"}</p>
                  <p className="product-detail__panel-meta">{detail?.delivery.warranty ?? "Warranty not available"}</p>
                </div>
              </aside>

              <section className="product-detail__section" aria-labelledby="product-description-heading">
                <h2 id="product-description-heading">Description</h2>
                {descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>

              {detail ? (
                <section
                  className="product-detail__section product-detail__section--reviews"
                  aria-labelledby="product-reviews-heading"
                >
                  <h2 id="product-reviews-heading">Ratings &amp; reviews</h2>

                  <div className="product-detail__rating-board">
                    <div className="product-detail__rating-summary">
                      <p className="product-detail__rating-average">
                        <strong>{detail.reviewAverage.toFixed(1)}</strong>
                        <span>/5</span>
                      </p>
                      <StarRating rating={detail.reviewAverage} size={16} />
                      <p className="product-detail__rating-count">
                        Based on {detail.reviewCount} reviews
                      </p>
                    </div>

                    <div className="product-detail__rate-bars" role="list" aria-label="Attribute ratings">
                      {detail.reviewAttributes.map((attribute) => {
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
                              <span
                                className="product-detail__rate-bar-fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="product-detail__reviews">
                    {detail.reviews.map((review) => (
                      <article key={review.id} className="product-detail__review">
                        <div className="product-detail__review-head">
                          <span className="product-detail__review-avatar" aria-hidden="true">
                            {review.avatar_initials}
                          </span>
                          <div>
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

                  <button type="button" className="btn btn--secondary btn--sm product-detail__all-reviews">
                    Show all {detail.reviewsTotal} reviews
                  </button>
                </section>
              ) : null}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </>
  );
}
