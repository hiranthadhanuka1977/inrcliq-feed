import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", active: true, icon: "home" },
  { label: "Snaps", href: "#", icon: "snaps" },
  { label: "Photos", href: "#", icon: "photos" },
  { label: "Videos", href: "#", icon: "videos" },
  { label: "Audio", href: "#", icon: "audio" },
  { label: "Explore", href: "#", icon: "explore" },
  { label: "Messages", href: "#", icon: "messages", badge: "3" },
  { label: "Purchases", href: "#", icon: "purchases" },
  { label: "More", href: "#", icon: "more" },
] as const;

function NavIcon({ name }: { name: (typeof navItems)[number]["icon"] }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      );
    case "snaps":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "photos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    case "videos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
        </svg>
      );
    case "audio":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "explore":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    case "purchases":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      );
  }
}

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
              className={`nav-item${"active" in item && item.active ? " active" : ""}`}
              href={item.href}
            >
              <span className="nav-item__label">
                <span className={`nav-icon${item.icon === "home" ? " nav-icon--home" : ""}`} aria-hidden="true">
                  <NavIcon name={item.icon} />
                </span>
                <span className="nav-item__text">
                  {item.label}
                  {"badge" in item && item.badge ? <span className="badge">{item.badge}</span> : null}
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
