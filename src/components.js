import React from 'react';
import * as ReactDOMElements from 'react-dom-factories';
import { getAdvancedBinding, } from './utils';

if (typeof window === 'undefined') {
  var window = {};
}
export let advancedBinding = getAdvancedBinding();
export let componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

export function getBoundedComponents(options = {}) {
  const { reactComponents, boundedComponents=[], } = options;
  if (advancedBinding) {
    return Object.assign(reactComponents, boundedComponents.map(componentName => reactComponents[ componentName ].bind(this)));
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

export function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const { rjx, reactComponents, componentLibraries = {}, logError = console.error, debug} = options;
  try {
    if (typeof rjx.component !== 'string') {
      return rjx.component;
    } else if (ReactDOMElements[rjx.component]) {
      return rjx.component;
    } else {
      Object.keys(componentLibraries).forEach(libraryName => {
        if (componentLibraries[ libraryName ][ rjx.component.replace(`${libraryName}.`, '') ]) {
          return componentLibraries[ libraryName ][ rjx.component.replace(`${libraryName}.`, '') ];
        }
      });
      if (reactComponents[ rjx.component ]) {
        return reactComponents[rjx.component];
      } else {
        throw new ReferenceError(`Invalid React Component(${rjx.component})`);
      }
    }
  } catch (e) {
    if(debug) logError(e, (e.stack) ? e.stack : 'no stack');
    throw e;
  }
}

/**
 * if (recharts[rjx.component.replace('recharts.', '')]) {
      return recharts[rjx.component.replace('recharts.', '')];
    }
 */