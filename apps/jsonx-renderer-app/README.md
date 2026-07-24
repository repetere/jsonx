# JSONX Renderer App Scaffold

This folder is the planned hosted Apps SDK renderer for JSONX generative UI.

The renderer should stay outside the `jsonx` npm package. It is excluded through the root `.npmignore` because it is an app artifact, not package runtime code.

## Target shape

- Stateless MCP server.
- One read-only `render_jsonx_response` tool.
- `jsonx.generative-ui.v1` validation before rendering.
- Widget resource served as `text/html;profile=mcp-app`.
- Widget listens for `ui/notifications/tool-result`.
- Optional renderer-owned GSAP animation behind a reduced-motion check.

## Development notes

Use this app folder for the hosted Apps SDK implementation. Keep shared schema and fixtures aligned with `plugins/jsonx-generative-ui-plugin/fixtures/` and `plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py`.

Do not add hosted app dependencies to the root package dependencies.
