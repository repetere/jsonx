# Codex Skills

Use `jsonx` for core package work. Use `jsonx-generative-ui` only when the user wants generated interface output or local `.jsonx/ui/` handoff files.

Installer:

```text
node skills/scripts/install-jsonx-skill.mjs --surface codex --skill jsonx --scope personal
node skills/scripts/install-jsonx-skill.mjs --surface codex --skill jsonx-generative-ui --scope personal
```

Personal install:

```text
mkdir -p "$HOME/.agents/skills"
cp -R skills/codex/jsonx "$HOME/.agents/skills/jsonx"
cp -R skills/codex/jsonx-generative-ui "$HOME/.agents/skills/jsonx-generative-ui"
```

Project install:

```text
mkdir -p .agents/skills
cp -R skills/codex/jsonx .agents/skills/jsonx
cp -R skills/codex/jsonx-generative-ui .agents/skills/jsonx-generative-ui
```
