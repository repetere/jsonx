# JSONX Claude Code Plugin

This plugin packages two Claude Code skills:

- `jsonx`: core JSONX/JXM package work.
- `jsonx-generative-ui`: safe JSONX generative UI payloads and local `.jsonx/ui/` handoff files.

## Local Development

Run Claude Code with this plugin from the repository root:

```text
claude --plugin-dir ./plugins/claude-jsonx-plugin
```

Then invoke the skills by namespace:

```text
/jsonx:jsonx
/jsonx:jsonx-generative-ui
```

After editing plugin files, run:

```text
/reload-plugins
```

## Submission

Before public submission:

- Run `claude plugin validate` when Claude Code is available locally.
- Confirm the plugin still contains only skills and docs.
- Keep hosted renderer app IDs and MCP endpoint URLs out of the manifest until they are real and reachable.
- Submit through the Claude community marketplace flow after validation passes.
