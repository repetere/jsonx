# JSONX LID Implementation Plan

Status: complete

This checklist turns the brownfield LID follow-up work into tracked implementation steps.

## Checklist

- [x] Create the repo-local implementation checklist.
- [x] Add a deterministic LID check script.
- [x] Add an npm command for the LID check.
- [x] Run the LID check and fix any failures.
- [x] Review and document audit decisions for inferred design items.
- [x] Add a per-test spec reference plan or first-pass annotations.
- [x] Update arrow statuses after audit criteria are met.

## Audit Criteria

A segment can move from `MAPPED` to `AUDITED` when:

1. Its design doc has no unresolved brownfield-derived decisions that affect behavior.
2. Its open questions are answered or intentionally recorded as backlog.
3. Its spec file defines every spec ID referenced by code and tests.
4. Its code and tests cite real spec IDs.
5. `npm run lid:check` passes.

## Work Sequence

| Step | Output | Completion Rule |
|------|--------|-----------------|
| 1 | `scripts/lid-check.mjs` | Script validates intent paths, spec IDs, design/spec pairs, and arrow references. |
| 2 | `package.json` script | `npm run lid:check` runs the script. |
| 3 | Audit decision notes | `docs/lid-audit-decisions.md` records decisions or backlog for each current gap. |
| 4 | Per-test spec plan | `docs/lid-test-spec-annotation-plan.md` documents test-level traceability before large annotation churn. |
| 5 | Arrow status update | Segment status changes only when audit criteria are met. |

## Current Check Result

`npm run lid:check` passes with 15 annotated files, 61 annotated spec IDs, 61 defined spec IDs, 6 design files, 6 spec files, and no style findings.
