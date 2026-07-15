# JSONX Generative UI VS Code Extension

This extension renders safe JSONX generative UI payloads inside VS Code.

Agents can hand off UI by writing JSON files under:

```text
.jsonx/ui/*.json
```

The extension watches that folder and opens the latest UI in a webview when `jsonxGenerativeUi.autoOpen` is enabled. This works for Codex, Claude Code, or a terminal agent as long as it can write to the workspace.

## Payload envelope

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "codex",
  "title": "Practice Quiz",
  "payload": {
    "component": "DemoShell",
    "props": {
      "title": "Practice Quiz",
      "summary": "Answer a short multiple-choice quiz."
    },
    "children": []
  }
}
```

The extension also accepts a raw JSONX component tree with `component`, `props`, and `children` at the top level.

## Commands

- `JSONX: Open Latest Generated UI`
- `JSONX: Open Generated UI From File`
- `JSONX: Create Quiz UI Example`
- `JSONX: Create Slider Poll UI Example`

## Safety profile

The renderer accepts only allowlisted demo components and props. It blocks dangerous JSONX execution fields, inline event handler props, raw HTML, arbitrary style props, and unknown components.
