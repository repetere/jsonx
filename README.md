# JSONX

[![Coverage Status](https://coveralls.io/repos/github/repetere/jsonx/badge.svg?branch=master)](https://coveralls.io/github/repetere/jsonx?branch=master) ![Build, Test & Coverage](https://github.com/repetere/jsonx/workflows/Build,%20Test%20&%20Coverage/badge.svg)

## Description

**JSONX** is a module that creates React Elements, JSX and HTML from JSON.

### Zero Setup

The JSONX UMD comes with batteries included so you can use JSONX in browser without transpilers or any additional setup/configuration. The JSONX UMD is ideal for JAMstack Applications.

### Embeddable

JSONX can also be used in existing react applications if you want to dynamically create elements with JSON. This works great for many scenarios when you want to manage your application views and components in a view management system or if you want to dynamically create React elements without using JSX.

### Fully Featured

JSONX supports all of Reacts features including Functional (with Hooks), Class-based, Suspense and Lazy components. JSONX supports JSON objects that implement the JXM (JSONX Markup) Spec.


## Installation

```sh
$ npm i jsonx
```

### [Full Documentation](https://repetere.github.io/jsonx/)


<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](https://repetere.github.io/jsonx/manual/getting-started/index.html)
 - [Using Advanced Props](https://repetere.github.io/jsonx/manual/using-advanced-props/index.html)
 - [External and Custom Components](https://repetere.github.io/jsonx/manual/using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](https://repetere.github.io/jsonx/manual/creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](https://repetere.github.io/jsonx/manual/spec/index.html)
 - [Samples](https://repetere.github.io/jsonx/manual/samples/index.html)
 - [Roadmap](https://repetere.github.io/jsonx/manual/roadmap/index.html)
 - [Full API Docs](https://repetere.github.io/jsonx/)
---

### Basic Usage
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


### JXM JSON Spec

JSONX works by using JXM JSON to create react elements. JXM JSON Objects are valid JSON Objects that more or less mimics JSX in JSON notation with a couple of special properties. The properties for JSONX JSON are the arguments passed to [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component (which is passed as the `type` argument)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

You can pass React component libraries for additional components, or you own custom components (see [External and Custom Components](../using-external-and-custom-components/index.html)
 and [Using Advanced Props](../using-advanced-props/index.html) for more details).


### Development

Note *Make sure you have typescript installed*

```sh
$ npm i -g typescript 
```

For generating documentation

```sh
$ npm run doc
```

### Notes

Check out [https://repetere.github.io/jsonx/](https://repetere.github.io/jsonx/) for the full jsonx Documentation

### Testing

```sh
$ npm test
```

### Contributing

Fork, write tests and create a pull request!

License

----

MIT