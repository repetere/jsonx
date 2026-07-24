#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const cliArgs = process.argv.slice(2);
const artifactRoot = resolveArtifactRoot();
const packagesDir = path.join(artifactRoot, "packages");
const screenshotsDir = path.join(artifactRoot, "screenshots");
const storeListingsDir = path.join(artifactRoot, "store-listings");

const hostedWidgetUrl = process.env.JSONX_RENDERER_WIDGET_URL || "https://jsonx-renderer-app.netlify.app/widget";
const hostedMcpUrl = process.env.JSONX_RENDERER_MCP_URL || "https://jsonx-renderer-app.netlify.app/mcp";
const codexCliOverride = process.env.JSONX_CODEX_CLI;
const claudeCodePackage = process.env.JSONX_CLAUDE_CODE_PACKAGE || "@anthropic-ai/claude-code@2.1.218";
const publicSiteUrl = process.env.JSONX_PUBLIC_SITE_URL || "https://jsonx.net/generative-ui.html";
const publicSkillsUrl = process.env.JSONX_PUBLIC_SKILLS_URL || "https://jsonx.net/skills/README.md";

const validFixtures = [
  "support-triage",
  "text-block",
  "checklist",
  "choice-list",
  "data-table",
  "alert",
  "quiz",
  "slider-poll",
  "motion-subtle",
];

const installerSurfaces = ["codex", "claude", "opencode"];
const installerSkills = ["jsonx", "jsonx-generative-ui", "all"];
const storeListingSources = [
  {
    surface: "OpenAI plugin portal draft",
    source: path.join(intentRoot, "store-listings", "openai-plugin-submission.json"),
    outputFile: "openai-plugin-submission.json",
  },
  {
    surface: "Claude Code community submission draft",
    source: path.join(intentRoot, "store-listings", "claude-code-community-submission.json"),
    outputFile: "claude-code-community-submission.json",
  },
];

function argValue(name) {
  const index = cliArgs.indexOf(name);
  return index >= 0 ? cliArgs[index + 1] : undefined;
}

function hasArg(name) {
  return cliArgs.includes(name);
}

function resolveArtifactRoot() {
  const output = argValue("--output") || process.env.JSONX_SUBMISSION_ARTIFACT_ROOT;
  return output ? path.resolve(repoRoot, output) : path.join(intentRoot, "submission-artifacts", "current");
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function artifactPath(filePath) {
  const repoRelativeArtifactRoot = path.relative(repoRoot, artifactRoot);
  if (repoRelativeArtifactRoot.startsWith("..") || path.isAbsolute(repoRelativeArtifactRoot)) {
    return path.relative(artifactRoot, filePath);
  }
  return relative(filePath);
}

function run(label, command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    env: {
      ...process.env,
      PATH: `${process.env.HOME}/.nvm/versions/node/v22.21.1/bin:${process.env.PATH}`,
      ...options.env,
    },
  });

  if (result.status !== 0) {
    const message = [`${label} failed with exit code ${result.status}`];
    if (result.stdout) message.push(result.stdout.trim());
    if (result.stderr) message.push(result.stderr.trim());
    throw new Error(message.filter(Boolean).join("\n"));
  }

  return result.stdout?.trim() || "";
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function fileExists(filePath, mode = fsConstants.F_OK) {
  try {
    await fs.access(filePath, mode);
    return true;
  } catch {
    return false;
  }
}

function siblingUrl(urlString, pathname) {
  const url = new URL(urlString);
  url.pathname = pathname;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function parseJsonOutput(label, output) {
  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`${label} did not return valid JSON: ${error.message}`);
  }
}

function sanitizeEvidence(value, replacements) {
  if (typeof value === "string") {
    return replacements.reduce((result, [from, to]) => (from ? result.replaceAll(from, to) : result), value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeEvidence(item, replacements));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeEvidence(item, replacements)]));
  }
  return value;
}

async function hashFile(filePath) {
  const buffer = await fs.readFile(filePath);
  return {
    path: artifactPath(filePath),
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
  };
}

async function zipDirectory(label, sourceDir, outputFile) {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  run(`zip ${label}`, "zip", ["-qr", outputFile, "."], { cwd: sourceDir });
  return hashFile(outputFile);
}

function fixturePath(name) {
  return path.join(repoRoot, "plugins", "jsonx-generative-ui-plugin", "fixtures", `${name}.json`);
}

function renderInputFromFixture(fixture) {
  return {
    purpose: fixture.purpose,
    motionProfile: fixture.motionProfile,
    payload: fixture.payload,
  };
}

function childComponents(payload) {
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.children)) return [];
  return payload.children
    .filter((child) => child && typeof child === "object")
    .map((child) => child.component)
    .filter(Boolean);
}

function payloadSummary(input) {
  return {
    purpose: input.purpose,
    motionProfile: input.motionProfile || "none",
    payloadComponent: input.payload?.component,
    childComponents: childComponents(input.payload),
    payloadBytes: Buffer.byteLength(JSON.stringify(input), "utf8"),
  };
}

function resultSummary(result) {
  if (result.isError) {
    return {
      isError: true,
      contentText: result.content?.[0]?.text,
    };
  }
  return {
    isError: false,
    contentText: result.content?.[0]?.text,
    structuredContent: {
      schema: result.structuredContent?.schema,
      purpose: result.structuredContent?.purpose,
      motionProfile: result.structuredContent?.motionProfile || "none",
      payloadComponent: result.structuredContent?.payload?.component,
      childComponents: childComponents(result.structuredContent?.payload),
    },
  };
}

function assertEvidence(condition, message) {
  if (!condition) throw new Error(`Submission evidence failed: ${message}`);
}

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
  });
}

async function readMcpResponse(response) {
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/event-stream")) {
    const eventJson = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice("data:".length).trim())
      .find((line) => line.startsWith("{"));
    assertEvidence(eventJson, "MCP event stream did not include a JSON payload");
    return JSON.parse(eventJson);
  }
  return JSON.parse(text);
}

