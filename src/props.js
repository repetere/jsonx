import React from 'react';
import { getRenderedJSON, } from './main';
import * as utilities from './utils';
import { getComponentFromMap, } from './components';

// if (typeof window === 'undefined') {
//   var window = window || {};
// }

/**
 * It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
 * @param {Object} [traverseObject={}] - the object that contains values of propName
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} [options.propName='asyncprops'] - Property on RJX to resolve values onto, i.e (asyncprops,thisprops,windowprops) 
 * @returns {Object} resolved object
 * @example
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
 */
export function getRJXProps(options = {}) {
  // eslint-disable-next-line
  let { rjx = {}, propName = 'asyncprops', traverseObject = {}, } = options;
  // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
  // ? utilities.traverse(rjx.asyncprops, resources)
  // : {};
  return (rjx[ propName ] && typeof rjx[ propName ] === 'object')
    ? utilities.traverse(rjx[ propName ], traverseObject)
    : {};
}

/**
 * Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @returns {Object} returns resolved object with evaluated javascript
 * @example
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
 */
export function getEvalProps(options = {}) {
  const { rjx, } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  const evProps = Object.keys(rjx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    // eslint-disable-next-line
    eprops[ epropName ] = scopedEval(rjx.__dangerouslyEvalProps[ epropName ]);
    return eprops;
  }, {});
  const evBindProps = Object.keys(rjx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    // eslint-disable-next-line
    eprops[ epropName ] = scopedEval(rjx.__dangerouslyBindEvalProps[ epropName ]).bind(this);
    return eprops;
  }, {});

  return Object.assign({}, evProps, evBindProps);
}

/**
 * Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} [options.resources={}] - object to use for resourceprops(asyncprops), usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
export function getComponentProps(options = {}) {
  const { rjx, resources, } = options;
  return Object.keys(rjx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    // eslint-disable-next-line
    cprops[ cpropName ] = getRenderedJSON.call(this, rjx.__dangerouslyInsertComponents[ cpropName ], resources);
    return cprops;
  }, {});
}

/**
 * Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
//  * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
export function getReactComponentProps(options = {}) {
  const { rjx,  } = options;
  return Object.keys(rjx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
    // eslint-disable-next-line
    cprops[ cpropName ] = getComponentFromMap({
      rjx: { component: rjx.__dangerouslyInsertReactComponents[ cpropName ], },
      reactComponents: this.reactComponents,
      componentLibraries: this.componentLibraries,
    });
    return cprops;
  }, {});
}

/**
 * Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep
 * @param {Object} options 
 * @param {String} [options.propFunc='func:'] - function string, like func:window.LocalStorage.getItem or this.props.onClick 
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Function} returns a function from this.props or window functions
 * @example
 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
 */
export function getFunctionFromProps(options) {
  const { propFunc='func:', } = options;
  // eslint-disable-next-line
  const { logError = console.error,  debug, } = this;
  const windowObject = this.window || global.window || {};
  try {
    const functionNameString = propFunc.split(':')[ 1 ] || '';
    const functionNameArray = functionNameString.split('.');
    const functionName = (functionNameArray.length) ? functionNameArray[ functionNameArray.length - 1 ] : '';

    if (propFunc.indexOf('func:window') !== -1) {
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
      return this.props[ functionNameArray[ 2 ] ][ functionName ];
    } else if (functionNameArray.length === 3) {
      return this.props[ functionName ].bind(this);
    } else {
      return function () {};
    }
  } catch (e) {
    if (debug) {
      logError(e);
    }
    return function () {};
  }
}

/**
 * Returns a resolved object from function strings that has functions pulled from rjx.__functionProps
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of functions from function strings
 */
export function getFunctionProps(options = {}) {
  const { allProps = {}, rjx = {}, } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = rjx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] ==='string' && funcProps[key].indexOf('func:') !== -1 ){
      allProps[ key ] = getFunction({ propFunc: funcProps[ key ], });
    } 
  });
  return allProps;
}

/**
 * Returns a resolved object that has React Components pulled from window.__rjx_custom_elements
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of with React Components from a window property window.__rjx_custom_elements
 */
export function getWindowComponents(options = {}) {
  const { allProps, rjx, } = options;
  const windowComponents = rjx.__windowComponents;
  const window = this.window || global.window || {};
  const windowFuncPrefix = 'func:window.__rjx_custom_elements';
  // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {
  Object.keys(windowComponents).forEach(key => {
    const windowKEY = (typeof windowComponents[ key ] === 'string')
      ? windowComponents[ key ].replace(`${windowFuncPrefix}.`, '')
      : '';
    if (typeof windowComponents[ key ] === 'string' && windowComponents[ key ].indexOf(windowFuncPrefix) !== -1 && typeof window.__rjx_custom_elements[ windowKEY ] === 'function') {
      const windowComponentElement = window.__rjx_custom_elements[ windowKEY ];
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
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @param {Number} options.renderIndex - number used for React key prop
 * @param {function} [options.logError=console.error] - error logging function
 * @param {Object} [options.componentLibraries] - react components to render with RJX
 * @param {Boolean} [options.useReduxState=true] - use redux props in this.props
 * @param {Boolean} [options.ignoreReduxPropsInComponentLibraries=true] - ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties
 * @param {boolean} [options.debug=false] - use debug messages
 * @example
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
 *
 */
export function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const { rjx = {}, resources = {}, renderIndex, logError = console.error, useReduxState=true, ignoreReduxPropsInComponentLibraries=true, componentLibraries, debug, } = options;
  try {
    const componentThisProp = (rjx.thisprops)
      ? Object.assign({
        __rjx: {
          _component: rjx,
          _resources: resources,
        },
      }, this.props,
      rjx.props,
      (useReduxState && !rjx.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[ rjx.component ]))
        ? (this.props && this.props.getState) ? this.props.getState() : {}
        : {}
      )
      : undefined;
    const windowTraverse = typeof window !== 'undefined' ? window : {};
    const asyncprops = getRJXProps({ rjx, propName: 'asyncprops', traverseObject: resources, });
    const resourceprops = getRJXProps({ rjx, propName: 'resourceprops', traverseObject: resources, });
    const windowprops = getRJXProps({ rjx, propName: 'windowprops', traverseObject: windowTraverse, });
    const thisprops = getRJXProps({ rjx, propName: 'thisprops', traverseObject: componentThisProp, });

    //allowing javascript injections
    const evalProps = (rjx.__dangerouslyEvalProps || rjx.__dangerouslyBindEvalProps)
      ? getEvalProps.call(this, { rjx, })
      : {};
    const insertedComponents = (rjx.__dangerouslyInsertComponents)
      ? getComponentProps.call(this, { rjx, resources, debug, })
      : {};
    const insertedReactComponents = (rjx.__dangerouslyInsertReactComponents)
      ? getReactComponentProps.call(this, { rjx, debug, })
      : {};
    const allProps = Object.assign({}, { key: renderIndex, }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
    const computedProps = Object.assign({}, allProps,
      rjx.__functionProps ? getFunctionProps.call(this, { allProps, rjx, }) : {},
      rjx.__windowComponents ? getWindowComponents.call(this, { allProps, rjx, }) : {});
    
    return computedProps;
  } catch (e) {
    debug && logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}