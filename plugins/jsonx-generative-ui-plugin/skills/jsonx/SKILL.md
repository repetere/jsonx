---
name: jsonx
description: Work with JSONX/JXM as the core React JSON syntax package. Use when the user asks to render JSONX, create or debug JXM examples, update JSONX source, explain package APIs, write tests, or build docs separate from generative UI workflows.
---

# jsonx

Use this skill for core JSONX package work. Do not use it for generated interface output unless the user also asks for generative UI.

## Scope

- Render React elements, JSX, HTML, or Express output from JSONX/JXM.
- Create small JXM examples that match the existing package API.
- Debug JSONX props, children, component resolution, templates, and output helpers.
- Update source under `src/`, tests, manual docs, or package build scripts.
- Keep hosted app, plugin, skill, and demo artifacts outside the npm package runtime.

## Package Size Rule

Do not add agent skills, Apps SDK app code, renderer fixtures, plugin assets, GSAP, screenshots, or store submission materials to the `jsonx` npm package runtime. Keep them outside `src/`, `build/`, and `dist`, and make sure they are excluded from npm packaging.
