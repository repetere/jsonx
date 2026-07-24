#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const args = process.argv.slice(2);

const expectedListingFiles = [
  "openai-jsonx-plugin-submission.json",
  "openai-generative-ui-plugin-submission.json",
  "claude-code-jsonx-submission.json",
  "claude-code-generative-ui-submission.json",
];

const requiredPublicEvidenceKeys = [
  "readinessChecklist",
  "artifactManifest",
  "submissionQueue",
  "reviewPackage",
  "storeListingCopy",
  "submissionAudit",
  "externalGateEvidence",
];

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

function resolveSourceDir() {
  return path.resolve(repoRoot, argValue("--source") || path.join("docs", "intent", "generative-ui-plugin", "store-listings"));
}

function withCacheBust(urlString) {
  const cacheBust = argValue("--cache-bust") || process.env.GITHUB_SHA || process.env.JSONX_REVIEW_KIT_CACHE_BUST;
  if (!cacheBust) return urlString;
  const url = new URL(urlString);
  url.searchParams.set("v", cacheBust);
  return url.toString();
}

function validatePublicEvidence(filePath, data) {
  const errors = [];
  const publicEvidence = data.publicEvidence || {};
  for (const key of requiredPublicEvidenceKeys) {
    const url = publicEvidence[key];
    if (!url || typeof url !== "string") {
      errors.push(`publicEvidence.${key} is required`);
      continue;
    }
    if (!url.startsWith("https://jsonx.net/")) {
      errors.push(`publicEvidence.${key} must start with https://jsonx.net/`);
    }
  }

  for (const [key, value] of Object.entries(publicEvidence)) {
    if (typeof value !== "string") {
      errors.push(`publicEvidence.${key} must be a string URL`);
      continue;
    }
    if (!value.startsWith("https://jsonx.net/")) {
      errors.push(`publicEvidence.${key} must start with https://jsonx.net/`);
    }
    if (value.endsWith("/")) {
      errors.push(`publicEvidence.${key} must point to a file URL, not a directory URL`);
    }
  }

  if (!Array.isArray(data.positiveTestCases) || data.positiveTestCases.length !== 5) {
    errors.push("positiveTestCases must contain exactly 5 cases");
  }
  if (!Array.isArray(data.negativeTestCases) || data.negativeTestCases.length !== 3) {
    errors.push("negativeTestCases must contain exactly 3 cases");
  }

  return {
    file: relative(filePath),
    surface: data.surface,
    submissionType: data.submissionType,
    pluginName: data.listing?.pluginName || data.listing?.displayName,
    publicEvidenceCount: Object.keys(publicEvidence).length,
    publicEvidence,
    errors,
  };
}

async function fetchUrl(urlString, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();
  try {
    const response = await fetch(withCacheBust(urlString), {
      headers: {
        "User-Agent": "jsonx-review-kit-check",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
    });
    const contentType = response.headers.get("content-type") || "";
    await response.arrayBuffer();
    return {
      url: urlString,
      status: response.status,
      ok: response.ok,
      contentType,
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      url: urlString,
      status: 0,
      ok: false,
      error: error.name === "AbortError" ? "timeout" : error.message,
      durationMs: Date.now() - startedAt,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function collectUrls(listings) {
  return [
    ...new Set(
      listings.flatMap((listing) =>
        Object.values(listing.publicEvidence || {}).filter((value) => typeof value === "string" && value.startsWith("https://jsonx.net/")),
      ),
    ),
  ].sort();
}

function printHumanReport(report) {
  console.log("JSONX public review kit");
  console.log(`source: ${report.source}`);
  console.log(`listingCount: ${report.listingCount}`);
  console.log(`urlCount: ${report.urlCount}`);
  console.log("");
  for (const listing of report.listings) {
    console.log(`${listing.file}`);
    console.log(`  plugin: ${listing.pluginName}`);
    console.log(`  publicEvidence: ${listing.publicEvidenceCount}`);
    if (listing.errors.length) {
      for (const error of listing.errors) console.log(`  error: ${error}`);
    }
  }
  if (report.network) {
    console.log("");
    console.log(`networkChecked: ${report.network.checked}`);
    console.log(`networkPassed: ${report.network.passed}`);
    for (const result of report.network.results.filter((item) => !item.ok)) {
      console.log(`networkError: ${result.status} ${result.url}${result.error ? ` (${result.error})` : ""}`);
    }
  }
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs [--source <dir>] [--json] [--network] [--strict]

Options:
  --source       Directory containing the four store listing JSON drafts.
  --json         Print a machine-readable report.
  --network      Fetch every publicEvidence URL and report HTTP status.
  --strict       Exit non-zero if any listing error or network error is present.
  --cache-bust   Append ?v=<value> when fetching public URLs.
  --timeout-ms   Per-URL network timeout. Defaults to 10000.
`);
    return;
  }

  const sourceDir = resolveSourceDir();
  const listings = [];
  for (const file of expectedListingFiles) {
    const filePath = path.join(sourceDir, file);
    listings.push(validatePublicEvidence(filePath, await readJson(filePath)));
  }

  const urls = collectUrls(listings);
  const report = {
    source: relative(sourceDir),
    listingCount: listings.length,
    urlCount: urls.length,
    listings,
    errors: listings.flatMap((listing) => listing.errors.map((error) => `${listing.file}: ${error}`)),
  };

  if (hasArg("--network")) {
    const timeoutMs = Number(argValue("--timeout-ms") || 10000);
    const results = [];
    for (const url of urls) {
      results.push(await fetchUrl(url, timeoutMs));
    }
    report.network = {
      checked: results.length,
      passed: results.filter((result) => result.ok).length,
      results,
      errors: results.filter((result) => !result.ok).map((result) => `${result.status} ${result.url}${result.error ? ` (${result.error})` : ""}`),
    };
  }

  if (hasArg("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReport(report);
  }

  const hasErrors = report.errors.length > 0 || (report.network?.errors?.length || 0) > 0;
  if (hasArg("--strict") && hasErrors) {
    process.exitCode = 1;
  } else if (report.errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
