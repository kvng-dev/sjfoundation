import { partners } from "../data/content.js";

export default function Partners() {
  // Duplicate the items so the second set seamlessly follows the first.
  const items = [...partners, ...partners];

  return (
    <section className="partners" aria-labelledby="partners-title">
      <div className="container partners__inner">
        <h2 id="partners-title" className="eyebrow partners__label">
          Our partners
        </h2>

        <div className="partners__carousel" aria-label="Our partners">
          <ul className="partners__track">
            {items.map((p, index) => (
              <li
                className="partners__item"
                key={`${p.name}-${index}`}
                aria-hidden={index >= partners.length}
              >
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={index >= partners.length ? "" : p.name}
                  />
                ) : (
                  <span className="partners__name">{p.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
