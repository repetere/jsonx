# Express Rendering Specs

Status: brownfield draft

Design: `docs/intent/express-rendering/express-rendering-design.md`

| ID | Priority | EARS Requirement |
|----|----------|------------------|
| JSONX-EXPRESS-001 | P0 | The system shall expose `__express` and `renderFile` as Express-compatible JSONX view rendering functions. |
| JSONX-EXPRESS-002 | P0 | When a view file has a `.json` or `.jsonx` extension, the system shall read the file and evaluate it as a JSONX object literal. |
| JSONX-EXPRESS-003 | P0 | When a view file has another extension, the system shall read the file and evaluate it as JavaScript. |
| JSONX-EXPRESS-004 | P0 | When `options.__jsonx` is provided and no file module overrides it, the system shall render that JSONX module. |
| JSONX-EXPRESS-005 | P0 | When building resources from Express options, the system shall remove `__boundConfig`, `__DOCTYPE`, and `__jsonx` before rendering. |
| JSONX-EXPRESS-006 | P1 | When `options.__boundConfig` is provided, the system shall use it as the JSONX rendering context and default `disableRenderIndexKey` to false. |
| JSONX-EXPRESS-007 | P0 | When rendering succeeds, the system shall prepend the configured doctype or `<!DOCTYPE html>` when no doctype is configured. |
| JSONX-EXPRESS-008 | P0 | When a callback is provided, the system shall call it with `(null, template)` on success and with the error on failure; when no callback is provided, the system shall return the template or throw the error. |
| JSONX-EXPRESS-009 | P1 | When registered as an Express view engine, the system shall render JSONX views into HTTP responses using Express locals as JSONX resources. |

## Trace Links

Code: `src/express.ts`, `src/index.ts`

Tests: `src/express.test.ts`, `src/index.test.tsx`

