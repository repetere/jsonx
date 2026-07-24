# JSONX Generative UI Tracking Issues

Status: open

Last updated: 2026-07-24

Plan source: `docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md`

## Workstreams

| Issue | Workstream | Outcome |
| --- | --- | --- |
| [#1110](https://github.com/repetere/jsonx/issues/1110) | Shared contract | One `jsonx.generative-ui.v1` schema and validator for fixtures, app, plugin, browser demo, and local handoff files. |
| [#1111](https://github.com/repetere/jsonx/issues/1111) | Hosted renderer app | Stateless Apps SDK MCP app with `render_jsonx_response`, schema validation, and iframe resource wiring. |
| [#1112](https://github.com/repetere/jsonx/issues/1112) | Codex plugin | Local Codex plugin package with separate `jsonx` and `jsonx-generative-ui` skills, fixtures, and validation script. |
| [#1113](https://github.com/repetere/jsonx/issues/1113) | Claude Code and OpenCode skills | Installable core JSONX and generative UI skills for Claude Code and OpenCode. |
| [#1114](https://github.com/repetere/jsonx/issues/1114) | Renderer motion | Optional renderer-owned GSAP motion profiles with reduced-motion support and no model-supplied animation code. |
| [#1115](https://github.com/repetere/jsonx/issues/1115) | Store submission | Codex and Claude Code plugin submission materials, app IDs, screenshots, privacy links, and test prompts. |
| [#1116](https://github.com/repetere/jsonx/issues/1116) | GitHub Pages | Public install and plugin documentation mirrored from `site/` into `docs/`. |
| [#1117](https://github.com/repetere/jsonx/issues/1117) | Browser demo | Fixture, paste, and bring-your-own endpoint modes that render the same JSONX generative UI contract. |

## Package Boundary

Keep the generative UI app, plugin, fixtures, and skill packaging outside the main `jsonx` npm package runtime. Use `.npmignore`, package checks, and release review to prevent app or plugin assets from increasing the published library package.
