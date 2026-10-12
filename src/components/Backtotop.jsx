// BackToTop.jsx — floating "back to top" button, shows on every page
// ---------------------------------------------------------------------------
// Add it ONCE, in your Layout (so it appears on every route), right
// alongside Header/Footer — not inside individual pages:
//
//   import BackToTop from './components/BackToTop.jsx';
//   ...
//   <Header />
//   <main id="main"><Outlet /></main>
//   <Footer />
//   <BackToTop />
//
// Self-contained (own scoped "bt-" styles) — nothing to add to global CSS.
// Place at: src/components/BackToTop.jsx
// ---------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const SHOW_AFTER_PX = 600;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>
      <button
        type="button"
        className={`bt-btn${visible ? " is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
      >
        <LuArrowUp aria-hidden="true" />
      </button>
    </>
  );
}

const CSS = `
.bt-btn {
  position: fixed;
  right: clamp(16px, 3vw, 28px);
  bottom: clamp(16px, 3vw, 28px);
  z-index: 60;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid #0b2233;
  border-radius: 50%;
  background: #f05f0c;
  color: #fff;
  cursor: pointer;
  box-shadow: 3px 4px 0 #0b2233;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s;
}
.bt-btn.is-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
.bt-btn:hover { background: #d9530a; }
.bt-btn:active { transform: translate(2px, 2px); box-shadow: 1px 2px 0 #0b2233; }
.bt-btn:focus-visible { outline: 3px solid #0b2233; outline-offset: 3px; }
.bt-btn svg { width: 22px; height: 22px; }

@media (prefers-reduced-motion: reduce) {
  .bt-btn { transition: opacity 0.15s linear; }
  .bt-btn.is-visible { transform: none; }
}
@media (max-width: 480px) {
  .bt-btn { width: 44px; height: 44px; }
  .bt-btn svg { width: 20px; height: 20px; }
}
`;
