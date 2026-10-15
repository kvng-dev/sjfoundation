// src/lib/analytics.js
// GA4 with Consent Mode v2. Nothing is stored or sent until the visitor accepts.
// Set your Measurement ID below (looks like G-XXXXXXXXXX) or via env:
//   Vite:  VITE_GA_ID=G-XXXXXXXXXX      CRA: REACT_APP_GA_ID=G-XXXXXXXXXX

const GA_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_ID) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_GA_ID) ||
  "G-XXXXXXXXXX"; // <- REPLACE

const CONSENT_KEY = "sjf-analytics-consent"; // "granted" | "denied"
let started = false;

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function initAnalytics() {
  if (
    typeof window === "undefined" ||
    started ||
    getConsent() !== "granted" ||
    !/^G-[A-Z0-9]+$/i.test(GA_ID) ||
    GA_ID.includes("XXXXXXXXXX")
  ) {
    return;
  }

  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  document.head.appendChild(script);
}

export function setConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {}
  if (granted && !started) {
    initAnalytics();
    trackPageView(window.location.pathname + window.location.search);
    return;
  }
  if (started)
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
}

export function trackPageView(path, title) {
  if (!started || getConsent() !== "granted") return;

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title || document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!started || getConsent() !== "granted") return;

  gtag("event", name, params);
}

// Convenience wrappers used by the About page
export const trackCta = (label, location = "about") =>
  trackEvent("cta_click", { cta_label: label, cta_location: location });

export const trackDonateIntent = (location = "about") =>
  trackEvent("begin_donation", { cta_location: location });
