import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// esbuild can't minify CSS that lives inside JS template strings, and many
// components here carry a big `const CSS = \`...\`` block. Collapse those at
// build time so the final bundle is genuinely minified. Strings that contain
// ${} interpolation are left untouched.
function minifyInlineCss() {
  return {
    name: "minify-inline-css-strings",
    enforce: "pre",
    transform(code, id) {
      if (!/\/src\/.*\.jsx$/.test(id.replace(/\\/g, "/"))) return null;
      const out = code.replace(
        /(const CSS = `)([^`]*)(`)/g,
        (match, open, css, close) => {
          if (css.includes("${")) return match;
          const min = css
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{};])\s*/g, "$1")
            .trim();
          return open + min + close;
        }
      );
      return out === code ? null : { code: out, map: null };
    },
  };
}

export default defineConfig({
  plugins: [minifyInlineCss(), react()],
  esbuild: { legalComments: "none" },
  build: {
    minify: "esbuild",
  },
  ssr: {
    // CommonJS packages whose default export breaks when Node loads them
    // directly during prerender. Bundling them lets Vite fix the interop.
    noExternal: ["react-countup", "countup.js"],
  },
});
