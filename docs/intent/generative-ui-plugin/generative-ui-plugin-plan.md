# JSONX Generative UI Plugin Plan

Status: implementation in progress

Last updated: 2026-07-24

Related plan: `docs/intent/generative-ui-site/generative-ui-site-plan.md`

## Goal

Build a JSONX generative UI workflow that works in two places:

- A hosted Apps SDK renderer that lets ChatGPT render JSONX as inline UI.
- A Codex plugin that packages the JSONX workflow, schema, validation, fixtures, and local handoff behavior for Codex users.

The product boundary is important. The Codex plugin should not try to make Codex itself an inline UI host. Codex should generate, validate, test, and hand off JSONX payloads. Inline UI in ChatGPT should come from the hosted MCP-backed Apps SDK app.

Keep the core JSONX agent workflow separate from the generative UI workflow:

- Core JSONX skills help agents use JSONX/JXM for React, JSX, HTML, Express rendering, examples, and package validation.
- Generative UI skills help agents decide when a model response should become a validated UI payload.

This separation lets users install JSONX help without opting into generated interface output.

Current implementation baseline:

- `apps/jsonx-renderer-app/` contains a runnable stateless MCP app for local developer-mode testing.
- `apps/jsonx-renderer-app/` supports optional renderer-owned GSAP motion with `JSONX_ENABLE_GSAP=1`.
- `apps/jsonx-renderer-app/netlify/functions/jsonx-renderer.mjs` and `apps/jsonx-renderer-app/netlify.toml` provide a Netlify serverless deployment path for HTTPS hosting.
- `plugins/jsonx-codex-plugin/` contains the core JSONX Codex plugin package.
- `plugins/jsonx-generative-ui-plugin/` contains the JSONX generative UI Codex plugin package.
- `plugins/claude-jsonx-plugin/` contains the core JSONX Claude Code plugin package.
- `plugins/claude-jsonx-generative-ui-plugin/` contains the JSONX generative UI Claude Code plugin package.
- `skills/codex/`, `skills/claude/`, and `skills/opencode/` contain installable skill source folders.
- `skills/scripts/install-jsonx-skill.mjs` installs the `jsonx` and `jsonx-generative-ui` skill families for Codex, Claude Code, or OpenCode without mixing the two workflows.
- `docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs` creates review packages, store listing drafts, screenshots, golden-prompt evidence, renderer motion evidence, browser demo mode evidence, hosted MCP evidence, skill installer evidence, isolated Codex marketplace install evidence, Claude Code validation evidence, OpenCode skill discovery evidence, external gate evidence, a requirement audit, hashes, and npm package-boundary evidence under `docs/intent/generative-ui-plugin/submission-artifacts/current/`.
- The generated `submission-queue.json` and `submission-queue.md` files turn the four store listing drafts into a submitter checklist with package URLs, public evidence URLs, manual checks, and receipt fields.
- `docs/intent/generative-ui-plugin/scripts/check-external-gate-evidence.mjs` initializes, validates, and summarizes the external gate evidence file without running the full artifact generator.
- `docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs` records external app IDs, transcript status, Claude smoke results, policy review, and marketplace receipts into the same evidence schema.
- `docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs` validates public evidence URL coverage in store listing drafts and can check live `jsonx.net` URLs after Pages deploys.
- `.github/workflows/generative-ui-plugin.yml` runs app, plugin, fixture, submission package, and npm package-boundary checks in CI.
- `docs/intent/generative-ui-plugin/submission-readiness.md` tracks what remains before public app or plugin submission.

## Positioning

Frame the architecture as:

> No long-running server we operate by hand.

Do not frame it as:

> No MCP server exists.

Apps SDK UI still needs an MCP-backed app. The MCP layer is how ChatGPT discovers tools, receives `structuredContent`, and loads the iframe widget resource. The JSONX server can be stateless and small: no database, no user state, no queue, and no business backend. It provides tool metadata, validation, and the renderer resource.

## Architecture

```text
ChatGPT / Apps SDK
  -> calls render_jsonx_response MCP tool
  -> tool returns jsonx.generative-ui.v1 structuredContent
  -> ChatGPT loads JSONX renderer widget iframe
  -> widget validates and renders JSONX client-side
```

The hosted app should be deployable to Cloudflare Workers, Vercel, Netlify, Fly, Render, or another HTTPS platform. The first implementation has a Netlify serverless path so the team manages code and configuration, not a long-running process.

## Deliverables

### 1. Installable agent skills

