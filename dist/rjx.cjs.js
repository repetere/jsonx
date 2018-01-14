'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var UAParser = _interopDefault(require('ua-parser-js'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
    console.warn('could not detect browser support', e);
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

/**
 * custom object sort by field
 * @example
 * 			req.controllerData.searchdocuments = searchdocuments.sort(CoreUtilities.sortObject('desc', 'createdat'));
 * @param  {string} dir   either asc or desc
 * @param  {string} field object property to seach
 * @return {function}  object sort compare function
 */
function sortObject(dir, field) {
  var comparefunction = void 0;
  if (dir === 'desc') {
    comparefunction = function comparefunction(a, b) {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    };
  } else {
    comparefunction = function comparefunction(a, b) {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    };
  }

  return comparefunction;
}



var rjxUtils = Object.freeze({
	displayComponent: displayComponent$1,
	getAdvancedBinding: getAdvancedBinding,
	traverse: traverse,
	sortObject: sortObject
});

var advancedBinding = getAdvancedBinding();
var componentMap$1 = Object.assign({}, React.DOM, window.__rjx_custom_elements);

function getBoundedComponents$1() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reactComponents = options.reactComponents,
      _options$boundedCompo = options.boundedComponents,
      boundedComponents = _options$boundedCompo === undefined ? [] : _options$boundedCompo;

  if (advancedBinding) {
    return Object.assign(reactComponents, boundedComponents.map(function (componentName) {
      return reactComponents[componentName].bind(_this);
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
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    if (typeof rjx.component !== 'string') {
      return rjx.component;
    } else if (React.DOM[rjx.component]) {
      return rjx.component;
    } else {
      Object.keys(componentLibraries).forEach(function (libraryName) {
        if (componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')]) {
          return componentLibraries[libraryName][rjx.component.replace(libraryName + '.', '')];
        }
      });
      return reactComponents[rjx.component];
    }
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
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

if (typeof window$1 === 'undefined') {
  var window$1 = {};
}

var componentMap$2 = Object.assign({}, React.DOM, window$1.__rjx_custom_elements);

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
      propName = _options$propName === undefined ? 'asyncProps' : _options$propName,
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
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window$1[propFunc.replace('func:window.', '')] === 'function') {
    return window$1[propFunc.replace('func:window.', '')].bind(this);
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
    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf('func:window.__rjx_custom_elements') !== -1 && typeof window$1.__rjx_custom_elements[windowComponents[key].replace('func:window.__rjx_custom_elements.', '')] === 'function') {
      var windowComponentElement = window$1.__rjx_custom_elements[allProps[key].replace('func:window.__rjx_custom_elements.', '')];
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
    var componentThisProp = rjx.asyncprops ? Object.assign({
      __rjx: {
        _component: rjx,
        _resources: resources
      }
    }, this.props, rjx.props, useReduxState && !rjx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[rjx.component] ? this.props.getState() : {}) : undefined;
    var asyncprops = getRJXProps({ rjx: rjx, propName: 'asyncprops', traverseObject: resources });
    var windowprops = getRJXProps({ rjx: rjx, propName: 'windowprops', traverseObject: window$1 });
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

exports.renderIndex = 0;

//pass querySelector and RJX render with react
function rjxRender() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = config.rjx,
      resources = config.resources,
      querySelector = config.querySelector,
      options = config.options;

  ReactDOM.render(getRenderedJSON(rjx, resources, options), document.querySelector(querySelector));
}

//return rendered HTML string
function rjxHTMLString() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rjx = config.rjx,
      resources = config.resources,
      options = config.options;

  return ReactDOMServer.renderToString(getRenderedJSON(rjx, resources, options));
}

function getRenderedJSON(rjx, resources) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // eslint-disable-next-line
  var componentLibraries = options.componentLibraries,
      debug = options.debug,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      _options$boundedCompo = options.boundedComponents,
      boundedComponents = _options$boundedCompo === undefined ? [] : _options$boundedCompo;

  if (!rjx) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    var components = Object.assign({}, componentMap, options.reactComponents);
    var reactComponents = boundedComponents.length ? getBoundedComponents.call(this, { boundedComponents: boundedComponents, reactComponents: components }) : components;
    exports.renderIndex++;
    var element = getComponentFromMap({ rjx: rjx, reactComponents: reactComponents, componentLibraries: componentLibraries });
    var props = getComputedProps.call(this, { rjx: rjx, resources: resources, renderIndex: exports.renderIndex, componentLibraries: componentLibraries, debug: debug });
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
