# Claude Code Skills

These skills mirror the Codex skill set and follow a provider-neutral Agent Skills style.

Use `jsonx` for core package work. Use `jsonx-generative-ui` only when the user wants generated interface output or local `.jsonx/ui/` handoff files.

Personal install:

```text
mkdir -p "$HOME/.claude/skills"
cp -R skills/claude/jsonx "$HOME/.claude/skills/jsonx"
cp -R skills/claude/jsonx-generative-ui "$HOME/.claude/skills/jsonx-generative-ui"
```

Project install:

```text
mkdir -p .claude/skills
cp -R skills/claude/jsonx .claude/skills/jsonx
cp -R skills/claude/jsonx-generative-ui .claude/skills/jsonx-generative-ui
```
