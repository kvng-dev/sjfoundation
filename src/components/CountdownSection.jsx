// CountdownSection.jsx — live countdown to Edition 4
// ---------------------------------------------------------------------------
// Drop-in section for the Christmas on the Streets page. Doesn't touch your
// existing file — just import and place it wherever you'd like it to sit
// (right after the Hero, or right before the "Edition 4 is this December"
// closing panel both work well):
//
//   import CountdownSection from './CountdownSection.jsx';
//   ...
//   <Hero />
//   <CountdownSection />
//   <WhatItIs />
//
// Place at: src/pages/CountdownSection.jsx (same folder as
// ChristmasOnTheStreets.jsx), or src/components/ — either works since it's
// self-contained.
//
// TARGET DATE: currently set to Sat, Dec 19 2026, 9:00 AM Lagos time (WAT,
// UTC+1) — change TARGET_DATE below if the actual start time differs. The
// +01:00 offset is fixed on purpose so the countdown reads the same for
// every visitor regardless of their own timezone.
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

const TARGET_DATE = "2026-12-19T09:00:00+01:00";
const VOLUNTEER_LINK = "/get-involved#volunteer";

function getTimeLeft() {
  const diff = new Date(TARGET_DATE).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    total: clamped,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isLive = time.total <= 0;
  const dateLabel = new Date(TARGET_DATE).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="cd-section" aria-labelledby="cd-title">
      <style>{CSS}</style>
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "12%", left: "5%", width: 30 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "14%", right: "6%", width: 28 }}
      />
      <Doodle
        name="dots"
        className="lp-abs lp-c-line lp-edge"
        style={{ top: "10%", right: "8%", width: 60 }}
      />

      <div className="cd-wrap">
        <p className="cd-eyebrow">Edition 4</p>
        <h2 id="cd-title" className="cd-h2">
          {isLive ? "It's happening today!" : "The countdown is on."}
        </h2>
        <p className="cd-date">{dateLabel} · Lagos</p>

        {!isLive ? (
          <div className="cd-grid" aria-label={`Counting down to ${dateLabel}`}>
            {units.map((u) => (
              <div className="cd-unit" key={u.label}>
                <span className="cd-unit__num">
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="cd-unit__label">{u.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="cd-live">
            Christmas on the Streets, Edition 4, is happening right now. 🎉
          </p>
        )}

        <Link to={VOLUNTEER_LINK} className="cd-btn">
          Volunteer For Edition 4 <LuArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

const CSS = `
.cd-section {
  position: relative;
  overflow: hidden;
  padding-block: clamp(52px, 7vw, 92px);
  background: #052436;
  color: #fff;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  text-align: center;
}
.cd-section *, .cd-section *::before, .cd-section *::after { box-sizing: border-box; }
.cd-section :focus-visible { outline: 3px solid #fff; outline-offset: 3px; border-radius: 6px; }
.cd-wrap { position: relative; z-index: 1; max-width: 720px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }

.cd-eyebrow { margin: 0 0 12px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #ffb627; }
.cd-h2 { margin: 0 0 10px; font-family: 'Newsreader', Georgia, 'Times New Roman', serif; font-size: clamp(1.9rem, 3.6vw, 2.6rem); font-weight: 500; line-height: 1.15; color: #fff; }
.cd-date { margin: 0 0 32px; font-size: 0.95rem; color: rgba(255,255,255,.75); }

.cd-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: clamp(10px, 2.5vw, 20px); margin-bottom: 36px; }
.cd-unit { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: clamp(16px, 3vw, 24px) 8px; background: #fff; border: 2px solid #0b2233; border-radius: 18px; box-shadow: 4px 5px 0 rgba(255,182,39,.55); }
.cd-unit__num { font-family: 'Newsreader', Georgia, serif; font-size: clamp(1.8rem, 5vw, 2.8rem); font-weight: 600; line-height: 1; color: #0b2233; font-variant-numeric: tabular-nums; }
.cd-unit__label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #c9500a; }

.cd-live { margin-bottom: 32px; font-family: 'Newsreader', Georgia, serif; font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-style: italic; color: #ffb627; }

.cd-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.85rem 1.7rem; border: 2px solid #fff; border-radius: 999px; background: #f05f0c; color: #fff; font-size: 0.95rem; font-weight: 700; text-decoration: none; box-shadow: 3px 4px 0 rgba(255,255,255,.35); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.cd-btn svg { width: 1.1em; height: 1.1em; }
.cd-btn:hover { background: #d9530a; transform: translate(2px, 2px); box-shadow: 1px 2px 0 rgba(255,255,255,.35); }

@media (max-width: 560px) {
  .cd-grid { gap: 8px; }
  .cd-unit { border-radius: 14px; }
}
@media (max-width: 420px) {
  .cd-grid { grid-template-columns: repeat(2, minmax(0,1fr)); row-gap: 14px; }
}
`;

