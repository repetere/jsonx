import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceRoot = path.join(root, "site");
const docsRoot = path.join(root, "docs");

const files = [
  ["CNAME", "CNAME"],
  ["index.html", "index.html"],
  ["generative-ui.html", "generative-ui.html"],
  ["privacy.html", "privacy.html"],
  ["terms.html", "terms.html"],
  ["assets/analytics.js", "assets/analytics.js"],
  ["assets/favicon.svg", "assets/favicon.svg"],
  ["assets/site.css", "assets/site.css"],
  ["assets/generative-ui.css", "assets/generative-ui.css"],
  ["assets/site.js", "assets/site.js"],
  ["assets/generative-ui-demo.js", "assets/generative-ui-demo.js"],
];

for (const [source] of files) {
  const sourcePath = path.join(sourceRoot, source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing marketing site source file: ${sourcePath}`);
  }
}

fs.mkdirSync(path.join(docsRoot, "assets"), { recursive: true });
fs.rmSync(path.join(docsRoot, "skills"), { recursive: true, force: true });
fs.cpSync(path.join(root, "skills"), path.join(docsRoot, "skills"), { recursive: true });

for (const [source, target] of files) {
  fs.copyFileSync(path.join(sourceRoot, source), path.join(docsRoot, target));
}

console.log("GitHub Pages marketing site written to docs/");
