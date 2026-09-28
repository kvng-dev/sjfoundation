// ChristmasFeature.jsx — flagship teaser for the HOME / landing page
// ---------------------------------------------------------------------------
// This is a HOME PAGE component (sits alongside Hero, About, FeaturedInitiative,
// Impact — not the dedicated /christmas-on-the-streets page, which already
// exists separately). Since Christmas on the Streets is the proven flagship
// (unlike Project 1,000 Smiles, which is still "coming soon"), it gets its
// own featured banner too — recommended placement is BEFORE
// FeaturedInitiative, so the running programme is introduced before the
// upcoming one:
//
//   <Hero />
//   <StatsBand />
//   <About />
//   <ChristmasFeature />      <-- add this
//   <FeaturedInitiative />
//   <Impact />
//   ...
//
// Self-contained (own scoped "cf-" styles + the shared <Doodle>), so it
// doesn't depend on your global index.css matching any particular state.
// Place at: src/components/ChristmasFeature.jsx
// ---------------------------------------------------------------------------
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Doodle } from "./Doodles.jsx";

import photo from "../assets/IMG_3132.JPG.jpeg";

const LINK = "/christmas-on-the-streets";

export default function ChristmasFeature() {
  return (
    <section className="cf-section" aria-labelledby="cf-title">
      <style>{CSS}</style>

      <div className="cf-photo">
        <img
          src={photo}
          alt="Children at a past Christmas on the Streets celebration"
          loading="lazy"
        />
        <span className="cf-badge">Edition 4 · Dec 19</span>
        <Doodle
          name="sparkle"
          fill="currentColor"
          className="lp-abs lp-float lp-c-sun"
          style={{ top: "8%", left: "8%", width: 30 }}
        />
      </div>

      <div className="cf-panel">
        <Doodle
          name="dots"
          className="lp-abs lp-c-line lp-edge"
          style={{ top: "12%", right: "10%", width: 60 }}
        />
        <div className="cf-content">
          <p className="cf-eyebrow">Our flagship initiative</p>
          <h2 id="cf-title" className="cf-title">
            Christmas on the Streets
          </h2>
          <p className="cf-sub">
            3 editions. 1,354+ children reached. And counting.
          </p>
          <p className="cf-text">
            Every last Saturday of December, we throw a party for children, run
            health checks for the adults who bring them, and hand out foodstuffs
            to widows and market women in the community. Edition 4 is this
            December 19.
          </p>
          <Link to={LINK} className="cf-btn">
            Explore Christmas On The Streets <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.cf-section {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(0,1fr);
  min-height: 420px;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.cf-section *, .cf-section *::before, .cf-section *::after { box-sizing: border-box; }
.cf-section :focus-visible { outline: 3px solid #fff; outline-offset: 3px; border-radius: 6px; }

.cf-photo { position: relative; overflow: hidden; }
.cf-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 45% 30%; }
.cf-badge { position: absolute; top: 20px; right: 20px; z-index: 1; padding: 0.45em 1em; background: #ffb627; border: 2px solid #0b2233; border-radius: 999px; font-size: 0.8rem; font-weight: 700; color: #0b2233; box-shadow: 3px 4px 0 #0b2233; }

.cf-panel { position: relative; overflow: hidden; display: flex; align-items: center; background: linear-gradient(120deg, #0b3450 0%, #052436 100%); color: #fff; }
.cf-content { position: relative; z-index: 1; max-width: 34rem; padding: clamp(36px, 5vw, 72px); }
.cf-eyebrow { margin: 0 0 10px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #ffb627; }
.cf-title { margin: 0 0 8px; font-family: 'Newsreader', Georgia, 'Times New Roman', serif; font-size: clamp(2.1rem, 3.6vw, 3rem); font-weight: 500; line-height: 1.12; color: #fff; }
.cf-sub { margin: 0 0 16px; font-family: 'Newsreader', Georgia, serif; font-size: 1.2rem; font-style: italic; color: rgba(255,255,255,.85); }
.cf-text { margin: 0 0 28px; font-size: 1rem; line-height: 1.65; color: rgba(255,255,255,.88); max-width: 32rem; }

.cf-btn { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.7rem; border: 2px solid #fff; border-radius: 999px; background: #fff; color: #c9500a; font-size: 0.92rem; font-weight: 700; text-decoration: none; transition: background-color 0.2s, transform 0.15s; }
.cf-btn svg { width: 1.1em; height: 1.1em; }
.cf-btn:hover { background: #fff4ea; transform: translateY(-1px); }

@media (max-width: 860px) {
  .cf-section { grid-template-columns: 1fr; }
  .cf-photo { height: clamp(240px, 60vw, 360px); }
}
`;
