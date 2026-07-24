# JSONX Codex Plugin

This Codex plugin packages the core JSONX/JXM skill only:

- `jsonx`: package usage, rendering APIs, JXM examples, source changes, tests, and docs.

Use `jsonx-generative-ui-plugin` when you want generated interface payloads, hosted renderer handoff, fixtures, or motion profile guidance.

## Local Development

Validate the plugin:

```text
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/jsonx-codex-plugin
node plugins/jsonx-generative-ui-plugin/scripts/validate-plugin-package.mjs
```

Install from the repo-local Codex marketplace:

```text
codex plugin marketplace add .
codex plugin add jsonx-codex-plugin@jsonx-local
```

Use a fresh Codex task after installing or reinstalling the plugin so new skills and metadata are loaded.
