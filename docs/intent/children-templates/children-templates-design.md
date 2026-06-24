# Children Templates Design

Status: brownfield draft

Source: `src/children.ts`

Tests: `src/children.test.ts`

## Responsibility

Children templates choose effective child values, pass parent props into child JSONX definitions, load external child templates, apply child formatting helpers, recursively render child JSONX objects, and maintain a template cache.

## Requirements Covered

JSONX-CHILDREN-001 through JSONX-CHILDREN-010

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `getChildrenProperty(options)` | Select `_children`, `jsonx.children`, `props.children`, or null. | JSONX-CHILDREN-001 to JSONX-CHILDREN-004 |
| `getChildrenProps(options)` | Merge parent props into child JSONX. | JSONX-CHILDREN-005 |
| `getJSONXChildren(options)` | Resolve, format, and recursively render children. | JSONX-CHILDREN-006 to JSONX-CHILDREN-010 |
| `fetchJSONSync(path, options)` | Fetch template data synchronously in browser contexts. | JSONX-CHILDREN-009 |
| `getChildrenTemplate(template, type)` and `clearTemplateCache()` | Load, cache by effective load type and template path, and clear templates. | JSONX-CHILDREN-008 |

## Child Selection

The current selection order is `_children`, `jsonx.children`, `props.children`, then no children.

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| `_children` is invalid | Fall back to `jsonx.children`. | JSONX-CHILDREN-002 |
| No child source exists | Return `null` or `undefined` depending on helper. | JSONX-CHILDREN-004 |
| `passprops` is an array | Pass only selected parent props. | JSONX-CHILDREN-005 |
| Formatting flags are present | Apply requested formatting. | JSONX-CHILDREN-007 |
| Template is cached | Return cached template. | JSONX-CHILDREN-008 |
| Same template string is loaded by fetch and file modes | Keep separate cache entries. | JSONX-CHILDREN-008 |
| XHR status is not 200 | Throw an error. | JSONX-CHILDREN-009 |
| Child render fails | Return `null` and log in debug mode. | JSONX-CHILDREN-010 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| CHILDREN-DD-001 | Keep `_children` as highest-priority child override. | Accepted |
| CHILDREN-DD-002 | Keep synchronous template loading for compatibility. | Accepted |
| OQ-001 | Include the effective load type in template cache keys. | Resolved |
