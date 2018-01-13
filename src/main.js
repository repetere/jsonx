// import React, { createElement, } from 'react';
import React from 'react';
import { componentMap, getComponentFromMap, } from './components';
import { getRenderedCompProps, } from './props';
import { getComponentObjectChildren, } from './children';
// import { traverse, sortObject, } from './utils';
const createElement = React.createElement;
export let renderIndex = 0;

//pass querySelector and RJX render with react
export function renderRJX() {

}

//return rendered HTML string
export function rjxHTMLString() {

}

export function getRenderedJSON(componentObject, resources, options = {}) {
  // eslint-disable-next-line
  const { componentLibraries, debug, logError = console.error, } = options;
  if (!componentObject) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    const AppLayoutMap = Object.assign({}, componentMap, options.AppLayoutMap);
    renderIndex++;
    const element = getComponentFromMap({ componentObject, AppLayoutMap, componentLibraries, });
    const props = getRenderedCompProps.call(this, { componentObject, resources, renderIndex, });
    const children = getComponentObjectChildren.call(this, { componentObject, resources, renderIndex, });
    return createElement(element, props, children);
  } catch (e) {
    if (debug) {
      logError({ componentObject, resources, }, 'this', this);
      logError(e, (e.stack) ? e.stack : 'no stack');
    }
    throw e;
  }
}

export default getRenderedJSON;