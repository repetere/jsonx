import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const appRoot = fileURLToPath(new URL("../", import.meta.url));

// Inline browser assets as strings, never execute widget/GSAP code on the server.
// The result is a standalone ES module suitable for Wrangler or dashboard upload.
await build({
  absWorkingDir: appRoot,
  entryPoints: ["src/worker.mjs"],
  outfile: ".worker-build/worker.mjs",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  conditions: ["workerd", "worker", "browser"],
  loader: { ".html": "text", ".css": "text" },
  plugins: [{
    name: "renderer-browser-assets",
    setup(build) {
      build.onLoad({ filter: /(?:[\\/]web[\\/]widget\.js|[\\/]gsap[\\/]dist[\\/]gsap\.min\.js)$/ }, async ({ path }) => ({
        contents: await readFile(path, "utf8"),
        loader: "text",
      }));
    },
  }],
  legalComments: "inline",
  logLevel: "info",
});
