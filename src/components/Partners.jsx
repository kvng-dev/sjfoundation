import { useEffect, useState } from "react";
import { partners } from "../data/content.js";

export default function Partners() {
  // Duplicate the items (client-side only) so the second set seamlessly
  // follows the first. Keeping the copy out of the prerendered HTML avoids
  // duplicate images and empty-alt tags for crawlers.
  const [loop, setLoop] = useState(false);
  useEffect(() => setLoop(true), []);
  const items = loop ? [...partners, ...partners] : partners;

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
                    alt={index >= partners.length ? "" : `${p.name} logo`}
                    loading="lazy"
                    decoding="async"
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