Ship skills for Codex, Claude Code, and OpenCode with two separate skill families:

- `jsonx`: core JSONX/JXM package usage, rendering, examples, tests, and docs.
- `jsonx-generative-ui`: conditional generated UI, safe payloads, local handoff files, and hosted renderer workflow.

Install paths:

| Surface | Project install path | Personal install path | Notes |
| --- | --- | --- | --- |
| Codex | `.agents/skills/<name>/SKILL.md` | `~/.agents/skills/<name>/SKILL.md` | Package through a Codex plugin when distributing beyond one repo. |
| Claude Code | `.claude/skills/<name>/SKILL.md` | `~/.claude/skills/<name>/SKILL.md` | Skills can also be bundled in a Claude Code plugin. |
| OpenCode | `.opencode/skills/<name>/SKILL.md` | `~/.config/opencode/skills/<name>/SKILL.md` | OpenCode also discovers `.claude/skills` and `.agents/skills`. |

The repo should keep source skill folders under `skills/<surface>/<skill-name>/` and publish install snippets on the GitHub Pages site. Generated plugin and app assets must stay outside the npm package.

Installer command:

```text
node skills/scripts/install-jsonx-skill.mjs --surface <codex|claude|opencode> --skill <jsonx|jsonx-generative-ui|all> --scope <personal|project>
```

The installer should reject existing destination folders unless `--force` is passed. It should support `--dry-run` for documentation and CI checks.

### 2. Shared JSONX UI contract

Keep one contract across the hosted app, Codex plugin, VS Code renderer, browser demo, and tests.

Envelope:

```json
{
  "schema": "jsonx.generative-ui.v1",
  "purpose": "string",
  "payload": {}
}
```

Core allowlist:

- `MultipleChoiceQuiz`
- `SliderPoll`
- `ChoiceList`
- `DemoShell`
- `SectionHeader`
- `MetricRow`
- `DataTable`
- `Checklist`
- `ActionPanel`
- `Timeline`
- `Alert`
- `TextBlock`

Validation should reject unknown components, unknown props, raw HTML, inline event handler props, arbitrary CSS, arbitrary imports, eval-style fields, oversized payloads, and payloads that exceed the maximum tree depth.

Animation should be optional and renderer-owned. A payload can request a named motion profile only after the schema supports it, but the renderer chooses the implementation. The model must not return GSAP code, CSS animation code, arbitrary easing functions, or raw style values.

Allowed motion profile examples:

- `none`
- `subtle-enter`
- `morph-list-to-detail`
- `state-change-highlight`

### 3. Apps SDK renderer

Build a stateless MCP app with one read-only render tool:

```text
render_jsonx_response
```

Input:

```json
{
  "purpose": "string",
  "payload": {}
}
```

Output:

```json
{
  "structuredContent": {
    "schema": "jsonx.generative-ui.v1",
    "purpose": "string",
    "payload": {}
  },
  "content": [
    {
      "type": "text",
      "text": "Rendered JSONX UI."
    }
  ]
}
```

Tool requirements:

- Define `inputSchema` and `outputSchema`.
- Mark the tool read-only.
- Attach the renderer resource through `_meta.ui.resourceUri`.
- Serve the widget resource as `text/html;profile=mcp-app`.
- Keep `structuredContent` compact because the model reads it.
- Put any widget-only details in `_meta` only when needed.
- Return clear validation errors for bad payloads.

Local developer-mode implementation:

- Package: `apps/jsonx-renderer-app/`
- Local MCP URL: `http://localhost:8787/mcp`
- Health check: `http://localhost:8787/healthz`
- Widget preview: `http://localhost:8787/widget`
- Validation command: `npm run check` from `apps/jsonx-renderer-app/`

Netlify deployment path:

- Base directory: `apps/jsonx-renderer-app`
- Build command: `npm run check`
- Publish directory: `public`
- Function entrypoint: `netlify/functions/jsonx-renderer.mjs`
- Hosted MCP URL after deploy: `https://<site>.netlify.app/mcp`

### 4. Iframe renderer widget

The widget should listen for `ui/notifications/tool-result`, read `structuredContent`, validate the JSONX envelope, and render the payload inside the iframe.

Rules:

- Treat JSONX as data, not code.
- Do not use `eval`.
- Do not import arbitrary components.
- Do not render unknown components.
- Do not render raw HTML.
- Keep interaction state local to the widget unless a follow-up product need requires persistence.
- Use `ui/update-model-context` only for compact summaries that the model needs, such as quiz score, selected choice, slider value, or clicked action.
- If animation is enabled, use renderer-owned GSAP timelines with `prefers-reduced-motion` support.
- Prefer transform and opacity animation over layout-heavy properties.

