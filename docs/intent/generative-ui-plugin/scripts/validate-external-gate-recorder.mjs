#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const templatePath = path.join(intentRoot, "external-gate-evidence.template.json");
const recorderPath = path.join(scriptDir, "record-external-gate-evidence.mjs");
const checkerPath = path.join(scriptDir, "check-external-gate-evidence.mjs");
const trackedEvidencePath = path.join(intentRoot, "external-gate-evidence.json");
const hostedMcpUrl = process.env.JSONX_RENDERER_MCP_URL || "https://jsonx-renderer-app.netlify.app/mcp";

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function run(label, command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${label} failed with exit code ${result.status}${output ? `\n${output}` : ""}`);
  }
  return result.stdout.trim();
}

function runFailure(label, command, args, expectedText) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  if (result.status === 0) {
    throw new Error(`${label} should have failed but exited zero${output ? `\n${output}` : ""}`);
  }
  if (expectedText && !output.includes(expectedText)) {
    throw new Error(`${label} failed without expected message "${expectedText}"${output ? `\n${output}` : ""}`);
  }
  return output;
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function assertCheck(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-external-gate-recorder."));
  const tempEvidencePath = path.join(tempDir, "external-gate-evidence.json");

  try {
    await fs.copyFile(templatePath, tempEvidencePath);

    const commands = [
      [
        "app ids",
        [
          recorderPath,
          "app-ids",
          "--target-file",
          tempEvidencePath,
          "--openai-core-plugin-id",
          "openai-jsonx-plugin-test",
          "--openai-generative-ui-app-id",
          "openai-jsonx-renderer-app-test",
          "--openai-generative-ui-plugin-id",
          "openai-jsonx-generative-ui-plugin-test",
          "--codex-core-plugin-id",
          "codex-jsonx-plugin-test",
          "--codex-generative-ui-plugin-id",
          "codex-jsonx-generative-ui-plugin-test",
          "--codex-app-metadata-updated",
        ],
      ],
      [
        "chatgpt developer mode",
        [
          recorderPath,
          "chatgpt",
          "--target-file",
          tempEvidencePath,
          "--connected-mcp-url",
          hostedMcpUrl,
          "--transcript-url",
          "https://example.com/jsonx-chatgpt-transcript",
          "--all-prompts-passed",
        ],
      ],
      [
        "claude smoke",
        [
          recorderPath,
          "claude-smoke",
          "--target-file",
          tempEvidencePath,
          "--plugin",
          "both",
          "--authenticated",
          "--claude-version",
          "Claude Code test",
          "--passed",
        ],
      ],
      [
        "policy review",
        [
          recorderPath,
          "policy-review",
          "--target-file",
          tempEvidencePath,
          "--status",
          "approved",
          "--reviewed-by",
          "JSONX review",
          "--reviewed-at",
          "2026-07-24",
        ],
      ],
      [
        "openai core marketplace",
        [
          recorderPath,
          "marketplace",
          "--target-file",
          tempEvidencePath,
          "--target",
          "openai-core",
          "--submitted",
          "--submission-id",
          "openai-core-test",
          "--url",
          "https://example.com/openai-core-test",
          "--status",
          "submitted",
          "--submitted-at",
          "2026-07-24",
        ],
      ],
      [
        "openai generative ui marketplace",
        [
          recorderPath,
          "marketplace",
          "--target-file",
          tempEvidencePath,
          "--target",
          "openai-generative-ui",
          "--submitted",
          "--submission-id",
          "openai-generative-ui-test",
          "--url",
          "https://example.com/openai-generative-ui-test",
          "--status",
          "submitted",
          "--submitted-at",
          "2026-07-24",
        ],
      ],
      [
        "claude core marketplace",
        [
          recorderPath,
          "marketplace",
          "--target-file",
          tempEvidencePath,
          "--target",
          "claude-core",
          "--submitted",
          "--submission-id",
          "claude-core-test",
          "--url",
          "https://example.com/claude-core-test",
          "--status",
          "submitted",
          "--submitted-at",
          "2026-07-24",
        ],
      ],
      [
        "claude generative ui marketplace",
        [
          recorderPath,
          "marketplace",
          "--target-file",
          tempEvidencePath,
          "--target",
          "claude-generative-ui",
          "--submitted",
          "--submission-id",
          "claude-generative-ui-test",
          "--url",
          "https://example.com/claude-generative-ui-test",
          "--status",
          "submitted",
          "--submitted-at",
          "2026-07-24",
        ],
      ],
    ];

    for (const [label, args] of commands) {
      run(`record ${label}`, process.execPath, args);
    }

    const negativeCommands = [
      [
        "invalid ChatGPT prompt id",
        [
          recorderPath,
          "chatgpt",
          "--target-file",
          tempEvidencePath,
          "--prompt",
          "typo-request=passed",
          "--dry-run",
          "--json",
        ],
        "ChatGPT prompt id",
      ],
      [
        "invalid ChatGPT prompt status",
        [
          recorderPath,
          "chatgpt",
          "--target-file",
          tempEvidencePath,
          "--prompt",
          "motion-request=unknown",
          "--dry-run",
          "--json",
        ],
        "ChatGPT prompt status",
      ],
      [
        "invalid Claude smoke status",
        [
          recorderPath,
          "claude-smoke",
          "--target-file",
          tempEvidencePath,
          "--plugin",
          "core",
          "--status",
          "unknown",
          "--dry-run",
          "--json",
        ],
        "Claude smoke status",
      ],
    ];

    for (const [label, args, expectedText] of negativeCommands) {
      runFailure(label, process.execPath, args, expectedText);
    }

    const report = JSON.parse(run("check recorded evidence", process.execPath, [checkerPath, "--source", tempEvidencePath, "--json", "--strict"]));
    assertCheck(report.pending.length === 0, `expected no pending gates, got ${report.pending.map((item) => item.gate).join(", ")}`);
    assertCheck(Object.values(report.gates).every((status) => status === "proved"), "expected all external gates to be proved");

    const evidence = await readJson(tempEvidencePath);
    const promptIds = evidence.chatgptDeveloperMode.promptsRun.map((prompt) => prompt.id);
    for (const id of ["blocked-prop-request", "motion-request", "bad-motion-request"]) {
      assertCheck(promptIds.includes(id), `expected recorded ChatGPT prompts to include ${id}`);
    }
    assertCheck(evidence.claudeSmoke.core.authenticated === true, "expected core Claude smoke to be authenticated");
    assertCheck(evidence.claudeSmoke.generativeUi.authenticated === true, "expected generative UI Claude smoke to be authenticated");

    const trackedEvidence = await readJson(trackedEvidencePath);
    assertCheck(
      trackedEvidence.chatgptDeveloperMode.promptsRun.every((prompt) => prompt.status === "pending"),
      `${relative(trackedEvidencePath)} should remain pending during recorder validation`,
    );

    console.log(
      JSON.stringify(
        {
          source: relative(templatePath),
          tempEvidence: tempEvidencePath.replace(tempDir, "$TMPDIR"),
          commandsRun: commands.length,
          negativeCommandsRun: negativeCommands.length,
          invalidInputsRejected: true,
          gates: report.gates,
          chatgptPromptCount: promptIds.length,
          trackedEvidenceUnchanged: true,
        },
        null,
        2,
      ),
    );
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
