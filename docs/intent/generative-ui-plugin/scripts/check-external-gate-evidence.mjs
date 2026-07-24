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
  "blocked-prop-request",
  "oversized-payload-request",
  "unsupported-component-request",
  "motion-request",
  "bad-motion-request",
];
const chatgptPromptIdSet = new Set(chatgptPromptIds);
const promptStatusValues = ["pending", "passed", "failed", "blocked"];
const promptStatusSet = new Set(promptStatusValues);

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

function allowedList(values) {
  return Array.from(values).join(", ");
}

function validatePromptList(errors, prompts, label, allowedIds, requiredIds) {
  if (!Array.isArray(prompts)) {
    errors.push(`${label} must be an array`);
    return;
  }

  const seen = new Set();
  for (const [index, prompt] of prompts.entries()) {
    if (!prompt || typeof prompt !== "object") {
      errors.push(`${label}[${index}] must be an object`);
      continue;
    }
    if (!allowedIds.has(prompt.id)) {
      errors.push(`${label}[${index}].id must be one of: ${allowedList(allowedIds)}`);
    } else if (seen.has(prompt.id)) {
      errors.push(`${label} contains duplicate id ${prompt.id}`);
    } else {
      seen.add(prompt.id);
    }
    if (!promptStatusSet.has(prompt.status)) {
      errors.push(`${label}[${index}].status must be one of: ${allowedList(promptStatusSet)}`);
    }
  }

  for (const id of requiredIds) {
    if (!seen.has(id)) errors.push(`${label} must include ${id}`);
  }
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
  validatePromptList(errors, chatgpt.promptsRun, "chatgptDeveloperMode.promptsRun", chatgptPromptIdSet, chatgptPromptIds);

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
    validatePromptList(errors, section.promptsRun, `claudeSmoke.${key}.promptsRun`, new Set([promptId]), [promptId]);
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

function recorderCommandsForGate(gate) {
  const recorder = "node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs";
  const commands = {
    appIds: [
      `${recorder} app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated`,
    ],
    chatgptDeveloperMode: [
      `${recorder} chatgpt --connected-mcp-url ${hostedMcpUrl} --transcript-url <url> --all-prompts-passed`,
    ],
    claudeSmoke: [
      `${recorder} claude-smoke --plugin core --authenticated --claude-version <version> --passed`,
      `${recorder} claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed`,
    ],
    marketplaceSubmission: [
      `${recorder} policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>`,
      `${recorder} marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>`,
      `${recorder} marketplace --target openai-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>`,
      `${recorder} marketplace --target claude-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>`,
      `${recorder} marketplace --target claude-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>`,
    ],
  };
  return commands[gate] || [];
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
    actions.push({
      gate: "appIds",
      action: "Record approved app/plugin IDs and update generative UI Codex app metadata.",
      fields: missing,
      recorderCommands: recorderCommandsForGate("appIds"),
    });
  }

  if (gates.chatgptDeveloperMode !== "proved") {
    actions.push({
      gate: "chatgptDeveloperMode",
      action: `Connect ${hostedMcpUrl} in ChatGPT developer mode, run the golden prompts, and record transcript evidence.`,
      fields: ["chatgptDeveloperMode.connectedMcpUrl", "chatgptDeveloperMode.transcriptUrl", "chatgptDeveloperMode.promptsRun"],
      recorderCommands: recorderCommandsForGate("chatgptDeveloperMode"),
    });
  }

  if (gates.claudeSmoke !== "proved") {
    actions.push({
      gate: "claudeSmoke",
      action: "Run authenticated Claude Code smoke prompts for both split Claude plugin packages.",
      fields: ["claudeSmoke.core", "claudeSmoke.generativeUi"],
      recorderCommands: recorderCommandsForGate("claudeSmoke"),
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
      recorderCommands: recorderCommandsForGate("marketplaceSubmission"),
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
    if (item.recorderCommands?.length) {
      console.log("  recorder commands:");
      for (const command of item.recorderCommands) console.log(`    ${command}`);
    }
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
