# JSONX

[![Coverage Status](https://coveralls.io/repos/github/repetere/jsonx/badge.svg?branch=master)](https://coveralls.io/github/repetere/jsonx?branch=master) [![Build Status](https://travis-ci.org/repetere/jsonx.svg?branch=master)](https://travis-ci.org/repetere/jsonx)

## Description

**JSONX** is a module that creates React Elements, JSX and HTML from JSON.

### Zero Setup

The JSONX UMD comes with batteries included so you can use JSONX in browser without transpilers or any additional setup/configure. Ideal for JAMstack Applications.

### Embeddable

JSONX can also be used in existing react applications if you want to dynamically create elements with JSON. This works great for many scenarios when you want to manage your application views and components in a view management system.

### Fully Featured

JSONX supports all of Reacts features including, Hooks, Functional, Class-based, Suspense and Lazy components. JSONX supports JSON objects that implement the JXM (JSONX Markup) Spec.


## Installation

```sh
$ npm i jsonx
```

### [Full Documentation](https://repetere.github.io/jsonx/)


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