async function postMcpRpc(id, method, params = {}) {
  const response = await fetchWithTimeout(hostedMcpUrl, {
    method: "POST",
    headers: {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method,
      params,
    }),
  });
  const body = await readMcpResponse(response);
  assertEvidence(response.status === 200, `${method} returned HTTP ${response.status}`);
  assertEvidence(!body.error, `${method} returned JSON-RPC error ${body.error?.message || "unknown"}`);
  return {
    status: response.status,
    contentType: response.headers.get("content-type"),
    corsOrigin: response.headers.get("access-control-allow-origin"),
    body,
  };
}

async function buildHostedMcpEvidence() {
  const startedAt = Date.now();
  const healthUrl = siblingUrl(hostedMcpUrl, "/healthz");
  const validInput = renderInputFromFixture(await readJson(fixturePath("support-triage")));
  const invalidInput = renderInputFromFixture(await readJson(fixturePath("bad-unknown-component")));
  const steps = [];

  console.log(`capturing hosted MCP transcript from ${hostedMcpUrl}`);

  const health = await fetchWithTimeout(healthUrl);
  const healthBody = await health.json();
  assertEvidence(health.status === 200, `/healthz returned HTTP ${health.status}`);
  assertEvidence(healthBody.ok === true, "/healthz did not return ok=true");
  steps.push({
    id: "healthz",
    transport: "https",
    method: "GET",
    url: healthUrl,
    status: health.status,
    body: healthBody,
  });

  const preflight = await fetchWithTimeout(hostedMcpUrl, {
    method: "OPTIONS",
    headers: {
      "access-control-request-method": "POST",
      "access-control-request-headers": "content-type,mcp-protocol-version",
      origin: "https://chatgpt.com",
    },
  });
  const preflightCorsOrigin = preflight.headers.get("access-control-allow-origin");
  assertEvidence(preflight.status === 204, `CORS preflight returned HTTP ${preflight.status}`);
  assertEvidence(preflightCorsOrigin === "*", "CORS preflight did not allow ChatGPT browser calls");
  steps.push({
    id: "cors-preflight",
    transport: "https",
    method: "OPTIONS",
    url: hostedMcpUrl,
    status: preflight.status,
    corsOrigin: preflightCorsOrigin,
    allowMethods: preflight.headers.get("access-control-allow-methods"),
    allowHeaders: preflight.headers.get("access-control-allow-headers"),
  });

  const initialize = await postMcpRpc(1, "initialize", {
    protocolVersion: "2026-01-26",
    capabilities: {},
    clientInfo: { name: "jsonx-submission-artifacts", version: "0.1.0" },
  });
  assertEvidence(initialize.body.result?.serverInfo?.name === "jsonx-renderer-app", "initialize did not return the JSONX server name");
  steps.push({
    id: "initialize",
    transport: "mcp-json-rpc",
    method: "initialize",
    status: initialize.status,
    contentType: initialize.contentType,
    corsOrigin: initialize.corsOrigin,
    result: {
      protocolVersion: initialize.body.result?.protocolVersion,
      serverInfo: initialize.body.result?.serverInfo,
      capabilities: Object.keys(initialize.body.result?.capabilities || {}),
      instructionsPresent: typeof initialize.body.result?.instructions === "string",
    },
  });

  const tools = await postMcpRpc(2, "tools/list");
  const listedTools = tools.body.result?.tools || [];
  const renderTool = listedTools.find((tool) => tool.name === "render_jsonx_response");
  assertEvidence(renderTool, "render_jsonx_response was not listed");
  assertEvidence(renderTool._meta?.ui?.resourceUri === "ui://jsonx/renderer-v1.html", "render tool is not wired to the renderer resource");
  steps.push({
    id: "tools-list",
    transport: "mcp-json-rpc",
    method: "tools/list",
    status: tools.status,
    contentType: tools.contentType,
    corsOrigin: tools.corsOrigin,
    result: {
      toolNames: listedTools.map((tool) => tool.name),
      renderTool: {
        title: renderTool.title,
        readOnlyHint: renderTool.annotations?.readOnlyHint,
        idempotentHint: renderTool.annotations?.idempotentHint,
        outputSchemaPresent: Boolean(renderTool.outputSchema),
        rendererResourceUri: renderTool._meta?.ui?.resourceUri,
      },
    },
  });

  const resource = await postMcpRpc(3, "resources/read", { uri: "ui://jsonx/renderer-v1.html" });
  const resourceContent = resource.body.result?.contents?.[0];
  assertEvidence(resourceContent?.mimeType === "text/html;profile=mcp-app", "renderer resource did not return the Apps SDK MIME type");
  assertEvidence((resourceContent.text || "").includes("jsonx-root"), "renderer resource did not include the JSONX root");
  steps.push({
    id: "renderer-resource",
    transport: "mcp-json-rpc",
    method: "resources/read",
    status: resource.status,
    contentType: resource.contentType,
    corsOrigin: resource.corsOrigin,
    result: {
      uri: resourceContent.uri,
      mimeType: resourceContent.mimeType,
      textBytes: Buffer.byteLength(resourceContent.text || "", "utf8"),
      hasJsonxRoot: (resourceContent.text || "").includes("jsonx-root"),
      hasRendererConfig: (resourceContent.text || "").includes("JSONX_RENDERER_CONFIG"),
    },
  });

  const valid = await postMcpRpc(4, "tools/call", {
    name: "render_jsonx_response",
    arguments: validInput,
  });
  assertEvidence(valid.body.result?.isError !== true, "valid payload was rejected");
  assertEvidence(valid.body.result?.structuredContent?.schema === "jsonx.generative-ui.v1", "valid payload did not return the JSONX schema");
  steps.push({
    id: "valid-render",
    transport: "mcp-json-rpc",
    method: "tools/call",
    status: valid.status,
    contentType: valid.contentType,
    corsOrigin: valid.corsOrigin,
    toolName: "render_jsonx_response",
    input: payloadSummary(validInput),
    result: resultSummary(valid.body.result),
  });

  const invalid = await postMcpRpc(5, "tools/call", {
    name: "render_jsonx_response",
    arguments: invalidInput,
  });
  assertEvidence(invalid.body.result?.isError === true, "invalid payload was not rejected");
  steps.push({
    id: "invalid-render",
    transport: "mcp-json-rpc",
    method: "tools/call",
    status: invalid.status,
    contentType: invalid.contentType,
    corsOrigin: invalid.corsOrigin,
    toolName: "render_jsonx_response",
    input: payloadSummary(invalidInput),
    result: resultSummary(invalid.body.result),
  });

  return {
    generatedAt: new Date().toISOString(),
    source: "live hosted JSONX renderer MCP endpoint",
    hostedMcpUrl,
    healthUrl,
    note: "This is live endpoint evidence for submission review. It is not a captured ChatGPT developer-mode transcript.",
    durationMs: Date.now() - startedAt,
    checks: {
      healthOk: true,
      corsPreflightOk: true,
      toolListed: true,
      rendererResourceReadable: true,
      validPayloadRendered: true,
      invalidPayloadRejected: true,
    },
    steps,
  };
}

