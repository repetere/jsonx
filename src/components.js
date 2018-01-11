import React from 'react';

export let componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

export function getComponentFromMap(options = {}) {
  const { componentObject, AppLayoutMap, componentLibraries, } = options;
  const logError = options.logError || console.error;
  try {
    if (typeof componentObject.component !== 'string') {
      return componentObject.component;
    } else if (React.DOM[componentObject.component]) {
      return componentObject.component;
    } else if (recharts[componentObject.component.replace('recharts.', '')]) {
      return recharts[componentObject.component.replace('recharts.', '')];
    } else if (victory[componentObject.component.replace('victory.', '')]) {
      return victory[componentObject.component.replace('victory.', '')];
    } else {
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