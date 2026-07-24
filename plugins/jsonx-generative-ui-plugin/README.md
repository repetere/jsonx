# JSONX Generative UI Codex Plugin

This Codex plugin packages the JSONX workflow around two skills:

- `jsonx`: core JSONX/JXM package work.
- `jsonx-generative-ui`: safe JSONX generative UI payloads, fixtures, validation, and local `.jsonx/ui/` handoff files.

The plugin does not make Codex an inline UI host. Codex generates and validates the payload. The Apps SDK renderer app under `apps/jsonx-renderer-app/` is the ChatGPT inline UI path.

## Local Development

Validate the plugin:

```text
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/jsonx-generative-ui-plugin
```

Validate JSONX generative UI fixtures:

```text
python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py plugins/jsonx-generative-ui-plugin/fixtures/*.json
```

The command above should fail when invalid fixtures are included. Use the valid fixture set for a passing check.

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
