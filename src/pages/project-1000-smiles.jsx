// ProjectSmiles.jsx — dedicated "Project 1,000 Smiles" page
// ---------------------------------------------------------------------------
// Suggested route: /project-1000-smiles
//
// HONESTY NOTE: Project 1,000 Smiles hasn't launched, so this page makes no
// claims about results, dates, venues or activities. It tells the origin
// story (from Christmas on the Streets), states the commitment in your own
// words (from the About page), and says plainly where things stand.
//
// THINGS YOU'LL WANT TO EDIT AS THINGS CHANGE (all at the top of the file):
//   - SMILES_SO_FAR   → update once you start counting; the smile wall fills in.
//   - STATUS_STEPS    → move the "current" marker along as you progress.
//   - FAQ             → add real answers (launch date, first community, ...)
//                       as soon as they're confirmed.
//
// Reuses the shared <Doodle> component + doodles.css. Page styles are scoped
// with the "ps-" prefix. Place at: src/pages/ProjectSmiles.jsx
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuCalendarCheck,
  LuChartColumn,
  LuEar,
  LuHandshake,
  LuHeart,
  LuMail,
  LuPlus,
  LuSprout,
  LuUsers,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

// Reusing existing site photos as placeholders — swap when you have real ones.
import heroPhoto from "../assets/IMG_3127.JPG.jpeg";
import whyPhoto from "../assets/IMG_3119.JPG.jpeg";

/* ==========================================================================
   EDITABLE CONTENT
   ========================================================================== */

const CONTACT_EMAIL = "sanusijafarfoundation@gmail.com";

const NOTIFY_MAILTO =
  `mailto:${CONTACT_EMAIL}?subject=` +
  encodeURIComponent("Keep me posted on Project 1,000 Smiles") +
  "&body=" +
  encodeURIComponent(
    "Hi Sanusi Jafar Foundation,\n\nPlease keep me posted as Project 1,000 Smiles gets closer to launching.\n\nThanks!"
  );

// Update this once you start counting. Each dot on the wall = 10 smiles.
const SMILES_SO_FAR = 0;
const SMILES_GOAL = 1000;

const PRINCIPLES = [
  {
    icon: LuEar,
    title: "Listen before we act",
    text: "We start by understanding what a community actually needs — not what we assume it does.",
  },
  {
    icon: LuCalendarCheck,
    title: "Show up consistently",
    text: "Sustainable change needs consistency. Instead of one-off moments of generosity, we are building a steady, year-round connection.",
  },
  {
    icon: LuSprout,
    title: "Create opportunities, not dependency",
    text: "The aim is pathways and possibilities — people as active participants in a better future, not only recipients of support.",
  },
  {
    icon: LuChartColumn,
    title: "Measure and share our impact",
    text: "We track what happens and tell you about it plainly, so you can see what your support is doing.",
  },
];

// state: 'done' | 'current' | 'next'
const STATUS_STEPS = [
  {
    state: "done",
    label: "Where it started",
    title: "Three editions of Christmas on the Streets",
    text: "They showed us what one Saturday can do — and what it can’t.",
  },
  {
    state: "current",
    label: "Where we are",
    title: "Preparing to launch",
    text: "We’re getting ready. We won’t announce a date until it’s real.",
  },
  {
    state: "next",
    label: "What’s next",
    title: "Launch",
    text: "When it’s ready, the people who asked to be kept posted will hear it from us first.",
  },
];

const FAQ = [
  {
    q: "Is Project 1,000 Smiles running yet?",
    a: "Not yet. We’re preparing to launch, and we’d rather tell you that plainly than promise something that isn’t ready. When it is, you’ll hear it from us first.",
  },
  {
    q: "Does Christmas on the Streets continue?",
    a: "Yes. Edition 4 is on Saturday, December 19, 2026. Project 1,000 Smiles is built to sit alongside it — carrying the same spirit through the rest of the year.",
  },
  {
    q: "Is 1,000 the finish line?",
    a: "No. 1,000 is the commitment — 1,000 moments of hope, inclusion and possibility. The aim is to build something that can continue long after the smile fades.",
  },
  {
    q: "How can I help before it launches?",
    a: "Tell us you’re interested, volunteer for Edition 4, partner with us, or give. Every one of those helps build what comes next.",
  },
];

