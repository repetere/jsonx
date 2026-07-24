# JSONX Public Submission Queue

Generated: 2026-07-24T12:37:45.154Z

This file is generated from the four store listing drafts. It gives the submitter one place to find packages, public evidence, manual checks, receipt fields, and recorder commands. It is not proof that a public submission was sent.

## Gate Status

| Gate | Status |
| --- | --- |
| appIds | pending |
| chatgptDeveloperMode | pending |
| claudeSmoke | pending |
| marketplaceSubmission | pending |

## Queue Summary

- Submissions: 4
- Pending receipts: 4
- Receipt evidence file: `docs/intent/generative-ui-plugin/external-gate-evidence.json`
- Recorder: `node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs`

## Shared Recorder Commands

Run these only after the matching external evidence exists.

### App IDs

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
```

### ChatGPT Developer Mode

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs chatgpt --connected-mcp-url https://jsonx-renderer-app.netlify.app/mcp --transcript-url <url> --all-prompts-passed
```

### Claude Code Smoke

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin core --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed
```

### Policy Review

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
```

## OpenAI/Codex core JSONX plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json
- Portal packet: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-core-jsonx.md
- Submission portal: https://platform.openai.com/plugins

### Submission Portal

- Primary portal: https://platform.openai.com/plugins
- Required access: OpenAI Platform organization owner or Apps Management write access.
- Documented flow: https://developers.openai.com/codex/submit-plugins
- Submission action: Create a skills-only plugin draft, attach the JSONX Codex plugin review package, scan or confirm bundled skill metadata, complete listing fields, and submit for review.
- Post-approval install: Published OpenAI plugins appear in the Plugins Directory for ChatGPT and Codex after approval and publication.

### Before Submit

- [ ] Confirm OpenAI developer or business identity verification.
- [ ] Confirm the submitter has Apps Management write access.
- [ ] Attach the final production logo.
- [ ] Review privacy policy, terms, and support URLs.
- [ ] Confirm the separate generative UI plugin remains optional.

### Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json
- `codexInstallEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json
- `skillInstallerEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json
- `githubIssueEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/github-issue-evidence.json
- `externalGateAccess`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-access.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- `externalGateRunbook`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

### Test Cases

- Positive: jxm-review, small-example, api-explanation, debug-render, test-guidance
- Negative: generated-ui-request, apps-sdk-request, animation-request

### Receipt Fields To Fill

- `marketplaceSubmissions.openaiCore.submitted`
- `marketplaceSubmissions.openaiCore.submissionId`
- `marketplaceSubmissions.openaiCore.url`
- `marketplaceSubmissions.openaiCore.status`
- `marketplaceSubmissions.openaiCore.submittedAt`

### Receipt Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

### Source Docs Checked

- https://developers.openai.com/codex/submit-plugins
- https://developers.openai.com/codex/build-plugins

## OpenAI/Codex generative UI app-plus-skills plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json
- Portal packet: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-generative-ui.md
- Submission portal: https://platform.openai.com/plugins

### Submission Portal

- Primary portal: https://platform.openai.com/plugins
- Required access: OpenAI Platform organization owner or Apps Management write access.
- Documented flow: https://developers.openai.com/codex/submit-plugins
- App submission flow: https://developers.openai.com/apps-sdk/deploy/submission
- Submission action: Create an app-plus-skills plugin draft, enter the hosted MCP URL, scan tools, attach the JSONX Generative UI Codex plugin review package, complete listing fields, and submit for review.
- Post-approval install: Published OpenAI plugins appear in the Plugins Directory for ChatGPT and Codex after approval and publication.

### Before Submit

- [ ] Confirm OpenAI developer or business identity verification.
- [ ] Confirm the submitter has Apps Management write access.
- [ ] Complete domain verification for jsonx-renderer-app.netlify.app or move the MCP endpoint to a verified jsonx.net subdomain.
- [ ] Attach the final production logo.
- [ ] Review privacy policy, terms, and support URLs.
- [ ] Capture live ChatGPT developer-mode transcript evidence after connecting the hosted MCP endpoint.

### Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip
- `appSubmission`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/chatgpt-app-submission.json
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json
- `hostedMcpTranscript`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json
- `goldenPrompts`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json
- `motionEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/motion-profile-evidence.json
- `browserDemoEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/browser-demo-evidence.json
- `siteScreenshot`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-generative-ui-page-desktop.png
- `supportTriageScreenshot`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-support-triage-desktop.png
- `motionScreenshot`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-motion-desktop.png
- `quizMobileScreenshot`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-quiz-mobile.png
- `githubIssueEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/github-issue-evidence.json
- `externalGateAccess`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-access.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- `externalGateRunbook`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

### Test Cases

- Positive: direct-ui-request, quiz-request, poll-request, motion-request, handoff-request
- Negative: text-only-request, unsafe-fields-request, unsupported-component-request