async function buildSkillInstallerEvidence() {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-skill-installer."));
  const realTempRoot = await fs.realpath(tempRoot);
  const replacements = [
    [realTempRoot, "$TMPDIR"],
    [tempRoot, "$TMPDIR"],
    [repoRoot, "$REPO_ROOT"],
  ];
  const dryRuns = [];
  const installs = [];

  console.log("capturing skill installer evidence");

  try {
    for (const surface of installerSurfaces) {
      for (const skill of installerSkills) {
        const target = path.join(tempRoot, "dry-run", surface, skill);
        const output = run(
          `skill installer dry-run ${surface}/${skill}`,
          "node",
          [
            "skills/scripts/install-jsonx-skill.mjs",
            "--surface",
            surface,
            "--skill",
            skill,
            "--target",
            target,
            "--dry-run",
          ],
          { capture: true },
        );
        dryRuns.push({
          surface,
          skill,
          target: sanitizeEvidence(target, replacements),
          plannedCopies: output.split("\n").filter(Boolean).length,
          output: sanitizeEvidence(output.split("\n").filter(Boolean), replacements),
        });
      }
    }

    for (const surface of installerSurfaces) {
      const target = path.join(tempRoot, "install", surface);
      const output = run(
        `skill installer install ${surface}/all`,
        "node",
        [
          "skills/scripts/install-jsonx-skill.mjs",
          "--surface",
          surface,
          "--skill",
          "all",
          "--target",
          target,
          "--force",
        ],
        { capture: true },
      );
      const installedSkills = [];
      for (const skill of ["jsonx", "jsonx-generative-ui"]) {
        const skillPath = path.join(target, skill, "SKILL.md");
        const present = await fileExists(skillPath);
        assertEvidence(present, `skill installer did not create ${surface}/${skill}`);
        installedSkills.push({
          skill,
          skillPath: sanitizeEvidence(skillPath, replacements),
          skillMdPresent: present,
        });
      }
      installs.push({
        surface,
        target: sanitizeEvidence(target, replacements),
        output: sanitizeEvidence(output.split("\n").filter(Boolean), replacements),
        installedSkills,
      });
    }

    return {
      generatedAt: new Date().toISOString(),
      source: "skills/scripts/install-jsonx-skill.mjs",
      note: "This evidence dry-runs every surface/skill pair and performs isolated installs for all supported surfaces using temporary targets.",
      checks: {
        dryRunMatrixCount: dryRuns.length,
        actualInstallSurfaces: installs.length,
        allDryRunsCovered: dryRuns.length === installerSurfaces.length * installerSkills.length,
        allSurfaceInstallsPassed: installs.every((item) => item.installedSkills.every((skill) => skill.skillMdPresent)),
      },
      dryRuns,
      installs,
    };
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }
}

async function findCodexCli() {
  const candidates = [];
  if (codexCliOverride) {
    candidates.push(codexCliOverride);
  }
  const pathLookup = spawnSync("sh", ["-lc", "command -v codex || true"], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
    env: {
      ...process.env,
      PATH: `${process.env.HOME}/.nvm/versions/node/v22.21.1/bin:${process.env.PATH}`,
    },
  });
  const pathCandidate = pathLookup.stdout?.trim();
  if (pathCandidate) {
    candidates.push(pathCandidate);
  }
  candidates.push("/Applications/ChatGPT.app/Contents/Resources/codex");

  for (const candidate of [...new Set(candidates.filter(Boolean))]) {
    if (await fileExists(candidate, fsConstants.X_OK)) {
      return candidate;
    }
  }
  return null;
}

