// GetInvolved.jsx — "Get Involved" page
// ---------------------------------------------------------------------------
// IMPORTANT: this is a new PAGE file. It is not the same as your existing
// src/components/GetInvolved.jsx (the homepage teaser section) — keep both,
// don't let one overwrite the other. Place this one at:
// src/pages/GetInvolved.jsx
//
// There's no backend/form service or payment link wired up on this site yet,
// so:
//  - Volunteer and Partner buttons open a pre-filled mailto: using the same
//    address already in your Footer (sanusijafarfoundation@gmail.com). These
//    work today, no setup needed.
//  - Donate is clearly marked as a placeholder — swap DONATE_HREF for a real
//    payment link (Paystack/Flutterwave/etc.) or bank-transfer details
//    section once you have one.
//
// Reuses the shared <Doodle> component + doodles.css from the landing-page
// pass. Page-specific rules are scoped locally ("gi-" prefix).
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuBaby,
  LuHandHeart,
  LuHandshake,
  LuHeart,
  LuHeartPulse,
  LuMail,
  LuMegaphone,
  LuPackage,
  LuUsers,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

/* ==========================================================================
   EDITABLE CONTENT
   ========================================================================== */

const CONTACT_EMAIL = "sanusijafarfoundation@gmail.com";

const mailto = (subject, body) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

// Placeholder — replace with a real payment link or route to a page with
// bank-transfer details once you have one.
const DONATE_HREF = mailto(
  "I would like to donate",
  "Hi Sanusi Jafar Foundation,\n\nI'd like to make a donation. Please let me know the best way to do that.\n\nThanks!"
);

const VOLUNTEER_ROLES = [
  { icon: LuBaby, text: "Hosting games and activities at the kids' party" },
  { icon: LuHeartPulse, text: "Supporting the blood pressure check station" },
  {
    icon: LuPackage,
    text: "Packing and distributing foodstuffs to widows & market women",
  },
  { icon: LuUsers, text: "Joining the street outreach team" },
  {
    icon: LuHandHeart,
    text: "Joining the mosque visit, days after the main event",
  },
];

const GIVE_WAYS = [
  {
    title: "General donation",
    text: "Give toward wherever the need is greatest this edition — the party, the health checks, or the foodstuffs.",
    icon: LuHeart,
  },
  {
    title: "Foodstuffs for women",
    text: "Last edition, 183 mothers, market women and widows went home with foodstuffs. Help us grow that number.",
    icon: LuPackage,
  },
  {
    title: "A child's gift",
    text: "Edition 1 taught us what it feels like to run short. Help make sure no child at Edition 4 is turned away.",
    icon: LuBaby,
  },
  {
    title: "Health check supplies",
    text: "Blood pressure monitors, gloves and basic supplies for the health station adults rely on.",
    icon: LuHeartPulse,
  },
];

const LINKS = {
  volunteerMailto: mailto(
    "Volunteering for Christmas on the Streets — Edition 4",
    "Hi Sanusi Jafar Foundation,\n\nI'd like to volunteer for this year's Christmas on the Streets (Edition 4). Let me know how I can help.\n\nThanks!"
  ),
  partnerMailto: mailto(
    "Partnership enquiry",
    "Hi Sanusi Jafar Foundation,\n\nMy organisation would like to explore partnering with you. Here's a bit about us:\n\n"
  ),
  smilesMailto: mailto(
    "Keep me posted on Project 1,000 Smiles",
    "Hi Sanusi Jafar Foundation,\n\nPlease keep me posted as Project 1,000 Smiles gets closer to launching.\n\nThanks!"
  ),
  christmas: "/christmas-on-the-streets",
  smilesPage: "/our-work#smiles",
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
      className={`gi-reveal${shown ? " is-in" : ""} ${className}`}
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
    <section className="gi-hero" aria-labelledby="gi-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "14%", left: "5%", width: 32 }}
      />
      <Doodle
        name="heart"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "12%", right: "6%", width: 28 }}
      />

      <div className="gi-wrap">
        <p className="gi-eyebrow">Get involved</p>
        <h1 id="gi-hero-title" className="gi-h1">
          Be part of the change.
        </h1>
        <p className="gi-lead">
          Whether you have a Saturday in December, a network to connect us with,
          or a gift to give &mdash; there&rsquo;s a place for you here.
        </p>

        <nav className="gi-jump" aria-label="Jump to a section">
          <a href="#volunteer">Volunteer</a>
          <a href="#partner">Partner</a>
          <a href="#donate">Donate</a>
          <a href="#smiles">Project 1,000 Smiles</a>
        </nav>
      </div>
    </section>
  );
}

