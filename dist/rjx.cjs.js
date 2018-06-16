'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var ReactDOMElements = _interopDefault(require('react-dom-factories'));
var UAParser = _interopDefault(require('ua-parser-js'));
var createReactClass = _interopDefault(require('create-react-class'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
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
      var uastring = window.navigator.userAgent;
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
    console.error(e);
    // console.warn('could not detect browser support', e);
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

  var dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops'];
  var evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
  var validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops'].concat(dynamicPropsNames, evalPropNames);
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
  if (rjx.__windowComponentProps && (_typeof(rjx.__windowComponentProps) !== 'object' || Array.isArray(rjx.__windowComponentProps))) {
    errors.push(TypeError('[0013] rjx.__windowComponentProps  must be an object'));
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

/**
 * validates simple RJX Syntax {[component]:{props,children}}
 * @param {Object} simpleRJX - Any valid simple RJX Syntax
 * @return {Boolean} returns true if simpleRJX is valid
 */
function validSimpleRJXSyntax() {
  var simpleRJX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Object.keys(simpleRJX).length !== 1 && !simpleRJX.component) {
    return false;
  } else {
    var componentName = Object.keys(simpleRJX)[0];
    return Object.keys(simpleRJX).length === 1 && !simpleRJX[componentName].component && _typeof(simpleRJX[componentName]) === 'object' ? true : false;
  }
}

/**
 * Transforms SimpleRJX to Valid RJX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleRJX JSON Object 
 * @return {Object} - returns a valid RJX JSON Object from a simple RJX JSON Object
 */
function simpleRJXSyntax() {
  var simpleRJX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var component = Object.keys(simpleRJX)[0];
  try {
    return Object.assign({}, {
      component: component
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
function getSimplifiedRJX() {
  var rjx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  try {
    if (!rjx.component) return rjx; //already simple
    var componentName = rjx.component;
    rjx.children = Array.isArray(rjx.children) ? rjx.children.map(getSimplifiedRJX) : rjx.children;
    delete rjx.component;
    return defineProperty({}, componentName, rjx);
  } catch (e) {
    throw e;
  }
}



var rjxUtils = Object.freeze({
	displayComponent: displayComponent$1,
	getAdvancedBinding: getAdvancedBinding,
	traverse: traverse,
	validateRJX: validateRJX,
	validSimpleRJXSyntax: validSimpleRJXSyntax,
	simpleRJXSyntax: simpleRJXSyntax,
	getSimplifiedRJX: getSimplifiedRJX
});

// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }
var advancedBinding = getAdvancedBinding();

/**
 * object of all react components available for RJX
 */
var componentMap$1 = Object.assign({}, ReactDOMElements, (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window.__rjx_custom_elements : {});

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
    var cleanLibraryName = rjx.component.replace(libraryName + '.', '');
    var libraryNameArray = cleanLibraryName.split('.');
    if (libraryNameArray.length === 2 && componentLibraries[libraryName] && componentLibraries[libraryName][libraryNameArray[0]] && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== 'undefined') {
      return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
    } else if (typeof componentLibraries[libraryName][cleanLibraryName] !== 'undefined') {
      return componentLibraries[libraryName][cleanLibraryName];
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
 * Returns a new function from an options object
 * @param {Object} options 
 * @param {String} [options.body=''] - Function string body
 * @param {String[]} [options.args=[]] - Function arguments
 * @returns {Function} 
 */
function getFunctionFromEval() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$body = options.body,
      body = _options$body === undefined ? '' : _options$body,
      _options$args = options.args,
      args = _options$args === undefined ? [] : _options$args;

  args.push(body);
  return Function.prototype.constructor.apply({}, args);
}

/**
 * Returns a new React Component
 * @param {Boolean} [options.returnFactory=true] - returns a React component if true otherwise returns Component Class 
 * @param {Object} [options.resources={}] - asyncprops for component
 * @param {Object} [reactComponent={}] - an object of functions used for create-react-class
 * @param {Object} reactComponent.render.body - Valid RJX JSON
 * @param {String} reactComponent.getDefaultProps.body - return an object for the default props
 * @param {String} reactComponent.getInitialState.body - return an object for the default state
 * @returns {Function} 
 * @see {@link https://reactjs.org/docs/react-without-es6.html} 
 */
function getReactComponent() {
  var _this2 = this;

  var reactComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$returnFactor = options.returnFactory,
      returnFactory = _options$returnFactor === undefined ? true : _options$returnFactor,
      _options$resources = options.resources,
      resources = _options$resources === undefined ? {} : _options$resources;

  var rjc = Object.assign({
    getDefaultProps: {
      body: 'return {};'
    },
    getInitialState: {
      body: 'return {};'
    }
  }, reactComponent);
  var rjcKeys = Object.keys(rjc);
  if (rjcKeys.includes('render') === false) {
    throw new ReferenceError('React components require a render method');
  }
  var classOptions = rjcKeys.reduce(function (result, val) {
    var args = rjc[val].arguments;
    var body = rjc[val].body;
    if (!body) {
      console.warn({ rjc: rjc });
      throw new SyntaxError('Function(' + val + ') requires a function body');
    }
    if (args && !Array.isArray(args) && args.length && args.length && args.filter(function (arg) {
      return typeof arg === 'string';
    }).length) {
      throw new TypeError('Function(' + val + ') arguments must be an array or variable names');
    }
    result[val] = val === 'render' ? function () {
      return getRenderedJSON.call(_this2, body, resources);
    } : getFunctionFromEval({
      body: body,
      args: args
    });
    return result;
  }, {});
  var reactComponentClass = createReactClass(classOptions);
  return returnFactory ? React.createFactory(reactComponentClass) : reactComponentClass;
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
	getComponentFromMap: getComponentFromMap$1,
	getFunctionFromEval: getFunctionFromEval,
	getReactComponent: getReactComponent
});

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
function getRJXProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var _options$rjx = options.rjx,
      rjx = _options$rjx === undefined ? {} : _options$rjx,
      _options$propName = options.propName,
      propName = _options$propName === undefined ? 'asyncprops' : _options$propName,
      _options$traverseObje = options.traverseObject,
      traverseObject = _options$traverseObje === undefined ? {} : _options$traverseObje;
  // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
  // ? utilities.traverse(rjx.asyncprops, resources)
  // : {};

  return rjx[propName] && _typeof(rjx[propName]) === 'object' ? traverse(rjx[propName], traverseObject) : {};
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
function getEvalProps() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx;

  var scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  var evProps = Object.keys(rjx.__dangerouslyEvalProps || {}).reduce(function (eprops, epropName) {
    // eslint-disable-next-line
    eprops[epropName] = scopedEval(rjx.__dangerouslyEvalProps[epropName]);
    return eprops;
  }, {});
  var evBindProps = Object.keys(rjx.__dangerouslyBindEvalProps || {}).reduce(function (eprops, epropName) {
    // eslint-disable-next-line
    eprops[epropName] = scopedEval(rjx.__dangerouslyBindEvalProps[epropName]).bind(_this);
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
function getComponentProps() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx,
      resources = options.resources;

  return Object.keys(rjx.__dangerouslyInsertComponents).reduce(function (cprops, cpropName) {
    // eslint-disable-next-line
    cprops[cpropName] = getRenderedJSON.call(_this2, rjx.__dangerouslyInsertComponents[cpropName], resources);
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
function getReactComponentProps() {
  var _this3 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx;

  return Object.keys(rjx.__dangerouslyInsertReactComponents).reduce(function (cprops, cpropName) {
    // eslint-disable-next-line
    cprops[cpropName] = getComponentFromMap$1({
      rjx: { component: rjx.__dangerouslyInsertReactComponents[cpropName] },
      reactComponents: _this3.reactComponents,
      componentLibraries: _this3.componentLibraries
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
function getFunctionFromProps(options) {
  var _options$propFunc = options.propFunc,
      propFunc = _options$propFunc === undefined ? 'func:' : _options$propFunc;
  // eslint-disable-next-line

  var _logError = this.logError,
      logError = _logError === undefined ? console.error : _logError,
      debug = this.debug;

  var window = this.window || global.window || window;

  try {
    var functionNameString = propFunc.split(':')[1] || '';
    var functionNameArray = functionNameString.split('.');
    var functionName = functionNameArray.length ? functionNameArray[functionNameArray.length - 1] : '';

    if (propFunc.indexOf('func:window') !== -1) {
      if (functionNameArray.length === 3) {
        try {
          return window[functionNameArray[1]][functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return window[functionNameArray[1]][functionName];
        }
      } else {
        try {
          return window[functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return window[functionName];
        }
      }
    } else if (functionNameArray.length === 4) {
      return this.props[functionNameArray[2]][functionName];
    } else if (functionNameArray.length === 3) {
      return this.props[functionName].bind(this);
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
function getFunctionProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$allProps = options.allProps,
      allProps = _options$allProps === undefined ? {} : _options$allProps,
      _options$rjx2 = options.rjx,
      rjx = _options$rjx2 === undefined ? {} : _options$rjx2;

  var getFunction = getFunctionFromProps.bind(this);
  var funcProps = rjx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(function (key) {
    if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
      allProps[key] = getFunction({ propFunc: funcProps[key] });
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
function getWindowComponents() {
  var _this4 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var allProps = options.allProps,
      rjx = options.rjx;

  var windowComponents = rjx.__windowComponents;
  var window = this.window || window;
  var windowFuncPrefix = 'func:window.__rjx_custom_elements';
  // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {
  Object.keys(windowComponents).forEach(function (key) {
    var windowKEY = typeof windowComponents[key] === 'string' ? windowComponents[key].replace(windowFuncPrefix + '.', '') : '';
    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window.__rjx_custom_elements[windowKEY] === 'function') {
      var windowComponentElement = window.__rjx_custom_elements[windowKEY];
      var windowComponentProps = allProps['__windowComponentProps'] ? allProps['__windowComponentProps'] : _this4.props;
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
function getComputedProps$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var _options$rjx3 = options.rjx,
      rjx = _options$rjx3 === undefined ? {} : _options$rjx3,
      _options$resources = options.resources,
      resources = _options$resources === undefined ? {} : _options$resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      _options$useReduxStat = options.useReduxState,
      useReduxState = _options$useReduxStat === undefined ? true : _options$useReduxStat,
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
    var windowTraverse = typeof window !== 'undefined' ? window : {};
    var asyncprops = getRJXProps({ rjx: rjx, propName: 'asyncprops', traverseObject: resources });
    var resourceprops = getRJXProps({ rjx: rjx, propName: 'resourceprops', traverseObject: resources });
    var windowprops = getRJXProps({ rjx: rjx, propName: 'windowprops', traverseObject: windowTraverse });
    var thisprops = getRJXProps({ rjx: rjx, propName: 'thisprops', traverseObject: componentThisProp });

    //allowing javascript injections
    var evalProps = rjx.__dangerouslyEvalProps || rjx.__dangerouslyBindEvalProps ? getEvalProps.call(this, { rjx: rjx }) : {};
    var insertedComponents = rjx.__dangerouslyInsertComponents ? getComponentProps.call(this, { rjx: rjx, resources: resources, debug: debug }) : {};
    var insertedReactComponents = rjx.__dangerouslyInsertReactComponents ? getReactComponentProps.call(this, { rjx: rjx, debug: debug }) : {};
    var allProps = Object.assign({}, { key: renderIndex$$1 }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
    var computedProps = Object.assign({}, allProps, rjx.__functionProps ? getFunctionProps.call(this, { allProps: allProps, rjx: rjx }) : {}, rjx.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, rjx: rjx }) : {});

    return computedProps;
  } catch (e) {
    debug && logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}



var rjxProps = Object.freeze({
	getRJXProps: getRJXProps,
	getEvalProps: getEvalProps,
	getComponentProps: getComponentProps,
	getReactComponentProps: getReactComponentProps,
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
      if (Array.isArray(props._children) || typeof props._children !== 'undefined') {
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
      options = config.options,
      DOM = config.DOM;

  ReactDOM.render(getRenderedJSON.call(this || {}, rjx, resources, options), DOM || document.querySelector(querySelector));
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

  return ReactDOMServer.renderToString(getRenderedJSON.call(this || {}, rjx, resources));
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
  var _ref = this || {},
      _ref$componentLibrari = _ref.componentLibraries,
      componentLibraries = _ref$componentLibrari === undefined ? {} : _ref$componentLibrari,
      _ref$debug = _ref.debug,
      debug = _ref$debug === undefined ? false : _ref$debug,
      _ref$logError = _ref.logError,
      logError = _ref$logError === undefined ? console.error : _ref$logError,
      _ref$boundedComponent = _ref.boundedComponents,
      boundedComponents = _ref$boundedComponent === undefined ? [] : _ref$boundedComponent;
  // const componentLibraries = this.componentLibraries;


  if (rjx.type) rjx.component = rjx.type;
  if (validSimpleRJXSyntax(rjx)) rjx = simpleRJXSyntax(rjx);
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
    var resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__rjx;
    var rjxModule = options.__rjx || require(filePath);
    var rjxRenderedString = rjxHTMLString.call(options.__boundConfig || {}, {
      rjx: rjxModule,
      resources: resources
    });
    callback(null, (options.__DOCTYPE || '<!DOCTYPE html>') + '\n' + rjxRenderedString);
  } catch (e) {
    callback(e);
  }
}

var _rjxChildren = rjxChildren;
var _rjxComponents = rjxComponents;
var _rjxProps = rjxProps;
var _rjxUtils = rjxUtils;

exports.rjxRender = rjxRender;
exports.rjxHTMLString = rjxHTMLString;
exports.getRenderedJSON = getRenderedJSON;
exports.__express = __express;
exports._rjxChildren = _rjxChildren;
exports._rjxComponents = _rjxComponents;
exports._rjxProps = _rjxProps;
exports._rjxUtils = _rjxUtils;
exports['default'] = getRenderedJSON;
