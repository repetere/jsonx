# Prop Resolution Design

Status: brownfield draft

Source: `src/props.ts`, `src/utils.ts`

Tests: `src/props.test.ts`, `src/util.test.ts`

## Responsibility

Prop resolution turns JSONX static props and dynamic instructions into final React props. It also owns traversal, conditional display checks, JSONX validation, simple syntax conversion, evaluated props, inserted components, window functions, spread components, prop include/remove filters, and form registration props.

## Requirements Covered

JSONX-PROPS-001 through JSONX-PROPS-010

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `traverse(paths, data)` and `getJSONXProps(options)` | Resolve dynamic prop paths. | JSONX-PROPS-001 |
| `getComputedProps(options)` | Merge final React props. | JSONX-PROPS-002 to JSONX-PROPS-010 |
| `displayComponent(options)` | Evaluate conditional rendering. | JSONX-PROPS-003 |
| `getEvalProps(options)` | Evaluate and bind dangerous prop declarations. | JSONX-PROPS-004 |
| `getComponentProps`, `getReactComponentProps`, `getReactComponents` | Insert rendered or generated components as props. | JSONX-PROPS-005 |
| `getFunctionProps`, `getWindowComponents` | Resolve legacy function and window component props. | JSONX-PROPS-006 |
| `getChildrenComponents(options)` | Map `__spread` data into `_children`. | JSONX-PROPS-007 |
| `validateJSONX`, `validSimpleJSONXSyntax`, `simpleJSONXSyntax`, `getSimplifiedJSONX` | Validate and convert JSONX syntax. | JSONX-PROPS-008 |
| `useFormRegisterHandler(options)` | Add react-hook-form register props. | JSONX-PROPS-009 |

## Merge Order

`getComputedProps` merges key, static props, `thisprops`, `thisstate`, `thiscontext`, `resourceprops`, `asyncprops`, `windowprops`, eval props, inserted components, generated components, function props, window components, spread components, eval-all props, and filters.

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| Dynamic path is invalid | Resolve to `undefined`. | JSONX-PROPS-001 |
| Dynamic path declaration is invalid | Throw `TypeError`. | JSONX-PROPS-001 |
| Eval fails | Return branch-specific debug errors or omit values. | JSONX-PROPS-004 |
| `__spread` is missing | Return undefined children or a debug error string. | JSONX-PROPS-007 |
| `useremoveprops` is set | Delete named props. | JSONX-PROPS-009 |
| `useincludeprops` is set | Return only included props plus dynamic groups. | JSONX-PROPS-009 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| PROPS-DD-001 | Keep traversal permissive for missing paths. | Accepted |
| PROPS-DD-002 | Treat validation as optional, not a render precondition. | Accepted |
| OQ-001 | `passprops` validation accepts boolean values or arrays of string prop names to match child rendering support. | Resolved |
