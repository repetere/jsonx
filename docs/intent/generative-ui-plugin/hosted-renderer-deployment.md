# JSONX Hosted Renderer Deployment

Status: Cloudflare Workers adapter implemented; production deployment and endpoint cutover pending

Last updated: 2026-10-02

## Cloudflare target

The Worker lives in `apps/jsonx-renderer-app/src/worker.mjs`, with app-local `wrangler.toml` and pinned dependencies. It uses the shared Web-standard core in `src/app.mjs`; Node filesystem and HTTP handling stay in `src/server.mjs`. Widget HTML, CSS, JavaScript, and optional GSAP are embedded in the build. No Node compatibility flag, storage binding, or model credential is required.

| Item | Value |
| --- | --- |
| Worker name | `jsonx-renderer-app` |
| Production URL | Pending actual Cloudflare deployment |
| Compatibility date | `2026-10-02` |
| Entry point | `.worker-build/worker.mjs` |
| Routes | `/`, `/healthz`, `/widget`, `/mcp` |
| Optional variables | `JSONX_ENABLE_GSAP`, `JSONX_WIDGET_DOMAIN` |

This document does not claim a Cloudflare endpoint is live. Active source endpoint defaults and July submission evidence still refer to Netlify until the replacement is deployed and verified.

## Build, test, and authorized deployment

Use Node 22:

```text
cd apps/jsonx-renderer-app
npm ci
npm run check
npm run validate:fixtures
npm run deploy:dry-run
```

`npm run check` includes actual workerd execution of the production bundle, with and without GSAP. It checks health, widget MIME/embedded assets, CORS, initialization/notifications, tool/resource metadata, nine valid and five unsafe payloads, malformed JSON, GET/DELETE, 404s, and concurrent stateless calls. `npm run check:node` separately preserves Node, Web handler, and Netlify bundle-layout regression checks.

The dry run builds `.worker-build/worker.mjs` and validates packaging without uploading. This standalone ES module is suitable for dashboard upload using the compatibility date and variables above. No external asset directory is needed. Do not commit build output or credentials.

Only after deployment access and authorization are available:

```text
npm run deploy:worker
npm run smoke:hosted -- --url https://<actual-worker-origin>
```

Use the origin from the verified deployment result. For GSAP-enabled deployment add `--gsap`; if a widget domain is configured add `--widget-domain <domain>`. Keep `wrangler.toml` variables aligned with deployment settings.

The manual workflow `.github/workflows/deploy-jsonx-renderer.yml` deploys only from `main`, after validation. It requires existing repository secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, plus a verified `expected_origin` input. Missing credentials stop it before deployment; it creates no credentials. Its live-smoke step uses default GSAP-off settings; update smoke flags together with future variable changes.

## Cutover checklist

1. Validate the Worker while retaining the Netlify adapter and historical evidence.
2. Deploy through authorized existing access. Record the actual origin, deployment/version identifier, source commit, and time here.
3. Run the complete hosted smoke contract. Compare metadata and payload behavior with the old endpoint. Verify configured motion and the widget in its host.
4. Update active defaults, links, submission instructions, and assertions together using the verified URL. Never relabel old Netlify responses as Cloudflare evidence.
5. Regenerate submission artifacts into a separate directory with `JSONX_HOSTED_MCP_URL` and `JSONX_HOSTED_WIDGET_URL` set to the new URLs; review before publishing. The generator deletes its output directory first. Preserve previous evidence in Git history or an archive. A `--skip-hosted-mcp` run is not live verification.
6. Reconnect the app to the new `/mcp` in ChatGPT developer mode and capture required prompt results. This is distinct from API smoke tests and does not imply public app approval.
7. Verify the published page, connected clients, and regenerated evidence use Cloudflare. Keep Netlify available until these checks pass.
8. Cancel the intended paid Netlify plan only after JSONX cutover is verified and the actual downgrade terms confirm all remaining sites and custom domains will be preserved, including `gpdoc-prod` and its `repetere.io` alias. Do not delete sites, domains, or the account. Record the plan cancellation separately; neither a code merge nor a plan downgrade means the Netlify deployments have been decommissioned.

### Active reference inventory

Update after a real Cloudflare URL is known:

- `apps/jsonx-renderer-app/README.md`
- `site/generative-ui.html` and its generated `docs/generative-ui.html` mirror
- Both `plugins/jsonx-generative-ui-plugin/README.md` and `plugins/claude-jsonx-generative-ui-plugin/README.md`
- `docs/intent/generative-ui-plugin/submission-readiness.md`, `github-issues.md`, and current instructions in `generative-ui-plugin-plan.md`
- `docs/intent/generative-ui-plugin/store-listings/openai-generative-ui-plugin-submission.json`
- `external-gate-evidence.template.json` and the pending-instruction note in `external-gate-evidence.json`
- Defaults in `prepare-submission-artifacts.mjs`, `check-external-gate-access.mjs`, `check-external-gate-evidence.mjs`, and `validate-external-gate-recorder.mjs`
- The example URL in `record-external-gate-evidence.mjs`
- Assertions in `check-public-review-kit.mjs`, `audit-generative-ui-goal.mjs`, and `plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs`

Scripts above live in `docs/intent/generative-ui-plugin/scripts/` unless another path is given. The goal audit currently checks a Netlify manifest and adapter; change it to distinguish current Cloudflare verification from dated historical evidence during cutover. The app submission draft contains no Netlify endpoint and needs no invented app ID. Package-boundary exclusions of `netlify/` remain useful safeguards.

## Historical Netlify deployment and rollback

Recorded verification: 2026-07-24. Retained for rollback during migration.

| Item | Value |
| --- | --- |
| Netlify project | `jsonx-renderer-app` |
| Site id | `210939ba-0ffe-4c5d-8074-bbc195518c1c` |
| Project URL | `https://app.netlify.com/projects/jsonx-renderer-app` |
| Production URL | `https://jsonx-renderer-app.netlify.app` |
| MCP URL | `https://jsonx-renderer-app.netlify.app/mcp` |
| Health URL | `https://jsonx-renderer-app.netlify.app/healthz` |
| Widget URL | `https://jsonx-renderer-app.netlify.app/widget` |
| Recorded verified deploy | `6a6305f3ea5f474b412d2f3e` |

Recorded checks covered health, widget, CORS, MCP initialize/list/read, valid renders, unsafe rejection, and Netlify secret scanning. `submission-artifacts/current/hosted-mcp-transcript.json` and companion manifests, access checks, generated listings, queues, and archives document those Netlify runs. Preserve their dates/content until a new evidence set is generated.

Run rollback builds from `apps/jsonx-renderer-app` using retained `netlify.toml` and its Node-only check command. The historical Netlify MCP upload flow required normalizing `//proxy/` to `/proxy/` after a 404. This procedure does not itself authorize deployment or cancellation.

## Open submission work

- Complete Cloudflare deployment and the cutover checklist
- Connect the verified new MCP URL in ChatGPT developer mode and capture prompts
- Add the approved app ID to `plugins/jsonx-generative-ui-plugin/.app.json` only after the app exists
- Run authenticated Claude Code smoke prompts for both split plugins before submission
- Record policy review and marketplace receipts with `record-external-gate-evidence.mjs`
