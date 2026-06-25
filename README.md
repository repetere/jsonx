# JSONX

[![Coverage Status](https://coveralls.io/repos/github/repetere/jsonx/badge.svg?branch=main)](https://coveralls.io/github/repetere/jsonx?branch=main) ![Build, Test & Coverage](https://github.com/repetere/jsonx/workflows/Build,%20Test%20&%20Coverage/badge.svg)

## Description

**JSONX** is a React rendering library that lets you define React UI as JSON, then render it as React elements, HTML, JSX text, or browser DOM output.

JSONX gives you a JSON-based rendering layer for React. A JSONX object describes the component, props, children, templates, and resource bindings. The library resolves that structure into React output for browser rendering, server-side HTML rendering, Express views, or generated component flows.

JSONX is not a replacement for React, a design system, or just a JSON-to-HTML tool. It is useful when React views need to be generated, serialized, audited, stored in files, returned from APIs, or moved through a system as data.

### Data-Driven React

JSONX works in existing React applications when you need to create elements from data instead of JSX source code. This is helpful for view management systems, configuration-driven UI, server-rendered views, and applications that need to inspect or persist UI definitions.

### Browser and Server Output

JSONX can produce React elements, HTML strings, JSX strings, JSON intermediate representation, browser DOM output, and Express view output. The browser bundles can run without a transpiler when the page already has the needed runtime dependencies.

### Component Support

JSONX supports DOM components, custom component maps, component libraries, function components with hooks, class components, Suspense, Lazy components, dynamic data-backed components, and JSON objects that implement the JXM (JSONX Markup) spec.

## Installation

```sh
$ npm i jsonx
```

### [Full Documentation](https://repetere.github.io/jsonx/)


<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
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
import * as jsonx from 'jsonx';
const example_JXM_JSON = {
  component:'p',
  props:{ style:{ color:'blue' } },
  children:'hello world'
};

//Rendering React Components
jsonx.getReactElement(example_JXM_JSON); // => JSX Equivalent: <p style={{color:'blue'}}>hello world</p>

//Generating HTML strings
jsonx.outputHTML({ jsonx: example_JXM_JSON, }); // => '<p style="color:blue;">hello world</p>'

//Generating JSX strings
jsonx.outputJSX({ jsonx: example_JXM_JSON, }); // => '<p style={{color:blue,}}>hello world</p>'

//Rendering HTML Dom with React
jsonx.jsonxRender({ jsonx: example_JXM_JSON, querySelector:'#myApp', });
// <!DOCTYPE html>
//  <body>
//    <div id="myApp">
//      <p style="color:blue;">hello world</p>
//    </div>
// </body>

//you can also use the simplified syntax
const simpleJXM_JSON = {
  p:{
    props:{ style:{ color:'blue' } },
    children:'hello world'
  }
}

//or if you have an element with no props, simply use {type:children}
const superSimpleJXM = {
  ul:[
    {li:'first!'},
    {li:'second!'},
  ]
}
```


### JXM JSON Spec

JSONX works by using JXM JSON to create React elements. JXM JSON objects are valid JSON objects that describe React component structure in data form. The properties for JSONX JSON map to the arguments passed to [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component, which is passed as the `type` argument.

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

You can pass React component libraries for additional components, or your own custom components (see [External and Custom Components](https://repetere.github.io/jsonx/manual/using-external-and-custom-components/index.html)
 and [Using Advanced Props](https://repetere.github.io/jsonx/manual/using-advanced-props/index.html) for more details).


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
