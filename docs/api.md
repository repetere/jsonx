# Class

# Function

## `getChildrenProperty(options: Object, options.rjx: Object, options.props: Object): Object[]|String`

returns a valid rjx.children property

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object | optional: true, default: {} | Valid RJX JSON |
| options.props | Object | optional: true, default: options.rjx.children | Props to pull children Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

## `getChildrenProps(options: Object, options.rjx: Object, options.childrjx: Object, options.renderIndex: Number, options.props: Object): Object|String`

Used to pass properties down to child components if passprops is set to true

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object | optional: true, default: {} | Valid RJX JSON |
| options.childrjx | Object | optional: true, default: {} | Valid RJX JSON |
| options.renderIndex | Number |  | React key property |
| options.props | Object | optional: true, default: options.rjx.props | Props to pull children Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

## `getRJXChildren(options: *)`

returns React Child Elements via RJX

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | * |  |

## `getBoundedComponents(options: Object, options.reactComponents: Object, boundedComponents: string[]): Object`

getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  | options for getBoundedComponents |
| options.reactComponents | Object |  | all react components available for RJX |
| boundedComponents | string[] |  | list of components to bind RJX this context (usually helpful for navigation and redux-router) |

## `getComponentFromLibrary(options: Object, options.componentLibraries: Object, options.rjx: Object): function|undefined`

returns a react component from a component library

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  | options for getComponentFromLibrary |
| options.componentLibraries | Object | optional: true, default: {} | react component library like bootstrap |
| options.rjx | Object | optional: true, default: {} | any valid RJX JSON |

## `getComponentFromMap(options: Object, options.rjx: object, options.reactComponents: Object, options.componentLibraries: Object, options.logError: function, options.debug: boolean): string|function|class`

returns a react element from rjx.component

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  | options for getComponentFromMap |
| options.rjx | object | optional: true, default: {} | any valid RJX JSON object |
| options.reactComponents | Object | optional: true, default: {} | react components to render |
| options.componentLibraries | Object | optional: true, default: {} | react components to render from another component library like bootstrap or bulma |
| options.logError | function | optional: true, default: console.error | error logging function |
| options.debug | boolean | optional: true, default: false | use debug messages |

## `getFunctionFromEval(options: Object, options.body: String, options.args: String[]): Function`

Returns a new function from an options object

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.body | String | optional: true, default: '' | Function string body |
| options.args | String[] | optional: true, default: [] | Function arguments |

## `getReactComponent(options.returnFactory: Boolean, options.resources: Object, reactComponent: Object, reactComponent.render.body: Object, reactComponent.getDefaultProps.body: String, reactComponent.getInitialState.body: String): Function`

Returns a new React Component

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options.returnFactory | Boolean | optional: true, default: true | returns a React component if true otherwise returns Component Class |
| options.resources | Object | optional: true, default: {} | asyncprops for component |
| reactComponent | Object | optional: true, default: {} | an object of functions used for create-react-class |
| reactComponent.render.body | Object |  | Valid RJX JSON |
| reactComponent.getDefaultProps.body | String |  | return an object for the default props |
| reactComponent.getInitialState.body | String |  | return an object for the default state |

## `getReactFunction(reactComponent: *, functionBody: String, options.name: String): Function`

Returns new React Function Component

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| reactComponent | * |  | Valid RJX to render |
| functionBody | String |  | String of function component body |
| options.name | String |  | Function Component name |

## `rjxRender(config: object, config.rjx: object, config.resources: object, config.querySelector: string)`

Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| config | object |  | options used to inject html via ReactDOM.render |
| config.rjx | object |  | any valid RJX JSON object |
| config.resources | object |  | any additional resource used for asynchronous properties |
| config.querySelector | string |  | selector for document.querySelector |

## `rjxHTMLString(config: object, config.rjx: object, config.resources: object): string`

Use ReactDOMServer.renderToString to render html from RJX

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| config | object |  | options used to inject html via ReactDOM.render |
| config.rjx | object |  | any valid RJX JSON object |
| config.resources | object |  | any additional resource used for asynchronous properties |

## `getRenderedJSON(rjx: object, resources: object): function`

Use React.createElement and RJX JSON to create React elements

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| rjx | object |  | any valid RJX JSON object |
| resources | object |  | any additional resource used for asynchronous properties |