async function buildCodexInstallEvidence({ skip }) {
  if (skip) {
    return {
      generatedAt: new Date().toISOString(),
      source: "codex plugin CLI",
      skipped: true,
      reason: "Skipped by --skip-codex-install or JSONX_SKIP_CODEX_INSTALL=1.",
      checks: {},
      steps: [],
    };
  }

  const codexCli = await findCodexCli();
  if (!codexCli) {
    return {
      generatedAt: new Date().toISOString(),
      source: "codex plugin CLI",
      skipped: true,
      reason: "Codex CLI was not found on PATH or at the ChatGPT app bundled path.",
      checks: {},
      steps: [],
    };
  }

  const tempHome = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-codex-home."));
  const realTempHome = await fs.realpath(tempHome);
  const replacements = [
    [realTempHome, "$CODEX_HOME"],
    [tempHome, "$CODEX_HOME"],
    [repoRoot, "$REPO_ROOT"],
  ];
  const env = { CODEX_HOME: tempHome };
  const steps = [];

  console.log("capturing isolated Codex plugin install evidence");

  try {
    const version = run("codex version", codexCli, ["--version"], { capture: true, env });
    steps.push({
      id: "codex-version",
      command: "codex --version",
      stdout: version,
    });

    const marketplaceAdd = parseJsonOutput(
      "codex plugin marketplace add",
      run("codex marketplace add", codexCli, ["plugin", "marketplace", "add", ".", "--json"], { capture: true, env }),
    );
    assertEvidence(marketplaceAdd.marketplaceName === "jsonx-local", "Codex marketplace add did not return jsonx-local");
    steps.push({
      id: "marketplace-add",
      command: "codex plugin marketplace add . --json",
      result: sanitizeEvidence(marketplaceAdd, replacements),
    });

    const marketplaces = parseJsonOutput(
      "codex plugin marketplace list",
      run("codex marketplace list", codexCli, ["plugin", "marketplace", "list", "--json"], { capture: true, env }),
    );
    assertEvidence(
      marketplaces.marketplaces?.some((marketplace) => marketplace.name === "jsonx-local"),
      "Codex marketplace list did not include jsonx-local",
    );
    steps.push({
      id: "marketplace-list",
      command: "codex plugin marketplace list --json",
      result: sanitizeEvidence(marketplaces, replacements),
    });

    const available = parseJsonOutput(
      "codex plugin list available",
      run("codex plugin list available", codexCli, ["plugin", "list", "--available", "--json"], { capture: true, env }),
    );
    const availablePlugin = available.available?.find((plugin) => plugin.pluginId === "jsonx-generative-ui-plugin@jsonx-local");
    assertEvidence(availablePlugin, "Codex available list did not include jsonx-generative-ui-plugin@jsonx-local");
    steps.push({
      id: "available-list",
      command: "codex plugin list --available --json",
      result: sanitizeEvidence({ plugin: availablePlugin }, replacements),
    });

    const pluginAdd = parseJsonOutput(
      "codex plugin add",
      run("codex plugin add", codexCli, ["plugin", "add", "jsonx-generative-ui-plugin@jsonx-local", "--json"], {
        capture: true,
        env,
      }),
    );
    assertEvidence(pluginAdd.pluginId === "jsonx-generative-ui-plugin@jsonx-local", "Codex plugin add returned the wrong plugin id");
    steps.push({
      id: "plugin-add",
      command: "codex plugin add jsonx-generative-ui-plugin@jsonx-local --json",
      result: sanitizeEvidence(pluginAdd, replacements),
    });

    const installed = parseJsonOutput(
      "codex plugin list installed",
      run("codex plugin list installed", codexCli, ["plugin", "list", "--json"], { capture: true, env }),
    );
    const installedPlugin = installed.installed?.find((plugin) => plugin.pluginId === "jsonx-generative-ui-plugin@jsonx-local");
    assertEvidence(installedPlugin?.enabled === true, "Codex installed list did not show the plugin enabled");
    steps.push({
      id: "installed-list",
      command: "codex plugin list --json",
      result: sanitizeEvidence({ plugin: installedPlugin }, replacements),
    });

    const installedPath = pluginAdd.installedPath;
    const cachedFiles = [
      ".codex-plugin/plugin.json",
      "README.md",
      "skills/jsonx/SKILL.md",
      "skills/jsonx-generative-ui/SKILL.md",
      "fixtures/support-triage.json",
      "scripts/validate-jsonx-ui.py",
    ];
    const cachedFileChecks = [];
    for (const file of cachedFiles) {
      const filePath = path.join(installedPath, file);
      const present = await fileExists(filePath);
      assertEvidence(present, `Codex plugin cache is missing ${file}`);
      cachedFileChecks.push({
        path: sanitizeEvidence(filePath, replacements),
        present,
      });
    }
    steps.push({
      id: "cache-files",
      command: "inspect installed plugin cache",
      result: { cachedFileChecks },
    });

    return {
      generatedAt: new Date().toISOString(),
      source: "codex plugin CLI",
      note: "This evidence installs the repo-local JSONX Codex plugin from the repo-local marketplace using an isolated CODEX_HOME.",
      skipped: false,
      codexCli: sanitizeEvidence(codexCli, replacements),
      tempHome: "$CODEX_HOME",
      checks: {
        marketplaceAdded: true,
        availableBeforeInstall: true,
        pluginInstalled: true,
        pluginEnabled: true,
        cachedFilesPresent: true,
      },
      steps,
    };
  } finally {
    await fs.rm(tempHome, { recursive: true, force: true });
  }
}

async function buildClaudeValidationEvidence({ skip }) {
  if (skip) {
    return {
      generatedAt: new Date().toISOString(),
      source: "claude plugin validate",
      skipped: true,
      reason: "Skipped by --skip-claude-validation or JSONX_SKIP_CLAUDE_VALIDATION=1.",
      checks: {},
      steps: [],
    };
  }

  const tempCache = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-claude-npm."));
  const realTempCache = await fs.realpath(tempCache);
  const replacements = [
    [realTempCache, "$NPM_CACHE"],
    [tempCache, "$NPM_CACHE"],
    [repoRoot, "$REPO_ROOT"],
  ];
  const env = { npm_config_cache: tempCache };
  const pluginPath = path.join(repoRoot, "plugins", "claude-jsonx-plugin");
  const steps = [];

  console.log("capturing Claude Code plugin validation evidence");

  try {
    const version = run(
      "claude version via npm exec",
      "npm",
      ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "--version"],
      { capture: true, env },
    );
    assertEvidence(version.includes("Claude Code"), "Claude Code version output did not identify Claude Code");
    steps.push({
      id: "claude-version",
      command: `npm exec --yes --package ${claudeCodePackage} -- claude --version`,
      stdout: sanitizeEvidence(version, replacements),
    });

    const validation = run(
      "claude plugin validate",
      "npm",
      ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "plugin", "validate", "./plugins/claude-jsonx-plugin"],
      { capture: true, env },
    );
    assertEvidence(validation.includes("Validation passed"), "claude plugin validate did not report success");
    steps.push({
      id: "plugin-validate",
      command: `npm exec --yes --package ${claudeCodePackage} -- claude plugin validate ./plugins/claude-jsonx-plugin`,
      stdout: sanitizeEvidence(validation.split("\n").filter(Boolean), replacements),
    });

    return {
      generatedAt: new Date().toISOString(),
      source: "claude plugin validate",
      note: "This evidence runs Claude Code from the npm package with a temporary npm cache and validates the JSONX Claude Code plugin manifest.",
      skipped: false,
      claudeCodePackage,
      claudeVersion: version,
      pluginPath: sanitizeEvidence(pluginPath, replacements),
      tempNpmCache: "$NPM_CACHE",
      checks: {
        cliAvailableViaNpmExec: true,
        pluginValidationPassed: true,
      },
      steps,
    };
  } finally {
    await fs.rm(tempCache, { recursive: true, force: true });
  }
}

