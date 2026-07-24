#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const args = process.argv.slice(2);
const repository = "repetere/jsonx";
const trackerPath = path.join(intentRoot, "github-issues.md");
const timeoutMs = Number(process.env.JSONX_GITHUB_ISSUE_TIMEOUT_MS || 15000);

const expectedIssues = [
  { number: 1110, workstream: "Shared contract" },
  { number: 1111, workstream: "Hosted renderer app" },
  { number: 1112, workstream: "Codex plugins" },
  { number: 1113, workstream: "Claude Code and OpenCode skills" },
  { number: 1114, workstream: "Renderer motion" },
  { number: 1115, workstream: "Store submission" },
  { number: 1116, workstream: "GitHub Pages" },
  { number: 1117, workstream: "Browser demo" },
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

async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchIssue(number) {
  const url = `https://api.github.com/repos/${repository}/issues/${number}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jsonx-github-issue-tracking-check",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const startedAt = Date.now();
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      number,
      apiUrl: url,
      status: response.status,
      ok: false,
      error: body.message || `HTTP ${response.status}`,
      durationMs: Date.now() - startedAt,
    };
  }
  return {
    number: body.number,
    title: body.title,
    state: body.state,
    htmlUrl: body.html_url,
    labels: (body.labels || []).map((label) => label.name).sort(),
    createdAt: body.created_at,
    updatedAt: body.updated_at,
    apiUrl: url,
    status: response.status,
    ok: true,
    durationMs: Date.now() - startedAt,
  };
}

function buildErrors(checks) {
  return Object.entries(checks)
    .filter(([, value]) => value !== true)
    .map(([key]) => `${key} failed`);
}

function printHumanReport(report) {
  console.log("JSONX GitHub issue tracking");
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log(`repository: ${report.repository}`);
  console.log(`tracker: ${report.tracker}`);
  console.log(`issueCount: ${report.issueCount}`);
  console.log("");
  for (const issue of report.issues) {
    console.log(`#${issue.number} ${issue.state || "missing"} ${issue.workstream}`);
    console.log(`  ${issue.title || issue.error || "No title"}`);
    console.log(`  labels: ${(issue.labels || []).join(", ") || "none"}`);
  }
  if (report.errors.length) {
    console.log("");
    for (const error of report.errors) console.log(`error: ${error}`);
  }
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-github-issue-tracking.mjs [--json] [--output <file>]

Fetches JSONX generative UI tracking issues from GitHub and verifies they are open
feature enhancement issues linked from docs/intent/generative-ui-plugin/github-issues.md.
`);
    return;
  }

  const tracker = await readText(trackerPath);
  const fetched = await Promise.all(expectedIssues.map((issue) => fetchIssue(issue.number)));
  const issueMap = new Map(fetched.map((issue) => [issue.number, issue]));
  const issues = expectedIssues.map((expected) => {
    const issue = issueMap.get(expected.number) || { number: expected.number, ok: false };
    const expectedUrl = `https://github.com/${repository}/issues/${expected.number}`;
    return {
      ...issue,
      workstream: expected.workstream,
      expectedUrl,
      trackerListed: tracker.includes(`#${expected.number}`) && tracker.includes(expectedUrl),
      workstreamListed: tracker.includes(expected.workstream),
      enhancementLabelPresent: (issue.labels || []).includes("enhancement"),
      codexLabelPresent: (issue.labels || []).includes("codex"),
      urlMatches: issue.htmlUrl === expectedUrl,
    };
  });

  const checks = {
    trackerFileReadable: tracker.length > 0,
    expectedIssueCount: issues.length === expectedIssues.length,
    allIssueNumbersListed: issues.every((issue) => issue.trackerListed),
    allWorkstreamsListed: issues.every((issue) => issue.workstreamListed),
    allIssuesFetched: issues.every((issue) => issue.ok === true),
    allIssuesOpen: issues.every((issue) => issue.state === "open"),
    allIssuesLabeledEnhancement: issues.every((issue) => issue.enhancementLabelPresent),
    allIssuesLabeledCodex: issues.every((issue) => issue.codexLabelPresent),
    allUrlsMatch: issues.every((issue) => issue.urlMatches),
    allTitlesPresent: issues.every((issue) => typeof issue.title === "string" && issue.title.length > 0),
  };

  const report = {
    generatedAt: new Date().toISOString(),
    source: "GitHub Issues API",
    repository,
    tracker: relative(trackerPath),
    issueCount: issues.length,
    expectedIssueNumbers: expectedIssues.map((issue) => issue.number),
    checks,
    errors: buildErrors(checks),
    issues,
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