### Receipt Fields To Fill

- `marketplaceSubmissions.openaiGenerativeUi.submitted`
- `marketplaceSubmissions.openaiGenerativeUi.submissionId`
- `marketplaceSubmissions.openaiGenerativeUi.url`
- `marketplaceSubmissions.openaiGenerativeUi.status`
- `marketplaceSubmissions.openaiGenerativeUi.submittedAt`

### Receipt Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

### Source Docs Checked

- https://developers.openai.com/codex/submit-plugins
- https://developers.openai.com/codex/build-plugins
- https://developers.openai.com/apps-sdk/deploy/submission

## Claude Code core JSONX plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/claude-code-jsonx-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json
- Portal packet: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-core-jsonx.md
- Submission portal: https://platform.claude.com/plugins/submit

### Submission Portal

- Primary portal: https://platform.claude.com/plugins/submit
- Alternate portals: https://claude.ai/admin-settings/directory/submissions/plugins/new, https://clau.de/plugin-directory-submission
- Required access: Claude Console access, or Team/Enterprise directory management access for the claude.ai organization form.
- Documented flow: https://code.claude.com/docs/en/plugins
- Submission action: Run claude plugin validate, submit the core JSONX Claude Code plugin package to the claude-community review path, and record the returned receipt.
- Post-approval install: claude plugin marketplace add anthropics/claude-plugins-community && claude plugin install jsonx@claude-community

### Before Submit

- [ ] Install or update Claude Code.
- [ ] Review the latest claude-validation-evidence.json and rerun claude plugin validate ./plugins/claude-jsonx-plugin before final submission.
- [ ] Run a local session with claude --plugin-dir ./plugins/claude-jsonx-plugin and smoke test /jsonx:jsonx.
- [ ] Confirm marketplace publisher and support details in the submission form.

### Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json
- `claudeValidationEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json
- `skillInstallerEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json
- `githubIssueEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/github-issue-evidence.json
- `externalGateAccess`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-access.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- `externalGateRunbook`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

### Test Cases

- Positive: core-jsonx-review, small-example, api-guidance, debug-render, test-plan
- Negative: generative-ui, apps-sdk, motion

### Receipt Fields To Fill

- `marketplaceSubmissions.claudeCore.submitted`
- `marketplaceSubmissions.claudeCore.submissionId`
- `marketplaceSubmissions.claudeCore.url`
- `marketplaceSubmissions.claudeCore.status`
- `marketplaceSubmissions.claudeCore.submittedAt`

### Receipt Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

### Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugin-marketplaces
- https://github.com/anthropics/claude-plugins-community
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

## Claude Code generative UI plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json
- Portal packet: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-generative-ui.md
- Submission portal: https://platform.claude.com/plugins/submit

### Submission Portal

- Primary portal: https://platform.claude.com/plugins/submit
- Alternate portals: https://claude.ai/admin-settings/directory/submissions/plugins/new, https://clau.de/plugin-directory-submission
- Required access: Claude Console access, or Team/Enterprise directory management access for the claude.ai organization form.
- Documented flow: https://code.claude.com/docs/en/plugins
- Submission action: Run claude plugin validate, submit the JSONX Generative UI Claude Code plugin package to the claude-community review path, and record the returned receipt.
- Post-approval install: claude plugin marketplace add anthropics/claude-plugins-community && claude plugin install jsonx-generative-ui@claude-community

### Before Submit

- [ ] Install or update Claude Code.
- [ ] Review the latest claude-validation-evidence.json and rerun claude plugin validate ./plugins/claude-jsonx-generative-ui-plugin before final submission.
- [ ] Run a local session with claude --plugin-dir ./plugins/claude-jsonx-generative-ui-plugin and smoke test /jsonx-generative-ui:jsonx-generative-ui.
- [ ] Confirm marketplace publisher and support details in the submission form.

### Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json
- `claudeValidationEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json
- `skillInstallerEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json
- `goldenPrompts`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json
- `hostedMcpTranscript`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json
- `motionEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/motion-profile-evidence.json
- `githubIssueEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/github-issue-evidence.json
- `externalGateAccess`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-access.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- `externalGateRunbook`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

### Test Cases

- Positive: generative-ui-handoff, quiz-payload, slider-poll, motion-profile, text-only-fallback
- Negative: unsafe-html, inline-handler, unknown-component

### Receipt Fields To Fill

- `marketplaceSubmissions.claudeGenerativeUi.submitted`
- `marketplaceSubmissions.claudeGenerativeUi.submissionId`
- `marketplaceSubmissions.claudeGenerativeUi.url`
- `marketplaceSubmissions.claudeGenerativeUi.status`
- `marketplaceSubmissions.claudeGenerativeUi.submittedAt`

### Receipt Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

### Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugin-marketplaces
- https://github.com/anthropics/claude-plugins-community
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

