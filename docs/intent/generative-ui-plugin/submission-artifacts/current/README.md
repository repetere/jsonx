# JSONX Submission Artifacts

Generated: 2026-07-24T07:04:00.164Z

## Packages

| Surface | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| Codex plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-generative-ui-codex-plugin.zip` | `70f935163dab4cf3c63293667f16cefeff54536c9abcf800331fea9081562929` | 16672 |
| Claude Code plugin | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/jsonx-claude-code-plugin.zip` | `0a13e035c8e30cd0399b8692f38ba3e765571d87343623f1fe4a5224d2203f0d` | 6231 |
| ChatGPT app submission | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/chatgpt-app-submission.json` | `a2668c8bc97c732a3a1ba1f62b9f132153ad6b586b3aff9356759a9009b9007b` | 4757 |
| Codex local marketplace | `docs/intent/generative-ui-plugin/submission-artifacts/current/packages/codex-local-marketplace.json` | `78ae20574fd7527ac1c45fda214430c28ad67193cec5ed1babfe021787b559be` | 407 |

## Screenshots

| Purpose | Artifact | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| generative ui page desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-generative-ui-page-desktop.png` | `474f3f97b95e3a2b158b56dab0a68233a0ae01d6f92dabf05ca0edbb6a03ce56` | 210213 |
| skills install readme | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-skills-install-readme.png` | `ed40515e133c09f8659b2dbadcaef56135c9cb4ea13b18c4e1043cfb6ad92ebb` | 124032 |
| renderer widget support triage desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-support-triage-desktop.png` | `2c89e93024a1152b7697ea61e00ec7c9f55ba6ad3a0ef888840db48dc042ed51` | 52417 |
| renderer widget motion desktop | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-motion-desktop.png` | `b100dfbd51d5e76b8fb9549a6779110ecbff17c705a91f3e65db80d1880c0b29` | 26345 |
| renderer widget quiz mobile | `docs/intent/generative-ui-plugin/submission-artifacts/current/screenshots/jsonx-renderer-widget-quiz-mobile.png` | `0d75c831781c49d18d0613de56a3512fa04108bf5204b8f64eb255e86a4545f7` | 30379 |

## Validation

- node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs
- npm run check from apps/jsonx-renderer-app
- python3 plugins/jsonx-generative-ui-plugin/scripts/validate-jsonx-ui.py support-triage.json text-block.json checklist.json choice-list.json data-table.json alert.json quiz.json slider-poll.json motion-subtle.json
- diff -rq skills docs/skills
- npm pack --dry-run --json package-boundary check

## Submission Notes

- Codex development install uses `.agents/plugins/marketplace.json` from the repo root.
- Claude Code package remains local until `claude plugin validate` and marketplace submission can run in a Claude-enabled environment.
- ChatGPT app submission starts from `apps/jsonx-renderer-app/chatgpt-app-submission.json` and the hosted MCP endpoint.
- These artifacts live under `docs/intent/`, which is excluded from the root `jsonx` npm package.
