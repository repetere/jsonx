## Members

<dl>
<dt><a href="#componentMap">componentMap</a></dt>
<dd><p>object of all react components available for RJX</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getChildrenProperty">getChildrenProperty(options)</a> ⇒ <code>Array.&lt;Object&gt;</code> | <code>String</code></dt>
<dd><p>returns a valid rjx.children property</p>
</dd>
<dt><a href="#getChildrenProps">getChildrenProps(options)</a> ⇒ <code>Object</code> | <code>String</code></dt>
<dd><p>Used to pass properties down to child components if passprops is set to true</p>
</dd>
<dt><a href="#getRJXChildren">getRJXChildren(options)</a></dt>
<dd><p>returns React Child Elements via RJX</p>
</dd>
<dt><a href="#getBoundedComponents">getBoundedComponents(options, boundedComponents)</a> ⇒ <code>Object</code></dt>
<dd><p>getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list</p>
</dd>
<dt><a href="#getComponentFromLibrary">getComponentFromLibrary(options)</a> ⇒ <code>function</code> | <code>undefined</code></dt>
<dd><p>returns a react component from a component library</p>
</dd>
<dt><a href="#getComponentFromMap">getComponentFromMap(options)</a> ⇒ <code>string</code> | <code>function</code> | <code>class</code></dt>
<dd><p>returns a react element from rjx.component</p>
</dd>
<dt><a href="#getFunctionFromEval">getFunctionFromEval(options)</a> ⇒ <code>function</code></dt>
<dd><p>Returns a new function from an options object</p>
</dd>
<dt><a href="#getReactComponent">getReactComponent([returnFactory], [reactComponent])</a> ⇒ <code>function</code></dt>
<dd><p>Returns a new React Component</p>
</dd>
<dt><a href="#rjxRender">rjxRender(config)</a></dt>
<dd><p>Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render</p>
</dd>
<dt><a href="#rjxHTMLString">rjxHTMLString(config)</a> ⇒ <code>string</code></dt>
<dd><p>Use ReactDOMServer.renderToString to render html from RJX</p>
</dd>
<dt><a href="#getRenderedJSON">getRenderedJSON(rjx, resources)</a> ⇒ <code>function</code></dt>
<dd><p>Use React.createElement and RJX JSON to create React elements</p>
</dd>
<dt><a href="#getRJXProps">getRJXProps([traverseObject], options)</a> ⇒ <code>Object</code></dt>
<dd><p>It uses traverse on a traverseObject to returns a resolved object on propName. So if you&#39;re making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths</p>
</dd>
<dt><a href="#getEvalProps">getEvalProps(options)</a> ⇒ <code>Object</code></dt>
<dd><p>Used to evalute javascript and set those variables as props. getEvalProps evaluates <strong>dangerouslyEvalProps and </strong>dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, <strong>dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For </strong>dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})</p>
</dd>
<dt><a href="#getComponentProps">getComponentProps(options)</a> ⇒ <code>Object</code></dt>
<dd><p>Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.</p>
</dd>
<dt><a href="#getReactComponentProps">getReactComponentProps(options)</a> ⇒ <code>Object</code></dt>
<dd><p>Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.</p>
</dd>
<dt><a href="#getFunctionFromProps">getFunctionFromProps(options)</a> ⇒ <code>function</code></dt>
<dd><p>Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep</p>
</dd>
<dt><a href="#getFunctionProps">getFunctionProps(options)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a resolved object from function strings that has functions pulled from rjx.__functionProps</p>
</dd>
<dt><a href="#getWindowComponents">getWindowComponents(options)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a resolved object that has React Components pulled from window.__rjx_custom_elements</p>
</dd>
<dt><a href="#getComputedProps">getComputedProps(options)</a></dt>
<dd><p>Returns computed properties for React Components and any property that&#39;s prefixed with __ is a computedProperty</p>
</dd>
<dt><a href="#displayComponent">displayComponent(options)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Used to evaluate whether or not to render a component</p>
</dd>
<dt><a href="#getAdvancedBinding">getAdvancedBinding()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Use to test if can bind components this context for react-redux-router</p>
</dd>
<dt><a href="#traverse">traverse(paths, data)</a> ⇒ <code>Object</code></dt>
<dd><p>take an object of array paths to traverse and resolve</p>
</dd>
<dt><a href="#validateRJX">validateRJX(rjx, [returnAllErrors])</a> ⇒ <code>Boolean</code> | <code>Array.&lt;Error&gt;</code></dt>
<dd><p>Validates RJX JSON Syntax</p>
</dd>
</dl>

<a name="componentMap"></a>

## componentMap
object of all react components available for RJX

