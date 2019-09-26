import React from 'react';
import { getRenderedJSON, } from './main';
import * as utilities from './utils';
import { getComponentFromMap, } from './components';
// if (typeof window === 'undefined') {
//   var window = window || {};
// }

//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
export const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
export const ARGUMENT_NAMES = /([^\s,]+)/g;
/**
 * returns the names of parameters from a function declaration
 * @example
 * const arrowFunctionAdd = (a,b)=>a+b;
 * function regularFunctionAdd(c,d){return c+d;}
 * getParamNames(arrowFunctionAdd) // => ['a','b']
 * getParamNames(regularFunctionAdd) // => ['c','d']
 * @param {Function} func 
 * @todo write tests
 */
export function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null){
    result = [];
  }
  return result;
}

/**
 * It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
 * @param {Object} [traverseObject={}] - the object that contains values of propName
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} [options.propName='asyncprops'] - Property on JSONX to resolve values onto, i.e (asyncprops,thisprops,windowprops) 
 * @returns {Object} resolved object
 * @example
 const traverseObject = {
  user: {
    name: 'jsonx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};
const testJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
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
const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
// => {
//   auth: 'OAuth2',
//   username: 'jsonx'
// }

//finally resolves:
const testJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
    auth: 'OAuth2',
    username: 'jsonx',
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
 */
export function getJSONXProps(options = {}) {
  // eslint-disable-next-line
  let { jsonx = {}, propName = 'asyncprops', traverseObject = {}, } = options;
  // return (jsonx.asyncprops && typeof jsonx.asyncprops === 'object')
  // ? utilities.traverse(jsonx.asyncprops, resources)
  // : {};
  return (jsonx[ propName ] && typeof jsonx[ propName ] === 'object')
    ? utilities.traverse(jsonx[ propName ], traverseObject)
    : {};
}

/**
 * returns children jsonx components defined on __spreadComponent spread over an array on props.__spread
 * @param {*} options 
 */
export function getChildrenComponents(options = {}) {
  const { allProps = {}, jsonx = {}, } = options;
  // const asyncprops = getJSONXProps({ jsonx, propName: 'spreadprops', traverseObject: allProps, });
  if (Array.isArray(allProps.__spread) === false) {
    if ((this && this.debug) || jsonx.debug) {
      return {
        children: new Error('Using __spreadComponent requires an array prop \'__spread\'').toString(),
      };
    } else {
      return { children:undefined, };
    }
  } else {
    return {
      _children: allProps.__spread.map(__item => {
        const clonedChild = Object.assign({}, jsonx.__spreadComponent);
        const clonedChildProps = Object.assign({}, clonedChild.props);
        clonedChildProps.__item = __item;
        clonedChild.props = clonedChildProps;
        return clonedChild;
      }),
    };
  }
}

export function boundArgsReducer(jsonx = {}) {
  return (args, arg) => {
    let val;
    if (this && this.state && typeof this.state[ arg ] !== undefined) val = (this.state[ arg ]);
    else if (this && this.props && typeof this.props[ arg ] !== undefined) val = (this.props[ arg ]);
    else if (jsonx.props && typeof jsonx.props[ arg ] !== undefined) val = (jsonx.props[ arg ]);
    if (typeof val !== undefined) args.push(val);
    return args.filter(a=>typeof a!=='undefined');
  };
}

/**
 * Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @returns {Object} returns resolved object with evaluated javascript
 * @example
 const testVals = {
    auth: 'true',
    username: '(user={})=>user.name',
  };
  const testJSONX = Object.assign({}, sampleJSONX, {
    __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
      email: '(function getUser(user={}){ return this.testBound(); })',
    },
  });
  const JSONXP = getEvalProps.call({ testBound: () => 'bounded', }, { jsonx: testJSONX, });
  const evalutedComputedFunc = JSONXP.username({ name: 'bob', });
  const evalutedComputedBoundFunc = JSONXP.email({ email:'test@email.domain', });
  // expect(JSONXP.auth).to.be.true;
  // expect(evalutedComputedFunc).to.eql('bob');
  // expect(evalutedComputedBoundFunc).to.eql('bounded');
 */
