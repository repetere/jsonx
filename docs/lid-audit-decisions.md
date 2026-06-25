# JSONX LID Audit Decisions

Status: accepted

This file tracks the brownfield decisions used to move arrow segments from `MAPPED` to `AUDITED`.

## Decisions

| ID | Segment | Decision | Status | Reason |
|----|---------|----------|--------|--------|
| AD-001 | All | Promote segment status to `AUDITED` after accepting this brownfield review. | Accepted | The current docs were derived from code and tests, reviewed as current brownfield intent, and remaining behavior changes are recorded as backlog. |
| AD-002 | All | Use `npm run lid:check` as the deterministic LID gate. | Accepted | The command checks intent paths, spec IDs, design/spec pairs, arrow references, and doc style. |
| AD-003 | Prop Resolution, Children Templates | Align `validateJSONX` with renderer behavior for `passprops` arrays. | Completed | Rendering supports `passprops` as `boolean | string[]`; validation now accepts boolean values or arrays of string prop names. |
| AD-004 | Distribution Types | Resolve the legacy core duplicate output path. | Completed | The non-minified legacy core build writes `dist/index.web.core-legacy.js`, and the minified legacy core build writes `dist/index.web.core-legacy-min.js`. |
| AD-005 | Express Rendering | Keep JSON and JSONX file rendering on the JSONX path unless direct JSON IR rendering is intentionally restored later. | Accepted | The `context.useJSON` line is commented out and tests cover current behavior. |
| AD-006 | Distribution Types | Treat build-output checks as a release gate, not a fast LID doc gate. | Accepted | `npm run lid:check` should stay fast. `npm run build` remains the authoritative distribution verification. |
| AD-007 | All tested segments | Keep file-level spec annotations now and add per-test annotations incrementally. | Accepted | A full per-test annotation pass would touch many tests. The lower-risk path is to annotate tests when they are next edited, with examples documented. |
| AD-008 | Children Templates | Resolve template cache-key collisions by load type. | Completed | Template cache entries now include the effective load type and template path, so fetch and file loads for the same string do not overwrite each other. |
| AD-009 | Component Factories | Resolve dynamic component cache-key collisions by fetch options. | Completed | Dynamic component cache keys now include both `fetchURL` and a deterministic representation of `fetchOptions`. |
| AD-010 | Distribution Types | Add artifact-level build checks as a release gate. | Completed | `npm run build:check` verifies expected generated artifacts and configured package entrypoints after the build runs. |
| AD-011 | Core Rendering | Return the React root from `jsonxRender`. | Completed | DOM callers can now clean up React 18 roots by calling `unmount()` on the returned root. |
| AD-012 | Express Rendering | Add explicit direct JSON IR opt-in. | Completed | Express keeps the JSONX default path and renders direct JSON IR only when `options.__useJSON` is true. |

## Audit Outcomes

| Segment | Previous Status | Current Status | Remaining Work |
|---------|-----------------|----------------|----------------|
| Core Rendering | MAPPED | AUDITED | No root-return blocker remains. |
| Component Factories | MAPPED | AUDITED | No dynamic cache-key blocker remains. |
| Prop Resolution | MAPPED | AUDITED | No validation blocker remains. |
| Children Templates | MAPPED | AUDITED | No cache-key blocker remains. |
| Express Rendering | MAPPED | AUDITED | No direct JSON IR blocker remains. |
| Distribution Types | MAPPED | AUDITED | No distribution release-gate blocker remains. |
