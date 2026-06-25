# JSONX High-Level Design

Status: brownfield draft

Scope: full repository runtime and package surface

Source basis: existing TypeScript source, tests, package metadata, and current spec annotations.

## Design Goals

| Priority | Goal | Rationale |
|----------|------|-----------|
| 1 | Preserve JSONX public behavior | JSONX is an npm package with existing consumers. The first LID pass should describe current behavior before changing it. |
| 2 | Keep rendering behavior traceable | Rendering crosses component lookup, prop resolution, child rendering, and output conversion. Each behavior needs a stable spec ID. |
| 3 | Keep browser and Node behavior explicit | JSONX publishes browser bundles, server bundles, declarations, and Express rendering support. |
| 4 | Document unsafe extension points plainly | JSONX intentionally executes caller-provided code through dangerous eval and template paths. |

## Non-Goals

| Non-Goal | Rationale |
|----------|-----------|
| Redesign the JSONX API | This pass maps the brownfield code. |
| Remove legacy JXM features | Tests still cover legacy properties such as `__functionProps`. |
| Replace React | React and ReactDOM are core dependencies. |
| Sandbox dynamic execution | The current API treats eval inputs and JS templates as trusted caller input. |
| Rewrite generated output | `build/`, `dist/`, and generated API docs are outside this doc-only pass. |

## Architecture Overview

JSONX uses a functional rendering pipeline:

1. Accept JXM or simple JSONX input.
2. Normalize `type` to `component` and expand simple syntax.
3. Resolve the component.
4. Resolve computed props.
5. Resolve children.
6. Produce a React element, JSON IR, JSX string, HTML string, DOM render, or Express view output.

```text
JXM / Simple JSONX
       |
       v
src/index.ts
  |-- src/components.ts  component lookup and generated components
  |-- src/props.ts       computed props and dynamic props
  |-- src/children.ts    children, templates, formatting
  |-- src/utils.ts       traversal, validation, comparison, syntax helpers
  |-- src/express.ts     Express view rendering
  `-- React / ReactDOM / ReactDOMServer

esbuild.config.js and src/types/jsonx/*
  publish browser, server, and TypeScript surfaces
```

## Component Overview

| Segment | Responsibility | Design | Specs |
|---------|----------------|--------|-------|
| Core Rendering | Public rendering and conversion entry points. | `docs/intent/core-rendering/core-rendering-design.md` | `docs/intent/core-rendering/core-rendering-specs.md` |
| Component Factories | Component lookup and generated React components. | `docs/intent/component-factories/component-factories-design.md` | `docs/intent/component-factories/component-factories-specs.md` |
| Prop Resolution | Static, dynamic, evaluated, inserted, filtered, and display props. | `docs/intent/prop-resolution/prop-resolution-design.md` | `docs/intent/prop-resolution/prop-resolution-specs.md` |
| Children Templates | Child precedence, formatting, templates, caching, and recursive child rendering. | `docs/intent/children-templates/children-templates-design.md` | `docs/intent/children-templates/children-templates-specs.md` |
| Express Rendering | Express-compatible view rendering adapter. | `docs/intent/express-rendering/express-rendering-design.md` | `docs/intent/express-rendering/express-rendering-specs.md` |
| Distribution Types | Type declarations and package bundle outputs. | `docs/intent/distribution-types/distribution-types-design.md` | `docs/intent/distribution-types/distribution-types-specs.md` |

## Design Decisions

| ID | Decision | Choice | Rationale |
|----|----------|--------|-----------|
| DD-001 | Brownfield segmentation | Use existing intent annotation paths as the segment boundary. | Accepted brownfield intent. The source already names six LID segments. |
| DD-002 | Rendering API shape | Keep plain functions with `this` context configuration. | Accepted brownfield intent. Tests and consumers call exported functions with bound contexts. |
| DD-003 | Dynamic execution | Keep dangerous eval and JS-template behavior as trusted-caller behavior. | Accepted brownfield intent. Tests and docs cover these paths. |
| DD-004 | Component extensibility | Keep DOM, function, custom map, library, generated component, and window-global lookup. | Accepted brownfield intent. This is current public behavior. |
| DD-005 | Build outputs | Keep TypeScript, CJS, ESM, browser, browser core, and legacy browser outputs. | Accepted brownfield intent. `package.json` and `esbuild.config.js` expose them. |

## Cross-Cutting Concerns

Error handling is mixed by design. Core invalid components throw unless debug mode returns an error string. Child rendering catches errors and returns `null`. Prop resolution can return `null`, undefined values, or debug error values depending on the failing branch. Express rendering calls the callback with errors when a callback is provided and throws otherwise.

The JXM object is mutable. Rendering can update `jsonx.component`, `jsonx.children`, and props before React receives the result.

Security depends on trusted input. `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps`, `__dangerouslyEvalAllProps`, inline function props, JavaScript view files, and generated component bodies execute caller-provided code.

Observability is limited to caller-provided `logError`, debug flags, and console logging.

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Specs overstate observed behavior | Medium | Medium | Use `docs/lid-audit-decisions.md` to record accepted intent and backlog decisions. |
| Eval behavior is unsafe with untrusted input | High | High | Document trusted-input boundary and avoid untrusted JSONX definitions. |
| React version changes alter behavior | High | Medium | Keep React-facing tests and build checks current. |
| Source annotations cite missing or stale specs | Medium | Medium | Run the traceability check after doc or source changes. |
| Generated artifacts drift from source | Medium | Medium | Regenerate build and docs only when source changes require it. |