function Volunteer() {
  return (
    <section
      id="volunteer"
      className="gi-sec gi-volunteer"
      aria-labelledby="gi-volunteer-title"
    >
      <Doodle
        name="zigzag"
        className="lp-abs lp-c-o lp-edge"
        style={{ top: "6%", right: "5%", width: 90 }}
      />
      <div className="gi-wrap gi-volunteer__grid">
        <Reveal>
          <p className="gi-eyebrow">This December</p>
          <h2 id="gi-volunteer-title" className="gi-h2">
            Volunteer for Edition 4
          </h2>
          <p className="gi-lead gi-lead--dark">
            Christmas on the Streets runs on volunteers. Here&rsquo;s where
            hands are needed this year:
          </p>
          <a href={LINKS.volunteerMailto} className="gi-btn gi-btn--primary">
            <LuMail aria-hidden="true" /> Email Us To Volunteer
          </a>
        </Reveal>

        <Reveal delay={100}>
          <ul className="gi-roles">
            {VOLUNTEER_ROLES.map(({ icon: Icon, text }, i) => (
              <li key={text} style={{ "--d": `${i * 60}ms` }}>
                <span className="gi-roles__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Link to={LINKS.christmas} className="gi-textlink">
            Read the full story of Christmas on the Streets{" "}
            <LuArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section
      id="partner"
      className="gi-partner"
      aria-labelledby="gi-partner-title"
    >
      <div className="gi-wrap gi-partner__grid">
        <Reveal>
          <span className="gi-partner__icon">
            <LuMegaphone aria-hidden="true" />
          </span>
          <p className="gi-eyebrow gi-eyebrow--light">For organisations</p>
          <h2 id="gi-partner-title" className="gi-h2 gi-h2--light">
            Partner with us.
          </h2>
          <p>
            Businesses, community groups and organisations help us reach further
            &mdash; sponsoring supplies, lending a venue, or joining hands on
            the day itself. If that sounds like you, we&rsquo;d love to talk.
          </p>
          <a href={LINKS.partnerMailto} className="gi-btn gi-btn--white">
            <LuHandshake aria-hidden="true" /> Start A Conversation
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Donate() {
  return (
    <section
      id="donate"
      className="gi-sec gi-donate"
      aria-labelledby="gi-donate-title"
    >
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "8%", right: "6%", width: 70 }}
      />
      <div className="gi-wrap">
        <Reveal>
          <p className="gi-eyebrow">Give</p>
          <h2 id="gi-donate-title" className="gi-h2">
            However you give, it reaches someone.
          </h2>
        </Reveal>

        <ul className="gi-give">
          {GIVE_WAYS.map(({ title, text, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="gi-give__card">
                <span className="gi-give__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="gi-donate__cta">
          <a href={DONATE_HREF} className="gi-btn gi-btn--primary">
            <LuHeart aria-hidden="true" /> Donate Now
          </a>
          <p
            style={{
              paddingTop: "12px",
            }}
            className="gi-donate__note"
          >
            We&rsquo;ll get back to you with the best way to give.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SmilesEarly() {
  return (
    <section
      id="smiles"
      className="gi-smiles"
      aria-labelledby="gi-smiles-title"
    >
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "14%", right: "10%", width: 34 }}
      />
      <div className="gi-wrap gi-smiles__inner">
        <span className="gi-badge" aria-label="Coming soon">
          <span>Coming</span>
          <span>Soon</span>
        </span>
        <Reveal>
          <p className="gi-eyebrow">Get in early</p>
          <h2 id="gi-smiles-title" className="gi-h2 gi-h2--light">
            Project 1,000 Smiles
          </h2>
          <p className="gi-lead gi-lead--dark">
            It hasn&rsquo;t launched yet &mdash; which means there&rsquo;s still
            time to be part of it from day one, not just once it&rsquo;s
            running.
          </p>
          <div className="gi-smiles__actions">
            <a href={LINKS.smilesMailto} className="gi-btn gi-btn--primary">
              <LuMail aria-hidden="true" /> Keep Me Posted
            </a>
            <Link to={LINKS.smilesPage} className="gi-btn gi-btn--outline">
              Learn More <LuArrowRight aria-hidden="true" />
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

export default function GetInvolved() {
  useEffect(() => {
    document.title = "Get Involved | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="gi-page">
      <style>{CSS}</style>
      <Hero />
      <Volunteer />
      <Partner />
      <Donate />
      <SmilesEarly />
    </div>
  );
}

/* ==========================================================================
   STYLES ("gi-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.gi-page {
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
.gi-page *, .gi-page *::before, .gi-page *::after { box-sizing: border-box; }
.gi-page ul { margin: 0; padding: 0; list-style: none; }
.gi-page h1, .gi-page h2, .gi-page h3, .gi-page p { margin: 0; }
.gi-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }

.gi-wrap { position: relative; z-index: 1; width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.gi-sec { position: relative; padding-block: clamp(52px, 6.5vw, 92px); }

.gi-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.gi-eyebrow--light { color: var(--sun); }
.gi-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.1rem, 4.4vw, 3.4rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; color: var(--ink); max-width: 18ch; }
.gi-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.16; letter-spacing: -0.015em; color: var(--ink); }
.gi-h2--light { color: #fff; }
.gi-lead { max-width: 38rem; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.65; margin-bottom: 26px; }
.gi-lead--dark { color: var(--body); }

.gi-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.85rem 1.6rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.92rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.gi-btn svg { width: 1.1em; height: 1.1em; }
.gi-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.gi-btn--primary { background: var(--od); color: #fff; }
.gi-btn--outline { background: #fff; color: var(--ink); }
.gi-btn--outline:hover { background: var(--peach); }
.gi-btn--white { background: #fff; color: var(--oi); }
.gi-btn--white:hover { background: var(--cream); }

.gi-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.gi-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .gi-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.gi-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 104px) clamp(44px, 5.5vw, 72px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }
.gi-jump { display: flex; flex-wrap: wrap; gap: 10px; }
.gi-jump a { padding: 0.55rem 1.1rem; border: 2px solid var(--ink); border-radius: 999px; background: #fff; font-size: 0.85rem; font-weight: 700; color: var(--ink); text-decoration: none; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s; }
.gi-jump a:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }

/* ---- Volunteer ---- */
.gi-volunteer { background: #fcfcfa; overflow: hidden; }
.gi-volunteer__grid { display: grid; grid-template-columns: minmax(0,0.95fr) minmax(0,1.05fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.gi-roles { display: grid; gap: 14px; }
.gi-roles li { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--peach); border: 2px solid var(--ink); border-radius: 16px; box-shadow: 3px 4px 0 var(--ink); font-size: 0.95rem; color: var(--ink); font-weight: 500; }
.gi-roles__icon { display: grid; place-items: center; flex: none; width: 38px; height: 38px; background: #fff; border-radius: 50%; color: var(--od); }
.gi-roles__icon svg { width: 19px; height: 19px; }
.gi-textlink { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; font-size: 0.88rem; font-weight: 700; color: var(--oi); text-decoration: none; }
.gi-textlink:hover { text-decoration: underline; text-underline-offset: 3px; }
.gi-textlink svg { width: 1em; height: 1em; }

/* ---- Partner ---- */
.gi-partner { position: relative; overflow: hidden; padding-block: clamp(52px, 6.5vw, 92px); background: linear-gradient(120deg, #f26a0f 0%, #df5604 100%); color: #fff; }
.gi-partner__grid { max-width: 42rem; }
.gi-partner__icon { display: inline-grid; place-items: center; width: 56px; height: 56px; margin-bottom: 18px; background: rgba(255,255,255,.16); border: 2px solid rgba(255,255,255,.5); border-radius: 50%; color: #fff; }
.gi-partner__icon svg { width: 26px; height: 26px; }
.gi-partner p { max-width: 34rem; font-size: 1.02rem; line-height: 1.7; color: rgba(255,255,255,.92); margin-bottom: 26px; }

/* ---- Donate ---- */
.gi-donate { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.gi-give { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; margin-top: 32px; }
.gi-give__card { height: 100%; padding: 22px 20px 24px; background: #fff; border: 2px solid var(--ink); border-radius: 20px; box-shadow: 4px 5px 0 var(--ink); }
.gi-give__icon { display: grid; place-items: center; width: 46px; height: 46px; margin-bottom: 14px; background: var(--mint); border-radius: 50%; color: var(--od); }
.gi-give__icon svg { width: 22px; height: 22px; }
.gi-give__card h3 { font-family: var(--serif); font-size: 1.08rem; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.gi-give__card p { font-size: 0.85rem; line-height: 1.55; }
.gi-donate__cta { margin-top: 36px; text-align: center; }
.gi-donate__note { margin-top: 18px; font-size: 0.82rem; font-style: italic; color: var(--body); }

/* ---- Smiles early ---- */
.gi-smiles { position: relative; padding-block: clamp(56px, 7vw, 100px); background: var(--navy); color: #fff; overflow: hidden; }
.gi-smiles__inner { max-width: 42rem; }
.gi-badge { display: inline-grid; place-content: center; width: 88px; height: 88px; margin-bottom: 22px; border: 2px solid #fff; border-radius: 50%; background: var(--sun); box-shadow: 4px 5px 0 rgba(0,0,0,.25); transform: rotate(-8deg); text-align: center; font-family: var(--serif); font-weight: 600; color: var(--ink); line-height: 1.15; }
.gi-badge span { display: block; font-size: 0.98rem; }
.gi-badge span:first-child { text-transform: uppercase; font-size: 0.66rem; font-family: var(--sans); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 2px; }
.gi-smiles p.gi-lead { color: rgba(255,255,255,.88); }
.gi-smiles__actions { display: flex; flex-wrap: wrap; gap: 14px; }
.gi-smiles .gi-btn--outline { background: transparent; border-color: #fff; color: #fff; }
.gi-smiles .gi-btn--outline:hover { background: rgba(255,255,255,.12); }

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .gi-volunteer__grid { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .gi-give { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 520px) {
  .gi-give { grid-template-columns: 1fr; }
  .gi-jump { flex-direction: column; align-items: flex-start; }
  .gi-jump a { width: 100%; text-align: center; }
}
`;
