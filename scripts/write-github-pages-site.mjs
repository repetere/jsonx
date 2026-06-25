import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceRoot = path.join(root, "site");
const docsRoot = path.join(root, "docs");

const files = [
  ["index.html", "index.html"],
  ["assets/favicon.svg", "assets/favicon.svg"],
  ["assets/site.css", "assets/site.css"],
  ["assets/site.js", "assets/site.js"],
];

for (const [source] of files) {
  const sourcePath = path.join(sourceRoot, source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing marketing site source file: ${sourcePath}`);
  }
}

fs.mkdirSync(path.join(docsRoot, "assets"), { recursive: true });

for (const [source, target] of files) {
  fs.copyFileSync(path.join(sourceRoot, source), path.join(docsRoot, target));
}

console.log("GitHub Pages marketing site written to docs/");
