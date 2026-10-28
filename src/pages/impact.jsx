// Impact.jsx — "Impact" page
// ---------------------------------------------------------------------------
// IMPORTANT: this is a new PAGE file. It is not the same as your existing
// src/components/Impact.jsx (the homepage video section) — keep both, don't
// let one overwrite the other. Place this one at: src/pages/Impact.jsx
//
// The numbers here are cumulative totals across the three Christmas on the
// Streets editions run so far (150+450+754 children, 30+60+183 mothers &
// widows). Project 1,000 Smiles has no impact numbers yet since it hasn't
// launched — it appears here as a goal, clearly marked as not-yet-achieved,
// not folded into the totals.
//
// Reuses the shared <Doodle> component + doodles.css from the landing-page
// pass. Page-specific layout/type rules are scoped locally ("im-" prefix)
// via the <style> block at the bottom.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  LuArrowRight,
  LuBaby,
  LuFlower2,
  LuGift,
  LuHandshake,
  LuHeart,
  LuHeartPulse,
  LuPackage,
  LuUsers,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

// Reusing existing site photos as placeholders — swap for real photos when
// you have them, same import paths your other pages already use.
import heroPhoto from "../assets/IMG_3112.JPG.jpeg";
import beyondPhoto from "../assets/IMG-20251230-WA0133.jpg";
import SEO, { orgSchema } from "../components/seo.jsx";

/* ==========================================================================
   EDITABLE CONTENT
   ========================================================================== */

const HEADLINE_STATS = [
  {
    value: 1354,
    suffix: "+",
    label: "Children reached",
    sub: "across 3 editions",
  },
  {
    value: 273,
    suffix: "+",
    label: "Mothers, market women & widows supported",
    sub: "across 3 editions",
  },
  {
    value: 3,
    suffix: "",
    label: "Editions run so far",
    sub: "4th this December",
  },
  {
    value: 100,
    suffix: "+",
    label: "Children reached at a mosque visit",
    sub: "edition 3 bonus reach",
  },
];

const EDITIONS = [
  { tag: "Ed. 1", children: 150 },
  { tag: "Ed. 2", children: 450 },
  { tag: "Ed. 3", children: 754 },
  { tag: "Ed. 4", upcoming: true },
];

const LINKS = {
  getInvolved: "/get-involved",
  volunteer: "/get-involved#volunteer",
  donate: "/donate",
  smiles: "/project-1000-smiles",
  christmas: "/christmas-in-the-street",
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
      className={`im-reveal${shown ? " is-in" : ""} ${className}`}
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
    <section className="im-hero" aria-labelledby="im-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "12%", left: "4%", width: 32 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "10%", right: "6%", width: 30 }}
      />

      <div className="im-wrap">
        <p className="im-eyebrow">Our impact</p>
        <h1 id="im-hero-title" className="im-h1">
          Real people. Real change.
        </h1>
        <p className="im-lead">
          We measure impact the way it actually happens: one Christmas in the
          Street at a time. Three editions of our annual charity outreach have
          reached more than a thousand children and hundreds of women. Here is
          what that looks like.
        </p>
      </div>
    </section>
  );
}

