# Distribution Types Design

Status: brownfield draft

Source: `esbuild.config.js`, `src/types/jsonx/index.ts`, `src/types/jsonx/*.ts`, `package.json`, `tsconfig.json`

Tests: compile and build commands

## Responsibility

Distribution types cover TypeScript declarations, CommonJS bundle, ESM bundle, browser IIFE bundles, browser core bundles with React globals, sourcemaps, legacy target bundles, and watch-mode builds.

## Requirements Covered

JSONX-DIST-001 through JSONX-DIST-008

## Public Interface

| Interface | Purpose | Traces |
|-----------|---------|--------|
| `esbuild.config.js` | Build browser and server bundles. | JSONX-DIST-001 to JSONX-DIST-003, JSONX-DIST-005 to JSONX-DIST-008 |
| `src/types/jsonx/index.ts` | Re-export public JSONX types. | JSONX-DIST-004 |
| `package.json` entrypoints | Point consumers at generated outputs. | JSONX-DIST-001 to JSONX-DIST-007 |

## Outputs

The build emits browser minified and unminified IIFE bundles, browser core bundles that use React and ReactDOM globals, a legacy ES6 browser core target, a Node CJS bundle, and a Node ESM bundle. TypeScript emits declarations into `build/`.

## Edge Cases

| Scenario | Expected Behavior | Trace |
|----------|-------------------|-------|
| Watch flag is present | Use esbuild watch mode. | JSONX-DIST-008 |
| Browser core bundle is used | Expect React and ReactDOM globals. | JSONX-DIST-003 |
| Server bundle is used | Externalize server runtime dependencies. | JSONX-DIST-006, JSONX-DIST-007 |
| Type declarations are emitted | Expose public JSONX type index. | JSONX-DIST-004 |

## Decisions and Backlog

| Item | Note | Status |
|------|------|--------|
| DIST-DD-001 | Keep multiple bundle formats because package metadata exposes them. | Accepted |
| DIST-DD-002 | Keep React and ReactDOM external in server builds. | Accepted |
| OQ-001 | Decide whether non-minified and minified legacy core builds should write separate paths. | Backlog |
