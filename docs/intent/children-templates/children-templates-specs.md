# Children Templates Specs

Status: brownfield draft

Design: `docs/intent/children-templates/children-templates-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-CHILDREN-001 | P0 | When `jsonx.children` is present, the system shall use it as the element's child value unless `_children` overrides it. |
| JSONX-CHILDREN-002 | P0 | When `props._children` is present and is a string, number, or array, the system shall use it as the element's child value. |
| JSONX-CHILDREN-003 | P0 | When `jsonx.children` is undefined and `props.children` is present, the system shall use `props.children` as the element's child value. |
| JSONX-CHILDREN-004 | P0 | If no valid child source exists, the system shall return `null` from child property selection or `undefined` from child rendering. |
| JSONX-CHILDREN-005 | P1 | When `passprops` is enabled, the system shall merge parent props into child JSONX props while allowing child props to override passed values. |
| JSONX-CHILDREN-006 | P0 | When children are an array of JSONX objects, the system shall recursively render each child and filter null child results. |
| JSONX-CHILDREN-007 | P1 | When child formatting flags are present, the system shall convert child values using JSON.stringify, `toString`, Numeral formatting, JavaScript Date formatting, or ISO date formatting as requested. |
| JSONX-CHILDREN-008 | P1 | When `___template` is present, the system shall load the external JSONX template, cache it by effective load type and template path, and allow the cache to be cleared. |
| JSONX-CHILDREN-009 | P1 | When browser template fetching is used, the system shall send a synchronous request with configured method, headers, and body, and throw on non-200 responses. |
| JSONX-CHILDREN-010 | P1 | If child rendering fails, the system shall return `null` and log details when debug mode is enabled. |

## Trace Links

Code: `src/children.ts`

Tests: `src/children.test.ts`
