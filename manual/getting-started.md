# Getting Started

JSONX lets React views move through a system as data. You define the view as JSON, then render it as a React element, HTML string, JSX string, browser DOM output, or Express view.

Use JSX for hand-authored screens. Use JSONX when the view definition needs to be stored, generated, audited, returned from an API, or passed between services.

## Install

```sh
npm i jsonx react react-dom
```

JSONX expects React and ReactDOM to be available as peer dependencies. The package supports React 18 and React 19.

## Create A View

A JSONX object maps to the arguments passed to `React.createElement`. The only required field is `component`, which becomes the React element type.

```ts
import * as jsonx from "jsonx";

const view = {
  component: "p",
  props: {
    style: { color: "blue" },
    title: "jsonx",
  },
  children: "hello world",
};

const element = jsonx.getReactElement(view);
```

That view is equivalent to this JSX:

```tsx
<p style={{ color: "blue" }} title="jsonx">
  hello world
</p>
```

### Try It In The Browser

<div class="jsonx-simulator" data-example="getting-started-basic"></div>

## Render Output

The same JSONX object can be rendered in several formats.

```ts
jsonx.getReactElement(view);
jsonx.outputHTML({ jsonx: view });
jsonx.outputJSX(view);
jsonx.outputJSON(view);
```

| API | Use it when you need |
| --- | --- |
| `getReactElement` | A React element created from JSONX. |
| `outputHTML` | A server-rendered HTML string. |
| `outputJSX` | A JSX string for inspection, export, or debugging. |
| `outputJSON` | The resolved React element shape: `{ type, props, children }`. |
| `jsonxRender` | Browser rendering into a DOM node or portal. |
| `compile` | A React function component generated from JSONX. |
| `renderFile` or `__express` | Express-compatible view rendering from JSONX files. |

## Simple Syntax

JSONX also supports a shorter object shape where the key is the component name.

```ts
const simpleView = {
  section: {
    props: { className: "intro" },
    children: [
      { h1: "JSONX" },
      { p: "React UI defined as data." },
    ],
  },
};

jsonx.getReactElement(simpleView);
```

Use the full form when you need explicit `component`, `props`, or advanced JSONX behavior. Use simple syntax when the structure is small and readable.

## Custom Components

Pass custom React components through `reactComponents` or grouped component libraries through `componentLibraries`.

```ts
jsonx.getReactElement.call(
  {
    reactComponents: { Hero },
    componentLibraries: { DesignSystem },
  },
  {
    component: "DesignSystem.Button",
    props: { variant: "primary" },
    children: "Start",
  },
);
```

## Configuration

JSONX methods read configuration from the `this` context passed with `.call`.

```ts
jsonx.getReactElement.call(
  {
    debug: true,
    logError: console.error,
    returnJSON: false,
    disableRenderIndexKey: true,
  },
  view,
);
```

Common options:

| Option | Purpose |
| --- | --- |
| `debug` | Log render failures and return more diagnostic output. |
| `logError` | Replace the default error logger. |
| `returnJSON` | Return `{ type, props, children }` instead of a React element. |
| `disableRenderIndexKey` | Disable automatic index-based `key` assignment. |
| `boundedComponents` | Bind selected components to the current context. |
| `reactComponents` | Register custom components by name. |
| `componentLibraries` | Register grouped component libraries by namespace. |
| `customComponents` | Generate components from JSONX component definitions. |

## Trusted Input

JSONX can evaluate strings and create functions through advanced props such as `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps`, and `__dangerouslyEvalAllProps`. Treat those paths as trusted-caller features. Do not run untrusted JSONX definitions with evaluation enabled.

For safer runtime validation, use `jsonx._jsonxUtils.validateJSONX` before rendering user-authored or external JSONX.

## Next

- Read [Using Advanced Props](../using-advanced-props/) for data binding, templates, display rules, and format props.
- Read [External and Custom Components](../using-external-and-custom-components/) for component maps and libraries.
- Read the [JSONX and JXM Spec](../spec/) for the full object shape.