const LINKS = {
  christmas: "/christmas-on-the-streets",
  volunteer: "/get-involved#volunteer",
  partner: "/get-involved#partner",
  donate: "/donate",
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
      className={`ps-reveal${shown ? " is-in" : ""} ${className}`}
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
    <section className="ps-hero" aria-labelledby="ps-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "10%", left: "4%", width: 32 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "12%", right: "5%", width: 30 }}
      />

      <div className="ps-wrap ps-hero__grid">
        <div>
          <p className="ps-eyebrow">Our next initiative</p>
          <h1 id="ps-hero-title" className="ps-h1">
            Project 1,000 Smiles
          </h1>
          <p className="ps-sub">More than a number. A commitment.</p>
          <p className="ps-lead">
            A year-round community impact initiative in the making &mdash; built
            to carry the hope and belonging we bring every December into every
            month of the year, for children, mothers and communities.
          </p>
          <div className="ps-actions">
            <a href={NOTIFY_MAILTO} className="ps-btn ps-btn--primary">
              <LuMail aria-hidden="true" /> Keep Me Posted
            </a>
            <a href="#why" className="ps-btn ps-btn--outline">
              How it began <LuArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="ps-photo">
          <img
            src={heroPhoto}
            alt="A group of smiling children in orange t-shirts"
          />
          <span className="ps-badge" role="note" aria-label="Coming soon">
            <span>Coming</span>
            <span>Soon</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="ps-sec ps-why" aria-labelledby="ps-why-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "6%", right: "5%", width: 76 }}
      />
      <div className="ps-wrap ps-why__grid">
        <Reveal className="ps-why__photo">
          <figure className="lp-taped">
            <img src={whyPhoto} alt="A smiling child" loading="lazy" />
          </figure>
        </Reveal>

        <Reveal delay={100}>
          <p className="ps-eyebrow">Where it started</p>
          <h2 id="ps-why-title" className="ps-h2">
            One Saturday was never going to be enough.
          </h2>
          <p className="ps-p">
            Christmas on the Streets began with 50 children planned and 150 who
            came. By Edition 3 it was 754. Every year more children showed up
            &mdash; and every year we felt how much a single day in December
            can&rsquo;t hold.
          </p>
          <p className="ps-p">
            We don&rsquo;t believe people should only be remembered when there
            is an event, a crisis or a festive season. Project 1,000 Smiles is
            how we plan to keep showing up.
          </p>
          <Link to={LINKS.christmas} className="ps-textlink">
            Read the Christmas on the Streets story{" "}
            <LuArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="ps-wrap">
        <Reveal className="ps-sticky">
          <p className="ps-sticky__small">Where we started from:</p>
          <p className="ps-sticky__big">
            Where a child comes from should never determine the kind of
            childhood they get to experience.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SmileWall() {
  const total = SMILES_GOAL / 10;
  const filled = Math.min(Math.floor(SMILES_SO_FAR / 10), total);
  return (
    <section className="ps-wall" aria-labelledby="ps-wall-title">
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "8%", right: "6%", width: 34 }}
      />
      <div className="ps-wrap ps-wall__grid">
        <Reveal>
          <p className="ps-eyebrow ps-eyebrow--light">The goal</p>
          <h2 id="ps-wall-title" className="ps-h2 ps-h2--light">
            1,000 moments, not 1,000 gifts.
          </h2>
          <p className="ps-wall__text">
            The goal isn&rsquo;t simply to create 1,000 smiles. It is to create
            1,000 moments of hope, inclusion and possibility &mdash; while
            building something that can continue long after the smile fades.
          </p>
          <p className="ps-wall__count">
            <strong>{SMILES_SO_FAR.toLocaleString("en-US")}</strong> of{" "}
            {SMILES_GOAL.toLocaleString("en-US")} so far
          </p>
          <p className="ps-wall__note">
            {SMILES_SO_FAR === 0
              ? "The wall starts empty — every space is waiting for a real moment."
              : "Every dot is ten moments that really happened."}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="ps-dots"
            role="img"
            aria-label={`${SMILES_SO_FAR} of ${SMILES_GOAL} moments so far. Each dot represents ten.`}
          >
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={i < filled ? "ps-dot ps-dot--on" : "ps-dot"}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section
      className="ps-sec ps-principles"
      aria-labelledby="ps-principles-title"
    >
      <div className="ps-wrap">
        <Reveal>
          <p className="ps-eyebrow">How we&rsquo;ll build it</p>
          <h2 id="ps-principles-title" className="ps-h2">
            Four promises we&rsquo;re holding ourselves to.
          </h2>
        </Reveal>

        <ul className="ps-cards">
          {PRINCIPLES.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="ps-card">
                <span className="ps-card__icon">
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

function Status() {
  return (
    <section className="ps-sec ps-status" aria-labelledby="ps-status-title">
      <Doodle
        name="swirl"
        className="lp-abs lp-c-mint lp-edge"
        style={{ top: "8%", left: "4%", width: 54 }}
      />
      <div className="ps-wrap">
        <Reveal>
          <p className="ps-eyebrow">Where things stand</p>
          <h2 id="ps-status-title" className="ps-h2">
            Honestly: we&rsquo;re not there yet.
          </h2>
        </Reveal>

        <ol className="ps-steps">
          {STATUS_STEPS.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 90} className={`ps-step ps-step--${s.state}`}>
                <span className="ps-step__marker" aria-hidden="true">
                  {s.state === "done" ? "✓" : i + 1}
                </span>
                <p className="ps-step__label">{s.label}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="ps-sec ps-faq" aria-labelledby="ps-faq-title">
      <div className="ps-wrap ps-faq__inner">
        <Reveal>
          <p className="ps-eyebrow">Questions</p>
          <h2 id="ps-faq-title" className="ps-h2">
            What people ask us.
          </h2>
        </Reveal>

        <div className="ps-faq__list">
          {FAQ.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 60}>
              <details className="ps-qa">
                <summary>
                  <span>{q}</span>
                  <LuPlus aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="ps-cta" aria-labelledby="ps-cta-title">
      <div className="ps-wrap">
        <Reveal className="ps-cta__box">
          <Doodle
            name="heart"
            fill="currentColor"
            className="lp-abs lp-float lp-c-o"
            style={{ top: 18, left: 24, width: 32 }}
          />
          <Doodle
            name="star"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun"
            style={{ bottom: 20, right: 28, width: 32 }}
          />
          <h2 id="ps-cta-title" className="ps-h2 ps-h2--center">
            Be there from day one.
          </h2>
          <p className="ps-cta__text">
            Tell us you&rsquo;re interested and we&rsquo;ll keep you posted
            &mdash; or help build what comes next in the meantime.
          </p>
          <div className="ps-cta__actions">
            <a href={NOTIFY_MAILTO} className="ps-btn ps-btn--primary">
              <LuMail aria-hidden="true" /> Keep Me Posted
            </a>
            <Link to={LINKS.volunteer} className="ps-btn ps-btn--outline">
              <LuUsers aria-hidden="true" /> Volunteer
            </Link>
            <Link to={LINKS.partner} className="ps-btn ps-btn--outline">
              <LuHandshake aria-hidden="true" /> Partner
            </Link>
            <Link to={LINKS.donate} className="ps-btn ps-btn--outline">
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

export default function ProjectSmiles() {
  useEffect(() => {
    document.title = "Project 1,000 Smiles | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="ps-page">
      <style>{CSS}</style>
      <Hero />
      <Why />
      <SmileWall />
      <Principles />
      <Status />
      <Faq />
      <ClosingCta />
    </div>
  );
}

/* ==========================================================================
   STYLES ("ps-" scoped to this page; "lp-" comes from shared doodles.css)
   Resets use :where() so they never out-rank the class rules below.
   ========================================================================== */

const CSS = `
.ps-page {
  --o: #ff741f; --od: #f05f0c; --oi: #c9500a; --ink: #0b2233; --navy: #052436;
  --body: #3f4d58; --cream: #faf9f4; --sun: #ffb627; --peach: #ffe9d6; --mint: #d9f0e6; --line: #eadfd2;
  --serif: 'Newsreader', Georgia, 'Times New Roman', serif;
  --sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;

  position: relative;
  overflow-x: clip;
  background: #fcfcfa;
  color: var(--body);
  font-family: var(--sans);
  line-height: 1.6;
}
.ps-page *, .ps-page *::before, .ps-page *::after { box-sizing: border-box; }
.ps-page img { display: block; max-width: 100%; }
.ps-page :where(ul, ol) { margin: 0; padding: 0; list-style: none; }
.ps-page :where(h1, h2, h3, p, figure) { margin: 0; }
.ps-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }

.ps-wrap { position: relative; z-index: 1; width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.ps-sec { position: relative; padding-block: clamp(52px, 6.5vw, 92px); }

.ps-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.ps-eyebrow--light { color: var(--sun); }
.ps-h1 { margin-bottom: 10px; font-family: var(--serif); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 500; line-height: 1.06; letter-spacing: -0.02em; color: var(--ink); }
.ps-sub { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(1.2rem, 2vw, 1.5rem); font-style: italic; color: var(--oi); }
.ps-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.8rem, 3.1vw, 2.5rem); font-weight: 500; line-height: 1.15; letter-spacing: -0.015em; color: var(--ink); }
.ps-h2--light { color: #fff; }
.ps-h2--center { text-align: center; max-width: 24ch; margin: 0 auto 12px; }
.ps-lead { max-width: 36rem; margin-bottom: 26px; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.65; }
.ps-p { max-width: 34rem; margin-bottom: 1.1em; font-size: 1.02rem; line-height: 1.75; }

.ps-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.6rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.92rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.ps-btn svg { width: 1.1em; height: 1.1em; }
.ps-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.ps-btn--primary { background: var(--od); color: #fff; }
.ps-btn--outline { background: #fff; color: var(--ink); }
.ps-btn--outline:hover { background: var(--peach); }
.ps-actions { display: flex; flex-wrap: wrap; gap: 14px; }

.ps-textlink { display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 700; color: var(--oi); text-decoration: none; }
.ps-textlink:hover { text-decoration: underline; text-underline-offset: 3px; }
.ps-textlink svg { width: 1em; height: 1em; }

.ps-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.ps-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .ps-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.ps-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 104px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }
.ps-hero__grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.ps-photo { position: relative; }
.ps-photo img { width: 100%; aspect-ratio: 1.1; object-fit: cover; border: 8px solid #fff; border-radius: 24px; box-shadow: 0 26px 44px -24px rgba(5,36,54,.5), 5px 7px 0 var(--o); transform: rotate(-1.2deg); }
.ps-badge { position: absolute; top: 22px; right: 22px; z-index: 2; display: grid; place-content: center; width: 96px; height: 96px; border: 2px solid var(--ink); border-radius: 50%; background: var(--sun); box-shadow: 4px 5px 0 var(--ink); transform: rotate(8deg); text-align: center; font-family: var(--serif); font-weight: 600; line-height: 1.15; color: var(--ink); }
.ps-badge span { display: block; font-size: 1.05rem; }
.ps-badge span:first-child { margin-bottom: 2px; font-family: var(--sans); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }

/* ---- Why ---- */
.ps-why { background: #fcfcfa; overflow: hidden; }
.ps-why__grid { display: grid; grid-template-columns: minmax(0,0.85fr) minmax(0,1.15fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.ps-why__photo img { width: 100%; aspect-ratio: 1.05; object-fit: cover; }
.ps-sticky { position: relative; max-width: 42rem; margin: clamp(44px, 6vw, 72px) auto 0; padding: clamp(26px, 4vw, 38px); background: var(--sun); border: 2px solid var(--ink); border-radius: 10px 10px 26px 10px; transform: rotate(-1deg); box-shadow: 7px 9px 0 var(--ink); }
.ps-sticky::before { content: ''; position: absolute; top: -14px; left: 40px; width: 90px; height: 26px; background: rgba(255,255,255,.7); transform: rotate(-4deg); box-shadow: 0 1px 2px rgba(0,0,0,.12); }
.ps-sticky.ps-reveal.is-in { transform: rotate(-1deg); }
.ps-sticky__small { margin-bottom: 8px; font-size: 0.85rem; font-weight: 700; color: var(--ink); }
.ps-sticky__big { font-family: var(--serif); font-size: clamp(1.3rem, 2.6vw, 1.85rem); font-weight: 600; line-height: 1.28; color: var(--ink); }

/* ---- Smile wall ---- */
.ps-wall { position: relative; overflow: hidden; padding-block: clamp(56px, 7vw, 100px); background: var(--navy); color: #fff; }
.ps-wall__grid { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.ps-wall__text { max-width: 32rem; margin-bottom: 22px; font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,.9); }
.ps-wall__count { font-size: 1rem; color: rgba(255,255,255,.85); }
.ps-wall__count strong { font-family: var(--serif); font-size: 2.2rem; font-weight: 600; color: var(--sun); }
.ps-wall__note { margin-top: 6px; font-size: 0.85rem; font-style: italic; color: rgba(255,255,255,.65); }
.ps-dots { display: grid; grid-template-columns: repeat(10, 1fr); gap: clamp(6px, 1.4vw, 12px); max-width: 420px; margin-inline: auto; }
.ps-dot { aspect-ratio: 1; border: 2px dashed rgba(255,255,255,.32); border-radius: 50%; }
.ps-dot--on { border: 2px solid var(--sun); background: var(--sun); }

/* ---- Principles ---- */
.ps-principles { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; }
.ps-cards { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; margin-top: 32px; }
.ps-card { height: 100%; padding: 24px 20px 26px; background: #fff; border: 2px solid var(--ink); border-radius: 22px; box-shadow: 4px 6px 0 var(--ink); }
.ps-card__icon { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 14px; background: var(--peach); border: 2px solid var(--ink); border-radius: 55% 45% 52% 48% / 50% 55% 45% 50%; color: var(--od); }
.ps-card__icon svg { width: 22px; height: 22px; }
.ps-card h3 { margin-bottom: 8px; font-family: var(--serif); font-size: 1.15rem; font-weight: 600; line-height: 1.25; color: var(--ink); }
.ps-card p { font-size: 0.88rem; line-height: 1.6; }

/* ---- Status ---- */
.ps-status { background: #fcfcfa; overflow: hidden; }
.ps-steps { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; margin-top: 32px; }
.ps-step { position: relative; height: 100%; padding: 30px 22px 24px; background: #fff; border: 2px solid var(--ink); border-radius: 22px; }
.ps-step__marker { position: absolute; top: -18px; left: 20px; display: grid; place-items: center; width: 36px; height: 36px; border: 2px solid var(--ink); border-radius: 50%; background: #fff; font-family: var(--serif); font-size: 1rem; font-weight: 700; color: var(--ink); }
.ps-step__label { margin-bottom: 4px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--oi); }
.ps-step h3 { margin-bottom: 8px; font-family: var(--serif); font-size: 1.2rem; font-weight: 600; line-height: 1.25; color: var(--ink); }
.ps-step p:last-child { font-size: 0.9rem; line-height: 1.6; }
.ps-step--done { background: var(--mint); box-shadow: 4px 5px 0 var(--ink); }
.ps-step--done .ps-step__marker { background: var(--ink); color: #fff; }
.ps-step--current { background: var(--peach); box-shadow: 5px 7px 0 var(--o); }
.ps-step--current .ps-step__marker { background: var(--od); color: #fff; }
.ps-step--next { border-style: dashed; }

/* ---- FAQ ---- */
.ps-faq { background: var(--cream); }
.ps-faq__inner { max-width: 820px; }
.ps-faq__list { display: grid; gap: 14px; margin-top: 28px; }
.ps-qa { background: #fff; border: 2px solid var(--ink); border-radius: 18px; box-shadow: 3px 4px 0 var(--ink); }
.ps-qa summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; cursor: pointer; list-style: none; font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: var(--ink); }
.ps-qa summary::-webkit-details-marker { display: none; }
.ps-qa summary svg { flex: none; width: 20px; height: 20px; color: var(--od); transition: transform 0.2s; }
.ps-qa[open] summary svg { transform: rotate(45deg); }
.ps-qa p { padding: 0 22px 20px; font-size: 0.95rem; line-height: 1.7; }

/* ---- Closing CTA ---- */
.ps-cta { padding-block: clamp(48px, 6vw, 88px); background: #fff4ea; }
.ps-cta__box { position: relative; padding: clamp(32px, 5vw, 56px) 24px; background: #fff; border: 2px solid var(--ink); border-radius: 30px; box-shadow: 8px 10px 0 var(--ink); text-align: center; overflow: hidden; }
.ps-cta__text { max-width: 34rem; margin: 0 auto 22px; font-size: 1rem; line-height: 1.65; }
.ps-cta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }

/* ---- Responsive ---- */
@media (max-width: 960px) {
  .ps-cards { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 860px) {
  .ps-hero__grid, .ps-why__grid, .ps-wall__grid { grid-template-columns: 1fr; }
  .ps-photo { order: -1; }
  .ps-why__photo { max-width: 380px; }
  .ps-steps { grid-template-columns: 1fr; gap: 28px; }
}
@media (max-width: 560px) {
  .ps-cards { grid-template-columns: 1fr; }
  .ps-badge { width: 78px; height: 78px; top: 14px; right: 14px; }
  .ps-badge span { font-size: 0.85rem; }
  .ps-badge span:first-child { font-size: 0.62rem; }
}
`;
