// src/components/Seo.jsx
// Dependency-free head manager: title, description, canonical, Open Graph,
// Twitter card and JSON-LD. Usage: <Seo {...props} /> at the top of a page.
import { useEffect } from "react";

export const SITE = {
  name: "Sanusi Jafar Foundation",
  url: "https://www.sanusijafarfoundation.org", // no trailing slash
  logo: "https://www.sanusijafarfoundation.org/logo.png",
  email: "info@sanusijafarfoundation.org",
  defaultImage: "https://www.sanusijafarfoundation.org/og-default.jpg", // 1200x630
  twitter: "", // optional, replace with a valid Twitter handle if available
  sameAs: [
    "https://www.instagram.com/sanusijafarfoundation",
    "https://www.facebook.com/SanusiJafarFoundation",
    "https://www.tiktok.com/@sanusijafarfoundation",
    "https://www.linkedin.com/company/sanusi-jafar-foundation",
  ],
};

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}
const meta = (name, content) =>
  content && upsert(`meta[name="${name}"]`, "meta", { name, content });
const prop = (property, content) =>
  content &&
  upsert(`meta[property="${property}"]`, "meta", { property, content });

export default function SEO({
  title,
  description,
  path = "/",
  image = SITE.defaultImage,
  type = "website",
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const url = SITE.url + path;
    document.title = title;

    meta("description", description);
    meta(
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsert('link[rel="canonical"]', "link", { rel: "canonical", href: url });

    prop("og:site_name", SITE.name);
    prop("og:type", type);
    prop("og:title", title);
    prop("og:description", description);
    prop("og:url", url);
    prop("og:image", image);
    prop("og:image:alt", title);
    prop("og:image:width", "1200");
    prop("og:image:height", "630");
    prop("og:locale", "en_NG");

    meta("twitter:card", "summary_large_image");
    if (
      SITE.twitter &&
      !/^(?:@?REPLACE|@?)$/i.test(SITE.twitter) &&
      /^@?[A-Za-z0-9_]{1,15}$/.test(SITE.twitter)
    ) {
      meta(
        "twitter:site",
        SITE.twitter.startsWith("@") ? SITE.twitter : `@${SITE.twitter}`
      );
    } else {
      document.head.querySelector('meta[name="twitter:site"]')?.remove();
    }
    meta("twitter:title", title);
    meta("twitter:description", description);
    meta("twitter:image", image);

    let ld;
    if (jsonLd) {
      ld = upsert('script[data-seo="jsonld"]', "script", {
        type: "application/ld+json",
        "data-seo": "jsonld",
      });
      ld.textContent = JSON.stringify(jsonLd);
    }
    return () => {
      if (ld) ld.remove();
    };
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}

// Reusable structured data for the organisation
export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  url: SITE.url,
  logo: SITE.logo,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general inquiries",
    email: SITE.email,
    availableLanguage: ["English"],
  },
  slogan: "Restoring hope, dignity and belonging.",
  description:
    "A grassroots nonprofit restoring hope, dignity and belonging for children, women, young people and vulnerable families in underserved communities.",
  founder: {
    "@type": "Person",
    name: "Olatunji Sanusi",
  },
  sameAs: SITE.sameAs,
};
