# JSONX Hosted Renderer Deployment

Status: live Netlify endpoint

Last updated: 2026-07-24

## Endpoint

| Item | Value |
| --- | --- |
| Netlify project | `jsonx-renderer-app` |
| Netlify site id | `210939ba-0ffe-4c5d-8074-bbc195518c1c` |
| Project URL | `https://app.netlify.com/projects/jsonx-renderer-app` |
| Production URL | `https://jsonx-renderer-app.netlify.app` |
| MCP URL | `https://jsonx-renderer-app.netlify.app/mcp` |
| Health URL | `https://jsonx-renderer-app.netlify.app/healthz` |
| Widget URL | `https://jsonx-renderer-app.netlify.app/widget` |
| Latest verified deploy | `6a6305f3ea5f474b412d2f3e` |

## Verified Behavior

- `/healthz` returns `{"ok":true}`.
- `/widget` returns `text/html;profile=mcp-app` and includes the JSONX renderer root.
- `/mcp` responds to CORS preflight with `Access-Control-Allow-Origin: *`.
- MCP client smoke test can initialize, list `render_jsonx_response`, read `ui://jsonx/renderer-v1.html`, render a valid payload, and reject an unsafe payload.
- Netlify deploy validation reported no secret scan matches for deploy `6a6305f3ea5f474b412d2f3e`.
- Current submission artifacts include `docs/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json`, which records live `/healthz`, CORS preflight, tool listing, renderer resource read, valid render, and invalid render checks from the hosted endpoint.

## Redeploy Notes

Run deploys from `apps/jsonx-renderer-app` so Netlify sees the app-local `netlify.toml`, `package-lock.json`, `public/`, `web/`, and `netlify/functions/`.

The Netlify MCP connector currently prints a proxy URL with `//proxy/`. The upload command failed with `404 Not Found` until the URL was normalized to `/proxy/`.

After each source change:

```text
cd apps/jsonx-renderer-app
npm run check
```

Then deploy with the Netlify connector command for site id `210939ba-0ffe-4c5d-8074-bbc195518c1c`, using a normalized `/proxy/` path if needed.

## Open Submission Work

- Connect `https://jsonx-renderer-app.netlify.app/mcp` in ChatGPT developer mode.
- Capture screenshots and hosted test prompt responses from ChatGPT.
- Add the approved app ID to `plugins/jsonx-generative-ui-plugin/.app.json` only after the app exists.
- Run Claude Code plugin validation before marketplace submission.
