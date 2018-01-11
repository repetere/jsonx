import React, { createElement, } from 'react';
import { componentMap, getComponentFromMap, } from './components';

//pass querySelector and RJX render with react
export function renderRJX() {

}

//return rendered HTML string
export function rjxHTMLString() {

}

export function getRenderedJSON(componentObject, resources, options = {}) {
  const debug = options.debug;
  const logError = options.logError || console.error;
  try {
    const AppLayoutMap = Object.assign({}, componentMap, options.AppLayoutMap);
  } catch (e) {
    if (debug) {
      logError({ componentObject, resources, }, 'this', this);
      logError(e, (e.stack) ? e.stack : 'no stack');
    }
    throw e;
  }
}

export default getRenderedJSON;