**Kind**: global variable  
<a name="getChildrenProperty"></a>

## getChildrenProperty(options) ⇒ <code>Array.&lt;Object&gt;</code> \| <code>String</code>
returns a valid rjx.children property

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> \| <code>String</code> - returns a valid rjx.children property that's either an array of RJX objects or a string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.rjx] | <code>Object</code> | <code>{}</code> | Valid RJX JSON |
| [options.props] | <code>Object</code> | <code>options.rjx.children</code> | Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

**Example**  
```js
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
        },
      },
      children:'hello world',
    },
    {
      component: 'div',
      children: [
        {
          component: 'ul',
          children: [
            {
              component: 'li',
              children:'list',
            },
          ],
        },
      ],
    },
  ],
};
const RJXChildren = getChildrenProperty({ rjx: sampleRJX, }); //=> [ [rjx Object],[rjx Object]]
const RJXChildrenPTag = getChildrenProperty({ rjx: sampleRJX.children[ 0 ], }); //=>hello world
```
<a name="getChildrenProps"></a>

## getChildrenProps(options) ⇒ <code>Object</code> \| <code>String</code>
Used to pass properties down to child components if passprops is set to true

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>String</code> - returns a valid  Valid RJX Child object or a string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.rjx] | <code>Object</code> | <code>{}</code> | Valid RJX JSON |
| [options.childrjx] | <code>Object</code> | <code>{}</code> | Valid RJX JSON |
| options.renderIndex | <code>Number</code> |  | React key property |
| [options.props] | <code>Object</code> | <code>options.rjx.props</code> | Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

<a name="getRJXChildren"></a>

## getRJXChildren(options)
returns React Child Elements via RJX

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>\*</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| this | <code>object</code> |  | options for getRenderedJSON |
| this.componentLibraries | <code>Object</code> |  | react components to render with RJX |
| this.debug | <code>boolean</code> | <code>false</code> | use debug messages |
| this.logError | <code>function</code> | <code>console.error</code> | error logging function |
| this.boundedComponents | <code>Array.&lt;string&gt;</code> | <code>[]</code> | list of components that require a bound this context (usefult for redux router) |

<a name="getBoundedComponents"></a>

## getBoundedComponents(options, boundedComponents) ⇒ <code>Object</code>
getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list

**Kind**: global function  
**Returns**: <code>Object</code> - reactComponents object of all react components available for RJX  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options for getBoundedComponents |
| options.reactComponents | <code>Object</code> | all react components available for RJX |
| boundedComponents | <code>Array.&lt;string&gt;</code> | list of components to bind RJX this context (usually helpful for navigation and redux-router) |

<a name="getComponentFromLibrary"></a>

## getComponentFromLibrary(options) ⇒ <code>function</code> \| <code>undefined</code>
returns a react component from a component library

**Kind**: global function  
**Returns**: <code>function</code> \| <code>undefined</code> - react component from react library like bootstrap, material design or bulma  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for getComponentFromLibrary |
| [options.componentLibraries] | <code>Object</code> | <code>{}</code> | react component library like bootstrap |
| [options.rjx] | <code>Object</code> | <code>{}</code> | any valid RJX JSON |

<a name="getComponentFromMap"></a>

## getComponentFromMap(options) ⇒ <code>string</code> \| <code>function</code> \| <code>class</code>
returns a react element from rjx.component

**Kind**: global function  
**Returns**: <code>string</code> \| <code>function</code> \| <code>class</code> - valid react element  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for getComponentFromMap |
| [options.rjx] | <code>object</code> | <code>{}</code> | any valid RJX JSON object |
| [options.reactComponents] | <code>Object</code> | <code>{}</code> | react components to render |
| [options.componentLibraries] | <code>Object</code> | <code>{}</code> | react components to render from another component library like bootstrap or bulma |
| [options.logError] | <code>function</code> | <code>console.error</code> | error logging function |
| [options.debug] | <code>boolean</code> | <code>false</code> | use debug messages |

**Example**  
```js
// returns react elementsgetComponentFromMap({rjx:{component:'div'}})=>divgetComponentFromMap({rjx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModalgetComponentFromMap({rjx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
```
<a name="getFunctionFromEval"></a>

## getFunctionFromEval(options) ⇒ <code>function</code>
Returns a new function from an options object

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.body] | <code>String</code> | <code>&#x27;&#x27;</code> | Function string body |
| [options.args] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Function arguments |

<a name="getReactComponent"></a>

## getReactComponent([returnFactory], [reactComponent]) ⇒ <code>function</code>
Returns a new React Component

