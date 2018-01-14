// import React, { createElement, } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { componentMap, getComponentFromMap, getBoundedComponents, } from './components';
import { getComputedProps, } from './props';
import { getComponentObjectChildren, } from './children';
import { displayComponent, } from './utils';
const createElement = React.createElement;
export let renderIndex = 0;

//pass querySelector and RJX render with react
export function rjxRender(config = {}) {
  const { rjx, resources, querySelector, options, } = config;
  ReactDOM.render(
    getRenderedJSON(rjx, resources, options),
    document.querySelector(querySelector)
  );
}


//return rendered HTML string
export function rjxHTMLString(config = {}) {
  const { rjx, resources, options, } = config;
  return ReactDOMServer.renderToString(getRenderedJSON(rjx, resources, options));
}

export function getRenderedJSON(componentObject, resources, options = {}) {
  // eslint-disable-next-line
  const { componentLibraries, debug, logError = console.error, boundedComponents=[], } = options;
  if (!componentObject) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    const components = Object.assign({}, componentMap, options.reactComponents);
    const reactComponents = (boundedComponents.length)
      ? getBoundedComponents.call(this, { boundedComponents, reactComponents: components, })
      : components;
    renderIndex++;
    const element = getComponentFromMap({ componentObject, reactComponents, componentLibraries, });
    const props = getComputedProps.call(this, { componentObject, resources, renderIndex, componentLibraries, debug, });
    const displayElement = (componentObject.comparisonprops)
      ? displayComponent.call(this, { componentObject, props, renderIndex, componentLibraries, debug, })
      : true;
    
    if (displayElement) {
      const children = getComponentObjectChildren.call(this, { componentObject, props, resources, renderIndex, });
      return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ componentObject, resources, }, 'this', this);
      logError(e, (e.stack) ? e.stack : 'no stack');
    }
    throw e;
  }
}

export default getRenderedJSON;