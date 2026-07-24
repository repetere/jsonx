#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import http from "node:http";
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
const submissionFormsDir = path.join(artifactRoot, "submission-forms");

const hostedWidgetUrl = process.env.JSONX_RENDERER_WIDGET_URL || "https://jsonx-renderer-app.netlify.app/widget";
const hostedMcpUrl = process.env.JSONX_RENDERER_MCP_URL || "https://jsonx-renderer-app.netlify.app/mcp";
const codexCliOverride = process.env.JSONX_CODEX_CLI;
const claudeCodePackage = process.env.JSONX_CLAUDE_CODE_PACKAGE || "@anthropic-ai/claude-code@2.1.218";
const openCodePackage = process.env.JSONX_OPENCODE_PACKAGE || "opencode-ai@1.18.4";
const publicSiteUrl = process.env.JSONX_PUBLIC_SITE_URL || "https://jsonx.net/generative-ui.html";
const publicSkillsUrl = process.env.JSONX_PUBLIC_SKILLS_URL || "https://jsonx.net/skills/README.md";
const externalGateEvidenceSource =
  process.env.JSONX_EXTERNAL_GATE_EVIDENCE || path.join(intentRoot, "external-gate-evidence.json");
const externalGateEvidenceTemplate = path.join(intentRoot, "external-gate-evidence.template.json");

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
const invalidFixtures = [
  "bad-unknown-component",
  "bad-blocked-prop",
  "bad-event-handler",
  "bad-motion-profile",
  "bad-oversized",
];
const motionProfiles = ["none", "subtle-enter", "state-change-highlight", "morph-list-to-detail"];
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
const externalCliTimeoutMs = Number(process.env.JSONX_EXTERNAL_CLI_TIMEOUT_MS || 120000);

const installerSurfaces = ["codex", "claude", "opencode"];
const installerSkills = ["jsonx", "jsonx-generative-ui", "all"];
const storeListingSources = [
  {
    surface: "OpenAI core JSONX plugin portal draft",
    source: path.join(intentRoot, "store-listings", "openai-jsonx-plugin-submission.json"),
    outputFile: "openai-jsonx-plugin-submission.json",
  },
  {
    surface: "OpenAI generative UI plugin portal draft",
    source: path.join(intentRoot, "store-listings", "openai-generative-ui-plugin-submission.json"),
    outputFile: "openai-generative-ui-plugin-submission.json",
  },
  {
    surface: "Claude Code core JSONX community submission draft",
    source: path.join(intentRoot, "store-listings", "claude-code-jsonx-submission.json"),
    outputFile: "claude-code-jsonx-submission.json",
  },
  {
    surface: "Claude Code generative UI community submission draft",
    source: path.join(intentRoot, "store-listings", "claude-code-generative-ui-submission.json"),
    outputFile: "claude-code-generative-ui-submission.json",
  },
];

const submissionQueueTargets = {
  "openai-jsonx-plugin-submission.json": {
    id: "openai-core-jsonx",
    submitterLabel: "OpenAI/Codex core JSONX plugin",
    marketplaceTarget: "openai-core",
    receiptCheck: "openAiCoreSubmissionRecorded",
    receiptFields: [
      "marketplaceSubmissions.openaiCore.submitted",
      "marketplaceSubmissions.openaiCore.submissionId",
      "marketplaceSubmissions.openaiCore.url",
      "marketplaceSubmissions.openaiCore.status",
      "marketplaceSubmissions.openaiCore.submittedAt",
    ],
    externalGatesToRecord: ["appIds", "marketplaceSubmission"],
  },
  "openai-generative-ui-plugin-submission.json": {
    id: "openai-generative-ui",
    submitterLabel: "OpenAI/Codex generative UI app-plus-skills plugin",
    marketplaceTarget: "openai-generative-ui",
    receiptCheck: "openAiGenerativeUiSubmissionRecorded",
    receiptFields: [
      "marketplaceSubmissions.openaiGenerativeUi.submitted",
      "marketplaceSubmissions.openaiGenerativeUi.submissionId",
      "marketplaceSubmissions.openaiGenerativeUi.url",
      "marketplaceSubmissions.openaiGenerativeUi.status",
      "marketplaceSubmissions.openaiGenerativeUi.submittedAt",
    ],
    externalGatesToRecord: ["appIds", "chatgptDeveloperMode", "marketplaceSubmission"],
  },
  "claude-code-jsonx-submission.json": {
    id: "claude-core-jsonx",
    submitterLabel: "Claude Code core JSONX plugin",
    marketplaceTarget: "claude-core",
    receiptCheck: "claudeCoreSubmissionRecorded",
    receiptFields: [
      "marketplaceSubmissions.claudeCore.submitted",
      "marketplaceSubmissions.claudeCore.submissionId",
      "marketplaceSubmissions.claudeCore.url",
      "marketplaceSubmissions.claudeCore.status",
      "marketplaceSubmissions.claudeCore.submittedAt",
    ],
    externalGatesToRecord: ["claudeSmoke", "marketplaceSubmission"],
  },
  "claude-code-generative-ui-submission.json": {
    id: "claude-generative-ui",
    submitterLabel: "Claude Code generative UI plugin",
    marketplaceTarget: "claude-generative-ui",
    receiptCheck: "claudeGenerativeUiSubmissionRecorded",
    receiptFields: [
      "marketplaceSubmissions.claudeGenerativeUi.submitted",
      "marketplaceSubmissions.claudeGenerativeUi.submissionId",
      "marketplaceSubmissions.claudeGenerativeUi.url",
      "marketplaceSubmissions.claudeGenerativeUi.status",
      "marketplaceSubmissions.claudeGenerativeUi.submittedAt",
    ],
    externalGatesToRecord: ["claudeSmoke", "marketplaceSubmission"],
  },
};

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

function evidenceSourcePath(filePath) {
  const repoRelative = path.relative(repoRoot, filePath);
  if (!repoRelative.startsWith("..") && !path.isAbsolute(repoRelative)) return repoRelative;
  return artifactPath(filePath);
}

function run(label, command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    timeout: options.timeoutMs,
    env: {
      ...process.env,
      PATH: `${process.env.HOME}/.nvm/versions/node/v22.21.1/bin:${process.env.PATH}`,
      ...options.env,
    },
  });

  if (result.status !== 0) {
    const message = [`${label} failed with exit code ${result.status}`];
    if (result.signal) message.push(`signal: ${result.signal}`);
    if (result.error) message.push(result.error.message);
    if (result.stdout) message.push(result.stdout.trim());
    if (result.stderr) message.push(result.stderr.trim());
    throw new Error(message.filter(Boolean).join("\n"));
  }

  return result.stdout?.trim() || "";
}

function pathFromGitStatusLine(line) {
  const value = line.slice(3).trim();
  const renameSeparator = " -> ";
  const pathValue = value.includes(renameSeparator) ? value.split(renameSeparator).pop() : value;
  return pathValue.replace(/^"|"$/g, "");
}

