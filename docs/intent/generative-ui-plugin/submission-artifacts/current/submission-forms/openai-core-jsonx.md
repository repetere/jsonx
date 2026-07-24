# OpenAI/Codex core JSONX plugin Portal Packet

Generated: 2026-07-24T11:23:37.127Z

Use this packet as copy source for the public submission portal. It is generated from the tracked store listing draft and is not proof that the submission was sent.

## Submission Target

- Surface: OpenAI core JSONX plugin portal draft
- Submission type: skills-plugin
- Listing name: JSONX
- Status: pending-manual-submission
- Source draft: docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json
- Generated draft: docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json
- Review package: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip
- Public listing copy: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json

## Listing Copy

- Plugin name: JSONX
- Category: Developer Tools
- Publisher: Repetere
- Logo status: Use the production JSONX brand asset before portal submission.

### Short Description

```text
Use JSONX and JXM package workflows in Codex.
```

### Long Description

```text
The JSONX plugin packages the core JSONX skill for package usage, JXM examples, rendering behavior, source changes, tests, and docs. It does not include generated UI workflow instructions or Apps SDK renderer wiring.
```

## URLs

- Website: https://jsonx.net/generative-ui.html#skills
- Support: https://github.com/repetere/jsonx/issues
- Privacy policy: https://jsonx.net/privacy.html
- Terms: https://jsonx.net/terms.html

## Package And App Metadata

- No extra package metadata is required.

## Skills

- jsonx (plugins/jsonx-codex-plugin/skills/jsonx/SKILL.md)

## Starter Prompts

- Use JSONX to review this JXM payload and explain how it renders.
- Use JSONX to create a small JXM example for a React component.
- Use JSONX to explain the difference between outputHTML and outputJSX.
- Use JSONX to identify why this payload does not render.
- Use JSONX to suggest a focused test for this rendering change.

## Before Submit

- [ ] Confirm OpenAI developer or business identity verification.
- [ ] Confirm the submitter has plugin submission access.
- [ ] Attach the final production logo.
- [ ] Review privacy policy, terms, and support URLs.
- [ ] Confirm the separate generative UI plugin remains optional.

## Positive Test Cases

### jxm-review

- User prompt:

```text
Use JSONX to review this JXM payload and explain how it renders.
```

- Expected behavior: Loads the core JSONX skill and returns a package-aware explanation.
- Fixture data: `No external data required.`

### small-example

- User prompt:

```text
Use JSONX to create a small JXM example for a button with text.
```

- Expected behavior: Creates a concise JSONX/JXM example without generated UI handoff fields.
- Fixture data: `No external data required.`

### api-explanation

- User prompt:

```text
Explain when to use outputHTML instead of outputJSX.
```

- Expected behavior: Answers with package API context and does not invoke any renderer app.
- Fixture data: `No external data required.`

### debug-render

- User prompt:

```text
Use JSONX to debug why this payload is not rendering children.
```

- Expected behavior: Inspects JSONX rendering behavior and recommends source or fixture checks.
- Fixture data: `No external data required.`

### test-guidance

- User prompt:

```text
Use JSONX to suggest a test for this render helper change.
```

- Expected behavior: Suggests focused package tests without creating generative UI artifacts.
- Fixture data: `No external data required.`

## Negative Test Cases

### generated-ui-request

- User prompt:

```text
Create an interactive JSONX quiz UI.
```

- Expected behavior: Route to the separate JSONX Generative UI plugin or explain that this core plugin does not package generated UI.
- Why not complete: Generated interface output belongs to the separate generative UI workflow.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### apps-sdk-request

- User prompt:

```text
Connect this response to the Apps SDK renderer.
```

- Expected behavior: Route to the JSONX Generative UI plugin or hosted renderer setup.
- Why not complete: Apps SDK wiring is outside the core JSONX plugin.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

### animation-request

- User prompt:

```text
Add GSAP motion to the JSONX package.
```

- Expected behavior: Explain that GSAP belongs in the renderer or plugin app layer, not the core npm package.
- Why not complete: Animation is not a core package dependency.

- Submission expectation: reject, refuse, or answer normally without invoking generated UI.

## Public Evidence URLs

- `readinessChecklist`: https://jsonx.net/intent/generative-ui-plugin/submission-readiness.md
- `artifactManifest`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/manifest.json
- `submissionQueue`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json
- `reviewPackage`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip
- `storeListingCopy`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json
- `codexInstallEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json
- `skillInstallerEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json
- `submissionAudit`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json
- `externalGateEvidence`: https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json

## Receipt Fields

- `marketplaceSubmissions.openaiCore.submitted`
- `marketplaceSubmissions.openaiCore.submissionId`
- `marketplaceSubmissions.openaiCore.url`
- `marketplaceSubmissions.openaiCore.status`
- `marketplaceSubmissions.openaiCore.submittedAt`

## Recorder Commands

Run these only after the matching external evidence exists.

```bash
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs app-ids --openai-core-plugin-id <id> --openai-generative-ui-app-id <id> --openai-generative-ui-plugin-id <id> --codex-core-plugin-id <id> --codex-generative-ui-plugin-id <id> --codex-app-metadata-updated
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs policy-review --status approved --reviewed-by <name> --reviewed-at <yyyy-mm-dd>
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

## Source Docs Checked

- https://developers.openai.com/codex/submit-plugins
- https://developers.openai.com/codex/build-plugins

