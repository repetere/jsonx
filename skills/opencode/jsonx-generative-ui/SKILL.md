---
name: jsonx-generative-ui
description: Generate safe JSONX/JXM UI payloads only when a richer response is useful or explicitly requested. Use for OpenCode sessions connected to an IDE, browser demo, or terminal workflow when the user wants interactive UI, quizzes, polls, sliders, review panels, dashboards, forms, or other generated interface output instead of plain text.
license: MIT
metadata:
  package: jsonx
  workflow: generative-ui
---

# jsonx-generative-ui

Compatibility: OpenCode.

Use this skill to decide whether a response should stay as text or become a safe JSONX/JXM interface payload. Generate UI when it improves the task, when the user asks for UI, or when the user confirms that an interactive control would help.

## Response Decision

- If plain text is enough, answer normally.
- If the user explicitly asks for a UI, rendered interface, JSONX payload, IDE panel, quiz UI, poll, slider, form, dashboard, or review screen, generate JSONX.
- If the user asks for homework help, tutoring, study practice, or to be quizzed, ask whether they want a multiple-choice quiz UI unless they already requested one.
- If the user is choosing a preference, rating, priority, confidence level, budget, risk level, or other numeric input, ask whether they want a slider UI unless they already requested one.
- If the user is being polled, surveyed, triaged, or asked to compare options, prefer a small UI when it will make the response easier to answer.
- Do not force UI into normal explanations, code edits, command output, or short factual answers.

## IDE Handoff

When the agent is running in a terminal or IDE with workspace write access, write the UI payload to:

```text
.jsonx/ui/<short-purpose>.json
```

Use this envelope:

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "opencode",
  "title": "Short UI title",
  "purpose": "One sentence purpose.",
  "payload": {
    "component": "DemoShell",
    "props": {
      "title": "Short UI title",
      "summary": "One sentence summary of what the interface helps the user do."
    },
    "children": []
  }
}
```

If no IDE renderer or filesystem handoff is available, return the JSON object inline so the user can paste it into a renderer. Do not wrap JSON in Markdown fences when the user asked for a raw payload.

## Allowed Component Registry

Use only these components and props unless the user provides a different host registry.

| Component | Allowed props | Use |
| --- | --- | --- |
| `DemoShell` | `title`, `summary` | Required top-level wrapper. |
| `SectionHeader` | `title`, `description` | Label a major section. |
| `MetricRow` | `items` | Show 2-4 metrics, statuses, or counters. |
| `DataTable` | `columns`, `rows` | Show a compact comparison, queue, triage list, or records table. |
| `Checklist` | `items` | Show tasks, requirements, or review steps. |
| `ActionPanel` | `title`, `primaryAction`, `secondaryAction` | Show host-owned next actions. |
| `Timeline` | `items` | Show ordered events, milestones, or history. |
| `Alert` | `tone`, `title` | Show one important warning, success, or info message. |
| `TextBlock` | `text` | Add one short paragraph when other components are not enough. |
| `MultipleChoiceQuiz` | `questions` | Quiz the user with choices and optional explanations. |
| `SliderPoll` | `question`, `min`, `max`, `step`, `value`, `leftLabel`, `rightLabel` | Collect a numeric rating or preference. |
| `ChoiceList` | `question`, `items`, `selectionMode` | Collect one or more choices. |

## Optional Motion

Animation is renderer-owned. The agent may request an allowlisted `motionProfile` only when the renderer supports it. Never return GSAP code, CSS animation code, arbitrary easing functions, inline styles, or JavaScript handlers.

Allowed future motion profiles:

- `none`
- `subtle-enter`
- `morph-list-to-detail`
- `state-change-highlight`

The renderer should use GSAP with reduced-motion support when animation is enabled. Rendering must still work with animation disabled.

## Blocked JSONX Features

Never use these fields for generated UI payloads:

- `__dangerouslyEvalProps`
- `__dangerouslyBindEvalProps`
- `__dangerouslyEvalAllProps`
- `__dangerouslyInsertFunctionComponents`
- `__dangerouslyInsertClassComponents`
- `__dangerouslyInsertComponents`
- `__dangerouslyInsertReactComponents`
- `__dangerouslyInsertJSONXComponents`
- `__functionProps`
- `windowprops`
- `dangerouslySetInnerHTML`
- `style`

Also block inline event handler props such as `onClick`, `onSubmit`, and `onChange`; raw HTML; external URLs; arbitrary CSS; and unknown components or props.

## Final Check

Before handing off a payload, verify that:

1. The user actually benefits from UI or asked for it.
2. The JSON parses.
3. Every component, prop, action, and motion profile is allowlisted.
4. No blocked JSONX field or inline event handler is present.
5. The payload is saved to `.jsonx/ui/` when an IDE handoff is available.