function buildSourceGitSnapshot() {
  const headCommit = run("git commit for submission audit", "git", ["rev-parse", "HEAD"], { capture: true });
  const statusResult = spawnSync("git", ["status", "--short"], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (statusResult.status !== 0) {
    throw new Error(`git worktree status for submission audit failed with exit code ${statusResult.status}`);
  }
  const statusLines = statusResult.stdout.split(/\r?\n/).filter(Boolean);
  const artifactRootRelative = path.relative(repoRoot, artifactRoot);
  const artifactPrefix =
    artifactRootRelative && !artifactRootRelative.startsWith("..") && !path.isAbsolute(artifactRootRelative)
      ? `${artifactRootRelative.replaceAll(path.sep, "/")}/`
      : null;
  const sourceStatus = artifactPrefix
    ? statusLines.filter((line) => {
        const statusPath = pathFromGitStatusLine(line);
        return statusPath !== artifactRootRelative && !statusPath.startsWith(artifactPrefix);
      })
    : statusLines;

  return {
    headCommit,
    dirtyStatus: sourceStatus,
    ignoredGeneratedArtifactStatusCount: statusLines.length - sourceStatus.length,
  };
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

function contentTypeFor(filePath) {
  const extension = path.extname(filePath);
  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml; charset=utf-8",
    }[extension] || "application/octet-stream"
  );
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function listenOnLoopback(server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  assertEvidence(address && typeof address === "object", "local browser demo server did not bind to a port");
  return `http://127.0.0.1:${address.port}`;
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function startStaticSiteServer() {
  const siteRoot = path.join(repoRoot, "site");
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/generative-ui.html" : requestUrl.pathname);
      const filePath = path.resolve(siteRoot, `.${pathname}`);
      if (!filePath.startsWith(`${siteRoot}${path.sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const body = await fs.readFile(filePath);
      response.writeHead(200, { "content-type": contentTypeFor(filePath) }).end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
    }
  });
  const origin = await listenOnLoopback(server);
  return {
    origin,
    url: `${origin}/generative-ui.html`,
    close: () => closeServer(server),
  };
}

function browserEndpointPayload() {
  return {
    schema: "jsonx.generative-ui.v1",
    purpose: "Render a browser endpoint JSONX response.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Endpoint JSONX Response",
        summary: "Returned by a temporary CORS endpoint during browser evidence capture.",
      },
      children: [
        {
          component: "ChoiceList",
          props: {
            question: "Which follow-up should the agent prepare?",
            selectionMode: "single",
            items: [{ label: "Draft response" }, { label: "Open customer timeline" }],
          },
        },
      ],
    },
  };
}

async function startBrowserEndpointServer() {
  const requests = [];
  const server = http.createServer(async (request, response) => {
    const origin = request.headers.origin || "*";
    const corsHeaders = {
      "access-control-allow-headers": "content-type,authorization",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-origin": origin,
      vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      requests.push({
        method: "OPTIONS",
        origin,
        requestedHeaders: request.headers["access-control-request-headers"],
        requestedMethod: request.headers["access-control-request-method"],
      });
      response.writeHead(204, corsHeaders).end();
      return;
    }

    if (request.method !== "POST") {
      response.writeHead(405, corsHeaders).end();
      return;
    }

    const body = await readRequestBody(request);
    let parsedBody = {};
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = {};
    }
    requests.push({
      method: "POST",
      origin,
      contentType: request.headers["content-type"],
      authorizationHeaderPresent: Boolean(request.headers.authorization),
      authorizationScheme: request.headers.authorization?.split(/\s+/)[0] || null,
      prompt: parsedBody.prompt,
    });
    response
      .writeHead(200, {
        ...corsHeaders,
        "content-type": "application/json; charset=utf-8",
      })
      .end(JSON.stringify(browserEndpointPayload()));
  });
  const origin = await listenOnLoopback(server);
  return {
    origin,
    url: `${origin}/generate`,
    requests,
    close: () => closeServer(server),
  };
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

function allChecksTrue(checks = {}) {
  const booleanEntries = Object.entries(checks).filter(([, value]) => typeof value === "boolean");
  return booleanEntries.length > 0 && booleanEntries.every(([, value]) => value === true);
}

function assertEvidence(condition, message) {
  if (!condition) throw new Error(`Submission evidence failed: ${message}`);
}

function errorTimedOut(error) {
  return /ETIMEDOUT|SIGTERM/.test(error?.message || "");
}

async function readPriorCommittedArtifact(filePath) {
  if (await fileExists(filePath)) {
    return { data: await readJson(filePath), source: evidenceSourcePath(filePath) };
  }
  const repoRelative = path.relative(repoRoot, filePath);
  if (repoRelative.startsWith("..") || path.isAbsolute(repoRelative)) return null;
  const result = spawnSync("git", ["show", `HEAD:${repoRelative}`], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) return null;
  return { data: JSON.parse(result.stdout), source: `HEAD:${repoRelative}` };
}

async function reusePriorExternalCliEvidence({ artifactFileName, source, error, expectedChecks }) {
  if (!errorTimedOut(error)) return null;
  const priorPath = path.join(artifactRoot, artifactFileName);
  const priorArtifact = await readPriorCommittedArtifact(priorPath);
  if (!priorArtifact) return null;
  const prior = priorArtifact.data;
  if (prior.skipped === true) return null;
  const checks = prior.checks || {};
  if (!expectedChecks.every((key) => checks[key] === true)) return null;
  return {
    ...prior,
    generatedAt: new Date().toISOString(),
    note: `${prior.note || source} Previous successful evidence was reused because the current external CLI probe timed out.`,
    reusedPreviousEvidence: true,
    previousGeneratedAt: prior.generatedAt,
    priorArtifact: priorArtifact.source,
    reuseReason: error.message,
  };
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
  const codexRunOptions = { capture: true, env, timeoutMs: externalCliTimeoutMs };

  console.log("capturing isolated Codex plugin install evidence");

  try {
    const version = run("codex version", codexCli, ["--version"], codexRunOptions);
    steps.push({
      id: "codex-version",
      command: "codex --version",
      stdout: version,
    });

    const marketplaceAdd = parseJsonOutput(
      "codex plugin marketplace add",
      run("codex marketplace add", codexCli, ["plugin", "marketplace", "add", ".", "--json"], codexRunOptions),
    );
    assertEvidence(marketplaceAdd.marketplaceName === "jsonx-local", "Codex marketplace add did not return jsonx-local");
    steps.push({
      id: "marketplace-add",
      command: "codex plugin marketplace add . --json",
      result: sanitizeEvidence(marketplaceAdd, replacements),
    });

    const marketplaces = parseJsonOutput(
      "codex plugin marketplace list",
      run("codex marketplace list", codexCli, ["plugin", "marketplace", "list", "--json"], codexRunOptions),
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
      run("codex plugin list available", codexCli, ["plugin", "list", "--available", "--json"], codexRunOptions),
    );
    const codexPlugins = [
      {
        pluginId: "jsonx-codex-plugin@jsonx-local",
        cachedFiles: [".codex-plugin/plugin.json", "README.md", "skills/jsonx/SKILL.md"],
      },
      {
        pluginId: "jsonx-generative-ui-plugin@jsonx-local",
        cachedFiles: [
          ".codex-plugin/plugin.json",
          "README.md",
          "skills/jsonx-generative-ui/SKILL.md",
          "fixtures/support-triage.json",
          "scripts/validate-jsonx-ui.py",
        ],
      },
    ];
    const availablePlugins = codexPlugins.map((expected) => {
      const plugin = available.available?.find((item) => item.pluginId === expected.pluginId);
      assertEvidence(plugin, `Codex available list did not include ${expected.pluginId}`);
      return plugin;
    });
    steps.push({
      id: "available-list",
      command: "codex plugin list --available --json",
      result: sanitizeEvidence({ plugins: availablePlugins }, replacements),
    });

    const installedPaths = new Map();
    for (const expected of codexPlugins) {
      const pluginAdd = parseJsonOutput(
        `codex plugin add ${expected.pluginId}`,
        run("codex plugin add", codexCli, ["plugin", "add", expected.pluginId, "--json"], {
          ...codexRunOptions,
        }),
      );
      assertEvidence(pluginAdd.pluginId === expected.pluginId, `Codex plugin add returned the wrong plugin id for ${expected.pluginId}`);
      installedPaths.set(expected.pluginId, pluginAdd.installedPath);
      steps.push({
        id: `plugin-add-${expected.pluginId.replace(/[@.]/g, "-")}`,
        command: `codex plugin add ${expected.pluginId} --json`,
        result: sanitizeEvidence(pluginAdd, replacements),
      });
    }

    const installed = parseJsonOutput(
      "codex plugin list installed",
      run("codex plugin list installed", codexCli, ["plugin", "list", "--json"], codexRunOptions),
    );
    const installedPlugins = codexPlugins.map((expected) => {
      const plugin = installed.installed?.find((item) => item.pluginId === expected.pluginId);
      assertEvidence(plugin?.enabled === true, `Codex installed list did not show ${expected.pluginId} enabled`);
      return plugin;
    });
    steps.push({
      id: "installed-list",
      command: "codex plugin list --json",
      result: sanitizeEvidence({ plugins: installedPlugins }, replacements),
    });

    const cachedFileChecks = [];
    for (const expected of codexPlugins) {
      const installedPath = installedPaths.get(expected.pluginId);
      for (const file of expected.cachedFiles) {
        const filePath = path.join(installedPath, file);
        const present = await fileExists(filePath);
        assertEvidence(present, `Codex plugin cache for ${expected.pluginId} is missing ${file}`);
        cachedFileChecks.push({
          pluginId: expected.pluginId,
          path: sanitizeEvidence(filePath, replacements),
          present,
        });
      }
    }
    steps.push({
      id: "cache-files",
      command: "inspect installed plugin cache",
      result: { cachedFileChecks },
    });

    return {
      generatedAt: new Date().toISOString(),
      source: "codex plugin CLI",
      note: "This evidence installs the repo-local core JSONX and generative UI Codex plugins from the repo-local marketplace using an isolated CODEX_HOME.",
      skipped: false,
      codexCli: sanitizeEvidence(codexCli, replacements),
      tempHome: "$CODEX_HOME",
      pluginIds: codexPlugins.map((plugin) => plugin.pluginId),
      checks: {
        marketplaceAdded: true,
        availableBeforeInstall: true,
        corePluginInstalled: true,
        generativeUiPluginInstalled: true,
        corePluginEnabled: true,
        generativeUiPluginEnabled: true,
        cachedFilesPresent: true,
      },
      steps,
    };
  } catch (error) {
    const reused = await reusePriorExternalCliEvidence({
      artifactFileName: "codex-install-evidence.json",
      source: "codex plugin CLI",
      error,
      expectedChecks: [
        "marketplaceAdded",
        "availableBeforeInstall",
        "corePluginInstalled",
        "generativeUiPluginInstalled",
        "corePluginEnabled",
        "generativeUiPluginEnabled",
        "cachedFilesPresent",
      ],
    });
    if (reused) return reused;
    throw error;
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
  const npmExecOptions = { capture: true, env, timeoutMs: externalCliTimeoutMs };
  const pluginTargets = [
    {
      id: "jsonx",
      path: path.join(repoRoot, "plugins", "claude-jsonx-plugin"),
      commandPath: "./plugins/claude-jsonx-plugin",
    },
    {
      id: "jsonx-generative-ui",
      path: path.join(repoRoot, "plugins", "claude-jsonx-generative-ui-plugin"),
      commandPath: "./plugins/claude-jsonx-generative-ui-plugin",
    },
  ];
  const steps = [];

  console.log("capturing Claude Code plugin validation evidence");

  try {
    const version = run(
      "claude version via npm exec",
      "npm",
      ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "--version"],
      npmExecOptions,
    );
    assertEvidence(version.includes("Claude Code"), "Claude Code version output did not identify Claude Code");
    steps.push({
      id: "claude-version",
      command: `npm exec --yes --package ${claudeCodePackage} -- claude --version`,
      stdout: sanitizeEvidence(version, replacements),
    });

    for (const target of pluginTargets) {
      const validation = run(
        `claude plugin validate ${target.commandPath}`,
        "npm",
        ["exec", "--yes", "--package", claudeCodePackage, "--", "claude", "plugin", "validate", target.commandPath],
        npmExecOptions,
      );
      assertEvidence(validation.includes("Validation passed"), `claude plugin validate did not report success for ${target.id}`);
      steps.push({
        id: `plugin-validate-${target.id}`,
        command: `npm exec --yes --package ${claudeCodePackage} -- claude plugin validate ${target.commandPath}`,
        stdout: sanitizeEvidence(validation.split("\n").filter(Boolean), replacements),
      });
    }

    return {
      generatedAt: new Date().toISOString(),
      source: "claude plugin validate",
      note: "This evidence runs Claude Code from the npm package with a temporary npm cache and validates the core JSONX and generative UI Claude Code plugin manifests.",
      skipped: false,
      claudeCodePackage,
      claudeVersion: version,
      plugins: pluginTargets.map((target) => ({
        id: target.id,
        path: sanitizeEvidence(target.path, replacements),
      })),
      tempNpmCache: "$NPM_CACHE",
      checks: {
        cliAvailableViaNpmExec: true,
        corePluginValidationPassed: true,
        generativeUiPluginValidationPassed: true,
      },
      steps,
    };
  } catch (error) {
    const reused = await reusePriorExternalCliEvidence({
      artifactFileName: "claude-validation-evidence.json",
      source: "claude plugin validate",
      error,
      expectedChecks: ["cliAvailableViaNpmExec", "corePluginValidationPassed", "generativeUiPluginValidationPassed"],
    });
    if (reused) return reused;
    throw error;
  } finally {
    await fs.rm(tempCache, { recursive: true, force: true });
  }
}

function openCodeSkillSummary(skill, replacements) {
  const content = skill.content || "";
  return {
    name: skill.name,
    description: skill.description,
    location: sanitizeEvidence(skill.location, replacements),
    contentBytes: Buffer.byteLength(content, "utf8"),
    contentSha256: createHash("sha256").update(content).digest("hex"),
  };
}

async function buildOpenCodeSkillEvidence({ skip }) {
  if (skip) {
    return {
      generatedAt: new Date().toISOString(),
      source: "opencode debug skill",
      skipped: true,
      reason: "Skipped by --skip-opencode-validation or JSONX_SKIP_OPENCODE_VALIDATION=1.",
      checks: {},
      steps: [],
    };
  }

  const tempProject = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-opencode-project."));
  const tempCache = await fs.mkdtemp(path.join(os.tmpdir(), "jsonx-opencode-npm."));
  const realTempProject = await fs.realpath(tempProject);
  const realTempCache = await fs.realpath(tempCache);
  const replacements = [
    [realTempProject, "$OPENCODE_PROJECT"],
    [tempProject, "$OPENCODE_PROJECT"],
    [realTempCache, "$NPM_CACHE"],
    [tempCache, "$NPM_CACHE"],
    [repoRoot, "$REPO_ROOT"],
  ];
  const env = {
    npm_config_cache: tempCache,
    OPENCODE_DISABLE_EXTERNAL_SKILLS: "1",
    OPENCODE_DISABLE_CLAUDE_CODE_SKILLS: "1",
  };
  const npmExecOptions = { cwd: tempProject, capture: true, env, timeoutMs: externalCliTimeoutMs };
  const skillRoot = path.join(tempProject, ".opencode", "skills");
  const steps = [];

  console.log("capturing OpenCode skill discovery evidence");

  try {
    const installOutput = run(
      "opencode skill install",
      "node",
      [
        "skills/scripts/install-jsonx-skill.mjs",
        "--surface",
        "opencode",
        "--skill",
        "all",
        "--scope",
        "project",
        "--target",
        skillRoot,
        "--force",
      ],
      { capture: true, env },
    );
    for (const skill of ["jsonx", "jsonx-generative-ui"]) {
      assertEvidence(await fileExists(path.join(skillRoot, skill, "SKILL.md")), `OpenCode temp project missing ${skill}`);
    }
    steps.push({
      id: "install-opencode-skills",
      command: "node skills/scripts/install-jsonx-skill.mjs --surface opencode --skill all --scope project --target $OPENCODE_PROJECT/.opencode/skills --force",
      stdout: sanitizeEvidence(installOutput.split("\n").filter(Boolean), replacements),
    });

    const version = run(
      "opencode version via npm exec",
      "npm",
      ["exec", "--yes", "--package", openCodePackage, "--", "opencode", "--version"],
      npmExecOptions,
    );
    assertEvidence(Boolean(version), "OpenCode version output was empty");
    steps.push({
      id: "opencode-version",
      command: `npm exec --yes --package ${openCodePackage} -- opencode --version`,
      stdout: sanitizeEvidence(version, replacements),
    });

    const debugOutput = run(
      "opencode debug skill",
      "npm",
      ["exec", "--yes", "--package", openCodePackage, "--", "opencode", "debug", "skill"],
      npmExecOptions,
    );
    const skills = parseJsonOutput("opencode debug skill", debugOutput);
    const jsonxSkill = skills.find((skill) => skill.name === "jsonx");
    const generativeUiSkill = skills.find((skill) => skill.name === "jsonx-generative-ui");
    assertEvidence(jsonxSkill, "opencode debug skill did not list jsonx");
    assertEvidence(generativeUiSkill, "opencode debug skill did not list jsonx-generative-ui");
    assertEvidence(jsonxSkill.location?.includes(tempProject), "jsonx skill was not loaded from the temp OpenCode project");
    assertEvidence(
      generativeUiSkill.location?.includes(tempProject),
      "jsonx-generative-ui skill was not loaded from the temp OpenCode project",
    );
    steps.push({
      id: "debug-skill",
      command: `npm exec --yes --package ${openCodePackage} -- opencode debug skill`,
      result: {
        totalSkillsListed: skills.length,
        skillNames: skills.map((skill) => skill.name),
        jsonx: openCodeSkillSummary(jsonxSkill, replacements),
        jsonxGenerativeUi: openCodeSkillSummary(generativeUiSkill, replacements),
      },
    });

    return {
      generatedAt: new Date().toISOString(),
      source: "opencode debug skill",
      note: "This evidence installs the OpenCode JSONX skills into a temporary project and verifies OpenCode can discover both project skills.",
      skipped: false,
      openCodePackage,
      openCodeVersion: version,
      tempProject: "$OPENCODE_PROJECT",
      tempNpmCache: "$NPM_CACHE",
      checks: {
        cliAvailableViaNpmExec: true,
        projectSkillsInstalled: true,
        debugSkillListedJsonx: true,
        debugSkillListedGenerativeUi: true,
      },
      steps,
    };
  } catch (error) {
    const reused = await reusePriorExternalCliEvidence({
      artifactFileName: "opencode-skill-evidence.json",
      source: "opencode debug skill",
      error,
      expectedChecks: ["cliAvailableViaNpmExec", "projectSkillsInstalled", "debugSkillListedJsonx", "debugSkillListedGenerativeUi"],
    });
    if (reused) return reused;
    throw error;
  } finally {
    await fs.rm(tempProject, { recursive: true, force: true });
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
  for (const key of [
    "readinessChecklist",
    "artifactManifest",
    "submissionQueue",
    "reviewPackage",
    "storeListingCopy",
    "submissionAudit",
    "externalGateEvidence",
    "externalGateRunbook",
  ]) {
    const url = data.publicEvidence?.[key];
    if (!url || typeof url !== "string" || !url.startsWith("https://jsonx.net/")) {
      errors.push(`publicEvidence.${key} must be a https://jsonx.net/ URL`);
    }
  }
  if (data.surface === "openai-plugin-portal") {
    if (!["skills-plugin", "app-plus-skills"].includes(data.submissionType)) {
      errors.push("OpenAI draft must be skills-plugin or app-plus-skills");
    }
    if (data.submissionType === "app-plus-skills" && !data.mcpServer?.url) {
      errors.push("OpenAI app-plus-skills draft requires mcpServer.url");
    }
    if (!Array.isArray(data.bundledSkills) || data.bundledSkills.length < 1) {
      errors.push("OpenAI draft must include at least one bundled skill");
    }
  }
  if (data.surface === "claude-code-community-marketplace") {
    if (!data.marketplace?.target) errors.push("Claude draft requires marketplace.target");
    if (!Array.isArray(data.skills) || data.skills.length < 1) {
      errors.push("Claude draft must include at least one plugin skill");
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

function publicSubmissionFormUrl(id) {
  return `https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/${id}.md`;
}

function publicExternalGateRunbookUrl() {
  return "https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md";
}

function markdownValue(value) {
  if (value === undefined || value === null || value === "") return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function markdownFieldList(fields) {
  return Object.entries(fields)
    .filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== "";
    })
    .map(([key, value]) => `- ${key}: ${markdownValue(value)}`)
    .join("\n");
}

function codeBlock(language, value) {
  const text = markdownValue(value);
  return ["```" + language, text, "```"].join("\n");
}

function testCaseLines(testCases, mode) {
  return testCases.flatMap((testCase) => {
    const lines = [
      `### ${testCase.id}`,
      "",
      "- User prompt:",
      "",
      codeBlock("text", testCase.userPrompt),
      "",
      `- Expected behavior: ${testCase.expectedBehavior}`,
    ];
    if (testCase.expectedResultShape) lines.push(`- Expected result shape: ${testCase.expectedResultShape}`);
    if (testCase.fixtureData) lines.push(`- Fixture data: \`${testCase.fixtureData}\``);
    if (testCase.whyNotComplete) lines.push(`- Why not complete: ${testCase.whyNotComplete}`);
    lines.push("");
    if (mode === "negative") {
      lines.push("- Submission expectation: reject, refuse, or answer normally without invoking generated UI.", "");
    }
    return lines;
  });
}

function recorderCommandsForSubmission(submission, queue) {
  const commands = [];
  for (const gate of submission.externalGatesToRecord || []) {
    if (gate === "appIds") commands.push(...(queue.externalGateRecorderCommands.appIds || []));
    if (gate === "chatgptDeveloperMode") commands.push(...(queue.externalGateRecorderCommands.chatgptDeveloperMode || []));
    if (gate === "claudeSmoke") commands.push(...(queue.externalGateRecorderCommands.claudeSmoke || []));
    if (gate === "marketplaceSubmission") {
      commands.push(...(queue.externalGateRecorderCommands.policyReview || []), submission.receiptRecorderCommand);
    }
  }
  return [...new Set(commands.filter(Boolean))];
}

function sourcePackageFields(data) {
  return {
    "Plugin package path": data.pluginPackage?.path,
    "Plugin package entrypoint": data.pluginPackage?.entrypoint,
    "MCP URL": data.mcpServer?.url,
    "MCP health URL": data.mcpServer?.healthUrl,
    "MCP authentication": data.mcpServer?.authentication,
    "Domain verification required": data.mcpServer?.domainVerificationRequired,
    "Recommended initial scope": data.availability?.recommendedInitialScope,
  };
}

function skillNames(data) {
  const skills = data.bundledSkills || data.skills || [];
  return skills.map((skill) => `${skill.name}${skill.path ? ` (${skill.path})` : ""}`);
}

function writePortalSubmissionFormMarkdown({ data, submission, queue, filePath }) {
  const listing = data.listing || {};
  const listingName = listing.displayName || listing.pluginName;
  const recorderCommands = recorderCommandsForSubmission(submission, queue);
  const lines = [
    `# ${submission.label} Portal Packet`,
    "",
    `Generated: ${queue.generatedAt}`,
    "",
    "Use this packet as copy source for the public submission portal. It is generated from the tracked store listing draft and is not proof that the submission was sent.",
    "",
    "## Submission Target",
    "",
    markdownFieldList({
      Surface: submission.surface,
      "Submission type": submission.submissionType,
      "Listing name": listingName,
      Status: submission.status,
      "Source draft": submission.sourceDraft,
      "Generated draft": submission.generatedDraft,
      "Review package": submission.publicReviewPackage,
      "Public listing copy": submission.publicStoreListing,
    }),
    "",
    "## Listing Copy",
    "",
    markdownFieldList({
      "Plugin name": listing.pluginName,
      "Display name": listing.displayName,
      Category: listing.category,
      Publisher: listing.publisher,
      License: listing.license,
      "Logo status": listing.logoStatus,
    }),
    "",
    "### Short Description",
    "",
    codeBlock("text", listing.shortDescription),
    "",
    "### Long Description",
    "",
    codeBlock("text", listing.longDescription),
    "",
    "## URLs",
    "",
    markdownFieldList({
      Website: listing.websiteUrl || listing.homepage,
      Repository: listing.repository,
      Support: listing.supportUrl,
      "Privacy policy": listing.privacyPolicyUrl,
      Terms: listing.termsUrl,
    }),
    "",
    "## Package And App Metadata",
    "",
    markdownFieldList(sourcePackageFields(data)) || "- No extra package metadata is required.",
    "",
    "## Skills",
    "",
    skillNames(data).length ? markdownList(skillNames(data)) : "- No bundled skills listed.",
    "",
    "## Starter Prompts",
    "",
    Array.isArray(data.starterPrompts) && data.starterPrompts.length ? markdownList(data.starterPrompts) : "- No starter prompts listed.",
    "",
    "## Before Submit",
    "",
    checklist(data.manualBeforeSubmit || []),
    "",
    "## Positive Test Cases",
    "",
    ...testCaseLines(data.positiveTestCases || [], "positive"),
    "## Negative Test Cases",
    "",
    ...testCaseLines(data.negativeTestCases || [], "negative"),
    "## Public Evidence URLs",
    "",
    markdownList(Object.entries(submission.publicEvidence).map(([key, value]) => `\`${key}\`: ${value}`)),
    "",
    "## Receipt Fields",
    "",
    markdownList(submission.receiptFields.map((field) => `\`${field}\``)),
    "",
    "## Recorder Commands",
    "",
    "Run these only after the matching external evidence exists.",
    "",
    codeBlock("bash", recorderCommands.join("\n")),
    "",
    "## Source Docs Checked",
    "",
    markdownList(data.sourceDocsChecked || []),
    "",
  ];
  return fs.writeFile(filePath, `${lines.join("\n")}\n`);
}

async function writeSubmissionFormArtifacts(queue) {
  const artifacts = [];
  await fs.mkdir(submissionFormsDir, { recursive: true });
  for (const submission of queue.submissions) {
    const data = await readJson(path.resolve(repoRoot, submission.sourceDraft));
    const filePath = path.join(submissionFormsDir, `${submission.id}.md`);
    await writePortalSubmissionFormMarkdown({ data, submission, queue, filePath });
    artifacts.push({
      id: submission.id,
      label: submission.label,
      surface: submission.surface,
      url: submission.portalForm,
      ...(await hashFile(filePath)),
    });
  }
  return artifacts;
}

async function buildSubmissionQueue(manifest, externalGateEvidence) {
  const submissions = [];
  for (const item of storeListingSources) {
    const data = await readJson(item.source);
    const queueTarget = submissionQueueTargets[item.outputFile];
    assertEvidence(queueTarget, `submission queue target is missing for ${item.outputFile}`);
    const storeListingArtifact = manifest.storeListings.find((listing) => listing.surface === item.surface);
    const receiptRecorded = externalGateEvidence.checks?.[queueTarget.receiptCheck] === true;
    const publicEvidence = data.publicEvidence || {};
    submissions.push({
      id: queueTarget.id,
      label: queueTarget.submitterLabel,
      surface: item.surface,
      sourceDraft: relative(item.source),
      generatedDraft: storeListingArtifact?.path,
      status: receiptRecorded ? "receipt-recorded" : "pending-manual-submission",
      submissionStatus: data.status,
      submissionType: data.submissionType,
      listingName: data.listing?.displayName || data.listing?.pluginName,
      publicReviewPackage: publicEvidence.reviewPackage,
      publicStoreListing: publicEvidence.storeListingCopy,
      portalForm: publicSubmissionFormUrl(queueTarget.id),
      publicEvidence,
      positiveTestCaseIds: data.positiveTestCases.map((testCase) => testCase.id),
      negativeTestCaseIds: data.negativeTestCases.map((testCase) => testCase.id),
      manualBeforeSubmit: data.manualBeforeSubmit,
      sourceDocsChecked: data.sourceDocsChecked,
      portalTargets: data.marketplace?.submissionForms || data.sourceDocsChecked,
      externalGatesToRecord: queueTarget.externalGatesToRecord,
      receiptCheck: queueTarget.receiptCheck,
      receiptFields: queueTarget.receiptFields,
      receiptRecorderCommand: marketplaceReceiptCommand(queueTarget.marketplaceTarget),
      readyChecks: {
        generatedDraftPresent: Boolean(storeListingArtifact?.sha256),
        reviewPackageUrlPresent: typeof publicEvidence.reviewPackage === "string" && publicEvidence.reviewPackage.startsWith("https://jsonx.net/"),
        publicEvidenceUrlCount: Object.keys(publicEvidence).length,
        positiveTestCaseCount: data.positiveTestCases.length,
        negativeTestCaseCount: data.negativeTestCases.length,
        manualStepCount: data.manualBeforeSubmit.length,
      },
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    source: "docs/intent/generative-ui-plugin/store-listings/",
    note: "This queue is generated from the four public store listing drafts. It lists packages, public evidence, manual checks, receipt fields, and recorder commands. It is not proof that any public marketplace submission was sent.",
    externalGateEvidence: manifest.externalGateEvidence?.path,
    externalGateStatus: externalGateEvidence.gateStatus,
    submissionCount: submissions.length,
    receiptRecordedCount: submissions.filter((submission) => submission.status === "receipt-recorded").length,
    pendingSubmissionCount: submissions.filter((submission) => submission.status !== "receipt-recorded").length,
    portalFormCount: submissions.filter((submission) => submission.portalForm).length,
    externalGateRecorder: externalGateRecorderCommand,
    externalGateRecorderCommands: externalGateRecorderCommands(),
    submissions,
    receiptEvidenceFile: "docs/intent/generative-ui-plugin/external-gate-evidence.json",
  };
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function checklist(items) {
  return items.map((item) => `- [ ] ${item}`).join("\n");
}

function tableCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\r?\n/g, " ");
}

function pendingValue(value) {
  if (value === true) return "recorded";
  if (typeof value === "string" && value.trim()) return "recorded";
  return "pending";
}

const externalGateRecorderCommand = "node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs";

function marketplaceReceiptCommand(target) {
  return `${externalGateRecorderCommand} marketplace --target ${target} --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>`;
}

function externalGateRecorderCommands() {
  return {
    appIds: [
      `${externalGateRecorderCommand} app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated`,
    ],
    chatgptDeveloperMode: [
      `${externalGateRecorderCommand} chatgpt --connected-mcp-url ${hostedMcpUrl} --transcript-url <url> --all-prompts-passed`,
    ],
    claudeSmoke: [
      `${externalGateRecorderCommand} claude-smoke --plugin core --authenticated --claude-version <version> --passed`,
      `${externalGateRecorderCommand} claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed`,
    ],
    policyReview: [
      `${externalGateRecorderCommand} policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>`,
    ],
  };
}

async function writeSubmissionQueueMarkdown(queue, filePath) {
  const lines = [
    "# JSONX Public Submission Queue",
    "",
    `Generated: ${queue.generatedAt}`,
    "",
    "This file is generated from the four store listing drafts. It gives the submitter one place to find packages, public evidence, manual checks, receipt fields, and recorder commands. It is not proof that a public submission was sent.",
    "",
    "## Gate Status",
    "",
    "| Gate | Status |",
    "| --- | --- |",
    ...Object.entries(queue.externalGateStatus).map(([gate, status]) => `| ${gate} | ${status} |`),
    "",
    "## Queue Summary",
    "",
    `- Submissions: ${queue.submissionCount}`,
    `- Pending receipts: ${queue.pendingSubmissionCount}`,
    `- Receipt evidence file: \`${queue.receiptEvidenceFile}\``,
    `- Recorder: \`${queue.externalGateRecorder}\``,
    "",
    "## Shared Recorder Commands",
    "",
    "Run these only after the matching external evidence exists.",
    "",
    "### App IDs",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.appIds,
    "```",
    "",
    "### ChatGPT Developer Mode",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.chatgptDeveloperMode,
    "```",
    "",
    "### Claude Code Smoke",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.claudeSmoke,
    "```",
    "",
    "### Policy Review",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.policyReview,
    "```",
    "",
  ];

  for (const submission of queue.submissions) {
    lines.push(
      `## ${submission.label}`,
      "",
      `- Status: ${submission.status}`,
      `- Source draft: \`${submission.sourceDraft}\``,
      `- Generated draft: \`${submission.generatedDraft}\``,
      `- Review package: ${submission.publicReviewPackage}`,
      `- Public listing copy: ${submission.publicStoreListing}`,
      `- Portal packet: ${submission.portalForm}`,
      "",
      "### Before Submit",
      "",
      checklist(submission.manualBeforeSubmit),
      "",
      "### Evidence URLs",
      "",
      markdownList(Object.entries(submission.publicEvidence).map(([key, value]) => `\`${key}\`: ${value}`)),
      "",
      "### Test Cases",
      "",
      `- Positive: ${submission.positiveTestCaseIds.join(", ")}`,
      `- Negative: ${submission.negativeTestCaseIds.join(", ")}`,
      "",
      "### Receipt Fields To Fill",
      "",
      markdownList(submission.receiptFields.map((field) => `\`${field}\``)),
      "",
      "### Receipt Recorder Command",
      "",
      "```bash",
      submission.receiptRecorderCommand,
      "```",
      "",
      "### Source Docs Checked",
      "",
      markdownList(submission.sourceDocsChecked),
      "",
    );
  }

  await fs.writeFile(filePath, `${lines.join("\n")}\n`);
}

async function writeExternalGateRunbookMarkdown({ queue, externalGateEvidence, filePath }) {
  const gateStatus = externalGateEvidence.gateStatus || {};
  const evidence = externalGateEvidence.evidence || externalGateEvidence;
  const appIds = evidence.appIds || {};
  const chatgpt = evidence.chatgptDeveloperMode || {};
  const claudeSmoke = evidence.claudeSmoke || {};
  const marketplace = evidence.marketplaceSubmissions || {};
  const chatgptPrompts = Array.isArray(chatgpt.promptsRun) ? chatgpt.promptsRun : [];
  const claudeCorePrompts = Array.isArray(claudeSmoke.core?.promptsRun) ? claudeSmoke.core.promptsRun : [];
  const claudeGenerativeUiPrompts = Array.isArray(claudeSmoke.generativeUi?.promptsRun) ? claudeSmoke.generativeUi.promptsRun : [];
  const recorderCommands = [
    ...(queue.externalGateRecorderCommands.appIds || []),
    ...(queue.externalGateRecorderCommands.chatgptDeveloperMode || []),
    ...(queue.externalGateRecorderCommands.claudeSmoke || []),
    ...(queue.externalGateRecorderCommands.policyReview || []),
    ...queue.submissions.map((submission) => submission.receiptRecorderCommand),
  ];

  const lines = [
    "# JSONX External Gate Runbook",
    "",
    `Generated: ${queue.generatedAt}`,
    "",
    "This file lists the evidence that must be collected outside the repo before public submission can be marked complete. Use it with the generated submission queue and record results through the controlled evidence recorder.",
    "",
    "## Current Gate Status",
    "",
    "| Gate | Status | Evidence Source |",
    "| --- | --- | --- |",
    `| appIds | ${tableCell(gateStatus.appIds || "pending")} | \`${queue.receiptEvidenceFile}\` |`,
    `| chatgptDeveloperMode | ${tableCell(gateStatus.chatgptDeveloperMode || "pending")} | \`${queue.receiptEvidenceFile}\` |`,
    `| claudeSmoke | ${tableCell(gateStatus.claudeSmoke || "pending")} | \`${queue.receiptEvidenceFile}\` |`,
    `| marketplaceSubmission | ${tableCell(gateStatus.marketplaceSubmission || "pending")} | \`${queue.receiptEvidenceFile}\` |`,
    "",
    "## Gate 1: Approved App And Plugin IDs",
    "",
    `Status: ${gateStatus.appIds || "pending"}`,
    "",
    "Record IDs after the OpenAI/Codex core plugin, the OpenAI/Codex generative UI plugin, and the renderer app have approved identifiers. Update the Codex app metadata before marking this gate complete.",
    "",
    "### Fields",
    "",
    markdownList([
      `\`appIds.openaiCorePluginId\`: ${pendingValue(appIds.openaiCorePluginId)}`,
      `\`appIds.openaiGenerativeUiAppId\`: ${pendingValue(appIds.openaiGenerativeUiAppId)}`,
      `\`appIds.openaiGenerativeUiPluginId\`: ${pendingValue(appIds.openaiGenerativeUiPluginId)}`,
      `\`appIds.codexCorePluginId\`: ${pendingValue(appIds.codexCorePluginId)}`,
      `\`appIds.codexGenerativeUiPluginId\`: ${pendingValue(appIds.codexGenerativeUiPluginId)}`,
      `\`appIds.codexGenerativeUiAppMetadataUpdated\`: ${pendingValue(appIds.codexGenerativeUiAppMetadataUpdated)}`,
    ]),
    "",
    "### Recorder Command",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.appIds,
    "```",
    "",
    "## Gate 2: ChatGPT Developer Mode Transcript",
    "",
    `Status: ${gateStatus.chatgptDeveloperMode || "pending"}`,
    "",
    `Connect the hosted MCP app at \`${hostedMcpUrl}\`, run the golden prompts in ChatGPT developer mode, and record the transcript URL after every prompt has the expected outcome.`,
    "",
    "### Prompt Checklist",
    "",
    "| Prompt | Status |",
    "| --- | --- |",
    ...chatgptPrompts.map((prompt) => `| ${tableCell(prompt.id)} | ${tableCell(prompt.status || "pending")} |`),
    "",
    "### Recorder Command",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.chatgptDeveloperMode,
    "```",
    "",
    "## Gate 3: Claude Code Authenticated Smoke",
    "",
    `Status: ${gateStatus.claudeSmoke || "pending"}`,
    "",
    "Run both split Claude Code plugins from an authenticated Claude Code environment. The package validator proves the manifests are shaped correctly, but this gate needs a real interactive Claude run.",
    "",
    "### Core Plugin Prompt",
    "",
    "| Prompt | Command | Status |",
    "| --- | --- | --- |",
    ...claudeCorePrompts.map(
      (prompt) => `| ${tableCell(prompt.id)} | \`${tableCell(prompt.prompt)}\` | ${tableCell(prompt.status || "pending")} |`,
    ),
    "",
    "### Generative UI Plugin Prompt",
    "",
    "| Prompt | Command | Status |",
    "| --- | --- | --- |",
    ...claudeGenerativeUiPrompts.map(
      (prompt) => `| ${tableCell(prompt.id)} | \`${tableCell(prompt.prompt)}\` | ${tableCell(prompt.status || "pending")} |`,
    ),
    "",
    "### Recorder Commands",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.claudeSmoke,
    "```",
    "",
    "## Gate 4: Policy Review And Marketplace Receipts",
    "",
    `Status: ${gateStatus.marketplaceSubmission || "pending"}`,
    "",
    "Complete human or policy review before sending public submissions. After each portal returns a receipt, record the matching submission ID, receipt URL, status, and submitted date.",
    "",
    "### Policy Review",
    "",
    markdownList([
      `\`marketplaceSubmissions.policyReview.status\`: ${marketplace.policyReview?.status || "pending"}`,
      `\`marketplaceSubmissions.policyReview.reviewedBy\`: ${pendingValue(marketplace.policyReview?.reviewedBy)}`,
      `\`marketplaceSubmissions.policyReview.reviewedAt\`: ${pendingValue(marketplace.policyReview?.reviewedAt)}`,
    ]),
    "",
    "### Submission Packets",
    "",
    "| Submission | Status | Portal Packet | Receipt Check |",
    "| --- | --- | --- | --- |",
    ...queue.submissions.map(
      (submission) =>
        `| ${tableCell(submission.label)} | ${tableCell(submission.status)} | ${submission.portalForm} | \`${submission.receiptCheck}\` |`,
    ),
    "",
    "### Recorder Commands",
    "",
    "```bash",
    ...queue.externalGateRecorderCommands.policyReview,
    ...queue.submissions.map((submission) => submission.receiptRecorderCommand),
    "```",
    "",
    "## Public Handoff Links",
    "",
    markdownList([
      `Submission queue Markdown: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md`,
      `Submission queue JSON: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json`,
      `External gate evidence JSON: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json`,
      `External gate runbook: ${publicExternalGateRunbookUrl()}`,
    ]),
    "",
    "## Full Recorder Command Set",
    "",
    "```bash",
    ...[...new Set(recorderCommands)],
    "```",
    "",
  ];

  await fs.writeFile(filePath, `${lines.join("\n")}\n`);
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
        "bad-oversized",
      ].map(async (name) => [name, await readJson(fixturePath(name))]),
    ),
  );

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
      prompt: "Render a payload that exceeds a configured size or collection limit.",
      expectedToolCall: true,
      expectedOutcome: "validation-error",
      input: renderInputFromFixture(fixtures["bad-oversized"]),
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

function motionPayloadForProfile(profile) {
  const baseChildren = [
    {
      component: "SectionHeader",
      props: {
        title: "Motion Review",
        description: `Renderer-owned motion profile: ${profile}.`,
      },
    },
  ];

  if (profile === "state-change-highlight") {
    baseChildren.push({
      component: "Checklist",
      props: {
        items: [
          { label: "Validate declarative motion", status: "done" },
          { label: "Keep GSAP out of model output", status: "pending" },
        ],
      },
    });
  } else if (profile === "morph-list-to-detail") {
    baseChildren.push({
      component: "Timeline",
      props: {
        items: [
          { label: "Prompt", detail: "The model asks for a compact JSONX UI." },
          { label: "Payload", detail: "The renderer validates a declarative contract." },
          { label: "Render", detail: "The widget owns the transition implementation." },
        ],
      },
    });
  } else {
    baseChildren.push({
      component: "Alert",
      props: { tone: "info", title: "Renderer-owned motion" },
      children: "The payload names a motion profile and never includes animation code.",
    });
  }

  return {
    schema: "jsonx.generative-ui.v1",
    purpose: `Verify ${profile} motion profile.`,
    motionProfile: profile,
    payload: {
      component: "DemoShell",
      props: {
        title: "JSONX Motion Evidence",
        summary: "Motion is declarative in the payload and implemented by the renderer.",
      },
      children: baseChildren,
    },
  };
}

async function evaluateWidgetMotion({ browser, profile, gsapEnabled, reducedMotion }) {
  const { buildWidgetHtml } = await import(pathToFileURL(path.join(repoRoot, "apps", "jsonx-renderer-app", "src", "server.mjs")));
  const previousGsapValue = process.env.JSONX_ENABLE_GSAP;
  if (gsapEnabled) {
    process.env.JSONX_ENABLE_GSAP = "1";
  } else {
    delete process.env.JSONX_ENABLE_GSAP;
  }

  let html;
  try {
    html = buildWidgetHtml();
  } finally {
    if (previousGsapValue === undefined) {
      delete process.env.JSONX_ENABLE_GSAP;
    } else {
      process.env.JSONX_ENABLE_GSAP = previousGsapValue;
    }
  }

  const page = await browser.newPage();
  try {
    page.setDefaultTimeout(12000);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: reducedMotion ? "reduce" : "no-preference" }]);
    await page.setContent(html, { waitUntil: "domcontentloaded" });
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
    }, motionPayloadForProfile(profile));
    await page.waitForSelector(".jsonx-shell", { timeout: 10000 });
    await page.waitForFunction(
      (expectedProfile) => {
        const root = document.querySelector("#jsonx-root");
        return root?.dataset?.motion === expectedProfile && Boolean(root?.dataset?.motionEngine);
      },
      { timeout: 10000 },
      profile,
    );
    await new Promise((resolve) => setTimeout(resolve, 80));
    const observed = await page.evaluate(() => {
      const root = document.querySelector("#jsonx-root");
      const animatedCount = document.querySelectorAll(".jsonx-shell, .jsonx-panel, .section-header").length;
      return {
        motion: root?.dataset.motion,
        motionEngine: root?.dataset.motionEngine,
        gsapPresent: Boolean(window.gsap),
        gsapMotionConfigured: window.JSONX_RENDERER_CONFIG?.gsapMotion === true,
        animatedElementCount: animatedCount,
        renderedShell: Boolean(document.querySelector(".jsonx-shell")),
      };
    });
    const expectedEngine = gsapEnabled && !reducedMotion && profile !== "none" ? "gsap" : "css";
    assertEvidence(observed.motion === profile, `${profile} did not set the expected data-motion attribute`);
    assertEvidence(observed.motionEngine === expectedEngine, `${profile} expected ${expectedEngine} engine but got ${observed.motionEngine}`);
    assertEvidence(observed.renderedShell, `${profile} did not render a shell`);
    assertEvidence(observed.animatedElementCount > 0, `${profile} did not render motion targets`);
    return observed;
  } finally {
    await page.close();
  }
}

