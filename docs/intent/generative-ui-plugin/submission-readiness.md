# JSONX Plugin and App Submission Readiness

Status: developer-mode implementation in progress

Last updated: 2026-07-24

Plan source: `docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md`

## Current Artifacts

| Surface | Artifact | Current state |
| --- | --- | --- |
| Codex | `plugins/jsonx-generative-ui-plugin/` | Local plugin package with `jsonx` and `jsonx-generative-ui` skills, fixture validator, app wiring templates, and metadata. |
| Claude Code | `plugins/claude-jsonx-plugin/` | Local Claude Code plugin package with `jsonx` and `jsonx-generative-ui` skills. |
| OpenCode | `skills/opencode/` | Skill folders for project or global install. OpenCode does not need a separate plugin for the current scope. |
| Skill installer | `skills/scripts/install-jsonx-skill.mjs` | Local installer for core JSONX and generative UI skills across Codex, Claude Code, and OpenCode. |
| ChatGPT Apps SDK | `apps/jsonx-renderer-app/` | Runnable stateless MCP app with `render_jsonx_response`, widget resource, local smoke test, and developer-mode tunnel path. |

## Ready Now

- Install core and generative UI skills for Codex, Claude Code, and OpenCode.
- Install skills through `skills/scripts/install-jsonx-skill.mjs` with separate `jsonx`, `jsonx-generative-ui`, and `all` modes.
- Run the Codex plugin validator locally.
- Run the JSONX fixture validator locally.
- Run the Apps SDK renderer locally at `/mcp`.
- Test the renderer app with the SDK client smoke test.
- Connect the renderer app to ChatGPT developer mode through an HTTPS tunnel.

## Not Ready For Public Submission

- The Apps SDK app does not yet have a stable production HTTPS endpoint.
- `.app.json` does not yet reference an approved app ID.
- Public screenshots and test prompt responses still need to be captured from the hosted app.
- Privacy policy, terms, and support URLs need final review for the app submission form.
- `claude plugin validate` has not been run in this environment.
- Claude community marketplace submission has not been sent.
- Codex plugin public submission has not been sent.

## Submission Gates

### Apps SDK Renderer

- Deploy the MCP server to a stable HTTPS host.
- Confirm `/mcp` supports low-latency streaming responses and dependable TLS.
- Connect the hosted `/mcp` URL in ChatGPT developer mode.
- Run golden prompts for direct UI, text-only fallback, quiz, poll, bad payload, oversized payload, and unsupported component.
- Capture screenshots after the hosted app is connected.
- Add the real app ID to plugin app metadata only after the ID exists.

### Codex Plugin

- Keep the plugin package self-contained.
- Keep `.app.json` empty until a real app ID exists.
- Keep `.mcp.json` empty unless the packaged MCP config can run for installed users.
- Validate the plugin manifest and skills after every metadata change.
- Confirm `npm pack --dry-run` excludes `plugins/` and `apps/`.

### Claude Code Plugin

- Run local plugin validation with Claude Code.
- Test with `claude --plugin-dir ./plugins/claude-jsonx-plugin`.
- Run `/jsonx:jsonx` and `/jsonx:jsonx-generative-ui` smoke prompts.
- Submit to the Claude community marketplace only after validation, hosted endpoint review, and screenshots are complete.

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
