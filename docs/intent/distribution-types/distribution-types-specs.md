# Distribution Types Specs

Status: brownfield draft

Design: `docs/intent/distribution-types/distribution-types-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-DIST-001 | P0 | When the build runs, the system shall emit a minified browser IIFE bundle with global name `jsonx`. |
| JSONX-DIST-002 | P0 | When the build runs, the system shall emit an unminified browser IIFE bundle with sourcemap support. |
| JSONX-DIST-003 | P1 | When browser core bundles are built, the system shall treat React and ReactDOM as external globals. |
| JSONX-DIST-004 | P0 | When TypeScript declarations are emitted, the system shall expose the public JSONX type index through `src/types/jsonx/index.ts`. |
| JSONX-DIST-005 | P1 | When legacy browser core output is built, the system shall target ES6-compatible output. |
| JSONX-DIST-006 | P0 | When the server CommonJS bundle is built, the system shall externalize server runtime dependencies and write `dist/index.cjs`. |
| JSONX-DIST-007 | P0 | When the server ESM bundle is built, the system shall externalize server runtime dependencies and write `dist/index.esm.js`. |
| JSONX-DIST-008 | P1 | When the build is run with watch flags, the system shall use esbuild watch mode instead of one-shot builds. |

## Trace Links

Code: `esbuild.config.js`, `src/types/jsonx/index.ts`, `package.json`, `tsconfig.json`

Tests: `npm run compile`, `npm run build`

