# Express Rendering Design

Status: brownfield draft

Source: `src/express.ts`

Tests: `src/express.test.ts`, `src/index.test.tsx`

## Responsibility

Express rendering adapts JSONX to the Express view engine signature. It loads JSONX view modules from files or options, passes Express locals as resources, binds JSONX context options, renders HTML through core rendering, prepends a doctype, and supports callback or direct return styles.

## Requirements Covered

JSONX-EXPRESS-001 through JSONX-EXPRESS-010

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `__express(filePath, options, callback)` | Express-compatible renderer with explicit direct JSON IR opt-in. | JSONX-EXPRESS-001 to JSONX-EXPRESS-010 |
| `renderFile` | Alias export for `__express`. | JSONX-EXPRESS-001 |

## Flow

Read `options.__jsonx`, optionally read and evaluate a file, copy Express options into resources, remove internal keys, bind `__boundConfig`, apply direct JSON IR mode only when `options.__useJSON` is true, render through `outputHTML`, prepend a doctype, then return or callback with the rendered template.

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| `.json` or `.jsonx` file | Evaluate as an object literal. | JSONX-EXPRESS-002 |
| Other extension | Evaluate as JavaScript. | JSONX-EXPRESS-003 |
| `__jsonx` is present | Render it when no file overrides it. | JSONX-EXPRESS-004 |
| Internal option keys exist | Remove them from resources. | JSONX-EXPRESS-005 |
| `__useJSON` is true | Render direct JSON IR without changing default `.json` or `.jsonx` behavior. | JSONX-EXPRESS-010 |
| Callback is absent | Return template or throw. | JSONX-EXPRESS-008 |
| Callback is present | Call it with result or error. | JSONX-EXPRESS-008 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| EXPRESS-DD-001 | Keep file evaluation behavior for JSONX and JavaScript templates. | Accepted |
| OQ-001 | Keep JSON and JSONX file rendering on the JSONX path, with direct JSON IR available only through `options.__useJSON`. | Resolved |
