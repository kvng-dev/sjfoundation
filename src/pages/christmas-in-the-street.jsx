// ChristmasOnTheStreets.jsx — dedicated page for the flagship initiative
// ---------------------------------------------------------------------------
// This REPLACES "Our Work" as a top-level nav item (per your call). Suggested
// route: /christmas-on-the-streets — update your nav data to point here
// instead of /our-work (see the note at the bottom of this file's comments).
//
// The old /our-work page still exists — see the new, slimmed OurWork.jsx —
// it's just no longer in the top nav. Link to it from wherever makes sense
// (Home's "Our Work" button, footer, or a "see everything we do" link).
//
// Content here is the same real numbers used elsewhere on the site (150 /
// 450 / 754 children, 30 / 60 / 183 mothers & widows, 100+ at a mosque visit)
// — nothing invented. Reuses the shared <Doodle> component + doodles.css.
// Place at: src/pages/ChristmasOnTheStreets.jsx
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  LuArrowRight,
  LuGift,
  LuHandHeart,
  LuHandshake,
  LuHeart,
  LuHeartPulse,
  LuUsers,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

// Reusing existing site photos as placeholders — swap for real,
// edition-specific photos when you have them.
import heroPhoto from "../assets/IMG-20260923-WA0062.jpg";
import edition1Photo from "../assets/IMG_3119.JPG.jpeg";
import edition2Photo from "../assets/IMG_3169.JPG.jpeg";
import edition3Photo from "../assets/IMG_3167.JPG.jpeg";
import streetPhoto from "../assets/IMG-20260923-WA0067.jpg";
import mosquePhoto from "../assets/IMG-20251230-WA0012.jpg";
import CountdownSection from "../components/CountdownSection.jsx";
import GallerySection from "../components/GallerySection.jsx";

/* ==========================================================================
   EDITABLE CONTENT
   ========================================================================== */

const EDITIONS = [
  {
    tag: "Edition 1",
    children: 150,
    givers: 30,
    givenTo: "mothers & widows",
    note: "Planned for 50 children — 150 showed up.",
    photo: edition1Photo,
  },
  {
    tag: "Edition 2",
    children: 450,
    givers: 60,
    givenTo: "mothers, market women & widows",
    photo: edition2Photo,
  },
  {
    tag: "Edition 3",
    children: 754,
    givers: 183,
    givenTo: "mothers, market women & widows",
    note: "Plus street outreach, and 100+ children at a mosque two days later.",
    photo: edition3Photo,
  },
  { tag: "Edition 4", upcoming: true, note: "This December." },
];

const PILLARS = [
  {
    title: "Kids' Christmas Party",
    text: "A full party thrown for children in the community,  games, food, gifts and the kind of afternoon that becomes a memory.",
    icon: LuGift,
    tone: "peach",
  },
  {
    title: "Health On The Spot",
    text: "Free blood pressure checks for the adults who come with them, a small practical way to look after the grown-ups too.",
    icon: LuHeartPulse,
    tone: "sky",
  },
  {
    title: "Foodstuffs For Women",
    text: "Raw foodstuffs handed directly to widows and market women in the community, starting with rice, growing every year since.",
    icon: LuHandHeart,
    tone: "mint",
  },
];

