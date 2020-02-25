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
// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }
/**
 
 */
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
  if (advancedBinding || options.advancedBinding) {
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
): ReactComponentLike {
  // const util = require('util');
  // console.log(util.inspect({ reactComponent },{depth:20}));
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
  const rjc: any = Object.assign(
    {
      getDefaultProps: {
        body: "return {};"
      },
      getInitialState: {
        body: "return {};"
      }
    },
    reactComponent
  );
  const rjcKeys = Object.keys(rjc);
  if (rjcKeys.includes("render") === false) {
    throw new ReferenceError("React components require a render method");
  }
  const classOptions = rjcKeys.reduce((result: any, val: string) => {
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

export function DynamicComponent(
  this: defs.Context,
  props: defs.dynamicComponentProps = {}
) {
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
    jsonx,
    transformFunction = (data: any) => data,
    fetchURL,
    fetchOptions,
    fetchFunction
  } = props;
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
    props
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
    `
    'use strict';
    const self = this;

    return function ${options.name || "Anonymous"}(props){
      ${functionBody}
      if(typeof exposeprops==='undefined' || exposeprops){
        reactComponent.props = Object.assign({},props,typeof exposeprops==='undefined'?{}:exposeprops);
        if(typeof exposeprops!=='undefined') reactComponent.__functionargs = Object.keys(exposeprops);
      } else{
        reactComponent.props =  props;
      }
      if(!props.children) {
      //  delete props.children;
      }
      const context = ${options.bind ? "Object.assign(self,this)" : "this"};
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
 *
 */
export function getReactContext(options: any = {}) {
  return createContext(options.value);
}
