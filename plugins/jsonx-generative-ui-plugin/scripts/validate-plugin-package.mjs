import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const codexPluginRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(codexPluginRoot, "..", "..");
const claudePluginRoot = path.join(repoRoot, "plugins", "claude-jsonx-plugin");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function assertFile(relativePath) {
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), `Missing ${relativePath}`);
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
const marketplaceEntry = marketplace.plugins.find((plugin) => plugin.name === "jsonx-generative-ui-plugin");
assert.ok(marketplaceEntry, "Marketplace must include jsonx-generative-ui-plugin");
assert.deepEqual(marketplaceEntry.source, {
  source: "local",
  path: "./plugins/jsonx-generative-ui-plugin",
});
assert.deepEqual(marketplaceEntry.policy, {
  installation: "AVAILABLE",
  authentication: "ON_INSTALL",
});
assert.equal(marketplaceEntry.category, "Developer Tools");

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
assertSkill(codexPluginRoot, "jsonx");
assertSkill(codexPluginRoot, "jsonx-generative-ui");

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
assertSkill(claudePluginRoot, "jsonx");
assertSkill(claudePluginRoot, "jsonx-generative-ui");
const claudeMcp = readJson("plugins/claude-jsonx-plugin/.mcp.json");
assert.deepEqual(claudeMcp, { mcpServers: {} });

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
for (const entry of ["apps/", "plugins/", "skills/", ".agents/", ".claude/", ".opencode/", "docs/intent/", "docs/skills/", "vscode-extension/"]) {
  assert.match(npmIgnore, new RegExp(`(^|\\n)${entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `.npmignore must exclude ${entry}`);
}

console.log("jsonx plugin package validation passed");
