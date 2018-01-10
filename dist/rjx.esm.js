import React from 'react';

var componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

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

export { getRenderedJSON };
export default getRenderedJSON;
