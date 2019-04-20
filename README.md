# React JSON Syntax (RJX)

[![Coverage Status](https://coveralls.io/repos/github/repetere/rjx/badge.svg?branch=master)](https://coveralls.io/github/repetere/rjx?branch=master) [![Build Status](https://travis-ci.org/repetere/rjx.svg?branch=master)](https://travis-ci.org/repetere/rjx)

## Description

**React JSON Syntax (RJX)** takes a RXJ JSON object and can create (Suspense, Lazy, Functional and Class) React Components, output HTML and JSX and render React components without transpilers. **RJX** lets you get up and running with React without extra configuration management of more complicated tool chains.


## Installation

```sh
$ npm i rjx
```

### [Full Documentation](https://repetere.github.io/rjx/)

### Examples ( [HTML/Browser Example](https://github.com/repetere/rjx/blob/master/dist/example.html) ) 

```javascript
import { default as rjx } from 'rjx';
const exampleRJX = {
  component:'p',
  props:{style:{color:'blue'}},
  children:'hello world'
};
//Rendering React Components
rjx.getReactElement(exampleRJX);
// => JSX Equivalent: <p style={{color:'blue'}}>hello world</p>

const exampleToHTMLandJSX = {
  component: 'div',
  props:{  className:'rjx-generated', },
  children:[
    {  
      component:'p',
      props:{ style:{ color:'red', }, },
      children:'hello world',
    }
  ]
};
//Generating HTML strings
rjx.outputHTML({ rjx: exampleToHTMLandJSX, });
// => '<div class="rjx-generated"><p style="color:red;">hello world</p></div>'
//Generating JSX strings
rjx.outputJSX({ rjx: exampleToHTMLandJSX, });
// => '<div class="rjx-generated"><p style={{color:red,}}>hello world</p></div>'

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
import * as rjx from 'rjx';

//use the built in RJX Validator
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

### Simple RJX Syntax

If you want to save time, you can use the property name as the component and define properties for a cleaner simple syntax

```javascript
//shorthand simple rjx
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

### RJX Module

```javascript
"rjx" : {
  getReactElement: [Function: getReactElement], {aliases:[getRenderedJSON,getReactElementFromRJX]} //Use React.createElement and RJX JSON to create React elements
  getReactElementFromJSON: [Function: getReactElementFromJSON], // Use compiledJSON object {type,props,children} to create React elements
  rjxRender: [Function: getRenderedJSON], //Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
  outputHTML: [Function: outputHTML], //Use ReactDOMServer.renderToString to render html from RJX
  outputJSX: [Function: outputJSX], //Generate valid JSX from RJX
  outputJSON: [Function: outputJSON], //Generate computed static values from RJX into JSON
  compile: [Function: compile], //Generate React Function Component from RJX

  jsonToJSX: [Function: jsonToJSX], //Converts JSON to JSX
  __express: [Function: __express], //render express views with RJX
  __getReact: [Function: __getReact], //Expose reference to React
  __getReactDOM: [Function: __getReactDOM], //Expose reference to ReactDOM
  __getUseGlobalHook: [Function: __getUseGlobalHook], //Expose reference to useGlobalHook


_rjxChildren: {
    getChildrenProperty: [Function: getChildrenProperty], // returns a valid rjx.children property
    getChildrenProps: [Function: getChildrenProps], // Used to pass properties down to child components if passprops is set to true
    getRJXChildren: [Function: getRJXChildren], // returns React Child Elements via RJX
  },
  _rjxComponents: {
    componentMap: {}, // object of all react components available for RJX
    getBoundedComponents: [Function: getBoundedComponents], // getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
    getComponentFromLibrary: [Function: getComponentFromLibrary], // returns a react component from a component library (like material-ui, or semantic-ui)
    getComponentFromMap: [Function: getComponentFromMap], // returns a react element from rjx.component
    getReactClassComponent: [Function: getReactClassComponent], // returns a react class component and support lifecycle functions, lazy and suspense components
    getReactFunctionComponent: [Function: getReactFunctionComponent], // returns a react function component and support lifecycle functions, hooks, lazy and suspense components
  },
  _rjxProps: {
    getRJXProps: [Function: getRJXProps], // It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
    getEvalProps: [Function: getEvalProps], //Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
    getComponentProps: [Function: getComponentProps], // Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
    getReactComponentProps: [Function: getReactComponentProps], // Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a the React component from reactComponents, componentLibraries or ReactDOM.
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
  component:String, // Any React DOM element, or custom component div,p, Boomer.Hero, MaterialUI.Button, myCustomComponent (can also use the property 'type' instead of 'component')
  props:Object, // Standard React component properties
  children:Array|String, // Any String or Array of valid RJX JSON objects


  //dynamic properties
  resourceprops:Object, // An object from async resources to merge onto rjx.props once fully resolved
  asyncprops:Object, // An object from async resources to merge onto rjx.props once fully resolved (alias for resourceprops)
  thisprops:Object, // An object to merge onto rjx.props from properties already bound to this.props
  windowprops:Object, // An object to merge onto rjx.props from the window object


  //evaluated properties
  __dangerouslyEvalProps:Object, // An object of evaluated JavaScript strings, used as inline functions onto rjx.props, if the prop is a function it will be called bound to 'this' and the returned value will be assigned
  __dangerouslyBindEvalProps:Object, // An object of evaluated JavaScript functions that are bound to this, used as inline functions onto rjx.props
  //computed properties
  __functionProps:Object, // An object of parsed function strings(func:this.props.onClick, func:window.localStorage.getItem),merged onto rjx.props
  __dangerouslyInsertComponents:Object, // An object that turns each RXJ JSON value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
  __dangerouslyInsertReactComponents:Object, // An object that returns the react element from either ReactDOM, reactComponents or componentLibraries.
  __spreadComponent:Object, // A RJX element that is mapped on any array prop called  __spread
  __windowComponents:Object, // An object of components merged onto rjx.props from window.__rjx_custom_elements
  __windowComponentProps:Object,


  //display properties
  comparisonprops:[Object], // An array of Objects used to conditionally display the current rjx.component
  //flag properties
  passprops:Boolean, // A flag to pass parent properties to children RJX objects (except for the style property)
  comparisonorprops:Boolean, // A flag to use an or condition instead of and conditions between comparisions
}
```

#### Advanced - Using Custom Components & UI Libraries

If you plan on using an entire UI library, then bind the library to this before using RJX.

```javascript
import * as rjx from 'rjx';
import { * as Semantic } from 'semantic-ui-react';

const getReactElement = rjx.getReactElement.bind({
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

const myReactElements = getReactElement(myRJX);
```


#### Advanced - Using New & Custom Components

If you're only adding single components or using your own components you can add them to RJX's component my individually.

```javascript
import React from 'react';
import * as rjx from 'rjx';
import { Header } from 'semantic-ui-react';

class MyButton extends React.Component {
  render() {
    return <a {...this.props}>{this.props.children}</a>
  }
}


const getReactElement = rjx.getReactElement.bind({
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

const myReactElements = getReactElement(myRJX);
```

#### Advanced - Special properties

##### resourceprops (asyncprops) / thisprops / windowprops

The only different between resourceprops (asyncprops), thisprops and windowprops are the source of the transverse Object.

Resourceprops transverse an object that is manually passed (usually as a result of an asynchronous fetch all - hence the name asyncpropc).

Thisprops transverse anything bound to `this.props`, a good example would be if you're storing and passing a user object on `this.props.user`, pulling the username would be where you would use thisprops.

Windowprops transverse anything on the global window object, like the current page location `window.location.href`.

Dynamic props are transversed by passing an array to the property value you want, so for a window's location (`window.location.href`) the property value is accessed by an array to the href `['location','href']` where you omit the transverse object from the array path.

```javascript
const traverseObject = {
  user: {
    name: 'rjx',
    description: 'react without javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};
const testRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className:'rjx',
  },
  resourceprops:{
    auth: [ 'authentication', ],
    username: [ 'user', 'name', ],
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
      asyncprops:{
        title: ['user','description']
      },
      children:'hello world',
    },
  ],
};
const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
// => {
//   auth: 'OAuth2',
//   username: 'rjx'
// }

//finally resolves:
const testRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className:'rjx',
    auth: 'OAuth2',
    username: 'rjx',
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        title:'react without javascript',
      },
      children:'hello world',
    },
  ],
};
```

##### __dangerouslyEvalProps / __dangerouslyBindEvalProps

The only difference between `__dangerouslyEvalProps` and `__dangerouslyBindEvalProps` is each  `__dangerouslyBindEvalProps` has to be a function, because it's returned as the bound instance of the function with `this`.

```javascript
 const testVals = {
    auth: 'true',
    username: '()=>(user={})=>user.name',
  };
  const testRJX = Object.assign({}, sampleRJX, {
    __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
      email: '(function getUser(user={}){ return this.testBound(); })',
    },
  });
  const RJXP = getEvalProps.call({ testBound: () => 'bounded', }, { rjx: testRJX, });
  const evalutedComputedFunc = RJXP.username({ name: 'bob', });
  const evalutedComputedBoundFunc = RJXP.email({ email:'test@email.domain', });
  // expect(RJXP.auth).to.be.true;
  // expect(evalutedComputedFunc).to.eql('bob');
  // expect(evalutedComputedBoundFunc).to.eql('bounded');
```

##### __functionProps

Function props merge onto rjx.props after evaluating each functon string.

```javascript
const thisProp = {
  debug: true,
  window: {
    print: () => 'printed',
    localStorage: {
      getItem:()=>'gotItem',
    },
  },
  props: {
    onClick:()=>'clicked',
    reduxRouter: {
      push:()=>'pushed',
      pop:()=>'poped',
    },
  },
};
const rxjTest = {
  component:'div',
  props: {
    name:'test',
  },
  __functionProps: {
    onclick:'func:this.props.onClick',
    printPage: 'func:window.print',
    nav:'func:this.props.reduxRouter.push',
  },
};
const rxjObj = getFunctionProps.call(thisProp, {
  rjx: rxjTest,
});
expect(rxjObj).is.an('object');
expect(Object.keys(rxjObj)).to.eql(Object.keys(rxjTest.__functionProps));
expect(rxjObj.onclick()).to.eq('clicked');
expect(rxjObj.printPage()).to.eql('printed');
expect(rxjObj.nav()).to.eql('pushed');
```

##### comparisionprops

Comparison props are used to contionally show components if they're truthy. They compare an array of left and right side values, if they are all true, the component is rendered. If `comparisonorprops:true` then only one condition needs to be true in order to render the component

```javascript
//and conditions
rjx={
  comparisonprops: [{
    left: ['bigNum',],
    operation:'lte',
    right:['smallNum',],
  },{
    left: ['smallNum',],
    operation:'<=',
    right:['bigNum',],
  }],
}
//or conditions
rjx={
  comparisonorprops:true,
  comparisonprops: [{
    left: ['truthy',],
    operation:'eq',
    right:['falsey',],
  },{
    left: ['smallNum',],
    operation:'eq',
    right:['smallNum',],
  }],
}

// All comparison operations
switch (opscompares.operation) {
  case 'eq':
  case '==':
    return opscompares.left == opscompares.right;
  case 'dneq':
  case '!=':
  case '!':
    return opscompares.left !== opscompares.right;
  case 'dnseq':
  case '!==':
    return opscompares.left !== opscompares.right;
  case 'seq':
  case '===':
    return opscompares.left === opscompares.right;
  case 'lt':
  case '<':
    return opscompares.left < opscompares.right;
  case 'lte':
  case '<=':
    return opscompares.left <= opscompares.right;
  case 'gt':
  case '>':
    return opscompares.left > opscompares.right;
  case 'gte':
  case '>=':
    return opscompares.left >= opscompares.right;
  case 'dne':
  case 'undefined':
  case 'null':
    return opscompares.left === undefined || opscompares.left === null; 
  case '!null':
  case '!undefined':
  case 'exists':
  default://'exists'
    return opscompares.left !== undefined && opscompares.left !== null;
}
```

### Advanced - Custom React Components & Lifecycle Functions

You can also create react components with lifecycle functions using `getReactClassComponent`.

The only required function is a render function, the body of the function has to be valid rjx.

```javascript
const MyCustomComponent = rjx._rjxComponents.getReactClassComponent({
    //
    // Initialization function
    //
    getInitialState:{
      body:'return { status:"not-loaded", name:"rjx test", customNumber:1, }',
      arguments:[],
    },
    getDefaultProps:{
      body:'return { someProp:1, someOtherProp:2, status:"original status" }',
      arguments:[],
    },
    componentDidMount:{
      body:`console.log('mounted', 'this.props',this.props, 'this.state',this.state)`,
      arguments:[],
    },
    componentWillUnmount:{
      body:`console.log('unmounted',this.props)`,
      arguments:[],
    },
    //
    // State change functions
    //
    shouldComponentUpdate:{
      body:'console.log("should update component",{nextProps,nextState}); return true;',
      arguments:['nextProps', 'nextState']
    },
    componentWillUpdate:{
      body:'console.log("will update component",{nextProps,nextState}); return true;',
      arguments:['nextProps', 'nextState']
    },
    componentDidUpdate:{
      body:'console.log("did update component",{prevProps,prevState}); return true;',
      arguments:['prevProps', 'prevState']
    },
    //
    // Prop change functions
    //
    componentWillReceiveProps: {
      body:'console.log("will recieve props",{nextProps}); return true;',
      arguments:['nextProps']
    },
    //
    // RENDER IS THE ONLY ***REQUIRED*** FUNCTION
    //
    render:{
      body:{
        component:'p',
        props:{
          status:'from inline prop'
        },
        passprops:true,
        children:[
          {
            component:'span',
            children: 'My Custom React Component Status: ',
          },
          {
            component:'span',
            thisprops:{
              children:['status']
            }
          }
        ]
      },
    }
  });
const sampleRJX = {
  component:'MyCustomComponent',
  props:{
    status:'Amazing',
  }
};
const boundConfig = {
  debug:true, 
  reactComponents:{
    MyCustomComponent,
  }
};
rjx.rjxRender.call(boundConfig, {
  rjx: sampleRJX, 
  querySelector:'#root', });
```

Console output after mounting
```javascript
[Log] mounted (4)
"this.props"
{status: "Amazing", children: {}, someProp: 1, someOtherProp: 2}
"this.state"
{status: "not-loaded", name: "rjx test", customNumber: 1}
```

Checkout the `dist/example.html` for example usage.
![https://raw.githubusercontent.com/repetere/rjx/master/docs/dist-example-html.png](https://raw.githubusercontent.com/repetere/rjx/master/docs/dist-example-html.png)

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

Check out [https://repetere.github.io/rjx/](https://repetere.github.io/rjx/) for the full rjx Documentation

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

<div style="text-align:center;">

<img src="https://raw.githubusercontent.com/repetere/rjx/master/docs/rjx-logo.png" style="max-width:160px;">

</div>


License

----

MIT