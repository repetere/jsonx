# JSONX Plugin and App Submission Readiness

Status: developer-mode implementation in progress

Last updated: 2026-07-24

Plan source: `docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md`

## Current Artifacts

| Surface | Artifact | Current state |
| --- | --- | --- |
| Codex | `plugins/jsonx-generative-ui-plugin/` | Local plugin package with `jsonx` and `jsonx-generative-ui` skills, fixture validator, app wiring templates, and metadata. |
| Codex local marketplace | `.agents/plugins/marketplace.json` | Repo-local Codex marketplace entry for development installation of `jsonx-generative-ui-plugin`. |
| Claude Code | `plugins/claude-jsonx-plugin/` | Local Claude Code plugin package with `jsonx` and `jsonx-generative-ui` skills. |
| OpenCode | `skills/opencode/` | Skill folders for project or global install. OpenCode does not need a separate plugin for the current scope. |
| Skill installer | `skills/scripts/install-jsonx-skill.mjs` | Local installer for core JSONX and generative UI skills across Codex, Claude Code, and OpenCode. |
| ChatGPT Apps SDK | `apps/jsonx-renderer-app/` | Runnable stateless MCP app with `render_jsonx_response`, widget resource, optional GSAP motion, local smoke test, developer-mode tunnel path, and Netlify serverless adapter. |
| Hosted renderer | `https://jsonx-renderer-app.netlify.app/mcp` | Netlify-hosted MCP endpoint with live health, widget, CORS, tool listing, resource read, valid render, and invalid payload smoke tests. |
| ChatGPT app submission | `apps/jsonx-renderer-app/chatgpt-app-submission.json` | Import-ready submission draft with app info, tool hint justifications, five positive test cases, and three negative test cases. |
| Public policy pages | `site/privacy.html`, `site/terms.html` | Public privacy and terms notes for the JSONX site, browser demo, skills, plugins, and renderer app. |
| Submission artifacts | `docs/intent/generative-ui-plugin/submission-artifacts/current/` | Generated Codex and Claude package zips, ChatGPT submission JSON copy, Codex marketplace copy, screenshots, hashes, and package-boundary evidence. |

## Ready Now

- Install core and generative UI skills for Codex, Claude Code, and OpenCode.
- Install skills through `skills/scripts/install-jsonx-skill.mjs` with separate `jsonx`, `jsonx-generative-ui`, and `all` modes.
- Run the Codex plugin validator locally.
- Run `node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs`.
- Run the JSONX fixture validator locally.
- Install the Codex plugin from the repo-local marketplace in a development profile:
  `codex plugin marketplace add .` then `codex plugin add jsonx-generative-ui-plugin@jsonx-local`.
- Run the Apps SDK renderer locally at `/mcp`.
- Test the renderer app with the SDK client smoke test.
- Enable optional GSAP motion locally with `JSONX_ENABLE_GSAP=1`.
- Use the hosted Netlify renderer at `https://jsonx-renderer-app.netlify.app/mcp`.
- Deploy a new renderer app build to Netlify from `apps/jsonx-renderer-app` after source changes.
- Use `apps/jsonx-renderer-app/chatgpt-app-submission.json` as the starting point for the ChatGPT Apps submission form.
- Use `https://jsonx.net/privacy.html`, `https://jsonx.net/terms.html`, and GitHub Issues as public submission URLs.
- Generate current submission packages and screenshots:
  `node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs`.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/manifest.json` as the current artifact manifest.

## Not Ready For Public Submission

- `.app.json` does not yet reference an approved app ID.
- Public screenshots are captured in `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/`. ChatGPT developer-mode prompt transcripts still need to be captured after the hosted app is connected.
- Privacy, terms, and support URLs exist, but still need final human or legal review before public submission.
- `claude plugin validate` has not been run in this environment.
- Claude community marketplace submission has not been sent.
- Codex plugin public submission has not been sent.

## Submission Gates

### Apps SDK Renderer

- Current Netlify site id: `210939ba-0ffe-4c5d-8074-bbc195518c1c`.
- Current Netlify project: `https://app.netlify.com/projects/jsonx-renderer-app`.
- Current production endpoint: `https://jsonx-renderer-app.netlify.app/mcp`.
- Latest verified deploy id: `6a6305f3ea5f474b412d2f3e`.
- For Netlify redeploys, use base directory `apps/jsonx-renderer-app`, build command `npm run check`, publish directory `public`, and the hosted `/mcp` path.
- Confirm `/mcp` supports low-latency streaming responses and dependable TLS after each deploy.
- Connect the hosted `/mcp` URL in ChatGPT developer mode.
- Run golden prompts for direct UI, text-only fallback, quiz, poll, bad payload, oversized payload, and unsupported component.
- Run motion prompts for `subtle-enter`, `state-change-highlight`, and `morph-list-to-detail` with and without GSAP enabled.
- Capture screenshots after the hosted app is connected.
- Review `apps/jsonx-renderer-app/chatgpt-app-submission.json` against the final hosted endpoint, privacy URL, terms URL, support URL, and screenshots before submitting.
- Regenerate `docs/intent/generative-ui-plugin/submission-artifacts/current/` after any renderer, fixture, submission JSON, or public page change.
- Add the real app ID to plugin app metadata only after the ID exists.

### Codex Plugin

- Keep the plugin package self-contained.
- Keep `.app.json` empty until a real app ID exists.
- Keep `.mcp.json` empty unless the packaged MCP config can run for installed users.
- Validate the plugin manifest and skills after every metadata change.
- Validate `.agents/plugins/marketplace.json` and install from the local `jsonx-local` marketplace during development.
- Re-test the Codex marketplace path with an isolated `CODEX_HOME` before public submission package changes.
- Confirm `npm pack --dry-run` excludes `plugins/` and `apps/`.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip` as the current review package.

### Claude Code Plugin

- Run local plugin validation with Claude Code.
- Test with `claude --plugin-dir ./plugins/claude-jsonx-plugin`.
- Run `/jsonx:jsonx` and `/jsonx:jsonx-generative-ui` smoke prompts.
- Submit to the Claude community marketplace only after validation, hosted endpoint review, and screenshots are complete.
- Use `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip` as the current review package.

### Skill Installer

- Dry-run all surface and skill combinations before changing install docs.
- Test `--target` against a temporary directory so personal skill folders are not touched in CI.
- Keep the installer under `skills/` so it remains excluded from the npm package.

## External Documentation Checked

- OpenAI Apps SDK MCP server docs: https://developers.openai.com/apps-sdk/build/mcp-server
- OpenAI Apps SDK UI docs: https://developers.openai.com/apps-sdk/build/chatgpt-ui
- OpenAI Apps SDK deployment docs: https://developers.openai.com/apps-sdk/deploy
- OpenAI Apps SDK submission docs: https://developers.openai.com/apps-sdk/deploy/submission
- Claude Code skills docs: https://code.claude.com/docs/en/skills
- Claude Code plugin docs: https://code.claude.com/docs/en/plugins
- OpenCode skills docs: https://opencode.ai/docs/skills/