function validateStoreListing(source, data) {
  const errors = [];
  if (data.schemaVersion !== 1) errors.push("schemaVersion must be 1");
  if (!data.surface) errors.push("surface is required");
  if (!data.submissionType) errors.push("submissionType is required");
  if (!data.listing?.pluginName) errors.push("listing.pluginName is required");
  if (!data.listing?.shortDescription) errors.push("listing.shortDescription is required");
  if (!data.listing?.longDescription) errors.push("listing.longDescription is required");
  if (!Array.isArray(data.positiveTestCases) || data.positiveTestCases.length !== 5) {
    errors.push("positiveTestCases must contain exactly 5 cases");
  }
  if (!Array.isArray(data.negativeTestCases) || data.negativeTestCases.length !== 3) {
    errors.push("negativeTestCases must contain exactly 3 cases");
  }
  if (!Array.isArray(data.manualBeforeSubmit) || data.manualBeforeSubmit.length === 0) {
    errors.push("manualBeforeSubmit must list remaining portal steps");
  }
  if (!Array.isArray(data.sourceDocsChecked) || data.sourceDocsChecked.length === 0) {
    errors.push("sourceDocsChecked must list checked public docs");
  }
  if (data.surface === "openai-plugin-portal") {
    if (data.submissionType !== "app-plus-skills") errors.push("OpenAI draft must be app-plus-skills");
    if (!data.mcpServer?.url) errors.push("OpenAI draft requires mcpServer.url");
    if (!Array.isArray(data.bundledSkills) || data.bundledSkills.length !== 2) {
      errors.push("OpenAI draft must include the two bundled skills");
    }
  }
  if (data.surface === "claude-code-community-marketplace") {
    if (!data.marketplace?.target) errors.push("Claude draft requires marketplace.target");
    if (!Array.isArray(data.skills) || data.skills.length !== 2) {
      errors.push("Claude draft must include the two plugin skills");
    }
  }
  if (errors.length) {
    throw new Error(`${relative(source)} is not submission-ready: ${errors.join("; ")}`);
  }
}

async function copyStoreListingArtifacts() {
  const artifacts = [];
  await fs.mkdir(storeListingsDir, { recursive: true });
  for (const item of storeListingSources) {
    const data = await readJson(item.source);
    validateStoreListing(item.source, data);
    const target = path.join(storeListingsDir, item.outputFile);
    await fs.copyFile(item.source, target);
    artifacts.push({
      surface: item.surface,
      submissionType: data.submissionType,
      status: data.status,
      ...(await hashFile(target)),
      positiveTestCaseCount: data.positiveTestCases.length,
      negativeTestCaseCount: data.negativeTestCases.length,
      manualStepCount: data.manualBeforeSubmit.length,
    });
  }
  return artifacts;
}

