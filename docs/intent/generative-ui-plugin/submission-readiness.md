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
| ChatGPT Apps SDK | `apps/jsonx-renderer-app/` | Runnable stateless MCP app with `render_jsonx_response`, widget resource, optional GSAP motion, local smoke test, developer-mode tunnel path, and Netlify serverless adapter. |
| ChatGPT app submission | `apps/jsonx-renderer-app/chatgpt-app-submission.json` | Import-ready submission draft with app info, tool hint justifications, five positive test cases, and three negative test cases. |
| Public policy pages | `site/privacy.html`, `site/terms.html` | Public privacy and terms notes for the JSONX site, browser demo, skills, plugins, and renderer app. |

## Ready Now

- Install core and generative UI skills for Codex, Claude Code, and OpenCode.
- Install skills through `skills/scripts/install-jsonx-skill.mjs` with separate `jsonx`, `jsonx-generative-ui`, and `all` modes.
- Run the Codex plugin validator locally.
- Run the JSONX fixture validator locally.
- Run the Apps SDK renderer locally at `/mcp`.
- Test the renderer app with the SDK client smoke test.
- Enable optional GSAP motion locally with `JSONX_ENABLE_GSAP=1`.
- Deploy the renderer app to Netlify from `apps/jsonx-renderer-app` or connect it to ChatGPT developer mode through an HTTPS tunnel.
- Use `apps/jsonx-renderer-app/chatgpt-app-submission.json` as the starting point for the ChatGPT Apps submission form.
- Use `https://jsonx.net/privacy.html`, `https://jsonx.net/terms.html`, and GitHub Issues as public submission URLs after the GitHub Pages deployment updates.

## Not Ready For Public Submission

- The Apps SDK app does not yet have a stable production HTTPS endpoint.
- `.app.json` does not yet reference an approved app ID.
- Public screenshots and test prompt responses still need to be captured from the hosted app.
- Privacy, terms, and support URLs exist, but still need final human or legal review before public submission.
- `claude plugin validate` has not been run in this environment.
- Claude community marketplace submission has not been sent.
- Codex plugin public submission has not been sent.

## Submission Gates

### Apps SDK Renderer

- Deploy the MCP server to a stable HTTPS host.
- For Netlify, use base directory `apps/jsonx-renderer-app`, build command `npm run check`, publish directory `public`, and the hosted `/mcp` path.
- Confirm `/mcp` supports low-latency streaming responses and dependable TLS.
- Connect the hosted `/mcp` URL in ChatGPT developer mode.
- Run golden prompts for direct UI, text-only fallback, quiz, poll, bad payload, oversized payload, and unsupported component.
- Run motion prompts for `subtle-enter`, `state-change-highlight`, and `morph-list-to-detail` with and without GSAP enabled.
- Capture screenshots after the hosted app is connected.
- Review `apps/jsonx-renderer-app/chatgpt-app-submission.json` against the final hosted endpoint, privacy URL, terms URL, support URL, and screenshots before submitting.
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
