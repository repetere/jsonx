<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [Roadmap](../roadmap/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)

---


# Tutorial Getting Started

Some other sample page



#### Advanced - Using Custom Components & UI Libraries

If you plan on using an entire UI library, then bind the library to this before using JSONX.

```javascript
import * as jsonx from 'jsonx';
import { * as Semantic } from 'semantic-ui-react';

const getReactElement = jsonx.getReactElement.bind({
  componentLibraries:{
    Semantic,
  }
});

const myJSONX = {
  component:'Semantic.Container',
  children:[
    {
      component:'Semantic.Header',
      props:{
        as:'h1',
      },
      children:'Hello World!',
    },
    {
      component:'Semantic.Button',
      props:{
        content:'Discover docs',
        href:'http://react.semantic-ui.com',
        icon:'github',
        labelPosition:'left',
      }
    }
  ]
}

const myReactElements = getReactElement(myJSONX);
```


#### Advanced - Using New & Custom Components

If you're only adding single components or using your own components you can add them to JSONX's component my individually.

```javascript
import React from 'react';
import * as jsonx from 'jsonx';
import { Header } from 'semantic-ui-react';

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
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [Roadmap](../roadmap/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)

