# Sanusi Jafar Foundation: landing page

React + Vite. Landing page only; other pages come later.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure

```
src/
  App.jsx                 page composition (Header > sections > Footer)
  index.css               design tokens (colours, fonts) + all styles
  data/content.js         nav links, stats, focus areas, stories, partners, contact, socials
  components/             one file per section
  assets/                 logo-mark.png, logo-full.png, photos
```

## Things to swap before launch

- **Photos** (`src/assets/hero.jpg`, `about.jpg`, `project.jpg`, `story1-3.jpg`) are low-resolution crops from the
  design mockup, used as placeholders. Replace them with the real photography (keep the file names, or update the imports).
- **Partner logos**: `partners` in `src/data/content.js` shows text placeholders. Add a `logo` import to any entry to show the real logo.
- **Social links**: replace the `#` hrefs in `socials` (`content.js`).
- **Nav links** currently scroll to sections on this page. When the other pages exist, change each `href` in `navLinks`
  to a route (and add React Router).
- **Donate** buttons point to `#donate` (the Donate card in "Get involved"). Point them at your payment page.

## Brand tokens (`src/index.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--orange` | `#FF741F` | logo orange: numerals, icons, accents |
| `--orange-btn` | `#F05F0C` | button fill (slightly deeper so white text is readable) |
| `--orange-ink` | `#C9500A` | small orange text on light backgrounds |
| `--navy` | `#052436` | footer |
| `--ink` | `#0B2233` | headings |

Fonts: Newsreader (headings), Plus Jakarta Sans (body), Caveat (hero tagline), loaded from Google Fonts in `index.html`.
# sjfoundation
