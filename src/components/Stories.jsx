import { LuArrowRight } from "react-icons/lu";
import { stories } from "../data/content.js";

export default function Stories() {
  return (
    <section id="stories" className="section stories">
      <div className="container">
        <div className="stories__head">
          <div>
            <p className="eyebrow">Latest stories</p>
            <h2 className="h2">Real stories. Lasting impact.</h2>
          </div>
          <a className="text-link" href="#stories">
            View All Stories <LuArrowRight aria-hidden="true" />
          </a>
        </div>

        <ul className="stories__grid">
          {stories.map((s) => (
            <li key={s.title}>
              <article className="story-card">
                <img
                  className="story-card__img"
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                />
                <div className="story-card__body">
                  <h3 className="story-card__title">{s.title}</h3>
                  <p>{s.text}</p>
                  <a className="text-link" href={s.href}>
                    Read More <LuArrowRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
