# JSONX Generative UI Site Plan

Status: implementation seed

Last updated: 2026-06-30

## Goal

Build a marketing and demo site that positions JSONX as dynamic interface output for AI agents. The site explains that model responses can be constrained JSONX/JXM payloads rendered through a trusted React component registry instead of stopping at text, Markdown, or generated source code.

## Browser-only feasibility

A no-backend browser demo is possible with clear modes:

- Fixture mode: sample prompts load prewritten JSONX payloads, validate them, render approved demo components, and log local actions.
- Paste JSONX mode: users paste a JSONX/JXM payload, validate it against the safe profile, and render it only when it passes.
- Bring-your-own endpoint mode: users provide a CORS-enabled endpoint and optional bearer credential. The browser sends the prompt to that endpoint and expects a JSONX payload. Credentials are kept in session memory and are not stored in local storage.

Direct provider API calls from the browser should remain experimental and off by default because browser-side keys are visible to page runtime, extensions, devtools, and network inspection. Production use should prefer a backend, proxy, serverless function, or short-lived credential flow.

## Safe generated-output profile

Allowed output is limited to known demo components, approved props, plain text children, arrays of child components, quiz questions, slider polls, choice lists, and named local actions. The public demo and IDE extension block dangerous JSONX features, unknown components, unknown props, inline event handlers, raw HTML injection, arbitrary CSS, and external URLs unless explicitly allowlisted.

## Agent and IDE contract

The generative UI skill should not always emit UI. It should answer normally when text is enough, generate JSONX when the user asks for UI, and ask a short confirmation when an interactive control would help but was not requested. Examples include asking a homework or tutoring user whether they want a multiple-choice quiz UI, or asking a polled user whether they want a slider UI for numeric input.

When Codex, Claude Code, or another agent is connected to VS Code and can write workspace files, the handoff path is:

```text
.jsonx/ui/<short-purpose>.json
```

The file uses the `jsonx.generative-ui.v1` envelope with a renderable `payload` object. The VS Code extension validates the payload before rendering it in a webview.

## First public implementation

- Keep the current static site pattern under `site/`.
- Add a client-side demo script under `site/assets/generative-ui-demo.js`.
- Add skills under `skills/codex/` and `skills/claude/`.
- Add `skills/index.json` so the site can render download/install cards.
- Add a VS Code extension under `vscode-extension/` that watches `.jsonx/ui/*.json` and renders validated JSONX UI in an IDE webview.
- Use the existing build path to copy site files into `docs/`.
