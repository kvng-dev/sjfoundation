// GallerySection.jsx — photo collage for the Christmas on the Streets page
// ---------------------------------------------------------------------------
// Drop-in section. Import and place wherever it fits best — after "Beyond
// the party" works well:
//
//   import GallerySection from './GallerySection.jsx';
//   ...
//   <BeyondTheParty />
//   <GallerySection />
//   <EditionFour />
//
// Place at: src/pages/GallerySection.jsx (same folder as
// ChristmasOnTheStreets.jsx), or src/components/.
//
// PHOTOS: all placeholders, reusing images already in your project (same
// files your other pages use). Swap the `photos` array below for real,
// captioned photos whenever you have them — just keep the same shape
// ({ src, alt, caption }).
//
// GRID MATH: the collage uses 2 "big" tiles (2x2 = 4 cells each) and 8
// normal tiles (1 cell each) = 16 cells total, which tiles perfectly into
// the 4-column desktop grid (4 rows) and the 2-column mobile grid (6 rows)
// with `grid-auto-flow: dense` — no empty cells at either breakpoint. If
// you add/remove photos, keep the total cell count (big*4 + normal) a
// multiple of both 4 and 2 to keep it gapless.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Doodle } from "../components/Doodles.jsx";

import photo1 from "../assets/IMG_3119.JPG.jpeg";
import photo2 from "../assets/IMG_3169.JPG.jpeg";
import photo3 from "../assets/IMG_3167.JPG.jpeg";
import photo4 from "../assets/IMG_3168.JPG.jpeg";
import photo5 from "../assets/IMG_3165.JPG.jpeg";
import photo6 from "../assets/IMG_3112.JPG.jpeg";
import photo7 from "../assets/IMG_3125.JPG.jpeg";
import photo8 from "../assets/IMG_3113.JPG.jpeg";

