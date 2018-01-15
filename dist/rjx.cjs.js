'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var ReactDOMElements = require('react-dom-factories');
var UAParser = _interopDefault(require('ua-parser-js'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

if (typeof window$1 === 'undefined') {
  var window$1 = global.window || {};
}
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
function displayComponent$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$rjx = options.rjx,
      rjx = _options$rjx === undefined ? {} : _options$rjx,
      props = options.props;

  var propsToCompare = rjx.comparisonprops;
  var comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(function (comp) {
    var compares = {};
    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }
    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }
    var propcompares = traverse(compares, props || rjx.props);
    var opscompares = Object.assign({}, comp, propcompares);
    // console.debug({ opscompares, compares, renderedCompProps });
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
    }
    // }
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
  var validProps = comparisons.filter(function (comp) {
    return comp === true;
  });
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
  try {
    window$1 = typeof this.window !== 'undefined' ? this.window : window$1;
    if (window$1 && window$1.navigator && window$1.navigator.userAgent && typeof window$1.navigator.userAgent === 'string') {
      // console.log('window.navigator.userAgent',window.navigator.userAgent)
      if (window$1.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      var uastring = window$1.navigator.userAgent;
      var parser = new UAParser();
      parser.setUA(uastring);
      var parseUserAgent = parser.getResult();
      // console.log({ parseUserAgent, });
      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView') && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }
      if (parseUserAgent.browser.name === 'Android Browser') {
        return false;
      }
    }
  } catch (e) {
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
function traverse() {
  var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var keys = Object.keys(paths);
  if (!keys.length) return paths;
  return keys.reduce(function (result, key) {
    if (typeof paths[key] === 'string') result[key] = data[paths[key]];else if (Array.isArray(paths[key])) {
      var _path = Object.assign([], paths[key]);
      var value = data;
      while (_path.length && value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        var prop = _path.shift();
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
function validateRJX() {
  var rjx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var returnAllErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var dynamicPropsNames = ['asyncprops', 'windowprops', 'thisprops'];
  var evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
  var validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', 'windowCompProps', 'comparisonprops', 'comparisonorprops', 'passprops'].concat(dynamicPropsNames, evalPropNames);
  var errors = [];
  if (!rjx.component) {
    errors.push(SyntaxError('[0001] Missing React Component'));
  }
  if (rjx.props) {
    if (_typeof(rjx.props) !== 'object' || Array.isArray(rjx.props)) {
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
      var _errors;

      var childrenErrors = rjx.children.filter(function (c) {
        return (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object';
      }).map(function (c) {
        return validateRJX(c, returnAllErrors);
      });
      errors = (_errors = errors).concat.apply(_errors, toConsumableArray(childrenErrors));
    }
  }
  dynamicPropsNames.forEach(function (dynamicprop) {
    var rjxDynamicProps = rjx[dynamicprop];
    if (rjxDynamicProps) {
      // if (dynamicprop === 'thisprops') {
      //   console.log({ dynamicprop, rjxDynamicProps });
      // }
      if ((typeof rjxDynamicProps === 'undefined' ? 'undefined' : _typeof(rjxDynamicProps)) !== 'object') {
        errors.push(TypeError('[0006] ' + dynamicprop + ' must be an object'));
      }
      Object.keys(rjxDynamicProps).forEach(function (resolvedDynamicProp) {
        if (!Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          errors.push(TypeError('[0007] rjx.' + dynamicprop + '.' + resolvedDynamicProp + ' must be an array of strings'));
        }
        if (Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          var allStringArray = rjxDynamicProps[resolvedDynamicProp].filter(function (propArrayItem) {
            return typeof propArrayItem === 'string';
          });

          if (allStringArray.length !== rjxDynamicProps[resolvedDynamicProp].length) {
            errors.push(TypeError('[0008] rjx.' + dynamicprop + '.' + resolvedDynamicProp + ' must be an array of strings'));
          }
        }
      });
    }
  });
  var evalProps = rjx.__dangerouslyEvalProps;
  var boundEvalProps = rjx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if (evalProps && (typeof evalProps === 'undefined' ? 'undefined' : _typeof(evalProps)) !== 'object' || boundEvalProps && (typeof boundEvalProps === 'undefined' ? 'undefined' : _typeof(boundEvalProps)) !== 'object') {
      errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
    }
    evalPropNames.filter(function (evalProp) {
      return rjx[evalProp];
    }).forEach(function (eProps) {
      var evProp = rjx[eProps];
      var scopedEval = eval;
      Object.keys(evProp).forEach(function (propToEval) {
        if (typeof evProp[propToEval] !== 'string') {
          errors.push(TypeError('[0010] rjx.' + eProps + '.' + evProp + ' must be a string'));
        }
        try {
          // console.log({ eProps });
          if (eProps === '__dangerouslyBindEvalProps') {
            var funcToBind = scopedEval('(' + evProp[propToEval] + ')');
            funcToBind.call({ bounded: true });
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
    Object.keys(rjx.__dangerouslyInsertComponents).forEach(function (insertedComponents) {
      try {
        validateRJX(rjx.__dangerouslyInsertComponents[insertedComponents]);
      } catch (e) {
        errors.push(TypeError('[0011] rjx.__dangerouslyInsertComponents.' + insertedComponents + ' must be a valid RJX JSON Object: ' + e.toString()));
      }
    });
  }
  if (rjx.__functionProps) {
    if (_typeof(rjx.__functionProps) !== 'object') {
      errors.push(TypeError('[0012] rjx.__functionProps  must be an object'));
    } else {

      Object.keys(rjx.__functionProps).forEach(function (fProp) {
        if (rjx.__functionProps[fProp] && (typeof rjx.__functionProps[fProp] !== 'string' || rjx.__functionProps[fProp].indexOf('func:') === -1)) {
          errors.push(ReferenceError('[0013] rjx.__functionProps.' + fProp + ' must reference a function (i.e. func:this.props.logoutUser())'));
        }
      });
    }
  }
  if (rjx.windowCompProps && (_typeof(rjx.windowCompProps) !== 'object' || Array.isArray(rjx.windowCompProps))) {
    errors.push(TypeError('[0013] rjx.windowCompProps  must be an object'));
  }
  if (rjx.__windowComponents) {
    if (_typeof(rjx.__windowComponents) !== 'object') {
      errors.push(TypeError('[0014] rjx.__windowComponents must be an object'));
    }
    Object.keys(rjx.__windowComponents).forEach(function (cProp) {
      if (typeof rjx.__windowComponents[cProp] !== 'string' || rjx.__windowComponents[cProp].indexOf('func:') === -1) {
        errors.push(ReferenceError('[0015] rjx.__windowComponents.' + cProp + ' must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)'));
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
      rjx.comparisonprops.forEach(function (c) {
        if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object') {
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
  var invalidKeys = Object.keys(rjx).filter(function (key) {
    return validKeys.indexOf(key) === -1;
  });
  if (errors.length) {
    if (returnAllErrors) return errors;
    throw errors[0];
  }
  return invalidKeys.length ? 'Warning: Invalid Keys [' + invalidKeys.join() + ']' : true;
}



var rjxUtils = Object.freeze({
	displayComponent: displayComponent$1,
	getAdvancedBinding: getAdvancedBinding,
	traverse: traverse,
	validateRJX: validateRJX
});

if (typeof window === 'undefined') {
  var window = global.window || {};
}
var advancedBinding = getAdvancedBinding();

/**
 * object of all react components available for RJX
 */
var componentMap$1 = Object.assign({}, ReactDOMElements, window.__rjx_custom_elements);

/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for RJX
 * @param {string[]} boundedComponents - list of components to bind RJX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for RJX
 */
function getBoundedComponents$1() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reactComponents = options.reactComponents,
      _options$boundedCompo = options.boundedComponents,
      boundedComponents = _options$boundedCompo === undefined ? [] : _options$boundedCompo;

  if (advancedBinding || options.advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.reduce(function (result, componentName) {
      result[componentName] = reactComponents[componentName].bind(_this);
      return result;
    }, {}));
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

/**
 * returns a react component from a component library
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.rjx={}] - any valid RJX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
function getComponentFromLibrary() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$componentLib = options.componentLibraries,
      componentLibraries = _options$componentLib === undefined ? {} : _options$componentLib,
      _options$rjx = options.rjx,
      rjx = _options$rjx === undefined ? {} : _options$rjx;

  var libComponent = Object.keys(componentLibraries).map(function (libraryName) {
    if (typeof componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')] !== 'undefined') {
      return componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')];
    }
  }).filter(function (val) {
    return val;
  })[0];
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
function getComponentFromMap$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var _options$rjx2 = options.rjx,
      rjx = _options$rjx2 === undefined ? {} : _options$rjx2,
      _options$reactCompone = options.reactComponents,
      reactComponents = _options$reactCompone === undefined ? {} : _options$reactCompone,
      _options$componentLib2 = options.componentLibraries,
      componentLibraries = _options$componentLib2 === undefined ? {} : _options$componentLib2,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      debug = options.debug;


  try {
    if (typeof rjx.component !== 'string' && typeof rjx.component === 'function') {
      return rjx.component;
    } else if (ReactDOMElements[rjx.component]) {
      return rjx.component;
    } else if (reactComponents[rjx.component]) {
      return reactComponents[rjx.component];
    } else if (typeof rjx.component === 'string' && rjx.component.indexOf('.') > 0 && getComponentFromLibrary({ rjx: rjx, componentLibraries: componentLibraries })) {
      return getComponentFromLibrary({ rjx: rjx, componentLibraries: componentLibraries });
    } else {
      throw new ReferenceError('Invalid React Component (' + rjx.component + ')');
    }
  } catch (e) {
    if (debug) logError(e, e.stack ? e.stack : 'no stack');
    throw e;
  }
}

/**
 * if (recharts[rjx.component.replace('recharts.', '')]) {
      return recharts[rjx.component.replace('recharts.', '')];
    }
 */

var rjxComponents = Object.freeze({
	advancedBinding: advancedBinding,
	componentMap: componentMap$1,
	getBoundedComponents: getBoundedComponents$1,
	getComponentFromLibrary: getComponentFromLibrary,
	getComponentFromMap: getComponentFromMap$1
});

if (typeof window$2 === 'undefined') {
  var window$2 = {};
}

var componentMap$2 = Object.assign({}, React.DOM, typeof window$2 !== 'undefined' ? window$2.__rjx_custom_elements : {});

function getRJXProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var rjx = options.rjx,
      resources = options.resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      _options$useReduxStat = options.useReduxState,
      useReduxState = _options$useReduxStat === undefined ? true : _options$useReduxStat,
      _options$propName = options.propName,
      propName = _options$propName === undefined ? 'asyncprops' : _options$propName,
      _options$traverseObje = options.traverseObject,
      traverseObject = _options$traverseObje === undefined ? {} : _options$traverseObje;
  // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
  // ? utilities.traverse(rjx.asyncprops, resources)
  // : {};

  return rjx[propName] && _typeof(rjx[propName]) === 'object' ? traverse(rjx[propName], traverseObject) : {};
}

function getEvalProps() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx;

  var scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  return Object.keys(rjx.__dangerouslyEvalProps).reduce(function (eprops, epropName) {
    // eslint-disable-next-line
    eprops[epropName] = rjx.__dangerouslyBindEvalProps[epropName] ? scopedEval(rjx.__dangerouslyEvalProps[epropName]).bind(_this) : scopedEval(rjx.__dangerouslyEvalProps[epropName]);
    return eprops;
  }, {});
}

function getComponentProps() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx,
      resources = options.resources,
      debug = options.debug;

  return Object.keys(rjx.__dangerouslyInsertComponents).reduce(function (cprops, cpropName) {
    // eslint-disable-next-line
    cprops[cpropName] = getRenderedJSON.call(_this2, rjx.__dangerouslyInsertComponents[cpropName], resources, debug);
    return cprops;
  }, {});
}

function getFunctionFromProps(options) {
  var propFunc = options.propFunc;


  if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props.reduxRouter') !== -1) {
    return this.props.reduxRouter[propFunc.replace('func:this.props.reduxRouter.', '')];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props') !== -1) {
    return this.props[propFunc.replace('func:this.props.', '')].bind(this);
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window$2[propFunc.replace('func:window.', '')] === 'function') {
    return window$2[propFunc.replace('func:window.', '')].bind(this);
  } else if (typeof this.props[propFunc] === 'function') {
    return propFunc.bind(this);
  } else {
    return function () {};
  }
}

function getFunctionProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var allProps = options.allProps,
      _options$rjx = options.rjx,
      rjx = _options$rjx === undefined ? {} : _options$rjx;

  var getFunction = getFunctionFromProps.bind(this);
  var funcProps = rjx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(function (key) {
    if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
      allProps[key] = getFunction({ propFunc: allProps[key] });
    }
  });
  return allProps;
}

function getWindowComponents() {
  var _this3 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var allProps = options.allProps,
      rjx = options.rjx;

  var windowComponents = rjx.__windowComponents;
  // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {
  Object.keys(windowComponents).forEach(function (key) {
    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf('func:window.__rjx_custom_elements') !== -1 && typeof window$2.__rjx_custom_elements[windowComponents[key].replace('func:window.__rjx_custom_elements.', '')] === 'function') {
      var windowComponentElement = window$2.__rjx_custom_elements[allProps[key].replace('func:window.__rjx_custom_elements.', '')];
      var windowComponentProps = allProps['windowCompProps'] ? allProps['windowCompProps'] : _this3.props;
      allProps[key] = React.createElement(windowComponentElement, windowComponentProps, null);
    }
  });
  return allProps;
}

//any property that's prefixed with __ is a computedProperty
function getComputedProps$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var rjx = options.rjx,
      resources = options.resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError2 = options.logError,
      logError = _options$logError2 === undefined ? console.error : _options$logError2,
      _options$useReduxStat2 = options.useReduxState,
      useReduxState = _options$useReduxStat2 === undefined ? true : _options$useReduxStat2,
      _options$ignoreReduxP = options.ignoreReduxPropsInComponentLibraries,
      ignoreReduxPropsInComponentLibraries = _options$ignoreReduxP === undefined ? true : _options$ignoreReduxP,
      componentLibraries = options.componentLibraries,
      debug = options.debug;

  try {
    var componentThisProp = rjx.thisprops ? Object.assign({
      __rjx: {
        _component: rjx,
        _resources: resources
      }
    }, this.props, rjx.props, useReduxState && !rjx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[rjx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : undefined;
    var asyncprops = getRJXProps({ rjx: rjx, propName: 'asyncprops', traverseObject: resources });
    var windowprops = getRJXProps({ rjx: rjx, propName: 'windowprops', traverseObject: window$2 });
    var thisprops = getRJXProps({ rjx: rjx, propName: 'thisprops', traverseObject: componentThisProp });

    //allowing javascript injections
    var evalProps = rjx.__dangerouslyEvalProps ? getEvalProps.call(this, { rjx: rjx }) : {};
    var insertedComponents = rjx.__dangerouslyInsertComponents ? getComponentProps.call(this, { rjx: rjx, resources: resources, debug: debug }) : {};
    var allProps = Object.assign({ key: renderIndex$$1 }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
    var computedProps = Object.assign({}, allProps, rjx.__functionProps ? getFunctionProps.call(this, { allProps: allProps, rjx: rjx }) : {}, rjx.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, rjx: rjx }) : {});

    return computedProps;
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}



var rjxProps = Object.freeze({
	componentMap: componentMap$2,
	getRJXProps: getRJXProps,
	getEvalProps: getEvalProps,
	getComponentProps: getComponentProps,
	getFunctionFromProps: getFunctionFromProps,
	getFunctionProps: getFunctionProps,
	getWindowComponents: getWindowComponents,
	getComputedProps: getComputedProps$1
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
function getChildrenProperty() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$rjx = options.rjx,
      rjx = _options$rjx === undefined ? {} : _options$rjx;

  var props = options.props || rjx.props || {};
  if (props._children /* && !rjx.children */) {
      if (Array.isArray(props._children) || typeof props._children === 'string') {
        return props._children;
      } else {
        return rjx.children;
      }
    } else if (typeof rjx.children === 'undefined') {
    if (props && props.children && (typeof props.children === 'string' || Array.isArray(props.children))) {
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
function getChildrenProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$rjx2 = options.rjx,
      rjx = _options$rjx2 === undefined ? {} : _options$rjx2,
      childrjx = options.childrjx,
      renderIndex$$1 = options.renderIndex;

  var props = options.props || rjx.props || {};

  return rjx.passprops && (typeof childrjx === 'undefined' ? 'undefined' : _typeof(childrjx)) === 'object' ? Object.assign({}, childrjx, {
    props: Object.assign({}, props, childrjx.thisprops && childrjx.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
    childrjx.asyncprops && childrjx.asyncprops.style || childrjx.windowprops && childrjx.windowprops.style ? {} : {
      style: {}
    }, childrjx.props, { key: renderIndex$$1 + Math.random() })
  }) : childrjx;
}

/**
 * returns React Child Elements via RJX
 * @param {*} options 
 * @property {object} this - options for getRenderedJSON
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */
function getRJXChildren$1() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var rjx = options.rjx,
      resources = options.resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  var props = options.props || rjx.props || {};
  try {
    rjx.children = getChildrenProperty({ rjx: rjx, props: props });

    return rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string' ? rjx.children.map(function (childrjx) {
      return getRenderedJSON.call(_this, getChildrenProps({ rjx: rjx, childrjx: childrjx, props: props, renderIndex: renderIndex$$1 }), resources);
    }) : rjx.children;
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}



var rjxChildren = Object.freeze({
	getChildrenProperty: getChildrenProperty,
	getChildrenProps: getChildrenProps,
	getRJXChildren: getRJXChildren$1
});

// import React, { createElement, } from 'react';
var createElement = React.createElement;
var componentMap = componentMap$1;
var getComponentFromMap = getComponentFromMap$1;
var getBoundedComponents = getBoundedComponents$1;
var getComputedProps = getComputedProps$1;
var getRJXChildren = getRJXChildren$1;
var displayComponent = displayComponent$1;

exports.renderIndex = 0;

/**
 * Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="rjx-generated"><p style="color:red;">hello world</p></div></div></body>
 * rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getRenderedJSON
 */
function rjxRender() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = config.rjx,
      resources = config.resources,
      querySelector = config.querySelector,
      options = config.options;

  ReactDOM.render(getRenderedJSON.call(this, rjx, resources, options), document.querySelector(querySelector));
}

/**
 * Use ReactDOMServer.renderToString to render html from RJX
 * @example
 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
 * rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getRenderedJSON
 * @returns {string} React genereated html via RJX JSON
 */
function rjxHTMLString() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = config.rjx,
      resources = config.resources;

  return ReactDOMServer.renderToString(getRenderedJSON.call(this, rjx, resources));
}

/**
 * Use React.createElement and RJX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * rjx.getRenderedJSON({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getRenderedJSON
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */
function getRenderedJSON() {
  var rjx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // eslint-disable-next-line
  var _componentLibraries = this.componentLibraries,
      componentLibraries = _componentLibraries === undefined ? {} : _componentLibraries,
      _debug = this.debug,
      debug = _debug === undefined ? false : _debug,
      _logError = this.logError,
      logError = _logError === undefined ? console.error : _logError,
      _boundedComponents = this.boundedComponents,
      boundedComponents = _boundedComponents === undefined ? [] : _boundedComponents;
  // const componentLibraries = this.componentLibraries;

  if (!rjx.component) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    var components = Object.assign({}, componentMap, this.reactComponents);

    var reactComponents = boundedComponents.length ? getBoundedComponents.call(this, { boundedComponents: boundedComponents, reactComponents: components }) : components;
    exports.renderIndex++;
    var element = getComponentFromMap({ rjx: rjx, reactComponents: reactComponents, componentLibraries: componentLibraries, debug: debug, logError: logError });
    var props = getComputedProps.call(this, { rjx: rjx, resources: resources, renderIndex: exports.renderIndex, componentLibraries: componentLibraries, debug: debug, logError: logError });
    var displayElement = rjx.comparisonprops ? displayComponent.call(this, { rjx: rjx, props: props, renderIndex: exports.renderIndex, componentLibraries: componentLibraries, debug: debug }) : true;

    if (displayElement) {
      var children = getRJXChildren.call(this, { rjx: rjx, props: props, resources: resources, renderIndex: exports.renderIndex });
      return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ rjx: rjx, resources: resources }, 'this', this);
      logError(e, e.stack ? e.stack : 'no stack');
    }
    throw e;
  }
}

var _rjxChildren = rjxChildren;
var _rjxComponents = rjxComponents;
var _rjxProps = rjxProps;
var _rjxUtils = rjxUtils;

exports.rjxRender = rjxRender;
exports.rjxHTMLString = rjxHTMLString;
exports.getRenderedJSON = getRenderedJSON;
exports._rjxChildren = _rjxChildren;
exports._rjxComponents = _rjxComponents;
exports._rjxProps = _rjxProps;
exports._rjxUtils = _rjxUtils;
exports['default'] = getRenderedJSON;