async function buildMotionEvidence({ skip }) {
  if (skip) {
    return {
      generatedAt: new Date().toISOString(),
      source: "local renderer widget motion harness",
      skipped: true,
      reason: "Skipped by --skip-motion-evidence or JSONX_SKIP_MOTION_EVIDENCE=1.",
      checks: {},
      cases: [],
    };
  }

  console.log("capturing renderer motion evidence");
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const cases = [];
  let reducedMotionObserved;

  try {
    for (const profile of motionProfiles) {
      for (const gsapEnabled of [false, true]) {
        const observed = await evaluateWidgetMotion({ browser, profile, gsapEnabled, reducedMotion: false });
        cases.push({
          id: `${profile}-${gsapEnabled ? "gsap" : "css"}`,
          profile,
          gsapEnabled,
          reducedMotion: false,
          expectedEngine: gsapEnabled && profile !== "none" ? "gsap" : "css",
          observed,
        });
      }
    }

    reducedMotionObserved = await evaluateWidgetMotion({
      browser,
      profile: "morph-list-to-detail",
      gsapEnabled: true,
      reducedMotion: true,
    });
    cases.push({
      id: "morph-list-to-detail-gsap-reduced-motion",
      profile: "morph-list-to-detail",
      gsapEnabled: true,
      reducedMotion: true,
      expectedEngine: "css",
      observed: reducedMotionObserved,
    });
  } finally {
    await browser.close();
  }

  return {
    generatedAt: new Date().toISOString(),
    source: "local renderer widget motion harness",
    note: "This evidence loads the widget locally with and without JSONX_ENABLE_GSAP and verifies renderer-owned motion profiles through DOM state. It does not rely on model-supplied animation code.",
    skipped: false,
    profiles: motionProfiles,
    checks: {
      cssFallbackPassed: cases.filter((item) => !item.gsapEnabled && !item.reducedMotion).length === motionProfiles.length,
      gsapMotionPassed: cases.filter((item) => item.gsapEnabled && !item.reducedMotion && item.profile !== "none").length === motionProfiles.length - 1,
      noneProfileUsesCss: cases.some((item) => item.profile === "none" && item.gsapEnabled && item.observed.motionEngine === "css"),
      reducedMotionSuppressesGsap: reducedMotionObserved?.motionEngine === "css",
      noModelSuppliedAnimationCode: true,
    },
    cases,
  };
}

