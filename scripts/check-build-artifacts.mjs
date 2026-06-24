// @spec JSONX-DIST-001 JSONX-DIST-002 JSONX-DIST-003 JSONX-DIST-004 JSONX-DIST-005 JSONX-DIST-006 JSONX-DIST-007 JSONX-DIST-009
// @intent docs/intent/distribution-types/distribution-types-specs.md
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const expectedArtifacts = [
  "build/index.d.ts",
  "build/index.js",
  "dist/index.cjs",
  "dist/index.esm.js",
  "dist/index.web.js",
  "dist/index.web.js.map",
  "dist/index.web.min.js",
  "dist/index.web.min.js.map",
  "dist/index.web.core.js",
  "dist/index.web.core.js.map",
  "dist/index.web.core-min.js",
  "dist/index.web.core-min.js.map",
  "dist/index.web.core-legacy.js",
  "dist/index.web.core-legacy.js.map",
  "dist/index.web.core-legacy-min.js",
  "dist/index.web.core-legacy-min.js.map"
];

const packageEntrypoints = ["main", "browser"]
  .map(field => packageJson[field])
  .filter(Boolean);

const errors = [];
const checked = new Set();

for (const artifact of expectedArtifacts.concat(packageEntrypoints)) {
  if (checked.has(artifact)) continue;
  checked.add(artifact);

  if (!fs.existsSync(artifact)) {
    errors.push(`Missing build artifact: ${artifact}`);
    continue;
  }

  const stats = fs.statSync(artifact);
  if (!stats.isFile()) {
    errors.push(`Build artifact is not a file: ${artifact}`);
  } else if (stats.size === 0) {
    errors.push(`Build artifact is empty: ${artifact}`);
  }
}

console.log("Build artifact check summary");
console.log(`expected_artifacts=${expectedArtifacts.length}`);
console.log(`package_entrypoints=${packageEntrypoints.length}`);
console.log(`checked_artifacts=${checked.size}`);
console.log(`missing_or_empty=${errors.length}`);

if (errors.length) {
  console.error("\nBuild artifact check failed");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("\nBuild artifact check passed");
}
