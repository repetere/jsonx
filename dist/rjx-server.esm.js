import React, { Fragment, Suspense, lazy, createContext, useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue } from 'react';
import ReactDOM from 'react-dom/server';
import ReactDOMElements from 'react-dom-factories';
import UAParser from 'ua-parser-js';
import createReactClass from 'create-react-class';

function setState(newState) {
  this.state = { ...this.state,
    ...newState
  };
  this.listeners.forEach(listener => {
    listener(this.state);
  });
}

function useCustom(React) {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== newListener);
    };
  }, []);
  return [this.state, this.actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }

    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = {
    state: initialState,
    listeners: []
  };
  store.setState = setState.bind(store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(store, React);
};

/**
 * Used to evaluate whether or not to render a component
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
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
 */

function displayComponent(options = {}) {
  const {
    rjx = {},
    props
  } = options;
  const propsToCompare = rjx.comparisonprops;
  const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(comp => {
    const compares = {};

    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }

    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }

    const propcompares = traverse(compares, props || rjx.props);
    const opscompares = Object.assign({}, comp, propcompares); // console.debug({ opscompares, compares, renderedCompProps });

    switch (opscompares.operation) {
      case 'eq':
      case '==':
        // return opscompares.left == opscompares.right;
        // eslint-disable-next-line
        return opscompares.left == opscompares.right;

      case 'dneq':
      case '!=':
      case '!':
        // return opscompares.left != opscompares.right;
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
      default:
        //'exists'
        return opscompares.left !== undefined && opscompares.left !== null;
    } // }
    // if (opscompares.operation === 'eq') {
    //   // return opscompares.left == opscompares.right;
    //   // eslint-disable-next-line
    //   return opscompares.left == opscompares.right;
    // } else if (opscompares.operation === 'dneq') {
    //   // return opscompares.left != opscompares.right;
    //   return opscompares.left !== opscompares.right;
    // } else if (opscompares.operation === 'dnseq') {
    //   return opscompares.left !== opscompares.right;
    // } else if (opscompares.operation === 'seq') {
    //   return opscompares.left === opscompares.right;
    // } else if (opscompares.operation === 'lt') {
    //   return opscompares.left < opscompares.right;
    // } else if (opscompares.operation === 'lte') {
    //   return opscompares.left <= opscompares.right;
    // } else if (opscompares.operation === 'gt') {
    //   return opscompares.left > opscompares.right;
    // } else if (opscompares.operation === 'gte') {
    //   return opscompares.left >= opscompares.right;
    // } else if (opscompares.operation === 'dne') {
    //   return opscompares.left === undefined || opscompares.left === null;
    // } else { //'exists'
    //   return opscompares.left !== undefined && opscompares.left !== null;
    // }

  }) : [];
  const validProps = comparisons.filter(comp => comp === true);

  if (!rjx.comparisonprops) {
    return true;
  } else if (rjx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (validProps.length !== comparisons.length && !rjx.comparisonorprops) {
    return false;
  } else {
    return true;
  }
}
/**
 * Use to test if can bind components this context for react-redux-router 
 * @returns {Boolean} true if browser is not IE or old android / chrome
 */

function getAdvancedBinding() {
  if (typeof window === 'undefined') {
    var window = this && this.window ? this.window : global.window || {};
    if (!window.navigator) return false;
  }

  try {
    if (window && window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
      // console.log('window.navigator.userAgent',window.navigator.userAgent)
      if (window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }

      const uastring = window.navigator.userAgent;
      const parser = new UAParser();
      parser.setUA(uastring);
      const parseUserAgent = parser.getResult(); // console.log({ parseUserAgent, });

      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView') && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }

      if (parseUserAgent.browser.name === 'Android Browser') {
        return false;
      }
    }
  } catch (e) {
    console.error(e); // console.warn('could not detect browser support', e);

    return false;
  }

  return true;
}
/**
 * take an object of array paths to traverse and resolve
 * @example
 * const testObj = {
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
 * @param {Object} paths - an object to resolve array property paths 
 * @param {Object} data - object to traverse
 * @returns {Object} resolved object with traversed properties
 * @throws {TypeError} 
 */

function traverse(paths = {}, data = {}) {
  let keys = Object.keys(paths);
  if (!keys.length) return paths;
  return keys.reduce((result, key) => {
    if (typeof paths[key] === 'string') result[key] = data[paths[key]];else if (Array.isArray(paths[key])) {
      let _path = Object.assign([], paths[key]);

      let value = data;

      while (_path.length && value && typeof value === 'object') {
        let prop = _path.shift();

        value = value[prop];
      }

      result[key] = _path.length ? undefined : value;
    } else throw new TypeError('dynamic property paths must be a string or an array of strings or numeric indexes');
    return result;
  }, {});
}
/**
 * Validates RJX JSON Syntax
 * @example
 * validateRJX({component:'p',children:'hello world'})=>true
 * validateRJX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} rjx - RJX JSON to validate 
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if RJX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */

