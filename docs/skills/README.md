# JSONX Agent Skills

The skills are split into two families:

- `jsonx`: core JSONX/JXM package usage, examples, rendering, tests, and docs.
- `jsonx-generative-ui`: conditional generated UI payloads, local handoff files, validation, and renderer workflows.

Install only the family you need. Core JSONX work does not require the generative UI skill.

## Codex

Project install:

```text
mkdir -p .agents/skills
cp -R skills/codex/jsonx .agents/skills/jsonx
cp -R skills/codex/jsonx-generative-ui .agents/skills/jsonx-generative-ui
```

Personal install:

```text
mkdir -p "$HOME/.agents/skills"
cp -R skills/codex/jsonx "$HOME/.agents/skills/jsonx"
cp -R skills/codex/jsonx-generative-ui "$HOME/.agents/skills/jsonx-generative-ui"
```

## Claude Code

Project install:

```text
mkdir -p .claude/skills
cp -R skills/claude/jsonx .claude/skills/jsonx
cp -R skills/claude/jsonx-generative-ui .claude/skills/jsonx-generative-ui
```

Personal install:

```text
mkdir -p "$HOME/.claude/skills"
cp -R skills/claude/jsonx "$HOME/.claude/skills/jsonx"
cp -R skills/claude/jsonx-generative-ui "$HOME/.claude/skills/jsonx-generative-ui"
```

## OpenCode

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

OpenCode also discovers `.claude/skills` and `.agents/skills`, so teams can choose one shared project install path when that is simpler.