export function getEvalProps(options = {}) {
  const { jsonx, } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  let evAllProps = {};
  if (jsonx.__dangerouslyEvalAllProps) {
    let evVal;
    try {
      // eslint-disable-next-line
      evVal = (typeof evVal === 'function')
        ? jsonx.__dangerouslyEvalAllProps
        : scopedEval(jsonx.__dangerouslyEvalAllProps);
    } catch (e) { 
      if (this.debug || jsonx.debug) evVal = e;
    }
    evAllProps = evVal.call(this, { jsonx, });
  }
  const evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;
    try {
      // eslint-disable-next-line
      evVal = scopedEval(jsonx.__dangerouslyEvalProps[ epropName ]);
      evValString = evVal.toString();
    } catch (e) { 
      if (this.debug || jsonx.debug) evVal = e;
    }
    eprops[ epropName ] = (typeof evVal === 'function')
      ? evVal.call(this, { jsonx, })
      : evVal;
    if (this.exposeEval) eprops[ `__eval_${epropName}` ] = evValString;
    return eprops;
  }, {});
  const evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;

    try {
      let args;
      const functionBody = jsonx.__dangerouslyBindEvalProps[ epropName ];
      // InlineFunction = Function.prototype.constructor.apply({}, args);
      let functionDefinition;
      if (typeof functionBody === 'function') {
        functionDefinition = functionBody;
      } else {
        functionDefinition = scopedEval(jsonx.__dangerouslyBindEvalProps[ epropName ]);
        evValString = functionDefinition.toString();

      } // eslint-disable-next-line
      if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
        args = [this, ].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(this, jsonx), []));
      } else if (jsonx.__functionparams===false) {
        args = [this, ];
      } else {
        const functionDefArgs = getParamNames(functionDefinition);
        args = [this, ].concat(functionDefArgs.reduce(boundArgsReducer.call(this, jsonx), []));
      }
      // eslint-disable-next-line
      evVal = functionDefinition.bind(...args);
    } catch (e) { 
      if (this.debug || jsonx.debug) evVal = e;
    }
    // eslint-disable-next-line
    eprops[ epropName ] = evVal;
    if (this.exposeEval) eprops[ `__eval_${epropName}` ] = evValString;
    return eprops;
  }, {});

  return Object.assign({}, evProps, evBindProps, evAllProps);
}

/**
 * Resolves jsonx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} [options.resources={}] - object to use for resourceprops(asyncprops), usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
export function getComponentProps(options = {}) {
  const { jsonx, resources, } = options;
  return Object.keys(jsonx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    let componentVal;
    try {
      // eslint-disable-next-line
      componentVal = getRenderedJSON.call(this, jsonx.__dangerouslyInsertComponents[ cpropName ], resources);
    } catch (e) {
      if (this.debug || jsonx.debug) componentVal = e;
    }
    cprops[ cpropName ] = componentVal;
    return cprops;
  }, {});
}

/**
 * Resolves jsonx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
//  * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
export function getReactComponentProps(options = {}) {
  const { jsonx, } = options;
  if (jsonx.__dangerouslyInsertJSONXComponents && Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) { 
    return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        componentVal = getComponentFromMap({
          jsonx: jsonx.__dangerouslyInsertJSONXComponents[ cpropName ],
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries,
        });
      } catch (e) {
        if (this.debug || jsonx.debug) componentVal = e;
      }
      // eslint-disable-next-line
      cprops[ cpropName ] = componentVal;
      return cprops;
    }, {});
  } else {
    return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        componentVal = getComponentFromMap({
          jsonx: {
            component: jsonx.__dangerouslyInsertReactComponents[ cpropName ],
            props: jsonx.__dangerouslyInsertComponentProps
              ? jsonx.__dangerouslyInsertComponentProps[ cpropName ]
              : {},
          },
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries,
        });
      } catch (e) {
        if (this.debug || jsonx.debug) componentVal = e;
      }
      // eslint-disable-next-line
      cprops[ cpropName ] = componentVal;
      return cprops;
    }, {});
  }
}

/**
 * Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep
 * @param {Object} options 
 * @param {String} [options.propFunc='func:'] - function string, like func:window.LocalStorage.getItem or func:this.props.onClick  or func:inline.myInlineFunction
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Function} returns a function from this.props or window functions
 * @example
 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
 */