MVP components:

- `TextBlock`
- `Checklist`
- `ChoiceList`
- `DataTable`
- `Alert`

Beta components:

- `MultipleChoiceQuiz`
- `SliderPoll`
- `ActionPanel`
- `MetricRow`
- `Timeline`
- `DemoShell`

Optional animation:

- Use GSAP only inside the hosted widget or local preview renderer.
- Bundle GSAP with the app package or load it from an approved resource domain.
- Do not add GSAP to the main `jsonx` npm package dependencies.
- Treat motion as progressive enhancement. Rendering must work with animation disabled.
- Keep model-visible payloads declarative. Example: `motionProfile: "subtle-enter"`, not animation code.
- The local renderer enables GSAP with `JSONX_ENABLE_GSAP=1`; otherwise it uses CSS fallback motion.

### 5. Codex plugin packages

Codex should have two installable plugin packages so users can install core JSONX help without generated UI instructions:

- `jsonx-codex-plugin`: core JSONX/JXM package workflow.
- `jsonx-generative-ui-plugin`: generated UI workflow, fixtures, validator, hosted renderer handoff, and optional app wiring notes.

Core package layout:

```text
jsonx-codex-plugin/
  .codex-plugin/
    plugin.json
  skills/
    jsonx/
      SKILL.md
```

Generative UI package layout:

```text
jsonx-generative-ui-plugin/
  .codex-plugin/
    plugin.json
  skills/
    jsonx-generative-ui/
      SKILL.md
  .app.json
  .mcp.json
  assets/
  scripts/
    validate-jsonx-ui.*
  fixtures/
    text-block.json
    checklist.json
    choice-list.json
    data-table.json
    alert.json
    quiz.json
    slider-poll.json
    bad-unknown-component.json
    bad-blocked-prop.json
    bad-event-handler.json
    bad-motion-profile.json
    bad-oversized.json
```

Core plugin responsibilities:

- Keep `jsonx` as the only bundled skill.
- Help Codex work with package APIs, JXM examples, rendering behavior, tests, and docs.
- Avoid Apps SDK app wiring, generated UI fixtures, hosted renderer assumptions, and GSAP guidance.

Generative UI plugin responsibilities:

- Tell Codex when to generate UI and when to answer normally.
- Generate `jsonx.generative-ui.v1` payloads.
- Validate payloads before presenting them as usable output.
- Write local handoff files to `.jsonx/ui/<short-purpose>.json`.
- Reference the hosted Apps SDK app through `.app.json` once the approved app ID exists.
- Optionally include `.mcp.json` for local validation or development workflows.
- Include fixtures and a validation script so users can test the contract without ChatGPT inline UI.
- Remain installable separately from the core JSONX plugin.

The plugin should start as a local or workspace plugin. Public submission should wait until the hosted app has screenshots, test prompts, privacy policy, terms link, and stable metadata.

### 6. Claude Code and OpenCode packages

Package the same workflows for Claude Code and OpenCode:

- Claude Code project skills under `skills/claude/<skill-name>/`.
- Core Claude Code plugin under `plugins/claude-jsonx-plugin/`.
- Generative UI Claude Code plugin under `plugins/claude-jsonx-generative-ui-plugin/`.
- OpenCode project skills under `skills/opencode/<skill-name>/`.
- Separate Claude Code plugin submission plans for JSONX core and generative UI when the package format and review path are ready.
- OpenCode install documentation that uses first-party `SKILL.md` discovery instead of a separate plugin unless there is a real need.

Submission work should keep the surfaces separate:

- JSONX core plugin or skill: package usage, rendering APIs, examples, tests.
- JSONX generative UI plugin or skill: schema, validation, Apps SDK renderer, local handoff, safety profile, optional animation.

### 7. Preserve local IDE and terminal workflow

Codex, Claude Code, and terminal agents should continue to support local JSONX handoff files:

```text
.jsonx/ui/<short-purpose>.json
```

This supports VS Code rendering and local previews without requiring ChatGPT inline UI. It also keeps the JSONX contract portable across IDE, terminal, browser demo, and hosted app contexts.

### 8. GitHub Pages updates

Update the JSONX GitHub Pages site after the new skills, plugin scaffold, and hosted app scaffold exist:

