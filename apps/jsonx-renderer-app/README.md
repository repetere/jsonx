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
npm ci
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

## Cloudflare Workers deployment

Migration status: the Workers adapter is implemented; production deployment and endpoint cutover are pending. Adding this configuration does not deploy a Worker or change the active endpoint.

Use Node 22. Wrangler and the bundler are pinned in this app's development dependencies. The shared `src/app.mjs` owns MCP registration, widget assembly, and Web Request/Response routing. `src/server.mjs` supplies the filesystem and Node HTTP adapter. `src/worker.mjs` imports the same assets and optional GSAP at build time, with no Node compatibility flags, storage bindings, model credentials, or runtime CDN requests.

```text
cd apps/jsonx-renderer-app
npm ci
npm run check
npm run deploy:dry-run
npm run dev:worker
```

`npm run bundle:worker` writes `.worker-build/worker.mjs`, a standalone ES module with all assets embedded. Wrangler's custom build runs this automatically for dev/deploy. The same file can be uploaded through the Cloudflare dashboard; use compatibility date `2026-10-02`, ES module format, and the variables in `wrangler.toml`.

After deployment is authorized and an existing Cloudflare login or deployment token is available:

```text
npm run deploy:worker
npm run smoke:hosted -- --url https://<verified-worker-origin>
```

Use the actual origin returned by Cloudflare. Routes remain `/`, `/healthz`, `/widget`, and `/mcp`. Set `JSONX_ENABLE_GSAP=1` (or `true`/`yes`) in `wrangler.toml` to inline GSAP; the default is off and CSS fallback motion remains available. For GSAP-enabled deployment, add `--gsap` to the smoke command. If `JSONX_WIDGET_DOMAIN` is configured, add `--widget-domain <domain>`.

The manual, main-branch-only workflow `.github/workflows/deploy-jsonx-renderer.yml` requires existing repository secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, plus a verified `expected_origin` input. It fails before deployment if credentials are missing and never creates credentials. The Generative UI workflow runs the Workers runtime suite and deployment dry run on relevant pull requests and pushes without deploying.

See [the deployment and cutover checklist](../../docs/intent/generative-ui-plugin/hosted-renderer-deployment.md) before switching public endpoints or canceling the paid Netlify plan. Existing unrelated sites and custom domains must be preserved.

## Netlify rollback

The legacy `netlify.toml` and `netlify/functions/jsonx-renderer.mjs` are retained during migration. The recorded hosted endpoint is:

```text
https://jsonx-renderer-app.netlify.app/mcp
```

Its companion routes are `/healthz` and `/widget`. For rollback use base directory `apps/jsonx-renderer-app`, build command `npm run check:node`, publish directory `public`, and functions directory `netlify/functions`. `JSONX_ENABLE_GSAP=1` preserves existing optional GSAP behavior. Keep the site available until Cloudflare and its consumers are verified.

## Validation

```text
npm run check
npm run validate:fixtures
```

`npm run check` runs Node/Netlify regression checks and the production Worker bundle in local workerd. Workers tests cover both GSAP modes, health, self-contained widget HTML, CORS, MCP initialize/list/read, all nine valid and five unsafe fixtures, malformed JSON, GET/DELETE, 404s, and concurrent stateless requests. `npm run deploy:dry-run` validates packaging without uploading. `npm run smoke:hosted` repeats the endpoint contract against a verified deployment.

## Submission Notes

`chatgpt-app-submission.json` is the current ChatGPT Apps submission draft. It includes app info, tool hint justifications, five positive test cases, and three negative test cases.

Public submission still needs the hosted `/mcp` URL connected in ChatGPT developer mode, final app/plugin metadata, screenshots, and hosted test prompt responses. The public site provides privacy and terms pages at `https://jsonx.net/privacy.html` and `https://jsonx.net/terms.html`. Use GitHub Issues as the support URL unless a separate support channel is created. Do not add placeholder app IDs to `.app.json`.

Existing submission evidence records Netlify. Cloudflare production verification and ChatGPT developer-mode reconnection remain pending; local tests do not satisfy those external gates.

## Development Notes

Keep shared schema and fixtures aligned with `plugins/jsonx-generative-ui-plugin/fixtures/` and `plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py`.

Do not add hosted app dependencies to the root package dependencies. GSAP belongs in this app package only, not in the root `jsonx` npm package.
