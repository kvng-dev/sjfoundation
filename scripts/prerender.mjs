// Prerenders every public route into dist/<route>/index.html so crawlers (and
// users on slow connections) get real H1/H2s, text and <a href> links without
// running JavaScript. Run automatically by `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const routes = [
  "/",
  "/about",
  "/our-work",
  "/project-1000-smiles",
  "/impact",
  "/christmas-in-the-street",
  "/get-involved",
  "/contact",
  "/donate",
];

const SITE = "https://www.sanusijafarfoundation.org";
const esc = (v = "") =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

function headTags(seo) {
  if (!seo) return "";
  const url = SITE + seo.path;
  const t = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${esc(seo.type)}" />`,
    `<meta property="og:site_name" content="Sanusi Jafar Foundation" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(seo.image)}" />`,
    `<meta property="og:image:alt" content="${esc(seo.title)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image)}" />`,
  ];
  if (seo.jsonLd) {
    t.push(
      `<script type="application/ld+json" data-seo="jsonld">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`
    );
  }
  return t.join("\n    ");
}

// Remove the generic homepage tags from the template so they aren't duplicated.
function stripGenericHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/<meta\s+property="og:[\s\S]*?\/>/g, "")
    .replace(/<meta\s+name="twitter:[\s\S]*?\/>/g, "")
    .replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/, "");
}

const { render } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const base = stripGenericHead(template);

for (const route of routes) {
  const { html, seo } = render(route);
  let page = base.replace("</head>", `    ${headTags(seo)}\n  </head>`);
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = route === "/" ? dist : path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const h2 = (html.match(/<h2[\s>]/g) || []).length;
  const links = (html.match(/<a\s[^>]*href="\//g) || []).length;
  console.log(`prerendered ${route.padEnd(26)} h1:${h1} h2:${h2} internal links:${links}`);
}

fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
