# JSONX Generative UI Tracking Issues

Status: open

Last updated: 2026-07-24

Plan source: `docs/intent/generative-ui-plugin/generative-ui-plugin-plan.md`

## Workstreams

| Issue | Workstream | Outcome |
| --- | --- | --- |
| [#1110](https://github.com/repetere/jsonx/issues/1110) | Shared contract | One `jsonx.generative-ui.v1` schema and validator for fixtures, app, plugin, browser demo, and local handoff files. |
| [#1111](https://github.com/repetere/jsonx/issues/1111) | Hosted renderer app | Runnable stateless Apps SDK MCP app with `render_jsonx_response`, schema validation, iframe resource wiring, optional GSAP motion, Netlify serverless adapter, local SDK smoke test, and live Netlify MCP endpoint. |
| [#1112](https://github.com/repetere/jsonx/issues/1112) | Codex plugins | Separate local Codex plugin packages for core JSONX and generative UI, plus fixtures, validation script, app wiring templates, and repo-local Codex marketplace entries. |
| [#1113](https://github.com/repetere/jsonx/issues/1113) | Claude Code and OpenCode skills | Installable core JSONX and generative UI skills for Claude Code and OpenCode, separate Claude Code plugin packages, and installer tooling for personal or project installs. |
| [#1114](https://github.com/repetere/jsonx/issues/1114) | Renderer motion | Optional renderer-owned GSAP motion profiles with reduced-motion support, CSS fallback motion, and no model-supplied animation code. |
| [#1115](https://github.com/repetere/jsonx/issues/1115) | Store submission | Split OpenAI/Codex and Claude Code submission materials, generated review packages, ChatGPT app submission JSON, app IDs, screenshots, privacy links, test prompts, and external gate evidence. |
| [#1116](https://github.com/repetere/jsonx/issues/1116) | GitHub Pages | Public install, plugin, renderer, and review-kit documentation mirrored from `site/` into `docs/`. |
| [#1117](https://github.com/repetere/jsonx/issues/1117) | Browser demo | Fixture, paste, and bring-your-own endpoint modes that render the same JSONX generative UI contract. |

## Package Boundary

Keep the generative UI app, plugin, fixtures, and skill packaging outside the main `jsonx` npm package runtime. Use `.npmignore`, package checks, and release review to prevent app or plugin assets from increasing the published library package.

Submission readiness is tracked in `docs/intent/generative-ui-plugin/submission-readiness.md`.

Codex local marketplace coverage is tracked under #1112. The repo-local marketplace lives at `.agents/plugins/marketplace.json` and points to `plugins/jsonx-codex-plugin/` and `plugins/jsonx-generative-ui-plugin/` for development installs. Add it with `codex plugin marketplace add .` from the repo root, then install `jsonx-codex-plugin@jsonx-local` or `jsonx-generative-ui-plugin@jsonx-local`.

Skill installer coverage is tracked under #1113. The installer must support `jsonx`, `jsonx-generative-ui`, and `all` modes for Codex, Claude Code, and OpenCode without writing into the `jsonx` npm package. Current generated artifacts include `skill-installer-evidence.json`, which dry-runs every surface and skill pair and performs isolated installs for all supported surfaces. Claude Code validation coverage is recorded in `claude-validation-evidence.json`. OpenCode project skill discovery coverage is recorded in `opencode-skill-evidence.json`.

Renderer motion coverage is tracked under #1114. GSAP must stay in `apps/jsonx-renderer-app/`, behind renderer-owned code paths, and outside the root npm package. Current generated artifacts include `motion-profile-evidence.json`, which exercises all allowlisted motion profiles with CSS fallback and GSAP-enabled widget HTML.

Hosted renderer deployment coverage is tracked under #1111. The Netlify adapter provides `/mcp`, `/healthz`, and `/widget` at `https://jsonx-renderer-app.netlify.app` without adding app dependencies to the root package.

Submission support page coverage is tracked under #1115 and #1116. The public site should mirror `privacy.html` and `terms.html` into `docs/`, and the ChatGPT app submission JSON should remain under `apps/jsonx-renderer-app/` so it stays outside the root npm package.

Browser demo coverage is tracked under #1117. Current generated artifacts include `browser-demo-evidence.json`, which loads the static public demo in a local browser harness and verifies fixture, paste, and bring-your-own endpoint modes at mobile width.

Submission artifact coverage is tracked under #1115. Current generated artifacts live under `docs/intent/generative-ui-plugin/submission-artifacts/current/`, including split core and generative UI plugin review zips, store listing drafts, screenshot evidence, golden-prompt tool-call evidence, renderer motion evidence, browser demo mode evidence, hosted MCP transcript evidence, skill installer evidence, isolated Codex marketplace install evidence, Claude Code validation evidence, OpenCode skill discovery evidence, external gate evidence, a requirement audit, a copied ChatGPT submission JSON, a copied Codex marketplace file, hashes, and npm package-boundary evidence. Regenerate with `node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs`.

External gate evidence is tracked under #1115. Run `node docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs --init` to create `docs/intent/generative-ui-plugin/external-gate-evidence.json`, then fill it after approved OpenAI/Codex plugin IDs, the renderer app ID, ChatGPT developer-mode transcript evidence, authenticated Claude Code smoke prompts for both split Claude plugins, human/policy review, and all four marketplace submission receipts are available. The checker reports pending fields without regenerating packages. The artifact generator copies and validates that file into `external-gate-evidence.json`, and the submission audit promotes external gates only when the required fields are complete.

CI coverage is tracked under #1115. `.github/workflows/generative-ui-plugin.yml` validates plugin metadata, renderer checks, fixtures, mirrored skill docs, the public generative UI page review-kit links, the external gate evidence template, generated submission packages, and npm package exclusions on push, pull request, and manual dispatch.
