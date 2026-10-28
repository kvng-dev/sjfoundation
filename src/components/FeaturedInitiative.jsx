import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Doodle } from "./Doodles.jsx";
import projectImg from "../assets/IMG_3127.JPG.jpeg";

export default function FeaturedInitiative() {
  return (
    <section id="project" className="featured" aria-labelledby="project-title">
      <div className="featured__photo lp-relative">
        <img
          src={projectImg}
          alt="A group of smiling children in orange t-shirts"
          loading="lazy"
        />

        {/* Status badge: remove once Project 1,000 Smiles has actually launched */}
        <span className="lp-soon" aria-label="Coming soon">
          <span>Coming</span>
          <span>Soon</span>
        </span>

        <Doodle
          name="sparkle"
          fill="currentColor"
          className="lp-abs lp-float lp-c-sun lp-edge"
          style={{ top: "8%", left: "6%", width: 34 }}
        />
      </div>

      <div className="featured__panel">
        <Doodle
          name="dots"
          className="lp-abs lp-c-line lp-edge"
          style={{ top: "10%", right: "10%", width: 66 }}
        />

        <div className="featured__content">
          <p className="eyebrow eyebrow--light">Featured initiative</p>
          <h2 id="project-title" className="featured__title">
            Project 1,000 Smiles
          </h2>
          <p className="featured__sub">More than a number. A commitment.</p>
          <p className="featured__text">
            Project 1,000 Smiles is a year-round initiative we’re preparing to
            launch for children, women, and communities in Lagos. It will carry
            the hope and belonging we bring every December into every month of
            the year.
          </p>
          <Link to="/project-1000-smiles" className="btn btn--white">
            About Project 1,000 Smiles <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
