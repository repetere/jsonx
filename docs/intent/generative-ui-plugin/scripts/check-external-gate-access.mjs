#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const args = process.argv.slice(2);
const claudeCodePackage = process.env.JSONX_CLAUDE_CODE_PACKAGE || "@anthropic-ai/claude-code@2.1.218";
const hostedMcpUrl = process.env.JSONX_RENDERER_MCP_URL || "https://jsonx-renderer-app.netlify.app/mcp";
const timeoutMs = Number(process.env.JSONX_EXTERNAL_GATE_ACCESS_TIMEOUT_MS || 15000);

const portalUrls = [
  {
    id: "openai-plugin-portal",
    url: "https://platform.openai.com/plugins",
    gate: "appIds marketplaceSubmission",
  },
  {
    id: "claude-code-community-marketplace",
    url: "https://platform.claude.com/plugins/submit",
    gate: "marketplaceSubmission",
  },
  {
    id: "claude-team-directory-submission",
    url: "https://claude.ai/admin-settings/directory/submissions/plugins/new",
    gate: "marketplaceSubmission",
  },
  {
    id: "claude-directory-redirect",
    url: "https://clau.de/plugin-directory-submission",
    gate: "marketplaceSubmission",
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

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function runCapture(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd || repoRoot,
    encoding: "utf8",
    stdio: "pipe",
    timeout: options.timeoutMs || timeoutMs,
    env: {
      ...process.env,
      PATH: `${process.env.HOME}/.nvm/versions/node/v22.21.1/bin:${process.env.PATH}`,
      ...options.env,
    },
  });
  return {
    command: [command, ...commandArgs].join(" "),
    status: result.status,
    signal: result.signal,
    ok: result.status === 0,
    stdout: result.stdout?.trim() || "",
    stderr: result.stderr?.trim() || "",
    error: result.error?.message,
  };
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function fetchUrl(id, url) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "manual",
      headers: {
        "User-Agent": "jsonx-external-gate-access-check",
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    return {
      id,
      url,
      status: response.status,
      ok: response.status >= 200 && response.status < 500,
      location: response.headers.get("location"),
      contentType: response.headers.get("content-type"),
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      id,
      url,
      status: 0,
      ok: false,
      error: error.name === "AbortError" ? "timeout" : error.message,
      durationMs: Date.now() - startedAt,
    };
  }
}

async function fetchHostedMcpHealth() {
  const healthUrl = hostedMcpUrl.replace(/\/mcp(?:\?.*)?$/, "/healthz");
  const startedAt = Date.now();
  try {
    const response = await fetch(healthUrl, {
      headers: { "User-Agent": "jsonx-external-gate-access-check" },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = await response.json().catch(() => null);
    return {
      url: healthUrl,
      status: response.status,
      ok: response.ok && body?.ok === true,
      body,
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      url: healthUrl,
      status: 0,
      ok: false,
      error: error.name === "AbortError" ? "timeout" : error.message,
      durationMs: Date.now() - startedAt,
    };
  }
}

function buildBlockingConditions({ claude, gates }) {
  const blocking = [];
  if (!claude.authenticated) {
    blocking.push({
      gate: "claudeSmoke",
      reason: "Claude Code is available, but this environment is not authenticated with Claude Code and has no Anthropic API credential.",
      next: "Run `claude auth login` or provide a scoped Anthropic credential in a secure environment, then run the smoke prompts and record the gate.",
    });
  }
  if (gates.appIds !== "proved" || gates.marketplaceSubmission !== "proved") {
    blocking.push({
      gate: "appIds marketplaceSubmission",
      reason: "OpenAI/Codex and Claude Code submissions still require account-gated portal actions and returned IDs or receipts.",
      next: "Use the generated portal packets and submission queue, then record receipts with record-external-gate-evidence.mjs.",
    });
  }
  if (gates.chatgptDeveloperMode !== "proved") {
    blocking.push({
      gate: "chatgptDeveloperMode",
      reason: "The hosted MCP endpoint is reachable, but a ChatGPT developer-mode transcript has not been recorded.",
      next: "Connect the hosted MCP endpoint in ChatGPT developer mode, run the golden prompts, and record the transcript URL or artifact.",
    });
  }
  return blocking;
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/check-external-gate-access.mjs [--json] [--output <file>]

Probes local and network access for JSONX external submission gates without
reading or printing credential values.
`);
    return;
  }

  const version = runCapture("npm", ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "--version"]);
  const auth = runCapture("npm", ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "auth", "status"]);
  const authJson = safeJson(auth.stdout);
  const gateStatus = runCapture("node", ["docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs", "--json"]);
  const gateJson = safeJson(gateStatus.stdout) || {};
  const portalChecks = await Promise.all(portalUrls.map((portal) => fetchUrl(portal.id, portal.url)));
  const hostedMcpHealth = await fetchHostedMcpHealth();

  const environment = {
    anthropicApiKeyPresent: Boolean(process.env.ANTHROPIC_API_KEY),
    claudeCodeOauthTokenPresent: Boolean(process.env.CLAUDE_CODE_OAUTH_TOKEN),
    openaiApiKeyPresent: Boolean(process.env.OPENAI_API_KEY),
  };
  const claude = {
    package: claudeCodePackage,
    versionCommand: version.command,
    versionDetected: version.ok ? version.stdout : "",
    cliAvailable: version.ok,
    authCommand: auth.command,
    authStatusParsed: Boolean(authJson),
    loggedIn: authJson?.loggedIn === true,
    authMethod: authJson?.authMethod || "unknown",
    apiProvider: authJson?.apiProvider || "unknown",
    authenticated: authJson?.loggedIn === true || environment.anthropicApiKeyPresent || environment.claudeCodeOauthTokenPresent,
  };
  const gates = gateJson.gates || {};
  const checks = {
    probeCompleted: true,
    externalGateEvidenceReadable: gateStatus.ok && Boolean(gateJson.gates),
    hostedMcpHealthOk: hostedMcpHealth.ok === true,
    claudeCodeCliAvailable: claude.cliAvailable,
    claudeCodeAuthStatusReadable: Boolean(authJson),
    claudeCodeAuthenticated: claude.authenticated,
    portalEntryPointsReachable: portalChecks.every((portal) => portal.ok),
  };

  const report = {
    generatedAt: new Date().toISOString(),
    source: "JSONX external gate access probe",
    note: "This probe records local auth and portal reachability without exposing secret values. It is access evidence, not proof that external gates are complete.",
    hostedMcpUrl,
    hostedMcpHealth,
    environment,
    claude,
    submissionPortals: portalChecks,
    currentExternalGates: gates,
    currentPendingGates: gateJson.pending?.map((item) => item.gate) || [],
    checks,
    blockingConditions: buildBlockingConditions({ claude, gates }),
  };

  const output = argValue("--output");
  if (output) await writeJson(path.resolve(repoRoot, output), report);

  if (hasArg("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("JSONX external gate access probe");
    console.log(`claudeCodeCliAvailable: ${checks.claudeCodeCliAvailable}`);
    console.log(`claudeCodeAuthenticated: ${checks.claudeCodeAuthenticated}`);
    console.log(`portalEntryPointsReachable: ${checks.portalEntryPointsReachable}`);
    console.log(`hostedMcpHealthOk: ${checks.hostedMcpHealthOk}`);
    for (const item of report.blockingConditions) {
      console.log(`${item.gate}: ${item.reason}`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
