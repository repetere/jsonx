# rjx

[![Coverage Status](https://coveralls.io/repos/github/repetere/rjx/badge.svg?branch=master)](https://coveralls.io/github/repetere/rjx?branch=master) [![Build Status](https://travis-ci.org/repetere/rjx.svg?branch=master)](https://travis-ci.org/repetere/rjx)

## Description

**Reactive JSON (RJX)** takes a RXJ JSON object and renders React components. **RJX** lets you get up and running with React without using JavaScript.

RJX was created to remove all the complexities around environment setup, and configuration of React applications (Babel, Webpack, Rollup, etc) and make declarative user interfaces using Machine Learning and Natural Language Processing. Using RJX let's any back end application (Elixir, Go, Python, etc) render server side react application.

## Installation

```sh
$ npm i rjx 
```

### [Full Documentation](https://github.com/repetere/rjx/blob/master/docs/api.md)

### Examples (basic)

```javascript
import { default as rjx } from 'rjx';
//Rendering React Components
rjx.getRenderedJSON({component:'p',props:{style:{color:'blue'}},children:'hello world'});
// => JSX Equivalent: <p style={{color:'blue'}}>hello world</p>

//Generating HTML strings
rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
// => '<div class="rjx-generated"><p style="color:red;">hello world</p></div>'

//Rendering HTML Dom with React
rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
// <!DOCTYPE html>
//  <body>
//    <div id="myApp">
//      <div class="rjx-generated">
//        <p style="color:red;">hello world</p>
//      </div>
//    </div>
// </body>
```

### RJX JSON Spec

RXJ JSON is valid JSON that more or less mimics JSX in JSON notation with a couple of special properties. The properties for RXJ JSON are the arguments passed to [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component (which is passed as the `type` argument)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

You can pass React component libraries for additional components, or you own custom components (see Advanced, also see Full Spec).

```javascript
//sample RJX
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

#### Validating RJX JSON

```javascript 
import { default as rjx } from 'rjx';

//use built in RJX Validator
const valid_rjx_json = {
  component:'p',
  props:{
    className:'title',
  },
  children:'hello world'
};
const invalid_rjx_json = {
  props:{
    className:'title',
  },
  children:'hello world'
};
const multiple_invalid_rjx_json = {
  props:'must be obj',
  children:'hello world'
};

rjx._rjxUtils.validateRJX(testRJXJSON) // => true
rjx._rjxUtils.validateRJX(invalid_rjx_json) // => throws SyntaxError('[0001] Missing React Component')
rjx._rjxUtils.validateRJX(multiple_invalid_rjx_json, true) // =>
// [ [Error: [0001] Missing React Component],[ Error: [0002]  props must be an Object / valid React props] ]

/**
 * @param {Object} rjx - RJX JSON to validate 
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * /
function validateRJX(rjx = {}, returnAllErrors= false);
```

### RJX Module

```javascript
"rjx" : {
  getRenderedJSON: [Function: getRenderedJSON], //Use React.createElement and RJX JSON to create React elements
  rjxHTMLString: [Function: rjxHTMLString], //Use ReactDOMServer.renderToString to render html from RJX
  rjxRender: [Function: getRenderedJSON], //Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
  _rjxChildren: {
    getChildrenProperty: [Function: getChildrenProperty], // returns a valid rjx.children property
    getChildrenProps: [Function: getChildrenProps], // Used to pass properties down to child components if passprops is set to true
    getRJXChildren: [Function: getRJXChildren], // returns React Child Elements via RJX
  },
  _rjxComponents: {
    componentMap: {}, // object of all react components available for RJX
    getBoundedComponents: [Function: getBoundedComponents], // getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
    getComponentFromLibrary: [Function: getComponentFromLibrary], // returns a react component from a component library (like material-ui, or semantic-ui)
    getComponentFromMap: [Function: getComponentFromMap], // rreturns a react element from rjx.component
  },
  _rjxProps: {
    getRJXProps: [Function: getRJXProps], // It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
    getEvalProps: [Function: getEvalProps], //Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
    getComponentProps: [Function: getComponentProps], // Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
    getFunctionFromProps: [Function: getFunctionFromProps], // Takes a function string and returns a function on either this.props or window.
    getFunctionProps: [Function: getFunctionProps], // Returns a resolved object from function strings that has functions pulled from rjx.__functionProps
    getWindowComponents: [Function: getWindowComponents], // Returns a resolved object that has React Components pulled from window.__rjx_custom_elements
    getComputedProps: [Function: getComputedProps], // Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty
  },
  _rjxUtils: {
    validateRJX: [Function: validateRJX], //Validates RJX JSON Syntax
    displayComponent: [Function displayComponent], // Used to evaluate whether or not to render a component
    traverse: [Function traverse], //take an object of array paths to traverse and resolve
    getAdvancedBinding: [Function: getAdvancedBinding], // Use to test if can bind components this context for react-redux-router
  },
}
```

### Full RJX Spec
```javascript
rjx = {
  //standard properties
  component:String, // Any React DOM element, or custom component div,p, Boomer.Hero, MaterialUI.Button, myCustomComponent
  props:Object, // Standard React component properties
  children:Array|String, // Any String or Array of valid RJX JSON objects
  //dynamic properties
  asyncprops:Object, // An object from async resources to merge onto rjx.props once fully resolved
  thisprops:Object, // An object to merge onto rjx.props from properties already bound to this.props
  windowprops:Object, // An object to merge onto rjx.props from the window object
  //evaluated properties
  __dangerouslyEvalProps:Object, // An object of evaluated JavaScript strings, used as inline functions onto rjx.props
  __dangerouslyBindEvalProps:Object, // An object of evaluated JavaScript functions that are bound to this, used as inline functions onto rjx.props
  //computed properties
  __functionProps:Object, // An object of parsed function strings(func:this.props.onClick, func:window.localStorage.getItem),merged onto rjx.props
  __dangerouslyInsertComponents:Object, // An object that turns each RXJ JSON value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
  __windowComponents:Object, // An object of components merged onto rjx.props from window.__rjx_custom_elements
  __windowComponentProps:Object,
  //display properties
  comparisonprops:[Object], // An array of Objects used to conditionally display the current rjx.component
  //flag properties
  passprops:Boolean, // A flag to pass parent properties to children RJX objects (except for the style property)
}
```

#### Advanced - Using Custom Components & UI Libraries

If you plan on using an entire UI library, then bind the library to this before using RJX.

```javascript
import { default as rjx } from 'rjx';
import { * as Semantic } from 'semantic-ui-react';

const getRenderedJSON = rjx.getRenderedJSON.bind({
  componentLibraries:{
    Semantic,
  }
});

const myRJX = {
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

const myReactElements = getRenderedJSON(myRJX);
```


#### Advanced - Using New & Custom Components

If you're only adding single components or using your own components you can add them to RJX's component my individually.

```javascript
import React from 'react';
import { default as rjx } from 'rjx';
import { Header } from 'semantic-ui-react';

class MyButton extends React.Component {
  render() {
    return <a {...this.props}>{this.props.children}</a>
  }
}


const getRenderedJSON = rjx.getRenderedJSON.bind({
  reactComponents:{
    Header,
    MyButton,
  }
});

const myRJX = {
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

const myReactElements = getRenderedJSON(myRJX);
```

### Development

Note *Make sure you have grunt installed*

```sh
$ npm i -g grunt-cli jsdoc-to-markdown
```

For generating documentation

```sh
$ grunt doc
$ jsdoc2md src/**/*.js  > docs/api.md
```

### Notes

Check out [https://github.com/repetere/rjx](https://github.com/repetere/rjx) for the full rjx Documentation

### Testing

```sh
$ npm i
$ grunt test
```

### Contributing

Fork, write tests and create a pull request!

### Example Browser Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>RJX TEST</title>
    <script type="text/javascript" src="rjx.umd.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      const sampleRJX = {
        component: 'div',
        props: {
          id: 'generatedRJX',
          className:'rjx',
        },
        children: [
          {
            component: 'p',
            props: {
              style: {
                color: 'red',
                fontWeight:'bold',
              },
            },
            __dangerouslyEvalProps:{
              onClick:'()=>alert("click works")'
            },
            children:'hello world',
          },
        ],
      };
      const boundConfig = {
        debug:true, 
      };
      rjx.rjxRender.call(boundConfig,{ rjx: sampleRJX, querySelector:'#root', });
    </script>
  </body>
</html>
 ```

License

----

MIT