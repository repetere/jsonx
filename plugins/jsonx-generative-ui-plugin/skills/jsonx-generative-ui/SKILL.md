---
name: jsonx-generative-ui
description: Generate safe JSONX/JXM UI payloads only when a richer response is useful or explicitly requested. Use for Codex sessions that should create local .jsonx/ui handoff files, validate generated UI fixtures, or prepare payloads for the hosted JSONX Apps SDK renderer.
---

# jsonx-generative-ui

Use this skill to decide whether a response should stay as text or become a safe JSONX/JXM interface payload.

## Decision Rule

- Answer normally when text is enough.
- Generate UI when the user asks for UI, an IDE panel, a rendered interface, a quiz, a poll, a slider, a dashboard, a form, or a review screen.
- Ask a short confirmation before creating quiz or poll UI when the user did not request it.
- Do not force UI into code diffs, command output, short factual answers, or normal explanations.

## Handoff

When filesystem access is available, write generated UI to:

```text
.jsonx/ui/<short-purpose>.json
```

Use the `jsonx.generative-ui.v1` envelope:

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "codex",
  "title": "Short UI title",
  "purpose": "One sentence purpose.",
  "payload": {
    "component": "DemoShell",
    "props": {
      "title": "Short UI title",
      "summary": "One sentence summary."
    },
    "children": []
  }
}
```

## Allowed Components

Use only these components unless the host gives a different registry:

- `DemoShell`
- `SectionHeader`
- `MetricRow`
- `DataTable`
- `Checklist`
- `ActionPanel`
- `Timeline`
- `Alert`
- `TextBlock`
- `MultipleChoiceQuiz`
- `SliderPoll`
- `ChoiceList`

## Optional Animation

Animation is renderer-owned. The model may request an allowlisted `motionProfile` only when the renderer supports it. Never return GSAP code, CSS animation code, arbitrary easing functions, inline styles, or JavaScript handlers.

Allowed motion profiles for plugin fixtures:

- `none`
- `subtle-enter`
- `morph-list-to-detail`
- `state-change-highlight`

The renderer can use GSAP with reduced-motion support when animation is enabled. Rendering must still work with animation disabled or without GSAP loaded.

## Validation

Run the bundled validator on generated files or fixtures:

```text
python3 scripts/validate-jsonx-ui.py fixtures/text-block.json
```

Before handing off output, verify:

1. JSON parses.
2. The schema is `jsonx.generative-ui.v1`.
3. Every component, prop, action, and motion profile is allowlisted.
4. No raw HTML, inline event handler, arbitrary CSS, eval-style field, or unknown component exists.
5. The payload is saved to `.jsonx/ui/` when an IDE handoff is available.
