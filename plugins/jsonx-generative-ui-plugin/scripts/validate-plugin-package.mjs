import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const codexGenerativePluginRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(codexGenerativePluginRoot, "..", "..");
const codexCorePluginRoot = path.join(repoRoot, "plugins", "jsonx-codex-plugin");
const claudeCorePluginRoot = path.join(repoRoot, "plugins", "claude-jsonx-plugin");
const claudeGenerativePluginRoot = path.join(repoRoot, "plugins", "claude-jsonx-generative-ui-plugin");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function assertFile(relativePath) {
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
}

function assertNoFile(relativePath) {
  assert.ok(!fs.existsSync(path.join(repoRoot, relativePath)), `Unexpected ${relativePath}`);
}

function assertHttps(value, fieldName) {
  assert.equal(typeof value, "string", `${fieldName} must be a string`);
  assert.ok(value.startsWith("https://"), `${fieldName} must use https`);
}

function assertSkill(root, name) {
  assertFile(path.relative(repoRoot, path.join(root, "skills", name, "SKILL.md")));
}

const marketplace = readJson(".agents/plugins/marketplace.json");
assert.equal(marketplace.name, "jsonx-local");
assert.equal(marketplace.interface?.displayName, "JSONX Local");
assert.ok(Array.isArray(marketplace.plugins));
for (const [name, sourcePath] of [
  ["jsonx-codex-plugin", "./plugins/jsonx-codex-plugin"],
  ["jsonx-generative-ui-plugin", "./plugins/jsonx-generative-ui-plugin"],
]) {
  const marketplaceEntry = marketplace.plugins.find((plugin) => plugin.name === name);
  assert.ok(marketplaceEntry, `Marketplace must include ${name}`);
  assert.deepEqual(marketplaceEntry.source, {
    source: "local",
    path: sourcePath,
  });
  assert.deepEqual(marketplaceEntry.policy, {
    installation: "AVAILABLE",
    authentication: "ON_INSTALL",
  });
  assert.equal(marketplaceEntry.category, "Developer Tools");
}

const codexCoreManifest = readJson("plugins/jsonx-codex-plugin/.codex-plugin/plugin.json");
assert.equal(codexCoreManifest.name, "jsonx-codex-plugin");
assert.equal(codexCoreManifest.version, "0.1.0");
assert.equal(codexCoreManifest.skills, "./skills/");
assert.equal(codexCoreManifest.mcpServers, undefined);
assert.equal(codexCoreManifest.apps, undefined);
assertHttps(codexCoreManifest.homepage, "Codex core homepage");
assertHttps(codexCoreManifest.interface.websiteURL, "Codex core websiteURL");
assert.equal(codexCoreManifest.interface.displayName, "JSONX");
assert.equal(codexCoreManifest.interface.category, "Developer Tools");
assert.ok(codexCoreManifest.interface.defaultPrompt.length <= 3);
assertSkill(codexCorePluginRoot, "jsonx");
assertNoFile("plugins/jsonx-codex-plugin/skills/jsonx-generative-ui/SKILL.md");

const codexManifest = readJson("plugins/jsonx-generative-ui-plugin/.codex-plugin/plugin.json");
assert.equal(codexManifest.name, "jsonx-generative-ui-plugin");
assert.equal(codexManifest.version, "0.1.0");
assert.equal(codexManifest.skills, "./skills/");
assert.equal(codexManifest.mcpServers, "./.mcp.json");
assert.equal(codexManifest.apps, "./.app.json");
assertHttps(codexManifest.homepage, "Codex homepage");
assertHttps(codexManifest.interface.websiteURL, "Codex websiteURL");
assert.equal(codexManifest.interface.displayName, "JSONX Generative UI");
assert.equal(codexManifest.interface.category, "Developer Tools");
assert.ok(codexManifest.interface.defaultPrompt.length <= 3);
assertSkill(codexGenerativePluginRoot, "jsonx-generative-ui");
assertNoFile("plugins/jsonx-generative-ui-plugin/skills/jsonx/SKILL.md");

const codexApp = readJson("plugins/jsonx-generative-ui-plugin/.app.json");
assert.deepEqual(codexApp, { apps: {} });
const codexMcp = readJson("plugins/jsonx-generative-ui-plugin/.mcp.json");
assert.deepEqual(codexMcp, { mcpServers: {} });

for (const fixture of [
  "support-triage",
  "text-block",
  "checklist",
  "choice-list",
  "data-table",
  "alert",
  "quiz",
  "slider-poll",
  "motion-subtle",
  "bad-unknown-component",
  "bad-blocked-prop",
  "bad-event-handler",
  "bad-motion-profile",
]) {
  assertFile(`plugins/jsonx-generative-ui-plugin/fixtures/${fixture}.json`);
}

const claudeManifest = readJson("plugins/claude-jsonx-plugin/.claude-plugin/plugin.json");
assert.equal(claudeManifest.name, "jsonx");
assert.equal(claudeManifest.version, "0.1.0");
assertHttps(claudeManifest.homepage, "Claude homepage");
assertHttps(claudeManifest.repository, "Claude repository");
assertSkill(claudeCorePluginRoot, "jsonx");
assertNoFile("plugins/claude-jsonx-plugin/skills/jsonx-generative-ui/SKILL.md");
const claudeMcp = readJson("plugins/claude-jsonx-plugin/.mcp.json");
assert.deepEqual(claudeMcp, { mcpServers: {} });

const claudeGenerativeManifest = readJson("plugins/claude-jsonx-generative-ui-plugin/.claude-plugin/plugin.json");
assert.equal(claudeGenerativeManifest.name, "jsonx-generative-ui");
assert.equal(claudeGenerativeManifest.version, "0.1.0");
assertHttps(claudeGenerativeManifest.homepage, "Claude generative UI homepage");
assertHttps(claudeGenerativeManifest.repository, "Claude generative UI repository");
assertSkill(claudeGenerativePluginRoot, "jsonx-generative-ui");
assertNoFile("plugins/claude-jsonx-generative-ui-plugin/skills/jsonx/SKILL.md");
const claudeGenerativeMcp = readJson("plugins/claude-jsonx-generative-ui-plugin/.mcp.json");
assert.deepEqual(claudeGenerativeMcp, { mcpServers: {} });

const submission = readJson("apps/jsonx-renderer-app/chatgpt-app-submission.json");
assert.equal(submission.app_info.display_name, "JSONX Renderer");
assert.ok(submission.tools.render_jsonx_response);
assert.deepEqual(submission.tools.render_jsonx_response.annotations, {
  readOnlyHint: true,
  openWorldHint: false,
  destructiveHint: false,
});
assert.equal(submission.test_cases.length, 5);
assert.equal(submission.negative_test_cases.length, 3);

const readiness = fs.readFileSync(path.join(repoRoot, "docs/intent/generative-ui-plugin/submission-readiness.md"), "utf8");
assert.match(readiness, /https:\/\/jsonx-renderer-app\.netlify\.app\/mcp/);
assert.match(readiness, /ChatGPT developer mode/);
assert.match(readiness, /Claude community marketplace/);

const npmIgnore = fs.readFileSync(path.join(repoRoot, ".npmignore"), "utf8");
for (const entry of [
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
]) {
  assert.match(npmIgnore, new RegExp(`(^|\\n)${entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `.npmignore must exclude ${entry}`);
}

console.log("jsonx plugin package validation passed");
