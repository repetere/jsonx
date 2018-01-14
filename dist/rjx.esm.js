import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as ReactDOMElements from 'react-dom-factories';
import UAParser from 'ua-parser-js';

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

function displayComponent$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx,
      props = options.props;

  var propsToCompare = rjx.comparisonprops;
  var comparisons = propsToCompare.map(function (comp) {
    var compares = {};
    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }
    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }
    var propcompares = traverse(compares, props);
    var opscompares = Object.assign({}, comp, propcompares);
    // console.debug({ opscompares, compares, renderedCompProps });
    if (opscompares.operation === 'eq') {
      // return opscompares.left == opscompares.right;
      return opscompares.left === opscompares.right;
    } else if (opscompares.operation === 'dneq') {
      // return opscompares.left != opscompares.right;
      return opscompares.left !== opscompares.right;
    } else if (opscompares.operation === 'dnseq') {
      return opscompares.left !== opscompares.right;
    } else if (opscompares.operation === 'seq') {
      return opscompares.left === opscompares.right;
    } else if (opscompares.operation === 'lt') {
      return opscompares.left < opscompares.right;
    } else if (opscompares.operation === 'lte') {
      return opscompares.left <= opscompares.right;
    } else if (opscompares.operation === 'gt') {
      return opscompares.left > opscompares.right;
    } else if (opscompares.operation === 'gte') {
      return opscompares.left >= opscompares.right;
    } else if (opscompares.operation === 'dne') {
      return opscompares.left === undefined || opscompares.left === null;
    } else {
      //'exists'
      return opscompares.left !== undefined || opscompares.left !== null;
    }
  });
  var validProps = comparisons.filter(function (comp) {
    return comp === true;
  });
  if (rjx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (validProps.length !== comparisons.length) {
    return false;
  } else {
    return true;
  }
}

function getAdvancedBinding() {
  try {
    if (window && window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      var uastring = window.navigator.userAgent;
      var parser = new UAParser();
      parser.setUA(uastring);
      var parseUserAgent = parser.getResult();
      // console.debug({ parseUserAgent, });
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

function traverse(paths, data) {
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
    } else throw new TypeError('asyncprop paths must be a string or an array of strings or numeric indexes');
    return result;
  }, {});
}

function validateRJX(rjx) {
  var dynamicPropsNames = ['asyncprops', 'windowprops', 'thisprops'];
  var evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
  var validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', 'windowCompProps'].concat(dynamicPropsNames, evalPropNames);
  if (!rjx.component) {
    throw new Error('Missing React Component');
  }
  if (rjx.props) {
    if (_typeof(rjx.props) !== 'object') {
      throw new Error('props must be an Object / valid React props');
    }
    if (rjx.props.children) {
      if (typeof rjx.props.children !== 'string' || !Array.isArray(rjx.props.children)) {
        throw new Error('props.children must be an array of RJX JSON objects or a string');
      }
      if (typeof rjx.props._children !== 'string' || !Array.isArray(rjx.props._children)) {
        throw new Error('props._children must be an array of RJX JSON objects or a string');
      }
    }
  }
  if (rjx.children) {
    if (typeof rjx.children !== 'string' || !Array.isArray(rjx.children)) {
      throw new Error('children must be an array of RJX JSON objects or a string');
    }
  }
  dynamicPropsNames.forEach(function (dynamicprop) {
    var rjxDynamicProps = rjx[dynamicprop];
    if (rjxDynamicProps) {
      if ((typeof rjxDynamicProps === 'undefined' ? 'undefined' : _typeof(rjxDynamicProps)) !== 'object') {
        throw new TypeError(dynamicprop + ' must be an object');
      }
      Object.keys(rjxDynamicProps).forEach(function (resolvedDynamicProp) {
        if (!Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          throw new TypeError('rjx.' + dynamicprop + '.' + resolvedDynamicProp + ' must be an array of strings');
        }
        var allStringArray = resolvedDynamicProp.filter(function (propArrayItem) {
          return typeof propArrayItem === 'string';
        });
        if (allStringArray.length !== rjxDynamicProps[resolvedDynamicProp].length) {
          throw new TypeError('rjx.' + dynamicprop + '.' + resolvedDynamicProp + ' must be an array of strings');
        }
      });
    }
  });
  var evalProps = rjx.__dangerouslyEvalProps;
  var boundEvalProps = rjx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if (evalProps && (typeof evalProps === 'undefined' ? 'undefined' : _typeof(evalProps)) !== 'object' || boundEvalProps && (typeof boundEvalProps === 'undefined' ? 'undefined' : _typeof(boundEvalProps)) !== 'object') {
      throw new TypeError('__dangerouslyEvalProps must be an object of strings to convert to valid javascript');
    }
    evalPropNames.filter(function (evalProp) {
      return rjx[evalProp];
    }).forEach(function (eProps) {
      var evProp = rjx[eProps];
      var scopedEval = eval;
      Object.keys(evProp).forEach(function (propToEval) {
        if (typeof evProp[propToEval] !== 'string') {
          throw new TypeError('rjx.' + eProps + '.' + evProp + ' must be a string');
        }
        try {
          scopedEval(evProp[propToEval]);
        } catch (e) {
          throw e;
        }
      });
    });
  }
  if (rjx.__dangerouslyInsertComponents) {
    Object.keys(rjx.__dangerouslyInsertComponents).forEach(function (insertedComponents) {
      try {
        validateRJX(rjx.__dangerouslyInsertComponents[insertedComponents]);
      } catch (e) {
        throw new TypeError('rjx.__dangerouslyInsertComponents.' + insertedComponents + ' must be a valid RJX JSON Object', e);
      }
    });
  }
  if (rjx.__functionProps) {
    if (_typeof(rjx.__functionProps) !== 'object') {
      throw new TypeError('rjx.__functionProps  must be an object');
    }
    Object.keys(rjx.__functionProps).forEach(function (fProp) {
      if (fProp.indexOf('func:') === -1) {
        throw new ReferenceError('rjx.__functionProps.' + fProp + ' must reference a function (i.e. func:this.props.logoutUser())');
      }
    });
  }
  if (rjx.windowCompProps && _typeof(rjx.windowCompProps)) {
    throw new TypeError('rjx.windowCompProps  must be an object');
  }
  if (rjx.__windowComponents) {
    if (_typeof(rjx.__windowComponents) !== 'object') {
      throw new TypeError('rjx.__windowComponents must be an object');
    }
    Object.keys(rjx.__windowComponents).forEach(function (cProp) {
      if (cProp.indexOf('func:') === -1) {
        throw new ReferenceError('rjx.__windowComponents.' + cProp + ' must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)');
      }
    });
  }
  var invalidKeys = Object.keys(rjx).filter(function (key) {
    return validKeys.indexOf(key) >= 0;
  });
  return invalidKeys.length ? 'Warning: Invalid Keys [' + invalidKeys.join() + ']' : true;
}



