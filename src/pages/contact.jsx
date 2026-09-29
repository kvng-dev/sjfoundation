// Contact.jsx — dedicated "Contact" page
// ---------------------------------------------------------------------------
// Route suggestion: /contact.
//
// FORM BEHAVIOUR: there's no backend on this site yet, so the form doesn't
// submit to a server — on "Send Message" it builds a mailto: link from what
// was typed and hands off to the visitor's own email client (pre-filled,
// ready to send). That's a real, working action today with zero setup.
// If you later want a true server-side submission (so messages land
// somewhere without the visitor's email client opening), swap handleSubmit
// for a fetch() call to a form service (Formspree, etc.) or your own API —
// everything else on the page stays the same.
//
// Reuses the shared <Doodle> component + doodles.css. Place at:
// src/pages/Contact.jsx
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuHandshake,
  LuHeart,
  LuMail,
  LuMapPin,
  LuPhone,
  LuSend,
} from "react-icons/lu";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Doodle } from "../components/Doodles.jsx";
import { contact } from "../data/content.js";

/* ==========================================================================
   EDITABLE CONTENT — same details already used in your Footer
   ========================================================================== */

// Placeholders — same "#" state as your Footer. Swap in real profile URLs.
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sanusijafarfoundation?stkn=MXdzY2s2anQ0MDMzNw%3D%3D&utm_source=qr",
    icon: FaInstagram,
  },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "Facebook", href: "#", icon: FaFacebookF },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@sanusijafarfoundation?_r=1&_t=ZS-9A05NRww5c9",
    icon: FaTiktok,
  },
  { label: "YouTube", href: "#", icon: FaYoutube },
];

const REASONS = [
  "General enquiry",
  "Volunteering",
  "Partnership",
  "Media / Press",
  "Something else",
];

