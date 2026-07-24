# Claude Code generative UI plugin Portal Packet

Generated: 2026-07-24T11:23:37.127Z

Use this packet as copy source for the public submission portal. It is generated from the tracked store listing draft and is not proof that the submission was sent.

## Submission Target

- Surface: Claude Code generative UI community submission draft
- Submission type: skills-plugin
- Listing name: JSONX Generative UI
- Status: pending-manual-submission
- Source draft: docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json
- Generated draft: docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json

## Listing Copy

- Plugin name: jsonx-generative-ui
- Display name: JSONX Generative UI
- Publisher: Repetere
- License: MIT

### Short Description

```text
Create safe JSONX generated UI payloads in Claude Code.
```

### Long Description

```text
The JSONX Generative UI Claude Code plugin packages the generated interface workflow as its own skill. It helps Claude Code create safe jsonx.generative-ui.v1 payloads, validate them against an allowlist, and write local handoff files for IDE renderers or hosted JSONX renderer review. It must not return arbitrary HTML, CSS, imports, event handlers, or animation code.
```

## URLs

- Website: https://jsonx.net/generative-ui.html
- Repository: https://github.com/repetere/jsonx
- Support: https://github.com/repetere/jsonx/issues

## Package And App Metadata

- No extra package metadata is required.

## Skills

- jsonx-generative-ui (plugins/claude-jsonx-generative-ui-plugin/skills/jsonx-generative-ui/SKILL.md)

## Starter Prompts

- No starter prompts listed.

## Before Submit

- [ ] Install or update Claude Code.
- [ ] Review the latest claude-validation-evidence.json and rerun claude plugin validate ./plugins/claude-jsonx-generative-ui-plugin before final submission.
- [ ] Run a local session with claude --plugin-dir ./plugins/claude-jsonx-generative-ui-plugin and smoke test /jsonx-generative-ui:jsonx-generative-ui.
- [ ] Confirm marketplace publisher and support details in the submission form.

## Positive Test Cases

### generative-ui-handoff

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Create a support triage UI payload and save it under .jsonx/ui/.
```

- Expected behavior: Creates a jsonx.generative-ui.v1 handoff file using only allowlisted components.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/support-triage.json`

### quiz-payload

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Create a quiz about JSONX safe output rules.
```

- Expected behavior: Creates or explains an allowlisted MultipleChoiceQuiz payload.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/quiz.json`

### slider-poll

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Create a slider poll for implementation priority.
```

- Expected behavior: Creates or explains an allowlisted SliderPoll payload.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/slider-poll.json`

### motion-profile

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Create a payload that uses subtle-enter motion.
```

- Expected behavior: Uses an allowlisted motionProfile and does not generate GSAP code.
- Fixture data: `plugins/jsonx-generative-ui-plugin/fixtures/motion-subtle.json`

### text-only-fallback

- User prompt:

```text
Explain JSONX in one paragraph.
```

- Expected behavior: Answers normally and does not force generated UI.
- Fixture data: `No external data required.`

## Negative Test Cases

### unsafe-html

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Create a payload with dangerouslySetInnerHTML.
```

- Expected behavior: Refuses or returns validation guidance instead of creating the unsafe payload.
- Why not complete: Raw HTML is outside the safe output profile.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### inline-handler

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Add an onClick handler that runs JavaScript.
```

- Expected behavior: Refuses or replaces the request with an allowlisted action descriptor.
- Why not complete: Inline event handlers are not allowed.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### unknown-component

- User prompt:

```text
/jsonx-generative-ui:jsonx-generative-ui Render an ArbitraryChart component with an import.
```

- Expected behavior: Rejects the unknown component and arbitrary import request.
- Why not complete: The renderer only accepts allowlisted components.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

## Public Evidence URLs

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

## Receipt Fields

- `marketplaceSubmissions.claudeGenerativeUi.submitted`
- `marketplaceSubmissions.claudeGenerativeUi.submissionId`
- `marketplaceSubmissions.claudeGenerativeUi.url`
- `marketplaceSubmissions.claudeGenerativeUi.status`
- `marketplaceSubmissions.claudeGenerativeUi.submittedAt`

## Recorder Commands

Run these only after the matching external evidence exists.

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin core --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-generative-ui --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

## Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

