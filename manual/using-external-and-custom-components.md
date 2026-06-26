# External Libraries And Custom Components

JSONX can render DOM elements by default. For application UI, you usually need custom React components or a component library. Register those components through the context passed to JSONX methods.

Use `reactComponents` for individual components. Use `componentLibraries` for grouped libraries that should be referenced by namespace.

## Component Libraries

Assign a library object to `componentLibraries`, then reference components with a dotted path.

```ts
import * as jsonx from "jsonx";
import * as ReactBootstrap from "react-bootstrap";

const getReactElement = jsonx.getReactElement.bind({
  componentLibraries: {
    ReactBootstrap,
  },
});

const view = {
  component: "ReactBootstrap.Container",
  children: [
    {
      component: "ReactBootstrap.Row",
      children: [
        {
          component: "ReactBootstrap.Col",
          children: [
            {
              component: "ReactBootstrap.Alert",
              props: { variant: "primary" },
              children: "This is a Bootstrap alert",
            },
          ],
        },
      ],
    },
  ],
};

const element = getReactElement(view);
```

### Component Library Example

The live example uses an in-page `DemoKit` library so the manual does not depend on a third-party CDN. Replace `DemoKit` with `ReactBootstrap` in application code.

<div class="jsonx-simulator" data-example="component-library"></div>

## Custom Components

Use `reactComponents` when you want to register a small set of named components directly.

```ts
import * as jsonx from "jsonx";
import ReactCalendar from "react-calendar";

const view = {
  component: "main",
  children: [
    {
      component: "h1",
      children: "React Calendar demo",
    },
    {
      component: "ReactCalendar",
      props: {
        value: new Date(),
      },
    },
  ],
};

jsonx.jsonxRender.call(
  {
    reactComponents: {
      ReactCalendar,
    },
  },
  {
    jsonx: view,
    querySelector: "#main",
  },
);
```

### Custom Component Example

The live example uses a small local component so the manual runs without the React Calendar package.

<div class="jsonx-simulator" data-example="custom-component"></div>

## Choosing A Registration Path

| Use case | Use |
| --- | --- |
| One or a few local components | `reactComponents` |
| A third-party component package | `componentLibraries` |
| Component names grouped by namespace | `componentLibraries` |
| Components generated from JSONX definitions | `customComponents` |

## Next

Read [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/) if you need JSONX to generate function, class, dynamic, or form components.