// Where the buttons go — Get Involved's page has matching #volunteer /
// #donate anchors already.
const LINKS = {
  volunteer: "/get-involved#volunteer",
  partner: "/get-involved#partner",
  donate: "/get-involved#donate",
  smiles: "/our-work#smiles",
  ourWork: "/our-work",
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
      className={`cs-reveal${shown ? " is-in" : ""} ${className}`}
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
    <section className="cs-hero" aria-labelledby="cs-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "10%", left: "4%", width: 34 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "14%", right: "5%", width: 30 }}
      />

      <div className="cs-wrap cs-hero__grid">
        <div>
          <p className="cs-eyebrow">Our flagship initiative</p>
          <h1 id="cs-hero-title" className="cs-h1">
            Christmas in the Street
          </h1>
          <p className="cs-lead">
            Every last Saturday of December, we close the year the way we think
            it should end: a party for children, health checks for the adults
            who bring them, and foodstuffs for the widows and market women in
            the community.
          </p>
          <div className="cs-hero__facts">
            <span>3 editions run</span>
            <span className="cs-hero__facts-live">
              Edition 4 · This December
            </span>
          </div>
          <Link to={LINKS.volunteer} className="cs-btn cs-btn--primary">
            Volunteer For Edition 4 <LuArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="cs-photo-frame">
          <Doodle
            name="sparkle"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun"
            style={{ top: -18, right: 18, width: 36 }}
          />
          <img
            src={heroPhoto}
            alt="Children at a past Christmas in the Street celebration"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function WhatItIs() {
  return (
    <section className="cs-sec cs-what" aria-labelledby="cs-what-title">
      <div className="cs-wrap">
        <Reveal>
          <p className="cs-eyebrow">One Saturday. Three ways we show up.</p>
          <h2 id="cs-what-title" className="cs-h2">
            What happens on the day.
          </h2>
        </Reveal>

        <ul className="cs-pillars">
          {PILLARS.map(({ title, text, icon: Icon, tone }, i) => (
            <li key={title}>
              <Reveal delay={i * 90} className={`cs-pillar cs-tone-${tone}`}>
                <span className="cs-pillar__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GrowthChart() {
  const max = 800;
  return (
    <section className="cs-sec cs-growth" aria-labelledby="cs-growth-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "6%", right: "5%", width: 80 }}
      />
      <div className="cs-wrap">
        <Reveal>
          <p className="cs-eyebrow">How it&rsquo;s grown</p>
          <h2 id="cs-growth-title" className="cs-h2">
            Edition 1 to Edition 4.
          </h2>
        </Reveal>

        <div
          className="cs-chart"
          role="img"
          aria-label="Children reached grew from 150 in edition 1, to 450 in edition 2, to 754 in edition 3; edition 4 is upcoming this December."
        >
          {EDITIONS.map((ed, i) => (
            <Reveal
              as="div"
              key={ed.tag}
              delay={i * 90}
              className="cs-chart__col"
            >
              <div className="cs-chart__barwrap">
                {ed.upcoming ? (
                  <div className="cs-chart__bar cs-chart__bar--upcoming">
                    <span>?</span>
                  </div>
                ) : (
                  <div
                    className="cs-chart__bar"
                    style={{
                      height: `${Math.max((ed.children / max) * 100, 8)}%`,
                    }}
                  >
                    <span className="cs-chart__num">
                      <CountUp
                        end={ed.children}
                        duration={2.4}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </span>
                  </div>
                )}
              </div>
              <p className="cs-chart__tag">{ed.tag}</p>
              {!ed.upcoming ? (
                <p className="cs-chart__sub">
                  +{ed.givers} {ed.givenTo}
                </p>
              ) : (
                <p className="cs-chart__sub cs-chart__sub--upcoming">
                  This December
                </p>
              )}
            </Reveal>
          ))}
        </div>
        <p className="cs-chart__caption">
          Children reached, edition over edition.
        </p>
      </div>
    </section>
  );
}

function HonestMoment() {
  return (
    <section
      className="cs-sec cs-honest"
      aria-label="Why Project 1,000 Smiles exists"
    >
      <div className="cs-wrap">
        <Reveal className="cs-sticky">
          <Doodle
            name="heart"
            fill="currentColor"
            className="lp-abs lp-float lp-c-o"
            style={{ top: -16, right: 24, width: 34 }}
          />
          <p className="cs-sticky__small">Edition 1, in their own words:</p>
          <p className="cs-sticky__big">
            We planned for 50 children. We got blessed with 150 and still had to
            turn some away disappointed.
          </p>
          <p className="cs-sticky__note">
            That feeling, grateful for how many came, and aching for the ones we
            couldn&rsquo;t fit is a big part of why{" "}
            <Link to={LINKS.smiles}>Project 1,000 Smiles</Link> exists: so reach
            doesn&rsquo;t have to wait for one Saturday in December.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BeyondTheParty() {
  return (
    <section className="cs-sec cs-beyond" aria-labelledby="cs-beyond-title">
      <Doodle
        name="swirl"
        className="lp-abs lp-c-mint lp-edge"
        style={{ top: "8%", left: "4%", width: 56 }}
      />
      <div className="cs-wrap">
        <Reveal>
          <p className="cs-eyebrow">Edition 3, extended</p>
          <h2 id="cs-beyond-title" className="cs-h2">
            Beyond the party.
          </h2>
        </Reveal>

        <div className="cs-beyond__grid">
          <Reveal className="cs-beyond__card">
            <figure className="lp-taped">
              <img
                src={streetPhoto}
                alt="Outreach in the wider community"
                loading="lazy"
              />
            </figure>
            <h3>Into the streets</h3>
            <p>
              That same edition, our team went out to meet people living on the
              streets in the community, so they didn&rsquo;t get missed either.
            </p>
          </Reveal>

          <Reveal delay={100} className="cs-beyond__card">
            <figure className="lp-taped">
              <img
                src={mosquePhoto}
                alt="Children gathered at a mosque in the community"
                loading="lazy"
              />
            </figure>
            <h3>Two days later, a mosque</h3>
            <p>
              We returned to gift over 100 children at a mosque in the same
              community because the celebration didn&rsquo;t have to stop when
              the event did.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EditionFour() {
  return (
    <section className="cs-four" aria-labelledby="cs-four-title">
      <div className="cs-four__panel">
        <Doodle
          name="dots"
          className="lp-abs lp-c-line lp-edge"
          style={{ top: "10%", right: "10%", width: 60 }}
        />
        <div className="cs-four__content">
          <p className="cs-eyebrow cs-eyebrow--light">This year</p>
          <h2 id="cs-four-title" className="cs-h2 cs-h2--light">
            Edition 4 is this December.
          </h2>
          <p>
            Every edition has grown because people showed up to host games, to
            run the health station, to pack foodstuffs, to walk the streets with
            us. Edition 4 will be no different.
          </p>
          <div className="cs-four__actions">
            <Link to={LINKS.volunteer} className="cs-btn cs-btn--white">
              <LuUsers aria-hidden="true" /> Volunteer
            </Link>
            <Link to={LINKS.partner} className="cs-btn cs-btn--outline-light">
              <LuHandshake aria-hidden="true" /> Partner
            </Link>
            <Link to={LINKS.donate} className="cs-btn cs-btn--outline-light">
              <LuHeart aria-hidden="true" /> Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function ChristmasInTheStreet() {
  useEffect(() => {
    document.title = "Christmas in the Street | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="cs-page">
      <style>{CSS}</style>
      <Hero />
      <WhatItIs />
      <GrowthChart />
      <GallerySection />
      <HonestMoment />
      <BeyondTheParty />
      <CountdownSection />
      <EditionFour />
    </div>
  );
}

/* ==========================================================================
   STYLES ("cs-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.cs-page {
  --o: #ff741f; --od: #f05f0c; --oi: #c9500a; --ink: #0b2233; --navy: #052436;
  --body: #3f4d58; --cream: #faf9f4; --sun: #ffb627; --peach: #ffe9d6; --mint: #d9f0e6; --sky: #dbeaf7; --line: #eadfd2;
  --serif: 'Newsreader', Georgia, 'Times New Roman', serif;
  --sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;

  position: relative;
  overflow-x: clip;
  background: #fcfcfa;
  color: var(--body);
  font-family: var(--sans);
  line-height: 1.6;
}
.cs-page *, .cs-page *::before, .cs-page *::after { box-sizing: border-box; }
.cs-page img { display: block; max-width: 100%; }
.cs-page ul { margin: 0; padding: 0; list-style: none; }
.cs-page h1, .cs-page h2, .cs-page h3, .cs-page p { margin: 0; }
.cs-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }

.cs-wrap { position: relative; z-index: 1; width: 100%; max-width: 1180px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.cs-sec { position: relative; padding-block: clamp(52px, 6.5vw, 96px); }

.cs-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.cs-eyebrow--light { color: var(--sun); }
.cs-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.3rem, 4.8vw, 3.8rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; color: var(--ink); }
.cs-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.9rem, 3.2vw, 2.6rem); font-weight: 500; line-height: 1.14; letter-spacing: -0.015em; color: var(--ink); }
.cs-h2--light { color: #fff; }
.cs-lead { max-width: 36rem; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.65; margin-bottom: 22px; }

.cs-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.6rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.92rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.cs-btn svg { width: 1.1em; height: 1.1em; }
.cs-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.cs-btn--primary { background: var(--od); color: #fff; }
.cs-btn--white { background: #fff; color: var(--oi); }
.cs-btn--white:hover { background: var(--cream); }
.cs-btn--outline-light { background: transparent; border-color: #fff; color: #fff; box-shadow: 3px 4px 0 rgba(255,255,255,.4); }
.cs-btn--outline-light:hover { background: rgba(255,255,255,.12); }

.cs-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.cs-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .cs-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.cs-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 104px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }
.cs-hero__grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.cs-hero__facts { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 26px; }
.cs-hero__facts span { padding: 0.4em 0.9em; border: 2px solid var(--ink); border-radius: 999px; font-size: 0.82rem; font-weight: 700; color: var(--ink); background: #fff; }
.cs-hero__facts-live { background: var(--peach) !important; color: var(--oi) !important; }
.cs-photo-frame { position: relative; }
.cs-photo-frame img { width: 100%; aspect-ratio: 1.1; object-fit: cover; border: 8px solid #fff; border-radius: 24px; box-shadow: 0 26px 44px -24px rgba(5,36,54,.5), 5px 7px 0 var(--o); transform: rotate(-1.2deg); }

/* ---- What it is ---- */
.cs-what { background: #fcfcfa; }
.cs-pillars { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; margin-top: 32px; }
.cs-tone-peach { --tone: var(--peach); }
.cs-tone-sky { --tone: var(--sky); }
.cs-tone-mint { --tone: var(--mint); }
.cs-pillar { height: 100%; padding: 24px 22px 26px; background: var(--tone); border: 2px solid var(--ink); border-radius: 22px; box-shadow: 4px 6px 0 var(--ink); }
.cs-pillar__icon { display: grid; place-items: center; width: 50px; height: 50px; margin-bottom: 14px; background: #fff; border: 2px solid var(--ink); border-radius: 55% 45% 52% 48% / 50% 55% 45% 50%; color: var(--od); }
.cs-pillar__icon svg { width: 24px; height: 24px; }
.cs-pillar h3 { font-family: var(--serif); font-size: 1.2rem; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.cs-pillar p { font-size: 0.92rem; line-height: 1.55; }

/* ---- Growth chart ---- */
.cs-growth { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.cs-chart { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); align-items: end; gap: clamp(12px, 2.5vw, 28px); height: 260px; margin-top: 40px; padding: 0 4px; }
.cs-chart__col { display: flex; flex-direction: column; align-items: center; height: 100%; }
.cs-chart__barwrap { display: flex; align-items: flex-end; flex: 1; width: 100%; }
.cs-chart__bar { position: relative; display: flex; align-items: flex-start; justify-content: center; width: 100%; min-height: 34px; padding-top: 10px; background: linear-gradient(180deg, #f5a04a, var(--od)); border: 2px solid var(--ink); border-radius: 14px 14px 6px 6px; box-shadow: 3px 4px 0 var(--ink); }
.cs-chart__bar--upcoming { align-items: center; justify-content: center; height: 30%; background: repeating-linear-gradient(135deg, #fff 0 10px, #fff4ea 10px 20px); border-style: dashed; box-shadow: none; }
.cs-chart__bar--upcoming span { font-family: var(--serif); font-size: 1.8rem; font-weight: 600; color: var(--oi); }
.cs-chart__num { font-family: var(--serif); font-size: clamp(1rem, 1.6vw, 1.3rem); font-weight: 700; color: #fff; }
.cs-chart__tag { margin-top: 12px; font-family: var(--serif); font-size: 1.05rem; font-weight: 600; color: var(--ink); }
.cs-chart__sub { margin-top: 2px; font-size: 0.78rem; color: var(--body); text-align: center; }
.cs-chart__sub--upcoming { color: var(--oi); font-weight: 700; }
.cs-chart__caption { margin-top: 18px; font-size: 0.85rem; font-style: italic; color: var(--body); text-align: center; }

/* ---- Honest moment ---- */
.cs-honest { padding-block: 0 clamp(52px, 6.5vw, 96px); background: #fcfcfa; }
.cs-sticky { position: relative; max-width: 42rem; margin-inline: auto; padding: clamp(28px, 4vw, 40px) clamp(26px, 4vw, 40px) clamp(30px, 4vw, 42px); background: var(--sun); border: 2px solid var(--ink); border-radius: 10px 10px 26px 10px; transform: rotate(-1deg); box-shadow: 7px 9px 0 var(--ink); }
.cs-sticky::before { content: ''; position: absolute; top: -14px; left: 40px; width: 90px; height: 26px; background: rgba(255,255,255,.7); transform: rotate(-4deg); box-shadow: 0 1px 2px rgba(0,0,0,.12); }
.cs-sticky__small { font-size: 0.85rem; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
.cs-sticky__big { font-family: var(--serif); font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 600; line-height: 1.28; color: var(--ink); margin-bottom: 16px; }
.cs-sticky__note { font-size: 0.95rem; line-height: 1.6; color: var(--ink); opacity: 0.85; }
.cs-sticky__note a { color: var(--oi); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }

/* ---- Beyond the party ---- */
.cs-beyond { background: #fff4ea; overflow: hidden; }
.cs-beyond__grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: clamp(24px, 4vw, 48px); margin-top: 32px; }
.cs-beyond__card figure { margin: 0 0 20px; }
.cs-beyond__card img { width: 100%; aspect-ratio: 1.3; object-fit: cover; }
.cs-beyond__card h3 { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.cs-beyond__card p { font-size: 0.95rem; line-height: 1.6; max-width: 30rem; }

/* ---- Edition 4 ---- */
.cs-four { padding-block: clamp(20px, 3vw, 40px) clamp(56px, 7vw, 96px); background: #fcfcfa; }
.cs-four__panel { position: relative; overflow: hidden; max-width: 1180px; margin-inline: auto; padding: clamp(36px, 5vw, 64px); background: var(--navy); border-radius: 30px; color: #fff; }
.cs-four__content { position: relative; z-index: 1; max-width: 40rem; }
.cs-four__content p { max-width: 34rem; font-size: 1.02rem; line-height: 1.7; color: rgba(255,255,255,.88); margin-bottom: 26px; }
.cs-four__actions { display: flex; flex-wrap: wrap; gap: 14px; }

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .cs-hero__grid { grid-template-columns: 1fr; }
  .cs-photo-frame { order: -1; }
  .cs-beyond__grid { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .cs-pillars { grid-template-columns: 1fr; }
  .cs-chart { height: 210px; }
}
@media (max-width: 560px) {
  .cs-chart { grid-template-columns: repeat(2, minmax(0,1fr)); row-gap: 28px; height: auto; }
  .cs-chart__barwrap { height: 150px; }
}
`;
