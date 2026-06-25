# JXM JSON Spec

JXM is the JSON shape JSONX uses to describe React UI as data. A JXM object describes a component, its props, its children, and optional JSONX-specific behavior such as resource bindings, templates, display rules, formatting, and generated components.

JXM maps to the arguments passed to [`React.createElement`](https://react.dev/reference/react/createElement). The only required field is `component`, or its alias `type`.

```ts
React.createElement(type, props, ...children);
```

The source type lives in [`src/types/jsonx/jsonx.ts`](https://github.com/repetere/jsonx/blob/main/src/types/jsonx/jsonx.ts). The generated API reference is available in the [Full API Docs](../../modules.html).

## Core Fields

| Field | Type | Purpose |
| --- | --- | --- |
| `component` | `string` | React DOM element, custom component name, or component-library path such as `ReactBootstrap.Button`. |
| `type` | `string` | Alias for `component`. |
| `props` | `object` | Props passed to the React element. |
| `children` | `string`, `array`, `Date`, or `null` | Children passed to the React element. |

```ts
const view = {
  component: "section",
  props: { className: "intro" },
  children: [
    { component: "h1", children: "JSONX" },
    { component: "p", children: "React UI defined as data." },
  ],
};
```

## Traverse Fields

Traverse fields read values from a source object and merge them into `props`.

| Field | Source |
| --- | --- |
| `resourceprops` | The `resources` object passed to render methods. |
| `asyncprops` | Alias for `resourceprops`. |
| `thisprops` | `this.props`. |
| `thisstate` | `this.state`. |
| `thiscontext` | The bound `this` context. |
| `windowprops` | The global `window` object. |

```ts
const view = {
  component: "a",
  resourceprops: {
    href: ["profile", "url"],
  },
  children: "Profile",
};

jsonx.getReactElement(view, {
  profile: { url: "/users/123" },
});
```

## Evaluation Fields

These fields create functions, evaluated props, or React elements from JSONX definitions. Treat them as trusted-input features. Do not run untrusted JSONX definitions with evaluation enabled.

| Field | Purpose |
| --- | --- |
| `_children` | Overrides `children` after dynamic values resolve. |
| `__dangerouslyEvalProps` | Evaluates strings or functions and merges the returned values into `props`. |
| `__dangerouslyBindEvalProps` | Evaluates functions and binds them to the current context. |
| `__dangerouslyEvalAllProps` | Evaluates a string or function to replace the full `props` object. |
| `__dangerouslyInsertComponents` | Inserts React elements created from JSONX objects into props. |
| `__dangerouslyInsertReactComponents` | Inserts React components resolved from ReactDOM, `reactComponents`, or `componentLibraries`. |
| `__dangerouslyInsertJSONXComponents` | Inserts JSONX-backed components into props. |
| `__dangerouslyInsertFunctionComponents` | Creates function components as prop values. |
| `__dangerouslyInsertClassComponents` | Creates class components as prop values. |
| `__windowComponents` | Reads components from `window.__jsonx_custom_elements`. |
| `__windowComponentProps` | Reads component props from window-backed components. |
| `__spread` | Array of data used to generate children from `__spreadComponent`. |
| `__spreadComponent` | JSONX template mapped over `__spread`. |
| `__functionProps` | Legacy function-string prop resolution. |
| `__functionargs` | Legacy function argument binding for `__functionProps`. |
| `__inline` | Legacy inline function definition for `__functionProps`. |

## Format Fields

Format fields convert `children` values before rendering.

| Field | Purpose |
| --- | --- |
| `___stringifyChildren` | Converts `children` with `JSON.stringify`. |
| `___toStringChildren` | Converts `children` with `.toString()`. |
| `___toNumeral` | Formats numeric children with Numeral.js. |
| `___FromLuxonTimeZone` | Sets the time zone for Luxon formatting. |
| `___ISOtoLuxonString` | Formats ISO date strings with Luxon. |
| `___JSDatetoLuxonString` | Formats JavaScript `Date` values with Luxon. |

## Utility And Display Fields

| Field | Purpose |
| --- | --- |
| `___template` | Loads a JSONX template from an external file or URL. |
| `passprops` | Passes parent props into child JSONX objects. |
| `debug` | Logs calculated props and rendering errors. |
| `test` | Returns calculated render data as a string. |
| `comparisonprops` | Conditionally renders a component when comparisons match. |
| `comparisonorprops` | Uses OR logic instead of AND logic for comparisons. |

## Applied Fields

| Field | Purpose |
| --- | --- |
| `useformregister` | Adds React Hook Form registration to a component. |
| `useremoveprops` | Removes named props before rendering. |
| `useincludeprops` | Keeps only named props before rendering. |

## Simple JSONX Syntax

Simple syntax lets the component name become the object key.

```ts
const simpleView = {
  ul: {
    props: { className: "list" },
    children: [
      { li: "first bullet" },
      { li: "second bullet" },
      { li: "third bullet" },
    ],
  },
};
```

## Primary API

| API | Purpose |
| --- | --- |
| `getReactElement`, `getRenderedJSON`, `getReactElementFromJSONX` | Create React elements from JSONX. |
| `getReactElementFromJSON` | Create React elements from resolved `{ type, props, children }` JSON. |
| `jsonxRender` | Render JSONX into a browser DOM node or portal. |
| `outputHTML`, `jsonxHTMLString` | Render JSONX to an HTML string. |
| `outputJSX` | Render JSONX to a JSX string. |
| `outputJSON` | Render JSONX to resolved JSON. |
| `compile` | Create a React function component from JSONX. |
| `jsonToJSX` | Convert resolved JSON to JSX text. |
| `renderFile`, `__express` | Render Express-compatible JSONX views. |
| `_jsonxChildren` | Child resolution helpers. |
| `_jsonxComponents` | Component lookup and generated component helpers. |
| `_jsonxProps` | Prop resolution helpers. |
| `_jsonxUtils` | Validation, display, traversal, and simple syntax helpers. |

## Next

Read [Samples](../samples/) for browser examples.