## `__express(filePath: string, options: object, options.__boundConfig: object, options.__DOCTYPE: string, callback: *)`

Use RJX for express view rendering

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| filePath | string |  | path to rjx express view |
| options | object |  | property used for express view {locals} |
| options.__boundConfig | object |  | property used to bind this object for RJX, can be used to add custom components |
| options.__DOCTYPE | string | optional: true, default: "<!DOCTYPE html>" | html doctype string |
| callback | * |  |

## `__getReact()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `getRJXProps(traverseObject: Object, options: Object, options.rjx: Object, options.propName: Object): Object`

It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| traverseObject | Object | optional: true, default: {} | the object that contains values of propName |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.propName | Object | optional: true, default: 'asyncprops' | Property on RJX to resolve values onto, i.e (asyncprops,thisprops,windowprops) |

## `getEvalProps(options: Object, options.rjx: Object): Object`

Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |

## `getComponentProps(options: Object, options.rjx: Object, options.resources: Object): Object`

Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.resources | Object | optional: true, default: {} | object to use for resourceprops(asyncprops), usually a result of an asynchronous call |

## `getReactComponentProps(options: Object, options.rjx: Object): Object`

Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON // * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call |

## `getFunctionFromProps(options: Object, options.propFunc: String, options.allProps: Object): Function`

Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.propFunc | String | optional: true, default: 'func:' | function string, like func:window.LocalStorage.getItem or func:this.props.onClick or func:inline.myInlineFunction |
| options.allProps | Object | optional: true, default: {} | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents); |

## `getFunctionProps(options: Object, options.rjx: Object, options.allProps: Object): Object`

Returns a resolved object from function strings that has functions pulled from rjx.__functionProps

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.allProps | Object | optional: true, default: {} | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents); |

## `getWindowComponents(options: Object, options.rjx: Object, options.allProps: Object): Object`

Returns a resolved object that has React Components pulled from window.__rjx_custom_elements

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.allProps | Object | optional: true, default: {} | merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents); |

## `getComputedProps(options: Object, options.rjx: Object, options.resources: Object, options.renderIndex: Number, options.logError: function, options.componentLibraries: Object, options.useReduxState: Boolean, options.ignoreReduxPropsInComponentLibraries: Boolean, options.debug: boolean)`

Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.resources | Object | optional: true, default: {} | object to use for asyncprops, usually a result of an asynchronous call |
| options.renderIndex | Number |  | number used for React key prop |
| options.logError | function | optional: true, default: console.error | error logging function |
| options.componentLibraries | Object | optional: true | react components to render with RJX |
| options.useReduxState | Boolean | optional: true, default: true | use redux props in this.props |
| options.ignoreReduxPropsInComponentLibraries | Boolean | optional: true, default: true | ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties |
| options.debug | boolean | optional: true, default: false | use debug messages |

## `displayComponent(options: Object, options.rjx: Object, options.props: Object): Boolean`

Used to evaluate whether or not to render a component

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  |
| options.rjx | Object |  | Valid RJX JSON |
| options.props | Object |  | Props to test comparison values against, usually Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) |

## `getAdvancedBinding(): Boolean`

Use to test if can bind components this context for react-redux-router

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `traverse(paths: Object, data: Object): Object`

take an object of array paths to traverse and resolve

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| paths | Object |  | an object to resolve array property paths |
| data | Object |  | object to traverse |

## `validateRJX(rjx: Object, returnAllErrors: Boolean): Boolean|Error[]`

Validates RJX JSON Syntax

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| rjx | Object |  | RJX JSON to validate |
| returnAllErrors | Boolean | optional: true, default: false | flag to either throw error or to return all errors in an array of errors |

## `validSimpleRJXSyntax(simpleRJX: Object): Boolean`

validates simple RJX Syntax {[component]:{props,children}}

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| simpleRJX | Object |  | Any valid simple RJX Syntax |

## `simpleRJXSyntax(simpleRJX: Object): Object`

Transforms SimpleRJX to Valid RJX JSON {[component]:{props,children}} => {component,props,children}

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| simpleRJX | Object |  | JSON Object |

## `getSimplifiedRJX(rjx: Object): Object`

Transforms Valid RJX JSON to SimpleRJX {component,props,children} => {[component]:{props,children}}

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| rjx | Object |  | Valid RJX JSON object |