# JSONX Store Listing Drafts

These files collect the form-ready listing inputs for the public plugin submission paths:

- `openai-jsonx-plugin-submission.json` for the OpenAI core JSONX plugin portal draft.
- `openai-generative-ui-plugin-submission.json` for the OpenAI generative UI app-plus-skills portal draft.
- `claude-code-jsonx-submission.json` for the Claude Code core JSONX community marketplace draft.
- `claude-code-generative-ui-submission.json` for the Claude Code generative UI community marketplace draft.

They are source drafts, not proof that a public marketplace submission was sent. Portal submission still requires account access, publisher verification, final logo review, policy attestations, and hosted app review where applicable.

Each draft includes local `evidence` paths for repo review and `publicEvidence` URLs for portal reviewers. Keep both in sync when adding packages, screenshots, or audit files.

Each draft also links to the generated submission queue at `https://jsonx.net/intent/generative-ui-plugin/submission-artifacts/current/submission-queue.json`. The queue gives submitters one file with the review package, public evidence URLs, manual checks, and external-gate receipt fields for all four submissions.

Validate public evidence coverage and the public review-kit page before regenerating artifacts:

```text
node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs
```

After GitHub Pages deploys, verify the live page and public URLs:

```text
node docs/intent/generative-ui-plugin/scripts/check-public-review-kit.mjs --source docs/intent/generative-ui-plugin/submission-artifacts/current/store-listings --network --cache-bust <commit-sha> --strict
```

After a portal or marketplace submission returns a receipt, record it through the external gate recorder:

```text
node docs/intent/generative-ui-plugin/scripts/record-external-gate-evidence.mjs marketplace --target openai-core --submitted --submission-id <id> --url <url> --status submitted --submitted-at <yyyy-mm-dd>
```

Regenerate `docs/intent/generative-ui-plugin/submission-artifacts/current/` after editing these files so the review package copies stay current.
