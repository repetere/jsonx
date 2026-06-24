# Core Rendering Design

Status: brownfield draft

Source: `src/index.ts`

Tests: `src/index.test.tsx`, `src/html.test.ts`

## Responsibility

Core rendering converts JSONX input into React elements, JSON intermediate representation, JSX strings, HTML strings, DOM output, or compiled React function components.

## Requirements Covered

JSONX-CORE-001 through JSONX-CORE-012

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `getReactElementFromJSONX(jsonx, resources)` | Convert JXM or simple JSONX input into React output. | JSONX-CORE-001 to JSONX-CORE-008 |
| `outputHTML(config)` | Return server-rendered HTML. | JSONX-CORE-009 |
| `outputJSON(jsonx, resources)` | Return JSON IR. | JSONX-CORE-010 |
| `outputJSX(jsonx, resources)` and `jsonToJSX(json)` | Return JSX text. | JSONX-CORE-011 |
| `compile(jsonx, resources)` | Return a compiled React function component. | JSONX-CORE-011 |
| `jsonxRender(config)` | Render into a DOM node or portal target. | JSONX-CORE-012 |
| `getReactElementFromJSON(options)` | Convert JSON IR into a React element. | JSONX-CORE-010 |
| `__getReact()` and `__getReactDOM()` | Expose React modules. | JSONX-CORE-001, JSONX-CORE-012 |

## Implementation Notes

The pipeline normalizes input, resolves the component through component factories, resolves props through prop resolution, checks display conditions, resolves children, and returns the requested representation. Debug mode can change returned values for missing or invalid components.

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| Missing JSONX input | Return `null`. | JSONX-CORE-003 |
| Missing component | Return a span, with debug text only in debug mode. | JSONX-CORE-003 |
| Invalid component | Throw by default, return/log error in debug mode. | JSONX-CORE-004 |
| `returnJSON` is true | Return `{ type, props, children }`. | JSONX-CORE-007 |
| `jsonx.test` is true | Return formatted diagnostic JSON. | JSONX-CORE-008 |
| Display comparison fails | Return `null`. | JSONX-CORE-006 |
| DOM target is invalid | Throw a `ReferenceError`. | JSONX-CORE-012 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| CORE-DD-001 | Keep `this` as the configuration carrier. | Accepted |
| CORE-DD-002 | Keep mutable normalization of `jsonx.type` and `jsonx.children`. | Accepted |
| OQ-001 | Consider returning the React root from `jsonxRender` for caller cleanup. | Backlog |
