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
- Can enable renderer-owned GSAP motion with `JSONX_ENABLE_GSAP=1`.

## Local Development

```text
cd apps/jsonx-renderer-app
npm install
npm run check
npm start
```

The server listens on `http://localhost:8787/mcp` by default. Set `PORT` to use a different port.

To enable the optional GSAP motion layer in the widget:

```text
JSONX_ENABLE_GSAP=1 npm start
```

When GSAP is not enabled, the widget still renders and uses CSS fallback motion for allowlisted profiles. Users with reduced motion preferences get minimal or no animation.

For ChatGPT developer mode, expose the local server with an HTTPS tunnel and use the tunneled `/mcp` URL when creating the app.

```text
ngrok http 8787
```

Then use:

```text
https://<subdomain>.ngrok.app/mcp
```

## Netlify Deployment

`netlify.toml` and `netlify/functions/jsonx-renderer.mjs` make the app deployable as a Netlify site with a serverless MCP endpoint.

Recommended Git-based setup:

```text
Base directory: apps/jsonx-renderer-app
Build command: npm run check
Publish directory: public
Functions directory: netlify/functions
```

After deployment, use these URLs:

```text
https://<site>.netlify.app/mcp
https://<site>.netlify.app/healthz
https://<site>.netlify.app/widget
```

Set `JSONX_ENABLE_GSAP=1` in the Netlify environment only if the hosted widget should inline the app-local GSAP runtime. Do not put API keys or model credentials in this renderer app.

## Validation

```text
npm run check
npm run validate:fixtures
```

`npm run check` checks the local server files, the Netlify function entrypoint, the browser widget, the Web-standard handler path, and the Node HTTP server path. It lists MCP tools, reads the widget resource, calls `render_jsonx_response`, and verifies invalid payload rejection.

## Submission Notes

`chatgpt-app-submission.json` is the current ChatGPT Apps submission draft. It includes app info, tool hint justifications, five positive test cases, and three negative test cases.

Public submission still needs a deployed HTTPS URL connected in ChatGPT developer mode, final app/plugin metadata, screenshots, and hosted test prompt responses. The public site provides privacy and terms pages at `https://jsonx.net/privacy.html` and `https://jsonx.net/terms.html` after GitHub Pages deployment. Use GitHub Issues as the support URL unless a separate support channel is created. Do not add placeholder hosted URLs or app IDs to `.app.json`.

## Development Notes

Keep shared schema and fixtures aligned with `plugins/jsonx-generative-ui-plugin/fixtures/` and `plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py`.

Do not add hosted app dependencies to the root package dependencies. GSAP belongs in this app package only, not in the root `jsonx` npm package.
