// Donate.jsx — dedicated "Donate" page
// ---------------------------------------------------------------------------
// Route suggestion: /donate. Your header's Donate button currently points at
// /contact (a placeholder from before this page existed) — update it to
// /donate once this is wired in.
//
// IMPORTANT — things you need to fill in before this goes live:
//   1. BANK_DETAILS below — account number and bank name are placeholders.
//   2. ONLINE_PAYMENT_URL — set this once you have a Paystack/Flutterwave/
//      Stripe link; until then that card just points people to email you.
// Nothing here invents real financial details — every placeholder is
// obviously bracketed so it can't be mistaken for real information.
//
// "Let us know you gave" form: since a bank transfer alone doesn't tell you
// who sent it, this opens the visitor's email client with the details
// pre-filled (name optional / anonymous, amount, date, cause, message) so
// they land in your inbox instead of nowhere. It does not claim to have
// "recorded" or "confirmed" anything on its own — it's a handoff to email,
// same as the other no-backend actions on this page.
//
// Reuses the shared <Doodle> component + doodles.css. Place at:
// src/pages/Donate.jsx
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  LuBaby,
  LuBuilding2,
  LuCheck,
  LuCopy,
  LuHandHeart,
  LuHeart,
  LuHeartPulse,
  LuMail,
  LuPackage,
} from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

/* ==========================================================================
   EDITABLE CONTENT — fill these in
   ========================================================================== */

const CONTACT_EMAIL = "sanusijafarfoundation@gmail.com";

// Placeholders — replace with your real details. Leave the brackets in place
// if a field isn't ready yet; never publish a guessed account number.
const BANK_DETAILS = {
  accountName: "Sanusi Jafar Foundation",
  accountNumber: "1309460485",
  bankName: "Providus Bank",
};

// Set this once you have a real payment link (Paystack/Flutterwave/etc.).
// While it's null, the Online Giving card points people to email you instead.
const ONLINE_PAYMENT_URL = null;

const mailto = (subject, body) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

const DONATE_MAILTO = mailto(
  "I would like to donate",
  "Hi Sanusi Jafar Foundation,\n\nI'd like to make a donation. Please let me know the best way to do that.\n\nThanks!"
);

