# JSONX Plugin and App Submission Readiness

Status: implementation complete with external submission gates pending

Last updated: 2026-07-24

Plan source: `docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md`

## Current Artifacts

| Surface | Artifact | Current state |
| --- | --- | --- |
| Codex core | `plugins/jsonx-codex-plugin/` | Local plugin package with only the `jsonx` core package skill. |
| Codex generative UI | `plugins/jsonx-generative-ui-plugin/` | Local plugin package with the `jsonx-generative-ui` skill, fixture validator, app wiring templates, and metadata. |
| Codex local marketplace | `.agents/plugins/marketplace.json` | Repo-local Codex marketplace entries for development installation of `jsonx-codex-plugin` and `jsonx-generative-ui-plugin`. |
| Claude Code core | `plugins/claude-jsonx-plugin/` | Local Claude Code plugin package with only the `jsonx` core package skill. |
| Claude Code generative UI | `plugins/claude-jsonx-generative-ui-plugin/` | Local Claude Code plugin package with only the `jsonx-generative-ui` skill. |
| OpenCode | `skills/opencode/` | Skill folders for project or global install. OpenCode does not need a separate plugin for the current scope. |
| Skill installer | `skills/scripts/install-jsonx-skill.mjs` | Local installer for core JSONX and generative UI skills across Codex, Claude Code, and OpenCode. |
| ChatGPT Apps SDK | `apps/jsonx-renderer-app/` | Runnable stateless MCP app with `render_jsonx_response`, widget resource, optional GSAP motion, local smoke test, developer-mode tunnel path, and Netlify serverless adapter. |
| Hosted renderer | `https://jsonx-renderer-app.netlify.app/mcp` | Netlify-hosted MCP endpoint with live health, widget, CORS, tool listing, resource read, valid render, and invalid payload smoke tests. |
| ChatGPT app submission | `apps/jsonx-renderer-app/chatgpt-app-submission.json` | Import-ready submission draft with app info, tool hint justifications, five positive test cases, and three negative test cases. |
| Store listing drafts | `docs/intent/generative-ui-plugin/store-listings/` | Source drafts for OpenAI and Claude Code core JSONX and generative UI plugin submissions. |
| Submission portals | `https://platform.openai.com/plugins`, `https://platform.claude.com/plugins/submit` | Account-gated portals for OpenAI/Codex plugin drafts and Claude Code community marketplace submissions. Claude Team or Enterprise submitters can also use `https://claude.ai/admin-settings/directory/submissions/plugins/new`. |
| Public policy pages | `site/privacy.html`, `site/terms.html` | Public privacy and terms notes for the JSONX site, browser demo, skills, plugins, and renderer app. |
| Submission artifacts | `docs/intent/generative-ui-plugin/submission-artifacts/current/` | Generated split Codex and Claude package zips, ChatGPT submission JSON copy, Codex marketplace copy, store listing copies, screenshots, golden-prompt evidence, renderer motion evidence, browser demo mode evidence, hosted MCP transcript evidence, skill installer evidence, isolated Codex marketplace install evidence, Claude Code validation evidence, OpenCode skill discovery evidence, external gate evidence, external gate runbook, submission audit, hashes, and package-boundary evidence. |
| Submission queue | `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json` and `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md` | Generated submitter handoff for all four public package submissions, including review package URLs, public evidence URLs, manual checks, receipt fields, and evidence recorder commands. |
| Portal submission packets | `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/` | Generated copy source for the four OpenAI/Codex and Claude Code portal submissions, including listing text, URLs, test cases, manual checks, receipt fields, and recorder commands. |
| External gate runbook | `docs/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md` | Generated submitter checklist for approved app/plugin IDs, ChatGPT developer-mode transcript capture, authenticated Claude Code smoke, policy review, and marketplace receipts. |
| External gate evidence | `docs/intent/generative-ui-plugin/external-gate-evidence.json` | Tracked pending source file for split app/plugin IDs, ChatGPT developer-mode transcript evidence, authenticated Claude Code smoke prompts for both split plugins, human/policy review, and marketplace submission receipts for all four package submissions. |
| External gate evidence template | `docs/intent/generative-ui-plugin/external-gate-evidence.template.json` | Reset/reference template for the external gate evidence schema. |
| External gate checker | `docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs` | Lightweight init, validation, pending-field report, and recorder command hints for external submission evidence. |
| External gate recorder | `docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs` | Controlled CLI for recording app IDs, ChatGPT transcript status, Claude smoke results, policy review, and marketplace receipts into `external-gate-evidence.json`. |
| External gate recorder validator | `docs/intent/generative-ui-plugin/scripts/validate-external-gate-recorder.mjs` | Temporary-file validation that exercises every recorder command, proves all gates can transition to proved, and confirms the tracked pending evidence file is not mutated. |
| Public review-kit checker | `docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs` | Validates store listing public evidence, the `docs/generative-ui.html` review-kit links, and live `jsonx.net` review-kit URLs after Pages deploys. |
| Goal completion audit | `docs/intent/generative-ui-plugin/scripts/audit-generative-ui-goal.mjs` | Audits the full generative UI objective against current repo files and generated evidence, while reporting external gates separately. |
| CI validation | `.github/workflows/generative-ui-plugin.yml` | Push, pull request, and manual workflow for app checks, plugin metadata checks, fixture validation, package generation, and npm package-boundary enforcement. |

