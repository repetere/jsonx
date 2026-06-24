# JSONX LID Audit Decisions

Status: accepted

This file tracks the brownfield decisions used to move arrow segments from `MAPPED` to `AUDITED`.

## Decisions

| ID | Segment | Decision | Status | Reason |
|----|---------|----------|--------|--------|
| AD-001 | All | Promote segment status to `AUDITED` after accepting this brownfield review. | Accepted | The current docs were derived from code and tests, reviewed as current brownfield intent, and remaining behavior changes are recorded as backlog. |
| AD-002 | All | Use `npm run lid:check` as the deterministic LID gate. | Accepted | The command checks intent paths, spec IDs, design/spec pairs, arrow references, and doc style. |
| AD-003 | Prop Resolution, Children Templates | Document validation as currently stricter than renderer behavior for `passprops` arrays and keep alignment as backlog. | Accepted | Rendering supports `passprops` as `boolean | string[]`, but validation currently checks only boolean. No runtime change is included in this LID pass. |
| AD-004 | Distribution Types | Record the legacy core duplicate output path as distribution backlog. | Accepted | The build config currently writes both legacy core builds to `dist/index.web.core-legacy-min.js`. No build behavior change is included in this LID pass. |
| AD-005 | Express Rendering | Keep JSON and JSONX file rendering on the JSONX path unless direct JSON IR rendering is intentionally restored later. | Accepted | The `context.useJSON` line is commented out and tests cover current behavior. |
| AD-006 | Distribution Types | Treat build-output checks as a release gate, not a fast LID doc gate. | Accepted | `npm run lid:check` should stay fast. `npm run build` remains the authoritative distribution verification. |
| AD-007 | All tested segments | Keep file-level spec annotations now and add per-test annotations incrementally. | Accepted | A full per-test annotation pass would touch many tests. The lower-risk path is to annotate tests when they are next edited, with examples documented. |

## Audit Outcomes

| Segment | Previous Status | Current Status | Remaining Work |
|---------|-----------------|----------------|----------------|
| Core Rendering | MAPPED | AUDITED | `jsonxRender` root-return question is backlog. |
| Component Factories | MAPPED | AUDITED | Dynamic component cache-key refinement is backlog. |
| Prop Resolution | MAPPED | AUDITED | `passprops` validation alignment is backlog. |
| Children Templates | MAPPED | AUDITED | Template cache-key refinement is backlog. |
| Express Rendering | MAPPED | AUDITED | Direct JSON IR rendering path remains disabled unless restored later. |
| Distribution Types | MAPPED | AUDITED | Legacy core duplicate output path and artifact-level build checks are backlog. |
