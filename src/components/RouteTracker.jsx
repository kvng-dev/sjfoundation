// src/components/RouteTracker.jsx
// Mount once inside <BrowserRouter>, e.g. <RouteTracker /> above your <Routes>.
// Sends a page_view on every route change and scroll-depth events (25/50/75/100%).
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView, trackEvent } from "../lib/analytic";

export default function RouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // wait a tick so <Seo> has updated document.title
    const t = setTimeout(() => trackPageView(pathname + search), 50);
    return () => clearTimeout(t);
  }, [pathname, search]);

  useEffect(() => {
    const hit = new Set();
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) return;
      const pct = (h.scrollTop / max) * 100;
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m - 1 && !hit.has(m)) {
          hit.add(m);
          trackEvent("scroll_depth", { percent: m, page_path: pathname });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
