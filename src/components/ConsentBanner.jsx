// src/components/ConsentBanner.jsx
// Analytics consent bar. Mount once in App.
// To let visitors change their mind later, call openConsentBanner()
// from a "Cookie settings" button in the footer.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent } from "../lib/analytic";

const OPEN_EVENT = "consent:open";
export const openConsentBanner = () =>
  window.dispatchEvent(new Event(OPEN_EVENT));

export default function ConsentBanner({ privacyHref }) {
  // Lazy initialiser: no extra render, no flash of the banner for returning visitors
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const choose = (granted) => {
    setConsent(granted);
    setVisible(false);
  };

  return (
    <section className="cb" aria-label="Analytics consent">
      <style>{CSS}</style>
      <p className="cb__text">
        We use privacy-friendly analytics to understand how people use our site
        and improve it.
        {privacyHref && (
          <>
            {" "}
            <Link to={privacyHref} className="cb__link">
              Privacy policy
            </Link>
          </>
        )}
      </p>
      <div className="cb__actions">
        <button
          type="button"
          className="cb__btn cb__btn--no"
          onClick={() => choose(false)}
        >
          No thanks
        </button>
        <button
          type="button"
          className="cb__btn cb__btn--yes"
          onClick={() => choose(true)}
        >
          Accept
        </button>
      </div>
    </section>
  );
}

const CSS = `
.cb {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: max(16px, env(safe-area-inset-bottom));
  z-index: 9999;
  max-width: 560px;
  margin-inline: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background: #052436;
  color: #fff;
  border: 2px solid #0b2233;
  border-radius: 18px;
  box-shadow: 5px 6px 0 #ffb627;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
}
.cb *, .cb *::before, .cb *::after { box-sizing: border-box; }
.cb__text { margin: 0; flex: 1 1 240px; }
.cb__link { color: #ffb627; text-underline-offset: 3px; }
.cb__actions { display: flex; gap: 8px; }
.cb__btn {
  padding: 0.55rem 1.1rem;
  border: 2px solid #0b2233;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  color: #0b2233;
  cursor: pointer;
}
.cb__btn--yes { background: #ffb627; }
.cb__btn--no { background: #fff; }
.cb__btn:focus-visible,
.cb__link:focus-visible { outline: 3px solid #ffb627; outline-offset: 3px; }

@media (max-width: 480px) {
  .cb__actions { width: 100%; }
  .cb__btn { flex: 1; }
}
@media (prefers-reduced-motion: no-preference) {
  .cb { animation: cb-in 0.35s ease-out both; }
}
@keyframes cb-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
`;