## Ready Now

- Install core and generative UI skills for Codex, Claude Code, and OpenCode.
- Install skills through `skills/scripts/install-jsonx-skill.mjs` with separate `jsonx`, `jsonx-generative-ui`, and `all` modes.
- Run the Codex plugin validator locally.
- Run `node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs`.
- Run the JSONX fixture validator locally.
- Install the Codex plugins from the repo-local marketplace in a development profile:
  `codex plugin marketplace add .` then `codex plugin add jsonx-codex-plugin@jsonx-local` or `codex plugin add jsonx-generative-ui-plugin@jsonx-local`.
- Review isolated Codex marketplace install evidence in `docs/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json`.
- Review skill installer evidence for Codex, Claude Code, and OpenCode in `docs/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json`.
- Review Claude Code plugin validation evidence in `docs/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json`.
- Review OpenCode skill discovery evidence in `docs/intent/generative-ui-plugin/submission-artifacts/current/opencode-skill-evidence.json`.
- Review browser demo mode evidence in `docs/intent/generative-ui-plugin/submission-artifacts/current/browser-demo-evidence.json`.
- Run the Apps SDK renderer locally at `/mcp`.
- Test the renderer app with the SDK client smoke test.
- Enable optional GSAP motion locally with `JSONX_ENABLE_GSAP=1`.
- Use the hosted Netlify renderer at `https://jsonx-renderer-app.netlify.app/mcp`.
- Deploy a new renderer app build to Netlify from `apps/jsonx-renderer-app` after source changes.
- Use `apps/jsonx-renderer-app/chatgpt-app-submission.json` as the starting point for the ChatGPT Apps submission form.
- Use `docs/intent/generative-ui-plugin/store-listings/openai-jsonx-plugin-submission.json` as the OpenAI core JSONX plugin portal draft.
- Use `docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json` as the OpenAI generative UI app-plus-skills portal draft.
- Use `docs/intent/generative-ui-plugin/store-listings/claude-code-jsonx-submission.json` as the Claude Code core JSONX community marketplace draft.
- Use `docs/intent/generative-ui-plugin/store-listings/claude-code-generative-ui-submission.json` as the Claude Code generative UI community marketplace draft.
- Use `https://jsonx.net/privacy.html`, `https://jsonx.net/terms.html`, and GitHub Issues as public submission URLs.
- Generate current submission packages and screenshots:
  `node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs`.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/manifest.json` as the current artifact manifest.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json` as the requirement-by-requirement evidence map.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.md` as the submitter checklist for the four marketplace packages.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md` as the checklist for app IDs, ChatGPT developer-mode transcripts, Claude Code smoke results, policy review, and submission receipts.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-forms/` as the copy source for filling the OpenAI/Codex and Claude Code submission portals.
- Use `https://platform.openai.com/plugins` for OpenAI/Codex plugin drafts and `https://platform.claude.com/plugins/submit` for Claude Code community submissions. Claude Team or Enterprise directory managers can use `https://claude.ai/admin-settings/directory/submissions/plugins/new`.
- Record external IDs, transcripts, Claude smoke results, policy review, and marketplace receipts with `node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs <command> ...` after those gates produce real evidence. Regenerate artifacts after recording results.
- Validate the full recorder flow with `node docs/intent/generative-ui-plugin/scripts/validate-external-gate-recorder.mjs` before recording real receipts.
- Inspect external gate evidence with `node docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs`. The report includes the recorder commands for each pending gate. Use `--init --force` only when resetting `docs/intent/generative-ui-plugin/external-gate-evidence.json` from the template.
- Validate review-kit public evidence and page links with `node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs` before regenerating artifacts and `node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs --source docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings --network --cache-bust <commit-sha> --strict` after Pages deploys.
- Audit implementation completion with `node docs/intent/generative-ui-plugin/scripts/audit-generative-ui-goal.mjs`. Use `--strict-external` only after app IDs, transcripts, authenticated Claude smoke runs, policy review, and marketplace receipts have been recorded.
- Run the Generative UI Plugin workflow on GitHub Actions after app, plugin, fixture, or submission package changes.

## Not Ready For Public Submission

- `.app.json` does not yet reference an approved renderer app ID.
- Public screenshots are captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/`, deterministic tool-call prompt evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json`, renderer motion evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/motion-profile-evidence.json`, browser demo evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/browser-demo-evidence.json`, live hosted MCP endpoint evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json`, installer evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json`, isolated Codex marketplace install evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json`, Claude Code manifest validation evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json`, OpenCode skill discovery evidence is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/opencode-skill-evidence.json`, external gate capture status is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json`, the external handoff checklist is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/external-gates.md`, and requirement status is captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json`. Live ChatGPT developer-mode transcripts still need to be captured after the hosted app is connected.
- Privacy, terms, and support URLs exist, but still need final human or legal review before public submission.
- Claude Code manifest validation has evidence for both split plugins, but interactive Claude Code smoke prompts have not been run in an authenticated Claude session.
- Claude community marketplace submissions for the core and generative UI plugins have not been sent.
- OpenAI/Codex public submissions for the core and generative UI plugins have not been sent.

