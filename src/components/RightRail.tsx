export default function RightRail() {
  return (
    <aside className="right-rail">
      <section className="rail-widget">
        <div className="rail-widget__head">
          <h3>Suggested</h3>
          <a className="rail-widget__link" href="#">
            See all
          </a>
        </div>
        <ul className="suggest-list">
          <li className="suggest-item">
            <div className="suggest-item__av" style={{ "--story-color": "#8b5cf6" } as React.CSSProperties} aria-hidden="true">
              JL
            </div>
            <div className="suggest-item__body">
              <span className="suggest-item__name">Jennifer Lopez</span>
              <span className="suggest-item__meta">48.2M followers</span>
            </div>
            <button type="button" className="suggest-item__btn">
              Follow
            </button>
          </li>
          <li className="suggest-item">
            <div className="suggest-item__av" style={{ "--story-color": "#166534" } as React.CSSProperties} aria-hidden="true">
              ED
            </div>
            <div className="suggest-item__body">
              <span className="suggest-item__name">Ed Sheeran</span>
              <span className="suggest-item__meta">64.1M followers</span>
            </div>
            <button type="button" className="suggest-item__btn">
              Follow
            </button>
          </li>
          <li className="suggest-item">
            <div className="suggest-item__av" style={{ "--story-color": "#f97316" } as React.CSSProperties} aria-hidden="true">
              AG
            </div>
            <div className="suggest-item__body">
              <span className="suggest-item__name">Ariana Grande</span>
              <span className="suggest-item__meta">89.4M followers</span>
            </div>
            <button type="button" className="suggest-item__btn is-following">
              Following
            </button>
          </li>
        </ul>
      </section>

      <section className="rail-widget" id="trending-topics">
        <div className="rail-widget__head">
          <h3>
            Trending <span className="suggest-sub">· hot now</span>
          </h3>
        </div>
        <ul className="trend-list">
          {[
            { rank: 1, tag: "#ErasTour", meta: "2.4M posts" },
            { rank: 2, tag: "#Snaps", meta: "1.8M posts" },
            { rank: 3, tag: "#NewMusic", meta: "982K posts" },
            { rank: 4, tag: "#INRCLIQ", meta: "3.1M posts" },
          ].map((item) => (
            <li key={item.tag} className="trend-item">
              <span className="trend-item__rank" aria-hidden="true">
                {item.rank}
              </span>
              <div className="trend-item__body">
                <span className="trend-item__tag">{item.tag}</span>
                <span className="trend-item__meta">{item.meta}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
