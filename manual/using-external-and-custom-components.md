<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---


# External Libraries and Components

JSONX will natively support any components from React-DOM, but for most real applications you are using either a large open source component library (e.g. react bootstrap, ant.design, material ui, etc) or many 3rd party react components (like react-autocomplete). In order to use custom 3rd party components or libraries they need to be assigned to JSONX's the `this` parameter.

## Using custom Component Libraries

Using a component library is as simple as assigning the Library to the `this.componentLibraries` property, and referencing the flattened component name as the component in your JXM JSON Object.

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

If you're only adding single components or using your own components you can add them to JSONX's component my individually. The difference between a Custom Component and a Custom Library is `this.reactComponents` expects each property value to be a react component and `this.componentLibraries` expects each property value to reference and object that has values that are React Components.

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

```

class MyButton extends React.Component {
  render() {
    return <a {...this.props}>{this.props.children}</a>
  }
}


const getReactElement = jsonx.getReactElement.bind({
  reactComponents:{
    Header,
    MyButton,
  }
});

const myJSONX = {
  component:'div',
  children:[
    {
      component:'Header',
      props:{
        as:'h1',
      },
      children:'Hello World!',
    },
    {
      component:'MyButton',
      props:{
        title:'Discover docs',
        href:'http://react.semantic-ui.com',
      },
      __dangerouslyEvalProps:{
        onClick:'()=>alert("click works")'
      },
      children:'click me',
    }
  ]
}

const myReactElements = getReactElement(myJSONX);
```

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)

