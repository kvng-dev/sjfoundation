// Doodles.jsx
// ---------------------------------------------------------------------------
// Small hand-drawn accents shared by the landing-page sections (Hero, About,
// FeaturedInitiative, Impact, StatsBand) so they read as one family with the
// About Us page. Import { Doodle } and drop it in; this file also pulls in
// doodles.css once, so every section that imports Doodle gets the styling
// for free (frames, tape, "coming soon" badge, floats) with nothing extra
// to wire up.
// ---------------------------------------------------------------------------
import "./doodles.css";

const PATHS = {
  star: {
    vb: "0 0 64 64",
    el: <path d="M32 6l7 18 19 1-15 12 5 19-16-10-16 10 5-19L6 25l19-1z" />,
  },
  sparkle: {
    vb: "0 0 64 64",
    el: (
      <path d="M32 4c2 18 10 26 28 28-18 2-26 10-28 28-2-18-10-26-28-28 18-2 26-10 28-28z" />
    ),
  },
  heart: {
    vb: "0 0 64 64",
    el: (
      <path d="M32 56C10 40 6 26 12 16c6-8 18-6 20 4 2-10 14-12 20-4 6 10 2 24-20 40z" />
    ),
  },
  squiggle: {
    vb: "0 0 136 16",
    stretch: true,
    el: <path d="M3 8c8-8 18-8 26 0s18 8 26 0 18-8 26 0 18 8 26 0 18-8 26 0" />,
  },
  sun: {
    vb: "0 0 64 64",
    el: (
      <>
        <circle cx="32" cy="32" r="9" />
        <path d="M32 6v9M32 49v9M6 32h9M49 32h9M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
      </>
    ),
  },
  dots: {
    vb: "0 0 64 64",
    fillEl: true,
    el: (
      <>
        <circle cx="12" cy="12" r="4" />
        <circle cx="32" cy="12" r="4" />
        <circle cx="52" cy="12" r="4" />
        <circle cx="12" cy="32" r="4" />
        <circle cx="32" cy="32" r="4" />
        <circle cx="52" cy="32" r="4" />
        <circle cx="12" cy="52" r="4" />
        <circle cx="32" cy="52" r="4" />
        <circle cx="52" cy="52" r="4" />
      </>
    ),
  },
};

export function Doodle({ name, className = "", style, fill = "none" }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={`lp-doodle${
        d.stretch ? " lp-doodle--stretch" : ""
      } ${className}`}
      style={style}
      viewBox={d.vb}
      preserveAspectRatio={d.stretch ? "none" : "xMidYMid meet"}
      fill={d.fillEl ? "currentColor" : fill}
      stroke={d.fillEl ? "none" : "currentColor"}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {d.el}
    </svg>
  );
}

export default Doodle;
