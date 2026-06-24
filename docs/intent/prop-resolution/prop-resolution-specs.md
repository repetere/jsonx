# Prop Resolution Specs

Status: brownfield draft

Design: `docs/intent/prop-resolution/prop-resolution-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-PROPS-001 | P0 | When a JSONX prop group defines string or array paths, the system shall resolve those paths against the selected data object and return `undefined` for missing paths. |
| JSONX-PROPS-002 | P0 | When computed props are requested, the system shall merge static props, context props, state props, resource props, async props, window props, evaluated props, inserted components, and generated component props in the documented order. |
| JSONX-PROPS-003 | P0 | When `comparisonprops` are present, the system shall evaluate supported comparison operators and decide whether the component should render. |
| JSONX-PROPS-004 | P0 | When evaluated prop declarations are present, the system shall evaluate or bind declared functions and expose results as prop values, using debug behavior for evaluation failures. |
| JSONX-PROPS-005 | P0 | When component insertion declarations are present, the system shall insert rendered JSONX elements, resolved React components, generated function components, or generated class components as prop values. |
| JSONX-PROPS-006 | P1 | When legacy function or window component declarations are present, the system shall resolve callable functions or window custom elements into prop values. |
| JSONX-PROPS-007 | P1 | When `__spreadComponent` is present, the system shall map each item in `__spread` into `_children` JSONX child definitions and return a debug error string when `__spread` is missing in debug mode. |
| JSONX-PROPS-008 | P0 | When JSONX validation or simple syntax conversion is requested, the system shall validate structure, dynamic prop declarations, evaluated prop declarations, function prop declarations, display declarations, and shorthand syntax according to current JXM rules. |
| JSONX-PROPS-009 | P1 | When applied props such as `useformregister`, `useremoveprops`, or `useincludeprops` are present, the system shall add register props, remove named props, or return only included props as requested. |
| JSONX-PROPS-010 | P1 | If prop resolution encounters unsupported input, missing references, or dynamic execution failures, the system shall return undefined values, debug error values, or `null` according to the failing branch's current behavior. |

## Trace Links

Code: `src/props.ts`, `src/utils.ts`

Tests: `src/props.test.ts`, `src/util.test.ts`