## Submission Gates

### Apps SDK Renderer

- Current Netlify site id: `210939ba-0ffe-4c5d-8074-bbc195518c1c`.
- Current Netlify project: `https://app.netlify.com/projects/jsonx-renderer-app`.
- Current production endpoint: `https://jsonx-renderer-app.netlify.app/mcp`.
- Latest verified deploy id: `6a6305f3ea5f474b412d2f3e`.
- For Netlify redeploys, use base directory `apps/jsonx-renderer-app`, build command `npm run check`, publish directory `public`, and the hosted `/mcp` path.
- Confirm `/mcp` supports low-latency streaming responses and dependable TLS after each deploy.
- Connect the hosted `/mcp` URL in ChatGPT developer mode.
- Run golden prompts for direct UI, text-only fallback, quiz, poll, blocked unsafe props, oversized payload, unsupported component, approved motion profile, and rejected motion profile.
- Run motion prompts for `subtle-enter`, `state-change-highlight`, and `morph-list-to-detail` with and without GSAP enabled.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json` before using the prompt cases in a public app submission.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/motion-profile-evidence.json` before using motion screenshots or claims in a public app submission.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/browser-demo-evidence.json` before using browser demo fixture, paste, or endpoint claims in a public app submission.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json` before using the hosted endpoint in a public app submission.
- Capture screenshots after the hosted app is connected.
- Record completed OpenAI/Codex plugin IDs, renderer app ID, and ChatGPT transcript evidence with `record-external-gate-evidence.mjs`.
- Review `apps/jsonx-renderer-app/chatgpt-app-submission.json` against the final hosted endpoint, privacy URL, terms URL, support URL, and screenshots before submitting.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json` before opening the OpenAI core plugin portal draft.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json` before opening the OpenAI generative UI plugin portal draft.
- Regenerate `docs/intent/generative-ui-plugin/submission-artifacts/current/` after any renderer, fixture, submission JSON, or public page change.
- Confirm `.github/workflows/generative-ui-plugin.yml` passes before public submission package review.
- Add the real app ID to plugin app metadata only after the ID exists.

### Codex Plugins

- Keep the plugin package self-contained.
- Keep `.app.json` empty until a real app ID exists.
- Keep `.mcp.json` empty unless the packaged MCP config can run for installed users.
- Validate the plugin manifest and skills after every metadata change.
- Validate `.agents/plugins/marketplace.json` and install from the local `jsonx-local` marketplace during development.
- Review the OpenAI plugin listing draft before public submission.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json` as the current isolated `CODEX_HOME` install record, and re-test it before any public submission package change.
- Confirm `npm pack --dry-run` excludes `plugins/` and `apps/`.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip` as the current core review package.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip` as the current generative UI review package.

### Claude Code Plugins

- Run local plugin validation with Claude Code.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json` as the current `claude plugin validate` record.
- Test core JSONX with `claude --plugin-dir ./plugins/claude-jsonx-plugin`.
- Test generative UI with `claude --plugin-dir ./plugins/claude-jsonx-generative-ui-plugin`.
- Run `/jsonx:jsonx` and `/jsonx-generative-ui:jsonx-generative-ui` smoke prompts.
- Record authenticated smoke results for both split plugins with `record-external-gate-evidence.mjs`.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json` before opening the Claude Code core community marketplace submission.
- Review `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json` before opening the Claude Code generative UI community marketplace submission.
- Submit to the Claude community marketplace only after validation, hosted endpoint review, and screenshots are complete.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip` as the current core review package.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip` as the current generative UI review package.

### Skill Installer

- Dry-run all surface and skill combinations before changing install docs.
- Test `--target` against a temporary directory so personal skill folders are not touched in CI.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json` as the current installer evidence.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/opencode-skill-evidence.json` as the current OpenCode project skill discovery evidence.
- Keep the installer under `skills/` so it remains excluded from the npm package.

## External Documentation Checked

- OpenAI Apps SDK MCP server docs: https://developers.openai.com/apps-sdk/build/mcp-server
- OpenAI Apps SDK UI docs: https://developers.openai.com/apps-sdk/build/chatgpt-ui
- OpenAI Apps SDK deployment docs: https://developers.openai.com/apps-sdk/deploy
- OpenAI Apps SDK submission docs: https://developers.openai.com/apps-sdk/deploy/submission
- Claude Code skills docs: https://code.claude.com/docs/en/skills
- Claude Code plugin docs: https://code.claude.com/docs/en/plugins
- OpenCode skills docs: https://opencode.ai/docs/skills/
