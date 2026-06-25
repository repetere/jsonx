# Component Factories Specs

Status: brownfield draft

Design: `docs/intent/component-factories/component-factories-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-COMP-001 | P0 | The system shall expose a component map containing React fragment, suspense, DOM component factories, and configured window custom elements. |
| JSONX-COMP-002 | P1 | When advanced binding is supported and bounded component names are provided, the system shall bind those components to the current JSONX context. |
| JSONX-COMP-003 | P0 | When a JSONX component is a function or a valid DOM element name, the system shall resolve it without a custom component lookup. |
| JSONX-COMP-004 | P0 | When a JSONX component name exists in `reactComponents`, the system shall resolve that custom component. |
| JSONX-COMP-005 | P0 | When a JSONX component name references a configured component library path, the system shall resolve the matching library component. |
| JSONX-COMP-006 | P0 | If a component cannot be resolved, the system shall throw a `ReferenceError` and log details when debug mode is enabled. |
| JSONX-COMP-007 | P1 | When a function body and argument list are provided, the system shall create a callable function and apply the requested function name when present. |
| JSONX-COMP-008 | P0 | When a class component definition includes a render body, the system shall create a React class component or factory that renders JSONX with configured props, state, resources, and lifecycle functions. |
| JSONX-COMP-009 | P0 | When a function component definition is provided, the system shall create a React function component with access to React hooks, JSONX rendering, resources, and configured binding. |
| JSONX-COMP-010 | P1 | When a dynamic component has a fetch URL, the system shall render loading output until data resolves, cache transformed data by URL and fetch options when enabled, render loaded JSONX with fetched resources, and render error output on failure. |
| JSONX-COMP-011 | P1 | When a form component is rendered, the system shall create a react-hook-form context, expose ReactHookForm library components, and render the configured form wrapper and form content. |
| JSONX-COMP-012 | P1 | When custom component definitions are provided, the system shall generate custom React components or libraries and reuse cached generated components for the same component list. |

## Trace Links

Code: `src/components.ts`

Tests: `src/components.test.tsx`, `src/html.test.ts`
