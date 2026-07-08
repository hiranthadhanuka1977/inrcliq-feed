import Link from "next/link";
import { NavIcon, type NavIconName } from "@/lib/nav-icons";

const navItems: {
  label: string;
  href: string;
  icon: NavIconName;
  active?: boolean;
  badge?: string;
}[] = [
  { label: "Home", href: "/", active: true, icon: "home" },
  { label: "Snaps", href: "#", icon: "snaps" },
  { label: "Photos", href: "#", icon: "photos" },
  { label: "Videos", href: "#", icon: "videos" },
  { label: "Audio", href: "#", icon: "audio" },
  { label: "Explore", href: "#", icon: "explore" },
  { label: "Messages", href: "#", icon: "messages", badge: "3" },
  { label: "Purchases", href: "#", icon: "purchases" },
  { label: "More", href: "#", icon: "more" },
];

export default function LeftNav() {
  return (
    <aside className="left-nav">
      <div className="left-nav__body">
        <div className="left-nav__header">
          <div className="brand">
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              INRCLIQ<span className="dot">.</span>
            </Link>
          </div>
          <a className="nav-notify" href="#" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="nav-notify__dot" aria-hidden="true" />
          </a>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.label}
              className={`nav-item${item.active ? " active" : ""}`}
              href={item.href}
            >
              <span className="nav-item__label">
                <span className={`nav-icon${item.icon === "home" ? " nav-icon--home" : ""}`} aria-hidden="true">
                  <NavIcon name={item.icon} />
                </span>
                <span className="nav-item__text">
                  {item.label}
                  {item.badge ? <span className="badge">{item.badge}</span> : null}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="nav-promo">
        <div className="nav-promo__card" role="region" aria-label="Creator tools">
          <div className="nav-promo__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-5 4 3 5-7" />
            </svg>
          </div>
          <h3 className="nav-promo__title">Go Premium</h3>
          <p className="nav-promo__text">Turn your followers into paying subscribers today.</p>
          <button type="button" className="btn btn--outline-brand btn--sm btn--block nav-promo__btn">
            Unlock Premium Tools
          </button>
        </div>
      </div>

      <div className="nav-create">
        <button type="button" className="nav-create__btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create
        </button>
      </div>

      <div className="nav-profile">
        <a href="#" className="nav-profile__link">
          <span className="nav-profile__avatar" style={{ "--story-color": "#0d9488" } as React.CSSProperties} aria-hidden="true">
            D
          </span>
          <span className="nav-profile__info">
            <span className="nav-profile__name">Dhanuka</span>
            <span className="nav-profile__meta">Your memberships</span>
          </span>
        </a>
        <button type="button" className="nav-profile__menu" aria-label="Account menu">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="5" r="1.75" />
            <circle cx="12" cy="12" r="1.75" />
            <circle cx="12" cy="19" r="1.75" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