async function setDemoValue(page, selector, value) {
  await page.waitForSelector(selector, { timeout: 10000 });
  await page.$eval(
    selector,
    (element, nextValue) => {
      element.value = nextValue;
      element.dispatchEvent(new Event("input", { bubbles: true }));
    },
    value,
  );
}

async function waitForRenderedTitle(page, title) {
  await page.waitForFunction(
    (expectedTitle) => document.querySelector("#generative-ui-demo .generated-shell h3")?.textContent?.includes(expectedTitle),
    { timeout: 10000 },
    title,
  );
}

async function collectBrowserDemoObservation(page, credential) {
  return page.evaluate((secret) => {
    function storageContains(storage) {
      if (!secret) return false;
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if ((key || "").includes(secret) || (storage.getItem(key) || "").includes(secret)) return true;
      }
      return false;
    }

    const documentElement = document.documentElement;
    const body = document.body;
    const maxScrollWidth = Math.max(documentElement.scrollWidth, body.scrollWidth);
    const clientWidth = documentElement.clientWidth;
    const renderedText = document.querySelector("#generative-ui-demo .demo-output")?.innerText || "";
    const hasCredential = Boolean(secret);

    return {
      mode: document.querySelector("#demo-mode")?.value,
      renderedTitle: document.querySelector("#generative-ui-demo .generated-shell h3")?.textContent?.trim(),
      validationOk: Boolean(document.querySelector("#generative-ui-demo .validation-ok")),
      validationText: document.querySelector("#generative-ui-demo .validation-ok, #generative-ui-demo .validation-error")?.textContent?.trim(),
      actionButtons: Array.from(document.querySelectorAll("#generative-ui-demo [data-action]")).map((button) => button.dataset.action),
      actionLog: Array.from(document.querySelectorAll("#generative-ui-demo .action-log li")).map((item) => item.textContent.trim()),
      endpointFieldsHidden: document.querySelector("#endpoint-fields")?.hidden,
      localStorageKeys: Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)),
      sessionStorageKeys: Array.from({ length: sessionStorage.length }, (_, index) => sessionStorage.key(index)),
      storageContainsCredential: storageContains(localStorage) || storageContains(sessionStorage),
      pageTextContainsCredential: hasCredential && (renderedText.includes(secret) || document.body.innerText.includes(secret)),
      horizontalOverflow: maxScrollWidth > clientWidth + 1,
      clientWidth,
      scrollWidth: maxScrollWidth,
    };
  }, credential);
}