function validateRJX(rjx = {}, returnAllErrors = false) {
  const dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops', 'thisstate'];
  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
  const validKeys = ['component', 'props', 'children', '__spreadComponent', '__inline', '__functionargs', '__dangerouslyInsertComponents', '__dangerouslyInsertComponentProps', '__dangerouslyInsertRJXComponents', '__functionProps', '__functionparams', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops', 'debug'].concat(dynamicPropsNames, evalPropNames);
  let errors = [];

  if (!rjx.component) {
    errors.push(SyntaxError('[0001] Missing React Component'));
  }

  if (rjx.props) {
    if (typeof rjx.props !== 'object' || Array.isArray(rjx.props)) {
      errors.push(TypeError('[0002] ' + rjx.component + ': props must be an Object / valid React props'));
    }

    if (rjx.props.children && (typeof rjx.props.children !== 'string' || !Array.isArray(rjx.props.children))) {
      errors.push(TypeError('[0003] ' + rjx.component + ': props.children must be an array of RJX JSON objects or a string'));
    }

    if (rjx.props._children && (typeof rjx.props._children !== 'string' || !Array.isArray(rjx.props._children))) {
      errors.push(TypeError('[0004] ' + rjx.component + ': props._children must be an array of RJX JSON objects or a string'));
    }
  }

  if (rjx.children) {
    if (typeof rjx.children !== 'string' && !Array.isArray(rjx.children)) {
      errors.push(TypeError('[0005] ' + rjx.component + ': children must be an array of RJX JSON objects or a string'));
    }

    if (Array.isArray(rjx.children)) {
      const childrenErrors = rjx.children.filter(c => typeof c === 'object').map(c => validateRJX(c, returnAllErrors));
      errors = errors.concat(...childrenErrors);
    }
  }

  dynamicPropsNames.forEach(dynamicprop => {
    const rjxDynamicProps = rjx[dynamicprop];

    if (rjxDynamicProps) {
      // if (dynamicprop === 'thisprops') {
      //   console.log({ dynamicprop, rjxDynamicProps });
      // }
      if (typeof rjxDynamicProps !== 'object') {
        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
      }

      Object.keys(rjxDynamicProps).forEach(resolvedDynamicProp => {
        if (!Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          errors.push(TypeError(`[0007] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
        }

        if (Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          const allStringArray = rjxDynamicProps[resolvedDynamicProp].filter(propArrayItem => typeof propArrayItem === 'string');

          if (allStringArray.length !== rjxDynamicProps[resolvedDynamicProp].length) {
            errors.push(TypeError(`[0008] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
          }
        }
      });
    }
  });
  const evalProps = rjx.__dangerouslyEvalProps;
  const boundEvalProps = rjx.__dangerouslyBindEvalProps;

  if (evalProps || boundEvalProps) {
    if (evalProps && typeof evalProps !== 'object' || boundEvalProps && typeof boundEvalProps !== 'object') {
      errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
    }

    evalPropNames.filter(evalProp => rjx[evalProp]).forEach(eProps => {
      const evProp = rjx[eProps];
      const scopedEval = eval;
      Object.keys(evProp).forEach(propToEval => {
        if (typeof evProp[propToEval] !== 'string') {
          errors.push(TypeError(`[0010] rjx.${eProps}.${evProp} must be a string`));
        }

        try {
          // console.log({ eProps });
          if (eProps === '__dangerouslyBindEvalProps') {
            const funcToBind = scopedEval(`(${evProp[propToEval]})`);
            funcToBind.call({
              bounded: true
            });
          } else {
            scopedEval(evProp[propToEval]);
          }
        } catch (e) {
          errors.push(e);
        }
      });
    });
  }

  if (rjx.__dangerouslyInsertComponents) {
    Object.keys(rjx.__dangerouslyInsertComponents).forEach(insertedComponents => {
      try {
        validateRJX(rjx.__dangerouslyInsertComponents[insertedComponents]);
      } catch (e) {
        errors.push(TypeError(`[0011] rjx.__dangerouslyInsertComponents.${insertedComponents} must be a valid RJX JSON Object: ${e.toString()}`));
      }
    });
  }

  if (rjx.__functionProps) {
    if (typeof rjx.__functionProps !== 'object') {
      errors.push(TypeError('[0012] rjx.__functionProps  must be an object'));
    } else {
      Object.keys(rjx.__functionProps).forEach(fProp => {
        if (rjx.__functionProps[fProp] && (typeof rjx.__functionProps[fProp] !== 'string' || rjx.__functionProps[fProp].indexOf('func:') === -1)) {
          errors.push(ReferenceError(`[0013] rjx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
        }
      });
    }
  }

  if (rjx.__windowComponentProps && (typeof rjx.__windowComponentProps !== 'object' || Array.isArray(rjx.__windowComponentProps))) {
    errors.push(TypeError('[0013] rjx.__windowComponentProps  must be an object'));
  }

  if (rjx.__windowComponents) {
    if (typeof rjx.__windowComponents !== 'object') {
      errors.push(TypeError('[0014] rjx.__windowComponents must be an object'));
    }

    Object.keys(rjx.__windowComponents).forEach(cProp => {
      if (typeof rjx.__windowComponents[cProp] !== 'string' || rjx.__windowComponents[cProp].indexOf('func:') === -1) {
        errors.push(ReferenceError(`[0015] rjx.__windowComponents.${cProp} must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)`));
      }
    });
  }

  if (typeof rjx.comparisonorprops !== 'undefined' && typeof rjx.comparisonorprops !== 'boolean') {
    errors.push(TypeError('[0016] rjx.comparisonorprops  must be boolean'));
  }

  if (rjx.comparisonprops) {
    if (!Array.isArray(rjx.comparisonprops)) {
      errors.push(TypeError('[0017] rjx.comparisonprops  must be an array or comparisons'));
    } else {
      rjx.comparisonprops.forEach(c => {
        if (typeof c !== 'object') {
          errors.push(TypeError('[0018] rjx.comparisonprops  must be an array or comparisons objects'));
        } else if (typeof c.left === 'undefined') {
          errors.push(TypeError('[0019] rjx.comparisonprops  must be have a left comparison value'));
        }
      });
    }
  }

  if (typeof rjx.passprops !== 'undefined' && typeof rjx.passprops !== 'boolean') {
    errors.push(TypeError('[0020] rjx.passprops  must be boolean'));
  }

  const invalidKeys = Object.keys(rjx).filter(key => validKeys.indexOf(key) === -1);

  if (errors.length) {
    if (returnAllErrors) return errors;
    throw errors[0];
  }

  return invalidKeys.length ? `Warning: Invalid Keys [${invalidKeys.join()}]` : true;
}
/**
 * validates simple RJX Syntax {[component]:{props,children}}
 * @param {Object} simpleRJX - Any valid simple RJX Syntax
 * @return {Boolean} returns true if simpleRJX is valid
 */

function validSimpleRJXSyntax(simpleRJX = {}) {
  if (Object.keys(simpleRJX).length !== 1 && !simpleRJX.component) {
    return false;
  } else {
    const componentName = Object.keys(simpleRJX)[0];
    return Object.keys(simpleRJX).length === 1 && !simpleRJX[componentName].component && typeof simpleRJX[componentName] === 'object' ? true : false;
  }
}
/**
 * Transforms SimpleRJX to Valid RJX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleRJX JSON Object 
 * @return {Object} - returns a valid RJX JSON Object from a simple RJX JSON Object
 */

function simpleRJXSyntax(simpleRJX = {}) {
  const component = Object.keys(simpleRJX)[0];

  try {
    return Object.assign({}, {
      component
    }, simpleRJX[component], {
      children: simpleRJX[component].children && Array.isArray(simpleRJX[component].children) ? simpleRJX[component].children.map(simpleRJXSyntax) : simpleRJX[component].children
    });
  } catch (e) {
    throw SyntaxError('Invalid Simple RXJ Syntax', e);
  }
}
/**
 * Transforms Valid RJX JSON to SimpleRJX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} rjx Valid RJX JSON object 
 * @return {Object} - returns a simple RJX JSON Object from a valid RJX JSON Object 
 */

function getSimplifiedRJX(rjx = {}) {
  try {
    if (!rjx.component) return rjx; //already simple

    const componentName = rjx.component;
    rjx.children = Array.isArray(rjx.children) ? rjx.children.filter(child => child) //remove empty children
    .map(getSimplifiedRJX) : rjx.children;
    delete rjx.component;
    return {
      [componentName]: rjx
    };
  } catch (e) {
    throw e;
  }
}

var rjxUtils = /*#__PURE__*/Object.freeze({
  displayComponent: displayComponent,
  getAdvancedBinding: getAdvancedBinding,
  traverse: traverse,
  validateRJX: validateRJX,
  validSimpleRJXSyntax: validSimpleRJXSyntax,
  simpleRJXSyntax: simpleRJXSyntax,
  getSimplifiedRJX: getSimplifiedRJX
});

//   var window = window || global.window || {};
// }

let advancedBinding = getAdvancedBinding(); // require;

/**
 * object of all react components available for RJX
 */

let componentMap = Object.assign({
  Fragment,
  Suspense
}, ReactDOMElements, typeof window === 'object' ? window.__rjx_custom_elements : {});
/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for RJX
 * @param {string[]} boundedComponents - list of components to bind RJX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for RJX
 */

function getBoundedComponents(options = {}) {
  const {
    reactComponents,
    boundedComponents = []
  } = options;

  if (advancedBinding || options.advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
      result[componentName] = reactComponents[componentName].bind(this);
      return result;
    }, {})); // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}
/**
 * returns a react component from a component library
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.rjx={}] - any valid RJX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */

function getComponentFromLibrary(options = {}) {
  const {
    componentLibraries = {},
    rjx = {}
  } = options;
  const libComponent = Object.keys(componentLibraries).map(libraryName => {
    const cleanLibraryName = rjx.component.replace(`${libraryName}.`, '');
    const libraryNameArray = cleanLibraryName.split('.');

    if (libraryNameArray.length === 2 && componentLibraries[libraryName] && componentLibraries[libraryName][libraryNameArray[0]] && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== 'undefined') {
      return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
    } else if (typeof componentLibraries[libraryName][cleanLibraryName] !== 'undefined') {
      return componentLibraries[libraryName][cleanLibraryName];
    }
  }).filter(val => val)[0];
  return libComponent;
}
/**
 * returns a react element from rjx.component
 * @example
 * // returns react elements
 * getComponentFromMap({rjx:{component:'div'}})=>div
 * getComponentFromMap({rjx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModal
 * getComponentFromMap({rjx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
 * @param {Object} options - options for getComponentFromMap
 * @param {object} [options.rjx={}] - any valid RJX JSON object
 * @param {Object} [options.reactComponents={}] - react components to render
 * @param {Object} [options.componentLibraries={}] - react components to render from another component library like bootstrap or bulma
 * @param {function} [options.logError=console.error] - error logging function
 * @param {boolean} [options.debug=false] - use debug messages
 * @returns {string|function|class} valid react element
 */

function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const {
    rjx = {},
    reactComponents = {},
    componentLibraries = {},
    logError = console.error,
    debug
  } = options;

  try {
    if (typeof rjx.component !== 'string' && typeof rjx.component === 'function') {
      return rjx.component;
    } else if (ReactDOMElements[rjx.component]) {
      return rjx.component;
    } else if (reactComponents[rjx.component]) {
      return reactComponents[rjx.component];
    } else if (typeof rjx.component === 'string' && rjx.component.indexOf('.') > 0 && getComponentFromLibrary({
      rjx,
      componentLibraries
    })) {
      return getComponentFromLibrary({
        rjx,
        componentLibraries
      });
    } else {
      throw new ReferenceError(`Invalid React Component (${rjx.component})`);
    }
  } catch (e) {
    if (debug) logError(e, e.stack ? e.stack : 'no stack');
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

function getFunctionFromEval(options = {}) {
  const {
    body = '',
    args = []
  } = options;
  const argus = [].concat(args);
  argus.push(body);
  return Function.prototype.constructor.apply({}, argus);
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
 * @param {Object} reactComponent.render.body - Valid RJX JSON
 * @param {String} reactComponent.getDefaultProps.body - return an object for the default props
 * @param {String} reactComponent.getInitialState.body - return an object for the default state
 * @returns {Function} 
 * @see {@link https://reactjs.org/docs/react-without-es6.html} 
 */

function getReactClassComponent(reactComponent = {}, options = {}) {
  // const util = require('util');
  // console.log(util.inspect({ reactComponent },{depth:20}));
  if (options.lazy) {
    return lazy(() => options.lazy(reactComponent, Object.assign({}, options, {
      lazy: false
    })).then(lazyComponent => {
      return {
        default: getReactClassComponent(...lazyComponent)
      };
    }));
  }

  const context = this || {};
  const {
    returnFactory = true,
    resources = {},
    use_getState = true,
    bindContext = true,
    disableRenderIndexKey = true
  } = options;
  const rjc = Object.assign({
    getDefaultProps: {
      body: 'return {};'
    },
    getInitialState: {
      body: 'return {};'
    }
  }, reactComponent);
  const rjcKeys = Object.keys(rjc);

  if (rjcKeys.includes('render') === false) {
    throw new ReferenceError('React components require a render method');
  }

  const classOptions = rjcKeys.reduce((result, val) => {
    if (typeof rjc[val] === 'function') rjc[val] = {
      body: rjc[val]
    };
    const args = rjc[val].arguments;
    const body = rjc[val].body;

    if (!body) {
      console.warn({
        rjc
      });
      throw new SyntaxError(`Function(${val}) requires a function body`);
    }

    if (args && !Array.isArray(args) && args.length && args.length && args.filter(arg => typeof arg === 'string').length) {
      throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
    }

    if (val === 'render') {
      result[val] = function () {
        if (options.passprops && this.props) body.props = Object.assign({}, body.props, this.props);
        if (options.passstate && this.state) body.props = Object.assign({}, body.props, this.state);
        return getReactElementFromRJX.call(Object.assign({}, context, bindContext ? this : {}, {
          disableRenderIndexKey
        }, {
          props: use_getState ? Object.assign({}, this.props, {
            getState: () => this.state
          }) : this.props
        }), body, resources);
      };
    } else {
      result[val] = typeof body === 'function' ? body : getFunctionFromEval({
        body,
        args
      });
    }

    return result;
  }, {});
  const reactComponentClass = createReactClass(classOptions);

  if (options.name) {
    Object.defineProperty(reactComponentClass, 'name', {
      value: options.name
    });
  }

  const reactClass = returnFactory ? React.createFactory(reactComponentClass) : reactComponentClass;
  return reactClass;
}
/**
 * Returns new React Function Component
 * @todo set 'functionprops' to set arguments for function
 * @param {*} reactComponent - Valid RJX to render
 * @param {String} functionBody - String of function component body
 * @param {String} options.name - Function Component name 
 * @returns {Function}
 * @see {@link https://reactjs.org/docs/hooks-intro.html}
 * @example
  const rjxRender = {
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
  const MyCustomFunctionComponent = rjx._rjxComponents.getReactFunctionComponent({rjxRender, functionBody, options});
   */

function getReactFunctionComponent(reactComponent = {}, functionBody = '', options = {}) {
  if (options.lazy) {
    return lazy(() => options.lazy(reactComponent, functionBody, Object.assign({}, options, {
      lazy: false
    })).then(lazyComponent => {
      return {
        default: getReactFunctionComponent(...lazyComponent)
      };
    }));
  }

  const {
    resources = {},
    args = []
  } = options;
  const props = reactComponent.props;
  const functionArgs = [React, useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue, getReactElementFromRJX, reactComponent, resources, props];
  if (typeof functionBody === 'function') functionBody = functionBody.toString();
  const functionComponent = Function('React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'getReactElementFromRJX', 'reactComponent', 'resources', 'props', `
      return function ${options.name || 'Anonymous'}(props){
        ${functionBody}
        if(typeof exposeProps!=='undefined'){
          reactComponent.props = Object.assign({},props,exposeProps);
          // reactComponent.__functionargs = Object.keys(exposeProps);
        } else{
          reactComponent.props =  props;
        }
        if(!props.children) delete props.children;
  
        return getReactElementFromRJX.call(this, reactComponent);
      }
    `);

  if (options.name) {
    Object.defineProperty(functionComponent, 'name', {
      value: options.name
    });
  }

  return functionComponent(...functionArgs);
}
/**
 * if (recharts[rjx.component.replace('recharts.', '')]) {
      return recharts[rjx.component.replace('recharts.', '')];
    }
 */

function getReactContext(options = {}) {
  return createContext(options.value);
}

var rjxComponents = /*#__PURE__*/Object.freeze({
  advancedBinding: advancedBinding,
  componentMap: componentMap,
  getBoundedComponents: getBoundedComponents,
  getComponentFromLibrary: getComponentFromLibrary,
  getComponentFromMap: getComponentFromMap,
  getFunctionFromEval: getFunctionFromEval,
  getReactClassComponent: getReactClassComponent,
  getReactFunctionComponent: getReactFunctionComponent,
  getReactContext: getReactContext
});

//   var window = window || {};
// }
//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
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

function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

  if (result === null) {
    result = [];
  }

  return result;
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

function getRJXProps(options = {}) {
  // eslint-disable-next-line
  let {
    rjx = {},
    propName = 'asyncprops',
    traverseObject = {}
  } = options; // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
  // ? utilities.traverse(rjx.asyncprops, resources)
  // : {};

  return rjx[propName] && typeof rjx[propName] === 'object' ? traverse(rjx[propName], traverseObject) : {};
}
/**
 * returns children rjx components defined on __spreadComponent spread over an array on props.__spread
 * @param {*} options 
 */

function getChildrenComponents(options = {}) {
  const {
    allProps = {},
    rjx = {}
  } = options; // const asyncprops = getRJXProps({ rjx, propName: 'spreadprops', traverseObject: allProps, });

  if (Array.isArray(allProps.__spread) === false) {
    if (this && this.debug || rjx.debug) {
      return {
        children: new Error('Using __spreadComponent requires an array prop \'__spread\'').toString()
      };
    } else {
      return {
        children: undefined
      };
    }
  } else {
    return {
      _children: allProps.__spread.map(__item => {
        const clonedChild = Object.assign({}, rjx.__spreadComponent);
        const clonedChildProps = Object.assign({}, clonedChild.props);
        clonedChildProps.__item = __item;
        clonedChild.props = clonedChildProps;
        return clonedChild;
      })
    };
  }
}
function boundArgsReducer(rjx = {}) {
  return (args, arg) => {
    let val;
    if (this && this.state && typeof this.state[arg] !== undefined) val = this.state[arg];else if (this && this.props && typeof this.props[arg] !== undefined) val = this.props[arg];else if (rjx.props && typeof rjx.props[arg] !== undefined) val = rjx.props[arg];
    if (typeof val !== undefined) args.push(val);
    return args.filter(a => typeof a !== 'undefined');
  };
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

function getEvalProps(options = {}) {
  const {
    rjx
  } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval

  const evProps = Object.keys(rjx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;

    try {
      // eslint-disable-next-line
      evVal = scopedEval(rjx.__dangerouslyEvalProps[epropName]);
      evValString = evVal.toString();
    } catch (e) {
      if (this.debug || rjx.debug) evVal = e;
    }

    eprops[epropName] = typeof evVal === 'function' ? evVal.call(this, {
      rjx
    }) : evVal;
    if (this.exposeEval) eprops[`__eval_${epropName}`] = evValString;
    return eprops;
  }, {});
  const evBindProps = Object.keys(rjx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;

    try {
      let args;
      const functionBody = rjx.__dangerouslyBindEvalProps[epropName]; // InlineFunction = Function.prototype.constructor.apply({}, args);

      let functionDefinition;

      if (typeof functionBody === 'function') {
        functionDefinition = functionBody;
      } else {
        functionDefinition = scopedEval(rjx.__dangerouslyBindEvalProps[epropName]);
        evValString = functionDefinition.toString();
      } // eslint-disable-next-line


      if (rjx.__functionargs && rjx.__functionargs[epropName]) {
        args = [this].concat(rjx.__functionargs[epropName].reduce(boundArgsReducer.call(this, rjx), []));
      } else if (rjx.__functionparams === false) {
        args = [this];
      } else {
        const functionDefArgs = getParamNames(functionDefinition);
        args = [this].concat(functionDefArgs.reduce(boundArgsReducer.call(this, rjx), []));
      } // eslint-disable-next-line


      evVal = functionDefinition.bind(...args);
    } catch (e) {
      if (this.debug || rjx.debug) evVal = e;
    } // eslint-disable-next-line


    eprops[epropName] = evVal;
    if (this.exposeEval) eprops[`__eval_${epropName}`] = evValString;
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

function getComponentProps(options = {}) {
  const {
    rjx,
    resources
  } = options;
  return Object.keys(rjx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    let componentVal;

    try {
      // eslint-disable-next-line
      componentVal = getRenderedJSON.call(this, rjx.__dangerouslyInsertComponents[cpropName], resources);
    } catch (e) {
      if (this.debug || rjx.debug) componentVal = e;
    }

    cprops[cpropName] = componentVal;
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

function getReactComponentProps(options = {}) {
  const {
    rjx
  } = options;

  if (rjx.__dangerouslyInsertRJXComponents && Object.keys(rjx.__dangerouslyInsertRJXComponents).length) {
    return Object.keys(rjx.__dangerouslyInsertRJXComponents).reduce((cprops, cpropName) => {
      let componentVal;

      try {
        componentVal = getComponentFromMap({
          rjx: rjx.__dangerouslyInsertRJXComponents[cpropName],
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries
        });
      } catch (e) {
        if (this.debug || rjx.debug) componentVal = e;
      } // eslint-disable-next-line


      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  } else {
    return Object.keys(rjx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
      let componentVal;

      try {
        componentVal = getComponentFromMap({
          rjx: {
            component: rjx.__dangerouslyInsertReactComponents[cpropName],
            props: rjx.__dangerouslyInsertComponentProps ? rjx.__dangerouslyInsertComponentProps[cpropName] : {}
          },
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries
        });
      } catch (e) {
        if (this.debug || rjx.debug) componentVal = e;
      } // eslint-disable-next-line


      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  }
}
/**
 * Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep
 * @param {Object} options 
 * @param {String} [options.propFunc='func:'] - function string, like func:window.LocalStorage.getItem or func:this.props.onClick  or func:inline.myInlineFunction
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Function} returns a function from this.props or window functions
 * @example
 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
 */

function getFunctionFromProps(options) {
  const {
    propFunc = 'func:',
    propBody,
    rjx,
    functionProperty = ''
  } = options; // eslint-disable-next-line

  const {
    logError = console.error,
    debug
  } = this;
  const windowObject = this.window || global.window || {};

  try {
    const functionNameString = propFunc.split(':')[1] || '';
    const functionNameArray = functionNameString.split('.');
    const functionName = functionNameArray.length ? functionNameArray[functionNameArray.length - 1] : '';

    if (propFunc.includes('func:inline')) {
      // eslint-disable-next-line
      let InlineFunction;

      if (rjx.__functionargs) {
        const args = [].concat(rjx.__functionargs[functionProperty]);
        args.push(propBody);
        InlineFunction = Function.prototype.constructor.apply({}, args);
      } else {
        InlineFunction = Function('param1', 'param2', '"use strict";' + propBody);
      }

      const [propFuncName, funcName] = propFunc.split('.');
      Object.defineProperty(InlineFunction, 'name', {
        value: funcName
      });

      if (rjx.__functionargs) {
        const boundArgs = [this].concat(rjx.__functionargs[functionProperty].map(arg => rjx.props[arg]));
        return InlineFunction.bind(...boundArgs);
      } else {
        return InlineFunction.bind(this);
      }
    } else if (propFunc.indexOf('func:window') !== -1) {
      if (functionNameArray.length === 3) {
        try {
          return windowObject[functionNameArray[1]][functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }

          return windowObject[functionNameArray[1]][functionName];
        }
      } else {
        try {
          return windowObject[functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }

          return windowObject[functionName];
        }
      }
    } else if (functionNameArray.length === 4) {
      return this.props ? this.props[functionNameArray[2]][functionName] : rjx.props[functionNameArray[2]][functionName];
    } else if (functionNameArray.length === 3) {
      return this.props ? this.props[functionName].bind(this) : rjx.props[functionName].bind(this);
    } else {
      return function () {};
    }
  } catch (e) {
    if (this.debug) {
      logError(e);
      if (rjx && rjx.debug) return e;
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

function getFunctionProps(options = {}) {
  const {
    allProps = {},
    rjx = {}
  } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = rjx.__functionProps; //Allowing for window functions

  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
      allProps[key] = getFunction({
        propFunc: funcProps[key],
        propBody: rjx.__inline ? rjx.__inline[key] : '',
        rjx,
        functionProperty: key
      });
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

function getWindowComponents(options = {}) {
  const {
    allProps,
    rjx
  } = options;
  const windowComponents = rjx.__windowComponents;
  const window = this.window || global.window || {};
  const windowFuncPrefix = 'func:window.__rjx_custom_elements'; // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {

  Object.keys(windowComponents).forEach(key => {
    const windowKEY = typeof windowComponents[key] === 'string' ? windowComponents[key].replace(`${windowFuncPrefix}.`, '') : '';

    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window.__rjx_custom_elements[windowKEY] === 'function') {
      const windowComponentElement = window.__rjx_custom_elements[windowKEY];
      const windowComponentProps = allProps['__windowComponentProps'] ? allProps['__windowComponentProps'] : this.props;
      allProps[key] = React.createElement(windowComponentElement, windowComponentProps, null);
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

function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const {
    rjx = {},
    resources = {},
    renderIndex,
    logError = console.error,
    useReduxState = true,
    ignoreReduxPropsInComponentLibraries = true,
    componentLibraries,
    debug
  } = options;

  try {
    const componentThisProp = rjx.thisprops ? Object.assign({
      __rjx: {
        _component: rjx,
        _resources: resources
      }
    }, this.props, rjx.props, useReduxState && !rjx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[rjx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : undefined;
    const windowTraverse = typeof window !== 'undefined' ? window : {};
    const asyncprops = rjx.asyncprops ? getRJXProps({
      rjx,
      propName: 'asyncprops',
      traverseObject: resources
    }) : {};
    const resourceprops = rjx.resourceprops ? getRJXProps({
      rjx,
      propName: 'resourceprops',
      traverseObject: resources
    }) : {};
    const windowprops = rjx.windowprops ? getRJXProps({
      rjx,
      propName: 'windowprops',
      traverseObject: windowTraverse
    }) : {};
    const thisprops = rjx.thisprops ? getRJXProps({
      rjx,
      propName: 'thisprops',
      traverseObject: componentThisProp
    }) : {};
    const thisstate = rjx.thisstate ? getRJXProps({
      rjx,
      propName: 'thisstate',
      traverseObject: this.state
    }) : {}; //allowing javascript injections

    const evalProps = rjx.__dangerouslyEvalProps || rjx.__dangerouslyBindEvalProps ? getEvalProps.call(this, {
      rjx
    }) : {};
    const insertedComponents = rjx.__dangerouslyInsertComponents ? getComponentProps.call(this, {
      rjx,
      resources,
      debug
    }) : {};
    const insertedReactComponents = rjx.__dangerouslyInsertReactComponents || rjx.__dangerouslyInsertRJXComponents ? getReactComponentProps.call(this, {
      rjx,
      debug
    }) : {};
    const allProps = Object.assign({}, this.disableRenderIndexKey ? {} : {
      key: renderIndex
    }, rjx.props, thisprops, thisstate, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
    const computedProps = Object.assign({}, allProps, rjx.__functionProps ? getFunctionProps.call(this, {
      allProps,
      rjx
    }) : {}, rjx.__windowComponents ? getWindowComponents.call(this, {
      allProps,
      rjx
    }) : {}, rjx.__spreadComponent ? getChildrenComponents.call(this, {
      allProps,
      rjx
    }) : {});
    if (rjx.debug) console.debug({
      rjx,
      computedProps
    });
    return computedProps;
  } catch (e) {
    debug && logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

var rjxProps = /*#__PURE__*/Object.freeze({
  STRIP_COMMENTS: STRIP_COMMENTS,
  ARGUMENT_NAMES: ARGUMENT_NAMES,
  getParamNames: getParamNames,
  getRJXProps: getRJXProps,
  getChildrenComponents: getChildrenComponents,
  boundArgsReducer: boundArgsReducer,
  getEvalProps: getEvalProps,
  getComponentProps: getComponentProps,
  getReactComponentProps: getReactComponentProps,
  getFunctionFromProps: getFunctionFromProps,
  getFunctionProps: getFunctionProps,
  getWindowComponents: getWindowComponents,
  getComputedProps: getComputedProps
});

/**
 * returns a valid rjx.children property
 * @param {Object} options
 * @param {Object} [options.rjx ={}]- Valid RJX JSON 
 * @param {Object} [options.props=options.rjx.children] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Object[]|String} returns a valid rjx.children property that's either an array of RJX objects or a string 
 * @example 
 * const sampleRJX = {
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
 */

function getChildrenProperty(options = {}) {
  const {
    rjx = {}
  } = options;
  const props = options.props || rjx.props || {};

  if (props._children
  /* && !rjx.children */
  ) {
      if (Array.isArray(props._children) || typeof props._children === 'string') {
        return props._children;
      } else {
        return rjx.children;
      }
    } else if (typeof rjx.children === 'undefined') {
    if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
      return props.children;
    } else {
      return null;
    }
  } else {
    return rjx.children;
  }
}
/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.rjx ={}] - Valid RJX JSON 
 * @param {Object} [options.childrjx ={}] - Valid RJX JSON 
 * @param {Number} options.renderIndex - React key property 
 * @param {Object} [options.props=options.rjx.props] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Object|String} returns a valid  Valid RJX Child object or a string 
 */

function getChildrenProps(options = {}) {
  const {
    rjx = {},
    childrjx,
    renderIndex
  } = options;
  const props = options.props || rjx.props || {};
  return rjx.passprops && typeof childrjx === 'object' ? Object.assign({}, childrjx, {
    props: Object.assign({}, props, childrjx.thisprops && childrjx.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
    childrjx.asyncprops && childrjx.asyncprops.style || childrjx.windowprops && childrjx.windowprops.style ? {} : {
      style: {}
    }, childrjx.props, {
      key: renderIndex + Math.random()
    })
  }) : childrjx;
}
/**
 * returns React Child Elements via RJX
 * @param {*} options 
 * @property {object} this - options for getReactElementFromRJX
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */

function getRJXChildren(options = {}) {
  // eslint-disable-next-line
  const {
    rjx,
    resources,
    renderIndex,
    logError = console.error
  } = options;

  try {
    const props = options.props || rjx.props || {};
    rjx.children = getChildrenProperty({
      rjx,
      props
    });
    return rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string' ? rjx.children.map(childrjx => getReactElementFromRJX.call(this, getChildrenProps({
      rjx,
      childrjx,
      props,
      renderIndex
    }), resources)) : rjx.children;
  } catch (e) {
    logError(e);
    return null;
  }
}

var rjxChildren = /*#__PURE__*/Object.freeze({
  getChildrenProperty: getChildrenProperty,
  getChildrenProps: getChildrenProps,
  getRJXChildren: getRJXChildren
});

/**
 * Use RJX for express view rendering
 * @param {string} filePath - path to rjx express view 
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for RJX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback 
 */

function __express(filePath, options, callback) {
  try {
    const rjxModule = options.__rjx || require(filePath);

    const resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__rjx;
    const rjxRenderedString = rjxHTMLString.call(options.__boundConfig || {}, {
      rjx: rjxModule,
      resources
    });
    callback(null, `${options.__DOCTYPE || '<!DOCTYPE html>'}
${rjxRenderedString}`);
  } catch (e) {
    callback(e);
  }
}

// import React, { createElement, } from 'react';
const createElement = React.createElement;
const {
  componentMap: componentMap$1,
  getComponentFromMap: getComponentFromMap$1,
  getBoundedComponents: getBoundedComponents$1
} = rjxComponents;
const {
  getComputedProps: getComputedProps$1
} = rjxProps;
const {
  getRJXChildren: getRJXChildren$1
} = rjxChildren;
const {
  displayComponent: displayComponent$1
} = rjxUtils;
let renderIndex = 0;
/**
 * Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="rjx-generated"><p style="color:red;">hello world</p></div></div></body>
 * rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getReactElementFromRJX
 */

function rjxRender(config = {}) {
  const {
    rjx,
    resources,
    querySelector,
    options,
    DOM
  } = config;
  ReactDOM.render(getReactElementFromRJX.call(this || {}, rjx, resources, options), DOM || document.querySelector(querySelector));
}
/**
 * Use ReactDOMServer.renderToString to render html from RJX
 * @example
 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
 * rjx.outputHTML({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromRJX
 * @returns {string} React genereated html via RJX JSON
 */

function outputHTML(config = {}) {
  const {
    rjx,
    resources
  } = config;
  return ReactDOM.renderToString(getReactElementFromRJX.call(this || {}, rjx, resources));
}
/**
 * Use React.createElement and RJX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * rjx.getReactElementFromRJX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromRJX
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
 * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */

function getReactElementFromRJX(rjx = {}, resources = {}) {
  // eslint-disable-next-line
  const {
    componentLibraries = {},
    debug = false,
    returnJSON = false,
    logError = console.error,
    boundedComponents = [],
    disableRenderIndexKey = false
  } = this || {}; // const componentLibraries = this.componentLibraries;

  if (!rjx) return null;
  if (rjx.type) rjx.component = rjx.type;
  if (validSimpleRJXSyntax(rjx)) rjx = simpleRJXSyntax(rjx);
  if (!rjx.component) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');

  try {
    const components = Object.assign({}, componentMap$1, this.reactComponents);
    const reactComponents = boundedComponents.length ? getBoundedComponents$1.call(this, {
      boundedComponents,
      reactComponents: components
    }) : components;
    renderIndex++;
    const element = getComponentFromMap$1({
      rjx,
      reactComponents,
      componentLibraries,
      debug,
      logError
    });
    const props = getComputedProps$1.call(this, {
      rjx,
      resources,
      renderIndex,
      componentLibraries,
      debug,
      logError
    });
    const displayElement = rjx.comparisonprops ? displayComponent$1.call(this, {
      rjx,
      props,
      renderIndex,
      componentLibraries,
      debug
    }) : true;

    if (displayElement) {
      const children = getRJXChildren$1.call(this, {
        rjx,
        props,
        resources,
        renderIndex
      });
      if (this.returnJSON) return {
        type: element,
        props,
        children
      };
      return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({
        rjx,
        resources
      }, 'this', this);
      logError(e, e.stack ? e.stack : 'no stack');
    }

    throw e;
  }
}
const getRenderedJSON = getReactElementFromRJX;
const getReactElement = getReactElementFromRJX;
/** converts a json object {type,props,children} into a react element 
 * @example
 * rjx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
 * @param {Object|String} options.type - 'div' or react component
 * @param {Object} options.props - props for react element
 * @param {String|[Object]} options.children - children elements
 * @returns {function} React element via React.createElement
*/

function getReactElementFromJSON({
  type,
  props,
  children
}) {
  return createElement(type, props, Array.isArray(children) ? children.map(getReactElementFromJSON) : children);
}
/** converts a rjx json object into a react function component 
 * @example
 * rjx.compile({rjx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} rjx - valid RJX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
*/

function compile(rjx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  const json = getReactElementFromRJX.call(context, rjx, resources);

  const func = function compiledRJX(props) {
    json.props = Object.assign({}, json.props, props);
    return getReactElementFromJSON(json);
  };

  Object.defineProperty(func, 'name', {
    value: this.name
  });
  return func;
}
/**
 * converts RJX JSON IR to JSX
 * @example
 * rjx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */

function outputJSX(rjx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  const json = getReactElementFromRJX.call(context, rjx, resources);
  return jsonToJSX(json);
}
/**
 * Compiles RJX into JSON IR format for react create element
 * @example
 * rjx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
 props: { key: 5, title: 'test' },
 children: 'hello' }
 * @property {object} this - options for getReactElementFromRJX
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @returns {Object} json - {type,props,children}
 */

function outputJSON(rjx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  return getReactElementFromRJX.call(context, rjx, resources);
}
const rjxHTMLString = outputHTML;
/**
 * converts RJX JSON IR to JSX
 * @example
 * rjx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */

function jsonToJSX(json) {
  const propsString = json.props ? Object.keys(json.props).filter(prop => prop.includes('__eval_') === false).reduce((propString, prop) => {
    propString += ` ${prop.toString()}=${typeof json.props[prop] === 'string' ? `"${json.props[prop].toString()}"` : `{${(json.props[`__eval_${prop}`] || json.props[prop]).toString()}}`}`;
    return propString;
  }, '') : '';
  return Array.isArray(json.children) ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX)}
</${json.type}>` : `<${json.type}${propsString}>${json.children}</${json.type}>`;
}
/**
 * Exposes react module used in RJX
 * @returns {Object} React
 */

function __getReact() {
  return React;
}
/**
 * Exposes react dom module used in RJX
 * @returns {Object} ReactDOM
 */

function __getReactDOM() {
  return ReactDOM;
}
/**
 * Exposes global hook used in RJX
 * @returns {Object} useGlobalHook
 */

function __getUseGlobalHook() {
  return useStore;
}
const _rjxChildren = rjxChildren;
const _rjxComponents = rjxComponents;
const _rjxProps = rjxProps;
const _rjxUtils = rjxUtils;

export default getReactElementFromRJX;
export { __express, __getReact, __getReactDOM, __getUseGlobalHook, _rjxChildren, _rjxComponents, _rjxProps, _rjxUtils, compile, getReactElement, getReactElementFromJSON, getReactElementFromRJX, getRenderedJSON, jsonToJSX, outputHTML, outputJSON, outputJSX, renderIndex, rjxHTMLString, rjxRender };
