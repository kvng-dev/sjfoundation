import { Link } from "react-router-dom";
import { LuArrowRight, LuHeart } from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

export default function NotFound() {
  return (
    <section className="nf-section" aria-labelledby="nf-title">
      <style>{CSS}</style>

      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "14%", left: "8%", width: 30 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "16%", right: "9%", width: 28 }}
      />
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "10%", right: "8%", width: 60 }}
      />

      <div className="nf-wrap">
        <p className="nf-code" aria-hidden="true">
          4<span>0</span>4
        </p>
        <p className="nf-eyebrow">Page not found</p>
        <h1 id="nf-title" className="nf-title">
          Oops, we couldn&rsquo;t find that page.
        </h1>
        <p className="nf-text">
          The link may be broken, or the page may have moved. Let&rsquo;s get
          you back to something good.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">
            Back To Home <LuArrowRight aria-hidden="true" />
          </Link>
          <Link to="/donate" className="nf-btn nf-btn--outline">
            <LuHeart aria-hidden="true" /> Donate
          </Link>
        </div>

        <nav className="nf-links" aria-label="Helpful pages">
          <Link to="/our-work">Our Work</Link>
          <Link to="/christmas-in-the-street">Christmas in the Street</Link>
          <Link to="/get-involved">Get Involved</Link>
        </nav>
      </div>
    </section>
  );
}

const CSS = `
.nf-section {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: clamp(480px, 70vh, 720px);
  padding-block: clamp(48px, 7vw, 96px);
  background: #052436;
  color: #fff;
  text-align: center;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.nf-section *, .nf-section *::before, .nf-section *::after { box-sizing: border-box; }
.nf-section :focus-visible { outline: 3px solid #fff; outline-offset: 3px; border-radius: 6px; }
.nf-wrap { position: relative; z-index: 1; max-width: 620px; padding-inline: clamp(20px, 4vw, 48px); }

.nf-code {
  margin: 0 0 4px;
  font-family: 'Newsreader', Georgia, 'Times New Roman', serif;
  font-size: clamp(5rem, 16vw, 9rem);
  font-weight: 600;
  line-height: 1;
  color: #fff;
}
.nf-code span { color: #f05f0c; font-style: italic; }

.nf-eyebrow { margin: 0 0 10px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #ffb627; }
.nf-title { margin: 0 0 14px; font-family: 'Newsreader', Georgia, serif; font-size: clamp(1.7rem, 3.4vw, 2.4rem); font-weight: 500; line-height: 1.15; color: #fff; }
.nf-text { margin: 0 auto 28px; max-width: 30rem; font-size: 1rem; line-height: 1.65; color: rgba(255,255,255,.85); }

.nf-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 28px; }
.nf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.85rem 1.7rem; border: 2px solid #fff; border-radius: 999px; font-size: 0.95rem; font-weight: 700; text-decoration: none; transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.nf-btn svg { width: 1.1em; height: 1.1em; }
.nf-btn--primary { background: #f05f0c; color: #fff; box-shadow: 3px 4px 0 rgba(255,255,255,.35); }
.nf-btn--primary:hover { background: #d9530a; transform: translate(2px, 2px); box-shadow: 1px 2px 0 rgba(255,255,255,.35); }
.nf-btn--outline { background: transparent; color: #fff; }
.nf-btn--outline:hover { background: rgba(255,255,255,.12); }

.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; font-size: 0.9rem; }
.nf-links a { color: rgba(255,255,255,.8); text-decoration: underline; text-underline-offset: 4px; }
.nf-links a:hover { color: #ffb627; }

@media (max-width: 480px) {
  .nf-btn { width: 100%; }
}
`;
