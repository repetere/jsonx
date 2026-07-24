#!/usr/bin/env node
import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const templatePath = path.join(intentRoot, "external-gate-evidence.template.json");
const defaultEvidencePath = path.join(intentRoot, "external-gate-evidence.json");
const args = process.argv.slice(2);
const hostedMcpUrl = process.env.JSONX_RENDERER_MCP_URL || "https://jsonx-renderer-app.netlify.app/mcp";

const chatgptPromptIds = [
  "direct-ui-request",
  "text-only-request",
  "quiz-request",
  "poll-request",
  "bad-payload-request",
  "oversized-payload-request",
  "unsupported-component-request",
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

async function fileExists(filePath, mode = fsConstants.F_OK) {
  try {
    await fs.access(filePath, mode);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function submissionRecorded(entry) {
  return Boolean(entry?.submitted === true && (entry.submissionId || entry.url));
}

function promptPassed(prompts, id) {
  return Array.isArray(prompts) && prompts.some((prompt) => prompt.id === id && prompt.status === "passed");
}

function validateShape(source, data) {
  const errors = [];
  if (data.schemaVersion !== 1) errors.push("schemaVersion must be 1");
  if (!data.gates || typeof data.gates !== "object") errors.push("gates metadata is required");

  for (const section of ["appIds", "chatgptDeveloperMode", "claudeSmoke", "marketplaceSubmissions"]) {
    if (!data[section] || typeof data[section] !== "object") errors.push(`${section} is required`);
  }

  const appIds = data.appIds || {};
  for (const key of [
    "openaiCorePluginId",
    "openaiGenerativeUiAppId",
    "openaiGenerativeUiPluginId",
    "codexCorePluginId",
    "codexGenerativeUiPluginId",
    "codexGenerativeUiAppMetadataUpdated",
  ]) {
    if (!(key in appIds)) errors.push(`appIds.${key} is required`);
  }

  const chatgpt = data.chatgptDeveloperMode || {};
  if (!Array.isArray(chatgpt.promptsRun)) {
    errors.push("chatgptDeveloperMode.promptsRun must be an array");
  } else {
    for (const id of chatgptPromptIds) {
      if (!chatgpt.promptsRun.some((prompt) => prompt.id === id)) {
        errors.push(`chatgptDeveloperMode.promptsRun must include ${id}`);
      }
    }
  }

  const claude = data.claudeSmoke || {};
  for (const [key, promptId] of [
    ["core", "jsonx-core"],
    ["generativeUi", "jsonx-generative-ui"],
  ]) {
    const section = claude[key];
    if (!section || typeof section !== "object") {
      errors.push(`claudeSmoke.${key} is required`);
      continue;
    }
    if (!Array.isArray(section.promptsRun) || !section.promptsRun.some((prompt) => prompt.id === promptId)) {
      errors.push(`claudeSmoke.${key}.promptsRun must include ${promptId}`);
    }
  }

  const marketplace = data.marketplaceSubmissions || {};
  for (const key of ["policyReview", "openaiCore", "openaiGenerativeUi", "claudeCore", "claudeGenerativeUi"]) {
    if (!marketplace[key] || typeof marketplace[key] !== "object") {
      errors.push(`marketplaceSubmissions.${key} is required`);
    }
  }

  if (errors.length) {
    throw new Error(`${relative(source)} is not valid external gate evidence: ${errors.join("; ")}`);
  }
}

function buildStatus(data) {
  const appIds = data.appIds || {};
  const chatgpt = data.chatgptDeveloperMode || {};
  const claude = data.claudeSmoke || {};
  const marketplace = data.marketplaceSubmissions || {};
  const chatgptPrompts = Array.isArray(chatgpt.promptsRun) ? chatgpt.promptsRun : [];
  const claudeCorePrompts = Array.isArray(claude.core?.promptsRun) ? claude.core.promptsRun : [];
  const claudeGenerativeUiPrompts = Array.isArray(claude.generativeUi?.promptsRun) ? claude.generativeUi.promptsRun : [];

  const checks = {
    appIdsCaptured: Boolean(
      appIds.openaiCorePluginId &&
        appIds.openaiGenerativeUiAppId &&
        appIds.openaiGenerativeUiPluginId &&
        appIds.codexCorePluginId &&
        appIds.codexGenerativeUiPluginId,
    ),
    codexAppMetadataUpdated: appIds.codexGenerativeUiAppMetadataUpdated === true,
    chatgptMcpConnected: chatgpt.connectedMcpUrl === hostedMcpUrl,
    chatgptTranscriptCaptured: Boolean(chatgpt.transcriptUrl || chatgpt.transcriptArtifact),
    chatgptGoldenPromptsPassed: chatgptPromptIds.every((id) => promptPassed(chatgptPrompts, id)),
    claudeAuthenticatedSmokeRan: claude.core?.authenticated === true && claude.generativeUi?.authenticated === true,
    claudeSmokePromptsPassed:
      promptPassed(claudeCorePrompts, "jsonx-core") && promptPassed(claudeGenerativeUiPrompts, "jsonx-generative-ui"),
    openAiCoreSubmissionRecorded: submissionRecorded(marketplace.openaiCore),
    openAiGenerativeUiSubmissionRecorded: submissionRecorded(marketplace.openaiGenerativeUi),
    claudeCoreSubmissionRecorded: submissionRecorded(marketplace.claudeCore),
    claudeGenerativeUiSubmissionRecorded: submissionRecorded(marketplace.claudeGenerativeUi),
    policyReviewRecorded: Boolean(
      marketplace.policyReview?.status === "approved" && marketplace.policyReview.reviewedBy && marketplace.policyReview.reviewedAt,
    ),
  };

  const gates = {
    appIds: checks.appIdsCaptured && checks.codexAppMetadataUpdated ? "proved" : "pending",
    chatgptDeveloperMode:
      checks.chatgptMcpConnected && checks.chatgptTranscriptCaptured && checks.chatgptGoldenPromptsPassed ? "proved" : "pending",
    claudeSmoke: checks.claudeAuthenticatedSmokeRan && checks.claudeSmokePromptsPassed ? "proved" : "pending",
    marketplaceSubmission:
      checks.openAiCoreSubmissionRecorded &&
      checks.openAiGenerativeUiSubmissionRecorded &&
      checks.claudeCoreSubmissionRecorded &&
      checks.claudeGenerativeUiSubmissionRecorded &&
      checks.policyReviewRecorded
        ? "proved"
        : "pending",
  };

  return { checks, gates };
}

function pendingActions(status) {
  const actions = [];
  const { checks, gates } = status;

  if (gates.appIds !== "proved") {
    const missing = [];
    if (!checks.appIdsCaptured) {
      missing.push(
        "appIds.openaiCorePluginId",
        "appIds.openaiGenerativeUiAppId",
        "appIds.openaiGenerativeUiPluginId",
        "appIds.codexCorePluginId",
        "appIds.codexGenerativeUiPluginId",
      );
    }
    if (!checks.codexAppMetadataUpdated) missing.push("appIds.codexGenerativeUiAppMetadataUpdated");
    actions.push({ gate: "appIds", action: "Record approved app/plugin IDs and update generative UI Codex app metadata.", fields: missing });
  }

  if (gates.chatgptDeveloperMode !== "proved") {
    actions.push({
      gate: "chatgptDeveloperMode",
      action: `Connect ${hostedMcpUrl} in ChatGPT developer mode, run the golden prompts, and record transcript evidence.`,
      fields: ["chatgptDeveloperMode.connectedMcpUrl", "chatgptDeveloperMode.transcriptUrl", "chatgptDeveloperMode.promptsRun"],
    });
  }

  if (gates.claudeSmoke !== "proved") {
    actions.push({
      gate: "claudeSmoke",
      action: "Run authenticated Claude Code smoke prompts for both split Claude plugin packages.",
      fields: ["claudeSmoke.core", "claudeSmoke.generativeUi"],
    });
  }

  if (gates.marketplaceSubmission !== "proved") {
    actions.push({
      gate: "marketplaceSubmission",
      action: "Record human/policy approval and submission receipts for all four public package submissions.",
      fields: [
        "marketplaceSubmissions.policyReview",
        "marketplaceSubmissions.openaiCore",
        "marketplaceSubmissions.openaiGenerativeUi",
        "marketplaceSubmissions.claudeCore",
        "marketplaceSubmissions.claudeGenerativeUi",
      ],
    });
  }

  return actions;
}

async function resolveSource() {
  const requested = argValue("--source") || process.env.JSONX_EXTERNAL_GATE_EVIDENCE;
  if (requested) return path.resolve(repoRoot, requested);
  return (await fileExists(defaultEvidencePath)) ? defaultEvidencePath : templatePath;
}

function printHumanReport(report) {
  console.log("JSONX external gate evidence");
  console.log(`source: ${report.source}`);
  console.log(`supplied: ${report.supplied ? "yes" : "no"}`);
  console.log("");
  for (const [gate, status] of Object.entries(report.gates)) {
    console.log(`${gate}: ${status}`);
  }
  console.log("");
  if (!report.pending.length) {
    console.log("All external gates are proved.");
    return;
  }
  console.log("Pending actions:");
  for (const item of report.pending) {
    console.log(`- ${item.gate}: ${item.action}`);
    console.log(`  fields: ${item.fields.join(", ")}`);
  }
  console.log("");
  console.log("After updating evidence, regenerate artifacts:");
  console.log("node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs");
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs [--source <file>] [--json] [--strict]
  node docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs --init [--force]

Options:
  --init       Copy the template to docs/intent/generative-ui-plugin/external-gate-evidence.json.
  --force      Replace an existing external-gate-evidence.json when used with --init.
  --source     Read a specific evidence JSON file.
  --json       Print a machine-readable report.
  --strict     Exit non-zero if any external gate is still pending.
`);
    return;
  }

  if (hasArg("--init")) {
    if ((await fileExists(defaultEvidencePath)) && !hasArg("--force")) {
      throw new Error(`${relative(defaultEvidencePath)} already exists. Pass --force to replace it.`);
    }
    const template = await readJson(templatePath);
    await writeJson(defaultEvidencePath, template);
    console.log(`initialized ${relative(defaultEvidencePath)} from ${relative(templatePath)}`);
  }

  const source = await resolveSource();
  const data = await readJson(source);
  validateShape(source, data);
  const status = buildStatus(data);
  const report = {
    source: relative(source),
    supplied: source !== templatePath,
    checks: status.checks,
    gates: status.gates,
    pending: pendingActions(status),
  };

  if (hasArg("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReport(report);
  }

  if (hasArg("--strict") && report.pending.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
