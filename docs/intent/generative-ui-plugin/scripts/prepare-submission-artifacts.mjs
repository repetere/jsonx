#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const cliArgs = process.argv.slice(2);
const artifactRoot = resolveArtifactRoot();
const packagesDir = path.join(artifactRoot, "packages");
const screenshotsDir = path.join(artifactRoot, "screenshots");

const hostedWidgetUrl = process.env.JSONX_RENDERER_WIDGET_URL || "https://jsonx-renderer-app.netlify.app/widget";
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
  const blockedTerms = ["chatgpt-app-submission", "marketplace.json", "netlify/", "gsap"];
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
    "## Screenshots",
    "",
    "| Purpose | Artifact | SHA-256 | Bytes |",
    "| --- | --- | --- | ---: |",
    ...manifest.screenshots.map((item) => `| ${item.purpose} | \`${item.path}\` | \`${item.sha256}\` | ${item.bytes} |`),
    "",
    "## Validation",
    "",
    ...manifest.validation.map((item) => `- ${item}`),
    "",
    "## Submission Notes",
    "",
    "- Codex development install uses `.agents/plugins/marketplace.json` from the repo root.",
    "- Claude Code package remains local until `claude plugin validate` and marketplace submission can run in a Claude-enabled environment.",
    "- ChatGPT app submission starts from `apps/jsonx-renderer-app/chatgpt-app-submission.json` and the hosted MCP endpoint.",
    "- These artifacts live under `docs/intent/`, which is excluded from the root `jsonx` npm package.",
    "",
  ];
  await fs.writeFile(path.join(artifactRoot, "README.md"), lines.join("\n"));
}

async function main() {
  const skipScreenshots = hasArg("--skip-screenshots");
  await fs.rm(artifactRoot, { recursive: true, force: true });
  await fs.mkdir(packagesDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });

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

  const screenshots = skipScreenshots
    ? []
    : (await captureScreenshots()).map((item) => ({
        purpose: path.basename(item.path, ".png").replace(/^jsonx-/, "").replaceAll("-", " "),
        ...item,
      }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    hostedWidgetUrl,
    publicSiteUrl,
    publicSkillsUrl,
    packages,
    screenshots,
    npmBoundary,
    validation: [
      "node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs",
      "npm run check from apps/jsonx-renderer-app",
      `python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py ${validFixtures.map((name) => `${name}.json`).join(" ")}`,
      "diff -rq skills docs/skills",
      "npm pack --dry-run --json package-boundary check",
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
