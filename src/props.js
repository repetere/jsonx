import React from 'react';
import { getRenderedJSON, } from './main';
import * as utilities from './utils';

if (typeof window === 'undefined') {
  var window = {};
}

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
  const { rjx = {}, propName = 'asyncprops', traverseObject = {}, } = options;
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
 * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
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

export function getFunctionFromProps(options) {
  const { propFunc, } = options;

  if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props.reduxRouter') !== -1) {
    return this.props.reduxRouter[ propFunc.replace('func:this.props.reduxRouter.', '') ];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props') !== -1) {
    return this.props[ propFunc.replace('func:this.props.', '') ].bind(this);
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window[propFunc.replace('func:window.', '')] ==='function') {
    return window[ propFunc.replace('func:window.', '') ].bind(this);
  } else if(typeof this.props[propFunc] ==='function') {
    return propFunc.bind(this);
  } else {
    return function () { }
  }
}

export function getFunctionProps(options = {}) {
  const { allProps, rjx = {}, } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = rjx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] ==='string' && funcProps[key].indexOf('func:') !== -1 ){
      allProps[ key ] = getFunction({ propFunc: allProps[ key ], });
    } 
  });
  return allProps;
}

export function getWindowComponents(options = {}) {
  const { allProps, rjx, } = options;
  const windowComponents = rjx.__windowComponents;
  // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {
  Object.keys(windowComponents).forEach(key => {
    if (typeof windowComponents[ key ] === 'string' && windowComponents[ key ].indexOf('func:window.__rjx_custom_elements') !== -1 && typeof window.__rjx_custom_elements[ windowComponents[ key ].replace('func:window.__rjx_custom_elements.', '') ] === 'function') {
      const windowComponentElement = window.__rjx_custom_elements[ allProps[ key ].replace('func:window.__rjx_custom_elements.', '') ];
      const windowComponentProps = (allProps[ 'windowCompProps' ]) ? allProps[ 'windowCompProps' ]
        : this.props;
      allProps[ key ] = React.createElement(
        windowComponentElement,
        windowComponentProps,
        null);
    }
  });
  return allProps;
}

//any property that's prefixed with __ is a computedProperty
export function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const { rjx, resources, renderIndex, logError = console.error, useReduxState=true, ignoreReduxPropsInComponentLibraries=true, componentLibraries, debug, } = options;
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
    const asyncprops = getRJXProps({ rjx, propName: 'asyncprops', traverseObject: resources, });
    const windowprops = getRJXProps({ rjx, propName: 'windowprops', traverseObject: window, });
    const thisprops = getRJXProps({ rjx, propName: 'thisprops', traverseObject: componentThisProp, });

    //allowing javascript injections
    const evalProps = (rjx.__dangerouslyEvalProps || rjx.__dangerouslyBindEvalProps)
      ? getEvalProps.call(this, { rjx, })
      : {};
    const insertedComponents = (rjx.__dangerouslyInsertComponents)
      ? getComponentProps.call(this, { rjx, resources, debug, })
      : {};
    const allProps = Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
    const computedProps = Object.assign({}, allProps,
      rjx.__functionProps ? getFunctionProps.call(this, { allProps, rjx, }) : {},
      rjx.__windowComponents ? getWindowComponents.call(this, { allProps, rjx, }) : {});
    
    return computedProps;
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}