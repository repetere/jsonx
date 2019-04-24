import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue, Fragment, Suspense, lazy, createContext, } from 'react';
import { default as ReactDOMElements, } from 'react-dom-factories';
import { getAdvancedBinding, } from './utils';
import createReactClass from 'create-react-class';
import { getReactElementFromJSONX, } from './main';
// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }
/**
 * @memberOf components
 */
export let advancedBinding = getAdvancedBinding();
// require;
/**
 * object of all react components available for JSONX
 * @memberOf components
 */
export let componentMap = Object.assign({ Fragment, Suspense, }, ReactDOMElements, (typeof window ==='object') ? window.__jsonx_custom_elements : {});

/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 * @memberOf components
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for JSONX
 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for JSONX
 */
export function getBoundedComponents(options = {}) {
  const { reactComponents, boundedComponents=[], } = options;
  if (advancedBinding || options.advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
      result[ componentName ] = reactComponents[ componentName ].bind(this);
      return result;
    }, {}));
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

/**
 * returns a react component from a component library
 * @memberOf components
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.jsonx={}] - any valid JSONX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
export function getComponentFromLibrary(options = {}) {
  const { componentLibraries = {}, jsonx = {}, } = options;
  const libComponent = Object.keys(componentLibraries)
    .map(libraryName => {
      const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, '');
      const libraryNameArray = cleanLibraryName.split('.');
      if (libraryNameArray.length === 2
        && componentLibraries[ libraryName ]
        && componentLibraries[ libraryName ][ libraryNameArray[ 0 ] ]
        && typeof componentLibraries[ libraryName ][ libraryNameArray[ 0 ] ][ libraryNameArray[ 1 ] ] !== 'undefined') {
        return componentLibraries[ libraryName ][ libraryNameArray[ 0 ] ][ libraryNameArray[ 1 ] ];
      } else if (typeof componentLibraries[ libraryName ][ cleanLibraryName ] !== 'undefined') {
        return componentLibraries[ libraryName ][ cleanLibraryName ];
      }
    })
    .filter(val => val)[ 0 ];
  return libComponent;
}

/**
 * returns a react element from jsonx.component
 * @memberOf components
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
export function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const { jsonx = {}, reactComponents = {}, componentLibraries = {}, logError = console.error, debug } = options;

  try {
    if (typeof jsonx.component !== 'string' && typeof jsonx.component === 'function') {
      return jsonx.component;
    } else if (ReactDOMElements[jsonx.component]) {
      return jsonx.component;
    } else if (reactComponents[ jsonx.component ]) {
      return reactComponents[jsonx.component];
    } else if (typeof jsonx.component ==='string' && jsonx.component.indexOf('.') > 0 && getComponentFromLibrary({ jsonx, componentLibraries, })) {
      return getComponentFromLibrary({ jsonx, componentLibraries, });
    } else {
      throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
    }
  } catch (e) {
    if(debug) logError(e, (e.stack) ? e.stack : 'no stack');
    throw e;
  }
}

/**
 * Returns a new function from an options object
 * @memberOf components
 * @param {Object} options 
 * @param {String} [options.body=''] - Function string body
 * @param {String[]} [options.args=[]] - Function arguments
 * @returns {Function} 
 */
export function getFunctionFromEval(options = {}) {
  const { body = '', args = [], } = options;
  const argus = [].concat(args);
  argus.push(body);
  return Function.prototype.constructor.apply({}, argus);
}

/**
 * Returns a new React Component
 * @memberOf components
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
export function getReactClassComponent(reactComponent = {}, options = {}) {
  // const util = require('util');
  // console.log(util.inspect({ reactComponent },{depth:20}));
  if (options.lazy) {
    return lazy(() => options.lazy(reactComponent, Object.assign({}, options, { lazy: false, })).then((lazyComponent) => {
      return {
        default: getReactClassComponent(...lazyComponent),
      };
    }));
  }
  const context = this || {};
  const { returnFactory = true, resources = {}, use_getState=true, bindContext=true, disableRenderIndexKey = true, } = options;
  const rjc = Object.assign({
    getDefaultProps: {
      body:'return {};',
    },
    getInitialState: {
      body:'return {};',
    },
  }, reactComponent);
  const rjcKeys = Object.keys(rjc);
  if (rjcKeys.includes('render') === false) {
    throw new ReferenceError('React components require a render method');
  }
  const classOptions = rjcKeys.reduce((result, val) => { 
    if (typeof rjc[ val ] === 'function') rjc[ val ] = { body: rjc[ val ], };
    const args = rjc[ val ].arguments;
    const body = rjc[ val ].body;
    if (!body) {
      console.warn({ rjc, });
      throw new SyntaxError(`Function(${val}) requires a function body`);
    }
    if (args && !Array.isArray(args) && (args.length &&(args.length && args.filter(arg=>typeof arg==='string').length)) ) {
      throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
    }
    if (val === 'render') {
      result[ val ] = function () {
        if (options.passprops && this.props) body.props = Object.assign({}, body.props, this.props);
        if (options.passstate && this.state) body.props = Object.assign({}, body.props, this.state);
        return getReactElementFromJSONX.call(Object.assign(
          {},
          context,
          bindContext ? this : {},
          { disableRenderIndexKey, },
          {
            props: use_getState
              ? Object.assign({}, this.props, { getState: () => this.state, })
              : this.props,
          }
        ), body, resources);
      };
    } else {
      result[ val ] = typeof body === 'function'
        ? body
        : getFunctionFromEval({
          body,
          args,
        });
    }

    return result;
  }, {});
  const reactComponentClass = createReactClass(classOptions);
  if (options.name) {
    Object.defineProperty(
      reactComponentClass,
      'name',
      {
        value: options.name,
      }
    );
  }
  const reactClass = returnFactory
    ? React.createFactory(reactComponentClass)
    : reactComponentClass;
  return reactClass;
}

/**
 * Returns new React Function Component
 * @memberOf components
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
export function getReactFunctionComponent(reactComponent = {}, functionBody = '', options = {}) {
  if (options.lazy) {
    return lazy(() => options.lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false, })).then((lazyComponent) => {
      return {
        default: getReactFunctionComponent(...lazyComponent),
      };
    }));
  }
  const { resources = {}, args=[], } = options;

  const props = reactComponent.props;
  const functionArgs = [ React, useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue, getReactElementFromJSONX, reactComponent, resources, props, ];
  if (typeof functionBody === 'function') functionBody = functionBody.toString();
  const functionComponent = Function('React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'getReactElementFromJSONX', 'reactComponent', 'resources', 'props', `
      return function ${options.name || 'Anonymous'}(props){
        ${functionBody}
        if(typeof exposeProps!=='undefined'){
          reactComponent.props = Object.assign({},props,exposeProps);
          // reactComponent.__functionargs = Object.keys(exposeProps);
        } else{
          reactComponent.props =  props;
        }
        if(!props.children) delete props.children;
  
        return getReactElementFromJSONX.call(this, reactComponent);
      }
    `);
  if (options.name) {
    Object.defineProperty(
      functionComponent,
      'name',
      {
        value: options.name,
      }
    );
  }
  return functionComponent(...functionArgs);
}
/**
 * @memberOf components
 */
export function getReactContext(options = {}) {
  return createContext(options.value);
}