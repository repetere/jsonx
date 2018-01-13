'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = _interopDefault(require('react'));

var componentMap = Object.assign({}, React$1.DOM, window.__rjx_custom_elements);

function getComponentFromMap() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
      AppLayoutMap = options.AppLayoutMap,
      _options$componentLib = options.componentLibraries,
      componentLibraries = _options$componentLib === undefined ? {} : _options$componentLib,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    if (typeof componentObject.component !== 'string') {
      return componentObject.component;
    } else if (React$1.DOM[componentObject.component]) {
      return componentObject.component;
    } else {
      Object.keys(componentLibraries).forEach(function (libraryName) {
        if (componentLibraries[libraryName][componentObject.component.replace(libraryName + '.', '')]) {
          return componentLibraries[libraryName][componentObject.component.replace(libraryName + '.', '')];
        }
      });
      return AppLayoutMap[componentObject.component];
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

function getRenderedCompProps() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
      resources = options.resources,
      renderIndex = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    return {};
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

if (typeof window$2 === 'undefined') {
  var window$2 = {};
}
var componentMap$2 = Object.assign({}, React.DOM, window$2.__rjx_custom_elements);

function getComponentObjectChildren() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line
  var componentObject = options.componentObject,
      resources = options.resources,
      renderIndex = options.renderIndex,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  try {
    return {};
  } catch (e) {
    logError(e, e.stack ? e.stack : 'no stack');
    return null;
  }
}

// import React, { createElement, } from 'react';
// import { traverse, sortObject, } from './utils';
var createElement = React$1.createElement;
exports.renderIndex = 0;

//pass querySelector and RJX render with react
function renderRJX() {}

//return rendered HTML string
function rjxHTMLString() {}

function getRenderedJSON(componentObject, resources) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // eslint-disable-next-line
  var componentLibraries = options.componentLibraries,
      debug = options.debug,
      _options$logError = options.logError,
      logError = _options$logError === undefined ? console.error : _options$logError;

  if (!componentObject) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    var AppLayoutMap = Object.assign({}, componentMap, options.AppLayoutMap);
    exports.renderIndex++;
    var element = getComponentFromMap({ componentObject: componentObject, AppLayoutMap: AppLayoutMap, componentLibraries: componentLibraries });
    var props = getRenderedCompProps.call(this, { componentObject: componentObject, resources: resources, renderIndex: exports.renderIndex });
    var children = getComponentObjectChildren.call(this, { componentObject: componentObject, resources: resources, renderIndex: exports.renderIndex });
    return createElement(element, props, children);
  } catch (e) {
    if (debug) {
      logError({ componentObject: componentObject, resources: resources }, 'this', this);
      logError(e, e.stack ? e.stack : 'no stack');
    }
    throw e;
  }
}

exports.renderRJX = renderRJX;
exports.rjxHTMLString = rjxHTMLString;
exports.getRenderedJSON = getRenderedJSON;
exports['default'] = getRenderedJSON;
