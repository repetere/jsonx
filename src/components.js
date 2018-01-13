import React from 'react';

export let componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

export function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const { componentObject, AppLayoutMap, componentLibraries = {}, logError = console.error, } = options;
  try {
    if (typeof componentObject.component !== 'string') {
      return componentObject.component;
    } else if (React.DOM[componentObject.component]) {
      return componentObject.component;
    } else {
      Object.keys(componentLibraries).forEach(libraryName => {
        if (componentLibraries[ libraryName ][ componentObject.component.replace(`${libraryName}.`, '') ]) {
          return componentLibraries[ libraryName ][ componentObject.component.replace(`${libraryName}.`, '') ];
        }
      });
      return AppLayoutMap[componentObject.component];
    }
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}

/**
 * if (recharts[componentObject.component.replace('recharts.', '')]) {
      return recharts[componentObject.component.replace('recharts.', '')];
    }
 */