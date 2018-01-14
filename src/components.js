import React from 'react';
import { getAdvancedBinding, } from './utils';
// import { reactComponents } from '../test/mock/legacy';
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
  const { rjx, reactComponents, componentLibraries = {}, logError = console.error, } = options;
  try {
    if (typeof rjx.component !== 'string') {
      return rjx.component;
    } else if (React.DOM[rjx.component]) {
      return rjx.component;
    } else {
      Object.keys(componentLibraries).forEach(libraryName => {
        if (componentLibraries[ libraryName ][ rjx.component.replace(`${libraryName}.`, '') ]) {
          return componentLibraries[ libraryName ][ rjx.component.replace(`${libraryName}.`, '') ];
        }
      });
      return reactComponents[rjx.component];
    }
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}

/**
 * if (recharts[rjx.component.replace('recharts.', '')]) {
      return recharts[rjx.component.replace('recharts.', '')];
    }
 */