- Add install snippets for Codex, Claude Code, and OpenCode.
- Split core JSONX skills from generative UI skills.
- Link to the core and generative UI plugin folders once they are in the repo.
- Describe the hosted Apps SDK renderer as the inline UI path.
- Mention optional renderer-owned animation as a plugin/app feature, not a core package dependency.

## Implementation Phases

### Phase 1: Contract and Fixtures

- Define a shared schema for `jsonx.generative-ui.v1`.
- Define size limits, depth limits, and max array lengths.
- Move the allowlist into a shared validator.
- Add fixtures for valid and invalid payloads.
- Add tests that run the same fixtures against browser, hosted app, and VS Code validation paths.
- Confirm plugin, app, and fixture artifacts are excluded from the npm package.

Exit criteria:

- All fixtures produce expected validation results.
- The browser demo and VS Code renderer can use the same schema rules or generated schema artifact.

### Phase 2: Hosted MCP App MVP

- Create the stateless MCP server.
- Add the `render_jsonx_response` tool.
- Add `inputSchema`, `outputSchema`, and read-only annotations.
- Register the renderer HTML resource.
- Attach `_meta.ui.resourceUri` to the tool descriptor.
- Return validated `structuredContent` and a short text fallback.
- Add a Web-standard handler and serverless deployment adapter.
- Run MCP Inspector against local development.

Exit criteria:

- MCP Inspector can list the tool, call it with fixtures, and render the widget.
- Bad payloads fail with actionable validation errors.
- The app can be reached over HTTPS through a tunnel or preview deployment.

### Phase 3: Renderer Widget MVP

- Build the iframe renderer.
- Listen for `ui/notifications/tool-result`.
- Render the MVP component set.
- Add empty, error, invalid, and unsupported states.
- Keep all UI state local to the widget.

Exit criteria:

- Golden prompts render stable UI in ChatGPT developer mode.
- Widget renders without CSP errors.
- Unsupported components fail closed.

### Phase 4: Codex Plugin MVP

- Create `.codex-plugin/plugin.json`.
- Add the `jsonx` and `jsonx-generative-ui` skills.
- Add fixtures and validation scripts.
- Add `.app.json` after the hosted app has an app ID.
- Add optional `.mcp.json` only if local development needs it.
- Add local marketplace metadata for testing.

Exit criteria:

- The plugin installs locally.
- Codex can use the skill to generate or write a valid JSONX handoff file.
- The plugin metadata points to the hosted app when inline UI is available.

### Phase 5: Claude Code and OpenCode Skill Packages

- Add `jsonx` and `jsonx-generative-ui` skills for Claude Code.
- Add `jsonx` and `jsonx-generative-ui` skills for OpenCode.
- Add install snippets for project and personal installs.
- Add installer tooling so the two skill families can be copied without manual path mistakes.
- Keep generated UI instructions separate from core package instructions.

Exit criteria:

- Each surface has installable core JSONX and generative UI skills.
- The public site explains which skill to install for each workflow.
- The installer can dry-run and install to a temporary target for each supported surface.
- Skill validation passes for every `SKILL.md`.

### Phase 6: Optional Animation Layer

- Add a declarative motion profile field to the schema only after MVP rendering is stable.
- Implement GSAP animation in the renderer, not in model output.
- Add reduced-motion behavior.
- Add transition states for component entry, state changes, and list-to-detail changes.
- Keep animation out of the core npm package dependency graph.

Exit criteria:

- Rendering works with animation enabled or disabled.
- Motion profiles are allowlisted and validated.
- Users with reduced motion preferences get minimal or no animation.
- npm pack checks prove GSAP is not included in the root `jsonx` package.

### Phase 7: Beta Components and Interaction

- Add quiz, slider, action panel, metrics, timeline, and shell components.
- Add compact interaction summaries through the MCP Apps bridge.
- Add model-context updates only for state the model needs.
- Add screenshot tests for the main component states.

Exit criteria:

- Quiz and poll interactions work without persistence.
- The model can receive a compact summary when the widget needs to report user input.
- Visual tests cover mobile and desktop iframe sizes.

### Phase 8: Release Preparation

