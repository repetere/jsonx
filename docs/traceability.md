# JSONX LID Traceability

Status: brownfield draft

This report maps current LID annotations to the brownfield intent docs.

## Coverage Summary

| Segment | Specs | Design | Code Annotation | Test Annotation | Status |
|---------|-------|--------|-----------------|-----------------|--------|
| Core Rendering | 12 | Yes | Yes | Yes | AUDITED |
| Component Factories | 12 | Yes | Yes | Yes | AUDITED |
| Prop Resolution | 10 | Yes | Yes | Yes | AUDITED |
| Children Templates | 10 | Yes | Yes | Yes | AUDITED |
| Express Rendering | 10 | Yes | Yes | Yes | AUDITED |
| Distribution Types | 9 | Yes | Yes | Build command and artifact-check based | AUDITED |

Total defined specs: 63

## Deterministic Checks Expected

1. Every intent annotation path in source or tests exists.
2. Every `@spec JSONX-*` ID in source or tests is defined in a specs file.
3. Every specs file has a matching segment design file.
4. Every segment in `docs/arrows/index.yaml` points to existing design, spec, code, and test references.

## Known Brownfield Gaps

| Gap | Segment | Impact | Suggested Follow-Up |
|-----|---------|--------|---------------------|
| Specs are derived from code and tests. | All | Maintainer intent may differ from observed behavior. | Accepted as brownfield intent in `docs/lid-audit-decisions.md`; behavior changes remain backlog. |
| Tests cite specs only at file header level. | All tested segments | Individual test cases are not mapped one-to-one to specs. | Add per-test spec comments during future test edits. |

## Follow-Up Records

- Audit decisions: `docs/lid-audit-decisions.md`
- Per-test annotation plan: `docs/lid-test-spec-annotation-plan.md`
- Implementation checklist: `docs/lid-implementation-plan.md`
