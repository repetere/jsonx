# Core Rendering Specs

Status: brownfield draft

Design: `docs/intent/core-rendering/core-rendering-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-CORE-001 | P0 | When a caller provides a valid JXM object with `component`, `props`, and `children`, JSONX shall return a React element for the resolved component. |
| JSONX-CORE-002 | P0 | When a caller provides simple JSONX syntax with a single component key, JSONX shall normalize it into standard JXM before rendering. |
| JSONX-CORE-003 | P0 | If JSONX input is missing or has no component after normalization, JSONX shall return `null` for missing input or a span element for missing component data. |
| JSONX-CORE-004 | P0 | If component resolution fails, JSONX shall throw the component resolution error unless debug mode is enabled. |
| JSONX-CORE-005 | P0 | When rendering a JSONX element, JSONX shall resolve the target component, computed props, and children before calling `React.createElement`. |
| JSONX-CORE-006 | P0 | If `comparisonprops` evaluate to false for an element, JSONX shall return `null` instead of rendering that element. |
| JSONX-CORE-007 | P0 | When `returnJSON` is true, JSONX shall return `{ type, props, children }` JSON IR instead of a React element. |
| JSONX-CORE-008 | P1 | When `jsonx.test` is true, JSONX shall return formatted diagnostic JSON containing element, props, and children. |
| JSONX-CORE-009 | P0 | When a caller requests HTML output, JSONX shall render the JSONX or JSON IR input through `ReactDOMServer.renderToString`. |
| JSONX-CORE-010 | P0 | When a caller requests JSON output or provides JSON IR, JSONX shall preserve `type`, `props`, and recursively rendered `children` in the intermediate representation. |
| JSONX-CORE-011 | P1 | When a caller requests JSX output or compiles JSONX, JSONX shall use JSON IR to produce JSX text or a React function component. |
| JSONX-CORE-012 | P0 | When a caller renders into the DOM, JSONX shall require a valid React element and target DOM node before using ReactDOM portal or `createRoot` rendering, and shall return the created React root or portal value for caller cleanup. |

## Trace Links

Code: `src/index.ts`

Tests: `src/index.test.tsx`, `src/html.test.ts`