var rjxUtils = Object.freeze({
	displayComponent: displayComponent$1,
	getAdvancedBinding: getAdvancedBinding,
	traverse: traverse,
	validateRJX: validateRJX
});

if (typeof window$1 === 'undefined') {
  var window$1 = {};
}
var advancedBinding = getAdvancedBinding();
var componentMap$1 = Object.assign({}, ReactDOMElements, window$1.__rjx_custom_elements);

function getBoundedComponents$1() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reactComponents = options.reactComponents,
      _options$boundedCompo = options.boundedComponents,
      boundedComponents = _options$boundedCompo === undefined ? [] : _options$boundedCompo;

  if (advancedBinding || options.advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.map(function (componentName) {
      return defineProperty({}, componentName, reactComponents[componentName].bind(_this));
    }));
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

function getComponentFromMap$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var rjx = options.rjx,
      reactComponents = options.reactComponents,
      _options$componentLib = options.componentLibraries,
      componentLibraries = _options$componentLib === undefined ? {} : _options$componentLib,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      debug = options.debug;


  try {
    if (typeof rjx.component !== 'string') {
      return rjx.component;
    } else if (ReactDOMElements[rjx.component]) {
      return rjx.component;
    } else {
      Object.keys(componentLibraries).forEach(function (libraryName) {
        if (componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')]) {
          return componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')];
        }
      });
      if (reactComponents[rjx.component]) {
        return reactComponents[rjx.component];
      } else {
        throw new ReferenceError('Invalid React Component (' + rjx.component + ')');
      }
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
    var computedProps = Object.assign(allProps, rjx.__functionProps ? getFunctionProps.call(this, { allProps: allProps, rjx: rjx }) : {}, rjx.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, rjx: rjx }) : {});

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

function getChildrenArray() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return options;
}

function getChildrenStringOrProp() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx,
      props = options.props;


  return typeof rjx.children === 'undefined' ? props && props.children && (typeof props.children === 'string' || Array.isArray(props.children)) ? props.children : null : rjx.children;
}

function getChildrenProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = options.rjx,
      childrjx = options.childrjx,
      props = options.props,
      renderIndex$$1 = options.renderIndex;

  return rjx.bindprops ? Object.assign({}, childrjx, {
    props: Object.assign({}, props, childrjx.thisprops && childrjx.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
    childrjx.asyncprops && childrjx.asyncprops.style || childrjx.windowprops && childrjx.windowprops.style ? {} : {
      style: {}
    }, childrjx.props, { key: renderIndex$$1 + Math.random() })
  }) : childrjx;
}

function getRJXChildren$1() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var rjx = options.rjx,
      props = options.props,
      resources = options.resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    if (props._children /* && !rjx.children */) {
        if (Array.isArray(props._children)) {
          rjx.children = [].concat(props._children);
        } else {
          rjx.children = props._children;
        }
        delete props._children;
      }

    return rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string' ? rjx.children.map(function (childrjx) {
      return getRenderedJSON.call(_this, getChildrenProps({ rjx: rjx, childrjx: childrjx, props: props, renderIndex: renderIndex$$1 }), resources);
    }) : getChildrenStringOrProp({ rjx: rjx, props: props });
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

var rjxChildren = Object.freeze({
	getChildrenArray: getChildrenArray,
	getChildrenStringOrProp: getChildrenStringOrProp,
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

var renderIndex = 0;

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
 * Use ReactDOMServer.renderToString to render html from RJX
 * @example
 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
 * rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getRenderedJSON
 * @param {Object} [this.componentLibraries] - react components to render with RJX
 * @param {boolean} [this.debug=false] - use debug messages
 * @param {function} [this.logError=console.error] - error logging function
 * @param {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
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
    renderIndex++;
    var element = getComponentFromMap({ rjx: rjx, reactComponents: reactComponents, componentLibraries: componentLibraries, debug: debug, logError: logError });
    var props = getComputedProps.call(this, { rjx: rjx, resources: resources, renderIndex: renderIndex, componentLibraries: componentLibraries, debug: debug, logError: logError });
    var displayElement = rjx.comparisonprops ? displayComponent.call(this, { rjx: rjx, props: props, renderIndex: renderIndex, componentLibraries: componentLibraries, debug: debug }) : true;

    if (displayElement) {
      var children = getRJXChildren.call(this, { rjx: rjx, props: props, resources: resources, renderIndex: renderIndex });
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

export { renderIndex, rjxRender, rjxHTMLString, getRenderedJSON, _rjxChildren, _rjxComponents, _rjxProps, _rjxUtils };
export default getRenderedJSON;
