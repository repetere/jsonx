# jsonx-generative-ui

Use this skill when the user wants an AI agent to turn a natural-language prompt into a safe JSONX/JXM interface payload for the JSONX generative UI demo or for a host application with an equivalent allowlisted registry.

## What this skill should produce

Produce the UI payload itself, not React source code, HTML, Markdown, or explanatory prose. The payload must be one valid JSON object shaped as a JSONX component tree.

The most common request pattern is:

> Build the right UI for this prompt: `<user task>`

When that happens, infer a useful task-specific interface and return JSON only.

## Allowed component registry

Use only these components and props unless the user provides a different host registry.

| Component | Allowed props | When to use it |
| --- | --- | --- |
| `DemoShell` | `title`, `summary` | Required top-level wrapper for the generated UI. |
| `SectionHeader` | `title`, `description` | Label a major section in the interface. |
| `MetricRow` | `items` | Show 2-4 concise metrics, statuses, or counters. |
| `DataTable` | `columns`, `rows` | Show a compact comparison, queue, triage list, or records table. |
| `Checklist` | `items` | Show tasks, requirements, or review steps with statuses. |
| `ActionPanel` | `title`, `primaryAction`, `secondaryAction` | Show recommended next actions using named action strings. |
| `Timeline` | `items` | Show ordered events, milestones, or history. |
| `Alert` | `tone`, `title` | Show one important warning, success, or info message. |
| `TextBlock` | `text` | Add one short paragraph when other components are not enough. |

## Allowed action names

Use only these action strings in `ActionPanel` props:

- `open_detail`
- `draft_response`
- `approve_item`
- `reject_item`
- `filter_table`
- `draft_refund_response`
- `open_customer_timeline`

Actions are labels for host-owned handlers. They must never contain JavaScript.

## Payload design rules

- Always return a top-level `DemoShell` object.
- Include a `title` and concise `summary` on `DemoShell`.
- Include at least three useful child sections for non-trivial prompts.
- Prefer a structure that helps a user act: metrics, table/list, checklist/timeline, and action panel.
- Use realistic business copy derived from the prompt, but do not invent sensitive personal data.
- Keep tables small: 3-5 columns and no more than 6 rows.
- Keep visible text concise.
- If information is missing, represent assumptions as review items or checklist tasks instead of fabricating facts.

## Output contract

Return only valid JSON. Do not wrap the response in Markdown fences. Do not include comments.

Use this shape:

```json
{
  "component": "DemoShell",
  "props": {
    "title": "Short interface title",
    "summary": "One sentence summary of what the interface helps the user do."
  },
  "children": [
    {
      "component": "MetricRow",
      "props": {
        "items": [
          { "label": "Metric label", "value": "Metric value", "status": "optional status" }
        ]
      }
    },
    {
      "component": "DataTable",
      "props": {
        "columns": ["Column", "Column", "Column"],
        "rows": [["Value", "Value", "Value"]]
      }
    },
    {
      "component": "ActionPanel",
      "props": {
        "title": "Recommended next step",
        "primaryAction": "open_detail",
        "secondaryAction": "draft_response"
      },
      "children": "Short action guidance."
    }
  ]
}
```

## Blocked JSONX features

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

## Generation workflow

1. Read the user's prompt and identify the task domain, user goal, and likely decision points.
2. Choose an interface pattern:
   - triage/review prompt: `MetricRow` + `DataTable` + `ActionPanel`
   - compliance/checklist prompt: `Alert` + `Checklist` + `Timeline` + `ActionPanel`
   - planning prompt: `SectionHeader` + `Checklist` + `DataTable` + `ActionPanel`
   - status/portfolio prompt: `MetricRow` + `DataTable` + `Alert` + `ActionPanel`
3. Draft only allowlisted components and props.
4. Verify the JSON is parseable and all action names are allowed.
5. Return the JSON object only.

## Example

User prompt:

> Create a support triage screen for a refund request.

Response:

```json
{
  "component": "DemoShell",
  "props": {
    "title": "Customer Support Triage",
    "summary": "Review refund risk, customer context, and the next response for a delayed shipment."
  },
  "children": [
    {
      "component": "MetricRow",
      "props": {
        "items": [
          { "label": "Open cases", "value": "18", "status": "watch" },
          { "label": "Refund risk", "value": "Medium", "status": "warn" },
          { "label": "SLA", "value": "4h left", "status": "ok" }
        ]
      }
    },
    {
      "component": "DataTable",
      "props": {
        "columns": ["Signal", "Detail", "Priority"],
        "rows": [
          ["Order delay", "Package is 6 days late", "High"],
          ["Customer tier", "Enterprise buyer", "High"],
          ["Policy fit", "Refund exception may apply", "Medium"]
        ]
      }
    },
    {
      "component": "ActionPanel",
      "props": {
        "title": "Recommended next step",
        "primaryAction": "draft_refund_response",
        "secondaryAction": "open_customer_timeline"
      },
      "children": "Review the customer timeline before sending the response."
    }
  ]
}
```

## If the prompt is unsafe or impossible

If the user asks for executable code, credential capture, raw HTML injection, hidden tracking, or unsafe actions, refuse that part and return a safe review/checklist UI that explains what must be changed. If the user asks for components outside the registry, use the closest allowed component or ask for the host registry.

## Provider note

This skill is published for Claude Code users, but the output contract is provider-neutral so the same generated JSONX can be pasted into the browser demo.
