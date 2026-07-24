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
  "externalGateRunbook",
];

const defaultPublicPagePath = path.join("docs", "generative-ui.html");
const defaultPublicPageUrl = "https://jsonx.net/generative-ui.html";
const defaultSubmissionQueuePath = path.join(
  "docs",
  "intent",
  "generative-ui-plugin",
  "submission-artifacts",
  "current",
  "submission-queue.json",
);
const defaultExternalGateRunbookPath = path.join(
  "docs",
  "intent",
  "generative-ui-plugin",
  "submission-artifacts",
  "current",
  "external-gates.md",
);
const defaultSubmissionFormsDir = path.join(
  "docs",
  "intent",
  "generative-ui-plugin",
  "submission-artifacts",
  "current",
  "submission-forms",
);

const requiredPublicPageText = [
  "JSONX turns AI responses into live interfaces.",
  "jsonx-codex-plugin",
  "jsonx-generative-ui-plugin",
  "claude-jsonx-plugin",
  "claude-jsonx-generative-ui-plugin",
  "https://jsonx-renderer-app.netlify.app/mcp",
  "Submission packages, listing drafts, and evidence are published together.",
  "recorder commands to run",
];

const blockedPublicPageText = [
  "without this site running a backend",
  "no MCP server exists",
  "Fixture and paste modes need no API key",
];

const expectedSubmissionPortals = {
  "openai-plugin-portal": "https://platform.openai.com/plugins",
  "claude-code-community-marketplace": "https://platform.claude.com/plugins/submit",
};

