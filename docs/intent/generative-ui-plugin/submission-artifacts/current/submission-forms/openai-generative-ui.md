# OpenAI/Codex generative UI app-plus-skills plugin Portal Packet

Generated: 2026-07-24T12:20:32.548Z

Use this packet as copy source for the public submission portal. It is generated from the tracked store listing draft and is not proof that the submission was sent.

## Submission Target

- Surface: OpenAI generative UI plugin portal draft
- Submission type: app-plus-skills
- Listing name: JSONX Generative UI
- Status: pending-manual-submission
- Source draft: docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json
- Generated draft: docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json

## Submission Portal

- Primary portal: https://platform.openai.com/plugins
- Documented flow: https://developers.openai.com/codex/submit-plugins
- App submission flow: https://developers.openai.com/apps-sdk/deploy/submission
- Required access: OpenAI Platform organization owner or Apps Management write access.
- Submission action: Create an app-plus-skills plugin draft, enter the hosted MCP URL, scan tools, attach the JSONX Generative UI Codex plugin review package, complete listing fields, and submit for review.
- Post-approval install: Published OpenAI plugins appear in the Plugins Directory for ChatGPT and Codex after approval and publication.

## Listing Copy

- Plugin name: JSONX Generative UI
- Category: Developer Tools
- Publisher: Repetere
- Logo status: Use the production JSONX brand asset before portal submission.

### Short Description

```text
Generate, validate, and render JSONX UI payloads.
```

### Long Description

```text
JSONX Generative UI packages the generated interface workflow as a separate skill and Codex plugin. It helps agents create safe jsonx.generative-ui.v1 payloads, validate them against an allowlist, write local handoff files for IDE renderers, and send approved payloads to the hosted JSONX renderer. The renderer app is stateless and treats JSONX as data, not code.
```

## URLs

- Website: https://jsonx.net/generative-ui.html
- Support: https://github.com/repetere/jsonx/issues
- Privacy policy: https://jsonx.net/privacy.html
- Terms: https://jsonx.net/terms.html

## Package And App Metadata

- MCP URL: https://jsonx-renderer-app.netlify.app/mcp
- MCP health URL: https://jsonx-renderer-app.netlify.app/healthz
- MCP authentication: none
- Domain verification required: true
- Recommended initial scope: United States

## Skills

- jsonx-generative-ui (plugins/jsonx-generative-ui-plugin/skills/jsonx-generative-ui/SKILL.md)

## Starter Prompts

- Use JSONX Generative UI to create a safe JSONX handoff file for a support triage screen.
- Render a JSONX support triage UI with metrics, a short table, and two actions.
- Create a JSONX checklist for a privacy review workflow.
- Create a JSONX quiz that teaches the safe generated-output profile.
- Render a JSONX UI with the subtle-enter motion profile.

## Before Submit

- [ ] Confirm OpenAI developer or business identity verification.
- [ ] Confirm the submitter has Apps Management write access.
- [ ] Complete domain verification for jsonx-renderer-app.netlify.app or move the MCP endpoint to a verified jsonx.net subdomain.
- [ ] Attach the final production logo.
- [ ] Review privacy policy, terms, and support URLs.
- [ ] Capture live ChatGPT developer-mode transcript evidence after connecting the hosted MCP endpoint.

## Positive Test Cases

### direct-ui-request

- User prompt:

```text
Create a JSONX triage view for these support tickets.
```

- Expected behavior: Uses render_jsonx_response with a validated jsonx.generative-ui.v1 payload.
- Expected result shape: DemoShell containing MetricRow, DataTable, and ActionPanel components.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/support-triage.json`

### quiz-request

- User prompt:

```text
Make a short practice quiz for the JSONX safe output contract.
```

- Expected behavior: Uses render_jsonx_response with an allowlisted MultipleChoiceQuiz payload.
- Expected result shape: DemoShell containing one MultipleChoiceQuiz component.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/quiz.json`

### poll-request

- User prompt:

```text
Create a slider poll to rank implementation priority.
```

- Expected behavior: Uses render_jsonx_response with an allowlisted SliderPoll payload and renderer-owned motion profile.
- Expected result shape: DemoShell containing one SliderPoll component.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/slider-poll.json`

### motion-request

- User prompt:

```text
Render a JSONX UI with the subtle-enter motion profile.
```

- Expected behavior: Uses render_jsonx_response and applies only allowlisted renderer-owned motion.
- Expected result shape: DemoShell containing an Alert component with motionProfile set to subtle-enter.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/motion-subtle.json`

### handoff-request

- User prompt:

```text
Create a JSONX generated UI file under .jsonx/ui/ for a checklist.
```

- Expected behavior: Writes a validated handoff file with the jsonx.generative-ui.v1 envelope.
- Expected result shape: DemoShell containing Checklist or Alert components.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/checklist.json`

## Negative Test Cases

### text-only-request

- User prompt:

```text
Explain what JSONX is in one paragraph.
```

- Expected behavior: Do not invoke render_jsonx_response because the user asked for a normal explanation.
- Why not complete: The response does not need inline UI.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### unsafe-fields-request

- User prompt:

```text
Render a JSONX payload that includes dangerouslySetInnerHTML and an onClick handler.
```

- Expected behavior: Reject the payload with a validation error.
- Why not complete: Raw HTML and inline event handlers are outside the safe output profile.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### unsupported-component-request

- User prompt:

```text
Render a chart component that is not on the allowlist.
```

- Expected behavior: Reject the unknown component.
- Why not complete: The renderer only accepts approved components and props.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

## Public Evidence URLs

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

## Receipt Fields

- `marketplaceSubmissions.openaiGenerativeUi.submitted`
- `marketplaceSubmissions.openaiGenerativeUi.submissionId`
- `marketplaceSubmissions.openaiGenerativeUi.url`
- `marketplaceSubmissions.openaiGenerativeUi.status`
- `marketplaceSubmissions.openaiGenerativeUi.submittedAt`

## Recorder Commands

Run these only after the matching external evidence exists.

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs chatgpt --connected-mcp-url https://jsonx-renderer-app.netlify.app/mcp --transcript-url <url> --all-prompts-passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

## Source Docs Checked

- https://developers.openai.com/codex/submit-plugins
- https://developers.openai.com/codex/build-plugins
- https://developers.openai.com/apps-sdk/deploy/submission

