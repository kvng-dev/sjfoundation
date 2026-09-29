// About.jsx: Sanusi Jafar Foundation "About Us" page
// ---------------------------------------------------------------------------
// Self-contained: styles are injected by the <style> block at the bottom of this
// file (everything is prefixed "ab-"), so there is no extra CSS file to add.
// Needs: react-router-dom (Link), react-icons, and the images in src/assets.
// Place this file at src/pages/About.jsx (adjust the ../assets paths if not).
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuBaby,
  LuCheck,
  LuFlower2,
  LuGraduationCap,
  LuHandshake,
  LuHeart,
  LuHeartHandshake,
  LuRepeat,
  LuSparkles,
  LuSprout,
  LuUsers,
  LuWaves,
} from "react-icons/lu";

import heroPhoto from "../assets/IMG_3115.JPG.jpeg";
import aboutPhoto from "../assets/IMG_3114.JPG.jpeg";
import story1 from "../assets/IMG_3139.JPG.jpeg";
import story2 from "../assets/IMG_3124.JPG.jpeg";
import story3 from "../assets/IMG_3123.JPG.jpeg";
import founderImg from "../assets/IMG_3102.JPG.jpeg";
import aheadImg from "../assets/IMG_3130.JPG.jpeg";
import belongImg from "../assets/IMG_3070.PNG";
import project1k from "../assets/IMG_3137.JPG.jpeg";
import collage1 from "../assets/IMG_3136.JPG.jpeg";
import collage2 from "../assets/brothers.jpeg";
import collage3 from "../assets/IMG_3283.JPG.jpeg";

/* ==========================================================================
   EASY-EDIT SETTINGS
   ========================================================================== */

// FOUNDER PHOTO: drop the file in src/assets, import it, and set it here.
//   import founderPhoto from '../assets/founder.jpg';
//   const FOUNDER_IMG = founderPhoto;
// While this is null, an illustrated placeholder is shown.
const FOUNDER_IMG = founderImg || null;
const FOUNDER = {
  role: "Our Founder",
  name: "Olatunji Sanusi",
  alt: "Sanusi Jafar, founder of the Sanusi Jafar Foundation",
};

// Every photo on the page, in one place. All are placeholders taken from the
// design mockup: swap them for real photography (same keys).
const PHOTOS = {
  collageMain: {
    src: collage2,
    alt: "A mother in a colourful headwrap hugging her smiling daughter",
  },
  collageTop: { src: collage1, alt: "A smiling girl in a red top" },
  collageBottom: {
    src: collage3,
    alt: "A mother and daughter smiling together",
  },
  bandWide: {
    src: heroPhoto,
    alt: "A smiling girl in an orange top leaning on a wooden post",
  },
  strip: [
    { src: story1, alt: "A smiling girl", caption: "Hope", tilt: -5 },
    {
      src: story2,
      alt: "A mother and daughter",
      caption: "Belonging",
      tilt: 3,
    },
    {
      src: story3,
      alt: "Young people smiling together",
      caption: "Dignity",
      tilt: -3,
    },
  ],
  quote: {
    src: belongImg,
    alt: "A mother and daughter cheek to cheek, smiling",
  },
  project: {
    src: project1k,
    alt: "A group of smiling children in orange t-shirts",
  },
  ahead: {
    src: aheadImg,
    alt: "A group of young people smiling in orange and yellow",
  },
};

// Where the buttons go. Change to match your routes.
const LINKS = {
  project: "/#project",
  partner: "/#get-involved",
  volunteer: "/#get-involved",
  donate: "/#donate",
};

/* ==========================================================================
   DOODLES  (hand-drawn SVGs; they inherit colour via currentColor)
   ========================================================================== */

