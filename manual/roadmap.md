# Roadmap

The current priority is documentation quality and API clarity. JSONX already has broad rendering support, but the manual should make the main paths easier to learn and separate stable usage from legacy or trusted-caller behavior.

## Documentation Work

- Keep the manual source in `manual/` and generated HTML in `docs/manual/`.
- Move shared navigation and page chrome into the manual layout instead of repeating it in every markdown file.
- Keep examples small enough to read inline before linking to JSFiddle.
- Link to `jsonx.net` as the canonical site.

## API Clarity

- Keep `getReactElement`, `outputHTML`, `outputJSX`, `outputJSON`, `jsonxRender`, `compile`, and `renderFile` documented as the primary entry points.
- Label legacy features such as `__functionProps`.
- Label eval-style features as trusted-input features.
- Keep TypeDoc output available for low-level helper APIs.

## Next

Read the [Full API Docs](../../modules.html) for exported functions and types.