const PHOTOS = [
  { src: photo1, alt: "A child at Edition 1", caption: "Edition 1", big: true },
  { src: photo2, alt: "A child at Edition 2", caption: "Edition 2" },
  { src: photo3, alt: "A child at Edition 3", caption: "Edition 3" },
  { src: photo4, alt: "Street outreach", caption: "Into the streets" },
  {
    src: photo5,
    alt: "The mosque visit",
    caption: "The mosque visit",
    big: true,
    bigRight: true,
  },
  {
    src: photo6,
    alt: "Games and laughter at the party",
    caption: "Games & laughter",
  },
  {
    src: photo7,
    alt: "A mother and daughter at the event",
    caption: "Foodstuffs for widows",
  },
  {
    src: photo8,
    alt: "A moment from the community",
    caption: "So many smiles",
  },
  // NOTE: duplicated placeholders below just to keep the collage grid
  // perfectly filled (10 tiles total = zero empty cells, see GRID MATH
  // above). Swap these two for real, distinct photos whenever you have them.
  {
    src: photo3,
    alt: "More laughter from the party",
    caption: "More laughter",
  },
  { src: photo7, alt: "Another smiling face", caption: "Another smile" },
];

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState(null);
  const closeBtnRef = useRef(null);
  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return undefined;
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <section className="gl-section" aria-labelledby="gl-title">
      <style>{CSS}</style>
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: "6%", right: "6%", width: 32 }}
      />
      <Doodle
        name="star"
        fill="currentColor"
        className="lp-abs lp-float lp-c-o lp-edge"
        style={{ bottom: "8%", left: "4%", width: 28 }}
      />

      <div className="gl-wrap">
        <p className="gl-eyebrow">In pictures</p>
        <h2 id="gl-title" className="gl-h2">
          Moments worth keeping.
        </h2>

        <ul className="gl-grid">
          {PHOTOS.map((p, i) => (
            <li
              key={p.caption}
              className={[
                "gl-item",
                p.big && "gl-item--big",
                p.bigRight && "gl-item--big-right",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className="gl-thumb"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger photo: ${p.caption}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                <span className="gl-thumb__cap">{p.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="gl-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={PHOTOS[openIndex].caption}
        >
          <button
            type="button"
            className="gl-lightbox__backdrop"
            aria-label="Close gallery"
            onClick={() => setOpenIndex(null)}
          />
          <div className="gl-lightbox__inner">
            <button
              type="button"
              className="gl-lightbox__nav gl-lightbox__nav--prev"
              aria-label="Previous photo"
              onClick={() =>
                setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)
              }
            >
              <LuChevronLeft aria-hidden="true" />
            </button>

            <figure className="gl-lightbox__figure">
              <img src={PHOTOS[openIndex].src} alt={PHOTOS[openIndex].alt} />
              <figcaption>{PHOTOS[openIndex].caption}</figcaption>
            </figure>

            <button
              type="button"
              className="gl-lightbox__nav gl-lightbox__nav--next"
              aria-label="Next photo"
              onClick={() => setOpenIndex((i) => (i + 1) % PHOTOS.length)}
            >
              <LuChevronRight aria-hidden="true" />
            </button>

            <button
              type="button"
              className="gl-lightbox__close"
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              ref={closeBtnRef}
            >
              <LuX aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const CSS = `
.gl-section {
  position: relative;
  overflow: hidden;
  padding-block: clamp(52px, 6.5vw, 96px);
  background: #fcfcfa;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
}
.gl-section *, .gl-section *::before, .gl-section *::after { box-sizing: border-box; }
.gl-section :focus-visible { outline: 3px solid #0b2233; outline-offset: 3px; border-radius: 6px; }
.gl-wrap { position: relative; z-index: 1; width: 100%; max-width: 1180px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 48px); }

.gl-eyebrow { margin: 0 0 14px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #c9500a; }
.gl-h2 { margin: 0 0 32px; font-family: 'Newsreader', Georgia, 'Times New Roman', serif; font-size: clamp(1.9rem, 3.2vw, 2.6rem); font-weight: 500; line-height: 1.14; color: #0b2233; }

.gl-grid { display: grid; grid-auto-flow: dense; grid-template-columns: repeat(4, minmax(0,1fr)); grid-auto-rows: 160px; gap: 18px; list-style: none; margin: 0; padding: 0; }
.gl-item { list-style: none; }
.gl-item--big { grid-column: span 2; grid-row: span 2; }
.gl-item--big-right { grid-column: 3 / span 2; }

.gl-thumb { position: relative; display: block; width: 100%; height: 100%; padding: 0; border: 2px solid #0b2233; border-radius: 16px; background: #fff; overflow: hidden; cursor: pointer; box-shadow: 3px 4px 0 #0b2233; transition: transform 0.15s, box-shadow 0.15s; }
.gl-thumb:hover { transform: translate(-2px, -2px); box-shadow: 5px 6px 0 #0b2233; }
.gl-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gl-thumb__cap { position: absolute; left: 10px; bottom: 10px; padding: 0.3em 0.75em; background: rgba(11,34,51,.82); border-radius: 999px; color: #fff; font-size: 0.72rem; font-weight: 700; }

.gl-lightbox { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; }
.gl-lightbox__backdrop { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: rgba(5,36,54,.92); cursor: pointer; }
.gl-lightbox__inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; max-width: min(90vw, 900px); }
.gl-lightbox__figure { margin: 0; max-width: min(78vw, 760px); max-height: 82vh; text-align: center; }
.gl-lightbox__figure img { display: block; max-width: 100%; max-height: 72vh; border-radius: 12px; border: 3px solid #fff; object-fit: contain; margin-inline: auto; }
.gl-lightbox__figure figcaption { margin-top: 14px; font-family: 'Newsreader', Georgia, serif; font-size: 1.1rem; color: #fff; }
.gl-lightbox__nav, .gl-lightbox__close { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border: 2px solid #fff; border-radius: 50%; background: rgba(255,255,255,.12); color: #fff; cursor: pointer; }
.gl-lightbox__nav svg, .gl-lightbox__close svg { width: 22px; height: 22px; }
.gl-lightbox__nav:hover, .gl-lightbox__close:hover { background: rgba(255,255,255,.24); }
.gl-lightbox__close { position: fixed; top: 20px; right: 20px; background: rgba(5,36,54,.6); }

@media (max-width: 860px) {
  .gl-grid { grid-template-columns: repeat(2, minmax(0,1fr)); grid-auto-rows: 200px; }
  .gl-item--big { grid-column: span 2; grid-row: span 1; }
  .gl-item--big-right { grid-column: span 2; }
}
@media (max-width: 520px) {
  .gl-lightbox__inner { flex-direction: column; max-width: 92vw; }
  .gl-lightbox__nav { position: absolute; top: 50%; transform: translateY(-50%); }
  .gl-lightbox__nav--prev { left: -6px; }
  .gl-lightbox__nav--next { right: -6px; }
}
`;
