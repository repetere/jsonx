import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  Fragment,
  Suspense,
  lazy,
  createContext,
  ReactElement,
  FunctionComponent
} from "react";
import { ReactElementLike } from "prop-types";
import * as memoryCache from "memory-cache";
import { useForm, useController, useFieldArray, useWatch, Controller, } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// import {cache} from 'memory-cache';
// import cache from 'memory-cache';
//@ts-ignore
import { default as ReactDOMElements } from "react-dom-factories";
import { getAdvancedBinding, fetchJSON } from "./utils";
//@ts-ignore
import createReactClass from "create-react-class";
import { getReactElementFromJSONX } from ".";

import * as defs from "./types/jsonx/index";
import { ReactComponentLike } from "prop-types";
import { jsonxComponent } from "./types/jsonx/index";
declare global {
  interface window {
    [index: string]: any;
  }
  interface Window {
    [index: string]: any;
  }
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const cache = new memoryCache.Cache();
export const ReactHookForm = { ErrorMessage, Controller }
export const generatedCustomComponents:Map< string, defs.jsonx["jsonxComponents"] | Map<string,defs.jsonx["jsonxComponents"]>> = new Map();
// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }

//@ts-ignore
export let advancedBinding = getAdvancedBinding();
// require;
/**
 * object of all react components available for JSONX
 
 */
//@ts-ignore
export let componentMap = Object.assign(
  { Fragment, Suspense },
  ReactDOMElements,
  window && typeof window === "object" ? window.__jsonx_custom_elements : {}
);

/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for JSONX
 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for JSONX
 */
export function getBoundedComponents(
  this: defs.Context,
  options: {
    advancedBinding?: boolean;
    reactComponents?: defs.jsonx["jsonxComponents"];
    boundedComponents?: string[];
  } = {}
) {
  const { reactComponents, boundedComponents = [] } = options;
  if ( 
    (typeof options.advancedBinding === 'boolean' && options.advancedBinding) || (typeof options.advancedBinding==='undefined' && 
    advancedBinding)) {
    return Object.assign(
      {},
      reactComponents,
      boundedComponents.reduce(
        (result: defs.jsonx["jsonxComponents"], componentName) => {
          result[componentName] = reactComponents[componentName].bind(this);
          return result;
        },
        {}
      )
    );
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

/**
 * returns a react component from a component library
 
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.jsonx={}] - any valid JSONX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
export function getComponentFromLibrary(
  options: {
    jsonx: defs.jsonx;
    componentLibraries?: defs.jsonx["jsonxLibrary"];
  } = { jsonx: {} }
) {
  const { componentLibraries = {}, jsonx = {} } = options;
  const libComponent = Object.keys(componentLibraries)
    .map(libraryName => {
      //@ts-ignore
      const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, "");
      const libraryNameArray = cleanLibraryName.split(".");
      if (
        libraryNameArray.length === 2 &&
        componentLibraries[libraryName] &&
        componentLibraries[libraryName][libraryNameArray[0]] &&
        typeof componentLibraries[libraryName][libraryNameArray[0]][
          libraryNameArray[1]
        ] !== "undefined"
      ) {
        return componentLibraries[libraryName][libraryNameArray[0]][
          libraryNameArray[1]
        ];
      } else if (
        typeof componentLibraries[libraryName][cleanLibraryName] !== "undefined"
      ) {
        return componentLibraries[libraryName][cleanLibraryName];
      }
    })
    .filter(val => val)[0];
  return libComponent;
}

/**
 * returns a react element from jsonx.component
 
 * @example
 * // returns react elements
 * getComponentFromMap({jsonx:{component:'div'}})=>div
 * getComponentFromMap({jsonx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModal
 * getComponentFromMap({jsonx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
 * @param {Object} options - options for getComponentFromMap
 * @param {object} [options.jsonx={}] - any valid JSONX JSON object
 * @param {Object} [options.reactComponents={}] - react components to render
 * @param {Object} [options.componentLibraries={}] - react components to render from another component library like bootstrap or bulma
 * @param {function} [options.logError=console.error] - error logging function
 * @param {boolean} [options.debug=false] - use debug messages
 * @returns {string|function|class} valid react element
 */
export function getComponentFromMap(
  options: {
    jsonx?: defs.jsonx;
    reactComponents?: defs.jsonx["jsonxComponents"];
    componentLibraries?: defs.jsonx["jsonxLibrary"];
    logError?: any;
    debug?: boolean;
  } = {}
): any {
  //ReactElementLike | ReactComponentLike | ReactElement | ReactComponentLike
  // eslint-disable-next-line
  const {
    jsonx = {},
    reactComponents = {},
    componentLibraries = {},
    logError = console.error,
    debug
  } = options;

  try {
    if (
      typeof jsonx.component !== "string" &&
      typeof jsonx.component === "function"
    ) {
      return jsonx.component;
      //@ts-ignore
    } else if (jsonx.component && ReactDOMElements[jsonx.component]) {
      return jsonx.component;
      //@ts-ignore
    } else if (reactComponents[jsonx.component]) {
      //@ts-ignore
      return reactComponents[jsonx.component];
    } else if (
      typeof jsonx.component === "string" &&
      jsonx.component.indexOf(".") > 0 &&
      getComponentFromLibrary({ jsonx, componentLibraries })
    ) {
      return getComponentFromLibrary({ jsonx, componentLibraries });
    } else {
      throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
    }
  } catch (e) {
    if (debug) logError(e, e.stack ? e.stack : "no stack");
    throw e;
  }
}

/**
 * Returns a new function from an options object
 
 * @param {Object} options 
 * @param {String} [options.body=''] - Function string body
 * @param {String[]} [options.args=[]] - Function arguments
 * @returns {Function} 
 */
export function getFunctionFromEval(options: any = {}) {
  if (typeof options === "function") return options;
  const { body = "", args = [], name } = options;
  const argus: string[] = [].concat(args);
  argus.push(body);
  const evalFunction = Function.prototype.constructor.apply({ name }, argus);
  if (name) {
    Object.defineProperty(evalFunction, "name", { value: name });
  }
  return evalFunction;
}

/**
 * Returns a new React Component
 
 * @param {Boolean} [options.returnFactory=true] - returns a React component if true otherwise returns Component Class 
 * @param {Object} [options.resources={}] - asyncprops for component
 * @param {String} [options.name ] - Component name
 * @param {Function} [options.lazy ] - function that resolves {reactComponent,options} to lazy load component for code splitting
 * @param {Boolean} [options.use_getState=true] - define getState prop
 * @param {Boolean} [options.bindContext=true] - bind class this reference to render function components
 * @param {Boolean} [options.passprops ] - pass props to rendered component
 * @param {Boolean} [options.passstate] - pass state as props to rendered component
 * @param {Object} [reactComponent={}] - an object of functions used for create-react-class
 * @param {Object} reactComponent.render.body - Valid JSONX JSON
 * @param {String} reactComponent.getDefaultProps.body - return an object for the default props
 * @param {String} reactComponent.getInitialState.body - return an object for the default state
 * @returns {Function} 
 * @see {@link https://reactjs.org/docs/react-without-es6.html} 
 */
export function getReactClassComponent(
  this: defs.Context,
  reactComponent = {},
  options: any = {}
): unknown {
  // const util = require('util');
  // console.log(util.inspect({ reactComponent },{depth:20}));
  // console.log('reactComponent',reactComponent)
  if (options.lazy) {
    //@ts-ignore
    return lazy(() =>
      options
        .lazy(reactComponent, Object.assign({}, options, { lazy: false }))
        .then((lazyComponent: any) => {
          return {
            //@ts-ignore
            default: getReactClassComponent(...lazyComponent)
          };
        })
    );
  }
  const context: defs.Context = this || {};
  const {
    returnFactory = true,
    resources = {},
    use_getState = true,
    bindContext = true,
    disableRenderIndexKey = true
  } = options;
  const rjc: any = {
    //mounting
    getDefaultProps: {
      body: "return {};"
    },
    // (unsupported) getDerivedStateFromProps: undefined, // {body:'return null;', args:['props','state',]}
    getInitialState: {
      body: "return {};"
    },
    componentDidMount: undefined,
    UNSAFE_componentWillMount: undefined,
    
    //updating
    // (unsupported) getDerivedStateFromProps 
    shouldComponentUpdate: undefined, // {body:'return true;', args:['nextProps','nextState',]}
    getSnapshotBeforeUpdate: undefined, // {body:'return snapshot;', args:['prevProps', 'prevState)',]}
    componentDidUpdate: undefined, // {body:'', args:['prevProps', 'prevState','snapshot')',]}
    UNSAFE_componentWillUpdate: undefined, // {body:';', args:['nextProps','nextState',]}
    UNSAFE_componentWillReceiveProps: undefined, // {body:';', args:['nextProps',]}

    //unmounting
    componentWillUnmount: undefined,

    //error handling
    // (unsupported) componentDidCatch:undefined, // { body:'return ;', args:['error','info'] }
    // (unsupported) getDerivedStateFromError: undefined, // {body:' return { hasError:true}', args:['error')',]}
    
    //body
    ...reactComponent
  };
  const rjcKeys = Object.keys(rjc);
  if (rjcKeys.includes("render") === false) {
    throw new ReferenceError("React components require a render method");
  }
  const classOptions = rjcKeys.reduce((result: any, val: string) => {
    if (!rjc[val]) return result;
    if (typeof rjc[val] === "function") rjc[val] = { body: rjc[val] };
    const args = rjc[val].arguments;
    const body = rjc[val].body;
    if (!body) {
      console.warn({ rjc });
      throw new SyntaxError(`Function(${val}) requires a function body`);
    }
    if (
      args &&
      !Array.isArray(args) &&
      args.length &&
      args.length &&
      args.filter((arg: string) => typeof arg === "string").length
    ) {
      throw new TypeError(
        `Function(${val}) arguments must be an array or variable names`
      );
    }
    if (val === "render") {
      result[val] = function() {
        //@ts-ignore
        if (options.passprops && this && this.props)
          body.props = Object.assign({}, body.props, this.props);
        //@ts-ignore
        if (options.passstate && this.state)
          body.props = Object.assign({}, body.props, this.state);
        return getReactElementFromJSONX.call(
          Object.assign(
            {},
            context,
            bindContext ? this : { props: {} },
            { disableRenderIndexKey },
            {
              props:
                use_getState && this && this.props
                  ? //@ts-ignore
                    Object.assign({}, this.props, {
                      getState: () => this.state
                    })
                  : //@ts-ignore
                    this.props
            }
          ),
          body,
          resources
        );
      };
    } else {
      //@ts-ignore
      result[val] =
        typeof body === "function"
          ? body
          : getFunctionFromEval({
              body,
              args
            });
    }

    return result;
  }, {});
  const reactComponentClass = createReactClass(classOptions);
  if (options.name) {
    Object.defineProperty(reactComponentClass, "name", {
      value: options.name
    });
  }
  const reactClass = returnFactory
    ? React.createFactory(reactComponentClass)
    : reactComponentClass;
  return reactClass;
}

/**
 * A helper component that allows you to create forms with [react-hook-form](https://react-hook-form.com/) without needed to add external form libraries
 * @param this 
 * @param props 
 */
export function FormComponent(
  this: defs.Context,
  props: defs.formComponentProps = {}) {
  function FormComponentFunction(this: defs.Context, componentProps:any){
    const {
      hookFormOptions = {},
      // formComponent = { component: "div", children: "empty form" },
      onSubmit,
      formWrapperComponent,
      formKey,
      formWrapperProps,
    } = props;
    const formComponent = {
      component: "div", 
      children: "empty form",
      ...props.formComponent,
    }
    formComponent.props = {...formComponent.props,...componentProps};
    // const { register, unregister, errors, watch, handleSubmit, reset, setError, clearError, setValue, getValues, triggerValidation, control, formState, } = useForm(hookFormOptions);
    const reactHookForm = useForm(hookFormOptions);
    const context = {
      ...this || {},
      ...{ reactHookForm, },
    };
    if (!context.componentLibraries || !context.componentLibraries.ReactHookForm) {
      context.componentLibraries = {
      ...context.componentLibraries,
      ...{
          ReactHookForm: {
            Controller, ErrorMessage,
          }
        }
      }
    }
    const formWrapperJXM = formWrapperComponent||{
      component: 'form',
      props: {
        onSubmit: onSubmit ? reactHookForm.handleSubmit(onSubmit) : undefined,
        key: formKey ? `formWrapperJXM-${formKey}` : undefined,
        ...formWrapperProps,
      }
    };
    formWrapperJXM.children = Array.isArray(formComponent) ? formComponent : [formComponent];

    const renderJSONX = useMemo(() => getReactElementFromJSONX.bind(context), [
      context
    ]);
    return renderJSONX(formWrapperJXM)||null;
  }
  if (props.name) {
    Object.defineProperty(FormComponentFunction, "name", {
      value: props.name
    });
  }
  return FormComponentFunction.bind(this);
}

/**
 * A helper component that allows you to create components that load data and render asynchronously. 
 * @param this 
 * @param props 
 */
export function DynamicComponent(
  this: defs.Context,
  props: defs.dynamicComponentProps = {}
) {
  function DynamicComponentFunction(this: defs.Context, componentProps:any){
    //@ts-ignore
    const {
      useCache = true,
      cacheTimeout = 60 * 60 * 5,
      loadingJSONX = { component: "div", children: "...Loading" },
      //@ts-ignore
      loadingErrorJSONX = {
        component: "div",
        children: [
          { component: "span", children: "Error: " },
          {
            component: "span",
            resourceprops: { _children: ["error", "message"] }
          }
        ]
      },
      cacheTimeoutFunction = () => {},
      transformFunction = (data: any) => data,
      fetchURL,
      fetchOptions,
      fetchFunction
    } = props;
    const jsonx = {
      ...props.jsonx,
    }
    jsonx.props = {...jsonx.props,...componentProps};
    const context = this || {};
    const [state, setState] = useState({
      hasLoaded: false,
      hasError: false,
      resources: {},
      error: undefined
    });
    const transformer = useMemo(() => getFunctionFromEval(transformFunction), [
      transformFunction
    ]);
    const timeoutFunction = useMemo(
      () => getFunctionFromEval(cacheTimeoutFunction),
      [cacheTimeoutFunction]
    );
    const renderJSONX = useMemo(() => getReactElementFromJSONX.bind(context), [
      context
    ]);
    const loadingComponent = useMemo(() => renderJSONX(loadingJSONX), [
      loadingJSONX
    ]);
    const loadingError = useMemo(
      () => renderJSONX(loadingErrorJSONX, { error: state.error }),
      [loadingErrorJSONX, state.error]
    );

    useEffect(() => {
      async function getData() {
        try {
          //@ts-ignore
          let transformedData: unknown;
          if (useCache && cache.get(fetchURL)) {
            transformedData = cache.get(fetchURL);
          } else {
            let fetchedData;
            if (fetchFunction) {
              fetchedData = await fetchFunction(fetchURL, fetchOptions);
            } else fetchedData = await fetchJSON(fetchURL, fetchOptions);
            transformedData = await transformer(fetchedData);
            if (useCache)
              cache.put(fetchURL, transformedData, cacheTimeout, timeoutFunction);
          }
          //@ts-ignore
          setState(prevState =>
            Object.assign({}, prevState, {
              hasLoaded: true,
              hasError: false,
              resources: { DynamicComponentData: transformedData }
            })
          );
        } catch (e) {
          if (context.debug) console.warn(e);
          //@ts-ignore
          setState({ hasError: true, error: e });
        }
      }
      if (fetchURL) getData();
    }, [fetchURL, fetchOptions]);
    if (!fetchURL) return null;
    else if (state.hasError) {
      return loadingError;
    } else if (state.hasLoaded === false) {
      return loadingComponent;
    } else return renderJSONX(jsonx, state.resources);
  }
  if (props.name) {
    Object.defineProperty(DynamicComponentFunction, "name", {
      value: props.name
    });
  }
  return DynamicComponentFunction.bind(this);
}

/**
 * Returns new React Function Component
 
 * @todo set 'functionprops' to set arguments for function
 * @param {*} reactComponent - Valid JSONX to render
 * @param {String} functionBody - String of function component body
 * @param {String} options.name - Function Component name 
 * @returns {Function}
 * @see {@link https://reactjs.org/docs/hooks-intro.html}
 * @example
  const jsonxRender = {
   component:'div',
   passprops:'true',
   children:[ 
     {
      component:'input',
      thisprops:{
          value:['count'],
        },
     },
      {
        component:'button',
       __dangerouslyBindEvalProps:{
        onClick:function(count,setCount){
          setCount(count+1);
          console.log('this is inline',{count,setCount});
        },
        // onClick:`(function(count,setCount){
        //   setCount(count+1)
        //   console.log('this is inline',{count,setCount});
        // })`,
        children:'Click me'
      }
   ]
  };
  const functionBody = 'const [count, setCount] = useState(0); const functionprops = {count,setCount};'
  const options = { name: IntroHook}
  const MyCustomFunctionComponent = jsonx._jsonxComponents.getReactFunctionComponent({jsonxRender, functionBody, options});
   */
export function getReactFunctionComponent(
  this: defs.Context,
  reactComponent = {},
  functionBody: string | defs.functionParam = "",
  options: any = {}
) {
  if (options.lazy) {
    //@ts-ignore
    return lazy(() =>
      options
        .lazy(
          reactComponent,
          functionBody,
          Object.assign({}, options, { lazy: false })
        )
        .then((lazyComponent: any) => {
          return {
            //@ts-ignore
            default: getReactFunctionComponent(...lazyComponent)
          };
        })
    );
  }
  if (typeof options === "undefined" || typeof options.bind === "undefined")
    options.bind = true;
  const { resources = {}, args = [] } = options;
  //@ts-ignore
  const props = Object.assign({}, reactComponent.props);
  const functionArgs = [
    React,
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    useDebugValue,
    getReactElementFromJSONX,
    reactComponent,
    resources,
    props,
    useForm, 
    useController, 
    useFieldArray, 
    useWatch,
  ];
  //@ts-ignore
  if (typeof functionBody === "function")
    functionBody = functionBody.toString();
  
  const functionComponent = Function(
    "React",
    "useState",
    "useEffect",
    "useContext",
    "useReducer",
    "useCallback",
    "useMemo",
    "useRef",
    "useImperativeHandle",
    "useLayoutEffect",
    "useDebugValue",
    "getReactElementFromJSONX",
    "reactComponent",
    "resources",
    "props",
    "useForm", 
    "useController", 
    "useFieldArray", 
    "useWatch",
    `
    'use strict';
    const self = this || {};

    return function ${options.name || "Anonymous"}(props){
      ${functionBody}
      if(typeof exposeprops==='undefined' || exposeprops){
        reactComponent.props = Object.assign({},props,typeof exposeprops==='undefined'?{}:exposeprops);
        if(typeof exposeprops!=='undefined') reactComponent.__functionargs = Object.keys(exposeprops);
      } else{
        reactComponent.props =  props;
      }
      if(!props?.children) {
      //  delete props.children;
      }
      const context = ${options.bind ? "Object.assign(self,this||{})" : "this"};
      return getReactElementFromJSONX.call(context, reactComponent);
    }
  `
  );
  if (options.name) {
    Object.defineProperty(functionComponent, "name", {
      value: options.name
    });
  }
  return options.bind
    ? functionComponent.call(this, ...functionArgs)
    : functionComponent(...functionArgs);
}

/**
 * Returns the string of a function, the difference between calling .toString() on a function definition is, the toString method will return the entire function definition (with paramaters and the name, etc)
 * @param {Function} - The function you want the body string for
 * @returns {String}
 * @example
function myFunc(){
  const a = 1;
  const b = 3;
  return a + b;
} 
getFunctionBody(myFunc) => `
  const a = 1;
  const b = 3;
  return a + b;
`
 */
export function getFunctionBody(func:()=>any){
  const functionString = func.toString()
  if(functionString.includes('return')===false) throw new EvalError('JSONX Function Components can not use implicit returns')
  return functionString.substring(
    functionString.indexOf("{") + 1,
    functionString.lastIndexOf("}")
  )
}

/**
 * A helpful function that lets you write a regular JavaScript function and passes the appropriate arguments to getReactFunctionComponent
 * @param {Function} func - function definition to turn into React Component Function 
 * @property {object} this - options for getReactElementFromJSONX
 * @returns {Function} - React Component Function
 */
export function makeFunctionComponent(
  this: defs.Context,
  func:()=>any,
  options:any
  ){
  const scopedEval = eval; 
  const fullFunctionBody = getFunctionBody(func)
  const [functionBody,] = fullFunctionBody.split('return');
  let reactComponentString = fullFunctionBody.replace(functionBody,'').trim()
  const reactComponent = scopedEval(`(()=>{${reactComponentString}})()`);
  const functionOptions = {name:func.name,...options};
  return getReactFunctionComponent.call(this,reactComponent,functionBody,functionOptions)
}
/**
 *
 */
export function getReactContext(options: any = {}) {
  return createContext(options.value);
}

export function getCustomFunctionComponent(this: defs.Context, customComponent: Partial<defs.jsonxCustomComponent>): defs.genericComponent{
  const { options, functionBody, functionComponent, jsonxComponent, } = customComponent;
  if (functionComponent) {
    return makeFunctionComponent.call(this,functionComponent,options);
  } else {
    return getReactFunctionComponent.call(this,
      jsonxComponent,
      functionBody,
      options
    );
  }
}

export function getCustomComponentsCacheKey(customComponents:defs.jsonxCustomComponent[]):string{
  return customComponents.map(({name})=>name).join('')
}

/**
 * 
 * @param this 
 * @param customComponents 
 * @returns 
 * @example
 const customComponents = [
   {
      type: 'library',
      name: 'someLib',
      jsonx?: {
        Header: {
          type:'function',
          jsonxComponent: {p:'sample'},
          functionBody:'console.log(44)',
        },
        Footer: {
          type:'function',
          jsonxComponent: {p:'sample'},
          functionBody:'console.log(44)',
        }
      }
   },
   {
      type: 'component'|'function'|'library';
      name: string;
      jsonx?: jsonxDefinitionLibrary | jsonx;
      jsonxComponent?: jsonx;
      options?: {};
      functionBody?: (string);
      functionComponent?: ((props?:any)=>any);
   },
  ]
 */
export function getReactLibrariesAndComponents(this: defs.Context, customComponents: defs.jsonxCustomComponent[]): defs.jsonxLibrariesAndComponents {
  const customComponentsCacheKey = getCustomComponentsCacheKey(customComponents);
  if(generatedCustomComponents.has(customComponentsCacheKey)) return generatedCustomComponents.get(customComponentsCacheKey);

  const customComponentLibraries: defs.jsonxComponentLibraries = {};
  const customReactComponents: defs.jsonxComponent = {};

  if (customComponents && customComponents.length) {
    customComponents.forEach(customComponent => {
      const { type, name, jsonx, options, functionBody, functionComponent, jsonxComponent, } = customComponent;
      if (type === "library") {
        if (jsonxComponent||functionComponent) {
          customComponentLibraries[name] = Object
            .keys(jsonx as defs.jsonxLibrary)
            .reduce(
            (result: defs.jsonxLibrary, prop: string) => {
              const libraryComponent:Partial<defs.jsonxCustomComponent> = (jsonx as defs.jsonxDefinitionLibrary )[prop];
              const {
                type,
                name,
                jsonxComponent,
                options,
                functionBody
              } = libraryComponent;
              if (type === "component") {
                result[name as string] = getReactClassComponent.call(this,
                  jsonxComponent,
                  options
                ) as defs.genericComponent;
              } else {
                result[name as string] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent, });
              }
              return result;
            },
            {}
          );
        } else customComponentLibraries[name] = window[name];
      } else if (type === "component") {
        if (jsonx) {
          customReactComponents[name] = getReactClassComponent.call(this,
            jsonx,
            options
          ) as defs.genericComponent;
        } else customReactComponents[name] = window[name];
      } else if (type === "function" ) {
        if (jsonx) {
          customReactComponents[
            name
          ] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent:jsonx, });
        } else customReactComponents[name] = window[name];
      }
    });
  }

  generatedCustomComponents.set(customComponentsCacheKey,{
    customComponentLibraries,
    customReactComponents
  });
  return {
    customComponentLibraries,
    customReactComponents
  };
}