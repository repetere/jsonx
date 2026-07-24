# JSONX External Gate Runbook

Generated: 2026-07-24T12:09:39.505Z

This file lists the evidence that must be collected outside the repo before public submission can be marked complete. Use it with the generated submission queue and record results through the controlled evidence recorder.

## Current Gate Status

| Gate | Status | Evidence Source |
| --- | --- | --- |
| appIds | pending | `docs/intent/generative-ui-plugin/external-gate-evidence.json` |
| chatgptDeveloperMode | pending | `docs/intent/generative-ui-plugin/external-gate-evidence.json` |
| claudeSmoke | pending | `docs/intent/generative-ui-plugin/external-gate-evidence.json` |
| marketplaceSubmission | pending | `docs/intent/generative-ui-plugin/external-gate-evidence.json` |

## Gate 1: Approved App And Plugin IDs

Status: pending

Record IDs after the OpenAI/Codex core plugin, the OpenAI/Codex generative UI plugin, and the renderer app have approved identifiers. Update the Codex app metadata before marking this gate complete.

### Fields

- `appIds.openaiCorePluginId`: pending
- `appIds.openaiGenerativeUiAppId`: pending
- `appIds.openaiGenerativeUiPluginId`: pending
- `appIds.codexCorePluginId`: pending
- `appIds.codexGenerativeUiPluginId`: pending
- `appIds.codexGenerativeUiAppMetadataUpdated`: pending

### Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
```

## Gate 2: ChatGPT Developer Mode Transcript

Status: pending

Connect the hosted MCP app at `https://jsonx-renderer-app.netlify.app/mcp`, run the golden prompts in ChatGPT developer mode, and record the transcript URL after every prompt has the expected outcome.

### Prompt Checklist

| Prompt | Status |
| --- | --- |
| direct-ui-request | pending |
| text-only-request | pending |
| quiz-request | pending |
| poll-request | pending |
| blocked-prop-request | pending |
| oversized-payload-request | pending |
| unsupported-component-request | pending |
| motion-request | pending |
| bad-motion-request | pending |

### Recorder Command

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs chatgpt --connected-mcp-url https://jsonx-renderer-app.netlify.app/mcp --transcript-url <url> --all-prompts-passed
```

## Gate 3: Claude Code Authenticated Smoke

Status: pending

Run both split Claude Code plugins from an authenticated Claude Code environment. The package validator proves the manifests are shaped correctly, but this gate needs a real interactive Claude run.

### Core Plugin Prompt

| Prompt | Command | Status |
| --- | --- | --- |
| jsonx-core | `/jsonx:jsonx inspect this repo and summarize how JSONX renders React` | pending |

### Generative UI Plugin Prompt

| Prompt | Command | Status |
| --- | --- | --- |
| jsonx-generative-ui | `/jsonx-generative-ui:jsonx-generative-ui create a support triage JSONX handoff file` | pending |

### Recorder Commands

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin core --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed
```

## Gate 4: Policy Review And Marketplace Receipts

Status: pending

Complete human or policy review before sending public submissions. After each portal returns a receipt, record the matching submission ID, receipt URL, status, and submitted date.

### Policy Review

- `marketplaceSubmissions.policyReview.status`: pending
- `marketplaceSubmissions.policyReview.reviewedBy`: pending
- `marketplaceSubmissions.policyReview.reviewedAt`: pending

### Submission Packets

| Submission | Status | Submission Portal | Portal Packet | Receipt Check |
| --- | --- | --- | --- | --- |
| OpenAI/Codex core JSONX plugin | pending-manual-submission | https://platform.openai.com/plugins | https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-core-jsonx.md | `openAiCoreSubmissionRecorded` |
| OpenAI/Codex generative UI app-plus-skills plugin | pending-manual-submission | https://platform.openai.com/plugins | https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/openai-generative-ui.md | `openAiGenerativeUiSubmissionRecorded` |
| Claude Code core JSONX plugin | pending-manual-submission | https://platform.claude.com/plugins/submit | https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-core-jsonx.md | `claudeCoreSubmissionRecorded` |
| Claude Code generative UI plugin | pending-manual-submission | https://platform.claude.com/plugins/submit | https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/claude-generative-ui.md | `claudeGenerativeUiSubmissionRecorded` |

### Recorder Commands

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

## Public Handoff Links

- Submission queue Markdown: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md
- Submission queue JSON: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- External gate evidence JSON: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- External gate runbook: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

## Full Recorder Command Set

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs chatgpt --connected-mcp-url https://jsonx-renderer-app.netlify.app/mcp --transcript-url <url> --all-prompts-passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin core --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

