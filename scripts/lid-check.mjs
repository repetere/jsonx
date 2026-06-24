#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(relativePath, predicate = () => true) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];

  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const childRelative = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", "build", "dist", "coverage"].includes(entry.name)) {
        continue;
      }
      files.push(...walk(childRelative, predicate));
    } else if (predicate(childRelative)) {
      files.push(childRelative);
    }
  }

  return files;
}

function unique(values) {
  return [...new Set(values)].sort();
}

function collectAnnotatedFiles() {
  const sourceFiles = walk("src", file => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file));
  const rootFiles = ["esbuild.config.js"].filter(exists);
  return [...sourceFiles, ...rootFiles].filter(file => {
    const text = read(file);
    return text.includes("@intent") || text.includes("@spec");
  });
}

function collectIntentPaths(files) {
  const refs = [];

  for (const file of files) {
    const text = read(file);
    for (const line of text.split(/\r?\n/)) {
      if (!line.includes("@intent")) continue;
      for (const match of line.matchAll(/docs\/intent\/[^\s`'")]+/g)) {
        refs.push({ file, target: match[0] });
      }
    }
  }

  return refs;
}

function collectAnnotatedSpecIds(files) {
  const ids = [];

  for (const file of files) {
    const text = read(file);
    for (const line of text.split(/\r?\n/)) {
      if (!line.includes("@spec")) continue;
      for (const match of line.matchAll(/JSONX-[A-Z]+-\d{3}/g)) {
        ids.push(match[0]);
      }
    }
  }

  return unique(ids);
}

function collectDefinedSpecIds() {
  const specFiles = walk("docs/intent", file => file.endsWith("-specs.md"));
  const ids = [];

  for (const file of specFiles) {
    const text = read(file);
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\|\s*(JSONX-[A-Z]+-\d{3})\s*\|/);
      if (match) ids.push(match[1]);
    }
  }

  return unique(ids);
}

function checkIntentPaths(files) {
  const refs = collectIntentPaths(files);
  for (const ref of refs) {
    if (!exists(ref.target)) {
      errors.push(`Missing intent path: ${ref.file} -> ${ref.target}`);
    }
  }
  return refs.length;
}

function checkSpecIds(files) {
  const annotated = collectAnnotatedSpecIds(files);
  const defined = collectDefinedSpecIds();
  const missing = annotated.filter(id => !defined.includes(id));
  const orphans = defined.filter(id => !annotated.includes(id));

  for (const id of missing) errors.push(`Annotated spec ID is not defined: ${id}`);
  for (const id of orphans) warnings.push(`Defined spec ID has no source or test citation: ${id}`);

  return { annotated: annotated.length, defined: defined.length, missing: missing.length, orphans: orphans.length };
}

function checkDesignSpecPairs() {
  const specFiles = walk("docs/intent", file => file.endsWith("-specs.md"));
  const designFiles = walk("docs/intent", file => file.endsWith("-design.md"));

  for (const specFile of specFiles) {
    const designFile = specFile.replace(/-specs\.md$/, "-design.md");
    if (!exists(designFile)) errors.push(`Missing design file for specs: ${specFile}`);
  }

  for (const designFile of designFiles) {
    const specFile = designFile.replace(/-design\.md$/, "-specs.md");
    if (!exists(specFile)) errors.push(`Missing specs file for design: ${designFile}`);
  }

  return { designs: designFiles.length, specs: specFiles.length };
}

function parseInlineList(value) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return [];
  return trimmed
    .slice(1, -1)
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function checkArrowIndex() {
  const indexPath = "docs/arrows/index.yaml";
  if (!exists(indexPath)) {
    errors.push("Missing docs/arrows/index.yaml");
    return { checked: 0 };
  }

  const text = read(indexPath);
  const refs = [];

  for (const line of text.split(/\r?\n/)) {
    const direct = line.match(/^\s*(design|specs|arrow):\s+(.+?)\s*$/);
    if (direct) refs.push(direct[2].trim());

    const inline = line.match(/^\s*(code|tests):\s+(.+?)\s*$/);
    if (inline) refs.push(...parseInlineList(inline[2]));
  }

  const fileRefs = refs.filter(ref => !ref.startsWith("npm "));
  for (const ref of fileRefs) {
    if (!exists(ref)) errors.push(`Missing arrow index reference: ${ref}`);
  }

  return { checked: refs.length };
}

function checkStyle() {
  const files = [
    "docs/high-level-design.md",
    "docs/traceability.md",
    "docs/lid-implementation-plan.md",
    ...walk("docs/intent", file => file.endsWith(".md")),
    ...walk("docs/arrows", file => file.endsWith(".md")),
  ].filter(exists);

  const banned = [
    /—/,
    /\bTransformative\b/i,
    /\bfostering\b/i,
    /\btapestry\b/i,
    /\bthis is about\b/i,
    /\ball about\b/i,
    /\bthink of\b/i,
    /\bparticularly\b/i,
    /\bcompelling\b/i,
    /\boften\b/i,
  ];

  let findings = 0;
  for (const file of files) {
    const text = read(file);
    for (const pattern of banned) {
      if (pattern.test(text)) {
        warnings.push(`Style term matched ${pattern} in ${file}`);
        findings += 1;
      }
    }
  }

  return { files: files.length, findings };
}

const annotatedFiles = collectAnnotatedFiles();
const intentCount = checkIntentPaths(annotatedFiles);
const specSummary = checkSpecIds(annotatedFiles);
const pairSummary = checkDesignSpecPairs();
const arrowSummary = checkArrowIndex();
const styleSummary = checkStyle();

console.log("LID check summary");
console.log(`annotated_files=${annotatedFiles.length}`);
console.log(`intent_refs=${intentCount}`);
console.log(`annotated_spec_ids=${specSummary.annotated}`);
console.log(`defined_spec_ids=${specSummary.defined}`);
console.log(`missing_spec_ids=${specSummary.missing}`);
console.log(`orphan_spec_ids=${specSummary.orphans}`);
console.log(`design_files=${pairSummary.designs}`);
console.log(`spec_files=${pairSummary.specs}`);
console.log(`arrow_refs=${arrowSummary.checked}`);
console.log(`style_files=${styleSummary.files}`);
console.log(`style_findings=${styleSummary.findings}`);

if (warnings.length) {
  console.log("\nWarnings");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error("\nErrors");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("\nLID check passed");

