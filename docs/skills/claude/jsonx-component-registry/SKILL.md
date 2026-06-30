# jsonx-component-registry

Use this skill when an agent is working with JSONX as dynamic interface output for generative UI.

## Purpose

Help produce, validate, or review constrained JSONX/JXM payloads that can be rendered through a trusted host component registry. Do not generate arbitrary React source code unless the user explicitly asks for durable application code.

## Safe output contract

- Return valid JSON when asked for a payload.
- Use only components approved by the host registry.
- Use only documented props for each component.
- Do not include JavaScript functions, inline event handlers, raw HTML, Markdown wrappers, unknown components, unknown props, or arbitrary CSS.
- Use named action strings such as `open_detail`, `draft_response`, `approve_item`, `reject_item`, and `filter_table` instead of executable code.
- Keep visible UI copy concise and business-focused.

## Blocked JSONX features for generated output

Never use `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps`, `__dangerouslyEvalAllProps`, `__dangerouslyInsertFunctionComponents`, `__dangerouslyInsertClassComponents`, `__dangerouslyInsertComponents`, `__dangerouslyInsertReactComponents`, `__dangerouslyInsertJSONXComponents`, `__functionProps`, or `windowprops` for untrusted model output.

## Recommended workflow

1. Confirm the allowed component registry and prop schema.
2. Draft the JSONX payload as data, not code.
3. Validate component names, props, children, and action names.
4. Explain any validation assumptions to the user.
5. Prefer fixture, paste, or bring-your-own-endpoint demos for browser-only sites.

## Provider note

This skill is intentionally provider-neutral and is published in the JSONX repository for claude users.
