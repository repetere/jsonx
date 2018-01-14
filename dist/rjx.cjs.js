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

function displayComponent() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var componentObject = options.componentObject,
      props = options.props;

  var propsToCompare = componentObject.comparisonprops;
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
  if (componentObject.comparisonorprops && validProps.length < 1) {
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

var advancedBinding = getAdvancedBinding();
var componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

function getBoundedComponents() {
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

function getComponentFromMap() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
      reactComponents = options.reactComponents,
      _options$componentLib = options.componentLibraries,
      componentLibraries = _options$componentLib === undefined ? {} : _options$componentLib,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    if (typeof componentObject.component !== 'string') {
      return componentObject.component;
    } else if (React.DOM[componentObject.component]) {
      return componentObject.component;
    } else {
      Object.keys(componentLibraries).forEach(function (libraryName) {
        if (componentLibraries[libraryName][componentObject.component.replace(libraryName + '.', '')]) {
          return componentLibraries[libraryName][componentObject.component.replace(libraryName + '.', '')];
        }
      });
      return reactComponents[componentObject.component];
    }
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

/**
 * if (recharts[componentObject.component.replace('recharts.', '')]) {
      return recharts[componentObject.component.replace('recharts.', '')];
    }
 */

if (typeof window$1 === 'undefined') {
  var window$1 = {};
}

var componentMap$1 = Object.assign({}, React.DOM, window$1.__rjx_custom_elements);

function getRJXProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
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
  // return (componentObject.asyncprops && typeof componentObject.asyncprops === 'object')
  // ? utilities.traverse(componentObject.asyncprops, resources)
  // : {};

  return componentObject[propName] && _typeof(componentObject[propName]) === 'object' ? traverse(componentObject[propName], traverseObject) : {};
}

function getEvalProps() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var componentObject = options.componentObject;

  var scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  return Object.keys(componentObject.__dangerouslyEvalProps).reduce(function (eprops, epropName) {
    // eslint-disable-next-line
    eprops[epropName] = componentObject.__dangerouslyBindEvalProps[epropName] ? scopedEval(componentObject.__dangerouslyEvalProps[epropName]).bind(_this) : scopedEval(componentObject.__dangerouslyEvalProps[epropName]);
    return eprops;
  }, {});
}

function getComponentProps() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var componentObject = options.componentObject,
      resources = options.resources,
      debug = options.debug;

  return Object.keys(componentObject.__dangerouslyInsertComponents).reduce(function (cprops, cpropName) {
    // eslint-disable-next-line
    cprops[cpropName] = getRenderedJSON.call(_this2, componentObject.__dangerouslyInsertComponents[cpropName], resources, debug);
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
      _options$componentObj = options.componentObject,
      componentObject = _options$componentObj === undefined ? {} : _options$componentObj;

  var getFunction = getFunctionFromProps.bind(this);
  var funcProps = componentObject.__functionProps;
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
      componentObject = options.componentObject;

  var windowComponents = componentObject.__windowComponents;
  // if (componentObject.hasWindowComponent && window.__rjx_custom_elements) {
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
function getComputedProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
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
    var componentThisProp = componentObject.asyncprops ? Object.assign({
      __rjx: {
        _component: componentObject,
        _resources: resources
      }
    }, this.props, componentObject.props, useReduxState && !componentObject.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[componentObject.component] ? this.props.getState() : {}) : undefined;
    var asyncprops = getRJXProps({ componentObject: componentObject, propName: 'asyncprops', traverseObject: resources });
    var windowprops = getRJXProps({ componentObject: componentObject, propName: 'windowprops', traverseObject: window$1 });
    var thisprops = getRJXProps({ componentObject: componentObject, propName: 'thisprops', traverseObject: componentThisProp });

    //allowing javascript injections
    var evalProps = componentObject.__dangerouslyEvalProps ? getEvalProps.call(this, { componentObject: componentObject }) : {};
    var insertedComponents = componentObject.__dangerouslyInsertComponents ? getComponentProps.call(this, { componentObject: componentObject, resources: resources, debug: debug }) : {};
    var allProps = Object.assign({ key: renderIndex$$1 }, thisprops, componentObject.props, asyncprops, windowprops, evalProps, insertedComponents);
    var computedProps = Object.assign(allProps, componentObject.__functionProps ? getFunctionProps.call(this, { allProps: allProps, componentObject: componentObject }) : {}, componentObject.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, componentObject: componentObject }) : {});

    return computedProps;
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

function getChildrenStringOrProp() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var componentObject = options.componentObject,
      props = options.props;


  return typeof componentObject.children === 'undefined' ? props && props.children && (typeof props.children === 'string' || Array.isArray(props.children)) ? props.children : null : componentObject.children;
}

function getChildrenProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var componentObject = options.componentObject,
      childComponentObject = options.childComponentObject,
      props = options.props,
      renderIndex$$1 = options.renderIndex;

  return componentObject.bindprops ? Object.assign({}, childComponentObject, {
    props: Object.assign({}, props, childComponentObject.thisprops && childComponentObject.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
    childComponentObject.asyncprops && childComponentObject.asyncprops.style || childComponentObject.windowprops && childComponentObject.windowprops.style ? {} : {
      style: {}
    }, childComponentObject.props, { key: renderIndex$$1 + Math.random() })
  }) : childComponentObject;
}

function getComponentObjectChildren() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
      props = options.props,
      resources = options.resources,
      renderIndex$$1 = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    if (props._children /* && !componentObject.children */) {
        if (Array.isArray(props._children)) {
          componentObject.children = [].concat(props._children);
        } else {
          componentObject.children = props._children;
        }
        delete props._children;
      }

    return componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string' ? componentObject.children.map(function (childComponentObject) {
      return getRenderedJSON.call(_this, getChildrenProps({ componentObject: componentObject, childComponentObject: childComponentObject, props: props, renderIndex: renderIndex$$1 }), resources);
    }) : getChildrenStringOrProp({ componentObject: componentObject, props: props });
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

// import React, { createElement, } from 'react';
var createElement = React.createElement;
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

function getRenderedJSON(componentObject, resources) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // eslint-disable-next-line
  var componentLibraries = options.componentLibraries,
      debug = options.debug,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError,
      _options$boundedCompo = options.boundedComponents,
      boundedComponents = _options$boundedCompo === undefined ? [] : _options$boundedCompo;

  if (!componentObject) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    var components = Object.assign({}, componentMap, options.reactComponents);
    var reactComponents = boundedComponents.length ? getBoundedComponents.call(this, { boundedComponents: boundedComponents, reactComponents: components }) : components;
    exports.renderIndex++;
    var element = getComponentFromMap({ componentObject: componentObject, reactComponents: reactComponents, componentLibraries: componentLibraries });
    var props = getComputedProps.call(this, { componentObject: componentObject, resources: resources, renderIndex: exports.renderIndex, componentLibraries: componentLibraries, debug: debug });
    var displayElement = componentObject.comparisonprops ? displayComponent.call(this, { componentObject: componentObject, props: props, renderIndex: exports.renderIndex, componentLibraries: componentLibraries, debug: debug }) : true;

    if (displayElement) {
      var children = getComponentObjectChildren.call(this, { componentObject: componentObject, props: props, resources: resources, renderIndex: exports.renderIndex });
      return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ componentObject: componentObject, resources: resources }, 'this', this);
      logError(e, e.stack ? e.stack : 'no stack');
    }
    throw e;
  }
}

exports.rjxRender = rjxRender;
exports.rjxHTMLString = rjxHTMLString;
exports.getRenderedJSON = getRenderedJSON;
exports['default'] = getRenderedJSON;
