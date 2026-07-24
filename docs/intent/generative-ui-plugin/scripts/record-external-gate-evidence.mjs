#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const templatePath = path.join(intentRoot, "external-gate-evidence.template.json");
const defaultEvidencePath = path.join(intentRoot, "external-gate-evidence.json");
const args = process.argv.slice(2);

const chatgptPromptIds = [
  "direct-ui-request",
  "text-only-request",
  "quiz-request",
  "poll-request",
  "bad-payload-request",
  "oversized-payload-request",
  "unsupported-component-request",
];

const marketplaceTargets = {
  "openai-core": "openaiCore",
  "openai-generative-ui": "openaiGenerativeUi",
  "claude-core": "claudeCore",
  "claude-generative-ui": "claudeGenerativeUi",
};
const commands = new Set(["app-ids", "chatgpt", "claude-smoke", "policy-review", "marketplace"]);

function hasArg(name) {
  return args.includes(name);
}

function argValue(name) {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

function argValues(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) values.push(args[index + 1]);
  }
  return values;
}

function command() {
  return args.find((arg) => commands.has(arg));
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

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadEvidence(targetPath) {
  if (await fileExists(targetPath)) return readJson(targetPath);
  return readJson(templatePath);
}

function setIfPresent(object, key, value) {
  if (value !== undefined) object[key] = value;
}

function boolArg(name) {
  const value = argValue(name);
  if (value === undefined) return hasArg(name) ? true : undefined;
  return ["1", "true", "yes", "passed", "approved"].includes(String(value).toLowerCase());
}

function parsePromptStatus(value) {
  const [id, status] = value.split("=");
  if (!id || !status) throw new Error(`Prompt status must use id=status format: ${value}`);
  return { id, status };
}

function upsertPrompt(prompts, id, patch) {
  const index = prompts.findIndex((prompt) => prompt.id === id);
  if (index >= 0) {
    prompts[index] = { ...prompts[index], ...patch };
  } else {
    prompts.push({ id, ...patch });
  }
}

function recordAppIds(data) {
  const appIds = data.appIds || {};
  setIfPresent(appIds, "openaiCorePluginId", argValue("--openai-core-plugin-id"));
  setIfPresent(appIds, "openaiGenerativeUiAppId", argValue("--openai-generative-ui-app-id"));
  setIfPresent(appIds, "openaiGenerativeUiPluginId", argValue("--openai-generative-ui-plugin-id"));
  setIfPresent(appIds, "codexCorePluginId", argValue("--codex-core-plugin-id"));
  setIfPresent(appIds, "codexGenerativeUiPluginId", argValue("--codex-generative-ui-plugin-id"));
  const metadataUpdated = boolArg("--codex-app-metadata-updated");
  if (metadataUpdated !== undefined) appIds.codexGenerativeUiAppMetadataUpdated = metadataUpdated;
  setIfPresent(appIds, "notes", argValue("--notes"));
  data.appIds = appIds;
}

function recordChatgpt(data) {
  const chatgpt = data.chatgptDeveloperMode || {};
  setIfPresent(chatgpt, "connectedMcpUrl", argValue("--connected-mcp-url"));
  setIfPresent(chatgpt, "transcriptUrl", argValue("--transcript-url"));
  setIfPresent(chatgpt, "transcriptArtifact", argValue("--transcript-artifact"));
  setIfPresent(chatgpt, "notes", argValue("--notes"));
  const prompts = Array.isArray(chatgpt.promptsRun) ? chatgpt.promptsRun : [];
  if (hasArg("--all-prompts-passed")) {
    for (const id of chatgptPromptIds) upsertPrompt(prompts, id, { status: "passed" });
  }
  for (const value of argValues("--prompt")) {
    const prompt = parsePromptStatus(value);
    upsertPrompt(prompts, prompt.id, { status: prompt.status });
  }
  chatgpt.promptsRun = prompts;
  data.chatgptDeveloperMode = chatgpt;
}

function recordClaudeSmoke(data) {
  const plugin = argValue("--plugin") || "both";
  if (!["core", "generative-ui", "both"].includes(plugin)) {
    throw new Error("--plugin must be core, generative-ui, or both");
  }
  const claudeSmoke = data.claudeSmoke || {};
  const targets = [];
  if (plugin === "core" || plugin === "both") targets.push(["core", "jsonx-core"]);
  if (plugin === "generative-ui" || plugin === "both") targets.push(["generativeUi", "jsonx-generative-ui"]);
  for (const [key, promptId] of targets) {
    const section = claudeSmoke[key] || {};
    const authenticated = boolArg("--authenticated");
    if (authenticated !== undefined) section.authenticated = authenticated;
    setIfPresent(section, "claudeVersion", argValue("--claude-version"));
    setIfPresent(section, "command", argValue("--command"));
    const prompts = Array.isArray(section.promptsRun) ? section.promptsRun : [];
    const status = argValue("--status") || (hasArg("--passed") ? "passed" : undefined);
    if (status) upsertPrompt(prompts, promptId, { status });
    setIfPresent(section, "notes", argValue("--notes"));
    section.promptsRun = prompts;
    claudeSmoke[key] = section;
  }
  data.claudeSmoke = claudeSmoke;
}

function recordPolicyReview(data) {
  const marketplace = data.marketplaceSubmissions || {};
  const policyReview = marketplace.policyReview || {};
  setIfPresent(policyReview, "status", argValue("--status"));
  setIfPresent(policyReview, "reviewedBy", argValue("--reviewed-by"));
  setIfPresent(policyReview, "reviewedAt", argValue("--reviewed-at"));
  setIfPresent(policyReview, "notes", argValue("--notes"));
  marketplace.policyReview = policyReview;
  data.marketplaceSubmissions = marketplace;
}

function recordMarketplace(data) {
  const target = argValue("--target");
  const key = marketplaceTargets[target];
  if (!key) throw new Error(`--target must be one of: ${Object.keys(marketplaceTargets).join(", ")}`);
  const marketplace = data.marketplaceSubmissions || {};
  const submission = marketplace[key] || {};
  const submitted = boolArg("--submitted");
  if (submitted !== undefined) submission.submitted = submitted;
  setIfPresent(submission, "submissionId", argValue("--submission-id"));
  setIfPresent(submission, "url", argValue("--url"));
  setIfPresent(submission, "status", argValue("--status"));
  setIfPresent(submission, "submittedAt", argValue("--submitted-at"));
  setIfPresent(submission, "notes", argValue("--notes"));
  marketplace[key] = submission;
  data.marketplaceSubmissions = marketplace;
}

function validateShape(data) {
  const requiredTopLevel = ["schemaVersion", "gates", "appIds", "chatgptDeveloperMode", "claudeSmoke", "marketplaceSubmissions"];
  const missing = requiredTopLevel.filter((key) => data[key] === undefined);
  if (missing.length) throw new Error(`Evidence is missing required fields: ${missing.join(", ")}`);
}

function printHelp() {
  console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs <command> [options]

Commands:
  app-ids        Record approved app/plugin IDs.
  chatgpt        Record ChatGPT developer-mode connection and prompt results.
  claude-smoke   Record authenticated Claude Code smoke prompt results.
  policy-review  Record human/legal review.
  marketplace    Record one public marketplace submission receipt.

Common options:
  --target-file <file>       Evidence file to update. Defaults to docs/intent/generative-ui-plugin/external-gate-evidence.json.
  --dry-run                  Print the updated evidence without writing.
  --json                     Print a machine-readable result.

Examples:
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs chatgpt --connected-mcp-url https://jsonx-renderer-app.netlify.app/mcp --transcript-url <url> --all-prompts-passed
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin both --authenticated --claude-version <version> --passed
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at 2026-07-24
  node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at 2026-07-24
`);
}

async function main() {
  if (hasArg("--help") || hasArg("-h") || !command()) {
    printHelp();
    return;
  }

  const targetPath = path.resolve(repoRoot, argValue("--target-file") || defaultEvidencePath);
  const data = await loadEvidence(targetPath);
  const selectedCommand = command();

  if (selectedCommand === "app-ids") {
    recordAppIds(data);
  } else if (selectedCommand === "chatgpt") {
    recordChatgpt(data);
  } else if (selectedCommand === "claude-smoke") {
    recordClaudeSmoke(data);
  } else if (selectedCommand === "policy-review") {
    recordPolicyReview(data);
  } else if (selectedCommand === "marketplace") {
    recordMarketplace(data);
  } else {
    throw new Error(`Unknown command: ${selectedCommand}`);
  }

  validateShape(data);

  if (!hasArg("--dry-run")) {
    await writeJson(targetPath, data);
  }

  const result = {
    target: relative(targetPath),
    command: selectedCommand,
    written: !hasArg("--dry-run"),
    next: [
      `node docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs --source ${relative(targetPath)}`,
      "node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs",
    ],
  };

  if (hasArg("--json")) {
    console.log(JSON.stringify({ ...result, evidence: data }, null, 2));
  } else {
    console.log(`${hasArg("--dry-run") ? "prepared" : "updated"} ${relative(targetPath)} for ${selectedCommand}`);
    console.log("Next:");
    for (const item of result.next) console.log(`- ${item}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
