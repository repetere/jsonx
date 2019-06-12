import React, { Fragment, Suspense, lazy, createContext, useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactDOMElements from 'react-dom-factories';
import UAParser from 'ua-parser-js';
import createReactClass from 'create-react-class';
import path from 'path';

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
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
 const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testJSONX = Object.assign({}, sampleJSONX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ jsonx: testJSONX, props: testJSONX2.props, }) // => false
 */

function displayComponent(options = {}) {
  const {
    jsonx = {},
    props
  } = options;
  const propsToCompare = jsonx.comparisonprops;
  const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(comp => {
    const compares = {};

    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }

    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }

    const propcompares = traverse(compares, props || jsonx.props);
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

  if (!jsonx.comparisonprops) {
    return true;
  } else if (jsonx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (validProps.length !== comparisons.length && !jsonx.comparisonorprops) {
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
        name: 'jsonx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'jsonx',  }
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
 * Validates JSONX JSON Syntax
 * @example
 * validateJSONX({component:'p',children:'hello world'})=>true
 * validateJSONX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} jsonx - JSONX JSON to validate 
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if JSONX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */

function validateJSONX(jsonx = {}, returnAllErrors = false) {
  const dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops', 'thisstate'];
  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
  const validKeys = ['component', 'props', 'children', '__spreadComponent', '__inline', '__functionargs', '__dangerouslyInsertComponents', '__dangerouslyInsertComponentProps', '__dangerouslyInsertJSONXComponents', '__functionProps', '__functionparams', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops', 'debug'].concat(dynamicPropsNames, evalPropNames);
  let errors = [];

  if (!jsonx.component) {
    errors.push(SyntaxError('[0001] Missing React Component'));
  }

  if (jsonx.props) {
    if (typeof jsonx.props !== 'object' || Array.isArray(jsonx.props)) {
      errors.push(TypeError('[0002] ' + jsonx.component + ': props must be an Object / valid React props'));
    }

    if (jsonx.props.children && (typeof jsonx.props.children !== 'string' || !Array.isArray(jsonx.props.children))) {
      errors.push(TypeError('[0003] ' + jsonx.component + ': props.children must be an array of JSONX JSON objects or a string'));
    }

    if (jsonx.props._children && (typeof jsonx.props._children !== 'string' || !Array.isArray(jsonx.props._children))) {
      errors.push(TypeError('[0004] ' + jsonx.component + ': props._children must be an array of JSONX JSON objects or a string'));
    }
  }

  if (jsonx.children) {
    if (typeof jsonx.children !== 'string' && !Array.isArray(jsonx.children)) {
      errors.push(TypeError('[0005] ' + jsonx.component + ': children must be an array of JSONX JSON objects or a string'));
    }

    if (Array.isArray(jsonx.children)) {
      const childrenErrors = jsonx.children.filter(c => typeof c === 'object').map(c => validateJSONX(c, returnAllErrors));
      errors = errors.concat(...childrenErrors);
    }
  }

  dynamicPropsNames.forEach(dynamicprop => {
    const jsonxDynamicProps = jsonx[dynamicprop];

    if (jsonxDynamicProps) {
      // if (dynamicprop === 'thisprops') {
      //   console.log({ dynamicprop, jsonxDynamicProps });
      // }
      if (typeof jsonxDynamicProps !== 'object') {
        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
      }

      Object.keys(jsonxDynamicProps).forEach(resolvedDynamicProp => {
        if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          errors.push(TypeError(`[0007] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
        }

        if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          const allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter(propArrayItem => typeof propArrayItem === 'string');

          if (allStringArray.length !== jsonxDynamicProps[resolvedDynamicProp].length) {
            errors.push(TypeError(`[0008] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
          }
        }
      });
    }
  });
  const evalProps = jsonx.__dangerouslyEvalProps;
  const boundEvalProps = jsonx.__dangerouslyBindEvalProps;

  if (evalProps || boundEvalProps) {
    if (evalProps && typeof evalProps !== 'object' || boundEvalProps && typeof boundEvalProps !== 'object') {
      errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
    }

    evalPropNames.filter(evalProp => jsonx[evalProp]).forEach(eProps => {
      const evProp = jsonx[eProps];
      const scopedEval = eval;
      Object.keys(evProp).forEach(propToEval => {
        if (typeof evProp[propToEval] !== 'string') {
          errors.push(TypeError(`[0010] jsonx.${eProps}.${evProp} must be a string`));
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

  if (jsonx.__dangerouslyInsertComponents) {
    Object.keys(jsonx.__dangerouslyInsertComponents).forEach(insertedComponents => {
      try {
        validateJSONX(jsonx.__dangerouslyInsertComponents[insertedComponents]);
      } catch (e) {
        errors.push(TypeError(`[0011] jsonx.__dangerouslyInsertComponents.${insertedComponents} must be a valid JSONX JSON Object: ${e.toString()}`));
      }
    });
  }

  if (jsonx.__functionProps) {
    if (typeof jsonx.__functionProps !== 'object') {
      errors.push(TypeError('[0012] jsonx.__functionProps  must be an object'));
    } else {
      Object.keys(jsonx.__functionProps).forEach(fProp => {
        if (jsonx.__functionProps[fProp] && (typeof jsonx.__functionProps[fProp] !== 'string' || jsonx.__functionProps[fProp].indexOf('func:') === -1)) {
          errors.push(ReferenceError(`[0013] jsonx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
        }
      });
    }
  }

  if (jsonx.__windowComponentProps && (typeof jsonx.__windowComponentProps !== 'object' || Array.isArray(jsonx.__windowComponentProps))) {
    errors.push(TypeError('[0013] jsonx.__windowComponentProps  must be an object'));
  }

  if (jsonx.__windowComponents) {
    if (typeof jsonx.__windowComponents !== 'object') {
      errors.push(TypeError('[0014] jsonx.__windowComponents must be an object'));
    }

    Object.keys(jsonx.__windowComponents).forEach(cProp => {
      if (typeof jsonx.__windowComponents[cProp] !== 'string' || jsonx.__windowComponents[cProp].indexOf('func:') === -1) {
        errors.push(ReferenceError(`[0015] jsonx.__windowComponents.${cProp} must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)`));
      }
    });
  }

  if (typeof jsonx.comparisonorprops !== 'undefined' && typeof jsonx.comparisonorprops !== 'boolean') {
    errors.push(TypeError('[0016] jsonx.comparisonorprops  must be boolean'));
  }

  if (jsonx.comparisonprops) {
    if (!Array.isArray(jsonx.comparisonprops)) {
      errors.push(TypeError('[0017] jsonx.comparisonprops  must be an array or comparisons'));
    } else {
      jsonx.comparisonprops.forEach(c => {
        if (typeof c !== 'object') {
          errors.push(TypeError('[0018] jsonx.comparisonprops  must be an array or comparisons objects'));
        } else if (typeof c.left === 'undefined') {
          errors.push(TypeError('[0019] jsonx.comparisonprops  must be have a left comparison value'));
        }
      });
    }
  }

  if (typeof jsonx.passprops !== 'undefined' && typeof jsonx.passprops !== 'boolean') {
    errors.push(TypeError('[0020] jsonx.passprops  must be boolean'));
  }

  const invalidKeys = Object.keys(jsonx).filter(key => validKeys.indexOf(key) === -1);

  if (errors.length) {
    if (returnAllErrors) return errors;
    throw errors[0];
  }

  return invalidKeys.length ? `Warning: Invalid Keys [${invalidKeys.join()}]` : true;
}
/**
 * validates simple JSONX Syntax {[component]:{props,children}}
 * @param {Object} simpleJSONX - Any valid simple JSONX Syntax
 * @return {Boolean} returns true if simpleJSONX is valid
 */

function validSimpleJSONXSyntax(simpleJSONX = {}) {
  if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
    return false;
  } else {
    const componentName = Object.keys(simpleJSONX)[0];
    return Object.keys(simpleJSONX).length === 1 && !simpleJSONX[componentName].component && typeof simpleJSONX[componentName] === 'object' ? true : false;
  }
}
/**
 * Transforms SimpleJSONX to Valid JSONX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleJSONX JSON Object 
 * @return {Object} - returns a valid JSONX JSON Object from a simple JSONX JSON Object
 */

function simpleJSONXSyntax(simpleJSONX = {}) {
  const component = Object.keys(simpleJSONX)[0];

  try {
    return Object.assign({}, {
      component
    }, simpleJSONX[component], {
      children: simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children) ? simpleJSONX[component].children.map(simpleJSONXSyntax) : simpleJSONX[component].children
    });
  } catch (e) {
    throw SyntaxError('Invalid Simple JSONX Syntax', e);
  }
}
/**
 * Transforms Valid JSONX JSON to SimpleJSONX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} jsonx Valid JSONX JSON object 
 * @return {Object} - returns a simple JSONX JSON Object from a valid JSONX JSON Object 
 */

function getSimplifiedJSONX(jsonx = {}) {
  try {
    if (!jsonx.component) return jsonx; //already simple

    const componentName = jsonx.component;
    jsonx.children = Array.isArray(jsonx.children) ? jsonx.children.filter(child => child) //remove empty children
    .map(getSimplifiedJSONX) : jsonx.children;
    delete jsonx.component;
    return {
      [componentName]: jsonx
    };
  } catch (e) {
    throw e;
  }
}

var jsonxUtils = /*#__PURE__*/Object.freeze({
  displayComponent: displayComponent,
  getAdvancedBinding: getAdvancedBinding,
  traverse: traverse,
  validateJSONX: validateJSONX,
  validSimpleJSONXSyntax: validSimpleJSONXSyntax,
  simpleJSONXSyntax: simpleJSONXSyntax,
  getSimplifiedJSONX: getSimplifiedJSONX
});

//   var window = window || global.window || {};
// }

/**
 * @memberOf components
 */

let advancedBinding = getAdvancedBinding(); // require;

/**
 * object of all react components available for JSONX
 * @memberOf components
 */

let componentMap = Object.assign({
  Fragment,
  Suspense
}, ReactDOMElements, typeof window === 'object' ? window.__jsonx_custom_elements : {});
/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 * @memberOf components
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for JSONX
 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for JSONX
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
 * @memberOf components
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.jsonx={}] - any valid JSONX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */

function getComponentFromLibrary(options = {}) {
  const {
    componentLibraries = {},
    jsonx = {}
  } = options;
  const libComponent = Object.keys(componentLibraries).map(libraryName => {
    const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, '');
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

function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const {
    jsonx = {},
    reactComponents = {},
    componentLibraries = {},
    logError = console.error,
    debug
  } = options;

  try {
    if (typeof jsonx.component !== 'string' && typeof jsonx.component === 'function') {
      return jsonx.component;
    } else if (ReactDOMElements[jsonx.component]) {
      return jsonx.component;
    } else if (reactComponents[jsonx.component]) {
      return reactComponents[jsonx.component];
    } else if (typeof jsonx.component === 'string' && jsonx.component.indexOf('.') > 0 && getComponentFromLibrary({
      jsonx,
      componentLibraries
    })) {
      return getComponentFromLibrary({
        jsonx,
        componentLibraries
      });
    } else {
      throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
    }
  } catch (e) {
    if (debug) logError(e, e.stack ? e.stack : 'no stack');
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
        return getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : {}, {
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
  const functionArgs = [React, useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue, getReactElementFromJSONX, reactComponent, resources, props];
  if (typeof functionBody === 'function') functionBody = functionBody.toString();
  const functionComponent = Function('React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'getReactElementFromJSONX', 'reactComponent', 'resources', 'props', `
    const self = this;
    return function ${options.name || 'Anonymous'}(props){
      ${functionBody}
      if(typeof exposeProps!=='undefined'){
        reactComponent.props = Object.assign({},props,exposeProps);
        // reactComponent.__functionargs = Object.keys(exposeProps);
      } else{
        reactComponent.props =  props;
      }
      if(!props.children) delete props.children;
      const context = ${options.bind ? 'Object.assign(self,this)' : 'this'};
      return getReactElementFromJSONX.call(context, reactComponent);
    }
  `);

  if (options.name) {
    Object.defineProperty(functionComponent, 'name', {
      value: options.name
    });
  }

  return options.bind ? functionComponent.call(this, ...functionArgs) : functionComponent(...functionArgs);
}
/**
 * @memberOf components
 */

function getReactContext(options = {}) {
  return createContext(options.value);
}

var jsonxComponents = /*#__PURE__*/Object.freeze({
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

function getJSONXProps(options = {}) {
  // eslint-disable-next-line
  let {
    jsonx = {},
    propName = 'asyncprops',
    traverseObject = {}
  } = options; // return (jsonx.asyncprops && typeof jsonx.asyncprops === 'object')
  // ? utilities.traverse(jsonx.asyncprops, resources)
  // : {};

  return jsonx[propName] && typeof jsonx[propName] === 'object' ? traverse(jsonx[propName], traverseObject) : {};
}
/**
 * returns children jsonx components defined on __spreadComponent spread over an array on props.__spread
 * @param {*} options 
 */

function getChildrenComponents(options = {}) {
  const {
    allProps = {},
    jsonx = {}
  } = options; // const asyncprops = getJSONXProps({ jsonx, propName: 'spreadprops', traverseObject: allProps, });

  if (Array.isArray(allProps.__spread) === false) {
    if (this && this.debug || jsonx.debug) {
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
        const clonedChild = Object.assign({}, jsonx.__spreadComponent);
        const clonedChildProps = Object.assign({}, clonedChild.props);
        clonedChildProps.__item = __item;
        clonedChild.props = clonedChildProps;
        return clonedChild;
      })
    };
  }
}
function boundArgsReducer(jsonx = {}) {
  return (args, arg) => {
    let val;
    if (this && this.state && typeof this.state[arg] !== undefined) val = this.state[arg];else if (this && this.props && typeof this.props[arg] !== undefined) val = this.props[arg];else if (jsonx.props && typeof jsonx.props[arg] !== undefined) val = jsonx.props[arg];
    if (typeof val !== undefined) args.push(val);
    return args.filter(a => typeof a !== 'undefined');
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

function getEvalProps(options = {}) {
  const {
    jsonx
  } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval

  let evAllProps = {};

  if (jsonx.__dangerouslyEvalAllProps) {
    let evVal;

    try {
      // eslint-disable-next-line
      evVal = typeof evVal === 'function' ? jsonx.__dangerouslyEvalAllProps : scopedEval(jsonx.__dangerouslyEvalAllProps);
    } catch (e) {
      if (this.debug || jsonx.debug) evVal = e;
    }

    evAllProps = evVal.call(this, {
      jsonx
    });
  }

  const evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;

    try {
      // eslint-disable-next-line
      evVal = scopedEval(jsonx.__dangerouslyEvalProps[epropName]);
      evValString = evVal.toString();
    } catch (e) {
      if (this.debug || jsonx.debug) evVal = e;
    }

    eprops[epropName] = typeof evVal === 'function' ? evVal.call(this, {
      jsonx
    }) : evVal;
    if (this.exposeEval) eprops[`__eval_${epropName}`] = evValString;
    return eprops;
  }, {});
  const evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;

    try {
      let args;
      const functionBody = jsonx.__dangerouslyBindEvalProps[epropName]; // InlineFunction = Function.prototype.constructor.apply({}, args);

      let functionDefinition;

      if (typeof functionBody === 'function') {
        functionDefinition = functionBody;
      } else {
        functionDefinition = scopedEval(jsonx.__dangerouslyBindEvalProps[epropName]);
        evValString = functionDefinition.toString();
      } // eslint-disable-next-line


      if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
        args = [this].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(this, jsonx), []));
      } else if (jsonx.__functionparams === false) {
        args = [this];
      } else {
        const functionDefArgs = getParamNames(functionDefinition);
        args = [this].concat(functionDefArgs.reduce(boundArgsReducer.call(this, jsonx), []));
      } // eslint-disable-next-line


      evVal = functionDefinition.bind(...args);
    } catch (e) {
      if (this.debug || jsonx.debug) evVal = e;
    } // eslint-disable-next-line


    eprops[epropName] = evVal;
    if (this.exposeEval) eprops[`__eval_${epropName}`] = evValString;
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

function getComponentProps(options = {}) {
  const {
    jsonx,
    resources
  } = options;
  return Object.keys(jsonx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    let componentVal;

    try {
      // eslint-disable-next-line
      componentVal = getRenderedJSON.call(this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
    } catch (e) {
      if (this.debug || jsonx.debug) componentVal = e;
    }

    cprops[cpropName] = componentVal;
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

function getReactComponentProps(options = {}) {
  const {
    jsonx
  } = options;

  if (jsonx.__dangerouslyInsertJSONXComponents && Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) {
    return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce((cprops, cpropName) => {
      let componentVal;

      try {
        componentVal = getComponentFromMap({
          jsonx: jsonx.__dangerouslyInsertJSONXComponents[cpropName],
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries
        });
      } catch (e) {
        if (this.debug || jsonx.debug) componentVal = e;
      } // eslint-disable-next-line


      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  } else {
    return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
      let componentVal;

      try {
        componentVal = getComponentFromMap({
          jsonx: {
            component: jsonx.__dangerouslyInsertReactComponents[cpropName],
            props: jsonx.__dangerouslyInsertComponentProps ? jsonx.__dangerouslyInsertComponentProps[cpropName] : {}
          },
          reactComponents: this.reactComponents,
          componentLibraries: this.componentLibraries
        });
      } catch (e) {
        if (this.debug || jsonx.debug) componentVal = e;
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
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Function} returns a function from this.props or window functions
 * @example
 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
 */

function getFunctionFromProps(options) {
  const {
    propFunc = 'func:',
    propBody,
    jsonx,
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

      if (jsonx.__functionargs) {
        const args = [].concat(jsonx.__functionargs[functionProperty]);
        args.push(propBody);
        InlineFunction = Function.prototype.constructor.apply({}, args);
      } else {
        InlineFunction = Function('param1', 'param2', '"use strict";' + propBody);
      }

      const [propFuncName, funcName] = propFunc.split('.');
      Object.defineProperty(InlineFunction, 'name', {
        value: funcName
      });

      if (jsonx.__functionargs) {
        const boundArgs = [this].concat(jsonx.__functionargs[functionProperty].map(arg => jsonx.props[arg]));
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
      return this.props ? this.props[functionNameArray[2]][functionName] : jsonx.props[functionNameArray[2]][functionName];
    } else if (functionNameArray.length === 3) {
      return this.props ? this.props[functionName].bind(this) : jsonx.props[functionName].bind(this);
    } else {
      return function () {};
    }
  } catch (e) {
    if (this.debug) {
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

function getFunctionProps(options = {}) {
  const {
    allProps = {},
    jsonx = {}
  } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = jsonx.__functionProps; //Allowing for window functions

  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
      allProps[key] = getFunction({
        propFunc: funcProps[key],
        propBody: jsonx.__inline ? jsonx.__inline[key] : '',
        jsonx,
        functionProperty: key
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

function getWindowComponents(options = {}) {
  const {
    allProps,
    jsonx
  } = options;
  const windowComponents = jsonx.__windowComponents;
  const window = this.window || global.window || {};
  const windowFuncPrefix = 'func:window.__jsonx_custom_elements'; // if (jsonx.hasWindowComponent && window.__jsonx_custom_elements) {

  Object.keys(windowComponents).forEach(key => {
    const windowKEY = typeof windowComponents[key] === 'string' ? windowComponents[key].replace(`${windowFuncPrefix}.`, '') : '';

    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window.__jsonx_custom_elements[windowKEY] === 'function') {
      const windowComponentElement = window.__jsonx_custom_elements[windowKEY];
      const windowComponentProps = allProps['__windowComponentProps'] ? allProps['__windowComponentProps'] : this.props;
      allProps[key] = React.createElement(windowComponentElement, windowComponentProps, null);
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

function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const {
    jsonx = {},
    resources = {},
    renderIndex,
    logError = console.error,
    useReduxState = true,
    ignoreReduxPropsInComponentLibraries = true,
    componentLibraries,
    debug
  } = options;

  try {
    const componentThisProp = jsonx.thisprops ? Object.assign({
      __jsonx: {
        _component: jsonx,
        _resources: resources
      }
    }, this.props, jsonx.props, useReduxState && !jsonx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[jsonx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : undefined;
    const windowTraverse = typeof window !== 'undefined' ? window : {};
    const asyncprops = jsonx.asyncprops ? getJSONXProps({
      jsonx,
      propName: 'asyncprops',
      traverseObject: resources
    }) : {};
    const resourceprops = jsonx.resourceprops ? getJSONXProps({
      jsonx,
      propName: 'resourceprops',
      traverseObject: resources
    }) : {};
    const windowprops = jsonx.windowprops ? getJSONXProps({
      jsonx,
      propName: 'windowprops',
      traverseObject: windowTraverse
    }) : {};
    const thisprops = jsonx.thisprops ? getJSONXProps({
      jsonx,
      propName: 'thisprops',
      traverseObject: componentThisProp
    }) : {};
    const thisstate = jsonx.thisstate ? getJSONXProps({
      jsonx,
      propName: 'thisstate',
      traverseObject: this.state
    }) : {}; //allowing javascript injections

    const evalProps = jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps ? getEvalProps.call(this, {
      jsonx
    }) : {};
    const insertedComponents = jsonx.__dangerouslyInsertComponents ? getComponentProps.call(this, {
      jsonx,
      resources,
      debug
    }) : {};
    const insertedReactComponents = jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents ? getReactComponentProps.call(this, {
      jsonx,
      debug
    }) : {};
    const evalAllProps = jsonx.__dangerouslyEvalAllProps ? getEvalProps.call(this, {
      jsonx
    }) : {};
    const allProps = Object.assign({}, this.disableRenderIndexKey ? {} : {
      key: renderIndex
    }, jsonx.props, thisprops, thisstate, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
    const computedProps = Object.assign({}, allProps, jsonx.__functionProps ? getFunctionProps.call(this, {
      allProps,
      jsonx
    }) : {}, jsonx.__windowComponents ? getWindowComponents.call(this, {
      allProps,
      jsonx
    }) : {}, jsonx.__spreadComponent ? getChildrenComponents.call(this, {
      allProps,
      jsonx
    }) : {}, evalAllProps);
    if (jsonx.debug) console.debug({
      jsonx,
      computedProps
    });
    return computedProps;
  } catch (e) {
    debug && logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

var jsonxProps = /*#__PURE__*/Object.freeze({
  STRIP_COMMENTS: STRIP_COMMENTS,
  ARGUMENT_NAMES: ARGUMENT_NAMES,
  getParamNames: getParamNames,
  getJSONXProps: getJSONXProps,
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
 * returns a valid jsonx.children property
 * @param {Object} options
 * @param {Object} [options.jsonx ={}]- Valid JSONX JSON 
 * @param {Object} [options.props=options.jsonx.children] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Object[]|String} returns a valid jsonx.children property that's either an array of JSONX objects or a string 
 * @example 
 * const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
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
const JSONXChildren = getChildrenProperty({ jsonx: sampleJSONX, }); //=> [ [jsonx Object],[jsonx Object]]
const JSONXChildrenPTag = getChildrenProperty({ jsonx: sampleJSONX.children[ 0 ], }); //=>hello world
 */

function getChildrenProperty(options = {}) {
  const {
    jsonx = {}
  } = options;
  const props = options.props || jsonx.props || {};

  if (props._children
  /* && !jsonx.children */
  ) {
      if (Array.isArray(props._children) || typeof props._children === 'string') {
        return props._children;
      } else {
        return jsonx.children;
      }
    } else if (typeof jsonx.children === 'undefined') {
    if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
      return props.children;
    } else {
      return null;
    }
  } else {
    return jsonx.children;
  }
}
/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.jsonx ={}] - Valid JSONX JSON 
 * @param {Object} [options.childjsonx ={}] - Valid JSONX JSON 
 * @param {Number} options.renderIndex - React key property 
 * @param {Object} [options.props=options.jsonx.props] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Object|String} returns a valid  Valid JSONX Child object or a string 
 */

function getChildrenProps(options = {}) {
  const {
    jsonx = {},
    childjsonx,
    renderIndex
  } = options;
  const props = options.props || jsonx.props || {};
  return jsonx.passprops && typeof childjsonx === 'object' ? Object.assign({}, childjsonx, {
    props: Object.assign({}, props, childjsonx.thisprops && childjsonx.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
    childjsonx.asyncprops && childjsonx.asyncprops.style || childjsonx.windowprops && childjsonx.windowprops.style ? {} : {
      style: {}
    }, childjsonx.props, {
      key: renderIndex + Math.random()
    })
  }) : childjsonx;
}
/**
 * returns React Child Elements via JSONX
 * @param {*} options 
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */

function getJSONXChildren(options = {}) {
  // eslint-disable-next-line
  const {
    jsonx,
    resources,
    renderIndex,
    logError = console.error
  } = options;

  try {
    const props = options.props || jsonx.props || {};
    jsonx.children = getChildrenProperty({
      jsonx,
      props
    });
    return jsonx.children && Array.isArray(jsonx.children) && typeof jsonx.children !== 'string' ? jsonx.children.map(childjsonx => getReactElementFromJSONX.call(this, getChildrenProps({
      jsonx,
      childjsonx,
      props,
      renderIndex
    }), resources)) : jsonx.children;
  } catch (e) {
    logError(e);
    return null;
  }
}

var jsonxChildren = /*#__PURE__*/Object.freeze({
  getChildrenProperty: getChildrenProperty,
  getChildrenProps: getChildrenProps,
  getJSONXChildren: getJSONXChildren
});

/**
 * Use JSONX for express view rendering
 * @param {string} filePath - path to jsonx express view 
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for JSONX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback 
 */

function __express(filePath, options, callback) {
  try {
    const jsonxModule = options.__jsonx || require(filePath);

    const resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__jsonx;
    const context = Object.assign({}, options.__boundConfig);
    if (path.extname('.json')) context.useJSON = true;
    const jsonxRenderedString = outputHTML.call(context, {
      jsonx: jsonxModule,
      resources
    });
    const template = `${options.__DOCTYPE || '<!DOCTYPE html>'}
${jsonxRenderedString}`;
    if (typeof callback === 'function') callback(null, template);else return template;
  } catch (e) {
    if (typeof callback === 'function') callback(e);else throw e;
  }
}

// import React, { createElement, } from 'react';
const createElement = React.createElement;
const {
  componentMap: componentMap$1,
  getComponentFromMap: getComponentFromMap$1,
  getBoundedComponents: getBoundedComponents$1
} = jsonxComponents;
const {
  getComputedProps: getComputedProps$1
} = jsonxProps;
const {
  getJSONXChildren: getJSONXChildren$1
} = jsonxChildren;
const {
  displayComponent: displayComponent$1
} = jsonxUtils;
let renderIndex = 0;
/**
 * Use JSONX without any configuration to render JSONX JSON to HTML and insert JSONX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="jsonx-generated"><p style="color:red;">hello world</p></div></div></body>
 * jsonx.jsonxRender({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getReactElementFromJSONX
 */

function jsonxRender(config = {}) {
  const {
    jsonx,
    resources,
    querySelector,
    options,
    DOM
  } = config;
  ReactDOM.render(getReactElementFromJSONX.call(this || {}, jsonx, resources, options), DOM || document.querySelector(querySelector));
}
/**
 * Use ReactDOMServer.renderToString to render html from JSONX
 * @example
 * // Uses react to create <div class="jsonx-generated"><p style="color:red;">hello world</p></div>
 * jsonx.outputHTML({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @returns {string} React genereated html via JSONX JSON
 */

function outputHTML(config = {}) {
  const {
    jsonx,
    resources
  } = config;
  return this && this.useJSON ? ReactDOMServer.renderToString(getReactElementFromJSON.call(this || {}, jsonx, resources)) : ReactDOMServer.renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
}
/**
 * Use React.createElement and JSONX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * jsonx.getReactElementFromJSONX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
 * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */

function getReactElementFromJSONX(jsonx = {}, resources = {}) {
  // eslint-disable-next-line
  const {
    componentLibraries = {},
    debug = false,
    returnJSON = false,
    logError = console.error,
    boundedComponents = [],
    disableRenderIndexKey = false
  } = this || {}; // const componentLibraries = this.componentLibraries;

  if (!jsonx) return null;
  if (jsonx.type) jsonx.component = jsonx.type;
  if (validSimpleJSONXSyntax(jsonx)) jsonx = simpleJSONXSyntax(jsonx);
  if (!jsonx.component) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');

  try {
    const components = Object.assign({}, componentMap$1, this.reactComponents);
    const reactComponents = boundedComponents.length ? getBoundedComponents$1.call(this, {
      boundedComponents,
      reactComponents: components
    }) : components;
    renderIndex++;
    const element = getComponentFromMap$1({
      jsonx,
      reactComponents,
      componentLibraries,
      debug,
      logError
    });
    const props = getComputedProps$1.call(this, {
      jsonx,
      resources,
      renderIndex,
      componentLibraries,
      debug,
      logError
    });
    const displayElement = jsonx.comparisonprops ? displayComponent$1.call(this, {
      jsonx,
      props,
      renderIndex,
      componentLibraries,
      debug
    }) : true;

    if (displayElement) {
      const children = getJSONXChildren$1.call(this, {
        jsonx,
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
        jsonx,
        resources
      }, 'this', this);
      logError(e, e.stack ? e.stack : 'no stack');
    }

    throw e;
  }
}
const getRenderedJSON = getReactElementFromJSONX;
const getReactElement = getReactElementFromJSONX;
/** converts a json object {type,props,children} into a react element 
 * @example
 * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
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
/** converts a jsonx json object into a react function component 
 * @example
 * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} jsonx - valid JSONX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
*/

function compile(jsonx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  const json = getReactElementFromJSONX.call(context, jsonx, resources);

  const func = function compiledJSONX(props) {
    json.props = Object.assign({}, json.props, props);
    return getReactElementFromJSON(json);
  };

  Object.defineProperty(func, 'name', {
    value: this.name
  });
  return func;
}
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */

function outputJSX(jsonx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  const json = getReactElementFromJSONX.call(context, jsonx, resources);
  return jsonToJSX(json);
}
/**
 * Compiles JSONX into JSON IR format for react create element
 * @example
 * jsonx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
 props: { key: 5, title: 'test' },
 children: 'hello' }
 * @property {object} this - options for getReactElementFromJSONX
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @returns {Object} json - {type,props,children}
 */

function outputJSON(jsonx, resources) {
  const context = Object.assign({}, this, {
    returnJSON: true
  });
  return getReactElementFromJSONX.call(context, jsonx, resources);
}
const jsonxHTMLString = outputHTML;
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
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
 * Exposes react module used in JSONX
 * @returns {Object} React
 */

function __getReact() {
  return React;
}
/**
 * Exposes react dom module used in JSONX
 * @returns {Object} ReactDOM
 */

function __getReactDOM() {
  return ReactDOM;
}
/**
 * Exposes global hook used in JSONX
 * @returns {Object} useGlobalHook
 */

function __getUseGlobalHook() {
  return useStore;
}
const _jsonxChildren = jsonxChildren;
const _jsonxComponents = jsonxComponents;
const _jsonxProps = jsonxProps;
const _jsonxUtils = jsonxUtils;

export default getReactElementFromJSONX;
export { __express, __getReact, __getReactDOM, __getUseGlobalHook, _jsonxChildren, _jsonxComponents, _jsonxProps, _jsonxUtils, compile, getReactElement, getReactElementFromJSON, getReactElementFromJSONX, getRenderedJSON, jsonToJSX, jsonxHTMLString, jsonxRender, outputHTML, outputJSON, outputJSX, __express as renderFile, renderIndex };