export function getFunctionFromProps(options) {
  const { propFunc='func:', propBody, jsonx, functionProperty='', } = options;
  // eslint-disable-next-line
  const { logError = console.error,  debug, } = this;
  const windowObject = this.window || global.window || {};
  try {
    const functionNameString = propFunc.split(':')[ 1 ] || '';
    const functionNameArray = functionNameString.split('.');
    const functionName = (functionNameArray.length) ? functionNameArray[ functionNameArray.length - 1 ] : '';

    if (propFunc.includes('func:inline')) {
      // eslint-disable-next-line
      let InlineFunction;
      if (jsonx.__functionargs) {
        const args = [].concat(jsonx.__functionargs[functionProperty]);
        args.push(propBody);
        InlineFunction = Function.prototype.constructor.apply({}, args);
      } else {
        InlineFunction = Function('param1', 'param2', '"use strict";' + propBody);
      }
      const [propFuncName, funcName, ] = propFunc.split('.');
      
      Object.defineProperty(
        InlineFunction,
        'name',
        {
          value: funcName,
        }
      );
      if (jsonx.__functionargs) {
        const boundArgs = [this,].concat(jsonx.__functionargs[functionProperty].map(arg => jsonx.props[ arg ]));
        return InlineFunction.bind(...boundArgs);
      } else {
        return InlineFunction.bind(this);
      }
    } else if (propFunc.indexOf('func:window') !== -1) {
      if (functionNameArray.length === 3) {
        try {
          return windowObject[ functionNameArray[ 1 ] ][ functionName ].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return windowObject[ functionNameArray[ 1 ] ][ functionName ];
        }
      } else {
        try {
          return windowObject[ functionName ].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return windowObject[ functionName ];
        }
      }
    } else if (functionNameArray.length === 4) {
      return (this.props)
        ? this.props[ functionNameArray[ 2 ] ][ functionName ]
        : jsonx.props[ functionNameArray[ 2 ] ][ functionName ];
    } else if (functionNameArray.length === 3) {
      return (this.props)
        ? this.props[ functionName ].bind(this)
        : jsonx.props[ functionName ].bind(this);
    } else {
      return function () {};
    }
  } catch (e) {
    if (this.debug){
      logError(e);
      if (jsonx && jsonx.debug) return e;
    }
    return function () {};
  }
}

/**
 * Returns a resolved object from function strings that has functions pulled from jsonx.__functionProps
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of functions from function strings
 */
export function getFunctionProps(options = {}) {
  const { allProps = {}, jsonx = {}, } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = jsonx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[ key ] === 'string' && funcProps[ key ].indexOf('func:') !== -1) {
      allProps[ key ] = getFunction({
        propFunc: funcProps[ key ],
        propBody: (jsonx.__inline)?jsonx.__inline[ key ]:'',
        jsonx,
        functionProperty:key,
      });
    } 
  });
  return allProps;
}

/**
 * Returns a resolved object that has React Components pulled from window.__jsonx_custom_elements
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of with React Components from a window property window.__jsonx_custom_elements
 */
export function getWindowComponents(options = {}) {
  const { allProps, jsonx, } = options;
  const windowComponents = jsonx.__windowComponents;
  const window = this.window || global.window || {};
  const windowFuncPrefix = 'func:window.__jsonx_custom_elements';
  // if (jsonx.hasWindowComponent && window.__jsonx_custom_elements) {
  Object.keys(windowComponents).forEach(key => {
    const windowKEY = (typeof windowComponents[ key ] === 'string')
      ? windowComponents[ key ].replace(`${windowFuncPrefix}.`, '')
      : '';
    if (typeof windowComponents[ key ] === 'string' && windowComponents[ key ].indexOf(windowFuncPrefix) !== -1 && typeof window.__jsonx_custom_elements[ windowKEY ] === 'function') {
      const windowComponentElement = window.__jsonx_custom_elements[ windowKEY ];
      const windowComponentProps = (allProps[ '__windowComponentProps' ]) ? allProps[ '__windowComponentProps' ]
        : this.props;
      allProps[ key ] = React.createElement(
        windowComponentElement,
        windowComponentProps,
        null);
    }
  });
  return allProps;
}