async function buildGoldenPromptEvidence() {
  const { RENDER_TOOL_NAME, renderJsonxResponse } = await import(
    pathToFileURL(path.join(repoRoot, "apps", "jsonx-renderer-app", "src", "render-tool.mjs"))
  );

  const fixtures = Object.fromEntries(
    await Promise.all(
      [
        "support-triage",
        "quiz",
        "slider-poll",
        "motion-subtle",
        "bad-unknown-component",
        "bad-motion-profile",
      ].map(async (name) => [name, await readJson(fixturePath(name))]),
    ),
  );

  const oversizedInput = {
    purpose: "Reject oversized generated UI payload.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Oversized Payload",
        summary: "This generated payload should fail the size limit.",
      },
      children: [
        {
          component: "TextBlock",
          props: {
            text: "x".repeat(70000),
          },
        },
      ],
    },
  };
  const unsafeFieldInput = {
    purpose: "Reject unsafe generated UI fields.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Unsafe Payload",
        summary: "This generated payload should fail the safe output profile.",
        dangerouslySetInnerHTML: { __html: "<strong>unsafe</strong>" },
        onClick: "alert(1)",
      },
      children: [],
    },
  };

  const cases = [
    {
      id: "direct-ui-request",
      prompt: "Create a JSONX triage view for these support tickets.",
      expectedToolCall: true,
      expectedOutcome: "valid",
      input: renderInputFromFixture(fixtures["support-triage"]),
    },
    {
      id: "text-only-request",
      prompt: "Explain what JSONX is in one paragraph.",
      expectedToolCall: false,
      expectedOutcome: "text-only",
      textResponse:
        "JSONX represents React UI as structured JSON data so a host can validate it before rendering approved components.",
    },
    {
      id: "quiz-request",
      prompt: "Make a short practice quiz for the JSONX safe output contract.",
      expectedToolCall: true,
      expectedOutcome: "valid",
      input: renderInputFromFixture(fixtures.quiz),
    },
    {
      id: "poll-request",
      prompt: "Create a slider poll to rank implementation priority.",
      expectedToolCall: true,
      expectedOutcome: "valid",
      input: renderInputFromFixture(fixtures["slider-poll"]),
    },
    {
      id: "blocked-prop-request",
      prompt: "Render a JSONX payload that includes dangerouslySetInnerHTML and an onClick handler.",
      expectedToolCall: true,
      expectedOutcome: "validation-error",
      input: unsafeFieldInput,
    },
    {
      id: "oversized-payload-request",
      prompt: "Render a payload that exceeds the configured size limit.",
      expectedToolCall: true,
      expectedOutcome: "validation-error",
      input: oversizedInput,
    },
    {
      id: "unsupported-component-request",
      prompt: "Render a chart component that is not on the allowlist.",
      expectedToolCall: true,
      expectedOutcome: "validation-error",
      input: renderInputFromFixture(fixtures["bad-unknown-component"]),
    },
    {
      id: "motion-request",
      prompt: "Render a JSONX UI with the subtle-enter motion profile.",
      expectedToolCall: true,
      expectedOutcome: "valid",
      input: renderInputFromFixture(fixtures["motion-subtle"]),
    },
    {
      id: "bad-motion-request",
      prompt: "Render a JSONX UI with a spin-forever motion profile.",
      expectedToolCall: true,
      expectedOutcome: "validation-error",
      input: renderInputFromFixture(fixtures["bad-motion-profile"]),
    },
  ];

  const results = cases.map((testCase) => {
    if (!testCase.expectedToolCall) {
      return {
        id: testCase.id,
        prompt: testCase.prompt,
        expectedToolCall: false,
        expectedOutcome: testCase.expectedOutcome,
        observed: {
          toolCalled: false,
          assistantText: testCase.textResponse,
        },
      };
    }

    const result = renderJsonxResponse(testCase.input);
    const observedError = result.isError === true;
    const expectedError = testCase.expectedOutcome === "validation-error";
    if (observedError !== expectedError) {
      throw new Error(`${testCase.id} expected ${testCase.expectedOutcome} but received ${observedError ? "validation-error" : "valid"}`);
    }

    return {
      id: testCase.id,
      prompt: testCase.prompt,
      expectedToolCall: true,
      toolName: RENDER_TOOL_NAME,
      expectedOutcome: testCase.expectedOutcome,
      toolInput: payloadSummary(testCase.input),
      observed: resultSummary(result),
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    source: "render_jsonx_response local tool contract",
    note: "This is deterministic tool-call evidence for submission review. It is not a captured ChatGPT developer-mode transcript.",
    cases: results,
  };
}

async function captureScreenshots() {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const screenshots = [];
  try {
    console.log("capturing public site screenshot");
    const publicPage = await browser.newPage();
    publicPage.setDefaultTimeout(12000);
    publicPage.setDefaultNavigationTimeout(22000);
    await publicPage.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
    await publicPage.goto(publicSiteUrl, { waitUntil: "domcontentloaded", timeout: 22000 });
    await publicPage.waitForSelector("#plugins", { timeout: 12000 });
    const publicSiteScreenshot = path.join(screenshotsDir, "jsonx-generative-ui-page-desktop.png");
    await saveScreenshot(publicPage, publicSiteScreenshot, { fullPage: false });
    screenshots.push(await hashFile(publicSiteScreenshot));
    await publicPage.close();

    console.log("capturing skills install screenshot");
    const skillsPage = await browser.newPage();
    skillsPage.setDefaultTimeout(12000);
    skillsPage.setDefaultNavigationTimeout(22000);
    await skillsPage.setViewport({ width: 1100, height: 900, deviceScaleFactor: 1 });
    await skillsPage.goto(publicSkillsUrl, { waitUntil: "domcontentloaded", timeout: 22000 });
    const skillsScreenshot = path.join(screenshotsDir, "jsonx-skills-install-readme.png");
    await saveScreenshot(skillsPage, skillsScreenshot, { fullPage: false });
    screenshots.push(await hashFile(skillsScreenshot));
    await skillsPage.close();

    const supportTriageFixture = await readJson(fixturePath("support-triage"));
    const motionFixture = await readJson(fixturePath("motion-subtle"));
    const quizFixture = await readJson(fixturePath("quiz"));
    screenshots.push(
      await captureWidget(browser, supportTriageFixture, {
        fileName: "jsonx-renderer-widget-support-triage-desktop.png",
        viewport: { width: 920, height: 760, deviceScaleFactor: 1 },
      }),
    );
    screenshots.push(
      await captureWidget(browser, motionFixture, {
        fileName: "jsonx-renderer-widget-motion-desktop.png",
        viewport: { width: 920, height: 720, deviceScaleFactor: 1 },
      }),
    );
    screenshots.push(
      await captureWidget(browser, quizFixture, {
        fileName: "jsonx-renderer-widget-quiz-mobile.png",
        viewport: { width: 390, height: 760, deviceScaleFactor: 1, isMobile: true },
      }),
    );
  } finally {
    await browser.close();
  }

  return screenshots;
}

async function captureWidget(browser, structuredContent, options) {
  console.log(`capturing widget screenshot ${options.fileName}`);
  const page = await browser.newPage();
  page.setDefaultTimeout(12000);
  page.setDefaultNavigationTimeout(22000);
  await page.setViewport(options.viewport);
  await page.goto(hostedWidgetUrl, { waitUntil: "domcontentloaded", timeout: 22000 });
  await page.evaluate((data) => {
    window.postMessage(
      {
        jsonrpc: "2.0",
        method: "ui/notifications/tool-result",
        params: {
          structuredContent: data,
        },
      },
      "*",
    );
  }, structuredContent);
  await page.waitForSelector(".jsonx-shell", { timeout: 10000 });
  await new Promise((resolve) => setTimeout(resolve, 600));
  const screenshotPath = path.join(screenshotsDir, options.fileName);
  await saveScreenshot(page, screenshotPath, { fullPage: true });
  await page.close();
  return hashFile(screenshotPath);
}

async function saveScreenshot(page, filePath, options) {
  await Promise.race([
    page.screenshot({ path: filePath, ...options }),
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out capturing ${artifactPath(filePath)}`)), 15000)),
  ]);
}

async function buildNpmBoundaryEvidence() {
  const output = run("npm pack boundary", "npm", ["pack", "--dry-run", "--json"], { capture: true });
  const data = JSON.parse(output);
  const files = data[0].files.map((file) => file.path);
  const blockedPrefixes = [
    "apps/",
    "plugins/",
    "skills/",
    ".agents/",
    ".claude/",
    ".opencode/",
    "docs/intent/",
    "docs/skills/",
    "vscode-extension/",
    ".github/",
  ];
  const blockedTerms = [
    "chatgpt-app-submission",
    "marketplace.json",
    "netlify/",
    "gsap",
    "golden-prompts",
    "hosted-mcp-transcript",
    "skill-installer-evidence",
    "codex-install-evidence",
    "claude-validation-evidence",
    "openai-plugin-submission",
    "claude-code-community-submission",
  ];
  const blocked = files.filter(
    (file) => blockedPrefixes.some((prefix) => file.startsWith(prefix)) || blockedTerms.some((term) => file.includes(term)),
  );
  if (blocked.length) {
    throw new Error(`npm pack includes blocked files: ${blocked.join(", ")}`);
  }
  return {
    packageName: data[0].name,
    packageVersion: data[0].version,
    fileCount: files.length,
    packageBytes: data[0].size,
    excludedPrefixes: blockedPrefixes,
    excludedTerms: blockedTerms,
  };
}

async function writeReviewSummary(manifest) {
  const lines = [
    "# JSONX Submission Artifacts",
    "",
    `Generated: ${manifest.generatedAt}`,
    "",
    "## Packages",
    "",
    "| Surface | Artifact | SHA-256 | Bytes |",
    "| --- | --- | --- | ---: |",
    ...manifest.packages.map((item) => `| ${item.surface} | \`${item.path}\` | \`${item.sha256}\` | ${item.bytes} |`),
    "",
    "## Store Listings",
    "",
    "| Surface | Artifact | Test cases | Manual steps |",
    "| --- | --- | ---: | ---: |",
    ...manifest.storeListings.map(
      (item) =>
        `| ${item.surface} | \`${item.path}\` | ${item.positiveTestCaseCount} positive, ${item.negativeTestCaseCount} negative | ${item.manualStepCount} |`,
    ),
    "",
    "## Screenshots",
    "",
    "| Purpose | Artifact | SHA-256 | Bytes |",
    "| --- | --- | --- | ---: |",
    ...manifest.screenshots.map((item) => `| ${item.purpose} | \`${item.path}\` | \`${item.sha256}\` | ${item.bytes} |`),
    "",
    "## Golden Prompts",
    "",
    manifest.goldenPromptEvidence
      ? `- \`${manifest.goldenPromptEvidence.path}\` covers ${manifest.goldenPromptEvidence.caseCount} prompt outcomes.`
      : "- No golden-prompt evidence was generated.",
    "",
    "## Hosted MCP",
    "",
    manifest.hostedMcpEvidence
      ? `- \`${manifest.hostedMcpEvidence.path}\` records ${manifest.hostedMcpEvidence.stepCount} live endpoint checks from \`${manifest.hostedMcpUrl}\`.`
      : "- Hosted MCP evidence was skipped for this artifact run.",
    "",
    "## Install Evidence",
    "",
    manifest.skillInstallerEvidence
      ? `- \`${manifest.skillInstallerEvidence.path}\` covers ${manifest.skillInstallerEvidence.dryRunMatrixCount} installer dry-runs and ${manifest.skillInstallerEvidence.installSurfaceCount} isolated installs.`
      : "- Skill installer evidence was not generated.",
    manifest.codexInstallEvidence && !manifest.codexInstallEvidence.skipped
      ? `- \`${manifest.codexInstallEvidence.path}\` records an isolated Codex marketplace install with ${manifest.codexInstallEvidence.stepCount} checks.`
      : manifest.codexInstallEvidence
        ? `- \`${manifest.codexInstallEvidence.path}\` records why Codex CLI install evidence was skipped.`
        : "- Codex install evidence was not generated.",
    manifest.claudeValidationEvidence && !manifest.claudeValidationEvidence.skipped
      ? `- \`${manifest.claudeValidationEvidence.path}\` records Claude Code plugin validation with ${manifest.claudeValidationEvidence.stepCount} checks.`
      : manifest.claudeValidationEvidence
        ? `- \`${manifest.claudeValidationEvidence.path}\` records why Claude validation evidence was skipped.`
        : "- Claude validation evidence was not generated.",
    "",
    "## Validation",
    "",
    ...manifest.validation.map((item) => `- ${item}`),
    "",
    "## Submission Notes",
    "",
    "- Codex development install uses `.agents/plugins/marketplace.json` from the repo root.",
    "- Claude Code package remains local until interactive Claude smoke prompts and marketplace submission can run in a Claude-enabled environment.",
    "- ChatGPT app submission starts from `apps/jsonx-renderer-app/chatgpt-app-submission.json` and the hosted MCP endpoint.",
    "- These artifacts live under `docs/intent/`, which is excluded from the root `jsonx` npm package.",
    "",
  ];
  await fs.writeFile(path.join(artifactRoot, "README.md"), lines.join("\n"));
}

async function main() {
  const skipScreenshots = hasArg("--skip-screenshots");
  const skipHostedMcp = hasArg("--skip-hosted-mcp") || process.env.JSONX_SKIP_HOSTED_MCP === "1";
  const skipCodexInstall = hasArg("--skip-codex-install") || process.env.JSONX_SKIP_CODEX_INSTALL === "1";
  const skipClaudeValidation = hasArg("--skip-claude-validation") || process.env.JSONX_SKIP_CLAUDE_VALIDATION === "1";
  await fs.rm(artifactRoot, { recursive: true, force: true });
  await fs.mkdir(packagesDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(storeListingsDir, { recursive: true });

  run("plugin package validation", "node", ["plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs"]);
  run("renderer app check", "npm", ["run", "check"], { cwd: path.join(repoRoot, "apps", "jsonx-renderer-app") });
  run(
    "valid fixture validation",
    "python3",
    [
      "plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py",
      ...validFixtures.map((name) => relative(fixturePath(name))),
    ],
  );
  run("skills docs mirror", "diff", ["-rq", "skills", "docs/skills"]);

  const npmBoundary = await buildNpmBoundaryEvidence();
  const goldenPromptEvidencePath = path.join(artifactRoot, "golden-prompts.json");
  const goldenPromptEvidence = await buildGoldenPromptEvidence();
  await writeJson(goldenPromptEvidencePath, goldenPromptEvidence);
  const goldenPromptArtifact = await hashFile(goldenPromptEvidencePath);
  const hostedMcpEvidencePath = path.join(artifactRoot, "hosted-mcp-transcript.json");
  const hostedMcpEvidence = skipHostedMcp ? null : await buildHostedMcpEvidence();
  let hostedMcpArtifact = null;
  if (hostedMcpEvidence) {
    await writeJson(hostedMcpEvidencePath, hostedMcpEvidence);
    hostedMcpArtifact = await hashFile(hostedMcpEvidencePath);
  }
  const skillInstallerEvidencePath = path.join(artifactRoot, "skill-installer-evidence.json");
  const skillInstallerEvidence = await buildSkillInstallerEvidence();
  await writeJson(skillInstallerEvidencePath, skillInstallerEvidence);
  const skillInstallerArtifact = await hashFile(skillInstallerEvidencePath);
  const codexInstallEvidencePath = path.join(artifactRoot, "codex-install-evidence.json");
  const codexInstallEvidence = await buildCodexInstallEvidence({ skip: skipCodexInstall });
  await writeJson(codexInstallEvidencePath, codexInstallEvidence);
  const codexInstallArtifact = await hashFile(codexInstallEvidencePath);
  const claudeValidationEvidencePath = path.join(artifactRoot, "claude-validation-evidence.json");
  const claudeValidationEvidence = await buildClaudeValidationEvidence({ skip: skipClaudeValidation });
  await writeJson(claudeValidationEvidencePath, claudeValidationEvidence);
  const claudeValidationArtifact = await hashFile(claudeValidationEvidencePath);

  const packages = [];
  packages.push({
    surface: "Codex plugin",
    ...(await zipDirectory(
      "Codex plugin",
      path.join(repoRoot, "plugins", "jsonx-generative-ui-plugin"),
      path.join(packagesDir, "jsonx-generative-ui-codex-plugin.zip"),
    )),
  });
  packages.push({
    surface: "Claude Code plugin",
    ...(await zipDirectory(
      "Claude Code plugin",
      path.join(repoRoot, "plugins", "claude-jsonx-plugin"),
      path.join(packagesDir, "jsonx-claude-code-plugin.zip"),
    )),
  });

  const chatgptSubmissionSource = path.join(repoRoot, "apps", "jsonx-renderer-app", "chatgpt-app-submission.json");
  const chatgptSubmissionCopy = path.join(packagesDir, "chatgpt-app-submission.json");
  await fs.copyFile(chatgptSubmissionSource, chatgptSubmissionCopy);
  packages.push({
    surface: "ChatGPT app submission",
    ...(await hashFile(chatgptSubmissionCopy)),
  });

  const marketplaceSource = path.join(repoRoot, ".agents", "plugins", "marketplace.json");
  const marketplaceCopy = path.join(packagesDir, "codex-local-marketplace.json");
  await fs.copyFile(marketplaceSource, marketplaceCopy);
  packages.push({
    surface: "Codex local marketplace",
    ...(await hashFile(marketplaceCopy)),
  });
  const storeListings = await copyStoreListingArtifacts();

  const screenshots = skipScreenshots
    ? []
    : (await captureScreenshots()).map((item) => ({
        purpose: path.basename(item.path, ".png").replace(/^jsonx-/, "").replaceAll("-", " "),
        ...item,
      }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    hostedWidgetUrl,
    hostedMcpUrl,
    publicSiteUrl,
    publicSkillsUrl,
    packages,
    storeListings,
    screenshots,
    goldenPromptEvidence: {
      ...goldenPromptArtifact,
      caseCount: goldenPromptEvidence.cases.length,
    },
    hostedMcpEvidence: hostedMcpArtifact
      ? {
          ...hostedMcpArtifact,
          stepCount: hostedMcpEvidence.steps.length,
          checks: hostedMcpEvidence.checks,
        }
      : null,
    skillInstallerEvidence: {
      ...skillInstallerArtifact,
      dryRunMatrixCount: skillInstallerEvidence.dryRuns.length,
      installSurfaceCount: skillInstallerEvidence.installs.length,
      checks: skillInstallerEvidence.checks,
    },
    codexInstallEvidence: {
      ...codexInstallArtifact,
      skipped: codexInstallEvidence.skipped === true,
      stepCount: codexInstallEvidence.steps.length,
      checks: codexInstallEvidence.checks,
    },
    claudeValidationEvidence: {
      ...claudeValidationArtifact,
      skipped: claudeValidationEvidence.skipped === true,
      stepCount: claudeValidationEvidence.steps.length,
      checks: claudeValidationEvidence.checks,
      claudeCodePackage: claudeValidationEvidence.claudeCodePackage,
      claudeVersion: claudeValidationEvidence.claudeVersion,
    },
    npmBoundary,
    validation: [
      "node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs",
      "npm run check from apps/jsonx-renderer-app",
      `python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py ${validFixtures.map((name) => `${name}.json`).join(" ")}`,
      "diff -rq skills docs/skills",
      "store listing draft validation",
      "npm pack --dry-run --json package-boundary check",
      "skill installer dry-run and isolated install evidence",
      ...(codexInstallEvidence.skipped ? [] : ["isolated Codex marketplace install evidence"]),
      ...(claudeValidationEvidence.skipped ? [] : ["Claude Code plugin validation evidence"]),
      ...(hostedMcpArtifact ? [`live hosted MCP transcript capture from ${hostedMcpUrl}`] : []),
    ],
  };

  await writeJson(path.join(artifactRoot, "manifest.json"), manifest);
  await writeReviewSummary(manifest);
  console.log(`submission artifacts written to ${artifactPath(artifactRoot) || "."}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
