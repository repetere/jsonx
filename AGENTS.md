# AGENTS.md

## Repository expectations

- JSONX is a TypeScript and React package. Source files live in `src/`, generated package output lives in `build/` and `dist/`.
- Keep changes scoped to the requested behavior. Do not rewrite generated files unless the source change requires regenerated output or the user asks for it.
- Use Node 22, matching the GitHub Actions workflows and the current Puppeteer dependency.

## Commands

- Install dependencies with `npm ci`.
- Run tests with `npm test -- --runInBand`.
- Run the TypeScript compiler with `npm run compile`.
- Run the full build and docs task with `NODE_OPTIONS=--max-old-space-size=15000 npm run build`.

## Codex web and cloud PR management

- Repository: `repetere/jsonx`.
- When the user asks Codex web or cloud to close a pull request, close only the exact PR the user identifies by number or URL. If the PR number is missing, ask for it.
- Prefer an authorized GitHub connector or GitHub tool that can update PR metadata. Set `state` to `closed` for `repository_full_name: "repetere/jsonx"` and the requested `pr_number`.
- If no GitHub connector is available but the browser is authenticated to GitHub, open `https://github.com/repetere/jsonx/pull/<number>`, verify the title and current status, click **Close pull request**, and report the final state.
- If neither a GitHub connector nor an authenticated browser can close the PR, state the missing authorization clearly. Do not request or store personal access tokens in this repository.
- Do not merge a PR, delete a branch, retarget a branch, edit the title or body, or modify reviewers unless the user explicitly asks.
- Before closing, restate the exact repository and PR number. After closing, confirm the GitHub state.

## Review guidelines

- Treat breakages in React rendering, HTML output, JXM parsing, TypeScript exports, and generated bundle entrypoints as high risk.
- When editing public APIs, update tests and documentation if behavior changes.
- Use direct business language in documentation. Avoid hype.
