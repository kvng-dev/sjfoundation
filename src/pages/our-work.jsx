// OurWork.jsx — "Our Work" hub page (SLIMMED VERSION)
// ---------------------------------------------------------------------------
// This REPLACES the previous, heavier OurWork.jsx. Christmas on the Streets
// now has its own dedicated page (ChristmasOnTheStreets.jsx) and is no
// longer a top-level nav item — this hub page is no longer in the top nav
// either, per your call, but it still exists so you can link to it from
// wherever makes sense (Home's "Our Work" button, footer, etc.) as a
// "see everything we do" overview.
//
// Keeps: a short intro, two teaser cards (Christmas on the Streets +
// Project 1,000 Smiles — same id="smiles" anchor as before, so existing
// links from Impact.jsx / GetInvolved.jsx keep working), the four focus
// areas, and a closing CTA.
//
// Place at: src/pages/OurWork.jsx (overwrite the old one)
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuBaby,
  LuFlower2,
  LuGraduationCap,
  LuHandshake,
  LuHeart,
  LuHeartHandshake,
  LuMapPin,
  LuUsers,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

// Reusing existing site photos as placeholders.
import christmasPhoto from "../assets/IMG_3132.JPG.jpeg";
import smilesPhoto from "../assets/IMG_3127.JPG.jpeg";

/* ==========================================================================
   EDITABLE CONTENT
   ========================================================================== */

const FOCUS = [
  {
    title: "Child Welfare",
    text: "Creating safer, brighter futures for children.",
    icon: LuBaby,
    seenIn: "Christmas on the Streets",
  },
  {
    title: "Women Empowerment",
    text: "Supporting mothers and women to build stronger households and communities.",
    icon: LuFlower2,
    seenIn: "Christmas on the Streets",
  },
  {
    title: "Youth Development",
    text: "Creating pathways for young people to learn, grow and pursue opportunities.",
    icon: LuGraduationCap,
    seenIn: "Project 1,000 Smiles",
  },
  {
    title: "Community Outreach",
    text: "Responding to practical needs while building stronger community relationships.",
    icon: LuHeartHandshake,
    seenIn: "Christmas on the Streets",
  },
];

const LINKS = {
  christmas: "/christmas-in-the-street",
  volunteer: "/get-involved#volunteer",
  partner: "/get-involved#partner",
  donate: "/get-involved#donate",
  project: "/project-1000-smiles",
};

/* ==========================================================================
   HELPERS
   ========================================================================== */

