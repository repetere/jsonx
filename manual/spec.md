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

# Full JXM (JSONX Markup) JSON Spec 

A JXM JSON Object is valid JSON Object that more or less mimics JSX in JSON notation with a couple of special properties. The properties for JSONX JSON are the arguments passed to [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component (which is passed as the `type` argument)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

The full [type definition](../../interfaces/_types_jsonx_jsonx_.jsonx.html) is also available.
```typescript
jxm = {
  //standard properties
  component:String, // Any React DOM element, or custom component div,p, Boomer.Hero, MaterialUI.Button, myCustomComponent (can also use the property 'type' instead of 'component')
  props:Object, // Standard React component properties
  children:Array|String, // Any String or Array of valid JSONX JSON objects


  //traverse properties
  resourceprops:Object, // An object from async resources to merge onto jsonx.props once fully resolved
  asyncprops:Object, // An object from async resources to merge onto jsonx.props once fully resolved (alias for resourceprops)
  thisprops:Object, // An object to merge onto jsonx.props from properties already bound to this.props
  thisstate:Object, // An object to merge onto jsonx.props from properties already bound to this.state
  thiscontext:Object, // An object to merge onto jsonx.props from properties already bound to this
  windowprops:Object, // An object to merge onto jsonx.props from the window object


  //evaluation properties
  __dangerouslyEvalProps:Object, // An object of evaluated JavaScript strings, used as inline functions onto jsonx.props, if the prop is a function it will be called bound to 'this' and the returned value will be assigned
  __dangerouslyBindEvalProps:Object, // An object of evaluated JavaScript functions that are bound to this, used as inline functions onto jsonx.props
  __dangerouslyEvalAllProps:Object, // evaluate strings to generate props that are functions bound to `this`
  __functionProps:Object, // An object of parsed function strings(func:this.props.onClick, func:window.localStorage.getItem),merged onto jsonx.props
  __dangerouslyInsertJSONXComponents:Object, // An object that turns each JSONX JSON value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
  __dangerouslyInsertComponents:Object, // An object that turns each JSONX JSON value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
  __dangerouslyInsertReactComponents:Object, // An object that returns the react element from either ReactDOM, reactComponents or componentLibraries.
  __dangerouslyInsertFunctionComponents:Object, // An object that returns the react function component.
  __dangerouslyInsertClassComponents:Object, // An object that returns the react class component.
  __spreadComponent:Object, // A JSONX element that is mapped on any array prop called  __spread
  __windowComponents:Object, // An object of components merged onto jsonx.props from window.__jsonx_custom_elements
  __windowComponentProps:Object, // Returns a resolved object that has React Components pulled from window.
  _children: Object, // any value assigned to _children will be set as the react element children property. This is typically used when you want to override what's passed as the children JXM property with a dynamic value later.

  //format properties
  ___FromLuxonTimeZone:String, // format date values as strings assigned to `children` prop using Luxon
  ___ISOtoLuxonString:String, //converts the children prop to from an ISO String to a Luxon formatted DateTime String 
  ___JSDatetoLuxonString:String, //converts the children prop to from JavaScript Date to a Luxon formatted DateTime String 
  ___stringifyChildren:String, //converts the children prop to a string using JSON.stringify 
  ___toNumeral:String, //converts numbers to numeral formatted numbers
  ___toStringChildren:String, //converts the children prop to a string using toString()

  
  //utility properties
  debug:Boolean, // A flag to output the calculated JXM props in the console
  test:Boolean, // A flag to output the calculated JXM as a string component
  passprops:Boolean|[String], // A flag to pass parent properties to children JSONX objects (except for the style property)
  ___template:String, //imports JXM from a file path into the children property 
  
  //display properties
  comparisonprops:[Object], // An array of Objects used to conditionally display the current jsonx.component
  comparisonorprops:Boolean, // A flag to use an or condition instead of and conditions between comparisions
  
  //Applied properties
  useformregister:Boolean, // A flag to insert react hook form register on component (short hand for  thiscontext: { ref:['reactHookForm','register'] })
  useremoveprops:[String], // remove props from component, usually used with passprops
  useincludeprops:[String], // Applied Prop: includes only defined props, usually used with passprops 
}
```


## Simple JSONX Syntax

If you want to save time, you can use the property name as the component/type and use the object value to define the rest of the JXM properties for a cleaner simple syntax

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
      },
      {
        li:'third bullet',
      },
    ]
  }
}
```


### JSONX Imperative API / Module

```javascript
"jsonx" : {
  getReactElement: [Function: getReactElement], {aliases:[getRenderedJSON,getReactElementFromJSONX]} //Use React.createElement and JSONX JSON to create React elements
  getReactElementFromJSON: [Function: getReactElementFromJSON], // Use compiledJSON object {type,props,children} to create React elements
  jsonxRender: [Function: getRenderedJSON], //Use JSONX without any configuration to render JSONX JSON to HTML and insert JSONX into querySelector using ReactDOM.render
  outputHTML: [Function: outputHTML], //Use ReactDOMServer.renderToString to render html from JSONX
  outputJSX: [Function: outputJSX], //Generate valid JSX from JSONX
  outputJSON: [Function: outputJSON], //Generate computed static values from JSONX into JSON
  compile: [Function: compile], //Generate React Function Component from JSONX

  jsonToJSX: [Function: jsonToJSX], //Converts JSON to JSX
  __express: [Function: __express], //render express views with JSONX
  __getReact: [Function: __getReact], //Expose reference to React
  __getReactDOM: [Function: __getReactDOM], //Expose reference to ReactDOM
  __getUseGlobalHook: [Function: __getUseGlobalHook], //Expose reference to useGlobalHook


  _jsonxChildren: {
    getChildrenProperty: [Function: getChildrenProperty], // returns a valid jsonx.children property
    getChildrenProps: [Function: getChildrenProps], // Used to pass properties down to child components if passprops is set to true
    getJSONXChildren: [Function: getJSONXChildren], // returns React Child Elements via JSONX
  },
  _jsonxComponents: {
    componentMap: {}, // object of all react components available for JSONX
    getBoundedComponents: [Function: getBoundedComponents], // getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
    getComponentFromLibrary: [Function: getComponentFromLibrary], // returns a react component from a component library (like material-ui, or semantic-ui)
    getComponentFromMap: [Function: getComponentFromMap], // returns a react element from jsonx.component
    getReactClassComponent: [Function: getReactClassComponent], // returns a react class component and support lifecycle functions, lazy and suspense components
    getReactFunctionComponent: [Function: getReactFunctionComponent], // returns a react function component and support lifecycle functions, hooks, lazy and suspense components
    FormComponent: [Function: FormComponent], // returns a helper react function component that allows you to create forms with [react-hook-form](https://react-hook-form.com/) without needed to add external form libraries
    DynamicComponent: [Function: DynamicComponent], // returns a helper react function component that allows you to create components that load data and render asynchronously. 
  },
  _jsonxProps: {
    getJSONXProps: [Function: getJSONXProps], // It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
    getEvalProps: [Function: getEvalProps], //Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
    getComponentProps: [Function: getComponentProps], // Resolves jsonx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
    getReactComponentProps: [Function: getReactComponentProps], // Resolves jsonx.__dangerouslyInsertReactComponents into an object that turns each value into a the React component from reactComponents, componentLibraries or ReactDOM.
    getFunctionFromProps: [Function: getFunctionFromProps], // Takes a function string and returns a function on either this.props or window.
    getFunctionProps: [Function: getFunctionProps], // Returns a resolved object from function strings that has functions pulled from jsonx.__functionProps
    getWindowComponents: [Function: getWindowComponents], // Returns a resolved object that has React Components pulled from window.__jsonx_custom_elements
    getComputedProps: [Function: getComputedProps], // Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty
  },
  _jsonxUtils: {
    validateJSONX: [Function: validateJSONX], //Validates JSONX JSON Syntax
    displayComponent: [Function displayComponent], // Used to evaluate whether or not to render a component
    traverse: [Function traverse], //take an object of array paths to traverse and resolve
    getAdvancedBinding: [Function: getAdvancedBinding], // Use to test if can bind components this context for react-redux-router
  },
}
```

---

## [Samples](../samples/index.html)

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

