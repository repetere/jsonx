---
name: jsonx-generative-ui
description: Generate safe JSONX/JXM UI payloads only when a richer response is useful or explicitly requested. Use for agent sessions connected to an IDE, browser demo, or terminal workflow when the user wants interactive UI, quizzes, polls, sliders, review panels, dashboards, forms, or other generated interface output instead of plain text.
---

# jsonx-generative-ui

Use this skill to decide whether a response should stay as text or become a safe JSONX/JXM interface payload. Generate UI when it improves the task, when the user asks for UI, or when the user confirms that an interactive control would help.

## Response Decision

- If plain text is enough, answer normally.
- If the user explicitly asks for a UI, rendered interface, JSONX payload, IDE panel, quiz UI, poll, slider, form, dashboard, or review screen, generate JSONX.
- If the user asks for homework help, tutoring, study practice, or to be quizzed, ask whether they want a multiple-choice quiz UI unless they already requested one.
- If the user is choosing a preference, rating, priority, confidence level, budget, risk level, or other numeric input, ask whether they want a slider UI unless they already requested one.
- If the user is being polled, surveyed, triaged, or asked to compare options, prefer a small UI when it will make the response easier to answer.
- Do not force UI into normal explanations, code edits, command output, or short factual answers.

## IDE Handoff

When the agent is running in VS Code, the Codex IDE extension, or a VS Code terminal with workspace write access, write the UI payload to:

```text
.jsonx/ui/<short-purpose>.json
```

Use this envelope:

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "agent",
  "title": "Short UI title",
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

## Allowed Actions

Use only these action strings:

- `open_detail`
- `draft_response`
- `approve_item`
- `reject_item`
- `filter_table`
- `draft_refund_response`
- `open_customer_timeline`
- `submit_quiz`
- `submit_poll`
- `submit_choice`

Actions are labels for host-owned handlers. They must never contain JavaScript.

## UI Patterns

- Homework or tutoring quiz: `DemoShell` + `MultipleChoiceQuiz` + optional `TextBlock`.
- Poll or preference input: `DemoShell` + `SliderPoll` or `ChoiceList`.
- Triage or review prompt: `DemoShell` + `MetricRow` + `DataTable` + `ActionPanel`.
- Compliance or checklist prompt: `DemoShell` + `Alert` + `Checklist` + `Timeline` + `ActionPanel`.
- Planning prompt: `DemoShell` + `SectionHeader` + `Checklist` + `DataTable` + `ActionPanel`.
- Status or portfolio prompt: `DemoShell` + `MetricRow` + `DataTable` + `Alert` + `ActionPanel`.

## Payload Rules

- Always put renderable UI under `payload` when writing an IDE handoff file.
- Always use a top-level `DemoShell` for renderable payloads.
- Include a concise `title` and `summary`.
- Include at least one useful child component.
- Prefer a structure that helps the user act.
- Keep tables small: 3-5 columns and no more than 6 rows.
- Keep quiz questions practice-oriented. Do not solve active graded questions for the user.
- If information is missing, represent assumptions as review items or ask a short question before generating the UI.
- Do not invent sensitive personal data.

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

## Examples

### Multiple-choice Quiz UI

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "agent",
  "title": "A* Search Practice Quiz",
  "payload": {
    "component": "DemoShell",
    "props": {
      "title": "A* Search Practice Quiz",
      "summary": "Answer three practice questions about frontier ordering and heuristic use."
    },
    "children": [
      {
        "component": "MultipleChoiceQuiz",
        "props": {
          "questions": [
            {
              "id": "q1",
              "prompt": "What does A* prioritize when choosing the next node?",
              "choices": [
                "Lowest g(n) only",
                "Lowest h(n) only",
                "Lowest f(n) = g(n) + h(n)",
                "Highest path cost"
              ],
              "answer": 2,
              "explanation": "A* uses the known path cost plus the heuristic estimate."
            }
          ]
        }
      }
    ]
  }
}
```

### Slider Poll UI

```json
{
  "schema": "jsonx.generative-ui.v1",
  "source": "agent",
  "title": "Priority Poll",
  "payload": {
    "component": "DemoShell",
    "props": {
      "title": "Priority Poll",
      "summary": "Capture how urgent this work feels before planning next steps."
    },
    "children": [
      {
        "component": "SliderPoll",
        "props": {
          "question": "How urgent is this change?",
          "min": 1,
          "max": 5,
          "step": 1,
          "value": 3,
          "leftLabel": "Low",
          "rightLabel": "High"
        }
      }
    ]
  }
}
```

## Final Check

Before handing off a payload, verify that:

1. The user actually benefits from UI or asked for it.
2. The JSON parses.
3. Every component, prop, and action is allowlisted.
4. No blocked JSONX field or inline event handler is present.
5. The payload is saved to `.jsonx/ui/` when an IDE handoff is available.

This skill is published for agent users, and the output contract is provider-neutral.