function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`ow-reveal${shown ? " is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

function Hero() {
  return (
    <section className="ow-hero" aria-labelledby="ow-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "14%", left: "5%", width: 32 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "16%", right: "6%", width: 28 }}
      />
      <div className="ow-wrap">
        <p className="ow-eyebrow">Our work</p>
        <h1 id="ow-hero-title" className="ow-h1">
          This is how we show up.
        </h1>
        <p className="ow-lead">
          Right now, our work lives in two places:{" "}
          <strong>Christmas on the Streets</strong>, the flagship day
          we&rsquo;ve run for three years and counting, and{" "}
          <strong>Project 1,000 Smiles</strong>, the year-round commitment
          we&rsquo;re building next.
        </p>
      </div>
    </section>
  );
}

function Teasers() {
  return (
    <section className="ow-sec ow-teasers" aria-label="Our two programmes">
      <div className="ow-wrap ow-teasers__grid">
        <Reveal id="christmas" as="article" className="ow-teaser">
          <div className="ow-teaser__photo">
            <img
              src={christmasPhoto}
              alt="Children at a past Christmas on the Streets celebration"
              loading="lazy"
            />
            <span className="ow-teaser__tag ow-teaser__tag--live">
              Edition 4 · This December
            </span>
          </div>
          <div className="ow-teaser__body">
            <h2>Christmas in the Street</h2>
            <p>
              A party for children, health checks for the adults who bring them,
              and foodstuffs for widows and market women &mdash; every last
              Saturday of December, three editions and counting.
            </p>
            <Link to={LINKS.christmas} className="ow-textlink">
              Explore Christmas in the Street{" "}
              <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal id="smiles" delay={100} as="article" className="ow-teaser">
          <div className="ow-teaser__photo">
            <img
              src={smilesPhoto}
              alt="A group of smiling children in orange t-shirts"
              loading="lazy"
            />
            <span className="lp-soon" aria-label="Coming soon">
              <span>Coming</span>
              <span>Soon</span>
            </span>
          </div>
          <div className="ow-teaser__body">
            <h2>Project 1,000 Smiles</h2>
            <p>
              Not a bigger one-day event &mdash; a year-round way to reach
              children, mothers and communities in the months between one
              December and the next.
            </p>
            <a href={LINKS.project} className="ow-textlink">
              Explore Project 1,000 smiles <LuArrowRight aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section className="ow-sec ow-focus" aria-labelledby="ow-focus-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "6%", right: "6%", width: 34 }}
      />
      <div className="ow-wrap">
        <Reveal>
          <p className="ow-eyebrow">Where we make a difference</p>
          <h2 id="ow-focus-title" className="ow-h2">
            Four focus areas. Two programmes.
          </h2>
        </Reveal>

        <ul className="ow-focus__grid">
          {FOCUS.map(({ title, text, icon: Icon, seenIn }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="ow-focus__card">
                <span className="ow-focus__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="ow-focus__seen">
                  <LuMapPin aria-hidden="true" /> {seenIn}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="ow-cta" aria-labelledby="ow-cta-title">
      <div className="ow-wrap">
        <Reveal className="ow-cta__box">
          <Doodle
            name="gift"
            className="lp-abs lp-float lp-c-o"
            style={{ top: 18, left: 24, width: 36 }}
          />
          <Doodle
            name="star"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun"
            style={{ bottom: 20, right: 28, width: 34 }}
          />
          <h2 id="ow-cta-title" className="ow-h2 ow-h2--center">
            Be part of Edition 4 &mdash; or Project 1,000 Smiles from day one.
          </h2>
          <div className="ow-cta__actions">
            <Link to={LINKS.volunteer} className="ow-btn ow-btn--primary">
              <LuUsers aria-hidden="true" /> Volunteer
            </Link>
            <Link to={LINKS.partner} className="ow-btn ow-btn--outline">
              <LuHandshake aria-hidden="true" /> Partner
            </Link>
            <Link to={LINKS.donate} className="ow-btn ow-btn--outline">
              <LuHeart aria-hidden="true" /> Donate
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function OurWork() {
  useEffect(() => {
    document.title = "Our Work | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="ow-page">
      <style>{CSS}</style>
      <Hero />
      <Teasers />
      <FocusAreas />
      <ClosingCta />
    </div>
  );
}

/* ==========================================================================
   STYLES ("ow-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.ow-page {
  --o: #ff741f; --od: #f05f0c; --oi: #c9500a; --ink: #0b2233; --navy: #052436;
  --body: #3f4d58; --cream: #faf9f4; --sun: #ffb627; --peach: #ffe9d6; --line: #eadfd2;
  --serif: 'Newsreader', Georgia, 'Times New Roman', serif;
  --sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;

  position: relative;
  overflow-x: clip;
  background: #fcfcfa;
  color: var(--body);
  font-family: var(--sans);
  line-height: 1.6;
}
.ow-page *, .ow-page *::before, .ow-page *::after { box-sizing: border-box; }
.ow-page img { display: block; max-width: 100%; }
.ow-page ul { margin: 0; padding: 0; list-style: none; }
.ow-page h1, .ow-page h2, .ow-page h3, .ow-page p { margin: 0; }
.ow-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }

.ow-wrap { position: relative; z-index: 1; width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.ow-sec { position: relative; padding-block: clamp(52px, 6.5vw, 92px); }

.ow-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.ow-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.2rem, 4.6vw, 3.6rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); max-width: 18ch; }
.ow-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.16; letter-spacing: -0.015em; color: var(--ink); }
.ow-h2--center { text-align: center; max-width: 26ch; margin: 0 auto 16px; }
.ow-lead { max-width: 42rem; font-size: clamp(1.02rem, 1.3vw, 1.18rem); line-height: 1.65; }
.ow-lead strong { color: var(--ink); font-weight: 700; }

.ow-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.6rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.92rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.ow-btn svg { width: 1.1em; height: 1.1em; }
.ow-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.ow-btn--primary { background: var(--od); color: #fff; }
.ow-btn--outline { background: #fff; color: var(--ink); }
.ow-btn--outline:hover { background: var(--peach); }

.ow-textlink { display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 700; color: var(--oi); text-decoration: none; }
.ow-textlink:hover { text-decoration: underline; text-underline-offset: 3px; }
.ow-textlink svg { width: 1em; height: 1em; }

.ow-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.ow-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .ow-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.ow-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 104px) clamp(40px, 5vw, 64px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }

/* ---- Teasers ---- */
.ow-teasers { background: #fcfcfa; overflow: hidden; }
.ow-teasers__grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: clamp(22px, 4vw, 36px); }
.ow-teaser { display: flex; flex-direction: column; overflow: hidden; background: #fff; border: 2px solid var(--ink); border-radius: 26px; box-shadow: 5px 7px 0 var(--ink); }
.ow-teaser__photo { position: relative; }
.ow-teaser__photo img { width: 100%; height: 220px; object-fit: cover; border-bottom: 2px solid var(--ink); }
.ow-teaser__tag { position: absolute; top: 16px; left: 16px; padding: 0.4em 0.9em; border-radius: 999px; font-size: 0.78rem; font-weight: 700; }
.ow-teaser__tag--live { background: var(--peach); color: var(--oi); border: 2px solid var(--ink); }
.ow-teaser__body { padding: 24px 26px 28px; }
.ow-teaser__body h2 { font-family: var(--serif); font-size: 1.5rem; font-weight: 600; margin-bottom: 10px; color: var(--ink); }
.ow-teaser__body p { font-size: 0.95rem; line-height: 1.6; margin-bottom: 18px; }

/* ---- Focus areas ---- */
.ow-focus { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.ow-focus__grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; margin-top: 32px; }
.ow-focus__card { height: 100%; padding: 22px 20px 24px; background: #fff; border: 2px solid var(--ink); border-radius: 20px; box-shadow: 4px 5px 0 var(--ink); }
.ow-focus__icon { display: grid; place-items: center; width: 46px; height: 46px; margin-bottom: 14px; background: var(--peach); border-radius: 50%; color: var(--od); }
.ow-focus__icon svg { width: 22px; height: 22px; }
.ow-focus__card h3 { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.ow-focus__card p { font-size: 0.85rem; line-height: 1.5; margin-bottom: 14px; }
.ow-focus__seen { display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.02em; color: var(--oi); }
.ow-focus__seen svg { width: 13px; height: 13px; }

/* ---- Closing CTA ---- */
.ow-cta { padding-block: clamp(48px, 6vw, 88px); background: #fff4ea; }
.ow-cta__box { position: relative; padding: clamp(32px, 5vw, 56px) 24px; background: #fff; border: 2px solid var(--ink); border-radius: 30px; box-shadow: 8px 10px 0 var(--ink); text-align: center; overflow: hidden; }
.ow-cta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 8px; }

/* ---- Responsive ---- */
@media (max-width: 780px) {
  .ow-teasers__grid { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .ow-focus__grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 560px) {
  .ow-focus__grid { grid-template-columns: 1fr; }
}
`;