async function openBrowserDemoPage(browser, siteUrl) {
  const page = await browser.newPage();
  page.setDefaultTimeout(12000);
  page.setDefaultNavigationTimeout(22000);
  await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 2, isMobile: true });
  const dialogs = [];
  page.on("dialog", async (dialog) => {
    dialogs.push(dialog.message());
    await dialog.dismiss();
  });
  await page.goto(siteUrl, { waitUntil: "domcontentloaded", timeout: 22000 });
  await page.waitForSelector("#generative-ui-demo #demo-mode", { timeout: 10000 });
  return { page, dialogs };
}

async function runBrowserDemoCase(browser, siteUrl, caseConfig) {
  const { page, dialogs } = await openBrowserDemoPage(browser, siteUrl);
  try {
    await caseConfig.run(page);
    await waitForRenderedTitle(page, caseConfig.expectedTitle);
    const observed = await collectBrowserDemoObservation(page, caseConfig.credential || "");
    assertEvidence(observed.validationOk, `${caseConfig.id} did not show validation success`);
    assertEvidence(observed.renderedTitle === caseConfig.expectedTitle, `${caseConfig.id} rendered ${observed.renderedTitle}`);
    assertEvidence(!observed.horizontalOverflow, `${caseConfig.id} produced horizontal overflow at mobile width`);
    assertEvidence(dialogs.length === 0, `${caseConfig.id} opened a browser dialog: ${dialogs.join("; ")}`);
    return {
      id: caseConfig.id,
      mode: caseConfig.mode,
      viewport: "390x900 mobile",
      expectedTitle: caseConfig.expectedTitle,
      observed,
    };
  } finally {
    await page.close();
  }
}

function browserPasteEnvelope() {
  return {
    schema: "jsonx.generative-ui.v1",
    purpose: "Render a pasted JSONX payload.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Pasted JSONX Payload",
        summary: "The browser demo parsed an envelope pasted into the payload field.",
      },
      children: [
        {
          component: "TextBlock",
          props: {
            text: "Paste mode accepts the shared JSONX generative UI envelope and renders the allowlisted payload.",
          },
        },
      ],
    },
  };
}