**Kind**: global function  
**See**: [https://reactjs.org/docs/react-without-es6.html](https://reactjs.org/docs/react-without-es6.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [returnFactory] | <code>Object</code> | <code>true</code> | returns a React component if true otherwise returns Component Class |
| [reactComponent] | <code>Object</code> | <code>{}</code> | an object of functions used for create-react-class |
| reactComponent.render.body | <code>Object</code> |  | Valid RJX JSON |
| reactComponent.getDefaultProps.body | <code>String</code> |  | return an object for the default props |
| reactComponent.getInitialState.body | <code>String</code> |  | return an object for the default state |

<a name="rjxRender"></a>

## rjxRender(config)
Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | options used to inject html via ReactDOM.render |
| config.rjx | <code>object</code> | any valid RJX JSON object |
| config.resources | <code>object</code> | any additional resource used for asynchronous properties |
| config.querySelector | <code>string</code> | selector for document.querySelector |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| this | <code>object</code> | options for getRenderedJSON |

**Example**  
```js
// Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="rjx-generated"><p style="color:red;">hello world</p></div></div></body>rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
```
<a name="rjxHTMLString"></a>

## rjxHTMLString(config) ⇒ <code>string</code>
Use ReactDOMServer.renderToString to render html from RJX

**Kind**: global function  
**Returns**: <code>string</code> - React genereated html via RJX JSON  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | options used to inject html via ReactDOM.render |
| config.rjx | <code>object</code> | any valid RJX JSON object |
| config.resources | <code>object</code> | any additional resource used for asynchronous properties |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| this | <code>object</code> | options for getRenderedJSON |

**Example**  
```js
// Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
```
<a name="getRenderedJSON"></a>

## getRenderedJSON(rjx, resources) ⇒ <code>function</code>
Use React.createElement and RJX JSON to create React elements

**Kind**: global function  
**Returns**: <code>function</code> - React element via React.createElement  

| Param | Type | Description |
| --- | --- | --- |
| rjx | <code>object</code> | any valid RJX JSON object |
| resources | <code>object</code> | any additional resource used for asynchronous properties |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| this | <code>object</code> |  | options for getRenderedJSON |
| this.componentLibraries | <code>Object</code> |  | react components to render with RJX |
| this.debug | <code>boolean</code> | <code>false</code> | use debug messages |
| this.logError | <code>function</code> | <code>console.error</code> | error logging function |
| this.boundedComponents | <code>Array.&lt;string&gt;</code> | <code>[]</code> | list of components that require a bound this context (usefult for redux router) |

**Example**  
```js
// Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>rjx.getRenderedJSON({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
```
<a name="getRJXProps"></a>

## getRJXProps([traverseObject], options) ⇒ <code>Object</code>
It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [traverseObject] | <code>Object</code> | <code>{}</code> | the object that contains values of propName |
| options | <code>Object</code> |  |  |
| options.rjx | <code>Object</code> |  | Valid RJX JSON |
| [options.propName] | <code>Object</code> | <code>&#x27;asyncprops&#x27;</code> | Property on RJX to resolve values onto, i.e (asyncprops,thisprops,windowprops) |

**Example**  
```js
const traverseObject = {
  user: {
    name: 'rjx',
    description: 'react withouth javascript',
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
  asyncprops:{
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
      },
      children:'hello world',
    },
  ],
};
```
<a name="getEvalProps"></a>

## getEvalProps(options) ⇒ <code>Object</code>
Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})

**Kind**: global function  
**Returns**: <code>Object</code> - returns resolved object with evaluated javascript  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.rjx | <code>Object</code> | Valid RJX JSON |

