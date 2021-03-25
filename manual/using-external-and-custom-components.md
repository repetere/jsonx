<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://repetere.github.io/jsonx/)
 - [Getting Started](../getting-started/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---


# External Libraries and Components

JSONX natively supports any components from React-DOM, but for most real applications you are using either a large open-source component library (e.g. react-bootstrap, ant.design, material UI, etc) or any 3rd-party react components (like react-autocomplete). To use custom 3rd-party components or libraries they need to be assigned to JSONX's `this` parameter.

## Using custom Component Libraries

Using a component library is as simple as assigning the Library to the `this.componentLibraries` property, and referencing the flattened component name as the component value in your JXM JSON Object.

```javascript
import * as jsonx from 'jsonx';
import { * as ReactBootstrap } from 'react-bootstrap'; //or in the browser reference the UMD: <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin />

const getReactElement = jsonx.getReactElement.bind({
  componentLibraries:{
    ReactBootstrap,
  }
});

const JXM = {
  component:'ReactBootstrap.Container', 
  children:[
    {
      component:'ReactBootstrap.Row', 
      children:[
        {
          component:'ReactBootstrap.Col',
          children:[
            {
              component:'ReactBootstrap.Alert',
              props:{ variant:'primary' },
              children: 'This is a Bootstrap Alert'
            }
          ]
        },
        {
          component:'ReactBootstrap.Col',
          children:[
            {
              component:'ReactBootstrap.Spinner',
              props:{ animation:'border', role:'status' },
            }
          ]
        }
      ], 
    }
  ], 
}

const myReactElements = getReactElement(JXM);
```

### Example React Bootstrap
<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/gctmsojp/22/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/gctmsojp/22/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
  </tr>
</table>

## Using Custom Components

If you're only adding single components or using your components you can add them to JSONX's component my individually. The difference between a Custom Component and a Custom Library is `this.reactComponents` expects each property value to be a react component and `this.componentLibraries` expects each property value to reference an object that has values that are React Components.

```javascript
import React from 'react';
import * as jsonx from 'jsonx';
import { Calendar } from 'rc-calendar';
const jsonxRender = jsonx.jsonxRender.bind({ 
  reactComponents:{
    ReactCalendar: Calendar,
  }
});

const JXM = {
  component:'div', 
  children:[
    {
      component:'h1', 
      children:'React Calendar demo',
    },
    {
      component:'ReactCalendar',
      props:{
      },
    }
  ], 
};

jsonxRender({
  jsonx:JXM, 
  querySelector:'#main',
});
```
### Example React Calendar
<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/Lqwe3f59/5/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/Lqwe3f59/5/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
  </tr>
</table>

---

## Next: [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)

### JSONX Manual
 - [Home](https://repetere.github.io/jsonx/)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)

