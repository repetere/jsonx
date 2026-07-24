#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const intentRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(intentRoot, "..", "..", "..");
const args = process.argv.slice(2);

const surfaces = ["codex", "claude", "opencode"];
const splitSkills = ["jsonx", "jsonx-generative-ui"];
const invalidFixtures = [
  "bad-unknown-component",
  "bad-blocked-prop",
  "bad-event-handler",
  "bad-motion-profile",
  "bad-oversized",
];
const externalGateNames = ["appIds", "chatgptDeveloperMode", "claudeSmoke", "marketplaceSubmission"];
const expectedSubmissionPortals = {
  openai: "https://platform.openai.com/plugins",
  claude: "https://platform.claude.com/plugins/submit",
};
const blockedNpmPrefixes = ["apps/", "plugins/", "skills/", ".agents/", ".claude/", ".opencode/", "docs/intent/", "docs/skills/", "vscode-extension/", ".github/"];
const blockedNpmTerms = [
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
  "source-docs-evidence",
  "submission-audit",
  "external-gate-evidence",
  "external-gates",
  "openai-jsonx-plugin-submission",
  "openai-generative-ui-plugin-submission",
  "claude-code-jsonx-submission",
  "claude-code-generative-ui-submission",
];

function hasArg(name) {
  return args.includes(name);
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function resolvePath(filePath) {
  return path.resolve(repoRoot, filePath);
}

async function fileExists(filePath) {
  try {
    await fs.access(resolvePath(filePath));
    return true;
  } catch {
    return false;
  }
}

async function readText(filePath) {
  return fs.readFile(resolvePath(filePath), "utf8");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

async function sameText(left, right) {
  try {
    const [leftText, rightText] = await Promise.all([readText(left), readText(right)]);
    return leftText === rightText;
  } catch {
    return false;
  }
}

function truthyChecks(checks) {
  return Object.values(checks).every((value) => value === true);
}

function packageSurfaces(manifest, names) {
  const surfacesInManifest = new Set((manifest.packages || []).map((item) => item.surface));
  return names.every((name) => surfacesInManifest.has(name));
}

function storeListingsOk(manifest) {
  const listings = manifest.storeListings || [];
  return (
    listings.length === 4 &&
    listings.every((listing) => listing.positiveTestCaseCount === 5 && listing.negativeTestCaseCount === 3 && listing.manualStepCount > 0)
  );
}

function allObjectValuesTrue(object) {
  return Boolean(object) && Object.values(object).every((value) => value === true);
}

function getExternalGateEvidence(manifest) {
  return manifest.externalGateEvidence || { gateStatus: {}, checks: {} };
}

function makeRequirement({ id, requirement, githubIssue, evidence, checks, external = false, remaining }) {
  const status = external ? (truthyChecks(checks) ? "proved" : "external-gated") : truthyChecks(checks) ? "proved" : "incomplete";
  return { id, requirement, status, githubIssue, evidence, checks, ...(remaining && status !== "proved" ? { remaining } : {}) };
}

function printHumanReport(report) {
  console.log("JSONX generative UI goal audit");
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log(`status: ${report.status}`);
  console.log(`proved: ${report.summary.proved}`);
  console.log(`incomplete: ${report.summary.incomplete}`);
  console.log(`external-gated: ${report.summary.externalGated}`);
  console.log("");

  for (const item of report.requirements) {
    console.log(`${item.status} ${item.id} ${item.githubIssue}`);
    console.log(`  ${item.requirement}`);
    if (item.remaining) console.log(`  remaining: ${item.remaining}`);
  }
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    console.log(`Usage:
  node docs/intent/generative-ui-plugin/scripts/audit-generative-ui-goal.mjs [--json] [--strict-external]

The audit fails if an implementation artifact is missing or inconsistent. External gates are reported
as external-gated unless --strict-external is set.
`);
    return;
  }

  const manifest = await readJson("docs/intent/generative-ui-plugin/submission-artifacts/current/manifest.json");
  const externalGateEvidence = getExternalGateEvidence(manifest);
  const skillsIndex = await readJson("skills/index.json");
  const marketplace = await readJson(".agents/plugins/marketplace.json");
  const npmIgnore = await readText(".npmignore");
  const publicPage = await readText("docs/generative-ui.html");
  const workflow = await readText(".github/workflows/generative-ui-plugin.yml");
  const issueTracker = await readText("docs/intent/generative-ui-plugin/github-issues.md");
  const readiness = await readText("docs/intent/generative-ui-plugin/submission-readiness.md");
  const externalGateRecorderValidator = await readText("docs/intent/generative-ui-plugin/scripts/validate-external-gate-recorder.mjs");
  const externalGateSource = await readJson("docs/intent/generative-ui-plugin/external-gate-evidence.json");
  const goldenPromptEvidence = await readJson(manifest.goldenPromptEvidence?.path || "docs/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json");
  const submissionQueue = await readJson(manifest.submissionQueue?.json?.path || "docs/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json");
  const externalGateRunbookPath = manifest.externalGateRunbook?.path || "docs/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md";
  const externalGateRunbookPresent = await fileExists(externalGateRunbookPath);
  const externalGateRunbook = externalGateRunbookPresent ? await readText(externalGateRunbookPath) : "";

  const skillEntries = new Map(skillsIndex.map((skill) => [skill.name, skill]));
  const splitSkillPaths = surfaces.flatMap((surface) => splitSkills.map((skill) => `skills/${surface}/${skill}/SKILL.md`));
  const docsSplitSkillPaths = surfaces.flatMap((surface) => splitSkills.map((skill) => `docs/skills/${surface}/${skill}/SKILL.md`));

  const skillInstallCoverage = splitSkills.every((skill) => {
    const entry = skillEntries.get(skill);
    return (
      entry &&
      surfaces.every((surface) => entry.surfaces.includes(surface)) &&
      surfaces.every((surface) => entry.install?.[surface]?.includes(`--surface ${surface}`) && entry.install[surface].includes(`--skill ${skill}`)) &&
      surfaces.every((surface) => entry.projectInstall?.[surface]?.includes(`--surface ${surface}`) && entry.projectInstall[surface].includes(`--skill ${skill}`))
    );
  });

  const marketplacePlugins = new Set((marketplace.plugins || []).map((plugin) => plugin.name));
  const externalChecks = externalGateEvidence.checks || {};
  const gateStatus = externalGateEvidence.gateStatus || {};
  const externalChatgptPromptIds = new Set(
    (externalGateSource.chatgptDeveloperMode?.promptsRun || []).map((prompt) => prompt.id),
  );
  const goldenPromptIds = (goldenPromptEvidence.cases || []).map((prompt) => prompt.id);
  const invalidFixtureFilesPresent = (
    await Promise.all(invalidFixtures.map((fixture) => fileExists(`plugins/jsonx-generative-ui-plugin/fixtures/${fixture}.json`)))
  ).every(Boolean);

  const requirements = [
    makeRequirement({
      id: "REQ-PLAN",
      requirement: "Keep a plan that includes split skill installation, plugin/app submission, optional GSAP motion, GitHub tracking, npm package boundary protection, and GitHub Pages updates.",
      githubIssue: "#1115",
      evidence: ["docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md", "docs/intent/generative-ui-plugin/submission-readiness.md"],
      checks: {
        planPresent: await fileExists("docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md"),
        mentionsCodex: readiness.includes("Codex"),
        mentionsClaudeCode: readiness.includes("Claude Code"),
        mentionsOpenCode: readiness.includes("OpenCode"),
        mentionsGsapMotion: readiness.includes("GSAP"),
        mentionsNpmBoundary: readiness.includes("npm package"),
      },
    }),
    makeRequirement({
      id: "REQ-SKILLS-SPLIT",
      requirement: "Provide installable core JSONX and generative UI skills for Codex, Claude Code, and OpenCode without mixing the two skill families.",
      githubIssue: "#1113",
      evidence: [...splitSkillPaths, ...docsSplitSkillPaths, "skills/index.json", manifest.skillInstallerEvidence?.path, manifest.openCodeSkillEvidence?.path].filter(Boolean),
      checks: {
        skillFilesPresent: (await Promise.all(splitSkillPaths.map(fileExists))).every(Boolean),
        docsMirrorPresent: (await Promise.all(docsSplitSkillPaths.map(fileExists))).every(Boolean),
        docsMirrorMatchesCodexCore: await sameText("skills/codex/jsonx/SKILL.md", "docs/skills/codex/jsonx/SKILL.md"),
        installerMetadataCoversSurfaces: skillInstallCoverage,
        installerEvidencePassed: manifest.skillInstallerEvidence?.checks?.allDryRunsCovered === true && manifest.skillInstallerEvidence?.checks?.allSurfaceInstallsPassed === true,
        openCodeEvidencePassed: manifest.openCodeSkillEvidence?.checks?.projectSkillsInstalled === true,
      },
    }),
    makeRequirement({
      id: "REQ-CODEX-PLUGINS",
      requirement: "Package separate Codex plugins for core JSONX and generative UI, with development marketplace entries and generated review packages.",
      githubIssue: "#1112",
      evidence: [
        "plugins/jsonx-codex-plugin/.codex-plugin/plugin.json",
        "plugins/jsonx-generative-ui-plugin/.codex-plugin/plugin.json",
        ".agents/plugins/marketplace.json",
        manifest.codexInstallEvidence?.path,
      ].filter(Boolean),
      checks: {
        coreManifestPresent: await fileExists("plugins/jsonx-codex-plugin/.codex-plugin/plugin.json"),
        generativeManifestPresent: await fileExists("plugins/jsonx-generative-ui-plugin/.codex-plugin/plugin.json"),
        marketplaceHasCore: marketplacePlugins.has("jsonx-codex-plugin"),
        marketplaceHasGenerativeUi: marketplacePlugins.has("jsonx-generative-ui-plugin"),
        generatedPackagesPresent: packageSurfaces(manifest, ["Codex core JSONX plugin", "Codex generative UI plugin", "Codex local marketplace"]),
        codexInstallEvidencePassed: manifest.codexInstallEvidence?.checks?.corePluginInstalled === true && manifest.codexInstallEvidence?.checks?.generativeUiPluginInstalled === true,
      },
    }),
    makeRequirement({
      id: "REQ-CLAUDE-PLUGINS",
      requirement: "Package separate Claude Code plugins for core JSONX and generative UI, with validation evidence and generated review packages.",
      githubIssue: "#1113",
      evidence: [
        "plugins/claude-jsonx-plugin/.claude-plugin/plugin.json",
        "plugins/claude-jsonx-generative-ui-plugin/.claude-plugin/plugin.json",
        manifest.claudeValidationEvidence?.path,
      ].filter(Boolean),
      checks: {
        coreManifestPresent: await fileExists("plugins/claude-jsonx-plugin/.claude-plugin/plugin.json"),
        generativeManifestPresent: await fileExists("plugins/claude-jsonx-generative-ui-plugin/.claude-plugin/plugin.json"),
        generatedPackagesPresent: packageSurfaces(manifest, ["Claude Code core JSONX plugin", "Claude Code generative UI plugin"]),
        claudeValidationPassed:
          manifest.claudeValidationEvidence?.checks?.corePluginValidationPassed === true &&
          manifest.claudeValidationEvidence?.checks?.generativeUiPluginValidationPassed === true,
      },
    }),
    makeRequirement({
      id: "REQ-HOSTED-RENDERER",
      requirement: "Provide a stateless hosted Apps SDK renderer with MCP tool metadata, structuredContent output, widget resource wiring, and ChatGPT app submission material.",
      githubIssue: "#1111",
      evidence: ["apps/jsonx-renderer-app/", manifest.hostedMcpEvidence?.path, "apps/jsonx-renderer-app/chatgpt-app-submission.json"].filter(Boolean),
      checks: {
        appSourcePresent: await fileExists("apps/jsonx-renderer-app/src/server.mjs"),
        widgetPresent: await fileExists("apps/jsonx-renderer-app/web/widget.js"),
        netlifyAdapterPresent: await fileExists("apps/jsonx-renderer-app/netlify/functions/jsonx-renderer.mjs"),
        hostedMcpUrlRecorded: manifest.hostedMcpUrl === "https://jsonx-renderer-app.netlify.app/mcp",
        hostedMcpEvidencePassed: allObjectValuesTrue(manifest.hostedMcpEvidence?.checks),
        chatgptSubmissionPackagePresent: packageSurfaces(manifest, ["ChatGPT app submission"]),
      },
    }),
    makeRequirement({
      id: "REQ-GENERATIVE-UI-CONTRACT",
      requirement: "Use one jsonx.generative-ui.v1 contract and allowlist across fixtures, app, plugin, browser demo, and local handoff files.",
      githubIssue: "#1110",
      evidence: [
        "apps/jsonx-renderer-app/src/jsonx-validator.mjs",
        "plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py",
        "plugins/jsonx-generative-ui-plugin/fixtures/",
        ...invalidFixtures.map((name) => `plugins/jsonx-generative-ui-plugin/fixtures/${name}.json`),
        manifest.goldenPromptEvidence?.path,
      ].filter(Boolean),
      checks: {
        appValidatorPresent: await fileExists("apps/jsonx-renderer-app/src/jsonx-validator.mjs"),
        pluginValidatorPresent: await fileExists("plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py"),
        fixtureCountCovered: manifest.goldenPromptEvidence?.caseCount >= 9,
        invalidFixtureFilesPresent,
        invalidFixturesCovered:
          Array.isArray(manifest.fixtureValidation?.invalidFixtures) &&
          invalidFixtures.every((name) => manifest.fixtureValidation.invalidFixtures.includes(name)),
        browserDemoUsesContract: manifest.browserDemoEvidence?.checks?.fixtureModeRendered === true && manifest.browserDemoEvidence?.checks?.pasteModeRendered === true,
        hostedMcpUsesContract: manifest.hostedMcpEvidence?.checks?.validPayloadRendered === true && manifest.hostedMcpEvidence?.checks?.invalidPayloadRejected === true,
      },
    }),
    makeRequirement({
      id: "REQ-MOTION",
      requirement: "Keep GSAP-style motion optional, renderer-owned, reduced-motion aware, and outside model-supplied JSONX payloads.",
      githubIssue: "#1114",
      evidence: ["apps/jsonx-renderer-app/web/widget.js", manifest.motionProfileEvidence?.path].filter(Boolean),
      checks: {
        motionEvidencePresent: Boolean(manifest.motionProfileEvidence?.path),
        expectedProfilesCovered:
          Array.isArray(manifest.motionProfileEvidence?.profiles) &&
          ["none", "subtle-enter", "state-change-highlight", "morph-list-to-detail"].every((profile) => manifest.motionProfileEvidence.profiles.includes(profile)),
        motionChecksPassed: allObjectValuesTrue(manifest.motionProfileEvidence?.checks),
        packageBoundaryMentionsGsap: manifest.npmBoundary?.excludedTerms?.includes("gsap") === true,
        chatgptGateCoversMotionPrompts:
          externalChatgptPromptIds.has("motion-request") && externalChatgptPromptIds.has("bad-motion-request"),
      },
    }),
    makeRequirement({
      id: "REQ-BROWSER-DEMO",
      requirement: "Publish a browser demo with fixture, paste, and bring-your-own endpoint modes that render the shared JSONX contract.",
      githubIssue: "#1117",
      evidence: ["site/generative-ui.html", "site/assets/generative-ui-demo.js", manifest.browserDemoEvidence?.path].filter(Boolean),
      checks: {
        sitePagePresent: await fileExists("site/generative-ui.html"),
        demoScriptPresent: await fileExists("site/assets/generative-ui-demo.js"),
        fixtureModePassed: manifest.browserDemoEvidence?.checks?.fixtureModeRendered === true,
        pasteModePassed: manifest.browserDemoEvidence?.checks?.pasteModeRendered === true,
        endpointModePassed: manifest.browserDemoEvidence?.checks?.endpointModeRendered === true,
        mobileOverflowPassed: manifest.browserDemoEvidence?.checks?.noHorizontalOverflowAtMobileWidth === true,
      },
    }),
    makeRequirement({
      id: "REQ-GITHUB-TRACKING",
      requirement: "Track the work in GitHub as feature enhancement issues across contract, renderer, plugins, skills, motion, submission, Pages, and browser demo workstreams.",
      githubIssue: "#1110-#1117",
      evidence: ["docs/intent/generative-ui-plugin/github-issues.md", manifest.githubIssueEvidence?.path].filter(Boolean),
      checks: {
        issueTrackerPresent: await fileExists("docs/intent/generative-ui-plugin/github-issues.md"),
        allIssueNumbersListed: [1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117].every((issue) => issueTracker.includes(`#${issue}`)),
        workstreamsListed:
          issueTracker.includes("Shared contract") &&
          issueTracker.includes("Hosted renderer app") &&
          issueTracker.includes("Store submission") &&
          issueTracker.includes("GitHub Pages"),
        githubIssueEvidencePresent: Boolean(manifest.githubIssueEvidence?.path),
        githubIssueEvidencePassed: allObjectValuesTrue(manifest.githubIssueEvidence?.checks),
      },
    }),
    makeRequirement({
      id: "REQ-GITHUB-PAGES",
      requirement: "Update the JSONX GitHub Pages site with skills, plugin, renderer, safety, demo, and review-kit documentation.",
      githubIssue: "#1116",
      evidence: ["site/generative-ui.html", "docs/generative-ui.html", "docs/skills/README.md", manifest.publicSiteUrl],
      checks: {
        siteSourcePresent: await fileExists("site/generative-ui.html"),
        docsPagePresent: await fileExists("docs/generative-ui.html"),
        mirroredPageMatches: await sameText("site/generative-ui.html", "docs/generative-ui.html"),
        publicPageHasReviewKit: publicPage.includes("Submission packages, listing drafts, and evidence are published together."),
        publicPageLinksExternalGateRunbook: publicPage.includes("intent/generative-ui-plugin/submission-artifacts/current/external-gates.md"),
        publicPageHasSkills: publicPage.includes("jsonx-codex-plugin") && publicPage.includes("claude-jsonx-generative-ui-plugin"),
        publicPageHasSafety: publicPage.includes("Safe generated-output profile"),
      },
    }),
    makeRequirement({
      id: "REQ-STORE-DRAFTS",
      requirement: "Prepare development submission material for OpenAI/Codex and Claude Code review with separate core JSONX and generative UI plugin drafts.",
      githubIssue: "#1115",
      evidence: [
        "apps/jsonx-renderer-app/chatgpt-app-submission.json",
        "docs/intent/generative-ui-plugin/store-listings/",
        manifest.sourceDocsEvidence?.path,
        "docs/intent/generative-ui-plugin/external-gate-evidence.json",
        "docs/intent/generative-ui-plugin/scripts/validate-external-gate-recorder.mjs",
        manifest.submissionQueue?.json?.path,
        manifest.submissionQueue?.markdown?.path,
        manifest.externalGateRunbook?.path,
        ...(manifest.submissionForms || []).map((item) => item.path),
      ].filter(Boolean),
      checks: {
        chatgptSubmissionPresent: await fileExists("apps/jsonx-renderer-app/chatgpt-app-submission.json"),
        storeListingSourcesPresent: (
          await Promise.all([
            "docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json",
            "docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json",
            "docs/intent/generative-ui-plugin/store-listings/claude-code-jsonx-submission.json",
            "docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json",
          ].map(fileExists))
        ).every(Boolean),
        generatedStoreListingsOk: storeListingsOk(manifest),
        sourceDocsEvidencePassed: allObjectValuesTrue(manifest.sourceDocsEvidence?.checks),
        submissionQueueCoversFour: manifest.submissionQueue?.submissionCount === 4,
        submissionQueueHasSharedRecorderCommands:
          Array.isArray(submissionQueue.externalGateRecorderCommands?.appIds) &&
          Array.isArray(submissionQueue.externalGateRecorderCommands?.chatgptDeveloperMode) &&
          Array.isArray(submissionQueue.externalGateRecorderCommands?.claudeSmoke) &&
          Array.isArray(submissionQueue.externalGateRecorderCommands?.policyReview),
        submissionQueueHasReceiptRecorderCommands:
          Array.isArray(submissionQueue.submissions) &&
          submissionQueue.submissions.length === 4 &&
          submissionQueue.submissions.every((submission) =>
            submission.receiptRecorderCommand?.includes("record-external-gate-evidence.mjs marketplace --target"),
          ),
        submissionFormsGenerated:
          Array.isArray(manifest.submissionForms) &&
          manifest.submissionForms.length === 4 &&
          manifest.submissionForms.every((form) => form.sha256 && form.path?.includes("submission-forms/")),
        submissionQueueLinksPortalForms:
          Array.isArray(submissionQueue.submissions) &&
          submissionQueue.submissions.length === 4 &&
          submissionQueue.submissions.every((submission) =>
            submission.portalForm?.startsWith("https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/"),
          ),
        submissionQueueListsSubmissionPortals:
          Array.isArray(submissionQueue.submissions) &&
          submissionQueue.submissions.length === 4 &&
          submissionQueue.submissions.every((submission) =>
            submission.id?.startsWith("openai-")
              ? submission.submissionPortal?.primaryUrl === expectedSubmissionPortals.openai
              : submission.submissionPortal?.primaryUrl === expectedSubmissionPortals.claude,
          ),
        externalGateRunbookPresent,
        externalGateRunbookListsGateStatuses: externalGateNames.every((gate) => externalGateRunbook.includes(`| ${gate} |`)),
        externalGateRunbookListsRecorderCommands:
          externalGateRunbook.includes("record-external-gate-evidence.mjs app-ids") &&
          externalGateRunbook.includes("record-external-gate-evidence.mjs chatgpt") &&
          externalGateRunbook.includes("record-external-gate-evidence.mjs claude-smoke") &&
          externalGateRunbook.includes("record-external-gate-evidence.mjs marketplace"),
        externalGateRunbookListsPromptChecks:
          externalGateRunbook.includes("direct-ui-request") &&
          externalGateRunbook.includes("motion-request") &&
          externalGateRunbook.includes("jsonx-core") &&
          externalGateRunbook.includes("jsonx-generative-ui"),
        externalGateRunbookListsSubmissionPortals:
          externalGateRunbook.includes(expectedSubmissionPortals.openai) && externalGateRunbook.includes(expectedSubmissionPortals.claude),
        receiptsStillExplicitlyTracked: manifest.submissionQueue?.pendingSubmissionCount === 4 || manifest.submissionQueue?.receiptRecordedCount === 4,
        externalGateSourcePresent: await fileExists("docs/intent/generative-ui-plugin/external-gate-evidence.json"),
        externalGateSourceSupplied: manifest.externalGateEvidence?.supplied === true,
        externalGateCoversGoldenPrompts:
          goldenPromptIds.length >= 9 && goldenPromptIds.every((promptId) => externalChatgptPromptIds.has(promptId)),
        recorderValidatorPresent: await fileExists("docs/intent/generative-ui-plugin/scripts/validate-external-gate-recorder.mjs"),
        recorderRejectsInvalidPromptId: externalGateRecorderValidator.includes("invalid ChatGPT prompt id"),
        recorderRejectsInvalidPromptStatus: externalGateRecorderValidator.includes("invalid ChatGPT prompt status"),
        recorderRejectsInvalidClaudeStatus: externalGateRecorderValidator.includes("invalid Claude smoke status"),
      },
    }),
    makeRequirement({
      id: "REQ-NPM-BOUNDARY",
      requirement: "Keep app, plugin, skill, submission, and GSAP assets out of the root jsonx npm package.",
      githubIssue: "#1115",
      evidence: [".npmignore", "docs/intent/generative-ui-plugin/submission-artifacts/current/manifest.json"],
      checks: {
        npmIgnorePresent: await fileExists(".npmignore"),
        npmIgnoreHasBlockedPrefixes: blockedNpmPrefixes.every((entry) => npmIgnore.includes(entry)),
        manifestBoundaryHasBlockedPrefixes: blockedNpmPrefixes.every((entry) => manifest.npmBoundary?.excludedPrefixes?.includes(entry)),
        manifestBoundaryHasBlockedTerms: blockedNpmTerms.every((entry) => manifest.npmBoundary?.excludedTerms?.includes(entry)),
        manifestPackageSizeRecorded: Number(manifest.npmBoundary?.packageBytes || 0) > 0,
      },
    }),
    makeRequirement({
      id: "REQ-CI-COVERAGE",
      requirement:
        "Run automated checks for app, plugins, fixtures, public review-kit page, source documentation links, generated submission packages, and npm package boundary on relevant changes.",
      githubIssue: "#1115",
      evidence: [".github/workflows/generative-ui-plugin.yml"],
      checks: {
        workflowPresent: await fileExists(".github/workflows/generative-ui-plugin.yml"),
        validatesPluginMetadata: workflow.includes("validate-plugin-package.mjs"),
        validatesPublicReviewKit: workflow.includes("check-public-review-kit.mjs"),
        validatesExternalGateTemplate: workflow.includes("external-gate-evidence.template.json"),
        validatesTrackedExternalGateEvidence:
          workflow.includes("Validate tracked external gate evidence") && workflow.includes("check-external-gate-evidence.mjs --json"),
        validatesExternalGateRecorderFlow: workflow.includes("validate-external-gate-recorder.mjs"),
        validatesGithubIssueTracking: workflow.includes("check-github-issue-tracking.mjs"),
        validatesSubmissionSourceDocs: workflow.includes("check-submission-source-docs.mjs"),
        validatesGeneratedArtifacts: workflow.includes("prepare-submission-artifacts.mjs"),
        validatesNpmBoundary: workflow.includes("npm pack --dry-run --json"),
        triggersOnSiteChanges: workflow.includes('"site/**"') || workflow.includes("- \"site/**\""),
      },
    }),
    makeRequirement({
      id: "GATE-APP-IDS",
      requirement: "Record approved OpenAI/Codex app and plugin IDs, then update Codex app metadata.",
      githubIssue: "#1115",
      evidence: [
        manifest.externalGateAccessEvidence?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
        "plugins/jsonx-generative-ui-plugin/.app.json",
      ].filter(Boolean),
      external: true,
      remaining: "Requires approved OpenAI/Codex plugin IDs and renderer app ID from the public submission flow.",
      checks: {
        appIdsCaptured: externalChecks.appIdsCaptured === true,
        codexAppMetadataUpdated: externalChecks.codexAppMetadataUpdated === true,
        submissionPortalsReachable: manifest.externalGateAccessEvidence?.checks?.portalEntryPointsReachable === true,
        gateProved: gateStatus.appIds === "proved",
      },
    }),
    makeRequirement({
      id: "GATE-CHATGPT-DEVELOPER-MODE",
      requirement: "Capture live ChatGPT developer-mode transcripts after connecting the hosted MCP app.",
      githubIssue: "#1115",
      evidence: [
        manifest.externalGateAccessEvidence?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
        manifest.hostedMcpEvidence?.path,
        manifest.goldenPromptEvidence?.path,
      ].filter(Boolean),
      external: true,
      remaining: "Requires connecting the hosted MCP endpoint in ChatGPT developer mode and recording transcript evidence.",
      checks: {
        chatgptMcpConnected: externalChecks.chatgptMcpConnected === true,
        chatgptTranscriptCaptured: externalChecks.chatgptTranscriptCaptured === true,
        chatgptGoldenPromptsPassed: externalChecks.chatgptGoldenPromptsPassed === true,
        hostedMcpHealthOk: manifest.externalGateAccessEvidence?.checks?.hostedMcpHealthOk === true,
        gateProved: gateStatus.chatgptDeveloperMode === "proved",
      },
    }),
    makeRequirement({
      id: "GATE-CLAUDE-SMOKE",
      requirement: "Run authenticated Claude Code smoke prompts for both split Claude plugins.",
      githubIssue: "#1113",
      evidence: [
        manifest.externalGateAccessEvidence?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
        manifest.claudeValidationEvidence?.path,
      ].filter(Boolean),
      external: true,
      remaining: "Requires an authenticated interactive Claude Code session.",
      checks: {
        claudeAuthenticatedSmokeRan: externalChecks.claudeAuthenticatedSmokeRan === true,
        claudeSmokePromptsPassed: externalChecks.claudeSmokePromptsPassed === true,
        claudeCodeCliAvailable: manifest.externalGateAccessEvidence?.checks?.claudeCodeCliAvailable === true,
        claudeCodeAuthStatusReadable: manifest.externalGateAccessEvidence?.checks?.claudeCodeAuthStatusReadable === true,
        claudeCodeAuthenticated: manifest.externalGateAccessEvidence?.checks?.claudeCodeAuthenticated === true,
        gateProved: gateStatus.claudeSmoke === "proved",
      },
    }),
    makeRequirement({
      id: "GATE-MARKETPLACE-SUBMISSIONS",
      requirement: "Submit the split OpenAI/Codex and Claude Code packages to public review channels and record receipts after policy review.",
      githubIssue: "#1115",
      evidence: [
        manifest.externalGateAccessEvidence?.path,
        manifest.externalGateEvidence?.path,
        manifest.externalGateRunbook?.path,
        manifest.submissionQueue?.json?.path,
        manifest.submissionQueue?.markdown?.path,
      ].filter(Boolean),
      external: true,
      remaining: "Requires portal access, policy review, and public marketplace submission receipts.",
      checks: {
        openAiCoreSubmissionRecorded: externalChecks.openAiCoreSubmissionRecorded === true,
        openAiGenerativeUiSubmissionRecorded: externalChecks.openAiGenerativeUiSubmissionRecorded === true,
        claudeCoreSubmissionRecorded: externalChecks.claudeCoreSubmissionRecorded === true,
        claudeGenerativeUiSubmissionRecorded: externalChecks.claudeGenerativeUiSubmissionRecorded === true,
        policyReviewRecorded: externalChecks.policyReviewRecorded === true,
        submissionPortalsReachable: manifest.externalGateAccessEvidence?.checks?.portalEntryPointsReachable === true,
        gateProved: gateStatus.marketplaceSubmission === "proved",
      },
    }),
  ];

  const summary = {
    proved: requirements.filter((item) => item.status === "proved").length,
    incomplete: requirements.filter((item) => item.status === "incomplete").length,
    externalGated: requirements.filter((item) => item.status === "external-gated").length,
  };
  const status =
    summary.incomplete > 0
      ? "implementation-incomplete"
      : summary.externalGated > 0
        ? "implementation-complete-external-gated"
        : "complete";

  const report = {
    generatedAt: new Date().toISOString(),
    objective:
      "Installable split JSONX and generative UI skills, Codex and Claude Code plugin packages, hosted JSONX Apps SDK renderer, optional renderer-owned GSAP motion, GitHub issue tracking, npm package-boundary protection, GitHub Pages updates, and public submission readiness.",
    status,
    summary,
    externalGates: externalGateNames.reduce((memo, gate) => ({ ...memo, [gate]: gateStatus[gate] || "pending" }), {}),
    requirements,
  };

  if (hasArg("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReport(report);
  }

  if (summary.incomplete > 0 || (hasArg("--strict-external") && summary.externalGated > 0)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
