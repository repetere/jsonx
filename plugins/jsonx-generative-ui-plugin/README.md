# JSONX Generative UI Codex Plugin

This Codex plugin packages the JSONX workflow around two skills:

- `jsonx`: core JSONX/JXM package work.
- `jsonx-generative-ui`: safe JSONX generative UI payloads, fixtures, validation, and local `.jsonx/ui/` handoff files.

The plugin does not make Codex an inline UI host. Codex generates and validates the payload. The Apps SDK renderer app under `apps/jsonx-renderer-app/` is the ChatGPT inline UI path.

## Local Development

Validate the plugin:

```text
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/jsonx-generative-ui-plugin
node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs
```

Validate JSONX generative UI fixtures:

```text
python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py plugins/jsonx-generative-ui-plugin/fixtures/*.json
```

The command above should fail when invalid fixtures are included. Use the valid fixture set for a passing check.

Generate current submission packages and screenshots from the repository root:

```text
node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs
```

Artifacts are written under `docs/intent/generative-ui-plugin/submission-artifacts/current/`, which is excluded from the root npm package. The generated bundle includes review packages, store listing drafts, screenshots, golden-prompt tool-call evidence, hosted MCP evidence, skill installer evidence, isolated Codex marketplace install evidence, Claude Code validation evidence, OpenCode skill discovery evidence, and package-boundary evidence.
The default run records a live hosted MCP transcript from `https://jsonx-renderer-app.netlify.app/mcp`, installs this plugin from the repo-local marketplace using a temporary `CODEX_HOME` when the Codex CLI is available, validates the Claude Code plugin with `claude plugin validate` through a temporary npm cache, and verifies OpenCode can discover the project skills with `opencode debug skill`.

For CI or temporary package checks, write to a separate output directory:

```text
node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs --skip-screenshots --skip-hosted-mcp --skip-codex-install --skip-claude-validation --skip-opencode-validation --output /tmp/jsonx-submission-artifacts
```

## Renderer App

Run the local Apps SDK renderer from the repository root:

```text
cd apps/jsonx-renderer-app
npm install
npm run check
npm start
```

The local MCP URL is:

```text
http://localhost:8787/mcp
```

For ChatGPT developer mode, expose the server through an HTTPS tunnel and use the tunneled `/mcp` URL.

The hosted renderer endpoint is:

```text
https://jsonx-renderer-app.netlify.app/mcp
```

Use it for ChatGPT developer-mode app setup and hosted smoke tests.

## Public Wiring

`.app.json` stays empty until a real Apps SDK app ID exists. `.mcp.json` stays empty in the plugin package so installed users are not pinned to a local path or an endpoint they did not choose. Use the templates in `assets/` for repo-local development wiring.

## Codex Local Marketplace

The repo includes a local Codex marketplace at `.agents/plugins/marketplace.json`.

From the repo root, add the marketplace to a development Codex profile:

```text
codex plugin marketplace add .
codex plugin add jsonx-generative-ui-plugin@jsonx-local
```

Use a fresh Codex task after installing or reinstalling the plugin so new skills and metadata are loaded.
