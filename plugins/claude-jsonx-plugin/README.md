# JSONX Claude Code Plugin

This plugin packages the core JSONX/JXM skill:

- `jsonx`: core JSONX/JXM package work.

Use `plugins/claude-jsonx-generative-ui-plugin/` when you want generated interface payloads and local `.jsonx/ui/` handoff files.

## Local Development

Run Claude Code with this plugin from the repository root:

```text
claude --plugin-dir ./plugins/claude-jsonx-plugin
```

Then invoke the skill by namespace:

```text
/jsonx:jsonx
```

After editing plugin files, run:

```text
/reload-plugins
```

## Submission

Before public submission:

- Run `claude plugin validate ./plugins/claude-jsonx-plugin`.
- Confirm the plugin still contains only the core JSONX skill and docs.
- Submit through the Claude community marketplace flow after validation passes.