const requiredPublicPageLinks = [
  { id: "demo", href: "#demo" },
  { id: "skills", href: "#skills" },
  { id: "plugins", href: "#plugins" },
  { id: "review", href: "#review" },
  {
    id: "submissionQueueMarkdown",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md",
  },
  {
    id: "submissionQueueJson",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json",
  },
  {
    id: "externalGateRunbook",
    href: "intent/generative-ui-plugin/submission-artifacts/current/external-gates.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md",
  },
  {
    id: "openAiCorePortalPacket",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-core-jsonx.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-core-jsonx.md",
  },
  {
    id: "openAiGenerativeUiPortalPacket",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-generative-ui.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-generative-ui.md",
  },
  {
    id: "claudeCorePortalPacket",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-core-jsonx.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-core-jsonx.md",
  },
  {
    id: "claudeGenerativeUiPortalPacket",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-generative-ui.md",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-generative-ui.md",
  },
  {
    id: "artifactManifest",
    href: "intent/generative-ui-plugin/submission-artifacts/current/manifest.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json",
  },
  {
    id: "submissionAudit",
    href: "intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json",
  },
  {
    id: "openAiCoreListing",
    href: "intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json",
  },
  {
    id: "openAiGenerativeUiListing",
    href: "intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json",
  },
  {
    id: "claudeCoreListing",
    href: "intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json",
  },
  {
    id: "claudeGenerativeUiListing",
    href: "intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json",
    url: "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json",
  },
  {
    id: "receiptRecorder",
    href: "intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs",
    url: "https://jsonx.net/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs",
  },
  {
    id: "goalAudit",
    href: "intent/generative-ui-plugin/scripts/audit-generative-ui-goal.mjs",
    url: "https://jsonx.net/intent/generative-ui-plugin/scripts/audit-generative-ui-goal.mjs",
  },
  {
    id: "externalGateChecker",
    href: "intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs",
    url: "https://jsonx.net/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs",
  },
  {
    id: "publicUrlChecker",
    href: "intent/generative-ui-plugin/scripts/check-public-review-kit.mjs",
    url: "https://jsonx.net/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs",
  },
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

function resolvePublicPagePath() {
  return path.resolve(repoRoot, argValue("--page") || defaultPublicPagePath);
}

function resolveSubmissionQueuePath() {
  return path.resolve(repoRoot, argValue("--queue") || defaultSubmissionQueuePath);
}

function resolveSubmissionFormsDir(queuePath) {
  const requested = argValue("--forms");
  if (requested) return path.resolve(repoRoot, requested);
  if (queuePath === path.resolve(repoRoot, defaultSubmissionQueuePath)) return path.resolve(repoRoot, defaultSubmissionFormsDir);
  return path.join(path.dirname(queuePath), "submission-forms");
}

function resolveExternalGateRunbookPath(queuePath) {
  const requested = argValue("--gates");
  if (requested) return path.resolve(repoRoot, requested);
  if (queuePath === path.resolve(repoRoot, defaultSubmissionQueuePath)) return path.resolve(repoRoot, defaultExternalGateRunbookPath);
  return path.join(path.dirname(queuePath), "external-gates.md");
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
  if (!data.submissionPortal?.primaryUrl) {
    errors.push("submissionPortal.primaryUrl is required");
  } else {
    const expectedPortal = expectedSubmissionPortals[data.surface];
    if (expectedPortal && data.submissionPortal.primaryUrl !== expectedPortal) {
      errors.push(`submissionPortal.primaryUrl must be ${expectedPortal}`);
    }
  }
  if (!data.submissionPortal?.documentedFlow) {
    errors.push("submissionPortal.documentedFlow is required");
  }
  if (!data.submissionPortal?.requiredAccess) {
    errors.push("submissionPortal.requiredAccess is required");
  }
  if (!data.submissionPortal?.submissionAction) {
    errors.push("submissionPortal.submissionAction is required");
  }
  if (data.surface === "claude-code-community-marketplace") {
    const alternateUrls = data.submissionPortal?.alternateUrls || [];
    if (!alternateUrls.includes("https://claude.ai/admin-settings/directory/submissions/plugins/new")) {
      errors.push("Claude submissionPortal.alternateUrls must include the claude.ai organization form");
    }
    if (!alternateUrls.includes("https://clau.de/plugin-directory-submission")) {
      errors.push("Claude submissionPortal.alternateUrls must include the public directory submission redirect");
    }
  }

  return {
    file: relative(filePath),
    surface: data.surface,
    submissionType: data.submissionType,
    pluginName: data.listing?.pluginName || data.listing?.displayName,
    publicEvidenceCount: Object.keys(publicEvidence).length,
    submissionPortal: data.submissionPortal,
    publicEvidence,
    errors,
  };
}

function validateSubmissionQueue(filePath, data) {
  const errors = [];
  const commands = data.externalGateRecorderCommands || {};
  for (const key of ["appIds", "chatgptDeveloperMode", "claudeSmoke", "policyReview"]) {
    if (!Array.isArray(commands[key]) || commands[key].length === 0) {
      errors.push(`externalGateRecorderCommands.${key} must contain at least one command`);
    } else if (!commands[key].every((command) => command.includes("record-external-gate-evidence.mjs"))) {
      errors.push(`externalGateRecorderCommands.${key} must use record-external-gate-evidence.mjs`);
    }
  }

  if (!Array.isArray(data.submissions) || data.submissions.length !== 4) {
    errors.push("submissions must contain exactly 4 submissions");
  } else {
    for (const submission of data.submissions) {
      if (!submission.receiptRecorderCommand?.includes("record-external-gate-evidence.mjs marketplace --target")) {
        errors.push(`${submission.id || "submission"} must include a marketplace receipt recorder command`);
      }
      if (!submission.portalForm?.startsWith("https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/")) {
        errors.push(`${submission.id || "submission"} must link to a public portal packet`);
      }
      if (!submission.submissionPortal?.primaryUrl) {
        errors.push(`${submission.id || "submission"} must include submissionPortal.primaryUrl`);
      }
      if (!Array.isArray(submission.submissionPortalUrls) || !submission.submissionPortalUrls.includes(submission.submissionPortal?.primaryUrl)) {
        errors.push(`${submission.id || "submission"} must include its primary portal in submissionPortalUrls`);
      }
      if (submission.id?.startsWith("openai-") && submission.submissionPortal?.primaryUrl !== expectedSubmissionPortals["openai-plugin-portal"]) {
        errors.push(`${submission.id} must use the OpenAI plugin submission portal`);
      }
      if (submission.id?.startsWith("claude-") && submission.submissionPortal?.primaryUrl !== expectedSubmissionPortals["claude-code-community-marketplace"]) {
        errors.push(`${submission.id} must use the Claude Console plugin submission portal`);
      }
    }
  }

  return {
    file: relative(filePath),
    submissionCount: Array.isArray(data.submissions) ? data.submissions.length : 0,
    portalFormCount: Array.isArray(data.submissions) ? data.submissions.filter((submission) => submission.portalForm).length : 0,
    submissionPortalCount: Array.isArray(data.submissions) ? data.submissions.filter((submission) => submission.submissionPortal?.primaryUrl).length : 0,
    sharedRecorderCommandGroupCount: Object.keys(commands).length,
    errors,
  };
}

async function validateSubmissionForms(dirPath, queue) {
  const errors = [];
  const files = [];
  const submissions = Array.isArray(queue.submissions) ? queue.submissions : [];

  for (const submission of submissions) {
    const filePath = path.join(dirPath, `${submission.id}.md`);
    let markdown = "";
    try {
      markdown = await fs.readFile(filePath, "utf8");
    } catch (error) {
      errors.push(`${submission.id || "submission"} portal packet is missing: ${error.message}`);
      continue;
    }

    const requiredText = [
      `# ${submission.label} Portal Packet`,
      "## Submission Portal",
      submission.submissionPortal?.primaryUrl,
      "## Listing Copy",
      "## Public Evidence URLs",
      "## Recorder Commands",
      submission.receiptRecorderCommand,
    ].filter(Boolean);
    for (const text of requiredText) {
      if (!markdown.includes(text)) errors.push(`${submission.id || "submission"} portal packet missing: ${text}`);
    }

    files.push({
      id: submission.id,
      label: submission.label,
      file: relative(filePath),
      bytes: Buffer.byteLength(markdown),
    });
  }
  if (files.length !== 4) errors.push(`portal packet count must be 4, found ${files.length}`);

  return {
    dir: relative(dirPath),
    packetCount: files.length,
    files,
    errors,
  };
}

async function validateExternalGateRunbook(filePath, queue) {
  const errors = [];
  let markdown = "";
  try {
    markdown = await fs.readFile(filePath, "utf8");
  } catch (error) {
    return {
      file: relative(filePath),
      gateCount: 0,
      recorderCommandCount: 0,
      portalPacketCount: 0,
      errors: [`external gate runbook is missing: ${error.message}`],
    };
  }

  const requiredText = [
    "# JSONX External Gate Runbook",
    "## Current Gate Status",
    "## Gate 1: Approved App And Plugin IDs",
    "## Gate 2: ChatGPT Developer Mode Transcript",
    "## Gate 3: Claude Code Authenticated Smoke",
    "## Gate 4: Policy Review And Marketplace Receipts",
    "record-external-gate-evidence.mjs",
    "direct-ui-request",
    "motion-request",
    "jsonx-core",
    "jsonx-generative-ui",
  ];
  for (const text of requiredText) {
    if (!markdown.includes(text)) errors.push(`external gate runbook missing: ${text}`);
  }

  for (const gate of ["appIds", "chatgptDeveloperMode", "claudeSmoke", "marketplaceSubmission"]) {
    if (!markdown.includes(`| ${gate} |`)) errors.push(`external gate runbook missing gate row: ${gate}`);
  }

  const commandGroups = queue.externalGateRecorderCommands || {};
  const sharedCommands = Object.values(commandGroups).flat().filter(Boolean);
  for (const command of sharedCommands) {
    if (!markdown.includes(command)) errors.push(`external gate runbook missing recorder command: ${command}`);
  }

  const submissions = Array.isArray(queue.submissions) ? queue.submissions : [];
  for (const submission of submissions) {
    if (!markdown.includes(submission.portalForm)) errors.push(`${submission.id || "submission"} portal packet missing from external gate runbook`);
    if (!submission.submissionPortal?.primaryUrl) {
      errors.push(`${submission.id || "submission"} submission portal is missing from queue data`);
    } else if (!markdown.includes(submission.submissionPortal.primaryUrl)) {
      errors.push(`${submission.id || "submission"} submission portal missing from external gate runbook`);
    }
    if (!markdown.includes(submission.receiptRecorderCommand)) {
      errors.push(`${submission.id || "submission"} receipt recorder command missing from external gate runbook`);
    }
  }

  return {
    file: relative(filePath),
    gateCount: ["appIds", "chatgptDeveloperMode", "claudeSmoke", "marketplaceSubmission"].filter((gate) =>
      markdown.includes(`| ${gate} |`),
    ).length,
    recorderCommandCount: [...new Set([...sharedCommands, ...submissions.map((submission) => submission.receiptRecorderCommand)])].filter(
      (command) => command && markdown.includes(command),
    ).length,
    portalPacketCount: submissions.filter((submission) => submission.portalForm && markdown.includes(submission.portalForm)).length,
    submissionPortalCount: submissions.filter((submission) => submission.submissionPortal?.primaryUrl && markdown.includes(submission.submissionPortal.primaryUrl)).length,
    errors,
  };
}

async function validatePublicPage(filePath) {
  const html = await fs.readFile(filePath, "utf8");
  const errors = [];

  for (const text of requiredPublicPageText) {
    if (!html.includes(text)) errors.push(`missing required public page text: ${text}`);
  }

  for (const text of blockedPublicPageText) {
    if (html.includes(text)) errors.push(`blocked public page text is present: ${text}`);
  }

  for (const link of requiredPublicPageLinks) {
    if (!html.includes(`href="${link.href}"`) && !html.includes(`href='${link.href}'`)) {
      errors.push(`missing required public page link ${link.id}: ${link.href}`);
    }
  }

  return {
    file: relative(filePath),
    requiredTextCount: requiredPublicPageText.length,
    requiredLinkCount: requiredPublicPageLinks.length,
    publicLinkedUrlCount: requiredPublicPageLinks.filter((link) => link.url).length,
    blockedTextCount: blockedPublicPageText.length,
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

async function fetchPublicPage(urlString, timeoutMs) {
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
    const html = await response.text();
    const errors = [];

    if (!response.ok) errors.push(`HTTP ${response.status}`);
    for (const text of requiredPublicPageText) {
      if (!html.includes(text)) errors.push(`missing required public page text: ${text}`);
    }
    for (const text of blockedPublicPageText) {
      if (html.includes(text)) errors.push(`blocked public page text is present: ${text}`);
    }
    for (const link of requiredPublicPageLinks) {
      if (!html.includes(`href="${link.href}"`) && !html.includes(`href='${link.href}'`)) {
        errors.push(`missing required public page link ${link.id}: ${link.href}`);
      }
    }

    return {
      url: urlString,
      status: response.status,
      ok: response.ok && errors.length === 0,
      contentType,
      durationMs: Date.now() - startedAt,
      errors,
    };
  } catch (error) {
    return {
      url: urlString,
      status: 0,
      ok: false,
      error: error.name === "AbortError" ? "timeout" : error.message,
      durationMs: Date.now() - startedAt,
      errors: [error.name === "AbortError" ? "timeout" : error.message],
    };
  } finally {
    clearTimeout(timeout);
  }
}

function collectUrls(listings) {
  return [
    ...new Set(
      [
        ...listings.flatMap((listing) =>
          Object.values(listing.publicEvidence || {}).filter((value) => typeof value === "string" && value.startsWith("https://jsonx.net/")),
        ),
        ...requiredPublicPageLinks.map((link) => link.url).filter(Boolean),
      ],
    ),
  ].sort();
}

function printHumanReport(report) {
  console.log("JSONX public review kit");
  console.log(`source: ${report.source}`);
  console.log(`listingCount: ${report.listingCount}`);
  console.log(`urlCount: ${report.urlCount}`);
  console.log(`publicPage: ${report.publicPage.file}`);
  console.log("");
  if (report.publicPage.errors.length) {
    for (const error of report.publicPage.errors) console.log(`publicPageError: ${error}`);
  }
  console.log(`submissionQueue: ${report.submissionQueue.file}`);
  console.log(`  submissions: ${report.submissionQueue.submissionCount}`);
  console.log(`  portalForms: ${report.submissionQueue.portalFormCount}`);
  console.log(`  submissionPortals: ${report.submissionQueue.submissionPortalCount}`);
  console.log(`  recorderCommandGroups: ${report.submissionQueue.sharedRecorderCommandGroupCount}`);
  if (report.submissionQueue.errors.length) {
    for (const error of report.submissionQueue.errors) console.log(`  error: ${error}`);
  }
  console.log(`submissionForms: ${report.submissionForms.dir}`);
  console.log(`  packets: ${report.submissionForms.packetCount}`);
  if (report.submissionForms.errors.length) {
    for (const error of report.submissionForms.errors) console.log(`  error: ${error}`);
  }
  console.log(`externalGates: ${report.externalGateRunbook.file}`);
  console.log(`  gates: ${report.externalGateRunbook.gateCount}`);
  console.log(`  recorderCommands: ${report.externalGateRunbook.recorderCommandCount}`);
  console.log(`  portalPackets: ${report.externalGateRunbook.portalPacketCount}`);
  console.log(`  submissionPortals: ${report.externalGateRunbook.submissionPortalCount}`);
  if (report.externalGateRunbook.errors.length) {
    for (const error of report.externalGateRunbook.errors) console.log(`  error: ${error}`);
  }
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
    for (const error of report.network.errors) console.log(`networkError: ${error}`);
  }
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs [--source <dir>] [--json] [--network] [--strict]

Options:
  --source       Directory containing the four store listing JSON drafts.
  --page         Public page HTML to validate. Defaults to docs/generative-ui.html.
  --queue        Submission queue JSON to validate. Defaults to docs/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json.
  --forms        Directory containing portal packet Markdown files. Defaults to a submission-forms sibling next to --queue.
  --gates        External gate runbook Markdown to validate. Defaults to an external-gates.md sibling next to --queue.
  --page-url     Public page URL to fetch with --network. Defaults to https://jsonx.net/generative-ui.html.
  --json         Print a machine-readable report.
  --network      Fetch every publicEvidence URL and report HTTP status.
  --strict       Exit non-zero if any listing error or network error is present.
  --cache-bust   Append ?v=<value> when fetching public URLs.
  --timeout-ms   Per-URL network timeout. Defaults to 10000.
`);
    return;
  }

  const sourceDir = resolveSourceDir();
  const publicPagePath = resolvePublicPagePath();
  const submissionQueuePath = resolveSubmissionQueuePath();
  const submissionFormsDir = resolveSubmissionFormsDir(submissionQueuePath);
  const externalGateRunbookPath = resolveExternalGateRunbookPath(submissionQueuePath);
  const listings = [];
  for (const file of expectedListingFiles) {
    const filePath = path.join(sourceDir, file);
    listings.push(validatePublicEvidence(filePath, await readJson(filePath)));
  }
  const publicPage = await validatePublicPage(publicPagePath);
  const submissionQueueData = await readJson(submissionQueuePath);
  const submissionQueue = validateSubmissionQueue(submissionQueuePath, submissionQueueData);
  const submissionForms = await validateSubmissionForms(submissionFormsDir, submissionQueueData);
  const externalGateRunbook = await validateExternalGateRunbook(externalGateRunbookPath, submissionQueueData);

  const urls = collectUrls(listings);
  const report = {
    source: relative(sourceDir),
    listingCount: listings.length,
    urlCount: urls.length,
    publicPage,
    submissionQueue,
    submissionForms,
    externalGateRunbook,
    listings,
    errors: [
      ...publicPage.errors.map((error) => `${publicPage.file}: ${error}`),
      ...submissionQueue.errors.map((error) => `${submissionQueue.file}: ${error}`),
      ...submissionForms.errors.map((error) => `${submissionForms.dir}: ${error}`),
      ...externalGateRunbook.errors.map((error) => `${externalGateRunbook.file}: ${error}`),
      ...listings.flatMap((listing) => listing.errors.map((error) => `${listing.file}: ${error}`)),
    ],
  };

  if (hasArg("--network")) {
    const timeoutMs = Number(argValue("--timeout-ms") || 10000);
    const pageUrl = argValue("--page-url") || defaultPublicPageUrl;
    const pageNetwork = await fetchPublicPage(pageUrl, timeoutMs);
    const results = [];
    for (const url of urls) {
      results.push(await fetchUrl(url, timeoutMs));
    }
    report.network = {
      checked: results.length + 1,
      passed: results.filter((result) => result.ok).length + (pageNetwork.ok ? 1 : 0),
      publicPage: pageNetwork,
      results,
      errors: [
        ...(pageNetwork.ok
          ? []
          : [`${pageNetwork.status} ${pageNetwork.url}${pageNetwork.errors.length ? ` (${pageNetwork.errors.join("; ")})` : ""}`]),
        ...results.filter((result) => !result.ok).map((result) => `${result.status} ${result.url}${result.error ? ` (${result.error})` : ""}`),
      ],
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
