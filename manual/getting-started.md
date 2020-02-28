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


# Getting Started

Some other sample page


```javascript
import { default as jsonx } from 'jsonx';
const exampleJSONX = {
  component:'p',
  props:{style:{color:'blue'}},
  children:'hello world'
};
//Rendering React Components
jsonx.getReactElement(exampleJSONX);
// => JSX Equivalent: <p style={{color:'blue'}}>hello world</p>

const exampleToHTMLandJSX = {
  component: 'div',
  props:{  className:'jsonx-generated', },
  children:[
    {  
      component:'p',
      props:{ style:{ color:'red', }, },
      children:'hello world',
    }
  ]
};
//Generating HTML strings
jsonx.outputHTML({ jsonx: exampleToHTMLandJSX, });
// => '<div class="jsonx-generated"><p style="color:red;">hello world</p></div>'
//Generating JSX strings
jsonx.outputJSX({ jsonx: exampleToHTMLandJSX, });
// => '<div class="jsonx-generated"><p style={{color:red,}}>hello world</p></div>'

//Rendering HTML Dom with React
jsonx.jsonxRender({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
// <!DOCTYPE html>
//  <body>
//    <div id="myApp">
//      <div class="jsonx-generated">
//        <p style="color:red;">hello world</p>
//      </div>
//    </div>
// </body>
```



### JSONX JSON Spec

JSONX JSON is valid JSON that more or less mimics JSX in JSON notation with a couple of special properties. The properties for JSONX JSON are the arguments passed to [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component (which is passed as the `type` argument)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

You can pass React component libraries for additional components, or you own custom components (see Advanced, also see Full Spec).

```javascript
//sample JSONX
{
  component:'ul',
  props:{
    className:'list-class',
  },
  children:[
    {
      component:'li',
      children:'first bullet'
    },
    {
      component:'li',
      children:'second bullet',
    }
  ]
}

```

```JSX
// Equivalent JSX
<ul className="list-class">
  <li>first bullet</li>
  <li>second bullet</li>
</ul>
```


#### Validating JSONX JSON

```javascript 
import * as jsonx from 'jsonx';

//use the built in JSONX Validator
const valid_jsonx_json = {
  component:'p',
  props:{
    className:'title',
  },
  children:'hello world'
};
const invalid_jsonx_json = {
  props:{
    className:'title',
  },
  children:'hello world'
};
const multiple_invalid_jsonx_json = {
  props:'must be obj',
  children:'hello world'
};

jsonx._jsonxUtils.validateJSONX(testJSONXJSON) // => true
jsonx._jsonxUtils.validateJSONX(invalid_jsonx_json) // => throws SyntaxError('[0001] Missing React Component')
jsonx._jsonxUtils.validateJSONX(multiple_invalid_jsonx_json, true) // =>
// [ [Error: [0001] Missing React Component],[ Error: [0002]  props must be an Object / valid React props] ]

/**
 * @param {Object} jsonx - JSONX JSON to validate 
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * /
function validateJSONX(jsonx = {}, returnAllErrors= false);
```



### Simple JSONX Syntax

If you want to save time, you can use the property name as the component and define properties for a cleaner simple syntax

```javascript
//shorthand simple jsonx
{
  ul: {
    props:{
      className:'list-class',
    },
    children:[
      {
        li: {
          children:'first bullet',
        },
      },
      {
        li: {
          children:'second bullet',
        },
      }
    ]
  }
}
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