/**
 * Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @param {Number} options.renderIndex - number used for React key prop
 * @param {function} [options.logError=console.error] - error logging function
 * @param {Object} [options.componentLibraries] - react components to render with JSONX
 * @param {Boolean} [options.useReduxState=true] - use redux props in this.props
 * @param {Boolean} [options.ignoreReduxPropsInComponentLibraries=true] - ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties
 * @param {boolean} [options.debug=false] - use debug messages
 * @example
const testJSONX = { component: 'div',
  props: { id: 'generatedJSONX', className: 'jsonx' },
  children: [ [Object] ],
  asyncprops: { auth: [Array], username: [Array] },
  __dangerouslyEvalProps: { getUsername: '(user={})=>user.name' },
  __dangerouslyInsertComponents: { myComponent: [Object] } 
const resources = {
  user: {
    name: 'jsonx',
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
        jsonx: testJSONX,
        resources,
        renderIndex,
      });
computedProps = { key: 1,
     id: 'generatedJSONX',
     className: 'jsonx',
     auth: 'OAuth2',
     username: 'jsonx',
     getUsername: [Function],
     myComponent:
      { '$$typeof': Symbol(react.element),
        type: 'p',
        key: '8',
        ref: null,
        props: [Object],
        _owner: null,
        _store: {} } } }
 *
 */
export function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const { jsonx = {}, resources = {}, renderIndex, logError = console.error, useReduxState=true, ignoreReduxPropsInComponentLibraries=true, disableRenderIndexKey=true, componentLibraries, debug, } = options;
  try {
    const componentThisProp = (jsonx.thisprops)
      ? Object.assign({
        __jsonx: {
          _component: jsonx,
          _resources: resources,
        },
      }, this.props,
      jsonx.props,
      (useReduxState && !jsonx.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[ jsonx.component ]))
        ? (this.props && this.props.getState) ? this.props.getState() : {}
        : {}
      )
      : undefined;
    const windowTraverse = typeof window !== 'undefined' ? window : {};
    const asyncprops = jsonx.asyncprops ? getJSONXProps({ jsonx, propName: 'asyncprops', traverseObject: resources, }) : {};
    const resourceprops = jsonx.resourceprops ? getJSONXProps({ jsonx, propName: 'resourceprops', traverseObject: resources, }) : {};
    const windowprops = jsonx.windowprops ? getJSONXProps({ jsonx, propName: 'windowprops', traverseObject: windowTraverse, }) : {};
    const thisprops = jsonx.thisprops ? getJSONXProps({ jsonx, propName: 'thisprops', traverseObject: componentThisProp, }) : {};
    const thisstate = jsonx.thisstate ? getJSONXProps({ jsonx, propName: 'thisstate', traverseObject: this.state, }) : {};

    //allowing javascript injections
    const evalProps = (jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps)
      ? getEvalProps.call(this, { jsonx, })
      : {};
    const insertedComponents = (jsonx.__dangerouslyInsertComponents)
      ? getComponentProps.call(this, { jsonx, resources, debug, })
      : {};
    const insertedReactComponents = (jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents)
      ? getReactComponentProps.call(this, { jsonx, debug, })
      : {};
    
    const evalAllProps = (jsonx.__dangerouslyEvalAllProps)
      ? getEvalProps.call(this, { jsonx, })
      : {};
    const allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey ? {}: { key: renderIndex, }, jsonx.props, thisprops, thisstate, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
    const computedProps = Object.assign({}, allProps,
      jsonx.__functionProps ? getFunctionProps.call(this, { allProps, jsonx, }) : {},
      jsonx.__windowComponents ? getWindowComponents.call(this, { allProps, jsonx, }) : {},
      jsonx.__spreadComponent ? getChildrenComponents.call(this, { allProps, jsonx, }) : {},
      evalAllProps);
    if (jsonx.debug) console.debug({ jsonx, computedProps, });
    return computedProps;
  } catch (e) {
    debug && logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}