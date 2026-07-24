#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const args = process.argv.slice(2);
const timeoutMs = Number(process.env.JSONX_SOURCE_DOCS_TIMEOUT_MS || 15000);

const listingFiles = [
  "openai-jsonx-plugin-submission.json",
  "openai-generative-ui-plugin-submission.json",
  "claude-code-jsonx-submission.json",
  "claude-code-generative-ui-submission.json",
];

const requiredDocs = {
  "openai-jsonx-plugin-submission.json": [
    "https://developers.openai.com/codex/submit-plugins",
    "https://developers.openai.com/codex/build-plugins",
  ],
  "openai-generative-ui-plugin-submission.json": [
    "https://developers.openai.com/codex/submit-plugins",
    "https://developers.openai.com/codex/build-plugins",
    "https://developers.openai.com/apps-sdk/deploy/submission",
  ],
  "claude-code-jsonx-submission.json": [
    "https://code.claude.com/docs/en/plugins",
    "https://code.claude.com/docs/en/plugin-marketplaces",
    "https://github.com/anthropics/claude-plugins-community",
    "https://code.claude.com/docs/en/skills",
    "https://code.claude.com/docs/en/cli-reference",
  ],
  "claude-code-generative-ui-submission.json": [
    "https://code.claude.com/docs/en/plugins",
    "https://code.claude.com/docs/en/plugin-marketplaces",
    "https://github.com/anthropics/claude-plugins-community",
    "https://code.claude.com/docs/en/skills",
    "https://code.claude.com/docs/en/cli-reference",
  ],
};

function hasArg(name) {
  return args.includes(name);
}

function argValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function resolveListingsDir() {
  return path.resolve(repoRoot, argValue("--source") || path.join("docs", "intent", "generative-ui-plugin", "store-listings"));
}

function isAllowedDocsUrl(urlString) {
  try {
    const url = new URL(urlString);
    return (
      url.hostname === "developers.openai.com" ||
      url.hostname === "learn.chatgpt.com" ||
      url.hostname === "code.claude.com" ||
      (url.hostname === "github.com" && url.pathname.startsWith("/anthropics/claude-plugins-community"))
    );
  } catch {
    return false;
  }
}

async function fetchDoc(url) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "jsonx-submission-source-docs-check",
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    return {
      url,
      finalUrl: response.url,
      redirected: response.redirected,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get("content-type"),
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      url,
      finalUrl: "",
      redirected: false,
      status: 0,
      ok: false,
      error: error.name === "AbortError" ? "timeout" : error.message,
      durationMs: Date.now() - startedAt,
    };
  }
}

function buildErrors(checks) {
  return Object.entries(checks)
    .filter(([, value]) => value !== true)
    .map(([key]) => `${key} failed`);
}

function printHumanReport(report) {
  console.log("JSONX submission source docs");
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log(`listingCount: ${report.listingCount}`);
  console.log(`sourceDocUrlCount: ${report.sourceDocUrlCount}`);
  console.log("");
  for (const doc of report.sourceDocs) {
    console.log(`${doc.ok ? "ok" : "fail"} ${doc.status} ${doc.url}`);
    if (doc.redirected) console.log(`  final: ${doc.finalUrl}`);
    if (doc.error) console.log(`  error: ${doc.error}`);
  }
  if (report.errors.length) {
    console.log("");
    for (const error of report.errors) console.log(`error: ${error}`);
  }
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-submission-source-docs.mjs [--json] [--output <file>] [--source <dir>]

Verifies the public documentation URLs referenced by JSONX store listing drafts.
`);
    return;
  }

  const listingsDir = resolveListingsDir();
  const listings = [];
  const missingRequiredDocs = [];

  for (const fileName of listingFiles) {
    const filePath = path.join(listingsDir, fileName);
    const data = await readJson(filePath);
    const sourceDocsChecked = Array.isArray(data.sourceDocsChecked) ? data.sourceDocsChecked : [];
    const required = requiredDocs[fileName] || [];
    const missing = required.filter((url) => !sourceDocsChecked.includes(url));
    for (const url of missing) missingRequiredDocs.push({ listing: fileName, url });
    listings.push({
      file: relative(filePath),
      surface: data.surface,
      submissionType: data.submissionType,
      listingName: data.listing?.pluginName,
      sourceDocsChecked,
      requiredDocs: required,
      missingRequiredDocs: missing,
    });
  }

  const sourceDocUrls = [...new Set(listings.flatMap((listing) => listing.sourceDocsChecked))].sort();
  const sourceDocs = await Promise.all(sourceDocUrls.map((url) => fetchDoc(url)));
  const checks = {
    expectedListingCount: listings.length === listingFiles.length,
    allListingsHaveSourceDocs: listings.every((listing) => listing.sourceDocsChecked.length > 0),
    allRequiredDocsListed: missingRequiredDocs.length === 0,
    allDocsUseAllowedHosts: sourceDocUrls.every(isAllowedDocsUrl),
    allFinalDocUrlsUseAllowedHosts: sourceDocs.every((doc) => isAllowedDocsUrl(doc.finalUrl || doc.url)),
    allSourceDocsReachable: sourceDocs.every((doc) => doc.ok === true),
  };

  const report = {
    generatedAt: new Date().toISOString(),
    source: "store listing sourceDocsChecked URLs",
    listingsDir: relative(listingsDir),
    listingCount: listings.length,
    sourceDocUrlCount: sourceDocUrls.length,
    checks,
    errors: buildErrors(checks),
    missingRequiredDocs,
    listings,
    sourceDocs,
  };

  const output = argValue("--output");
  if (output) await writeJson(path.resolve(repoRoot, output), report);

  if (hasArg("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReport(report);
  }

  if (report.errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