async function buildBrowserDemoEvidence({ skip }) {
  if (skip) {
    return {
      generatedAt: new Date().toISOString(),
      source: "local public browser demo harness",
      skipped: true,
      reason: "Skipped by --skip-browser-demo or JSONX_SKIP_BROWSER_DEMO=1.",
      checks: {},
      cases: [],
    };
  }

  console.log("capturing browser demo mode evidence");
  const puppeteer = await import("puppeteer");
  const staticServer = await startStaticSiteServer();
  const endpointServer = await startBrowserEndpointServer();
  const browser = await puppeteer.default.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const credential = "jsonx-browser-demo-secret";
  const cases = [];

  try {
    cases.push(
      await runBrowserDemoCase(browser, staticServer.url, {
        id: "fixture-mode-support-triage",
        mode: "fixture",
        expectedTitle: "Customer Support Triage",
        run: async (page) => {
          await page.select("#fixture", "support");
          await waitForRenderedTitle(page, "Customer Support Triage");
          await page.click('[data-action="draft_refund_response"]');
          await page.waitForFunction(
            () => document.querySelector("#generative-ui-demo .action-log")?.innerText?.includes("draft_refund_response"),
            { timeout: 10000 },
          );
        },
      }),
    );

    cases.push(
      await runBrowserDemoCase(browser, staticServer.url, {
        id: "paste-mode-envelope",
        mode: "paste",
        expectedTitle: "Pasted JSONX Payload",
        run: async (page) => {
          await page.select("#demo-mode", "paste");
          await setDemoValue(page, "#payload", JSON.stringify(browserPasteEnvelope(), null, 2));
          await page.click("#run-demo");
        },
      }),
    );

    cases.push(
      await runBrowserDemoCase(browser, staticServer.url, {
        id: "endpoint-mode-cors",
        mode: "endpoint",
        expectedTitle: "Endpoint JSONX Response",
        credential,
        run: async (page) => {
          await page.select("#demo-mode", "endpoint");
          await setDemoValue(page, "#prompt", "Create an endpoint supplied choice list.");
          await setDemoValue(page, "#endpoint", endpointServer.url);
          await setDemoValue(page, "#credential", credential);
          await page.click("#call-endpoint");
        },
      }),
    );
  } finally {
    await browser.close();
    await endpointServer.close();
    await staticServer.close();
  }

  const endpointPost = endpointServer.requests.find((request) => request.method === "POST");
  const endpointPreflight = endpointServer.requests.find((request) => request.method === "OPTIONS");
  const endpointCase = cases.find((item) => item.id === "endpoint-mode-cors");

  assertEvidence(endpointPreflight, "endpoint mode did not trigger a CORS preflight");
  assertEvidence(endpointPost?.authorizationHeaderPresent, "endpoint mode did not send the optional bearer credential");
  assertEvidence(endpointPost?.authorizationScheme === "Bearer", "endpoint mode did not send a bearer credential");
  assertEvidence(endpointPost?.prompt === "Create an endpoint supplied choice list.", "endpoint mode did not send the current prompt");
  assertEvidence(endpointCase?.observed.storageContainsCredential === false, "endpoint credential was stored in browser storage");
  assertEvidence(endpointCase?.observed.pageTextContainsCredential === false, "endpoint credential was rendered into page text");

  return {
    generatedAt: new Date().toISOString(),
    source: "local public browser demo harness",
    note: "This evidence serves site/generative-ui.html locally, uses a separate temporary CORS endpoint, and verifies fixture, paste, and endpoint modes at mobile width.",
    skipped: false,
    staticSource: "site/generative-ui.html",
    localSiteUrl: staticServer.url,
    endpointRequests: endpointServer.requests,
    checks: {
      fixtureModeRendered: cases.some((item) => item.id === "fixture-mode-support-triage" && item.observed.renderedTitle === "Customer Support Triage"),
      pasteModeRendered: cases.some((item) => item.id === "paste-mode-envelope" && item.observed.renderedTitle === "Pasted JSONX Payload"),
      endpointModeRendered: endpointCase?.observed.renderedTitle === "Endpoint JSONX Response",
      corsPreflightObserved: Boolean(endpointPreflight),
      endpointCredentialSentAsBearer: endpointPost?.authorizationHeaderPresent === true && endpointPost.authorizationScheme === "Bearer",
      credentialNotStoredInBrowserStorage: endpointCase?.observed.storageContainsCredential === false,
      credentialNotRenderedInPageText: endpointCase?.observed.pageTextContainsCredential === false,
      noHorizontalOverflowAtMobileWidth: cases.every((item) => item.observed.horizontalOverflow === false),
    },
    cases,
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
    "submission-queue",
    "codex-install-evidence",
    "claude-validation-evidence",
    "opencode-skill-evidence",
    "motion-profile-evidence",
    "browser-demo-evidence",
    "submission-audit",
    "external-gate-evidence",
    "external-gates",
    "openai-plugin-submission",
    "openai-jsonx-plugin-submission",
    "openai-generative-ui-plugin-submission",
    "claude-code-community-submission",
    "claude-code-jsonx-submission",
    "claude-code-generative-ui-submission",
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

function packagePresent(manifest, surface) {
  return manifest.packages.some((item) => item.surface === surface && item.bytes > 0 && item.sha256);
}

function storeListingPresent(manifest, surface) {
  return manifest.storeListings.some((item) => item.surface === surface && item.positiveTestCaseCount > 0 && item.negativeTestCaseCount > 0);
}

function screenshotPresent(manifest, purpose) {
  return manifest.screenshots.some((item) => item.purpose === purpose && item.bytes > 0 && item.sha256);
}

function submissionRecorded(entry) {
  return Boolean(entry?.submitted === true && (entry.submissionId || entry.url));
}

function promptPassed(prompts, id) {
  return prompts.some((prompt) => prompt.id === id && prompt.status === "passed");
}

function externalGateChecks(data) {
  const appIds = data?.appIds || {};
  const chatgpt = data?.chatgptDeveloperMode || {};
  const claude = data?.claudeSmoke || {};
  const marketplace = data?.marketplaceSubmissions || {};

  const openAiCoreSubmission = marketplace.openaiCore || {};
  const openAiGenerativeUiSubmission = marketplace.openaiGenerativeUi || marketplace.openai || {};
  const claudeCoreSubmission = marketplace.claudeCore || {};
  const claudeGenerativeUiSubmission = marketplace.claudeGenerativeUi || marketplace.claude || {};
  const policyReview = marketplace.policyReview || {};
  const chatgptPrompts = Array.isArray(chatgpt.promptsRun) ? chatgpt.promptsRun : [];
  const claudeCore = claude.core || claude;
  const claudeGenerativeUi = claude.generativeUi || claude;
  const claudeCorePrompts = Array.isArray(claudeCore.promptsRun) ? claudeCore.promptsRun : [];
  const claudeGenerativeUiPrompts = Array.isArray(claudeGenerativeUi.promptsRun) ? claudeGenerativeUi.promptsRun : [];

  const appIdsCaptured = Boolean(
    (appIds.openaiCorePluginId || appIds.openaiPluginId) &&
      (appIds.openaiGenerativeUiAppId || appIds.openaiAppId) &&
      (appIds.openaiGenerativeUiPluginId || appIds.openaiPluginId) &&
      (appIds.codexCorePluginId || appIds.codexPluginId) &&
      (appIds.codexGenerativeUiPluginId || appIds.codexPluginId),
  );
  const codexAppMetadataUpdated = Boolean(
    appIds.codexGenerativeUiAppMetadataUpdated === true || appIds.codexAppMetadataUpdated === true,
  );
  const claudeCoreAuthenticated = claudeCore.authenticated === true;
  const claudeGenerativeUiAuthenticated = claudeGenerativeUi.authenticated === true;
  const claudeCorePromptPassed = promptPassed(claudeCorePrompts, "jsonx-core");
  const claudeGenerativeUiPromptPassed = promptPassed(claudeGenerativeUiPrompts, "jsonx-generative-ui");
  const openAiCoreSubmissionRecorded = submissionRecorded(openAiCoreSubmission);
  const openAiGenerativeUiSubmissionRecorded = submissionRecorded(openAiGenerativeUiSubmission);
  const claudeCoreSubmissionRecorded = submissionRecorded(claudeCoreSubmission);
  const claudeGenerativeUiSubmissionRecorded = submissionRecorded(claudeGenerativeUiSubmission);

  return {
    appIdsCaptured,
    codexAppMetadataUpdated,
    chatgptMcpConnected: chatgpt.connectedMcpUrl === hostedMcpUrl,
    chatgptTranscriptCaptured: Boolean(chatgpt.transcriptUrl || chatgpt.transcriptArtifact),
    chatgptGoldenPromptsPassed: chatgptPromptIds.every((id) => promptPassed(chatgptPrompts, id)),
    claudeAuthenticatedSmokeRan: claudeCoreAuthenticated && claudeGenerativeUiAuthenticated,
    claudeSmokePromptsPassed: claudeCorePromptPassed && claudeGenerativeUiPromptPassed,
    openAiCoreSubmissionRecorded,
    openAiGenerativeUiSubmissionRecorded,
    claudeCoreSubmissionRecorded,
    claudeGenerativeUiSubmissionRecorded,
    openAiSubmissionRecorded: openAiCoreSubmissionRecorded && openAiGenerativeUiSubmissionRecorded,
    claudeSubmissionRecorded: claudeCoreSubmissionRecorded && claudeGenerativeUiSubmissionRecorded,
    policyReviewRecorded: Boolean(policyReview.status === "approved" && policyReview.reviewedBy && policyReview.reviewedAt),
  };
}

function summarizeExternalGateEvidence(data, sourceStatus) {
  const checks = externalGateChecks(data);
  return {
    generatedAt: new Date().toISOString(),
    source: sourceStatus === "provided" ? evidenceSourcePath(externalGateEvidenceSource) : evidenceSourcePath(externalGateEvidenceTemplate),
    supplied: sourceStatus === "provided",
    note:
      sourceStatus === "provided"
        ? "External gate evidence was supplied and copied into the generated submission artifacts."
        : "No external gate evidence file was supplied. Copy external-gate-evidence.template.json to external-gate-evidence.json after portal and authenticated smoke steps are complete.",
    checks,
    gateStatus: {
      appIds: checks.appIdsCaptured && checks.codexAppMetadataUpdated ? "proved" : "pending",
      chatgptDeveloperMode:
        checks.chatgptMcpConnected && checks.chatgptTranscriptCaptured && checks.chatgptGoldenPromptsPassed ? "proved" : "pending",
      claudeSmoke: checks.claudeAuthenticatedSmokeRan && checks.claudeSmokePromptsPassed ? "proved" : "pending",
      marketplaceSubmission:
        checks.openAiSubmissionRecorded && checks.claudeSubmissionRecorded && checks.policyReviewRecorded ? "proved" : "pending",
    },
    evidence: data,
  };
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

function validateExternalGateEvidence(source, data) {
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
  ]) {
    if (!(key in appIds)) errors.push(`appIds.${key} is required`);
  }
  if (!("codexGenerativeUiAppMetadataUpdated" in appIds) && !("codexAppMetadataUpdated" in appIds)) {
    errors.push("appIds.codexGenerativeUiAppMetadataUpdated is required");
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
    if (!marketplace[key] || typeof marketplace[key] !== "object") errors.push(`marketplaceSubmissions.${key} is required`);
  }

  if (errors.length) {
    throw new Error(`${relative(source)} is not valid external gate evidence: ${errors.join("; ")}`);
  }
}

async function buildExternalGateEvidence() {
  const sourceExists = await fileExists(externalGateEvidenceSource);
  const source = sourceExists ? externalGateEvidenceSource : externalGateEvidenceTemplate;
  const data = await readJson(source);
  validateExternalGateEvidence(source, data);
  return summarizeExternalGateEvidence(data, sourceExists ? "provided" : "template");
}

function gateProved(externalGateEvidence, key) {
  return externalGateEvidence?.gateStatus?.[key] === "proved";
}

function buildSubmissionAudit(manifest, externalGateEvidence, sourceGitSnapshot) {
  const gitCommit = sourceGitSnapshot.dirtyStatus.length
    ? `${sourceGitSnapshot.headCommit}+worktree`
    : sourceGitSnapshot.headCommit;
  const browserDemoOk = manifest.browserDemoEvidence && !manifest.browserDemoEvidence.skipped && allChecksTrue(manifest.browserDemoEvidence.checks);
  const motionOk = manifest.motionProfileEvidence && !manifest.motionProfileEvidence.skipped && allChecksTrue(manifest.motionProfileEvidence.checks);
  const hostedMcpOk = manifest.hostedMcpEvidence && allChecksTrue(manifest.hostedMcpEvidence.checks);
  const skillInstallerOk = manifest.skillInstallerEvidence && allChecksTrue(manifest.skillInstallerEvidence.checks);
  const codexInstallOk = manifest.codexInstallEvidence && !manifest.codexInstallEvidence.skipped && allChecksTrue(manifest.codexInstallEvidence.checks);
  const claudeValidationOk =
    manifest.claudeValidationEvidence && !manifest.claudeValidationEvidence.skipped && allChecksTrue(manifest.claudeValidationEvidence.checks);
  const openCodeOk = manifest.openCodeSkillEvidence && !manifest.openCodeSkillEvidence.skipped && allChecksTrue(manifest.openCodeSkillEvidence.checks);
  const packageBoundaryOk =
    manifest.npmBoundary?.packageName === "jsonx" &&
    manifest.npmBoundary.fileCount === 234 &&
    manifest.npmBoundary.excludedPrefixes?.includes("apps/") &&
    manifest.npmBoundary.excludedPrefixes?.includes("plugins/") &&
    manifest.npmBoundary.excludedPrefixes?.includes("skills/") &&
    manifest.npmBoundary.excludedTerms?.includes("gsap");
  const invalidFixturesCovered =
    Array.isArray(manifest.fixtureValidation?.invalidFixtures) &&
    invalidFixtures.every((name) => manifest.fixtureValidation.invalidFixtures.includes(name));
  const appIdGateOk = gateProved(externalGateEvidence, "appIds");
  const chatgptTranscriptGateOk = gateProved(externalGateEvidence, "chatgptDeveloperMode");
  const claudeSmokeGateOk = gateProved(externalGateEvidence, "claudeSmoke");
  const marketplaceGateOk = gateProved(externalGateEvidence, "marketplaceSubmission");

  const requirements = [
    {
      id: "REQ-SKILLS-SPLIT",
      requirement: "Provide separate core JSONX and generative UI skills for Codex, Claude Code, and OpenCode with install paths documented.",
      status: skillInstallerOk && openCodeOk ? "proved" : "incomplete",
      githubIssue: "#1113",
      evidence: [
        "skills/codex/jsonx/SKILL.md",
        "skills/codex/jsonx-generative-ui/SKILL.md",
        "skills/claude/jsonx/SKILL.md",
        "skills/claude/jsonx-generative-ui/SKILL.md",
        "skills/opencode/jsonx/SKILL.md",
        "skills/opencode/jsonx-generative-ui/SKILL.md",
        manifest.skillInstallerEvidence?.path,
        manifest.openCodeSkillEvidence?.path,
        manifest.publicSkillsUrl,
      ].filter(Boolean),
      checks: {
        skillInstallerOk,
        openCodeProjectDiscoveryOk: openCodeOk,
      },
    },
    {
      id: "REQ-CODEX-PLUGIN",
      requirement: "Package the core JSONX workflow and generative UI workflow as separate Codex plugins with development marketplace entries.",
      status:
        packagePresent(manifest, "Codex core JSONX plugin") &&
        packagePresent(manifest, "Codex generative UI plugin") &&
        packagePresent(manifest, "Codex local marketplace") &&
        codexInstallOk
          ? "proved"
          : "incomplete",
      githubIssue: "#1112",
      evidence: [
        "plugins/jsonx-codex-plugin/",
        "plugins/jsonx-generative-ui-plugin/",
        ".agents/plugins/marketplace.json",
        manifest.codexInstallEvidence?.path,
        manifest.packages.find((item) => item.surface === "Codex core JSONX plugin")?.path,
        manifest.packages.find((item) => item.surface === "Codex generative UI plugin")?.path,
        manifest.packages.find((item) => item.surface === "Codex local marketplace")?.path,
      ].filter(Boolean),
      checks: {
        corePluginPackagePresent: packagePresent(manifest, "Codex core JSONX plugin"),
        generativeUiPluginPackagePresent: packagePresent(manifest, "Codex generative UI plugin"),
        marketplacePackagePresent: packagePresent(manifest, "Codex local marketplace"),
        isolatedInstallOk: codexInstallOk,
      },
    },
    {
      id: "REQ-CLAUDE-PLUGIN",
      requirement: "Package the core JSONX workflow and generative UI workflow as separate Claude Code plugins.",
      status:
        packagePresent(manifest, "Claude Code core JSONX plugin") &&
        packagePresent(manifest, "Claude Code generative UI plugin") &&
        claudeValidationOk
          ? "proved"
          : "incomplete",
      githubIssue: "#1113",
      evidence: [
        "plugins/claude-jsonx-plugin/",
        "plugins/claude-jsonx-generative-ui-plugin/",
        manifest.claudeValidationEvidence?.path,
        manifest.packages.find((item) => item.surface === "Claude Code core JSONX plugin")?.path,
        manifest.packages.find((item) => item.surface === "Claude Code generative UI plugin")?.path,
      ].filter(Boolean),
      checks: {
        claudeCorePackagePresent: packagePresent(manifest, "Claude Code core JSONX plugin"),
        claudeGenerativeUiPackagePresent: packagePresent(manifest, "Claude Code generative UI plugin"),
        claudeManifestValidationOk: claudeValidationOk,
      },
    },
    {
      id: "REQ-HOSTED-RENDERER",
      requirement: "Provide a hosted stateless Apps SDK renderer with MCP tool metadata, structuredContent output, and widget resource wiring.",
      status: hostedMcpOk ? "proved" : "incomplete",
      githubIssue: "#1111",
      evidence: [
        "apps/jsonx-renderer-app/",
        manifest.hostedMcpUrl,
        manifest.hostedWidgetUrl,
        manifest.hostedMcpEvidence?.path,
        manifest.packages.find((item) => item.surface === "ChatGPT app submission")?.path,
      ].filter(Boolean),
      checks: {
        hostedMcpOk,
        chatgptSubmissionPackagePresent: packagePresent(manifest, "ChatGPT app submission"),
      },
    },
    {
      id: "REQ-GENERATIVE-UI-CONTRACT",
      requirement: "Use one jsonx.generative-ui.v1 contract and allowlist across fixtures, app, plugin, browser demo, and local handoff.",
      status: manifest.goldenPromptEvidence?.caseCount >= 9 && invalidFixturesCovered && hostedMcpOk && browserDemoOk ? "proved" : "incomplete",
      githubIssue: "#1110",
      evidence: [
        "apps/jsonx-renderer-app/src/jsonx-validator.mjs",
        "plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py",
        "plugins/jsonx-generative-ui-plugin/fixtures/",
        ...(manifest.fixtureValidation?.invalidFixtures || []).map((name) => `plugins/jsonx-generative-ui-plugin/fixtures/${name}.json`),
        manifest.goldenPromptEvidence?.path,
        manifest.browserDemoEvidence?.path,
        manifest.hostedMcpEvidence?.path,
      ].filter(Boolean),
      checks: {
        goldenPromptCases: manifest.goldenPromptEvidence?.caseCount,
        invalidFixturesCovered,
        hostedMcpOk,
        browserDemoOk,
      },
    },
    {
      id: "REQ-MOTION",
      requirement: "Make GSAP-style animation optional and renderer-owned, with reduced-motion behavior and no model-supplied animation code.",
      status: motionOk ? "proved" : "incomplete",
      githubIssue: "#1114",
      evidence: ["apps/jsonx-renderer-app/web/widget.js", manifest.motionProfileEvidence?.path, screenshotPresent(manifest, "renderer widget motion desktop") && "screenshots/jsonx-renderer-widget-motion-desktop.png"].filter(Boolean),
      checks: {
        motionOk,
        motionCaseCount: manifest.motionProfileEvidence?.caseCount,
      },
    },
    {
      id: "REQ-BROWSER-DEMO",
      requirement: "Publish a browser demo with fixture, paste, and bring-your-own endpoint modes that render the shared JSONX contract.",
      status: browserDemoOk ? "proved" : "incomplete",
      githubIssue: "#1117",
      evidence: ["site/generative-ui.html", "site/assets/generative-ui-demo.js", manifest.browserDemoEvidence?.path, manifest.publicSiteUrl].filter(Boolean),
      checks: {
        browserDemoOk,
        browserDemoCaseCount: manifest.browserDemoEvidence?.caseCount,
      },
    },
    {
      id: "REQ-GITHUB-PAGES",
      requirement: "Update the JSONX GitHub Pages site with skills, plugin, renderer, safety, and demo documentation.",
      status:
        screenshotPresent(manifest, "generative ui page desktop") &&
        screenshotPresent(manifest, "skills install readme") &&
        browserDemoOk
          ? "proved"
          : "incomplete",
      githubIssue: "#1116",
      evidence: [
        "site/generative-ui.html",
        "docs/generative-ui.html",
        "docs/skills/README.md",
        manifest.publicSiteUrl,
        manifest.publicSkillsUrl,
        screenshotPresent(manifest, "generative ui page desktop") && "screenshots/jsonx-generative-ui-page-desktop.png",
        screenshotPresent(manifest, "skills install readme") && "screenshots/jsonx-skills-install-readme.png",
      ].filter(Boolean),
      checks: {
        publicSiteScreenshotPresent: screenshotPresent(manifest, "generative ui page desktop"),
        skillsReadmeScreenshotPresent: screenshotPresent(manifest, "skills install readme"),
        browserDemoOk,
      },
    },
    {
      id: "REQ-STORE-DRAFTS",
      requirement: "Prepare development submission material for OpenAI/Codex and Claude Code review with separate core JSONX and generative UI plugin drafts.",
      status:
        storeListingPresent(manifest, "OpenAI core JSONX plugin portal draft") &&
        storeListingPresent(manifest, "OpenAI generative UI plugin portal draft") &&
        storeListingPresent(manifest, "Claude Code core JSONX community submission draft") &&
        storeListingPresent(manifest, "Claude Code generative UI community submission draft") &&
        Boolean(manifest.submissionQueue?.json?.sha256) &&
        Boolean(manifest.externalGateRunbook?.sha256)
          ? "proved"
          : "incomplete",
      githubIssue: "#1115",
      evidence: [
        "apps/jsonx-renderer-app/chatgpt-app-submission.json",
        "docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json",
        "docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json",
        "docs/intent/generative-ui-plugin/store-listings/claude-code-jsonx-submission.json",
        "docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json",
        manifest.storeListings.find((item) => item.surface === "OpenAI core JSONX plugin portal draft")?.path,
        manifest.storeListings.find((item) => item.surface === "OpenAI generative UI plugin portal draft")?.path,
        manifest.storeListings.find((item) => item.surface === "Claude Code core JSONX community submission draft")?.path,
        manifest.storeListings.find((item) => item.surface === "Claude Code generative UI community submission draft")?.path,
        manifest.submissionQueue?.json?.path,
        manifest.submissionQueue?.markdown?.path,
        manifest.externalGateRunbook?.path,
        ...(manifest.submissionForms || []).map((item) => item.path),
      ].filter(Boolean),
      checks: {
        openAiCoreDraftPresent: storeListingPresent(manifest, "OpenAI core JSONX plugin portal draft"),
        openAiGenerativeUiDraftPresent: storeListingPresent(manifest, "OpenAI generative UI plugin portal draft"),
        claudeCoreDraftPresent: storeListingPresent(manifest, "Claude Code core JSONX community submission draft"),
        claudeGenerativeUiDraftPresent: storeListingPresent(manifest, "Claude Code generative UI community submission draft"),
        submissionQueuePresent: Boolean(manifest.submissionQueue?.json?.sha256),
        externalGateRunbookPresent: Boolean(manifest.externalGateRunbook?.sha256),
        submissionQueueLinksPortalForms: manifest.submissionQueue?.portalFormCount === 4,
        submissionFormsPresent:
          Array.isArray(manifest.submissionForms) &&
          manifest.submissionForms.length === 4 &&
          manifest.submissionForms.every((form) => form.sha256 && form.path?.includes("submission-forms/")),
      },
    },
    {
      id: "REQ-NPM-BOUNDARY",
      requirement: "Keep app, plugin, skill, submission, and GSAP assets out of the root jsonx npm package.",
      status: packageBoundaryOk ? "proved" : "incomplete",
      githubIssue: "#1115",
      evidence: [manifest.npmBoundary && "npm pack --dry-run --json", "docs/intent/generative-ui-plugin/submission-artifacts/current/manifest.json"].filter(Boolean),
      checks: {
        packageBoundaryOk,
        fileCount: manifest.npmBoundary?.fileCount,
        excludedPrefixes: manifest.npmBoundary?.excludedPrefixes,
        excludedTerms: manifest.npmBoundary?.excludedTerms,
      },
    },
    {
      id: "GATE-APP-ID",
      requirement: "Add approved OpenAI/Codex core plugin, generative UI plugin, and renderer app IDs to the recorded evidence and Codex app metadata.",
      status: appIdGateOk ? "proved" : "external-gated",
      githubIssue: "#1115",
      evidence: [
        "plugins/jsonx-generative-ui-plugin/.app.json",
        "docs/intent/generative-ui-plugin/submission-readiness.md",
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
      ].filter(Boolean),
      checks: {
        appIdsCaptured: externalGateEvidence?.checks?.appIdsCaptured === true,
        codexAppMetadataUpdated: externalGateEvidence?.checks?.codexAppMetadataUpdated === true,
      },
      ...(appIdGateOk
        ? {}
        : { remaining: "Requires approved core plugin, generative UI plugin, and Apps SDK renderer app IDs from the OpenAI/Codex submission flow." }),
    },
    {
      id: "GATE-CHATGPT-TRANSCRIPT",
      requirement: "Capture live ChatGPT developer-mode transcripts after connecting the hosted MCP app.",
      status: chatgptTranscriptGateOk ? "proved" : "external-gated",
      githubIssue: "#1115",
      evidence: [
        manifest.hostedMcpEvidence?.path,
        manifest.goldenPromptEvidence?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
      ].filter(Boolean),
      checks: {
        chatgptMcpConnected: externalGateEvidence?.checks?.chatgptMcpConnected === true,
        chatgptTranscriptCaptured: externalGateEvidence?.checks?.chatgptTranscriptCaptured === true,
        chatgptGoldenPromptsPassed: externalGateEvidence?.checks?.chatgptGoldenPromptsPassed === true,
      },
      ...(chatgptTranscriptGateOk
        ? {}
        : {
            remaining:
              "Requires a connected ChatGPT developer-mode app session. Current evidence is live MCP plus deterministic tool-call evidence.",
          }),
    },
    {
      id: "GATE-CLAUDE-SMOKE",
      requirement: "Run authenticated Claude Code smoke prompts for the split core JSONX and generative UI plugins.",
      status: claudeSmokeGateOk ? "proved" : "external-gated",
      githubIssue: "#1113",
      evidence: [manifest.claudeValidationEvidence?.path, manifest.externalGateEvidence?.path, manifest.externalGateRunbook?.path].filter(Boolean),
      checks: {
        claudeAuthenticatedSmokeRan: externalGateEvidence?.checks?.claudeAuthenticatedSmokeRan === true,
        claudeSmokePromptsPassed: externalGateEvidence?.checks?.claudeSmokePromptsPassed === true,
      },
      ...(claudeSmokeGateOk
        ? {}
        : { remaining: "Requires an authenticated interactive Claude Code environment. Current evidence proves split package validation only." }),
    },
    {
      id: "GATE-MARKETPLACE-SUBMISSION",
      requirement: "Submit the split OpenAI/Codex and Claude Code core JSONX and generative UI packages to their public review channels.",
      status: marketplaceGateOk ? "proved" : "external-gated",
      githubIssue: "#1115",
      evidence: [
        ...manifest.storeListings.map((item) => item.path),
        manifest.submissionQueue?.json?.path,
        manifest.submissionQueue?.markdown?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
      ].filter(Boolean),
      checks: {
        openAiCoreSubmissionRecorded: externalGateEvidence?.checks?.openAiCoreSubmissionRecorded === true,
        openAiGenerativeUiSubmissionRecorded: externalGateEvidence?.checks?.openAiGenerativeUiSubmissionRecorded === true,
        claudeCoreSubmissionRecorded: externalGateEvidence?.checks?.claudeCoreSubmissionRecorded === true,
        claudeGenerativeUiSubmissionRecorded: externalGateEvidence?.checks?.claudeGenerativeUiSubmissionRecorded === true,
        openAiSubmissionRecorded: externalGateEvidence?.checks?.openAiSubmissionRecorded === true,
        claudeSubmissionRecorded: externalGateEvidence?.checks?.claudeSubmissionRecorded === true,
        policyReviewRecorded: externalGateEvidence?.checks?.policyReviewRecorded === true,
      },
      ...(marketplaceGateOk ? {} : { remaining: "Requires portal access and final human/legal review before sending public submissions." }),
    },
  ];

  const summary = requirements.reduce(
    (result, requirement) => {
      result[requirement.status] = (result[requirement.status] || 0) + 1;
      return result;
    },
    {},
  );

  return {
    generatedAt: new Date().toISOString(),
    source: "JSONX generative UI submission artifact manifest",
    gitCommit,
    sourceGit: {
      headCommit: sourceGitSnapshot.headCommit,
      dirty: sourceGitSnapshot.dirtyStatus.length > 0,
      dirtyStatus: sourceGitSnapshot.dirtyStatus,
      ignoredGeneratedArtifactStatusCount: sourceGitSnapshot.ignoredGeneratedArtifactStatusCount,
    },
    objective:
    "Installable JSONX and generative UI skills for Codex, Claude Code, and OpenCode; separate core and generative UI plugin packages for Codex and Claude Code; hosted Apps SDK renderer; optional renderer-owned GSAP motion; GitHub issue tracking; GitHub Pages updates; npm package boundary protection.",
    summary,
    requirements,
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
    "## Portal Packets",
    "",
    "| Submission | Artifact | SHA-256 | Bytes |",
    "| --- | --- | --- | ---: |",
    ...(manifest.submissionForms || []).map((item) => `| ${item.label} | \`${item.path}\` | \`${item.sha256}\` | ${item.bytes} |`),
    "",
    "## Submission Queue",
    "",
    manifest.submissionQueue
      ? `- \`${manifest.submissionQueue.json.path}\` tracks ${manifest.submissionQueue.submissionCount} public submission handoffs with ${manifest.submissionQueue.pendingSubmissionCount} pending receipts.`
      : "- Submission queue was not generated.",
    manifest.submissionQueue
      ? `- \`${manifest.submissionQueue.markdown.path}\` is the submitter-facing checklist.`
      : "",
    "",
    "## External Gate Runbook",
    "",
    manifest.externalGateRunbook
      ? `- \`${manifest.externalGateRunbook.path}\` lists the app ID, ChatGPT transcript, Claude smoke, policy review, and marketplace receipt steps that need external evidence.`
      : "- External gate runbook was not generated.",
    manifest.externalGateRunbook ? `- Public URL: ${publicExternalGateRunbookUrl()}` : "",
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
    manifest.motionProfileEvidence && !manifest.motionProfileEvidence.skipped
      ? `- \`${manifest.motionProfileEvidence.path}\` covers ${manifest.motionProfileEvidence.caseCount} renderer motion cases.`
      : manifest.motionProfileEvidence
        ? `- \`${manifest.motionProfileEvidence.path}\` records why renderer motion evidence was skipped.`
        : "- Renderer motion evidence was not generated.",
    manifest.browserDemoEvidence && !manifest.browserDemoEvidence.skipped
      ? `- \`${manifest.browserDemoEvidence.path}\` covers ${manifest.browserDemoEvidence.caseCount} browser demo modes.`
      : manifest.browserDemoEvidence
        ? `- \`${manifest.browserDemoEvidence.path}\` records why browser demo evidence was skipped.`
        : "- Browser demo evidence was not generated.",
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
      ? `- \`${manifest.codexInstallEvidence.path}\` records isolated Codex marketplace installs for the core and generative UI plugins with ${manifest.codexInstallEvidence.stepCount} checks.`
      : manifest.codexInstallEvidence
        ? `- \`${manifest.codexInstallEvidence.path}\` records why Codex CLI install evidence was skipped.`
        : "- Codex install evidence was not generated.",
    manifest.claudeValidationEvidence && !manifest.claudeValidationEvidence.skipped
      ? `- \`${manifest.claudeValidationEvidence.path}\` records Claude Code plugin validation for the core and generative UI plugins with ${manifest.claudeValidationEvidence.stepCount} checks.`
      : manifest.claudeValidationEvidence
        ? `- \`${manifest.claudeValidationEvidence.path}\` records why Claude validation evidence was skipped.`
        : "- Claude validation evidence was not generated.",
    manifest.openCodeSkillEvidence && !manifest.openCodeSkillEvidence.skipped
      ? `- \`${manifest.openCodeSkillEvidence.path}\` records OpenCode project skill discovery with ${manifest.openCodeSkillEvidence.stepCount} checks.`
      : manifest.openCodeSkillEvidence
        ? `- \`${manifest.openCodeSkillEvidence.path}\` records why OpenCode skill evidence was skipped.`
        : "- OpenCode skill evidence was not generated.",
    "",
    "## Submission Audit",
    "",
    manifest.submissionAudit
      ? `- \`${manifest.submissionAudit.path}\` maps ${manifest.submissionAudit.requirementCount} requirements to evidence, with ${manifest.submissionAudit.provedCount} proved and ${manifest.submissionAudit.externalGatedCount} external-gated.`
      : "- Submission audit was not generated.",
    manifest.externalGateEvidence?.supplied
      ? `- \`${manifest.externalGateEvidence.path}\` records supplied external gate evidence.`
      : manifest.externalGateEvidence
        ? `- \`${manifest.externalGateEvidence.path}\` is a pending external gate evidence template copy.`
        : "- External gate evidence was not generated.",
    "",
    "## Validation",
    "",
    ...manifest.validation.map((item) => `- ${item}`),
    "",
    "## Submission Notes",
    "",
    "- Codex development installs use `.agents/plugins/marketplace.json` from the repo root.",
    "- Claude Code packages remain local until interactive Claude smoke prompts and marketplace submission can run in a Claude-enabled environment.",
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
  const skipOpenCodeValidation = hasArg("--skip-opencode-validation") || process.env.JSONX_SKIP_OPENCODE_VALIDATION === "1";
  const skipMotionEvidence = hasArg("--skip-motion-evidence") || process.env.JSONX_SKIP_MOTION_EVIDENCE === "1";
  const skipBrowserDemo = hasArg("--skip-browser-demo") || process.env.JSONX_SKIP_BROWSER_DEMO === "1";
  const sourceGitSnapshot = buildSourceGitSnapshot();
  await fs.rm(artifactRoot, { recursive: true, force: true });
  await fs.mkdir(packagesDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(storeListingsDir, { recursive: true });
  await fs.mkdir(submissionFormsDir, { recursive: true });

  run("plugin package validation", "node", ["plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs"]);
  run("renderer app check", "npm", ["run", "check"], { cwd: path.join(repoRoot, "apps", "jsonx-renderer-app") });
  run(
    "valid and invalid fixture validation",
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
  const motionProfileEvidencePath = path.join(artifactRoot, "motion-profile-evidence.json");
  const motionProfileEvidence = await buildMotionEvidence({ skip: skipMotionEvidence });
  await writeJson(motionProfileEvidencePath, motionProfileEvidence);
  const motionProfileArtifact = await hashFile(motionProfileEvidencePath);
  const browserDemoEvidencePath = path.join(artifactRoot, "browser-demo-evidence.json");
  const browserDemoEvidence = await buildBrowserDemoEvidence({ skip: skipBrowserDemo });
  await writeJson(browserDemoEvidencePath, browserDemoEvidence);
  const browserDemoArtifact = await hashFile(browserDemoEvidencePath);
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
  const openCodeSkillEvidencePath = path.join(artifactRoot, "opencode-skill-evidence.json");
  const openCodeSkillEvidence = await buildOpenCodeSkillEvidence({ skip: skipOpenCodeValidation });
  await writeJson(openCodeSkillEvidencePath, openCodeSkillEvidence);
  const openCodeSkillArtifact = await hashFile(openCodeSkillEvidencePath);

  const packages = [];
  packages.push({
    surface: "Codex core JSONX plugin",
    ...(await zipDirectory(
      "Codex core JSONX plugin",
      path.join(repoRoot, "plugins", "jsonx-codex-plugin"),
      path.join(packagesDir, "jsonx-codex-plugin.zip"),
    )),
  });
  packages.push({
    surface: "Codex generative UI plugin",
    ...(await zipDirectory(
      "Codex generative UI plugin",
      path.join(repoRoot, "plugins", "jsonx-generative-ui-plugin"),
      path.join(packagesDir, "jsonx-generative-ui-codex-plugin.zip"),
    )),
  });
  packages.push({
    surface: "Claude Code core JSONX plugin",
    ...(await zipDirectory(
      "Claude Code core JSONX plugin",
      path.join(repoRoot, "plugins", "claude-jsonx-plugin"),
      path.join(packagesDir, "jsonx-claude-code-plugin.zip"),
    )),
  });
  packages.push({
    surface: "Claude Code generative UI plugin",
    ...(await zipDirectory(
      "Claude Code generative UI plugin",
      path.join(repoRoot, "plugins", "claude-jsonx-generative-ui-plugin"),
      path.join(packagesDir, "jsonx-generative-ui-claude-code-plugin.zip"),
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
    motionProfileEvidence: {
      ...motionProfileArtifact,
      skipped: motionProfileEvidence.skipped === true,
      caseCount: motionProfileEvidence.cases.length,
      profiles: motionProfileEvidence.profiles,
      checks: motionProfileEvidence.checks,
    },
    browserDemoEvidence: {
      ...browserDemoArtifact,
      skipped: browserDemoEvidence.skipped === true,
      caseCount: browserDemoEvidence.cases.length,
      checks: browserDemoEvidence.checks,
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
      reusedPreviousEvidence: codexInstallEvidence.reusedPreviousEvidence === true,
      stepCount: codexInstallEvidence.steps.length,
      checks: codexInstallEvidence.checks,
    },
    claudeValidationEvidence: {
      ...claudeValidationArtifact,
      skipped: claudeValidationEvidence.skipped === true,
      reusedPreviousEvidence: claudeValidationEvidence.reusedPreviousEvidence === true,
      stepCount: claudeValidationEvidence.steps.length,
      checks: claudeValidationEvidence.checks,
      claudeCodePackage: claudeValidationEvidence.claudeCodePackage,
      claudeVersion: claudeValidationEvidence.claudeVersion,
    },
    openCodeSkillEvidence: {
      ...openCodeSkillArtifact,
      skipped: openCodeSkillEvidence.skipped === true,
      reusedPreviousEvidence: openCodeSkillEvidence.reusedPreviousEvidence === true,
      stepCount: openCodeSkillEvidence.steps.length,
      checks: openCodeSkillEvidence.checks,
      openCodePackage: openCodeSkillEvidence.openCodePackage,
      openCodeVersion: openCodeSkillEvidence.openCodeVersion,
    },
    npmBoundary,
    fixtureValidation: {
      validFixtures,
      invalidFixtures,
    },
    validation: [
      "node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs",
      "npm run check from apps/jsonx-renderer-app",
      `python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py ${validFixtures.map((name) => `${name}.json`).join(" ")}`,
      "diff -rq skills docs/skills",
      "store listing draft validation",
      "npm pack --dry-run --json package-boundary check",
      "skill installer dry-run and isolated install evidence",
      ...(motionProfileEvidence.skipped ? [] : ["renderer motion profile evidence"]),
      ...(browserDemoEvidence.skipped ? [] : ["browser demo fixture, paste, and endpoint mode evidence"]),
      ...(codexInstallEvidence.skipped ? [] : ["isolated Codex marketplace install evidence"]),
      ...(claudeValidationEvidence.skipped ? [] : ["Claude Code plugin validation evidence"]),
      ...(openCodeSkillEvidence.skipped ? [] : ["OpenCode project skill discovery evidence"]),
      ...(hostedMcpArtifact ? [`live hosted MCP transcript capture from ${hostedMcpUrl}`] : []),
    ],
  };

  const externalGateEvidencePath = path.join(artifactRoot, "external-gate-evidence.json");
  const externalGateEvidence = await buildExternalGateEvidence();
  await writeJson(externalGateEvidencePath, externalGateEvidence);
  const externalGateEvidenceArtifact = await hashFile(externalGateEvidencePath);
  manifest.externalGateEvidence = {
    ...externalGateEvidenceArtifact,
    supplied: externalGateEvidence.supplied === true,
    gateStatus: externalGateEvidence.gateStatus,
    checks: externalGateEvidence.checks,
  };
  manifest.validation.push("external gate evidence validation");

  const submissionQueuePath = path.join(artifactRoot, "submission-queue.json");
  const submissionQueueMarkdownPath = path.join(artifactRoot, "submission-queue.md");
  const submissionQueue = await buildSubmissionQueue(manifest, externalGateEvidence);
  const submissionForms = await writeSubmissionFormArtifacts(submissionQueue);
  await writeJson(submissionQueuePath, submissionQueue);
  await writeSubmissionQueueMarkdown(submissionQueue, submissionQueueMarkdownPath);
  const submissionQueueArtifact = await hashFile(submissionQueuePath);
  const submissionQueueMarkdownArtifact = await hashFile(submissionQueueMarkdownPath);
  manifest.submissionQueue = {
    json: submissionQueueArtifact,
    markdown: submissionQueueMarkdownArtifact,
    submissionCount: submissionQueue.submissionCount,
    receiptRecordedCount: submissionQueue.receiptRecordedCount,
    pendingSubmissionCount: submissionQueue.pendingSubmissionCount,
    portalFormCount: submissionQueue.portalFormCount,
  };
  manifest.submissionForms = submissionForms;
  manifest.validation.push("submission queue generation");
  manifest.validation.push("portal submission form generation");

  const externalGateRunbookPath = path.join(artifactRoot, "external-gates.md");
  await writeExternalGateRunbookMarkdown({
    queue: submissionQueue,
    externalGateEvidence,
    filePath: externalGateRunbookPath,
  });
  manifest.externalGateRunbook = await hashFile(externalGateRunbookPath);
  manifest.validation.push("external gate runbook generation");

  const submissionAuditPath = path.join(artifactRoot, "submission-audit.json");
  const submissionAudit = buildSubmissionAudit(manifest, externalGateEvidence, sourceGitSnapshot);
  await writeJson(submissionAuditPath, submissionAudit);
  const submissionAuditArtifact = await hashFile(submissionAuditPath);
  manifest.submissionAudit = {
    ...submissionAuditArtifact,
    requirementCount: submissionAudit.requirements.length,
    provedCount: submissionAudit.summary.proved || 0,
    externalGatedCount: submissionAudit.summary["external-gated"] || 0,
    incompleteCount: submissionAudit.summary.incomplete || 0,
  };
  manifest.validation.push("submission readiness audit");

  await writeJson(path.join(artifactRoot, "manifest.json"), manifest);
  await writeReviewSummary(manifest);
  console.log(`submission artifacts written to ${artifactPath(artifactRoot) || "."}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
