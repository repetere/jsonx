# JSONX Generative UI Site Plan

Status: implementation seed

Last updated: 2026-06-29

## Goal

Build a marketing and demo site that positions JSONX as dynamic interface output for AI agents. The site explains that model responses can be constrained JSONX/JXM payloads rendered through a trusted React component registry instead of stopping at text, Markdown, or generated source code.

## Browser-only feasibility

A no-backend browser demo is possible with clear modes:

- Fixture mode: sample prompts load prewritten JSONX payloads, validate them, render approved demo components, and log local actions.
- Paste JSONX mode: users paste a JSONX/JXM payload, validate it against the safe profile, and render it only when it passes.
- Bring-your-own endpoint mode: users provide a CORS-enabled endpoint and optional bearer credential. The browser sends the prompt to that endpoint and expects a JSONX payload. Credentials are kept in session memory and are not stored in local storage.

Direct provider API calls from the browser should remain experimental and off by default because browser-side keys are visible to page runtime, extensions, devtools, and network inspection. Production use should prefer a backend, proxy, serverless function, or short-lived credential flow.

## Safe generated-output profile

Allowed output is limited to known demo components, approved props, plain text children, arrays of child components, and named local actions. The public demo blocks dangerous JSONX features, unknown components, unknown props, inline event handlers, raw HTML injection, arbitrary CSS, and external URLs unless explicitly allowlisted.

## First public implementation

- Keep the current static site pattern under `site/`.
- Add a client-side demo script under `site/assets/generative-ui-demo.js`.
- Add skills under `skills/codex/` and `skills/claude/`.
- Add `skills/index.json` so the site can render download/install cards.
- Use the existing build path to copy site files into `docs/`.
