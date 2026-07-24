# JSONX Submission Artifacts

Generated: 2026-07-24T08:12:10.723Z

## Packages

| Surface | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| Codex plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip` | `ad5a4e457e51599cf572e4ccc5fa3893a5bbffe9c6b410fbffefc22115ad9a4c` | 17023 |
| Claude Code plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip` | `2f4065360a5bb2db4699849eac8e2c623e1e69940b15a78fde0c6c9268b9b2c3` | 6220 |
| ChatGPT app submission | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/chatgpt-app-submission.json` | `a2668c8bc97c732a3a1ba1f62b9f132153ad6b586b3aff9356759a9009b9007b` | 4757 |
| Codex local marketplace | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/codex-local-marketplace.json` | `78ae20574fd7527ac1c45fda214430c28ad67193cec5ed1babfe021787b559be` | 407 |

## Store Listings

| Surface | Artifact | Test cases | Manual steps |
| --- | --- | ---: | ---: |
| OpenAI plugin portal draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/openai-plugin-submission.json` | 5 positive, 3 negative | 6 |
| Claude Code community submission draft | `docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings/claude-code-community-submission.json` | 5 positive, 3 negative | 4 |

## Screenshots

| Purpose | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| generative ui page desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-generative-ui-page-desktop.png` | `474f3f97b95e3a2b158b56dab0a68233a0ae01d6f92dabf05ca0edbb6a03ce56` | 210213 |
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
- `docs/intent/generative-ui-plugin/submission-artifacts/current/codex-install-evidence.json` records an isolated Codex marketplace install with 7 checks.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/claude-validation-evidence.json` records Claude Code plugin validation with 2 checks.
- `docs/intent/generative-ui-plugin/submission-artifacts/current/opencode-skill-evidence.json` records OpenCode project skill discovery with 3 checks.

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

## Submission Notes

- Codex development install uses `.agents/plugins/marketplace.json` from the repo root.
- Claude Code package remains local until interactive Claude smoke prompts and marketplace submission can run in a Claude-enabled environment.
- ChatGPT app submission starts from `apps/jsonx-renderer-app/chatgpt-app-submission.json` and the hosted MCP endpoint.
- These artifacts live under `docs/intent/`, which is excluded from the root `jsonx` npm package.