const DOODLES = {
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
  swirl: {
    vb: "0 0 64 64",
    el: (
      <path d="M32 32c3-1 5 1 4 4-2 5-9 4-10-2-1-8 8-13 15-9 9 5 8 18-1 22-11 5-24-3-22-16" />
    ),
  },
  arrow: {
    vb: "0 0 120 60",
    el: (
      <>
        <path d="M4 50C30 8 72 6 108 34" />
        <path d="M108 34l-17-3M108 34l-6 16" />
      </>
    ),
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
  zigzag: {
    vb: "0 0 100 30",
    el: <path d="M4 22L20 6l16 16L52 6l16 16L84 6l12 14" />,
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
  plane: {
    vb: "0 0 64 64",
    el: (
      <>
        <path d="M4 30L60 6 40 58 30 36z" />
        <path d="M30 36L60 6" />
      </>
    ),
  },
  hat: {
    vb: "0 0 80 70",
    el: (
      <>
        <path d="M10 52C14 22 36 8 60 16c4 14 6 24 10 36z" />
        <path d="M6 52h68v10c-22 6-46 6-68 0z" />
        <circle cx="64" cy="14" r="8" fill="#ffb627" />
      </>
    ),
  },
  sprout: {
    vb: "0 0 64 64",
    el: (
      <>
        <path d="M32 58V32" />
        <path d="M32 38C20 38 12 30 12 18c12 0 20 8 20 20z" />
        <path d="M32 32c0-12 8-20 20-20 0 12-8 20-20 20z" />
      </>
    ),
  },
  gift: {
    vb: "0 0 64 64",
    el: (
      <>
        <rect x="10" y="26" width="44" height="28" rx="3" />
        <path d="M8 18h48v8H8zM32 18v36" />
        <path d="M32 18c-8-12-20-8-14 0M32 18c8-12 20-8 14 0" />
      </>
    ),
  },
  squiggle: {
    vb: "0 0 136 16",
    stretch: true,
    el: <path d="M3 8c8-8 18-8 26 0s18 8 26 0 18-8 26 0 18 8 26 0 18-8 26 0" />,
  },
  loop: {
    vb: "0 0 200 80",
    stretch: true,
    el: (
      <path d="M22 40C22 12 90 4 140 9c48 5 56 41 10 56C100 80 26 70 14 44 9 30 40 18 72 16" />
    ),
  },
};

function Doodle({ name, className = "", style, fill = "none" }) {
  const d = DOODLES[name];
  return (
    <svg
      className={`ab-doodle${
        d.stretch ? " ab-doodle--stretch" : ""
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

/* ==========================================================================
   SMALL HELPERS
   ========================================================================== */

// Fades/slides children in the first time they scroll into view.
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
      className={`ab-reveal${shown ? " is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// A taped-on instant photo.
function Polaroid({
  src,
  alt,
  caption,
  tilt = 0,
  ratio = "4 / 5",
  tape = "sun",
  className = "",
  children,
}) {
  return (
    <figure
      className={`ab-pol ab-pol--${tape} ${className}`}
      style={{ "--tilt": `${tilt}deg`, "--ratio": ratio }}
    >
      {children || <img src={src} alt={alt} loading="lazy" />}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function FounderPlaceholder() {
  return (
    <svg
      className="ab-founder__ph"
      viewBox="0 0 300 375"
      role="img"
      aria-label="Founder photo placeholder"
    >
      <rect width="300" height="375" fill="#ffe9d6" />
      <circle cx="150" cy="148" r="58" fill="#ff741f" />
      <path d="M40 375c0-78 48-118 110-118s110 40 110 118z" fill="#052436" />
      <g stroke="#ffb627" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M250 60v30M235 75h30" />
        <path d="M50 90v22M39 101h22" />
      </g>
      <text
        x="150"
        y="345"
        textAnchor="middle"
        fontFamily="Caveat, cursive"
        fontSize="26"
        fill="#ffe9d6"
      >
        photo coming soon
      </text>
    </svg>
  );
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

function Hero() {
  const chips = [
    "Hope.",
    "Belonging.",
    "Dignity.",
    "The feeling of being seen.",
  ];
  return (
    <section className="ab-hero" aria-labelledby="ab-hero-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "9%", left: "3%", width: 46 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-o"
        style={{ top: "62%", left: "1.5%", width: 30, animationDelay: "-2s" }}
      />
      <Doodle
        name="swirl"
        className="ab-abs ab-edge ab-c-mint"
        style={{ top: "5%", left: "46%", width: 60 }}
      />
      <Doodle
        name="zigzag"
        className="ab-abs ab-edge ab-c-o"
        style={{ bottom: "4%", left: "38%", width: 110 }}
      />

      <div className="ab-wrap ab-hero__grid">
        <div className="ab-hero__copy">
          <p className="ab-eyebrow">About us</p>
          <h1 id="ab-hero-title" className="ab-h1">
            Every child deserves to feel{" "}
            <span className="ab-underlined">
              included.
              <Doodle name="squiggle" />
            </span>
          </h1>
          <p className="ab-lead">
            At the Sanusi Jafar Foundation, we believe some of the most
            important things we can give a person are not things at all.
          </p>

          <p className="ab-they">They are</p>
          <ul className="ab-chips">
            {chips.map((c, i) => (
              <li key={c} className={`ab-chip ab-chip--${i}`}>
                {c}
              </li>
            ))}
          </ul>

          <div className="ab-note">
            <Doodle
              name="sparkle"
              fill="currentColor"
              className="ab-abs ab-c-sun ab-spin"
              style={{ top: -16, right: 18, width: 34 }}
            />
            <p className="ab-note__label">
              Our work began with a simple belief:
            </p>
            <blockquote>
              Where a child comes from should never determine the kind of
              childhood they get to experience.
            </blockquote>
          </div>
        </div>

        <div className="ab-collage">
          <Doodle name="loop" className="ab-abs ab-c-o ab-collage__loop" />
          <Polaroid
            {...PHOTOS.collageMain}
            tilt={-4}
            ratio="1 / 1"
            tape="sun"
            className="ab-collage__a"
          />
          <Polaroid
            {...PHOTOS.collageTop}
            tilt={5}
            ratio="1 / 1.1"
            tape="mint"
            className="ab-collage__b"
          />
          <Polaroid
            {...PHOTOS.collageBottom}
            tilt={-3}
            ratio="1 / 1.05"
            tape="blush"
            className="ab-collage__c"
          />
          <Doodle
            name="heart"
            fill="currentColor"
            className="ab-abs ab-float ab-c-o"
            style={{ right: "-2%", top: "46%", width: 46 }}
          />
          <Doodle
            name="arrow"
            className="ab-abs ab-c-ink"
            style={{
              left: "2%",
              bottom: "3%",
              width: 90,
              transform: "rotate(-20deg) scaleX(-1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="ab-sec ab-story" aria-labelledby="ab-story-title">
      <Doodle
        name="dots"
        className="ab-abs ab-edge ab-c-line"
        style={{ top: "4%", right: "3%", width: 90 }}
      />
      <Doodle
        name="star"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ bottom: "8%", left: "2%", width: 38 }}
      />

      <div className="ab-wrap ab-story__grid">
        <Reveal className="ab-story__aside">
          <div className="ab-founder">
            <Doodle name="hat" className="ab-abs ab-c-o ab-founder__hat" />
            <Polaroid
              caption={
                <>
                  <span className="ab-founder__role">{FOUNDER.role}</span>
                  <span className="ab-founder__name">{FOUNDER.name}</span>
                </>
              }
              tilt={-3}
              ratio="4 / 5"
              tape="sun"
            >
              {FOUNDER_IMG ? (
                <img src={FOUNDER_IMG} alt={FOUNDER.alt} />
              ) : (
                <FounderPlaceholder />
              )}
            </Polaroid>
            <Doodle
              name="heart"
              fill="currentColor"
              className="ab-abs ab-c-o"
              style={{ bottom: "12%", right: "-6%", width: 34 }}
            />
          </div>
        </Reveal>

        <div className="ab-story__text">
          <Reveal>
            <h2 id="ab-story-title" className="ab-h2">
              Where it started
            </h2>
            <p className="ab-story__lead">
              Long before the Sanusi Jafar Foundation had a name, there was a
              childhood memory.
            </p>
          </Reveal>

          <Reveal>
            <p className="ab-p">
              I remember a time when my uncle dressed up as Santa and gave gifts
              to children in our neighbourhood.
            </p>
            <p className="ab-p">
              For some of us, it was simply the excitement of seeing Santa. The
              anticipation, the laughter and the magic of receiving a gift.
            </p>
          </Reveal>

          <Reveal>
            <p className="ab-p">
              But I also remember seeing children around my age who experienced
              Father Christmas differently.
            </p>
            <p className="ab-p">
              To them, Santa was almost a mirage something they could see, but
              never quite imagine experiencing for themselves.
            </p>
            <p className="ab-p">
              It seemed like an experience reserved for children in private
              schools, privileged families or more affluent communities.
            </p>
          </Reveal>

          <Reveal className="ab-sticky">
            <p className="ab-sticky__small">
              Even as a child, I remember thinking:
            </p>
            <p className="ab-sticky__big">
              Why should that experience belong to some children and not others?
            </p>
          </Reveal>

          <Reveal>
            <p className="ab-p">I remember wanting to become Santa myself.</p>
            <p className="ab-p">
              Not because of the costume or the gifts, but because I wanted
              those children to experience what I had experienced.
            </p>
            <p className="ab-p">
              <span className="ab-mark">
                I wanted them to know that they were not left out.
              </span>
            </p>
          </Reveal>

          <Reveal>
            <p className="ab-p">Because childhood memories stay with us.</p>
            <p className="ab-p">
              Years later, we may forget the exact gift we received, but we
              remember how someone made us feel.
            </p>
            <ul className="ab-remember">
              {[
                "We remember being included.",
                "We remember being celebrated.",
                "We remember that, for a moment, the world made room for us.",
              ].map((line) => (
                <li key={line}>
                  <Doodle name="heart" fill="currentColor" className="ab-c-o" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="ab-p">That childhood thought stayed with me.</p>
            <p className="ab-p ab-p--big">
              And years later, it became part of the reason the Sanusi Jafar
              Foundation exists.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WideBand() {
  return (
    <div className="ab-band">
      <div className="ab-wrap">
        <Reveal>
          <figure className="ab-band__frame">
            <Doodle
              name="sun"
              className="ab-abs ab-spin ab-c-sun"
              style={{ top: -30, right: 24, width: 74, zIndex: 2 }}
            />
            <img
              src={PHOTOS.bandWide.src}
              alt={PHOTOS.bandWide.alt}
              loading="lazy"
            />
            <figcaption className="ab-band__cap">
              Everyone deserves to feel included
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}

const FOCUS = [
  {
    title: "Child Welfare",
    text: "Creating experiences, support and opportunities that help children feel seen, valued and able to dream.",
    icon: LuBaby,
    tone: "peach",
    tilt: -1.5,
  },
  {
    title: "Women Empowerment",
    text: "Supporting mothers and women in ways that strengthen households and create greater possibilities.",
    icon: LuFlower2,
    tone: "mint",
    tilt: 1.2,
  },
  {
    title: "Youth Development",
    text: "Creating opportunities for young people to develop, participate and believe in their potential.",
    icon: LuGraduationCap,
    tone: "sky",
    tilt: -1,
  },
  {
    title: "Community Outreach",
    text: "Showing up where people are, responding to real needs and building stronger community connections.",
    icon: LuHeartHandshake,
    tone: "blush",
    tilt: 1.6,
  },
];

function WhyWeExist() {
  return (
    <section className="ab-sec ab-why" aria-labelledby="ab-why-title">
      <Doodle
        name="zigzag"
        className="ab-abs ab-edge ab-c-o"
        style={{ top: "5%", left: "3%", width: 100 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "9%", right: "5%", width: 40 }}
      />

      <div className="ab-wrap">
        <Reveal className="ab-why__intro">
          <h2 id="ab-why-title" className="ab-h2">
            Why we exist
          </h2>
          <p className="ab-lead ab-lead--dark">
            Today, the Sanusi Jafar Foundation is a grassroots nonprofit
            committed to restoring hope, dignity and belonging for children,
            women, young people and vulnerable families in underserved
            communities.
          </p>
          <p className="ab-label">Our work focuses on:</p>
        </Reveal>

        <ul className="ab-focus">
          {FOCUS.map(({ title, text, icon: Icon, tone, tilt }, i) => (
            <li key={title}>
              <Reveal
                delay={i * 90}
                className={`ab-fcard ab-tone-${tone}`}
                style={{ "--r": `${tilt}deg` }}
              >
                <span className="ab-fcard__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="ab-grass">
          <Reveal className="ab-grass__lead">
            <p className="ab-label">
              But beneath everything we do is one simple philosophy:
            </p>
            <p className="ab-grass__big">
              Impact begins at the{" "}
              <span className="ab-underlined">
                grassroots.
                <Doodle name="squiggle" />
              </span>
            </p>
            <Doodle name="sprout" className="ab-c-mint ab-grass__sprout" />
          </Reveal>
          <Reveal className="ab-grass__text" delay={100}>
            <p className="ab-p">
              We don’t believe people should only be remembered when there is an
              event, a crisis or a festive season.
            </p>
            <p className="ab-p">
              We want to build relationships with communities, listen to their
              realities, understand their needs and create opportunities for
              meaningful, lasting support.
            </p>
            <p className="ab-p ab-p--big">
              Because helping a child is not only about the child.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PolaroidStrip() {
  return (
    <div className="ab-strip">
      <Doodle name="arrow" className="ab-abs ab-edge ab-c-o ab-strip__arrow" />
      <div className="ab-wrap">
        <div className="ab-strip__row">
          {PHOTOS.strip.map((p, i) => (
            <Reveal key={p.caption} delay={i * 120}>
              <Polaroid
                {...p}
                ratio="1 / 1.08"
                tape={["sun", "mint", "blush"][i]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

const WORDS = [
  { word: "Hope", tone: "orange", tilt: -3, delay: 0 },
  { word: "Dignity", tone: "peach", tilt: 2, delay: 80 },
  { word: "Belonging", tone: "navy", tilt: -1.5, delay: 160 },
  { word: "Opportunity", tone: "sun", tilt: 2.5, delay: 240 },
  { word: "Community", tone: "mint", tilt: -2, delay: 320 },
];

function Essence() {
  return (
    <section className="ab-sec ab-essence" aria-labelledby="ab-essence-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-o"
        style={{ top: "6%", left: "8%", width: 34 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "14%", right: "9%", width: 46, animationDelay: "-3s" }}
      />
      <Doodle
        name="swirl"
        className="ab-abs ab-edge ab-c-ink"
        style={{ bottom: "46%", left: "3%", width: 54 }}
      />

      <div className="ab-wrap">
        <Reveal className="ab-essence__head">
          <h2 id="ab-essence-title" className="ab-h2 ab-h2--xl">
            SJF isn’t simply about distributing things.
          </h2>
          <p className="ab-label ab-label--center">It’s about:</p>
        </Reveal>

        <ul className="ab-bubbles">
          {WORDS.map(({ word, tone, tilt, delay }) => (
            <li key={word}>
              <Reveal
                delay={delay}
                className={`ab-bubble ab-bubble--${tone}`}
                style={{ "--r": `${tilt}deg` }}
              >
                {word}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="ab-line">
          <Doodle
            name="sparkle"
            fill="currentColor"
            className="ab-abs ab-edge ab-c-sun ab-spin"
            style={{ top: 18, left: 20, width: 28 }}
          />
          <div>
            <p className="ab-line__label">Our guiding line</p>
            <p className="ab-line__q">
              When you <span className="ab-hl ab-hl--sun">help a child</span>,
              you take a burden off a family. When you{" "}
              <span className="ab-hl ab-hl--o">support a mother</span>, you
              strengthen a household. And when you{" "}
              <span className="ab-hl ab-hl--mint">invest in a community</span>,
              you create possibilities that can reach far beyond one person.
            </p>
          </div>

          <svg
            className="ab-ripple"
            viewBox="0 0 320 320"
            role="img"
            aria-label="Rings spreading outward from one child, to a family, to a whole community"
          >
            <circle className="ab-ring ab-ring--3" cx="160" cy="160" r="146" />
            <circle className="ab-ring ab-ring--2" cx="160" cy="160" r="98" />
            <circle className="ab-ring ab-ring--1" cx="160" cy="160" r="52" />
            <text
              x="160"
              y="168"
              textAnchor="middle"
              className="ab-ripple__t ab-ripple__t--in"
            >
              a child
            </text>
            <text x="160" y="86" textAnchor="middle" className="ab-ripple__t">
              a family
            </text>
            <text x="160" y="38" textAnchor="middle" className="ab-ripple__t">
              a community
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="ab-sec ab-mv" aria-label="Our mission and vision">
      <Doodle
        name="dots"
        className="ab-abs ab-edge ab-c-line"
        style={{ top: "3%", left: "2%", width: 90 }}
      />
      <div className="ab-wrap ab-mv__grid">
        <Reveal className="ab-mcard ab-mcard--m">
          <Doodle
            name="heart"
            fill="currentColor"
            className="ab-abs ab-float ab-c-sun"
            style={{ top: 22, right: 24, width: 40 }}
          />
          <p className="ab-mcard__label">Our mission</p>
          <p className="ab-mcard__big">
            To restore hope, dignity and belonging one child, one family, one
            community at a time.
          </p>
          <p>
            The Sanusi Jafar Foundation exists to create meaningful
            opportunities and practical support for children, women, young
            people and vulnerable families in underserved communities.
          </p>
          <p>
            Through community-led initiatives, partnerships and sustainable
            programmes, we work to address immediate needs while creating
            pathways to opportunity, connection and long-term wellbeing.
          </p>
          <p className="ab-mcard__close">
            We believe impact is more than what we give.
          </p>
          <p>
            It is how we make people feel, what possibilities we create, and
            what changes because we showed up.
          </p>
        </Reveal>

        <Reveal className="ab-mcard ab-mcard--v" delay={120}>
          <Doodle
            name="star"
            fill="currentColor"
            className="ab-abs ab-float ab-c-sun"
            style={{ top: 22, right: 24, width: 40 }}
          />
          <p className="ab-mcard__label">Our vision</p>
          <p className="ab-mcard__big">
            A future where every child feels seen, every mother feels supported,
            every young person sees possibility, and every community knows that
            it matters.
          </p>
          <p>
            We envision communities where circumstances do not define potential,
            where access to opportunity is not determined by where someone comes
            from, and where no child feels that joy, belonging or possibility is
            reserved for someone else.
          </p>
          <p>
            We want to help build communities where people are not simply
            beneficiaries of support, but active participants in creating a
            better future for themselves and those around them.
          </p>
          <p className="ab-mcard__close">
            Because everyone deserves to feel that they belong.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="ab-quote" aria-label="Belonging">
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "12%", right: "8%", width: 46 }}
      />
      <div className="ab-wrap ab-quote__grid">
        <Reveal className="ab-quote__photo">
          <Doodle
            name="star"
            fill="currentColor"
            className="ab-abs ab-float ab-c-o"
            style={{ top: -14, left: -10, width: 44, zIndex: 2 }}
          />
          <img src={PHOTOS.quote.src} alt={PHOTOS.quote.alt} loading="lazy" />
        </Reveal>
        <Reveal delay={100}>
          <p className="ab-quote__text">
            Because everyone deserves to feel that they{" "}
            <span className="ab-underlined">
              belong.
              <Doodle name="squiggle" />
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const BELIEFS = [
  {
    title: "Belonging matters",
    text: "Every person deserves to feel seen, valued and included.",
    icon: LuHeartHandshake,
    tone: "peach",
    tilt: -1.5,
  },
  {
    title: "Impact begins at the grassroots",
    text: "The people closest to a problem should be part of shaping its solution.",
    icon: LuSprout,
    tone: "mint",
    tilt: 1.2,
  },
  {
    title: "Small moments can create lasting memories",
    text: "A smile, an opportunity, a helping hand or simply showing up can mean more than we realise.",
    icon: LuSparkles,
    tone: "sky",
    tilt: -1,
  },
  {
    title: "Sustainable change requires consistency",
    text: "We want to move beyond one-off interventions and build lasting relationships with communities.",
    icon: LuRepeat,
    tone: "blush",
    tilt: 1,
  },
  {
    title: "When one person is supported, the impact can reach many",
    lines: [
      "Help a child, strengthen a family.",
      "Support a mother, empower a household.",
      "Invest in a community, create possibilities for generations.",
    ],
    icon: LuWaves,
    tone: "sun",
    tilt: -0.8,
  },
];

function Beliefs() {
  return (
    <section className="ab-sec ab-beliefs" aria-labelledby="ab-beliefs-title">
      <Doodle
        name="zigzag"
        className="ab-abs ab-edge ab-c-o"
        style={{ top: "4%", right: "4%", width: 100 }}
      />
      <Doodle
        name="star"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ bottom: "5%", left: "3%", width: 40 }}
      />
      <div className="ab-wrap">
        <Reveal>
          <h2 id="ab-beliefs-title" className="ab-h2 ab-h2--center">
            What we believe
          </h2>
        </Reveal>
        <ul className="ab-beliefs__grid">
          {BELIEFS.map(({ title, text, lines, icon: Icon, tone, tilt }, i) => (
            <li
              key={title}
              className={`ab-beliefs__item ab-beliefs__item--${i + 1}`}
            >
              <Reveal
                delay={i * 80}
                className={`ab-bcard ab-tone-${tone}`}
                style={{ "--r": `${tilt}deg` }}
              >
                <div className="ab-bcard__top">
                  <span className="ab-bcard__num">{i + 1}</span>
                  <span className="ab-bcard__icon">
                    <Icon aria-hidden="true" />
                  </span>
                </div>
                <h3>{title}</h3>
                {text && <p>{text}</p>}
                {lines && (
                  <ul className="ab-bcard__lines">
                    {lines.map((l) => (
                      <li key={l}>
                        <LuCheck aria-hidden="true" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectTeaser() {
  return (
    <section className="ab-sec ab-project" aria-labelledby="ab-project-title">
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "9%", right: "6%", width: 44 }}
      />
      <Doodle
        name="swirl"
        className="ab-abs ab-edge ab-c-mint"
        style={{ bottom: "8%", left: "4%", width: 60 }}
      />
      <div className="ab-wrap ab-project__grid">
        <Reveal className="ab-project__photo">
          <img
            src={PHOTOS.project.src}
            alt={PHOTOS.project.alt}
            loading="lazy"
          />
          <span className="ab-badge" aria-hidden="true">
            <b>1,000</b>
            <span>smiles</span>
          </span>
          <Doodle
            name="arrow"
            className="ab-abs ab-edge ab-c-o"
            style={{
              right: "-4%",
              bottom: "-9%",
              width: 100,
              transform: "rotate(30deg)",
            }}
          />
        </Reveal>

        <div className="ab-project__text">
          <Reveal>
            <p className="ab-eyebrow">From one memory to a bigger mission</p>
            <h2 id="ab-project-title" className="ab-h2">
              Our next initiative, Project 1,000 Smiles, was born from this
              belief.
            </h2>
            <p className="ab-p">
              It represents our commitment to move beyond one-off moments of
              generosity and build a more consistent, year-round connection with
              the communities we serve.
            </p>
          </Reveal>
          <Reveal className="ab-sticky ab-sticky--flat" delay={80}>
            <p className="ab-sticky__note">
              The goal isn’t simply to create 1,000 smiles.
            </p>
            <p className="ab-sticky__note ab-sticky__note--big">
              It is to create 1,000 moments of hope, inclusion and possibility,
              while building something that can continue long after the smile
              fades.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="ab-p">
              Because sometimes, what looks like a small moment to us becomes a
              lifelong memory for someone else.
            </p>
            <p className="ab-p ab-p--big">
              That is the kind of impact we want to create.
            </p>
            <Link to={LINKS.project} className="ab-btn ab-btn--primary">
              Discover Project 1,000 Smiles <LuArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LookingAhead() {
  const wishes = [
    "A foundation that listens before it acts.",
    "That measures its impact.",
    "That builds partnerships around shared purpose.",
    "That creates opportunities rather than dependency.",
    "And that continues to remind people, especially those who may feel overlooked, that they matter.",
  ];
  return (
    <section className="ab-ahead" aria-labelledby="ab-ahead-title">
      <Doodle
        name="star"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-sun"
        style={{ top: "5%", left: "5%", width: 40 }}
      />
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-o"
        style={{ top: "12%", right: "7%", width: 52, animationDelay: "-2s" }}
      />
      <Doodle
        name="heart"
        fill="currentColor"
        className="ab-abs ab-edge ab-float ab-c-blush"
        style={{ top: "56%", left: "3%", width: 36, animationDelay: "-4s" }}
      />
      <Doodle
        name="gift"
        className="ab-abs ab-edge ab-c-sun"
        style={{
          bottom: "9%",
          right: "5%",
          width: 64,
          transform: "rotate(10deg)",
        }}
      />

      <div className="ab-wrap">
        <div className="ab-ahead__top">
          <div>
            <Reveal>
              <p className="ab-eyebrow ab-eyebrow--light">Looking ahead</p>
              <h2 id="ab-ahead-title" className="ab-h2 ab-h2--light">
                We envision a Sanusi Jafar Foundation that grows with the
                communities it serves.
              </h2>
            </Reveal>
            <ul className="ab-wishes">
              {wishes.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 70}>
                  <span className="ab-wishes__tick">
                    <LuCheck aria-hidden="true" />
                  </span>
                  <span>{w}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="ab-ahead__photo" delay={120}>
            <Polaroid
              {...PHOTOS.ahead}
              caption="Community"
              tilt={4}
              ratio="1 / 1.05"
              tape="sun"
            />
          </Reveal>
        </div>

        <Reveal className="ab-building">
          <p className="ab-building__lead">
            We are not simply building programmes.
          </p>
          <ul>
            <li>
              <span>We are building</span> belonging.
            </li>
            <li>
              <span>We are building</span> relationships.
            </li>
            <li>
              <span>We are building</span> opportunities.
            </li>
          </ul>
          <p className="ab-building__future">
            And we are building a future where no child has to watch from the
            outside and wonder if they belong.
          </p>
        </Reveal>

        <Reveal className="ab-finale">
          <p className="ab-finale__big">
            One child. One family. One community at a time.
          </p>
          <Doodle name="squiggle" className="ab-c-sun ab-finale__squiggle" />
          <p className="ab-finale__sign">
            Sanusi Jafar Foundation
            <span>Restoring hope, dignity &amp; belonging.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="ab-cta" aria-labelledby="ab-cta-title">
      <div className="ab-wrap">
        <Reveal className="ab-cta__box">
          <Doodle
            name="heart"
            fill="currentColor"
            className="ab-abs ab-edge ab-float ab-c-o"
            style={{ top: 20, left: 26, width: 34 }}
          />
          <Doodle
            name="star"
            fill="currentColor"
            className="ab-abs ab-edge ab-float ab-c-sun"
            style={{ bottom: 22, right: 30, width: 38 }}
          />
          <h2 id="ab-cta-title" className="ab-h2 ab-h2--center">
            Help us build belonging.
          </h2>
          <p className="ab-p ab-p--center">
            Partner with us, volunteer your time, or give today.
          </p>
          <div className="ab-cta__actions">
            <Link to={LINKS.partner} className="ab-btn ab-btn--primary">
              <LuHandshake aria-hidden="true" /> Partner
            </Link>
            <Link to={LINKS.volunteer} className="ab-btn ab-btn--outline">
              <LuUsers aria-hidden="true" /> Volunteer
            </Link>
            <Link to={LINKS.donate} className="ab-btn ab-btn--outline">
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

export default function About() {
  useEffect(() => {
    document.title = "About Us | Sanusi Jafar Foundation";
  }, []);

  return (
    <div className="ab-page">
      <style>{CSS}</style>
      <Hero />
      <Story />
      <WideBand />
      <WhyWeExist />
      <PolaroidStrip />
      <Essence />
      <MissionVision />
      <QuoteBand />
      <Beliefs />
      <ProjectTeaser />
      <LookingAhead />
      <ClosingCta />
    </div>
  );
}

/* ==========================================================================
   STYLES
   ========================================================================== */

const CSS = `
.ab-page {
  --ab-o: #ff741f;
  --ab-od: #f05f0c;
  --ab-oi: #c9500a;
  --ab-ink: #0b2233;
  --ab-navy: #052436;
  --ab-body: #3f4d58;
  --ab-cream: #faf9f4;
  --ab-sun: #ffb627;
  --ab-peach: #ffe9d6;
  --ab-mint: #d9f0e6;
  --ab-blush: #ffdcd2;
  --ab-sky: #dbeaf7;
  --ab-line: #eadfd2;
  --ab-serif: 'Newsreader', Georgia, 'Times New Roman', serif;
  --ab-sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --ab-script: 'Caveat', 'Segoe Print', cursive;

  position: relative;
  overflow-x: clip;
  background: #fcfcfa;
  color: var(--ab-body);
  font-family: var(--ab-sans);
  font-size: 1rem;
  line-height: 1.6;
}
.ab-page *, .ab-page *::before, .ab-page *::after { box-sizing: border-box; }
.ab-page img { display: block; max-width: 100%; }
.ab-page ul { margin: 0; padding: 0; list-style: none; }
.ab-page h1, .ab-page h2, .ab-page h3, .ab-page p, .ab-page blockquote, .ab-page figure { margin: 0; }

.ab-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1240px;
  margin-inline: auto;
  padding-inline: clamp(20px, 4vw, 48px);
}
.ab-sec { position: relative; padding-block: clamp(56px, 7vw, 104px); }

/* ---- colour + doodle utilities ---- */
.ab-c-o { color: var(--ab-o); }
.ab-c-sun { color: var(--ab-sun); }
.ab-c-mint { color: #4fb99a; }
.ab-c-ink { color: var(--ab-ink); }
.ab-c-line { color: #f0d9c2; }
.ab-c-blush { color: #ff9a8b; }
.ab-doodle { display: block; pointer-events: none; overflow: visible; }
.ab-abs { position: absolute; z-index: 0; }
.ab-doodle--stretch path { vector-effect: non-scaling-stroke; stroke-width: 4px; }
@media (max-width: 900px) { .ab-edge { display: none; } }

@media (prefers-reduced-motion: no-preference) {
  .ab-float { animation: ab-bob 6s ease-in-out infinite; }
  .ab-spin { animation: ab-spin 26s linear infinite; }
}
@keyframes ab-bob { 50% { transform: translateY(-10px) rotate(7deg); } }
@keyframes ab-spin { to { transform: rotate(360deg); } }

/* ---- reveal on scroll ---- */
.ab-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease var(--d, 0ms), transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms); }
.ab-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .ab-reveal { opacity: 1; transform: none; transition: none; }
}

/* ---- type ---- */
.ab-eyebrow { margin-bottom: 14px !important; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ab-oi); }
.ab-eyebrow--light { color: var(--ab-sun); }
.ab-h1 { font-family: var(--ab-serif); font-size: clamp(2.4rem, 5.4vw, 4.5rem); font-weight: 500; line-height: 1.04; letter-spacing: -0.02em; color: var(--ab-ink); margin-bottom: 22px !important; }
.ab-h2 { font-family: var(--ab-serif); font-size: clamp(2rem, 3.6vw, 3.1rem); font-weight: 500; line-height: 1.1; letter-spacing: -0.015em; color: var(--ab-ink); margin-bottom: 20px !important; }
.ab-h2--xl { font-size: clamp(2.1rem, 4.4vw, 3.6rem); max-width: 18ch; margin-inline: auto !important; }
.ab-h2--center { text-align: center; }
.ab-h2--light { color: #fff; }
.ab-lead { max-width: 34rem; font-size: clamp(1.05rem, 1.4vw, 1.25rem); line-height: 1.6; color: var(--ab-ink); margin-bottom: 22px !important; }
.ab-lead--dark { max-width: 44rem; color: var(--ab-body); }
.ab-label { font-family: var(--ab-script); font-size: clamp(1.5rem, 2.2vw, 1.9rem); font-weight: 600; line-height: 1.2; color: var(--ab-oi); margin-bottom: 10px !important; }
.ab-label--center { text-align: center; font-size: clamp(1.8rem, 3vw, 2.4rem); }
.ab-p { max-width: 38rem; font-size: 1.06rem; line-height: 1.8; margin-bottom: 1.1em !important; }
.ab-p--big { font-family: var(--ab-serif); font-size: clamp(1.4rem, 2.2vw, 1.8rem); line-height: 1.3; color: var(--ab-ink); font-weight: 500; }
.ab-p--center { text-align: center; margin-inline: auto !important; }

.ab-mark { background: linear-gradient(transparent 58%, rgba(255, 182, 39, 0.6) 58% 94%, transparent 94%); padding: 0 0.12em; border-radius: 3px; -webkit-box-decoration-break: clone; box-decoration-break: clone; color: var(--ab-ink); }
.ab-underlined { position: relative; display: inline-block; font-style: italic; color: var(--ab-o); }
.ab-underlined .ab-doodle { position: absolute; left: 0; bottom: -0.12em; width: 100%; height: 0.26em; color: var(--ab-sun); }

/* ---- buttons ---- */
.ab-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.85rem 1.7rem; border: 2px solid var(--ab-ink); border-radius: 999px; font-family: var(--ab-sans); font-size: 0.95rem; font-weight: 700; line-height: 1.2; text-decoration: none; cursor: pointer; box-shadow: 3px 4px 0 var(--ab-ink); transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s; }
.ab-btn svg { width: 1.1em; height: 1.1em; flex: none; }
.ab-btn:hover { transform: translate(2px, 2px); box-shadow: 1px 2px 0 var(--ab-ink); }
.ab-btn--primary { background: var(--ab-od); color: #fff; }
.ab-btn--primary:hover { background: #d9530a; }
.ab-btn--outline { background: #fff; color: var(--ab-ink); }
.ab-btn--outline:hover { background: var(--ab-peach); }
.ab-page :focus-visible { outline: 3px solid var(--ab-ink); outline-offset: 3px; border-radius: 6px; }

/* ---- polaroid ---- */
.ab-pol { position: relative; padding: 10px 10px 0; background: #fff; box-shadow: 0 16px 28px -14px rgba(5, 36, 54, 0.45), 0 2px 6px rgba(5, 36, 54, 0.14); transform: rotate(var(--tilt, 0deg)); transition: transform 0.3s; }
.ab-pol:hover { transform: rotate(0deg) scale(1.03); z-index: 3; }
.ab-pol img, .ab-pol > svg { width: 100%; aspect-ratio: var(--ratio, 4 / 5); object-fit: cover; }
.ab-pol figcaption { padding: 4px 0 8px; text-align: center; font-family: var(--ab-script); font-size: 1.6rem; font-weight: 600; line-height: 1.3; color: var(--ab-ink); }
.ab-pol::before { content: ''; position: absolute; top: -13px; left: 50%; width: 84px; height: 26px; transform: translateX(-50%) rotate(-3deg); background: rgba(255, 182, 39, 0.75); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12); z-index: 2; }
.ab-pol--mint::before { background: rgba(120, 208, 176, 0.75); }
.ab-pol--blush::before { background: rgba(255, 150, 135, 0.7); }

/* ---- HERO ---- */
.ab-hero { position: relative; overflow: hidden; padding-block: clamp(48px, 6vw, 88px) clamp(64px, 8vw, 110px); background-color: var(--ab-cream); background-image: radial-gradient(rgba(255, 116, 31, 0.2) 1.6px, transparent 1.7px); background-size: 28px 28px; }
.ab-hero__grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: clamp(32px, 5vw, 72px); align-items: center; }
.ab-they { font-family: var(--ab-script); font-size: 1.7rem; font-weight: 600; color: var(--ab-oi); margin-bottom: 4px !important; }
.ab-chips { display: flex; flex-wrap: wrap; gap: 12px 14px; margin: 0 0 30px !important; }
.ab-chip { padding: 0.3em 0.9em; border: 2px solid var(--ab-ink); border-radius: 999px; font-family: var(--ab-serif); font-size: clamp(1.15rem, 1.8vw, 1.5rem); font-weight: 500; color: var(--ab-ink); box-shadow: 3px 4px 0 var(--ab-ink); }
.ab-chip--0 { background: var(--ab-sun); transform: rotate(-2deg); }
.ab-chip--1 { background: var(--ab-peach); transform: rotate(1.5deg); }
.ab-chip--2 { background: var(--ab-mint); transform: rotate(-1deg); }
.ab-chip--3 { background: var(--ab-blush); transform: rotate(2deg); }
.ab-note { position: relative; max-width: 34rem; padding: 22px 26px 24px; background: var(--ab-navy); color: #fff; border-radius: 20px; transform: rotate(-1deg); box-shadow: 6px 7px 0 var(--ab-sun); }
.ab-note__label { font-family: var(--ab-script); font-size: 1.6rem; font-weight: 600; color: var(--ab-sun); margin-bottom: 6px !important; }
.ab-note blockquote { font-family: var(--ab-serif); font-size: clamp(1.2rem, 1.9vw, 1.5rem); font-style: italic; line-height: 1.35; }

.ab-collage { position: relative; width: 100%; max-width: 560px; margin-inline: auto; aspect-ratio: 1 / 1.08; }
.ab-collage .ab-pol { position: absolute; }
.ab-collage__a { width: 62%; left: 0; top: 8%; z-index: 1; }
.ab-collage__b { width: 42%; right: 2%; top: 0; z-index: 2; }
.ab-collage__c { width: 46%; right: 6%; bottom: 0; z-index: 3; }
.ab-collage__loop { left: -6%; top: -2%; width: 46%; height: 30%; transform: rotate(-10deg); opacity: 0.9; }

/* ---- STORY ---- */
.ab-story { background: #fcfcfa; }
.ab-story__grid { display: grid; grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr); gap: clamp(32px, 6vw, 88px); align-items: start; }
.ab-story__aside { position: sticky; top: 110px; }
.ab-founder { position: relative; max-width: 380px; }
.ab-founder__role { display: block; font-family: var(--ab-script); font-size: 1.35rem; font-weight: 600; line-height: 1.2; color: var(--ab-oi); }
.ab-founder__name { display: block; font-family: var(--ab-script); font-size: 1.75rem; font-weight: 700; line-height: 1.2; color: var(--ab-ink); }
.ab-founder__hat { top: -44px; right: -12px; width: 92px; transform: rotate(14deg); z-index: 4; }
.ab-founder__ph { display: block; }
.ab-story__lead { font-family: var(--ab-serif); font-size: clamp(1.5rem, 2.6vw, 2.1rem); font-style: italic; line-height: 1.3; color: var(--ab-ink); margin-bottom: 34px !important; max-width: 30rem; }
.ab-story__text > * + * { margin-top: 8px; }
.ab-sticky { position: relative; max-width: 36rem; margin: 40px 0 44px !important; padding: 30px 32px 34px; background: var(--ab-sun); border: 2px solid var(--ab-ink); border-radius: 8px 8px 22px 8px; transform: rotate(-1.5deg); box-shadow: 6px 8px 0 var(--ab-ink); }
.ab-sticky.ab-reveal.is-in { transform: rotate(-1.5deg); }
.ab-sticky::before { content: ''; position: absolute; top: -14px; left: 34px; width: 88px; height: 26px; background: rgba(255, 255, 255, 0.7); transform: rotate(-4deg); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12); }
.ab-sticky__small { font-size: 0.95rem; font-weight: 700; color: var(--ab-ink); margin-bottom: 8px !important; }
.ab-sticky__big { font-family: var(--ab-script); font-size: clamp(2rem, 3.6vw, 2.9rem); font-weight: 600; line-height: 1.1; color: var(--ab-ink); }
.ab-sticky--flat { background: #fff4ea; transform: rotate(1deg); box-shadow: 6px 8px 0 var(--ab-o); }
.ab-sticky--flat.ab-reveal.is-in { transform: rotate(1deg); }
.ab-sticky__note { font-family: var(--ab-serif); font-size: 1.15rem; line-height: 1.4; color: var(--ab-ink); }
.ab-sticky__note--big { margin-top: 10px; font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 500; }
.ab-remember { margin: 6px 0 22px !important; display: grid; gap: 10px; }
.ab-remember li { display: flex; align-items: flex-start; gap: 12px; font-family: var(--ab-serif); font-size: clamp(1.25rem, 1.9vw, 1.5rem); font-style: italic; line-height: 1.3; color: var(--ab-ink); }
.ab-remember svg { flex: none; width: 26px; height: 26px; margin-top: 4px; }

/* ---- WIDE PHOTO BAND ---- */
.ab-band { padding-bottom: clamp(48px, 6vw, 90px); background: #fcfcfa; }
.ab-band__frame { position: relative; }
.ab-band__frame img { width: 100%; height: clamp(240px, 36vw, 460px); object-fit: cover; object-position: 60% 30%; border: 6px solid #fff; border-radius: 28px; box-shadow: 0 26px 44px -26px rgba(5, 36, 54, 0.55); transform: rotate(-0.6deg); }
.ab-band__cap { position: absolute; left: clamp(14px, 4vw, 48px); bottom: -22px; padding: 6px 22px 8px; background: var(--ab-sun); border: 2px solid var(--ab-ink); border-radius: 6px; font-family: var(--ab-script); font-size: clamp(1.4rem, 2.4vw, 2rem); font-weight: 600; color: var(--ab-ink); transform: rotate(-2deg); box-shadow: 3px 4px 0 var(--ab-ink); }

/* ---- WHY WE EXIST ---- */
.ab-why { background: var(--ab-cream); background-image: radial-gradient(rgba(255, 116, 31, 0.16) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.ab-focus { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; margin-top: 34px !important; }
.ab-tone-peach { --tone: var(--ab-peach); }
.ab-tone-mint { --tone: var(--ab-mint); }
.ab-tone-sky { --tone: var(--ab-sky); }
.ab-tone-blush { --tone: var(--ab-blush); }
.ab-tone-sun { --tone: #fff0c7; }
.ab-fcard { height: 100%; padding: 26px 22px 28px; background: var(--tone); border: 2px solid var(--ab-ink); border-radius: 24px; box-shadow: 5px 7px 0 var(--ab-ink); }
.ab-fcard.ab-reveal.is-in { transform: rotate(var(--r, 0deg)); transition: transform 0.25s; }
.ab-fcard.ab-reveal.is-in:hover { transform: rotate(0deg) translateY(-4px); }
.ab-fcard__icon, .ab-bcard__icon { display: grid; place-items: center; width: 56px; height: 56px; margin-bottom: 16px; background: #fff; border: 2px solid var(--ab-ink); border-radius: 58% 42% 55% 45% / 50% 55% 45% 50%; color: var(--ab-od); }
.ab-fcard__icon svg, .ab-bcard__icon svg { width: 26px; height: 26px; }
.ab-fcard h3, .ab-bcard h3 { font-family: var(--ab-serif); font-size: 1.4rem; font-weight: 600; line-height: 1.2; color: var(--ab-ink); margin-bottom: 8px !important; }
.ab-fcard p { font-size: 0.95rem; line-height: 1.6; color: var(--ab-body); }
.ab-grass { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: clamp(28px, 5vw, 72px); align-items: center; margin-top: clamp(56px, 7vw, 100px); }
.ab-grass__big { font-family: var(--ab-serif); font-size: clamp(2.3rem, 4.8vw, 4.1rem); font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; color: var(--ab-ink); }
.ab-grass__sprout { width: 84px; height: 84px; margin-top: 18px; }
.ab-grass__text .ab-p:last-child { margin-bottom: 0 !important; }

/* ---- POLAROID STRIP ---- */
.ab-strip { position: relative; padding-block: clamp(36px, 5vw, 72px) clamp(56px, 7vw, 96px); background: #fcfcfa; }
.ab-strip__arrow { top: 6%; left: 8%; width: 110px; transform: rotate(-12deg); }
.ab-strip__row { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: clamp(16px, 3.5vw, 48px); }
.ab-strip__row > *:nth-child(2) { margin-top: 30px; }
.ab-strip .ab-pol { width: clamp(150px, 26vw, 300px); }
.ab-strip .ab-pol img { aspect-ratio: 1 / 1.08; }

/* ---- ESSENCE ---- */
.ab-essence { background: #fff4ea; overflow: hidden; }
.ab-essence__head { text-align: center; }
.ab-bubbles { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px clamp(14px, 2.6vw, 30px); max-width: 1000px; margin: 34px auto 0 !important; }
.ab-bubble { padding: 0.32em 0.95em 0.42em; border: 2px solid var(--ab-ink); border-radius: 58% 42% 55% 45% / 60% 50% 50% 40%; box-shadow: 5px 7px 0 var(--ab-ink); font-family: var(--ab-serif); font-size: clamp(1.6rem, 3.6vw, 2.9rem); font-weight: 600; line-height: 1.15; color: var(--ab-ink); }
.ab-bubble.ab-reveal.is-in { transform: rotate(var(--r, 0deg)); transition: transform 0.25s; }
.ab-bubble.ab-reveal.is-in:hover { transform: rotate(0deg) scale(1.07); }
.ab-bubble--orange { background: var(--ab-od); color: #fff; }
.ab-bubble--peach { background: var(--ab-blush); }
.ab-bubble--navy { background: var(--ab-navy); color: #fff; box-shadow: 5px 7px 0 var(--ab-sun); }
.ab-bubble--sun { background: var(--ab-sun); }
.ab-bubble--mint { background: var(--ab-mint); }

.ab-line { position: relative; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: clamp(24px, 4vw, 56px); align-items: center; margin-top: clamp(56px, 7vw, 96px); padding: clamp(30px, 4.5vw, 64px); background: var(--ab-navy); color: #fff; border: 2px solid var(--ab-ink); border-radius: 32px; box-shadow: 8px 10px 0 var(--ab-o); overflow: hidden; }
.ab-line__label { font-family: var(--ab-script); font-size: 1.7rem; font-weight: 600; color: var(--ab-sun); margin-bottom: 8px !important; }
.ab-line__q { font-family: var(--ab-serif); font-size: clamp(1.4rem, 2.5vw, 2.1rem); line-height: 1.4; }
.ab-hl { font-style: italic; text-decoration: underline wavy; text-decoration-thickness: 2px; text-underline-offset: 7px; }
.ab-hl--sun { color: var(--ab-sun); text-decoration-color: var(--ab-sun); }
.ab-hl--o { color: #ff9a5c; text-decoration-color: #ff9a5c; }
.ab-hl--mint { color: #8fe0c0; text-decoration-color: #8fe0c0; }
.ab-ripple { width: 100%; max-width: 340px; margin-inline: auto; overflow: visible; }
.ab-ring { fill: none; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 2 10; transform-box: fill-box; transform-origin: center; }
.ab-ring--1 { fill: var(--ab-od); stroke: none; }
.ab-ring--2 { stroke: var(--ab-sun); }
.ab-ring--3 { stroke: #8fe0c0; }
.ab-ripple__t { font-family: var(--ab-script); font-size: 26px; font-weight: 600; fill: #fff; }
.ab-ripple__t--in { font-size: 28px; }
@media (prefers-reduced-motion: no-preference) {
  .ab-ring--1 { animation: ab-pulse 3.6s ease-in-out infinite; }
  .ab-ring--2 { animation: ab-pulse 3.6s ease-in-out 0.5s infinite; }
  .ab-ring--3 { animation: ab-pulse 3.6s ease-in-out 1s infinite; }
}
@keyframes ab-pulse { 50% { transform: scale(1.045); } }

/* ---- MISSION / VISION ---- */
.ab-mv { background: var(--ab-cream); overflow: hidden; }
.ab-mv__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(22px, 3vw, 40px); }
.ab-mcard { position: relative; padding: clamp(30px, 4vw, 54px); border: 2px solid var(--ab-ink); border-radius: 30px; color: #fff; overflow: hidden; }
.ab-mcard p { font-size: 1.02rem; line-height: 1.75; margin-bottom: 1em !important; color: rgba(255, 255, 255, 0.92); max-width: 34rem; }
.ab-mcard--m { background: linear-gradient(135deg, #f26a0f, #df5604); box-shadow: 8px 10px 0 var(--ab-ink); }
.ab-mcard--v { background: var(--ab-navy); box-shadow: 8px 10px 0 var(--ab-sun); }
.ab-mcard__label { font-family: var(--ab-script) !important; font-size: 1.9rem !important; font-weight: 600; color: var(--ab-sun) !important; margin-bottom: 6px !important; line-height: 1.1 !important; }
.ab-mcard--m .ab-mcard__label { color: #fff !important; }
.ab-mcard .ab-mcard__big { font-family: var(--ab-serif); font-size: clamp(1.5rem, 2.4vw, 2.05rem); line-height: 1.25; font-weight: 500; color: #fff; margin-bottom: 20px !important; }
.ab-mcard .ab-mcard__close { font-family: var(--ab-serif); font-size: 1.3rem; font-style: italic; color: #fff; margin-bottom: 4px !important; }
.ab-mcard :last-child { margin-bottom: 0 !important; }

/* ---- QUOTE BAND ---- */
.ab-quote { position: relative; padding-block: clamp(48px, 6vw, 96px); background: #fcfcfa; overflow: hidden; }
.ab-quote__grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(28px, 6vw, 88px); align-items: center; }
.ab-quote__photo { position: relative; max-width: 440px; }
.ab-quote__photo img { width: 100%; aspect-ratio: 1.02; object-fit: cover; border: 3px solid var(--ab-ink); border-radius: 46% 54% 52% 48% / 52% 46% 54% 48%; box-shadow: 8px 10px 0 var(--ab-sun); }
.ab-quote__text { font-family: var(--ab-serif); font-size: clamp(2.2rem, 4.8vw, 4rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; color: var(--ab-ink); }

/* ---- BELIEFS ---- */
.ab-beliefs { background: var(--ab-cream); background-image: radial-gradient(rgba(255, 116, 31, 0.16) 1.5px, transparent 1.6px); background-size: 28px 28px; overflow: hidden; }
.ab-beliefs__grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 24px; margin-top: 40px !important; }
.ab-beliefs__item { grid-column: span 2; }
.ab-beliefs__item--4, .ab-beliefs__item--5 { grid-column: span 3; }
.ab-bcard { position: relative; height: 100%; padding: 24px 24px 28px; background: var(--tone); border: 2px solid var(--ab-ink); border-radius: 24px; box-shadow: 5px 7px 0 var(--ab-ink); }
.ab-bcard.ab-reveal.is-in { transform: rotate(var(--r, 0deg)); transition: transform 0.25s; }
.ab-bcard.ab-reveal.is-in:hover { transform: rotate(0deg) translateY(-4px); }
.ab-bcard__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.ab-bcard__icon { margin-bottom: 0; }
.ab-bcard__num { display: grid; place-items: center; width: 44px; height: 44px; background: var(--ab-ink); color: #fff; border-radius: 50%; font-family: var(--ab-script); font-size: 1.8rem; font-weight: 600; line-height: 1; padding-bottom: 3px; }
.ab-bcard p { font-size: 0.98rem; line-height: 1.65; }
.ab-bcard__lines { display: grid; gap: 8px; margin-top: 10px !important; }
.ab-bcard__lines li { display: flex; gap: 10px; align-items: flex-start; font-family: var(--ab-serif); font-size: 1.15rem; line-height: 1.35; color: var(--ab-ink); }
.ab-bcard__lines svg { flex: none; width: 20px; height: 20px; margin-top: 3px; color: var(--ab-od); stroke-width: 3; }

/* ---- PROJECT TEASER ---- */
.ab-project { background: #fcfcfa; overflow: hidden; }
.ab-project__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 6vw, 88px); align-items: center; }
.ab-project__photo { position: relative; }
.ab-project__photo img { width: 100%; aspect-ratio: 1.15; object-fit: cover; object-position: 40% 30%; border: 8px solid #fff; border-radius: 26px; box-shadow: 0 26px 44px -22px rgba(5, 36, 54, 0.55), 6px 8px 0 var(--ab-o); transform: rotate(-2.5deg); }
.ab-badge { position: absolute; top: -26px; right: -14px; display: grid; place-content: center; width: 110px; height: 110px; border: 2px solid var(--ab-ink); border-radius: 50%; background: var(--ab-sun); box-shadow: 4px 5px 0 var(--ab-ink); text-align: center; transform: rotate(10deg); color: var(--ab-ink); }
.ab-badge b { font-family: var(--ab-serif); font-size: 1.75rem; line-height: 1; }
.ab-badge span { font-family: var(--ab-script); font-size: 1.4rem; font-weight: 600; line-height: 1; }
.ab-project__text .ab-h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); }

/* ---- LOOKING AHEAD ---- */
.ab-ahead { position: relative; padding-block: clamp(64px, 8vw, 120px); background: var(--ab-navy); color: #fff; overflow: hidden; }
.ab-ahead__top { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: clamp(28px, 6vw, 80px); align-items: center; }
.ab-wishes { display: grid; gap: 14px; margin-top: 24px !important; }
.ab-wishes > li { display: flex; gap: 14px; align-items: flex-start; font-size: 1.1rem; line-height: 1.55; color: rgba(255, 255, 255, 0.92); }
.ab-wishes__tick { flex: none; display: grid; place-items: center; width: 30px; height: 30px; margin-top: 1px; background: var(--ab-sun); border-radius: 50%; color: var(--ab-ink); }
.ab-wishes__tick svg { width: 17px; height: 17px; stroke-width: 3.5; }
.ab-ahead__photo { max-width: 320px; margin-inline: auto; }
.ab-building { margin-top: clamp(56px, 7vw, 100px); text-align: center; }
.ab-building__lead { font-family: var(--ab-script); font-size: clamp(1.9rem, 3.4vw, 2.7rem); font-weight: 600; color: var(--ab-sun); margin-bottom: 14px !important; }
.ab-building ul { display: grid; gap: 4px; margin-bottom: 26px !important; }
.ab-building li { font-family: var(--ab-serif); font-size: clamp(1.5rem, 5.6vw, 4rem); font-weight: 500; line-height: 1.12; letter-spacing: -0.02em; color: #fff; }
.ab-building li span { color: rgba(255, 255, 255, 0.55); font-style: italic; }
.ab-building__future { max-width: 36rem; margin-inline: auto !important; font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.6; color: rgba(255, 255, 255, 0.9); }
.ab-finale { margin-top: clamp(56px, 7vw, 96px); padding: clamp(28px, 4vw, 52px) 20px; text-align: center; border: 2px dashed rgba(255, 182, 39, 0.6); border-radius: 30px; }
.ab-finale__big { font-family: var(--ab-serif); font-size: clamp(1.7rem, 3.8vw, 3.1rem); font-weight: 500; font-style: italic; line-height: 1.15; color: #fff; }
.ab-finale__squiggle { width: min(220px, 60%); height: 16px; margin: 14px auto 22px; }
.ab-finale__sign { font-family: var(--ab-serif); font-size: 1.25rem; font-weight: 600; color: #fff; }
.ab-finale__sign span { display: block; margin-top: 2px; font-family: var(--ab-script); font-size: 1.7rem; font-weight: 600; color: var(--ab-sun); }

/* ---- CLOSING CTA ---- */
.ab-cta { padding-block: clamp(48px, 6vw, 88px); background: #fff4ea; }
.ab-cta__box { position: relative; padding: clamp(32px, 5vw, 60px) 24px; background: #fff; border: 2px solid var(--ab-ink); border-radius: 30px; box-shadow: 8px 10px 0 var(--ab-ink); text-align: center; overflow: hidden; }
.ab-cta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 22px; }

/* ---- RESPONSIVE ---- */
@media (max-width: 1024px) {
  .ab-focus { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ab-beliefs__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ab-beliefs__item, .ab-beliefs__item--4, .ab-beliefs__item--5 { grid-column: span 1; }
  .ab-beliefs__item--5 { grid-column: 1 / -1; }
}
@media (max-width: 900px) {
  .ab-hero__grid, .ab-story__grid, .ab-grass, .ab-line, .ab-mv__grid, .ab-quote__grid, .ab-project__grid, .ab-ahead__top { grid-template-columns: 1fr; }
  .ab-collage { max-width: 460px; }
  .ab-story__aside { position: static; }
  .ab-founder { margin: 30px auto 0; }
  .ab-quote__photo { margin-inline: auto; }
  .ab-project__photo { max-width: 520px; margin: 0 auto; }
  .ab-ahead__photo { order: -1; }
}
@media (max-width: 640px) {
  .ab-focus, .ab-beliefs__grid { grid-template-columns: 1fr; }
  .ab-beliefs__item--5 { grid-column: auto; }
  .ab-strip__row > *:nth-child(2) { margin-top: 0; }
  .ab-sticky { padding: 26px 22px 28px; }
  .ab-badge { width: 92px; height: 92px; right: -4px; }
  .ab-badge b { font-size: 1.45rem; }
}
`;
