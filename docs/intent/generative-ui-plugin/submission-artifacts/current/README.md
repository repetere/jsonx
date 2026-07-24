# JSONX Submission Artifacts

Generated: 2026-07-24T08:44:02.346Z

## Packages

| Surface | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| Codex core JSONX plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-codex-plugin.zip` | `5859d3a168af46a20136b59da48dea7eb4c46145ac6dbda9d1c5d5ff6adc837a` | 2807 |
| Codex generative UI plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip` | `d7ac479f32c095c89293f06a86c6c280105a9e1a6cc2442c8d7ac064d99ab68b` | 16499 |
| Claude Code core JSONX plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip` | `530107716501fcfdd0b67c52d7882229cd7f806f1476ac8e938628bffa6b25a1` | 2634 |
| Claude Code generative UI plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-claude-code-plugin.zip` | `52ca379876a2c62a85b00f947df45643b07c6025a5d871eba4b22271cd8b0e67` | 5049 |
| ChatGPT app submission | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/chatgpt-app-submission.json` | `a2668c8bc97c732a3a1ba1f62b9f132153ad6b586b3aff9356759a9009b9007b` | 4757 |
| Codex local marketplace | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/codex-local-marketplace.json` | `2d07c106947daac04653274e25e5bd7ccaa4d68c6908c070f8010991bb4140ad` | 696 |

## Store Listings

| Surface | Artifact | Test cases | Manual steps |
| --- | --- | ---: | ---: |
| OpenAI core JSONX plugin portal draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-jsonx-plugin-submission.json` | 5 positive, 3 negative | 5 |
| OpenAI generative UI plugin portal draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-generative-ui-plugin-submission.json` | 5 positive, 3 negative | 6 |
| Claude Code core JSONX community submission draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-jsonx-submission.json` | 5 positive, 3 negative | 4 |
| Claude Code generative UI community submission draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-generative-ui-submission.json` | 5 positive, 3 negative | 4 |

## Screenshots

| Purpose | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| generative ui page desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-generative-ui-page-desktop.png` | `96cf7a60c5f2faf3154a7af98097ecac5b806ebbf564ea389a993f232ff09527` | 209785 |
| skills install readme | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-skills-install-readme.png` | `ed40515e133c09f8659b2dbadcaef56135c9cb4ea13b18c4e1043cfb6ad92ebb` | 124032 |
| renderer widget support triage desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-support-triage-desktop.png` | `2c89e93024a1152b7697ea61e00ec7c9f55ba6ad3a0ef888840db48dc042ed51` | 52417 |
| renderer widget motion desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-motion-desktop.png` | `b100dfbd51d5e76b8fb9549a6779110ecbff17c705a91f3e65db80d1880c0b29` | 26345 |
| renderer widget quiz mobile | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-quiz-mobile.png` | `0d75c831781c49d18d0613de56a3512fa04108bf5204b8f64eb255e86a4545f7` | 30379 |

## Golden Prompts

- `docs/intent/generative-ui-plugin/submission-artifacts/current/golden-prompts.json` covers 9 prompt outcomes.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/motion-profile-evidence.json` covers 9 renderer motion cases.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/browser-demo-evidence.json` covers 3 browser demo modes.

## Hosted MCP

- `docs/intent/generative-ui-plugin/submission-artifacts/current/hosted-mcp-transcript.json` records 7 live endpoint checks from `https://jsonx-renderer-app.netlify.app/mcp`.

## Install Evidence

- `docs/intent/generative-ui-plugin/submission-artifacts/current/skill-installer-evidence.json` covers 9 installer dry-runs and 3 isolated installs.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json` records isolated Codex marketplace installs for the core and generative UI plugins with 8 checks.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json` records Claude Code plugin validation for the core and generative UI plugins with 3 checks.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/opencode-skill-evidence.json` records OpenCode project skill discovery with 3 checks.

## Submission Audit

- `docs/intent/generative-ui-plugin/submission-artifacts/current/submission-audit.json` maps 14 requirements to evidence, with 10 proved and 4 external-gated.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/external-gate-evidence.json` is a pending external gate evidence template copy.

## Validation

- node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs
- npm run check from apps/jsonx-renderer-app
- python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py support-triage.json text-block.json checklist.json choice-list.json data-table.json alert.json quiz.json slider-poll.json motion-subtle.json
- diff -rq skills docs/skills
- store listing draft validation
- npm pack --dry-run --json package-boundary check
- skill installer dry-run and isolated install evidence
- renderer motion profile evidence
- browser demo fixture, paste, and endpoint mode evidence
- isolated Codex marketplace install evidence
- Claude Code plugin validation evidence
- OpenCode project skill discovery evidence
- live hosted MCP transcript capture from https://jsonx-renderer-app.netlify.app/mcp
- external gate evidence validation
- submission readiness audit

## Submission Notes

- Codex development installs use `.agents/plugins/marketplace.json` from the repo root.
- Claude Code packages remain local until interactive Claude smoke prompts and marketplace submission can run in a Claude-enabled environment.
- ChatGPT app submission starts from `apps/jsonx-renderer-app/chatgpt-app-submission.json` and the hosted MCP endpoint.
- These artifacts live under `docs/intent/`, which is excluded from the root `jsonx` npm package.
