# JSONX Generative UI Claude Code Plugin

This Claude Code plugin packages the generated UI workflow only:

- `jsonx-generative-ui`: safe JSONX generative UI payloads and local `.jsonx/ui/` handoff files.

Use `plugins/claude-jsonx-plugin/` when you only want core JSONX/JXM package help.

## Local Development

Run Claude Code with this plugin from the repository root:

```text
claude --plugin-dir ./plugins/claude-jsonx-generative-ui-plugin
```

Then invoke the skill by namespace:

```text
/jsonx-generative-ui:jsonx-generative-ui
```

After editing plugin files, run:

```text
/reload-plugins
```

## Submission

Before public submission:

- Run `claude plugin validate ./plugins/claude-jsonx-generative-ui-plugin`.
- Confirm the plugin does not include the core JSONX skill.
- The hosted renderer MCP endpoint is `https://jsonx-renderer-app.netlify.app/mcp`.
- Keep hosted renderer app IDs out of the manifest until they are real and reachable.
- Submit through the Claude community marketplace flow after validation and smoke prompts pass.