const REDIRECTS = [
  {
    title: "Want to volunteer or partner?",
    text: "Edition 4 of Christmas on the Streets is this December — hands and partners both welcome.",
    cta: "Go to Get Involved",
    href: "/get-involved",
    icon: LuHandshake,
  },
  {
    title: "Ready to give?",
    text: "See the ways to give and how to reach us if you'd rather donate directly.",
    cta: "Go to Donate",
    href: "/donate",
    icon: LuHeart,
  },
];

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
      className={`ct-reveal${shown ? " is-in" : ""} ${className}`}
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
    <section className="ct-hero" aria-labelledby="ct-hero-title">
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "14%", left: "5%", width: 30 }}
      />
      <Doodle
        name="heart"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "12%", right: "6%", width: 28 }}
      />
      <div className="ct-wrap">
        <p className="ct-eyebrow">Contact</p>
        <h1 id="ct-hero-title" className="ct-h1">
          Let&rsquo;s talk.
        </h1>
        <p className="ct-lead">
          Questions about volunteering, partnering, or anything else &mdash;
          we&rsquo;d love to hear from you.
        </p>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <section className="ct-sec ct-details" aria-label="Contact details">
      <div className="ct-wrap">
        <ul className="ct-details__grid">
          <Reveal as="li" className="ct-details__card">
            <span className="ct-details__icon">
              <LuPhone aria-hidden="true" />
            </span>
            <h2>Phone</h2>
            <a href={contact.phoneHref}>{contact.phone}</a>
          </Reveal>
          <Reveal as="li" delay={80} className="ct-details__card">
            <span className="ct-details__icon">
              <LuMail aria-hidden="true" />
            </span>
            <h2>Email</h2>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </Reveal>
          <Reveal as="li" delay={160} className="ct-details__card">
            <span className="ct-details__icon">
              <LuMapPin aria-hidden="true" />
            </span>
            <h2>Location</h2>
            <span>{contact.location}</span>
          </Reveal>
        </ul>

        <Reveal delay={220} className="ct-social">
          <span className="ct-social__label">Follow us</span>
          <ul className="ct-social__list">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    reason: REASONS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Website enquiry: ${values.reason}`;
    const body =
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Reason: ${values.reason}\n\n` +
      `${values.message}`;
    window.location.href = `mailto:${
      CONTACT.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="ct-sec ct-form-sec" aria-labelledby="ct-form-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "8%", right: "6%", width: 70 }}
      />
      <div className="ct-wrap">
        <Reveal>
          <p className="ct-eyebrow">Send a message</p>
          <h2 id="ct-form-title" className="ct-h2">
            We read every message.
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          as="form"
          className="ct-form"
          onSubmit={handleSubmit}
        >
          <div className="ct-form__row">
            <label className="ct-field">
              <span>Name</span>
              <input
                type="text"
                required
                value={values.name}
                onChange={update("name")}
                placeholder="Your name"
              />
            </label>
            <label className="ct-field">
              <span>Email</span>
              <input
                type="email"
                required
                value={values.email}
                onChange={update("email")}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="ct-field">
            <span>Reason</span>
            <select value={values.reason} onChange={update("reason")}>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="ct-field">
            <span>Message</span>
            <textarea
              required
              rows={5}
              value={values.message}
              onChange={update("message")}
              placeholder="Tell us a little about what you need..."
            />
          </label>

          <button type="submit" className="ct-btn ct-btn--primary">
            <LuSend aria-hidden="true" /> Send Message
          </button>

          <p className="ct-form__note" aria-live="polite">
            {sent
              ? "Opening your email app with your message ready to send — if nothing opened, email us directly instead."
              : "This opens your email app with your message pre-filled, ready to send."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Redirects() {
  return (
    <section
      className="ct-sec ct-redirects"
      aria-label="Looking for something specific"
    >
      <div className="ct-wrap">
        <ul className="ct-redirects__grid">
          {REDIRECTS.map(({ title, text, cta, href, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 90} className="ct-redirect">
                <span className="ct-redirect__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to={href} className="ct-textlink">
                  {cta} <LuArrowRight aria-hidden="true" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="ct-page">
      <style>{CSS}</style>
      <Hero />
      <ContactDetails />
      <ContactForm />
      <Redirects />
    </div>
  );
}

/* ==========================================================================
   STYLES ("ct-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.ct-page {
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
.ct-page *, .ct-page *::before, .ct-page *::after { box-sizing: border-box; }
.ct-page :where(ul) { margin: 0; padding: 0; list-style: none; }
.ct-page :where(h1, h2, h3, p, dl, dd, dt) { margin: 0; }
.ct-page a { color: var(--oi); }
.ct-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }

.ct-wrap { position: relative; z-index: 1; width: 100%; max-width: 1080px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.ct-sec { position: relative; padding-block: clamp(48px, 6vw, 84px); }

.ct-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.ct-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.1rem, 4.4vw, 3.4rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; color: var(--ink); }
.ct-h2 { margin-bottom: 8px; font-family: var(--serif); font-size: clamp(1.7rem, 2.8vw, 2.2rem); font-weight: 500; line-height: 1.18; letter-spacing: -0.015em; color: var(--ink); }
.ct-lead { max-width: 36rem; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.65; }

.ct-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.ct-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .ct-reveal { opacity: 1; transform: none; transition: none; } }

.ct-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.85rem 1.7rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.95rem; font-weight: 700; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.ct-btn svg { width: 1.1em; height: 1.1em; }
.ct-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.ct-btn--primary { background: var(--od); color: #fff; }

.ct-textlink { display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 700; color: var(--oi); text-decoration: none; }
.ct-textlink:hover { text-decoration: underline; text-underline-offset: 3px; }
.ct-textlink svg { width: 1em; height: 1em; }

/* ---- Hero ---- */
.ct-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 100px) clamp(36px, 5vw, 56px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }

/* ---- Contact details ---- */
.ct-details { background: #fcfcfa; }
.ct-details__grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 20px; margin-bottom: 40px; }
.ct-details__card { padding: 24px 22px; background: #fff; border: 2px solid var(--ink); border-radius: 20px; box-shadow: 4px 5px 0 var(--ink); }
.ct-details__icon { display: grid; place-items: center; width: 46px; height: 46px; margin-bottom: 14px; background: var(--peach); border-radius: 50%; color: var(--od); }
.ct-details__icon svg { width: 21px; height: 21px; }
.ct-details__card h2 { font-family: var(--serif); font-size: 1.05rem; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.ct-details__card a, .ct-details__card span { font-size: 0.92rem; text-decoration: none; overflow-wrap: break-word; }
.ct-details__card a:hover { text-decoration: underline; }

.ct-social { display: flex; align-items: center; gap: 16px; }
.ct-social__label { font-size: 0.85rem; font-weight: 700; color: var(--ink); }
.ct-social__list { display: flex; gap: 8px; }
.ct-social__list a { display: grid; place-items: center; width: 38px; height: 38px; border: 2px solid var(--ink); border-radius: 50%; color: var(--ink); }
.ct-social__list a:hover { background: var(--peach); }
.ct-social__list svg { width: 15px; height: 15px; }

/* ---- Contact form ---- */
.ct-form-sec { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.ct-form { max-width: 640px; margin-top: 28px; padding: clamp(26px, 4vw, 40px); background: #fff; border: 2px solid var(--ink); border-radius: 26px; box-shadow: 6px 8px 0 var(--ink); }
.ct-form__row { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }
.ct-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; font-size: 0.85rem; font-weight: 700; color: var(--ink); }
.ct-field input, .ct-field select, .ct-field textarea { padding: 0.7em 0.9em; border: 2px solid var(--line); border-radius: 12px; font-family: var(--sans); font-size: 0.95rem; font-weight: 400; color: var(--ink); background: #fcfcfa; resize: vertical; }
.ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { outline: none; border-color: var(--o); }
.ct-form__note { margin-top: 14px; font-size: 0.8rem; font-style: italic; color: var(--body); }

/* ---- Redirects ---- */
.ct-redirects { background: #fff4ea; }
.ct-redirects__grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 20px; }
.ct-redirect { height: 100%; padding: 24px 24px 26px; background: #fff; border: 2px solid var(--ink); border-radius: 22px; box-shadow: 4px 6px 0 var(--ink); }
.ct-redirect__icon { display: grid; place-items: center; width: 46px; height: 46px; margin-bottom: 14px; background: var(--peach); border-radius: 50%; color: var(--od); }
.ct-redirect__icon svg { width: 21px; height: 21px; }
.ct-redirect h3 { font-family: var(--serif); font-size: 1.15rem; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.ct-redirect p { font-size: 0.9rem; line-height: 1.55; margin-bottom: 14px; }

/* ---- Responsive ---- */
@media (max-width: 780px) {
  .ct-details__grid { grid-template-columns: 1fr; }
  .ct-redirects__grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .ct-form__row { grid-template-columns: 1fr; }
}
`;
