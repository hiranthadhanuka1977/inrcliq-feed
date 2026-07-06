import type { ProfileCollectionItem } from "@/types/profile";

export default function ProfileCollection({ items }: { items: ProfileCollectionItem[] }) {
  return (
    <section className="profile-collection" aria-labelledby="collection-heading">
      <div className="profile-collection__head">
        <h2 id="collection-heading">Collection</h2>
        <div className="profile-collection__actions">
          <a href="#" className="profile-collection__view-all">
            View all
          </a>
        </div>
      </div>
      <ul className="profile-collection__list" id="collection-track">
        {items.map((item) => (
          <li key={item.name}>
            <a href="#" className="profile-collection__item">
              <span className="profile-collection__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.image_alt} width={168} height={168} />
              </span>
              <span className="profile-collection__info">
                <span className="profile-collection__name">{item.name}</span>
                <span className="profile-collection__price">{item.price}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
