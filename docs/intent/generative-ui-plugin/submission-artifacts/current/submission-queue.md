# JSONX Public Submission Queue

Generated: 2026-07-24T10:20:26.940Z

This file is generated from the four store listing drafts. It gives the submitter one place to find packages, public evidence, manual checks, and receipt fields. It is not proof that a public submission was sent.

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

## OpenAI/Codex core JSONX plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json

### Before Submit

- [ ] Confirm OpenAI developer or business identity verification.
- [ ] Confirm the submitter has plugin submission access.
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
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json

### Test Cases

- Positive: jxm-review, small-example, api-explanation, debug-render, test-guidance
- Negative: generated-ui-request, apps-sdk-request, animation-request

### Receipt Fields To Fill

- `marketplaceSubmissions.openaiCore.submitted`
- `marketplaceSubmissions.openaiCore.submissionId`
- `marketplaceSubmissions.openaiCore.url`
- `marketplaceSubmissions.openaiCore.status`
- `marketplaceSubmissions.openaiCore.submittedAt`

### Source Docs Checked

- https://developers.openai.com/codex/submit-plugins
- https://developers.openai.com/codex/build-plugins

## OpenAI/Codex generative UI app-plus-skills plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json

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
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json

### Test Cases

- Positive: direct-ui-request, quiz-request, poll-request, motion-request, handoff-request
- Negative: text-only-request, unsafe-fields-request, unsupported-component-request

### Receipt Fields To Fill

- `marketplaceSubmissions.openaiGenerativeUi.submitted`
- `marketplaceSubmissions.openaiGenerativeUi.submissionId`
- `marketplaceSubmissions.openaiGenerativeUi.url`
- `marketplaceSubmissions.openaiGenerativeUi.status`
- `marketplaceSubmissions.openaiGenerativeUi.submittedAt`

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
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json

### Test Cases

- Positive: core-jsonx-review, small-example, api-guidance, debug-render, test-plan
- Negative: generative-ui, apps-sdk, motion

### Receipt Fields To Fill

- `marketplaceSubmissions.claudeCore.submitted`
- `marketplaceSubmissions.claudeCore.submissionId`
- `marketplaceSubmissions.claudeCore.url`
- `marketplaceSubmissions.claudeCore.status`
- `marketplaceSubmissions.claudeCore.submittedAt`

### Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

## Claude Code generative UI plugin

- Status: pending-manual-submission
- Source draft: `docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json`
- Generated draft: `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json`
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json

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
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json

### Test Cases

- Positive: generative-ui-handoff, quiz-payload, slider-poll, motion-profile, text-only-fallback
- Negative: unsafe-html, inline-handler, unknown-component

### Receipt Fields To Fill

- `marketplaceSubmissions.claudeGenerativeUi.submitted`
- `marketplaceSubmissions.claudeGenerativeUi.submissionId`
- `marketplaceSubmissions.claudeGenerativeUi.url`
- `marketplaceSubmissions.claudeGenerativeUi.status`
- `marketplaceSubmissions.claudeGenerativeUi.submittedAt`

### Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

