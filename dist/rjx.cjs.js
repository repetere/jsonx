'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var componentMap = Object.assign({}, React__default.DOM, window.__rjx_custom_elements);



/**
 * if (recharts[componentObject.component.replace('recharts.', '')]) {
      return recharts[componentObject.component.replace('recharts.', '')];
    }
 */

//pass querySelector and RJX render with react
function renderRJX() {}

//return rendered HTML string
function rjxHTMLString() {}

function getRenderedJSON(componentObject, resources) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var debug = options.debug;
  var logError = options.logError || console.error;
  try {
    var AppLayoutMap = Object.assign({}, componentMap, options.AppLayoutMap);
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
