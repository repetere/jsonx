# Component Factories Design

Status: brownfield draft

Source: `src/components.ts`

Tests: `src/components.test.tsx`, `src/html.test.ts`

## Responsibility

Component factories resolve component names and component definitions into React-compatible components. This includes DOM components, custom component maps, component libraries, generated class components, generated function components, dynamic fetch-backed components, form components, contexts, and generated custom component caches.

## Requirements Covered

JSONX-COMP-001 through JSONX-COMP-012

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `componentMap` | Default registry for Fragment, Suspense, DOM factories, and window custom elements. | JSONX-COMP-001 |
| `getBoundedComponents(options)` | Bind selected components to the current context. | JSONX-COMP-002 |
| `getComponentFromMap(options)` | Resolve direct functions, DOM names, custom components, or library components. | JSONX-COMP-003 to JSONX-COMP-006 |
| `getFunctionFromEval(options)` | Create a callable function from a body and args. | JSONX-COMP-007 |
| `getReactClassComponent(reactComponent, options)` | Create class-style React components from JSONX lifecycle definitions. | JSONX-COMP-008 |
| `getReactFunctionComponent(reactComponent, functionBody, options)` | Create function components with hooks and JSONX rendering access. | JSONX-COMP-009 |
| `DynamicComponent(props)` | Fetch, cache, transform, and render data-backed JSONX. | JSONX-COMP-010 |
| `FormComponent(props)` | Render JSONX inside react-hook-form context. | JSONX-COMP-011 |
| `getReactLibrariesAndComponents(customComponents)` | Generate and cache custom components or libraries. | JSONX-COMP-012 |

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| Component is a function | Return it directly. | JSONX-COMP-003 |
| Component is a DOM name | Return the DOM string. | JSONX-COMP-003 |
| Component is not found | Throw and optionally log. | JSONX-COMP-006 |
| Class definition lacks render | Throw `ReferenceError`. | JSONX-COMP-008 |
| Function body is missing | Throw `SyntaxError`. | JSONX-COMP-008 |
| Dynamic component lacks `fetchURL` | Return `null`. | JSONX-COMP-010 |
| Dynamic fetch fails | Render configured error JSONX. | JSONX-COMP-010 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| COMP-DD-001 | Keep string-generated components because tests cover them. | Accepted |
| COMP-DD-002 | Cache custom components by concatenated component names. | Accepted |
| OQ-001 | Consider including fetch options in dynamic component cache keys. | Backlog |