**Example**  
```js
const testVals = {
    auth: 'true',
    username: '(user={})=>user.name',
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
<a name="getComponentProps"></a>

## getComponentProps(options) ⇒ <code>Object</code>
Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object of React Components  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.rjx | <code>Object</code> |  | Valid RJX JSON |
| [options.resources] | <code>Object</code> | <code>{}</code> | object to use for asyncprops, usually a result of an asynchronous call |

<a name="getReactComponentProps"></a>

## getReactComponentProps(options) ⇒ <code>Object</code>
Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object of React Components  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.rjx | <code>Object</code> | Valid RJX JSON  //  * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call |

<a name="getFunctionFromProps"></a>

## getFunctionFromProps(options) ⇒ <code>function</code>
Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep

**Kind**: global function  
**Returns**: <code>function</code> - returns a function from this.props or window functions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.propFunc] | <code>String</code> | <code>&#x27;func:&#x27;</code> | function string, like func:window.LocalStorage.getItem or this.props.onClick |
| [options.allProps] | <code>Object</code> | <code>{}</code> | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents); |

**Example**  
```js
getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
```
<a name="getFunctionProps"></a>

## getFunctionProps(options) ⇒ <code>Object</code>
Returns a resolved object from function strings that has functions pulled from rjx.__functionProps

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object of functions from function strings  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.rjx | <code>Object</code> |  | Valid RJX JSON |
| [options.allProps] | <code>Object</code> | <code>{}</code> | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents); |

<a name="getWindowComponents"></a>

## getWindowComponents(options) ⇒ <code>Object</code>
Returns a resolved object that has React Components pulled from window.__rjx_custom_elements

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object of with React Components from a window property window.__rjx_custom_elements  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.rjx | <code>Object</code> |  | Valid RJX JSON |
| [options.allProps] | <code>Object</code> | <code>{}</code> | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents); |

<a name="getComputedProps"></a>

## getComputedProps(options)
Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.rjx | <code>Object</code> |  | Valid RJX JSON |
| [options.resources] | <code>Object</code> | <code>{}</code> | object to use for asyncprops, usually a result of an asynchronous call |
| options.renderIndex | <code>Number</code> |  | number used for React key prop |
| [options.logError] | <code>function</code> | <code>console.error</code> | error logging function |
| [options.componentLibraries] | <code>Object</code> |  | react components to render with RJX |
| [options.useReduxState] | <code>Boolean</code> | <code>true</code> | use redux props in this.props |
| [options.ignoreReduxPropsInComponentLibraries] | <code>Boolean</code> | <code>true</code> | ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties |
| [options.debug] | <code>boolean</code> | <code>false</code> | use debug messages |

**Example**  
```js
const testRJX = { component: 'div',
  props: { id: 'generatedRJX', className: 'rjx' },
  children: [ [Object] ],
  asyncprops: { auth: [Array], username: [Array] },
  __dangerouslyEvalProps: { getUsername: '(user={})=>user.name' },
  __dangerouslyInsertComponents: { myComponent: [Object] } 
const resources = {
  user: {
    name: 'rjx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};
const renderIndex = 1;
getComputedProps.call({}, {
        rjx: testRJX,
        resources,
        renderIndex,
      });
computedProps = { key: 1,
     id: 'generatedRJX',
     className: 'rjx',
     auth: 'OAuth2',
     username: 'rjx',
     getUsername: [Function],
     myComponent:
      { '$$typeof': Symbol(react.element),
        type: 'p',
        key: '8',
        ref: null,
        props: [Object],
        _owner: null,
        _store: {} } } }
```
<a name="displayComponent"></a>

## displayComponent(options) ⇒ <code>Boolean</code>
Used to evaluate whether or not to render a component

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if all comparisons are true or if using or comparisons, at least one condition is true  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.rjx | <code>Object</code> | Valid RJX JSON |
| options.props | <code>Object</code> | Props to test comparison values against, usually Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

**Example**  
```js
const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className: 'rjx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testRJX = Object.assign({}, sampleRJX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ rjx: testRJX, props: testRJX2.props, }) // => false
```
<a name="getAdvancedBinding"></a>

## getAdvancedBinding() ⇒ <code>Boolean</code>
Use to test if can bind components this context for react-redux-router

**Kind**: global function  
**Returns**: <code>Boolean</code> - true if browser is not IE or old android / chrome  
<a name="traverse"></a>

## traverse(paths, data) ⇒ <code>Object</code>
take an object of array paths to traverse and resolve

**Kind**: global function  
**Returns**: <code>Object</code> - resolved object with traversed properties  
**Throws**:

- <code>TypeError</code> 


| Param | Type | Description |
| --- | --- | --- |
| paths | <code>Object</code> | an object to resolve array property paths |
| data | <code>Object</code> | object to traverse |

**Example**  
```js
const testObj = {
      user: {
        name: 'rjx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'rjx',  }
```
<a name="validateRJX"></a>

## validateRJX(rjx, [returnAllErrors]) ⇒ <code>Boolean</code> \| <code>Array.&lt;Error&gt;</code>
Validates RJX JSON Syntax

**Kind**: global function  
**Returns**: <code>Boolean</code> \| <code>Array.&lt;Error&gt;</code> - either returns true if RJX is valid, or throws validation error or returns list of errors in array  
**Throws**:

- <code>SyntaxError</code><code>TypeError</code><code>ReferenceError</code> 


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rjx | <code>Object</code> |  | RJX JSON to validate |
| [returnAllErrors] | <code>Boolean</code> | <code>false</code> | flag to either throw error or to return all errors in an array of errors |

**Example**  
```js
validateRJX({component:'p',children:'hello world'})=>truevalidateRJX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
```
