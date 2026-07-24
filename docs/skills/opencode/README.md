# OpenCode Skills

These skills use OpenCode's first-party `SKILL.md` discovery.

Use `jsonx` for core package work. Use `jsonx-generative-ui` only when the user wants generated interface output or local `.jsonx/ui/` handoff files.

Installer:

```text
node skills/scripts/install-jsonx-skill.mjs --surface opencode --skill jsonx --scope personal
node skills/scripts/install-jsonx-skill.mjs --surface opencode --skill jsonx-generative-ui --scope personal
```

Project install:

```text
mkdir -p .opencode/skills
cp -R skills/opencode/jsonx .opencode/skills/jsonx
cp -R skills/opencode/jsonx-generative-ui .opencode/skills/jsonx-generative-ui
```

Personal install:

```text
mkdir -p "$HOME/.config/opencode/skills"
cp -R skills/opencode/jsonx "$HOME/.config/opencode/skills/jsonx"
cp -R skills/opencode/jsonx-generative-ui "$HOME/.config/opencode/skills/jsonx-generative-ui"
```

OpenCode also discovers Claude-compatible `.claude/skills/<skill-name>/SKILL.md` and agent-compatible `.agents/skills/<skill-name>/SKILL.md` folders.
