# Claude Code core JSONX plugin Portal Packet

Generated: 2026-07-24T11:58:31.123Z

Use this packet as copy source for the public submission portal. It is generated from the tracked store listing draft and is not proof that the submission was sent.

## Submission Target

- Surface: Claude Code core JSONX community submission draft
- Submission type: skills-plugin
- Listing name: JSONX
- Status: pending-manual-submission
- Source draft: docs/intent/generative-ui-plugin/store-listings/claude-code-jsonx-submission.json
- Generated draft: docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json

## Submission Portal

- Primary portal: https://platform.claude.com/plugins/submit
- Alternate portals: https://claude.ai/admin-settings/directory/submissions/plugins/new, https://clau.de/plugin-directory-submission
- Documented flow: https://code.claude.com/docs/en/plugins
- Required access: Claude Console access, or Team/Enterprise directory management access for the claude.ai organization form.
- Submission action: Run claude plugin validate, submit the core JSONX Claude Code plugin package to the claude-community review path, and record the returned receipt.
- Post-approval install: claude plugin marketplace add anthropics/claude-plugins-community && claude plugin install jsonx@claude-community

## Listing Copy

- Plugin name: jsonx
- Display name: JSONX
- Publisher: Repetere
- License: MIT

### Short Description

```text
Use core JSONX and JXM workflows in Claude Code.
```

### Long Description

```text
The JSONX Claude Code plugin packages the core jsonx skill for JSONX and JXM package usage, rendering behavior, examples, tests, and docs. It stays separate from generated UI so teams can install package help without enabling interface-output guidance.
```

## URLs

- Website: https://jsonx.net/generative-ui.html#skills
- Repository: https://github.com/repetere/jsonx
- Support: https://github.com/repetere/jsonx/issues

## Package And App Metadata

- No extra package metadata is required.

## Skills

- jsonx (plugins/claude-jsonx-plugin/skills/jsonx/SKILL.md)

## Starter Prompts

- No starter prompts listed.

## Before Submit

- [ ] Install or update Claude Code.
- [ ] Review the latest claude-validation-evidence.json and rerun claude plugin validate ./plugins/claude-jsonx-plugin before final submission.
- [ ] Run a local session with claude --plugin-dir ./plugins/claude-jsonx-plugin and smoke test /jsonx:jsonx.
- [ ] Confirm marketplace publisher and support details in the submission form.

## Positive Test Cases

### core-jsonx-review

- User prompt:

```text
/jsonx:jsonx Review this JXM payload and explain how it renders.
```

- Expected behavior: Loads the core JSONX skill and returns a package-aware explanation.
- Fixture data: `No external data required.`

### small-example

- User prompt:

```text
/jsonx:jsonx Create a small JXM example for a React button.
```

- Expected behavior: Creates a concise package example.
- Fixture data: `No external data required.`

### api-guidance

- User prompt:

```text
/jsonx:jsonx Explain outputJSON versus outputHTML.
```

- Expected behavior: Explains core package APIs.
- Fixture data: `No external data required.`

### debug-render

- User prompt:

```text
/jsonx:jsonx Help debug a JSONX child rendering issue.
```

- Expected behavior: Gives package-aware debugging steps.
- Fixture data: `No external data required.`

### test-plan

- User prompt:

```text
/jsonx:jsonx Suggest tests for a render helper change.
```

- Expected behavior: Suggests focused package validation.
- Fixture data: `No external data required.`

## Negative Test Cases

### generative-ui

- User prompt:

```text
/jsonx:jsonx Create an interactive quiz UI.
```

- Expected behavior: Route to the separate jsonx-generative-ui plugin.
- Why not complete: Generated UI belongs to the separate plugin.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### apps-sdk

- User prompt:

```text
/jsonx:jsonx Connect this to ChatGPT Apps SDK.
```

- Expected behavior: Explain that hosted renderer setup belongs to the generative UI plugin.
- Why not complete: Apps SDK wiring is outside the core plugin.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### motion

- User prompt:

```text
/jsonx:jsonx Add GSAP to the core package.
```

- Expected behavior: Keep GSAP out of the core npm package.
- Why not complete: Animation belongs in the renderer layer.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

## Public Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json
- `claudeValidationEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json
- `skillInstallerEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json
- `externalGateRunbook`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md

## Receipt Fields

- `marketplaceSubmissions.claudeCore.submitted`
- `marketplaceSubmissions.claudeCore.submissionId`
- `marketplaceSubmissions.claudeCore.url`
- `marketplaceSubmissions.claudeCore.status`
- `marketplaceSubmissions.claudeCore.submittedAt`

## Recorder Commands

Run these only after the matching external evidence exists.

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin core --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs claude-smoke --plugin generative-ui --authenticated --claude-version <version> --passed
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target claude-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

## Source Docs Checked

- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugin-marketplaces
- https://github.com/anthropics/claude-plugins-community
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/cli-reference

