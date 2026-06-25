# JSONX Per-Test Spec Annotation Plan

Status: draft

Current state: source and test files have file-level `@spec` annotations. This is enough for brownfield mapping and deterministic spec resolution. The next level of precision is test-case-level annotation.

## Policy

1. Keep file-level spec annotations at the top of each test file.
2. Add a short spec comment immediately before each `it(...)` block when the test is edited.
3. Use the smallest relevant set of spec IDs for each test.
4. Do not add broad spec lists to individual tests.
5. Prefer one behavior per test when new tests are written.

## Format

```ts
// @spec JSONX-CORE-001 JSONX-CORE-005
it("should return an instance of a react element", () => {
  // test body
});
```

For multi-behavior integration tests, list the primary spec first:

```ts
// @spec JSONX-EXPRESS-009 JSONX-CORE-009
it("should render a jsonx json file", async () => {
  // test body
});
```

## First-Pass Mapping

| Test File | Primary Segment | Annotation Strategy |
|-----------|-----------------|---------------------|
| `src/index.test.tsx` | Core Rendering | Add per-test `JSONX-CORE-*` comments as tests are edited. Integration tests may also cite Express specs. |
| `src/html.test.ts` | Core Rendering, Component Factories | Annotate each rendered example with the main component behavior it exercises. |
| `src/components.test.tsx` | Component Factories | Add focused `JSONX-COMP-*` comments per factory helper. |
| `src/props.test.ts` | Prop Resolution | Add `JSONX-PROPS-*` comments by helper and branch. |
| `src/util.test.ts` | Prop Resolution | Add comments for comparison, traversal, validation, and syntax conversion tests. |
| `src/children.test.ts` | Children Templates | Add comments for child precedence, formatting, template loading, and recursive rendering tests. |
| `src/express.test.ts` | Express Rendering | Add `JSONX-EXPRESS-*` comments for file loading, callbacks, errors, and Express integration. |

## Completion Rule

This plan is complete when each new or modified test includes a focused per-test `@spec` comment. A one-time full backfill can be done later, but it is not required to keep the current brownfield map coherent.