function HeadlineStats() {
  return (
    <section className="im-stats" aria-label="Cumulative impact so far">
      <div className="im-wrap">
        <dl className="im-stats__grid">
          {HEADLINE_STATS.map((s, i) => (
            <Reveal
              as="div"
              key={s.label}
              delay={i * 80}
              className="im-stats__item"
            >
              <dt className="im-sr">{s.label}</dt>
              <dd className="im-stats__value">
                <CountUp
                  end={s.value}
                  duration={2.2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                {s.suffix}
              </dd>
              <dd className="im-stats__label">{s.label}</dd>
              <dd className="im-stats__sub">{s.sub}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function GrowthRecap() {
  const max = 800;
  return (
    <section className="im-sec im-recap" aria-labelledby="im-recap-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "8%", right: "6%", width: 70 }}
      />
      <div className="im-wrap">
        <Reveal>
          <p className="im-eyebrow">How we got here</p>
          <h2 id="im-recap-title" className="im-h2">
            Edition after edition.
          </h2>
        </Reveal>

        <div className="im-recap__row">
          {EDITIONS.map((ed, i) => (
            <Reveal
              as="div"
              key={ed.tag}
              delay={i * 80}
              className="im-recap__col"
            >
              {ed.upcoming ? (
                <div className="im-recap__bar im-recap__bar--upcoming">
                  <span>?</span>
                </div>
              ) : (
                <div
                  className="im-recap__bar"
                  style={{
                    height: `${Math.max((ed.children / max) * 100, 10)}%`,
                  }}
                >
                  <span>{ed.children}</span>
                </div>
              )}
              <p>{ed.tag}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link to={LINKS.christmas} className="im-textlink">
            See the full story, edition by edition{" "}
            <LuArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WhatEachDelivers() {
  const DELIVERIES = [
    {
      icon: LuGift,
      title: "Christmas joy for children",
      text: (
        <>
          Gifts, celebration and the feeling of being included for children who
          might otherwise watch from the outside, upholding child wellbeing
          principles endorsed by{" "}
          <a
            href="https://www.unicef.org/nigeria/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            UNICEF
          </a>
          .
        </>
      ),
    },
    {
      icon: LuHeartPulse,
      title: "Basic health screenings for adults",
      text: (
        <>
          Health checks for adults who may not otherwise have easy access to
          them, aligned with preventative community health guidelines from the{" "}
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/hypertension"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            World Health Organization (WHO)
          </a>
          .
        </>
      ),
    },
    {
      icon: LuPackage,
      title: "Food supplies for widows and market women",
      text: (
        <>
          Essential food supplies that ease the pressure on widows, market women
          and mothers, advancing the mission of{" "}
          <a
            href="https://sdgs.un.org/goals/goal2"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            UN SDG 2: Zero Hunger
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <section className="im-sec im-delivers" aria-labelledby="im-delivers-title">
      <div className="im-wrap">
        <Reveal>
          <p className="im-eyebrow">What each edition delivers</p>
          <h2 id="im-delivers-title" className="im-h2">
            What each Christmas in the Street delivers
          </h2>
          <p className="im-lead">
            Every December, our outreach in Lagos brings three kinds of support
            to the community.
          </p>
        </Reveal>

        <ul className="im-delivers__grid">
          {DELIVERIES.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="im-delivers__card">
                <span className="im-delivers__icon">
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

function BeyondNumbers() {
  return (
    <section className="im-sec im-beyond" aria-labelledby="im-beyond-title">
      <div className="im-wrap im-beyond__grid">
        <Reveal className="im-beyond__photo">
          <Doodle
            name="heart"
            fill="currentColor"
            className="lp-abs lp-float lp-c-o"
            style={{ top: -16, right: 22, width: 32 }}
          />
          <img
            src={beyondPhoto}
            alt="A mother and daughter at a Sanusi Jafar Foundation event"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="im-eyebrow">What the numbers don’t show</p>
          <h2 id="im-beyond-title" className="im-h2">
            Impact Is More Than What We Give
          </h2>
          <p className="im-p">
            Our first edition reached 150 children. Since then, that number has
            grown to 1,354. Behind every number is a child who got to feel the
            excitement of Christmas and know that someone cared enough to make
            the day special.
          </p>
          <p className="im-p">
            273 widows, market women and mothers have received support through
            our initiatives. Behind that number are women who have had a little
            more help meeting their everyday needs and providing for their
            families.
          </p>
          <p className="im-p">
            Some of our impact never shows up in a count. It includes people we
            met living on the streets who were on no list, and the 100+ children
            we visited at a mosque two days after Edition 3 ended. As a women
            and children charity in Lagos, we believe supporting vulnerable
            children and women’s empowerment in Lagos goes beyond a single
            event.
          </p>
          <p className="im-p im-p--quote">
            That is what impact means to us: how people feel, what becomes
            possible, and what changes because we showed up.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const AHEAD_ITEMS = [
  {
    icon: LuArrowRight,
    text: "Reach more people throughout the year, not just during a single event.",
  },
  {
    icon: LuArrowRight,
    text: "Continue supporting mothers, market women, and widows.",
  },
  {
    icon: LuArrowRight,
    text: "Help more children through consistent support beyond the Christmas season.",
  },
];

function WhatsAhead() {
  return (
    <section className="im-ahead" aria-labelledby="im-ahead-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "10%", right: "8%", width: 60 }}
      />
      <div className="im-wrap im-ahead__inner">
        <span className="im-badge" aria-label="Coming soon">
          <span>Coming</span>
          <span>Soon</span>
        </span>

        <Reveal>
          <p className="im-eyebrow im-eyebrow--light">What’s ahead</p>
          <h2 id="im-ahead-title" className="im-h2 im-h2--light">
            1,000 Smiles Is Our Goal
          </h2>
          <p className="im-ahead__lead">
            Project 1,000 Smiles has not launched yet, but we’re preparing to
            extend our support to more people. Here’s what we hope to achieve:
          </p>
        </Reveal>

        <ul className="im-ahead__list">
          {AHEAD_ITEMS.map(({ icon: Icon, text }, i) => (
            <Reveal as="li" key={text} delay={i * 80}>
              <Icon aria-hidden="true" />
              <span>{text}</span>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link
            to={LINKS.smiles}
            style={{
              marginTop: 14,
            }}
            className="im-btn im-btn--white"
          >
            Learn About Project 1,000 Smiles <LuArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="im-cta" aria-labelledby="im-cta-title">
      <div className="im-wrap">
        <Reveal className="im-cta__box">
          <Doodle
            name="star"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun"
            style={{ top: 18, left: 24, width: 32 }}
          />
          <Doodle
            name="sparkle"
            fill="currentColor"
            className="lp-abs lp-float lp-c-o"
            style={{ bottom: 20, right: 28, width: 30 }}
          />
          <h2 id="im-cta-title" className="im-h2 im-h2--center">
            Help us grow next year&rsquo;s numbers.
          </h2>
          <div className="im-cta__actions">
            <Link to={LINKS.volunteer} className="im-btn im-btn--primary">
              <LuUsers aria-hidden="true" /> Volunteer
            </Link>
            <Link to={LINKS.getInvolved} className="im-btn im-btn--outline">
              <LuHandshake aria-hidden="true" /> Partner
            </Link>
            <Link to={LINKS.donate} className="im-btn im-btn--outline">
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

export default function Impact() {
  return (
    <div className="im-page">
      <SEO
        title="Our Impact | Women & Children Charity in Lagos"
        description="See what our women and children charity in Lagos has achieved: 1,354+ children and 273+ women reached across three editions of Christmas in the Street."
        path="/impact"
        type="website"
        jsonLd={orgSchema}
      />
      <style>{CSS}</style>
      <Hero />
      <HeadlineStats />
      <GrowthRecap />
      <WhatEachDelivers />
      <BeyondNumbers />
      <WhatsAhead />
      <ClosingCta />
    </div>
  );
}

/* ==========================================================================
   STYLES ("im-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.im-page {
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
.im-page *, .im-page *::before, .im-page *::after { box-sizing: border-box; }
.im-page img { display: block; max-width: 100%; }
.im-page ul { margin: 0; padding: 0; list-style: none; }
.im-page h1, .im-page h2, .im-page p, .im-page dl, .im-page dd, .im-page dt { margin: 0; }
.im-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }
.im-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.im-wrap { position: relative; z-index: 1; width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.im-sec { position: relative; padding-block: clamp(52px, 6.5vw, 96px); }

.im-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.im-eyebrow--light { color: var(--sun); }
.im-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.1rem, 4.4vw, 3.4rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; color: var(--ink); max-width: 20ch; }
.im-accent { color: var(--o); font-style: italic; }
.im-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.16; letter-spacing: -0.015em; color: var(--ink); }
.im-h2--light { color: #fff; }
.im-h2--center { text-align: center; max-width: 24ch; margin: 0 auto 16px; }
.im-lead { max-width: 40rem; font-size: clamp(1.02rem, 1.3vw, 1.18rem); line-height: 1.65; }
.im-p { max-width: 34rem; font-size: 1.02rem; line-height: 1.75; margin-bottom: 1.1em; }
.im-p--quote { font-family: var(--serif); font-style: italic; font-size: 1.2rem; color: var(--ink); padding-left: 18px; border-left: 3px solid var(--sun); }
.im-textlink { display: inline-flex; align-items: center; gap: 6px; margin-top: 28px; font-size: 0.9rem; font-weight: 700; color: var(--oi); text-decoration: none; }
.im-textlink:hover { text-decoration: underline; text-underline-offset: 3px; }
.im-textlink svg { width: 1em; height: 1em; }

.im-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.6rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.92rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.im-btn svg { width: 1.1em; height: 1.1em; }
.im-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.im-btn--primary { background: var(--od); color: #fff; }
.im-btn--outline { background: #fff; color: var(--ink); }
.im-btn--outline:hover { background: var(--peach); }
.im-btn--white { background: #fff; color: var(--oi); }
.im-btn--white:hover { background: var(--cream); }

.im-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.im-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .im-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.im-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 104px) clamp(40px, 5vw, 64px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }

/* ---- Headline stats ---- */
.im-stats { background: #fbf8f3; border-block: 1px solid var(--line); }
.im-stats__grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.im-stats__item { padding: 30px 22px; text-align: center; }
.im-stats__item + .im-stats__item { border-left: 1px solid var(--line); }
.im-stats__value { font-family: var(--serif); font-size: clamp(2rem, 3.4vw, 2.7rem); font-weight: 500; color: var(--o); line-height: 1.1; }
.im-stats__label { margin-top: 6px; font-size: 0.9rem; font-weight: 600; color: var(--ink); line-height: 1.35; }
.im-stats__sub { margin-top: 2px; font-size: 0.75rem; font-style: italic; color: var(--body); }

/* ---- Growth recap ---- */
.im-recap { background: var(--cream); overflow: hidden; }
.im-recap__row { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); align-items: end; gap: clamp(10px, 2vw, 22px); height: 180px; margin-top: 32px; }
.im-recap__col { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; }
.im-recap__bar { display: flex; align-items: flex-start; justify-content: center; width: 100%; min-height: 30px; padding-top: 8px; background: linear-gradient(180deg, #f5a04a, var(--od)); border: 2px solid var(--ink); border-radius: 10px 10px 4px 4px; box-shadow: 2px 3px 0 var(--ink); color: #fff; font-family: var(--serif); font-weight: 700; font-size: 0.95rem; }
.im-recap__bar--upcoming { align-items: center; height: 26%; background: repeating-linear-gradient(135deg, #fff 0 10px, #fff4ea 10px 20px); border-style: dashed; box-shadow: none; color: var(--oi); font-size: 1.2rem; }
.im-recap__col p { margin-top: 10px; font-family: var(--serif); font-weight: 600; color: var(--ink); }

/* ---- What each edition delivers ---- */
.im-delivers { background: #faf8f5; border-bottom: 1px solid var(--line); overflow: hidden; }
.im-delivers__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(18px, 3vw, 28px); margin-top: 32px; }
.im-delivers__card { height: 100%; padding: 28px 24px; background: #fff; border: 2px solid var(--ink); border-radius: 20px; box-shadow: 4px 6px 0 var(--sun); }
.im-delivers__icon { display: grid; place-items: center; width: 50px; height: 50px; margin-bottom: 16px; background: var(--peach); border: 2px solid var(--ink); border-radius: 50%; color: var(--od); }
.im-delivers__icon svg { width: 24px; height: 24px; }
.im-delivers__card h3 { font-family: var(--serif); font-size: 1.35rem; font-weight: 600; line-height: 1.25; color: var(--ink); margin-bottom: 10px; }
.im-delivers__card p { font-size: 0.95rem; line-height: 1.6; color: var(--body); margin: 0; }
@media (max-width: 768px) {
  .im-delivers__grid { grid-template-columns: 1fr; }
}

/* ---- Beyond numbers ---- */
.im-beyond { background: #fcfcfa; overflow: hidden; }
.im-beyond__grid { display: grid; grid-template-columns: minmax(0,0.85fr) minmax(0,1.15fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.im-beyond__photo { position: relative; }
.im-beyond__photo img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 3px solid var(--ink); border-radius: 48% 52% 54% 46% / 50% 46% 54% 50%; box-shadow: 7px 9px 0 var(--sun); }

/* ---- What's ahead ---- */
.im-ahead { position: relative; padding-block: clamp(56px, 7vw, 100px); background: var(--navy); color: #fff; overflow: hidden; }
.im-ahead__inner { position: relative; max-width: 42rem; }
.im-badge { display: inline-grid; place-content: center; width: 88px; height: 88px; margin-bottom: 22px; border: 2px solid #fff; border-radius: 50%; background: var(--sun); box-shadow: 4px 5px 0 rgba(0,0,0,.25); transform: rotate(-8deg); text-align: center; font-family: var(--serif); font-weight: 600; color: var(--ink); line-height: 1.15; }
.im-badge span { display: block; font-size: 0.98rem; }
.im-badge span:first-child { text-transform: uppercase; font-size: 0.66rem; font-family: var(--sans); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 2px; }
.im-ahead__lead { font-size: 1.02rem; line-height: 1.65; color: rgba(255,255,255,.88); margin-bottom: 24px; max-width: 38rem; }
.im-ahead__list { display: grid; gap: 14px; margin-bottom: 30px; }
.im-ahead__list li { display: flex; align-items: center; gap: 12px; font-size: 1rem; color: rgba(255,255,255,.92); }
.im-ahead__list svg { flex: none; width: 22px; height: 22px; color: var(--sun); }

/* ---- Closing CTA ---- */
.im-cta { padding-block: clamp(48px, 6vw, 88px); background: #fff4ea; }
.im-cta__box { position: relative; padding: clamp(32px, 5vw, 56px) 24px; background: #fff; border: 2px solid var(--ink); border-radius: 30px; box-shadow: 8px 10px 0 var(--ink); text-align: center; overflow: hidden; }
.im-cta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 8px; }

/* ---- Responsive ---- */
@media (max-width: 860px) {
  .im-beyond__grid { grid-template-columns: 1fr; }
  .im-beyond__photo { max-width: 320px; margin-inline: auto; }
}
@media (max-width: 720px) {
  .im-stats__grid { grid-template-columns: repeat(2, 1fr); }
  .im-stats__item:nth-child(odd) { border-left: 0; }
  .im-stats__item:nth-child(n+3) { border-top: 1px solid var(--line); }
  .im-recap__row { grid-template-columns: repeat(2, minmax(0,1fr)); height: auto; row-gap: 24px; }
  .im-recap__col { height: 130px; }
}
`;