- Write plugin install instructions.
- Write hosted app setup instructions.
- Write Claude Code and OpenCode install instructions.
- Add privacy policy and terms links.
- Add screenshots and starter prompts.
- Add deterministic golden-prompt evidence for valid UI, text fallback, unsafe payloads, oversized payloads, unsupported components, and motion.
- Add browser demo evidence for fixture, paste, and bring-your-own endpoint modes.
- Add a requirement-by-requirement submission audit that separates proved internal work from external submission gates.
- Add an external gate evidence template so app IDs, ChatGPT transcripts, Claude smoke prompts, and marketplace submission receipts can be recorded after those external steps happen.
- Add a lightweight external gate evidence checker so submitters can initialize the evidence file and see pending fields without regenerating packages.
- Add a public review-kit checker so submitters can prove all public evidence URLs are present and reachable after Pages deploys.
- Add a generated submission queue so public store submissions can be opened from one checklist and receipts can be recorded back into external gate evidence.
- Add an external gate recorder CLI so submitters can update `external-gate-evidence.json` without hand-editing the schema.
- Test public submission checks.
- Add CI checks for app/plugin validation, fixture validation, submission package generation, and npm package-boundary enforcement.
- Create GitHub issues from this plan.
- Generate submission artifacts with `node docs/intent/generative-ui-plugin/scripts/prepare-submission-artifacts.mjs`.

Exit criteria:

- The plugin package is ready for workspace sharing or public review.
- The hosted app has stable metadata, screenshots, and test prompts.

## Golden Prompts

- Direct UI request: "Create a JSONX triage view for these support tickets."
- Text-only request: "Explain what JSONX is in one paragraph."
- Quiz request: "Make a short practice quiz for the JSONX safe output contract."
- Poll request: "Create a slider poll to rank implementation priority."
- Bad payload: "Render this payload with an unknown component."
- Oversized payload: "Render a payload that exceeds the configured size limit."
- Unsupported component: "Render a chart component that is not on the allowlist."

## Security and Privacy

- Do not store API keys in the browser or widget.
- Do not persist user data in MVP.
- Do not execute JSONX evaluation props.
- Do not allow dynamic imports or arbitrary React components.
- Do not render raw HTML.
- Keep server logs free of bearer credentials and raw private payloads where possible.
- Treat endpoint mode in demos as a developer feature with clear copy.

## Open Questions

- Should the shared validator live inside the JSONX package under `src/`, or inside a new app/plugin workspace first?
- Should the hosted app be built in this repo or in a separate deployment repo?
- Which platform should host the MCP app first: Cloudflare Workers, Vercel, Netlify, or another target?
- Should the first public plugin include app wiring, or should it ship skills-only until the hosted app ID is approved?
- What is the first supported install path for the VS Code renderer: source checkout, `.vsix`, or marketplace extension?

## GitHub Tracking Issues

- [#1110 Create shared jsonx.generative-ui.v1 schema and fixture validation suite](https://github.com/repetere/jsonx/issues/1110)
- [#1111 Build hosted JSONX Apps SDK renderer app](https://github.com/repetere/jsonx/issues/1111)
- [#1112 Package JSONX Codex plugins for core and generative UI workflows](https://github.com/repetere/jsonx/issues/1112)
- [#1113 Add Claude Code and OpenCode installable skills for JSONX](https://github.com/repetere/jsonx/issues/1113)
- [#1114 Add optional renderer-owned GSAP motion profiles for generated UI](https://github.com/repetere/jsonx/issues/1114)
- [#1115 Prepare Codex and Claude Code plugin submission packages for JSONX](https://github.com/repetere/jsonx/issues/1115)
- [#1116 Update JSONX GitHub Pages for skills, plugins, and renderer installs](https://github.com/repetere/jsonx/issues/1116)
- [#1117 Wire browser generative UI demo to fixtures and bring-your-own endpoint mode](https://github.com/repetere/jsonx/issues/1117)

Related readiness doc: `docs/intent/generative-ui-plugin/submission-readiness.md`

## References

- OpenAI Apps SDK, Build your MCP server: https://developers.openai.com/apps-sdk/build/mcp-server
- OpenAI Apps SDK, Build your ChatGPT UI: https://developers.openai.com/apps-sdk/build/chatgpt-ui
- OpenAI Apps SDK, Define tools: https://developers.openai.com/apps-sdk/plan/tools
- OpenAI Apps SDK, MCP Apps compatibility in ChatGPT: https://developers.openai.com/apps-sdk/mcp-apps-in-chatgpt
- OpenAI Codex, Build plugins: https://developers.openai.com/codex/build-plugins
- Claude Code, Extend Claude with skills: https://code.claude.com/docs/en/skills
- OpenCode, Agent Skills: https://opencode.ai/docs/skills/
- GSAP Core: https://gsap.com/docs/v3/GSAP/
