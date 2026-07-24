# JSONX Renderer App

This folder contains the stateless Apps SDK MCP renderer for JSONX generative UI.

The renderer should stay outside the `jsonx` npm package. It is excluded through the root `.npmignore` because it is an app artifact, not package runtime code.

## What it does

- Starts a stateless MCP server at `/mcp`.
- Registers one read-only `render_jsonx_response` tool.
- Validates `jsonx.generative-ui.v1` payloads before returning `structuredContent`.
- Serves the widget resource as `text/html;profile=mcp-app`.
- Renders all allowlisted JSONX generative UI components client-side.
- Sends compact interaction summaries through `ui/update-model-context`.
- Keeps optional motion declarative through `motionProfile`.

## Local Development

```text
cd apps/jsonx-renderer-app
npm install
npm run check
npm start
```

The server listens on `http://localhost:8787/mcp` by default. Set `PORT` to use a different port.

For ChatGPT developer mode, expose the local server with an HTTPS tunnel and use the tunneled `/mcp` URL when creating the app.

```text
ngrok http 8787
```

Then use:

```text
https://<subdomain>.ngrok.app/mcp
```

## Validation

```text
npm run check
npm run validate:fixtures
```

`npm run check` starts a local server on an ephemeral port, lists MCP tools, reads the widget resource, calls `render_jsonx_response`, and verifies invalid payload rejection.

## Submission Notes

Public submission still needs a stable HTTPS deployment, final app/plugin metadata, screenshots, privacy and support URLs, and test prompts. Do not add placeholder hosted URLs or app IDs to `.app.json`.

## Development Notes

Keep shared schema and fixtures aligned with `plugins/jsonx-generative-ui-plugin/fixtures/` and `plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py`.

Do not add hosted app dependencies to the root package dependencies.
