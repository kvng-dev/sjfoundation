import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Doodle } from "./Doodles.jsx";
import { focusAreas } from "../data/content.js";
import aboutImg from "../assets/IMG_3113.JPG.jpeg";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__copy">
          <p className="eyebrow">Who we are</p>
          <h2 className="h2">More than a foundation. A movement for change.</h2>
          <p>
            The Sanusi Jafar Foundation is a Lagos-based non-profit organisation
            committed to restoring hope, dignity and belonging for children,
            mothers and communities through sustainable programmes and strategic
            partnerships.
          </p>
          {/* Was an in-page anchor; now points at the real About Us page. */}
          <Link to="/about" className="btn btn--outline-orange">
            Our Story <LuArrowRight aria-hidden="true" />
          </Link>
        </div>

        <figure className="about__photo lp-taped">
          <Doodle
            name="heart"
            fill="currentColor"
            className="lp-abs lp-float lp-c-o lp-edge"
            style={{ top: "-12%", right: "-8%", width: 34 }}
          />
          <img
            src={aboutImg}
            alt="A mother in a colourful headwrap hugging her smiling daughter"
            loading="lazy"
          />
        </figure>

        <div id="focus" className="about__focus lp-relative">
          <Doodle
            name="star"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun lp-edge"
            style={{ top: "-8%", right: "2%", width: 28 }}
          />
          <p className="eyebrow">Our focus</p>
          <h2 className="h2">Where we make a difference.</h2>
          <ul className="focus-grid">
            {focusAreas.map(({ title, text, icon: Icon }) => (
              <li className="focus-item" key={title}>
                <span className="icon-badge" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3 className="focus-item__title">{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