const GIVE_WAYS = [
  {
    title: "General donation",
    text: "Give toward wherever the need is greatest this edition — the party, the health checks, or the foodstuffs.",
    icon: LuHeart,
  },
  {
    title: "Foodstuffs for a widow",
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

const IMPACT_STRIP = [
  { value: 1354, suffix: "+", label: "Children reached" },
  { value: 273, suffix: "+", label: "Mothers & widows supported" },
  { value: 3, suffix: "", label: "Editions run so far" },
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
      className={`dn-reveal${shown ? " is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, the value is still
      // visible on screen to copy manually.
    }
  };

  return (
    <div className="dn-field">
      <span className="dn-field__label">{label}</span>
      <div className="dn-field__row">
        <span className="dn-field__value">{value}</span>
        <button
          type="button"
          className="dn-field__copy"
          onClick={copy}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <LuCheck aria-hidden="true" />
          ) : (
            <LuCopy aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

function Hero() {
  return (
    <section className="dn-hero" aria-labelledby="dn-hero-title">
      <Doodle
        name="heart"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ top: "14%", left: "5%", width: 32 }}
      />
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ bottom: "12%", right: "6%", width: 30 }}
      />
      <div className="dn-wrap">
        <p className="dn-eyebrow">Give</p>
        <h1 id="dn-hero-title" className="dn-h1">
          Your gift reaches someone.
        </h1>
        <p className="dn-lead">
          A bag of rice for a widow. A gift for a child. The health check that
          catches something early. Every donation becomes something specific,
          for someone real.
        </p>
      </div>
    </section>
  );
}

// function ImpactStrip() {
//   return (
//     <section className="dn-strip" aria-label="Impact so far">
//       <div className="dn-wrap">
//         <dl className="dn-strip__grid">
//           {IMPACT_STRIP.map((s, i) => (
//             <Reveal
//               as="div"
//               key={s.label}
//               delay={i * 80}
//               className="dn-strip__item"
//             >
//               <dt className="dn-sr">{s.label}</dt>
//               <dd className="dn-strip__value">
//                 <CountUp
//                   end={s.value}
//                   duration={2.2}
//                   separator=","
//                   enableScrollSpy
//                   scrollSpyOnce
//                 />
//                 {s.suffix}
//               </dd>
//               <dd className="dn-strip__label">{s.label}</dd>
//             </Reveal>
//           ))}
//         </dl>
//       </div>
//     </section>
//   );
// }

function WaysToGive() {
  return (
    <section className="dn-sec dn-ways" aria-labelledby="dn-ways-title">
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "8%", right: "6%", width: 70 }}
      />
      <div className="dn-wrap">
        <Reveal>
          <p className="dn-eyebrow">Ways to give</p>
          <h2 id="dn-ways-title" className="dn-h2">
            However you give, it reaches someone.
          </h2>
        </Reveal>

        <ul className="dn-ways__grid">
          {GIVE_WAYS.map(({ title, text, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="dn-ways__card">
                <span className="dn-ways__icon">
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

function HowToGive() {
  return (
    <section className="dn-sec dn-how" aria-labelledby="dn-how-title">
      <div className="dn-wrap">
        <Reveal>
          <p className="dn-eyebrow">How to give</p>
          <h2 id="dn-how-title" className="dn-h2">
            Pick whatever's easiest.
          </h2>
        </Reveal>

        <div className="dn-how__grid">
          <Reveal className="dn-how__card">
            <span className="dn-how__icon">
              <LuBuilding2 aria-hidden="true" />
            </span>
            <h3>Bank Transfer</h3>
            <p className="dn-how__text">
              Transfer directly using the details below.
            </p>
            <CopyField label="Account Name" value={BANK_DETAILS.accountName} />
            <CopyField
              label="Account Number"
              value={BANK_DETAILS.accountNumber}
            />
            <CopyField label="Bank" value={BANK_DETAILS.bankName} />
          </Reveal>

          <Reveal delay={90} className="dn-how__card">
            <span className="dn-how__icon">
              <LuHeart aria-hidden="true" />
            </span>
            <h3>Online Giving</h3>
            {ONLINE_PAYMENT_URL ? (
              <>
                <p className="dn-how__text">
                  Give securely online in a couple of taps.
                </p>
                <a href={ONLINE_PAYMENT_URL} className="dn-btn dn-btn--primary">
                  <LuHeart aria-hidden="true" /> Give Online
                </a>
              </>
            ) : (
              <>
                <p className="dn-how__text">
                  We&rsquo;re setting up secure online payment. For now, email
                  us and we&rsquo;ll help you give online.
                </p>
                <a href={DONATE_MAILTO} className="dn-btn dn-btn--outline">
                  <LuMail aria-hidden="true" /> Ask About Online Giving
                </a>
              </>
            )}
          </Reveal>

          <Reveal delay={180} className="dn-how__card">
            <span className="dn-how__icon">
              <LuHandHeart aria-hidden="true" />
            </span>
            <h3>Email Us</h3>
            <p className="dn-how__text">
              Not sure what works best, or want to give in kind? Tell us and
              we&rsquo;ll figure it out together.
            </p>
            <a href={DONATE_MAILTO} className="dn-btn dn-btn--outline">
              <LuMail aria-hidden="true" /> Email Us To Donate
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ConfirmDonation() {
  const [form, setForm] = useState({
    name: "",
    anonymous: false,
    amount: "",
    date: "",
    cause: GIVE_WAYS[0].title,
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const displayName =
      form.anonymous || !form.name.trim() ? "Anonymous" : form.name.trim();

    const lines = [
      "Hi Sanusi Jafar Foundation,",
      "",
      "I just made a bank transfer and wanted to let you know:",
      "",
      `Name: ${displayName}`,
      `Amount: \u20a6${form.amount || "[not specified]"}`,
      form.date ? `Date of transfer: ${form.date}` : null,
      `What it's for: ${form.cause}`,
      !form.anonymous && form.email
        ? `Email (for a thank-you note): ${form.email}`
        : null,
      form.message ? `Message: ${form.message}` : null,
      "",
      "Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = mailto("Donation confirmation", lines);
    setSent(true);
  };

  return (
    <section className="dn-sec dn-confirm" aria-labelledby="dn-confirm-title">
      <div className="dn-wrap">
        <Reveal>
          <p className="dn-eyebrow">Already sent a transfer?</p>
          <h2 id="dn-confirm-title" className="dn-h2">
            Let us know, so we can say thank you.
          </h2>
          <p className="dn-lead" style={{ marginBottom: 28 }}>
            A bank transfer doesn&rsquo;t always tell us who it&rsquo;s from.
            Fill this in — anonymously if you&rsquo;d like — and we&rsquo;ll
            know your gift arrived.
          </p>
        </Reveal>

        <Reveal className="dn-confirm__card">
          <form onSubmit={handleSubmit} className="dn-confirm__form">
            <label className="dn-check">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
              />
              I&rsquo;d like to remain anonymous
            </label>

            {!form.anonymous && (
              <div className="dn-formfield">
                <label htmlFor="dn-name">Name</label>
                <input
                  id="dn-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="dn-formrow">
              <div className="dn-formfield">
                <label htmlFor="dn-amount">Amount transferred *</label>
                <div className="dn-amountinput">
                  <span aria-hidden="true">&#8358;</span>
                  <input
                    id="dn-amount"
                    name="amount"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="dn-formfield">
                <label htmlFor="dn-date">Date of transfer</label>
                <input
                  id="dn-date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="dn-formfield">
              <label htmlFor="dn-cause">What was it for?</label>
              <select
                id="dn-cause"
                name="cause"
                value={form.cause}
                onChange={handleChange}
              >
                {GIVE_WAYS.map((w) => (
                  <option key={w.title} value={w.title}>
                    {w.title}
                  </option>
                ))}
                <option value="Not sure / general">Not sure / general</option>
              </select>
            </div>

            {!form.anonymous && (
              <div className="dn-formfield">
                <label htmlFor="dn-email">
                  Email (optional, for a thank-you note)
                </label>
                <input
                  id="dn-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            )}

            <div className="dn-formfield">
              <label htmlFor="dn-message">
                Anything else you&rsquo;d like us to know?
              </label>
              <textarea
                id="dn-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Optional message"
              />
            </div>

            <button type="submit" className="dn-btn dn-btn--primary">
              <LuHeart aria-hidden="true" /> Let Us Know
            </button>

            {sent && (
              <p className="dn-confirm__notice" role="status">
                Your email app should open with these details filled in — just
                hit send. If it doesn&rsquo;t open, email us directly at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingNote() {
  return (
    <section className="dn-closing" aria-labelledby="dn-closing-title">
      <div className="dn-wrap">
        <Reveal className="dn-closing__box">
          <Doodle
            name="sparkle"
            fill="currentColor"
            className="lp-abs lp-float lp-c-sun"
            style={{ top: 18, left: 24, width: 32 }}
          />
          <h2 id="dn-closing-title" className="dn-h2 dn-h2--center">
            Every donation goes toward Christmas on the Streets and, soon,
            Project 1,000 Smiles.
          </h2>
          <p className="dn-closing__text">Thank you for trusting us with it.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function Donate() {
  useEffect(() => {
    document.title = "Donate | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="dn-page">
      <style>{CSS}</style>
      <Hero />
      <HowToGive />
      <ConfirmDonation />
      {/* <ImpactStrip /> */}
      <WaysToGive />
      <ClosingNote />
    </div>
  );
}

/* ==========================================================================
   STYLES ("dn-" scoped to this page; "lp-" comes from shared doodles.css)
   ========================================================================== */

const CSS = `
.dn-page {
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
.dn-page *, .dn-page *::before, .dn-page *::after { box-sizing: border-box; }
.dn-page :where(ul) { margin: 0; padding: 0; list-style: none; }
.dn-page :where(h1, h2, h3, p, dl, dd, dt) { margin: 0; }
.dn-page :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 6px; }
.dn-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.dn-wrap { position: relative; z-index: 1; width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }
.dn-sec { position: relative; padding-block: clamp(52px, 6.5vw, 92px); }

.dn-eyebrow { margin-bottom: 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--oi); }
.dn-h1 { margin-bottom: 18px; font-family: var(--serif); font-size: clamp(2.1rem, 4.4vw, 3.4rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; color: var(--ink); max-width: 18ch; }
.dn-h2 { margin-bottom: 16px; font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; line-height: 1.16; letter-spacing: -0.015em; color: var(--ink); }
.dn-h2--center { text-align: center; max-width: 30ch; margin: 0 auto 12px; }
.dn-lead { max-width: 38rem; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.65; }

.dn-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.8rem 1.5rem; border: 2px solid var(--ink); border-radius: 999px; font-family: var(--sans); font-size: 0.9rem; font-weight: 700; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.dn-btn svg { width: 1.1em; height: 1.1em; }
.dn-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ink); }
.dn-btn--primary { background: var(--od); color: #fff; }
.dn-btn--outline { background: #fff; color: var(--ink); }
.dn-btn--outline:hover { background: var(--peach); }

.dn-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease var(--d,0ms), transform 0.7s cubic-bezier(.2,.7,.2,1) var(--d,0ms); }
.dn-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .dn-reveal { opacity: 1; transform: none; transition: none; } }

/* ---- Hero ---- */
.dn-hero { position: relative; overflow: hidden; padding-block: clamp(56px, 8vw, 100px) clamp(36px, 5vw, 56px); background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.16) 1.5px, transparent 1.6px); background-size: 28px 28px; }

/* ---- Impact strip ---- */
.dn-strip { background: #fbf8f3; border-block: 1px solid var(--line); }
.dn-strip__grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.dn-strip__item { padding: 26px 20px; text-align: center; }
.dn-strip__item + .dn-strip__item { border-left: 1px solid var(--line); }
.dn-strip__value { font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; color: var(--o); line-height: 1.1; }
.dn-strip__label { margin-top: 4px; font-size: 0.85rem; font-weight: 600; color: var(--ink); }

/* ---- Ways to give ---- */
.dn-ways { background: var(--cream); background-image: radial-gradient(rgba(255,116,31,.14) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.dn-ways__grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; margin-top: 32px; }
.dn-ways__card { height: 100%; padding: 22px 20px 24px; background: #fff; border: 2px solid var(--ink); border-radius: 20px; box-shadow: 4px 5px 0 var(--ink); }
.dn-ways__icon { display: grid; place-items: center; width: 46px; height: 46px; margin-bottom: 14px; background: var(--mint); border-radius: 50%; color: var(--od); }
.dn-ways__icon svg { width: 22px; height: 22px; }
.dn-ways__card h3 { font-family: var(--serif); font-size: 1.08rem; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.dn-ways__card p { font-size: 0.85rem; line-height: 1.55; }

/* ---- How to give ---- */
.dn-how { background: #fcfcfa; }
.dn-how__grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; margin-top: 32px; align-items: stretch; }
.dn-how__card { height: 100%; padding: 26px 24px 28px; background: var(--peach); border: 2px solid var(--ink); border-radius: 22px; box-shadow: 4px 6px 0 var(--ink); display: flex; flex-direction: column; }
.dn-how__icon { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 14px; background: #fff; border: 2px solid var(--ink); border-radius: 55% 45% 52% 48% / 50% 55% 45% 50%; color: var(--od); }
.dn-how__icon svg { width: 22px; height: 22px; }
.dn-how__card h3 { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.dn-how__text { font-size: 0.92rem; line-height: 1.55; margin-bottom: 16px; }
.dn-how__card .dn-btn { margin-top: auto; align-self: flex-start; }

.dn-field { margin-bottom: 12px; }
.dn-field__label { display: block; margin-bottom: 4px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--oi); }
.dn-field__row { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #fff; border: 2px solid var(--ink); border-radius: 10px; }
.dn-field__value { flex: 1; min-width: 0; font-size: 0.9rem; font-weight: 600; color: var(--ink); overflow-wrap: break-word; }
.dn-field__copy { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border: 0; border-radius: 50%; background: var(--peach); color: var(--od); cursor: pointer; }
.dn-field__copy svg { width: 15px; height: 15px; }
.dn-field__copy:hover { background: var(--sun); }

/* ---- Confirm donation form ---- */
.dn-confirm { background: #eef8f2; }
.dn-confirm__card { max-width: 640px; margin: 0 auto; padding: clamp(24px, 4vw, 36px); background: #fff; border: 2px solid var(--ink); border-radius: 26px; box-shadow: 6px 8px 0 var(--ink); }
.dn-confirm__form { display: grid; gap: 18px; }

.dn-check { display: flex; align-items: center; gap: 10px; font-size: 0.92rem; font-weight: 600; color: var(--ink); cursor: pointer; }
.dn-check input { width: 18px; height: 18px; accent-color: var(--od); cursor: pointer; }

.dn-formfield { display: grid; gap: 6px; }
.dn-formfield label { font-size: 0.82rem; font-weight: 700; color: var(--ink); }
.dn-formfield input,
.dn-formfield select,
.dn-formfield textarea {
  padding: 11px 14px; border: 2px solid var(--ink); border-radius: 12px;
  background: var(--cream); font-size: 0.95rem; color: var(--ink); font-family: var(--sans);
  resize: vertical;
}
.dn-formfield input:focus,
.dn-formfield select:focus,
.dn-formfield textarea:focus { outline: none; border-color: var(--od); }

.dn-formrow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.dn-amountinput { display: flex; align-items: center; gap: 6px; padding: 0 14px; border: 2px solid var(--ink); border-radius: 12px; background: var(--cream); }
.dn-amountinput span { font-weight: 700; color: var(--ink); }
.dn-amountinput input { flex: 1; min-width: 0; border: 0; background: transparent; padding: 11px 0; }
.dn-amountinput input:focus { outline: none; }

.dn-confirm__notice { margin: 4px 0 0; padding: 12px 14px; background: var(--mint); border-radius: 10px; font-size: 0.88rem; color: var(--ink); }
.dn-confirm__notice a { color: var(--oi); font-weight: 700; }

@media (max-width: 560px) {
  .dn-formrow { grid-template-columns: 1fr; }
}

/* ---- Closing note ---- */
.dn-closing { padding-block: clamp(48px, 6vw, 88px); background: #fff4ea; }
.dn-closing__box { position: relative; padding: clamp(32px, 5vw, 56px) 24px; background: #fff; border: 2px solid var(--ink); border-radius: 30px; box-shadow: 8px 10px 0 var(--ink); text-align: center; overflow: hidden; }
.dn-closing__text { font-family: var(--serif); font-style: italic; font-size: 1.15rem; color: var(--ink); }

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .dn-ways__grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .dn-how__grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .dn-ways__grid { grid-template-columns: 1fr; }
  .dn-strip__grid { grid-template-columns: 1fr; }
  .dn-strip__item + .dn-strip__item { border-left: 0; border-top: 1px solid var(--line); }
}
`;
